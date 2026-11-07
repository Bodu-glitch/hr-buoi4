// REST Gemini chính thức; khóa chỉ trong header máy chủ, không ở URL/UI/log.
// Model do người học chọn ngày 24/10/2026; không tự thay model khi lỗi.
const modelDaChon = 'gemini-3.5-flash-lite';
const providers = new Set(['gemini', 'google', 'google-gemini', 'google_gemini', 'google gemini']);

export function kiemProvider(config) {
  if (!providers.has(config.provider)) return 'AI_PROVIDER chưa đúng. Bản thử đã tích hợp Gemini; tự đặt AI_PROVIDER=gemini trong .env rồi khởi động lại.';
  if (config.model !== modelDaChon) return 'AI_MODEL chưa khớp model bạn đã chọn: gemini-3.5-flash-lite. Tự sửa trong .env rồi khởi động lại.';
  return '';
}

function loi(message, { status = 502, providerStatus = null, calledAPI = true } = {}) {
  return Object.assign(new Error('GEMINI_REQUEST_FAILED'), { status, providerStatus, calledAPI, publicMessage: message });
}

export async function goiAI({ config, system, input, schema, fetchImpl = fetch }) {
  const configError = kiemProvider(config);
  if (configError) throw loi(configError, { status: 503, calledAPI: false });
  let response;
  try {
    response = await fetchImpl(`https://generativelanguage.googleapis.com/v1beta/models/${modelDaChon}:generateContent`, {
      method: 'POST',
      redirect: 'error',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': config.key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: input }] }],
        generationConfig: { maxOutputTokens: schema ? 8192 : 4096, ...(schema ? {responseMimeType: 'application/json', responseJsonSchema: schema} : {}) },
      }),
      signal: AbortSignal.timeout(60000),
    });
  } catch (error) {
    throw loi(error.name === 'TimeoutError' || error.name === 'AbortError'
      ? 'Gemini chưa trả lời trong 60 giây. Không tự gọi lại; lượt vừa gửi có thể đã tính phí.'
      : 'Không kết nối được Gemini. Kiểm tra mạng; không có kết quả và không tự thử lại.');
  }
  let data;
  try { data = await response.json(); }
  catch { throw loi(`Gemini trả phản hồi không đọc được (HTTP ${response.status}). Không có kết quả thay thế.`, { providerStatus: response.status }); }
  if (!response.ok) {
    const invalidKey = Array.isArray(data?.error?.details) && data.error.details.some(d => d?.reason === 'API_KEY_INVALID');
    const reason = invalidKey ? 'Khóa API không hợp lệ; tự kiểm tra trong .env rồi khởi động lại.' : ({
      400: 'Yêu cầu/cấu hình bị từ chối; kiểm khóa, model và điều kiện sử dụng của dự án Gemini.',
      401: 'Khóa API không hợp lệ hoặc không được xác thực; tự kiểm tra .env.',
      403: 'Dự án/khóa không có quyền sử dụng model hoặc bị giới hạn truy cập.',
      404: 'Không tìm thấy model hoặc model chưa khả dụng với khóa/dự án này; không tự đổi model.',
      429: 'Đã vượt hạn mức/tốc độ hoặc hạn mức thanh toán của Gemini. Kiểm Google AI Studio; không tự thử lại.',
      500: 'Gemini đang gặp lỗi máy chủ; chưa có kết quả.',
      503: 'Gemini tạm thời không sẵn sàng; chưa có kết quả.',
    }[response.status] || 'Gemini từ chối yêu cầu; chưa có kết quả.');
    // Giữ mã lỗi thực, không chuyển error.message/raw body có thể chứa dữ liệu/khóa.
    throw loi(`Gemini trả HTTP ${response.status}. ${reason}`, { providerStatus: response.status });
  }
  const candidate = data?.candidates?.[0];
  if (data?.promptFeedback?.blockReason || !candidate) throw loi('Gemini không tạo nội dung hoặc đã chặn yêu cầu. Không có kết quả để đối chiếu.', { providerStatus: response.status });
  if (candidate.finishReason !== 'STOP') throw loi(candidate.finishReason === 'MAX_TOKENS'
    ? 'Gemini đã dừng ở giới hạn đầu ra; kết quả chưa đầy đủ nên không đánh dấu thành công. Không tự gọi lại.'
    : 'Gemini dừng trước khi hoàn tất hoặc chặn nội dung; không trả kết quả chưa hoàn tất như một lượt thành công.', { providerStatus: response.status });
  const text = candidate.content?.parts?.filter(p => p.thought !== true && typeof p.text === 'string').map(p => p.text).join('\n').trim();
  if (!text) throw loi('Gemini trả thành công nhưng không có văn bản kết quả. Không có kết quả thay thế.', { providerStatus: response.status });
  const usage = {};
  for (const [name, key] of [['inputTokens', 'promptTokenCount'], ['outputTokens', 'candidatesTokenCount'], ['thinkingTokens', 'thoughtsTokenCount'], ['totalTokens', 'totalTokenCount']]) {
    const value = data.usageMetadata?.[key];
    if (Number.isSafeInteger(value) && value >= 0) usage[name] = value;
  }
  return { text, provider: 'Gemini', model: modelDaChon, usage: Object.keys(usage).length ? usage : null };
}
