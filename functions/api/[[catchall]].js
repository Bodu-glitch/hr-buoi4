import { createWorkflowAPI } from '../../src/app/api_quy_trinh.mjs';
import { steps } from '../../src/app/cac_buoc.mjs';
import { confirmedDecisionB4 } from '../../src/app/quyet_dinh_b4.mjs';

let workflow = null;
let lastSupabaseUrl = null;

function getWorkflow(env) {
  const supabaseUrl = env.SUPABASE_URL || '';
  const supabaseKey = env.SUPABASE_KEY || '';
  const aiKey = env.AI_API_KEY || env.GEMINI_API_KEY || '';
  const provider = env.AI_PROVIDER || 'gemini';
  const model = env.AI_MODEL || 'gemini-3.5-flash-lite';

  if (!workflow || lastSupabaseUrl !== supabaseUrl) {
    const config = {
      provider,
      model,
      key: aiKey,
      missing: aiKey ? [] : ['AI_API_KEY']
    };

    workflow = createWorkflowAPI({
      b4Mode: true,
      config,
      extraHandler: steps,
      cookieName: 'hr_auth',
      governanceDecision: confirmedDecisionB4,
      supabaseConfig: {
        supabaseUrl,
        supabaseKey
      }
    });
    lastSupabaseUrl = supabaseUrl;
  }

  return workflow;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Cookie',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  }

  const api = getWorkflow(env);

  const reqHeaders = {};
  for (const [k, v] of request.headers.entries()) {
    reqHeaders[k.toLowerCase()] = v;
  }
  reqHeaders.cookie = request.headers.get('cookie') || '';

  const req = {
    url: url.pathname + url.search,
    method: request.method,
    headers: reqHeaders
  };

  let responseStatus = 200;
  const responseHeaders = new Headers();
  responseHeaders.set('Cache-Control', 'no-store');
  responseHeaders.set('X-Content-Type-Options', 'nosniff');

  let responseBody = '';

  const res = {
    setHeader(name, value) {
      if (name.toLowerCase() === 'set-cookie') {
        responseHeaders.append('Set-Cookie', value);
      } else {
        responseHeaders.set(name, value);
      }
    }
  };

  const json = (status, data) => {
    responseStatus = status;
    responseBody = JSON.stringify(data);
    responseHeaders.set('Content-Type', 'application/json; charset=utf-8');
  };

  const body = async () => {
    try {
      return await request.json();
    } catch {
      throw Object.assign(new Error('Dữ liệu không hợp lệ.'), { status: 400 });
    }
  };

  try {
    const handled = await api.handle(req, res, json, body);
    if (!handled) {
      return new Response(JSON.stringify({ error: 'Endpoint không tồn tại.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    }
    return new Response(responseBody, {
      status: responseStatus,
      headers: responseHeaders
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Lỗi xử lý yêu cầu.' }), {
      status: err.status || 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }
}
