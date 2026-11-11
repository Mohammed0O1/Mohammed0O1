const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const F = path.join(__dirname, 'node_modules/@fontsource');
const b64 = (p) => fs.readFileSync(p).toString('base64');
const face = (fam, file, w) => `@font-face{font-family:"${fam}";font-weight:${w};src:url(data:font/woff2;base64,${b64(file)}) format("woff2");}`;
const fonts = [400, 600, 700].flatMap((w) => [
  face('Plex', `${F}/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-${w}-normal.woff2`, w),
  face('Plex', `${F}/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-${w}-normal.woff2`, w),
]).concat([face('Mono', `${F}/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2`, 500)]).join('\n');

const HANDLE = '@cy.ber.team';
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64');
const REEL = !!process.env.REEL;
const H = REEL ? 1920 : 1350;

const css = `
${fonts}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:${H}px}
body{font-family:"Plex",sans-serif;direction:rtl;background:#0E1A24;color:#F3EFE6;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(243,239,230,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(243,239,230,.045) 1px,transparent 1px);background-size:90px 90px}
.band{position:absolute;top:0;right:0;width:18px;height:100%;background:#F2A541}
.page{position:absolute;inset:0;padding:96px 110px 150px 92px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:center;font-size:30px;color:#9FB2BF}
.top .n{font-family:"Mono",monospace;direction:ltr;letter-spacing:2px}
.tag{color:#F2A541;font-weight:600}
.foot{position:absolute;bottom:64px;right:110px;left:92px;display:flex;justify-content:space-between;align-items:center;font-size:30px;color:#9FB2BF}
.foot .h{font-family:"Mono",monospace;direction:ltr;display:flex;align-items:center;gap:16px}
.foot .h img{width:92px;height:92px;background:#F3EFE6;border-radius:50%;padding:12px;box-sizing:border-box}
.swipe{display:flex;align-items:center;gap:16px;color:#F3EFE6;font-weight:600}
.swipe svg{width:54px;height:24px}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center;gap:44px}
h1{font-size:112px;line-height:1.22;font-weight:700}
h1 em{font-style:normal;color:#F2A541}
h2{font-size:76px;line-height:1.28;font-weight:700}
.sub{font-size:44px;line-height:1.55;color:#C9D4DB}
.big{font-family:"Mono",monospace;font-size:230px;line-height:1;color:#F2A541;direction:ltr;text-align:right}
.body{font-size:46px;line-height:1.6;color:#C9D4DB}
.sms{background:#F3EFE6;color:#14212B;border-radius:36px 36px 36px 8px;padding:44px 48px;font-size:42px;line-height:1.65;box-shadow:0 24px 60px rgba(0,0,0,.35)}
.sms .from{font-family:"Mono",monospace;direction:ltr;text-align:right;font-size:30px;color:#5B6B77;margin-bottom:18px}
.sms .link{font-family:"Mono",monospace;direction:ltr;display:block;text-align:left;color:#B4441F;font-size:36px;margin-top:14px;text-decoration:underline}
.stamp{align-self:flex-start;border:4px solid #E4572E;color:#E4572E;font-weight:700;font-size:38px;padding:8px 28px;border-radius:12px;transform:rotate(-5deg)}
.list{display:flex;flex-direction:column;gap:38px}
.item{display:flex;gap:30px;align-items:flex-start}
.item .k{flex:none;width:84px;height:84px;border-radius:50%;background:#F2A541;color:#0E1A24;font-family:"Mono",monospace;font-size:32px;display:flex;align-items:center;justify-content:center;direction:ltr}
.item .t{font-size:50px;font-weight:600;line-height:1.35}
.item .d{font-size:38px;line-height:1.55;color:#C9D4DB;margin-top:8px}
.note{font-size:34px;line-height:1.6;color:#9FB2BF;border-right:6px solid #2F4657;padding-right:24px}
.code{font-family:"Mono",monospace;direction:ltr;text-align:left;background:#0A131B;border:2px solid #2F4657;border-radius:16px;padding:22px 28px;font-size:38px;color:#F2A541;margin-bottom:14px}
.cmd{display:flex;flex-direction:column;gap:46px}
.cmd .d{font-size:40px;line-height:1.5;color:#C9D4DB}
.pw{font-family:"Mono",monospace;direction:ltr;text-align:center;font-size:64px;border-radius:20px;padding:36px 20px}
.pw.bad{background:#2A1A1A;border:3px solid #E4572E;color:#F3EFE6}
.pw.good{background:#12281F;border:3px solid #4FB286;color:#F3EFE6;font-size:52px}
${REEL ? '.page{padding:280px 110px 420px 92px}.mid{zoom:1.14}.foot{bottom:330px}.swipe{display:none}' : ''}
.q{background:#F2A541;color:#0E1A24;border-radius:28px;padding:48px 52px;font-size:60px;font-weight:700;line-height:1.4}
`;

const arrow = '<svg viewBox="0 0 54 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M52 12H3M13 2 3 12l10 10"/></svg>';

const shell = (tag, i, n, inner, last) => `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="grid"></div><div class="band"></div>
<div class="page"><div class="top"><span class="tag">${tag}</span><span class="n">${String(i).padStart(2, '0')} / ${String(n).padStart(2, '0')}</span></div>
<div class="mid">${inner}</div></div>
<div class="foot"><span class="h"><img src="${LOGO}" alt="">${HANDLE}</span>${last ? '<span></span>' : `<span class="swipe">اسحب ${arrow}</span>`}</div>
</body></html>`;

const item = (k, t, d) => `<div class="item"><div class="k">${k}</div><div><div class="t">${t}</div><div class="d">${d}</div></div></div>`;

const sets = {
  'phishing': {
    tag: 'الأمن السيبراني',
    slides: [
      `<h1>هل هذه الرسالة <em>تصيّد؟</em></h1><p class="sub">4 علامات تكشف الرسالة المزيّفة في ثوانٍ</p>`,
      `<h2>وصلتك رسالة مثل هذه؟</h2>
       <div class="sms"><div class="from">+968 9XXX XXXX</div>عزيزي العميل، تم إيقاف بطاقتك البنكية مؤقتًا. لإعادة تفعيلها اضغط على الرابط خلال 24 ساعة:<span class="link">bank-verify.example/login</span></div>
       <div class="stamp">مثال لرسالة مزيّفة</div>`,
      `<div class="list">
        ${item('1', 'استعجال وتهديد', '«خلال 24 ساعة» أو «سيُغلق حسابك»: الهدف أن تتصرف قبل أن تفكّر.')}
        ${item('2', 'رابط غريب', 'عنوان الرابط لا يطابق الموقع الرسمي للبنك.')}
       </div>`,
      `<div class="list">
        ${item('3', 'مُرسِل مجهول', 'رقم هاتف عادي وليس الاسم الرسمي للجهة.')}
        ${item('4', 'تحية عامة', '«عزيزي العميل» بدل اسمك الحقيقي.')}
       </div>`,
      `<h2>ماذا تفعل؟</h2>
       <div class="list">
        ${item('1', 'لا تضغط على الرابط', 'ولا تُدخل أي بيانات أو رمز تحقق.')}
        ${item('2', 'تواصل مع البنك مباشرة', 'عبر رقمه الرسمي أو تطبيقه فقط.')}
        ${item('3', 'احظر الرقم وبلّغ عنه', 'ونبّه أهلك وزملاءك.')}
       </div>`,
      `<div class="q">هل وصلتك رسالة مثل هذه من قبل؟</div><p class="sub">اكتب لنا في التعليقات، وتابع الحساب لمزيد من نصائح الأمن السيبراني.</p>`,
    ],
  },
  'phone-signs': {
    tag: 'الأمن السيبراني',
    slides: [
      `<h1>3 علامات أن هاتفك <em>مخترق</em></h1><p class="sub">وماذا تفعل إذا ظهرت إحداها</p>`,
      `<div class="big">01</div><h2>البطارية تنفد بسرعة والهاتف يسخن</h2><p class="body">برامج التجسس تعمل في الخلفية طوال الوقت وتستهلك الطاقة.</p>`,
      `<div class="big">02</div><h2>استهلاك بيانات غير معتاد</h2><p class="body">ارتفاع مفاجئ في استهلاك الإنترنت دون أي تغيير في استخدامك.</p>`,
      `<div class="big">03</div><h2>نشاط لم تقم به أنت</h2><p class="body">تطبيقات لم تثبّتها، أو رسائل أُرسلت من حساباتك دون علمك.</p>`,
      `<h2>ماذا تفعل؟</h2>
       <div class="list">
        ${item('1', 'احذف التطبيقات غير المعروفة', 'وراجع صلاحيات بقية التطبيقات.')}
        ${item('2', 'حدّث النظام والتطبيقات', 'التحديثات تسدّ الثغرات المعروفة.')}
        ${item('3', 'غيّر كلمات المرور', 'وفعّل التحقق بخطوتين لحساباتك.')}
       </div>
       <p class="note">هذه العلامات لا تعني الاختراق دائمًا، لكنها تستحق الفحص.</p>`,
      `<div class="q">هل لاحظت إحدى هذه العلامات على هاتفك؟</div><p class="sub">شاركنا في التعليقات، وتابع الحساب لمزيد من نصائح الأمن السيبراني.</p>`,
    ],
  },
  'nmap': {
    tag: 'أدوات Kali Linux',
    slides: [
      `<h1><em>Nmap</em> في 30 ثانية</h1><p class="sub">أشهر أداة لاكتشاف الأجهزة والمنافذ المفتوحة على الشبكة</p>`,
      `<h2>ما هو Nmap؟</h2><p class="body">أداة مجانية ومفتوحة المصدر تكشف الأجهزة المتصلة بالشبكة، والمنافذ المفتوحة، والخدمات التي تعمل عليها.</p><p class="body">يستخدمها مختبرو الاختراق ومسؤولو الشبكات كل يوم.</p>`,
      `<div class="cmd">
        <div><div class="code">nmap 192.168.1.10</div><div class="d">فحص أشهر 1000 منفذ على جهاز واحد.</div></div>
        <div><div class="code">nmap -sn 192.168.1.0/24</div><div class="d">اكتشاف الأجهزة المتصلة بالشبكة دون فحص المنافذ.</div></div>
       </div>`,
      `<div class="cmd">
        <div><div class="code">nmap -sV 192.168.1.10</div><div class="d">معرفة الخدمات وإصداراتها على المنافذ المفتوحة.</div></div>
        <div><div class="code">nmap -p 22,80,443 192.168.1.10</div><div class="d">فحص منافذ محددة فقط.</div></div>
       </div>`,
      `<h2>تنبيه مهم</h2><p class="body">افحص فقط الشبكات والأجهزة التي تملكها أو لديك إذن مكتوب بفحصها.</p><p class="note">الفحص دون إذن مخالف للقانون، حتى لو كان بدافع التعلّم.</p>`,
      `<div class="q">أي أداة تريد أن نشرحها بعد Nmap؟</div><p class="sub">اكتب اسمها في التعليقات، وتابع الحساب لمزيد من شروحات Kali Linux.</p>`,
    ],
  },
  'passphrase': {
    tag: 'الأمن السيبراني',
    slides: [
      `<h1>كلمة مرور أم <em>عبارة مرور؟</em></h1><p class="sub">أيهما أقوى، وأيهما أسهل للحفظ</p>`,
      `<h2>تبدو معقدة، لكنها ضعيفة</h2><div class="pw bad">P@ssw0rd!</div><p class="body">قصيرة ومبنية على كلمة شائعة. استبدال الحروف برموز حيلة يعرفها المهاجمون جيدًا.</p>`,
      `<h2>طويلة، وسهلة الحفظ</h2><div class="pw good">coffee-mountain-moon-27</div><p class="body">عبارة من كلمات عشوائية غير مترابطة. الطول أهم من التعقيد.</p>`,
      `<h2>كيف تكتب عبارة قوية؟</h2>
       <div class="list">
        ${item('1', 'أربع كلمات عشوائية أو أكثر', 'لا علاقة بينها ولا تكوّن جملة معروفة.')}
        ${item('2', 'لا شيء شخصي', 'لا اسمك ولا تاريخ ميلادك ولا رقم هاتفك.')}
        ${item('3', 'عبارة مختلفة لكل حساب', 'تسريب واحد لا يفتح بقية حساباتك.')}
       </div>`,
      `<h2>وأضف طبقتين</h2>
       <div class="list">
        ${item('1', 'مدير كلمات المرور', 'يولّد العبارات ويحفظها عنك.')}
        ${item('2', 'التحقق بخطوتين', 'يحمي حسابك حتى لو تسرّبت كلمة المرور.')}
       </div>`,
      `<div class="q">هل تستخدم كلمة المرور نفسها لأكثر من حساب؟</div><p class="sub">أجب بصراحة في التعليقات، وتابع الحساب لمزيد من نصائح الأمن السيبراني.</p>`,
    ],
  },
  'wifi': {
    tag: 'الأمن السيبراني',
    slides: [
      `<h1>Wi-Fi عام؟ <em>3 أخطاء</em> تكشف بياناتك</h1><p class="sub">في المقهى أو المطار أو الفندق</p>`,
      `<div class="big">01</div><h2>الدخول إلى حسابك البنكي</h2><p class="body">الشبكات العامة قد تكون مراقَبة. أجّل المعاملات المالية أو استخدم بيانات الهاتف.</p>`,
      `<div class="big">02</div><h2>الاتصال التلقائي بالشبكات</h2><p class="body">هاتفك قد يتصل بشبكة مزيّفة تحمل اسمًا مألوفًا. عطّل الاتصال التلقائي.</p>`,
      `<div class="big">03</div><h2>تجاهل تحذيرات المتصفح</h2><p class="body">إذا ظهر تحذير «الاتصال غير آمن» فلا تتابع ولا تُدخل أي بيانات.</p>`,
      `<div class="q">هل تستخدم Wi-Fi العام بدون حماية؟</div><p class="sub">أجب في التعليقات.</p>`,
    ],
  },
  'ip-mac': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>IP أم <em>MAC؟</em></h1><p class="sub">الفرق بين العنوانين في 30 ثانية</p>`,
      `<div class="big">01</div><h2>عنوان MAC</h2><div class="code">00:1A:2B:3C:4D:5E</div><p class="body">عنوان ثابت للبطاقة الشبكية يحدده المصنّع، ويُستخدم داخل الشبكة المحلية.</p>`,
      `<div class="big">02</div><h2>عنوان IP</h2><div class="code">192.168.1.25</div><p class="body">عنوان منطقي يُعطى للجهاز في الشبكة، ويتغيّر بتغيّر الشبكة.</p>`,
      `<div class="big">03</div><h2>كيف يعملان معًا؟</h2><p class="body">عنوان IP يوصل البيانات إلى الشبكة الصحيحة، وعنوان MAC يوصلها إلى الجهاز الصحيح داخلها. بروتوكول ARP يربط بينهما.</p>`,
      `<div class="q">ما الموضوع التالي الذي تريده في الشبكات؟</div><p class="sub">اكتبه في التعليقات.</p>`,
    ],
  },
  'ai-security': {
    tag: 'الذكاء الاصطناعي',
    slides: [
      `<h1><em>3 استخدامات</em> للذكاء الاصطناعي في الأمن السيبراني</h1>`,
      `<div class="big">01</div><h2>كشف السلوك غير المعتاد</h2><p class="body">يتعلّم النمط الطبيعي للشبكة وينبّه عند أي نشاط غريب.</p>`,
      `<div class="big">02</div><h2>فرز التنبيهات</h2><p class="body">يرتّب آلاف التنبيهات حسب الخطورة ليركّز المحلل على الأهم.</p>`,
      `<div class="big">03</div><h2>كشف رسائل التصيّد</h2><p class="body">يحلل نص الرسالة وروابطها ليكتشف الاحتيال قبل أن يصل إليك.</p>`,
      `<div class="q">هل سيغيّر الذكاء الاصطناعي وظائف الأمن السيبراني؟</div><p class="sub">شاركنا رأيك في التعليقات.</p>`,
    ],
  },
  'python-libs': {
    tag: 'Python للأمن السيبراني',
    slides: [
      `<h1><em>3 مكتبات</em> Python لكل مختص أمن</h1><p class="sub">ابدأ بها لبناء أدواتك الخاصة</p>`,
      `<div class="big">01</div><div class="code">import socket</div><h2>الاتصال بالشبكة</h2><p class="body">لبناء أدوات فحص المنافذ والاتصال بالخوادم.</p>`,
      `<div class="big">02</div><div class="code">import requests</div><h2>التعامل مع الويب</h2><p class="body">لإرسال الطلبات إلى المواقع وواجهات API واختبارها.</p>`,
      `<div class="big">03</div><div class="code">from scapy.all import *</div><h2>حزم الشبكة</h2><p class="body">لبناء حزم الشبكة والتقاطها وتحليلها.</p>`,
      `<div class="q">ما أول أداة كتبتها بلغة Python؟</div><p class="sub">أخبرنا في التعليقات.</p>`,
    ],
  },
  'subnetting': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>Subnetting <em>بخدعة واحدة</em></h1><p class="sub">احسب الشبكات الفرعية في ثوانٍ، دون جداول</p>`,
      `<h2>الخدعة: الرقم السحري</h2><div class="code">block = 256 − mask</div><p class="body">اطرح آخر رقم غير الصفر في القناع من 256. النتيجة هي حجم كل شبكة فرعية، وتبدأ الشبكات من مضاعفاته.</p>`,
      `<h2>مثال: ‎/26</h2><div class="code">255.255.255.192</div><div class="code">256 − 192 = 64</div><p class="body">كل شبكة فرعية حجمها 64 عنوانًا.</p>`,
      `<h2>الشبكات الفرعية</h2><div class="code">.0  ·  .64  ·  .128  ·  .192</div><p class="body">4 شبكات، في كل منها 62 جهازًا قابلًا للاستخدام، بعد طرح عنوان الشبكة وعنوان البث.</p>`,
      `<h2>جرّب بنفسك</h2><div class="code">‎/27  →  255.255.255.224</div><p class="body">كم حجم كل شبكة فرعية؟ وكم جهازًا في كل منها؟</p>`,
      `<div class="q">اكتب إجابتك عن ‎/27 في التعليقات</div><p class="sub">وتابع الحساب لمزيد من شروحات CCNA.</p>`,
    ],
  },
  'ports-quiz': {
    tag: 'اختبر نفسك',
    slides: [
      `<h1>اختبار سريع: <em>أي منفذ؟</em></h1><p class="sub">سؤال يتكرر في مقابلات العمل وامتحانات الشهادات</p>`,
      `<h2>ما المنفذ الافتراضي لبروتوكول HTTPS؟</h2>
       <div class="list">
        ${item('A', '80', '')}
        ${item('B', '443', '')}
        ${item('C', '22', '')}
       </div>`,
      `<div class="q">اكتب إجابتك في التعليقات قبل أن تسحب</div><p class="sub">A أو B أو C؟</p>`,
      `<div class="big">B</div><h2>المنفذ 443</h2><p class="body">HTTPS هو HTTP مع تشفير TLS، ويستخدم المنفذ 443 افتراضيًا.</p>`,
      `<h2>منافذ يجب أن تحفظها</h2>
       <div class="list">
        ${item('22', 'SSH', 'الدخول الآمن عن بُعد')}
        ${item('53', 'DNS', 'ترجمة أسماء المواقع إلى عناوين')}
        ${item('80', 'HTTP', 'الويب دون تشفير')}
        ${item('443', 'HTTPS', 'الويب المشفّر')}
       </div>`,
      `<div class="q">هل أجبت بشكل صحيح؟</div><p class="sub">أخبرنا في التعليقات، وتابع الحساب لاختبار جديد.</p>`,
    ],
  },
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: H }, deviceScaleFactor: 1 });
  for (const [name, set] of Object.entries(sets)) {
    if (process.argv.length > 2 && !process.argv.includes(name)) continue;
    const dir = path.join(__dirname, REEL ? 'out/reel' : 'out', name);
    if (REEL) set.slides.push(`<h2>قريبًا</h2><p class="body">دورات محدّثة في الأمن السيبراني، والشبكات، والذكاء الاصطناعي.</p><div class="q">تابع الحساب ليصلك الإعلان أولًا</div>`);
    fs.mkdirSync(dir, { recursive: true });
    const n = set.slides.length;
    for (let i = 0; i < n; i++) {
      await page.setContent(shell(set.tag, i + 1, n, set.slides[i], i === n - 1));
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: path.join(dir, `${name}-${String(i + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 92 });
    }
  }
  await browser.close();
})();
