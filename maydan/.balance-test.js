const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:400,height:800}});
pg.on('pageerror',e=>console.log('ERR',e.message));
await pg.goto('file://'+process.cwd()+'/index.html');
const run=async(id,setup,choice)=>pg.evaluate(([id,setup,choice])=>{__start(id);const G=__G();
 const m=G.units.filter(u=>u.side==='m');eval(setup);for(const u of m){u.x=u.tx;u.y=u.ty}
 __go();document.querySelector('#modal .nav .bt').click();
 let n=0;while(!G.over&&n<40000){if(document.querySelector('#modal.on')){const bs=document.querySelectorAll('#modal .nav .bt');(bs[choice]||bs[0]).click()}G.paused=false;__step(0.05);n++}
 return [G.over,Math.round(G.t),document.querySelector('#modalIn h3').textContent,m.map(u=>Math.round(u.n)).join(',')]},[id,setup,choice]);
console.log('badr wells',await run('badr',"m[0].ty=480;m[1].tx=360;m[1].ty=500;m[2].tx=540;m[2].ty=500;m[3].ty=420",0));
console.log('badr none',await run('badr',"",0));
console.log('badr scattered',await run('badr',"m[0].ty=600;m[1].tx=80;m[1].ty=600;m[2].tx=820;m[2].ty=600",0));
console.log('uhud hill obey',await run('uhud',"m[3].tx=215;m[3].ty=560",0));
console.log('uhud hill descend',await run('uhud',"m[3].tx=215;m[3].ty=560",1));
console.log('uhud nohill',await run('uhud',"",0));
await pg.screenshot({path:'s1.png'});
await b.close()})();
