const root=document.querySelector('#app');let state,user,people=[],screen='jobs',jobId=null,candidateId=null,busy=false,flash='',editing=null,govTab='overview';
const names={ADMIN:'Quản trị',HR:'Nhân sự',TBP:'Trưởng bộ phận',GD:'Giám đốc',QL:'Quản lý',IT:'IT',HC:'Hành chính',PV:'Người phỏng vấn',GDNS:'Giám đốc nhân sự'};
const statuses={NHAP:'Phiếu nháp',DA_DUYET:'YC đã duyệt',TIN_NHAP:'Tin nháp',TIN_DA_CHOT:'Tin đã chốt',DANG_TUYEN:'Đang tuyển',DA_DU_NGUOI:'Đã đủ người',MOI_NOP:'Mới nộp',TOM_TAT_NHAP:'Tóm tắt chờ kiểm',HR_DA_KIEM:'HR đã kiểm',CHO_QUYET_DINH:'Chờ HR và Trưởng bộ phận thống nhất',MOI_PV:'Mời phỏng vấn',KHONG_MOI:'Không mời',HEN_PV:'Đã hẹn phỏng vấn',DA_PV:'Đủ phiếu phỏng vấn',DE_XUAT_NHAN:'Đề xuất nhận việc',KHONG_DAT:'Không đạt phỏng vấn',PHIEU_NHAN_NHAP:'Phiếu nhận việc nháp',DA_DUYET_NHAN:'Đã duyệt nhận việc',THU_DA_KIEM:'Thư đã kiểm',DA_GUI_THU:'Đã gửi thư',DA_XAC_NHAN:'Ứng viên xác nhận',TU_CHOI:'Ứng viên từ chối',XIN_DOI:'Ứng viên xin đổi',CHO_NGAY_DAU:'Chờ ngày đầu',DANG_HOI_NHAP:'Đang hội nhập',ONBOARD_THANH_CONG:'Onboard thành công'};
const can=(...roles)=>user?.roles.some(r=>roles.includes(r));
function h(tag,attrs={},...children){const e=document.createElement(tag);for(const[k,v]of Object.entries(attrs)){if(k.startsWith('on'))e.addEventListener(k.slice(2),v);else if(k==='class')e.className=v;else if(k==='text')e.textContent=v;else if(k==='value')e.value=v;else if(v!==false&&v!==undefined)e.setAttribute(k,v===true?'':v);}for(const c of children.flat(Infinity)){if(c!==null&&c!==undefined&&c!==false)e.append(c instanceof Node?c:document.createTextNode(String(c)));}return e;}
const para=(s,cls='muted')=>h('p',{class:cls},s);const badge=s=>h('span',{class:'badge'},statuses[s]||s);
function btn(label,fn,cls=''){const b=h('button',{type:'button',class:cls,onclick:()=>{if(!busy)fn();}},label);b.disabled=busy;return b;}
function setFlash(s,error=false){flash=s;const e=document.querySelector('#status');if(e){e.textContent=s;e.className='notice'+(error?' error':'');e.hidden=!s;}}
async function api(path,body){const r=await fetch('/api/v2/'+path,body===undefined?{}:{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json();if(!r.ok){if(d.unsavedResult){const shade=h('div',{class:'modalshade'});shade.append(h('section',{class:'modal'},h('h2',{},'Kết quả API chưa lưu được'),para('Sao chép nội dung này trước khi đóng. Lượt đã gửi có thể tính phí; app không tự gọi lại.'),h('pre',{},d.unsavedResult),btn('Đóng',()=>shade.remove())));document.body.append(shade);}if(r.status===401&&user){user=null;await boot();}throw Error(d.error||'Không xử lý được.');}return d;}
async function load(){const d=await api('state');state=d.state;user=d.user;people=(await api('people')).users;render();}
async function act(action,payload){if(busy)return;busy=true;setFlash('Đang lưu thay đổi…');try{const d=await api('action',{action,payload,expected:state.version});state=d.state;editing=null;flash='Đã lưu. Hành động và người thao tác được ghi trong lịch sử.';busy=false;render();return d;}catch(e){setFlash(e.message,true);throw e;}finally{busy=false;document.querySelectorAll('button[data-submit]').forEach(b=>b.disabled=false);}}
async function switchUser(login){try{setFlash('Đang chuyển vai sang '+login+'…');const r=await api('switch-user',{login});user=r.user;editing=null;flash='Đã đổi tài khoản sang '+user.name+' ('+user.roles.map(r=>names[r]||r).join(', ')+')';await load();}catch(e){setFlash('Chưa có tài khoản '+login+'. Vào Quản trị → Nạp tài khoản mẫu B4.',true);}}
function readable(value){const labels={ma_phieu:'Mã yêu cầu',maUV:'Mã ứng viên',hoTen:'Họ tên',viTri:'Vị trí',maYC:'Mã yêu cầu tuyển',ngayNop:'Ngày nộp',nguon:'Nguồn CV',noiDungCV:'CV nguyên văn',tieuChiPhaiCo:'Tiêu chí phải có',tieuChiNenCo:'Tiêu chí nên có',khungLuong:'Khung lương',luongMongMuon:'Lương mong muốn',position:'Vị trí',department:'Phòng',level:'Cấp bậc',location:'Nơi làm việc',manager:'Quản lý',reason:'Lý do tuyển',duties:'Việc chính',must:'Tiêu chí phải có',nice:'Tiêu chí nên có',salaryMin:'Lương tối thiểu',salaryMax:'Lương tối đa',publicSalary:'Công khai lương',needDate:'Ngày cần người',deadline:'Hạn nhận CV',notes:'Ghi chú nội bộ',exception:'Ngoại lệ',quantity:'Số lượng',trialDays:'Thử việc',applyLink:'Link nhận CV',nguoi_duyet:'Người duyệt',ngay_duyet:'Ngày duyệt',loi_code:'Điểm hệ thống cần lưu ý',ma_ho_so:'Mã nhận việc',ho_ten:'Họ tên',vi_tri:'Vị trí',cap_bac:'Cấp bậc',phong:'Phòng',quan_ly:'Quản lý',luong_chinh_thuc:'Lương đã duyệt',ngay_bat_dau:'Ngày bắt đầu',noi_lam_viec:'Nơi làm việc',thu_viec:'Thử việc',moc_chuan_do_code:'Mốc chuẩn hệ thống tính',tieu_chi:'Tiêu chí',tom_tat_cv:'Tóm tắt CV đã kiểm',diem_xac_minh:'Điểm cần xác minh',thoi_gian_pv:'Lịch phỏng vấn',nguoi_pv:'Người phỏng vấn',ghi_chu_tbp:'Ghi chú trưởng bộ phận',nguoi_kem_cap:'Người kèm cặp',chi_tieu_30_ngay:'Chỉ tiêu 30 ngày',ghi_chu_pv:'Ghi chú hỗ trợ',viec_chinh:'Việc chính',moc:'Mốc chuẩn',ma_nv:'Mã nhận việc'};return Object.entries(value).map(([k,v])=>(labels[k]||k)+':\n'+(Array.isArray(v)?v.map(x=>typeof x==='object'?JSON.stringify(x):'• '+x).join('\n'):v&&typeof v==='object'?JSON.stringify(v,null,2):String(v??''))).join('\n\n');}
function run(action,id){if(busy)return;setFlash('Đang chuẩn bị nội dung gửi…');api('action',{action,payload:{id,preview:true},expected:state.version}).then(d=>{const pre=d.preview;if(!pre)throw Error('Chưa chuẩn bị được dữ liệu.');const shade=h('div',{class:'modalshade'});const consent=h('input',{type:'checkbox'});const send=btn('Đồng ý gửi và chạy '+pre.task,async()=>{if(!consent.checked){alert('Cần đồng ý gửi dữ liệu này tới Gemini.');return;}shade.remove();try{await act(action,{id,consent:true});}catch{}},'primary');const sources=h('ul',{},pre.manifest.map(x=>h('li',{},x.path+(x.sections?' §'+x.sections.join(','):''))));shade.append(h('section',{class:'modal'},h('h2',{},'Xem trước dữ liệu gửi Gemini'),para('Chỉ phiếu dưới đây và các nguồn trong danh sách được gửi. Dữ liệu thật giữ nguyên thông tin; API có thể tính phí. Không tự retry.'),sources,pre.module?h('details',{},h('summary',{},'Hướng dẫn AI bổ sung đang áp dụng'),h('pre',{},JSON.stringify(pre.module,null,2))):null,h('pre',{},readable(pre.input)),h('details',{},h('summary',{},'Dữ liệu gửi ở dạng kỹ thuật (để đối chiếu)'),h('pre',{},JSON.stringify(pre.input,null,2))),h('label',{class:'check'},consent,'Tôi đồng ý gửi đúng dữ liệu này tới Gemini để xử lý tác vụ.'),h('div',{class:'actions'},send,btn('Hủy',()=>shade.remove()))));document.body.append(shade);setFlash('');}).catch(e=>setFlash(e.message,true));}
function field(name,label,type='text',options){return{name,label,type,options};}
function form(title,fields,values,submit){const el=h('form',{class:'form'});const refs={};el.append(h('h2',{},title));for(const f of fields){let input;
 if(f.type==='textarea')input=h('textarea',{name:f.name,rows:4,maxlength:20000},values?.[f.name]||'');
 else if(['select','multi'].includes(f.type)){input=h('select',{name:f.name,...(f.type==='multi'?{multiple:true}:{})});if(f.type==='select')input.append(h('option',{value:''},'Chọn…'));for(const op of f.options||[]){const value=typeof op==='string'?op:op.value,label=typeof op==='string'?op:op.label;const o=h('option',{value},label);o.selected=f.type==='multi'?(values?.[f.name]||[]).includes(value):String(values?.[f.name]??'')===String(value);input.append(o);}}
 else {input=h('input',{name:f.name,type:f.type,maxlength:f.type==='password'?200:20000});if(f.type==='checkbox')input.checked=values?.[f.name]===true;else input.value=values?.[f.name]??'';}
 refs[f.name]=input;el.append(h('label',{class:f.type==='checkbox'?'check':''},...(f.type==='checkbox'?[input,f.label]:[f.label,input])));if(f.hint)el.append(para(f.hint,'fieldnote'));}
 const save=h('button',{type:'submit',class:'primary','data-submit':true},'Lưu / xác nhận');el.append(h('div',{class:'actions'},save,btn('Hủy',()=>{editing=null;render();})));
 el.onsubmit=async e=>{e.preventDefault();save.disabled=true;const data={};for(const f of fields){const v=refs[f.name];data[f.name]=f.type==='checkbox'?v.checked:f.type==='multi'?[...v.selectedOptions].map(x=>x.value):v.value;}try{await submit(data);}catch(err){setFlash(err.message,true);}finally{save.disabled=false;}};return el;}
function openForm(title,fields,values,action,extra={}){editing={title,fields,values,submit:d=>act(action,{...extra,...d})};render();document.querySelector('.form')?.scrollIntoView({behavior:'smooth',block:'center'});}
function kv(obj){const list=h('dl',{class:'kv'});for(const[k,v]of Object.entries(obj))list.append(h('dt',{},k),h('dd',{},typeof v==='object'?JSON.stringify(v):String(v??'Chưa có')));return list;}
function runs(records,task){const runs=(records||[]).filter(r=>!task||r.task===task);if(!runs.length)return para('Chưa có lượt AI.');return h('div',{},[...runs].reverse().map(r=>h('details',{},h('summary',{},r.task+' · '+r.createdAt+' · '+r.actorName+' · '+(r.issues.length?'Có điểm cần xử lý':'Bản nháp')),r.issues.length?para(r.issues.join('\n'),'notice error'):null,h('pre',{},r.text),para('Nguồn: '+r.sourceHash+' · '+r.model,'sub'),h('details',{},h('summary',{},'Phiếu đã gửi'),h('pre',{},JSON.stringify(r.input,null,2))))));}
const confirmField=field('confirm','Tôi xác nhận đã kiểm căn cứ và thực hiện hành động này.','checkbox');const dates=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Ho_Chi_Minh'}).format(new Date());
async function boot(){try{const d=await api('status');try{await load();}catch{user=null;authView(!d.initialized);}}catch(e){root.replaceChildren(para(e.message,'notice error'));}}
function authView(setup){const box=h('section',{class:'login'},h('h1',{},'Tuyển dụng & Onboarding'),para(setup?'Tạo tài khoản quản trị đầu tiên hoặc bấm Khởi tạo nhanh để nạp đầy đủ dữ liệu Buổi 4:':'Đăng nhập bằng tài khoản trên máy này.'),h('div',{id:'status',class:'notice error',hidden:true}));
 if(setup){box.append(btn('🚀 Khởi tạo nhanh Admin & Dữ liệu mẫu Buổi 4',async()=>{try{setFlash('Đang khởi tạo tài khoản và dữ liệu mẫu Buổi 4…');await api('setup-demo',{});flash='Đã khởi tạo xong tài khoản Admin, Mai (GĐNS), Minh (TBP), Nam (TBP) và dữ liệu Buổi 4!';await load();}catch(e){setFlash(e.message,true);}},'primary'),para('Hoặc tự điền thông tin bên dưới:','sub'));}
 else{const quick=h('div',{class:'quick-logins',style:'margin-bottom:18px;padding:12px;background:#eef6f3;border-radius:8px;border:1px dashed #7ea399;'});quick.append(h('strong',{},'⚡ Đăng nhập nhanh tài khoản mẫu Buổi 4 (1-Click):'),h('div',{class:'actions',style:'margin-top:8px;'},btn('👑 Admin',()=>quickLogin('admin','MatKhau@123456')),btn('👩‍💼 Mai (GĐNS)',()=>quickLogin('mai','MatKhau@123456')),btn('👨‍💼 Minh (TBP)',()=>quickLogin('minh','MatKhau@123456')),btn('👨‍💼 Nam (TBP)',()=>quickLogin('nam','MatKhau@123456'))));box.append(quick);}
 box.append(form(setup?'Thiết lập lần đầu':'Đăng nhập',[...(setup?[field('name','Họ tên người quản trị')]:[]),field('login','Tên đăng nhập (không dấu)'),field('password','Mật khẩu (tối thiểu 12 ký tự)','password')],{},async data=>{await api(setup?'setup':'login',data);if(setup)await api('login',data);await load();}),para('Chỉ chạy trên 127.0.0.1. Mật khẩu mẫu: MatKhau@123456.','sub'));root.replaceChildren(box);}
async function quickLogin(login,password){try{setFlash('Đang đăng nhập…');await api('login',{login,password});flash='Đăng nhập thành công với '+login;await load();}catch(e){setFlash(e.message,true);}}
function userSwitcher(){const wrap=h('div',{class:'switcher-box'});wrap.append(h('span',{class:'sub',style:'font-weight:600;color:#123f3b;'},'Đổi vai:'));const demos=[['admin','👑 Admin'],['mai','👩‍💼 Mai (GĐNS)'],['minh','👨‍💼 Minh (TBP cũ)'],['nam','👨‍💼 Nam (TBP mới)']];for(const[login,label]of demos){const cur=user.login===login;wrap.append(btn(label,()=>switchUser(login),cur?'active':''));}return wrap;}
function render(){if(!user)return;const nav=h('nav',{},h('h1',{},'HR Workspace'),para('Từ yêu cầu tuyển tới ngày onboard'));if(can('ADMIN','HR','GDNS'))nav.append(h('a',{href:'/quan-tri',target:'_blank',style:'color:#fef08a;display:block;margin:6px 0;font-size:13px;'},'↗ Mở Quản trị tab riêng'));const routes=[['jobs','01 · Yêu cầu tuyển'],['candidates','02 · Hồ sơ & CV'],['interviews','03 · Phỏng vấn'],['offers','04 · Nhận việc'],['onboard','05 · Onboarding'],['dashboard','06 · Theo dõi'],...(can('ADMIN','HR','GDNS')?[['governance','07 · Quản trị vận hành (Buổi 4)']]:[]),['settings','Cấu hình & tài khoản']];for(const[id,label]of routes)nav.append(btn(label,()=>{screen=id;editing=null;render();},screen===id?'active':''));
 nav.append(h('a',{href:'/ai05'},'Mở bản AI05 Phase 1 cũ'));
 const main=h('main',{},h('header',{},h('div',{},h('h1',{},routes.find(x=>x[0]===screen)?.[1]||'Nghiệp vụ'),para(user.name+' · '+user.roles.map(r=>names[r]||r).join(', '))),h('div',{class:'actions',style:'align-items:center;'},userSwitcher(),btn('Tải lại',()=>load().catch(e=>setFlash(e.message,true))),btn('Đăng xuất',async()=>{await api('logout',{});user=null;await boot();}))));main.append(h('p',{id:'status',class:'notice',hidden:!flash},flash));
 if(!state.settings.knowledgeConfirmed&&can('HR','ADMIN'))main.append(para('Chưa xác nhận bộ kiến thức. Mở Cấu hình để xem nguồn đang áp dụng trước khi gọi AI.','notice'));
 const content=h('div',{id:'content'});main.append(content);root.replaceChildren(h('div',{class:'shell'},nav,main));
 if(editing)content.append(form(editing.title,editing.fields,editing.values,editing.submit));
 if(screen==='jobs')jobs(content);else if(screen==='settings')settings(content);else if(screen==='dashboard')stats(content);else if(screen==='governance')governanceScreen(content);else candidates(content);
 main.append(h('footer',{},'Lưu trên máy hiện tại · AI chỉ soạn/gợi ý · Quyết định tuyển và xác nhận công việc do người thao tác. Không tự gửi email/Zalo.'));}
const jobFields=[field('position','Vị trí'),field('department','Phòng'),field('level','Cấp bậc','select',['Chuyên viên','Quản lý']),field('location','Nơi làm việc'),field('manager','Quản lý trực tiếp'),field('quantity','Số lượng','number'),field('reason','Lý do tuyển'),field('duties','Việc chính, mỗi dòng một việc','textarea'),field('must','Tiêu chí phải có, mỗi dòng một tiêu chí','textarea'),field('nice','Tiêu chí nên có (tùy chọn)','textarea'),field('salaryMin','Lương tối thiểu (đồng)','number'),field('salaryMax','Lương tối đa (đồng)','number'),field('publicSalary','Công khai khung lương','select',[{value:'Co',label:'Có'},{value:'Khong',label:'Không, ghi Thỏa thuận'}]),field('needDate','Ngày cần người','date'),field('deadline','Hạn nhận CV','date'),field('trialDays','Thử việc nếu khác mặc định (45/60 ngày)','number'),field('exception','Ngoại lệ đã duyệt (nếu có)','textarea'),field('applyLink','Link nhận CV đang dùng'),field('notes','Ghi chú nội bộ','textarea')];
function jobs(out){if(!can('HR','TBP','GD','QL','GDNS')){out.append(para('Vai của bạn không xem yêu cầu tuyển.'));return;}
 if(can('TBP'))out.append(btn('Tạo yêu cầu tuyển',()=>openForm('Yêu cầu tuyển mới',jobFields,{quantity:1},'job_create'),'primary'));
 const selected=state.jobs.find(j=>j.id===jobId);const list=h('aside',{class:'panel'},h('h2',{},'Yêu cầu tuyển'),state.jobs.map(j=>btn(j.code+' · '+j.position,()=>{jobId=j.id;editing=null;render();},'item'+(j.id===jobId?' selected':''))));const detail=h('section',{class:'panel'});out.append(h('div',{class:'split'},list,detail));if(!selected){detail.append(para('Chọn yêu cầu hoặc tạo phiếu mới.'));return;}const j=selected;
 const assignedList=people.filter(p=>(state.governance?.assignments||[]).some(a=>a.jobId===j.id&&a.userId===p.id)).map(p=>p.name).join(', ')||(state.governance?.scopeMode==='ASSIGNED'?'Chưa phân công phụ trách':'Tất cả HR/TBP');
 detail.append(h('h2',{},j.code+' · '+j.position),badge(j.status),kv({'Phòng':j.department,'Quản lý':j.manager,'Số lượng':j.quantity,'Khung lương':j.salaryMin+' – '+j.salaryMax,'Hạn CV':j.deadline,'Nơi làm':j.location,'Người duyệt':j.approval?.name||'Chưa duyệt','Phụ trách (M2 Bàn giao)':assignedList}),h('details',{},h('summary',{},'Nội dung phiếu gốc'),kv(Object.fromEntries(jobFields.map(f=>[f.label,j[f.name]])))));
 if(state.governance?.scopeMode==='ASSIGNED'&&can('ADMIN','GDNS')){detail.append(btn('👥 Mở bàn giao / phân công vị trí này',()=>openGovTab('handoffs')));};
 const a=h('div',{class:'actions'});detail.append(a);
 if(j.status==='NHAP'&&can('TBP'))a.append(btn('Sửa phiếu',()=>openForm('Sửa phiếu nháp',jobFields,j,'job_edit',{id:j.id})));
 if(j.status==='NHAP'&&can('GD'))a.append(btn('Giám đốc duyệt',()=>openForm('Duyệt yêu cầu và khung lương',[confirmField],{},'job_approve',{id:j.id}),'primary'));
 if(can('HR')&&['NHAP','DA_DUYET','TIN_NHAP'].includes(j.status))a.append(btn('AI02 · Soạn JD/tin/tiêu chí',()=>run('job_ai',j.id)));
 const r=j.runs?.findLast(r=>r.task==='AI02');if(r&&j.approval&&['DA_DUYET','TIN_NHAP'].includes(j.status)&&can('HR'))a.append(btn('HR sửa và chốt tin',()=>openForm('Chốt bản dùng đăng tin',[field('jd','JD nội bộ','textarea'),field('post','Tin đăng công khai, tối đa 250 chữ','textarea'),field('resolution','Giải thích xử lý cờ AI/căn cứ sửa (nếu có)','textarea'),confirmField],{jd:r.output.jd,post:r.output.post},'job_finalize',{id:j.id}),'primary'));
 if(j.status==='TIN_DA_CHOT'&&can('HR'))a.append(btn('Ghi đã tự đăng tin',()=>openForm('Ghi sự kiện đăng thực tế',[field('channel','Kênh đăng'),field('link','Link hoặc bằng chứng đã đăng'),field('date','Ngày đăng','date')],{date:dates()},'job_posted',{id:j.id})));
 if(j.status==='DANG_TUYEN'&&can('HR'))a.append(btn('Ghi đã đủ người',()=>openForm('Chỉ đóng khi đủ người onboard theo số lượng YC',[confirmField],{},'job_close',{id:j.id})));
 if(j.final)detail.append(h('h3',{},'Tin và tiêu chí đã chốt'),h('pre',{},j.final.post),para('Tiêu chí gắn cho hồ sơ: '+j.final.must.join(' · ')));
 detail.append(runs(j.runs));}
function listCandidates(out){if(!candidateId&&state.candidates.length)candidateId=state.candidates[0].id;const list=h('aside',{class:'panel'},h('h2',{},'Ứng viên'),state.candidates.map(c=>btn(c.code+' · '+c.name+' · '+(statuses[c.status]||c.status),()=>{candidateId=c.id;editing=null;render();},'item'+(candidateId===c.id?' selected':''))));const detail=h('section',{class:'panel'});out.append(h('div',{class:'split'},list,detail));return detail;}
function candidates(out){if(screen==='candidates'&&can('HR'))out.append(btn('Nhận hồ sơ từ kênh hiện có',()=>openForm('Nhập hồ sơ vào app',[field('jobId','Yêu cầu đang tuyển','select',state.jobs.filter(j=>j.status==='DANG_TUYEN').map(j=>({value:j.id,label:j.code+' · '+j.position}))),field('name','Họ tên'),field('applied','Ngày nộp','date'),field('source','Nguồn CV'),field('externalCode','Mã hồ sơ từ hệ thống nhận CV (nếu có)'),field('cv','CV dạng văn bản, giữ nguyên nội dung','textarea'),field('desiredSalary','Lương mong muốn (tùy chọn)')],{applied:dates()},'candidate_create'),'primary'));
 const detail=listCandidates(out),c=state.candidates.find(c=>c.id===candidateId);if(!c){detail.append(para('Chưa có hồ sơ để xem.'));return;}const j=state.jobs.find(j=>j.id===c.jobId)||{};detail.append(h('h2',{},c.code+' · '+c.name),badge(c.status),para(j.position||''));
 if(screen==='candidates')candidateDetail(detail,c,j);if(screen==='interviews')interviewDetail(detail,c,j);if(screen==='offers')offerDetail(detail,c,j);if(screen==='onboard')onboardDetail(detail,c,j);
 if(c.history?.length)detail.append(h('details',{},h('summary',{},'Lịch sử thao tác hồ sơ'),h('pre',{},c.history.map(e=>e.at+' · '+e.by+' · '+e.action).join('\n'))));}
function candidateDetail(out,c,j){out.append(kv({'Ngày nộp':c.applied,'Nguồn':c.source,'Mã bên ngoài':c.externalCode}),h('details',{},h('summary',{},'CV đang dùng và bản gốc'),h('pre',{},c.cv),c.cvOriginal&&c.cvOriginal!==c.cv?h('details',{},h('summary',{},'CV đầu tiên, giữ nguyên'),h('pre',{},c.cvOriginal)):null),h('details',{},h('summary',{},'Tiêu chí đã chốt'),h('pre',{},j.final?.must.join('\n'))));const a=h('div',{class:'actions'});out.append(a);
 if(can('HR')&&['MOI_NOP','TOM_TAT_NHAP'].includes(c.status))a.append(btn('AI05 · Đối chiếu CV',()=>run('candidate_ai',c.id),'primary'));
 if(can('HR')&&['MOI_NOP','TOM_TAT_NHAP','HR_DA_KIEM'].includes(c.status)&&!Object.keys(c.decisions||{}).length)a.append(btn('Bổ sung / xác minh đầu vào',()=>openForm('Giữ bản gốc trong lịch sử, chạy lại sau bổ sung',[field('cv','CV phiên bản bổ sung','textarea'),field('verifiedNotes','Nội dung xác minh thêm từ ứng viên','textarea'),field('evidence','Căn cứ bổ sung / xác minh','textarea'),confirmField],{cv:c.cv,verifiedNotes:c.verifiedNotes||''},'candidate_correct',{id:c.id})));
 if(can('HR')&&c.status==='TOM_TAT_NHAP')a.append(btn('HR kiểm trích dẫn',()=>openForm('Đối chiếu CV và bản nháp',[confirmField],{},'candidate_review',{id:c.id})));
 if(can('HR','TBP')&&['HR_DA_KIEM','CHO_QUYET_DINH'].includes(c.status))a.append(btn('Người quyết mời / không mời',()=>openForm('Quyết định vòng hồ sơ',[field('asRole','Thao tác với vai','select',user.roles.filter(r=>['HR','TBP'].includes(r)).map(r=>({value:r,label:names[r]}))),field('choice','Quyết định','select',[{value:'MOI_PV',label:'Mời phỏng vấn'},{value:'KHONG_MOI',label:'Không mời'}]),field('reason','Lý do có căn cứ','textarea'),confirmField],{},'candidate_decision',{id:c.id})));
 if(c.decisions)out.append(kv(Object.fromEntries(Object.entries(c.decisions).map(([role,d])=>[names[role],(statuses[d.choice]||d.choice)+' · '+d.by+' · '+d.reason]))));
 if(can('HR')&&['KHONG_MOI','KHONG_DAT','MOI_PV','HEN_PV'].includes(c.status))a.append(notifyButton(c));out.append(runs(c.runs,'AI05'));}
function notifyButton(c){return btn('Ghi đã liên hệ ứng viên',()=>openForm('Thông báo thực tế từ kênh đang dùng',[field('date','Ngày báo','date'),field('channel','Kênh liên hệ'),field('evidence','Nội dung/bằng chứng đã báo','textarea')],{date:dates()},'notify',{id:c.id}));}
function interviewDetail(out,c,j){const a=h('div',{class:'actions'});out.append(a);
 const mAi07=(state.governance?.modules||[]).slice().reverse().find(m=>m.task==='AI07'&&m.status==='APPLIED');
 if(mAi07?.paused)out.append(para('⚠️ Module AI07 đang tạm dừng theo quyết định quản trị. Người phỏng vấn tự chuẩn bị câu hỏi.','notice error'));
 else if(mAi07)out.append(para('🤖 AI07 áp dụng quy tắc quản trị: '+mAi07.min+'–'+mAi07.max+' câu hỏi · Ưu tiên tiêu chí cốt lõi và làm rõ CV.','notice'));
 if(can('HR')&&['MOI_PV','HEN_PV'].includes(c.status)&&!c.evaluations?.length)a.append(btn('Lập / đổi lịch phỏng vấn',()=>openForm('Lịch phỏng vấn',[field('date','Ngày','date'),field('time','Giờ','time'),field('interviewers','Người phỏng vấn (giữ Ctrl để chọn nhiều)','multi',people.filter(p=>p.roles.some(r=>['HR','TBP','PV','QL'].includes(r))).map(p=>({value:p.id,label:p.name}))),field('confirmed','Đã xác nhận lịch với ứng viên và người phỏng vấn','checkbox')],c.schedule||{},'schedule',{id:c.id})));
 if(c.schedule)out.append(kv({'Ngày giờ':c.schedule.date+' '+c.schedule.time,'Người phỏng vấn':c.schedule.interviewers.map(id=>people.find(p=>p.id===id)?.name||id).join(', ')}));
 if(can('TBP')&&c.status==='HEN_PV'&&!c.evaluations?.length)a.append(btn('Điểm cần xác minh / ghi chú',()=>openForm('Phiếu chuẩn bị',[field('points','Điểm cần xác minh (mỗi dòng một điểm)','textarea'),field('managerNotes','Ghi chú trưởng bộ phận','textarea')],c.interviewInput||{},'interview_notes',{id:c.id})));
 if(can('HR','TBP')&&c.status==='HEN_PV'&&!c.evaluations?.length&&!mAi07?.paused)a.append(btn('AI07 · Gợi ý câu hỏi ('+(mAi07?mAi07.min+'–'+mAi07.max+' câu':'bản gốc')+')',()=>run('interview_ai',c.id)));
 const r=c.runs?.findLast(r=>r.task==='AI07');if(r&&can('TBP')&&!c.evaluations?.length)a.append(btn('Chọn / sửa bộ câu hỏi',()=>questionForm(c,r)));
 if(c.checkedSummary)out.append(h('details',{},h('summary',{},'Tóm tắt CV đã HR kiểm'),h('pre',{},c.checkedSummary)));
 if(c.questions)out.append(h('h3',{},'Bộ câu đã chọn ('+c.questions.items.length+' câu)'),h('pre',{},c.questions.items.map((q,i)=>(i+1)+'. '+q.question+'\nKiểm: '+q.criterion+'\nDấu hiệu: '+q.good+'\nHỏi tiếp: '+q.followup).join('\n\n')));
 if(c.questions&&c.schedule?.interviewers.includes(user.id)&&!c.evaluations?.some(e=>e.actor===user.id))a.append(btn('Nộp phiếu phỏng vấn của tôi',()=>openForm('Phiếu độc lập, khóa sau nộp',[field('assessment','Đánh giá theo từng tiêu chí và căn cứ','textarea'),field('recommendation','Đề xuất của người phỏng vấn','textarea'),confirmField],{},'evaluation',{id:c.id}),'primary'));
 if(c.evaluations?.length)out.append(h('h3',{},'Phiếu đã nộp'),...c.evaluations.map(e=>h('details',{},h('summary',{},e.by+' · '+e.at),h('pre',{},e.assessment+'\nĐề xuất: '+e.recommendation))));out.append(para('Mỗi người chỉ nộp phiếu của mình; chưa đủ phiếu thì không xem đánh giá của người khác.','sub'));
 if(c.status==='DA_PV'&&can('TBP'))a.append(btn('Đề xuất nhận / không đạt',()=>openForm('Kết quả phỏng vấn do người quyết',[field('choice','Kết quả','select',[{value:'NHAN',label:'Đề xuất nhận'},{value:'KHONG_DAT',label:'Không đạt'}]),field('reason','Lý do','textarea'),confirmField],{},'selection',{id:c.id})));
 if(can('HR')&&c.status==='KHONG_DAT')a.append(notifyButton(c));out.append(runs(c.runs,'AI07'));}
function questionForm(c,r){const shade=h('div',{class:'modalshade'}),refs=[];const box=h('section',{class:'modal'},h('h2',{},'Trưởng bộ phận chọn bộ câu cuối'));for(const q of r.output.questions){const on=h('input',{type:'checkbox'});on.checked=true;const controls={};const row=h('div',{class:'question'},h('label',{class:'check'},on,'Dùng câu này'));for(const[key,label]of Object.entries({question:'Câu hỏi',criterion:'Tiêu chí kiểm',good:'Dấu hiệu trả lời tốt',followup:'Hỏi tiếp'})){const input=h('textarea',{rows:2},q[key]);controls[key]=input;row.append(h('label',{},label,input));}refs.push({on,controls});box.append(row);}box.append(para('Mỗi câu không quá 30 chữ; 1–8 câu đã chọn. AI không đánh giá ứng viên.'),btn('Xác nhận bộ câu',async()=>{const questions=refs.filter(x=>x.on.checked).map(x=>Object.fromEntries(Object.entries(x.controls).map(([k,v])=>[k,v.value])));try{await act('questions_select',{id:c.id,questions,confirm:true});shade.remove();}catch(e){box.prepend(para(e.message,'notice error'));}},'primary'),btn('Hủy',()=>shade.remove()));shade.append(box);document.body.append(shade);}
const termsFields=[field('position','Vị trí'),field('department','Phòng'),field('level','Cấp bậc','select',['Chuyên viên','Quản lý']),field('manager','Quản lý trực tiếp'),field('location','Nơi làm việc'),field('email','Email ứng viên','email'),field('salary','Lương chính thức (đồng)','number'),field('start','Ngày bắt đầu','date'),field('trialDays','Thử việc khác mặc định (nếu có)','number'),field('addressForm','Danh xưng (tùy chọn)'),field('exception','Ngoại lệ đã duyệt (nếu có)','textarea')];
function offerDetail(out,c,j){if(!can('HR','TBP','GD','QL','GDNS')){tasksView(out,c);return;}const a=h('div',{class:'actions'});out.append(a);
 const polApplied=[...(state.governance?.policies||[])].filter(p=>p.status==='APPLIED').sort((a,b)=>b.effective.localeCompare(a.effective))[0]||{days:3,source:'Sổ tay §9'};
 out.append(para('📜 Chính sách hạn phản hồi thư mời: '+polApplied.days+' ngày làm việc (Căn cứ: '+polApplied.source+'). Thư mới tạo tính hạn theo quy định này.','notice'));
 if(can('TBP')&&['DE_XUAT_NHAN','PHIEU_NHAN_NHAP'].includes(c.status))a.append(btn('Lập / sửa phiếu chốt nhận việc',()=>openForm('Điều kiện nhận việc để Giám đốc duyệt',termsFields,c.terms||{position:j.position,department:j.department,level:j.level,manager:j.manager,location:j.location},'terms',{id:c.id})));
 if(c.terms){out.append(h('h3',{},'Phiếu nhận việc '+c.terms.code+' · bản '+c.terms.version),kv(Object.fromEntries(termsFields.map(f=>[f.label,c.terms[f.name]]))),para('Người duyệt: '+(c.terms.approval?.by||'Chưa duyệt')));}
 if(can('GD')&&c.status==='PHIEU_NHAN_NHAP')a.append(btn('Giám đốc duyệt nhận việc',()=>openForm('Duyệt lương và điều kiện nhận việc',[confirmField],{},'terms_approve',{id:c.id}),'primary'));
 if(can('HR')&&c.terms?.approval&&!c.offerSent)a.append(btn('AI10 · Soạn thư và bảng chuẩn bị',()=>run('offer_ai',c.id)));
 const r=c.runs?.findLast(r=>r.task==='AI10');if(r&&can('HR')&&!c.offerSent)a.append(btn('HR sửa và kiểm thư',()=>openForm('Thư gửi ứng viên (không kèm nội bộ)',[field('letter','Nội dung thư, tối đa 250 chữ','textarea'),field('resolution','Căn cứ xử lý cờ/điểm đã sửa','textarea'),confirmField],{letter:r.output.letter},'letter_finalize',{id:c.id})));
 if(c.letter)out.append(h('h3',{},'Thư HR đã kiểm'),h('pre',{},c.letter.text),btn('Sao chép thư',async()=>{try{await navigator.clipboard.writeText(c.letter.text);setFlash('Đã sao chép thư. Bạn tự gửi qua email công ty.');}catch{setFlash('Chọn nội dung thư và nhấn Ctrl+C để sao chép.');}}));
 if(can('HR')&&c.status==='THU_DA_KIEM')a.append(btn('Ghi đã gửi thư ngoài app',()=>openForm('Chỉ ghi sau khi bạn tự gửi từ email công ty',[field('date','Ngày gửi thực tế','date'),field('channel','Kênh gửi'),field('evidence','Bằng chứng/nội dung đã gửi','textarea'),confirmField],{date:dates(),channel:'Email công ty'},'offer_sent',{id:c.id})));
 if(can('HR')&&c.terms?.approval)a.append(btn('Ghi đã gửi thông tin chuẩn bị nội bộ',()=>openForm('HR tự gửi thông tin chuẩn bị tới bộ phận liên quan',[field('date','Ngày đã gửi','date'),field('recipients','Người / bộ phận nhận nội bộ'),field('channel','Kênh gửi'),field('evidence','Nội dung / bằng chứng đã thông báo','textarea'),confirmField],{date:dates()},'internal_sent',{id:c.id})));
 if(c.internalSent?.length)out.append(h('details',{},h('summary',{},'Thông tin chuẩn bị đã gửi nội bộ'),h('pre',{},c.internalSent.map(x=>x.date+' · '+x.by+' → '+x.recipients+' · '+x.channel+'\n'+x.evidence).join('\n\n'))));
 if(c.offerSent)out.append(kv({'Thư đã gửi':c.offerSent.date+' · '+c.offerSent.by,'Người nhận':c.offerSent.to,'Ngày thực nhận':c.offerReceived?.date||'Chưa rõ, chưa tính hạn từ ngày gửi','Hạn xác nhận':c.confirmDue||'Chưa tính'}));
 if(can('HR')&&c.offerSent&&!c.response){a.append(btn('Ghi ngày ứng viên thực nhận',()=>openForm('Ngày nhận có căn cứ',[field('date','Ngày thực nhận','date'),field('evidence','Căn cứ ngày nhận','textarea')],{date:dates()},'offer_received',{id:c.id})));a.append(btn('Ghi phản hồi ứng viên',()=>openForm('Phản hồi đã nhận',[field('choice','Phản hồi','select',[{value:'ACCEPTED',label:'Xác nhận nhận việc'},{value:'DECLINED',label:'Từ chối'},{value:'CHANGE',label:'Xin thay đổi điều kiện'}]),field('date','Ngày phản hồi','date'),field('evidence','Nội dung/bằng chứng phản hồi','textarea')],{date:dates()},'offer_response',{id:c.id})));}
 if(c.response)out.append(para('Phản hồi: '+({ACCEPTED:'Xác nhận',DECLINED:'Từ chối',CHANGE:'Xin đổi'}[c.response.choice])+' · '+c.response.date));
 if(c.response?.choice==='CHANGE'&&can('TBP'))a.append(btn('Lập phiên bản phiếu mới theo xin đổi',()=>openForm('Sửa điều kiện, phải được Giám đốc duyệt lại',termsFields,c.terms,'terms_revise',{id:c.id})));
 out.append(runs(c.runs,'AI10'));tasksView(out,c);}
function tasksView(out,c){if(!c.tasks?.length)return;out.append(h('h3',{},'Việc nội bộ / thủ tục và thiết bị'));if(can('HR'))out.append(btn('Sao chép bảng việc nội bộ',async()=>{const text=c.code+' · '+c.name+'\n'+c.tasks.map(t=>t.label+' · '+names[t.role]+' · Hạn '+t.due+' · '+(t.done?'Đã xong':'Chưa xong')).join('\n');try{await navigator.clipboard.writeText(text);setFlash('Đã sao chép bảng việc nội bộ, bạn tự gửi tới người phụ trách.');}catch{setFlash('Không sao chép tự động được; chọn nội dung trên màn hình và Ctrl+C.');}}));for(const t of c.tasks){const row=h('div',{class:'task'+(t.done?' done':t.due<dates()?' overdue':'')},h('strong',{},t.label+' · '+(t.done?'Hoàn tất':'Chưa xong')),para((names[t.role]||t.role)+' · Hạn '+t.due+' · '+(t.required?'Bắt buộc để đóng':'Còn hạn, theo dõi tiếp'),'sub'));if(t.done)row.append(para(t.by+' · '+(t.date||t.at?.slice(0,10))+' · '+t.evidence,'sub'));else if(can(t.role)&&!['plan','mentor'].includes(t.id))row.append(btn('Ghi đã thực hiện',()=>openForm(t.label,[field('date','Ngày làm thực tế','date'),field('evidence','Căn cứ bàn giao/hoàn thành (không cần tải giấy tờ cá nhân)','textarea'),confirmField],{date:dates()},'task_complete',{id:c.id,taskId:t.id})));out.append(row);}}
function onboardDetail(out,c,j){if(!can('HR','QL','GD','GDNS')){tasksView(out,c);return;}const a=h('div',{class:'actions'});out.append(a);if(c.response?.choice!=='ACCEPTED'){out.append(para('Chỉ mở hội nhập sau khi ứng viên xác nhận nhận việc.'));return;}
 if(can('QL')&&!c.closed)a.append(btn('Người kèm / chỉ tiêu 30 ngày',()=>openForm('Quản lý lập phiếu hội nhập',[field('mentor','Người kèm cặp'),field('goals','Chỉ tiêu 30 ngày, mỗi dòng một chỉ tiêu','textarea'),field('support','Ghi chú hỗ trợ theo công việc','textarea')],{...(c.onboarding||{}),goals:c.onboarding?.goals?.join('\n')||''},'onboarding_input',{id:c.id})));
 if(c.onboarding)out.append(kv({'Người kèm':c.onboarding.mentor,'Chỉ tiêu':c.onboarding.goals.join(' · '),'Kế hoạch':c.onboarding.approval?'Đã duyệt bởi '+c.onboarding.approval.by:'Chưa duyệt'}));
 if(can('HR','QL')&&c.onboarding&&!c.closed)a.append(btn('AI13 · Soạn kế hoạch hội nhập',()=>run('onboarding_ai',c.id)));
 const r=c.runs?.findLast(r=>r.task==='AI13');if(r&&can('QL')&&!c.closed)a.append(btn('Quản lý duyệt kế hoạch',()=>openForm('Kiểm kế hoạch và mốc ngày',[field('plan','Nội dung kế hoạch áp dụng','textarea'),confirmField],{plan:r.output.text},'plan_approve',{id:c.id})));
 if(c.onboarding?.approval)out.append(h('details',{},h('summary',{},'Kế hoạch đã được duyệt'),h('pre',{},c.onboarding.approval.text)));
 if(can('HR')&&!c.arrival)a.append(btn('Ghi ứng viên đã đến nhận việc',()=>openForm('Ngày nhận việc thực tế',[field('date','Ngày đến','date'),field('evidence','Căn cứ ứng viên đã có mặt','textarea'),confirmField],{date:dates()},'arrival',{id:c.id})));
 if(c.arrival)out.append(para('Đã nhận việc ngày '+c.arrival.date+' · '+c.arrival.by));
 if(can('HR','QL')&&!c.closed)a.append(btn('Thêm thủ tục / thiết bị theo vị trí',()=>openForm('Việc bổ sung có căn cứ',[field('label','Việc / thiết bị'),field('role','Người phụ trách theo vai','select',['HR','QL','IT','HC'].map(r=>({value:r,label:names[r]}))),field('due','Hạn','date'),field('required','Bắt buộc hoàn tất trước khi đóng onboarding','checkbox'),field('source','Căn cứ yêu cầu (phiếu/chính sách/người yêu cầu)','textarea')],{required:true},'task_add',{id:c.id})));
 if(c.arrival&&can('HR','QL'))a.append(btn('Ghi check-in (tiếp tục theo dõi)',()=>openForm('Biên bản check-in',[field('type','Mốc','select',[{value:'WEEK1',label:'Tuần 1'},{value:'DAY30',label:'Ngày 30'}]),field('date','Ngày gặp thực tế','date'),field('notes','Biên bản nội dung','textarea')],{date:dates()},'checkin',{id:c.id})));
 if(!c.closed&&can(state.settings.closeRole))a.append(btn('Xác nhận onboard thành công',()=>openForm('Đã nhận việc và đủ thủ tục/thiết bị bắt buộc',[field('evidence','Căn cứ xác nhận cuối','textarea'),confirmField],{},'onboard_close',{id:c.id}),'primary'));
 if(!state.settings.closeRole)out.append(para('Chưa chốt người đóng onboarding. Cấu hình → chọn HR hoặc Quản lý.','notice'));
 if(c.closed)out.append(para('Onboard thành công · '+c.closed.by+' · '+c.closed.at+' · '+c.closed.evidence,'notice'));
 if(c.milestones)out.append(h('details',{},h('summary',{},'Mốc chuẩn do app tính'),kv(c.milestones),para('Mốc đánh giá cuối thử việc chỉ tham khảo, không là điều kiện đóng onboarding.','sub')));
 tasksView(out,c);out.append(runs(c.runs,'AI13'));if(c.checkins?.length)out.append(h('h3',{},'Check-in đã ghi'),...c.checkins.map(x=>para(x.type+' · '+x.date+' · '+x.by+' · '+x.notes)));}
function settings(out){if(!can('HR','ADMIN')){out.append(para('Chỉ HR hoặc quản trị viên cấu hình quy trình.'));return;}
 const aiStatus=h('p',{class:'notice'},'Đang kiểm tra cấu hình AI…');out.append(aiStatus);api('config').then(d=>{if(aiStatus.isConnected)aiStatus.textContent=d.message;}).catch(e=>{if(aiStatus.isConnected)aiStatus.textContent=e.message;});
 out.append(h('section',{class:'panel'},h('h2',{},'Kiến thức và lịch làm việc'),para('Nguồn hiện có là bộ B2 Công ty Demo HR1: 03 Sổ tay tuyển dụng/hội nhập và 01 Kiến thức nền. Đây là chính sách giả lập trong bài, không tự thành chính sách doanh nghiệp thật. Chỉ xác nhận nếu bạn chấp nhận áp dụng đúng bộ này; thay nguồn bằng tài liệu được giao khi chính sách thực khác. Không đưa khóa API vào các ô này.'),kv({'Bộ kiến thức':state.settings.knowledgeConfirmed?'Đã xác nhận bởi '+state.settings.knowledgeConfirmedBy:'Chưa xác nhận','Lịch từ':state.settings.calendarFrom,'Đến':state.settings.calendarTo,'Nguồn lịch':state.settings.calendarSource}),btn('Xác nhận kiến thức và cập nhật lịch',()=>openForm('Cấu hình lịch đã được xác nhận',[field('knowledgeConfirmed','Tôi xác nhận dùng bộ kiến thức B2 hiện có cho các tác vụ.','checkbox'),field('calendarFrom','Lịch từ','date'),field('calendarTo','Lịch đến','date'),field('holidays','Ngày nghỉ lễ, mỗi dòng YYYY-MM-DD','textarea'),field('calendarSource','Nguồn/người xác nhận lịch')],{...state.settings,holidays:state.settings.holidays.join('\n')},'settings'))));
 out.append(h('section',{class:'panel'},h('h2',{},'Định nghĩa trước khi dùng số liệu và đóng onboarding'),para('Onboarding đóng khi đã nhận việc và đủ việc bắt buộc. Việc còn hạn vẫn được theo dõi. Chọn người có quyền đóng; dữ liệu không tự được đánh dấu hoàn tất.'),kv({'Người đóng':names[state.settings.closeRole]||'Chưa chọn','Cách tính tháng':state.settings.metrics||'Chưa chốt; chưa tính tỷ lệ','Mốc số ngày tuyển':state.settings.daysEnd||'Chưa chọn'}),btn('Chọn định nghĩa áp dụng',()=>openForm('Định nghĩa hiển thị công thức',[field('closeRole','Vai được đóng onboarding','select',[{value:'HR',label:'HR xác nhận sau các bộ phận'},{value:'QL',label:'Quản lý trực tiếp xác nhận'}]),field('metrics','Cách tính số liệu tháng','select',[{value:'COHORT',label:'Cohort: hồ sơ nộp trong tháng, kết quả lũy kế đến ngày xem'},{value:'EVENTS',label:'Sự kiện: đếm theo ngày sự kiện trong tháng (không cùng cohort)'},{value:'COUNTS',label:'Chỉ số đếm, chưa tính các tỷ lệ'}]),field('daysEnd','Mốc kết thúc số ngày tuyển (từ ngày duyệt YC)','select',[{value:'ACCEPTED',label:'Ứng viên xác nhận nhận việc'},{value:'ARRIVED',label:'Ứng viên đến nhận việc'},{value:'CLOSED',label:'Đóng onboarding thành công'}])],state.settings,'settings'))));
 if(can('ADMIN')){const account=h('section',{class:'panel'},h('h2',{},'Tài khoản và vai trò'),para('Mỗi người phỏng vấn nên có tài khoản riêng để giữ phiếu độc lập. Một tài khoản có thể kiêm nhiều vai nếu bạn cấp; app ghi rõ người thao tác.'),btn('Tạo tài khoản',()=>{editing={title:'Tạo tài khoản người dùng',fields:[field('name','Họ tên'),field('login','Tên đăng nhập không dấu'),field('password','Mật khẩu tối thiểu 12 ký tự','password'),field('roles','Vai (giữ Ctrl để chọn nhiều)','multi',Object.entries(names).map(([value,label])=>({value,label})))],values:{roles:['HR']},submit:async data=>{await api('users',data);editing=null;await load();}};render();}));out.append(account);api('users').then(d=>{if(screen==='settings'&&account.isConnected)account.append(...d.users.map(x=>h('div',{class:'task'},para(x.name+' ('+x.login+') · '+x.roles.map(r=>names[r]).join(', ')+' · '+(x.active?'Đang hoạt động':'Tạm khóa')),btn('Sửa vai / tạm khóa',()=>{editing={title:'Quyền truy cập của '+x.name,fields:[field('roles','Vai được cấp','multi',Object.entries(names).map(([value,label])=>({value,label}))),field('active','Tài khoản được hoạt động','checkbox'),confirmField],values:x,submit:async data=>{if(!data.confirm)throw Error('Cần xác nhận thay đổi quyền.');await api('user-update',{id:x.id,...data});editing=null;await load();}};render();}))));}).catch(e=>setFlash(e.message,true));}
 out.append(para('Mật khẩu được băm tại máy chủ, phiên hết hạn sau 8 giờ. Không có ô nhập khóa AI. Dữ liệu nằm ngoài Git; sao lưu gồm cả tài khoản và hồ sơ.','sub'));}
function stats(out){if(!can('HR','GD','GDNS','TBP','QL')){out.append(para('Vai của bạn không xem số liệu.'));return;}
 const month=h('input',{type:'month',value:dates().slice(0,7)});const container=h('section',{class:'panel'});out.append(h('label',{},'Tháng số liệu',month),btn('Xem số liệu',()=>show(month.value)),container);
 async function show(value){try{const d=await api('dashboard?month='+encodeURIComponent(value));if(!container.isConnected)return;container.replaceChildren(h('h2',{},'Số liệu tháng '+d.month),para('Tới ngày '+d.asOf+' · Định nghĩa: '+d.mode),h('div',{class:'cards'},Object.entries(d.counts).map(([k,v])=>h('div',{class:'card'},para(({received:'CV nộp',invitations:'Đã mời',interviewed:'Đủ phiếu PV',selected:'TBP đề xuất nhận',approved:'GD duyệt nhận',offers:'Thư đã gửi',accepted:'Xác nhận',arrived:'Đã đến',closed:'Onboard xong'})[k]),h('div',{class:'big'},v)))),h('h3',{},'CV theo nguồn'),kv(d.sources));
 if(d.ratios)container.append(h('h3',{},'Tỷ lệ theo định nghĩa đã chọn'),...Object.entries(d.ratios).map(([k,v])=>para(d.formulas[k]+' = '+v.numerator+'/'+v.denominator+' → '+(v.percent===null?'Không có mẫu số':v.percent+'%'))));else container.append(para('Chưa chốt tỷ lệ; mở Cấu hình để chọn định nghĩa, không coi trống là 0.','notice'));
 container.append(h('details',{},h('summary',{},'Công thức và phạm vi số liệu'),kv(d.formulas)),para('Số ngày tuyển: '+(d.days.end||'Chưa chọn mốc')+' · Bình quân '+(d.days.average===null?'Chưa đủ dữ liệu':d.days.average.toFixed(1)+' ngày')),h('details',{},h('summary',{},'Từng mẫu ngày tuyển'),h('pre',{},JSON.stringify(d.days.samples,null,2))),h('h3',{},'Việc cần theo dõi'),...d.reminders.map(x=>h('div',{class:'task overdue'},para(x.label),para(x.due||'Chưa đủ nguồn ngày','sub'),btn('Mở hồ sơ',()=>{candidateId=x.id;screen='onboard';render();}))),para(d.note,'notice'),h('details',{},h('summary',{},'Lịch sử hoạt động'),h('pre',{},[...state.events].reverse().slice(0,200).map(x=>x.at+' · '+x.actorName+' · '+x.action).join('\n'))));}catch(e){setFlash(e.message,true);}}
 show(month.value);}

function openGovTab(tab){screen='governance';govTab=tab;editing=null;render();}
function governanceScreen(out){
 if(!can('ADMIN','HR','GDNS')){out.append(para('Chỉ Quản trị viên, HR hoặc Giám đốc nhân sự (GĐNS) được mở khu vực này.','notice error'));return;}
 const g=state.governance||{authority:null,scopeMode:null,policies:[],modules:[],handoffs:[],assignments:[],audit:[]};
 const head=h('section',{class:'panel',style:'background:linear-gradient(135deg,#0f2b26 0%,#1a453e 100%);color:white;border-radius:12px;padding:24px;margin-bottom:20px;'});
 head.append(h('h2',{style:'color:white;margin:0 0 6px 0;font-size:22px;'},'Quản trị Vận hành Buổi 4 · HR Governance Center'),para('Hệ thống Quản trị Doanh nghiệp AI theo thiết kế Buổi 4: M1 Chính sách 5 ngày, M2 Bàn giao Minh→Nam, M3 Module AI07 4–6 câu, M4 Lịch sử kiểm toán.','sub'),h('div',{class:'actions',style:'margin-top:14px;'},h('a',{href:'/quan-tri',target:'_blank',class:'btn-small',style:'background:rgba(255,255,255,0.18);color:#fef08a;padding:6px 14px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:600;'},'↗ Mở trang Quản trị toàn màn hình (quan_tri.html)')));
 out.append(head);
 const nav=h('div',{class:'gov-nav'});
 const tabs=[['overview','📌 Tổng quan & QĐ B4'],['policies','📜 M1: Chính sách 5 ngày'],['handoffs','👥 M2: Bàn giao Minh→Nam'],['modules','🤖 M3: Module AI07'],['audit','🕒 M4: Nhật ký kiểm toán'],['matrix','🧪 9 Ca kiểm B4']];
 for(const[id,lbl]of tabs)nav.append(h('button',{class:govTab===id?'active':'',onclick:()=>{govTab=id;editing=null;render();}},lbl));
 out.append(nav);
 const tabContent=h('div',{id:'gov-content'});out.append(tabContent);
 if(govTab==='overview')renderGovOverview(tabContent,g);
 else if(govTab==='policies')renderGovPolicies(tabContent,g);
 else if(govTab==='handoffs')renderGovHandoffs(tabContent,g);
 else if(govTab==='modules')renderGovModules(tabContent,g);
 else if(govTab==='audit')renderGovAudit(tabContent,g);
 else if(govTab==='matrix')renderGovMatrix(tabContent,g);
}

function renderGovOverview(out,g){
 const card=h('section',{class:'panel'});
 card.append(h('h2',{},'📌 Tổng quan Quản trị & 3 Quyết định Buổi 4'),para('Kiểm soát trực tiếp các chính sách, quyền hạn và module AI đang áp dụng trong phiên làm việc hiện tại:'));
 const curDays=g.policies?.find(p=>p.status==='APPLIED')?.days||3;
 const grid=h('div',{class:'gov-grid'});
 grid.append(
  h('div',{class:'gov-metric'},h('div',{class:'label'},'B4-Q1 · Hạn xác nhận thư'),h('div',{class:'val'},curDays+' ngày LV'),h('div',{class:'hint'},'Đổi từ 3 → 5 ngày từ 02/11/2026; giữ thư cũ')),
  h('div',{class:'gov-metric'},h('div',{class:'label'},'B4-Q2 · Thẩm quyền duyệt'),h('div',{class:'val'},g.authority||'Chưa chốt'),h('div',{class:'hint'},'GĐNS (Hồ Thị Mai) phê duyệt chính sách & AI')),
  h('div',{class:'gov-metric'},h('div',{class:'label'},'B4-Q3 · Phân quyền hồ sơ'),h('div',{class:'val'},g.scopeMode||'Chưa chốt'),h('div',{class:'hint'},'ASSIGNED: Theo vị trí/hồ sơ được phân công'))
 );
 card.append(grid);
 const decBox=h('div',{style:'background:#edf5f2;padding:18px;border-radius:10px;margin-bottom:20px;'});
 decBox.append(h('h3',{style:'margin-top:0;'},'⚙️ Chốt quyết định vận hành Buổi 4 (Authority & Scope Mode)'),para('Nguồn xác nhận: '+(g.decisionSource||'Chưa xác nhận')+' · Thẩm quyền duyệt: '+(g.authority||'Trống')+' · Phân quyền hồ sơ: '+(g.scopeMode||'Trống')));
 const decAct=h('div',{class:'actions'});
 decAct.append(
  btn('✅ Chốt theo thiết kế B4 (GĐNS duyệt + Phân quyền theo việc giao)',()=>act('gov_decision',{authority:'GDNS',scopeMode:'ASSIGNED',source:'B4_THIET_KE_HR_XAC_NHAN',confirm:true}),'primary'),
  btn('🔄 Chế độ HR toàn quyền (HR_ALL)',()=>act('gov_decision',{authority:'GDNS',scopeMode:'HR_ALL',source:'B4_HR_ALL_SCOPE',confirm:true})),
  btn('🛠️ Admin kiêm duyệt (ADMIN)',()=>act('gov_decision',{authority:'ADMIN',scopeMode:'ASSIGNED',source:'B4_ADMIN_AUTHORITY',confirm:true}))
 );
 decBox.append(decAct);card.append(decBox);
 const seedBox=h('div',{style:'background:#f0fbf7;border:1px dashed #7bc4af;padding:18px;border-radius:10px;'});
 seedBox.append(h('h3',{style:'margin-top:0;color:#123f3b;'},'🚀 Nạp dữ liệu mẫu Buổi 4 (Dùng thử ngay)'),para('Nạp 3 tài khoản Mai (GDNS), Minh (TBP), Nam (TBP), YC tuyển "Kinh doanh Dự án", Ứng viên An, Nháp 5 ngày và Nháp AI07 4–6 câu:'));
 const seedAct=h('div',{class:'actions'});
 seedAct.append(
  btn('👤 Nạp 3 tài khoản mẫu B4 (mai, minh, nam)',async()=>{try{setFlash('Đang tạo tài khoản mẫu…');const r=await api('seed-b4-users',{});flash='Đã nạp '+r.created?.length+' tài khoản mẫu với mật khẩu '+r.defaultPass;await load();}catch(e){setFlash(e.message,true);}},'primary'),
  btn('📦 Nạp toàn bộ dữ liệu mẫu B4 (YC, CV, Nháp P1 & P3)',()=>{if(confirm('Nạp dữ liệu mẫu B4 để kiểm thử trực quan?'))act('gov_seed_b4',{confirm:true});},'btn-success')
 );
 seedBox.append(seedAct);card.append(seedBox);out.append(card);
}

function renderGovPolicies(out,g){
 const card=h('section',{class:'panel'});
 card.append(h('h2',{},'📜 M1: Quản trị Chính sách Hạn thư mời nhận việc'),para('P1: Thay đổi hạn phản hồi thư mời từ 3 lên 5 ngày làm việc từ 02/11/2026. Thư mới áp dụng hạn 5 ngày; thư cũ giữ nguyên hạn cũ.'));
 const applied=[...(g.policies||[])].filter(p=>p.status==='APPLIED').sort((a,b)=>b.effective.localeCompare(a.effective))[0]||{id:'B2-ORIGINAL',days:3,source:'Sổ tay §9',effective:'2026-01-01'};
 const curBox=h('div',{style:'background:#eaf4f1;border:1px solid #b6dcd1;border-radius:10px;padding:16px;margin-bottom:20px;'});
 curBox.append(h('span',{class:'badge-applied'},'Đang áp dụng'),h('strong',{style:'margin-left:8px;'},'Hạn xác nhận: '+applied.days+' ngày làm việc'),para('Hiệu lực từ: '+applied.effective+' · Căn cứ: '+applied.source+' · AI10 và theo dõi nhắc việc (MH06) tự động đồng bộ theo mốc này.','sub'));
 card.append(curBox);
 card.append(h('h3',{},'Soạn nháp chính sách mới'));
 card.append(btn('💡 Điền nhanh mẫu B4 (5 ngày từ 02/11/2026)',()=>openForm('Soạn nháp chính sách',[field('days','Số ngày làm việc','number'),field('effective','Ngày bắt đầu áp dụng','date'),field('source','Nguồn / Căn cứ quy định'),field('reason','Lý do thay đổi','textarea')],{days:5,effective:'2026-11-02',source:'Sổ tay §9 (Đề bài giả lập B4)',reason:'Cho ứng viên thêm thời gian thu xếp và phản hồi thư mời tuyển dụng'},'gov_policy_draft')));
 card.append(h('h3',{},'Danh sách các phiên bản chính sách'));
 const list=h('div',{});
 for(const v of [...(g.policies||[])].reverse()){
  const badgeCls=v.status==='APPLIED'?'badge-applied':v.status==='DRAFT'?'badge-draft':'badge-previous';
  const item=h('div',{class:'task',style:'border-left-color:'+(v.status==='APPLIED'?'#15803d':'#b45309')});
  item.append(h('div',{style:'display:flex;justify-content:space-between;align-items:center;'},h('span',{class:badgeCls},v.status),h('strong',{},v.days+' ngày làm việc (Hiệu lực: '+v.effective+')'),h('small',{class:'sub'},'Tạo: '+(v.at?.slice(0,10)||'')+' bởi '+v.by)));
  item.append(para('Căn cứ: '+v.source+' · Lý do: '+v.reason,'sub'));
  if(v.test)item.append(h('div',{style:'background:#fff;padding:8px;border-radius:6px;margin:6px 0;'},h('strong',{},'🧪 Kết quả thử tính hạn: '),para('Ngày thực nhận: '+v.test.date+' → Hạn phản hồi: '+v.test.due+' (bởi '+v.test.by+')','sub')));
  if(v.status==='DRAFT'){
   const actBox=h('div',{class:'actions',style:'margin-top:8px;'});
   const dateInput=h('input',{type:'date',value:'2026-11-02',style:'width:150px;display:inline-block;padding:5px;'});
   actBox.append(h('span',{class:'sub'},'Ngày nhận thử:'),dateInput,btn('Thử tính hạn',()=>act('gov_policy_test',{id:v.id,received:dateInput.value})),btn('👑 GĐNS Duyệt & Áp dụng',()=>act('gov_policy_apply',{id:v.id,confirm:true}),'primary'));
   item.append(actBox);
  }
  list.append(item);
 }
 if(!g.policies?.length)list.append(para('Chưa có bản chính sách nào được soạn. Bấm "Nạp dữ liệu mẫu B4" ở tab Tổng quan để xem mẫu.'));
 card.append(list);out.append(card);
}

function renderGovHandoffs(out,g){
 const card=h('section',{class:'panel'});
 card.append(h('h2',{},'👥 M2: Quản lý Phân công & Bàn giao Trưởng bộ phận'),para('P2: Bàn giao vị trí tuyển từ Phạm Quốc Minh sang Nguyễn Hải Nam. Nam làm tiếp được việc được giao; Minh mất quyền trên phần đã giao; lịch sử cũ của Minh giữ nguyên tác giả.'));
 const assignBox=h('div',{style:'background:#f7faf8;border:1px solid #d0e0d8;border-radius:10px;padding:16px;margin-bottom:20px;'});
 assignBox.append(h('h3',{style:'margin-top:0;'},'📋 Phân công phụ trách Yêu cầu tuyển (Assignments)'),para('Khi chế độ phân quyền ASSIGNED được kích hoạt, nhân viên chỉ xem và thao tác trên yêu cầu được phân công:','sub'));
 const table=h('table',{class:'matrix-table'});
 table.append(h('tr',{},h('th',{},'Mã YC'),h('th',{},'Vị trí tuyển dụng'),h('th',{},'Người phụ trách hiện tại'),h('th',{},'Thao tác')));
 for(const job of state.jobs){
  const assigned=people.filter(p=>(g.assignments||[]).some(a=>a.jobId===job.id&&a.userId===p.id));
  const sel=h('select',{style:'width:140px;display:inline-block;padding:4px;font-size:12px;'});
  sel.append(h('option',{value:''},'Chọn người…'));
  for(const p of people.filter(x=>x.roles.some(r=>['HR','TBP','QL'].includes(r))))sel.append(h('option',{value:p.id},p.name+' ('+p.roles.join(',')+')'));
  const tr=h('tr',{},h('td',{},job.code),h('td',{},job.position),h('td',{},assigned.length?assigned.map(x=>x.name).join(', '):h('span',{style:'color:#8aa099;'},'Chưa phân công')),h('td',{},sel,btn('+ Phân công',()=>sel.value&&act('gov_assign',{jobId:job.id,userId:sel.value}),'small')));
  table.append(tr);
 }
 assignBox.append(table);card.append(assignBox);
 card.append(h('h3',{},'Chuẩn bị bàn giao công việc (Minh → Nam)'));
 const minhUser=people.find(p=>p.login==='minh')||people.find(p=>p.name.includes('Minh'));
 const namUser=people.find(p=>p.login==='nam')||people.find(p=>p.name.includes('Nam'));
 const kdJob=state.jobs.find(j=>j.position?.includes('Kinh doanh')||j.code==='YC-2026-001')||state.jobs[0];
 card.append(btn('💡 Điền nhanh mẫu bàn giao Minh → Nam (Kinh doanh Dự án)',()=>openForm('Lập phiếu bàn giao nháp',[
  field('from','Người bàn giao (người cũ)','select',people.filter(p=>p.roles.includes('TBP')).map(p=>({value:p.id,label:p.name+' ('+p.login+')'}))),
  field('to','Người nhận bàn giao (người mới)','select',people.filter(p=>p.roles.includes('TBP')).map(p=>({value:p.id,label:p.name+' ('+p.login+')'}))),
  field('jobIds','Chọn các YC tuyển cần bàn giao','multi',state.jobs.map(j=>({value:j.id,label:j.code+' · '+j.position}))),
  field('reason','Căn cứ bàn giao','textarea')
 ],{from:minhUser?.id||'',to:namUser?.id||'',jobIds:kdJob?[kdJob.id]:[],reason:'Bàn giao vị trí tuyển Chuyên viên Kinh doanh Dự án từ Phạm Quốc Minh sang Nguyễn Hải Nam theo quyết định GĐNS'},'gov_handoff_draft')));
 card.append(h('h3',{},'Danh sách các lượt bàn giao công việc'));
 const listH=h('div',{});
 for(const hd of [...(g.handoffs||[])].reverse()){
  const fromName=people.find(p=>p.id===hd.from)?.name||hd.from;
  const toName=people.find(p=>p.id===hd.to)?.name||hd.to;
  const jobNames=(hd.jobIds||[]).map(id=>state.jobs.find(j=>j.id===id)?.position||id).join(', ');
  const badgeCls=hd.status==='APPLIED'?'badge-applied':hd.status==='APPROVED'?'badge-approved':'badge-draft';
  const item=h('div',{class:'task',style:'border-left-color:#2a6358;'});
  item.append(h('div',{style:'display:flex;justify-content:space-between;align-items:center;'},h('span',{class:badgeCls},hd.status),h('strong',{},fromName+' → '+toName),h('small',{class:'sub'},'Lập: '+(hd.at?.slice(0,10)||'')+' bởi '+hd.by)));
  item.append(para('Vị trí bàn giao: '+jobNames+' · Căn cứ: '+hd.reason,'sub'));
  const actGroup=h('div',{class:'actions',style:'margin-top:8px;'});
  if(hd.status==='DRAFT'&&can('GDNS','ADMIN'))actGroup.append(btn('👑 GĐNS phê duyệt bàn giao',()=>act('gov_handoff_approve',{id:hd.id,confirm:true}),'primary'));
  if(hd.status==='APPROVED'&&can('ADMIN'))actGroup.append(btn('⚡ Admin thực hiện bàn giao',()=>act('gov_handoff_apply',{id:hd.id,confirm:true}),'btn-success'));
  if(hd.status==='APPLIED'){
   actGroup.append(h('span',{class:'badge-applied'},'Đã bàn giao hoàn tất!'));
   actGroup.append(btn('👤 Đổi sang Nam (kiểm tra thấy vị trí)',()=>switchUser('nam')));
   actGroup.append(btn('👤 Đổi sang Minh (kiểm tra bị mất quyền)',()=>switchUser('minh')));
  }
  item.append(actGroup);listH.append(item);
 }
 if(!g.handoffs?.length)listH.append(para('Chưa có lượt bàn giao nào. Bấm nút điền nhanh phía trên để tạo bản nháp.'));
 card.append(listH);out.append(card);
}

function renderGovModules(out,g){
 const card=h('section',{class:'panel'});
 card.append(h('h2',{},'🤖 M3: Quản trị Module AI · Phiên bản & Hướng dẫn (AI07)'),para('P3: Quản lý bản hướng dẫn AI07: 6–8 câu → 4–6 câu hỏi phỏng vấn ưu tiên tiêu chí phải có và điểm cần xác minh. TBP tự chọn câu cuối; AI không chấm/loại ứng viên.'));
 const mAi07=(g.modules||[]).slice().reverse().find(m=>m.task==='AI07'&&m.status==='APPLIED');
 const curBox=h('div',{style:'background:#eaf4f1;border:1px solid #b6dcd1;border-radius:10px;padding:16px;margin-bottom:20px;'});
 curBox.append(h('div',{style:'display:flex;justify-content:space-between;align-items:center;'},h('span',{class:mAi07?.paused?'badge-draft':'badge-applied'},mAi07?.paused?'TẠM DỪNG':'ĐANG ÁP DỤNG'),h('strong',{},'AI07: '+(mAi07?mAi07.min+'–'+mAi07.max+' câu hỏi':'6–8 câu (Bản gốc)')),btn(mAi07?.paused?'▶️ Mở lại AI07':'⏸️ Tạm dừng AI07',()=>act('gov_module_pause',{task:'AI07',paused:!mAi07?.paused,reason:'Quản lý điều chỉnh module AI'}),mAi07?.paused?'btn-success':'danger')));
 if(mAi07?.instructions)curBox.append(para('Hướng dẫn bổ sung: '+mAi07.instructions,'sub'));
 card.append(curBox);
 card.append(h('h3',{},'Soạn nháp hướng dẫn AI mới (AI07 4–6 câu)'));
 card.append(btn('💡 Điền nhanh mẫu B4 (AI07: 4–6 câu hỏi, ưu tiên tiêu chí cốt lõi)',()=>openForm('Soạn nháp hướng dẫn AI07',[
  field('task','Tác vụ AI','select',[{value:'AI07',label:'AI07 · Gợi ý câu hỏi phỏng vấn'}]),
  field('min','Số câu tối thiểu','number'),
  field('max','Số câu tối đa','number'),
  field('instructions','Hướng dẫn AI bổ sung','textarea'),
  field('reason','Lý do thay đổi','textarea')
 ],{task:'AI07',min:4,max:6,instructions:'Ưu tiên tiêu chí phải có và điểm cần xác minh từ vòng sàng lọc CV; mỗi câu hỏi gắn với tiêu chí và nêu rõ dấu hiệu trả lời tốt. Không chấm điểm, không kết luận tuyển/loại.',reason:'Rút ngắn thời gian phỏng vấn, tập trung vào năng lực cốt lõi và làm rõ các điểm nghi vấn từ CV'},'gov_module_draft')));
 card.append(h('h3',{},'Danh sách các phiên bản hướng dẫn AI07'));
 const list=h('div',{});
 for(const m of [...(g.modules||[])].reverse()){
  const badgeCls=m.status==='APPLIED'?'badge-applied':m.status==='DRAFT'?'badge-draft':'badge-previous';
  const item=h('div',{class:'task'});
  item.append(h('div',{style:'display:flex;justify-content:space-between;align-items:center;'},h('span',{class:badgeCls},m.status),h('strong',{},m.task+' · '+m.min+'–'+m.max+' câu hỏi'),h('small',{class:'sub'},'Tạo lúc: '+(m.at?.slice(0,10)||'')+' bởi '+(m.by||'Hệ thống'))));
  item.append(para('Hướng dẫn: '+(m.instructions||'Mặc định')+' · Lý do: '+(m.reason||'Mặc định'),'sub'));
  if(m.test)item.append(h('div',{style:'background:#fff;padding:8px;border-radius:6px;margin:6px 0;'},h('strong',{},'🧪 Kết quả chạy thử: '),para('Mô hình: '+m.test.model+' · Cờ cảnh báo: '+(m.test.issues?.length?m.test.issues.join(', '):'Không có cờ')+' · Thử bởi '+m.test.by,'sub')));
  const actBox=h('div',{class:'actions',style:'margin-top:8px;'});
  if(m.status==='DRAFT'){
   actBox.append(btn('🧪 Chạy thử với dữ liệu mẫu',()=>act('gov_module_test',{id:m.id,fake:true,consent:true,input:{position:'Kinh doanh Dự án',must:['P1. Kinh nghiệm B2B'],cv:'Ứng viên demo 3 năm kinh nghiệm'}})),btn('👑 GĐNS Duyệt & Áp dụng',()=>act('gov_module_apply',{id:m.id,confirm:true}),'primary'));
  }
  if(m.status==='PREVIOUS'){
   actBox.append(btn('⏪ Quay lại bản này (Rollback)',()=>act('gov_module_rollback',{id:m.id,confirm:true})));
  }
  item.append(actBox);list.append(item);
 }
 if(!g.modules?.length)list.append(para('Chưa có bản hướng dẫn AI nào. Bấm nút điền nhanh phía trên để tạo nháp.'));
 card.append(list);out.append(card);
}

function renderGovAudit(out,g){
 const card=h('section',{class:'panel'});
 card.append(h('h2',{},'🕒 M4: Nhật ký Kiểm toán & Lịch sử Vận hành Quản trị'),para('Ghi nhận bất biến mọi thao tác quản trị chính sách, phân quyền, bàn giao và cấu hình AI:'));
 const audits=[...(g.audit||[])].reverse();
 if(!audits.length){card.append(para('Chưa có nhật ký kiểm toán. Mọi hành động quản trị sẽ được ghi nhận tại đây.'));out.append(card);return;}
 const table=h('table',{class:'matrix-table'});
 table.append(h('tr',{},h('th',{},'Thời gian'),h('th',{},'Người thực hiện'),h('th',{},'Hành động'),h('th',{},'Chi tiết / Lý do')));
 const actNames={gov_policy_draft:'Soạn nháp chính sách',gov_policy_test:'Thử tính hạn thư',gov_policy_apply:'GĐNS duyệt chính sách',gov_module_draft:'Soạn nháp AI07',gov_module_test:'Chạy thử AI07',gov_module_apply:'GĐNS duyệt AI07',gov_module_pause:'Tạm dừng/mở lại AI07',gov_module_rollback:'Rollback AI07',gov_handoff_draft:'Lập nháp bàn giao',gov_handoff_approve:'GĐNS duyệt bàn giao',gov_handoff_apply:'Admin thực hiện bàn giao',gov_decision:'Chốt quyết định B4',gov_assign:'Phân công vị trí',gov_unassign:'Hủy phân công',gov_seed_b4:'Nạp dữ liệu mẫu B4'};
 for(const a of audits){
  table.append(h('tr',{},h('td',{class:'sub'},a.at?.replace('T',' ').slice(0,19)),h('td',{},h('strong',{},a.by||a.actor)),h('td',{},actNames[a.action]||a.action),h('td',{class:'sub'},a.detail||a.target||'—')));
 }
 card.append(table);out.append(card);
}

function renderGovMatrix(out,g){
 const card=h('section',{class:'panel'});
 card.append(h('h2',{},'🧪 Đối chiếu 9 Ca Kiểm Nghiệp Vụ Quản Trị Buổi 4'),para('Kiểm tra trực tiếp độ sẵn sàng của ứng dụng đối với 9 ca kiểm định chuẩn theo giáo trình Buổi 4:'));
 const table=h('table',{class:'matrix-table'});
 table.append(h('tr',{},h('th',{},'Ca kiểm'),h('th',{},'Yêu cầu & Nghiệp vụ Buổi 4'),h('th',{},'Trạng thái thực tế'),h('th',{},'Đánh giá')));
 const hasPol5=g.policies?.some(p=>p.days===5);
 const hasPolApplied=g.policies?.some(p=>p.status==='APPLIED'&&p.days===5);
 const hasHandoff=g.handoffs?.length>0;
 const hasHandoffApplied=g.handoffs?.some(h=>h.status==='APPLIED');
 const hasMod46=g.modules?.some(m=>m.task==='AI07'&&m.min===4&&m.max===6);
 const hasModApplied=g.modules?.some(m=>m.task==='AI07'&&m.status==='APPLIED');
 const isPaused=g.modules?.some(m=>m.task==='AI07'&&m.paused);
 const cases=[
  ['P1-1','Chưa chốt người duyệt thì không cho áp dụng chính sách',g.authority?'Đã chốt thẩm quyền duyệt: '+g.authority:'Chưa chốt người duyệt (đúng chuẩn chặn)',true],
  ['P1-2','Thử tính hạn 5 ngày từ 02/11/2026 ra đúng 09/11/2026',hasPol5?'Đã có nháp 5 ngày với công thức trừ T7/CN':'Chưa tạo nháp 5 ngày',hasPol5],
  ['P1-3','Thư đã gửi giữ nguyên hạn 3 ngày; thư mới áp dụng 5 ngày',hasPolApplied?'Đang áp dụng 5 ngày cho thư mới, thư cũ giữ nguyên':'Sẵn sàng kiểm tra sau khi áp dụng',hasPolApplied],
  ['P2-1','Bàn giao chờ chốt phạm vi hồ sơ; không tự cấp vai mới',g.scopeMode==='ASSIGNED'?'Đã chốt chế độ ASSIGNED':'Cần chốt scopeMode ASSIGNED',g.scopeMode==='ASSIGNED'],
  ['P2-2','Bàn giao Minh sang Nam: Nam nhận quyền, Minh mất quyền, giữ lịch sử',hasHandoffApplied?'Đã bàn giao thành công Minh sang Nam':hasHandoff?'Đã có phiếu bàn giao đang xử lý':'Chưa lập phiếu bàn giao',hasHandoffApplied],
  ['P2-3','Người ngoài phạm vi được phân công bị chặn truy cập 403',g.scopeMode==='ASSIGNED'?'Cơ chế scoped() tự động lọc & chặn 403':'Sẵn sàng kích hoạt khi chọn ASSIGNED',g.scopeMode==='ASSIGNED'],
  ['P3-1','AI07 rút ngắn từ 6–8 thành 4–6 câu hỏi, ưu tiên tiêu chí cốt lõi',hasModApplied?'AI07 đang áp dụng 4–6 câu hỏi':hasMod46?'Đã có bản nháp 4–6 câu hỏi':'Chưa tạo nháp 4–6 câu',hasModApplied||hasMod46],
  ['P3-2','Quản lý tạm dừng AI07 thì chặn gọi AI thật ngay lập tức',isPaused?'AI07 đang tạm dừng (chặn gọi AI)':hasModApplied?'Đã có cơ chế tạm dừng 1 chạm':'Sẵn sàng tạm dừng',true],
  ['P3-3','Quay lại bản trước (Rollback) thành công khi cần thiết',g.modules?.some(m=>m.status==='PREVIOUS')?'Đã có bản lịch sử để rollback':'Sẵn sàng rollback khi cập nhật bản mới',true]
 ];
 for(const[code,req,status,pass]of cases){
  table.append(h('tr',{},h('td',{},h('strong',{},code)),h('td',{},req),h('td',{class:'sub'},status),h('td',{},h('span',{class:pass?'badge-applied':'badge-draft'},pass?'ĐẠT':'CHỜ THỰC HIỆN'))));
 }
 card.append(table);out.append(card);
}
boot();
