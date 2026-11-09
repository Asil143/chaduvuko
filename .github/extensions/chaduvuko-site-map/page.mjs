export const PAGE_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Chaduvuko site map</title>
<style>
:root{--navy:#0b1f3a;--green:#16a34a;--teal:#0d9488;--muted:#64748b;--line:#e2e8f0;color-scheme:light dark}
*{box-sizing:border-box}body{margin:0;font:14px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;color:var(--navy);background:#f8fafc}
@media (prefers-color-scheme:dark){body{background:#0b1220;color:#e2e8f0}:root{--line:#1e293b;--muted:#94a3b8}.card,details{background:#0f172a!important}}
header{padding:16px 20px;border-bottom:1px solid var(--line)}h1{margin:0;font-size:18px}h1 span{color:var(--green)}
.stats{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.card{background:#fff;border:1px solid var(--line);border-radius:8px;padding:6px 10px}
.card b{display:block;font-size:16px}.card small{color:var(--muted)}
.bar{display:flex;flex-wrap:wrap;gap:8px;padding:12px 20px;align-items:end}label{display:flex;flex-direction:column;font-size:12px;color:var(--muted)}
input,select{font:inherit;padding:6px 8px;border:1px solid var(--line);border-radius:6px;min-width:160px;background:inherit;color:inherit}
:focus-visible{outline:2px solid var(--teal);outline-offset:2px}main{padding:0 20px 24px}
details{background:#fff;border:1px solid var(--line);border-radius:8px;margin:6px 0}summary{cursor:pointer;padding:8px 12px;font-weight:600}
details details{margin:4px 12px}ul{margin:0;padding:4px 16px 10px 32px}li{margin:2px 0}
.tag{display:inline-block;font-size:11px;border-radius:999px;padding:0 7px;margin-left:6px;border:1px solid var(--line);color:var(--muted);font-weight:500}
.hidden{color:#64748b;border-style:dashed}.planned{color:#7e22ce;border-color:#d8b4fe}.soon{color:#b45309;border-color:#fcd34d}.thin{color:#dc2626;border-color:#fca5a5}
code{font-size:12px}.muted{color:var(--muted)}#status{position:absolute;left:-9999px}
</style></head><body>
<header><h1>Chaduvuko <span>site map</span></h1><div class="stats" id="stats"></div></header>
<div class="bar" role="search">
<label>Search URL, track, module, file<input id="q" type="search" placeholder="e.g. owasp"></label>
<label>Kind<select id="kind"><option value="">All</option></select></label>
<label>Status<select id="st"><option value="">All</option></select></label>
<label><span>&nbsp;</span><span><input type="checkbox" id="thin" style="min-width:0"> Thin only (&lt;400 words)</span></label>
</div>
<p id="status" role="status" aria-live="polite"></p>
<main id="tree"></main>
<script>
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let data=null,focusVersion=-1;
const $=id=>document.getElementById(id);
function fill(sel,vals){for(const v of vals){const o=document.createElement('option');o.value=v;o.textContent=v;sel.append(o)}}
function tag(r){const t=[];if(r.status!=='live')t.push('<span class="tag '+esc(r.status)+'">'+esc(r.status)+'</span>');
 if(r.kind==='lesson'&&r.built&&r.words<400)t.push('<span class="tag thin">thin</span>');return t.join('')}
function render(){
 const q=$('q').value.trim().toLowerCase(),k=$('kind').value,s=$('st').value,thin=$('thin').checked;
 const rows=data.rows.filter(r=>(!k||r.kind===k)&&(!s||r.status===s)&&(!thin||(r.kind==='lesson'&&r.built&&r.words<400))&&
  (!q||[r.url,r.trackTitle,r.section,r.sourceFile].some(v=>String(v).toLowerCase().includes(q))));
 const groups=new Map();
 for(const r of rows){const g=r.trackTitle?(r.area||'other')+' / '+r.trackTitle:(r.kind==='site'?'Site pages':r.kind);
  if(!groups.has(g))groups.set(g,new Map());const m=groups.get(g),sec=r.section||(r.kind==='lesson'?'Overview':r.kind);
  if(!m.has(sec))m.set(sec,[]);m.get(sec).push(r)}
 const open=Boolean(q||k||s||thin);
 $('tree').innerHTML=[...groups].map(([g,m])=>{const n=[...m.values()].reduce((a,b)=>a+b.length,0);
  return '<details'+(open?' open':'')+'><summary>'+esc(g)+' <span class="tag">'+n+'</span></summary>'+
  [...m].map(([sec,list])=>'<details'+(open?' open':'')+'><summary>'+esc(sec)+' <span class="tag">'+list.length+'</span></summary><ul>'+
  list.map(r=>'<li><code>'+esc(r.url)+'</code>'+tag(r)+' <span class="muted">'+(r.words?r.words+' words · ':'')+esc(r.sourceFile)+'</span></li>').join('')+'</ul></details>').join('')+'</details>'}).join('')||'<p>No pages match.</p>';
 $('status').textContent=rows.length+' pages shown';
}
async function load(){
 const res=await fetch('api/inventory');if(!res.ok){$('tree').textContent=await res.text();return}
 data=await res.json();const t=data.summary.totals;
 $('stats').innerHTML=Object.entries(t).filter(([k])=>k!=='rows').map(([k,v])=>'<div class="card"><b>'+esc(v)+'</b><small>'+esc(k.replace(/([A-Z])/g,' $1').toLowerCase())+'</small></div>').join('')+
  '<div class="card"><b>'+esc(data.summary.generatedAt)+'</b><small>generated</small></div>';
 fill($('kind'),[...new Set(data.rows.map(r=>r.kind))].sort());fill($('st'),[...new Set(data.rows.map(r=>r.status))].sort());render()}
async function poll(){try{const f=await (await fetch('api/focus')).json();if(f.version!==focusVersion){focusVersion=f.version;
 $('q').value=f.query||'';$('kind').value=f.kind||'';$('st').value=f.status||'';$('thin').checked=!!f.thinOnly;if(data)render()}}catch{}}
for(const id of ['q','kind','st','thin'])$(id).addEventListener('input',render);
load().then(poll);setInterval(poll,1500);
</script></body></html>`
