const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, 'node_modules/@fontsource');
const b64 = (p) => fs.readFileSync(p).toString('base64');
const face = (fam, file, w) => `@font-face{font-family:"${fam}";font-weight:${w};src:url(data:font/woff2;base64,${b64(file)}) format("woff2");}`;
const fonts = [400, 600, 700].flatMap((w) => ['arabic', 'latin'].map((s) => face('Plex', `${F}/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-${s}-${w}-normal.woff2`, w))).concat([face('Mono', `${F}/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2`, 500)]).join('\n');
const stories = {
  'story-phishing': { tag: 'منشور جديد', h: 'هل هذه الرسالة <em>تصيّد؟</em>', sub: '4 علامات تكشف الرسالة المزيّفة في ثوانٍ', q: 'ما أغرب رسالة احتيال وصلتك؟' },
  'story-phone': { tag: 'منشور جديد', h: '3 علامات أن هاتفك <em>مخترق</em>', sub: 'وماذا تفعل إذا ظهرت إحداها', q: 'هل لاحظت إحدى هذه العلامات؟' },
  'story-nmap': { tag: 'منشور جديد', h: '<em>Nmap</em> في 30 ثانية', sub: '4 أوامر تكفيك للبداية مع أشهر أداة في Kali Linux', q: 'أي أداة نشرحها بعدها؟' },
};
const html = (s) => `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>${fonts}
*{box-sizing:border-box;margin:0;padding:0}html,body{width:1080px;height:1920px}
body{font-family:"Plex",sans-serif;background:#0E1A24;color:#F3EFE6;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(243,239,230,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(243,239,230,.045) 1px,transparent 1px);background-size:90px 90px}
.band{position:absolute;top:0;right:0;width:18px;height:100%;background:#F2A541}
.page{position:absolute;inset:0;padding:300px 110px 340px 92px;display:flex;flex-direction:column;justify-content:center;gap:56px}
.tag{align-self:flex-start;background:#F2A541;color:#0E1A24;font-weight:700;font-size:40px;padding:10px 32px;border-radius:999px}
h1{font-size:124px;line-height:1.22;font-weight:700}h1 em{font-style:normal;color:#F2A541}
.sub{font-size:50px;line-height:1.55;color:#C9D4DB}
.q{border:3px solid #2F4657;border-radius:28px;padding:44px 48px;font-size:54px;font-weight:600;line-height:1.45}
.q small{display:block;font-size:36px;font-weight:400;color:#9FB2BF;margin-top:14px}
.h{font-family:"Mono",monospace;direction:ltr;text-align:right;font-size:36px;color:#9FB2BF}
</style></head><body><div class="grid"></div><div class="band"></div><div class="page">
<div class="tag">${s.tag}</div><h1>${s.h}</h1><p class="sub">${s.sub}</p>
<div class="q">${s.q}<small>شاهد المنشور على الحساب وشاركنا في التعليقات</small></div><div class="h">@m.o.h.a.mmm.ed</div></div></body></html>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  fs.mkdirSync('out/stories', { recursive: true });
  for (const [n, s] of Object.entries(stories)) { await p.setContent(html(s)); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: `out/stories/${n}.jpg`, type: 'jpeg', quality: 92 }); }
  await b.close();
})();
