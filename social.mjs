import { chromium } from 'playwright';
import QRCode from 'qrcode';
const URL='https://vetpepwellness.github.io/website/';
const qr=await QRCode.toDataURL(URL,{margin:1,width:560,color:{dark:'#0b2e28',light:'#ffffff'},errorCorrectionLevel:'M'});
const logo=`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
 <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6cd86"/><stop offset=".5" stop-color="#c9a14a"/><stop offset="1" stop-color="#a8842f"/></linearGradient></defs>
 <path d="M60 14c0-4 2-7 5-9-1 4-1 7-5 9z" fill="url(#g)"/><path d="M60 14c0-4-2-7-5-9 1 4 1 7 5 9z" fill="url(#g)"/><circle cx="60" cy="8" r="2.4" fill="url(#g)"/>
 <path d="M34 30 L60 86 L86 30 L77 30 L60 67 L43 30 Z" fill="url(#g)"/>
 <g fill="url(#g)"><ellipse cx="44" cy="92" rx="3.4" ry="6.6" transform="rotate(35 44 92)"/><ellipse cx="51" cy="98" rx="3" ry="5.8" transform="rotate(28 51 98)"/><ellipse cx="76" cy="92" rx="3.4" ry="6.6" transform="rotate(-35 76 92)"/><ellipse cx="69" cy="98" rx="3" ry="5.8" transform="rotate(-28 69 98)"/></g>
 <path d="M48 100 Q60 108 72 100" stroke="url(#g)" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;
function page(W,H){ return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;font-family:'Jost',sans-serif;color:#f4ecdb;
 background:radial-gradient(900px 600px at 50% -6%, rgba(201,161,74,.16), transparent 60%), linear-gradient(165deg,#0e352e,#07211d 72%);
 display:flex;flex-direction:column;align-items:center;text-align:center;padding:70px 70px 56px}
.logo{width:150px;height:150px;filter:drop-shadow(0 10px 24px rgba(0,0,0,.5))}
h1{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:82px;line-height:1.02;color:#f5eedd;margin-top:6px}
.tag{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:40px;color:#e3c478;margin-top:2px}
.tag::before,.tag::after{content:"·";margin:0 14px;color:#c9a14a}
.vet{margin-top:22px;font-size:23px;color:#e3c478;border:1px solid rgba(201,161,74,.45);border-radius:999px;padding:11px 28px;letter-spacing:1.5px}
.lead{margin-top:30px;font-size:31px;color:#dfe7e2;max-width:760px;line-height:1.45}
.pills{display:flex;gap:26px;justify-content:center;margin-top:24px;color:#cdd8d2;font-size:22px;letter-spacing:3px;text-transform:uppercase}
.qrcard{margin-top:34px;background:#fff;border-radius:24px;padding:22px;box-shadow:0 16px 40px rgba(0,0,0,.4);border:6px solid #c9a14a}
.qrcard img{display:block;width:300px;height:300px}
.scan{margin-top:16px;font-family:'Cormorant Garamond',serif;font-size:38px;color:#f5eedd}
.foot{margin-top:auto;color:#9fb1aa;font-size:20px;letter-spacing:.5px}
</style></head><body>
 <div class="logo">${logo}</div>
 <h1>Vet Pep Wellness</h1>
 <div class="tag">Peps and More</div>
 <div class="vet">★ Veteran Founded &amp; Operated</div>
 <div class="lead">A veteran-owned wellness brand focused on recovery, vitality &amp; longevity.</div>
 <div class="pills"><span>Quality</span><span>Discreet</span><span>Nationwide</span></div>
 <div class="qrcard"><img src="${qr}"/></div>
 <div class="scan">Scan to explore</div>
 <div class="foot">vetpepwellness.github.io/website · Must be 21+</div>
</body></html>`; }
const b=await chromium.launch();
for(const [w,h,name] of [[1080,1080,'flyer-social-square'],[1080,1920,'flyer-social-story']]){
  const pg=await b.newPage({viewport:{width:w,height:h}});
  await pg.setContent(page(w,h),{waitUntil:'networkidle'}); await pg.waitForTimeout(900);
  await pg.screenshot({path:`/home/user/website/assets/${name}.png`}); console.log('rendered',name);
}
await b.close();
