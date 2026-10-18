
try{document.getElementById("ftY").textContent=new Date().getFullYear()}catch(e){}
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const HOVER=matchMedia('(hover:hover)').matches;
const root=document.documentElement,stage=$('#stage'),sc=$('#sc');
try{new IntersectionObserver(es=>es.forEach(e=>stage.classList.toggle('atft',e.isIntersecting)),{root:sc,threshold:.2}).observe($('.sft'))}catch(e){}

/* palette / fonts / mode */
const PALS=[['A','Deep Current','#0B1D2E','#1F5F8B','#2EC4B6'],['B','Glacier','#F4F8FA','#3A7CA5','#81C3D7'],['C','Kelp &amp; Neon','#06130F','#1FA37A','#7DF9C2'],['D','Midnight Aurora','#080B1A','#2B3A8C','#22D3EE']];
const FONTS=[['1','Fraunces'],['2','Inter + Mono'],['3','Instrument Serif'],['4','Space Mono']];
PALS.forEach(([k,n,a,b,c],i)=>{const el=document.createElement('button');el.className='chip'+(i?'':' on');el.title=n;
 el.innerHTML=`<span class="sw" style="background:linear-gradient(90deg,${a} 33%,${b} 33% 66%,${c} 66%)"></span>${k} ${n}`;
 el.onclick=()=>{root.dataset.palette=k;$$('#palettes .chip').forEach(x=>x.classList.toggle('on',x===el))};$('#palettes').append(el)});
FONTS.forEach(([k,n],i)=>{const el=document.createElement('button');el.className='chip'+(i?'':' on');el.textContent=k+' Montserrat + '+n;
 el.onclick=()=>{root.dataset.font=k;$$('#fonts .chip').forEach(x=>x.classList.toggle('on',x===el))};$('#fonts').append(el)});
const setMode=m=>{root.dataset.mode=m;$('#modeChip').textContent=m==='dark'?'Dark mode':'Light mode';$('#modeBtn').setAttribute('aria-pressed',m==='dark')};
$('#modeChip').onclick=$('#modeBtn').onclick=()=>setMode(root.dataset.mode==='dark'?'light':'dark');setMode('dark');

/* data (placeholders) */
const projects=[
 {c:'BayMark Health Services',l:'OBOT',t:'Applegate Recovery',k:'Recovery center',g:'Healthcare',y:'BayMark',v:0,d:'Website designed for BayMark Health Services.',u:'applegaterecovery.com'},
 {c:'BayMark Health Services',l:'OBOT',t:'Middlesex Recovery',k:'Recovery center',g:'Healthcare',y:'BayMark',v:1,d:'Website designed for BayMark Health Services.',u:'middlesexrecovery.com'},
 {c:'BayMark Health Services',l:'OBOT',t:'Mahajan Therapeutics',k:'Therapeutics',g:'Healthcare',y:'BayMark',v:2,d:'Website designed for BayMark Health Services.',u:'mahajantherapeutics.com'},
 {c:'BayMark Health Services',l:'OTP',t:'MedMark',k:'Treatment programs',g:'Healthcare',y:'BayMark',v:3,d:'Website designed for BayMark Health Services.',u:'medmark.com'},
 {c:'BayMark Health Services',l:'OTP',t:'BAART Programs',k:'Treatment programs',g:'Healthcare',y:'BayMark',v:0,d:'Website designed for BayMark Health Services.',u:'baartprograms.com'},
 {c:'BayMark Health Services',l:'OTP',t:'Health Care Resource Centers',k:'Treatment centers',g:'Healthcare',y:'BayMark',v:1,d:'Website designed for BayMark Health Services.',u:'hcrcenters.com'},
 {c:'BayMark Health Services',l:'RTC',t:'Granite Recovery Centers',k:'Recovery centers',g:'Healthcare',y:'BayMark',v:2,d:'Website designed for BayMark Health Services.',u:'graniterecoverycenters.com'},
 {c:'BayMark Health Services',l:'RTC',t:'Mount Sinai Wellness',k:'Wellness center',g:'Healthcare',y:'BayMark',v:3,d:'Website designed for BayMark Health Services.',u:'mtsinaiwellness.com'},
 {c:'BayMark Health Services',l:'RTC',t:'Liberty Bay Recovery',k:'Recovery center',g:'Healthcare',y:'BayMark',v:0,d:'Website designed for BayMark Health Services.',u:'libertybayrecovery.com'},
 {c:'BayMark Health Services',l:'RTC',t:'New Day Recovery',k:'Recovery center',g:'Healthcare',y:'BayMark',v:1,d:'Website designed for BayMark Health Services.',u:'new-dayrecovery.com'},
 {c:'BayMark Health Services',l:'RTC',t:'My Hope for Tomorrow',k:'Recovery program',g:'Healthcare',y:'BayMark',v:2,d:'Website designed for BayMark Health Services.',u:'myhopefortomorrow.com'},
 {c:'BayMark Health Services',l:'RTC',t:'San Antonio Recovery Center',k:'Recovery center',g:'Healthcare',y:'BayMark',v:3,d:'Website designed for BayMark Health Services.',u:'sanantoniorecoverycenter.com'},
 {c:'BayMark Health Services',t:'BayMark Health Services',k:'Corporate site',g:'Healthcare',y:'BayMark',v:0,d:'Website designed for BayMark Health Services.',u:'baymark.com'},
 {c:'BayMark Health Services',l:'Detox',t:'Special Care Corp',k:'Healthcare',g:'Healthcare',y:'BayMark',v:1,d:'Website designed for BayMark Health Services.',u:'specialcarecorp.com'},
 {c:'HomeSlice Media Group',t:'Brandon Jones Band',k:'Band website',g:'Music',y:'HomeSlice',v:2,d:'Official site for a music act: releases, shows and merch.',u:'brandonjonesband.com'},
 {c:'HomeSlice Media Group',t:'Bryan Loweree',k:'Country artist',g:'Music',y:'HomeSlice',v:3,d:'Official site for a country music artist: music, tour dates, merch and newsletter.',u:'bryanloweree.com'},
 {c:'HomeSlice Media Group',t:'Chancey Williams',k:'Country artist',g:'Music',y:'HomeSlice',v:0,d:'Official site for a Wyoming country recording artist: music, videos, tour and merch.',u:'chanceywilliams.com'},
 {c:'HomeSlice Media Group',t:'Just Jymnastics',k:'Kids gymnastics',g:'Recreation',y:'HomeSlice',v:1,d:"Rapid City children's gymnastics and ninja training, with camps and birthday parties.",u:'justjymnastics.com'},
 {c:'HomeSlice Media Group',t:'Loud American Food Truck',k:'Food truck',g:'Food & Drink',y:'HomeSlice',v:2,d:'Black Hills food truck with tour schedule, online ordering and rewards.',u:'loudamericanfoodtruck.com'},
 {c:'HomeSlice Media Group',t:'Mountain West Whiskey Festival',k:'Festival',g:'Events',y:'HomeSlice',v:0,d:'Annual whiskey tasting festival in Rapid City.',u:'mountainwestwhiskeyfestival.com'},
 {c:'HomeSlice Media Group',t:'Sturgis Motorcycle Rally',k:'Event',g:'Events',y:'HomeSlice',v:1,d:'Official site for the annual motorcycle rally in Sturgis, South Dakota.',u:'sturgismotorcyclerally.com'},
 {c:'HomeSlice Media Group',t:'Pheasants on Kara Creek',k:'Hunting ranch',g:'Hospitality',y:'HomeSlice',v:2,d:'Sundance, Wyoming pheasant hunting ranch: hunts, lodging, events and corporate outings.',u:'pheasantsonkaracreek.com'},
 {c:'HomeSlice Media Group',t:'Rapid City Police Jobs',k:'Recruitment',g:'Public sector',y:'HomeSlice',v:3,d:'Recruitment site for the Rapid City Police Department.',u:'rapidcitypolicejobs.com'},
 {c:'HomeSlice Media Group',t:'Rapid Spa',k:'Retail',g:'Retail',y:'HomeSlice',v:0,d:'Black Hills retailer of hot tubs, swim spas, saunas and patio furniture.',u:'rapidspa.com'},
 {c:'HomeSlice Media Group',t:'The Park 707',k:'Venue',g:'Hospitality',y:'HomeSlice',v:1,d:'Rapid City sports bar, nightclub, casino and event venue.',u:'thepark707.com'},
 {c:'702 Pros LLC',t:'AtWork Personnel',k:'Staffing agency',g:'Staffing',y:'702 Pros',v:0,d:'Staffing and employment agency site where job seekers search open positions and businesses sign up to hire, with offices in Las Vegas, Phoenix, Dallas and Tyler.',u:'www.atworknv.com'},
 {c:'702 Pros LLC',t:'OnSago',k:'Software',g:'Technology',y:'702 Pros',v:1,d:'Marketing site for a landing page builder, with categorized templates, a simple customizer and one dashboard for managing campaign pages.',u:'onsago.com'},
 {c:'702 Pros LLC',t:'LV Exhibit Rentals',k:'Exhibit rentals',g:'Events',y:'702 Pros',v:2,d:'Las Vegas trade show exhibit rental company: managed booths, LED displays and exhibit elements for exhibitors, agencies and event planners.',u:'lvexhibitrentals.com'},
 {c:'702 Pros LLC',t:'Public Education Foundation',k:'Nonprofit',g:'Education',y:'702 Pros',v:3,d:'Nonprofit supporting Clark County public schools, with scholarships, a teacher licensing pathway, a Teacher Superstore and ways to give, volunteer or sponsor.',u:'thepef.org'},
 {c:'Trey Nguyen Design',t:'Hep C Treatment',k:'Patient resource',g:'Healthcare',y:'Trey Nguyen Design',v:3,d:'Patient-facing hepatitis C information and treatment-referral site with free, confidential telehealth appointment requests.',u:'hepctreatment.org'}];
const COS=['BayMark Health Services','HomeSlice Media Group','702 Pros LLC','Trey Nguyen Design'];
const F={c:'All',g:new Set(),l:new Set()};
const vis=()=>projects.filter(p=>(F.c==='All'||p.c===F.c)&&(!F.g.size||F.g.has(p.g))&&(!F.l.size||F.l.has(p.l)));
const jobs=[{y:'Feb 2023 to now',r:'Full Stack Developer',c:'BayMark Health Services'},{y:'Apr 2022 to Feb 2023',r:'Web Developer',c:'The HomeSlice Group'},{y:'Oct 2021 to Jan 2022',r:'Web Developer Intern',c:'702 Pros LLC'}];
const SHOT={"applegaterecovery.com":"applegate-recovery","middlesexrecovery.com":"middlesex-recovery","mahajantherapeutics.com":"mahajan-therapeutics","medmark.com":"medmark","baartprograms.com":"baart-programs","hcrcenters.com":"hcr-centers","graniterecoverycenters.com":"granite-recovery-centers","mtsinaiwellness.com":"mount-sinai-wellness","libertybayrecovery.com":"liberty-bay-recovery","new-dayrecovery.com":"new-day-recovery","myhopefortomorrow.com":"my-hope-for-tomorrow","sanantoniorecoverycenter.com":"san-antonio-recovery-center","baymark.com":"baymark-health-services","specialcarecorp.com":"special-care-corp","brandonjonesband.com":"brandon-jones-band","bryanloweree.com":"bryan-loweree","chanceywilliams.com":"chancey-williams","justjymnastics.com":"just-jymnastics","loudamericanfoodtruck.com":"loud-american-food-truck","mountainwestwhiskeyfestival.com":"mountain-west-whiskey-festival","sturgismotorcyclerally.com":"sturgis-motorcycle-rally","pheasantsonkaracreek.com":"pheasants-on-kara-creek","rapidcitypolicejobs.com":"rapid-city-police-jobs","rapidspa.com":"rapid-spa","thepark707.com":"the-park-707","hepctreatment.org":"hep-c-treatment","www.atworknv.com":"atworknv","onsago.com":"onsago","lvexhibitrentals.com":"lv-exhibit-rentals","thepef.org":"public-education-foundation"};
const mobS=p=>p&&SHOT[p.u]?`assets/mob/${SHOT[p.u]}.webp`:'',fullS=p=>p&&SHOT[p.u]?`assets/full/${SHOT[p.u]}.webp`:'';
const shot=p=>p&&SHOT[p.u]?`assets/shots/${SHOT[p.u]}.webp`:'';
const BGC={"applegate-recovery":"#443e33","baart-programs":"#3a4757","baymark-health-services":"#33392a","brandon-jones-band":"#1a1c15","bryan-loweree":"#313e44","chancey-williams":"#554539","granite-recovery-centers":"#505e6b","hcr-centers":"#6b5050","hep-c-treatment":"#2f486b","just-jymnastics":"#60326b","liberty-bay-recovery":"#3f4e68","loud-american-food-truck":"#49392b","mahajan-therapeutics":"#6b5622","medmark":"#50666b","middlesex-recovery":"#354450","mount-sinai-wellness":"#39526b","mountain-west-whiskey-festival":"#4c3827","my-hope-for-tomorrow":"#443014","new-day-recovery":"#6b5b31","pheasants-on-kara-creek":"#1f2a2a","rapid-city-police-jobs":"#333a45","rapid-spa":"#463729","san-antonio-recovery-center":"#332c26","special-care-corp":"#243854","sturgis-motorcycle-rally":"#46606b","the-park-707":"#2d190d","atworknv":"#1b3a5b","onsago":"#50666b","lv-exhibit-rentals":"#202f6b","public-education-foundation":"#16182d"};
const th=(v,p,m)=>{const i=shot(p);if(i&&m==='x'){return `<div class="th has" data-v="${v}"><img class="hs" src="${i}" alt="" loading="lazy" decoding="async"><img class="ms" src="${mobS(p)}" alt="" loading="lazy" decoding="async"><img class="fl" src="${fullS(p)}" alt="" loading="lazy" decoding="async"></div>`}if(i&&m==='p'){const c=BGC[SHOT[p.u]]||'#26405a';return `<div class="th has fm" data-v="${v}" style="background:linear-gradient(160deg,${c},color-mix(in srgb,${c} 55%,#000))"><div class="cc"><div class="pf"><span class="nt"></span><img src="${mobS(p)}" alt="" loading="lazy" decoding="async"></div></div></div>`}if(i&&m==='f'){const c=BGC[SHOT[p.u]]||'#26405a';return `<div class="th has fm" data-v="${v}" style="background:linear-gradient(160deg,${c},color-mix(in srgb,${c} 55%,#000))"><div class="cc"><div class="bfr"><div class="cb"><i></i><i></i><i></i></div><img src="${i}" alt="" loading="lazy" decoding="async"></div></div></div>`}return `<div class="th${i?' has':''}" data-v="${v}">${i?`<img src="${i}" alt="" loading="lazy" decoding="async">`:''}</div>`};
const ICON={send:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 16V4M5 9l5-5 5 5"/></svg>',
 shield:'<svg viewBox="0 0 20 20"><path d="M10 2l6 2v5c0 4-2.6 7-6 9-3.4-2-6-5-6-9V4z"/><path d="M7.5 10l2 2 3.5-4"/></svg>',
 doc:'<svg viewBox="0 0 20 20"><path d="M5 2h7l4 4v12H5z"/><path d="M12 2v4h4"/></svg>'};

/* knowledge base: the only source of answers */
const KB=[
 {id:'greet',s:['hi','hello','hey','hola'],k:[],a:"Hi! I can tell you about Trey's work, background and availability. Pick a question below or type your own.",src:'Assistant intro'},
 {id:'about',s:['yourself','background','bio','story','introduce','who'],k:['about','designer','person'],a:"Trey Nguyen is a product designer based in Texas. He designs web and mobile products, and he's currently available for work.",src:'About'},
 {id:'work',s:['work','projects','portfolio','case','studies','examples','project'],k:['built','designed','showcase','recent'],a:"Here are a few recent projects. Each one has a full case study.",src:'Work',block:'work'},
 {id:'resume',s:['resume','cv','experience','career','history','roles','jobs'],k:['employment','years','previous','companies','worked'],a:"Here are Trey's most recent roles. You can download the full resume or open it on this page.",src:'Resume',block:'resume'},
 {id:'contact',s:['contact','email','reach','call','message','connect','touch'],k:['talk','hello','book','phone'],p:['get in touch','contact him','reach him','book a call'],a:"Email is the fastest way to reach Trey. You can also book a short intro call, or find him on social.",src:'Contact',block:'contact'},
 {id:'avail',s:['available','availability','freelance','hire','hiring','booking','open'],k:['start','capacity','take'],p:['available for work','open to work','looking for work','for hire','take on'],a:"Yes. Trey is currently available for work and is taking on new projects.",src:'Availability'},
 {id:'loc',s:['where','texas','located','location','timezone','live','based'],k:['city','country'],a:"Trey is based in Texas and works in Central Time.",src:'About'},
 {id:'skills',s:['skills','tools','figma','prototyping','software','stack','expertise'],k:['systems','research','design','good'],a:"Trey works in product design, prototyping, design systems and user research, with Figma as his main tool.",src:'Skills'},
 {id:'process',s:['process','approach','workflow','method','collaborate'],k:['team','teams','clients'],p:['how do you work','how does trey work','work with'],a:"Trey starts with research, moves to quick prototypes, and tests early with real users before refining the details.",src:'Process'}];
const FALLBACK="I don't have that in the information Trey has shared, so I won't guess. The best move is to ask him directly.";
const STOP=new Set('a an the is are was were be to of in on for and or but do does did you your yours me my i we it its this that what whats how can could would should will please trey nguyen tell show give display see view get find with his him her he she much many'.split(' '));
const hit=(w,x)=>w===x||(w.length>=4&&x.length>=4&&w.slice(0,4)===x.slice(0,4)&&Math.abs(w.length-x.length)<=3);
const toks=s=>s.toLowerCase().replace(/[^a-z0-9\s']/g,' ').split(/\s+/).map(w=>w.replace(/'s$/,'')).filter(w=>w&&!STOP.has(w));
function match(q){const tk=toks(q),ql=q.toLowerCase();let best=null,bs=0;
 KB.forEach(e=>{let s=0;(e.p||[]).forEach(p=>{if(ql.includes(p))s+=4});tk.forEach(w=>{if(e.s.some(x=>hit(w,x)))s+=2;else if(e.k.some(x=>hit(w,x)))s+=1});
  if(e.id==='greet'&&tk.length>2)s=0;if(s>bs){bs=s;best=e}});return bs>=2?best:null}
const PRI=['work','resume','contact','avail','skills','loc','process','about'];
const SUGTXT={work:"Show me Trey's work",resume:"Display Trey's resume",contact:"How can I contact Trey?",avail:"Is Trey available for work?",skills:"What tools does Trey use?",loc:"Where is Trey based?",process:"How does Trey work with teams?",about:"Tell me about Trey"};
const BLOCKS={
 work:()=>`<div class="blk wk">${projects.slice(0,3).map(p=>`<button class="pc" data-act="case:${p.t}"><div class="pt">${th(p.v,p)}</div><b>${p.t}</b><small>${p.k}</small></button>`).join('')}</div><div class="acts"><button class="lnk" data-act="nav:work">See all work</button></div>`,
 resume:()=>`<div class="blk rs">${jobs.map(j=>`<div class="rr"><span>${j.y}</span><b>${j.r}</b><small>${j.c}</small></div>`).join('')}</div><div class="acts"><button class="lnk" data-act="nav:resume">Open full resume</button></div>`,
 contact:()=>`<div class="acts blk"><button class="btn" data-act="copy">Copy email</button><button class="btn ghost" data-act="open:mailto:hey@treynguyen.com?subject=Call%20request">Book a call</button><button class="lnk" data-act="open:https://www.linkedin.com/in/trey-nguyen/">LinkedIn</button></div>`};

/* shared helpers */
const go=id=>sc.scrollTo({top:document.getElementById(id).offsetTop,behavior:RM?'auto':'smooth'});
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2000)};
function act(a,onNav){const i=a.indexOf(':'),t=i<0?a:a.slice(0,i),v=i<0?'':a.slice(i+1);
 if(t==='nav'){onNav&&onNav();go(v)}else if(t==='toast')toast(v);else if(t==='open'){window.open(v,'_blank','noopener,noreferrer')}else if(t==='case')openP(v);
 else if(t==='copy'){try{navigator.clipboard&&navigator.clipboard.writeText('hey@treynguyen.com').catch(()=>{})}catch(_){}toast('Email copied: hey@treynguyen.com')}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b&&stage.contains(b)){e.preventDefault();go(b.dataset.go)}const a=e.target.closest('.side [data-act]');if(a)act(a.dataset.act)});

/* chat component */
function createChat(mount,o={}){
 const opt=Object.assign({seed:false,onNav(){}},o);
 mount.innerHTML=`<div class="chat"><div class="msgs" aria-live="polite"></div><div class="sugs"></div><div class="comp"><input aria-label="Ask about Trey" placeholder="Ask anything about Trey" autocomplete="off"><button class="send" aria-label="Send">${ICON.send}</button></div><p class="ground">${ICON.shield}Answers come only from information Trey has provided.</p></div>`;
 const msgs=$('.msgs',mount),sugs=$('.sugs',mount),inp=$('input',mount);let asked=new Set(),busy=false,gen=0;
 const down=()=>msgs.scrollTo({top:msgs.scrollHeight,behavior:RM?'auto':'smooth'});
 const setSugs=ids=>{sugs.innerHTML=ids.map(id=>`<button class="sug" data-id="${id}">${SUGTXT[id]}</button>`).join('')};
 const nextSugs=()=>{const r=PRI.filter(id=>!asked.has(id)).slice(0,3);return r.length?r:['contact']};
 const assistant=()=>{const m=document.createElement('div');m.className='m a';m.innerHTML='<div class="av">TN</div><div class="bd"></div>';msgs.append(m);return $('.bd',m)};
 async function typeText(el,t,g){if(RM){el.textContent=t;return}const w=t.split(' ');for(let i=0;i<w.length;i++){if(g!==gen)return;el.textContent=w.slice(0,i+1).join(' ');down();await wait(26)}}
 async function ask(text,id){text=(text||'').trim();if(!text||busy)return;busy=true;const g=gen;
  const u=document.createElement('div');u.className='m u';u.innerHTML='<div class="bub"></div>';$('.bub',u).textContent=text;msgs.append(u);inp.value='';sugs.innerHTML='';
  const bd=assistant();bd.innerHTML='<span class="dots"><i></i><i></i><i></i></span>';down();await wait(RM?0:650);if(g!==gen)return;
  const e=id?KB.find(x=>x.id===id):match(text);bd.innerHTML='<p class="tx"></p>';await typeText($('.tx',bd),e?e.a:FALLBACK,g);if(g!==gen)return;
  if(e&&e.block)bd.insertAdjacentHTML('beforeend',BLOCKS[e.block]());if(!e)bd.insertAdjacentHTML('beforeend',BLOCKS.contact());
  bd.insertAdjacentHTML('beforeend',`<div class="srcs">${e?`<span>${ICON.doc}Source: ${e.src}</span>`:`<span>${ICON.shield}Not in the information Trey provided</span>`}</div>`);
  if(e&&e.id!=='greet')asked.add(e.id);setSugs(nextSugs());down();busy=false}
 function reset(){gen++;asked.clear();busy=false;msgs.innerHTML='';inp.value='';
  if(opt.seed){const bd=assistant();bd.innerHTML=`<p class="tx">Hi, I'm Trey's assistant. I can only answer from information Trey has provided, so ask away.</p>`}setSugs(['work','resume','contact','avail'])}
 $('.send',mount).onclick=()=>ask(inp.value);inp.addEventListener('keydown',e=>{if(e.key==='Enter')ask(inp.value)});
 sugs.addEventListener('click',e=>{const b=e.target.closest('.sug');if(b)ask(SUGTXT[b.dataset.id],b.dataset.id)});
 msgs.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b)act(b.dataset.act,opt.onNav)});
 reset();return{ask,reset,focus:()=>inp.focus({preventScroll:true})}}
const closeWidget=()=>{$('#widget').classList.remove('open');$('#fab').setAttribute('aria-expanded','false')};
let chat,nudgeT=0;
const openWidget=()=>{$('#widget').classList.add('open');$('#fab').setAttribute('aria-expanded','true');$('#nudge').classList.remove('show');clearTimeout(nudgeT);setTimeout(()=>chat.focus(),400)};
chat=createChat($('#widgetChat'),{seed:true,onNav:closeWidget});
$('#fab').onclick=()=>$('#widget').classList.contains('open')?closeWidget():openWidget();$('#widgetX').onclick=closeWidget;
nudgeT=setTimeout(()=>{if(!$('#widget').classList.contains('open')&&sc.scrollTop<40)$('#nudge').classList.add('show')},RM?0:2600);
sc.addEventListener('scroll',()=>{if(sc.scrollTop>40){clearTimeout(nudgeT);$('#nudge').classList.remove('show')}},{passive:true});

/* bento grid: edit this list to change what shows. Sizes: w2 = two columns wide, h2 = two rows tall */
const tzp=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',hour:'numeric',minute:'2-digit',hour12:true});
const BENTO=[
 {cls:'w2 h2 big',kind:'work',v:0,label:'Applegate Recovery',sub:'BayMark Health Services',act:'case:Applegate Recovery'},
 {cls:'w2 side',kind:'text',k:'Side project',t:'Plantly',s:'A weekend app that reminds me to water things.',act:'Plantly: project page opens here (mockup)'},
 {cls:'photo',kind:'photo',v:2,label:'Hill Country',act:'Photo gallery opens here (mockup)'},
 {cls:'',kind:'clock'},
 {cls:'w2',kind:'hobbies',k:'Outside of work',items:['Film photography','Climbing','Espresso','Pickleball']},
 {cls:'',kind:'play'},
 {cls:'photo',kind:'photo',v:3,label:'Coffee, always',act:'Photo gallery opens here (mockup)'}];
const TILE={
 work:t=>`${th(t.v)}<span class="lbl">${t.label}<small>${t.sub}</small></span>`,
 photo:t=>`${th(t.v)}<span class="lbl">${t.label}</span>`,
 text:t=>`<div class="pad"><span class="kick">${t.k}</span><div><div class="big2">${t.t}</div><p class="sm">${t.s}</p></div></div>`,
 clock:()=>`<div class="pad"><span class="kick">Texas right now</span><div><div class="big2" id="bClock">--:--</div><p class="sm">Central Time</p></div></div>`,
 hobbies:t=>`<div class="pad"><span class="kick">${t.k}</span><div class="hobs">${t.items.map(i=>`<span>${i}</span>`).join('')}</div></div>`,
 play:()=>`<div class="pad"><span class="kick">Now playing</span><div><span class="eq"><i></i><i></i><i></i><i></i></span><p class="sm" style="margin-top:6px">Lo-fi for deadlines</p></div></div>`};
{const g=$('#bento');
 g.innerHTML=BENTO.map((t,i)=>`<button class="bt ${t.cls}" style="--i:${i}"${t.act?` data-act="${t.act.startsWith('case:')?t.act:'toast:'+t.act}"`:''}>${TILE[t.kind](t)}</button>`).join('');
 g.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b)act(b.dataset.act)});
 const clk=()=>{const c=$('#bClock');if(c)c.textContent=tzp.format(new Date())};clk();setInterval(clk,15000);
 new IntersectionObserver((es,io)=>{if(es[0].isIntersecting){g.classList.add('in');io.disconnect()}},{root:sc,threshold:.2}).observe(g)}

/* ---------- PROJECT POPUP ---------- */
/* Add details per project: role, scope:[], tech:[], case:'' . Empty fields show a to-do note. */
let curP=null,lastFocus=null;
const esc=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function openP(t){const L=vis();let i=L.findIndex(p=>p.t===t);let p=L[i];if(!p){p=projects.find(x=>x.t===t);if(!p)return;i=-1}curP=p;lastFocus=document.activeElement;
 if(p.status==='building'){BW.open(p);setTimeout(()=>{const x=$('.px');x&&x.focus({preventScroll:true})},60);return}
 $('#pp').classList.remove('wide');
 const todo=m=>`<div class="todo">${m}</div>`;
 const prev=i>0?L[i-1]:null,next=i>=0&&i<L.length-1?L[i+1]:null;
 $('#pp').innerHTML=`<div class="pbn" style="background:linear-gradient(150deg,${BGC[SHOT[p.u]]||'#26405a'},color-mix(in srgb,${BGC[SHOT[p.u]]||'#26405a'} 50%,#000))"><button class="px" data-pclose aria-label="Close">✕</button>
 <div class="pcard"><div><div class="mk">${p.status==='building'?'In progress':'Case study'}</div><h3 id="pTitle">${esc(p.t)}</h3><div class="mt2"><span>${esc(p.c)}</span><span>${esc(p.k)}</span><span>${esc(p.g)}</span>${p.l?`<span>${esc(p.l)}</span>`:''}</div></div><a class="btn" href="https://${esc(p.u)}" target="_blank" rel="noopener noreferrer">Visit ${esc(p.u)} ↗</a></div>
 <div class="pfr">${shot(p)?`<div class="bfr"><div class="cb"><i></i><i></i><i></i><em>${esc(p.u)}</em></div><img src="${shot(p)}" alt="${esc(p.t)} homepage"></div>`:th(p.v,p)}</div></div>
 <div class="pb">
 <div class="pgrid"><div class="ps"><h5>Overview</h5><p>${esc(p.d)}</p></div><div class="ps"><h5>My role</h5>${p.role?`<p>${esc(p.role)}</p>`:todo('Role to be added')}</div>
 <div class="ps"><h5>Project scope</h5>${p.scope&&p.scope.length?`<ul>${p.scope.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:todo('Scope and deliverables to be added')}</div>
 <div class="ps"><h5>Technology</h5>${p.tech&&p.tech.length?`<div class="tags">${p.tech.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:todo('Tools and tech to be added')}</div></div>
 ${fullS(p)?`<div class="ps"><h5>Full page</h5><div class="fpw"><div class="bfr"><div class="cb"><i></i><i></i><i></i><em>${esc(p.u)}</em></div><div class="fps" tabindex="0" aria-label="Scrollable full-page screenshot"><img src="${fullS(p)}" alt="${esc(p.t)} full page" loading="lazy"></div></div></div></div>`:''}
 <div class="ps"><h5>Case study</h5>${p.case?`<p>${esc(p.case)}</p>`:todo('Challenge, process and results to be added')}</div>
 ${p.log?BW.buildLog():''}
 <div class="pnav"><button class="lnk" data-pgo="${prev?esc(prev.t):''}"${prev?'':' disabled style="opacity:.35"'}>← ${prev?esc(prev.t):'Previous'}</button><button class="lnk" data-pgo="${next?esc(next.t):''}"${next?'':' disabled style="opacity:.35"'}>${next?esc(next.t):'Next'} →</button></div></div>`;
 BW.initBuildLog();$('#pp').scrollTop=0;$('#pmod').classList.add('open');setTimeout(()=>{const x=$('.px');x&&x.focus({preventScroll:true})},60)}
function closeP(){$('#pmod').classList.remove('open');curP=null;lastFocus&&lastFocus.focus&&lastFocus.focus({preventScroll:true})}
$('#pmod').addEventListener('click',e=>{if(e.target.closest('[data-pclose]'))return closeP();const g=e.target.closest('[data-pgo]');if(g&&g.dataset.pgo){const keep=lastFocus;openP(g.dataset.pgo);lastFocus=keep}});

/* ---------- BUILDING PROJECT (sample data; swap for real entries) ---------- */
const BW=(()=>{
 const TODAY=new Date();TODAY.setHours(12,0,0,0);
 const dAgo=n=>{const d=new Date(TODAY);d.setDate(d.getDate()-n);return d};
 const key=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
 const fmt=d=>d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
 const fmtL=d=>d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
 const SPR=[
  {n:'Foundations',goal:'Style guide, logo and type',t:[['Design tokens','d'],['Wordmark logo','d'],['Palette and type pairing','d']]},
  {n:'Hero and assistant',goal:'First screen and the Ask widget',t:[['Hero and header','d'],['Floating assistant','d'],['Grounded answers file','d']]},
  {n:'Work',goal:'Show every project well',t:[['Work mosaic','d'],['Project popup','d'],['Company filters','d'],['Real screenshots','p'],['Case study write-ups','n']]},
  {n:'Resume and contact',goal:'The rest of the page',t:[['Resume section','n'],['Contact section','n'],['Footer','n']]},
  {n:'Motion polish',goal:'Make the scroll feel designed',t:[['Scroll transitions','n'],['Reduced-motion pass','n'],['Performance budget','n']]},
  {n:'Launch',goal:'Ship it on treynguyen.com',t:[['Next.js build','n'],['Accessibility audit','n'],['Go live','n']]}];
 const CUR0=2,SD=14,CD=7;
 const sStart=i=>dAgo(CD-1+(CUR0-i)*SD),sEnd=i=>{const d=sStart(i);d.setDate(d.getDate()+SD-1);return d};
 let done=false,sel=CUR0,tagF='All',pickDay=null;
 const cur=()=>done?SPR.length-1:CUR0;
 const taskSt=(i,k)=>done?'d':i<CUR0?'d':i>CUR0?'n':k;
 const allT=()=>SPR.flatMap((s,i)=>s.t.map(t=>taskSt(i,t[1])));
 const pct=()=>Math.round(allT().filter(x=>x==='d').length/allT().length*100);
 const NB=[
  [0,'Thinking','Filters before polish','The work grid gets crowded fast at 26 projects. I would rather give people three clean filters than a longer scroll.','A long scroll rewards patience. A filter respects the time of someone skimming for one kind of project.'],
  [1,'Decision','Cap the content at 1280px','Wide screens were stretching every section. One width, centered, with the backgrounds still edge to edge.','1280 sits in the usual 1200 to 1440 range and keeps line lengths comfortable.'],
  [2,'Shipped','Project popup is live','Each tile opens details with a link to the live site. Empty sections say what is still to be added.','I would rather show a visible gap than invent a role or a result I cannot back up.'],
  [4,'Learned','Small tiles feel like thumbnails','At tablet width the mosaic tiles read as stamps. Taller rows and fewer columns fixed it.','Size the tile for the screenshot it will hold, not for the grid.'],
  [5,'Thinking','What counts as a daily note','Short, dated, honest. What I tried, what I decided, what I would change. No polish.','The point is to show how I think, so unfinished is fine.'],
  [7,'Decision','The assistant only answers from my facts','No guessing. If it is not in the file, it says so and points to contact.','A wrong answer about me costs more than a missing one.'],
  [9,'Shipped','Header and sidebar locked','Pill header on top, logo, socials and the dark toggle in the sidebar.','Two navs would compete, so the sidebar carries links and settings only.'],
  [12,'Learned','Hero height changes everything','At 72% the first row of work shows before anyone scrolls. At 100% the transition does all the work.','Showing a slice of work early is the cheapest way to say what this site is for.'],
  [15,'Thinking','Why a chat-style portfolio','People arrive with one question. Let them ask it.','The suggested chips still cover the three things most visitors want.']
 ].map(([ago,tag,title,body,why])=>({date:dAgo(ago),tag,title,body,why}));
 const notes=()=>done?[{date:TODAY,tag:'Shipped',title:'Portfolio is live',body:'All six sprints are done and the site is on treynguyen.com.',why:'The log stays on the project page so people can see how it got here.'},...NB]:NB;
 const rng=(a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296})(707);
 const ACT={};for(let i=0;i<371;i++){const d=dAgo(i),w=d.getDay();let p=w===0||w===6?.22:.72;if(i>150&&i<190)p=.12;if(i<60)p+=.18;ACT[key(d)]=rng()<p?1+Math.floor(rng()*rng()*6):0}
 NB.forEach(n=>{const k=key(n.date);ACT[k]=Math.max(ACT[k]||0,2)});
 const lvl=c=>c===0?0:c<2?1:c<3?2:c<5?3:4;
 const stats=()=>{let c=0,best=0,run=0,act=0,tot=0;for(let i=370;i>=0;i--){const v=ACT[key(dAgo(i))]||0;tot+=v;if(v){act++;run++;best=Math.max(best,run)}else run=0}
  for(let i=0;i<371;i++){if(ACT[key(dAgo(i))])c++;else if(i>0)break}return{cur:c,best,act,tot}};
 const tipEl=document.createElement('div');tipEl.className='bwtip';document.body.append(tipEl);
 function heat(host,weeks,cs,gp,onPick){
  const end=new Date(TODAY),start=new Date(end);start.setDate(start.getDate()-end.getDay()-(weeks-1)*7);const cells=[],mo=[];let lm=-1;
  for(let w=0;w<weeks;w++)for(let d=0;d<7;d++){const dt=new Date(start);dt.setDate(start.getDate()+w*7+d);const fut=dt>end,k=key(dt),c=ACT[k]||0;
   if(d===0&&dt.getMonth()!==lm&&!fut){mo.push([w,dt.toLocaleDateString('en-US',{month:'short'})]);lm=dt.getMonth()}
   cells.push(`<button class="bwc${fut?' fut':''}" data-l="${lvl(c)}" data-k="${k}" data-c="${c}" aria-label="${fmt(dt)}: ${c} ${c===1?'entry':'entries'}"></button>`)}
  host.innerHTML=`<div class="bwhw" style="--cs:${cs}px;--gp:${gp}px"><div class="bwmo">${mo.map(([w,m])=>`<span style="left:${w*(cs+gp)}px">${m}</span>`).join('')}</div><div class="bwgrid">${cells.join('')}</div></div>`;
  const place=e=>{tipEl.style.left=Math.min(innerWidth-180,e.clientX+12)+'px';tipEl.style.top=(e.clientY-38)+'px'};
  host.onpointerover=e=>{const b=e.target.closest('.bwc');if(!b||b.classList.contains('fut'))return;const c=+b.dataset.c;tipEl.textContent=`${c?c+(c===1?' entry':' entries'):'No entries'} on ${fmt(new Date(b.dataset.k+'T12:00'))}`;tipEl.classList.add('show');place(e)};
  host.onpointermove=e=>{if(tipEl.classList.contains('show'))place(e)};host.onpointerleave=()=>tipEl.classList.remove('show');
  host.onclick=e=>{const b=e.target.closest('.bwc');if(!b||b.classList.contains('fut'))return;$$('.bwc.sel',host).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');onPick&&onPick(b.dataset.k)};
  host.scrollLeft=host.scrollWidth}
 const seg=()=>`<div class="bwseg" aria-label="Sprint progress">${SPR.map((s,i)=>`<i class="${i<cur()||(done)?'d':i===cur()?'c':''}" style="--p:${Math.round(SPR[CUR0].t.filter(t=>t[1]==='d').length/SPR[CUR0].t.length*100)}%"></i>`).join('')}</div>`;
 const entry=n=>`<article class="bwen"><header><span class="bwtag tg-${n.tag}">${n.tag}</span><h5>${esc(n.title)}</h5></header><p>${esc(n.body)}</p><button class="more" aria-expanded="false">Why I decided this</button><p class="why">${esc(n.why)}</p></article>`;
 const ring=(p,fin)=>`<div class="bwring"><svg viewBox="0 0 100 100"><circle class="rb" cx="50" cy="50" r="42"/><circle class="rf" cx="50" cy="50" r="42" style="--off:${264*(1-p/100)}"/></svg><b>${p}%</b></div>`;

 /* spotlight tile in the mosaic */
 function spot(p,i){const n=notes()[0],P=pct();
  return `<div class="spot" style="--i:${i}" id="bwSpot"><button class="in" data-t="${esc(p.t)}" aria-label="Open ${esc(p.t)} progress">
   <div><span class="bwpill"><i class="bwdot"></i>Now building · Sprint ${CUR0+1} of 6</span><h3>${esc(p.t)}</h3></div>
   <div class="spmid">${ring(P)}<p class="bwq">“${esc(n.title)}.”<small>Latest note · ${fmt(n.date)}</small></p></div>
   <div>${seg()}<p class="bwcap">${esc(SPR[CUR0].n)} · ends ${fmt(sEnd(CUR0))} · open for sprints, notes and activity</p></div></button></div>`}

 /* workbench popup (project is in progress) */
 function open(p){const pp=$('#pp');pp.classList.add('wide');const S=stats(),P=pct();
  pp.innerHTML=`<div class="bwhead"><button class="px" data-pclose aria-label="Close">✕</button>
   <div class="bwtop">${ring(P)}<div><span class="bwpill"><i class="bwdot"></i>In progress · Sprint ${CUR0+1} of 6</span><h3 id="pTitle">${esc(p.t)}</h3><p>${esc(p.d)}</p></div></div>${seg()}</div>
   <nav class="bwnav" aria-label="Sections"><button class="chip" data-jump="bwP">Progress</button><button class="chip" data-jump="bwA">Activity</button><button class="chip" data-jump="bwL">Dev log</button></nav>
   <section class="bwsec" id="bwP"><h4>Progress <small>Pick a sprint to see its board</small></h4><div class="bwsprints" id="bwSp"></div><p id="bwGoal" style="color:var(--muted)"></p><div class="bwboard" id="bwBd"></div></section>
   <section class="bwsec" id="bwA"><h4>Activity <small>Every day I work on it, I log an entry. Click a day.</small></h4>
    <div class="bwstats"><div><b>${S.tot}</b><span>entries this year</span></div><div><b>${S.act}</b><span>active days</span></div><div><b>${S.cur}</b><span>day streak</span></div><div><b>${S.best}</b><span>longest streak</span></div></div>
    <div class="bwhm" id="bwHm"></div><div class="bwleg">Less ${[0,1,2,3,4].map(l=>`<span class="bwc" data-l="${l}"></span>`).join('')} More</div><div class="bwday" id="bwDay"></div></section>
   <section class="bwsec" id="bwL"><h4>Dev log <small>Short notes on what I tried and decided</small></h4><div class="bwtags" id="bwTg"></div><div class="bwfeed" id="bwFd"></div></section>`;
  sel=cur();tagF='All';board();logFeed();
  heat($('#bwHm'),53,14,3,k=>{pickDay=k;day()});pickDay=key(notes()[0].date);const c=$(`#bwHm .bwc[data-k="${pickDay}"]`);c&&c.classList.add('sel');day();
  pp.scrollTop=0;$('#pmod').classList.add('open')}
 function board(){const s=SPR[sel],t=s.t.map(([n,k])=>[n,taskSt(sel,k)]);
  $('#bwSp').innerHTML=SPR.map((x,i)=>`<button class="bwsn ${i<cur()||done?'past':''} ${i===cur()&&!done?'now':''} ${i===sel?'sel':''}" data-i="${i}"><small>Sprint ${i+1}${i===cur()&&!done?' · now':''}</small><b>${x.n}</b></button>`).join('');
  $('#bwGoal').textContent=`Sprint ${sel+1}, ${fmt(sStart(sel))} to ${fmt(sEnd(sel))}. Goal: ${s.goal}.`;
  const col=(k,l)=>{const a=t.filter(x=>x[1]===k);return `<div class="bwcol ${k==='d'?'done':k==='p'?'doing':''}"><h5>${l}<span>${a.length}</span></h5>${a.map(x=>`<div class="bwtk">${esc(x[0])}</div>`).join('')||'<div class="todo">Nothing here</div>'}</div>`};
  $('#bwBd').innerHTML=col('n','Next')+col('p','Doing')+col('d','Done')}
 function day(){const dt=new Date(pickDay+'T12:00'),c=ACT[pickDay]||0,ns=notes().filter(n=>key(n.date)===pickDay);
  $('#bwDay').innerHTML=`<h6>${fmtL(dt)} · ${c} ${c===1?'entry':'entries'}</h6>`+(ns.length?ns.map(entry).join(''):`<div class="todo">${c?'Work logged, no written note for this day.':'No activity this day.'}</div>`)}
 function logFeed(){const tags=['All','Thinking','Decision','Learned','Shipped'];$('#bwTg').innerHTML=tags.map(t=>`<button class="chip ${t===tagF?'on':''}" data-tg="${t}">${t}</button>`).join('');
  const g=[];notes().filter(n=>tagF==='All'||n.tag===tagF).forEach(n=>{const k=key(n.date);let x=g.find(y=>y.k===k);if(!x)g.push(x={k,d:n.date,i:[]});x.i.push(n)});
  $('#bwFd').innerHTML=g.map(x=>`<div class="bwd"><h6>${fmtL(x.d)}</h6>${x.i.map(entry).join('')}</div>`).join('')||'<div class="todo">No notes with this tag yet.</div>'}
 document.addEventListener('click',e=>{const pp=$('#pp');if(!pp.contains(e.target))return;
  const j=e.target.closest('[data-jump]');if(j){const t=document.getElementById(j.dataset.jump);t&&t.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});return}
  const s=e.target.closest('.bwsn');if(s){sel=+s.dataset.i;board();return}
  const t=e.target.closest('[data-tg]');if(t){tagF=t.dataset.tg;logFeed();return}
  const m=e.target.closest('.bwen .more');if(m){const a=m.closest('.bwen');a.classList.toggle('open');m.setAttribute('aria-expanded',a.classList.contains('open'));m.textContent=a.classList.contains('open')?'Hide':'Why I decided this'}});

 /* build log section for a finished project */
 function buildLog(){const S=stats(),ns=notes().slice(0,4);
  return `<div class="ps"><h5>Build log</h5><div class="bwlog"><p style="font-size:14px">Built over 6 sprints with ${S.tot} logged entries across ${S.act} working days. Click a day to see what I wrote.</p>
   <div class="bwseg">${SPR.map(()=>'<i class="d"></i>').join('')}</div><div class="bwhm" id="bwBL"></div><div class="bwday" id="bwBLd"></div>
   <ul>${ns.map(n=>`<li><time>${fmt(n.date)}</time><span><span class="bwtag tg-${n.tag}">${n.tag}</span> ${esc(n.title)}</span></li>`).join('')}</ul></div></div>`}
 function initBuildLog(){const h=$('#bwBL');if(!h)return;heat(h,40,12,3,k=>{const ns=notes().filter(n=>key(n.date)===k),c=ACT[k]||0;
   $('#bwBLd').innerHTML=`<h6>${fmtL(new Date(k+'T12:00'))} · ${c} ${c===1?'entry':'entries'}</h6>`+(ns.length?ns.map(entry).join(''):`<div class="todo">${c?'Work logged, no written note for this day.':'No activity this day.'}</div>`)})}
 return{spot,open,buildLog,initBuildLog,pct,get done(){return done},set done(v){done=v},TODAY,fmt}
})();

/* ---------- FILTERS ---------- */
function renderFilters(){
 const base=projects.filter(p=>F.c==='All'||p.c===F.c),tags=[...new Set(base.map(p=>p.g))];
 [...F.g].forEach(t=>{if(!tags.includes(t))F.g.delete(t)});
 const lobs=F.c===COS[0]?['OTP','OBOT','RTC','Detox'].filter(l=>base.some(p=>p.l===l)):[];
 if(!lobs.length)F.l.clear();
 const n=c=>projects.filter(p=>c==='All'||p.c===c).length;
 const html=`<div class="flt"><div class="fr"><small>Company</small>${['All',...COS].map(c=>`<button class="chip${F.c===c?' on':''}" data-fc="${c}">${c}<em>${n(c)}</em></button>`).join('')}</div>
 <div class="fr"><small>Industry</small>${tags.map(t=>`<button class="chip${F.g.has(t)?' on':''}" data-fg="${t}">${t}<em>${base.filter(p=>p.g===t).length}</em></button>`).join('')}${F.g.size||F.l.size||F.c!=='All'?'<button class="fx" data-fclear>Clear</button>':''}</div>${lobs.length?`<div class="fr"><small>Line of business</small>${lobs.map(l=>`<button class="chip${F.l.has(l)?' on':''}" data-fl="${l}">${l}<em>${base.filter(p=>p.l===l).length}</em></button>`).join('')}</div>`:''}</div>`;
 $$('.fmount:not(.fside)').forEach(m=>m.innerHTML=html);
 $$('.fmount.fside').forEach(sm=>{const ind=tags.map(t=>[t,base.filter(p=>p.g===t).length]).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));
  const op=(k,on,attr,label,ct,r)=>`<button class="opt${r?' r':''}" role="${r?'radio':'checkbox'}" aria-checked="${on}" ${attr}><span class="bx">${on?(r?'●':'✓'):''}</span>${label}<span class="ct">${ct}</span></button>`;
  window.sideInd=()=>{const q=(window.Fq||'').toLowerCase(),l=ind.filter(([g])=>g.toLowerCase().includes(q));return l.map(([g,c])=>op('g',F.g.has(g),`data-fg="${g}"`,g,c)).join('')||'<div class="nomatch">No match.</div>'};
  const o=window.Fo=window.Fo||{c:1,g:1,l:1};
  sm.innerHTML=`<details data-k="c"${o.c?' open':''}><summary>Company</summary>${['All',...COS].map(c=>op('c',F.c===c,`data-fc="${c}"`,c,n(c),1)).join('')}</details>
  <details data-k="g"${o.g?' open':''}><summary>Industry</summary><input type="search" class="indQ" placeholder="Search industries" value="${esc(window.Fq||'')}" aria-label="Search industries"><div class="ilist">${window.sideInd()}</div></details>
  ${lobs.length?`<details data-k="l"${o.l?' open':''}><summary>Line of business</summary>${lobs.map(l=>op('l',F.l.has(l),`data-fl="${l}"`,l,base.filter(p=>p.l===l).length)).join('')}</details>`:''}`;
  $$('details',sm).forEach(d=>d.ontoggle=()=>{o[d.dataset.k]=d.open?1:0});
  const q=$('.indQ',sm);q.oninput=()=>{window.Fq=q.value;$$('.fside .indQ').forEach(x=>{if(x!==q)x.value=q.value});$$('.fside .ilist').forEach(l=>l.innerHTML=window.sideInd())}})
 $$('.wact').forEach(wa=>{const x=(attr,label)=>`<span class="x">${label}<button ${attr} aria-label="Remove ${label}" style="all:unset;cursor:pointer;display:grid"><i>✕</i></button></span>`;
  const act=[];if(F.c!=='All')act.push(x('data-fc="All"',F.c));F.g.forEach(g=>act.push(x(`data-fg="${g}"`,g)));F.l.forEach(l=>act.push(x(`data-fl="${l}"`,l)));
  wa.innerHTML=act.length?act.join('')+'<button class="fx" data-fclear>Clear all</button>':'<span class="none">No filters applied. Showing everything.</span>'})
 const L=vis(),txt=L.length+(L.length===1?' project':' projects')+(F.c==='All'?'':' at '+F.c);
 $$('.cnt').forEach(c=>c.textContent=txt)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-fc],[data-fg],[data-fl],[data-fclear]');if(!b||!stage.contains(b))return;
 if(b.dataset.fc!==undefined){F.c=b.dataset.fc}else if(b.dataset.fl!==undefined){F.l.has(b.dataset.fl)?F.l.delete(b.dataset.fl):F.l.add(b.dataset.fl)}else if(b.dataset.fg!==undefined){F.g.has(b.dataset.fg)?F.g.delete(b.dataset.fg):F.g.add(b.dataset.fg)}else{F.c='All';F.g.clear();F.l.clear()}
 applyFilters()});
function applyFilters(){renderFilters();WK[curWk].build();fit();setTimeout(()=>{WK[curWk].update&&WK[curWk].update();update()},30)}

/* ---------- WORK OPTIONS ---------- */
const hero=$('#hero'),heroHi=$('.hi',hero);
const WK={
 a:{hh:72,build(){const m=$('.mos',$('.wa'));
   const SZ=['w2 h2','','w2','','','h2','w2','w2 h2','','','w3','','w2','','h2','','w2','','','w2 h2','w2',''];
   const arrow='<svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg>';
   let k=0;m.innerHTML=vis().map((p,i)=>p.status==='building'?BW.spot(p,i):`<button class="mt ${SZ[(k++)%SZ.length]}" style="--i:${i}" data-t="${p.t}">${th(p.v,p,'x')}<span class="go">${arrow}</span><span class="lbl">${p.t}<small>${p.k}</small></span></button>`).join('');
   m.onclick=e=>{const b=e.target.closest('.mt,.spot .in');if(b)openP(b.dataset.t)}},
  update(){}},
 b:{hh:88,build(){const stack=$('.stack',$('.wb'));
   stack.innerHTML=vis().map((p,i)=>`<article class="sc3${p.status==='building'?' bld':''}" style="--i:${i}" data-t="${p.t}">${th(p.v,p)}<div class="tx"><small>${p.status==='building'?'<span class="bnow"><i></i>Now building</span> · ':''}${p.k}, ${p.y}</small><h4>${p.t}</h4><p>${p.d}</p></div></article>`).join('');
   stack.onclick=e=>{const b=e.target.closest('.sc3');if(b)openP(b.dataset.t)}},
  update(){const h=hero.offsetHeight,p=clamp(sc.scrollTop/h,0,1);heroHi.style.transform=`scale(${1-.07*p}) translateY(${-24*p}px)`;heroHi.style.opacity=1-.7*p;
   const cards=$$('.sc3');cards.forEach((c,i)=>{const n=cards[i+1];if(!n){c.style.transform='';c.style.filter='';return}
    const stuck=76+Math.min(i,5)*14,top=n.getBoundingClientRect().top-sc.getBoundingClientRect().top,cover=1-clamp((top-stuck)/400,0,1);
    c.style.transform=`scale(${1-.05*cover})`;c.style.filter=`brightness(${1-.4*cover})`})}},
 c:{hh:80,build(){const el=$('.wc'),idx=$('.idx',el),pv=$('.pvw',el);
   idx.innerHTML=vis().map((p,i)=>`<div class="ixw${p.status==='building'?' bld':''}" style="--i:${i}" data-v="${p.v}" data-t="${p.t}"><button class="ixr"><b>${p.t}</b><span>${p.status==='building'?'<span class="bnow"><i></i>Now building</span><br>':''}${p.k}<br>${p.y}</span></button><div class="inl"><div><div class="inh">${th(p.v,p)}<p>${p.d}</p></div></div></div></div>`).join('');
   const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{root:sc,threshold:.2});
   $$('.ixw',idx).forEach(r=>io.observe(r));
   let tx=0,ty=0,cx=0,cy=0,raf=0;const loop=()=>{cx+=(tx-cx)*.14;cy+=(ty-cy)*.14;pv.style.transform=`translate(${cx}px,${cy}px) rotate(${clamp((tx-cx)*.08,-8,8)}deg)`;raf=requestAnimationFrame(loop)};
   el.onpointermove=e=>{const r=el.getBoundingClientRect();tx=e.clientX-r.left+26;ty=e.clientY-r.top-95};
   idx.onpointerover=e=>{if(!HOVER)return;const w=e.target.closest('.ixw');if(!w)return;if(!el.classList.contains('hov')){const r=el.getBoundingClientRect();cx=tx;cy=ty;cancelAnimationFrame(raf);raf=requestAnimationFrame(loop)}el.classList.add('hov');$$('.ixw',idx).forEach(x=>x.classList.toggle('on',x===w));$('.th',pv).dataset.v=w.dataset.v};
   idx.onpointerleave=()=>{el.classList.remove('hov');$$('.ixw',idx).forEach(x=>x.classList.remove('on'));cancelAnimationFrame(raf)};
   idx.onclick=e=>{const w=e.target.closest('.ixw');if(!w)return;if(HOVER)openP(w.dataset.t);else w.classList.toggle('open')}},
  update(){}},
 d:{hh:72,build(){const el=$('.wd'),scr=$('.screen',el),tbs=$('.tbs',el);let cur=0;const L=vis();
   const show=i=>{const p=L[i];if(!p)return;scr.classList.add('sw');setTimeout(()=>{{const t=$('.th',scr),u=shot(p);t.dataset.v=p.v;t.classList.toggle('has',!!u);t.innerHTML=u?`<img src="${u}" alt="">`:''};$('.url',el).textContent=p.u;$('.info h3',el).textContent=p.t;$('.info p',el).textContent=p.k+', '+p.c;scr.classList.remove('sw')},cur===i&&tbs.dataset.b?200:0)};
   tbs.innerHTML=L.map((p,i)=>`<button class="chip${i?'':' on'}" data-i="${i}">${p.status==='building'?'<span class="bnow"><i></i></span>':''}${p.t}</button>`).join('');
   tbs.dataset.b='';show(0);tbs.dataset.b='1';
   tbs.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;const i=+b.dataset.i;if(i===cur)return;cur=i;$$('.chip',tbs).forEach(x=>x.classList.toggle('on',x===b));show(i)};
   $('#dOpen').onclick=()=>L[cur]&&openP(L[cur].t)},
  update(){const el=$('.wd'),fr=$('.frame',el),s=sc.getBoundingClientRect(),r=fr.getBoundingClientRect(),t=clamp((s.bottom-r.top)/(s.height*.85),0,1),e=1-Math.pow(1-t,2);
   fr.style.transform=`perspective(1500px) rotateX(${(28*(1-e)).toFixed(2)}deg) scale(${(.9+.1*e).toFixed(3)})`}}};
const WK_DESC={
 a:['Mosaic bento','The work is a bento mosaic of mixed-size tiles that rise in one after another under the hero. Larger tiles can lead with your strongest projects. Tiles lift on hover, and clicking any tile opens a popup with the project details and a link to the live site.'],
 b:['Curtain sheet','The work arrives as a rounded sheet that slides up over the hero, which stays pinned, shrinks and dims behind it. Inside, project cards stack on top of each other as you scroll. The peek at the bottom of the hero shows the sheet\'s handle and heading. It is the most cinematic of the four.'],
 c:['Index with preview','The work is a clean list of large project names. Lines draw in and titles rise as the list scrolls into view. Hover a name and a preview image follows the cursor. On touch screens, tapping a row expands it. The quietest and most editorial option.'],
 d:['Tilted browser','A project is shown inside a browser window that starts tilted back and flattens to face the screen as you scroll. The tabs below swap between projects. It shows the work at a large size right away, so a visitor sees real design before scrolling far.']};
const HH=[100,88,80,72,64];
let curWk='a',curHH=72;
function fit(){stage.style.setProperty('--sh',sc.clientHeight+'px')}
function setHH(v){curHH=v;stage.style.setProperty('--hh',v/100);$$('#hhTabs .chip').forEach(c=>c.classList.toggle('on',+c.dataset.v===v));
 $('#hhNote').innerHTML=`<b>Hero height: ${v}%</b>${v===100?'A full-height hero. Nothing from the work shows until the first scroll, so the transition does all of the work.':`The hero takes ${v}% of the screen, so the top ${100-v}% shows the start of the work before anyone scrolls. A shorter hero means more work visible, but less room for the name.`}`;fit();update()}
function setWork(k,keep){curWk=k;stage.dataset.wk=k;sc.scrollTop=0;heroHi.style.transform='';heroHi.style.opacity='';fit();
 $$('#wkTabs .chip').forEach(c=>c.classList.toggle('on',c.dataset.k===k));
 $('#wkNote').innerHTML=`<b>${WK_DESC[k][0]}</b>${WK_DESC[k][1]}`;
 if(!keep)setHH(WK[k].hh);else setHH(curHH);
 renderFilters();WK[k].build();hero.classList.remove('play');void hero.offsetWidth;hero.classList.add('play');setTimeout(()=>{fit();WK[k].update&&WK[k].update();update()},30)}
[['a','1 Mosaic bento'],['b','2 Curtain sheet'],['c','3 Index with preview'],['d','4 Tilted browser']].forEach(([k,n])=>{const b=document.createElement('button');b.className='chip';b.dataset.k=k;b.textContent=n;b.onclick=()=>setWork(k);$('#wkTabs').append(b)});
HH.forEach(v=>{const b=document.createElement('button');b.className='chip';b.dataset.v=v;b.textContent=v+'%';b.onclick=()=>setHH(v);$('#hhTabs').append(b)});

/* header highlight + scroll spy */
const hl=$('.hl'),navBtns=$$('.npill button'),secs=['hero','work','resume','contact'];
function moveHl(){const b=$('.npill button.on');if(!b)return;hl.style.width=b.offsetWidth+'px';hl.style.transform=`translateX(${b.offsetLeft}px)`}
function update(){const st=sc.scrollTop,vh=sc.clientHeight;let c='hero';secs.forEach(id=>{if(document.getElementById(id).offsetTop<=st+vh*.5)c=id});
 navBtns.forEach(b=>b.classList.toggle('on',b.dataset.go===c));moveHl()}
sc.addEventListener('scroll',()=>{update();WK[curWk].update&&WK[curWk].update()},{passive:true});
/* ---------- ambient effects: parallax dots, word band, scroll reveals ---------- */
(function(){
 const dots=$('.gdots'),mq=$('#mqs'),mqb=$('#mqb');
 const fx=()=>{const st=sc.scrollTop;stage.style.setProperty('--sy',st);if(mqb&&mq)mq.style.setProperty('--mqx',((mqb.offsetTop-st-sc.clientHeight*.55)*.35)+'px')};
 sc.addEventListener('scroll',fx,{passive:true});addEventListener('resize',fx);fx();
 const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;io.unobserve(t);t.classList.add('in');setTimeout(()=>t.classList.remove('rv','in'),1400)}),{root:sc,threshold:.12});
 const SEL='.work .wh,.about .bt,.xs .wh,.xs .card,.xs .tile,.xs .studio,.xs .tl>li,.xs .skills>*';
 let n=0;const tag=root=>{if(calm)return;$$(SEL,root).forEach(el=>{if(el.dataset.rv||el.closest('.pmod'))return;el.dataset.rv=1;el.style.setProperty('--rd',(n++%4));el.classList.add('rv');io.observe(el)})};
 tag(document);
 new MutationObserver(m=>{n=0;m.forEach(r=>r.addedNodes.forEach(x=>x.nodeType===1&&tag(x.parentNode)))}).observe(sc,{childList:true,subtree:true});
})();

addEventListener('resize',()=>{fit();moveHl();WK[curWk].update&&WK[curWk].update()});document.fonts&&document.fonts.ready.then(moveHl);

/* toggles */
$('#sideChip').onclick=()=>{const on=stage.dataset.side!=='on';stage.dataset.side=on?'on':'off';$('#sideChip').textContent='Sidebar: '+(on?'on':'off');setTimeout(()=>{moveHl();fit()},50)};
$('#stChip').onclick=()=>{const p=projects.find(x=>x.t==='Portfolio site'),sp=$('#bwSpot');
 const flip=()=>{BW.done=!BW.done;p.status=BW.done?'complete':'building';p.y=BW.done?'Shipped':'In progress';$('#stChip').textContent=BW.done?'Reopen Portfolio site':'Mark Portfolio site complete';applyFilters()};
 if(!BW.done&&sp){sp.classList.add('fin');$('.rf',sp).style.setProperty('--off','0');$('.bwring b',sp).textContent='100%';$('.bwpill',sp).innerHTML='<i class="bwdot ok"></i>Shipped';setTimeout(flip,1200)}else flip()};
$('#deskChip').onclick=()=>{const on=stage.dataset.desk!=='on';stage.dataset.desk=on?'on':'off';$('#deskChip').textContent='Bento grid: '+(on?'on':'off')};
const setFull=on=>{stage.classList.toggle('full',on);document.body.style.overflow=on?'hidden':'';$('#expand').textContent=on?'Close preview':'Expand preview';setTimeout(()=>{fit();moveHl();WK[curWk].update&&WK[curWk].update()},60)};
$('#expand').onclick=()=>setFull(!stage.classList.contains('full'));$('#close').onclick=()=>setFull(false);
addEventListener('keydown',e=>{if(e.key==='Escape'){if($('#pmod').classList.contains('open'))closeP();else if($('#widget').classList.contains('open'))closeWidget();}});

/* ---------- RESUME + CONTACT (sections) ---------- */
(function(){
const ORGS={
 tnd:{mark:'assets/tnd-favicon.png',logo:'assets/tnd-logo.png',n:'Trey Nguyen Design',kind:'Freelance studio',mono:'TD',cls:'m-tnd',blurb:'My own design studio.',role:'Product Designer',start:[2025,5],end:null,
  bullets:[]},
 bm:{mark:'assets/baymark-favicon.png',logo:'assets/baymark-logo.png',n:'BayMark Health Services',kind:'Employer',mono:'BM',cls:'m-bm',role:'Full Stack Developer',loc:'Lewisville, TX',start:[2023,2],end:null,
  blurb:'Websites for the treatment programs and centers inside one of the largest addiction treatment organizations.',
  scale:{v:'70,000+',l:'patients treated daily across BayMark',src:'baymark.com',url:'https://baymark.com/'},
  tech:['HubSpot','API integrations','PageSpeed','SEO','Accessibility'],
  bullets:[['Managed the main BayMark website and all of its subsidiaries\' websites.','Sites managed: 14 in this portfolio'],
   ['Improved PageSpeed performance, SEO and accessibility to drive more users to the websites.','PageSpeed score before and after, organic traffic'],
   ['Used modern UX/UI design elements to improve user experience and conversion rates.','Conversion rate before and after'],
   ['Developed marketing automation by implementing HubSpot into the tech stack, giving a more streamlined workflow and follow-up process.','Hours saved, or follow-up time before and after'],
   ['Integrated the enterprise data lake with the marketing tech stack using APIs.','Records or systems connected']]},
 hs:{hsCrop:true,logo:'assets/homeslice-logo.png',n:'The HomeSlice Group Media Company',kind:'Previous employer',mono:'HS',cls:'m-hs',role:'Web Developer',loc:'Rapid City, SD',start:[2022,4],end:[2023,2],
  blurb:'Websites for artists, events, local businesses and a city department.',
  tech:['WordPress','Elementor'],
  bullets:[['Designed and built website templates with WordPress and the Elementor plugin.','Templates built, or sites launched from them'],
   ['Built site integrations and provided security updates to keep the sites maintained.','Sites maintained'],
   ['Built the front end of the WordPress themes and the back-end databases for functionality.','Sites shipped: 12 in this portfolio']]},
 p7:{mark:'assets/702pros-logo.svg',n:'702 Pros LLC',kind:'Internship',mono:'70',cls:'m-p7',role:'Web Developer Intern',loc:'Las Vegas, NV',start:[2021,10],end:[2022,1],
  blurb:'My first web development role.',
  tech:['WordPress','Elementor'],
  bullets:[['Designed and built website templates with WordPress and the Elementor plugin.','Sites launched'],
   ['Built site integrations and provided security updates to keep the sites maintained.','Sites maintained'],
   ['Built the front end of the WordPress themes and the back-end databases for functionality.','Sites shipped']]}};
const S=(o,n,cat,ind,u)=>({o,n,cat,ind,u});
const SITES=[
 S('tnd','Hep C Treatment','Patient resource','Healthcare','hepctreatment.org'),
 S('bm','MedMark','OTP','Healthcare','medmark.com'),S('bm','BAART Programs','OTP','Healthcare','baartprograms.com'),S('bm','Health Care Resource Centers','OTP','Healthcare','hcrcenters.com'),
 S('bm','Applegate Recovery','OBOT','Healthcare','applegaterecovery.com'),S('bm','Middlesex Recovery','OBOT','Healthcare','middlesexrecovery.com'),S('bm','Mahajan Therapeutics','OBOT','Healthcare','mahajantherapeutics.com'),
 S('bm','Granite Recovery Centers','RTC','Healthcare','graniterecoverycenters.com'),S('bm','Liberty Bay Recovery','RTC','Healthcare','libertybayrecovery.com'),S('bm','Mount Sinai Wellness','RTC','Healthcare','mtsinaiwellness.com'),S('bm','New Day Recovery','RTC','Healthcare','new-dayrecovery.com'),S('bm','My Hope for Tomorrow','RTC','Healthcare','myhopefortomorrow.com'),S('bm','San Antonio Recovery Center','RTC','Healthcare','sanantoniorecoverycenter.com'),
 S('bm','Special Care Corp','Detox','Healthcare','specialcarecorp.com'),S('bm','BayMark Health Services','Corporate','Healthcare','baymark.com'),
 S('hs','Brandon Jones Band','Music','Music','brandonjonesband.com'),S('hs','Bryan Loweree','Music','Music','bryanloweree.com'),S('hs','Chancey Williams','Music','Music','chanceywilliams.com'),
 S('hs','Mountain West Whiskey Festival','Events','Events','mountainwestwhiskeyfestival.com'),S('hs','Sturgis Motorcycle Rally','Events','Events','sturgismotorcyclerally.com'),
 S('hs','Just Jymnastics','Kids gymnastics','Recreation','justjymnastics.com'),S('hs','Loud American Food Truck','Food truck','Food & Drink','loudamericanfoodtruck.com'),
 S('hs','Pheasants on Kara Creek','Hunting ranch','Hospitality','pheasantsonkaracreek.com'),S('hs','The Park 707','Venue','Hospitality','thepark707.com'),
 S('hs','Rapid City Police Jobs','Recruitment','Public sector','rapidcitypolicejobs.com'),S('hs','Rapid Spa','Retail','Retail','rapidspa.com'),
 S('p7','AtWork Personnel','Staffing agency','Staffing','atworknv.com'),S('p7','OnSago','Software','Technology','onsago.com'),S('p7','LV Exhibit Rentals','Exhibit rentals','Events','lvexhibitrentals.com'),S('p7','Public Education Foundation','Nonprofit','Education','thepef.org')];
const badge=o=>{const O=ORGS[o];if(O.hsCrop)return `<span class="mono plate hsm" role="img" aria-label="${esc(O.n)} logo"></span>`;
 if(O.mark)return `<span class="mono plate"><img src="${O.mark}" alt="${esc(O.n)} logo"></span>`;return `<span class="mono ${O.cls}">${O.mono}</span>`};
const head=o=>{const O=ORGS[o];return O.logo?`<span class="wplate"><img src="${O.logo}" alt="${esc(O.n)} logo"></span>`:badge(o)};
const ORDER=['tnd','bm','hs','p7'];
const of=o=>SITES.filter(s=>s.o===o);
const groups=(o,key)=>{const m=new Map();of(o).forEach(s=>m.set(s[key],(m.get(s[key])||0)+1));return[...m]};
const TOTAL=SITES.length;
const LOBN={OTP:'OTP',OBOT:'OBOT',RTC:'RTC',Detox:'Detox',Corporate:'Corporate'};
const key=o=>o==='bm'?'cat':'ind'; /* BayMark splits by line of business; the others by industry */
const KC=['k1','k2','k3','k4','k5','k6','k7'];
const link=s=>`<a href="https://${esc(s.u)}" target="_blank" rel="noopener noreferrer">${esc(s.n)}</a>`;
const bars=o=>{const g=groups(o,key(o));if(!g.length)return '';return `<div class="bars" role="img" aria-label="${g.map(([k,c])=>k+' '+c).join(', ')}">${g.map(([k,c],i)=>`<i class="${KC[i%7]}" style="flex:${c}" title="${esc(k)}: ${c}"></i>`).join('')}</div><div class="leg">${g.map(([k,c],i)=>`<span><i class="${KC[i%7]}"></i>${esc(k)} ${c}</span>`).join('')}</div>`};
const MN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const NOW=new Date(),NOWM=[NOW.getFullYear(),NOW.getMonth()+1];
const mm=([y,m])=>y*12+m,span=O=>mm(O.end||NOWM)-mm(O.start)+1;
const dur=n=>{const y=Math.floor(n/12),m=n%12;return (y?y+' yr'+(y>1?'s':''):'')+(y&&m?' ':'')+(m?m+' mo':'')};
const when=O=>O.start?`${MN[O.start[1]-1]} ${O.start[0]} to ${O.end?MN[O.end[1]-1]+' '+O.end[0]:'present'}`:'';
const roleOf=o=>{const O=ORGS[o];return O.role?`<span class="when"><b>${esc(O.role)}</b><small>${when(O)}${O.loc?' · '+esc(O.loc):''}</small></span>`:`<span class="when"><span class="slot role">Role to add</span><small>${when(O)}</small></span>`};
const ovl=(a,b)=>{const ea=a.end?mm(a.end):mm(NOWM),eb=b.end?mm(b.end):mm(NOWM);return mm(a.start)<eb&&mm(b.start)<ea};
const GROUPS=()=>{const arr=ORDER.filter(o=>ORGS[o].start).sort((a,b)=>mm(ORGS[b].start)-mm(ORGS[a].start)),out=[];arr.forEach(o=>{const g=out[out.length-1];if(g&&g.some(x=>ovl(ORGS[x],ORGS[o])))g.push(o);else out.push([o])});return out};
const slots=o=>{const O=ORGS[o];return O.bullets.length?`<ul class="acl">${O.bullets.map(([t,h])=>`<li><span>${esc(t)}</span><em>Add number: ${esc(h)}</em></li>`).join('')}</ul>${O.tech?`<div class="sites" style="margin-top:10px">${O.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div>`:''}`:`<div class="slot"><b>Add what you did here</b>Your role, what you built, and any results for your freelance work.</div>`};
const count=(el,to)=>{if(RM||!el)return;const t0=performance.now();const f=t=>{const p=Math.min(1,(t-t0)/900),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e);if(p<1)requestAnimationFrame(f);else el.textContent=to};el.textContent=0;requestAnimationFrame(f)};

const stat=(n,l)=>`<div><div class="big" data-n="${n}">${n}</div><div class="lbl">${l}</div></div>`;
const orgStats=o=>{const O=ORGS[o],n=of(o).length,g=groups(o,key(o)).length;
 return (O.start?stat2(dur(span(O)),O.end?'in the role':'and counting'):'')+(n?stat(n,n===1?'website worked on':'websites worked on'):'')+(n>1?stat(g,o==='bm'?'lines of business':'kinds of business'):'')};
const stat2=(v,l)=>`<div><div class="big">${v}</div><div class="lbl">${l}</div></div>`;

/* option 1 */
const jobCard=(o,cls='')=>{const O=ORGS[o];return `<article class="job card ${cls}"><div class="jh">${head(o)}<div><h3>${O.n}</h3><span class="kick">${O.kind}</span></div>${roleOf(o)}</div>
 <p style="color:var(--muted)">${O.blurb}</p>
 <div class="jstats">${orgStats(o)}${O.scale?`<div><div class="big">${O.scale.v}</div><div class="lbl">${O.scale.l}</div><span class="src">Company claim · <a href="${O.scale.url}" target="_blank" rel="noopener noreferrer">${O.scale.src}</a></span></div>`:''}</div>
 ${bars(o)}
 <div class="jcols"><div><h5 class="kick" style="margin-bottom:8px">Sites I worked on</h5><div class="sites">${of(o).map(s=>`<a href="https://${esc(s.u)}" target="_blank" rel="noopener noreferrer">${esc(s.n)}</a>`).join('')}</div></div>
 <div><h5 class="kick" style="margin-bottom:8px">What I did</h5>${slots(o)}</div></div></article>`};
$('#rsList').innerHTML=`<div class="studio"><div class="stl"><i></i>Ongoing · my own studio, running alongside every role</div>${jobCard('tnd')}</div><div class="stl mut">Employment</div><ol class="tl">${ORDER.filter(o=>o!=='tnd').map(o=>`<li>${jobCard(o)}</li>`).join('')}</ol>`;


const SK=[['WordPress',4,'4+'],['JavaScript',4,'4'],['Tailwind CSS',3,'3'],['React',1,'1'],['Next.js',1,'1'],['jQuery',1,'1']];
$('#sk').innerHTML=SK.map(([n,y,l])=>`<div class="sk"><span>${n}</span><i><b style="width:${Math.min(100,y/5*100)}%"></b></i><span>${l} ${l==='1'?'yr':'yrs'}</span></div>`).join('')+'<p style="font-size:12px;color:var(--muted)">Also: HTML, CSS, GitHub.</p>';

})();
(function(){
const C={email:'hey@treynguyen.com',phone:'(661) 505-5817',phoneRaw:'+16615055817',
 social:[['LinkedIn','https://www.linkedin.com/in/trey-nguyen/','trey-nguyen'],['Instagram','https://www.instagram.com/treynguyendsgn/','@treynguyendsgn'],['X','https://x.com/TreyNguyenDSGN','@TreyNguyenDSGN'],['YouTube','https://www.youtube.com/@treynguyendesign','@treynguyendesign']]};
const I={mail:'<svg class="ico" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
 phone:'<svg class="ico" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
 cal:'<svg class="ico" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
 form:'<svg class="ico" viewBox="0 0 24 24"><path d="M5 3h14v18H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
 chat:'<svg class="ico" viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
 ext:'<svg class="ico" viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg>',
 send:'<svg class="ico" viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg>'};
async function copy(text,label){let ok=false;try{await navigator.clipboard.writeText(text);ok=true}catch(_){}
 if(!ok){try{const t=document.createElement('textarea');t.value=text;t.style.cssText='position:fixed;opacity:0';document.body.append(t);t.select();ok=document.execCommand('copy');t.remove()}catch(_){}}
 toast(ok?`${label} copied`:`Select and copy: ${text}`)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-copy]');if(b)copy(b.dataset.copy,b.dataset.label||'Copied')});

/* ---------- option 1: hub ---------- */
$('#ctHub').innerHTML=`<div class="hub">
 <div class="tile hi s3 r2"><div><span class="status" style="color:var(--text)"><i class="dot"></i>Currently available for work</span></div><h3>Let's work<br>together.</h3>
  <div class="row"><button class="btn" style="background:#fff;color:#0B1D2E" data-flow="book">Book a call</button><button class="btn ghost" style="color:#fff;border-color:#ffffff66" data-flow="brief">Send a brief</button></div></div>
 <div class="tile s3"><span class="kick">Email</span><div class="val">${C.email}</div><div class="row"><span style="color:var(--muted);font-size:13px">Best for project details</span><button class="copy" data-copy="${C.email}" data-label="Email">Copy address</button></div></div>
 <div class="tile s3"><div class="row"><span class="kick">Call or text</span></div><div class="val">${C.phone}</div><div class="row"><span style="color:var(--muted);font-size:13px">Quick questions</span><span style="display:flex;gap:6px"><button class="copy" data-copy="${C.phone}" data-label="Number">Copy</button><a class="copy" href="tel:${C.phoneRaw}" style="text-decoration:none;color:inherit">Call</a><a class="copy" href="sms:${C.phoneRaw}" style="text-decoration:none;color:inherit">Text</a></span></div></div>
 <button class="tile s2 half" data-flow="book">${I.cal}<div><b style="font-size:17px">Book a call</b><div style="color:var(--muted);font-size:13px">Email to find a time</div></div></button>
 <button class="tile s2 half" data-flow="brief">${I.form}<div><b style="font-size:17px">Send a brief</b><div style="color:var(--muted);font-size:13px">Scope, budget, timeline</div></div></button>
 <button class="tile s2 half" data-flow="chat">${I.chat}<div><b style="font-size:17px">Chat it out</b><div style="color:var(--muted);font-size:13px">Answer a few questions</div></div></button>
 <div class="tile ac s2"><span class="kick">Texas right now</span><div class="clock" id="clk">--:--</div><div style="font-size:13px;opacity:.75">Central Time</div></div>
 <div class="socg" role="group" aria-label="Social profiles">${C.social.map(([n,u,h])=>`<a class="tile" href="${u}" target="_blank" rel="noopener noreferrer"><span class="sn"><b>${n}</b><small>${h}</small></span>${I.ext}</a>`).join('')}</div>
</div>`;
const tick=()=>{const c=$('#clk');if(c)c.textContent=tzp.format(new Date())};tick();setInterval(tick,15000);

/* ---------- contact flows: opened from the hub ---------- */
const TOP=['New website','Redesign','Product design','Just saying hi'],DUR=[15,30,60];
const S2={day:null,time:null,dur:30,topic:TOP[0],done:false,wk:0};
const biz=()=>{const a=[],d=new Date();d.setHours(12,0,0,0);while(a.length<10){d.setDate(d.getDate()+1);if(d.getDay()>0&&d.getDay()<6)a.push(new Date(d))}return a};
const BD=biz();
const TIMES=['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM'];
const taken=(di,ti)=>((di*7+ti*3)%5===0);
const dlab=d=>d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
const okMail=v=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
const FL={kind:null};
function flowShell(kind,title,k){FL.kind=kind;lastFocus=document.activeElement;curP=null;$('#pp').classList.remove('wide');
 $('#pp').innerHTML=`<div class="cf"><div class="cfh"><div><span class="fk">${k}</span><h3 id="pTitle">${title}</h3></div><button class="px" data-pclose aria-label="Close">✕</button></div><div id="cfb"></div></div>`;
 $('#pp').scrollTop=0;$('#pmod').classList.add('open');setTimeout(()=>{const x=$('#pp .px');x&&x.focus({preventScroll:true})},60)}
function openFlow(k){if(k==='book'){location.href='mailto:'+C.email+'?subject='+encodeURIComponent('Call request')+'&body='+encodeURIComponent('Hi Trey,\n\nI would like to set up a call. A few times that work for me:\n')}
 else if(k==='brief'){flowShell('brief','Send a brief','Project details');fBrief()}
 else{flowShell('chat','Chat it out','A few quick questions');fChat()}}
function fBook(){const b=$('#cfb');if(!b)return;const wk=S2.wk,vis=BD.slice(wk*5,wk*5+5);
 if(S2.done){b.innerHTML=`<div class="fok"><span class="fk">Mockup: not booked</span><h4 style="font:800 22px var(--f-head);letter-spacing:-.02em">Here is what the confirmation would say</h4><div class="fsum"><b>${S2.dur}-minute call about ${esc(S2.topic)}</b><span>${dlab(S2.day)} at ${S2.time} Central Time</span><span>Confirmation goes to ${esc(S2.email)}</span></div><p style="color:var(--muted);font-size:14px">On the live site a booking tool such as Cal.com or Calendly would hold the slot and send the invite. This page only shows the flow.</p><div><button class="btn ghost" id="fagain">Start over</button></div></div>`;$('#fagain').onclick=()=>{S2.done=false;S2.day=S2.time=null;fBook()};return}
 b.innerHTML=`<div class="fsch"><div class="fcard"><span class="fk">1 · What for</span><div class="fopts" style="margin:10px 0 18px">${TOP.map(t=>`<button class="fch ${t===S2.topic?'on':''}" data-tp="${esc(t)}">${t}</button>`).join('')}</div>
  <span class="fk">2 · How long</span><div class="fopts" style="margin:10px 0 18px">${DUR.map(d=>`<button class="fch ${d===S2.dur?'on':''}" data-du="${d}">${d} min</button>`).join('')}</div>
  <span class="fk">3 · Pick a day</span><div style="display:flex;justify-content:space-between;align-items:center;margin:10px 0 8px"><span style="font-size:13px;color:var(--muted)">${vis[0].toLocaleDateString('en-US',{month:'long',year:'numeric'})}</span><span class="fopts"><button class="fch" id="fpw" ${wk===0?'disabled':''} aria-label="Previous week">←</button><button class="fch" id="fnw" ${(wk+1)*5>=BD.length?'disabled':''} aria-label="Next week">→</button></span></div>
  <div class="fdays">${vis.map((d,i)=>`<button class="fday ${S2.day&&S2.day.getTime()===d.getTime()?'on':''}" data-i="${wk*5+i}"><small>${d.toLocaleDateString('en-US',{weekday:'short'})}</small><b>${d.getDate()}</b></button>`).join('')}</div></div>
 <div class="fcard"><span class="fk">4 · Pick a time <span class="sample" style="margin-left:6px">sample openings</span></span>
  <p style="font-size:13px;color:var(--muted);margin:8px 0 12px">Central Time (Texas). Your timezone: ${esc(Intl.DateTimeFormat().resolvedOptions().timeZone)}</p>
  ${S2.day?`<div class="fslots">${TIMES.map((t,ti)=>`<button class="fslot ${S2.time===t?'on':''}" data-tm="${t}" ${taken(BD.findIndex(x=>x.getTime()===S2.day.getTime()),ti)?'disabled':''}>${t}</button>`).join('')}</div>`:'<div class="fmock">Choose a day to see open times.</div>'}
  ${S2.time?`<form id="f2" novalidate style="margin-top:16px"><div class="fsum" style="margin-bottom:14px"><b>${S2.dur}-minute call about ${esc(S2.topic)}</b><span>${dlab(S2.day)} at ${S2.time} Central</span></div>
   <div class="ffield"><label class="flab" for="e2n">Your name</label><input type="text" id="e2n" autocomplete="name"><div class="ferr" id="e2ne"></div></div>
   <div class="ffield"><label class="flab" for="e2e">Email for the invite</label><input type="email" id="e2e" autocomplete="email"><div class="ferr" id="e2ee"></div></div>
   <button class="btn" type="submit">Confirm time</button></form>`:''}</div></div>`;
 $$('#cfb [data-tp]').forEach(x=>x.onclick=()=>{S2.topic=x.dataset.tp;fBook()});$$('#cfb [data-du]').forEach(x=>x.onclick=()=>{S2.dur=+x.dataset.du;fBook()});
 $$('#cfb .fday').forEach(x=>x.onclick=()=>{S2.day=BD[+x.dataset.i];S2.time=null;fBook()});$$('#cfb [data-tm]').forEach(x=>x.onclick=()=>{S2.time=x.dataset.tm;fBook()});
 const pw=$('#fpw'),nw=$('#fnw');pw&&(pw.onclick=()=>{S2.wk--;fBook()});nw&&(nw.onclick=()=>{S2.wk++;fBook()});
 const f=$('#f2');f&&f.addEventListener('submit',e=>{e.preventDefault();const n=$('#e2n'),m=$('#e2e');let ok=true;$('#e2ne').textContent='';$('#e2ee').textContent='';[n,m].forEach(x=>x.classList.remove('bad'));
  if(!n.value.trim()){ok=false;n.classList.add('bad');$('#e2ne').textContent='Enter your name.'}
  if(!okMail(m.value.trim())){ok=false;m.classList.add('bad');$('#e2ee').textContent='Enter a valid email address.'}
  if(ok){S2.email=m.value.trim();S2.done=true;fBook()}})}

const PT=['New website','Redesign','Product design','Design system','Not sure yet'],BU=['Under $2k','$2k to $5k','$5k to $10k','$10k and up','Not sure yet'];
const S4={types:new Set(),budget:null};
function fBrief(done){const b=$('#cfb');if(!b)return;
 if(done){const href='mailto:'+C.email+'?subject='+encodeURIComponent('Project brief from '+done.name)+'&body='+encodeURIComponent(done.msg);b.innerHTML=`<div class="fok"><span class="fk">Ready to send</span><h4 style="font:800 22px var(--f-head);letter-spacing:-.02em">Thanks, ${esc(done.name)}.</h4><p>Nothing has been sent yet. Open the message in your email app, or copy it and send it to ${C.email}.</p><div class="fmock">${esc(done.msg)}</div><div class="fopts"><a class="btn" href="${esc(href)}">Open in email</a><button class="btn ghost" data-copy="${esc(done.msg).replace(/\n/g,'&#10;')}" data-label="Message">Copy message</button><button class="btn ghost" id="fagain4">Write another</button></div></div>`;$('#fagain4').onclick=()=>fBrief();return}
 b.innerHTML=`<form class="fcard" id="f4" novalidate>
  <div class="ffield"><label class="flab" for="f4n">Name</label><input type="text" id="f4n" autocomplete="name"><div class="ferr" id="f4ne"></div></div>
  <div class="ffield"><label class="flab" for="f4e">Email</label><input type="email" id="f4e" autocomplete="email"><div class="ferr" id="f4ee"></div></div>
  <div class="ffield"><span class="flab" id="l4t">What do you need?</span><div class="fopts" role="group" aria-labelledby="l4t">${PT.map(t=>`<button type="button" class="fch ${S4.types.has(t)?'on':''}" data-pt="${t}" aria-pressed="${S4.types.has(t)}">${t}</button>`).join('')}</div></div>
  <div class="ffield"><span class="flab" id="l4b">Budget</span><div class="fopts" role="group" aria-labelledby="l4b">${BU.map(t=>`<button type="button" class="fch ${S4.budget===t?'on':''}" data-bu="${t}" aria-pressed="${S4.budget===t}">${t}</button>`).join('')}</div></div>
  <div class="ffield"><label class="flab" for="f4t">Timeline</label><select id="f4t"><option>As soon as possible</option><option>In 1 to 2 months</option><option>In 3 to 6 months</option><option>Just exploring</option></select></div>
  <div class="ffield"><label class="flab" for="f4m">Message</label><textarea id="f4m" maxlength="1000"></textarea><div style="display:flex;justify-content:space-between"><div class="ferr" id="f4me"></div><small id="fcc" style="color:var(--muted)">0 / 1000</small></div></div>
  <div class="fhp" aria-hidden="true"><label for="f4h">Leave this empty</label><input type="text" id="f4h" tabindex="-1" autocomplete="off"></div>
  <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><button class="btn" type="submit">Send message</button><span style="font-size:13px;color:var(--muted)">Or email <b style="color:var(--text)">${C.email}</b></span><button class="copy" type="button" data-copy="${C.email}" data-label="Email">Copy address</button></div></form>`;
 $$('#cfb [data-pt]').forEach(x=>x.onclick=()=>{const t=x.dataset.pt;S4.types.has(t)?S4.types.delete(t):S4.types.add(t);x.classList.toggle('on');x.setAttribute('aria-pressed',S4.types.has(t))});
 $$('#cfb [data-bu]').forEach(x=>x.onclick=()=>{S4.budget=S4.budget===x.dataset.bu?null:x.dataset.bu;$$('#cfb [data-bu]').forEach(y=>{y.classList.toggle('on',y.dataset.bu===S4.budget);y.setAttribute('aria-pressed',y.dataset.bu===S4.budget)})});
 $('#f4m').oninput=e=>{$('#fcc').textContent=e.target.value.length+' / 1000'};
 $('#f4').onsubmit=e=>{e.preventDefault();if($('#f4h').value)return;const n=$('#f4n'),m=$('#f4e'),g=$('#f4m');let ok=true;['f4ne','f4ee','f4me'].forEach(i=>$('#'+i).textContent='');[n,m,g].forEach(x=>x.classList.remove('bad'));
  if(!n.value.trim()){ok=false;n.classList.add('bad');$('#f4ne').textContent='Enter your name.'}
  if(!okMail(m.value.trim())){ok=false;m.classList.add('bad');$('#f4ee').textContent='Enter a valid email address.'}
  if(g.value.trim().length<10){ok=false;g.classList.add('bad');$('#f4me').textContent='Write at least a sentence so Trey can reply usefully.'}
  if(!ok){const bad=$('.bad',$('#f4'));bad&&bad.focus();return}
  fBrief({name:n.value.trim(),msg:'Name: '+n.value.trim()+'\nEmail: '+m.value.trim()+'\nNeed: '+([...S4.types].join(', ')||'Not specified')+'\nBudget: '+(S4.budget||'Not specified')+'\nTimeline: '+$('#f4t').value+'\n\n'+g.value.trim()})}}

const STEPS=[
 {q:"Hi, I'm Trey's assistant. What would you like to talk about?",type:'chips',key:'About',opts:['A new website','A redesign','Product design help','Something else']},
 {q:"Good to know. When would you like to get started?",type:'chips',key:'Timing',opts:['As soon as possible','In 1 to 2 months','Just exploring']},
 {q:"Tell me a little about the project, in a sentence or two.",type:'text',key:'Project',ph:'For example: a site for my small business'},
 {q:"Last thing. What name and email should Trey reply to?",type:'two',key:'Contact'}];
const S3={i:0,a:{}};
function fChat(){S3.i=0;S3.a={};$('#cfb').innerHTML=`<div class="fcv"><div class="fmsgs" aria-live="polite" id="fmg"></div><div id="finp"></div></div>`;fNext()}
const fbot=h=>{const m=document.createElement('div');m.className='fm';m.innerHTML=`<div class="fav">TN</div><div class="fbd">${h}</div>`;$('#fmg').append(m);m.scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'});return m};
const fusr=t=>{const m=document.createElement('div');m.className='fm u';m.innerHTML='<div class="fbub"></div>';$('.fbub',m).textContent=t;$('#fmg').append(m)};
function fNext(){const st=STEPS[S3.i],inp=$('#finp');if(!inp)return;inp.innerHTML='';
 if(!st){fSummary();return}
 fbot(`<p>${esc(st.q)}</p>`);
 if(st.type==='chips'){inp.innerHTML=`<div class="fopts">${st.opts.map(o=>`<button class="fch" data-v="${esc(o)}">${o}</button>`).join('')}</div>`;
  $$('.fch',inp).forEach(x=>x.onclick=()=>{S3.a[st.key]=x.dataset.v;fusr(x.dataset.v);S3.i++;setTimeout(fNext,RM?0:350)})}
 else if(st.type==='text'){inp.innerHTML=`<form class="fcomp" novalidate><label class="flab" for="c3t" style="position:absolute;left:-9999px">Your answer</label><input type="text" id="c3t" placeholder="${esc(st.ph)}" autocomplete="off"><button class="fgo" aria-label="Send">${I.send}</button></form>`;
  $('form',inp).onsubmit=e=>{e.preventDefault();const v=$('#c3t').value.trim();if(!v){$('#c3t').focus();return}S3.a[st.key]=v;fusr(v);S3.i++;setTimeout(fNext,RM?0:350)}}
 else{inp.innerHTML=`<form novalidate class="fcard"><div class="ffield"><label class="flab" for="c3n">Name</label><input type="text" id="c3n" autocomplete="name"><div class="ferr" id="c3ne"></div></div><div class="ffield"><label class="flab" for="c3e">Email</label><input type="email" id="c3e" autocomplete="email"><div class="ferr" id="c3ee"></div></div><button class="btn" type="submit">Continue</button></form>`;
  $('form',inp).onsubmit=e=>{e.preventDefault();const n=$('#c3n'),m=$('#c3e');let ok=true;$('#c3ne').textContent='';$('#c3ee').textContent='';[n,m].forEach(x=>x.classList.remove('bad'));
   if(!n.value.trim()){ok=false;n.classList.add('bad');$('#c3ne').textContent='Enter your name.'}
   if(!okMail(m.value.trim())){ok=false;m.classList.add('bad');$('#c3ee').textContent='Enter a valid email address.'}
   if(!ok)return;S3.a.Name=n.value.trim();S3.a.Email=m.value.trim();fusr(`${S3.a.Name}, ${S3.a.Email}`);S3.i++;setTimeout(fNext,RM?0:350)}}}
function fSummary(){const a=S3.a,txt=`About: ${a.About}\nTiming: ${a.Timing}\nProject: ${a.Project}\nName: ${a.Name}\nEmail: ${a.Email}`;
 const m=fbot(`<p>Thanks, ${esc(a.Name)}. Here is your brief.</p><pre class="fbrief">${esc(txt)}</pre><div class="fmock">Nothing has been sent yet. Open it in your email app or copy it to ${C.email}.</div><div class="fopts"><a class="btn" href="mailto:${C.email}?subject=${encodeURIComponent('Project brief from '+a.Name)}&body=${encodeURIComponent(txt)}">Open in email</a><button class="btn" data-copy="${esc(txt).replace(/\n/g,'&#10;')}" data-label="Brief">Copy brief</button><button class="btn ghost" id="frs">Start over</button></div>`);
 m.querySelector('#frs').onclick=fChat}
$$('#ctHub [data-flow]').forEach(b=>b.onclick=()=>openFlow(b.dataset.flow));


})();




setWork('a');

;try{setFull(true)}catch(e){console.error(e)}
