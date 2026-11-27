(function(){
const SK="__fbstore",AK="__fbauth";
const get=()=>JSON.parse(localStorage.getItem(SK)||"{}"),save=o=>localStorage.setItem(SK,JSON.stringify(o));
const subs=[];let conn=[];
function at(o,p){return p.split("/").filter(Boolean).reduce((a,k)=>a&&a[k],o)}
function setAt(o,p,v){const ks=p.split("/").filter(Boolean);let a=o;ks.slice(0,-1).forEach(k=>{a[k]=a[k]||{};a=a[k]});a[ks[ks.length-1]]=v}
function fire(){subs.forEach(s=>s.cb({val:()=>JSON.parse(JSON.stringify(at(get(),s.p)??null))}))}
window.addEventListener("storage",e=>{if(e.key===SK)fire()});
window.__online=true;
let authCbs=[];
window.firebase={initializeApp(){},
 auth(){return{onAuthStateChanged(cb){authCbs.push(cb);setTimeout(()=>cb(JSON.parse(localStorage.getItem(AK)||"null")),50)},
   signInWithEmailAndPassword(e,p){if(p!=="pass1234")return Promise.reject({code:"auth/wrong-password"});const u={uid:"U1",email:e};localStorage.setItem(AK,JSON.stringify(u));authCbs.forEach(c=>c(u));return Promise.resolve()},
   signOut(){localStorage.removeItem(AK);authCbs.forEach(c=>c(null));return Promise.resolve()}}},
 database(){return{ref(p){return{
   on(ev,cb){if(p===".info/connected"){conn.push(cb);setTimeout(()=>cb({val:()=>window.__online}),20);return}subs.push({p,cb});setTimeout(()=>cb({val:()=>JSON.parse(JSON.stringify(at(get(),p)??null))}),30)},
   once(){return Promise.resolve({val:()=>JSON.parse(JSON.stringify(at(get(),p)??null))})},
   set(v){if(!window.__online)return new Promise(()=>{});const o=get();setAt(o,p,v);save(o);setTimeout(fire,10);return Promise.resolve()}}}}}};
window.__setOnline=v=>{window.__online=v;conn.forEach(c=>c({val:()=>v}))};
})();
