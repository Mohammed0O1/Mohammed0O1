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
.codeblock{font-family:"Mono",monospace;direction:ltr;text-align:left;white-space:pre;background:#0A131B;border:2px solid #2F4657;border-radius:16px;padding:26px 28px;font-size:29px;line-height:1.55;color:#F3EFE6}
.codeblock b{color:#F2A541;font-weight:500}
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
  'port-scanner': {
    tag: 'Python للأمن السيبراني',
    slides: [
      `<h1>فاحص منافذ بـ<em>Python</em> في 10 أسطر</h1><p class="sub">افهم كيف تعمل أدوات مثل Nmap من الداخل</p>`,
      `<h2>ما فكرة فحص المنافذ؟</h2><p class="body">كل خدمة على الجهاز تنتظر الاتصال على منفذ برقم معيّن. الفاحص يحاول الاتصال بكل منفذ، فإن نجح الاتصال فالمنفذ مفتوح.</p>`,
      `<div class="codeblock"><b>import</b> socket

<b>for</b> port <b>in</b> [22, 80, 443]:
    s = socket.socket()
    s.settimeout(1)
    r = s.connect_ex(("127.0.0.1", port))
    print(port, "open" <b>if</b> r == 0 <b>else</b> "closed")
    s.close()</div><p class="note">يفحص جهازك أنت فقط (127.0.0.1)</p>`,
      `<h2>ماذا يفعل الكود؟</h2>
       <div class="list">
        ${item('1', 'يجهّز اتصالًا', 'socket هو نقطة الاتصال بالشبكة.')}
        ${item('2', 'يحاول الاتصال بكل منفذ', 'وينتظر ثانية واحدة كحد أقصى.')}
        ${item('3', 'يطبع النتيجة', 'الرقم 0 يعني أن الاتصال نجح والمنفذ مفتوح.')}
       </div>`,
      `<h2>تنبيه مهم</h2><p class="body">جرّب الكود على جهازك أو على مختبر تملكه فقط.</p><p class="note">فحص أجهزة أو شبكات الآخرين دون إذن مكتوب مخالف للقانون.</p>`,
      `<div class="q">ما المنافذ التي وجدتها مفتوحة على جهازك؟</div><p class="sub">جرّب الكود وأخبرنا في التعليقات.</p>`,
    ],
  },
  'red-blue': {
    tag: 'مسارات الأمن السيبراني',
    slides: [
      `<h1>الفريق <em>الأحمر</em> أم الفريق <em>الأزرق</em>؟</h1><p class="sub">أي مسار في الأمن السيبراني يناسبك؟</p>`,
      `<div class="big">RED</div><h2>الفريق الأحمر</h2><p class="body">يحاكي المهاجمين بإذن رسمي، ليكتشف الثغرات قبل أن يستغلها غيره.</p>`,
      `<h2>يناسبك الأحمر إذا كنت…</h2>
       <div class="list">
        ${item('1', 'تحب الألغاز والتحدي', 'وتبحث عن الطريق غير المتوقع.')}
        ${item('2', 'فضوليًا تقنيًا', 'تريد أن تعرف كيف يتعطل كل شيء.')}
        ${item('3', 'تستهدف شهادات مثل', 'CEH و OSCP')}
       </div>`,
      `<div class="big">BLUE</div><h2>الفريق الأزرق</h2><p class="body">يراقب الأنظمة، ويكتشف الهجمات، ويستجيب لها ويحمي المؤسسة كل يوم.</p>`,
      `<h2>يناسبك الأزرق إذا كنت…</h2>
       <div class="list">
        ${item('1', 'صبورًا ودقيق الملاحظة', 'تلاحظ ما لا يلاحظه غيرك.')}
        ${item('2', 'تحب التحليل', 'السجلات والتنبيهات والأنماط.')}
        ${item('3', 'تستهدف وظائف مثل', 'محلل SOC والاستجابة للحوادث')}
       </div>`,
      `<div class="q">أحمر أم أزرق؟ ولماذا؟</div><p class="sub">اكتب اختيارك في التعليقات.</p>`,
    ],
  },
  'firewall': {
    tag: 'الشبكات',
    slides: [
      `<h1>ماذا يفعل <em>الجدار الناري</em>؟</h1><p class="sub">في 30 ثانية</p>`,
      `<div class="big">01</div><h2>حارس على الباب</h2><p class="body">يقف بين شبكتك والإنترنت، ويفحص كل اتصال يدخل أو يخرج.</p>`,
      `<div class="big">02</div><h2>يعمل بالقواعد</h2><p class="body">يسمح أو يمنع الاتصال حسب العنوان والمنفذ والبروتوكول.</p>`,
      `<div class="big">03</div><h2>لا يكفي وحده</h2><p class="body">لا يحميك من رابط تصيّد تضغط عليه بنفسك. التوعية جزء من الحماية.</p>`,
      `<div class="q">هل الجدار الناري مفعّل على جهازك؟</div><p class="sub">أجب في التعليقات.</p>`,
    ],
  },
  'fake-site': {
    tag: 'الأمن السيبراني',
    slides: [
      `<h1><em>3 علامات</em> لموقع مزيّف</h1><p class="sub">قبل أن تُدخل بياناتك أو بطاقتك</p>`,
      `<div class="big">01</div><h2>العنوان قريب من الأصلي</h2><p class="body">حرف زائد أو ناقص في اسم الموقع، أو امتداد مختلف عن المعتاد.</p>`,
      `<div class="big">02</div><h2>عروض أكبر من الحقيقة</h2><p class="body">خصومات ضخمة ومؤقت تنازلي يدفعك للشراء بسرعة.</p>`,
      `<div class="big">03</div><h2>طرق دفع غريبة</h2><p class="body">يطلب تحويلًا مباشرًا أو بيانات بطاقتك في صفحة غير آمنة.</p>`,
      `<div class="q">هل وقعت أو كدت تقع في موقع مزيّف؟</div><p class="sub">شاركنا تجربتك في التعليقات.</p>`,
    ],
  },
  'network-cards': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>أنواع <em>بطاقات الشبكة</em></h1><p class="sub">بطلب من أحد متابعينا: الفرق بينها ومتى تستخدم كلًا منها</p>`,
      `<div class="big">01</div><h2>بطاقة Ethernet السلكية</h2><p class="body">تتصل بكابل ومنفذ RJ45. سرعاتها الشائعة 1 و10 جيجابت، وهي الأكثر ثباتًا.</p>`,
      `<div class="big">02</div><h2>بطاقة Wi-Fi اللاسلكية</h2><p class="body">مدمجة في أغلب الأجهزة المحمولة. معاييرها مثل Wi-Fi 6 تحدد السرعة والمدى.</p>`,
      `<div class="big">03</div><h2>محوّلات USB</h2><p class="body">تضيف منفذ شبكة سلكيًا أو لاسلكيًا لجهاز لا يملكه، أو بطاقة ثانية للمختبر.</p>`,
      `<div class="big">04</div><h2>بطاقات الألياف الضوئية</h2><p class="body">بمنافذ SFP في الخوادم ومراكز البيانات، لسرعات عالية ومسافات طويلة.</p>`,
      `<div class="q">أي نوع تستخدم في جهازك الآن؟</div><p class="sub">واكتب الموضوع الذي تريد شرحه بعد ذلك.</p>`,
    ],
  },
  'wireshark': {
    tag: 'أدوات الشبكات',
    slides: [
      `<h1>شاهد ما يمر في <em>شبكتك</em> بأداة Wireshark</h1><p class="sub">أشهر أداة لتحليل حركة الشبكة، مجانية ومفتوحة المصدر</p>`,
      `<h2>ما هو Wireshark؟</h2><p class="body">يلتقط الحزم التي تمر عبر بطاقة الشبكة، ويعرضها لك بالتفصيل: من أين جاءت، وإلى أين تذهب، وما البروتوكول.</p>`,
      `<h2>ابدأ في 3 خطوات</h2>
       <div class="list">
        ${item('1', 'اختر بطاقة الشبكة', 'Wi-Fi أو Ethernet حسب اتصالك.')}
        ${item('2', 'اضغط زر البدء', 'وتصفّح أي موقع لثوانٍ.')}
        ${item('3', 'أوقف الالتقاط', 'وابدأ بقراءة النتائج.')}
       </div>`,
      `<h2>فلاتر تختصر عليك الوقت</h2>
       <div class="code">dns</div><p class="d" style="font-size:36px;color:#C9D4DB;margin-bottom:18px">أسماء المواقع التي يطلبها جهازك</p>
       <div class="code">tcp.port == 443</div><p class="d" style="font-size:36px;color:#C9D4DB;margin-bottom:18px">الاتصالات المشفّرة HTTPS</p>
       <div class="code">ip.addr == 192.168.1.10</div><p class="d" style="font-size:36px;color:#C9D4DB">كل ما يخص جهازًا واحدًا</p>`,
      `<h2>تنبيه مهم</h2><p class="body">استخدم Wireshark على شبكتك أو مختبرك فقط.</p><p class="note">التقاط حركة شبكات الآخرين دون إذن مخالف للقانون.</p>`,
      `<div class="q">ما أول شيء لاحظته عندما شغّلت Wireshark؟</div><p class="sub">أخبرنا في التعليقات.</p>`,
    ],
  },
  'linux-cmds': {
    tag: 'Kali Linux',
    slides: [
      `<h1><em>5 أوامر</em> Linux لكل مبتدئ في الأمن السيبراني</h1>`,
      `<div class="big">01</div><div class="code">ls -la</div><h2>اعرض كل الملفات</h2><p class="body">حتى المخفية، مع صلاحياتها ومالكها.</p>`,
      `<div class="big">02</div><div class="code">ip a</div><h2>بطاقات الشبكة وعناوينها</h2><p class="body">اعرف عنوان IP لجهازك وحالة كل بطاقة.</p>`,
      `<div class="big">03</div><div class="code">ss -tuln</div><h2>المنافذ المفتوحة</h2><p class="body">أي الخدمات تنتظر اتصالًا على جهازك الآن.</p>`,
      `<div class="big">04</div><div class="code">ps aux</div><h2>العمليات التي تعمل</h2><p class="body">اكتشف برنامجًا غريبًا يعمل في الخلفية.</p>`,
      `<div class="big">05</div><div class="code">chmod 600 file</div><h2>تحكّم في الصلاحيات</h2><p class="body">اجعل الملف الحساس مقروءًا لك وحدك.</p>`,
      `<div class="q">ما الأمر الذي تستخدمه أكثر في Linux؟</div><p class="sub">اكتبه في التعليقات.</p>`,
    ],
  },
  'ai-phishing': {
    tag: 'الذكاء الاصطناعي',
    slides: [
      `<h1>الذكاء الاصطناعي يكتب <em>رسائل الاحتيال</em> الآن</h1><p class="sub">وهكذا تكشفها</p>`,
      `<div class="big">01</div><h2>لا أخطاء إملائية بعد اليوم</h2><p class="body">الرسائل المزيّفة أصبحت بلغة سليمة ومقنعة، فلا تعتمد على الأخطاء لكشفها.</p>`,
      `<div class="big">02</div><h2>رسائل باسمك ووظيفتك</h2><p class="body">يجمع المهاجم معلوماتك من حساباتك العامة ليكتب رسالة شخصية جدًا.</p>`,
      `<div class="big">03</div><h2>أصوات مقلّدة</h2><p class="body">مكالمة بصوت مديرك أو قريبك تطلب تحويلًا عاجلًا.</p>`,
      `<h2>كيف تحمي نفسك؟</h2>
       <div class="list">
        ${item('1', 'تحقّق عبر قناة أخرى', 'اتصل بالشخص على رقمه المعروف.')}
        ${item('2', 'احذر من الاستعجال', 'الضغط والسرعة علامة احتيال.')}
        ${item('3', 'لا تشارك رمز التحقق', 'مع أي أحد، مهما بدا موثوقًا.')}
       </div>`,
      `<div class="q">هل وصلتك رسالة احتيال بدت حقيقية جدًا؟</div><p class="sub">شاركنا في التعليقات.</p>`,
    ],
  },
  'soc-day': {
    tag: 'مسارات الأمن السيبراني',
    slides: [
      `<h1>يوم في حياة <em>محلل SOC</em></h1><p class="sub">ماذا يفعل حارس المؤسسة الرقمي من بداية يومه حتى نهايته؟</p>`,
      `<div class="big">01</div><h2>مراجعة تنبيهات الليل</h2><p class="body">يبدأ اليوم بقراءة ما رصدته الأنظمة أثناء الليل، وترتيبه حسب الخطورة.</p>`,
      `<div class="big">02</div><h2>الفرز والتحقيق</h2><p class="body">هل التنبيه هجوم حقيقي أم إنذار كاذب؟ يفحص السجلات في نظام SIEM ليعرف القصة كاملة.</p>`,
      `<div class="big">03</div><h2>الاستجابة</h2><p class="body">عزل جهاز مصاب، أو حظر عنوان مشبوه، أو تصعيد الحادثة للفريق المختص.</p>`,
      `<h2>المهارات المطلوبة</h2>
       <div class="list">
        ${item('1', 'أساسيات الشبكات', 'المنافذ والبروتوكولات وحركة البيانات.')}
        ${item('2', 'قراءة السجلات', 'من الأنظمة والجدران النارية والخوادم.')}
        ${item('3', 'الهدوء تحت الضغط', 'والتواصل الواضح مع الفريق.')}
       </div>`,
      `<div class="q">هل تتخيّل نفسك تعمل في SOC؟</div><p class="sub">أخبرنا في التعليقات.</p>`,
    ],
  },
  'vlan': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>ما هي <em>VLAN</em>؟</h1><p class="sub">في 30 ثانية</p>`,
      `<div class="big">01</div><h2>شبكات منفصلة على جهاز واحد</h2><p class="body">تقسّم سويتش واحدًا إلى عدة شبكات منطقية، كأنها أجهزة منفصلة.</p>`,
      `<div class="big">02</div><h2>أمان أعلى</h2><p class="body">شبكة الضيوف لا ترى أجهزة الموظفين، وقسم المالية معزول عن بقية الأقسام.</p>`,
      `<div class="big">03</div><h2>أداء أفضل</h2><p class="body">رسائل البث تبقى داخل كل شبكة، فتقل الحركة غير الضرورية.</p>`,
      `<div class="big">04</div><h2>إدارة أسهل</h2><p class="body">تنظّم الأجهزة حسب القسم أو الوظيفة، لا حسب مكانها في المبنى.</p>`,
      `<div class="q">هل تستخدم VLAN في شبكة عملك؟</div><p class="sub">أجب في التعليقات.</p>`,
    ],
  },
  'kali-tools': {
    tag: 'Kali Linux',
    slides: [
      `<h1><em>3 أدوات</em> في Kali Linux يجب أن يعرفها كل مبتدئ</h1>`,
      `<div class="big">01</div><div class="code">nmap</div><h2>اكتشاف الشبكة</h2><p class="body">يعرّفك على الأجهزة والمنافذ والخدمات في مختبرك.</p>`,
      `<div class="big">02</div><div class="code">wireshark</div><h2>تحليل الحركة</h2><p class="body">يريك كل حزمة تمر في الشبكة لتفهم ما يحدث فعلًا.</p>`,
      `<div class="big">03</div><div class="code">john</div><h2>اختبار قوة كلمات المرور</h2><p class="body">يكشف ضعف كلمات المرور في أنظمتك أنت، لتستبدلها بأقوى.</p>`,
      `<h2>تنبيه مهم</h2><p class="body">استخدم هذه الأدوات في مختبرك أو بإذن مكتوب فقط.</p><p class="note">استخدامها على أنظمة الآخرين دون إذن مخالف للقانون.</p>`,
      `<div class="q">أي أداة تريد شرحًا مفصّلًا لها؟</div><p class="sub">اكتب اسمها في التعليقات.</p>`,
    ],
  },
  'courses-teaser': {
    tag: 'قريبًا',
    slides: [
      `<h1><em>دورات جديدة</em> قريبًا</h1><p class="sub">من الأساسيات حتى الاحتراف، بالعربي وبتطبيق عملي</p>`,
      `<div class="big">01</div><h2>الأمن السيبراني</h2><p class="body">أساسيات الجاهزية، والمسار الدفاعي، والمسار الهجومي.</p>`,
      `<div class="big">02</div><h2>الشبكات</h2><p class="body">مسار CCNA من البداية، مع مختبرات عملية.</p>`,
      `<div class="big">03</div><h2>Python والذكاء الاصطناعي</h2><p class="body">الذكاء الاصطناعي في الأمن السيبراني، ولغة Python لبناء أدواتك.</p>`,
      `<div class="q">أي مسار يهمك أكثر؟</div><p class="sub">اكتب اختيارك في التعليقات، وفعّل الإشعارات ليصلك الإعلان أولًا.</p>`,
    ],
  },
  'courses-tracks': {
    tag: 'دورات قادمة',
    slides: [
      `<h1>دورات جديدة <em>قريبًا</em></h1><p class="sub">7 مسارات تدريبية في الأمن السيبراني والشبكات والذكاء الاصطناعي، من الأساسيات حتى الاحتراف</p>`,
      `<h2>مسارات الأمن السيبراني</h2>
       <div class="list">
        ${item('1', 'أساسيات الجاهزية السيبرانية', 'نقطة البداية لكل من يدخل المجال.')}
        ${item('2', 'الدفاع السيبراني', 'المراقبة والكشف والاستجابة للحوادث.')}
        ${item('3', 'الأمن الهجومي', 'اختبار الاختراق الأخلاقي بإذن رسمي.')}
       </div>`,
      `<h2>الأدوات والبرمجة</h2>
       <div class="list">
        ${item('4', 'Kali Linux والأدوات السيبرانية', 'تطبيق عملي على أشهر أدوات المجال.')}
        ${item('5', 'Python للأمن السيبراني', 'ابنِ أدواتك الخاصة بنفسك.')}
       </div>`,
      `<h2>الشبكات والذكاء الاصطناعي</h2>
       <div class="list">
        ${item('6', 'شبكات CCNA', 'أساس قوي لكل مختص أمن وشبكات.')}
        ${item('7', 'الذكاء الاصطناعي', 'كيف يغيّر الذكاء الاصطناعي الأمن السيبراني.')}
       </div>`,
      `<h2>لماذا هذه الدورات؟</h2>
       <div class="list">
        ${item('✓', 'بالعربي وبتطبيق عملي', 'مختبرات حقيقية، لا شرح نظري فقط.')}
        ${item('✓', 'مبنية على متطلبات الشهادات', 'مثل CEH و OSCP و CCNA')}
        ${item('✓', 'لكل المستويات', 'للطلاب والباحثين عن مسار مهني جديد.')}
       </div>`,
      `<div class="q">أي مسار تنتظره أكثر؟</div><p class="sub">اكتب رقمه في التعليقات، وفعّل الإشعارات ليصلك الإعلان أولًا.</p>`,
    ],
  },
  'dns': {
    tag: 'الشبكات',
    slides: [
      `<h1>ماذا يحدث عندما <em>تكتب عنوان موقع</em>؟</h1><p class="sub">رحلة DNS في أقل من ثانية</p>`,
      `<div class="big">01</div><div class="code">example.com</div><h2>تكتب الاسم</h2><p class="body">الأجهزة لا تفهم الأسماء، بل الأرقام. يحتاج جهازك إلى عنوان IP الخاص بالموقع.</p>`,
      `<div class="big">02</div><h2>البحث في الذاكرة</h2><p class="body">يبحث المتصفح ثم نظام التشغيل في الذاكرة المؤقتة. إن وُجد العنوان، تنتهي الرحلة هنا.</p>`,
      `<div class="big">03</div><h2>السؤال لخادم DNS</h2><p class="body">إن لم يجده، يسأل خادم DNS لدى مزوّد الإنترنت، والذي يسأل بدوره الخوادم الجذرية ثم خوادم النطاق.</p>`,
      `<div class="big">04</div><div class="code">93.184.215.14</div><h2>الرد بالعنوان</h2><p class="body">يعود عنوان IP إلى جهازك، فيتصل المتصفح بالخادم ويفتح الموقع.</p>`,
      `<h2>لماذا يهم هذا في الأمن؟</h2><p class="body">المهاجم الذي يتلاعب بردود DNS يستطيع توجيهك إلى موقع مزيّف يشبه الأصلي تمامًا.</p><p class="note">لذلك تحقّق دائمًا من القفل وعنوان الموقع قبل إدخال بياناتك.</p>`,
      `<div class="q">هل جرّبت أمر nslookup من قبل؟</div><p class="sub">أخبرنا في التعليقات.</p>`,
    ],
  },
  'osi': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>نموذج <em>OSI</em></h1><p class="sub">7 طبقات في 30 ثانية</p>`,
      `<h2>الطبقات العليا</h2>
       <div class="list">
        ${item('7', 'التطبيقات', 'ما تتعامل معه أنت، مثل HTTP و DNS.')}
        ${item('6', 'العرض', 'التشفير وتنسيق البيانات.')}
        ${item('5', 'الجلسة', 'فتح الاتصال وإدارته وإغلاقه.')}
       </div>`,
      `<h2>طبقة النقل والشبكة</h2>
       <div class="list">
        ${item('4', 'النقل', 'بروتوكولا TCP و UDP، والمنافذ.')}
        ${item('3', 'الشبكة', 'عناوين IP والتوجيه بين الشبكات.')}
       </div>`,
      `<h2>الطبقات الدنيا</h2>
       <div class="list">
        ${item('2', 'ربط البيانات', 'عناوين MAC والسويتشات.')}
        ${item('1', 'الطبقة المادية', 'الكابلات والإشارات والموجات.')}
       </div>`,
      `<h2>نصيحة للامتحان</h2><p class="body">عند حل أي مشكلة شبكة، ابدأ من الطبقة الأولى: هل الكابل موصول؟</p>`,
      `<div class="q">أي طبقة تجدها الأصعب؟</div><p class="sub">اكتب رقمها في التعليقات.</p>`,
    ],
  },
  'ssh-keys': {
    tag: 'Linux · الأمن',
    slides: [
      `<h1>مفاتيح <em>SSH</em> أم كلمة المرور؟</h1><p class="sub">أيهما أكثر أمانًا لدخول خوادمك؟</p>`,
      `<div class="big">01</div><h2>كلمة المرور</h2><p class="body">سهلة، لكنها قابلة للتخمين، والخوادم المكشوفة تتعرض لمحاولات تخمين آلية كل يوم.</p>`,
      `<div class="big">02</div><h2>زوج من المفاتيح</h2><p class="body">مفتاح خاص يبقى على جهازك، ومفتاح عام تضعه على الخادم. لا شيء يُخمَّن.</p>`,
      `<div class="big">03</div><div class="code">ssh-keygen -t ed25519</div><h2>أنشئ مفتاحك</h2><p class="body">أمر واحد ينشئ الزوج، واحمِ المفتاح الخاص بعبارة مرور.</p>`,
      `<div class="big">04</div><div class="code">ssh-copy-id user@server</div><h2>انسخه إلى الخادم</h2><p class="body">بعد التجربة، عطّل الدخول بكلمة المرور في إعدادات الخادم.</p>`,
      `<div class="q">هل تستخدم مفاتيح SSH في عملك؟</div><p class="sub">أجب في التعليقات.</p>`,
    ],
  },
  'https': {
    tag: 'الأمن · الشبكات',
    slides: [
      `<h1>كيف يحميك <em>HTTPS</em>؟</h1><p class="sub">ماذا يعني القفل بجانب عنوان الموقع، وماذا لا يعني</p>`,
      `<div class="big">01</div><h2>بدون تشفير</h2><p class="body">في HTTP العادي تمر بياناتك نصًا واضحًا، ويستطيع أي شخص على الشبكة نفسها قراءتها.</p>`,
      `<div class="big">02</div><h2>الشهادة الرقمية</h2><p class="body">يرسل الموقع شهادة تثبت هويته، ويتحقق منها متصفحك قبل أن يبدأ الاتصال.</p>`,
      `<div class="big">03</div><h2>مفتاح الجلسة</h2><p class="body">يتفق المتصفح والخادم على مفتاح سري جديد لكل جلسة، فيُشفَّر كل ما يمر بينهما.</p>`,
      `<div class="big">04</div><h2>ما لا يضمنه القفل</h2><p class="body">القفل يعني أن الاتصال مشفّر، لا أن الموقع صادق. المواقع المزيّفة تستخدم HTTPS أيضًا.</p><p class="note">تحقّق دائمًا من اسم النطاق نفسه.</p>`,
      `<h2>خلاصة</h2>
       <div class="list">
        ${item('✓', 'القفل ضروري', 'لا تُدخل بياناتك في موقع بدونه.')}
        ${item('✓', 'لكنه لا يكفي', 'راجع اسم الموقع حرفًا حرفًا.')}
       </div>`,
      `<div class="q">هل كنت تظن أن القفل يعني أن الموقع آمن؟</div><p class="sub">أخبرنا في التعليقات.</p>`,
    ],
  },
  'siem': {
    tag: 'الدفاع السيبراني',
    slides: [
      `<h1>ما هو <em>SIEM</em>؟</h1><p class="sub">العقل الذي يجمع سجلات المؤسسة كلها في مكان واحد</p>`,
      `<div class="big">01</div><h2>يجمع السجلات</h2><p class="body">من الخوادم والجدران النارية وأجهزة الموظفين والتطبيقات، في لوحة واحدة.</p>`,
      `<div class="big">02</div><h2>يربط الأحداث</h2><p class="body">عشر محاولات دخول فاشلة ثم دخول ناجح من بلد آخر؟ يربطها ويطلق تنبيهًا.</p>`,
      `<div class="big">03</div><h2>ينبّه المحلل</h2><p class="body">يصل التنبيه إلى محلل SOC ليحقق فيه ويقرر هل هو هجوم حقيقي.</p>`,
      `<h2>أمثلة مشهورة</h2><div class="code">Splunk · Wazuh · Elastic</div><p class="body">ويمكنك البدء مجانًا بتجربة Wazuh في مختبرك.</p>`,
      `<div class="q">هل جرّبت أي نظام SIEM من قبل؟</div><p class="sub">اكتب اسمه في التعليقات.</p>`,
    ],
  },
  'py-logs': {
    tag: 'Python للأمن السيبراني',
    slides: [
      `<h1>حلّل السجلات بلغة <em>Python</em></h1><p class="sub">اكتشف محاولات تخمين كلمات المرور في سجل الدخول</p>`,
      `<h2>الفكرة</h2><p class="body">نقرأ ملف السجل سطرًا سطرًا، ونعدّ محاولات الدخول الفاشلة لكل عنوان IP.</p>`,
      `<div class="codeblock"><b>from</b> collections <b>import</b> Counter

fails = Counter()
<b>for</b> line <b>in</b> open(<b>"auth.log"</b>):
    <b>if</b> <b>"Failed password"</b> <b>in</b> line:
        ip = line.split()[-4]
        fails[ip] += 1

<b>for</b> ip, n <b>in</b> fails.most_common(5):
    print(ip, n)</div><p class="note">جرّبه على سجلات جهازك أو مختبرك فقط.</p>`,
      `<h2>النتيجة</h2><p class="body">قائمة بأكثر العناوين محاولةً للدخول. العنوان الذي يحاول مئات المرات غالبًا هجوم تخمين.</p>`,
      `<h2>الخطوة التالية</h2><p class="body">احظر العنوان في الجدار الناري، أو فعّل أداة مثل fail2ban لتحظره تلقائيًا.</p>`,
      `<div class="q">ما الذي تريد أتمتته بلغة Python؟</div><p class="sub">اكتب فكرتك في التعليقات.</p>`,
    ],
  },
  'ping-trace': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1><em>ping</em> أم <em>traceroute</em>؟</h1><p class="sub">أداتان لكل من يحل مشاكل الشبكات</p>`,
      `<div class="big">01</div><div class="code">ping 8.8.8.8</div><h2>هل الجهاز يرد؟</h2><p class="body">يرسل رسائل صغيرة ويقيس زمن الرد. أول خطوة عند انقطاع الاتصال.</p>`,
      `<div class="big">02</div><div class="code">tracert 8.8.8.8</div><h2>أين يتوقف الطريق؟</h2><p class="body">يعرض كل جهاز توجيه تمر به البيانات، فتعرف عند أي نقطة تتعطل.</p>`,
      `<div class="big">03</div><h2>متى تستخدم كلًا منهما؟</h2><p class="body">ابدأ بأمر ping لتعرف هل هناك مشكلة، ثم استخدم traceroute لتعرف مكانها.</p>`,
      `<h2>انتبه للاسم</h2><p class="body">في Windows اسم الأمر tracert، وفي Linux اسمه traceroute. الوظيفة نفسها.</p>`,
      `<div class="q">أي أمر تستخدمه أكثر عند انقطاع الإنترنت؟</div><p class="sub">أجب في التعليقات.</p>`,
    ],
  },
  'hash-encrypt': {
    tag: 'أساسيات الأمن',
    slides: [
      `<h1>التشفير أم <em>الهاش</em>؟</h1><p class="sub">مفهومان يخلط بينهما كثير من المبتدئين</p>`,
      `<div class="big">01</div><h2>التشفير</h2><p class="body">يحوّل البيانات إلى نص غير مقروء، ويمكن استرجاعها بالمفتاح الصحيح. الهدف هو السرية.</p>`,
      `<div class="big">02</div><h2>الهاش</h2><p class="body">بصمة ثابتة الطول للبيانات، ولا يمكن عكسها لاسترجاع الأصل. الهدف هو التحقق من السلامة.</p>`,
      `<h2>مثال على الهاش</h2><div class="code">sha256("hello")</div><div class="code">2cf24dba5fb0a30e...</div><p class="body">تغيير حرف واحد في المدخل يغيّر البصمة بالكامل.</p>`,
      `<h2>أين يُستخدم كل منهما؟</h2>
       <div class="list">
        ${item('1', 'التشفير', 'الرسائل، والاتصال بالمواقع، والأقراص.')}
        ${item('2', 'الهاش', 'تخزين كلمات المرور، والتحقق من الملفات المحمّلة.')}
       </div>`,
      `<h2>خطأ شائع</h2><p class="body">المواقع الآمنة لا تخزّن كلمة مرورك نفسها، بل بصمتها مع قيمة عشوائية تُسمّى Salt.</p>`,
      `<div class="q">هل كنت تعرف الفرق بينهما؟</div><p class="sub">أخبرنا في التعليقات.</p>`,
    ],
  },
  'tcp-udp': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1><em>TCP</em> أم <em>UDP</em>؟</h1><p class="sub">في 30 ثانية</p>`,
      `<div class="big">01</div><h2>بروتوكول TCP</h2><p class="body">يتأكد من وصول كل جزء من البيانات بالترتيب، ويعيد إرسال ما يضيع. موثوق لكنه أبطأ.</p>`,
      `<div class="big">02</div><h2>بروتوكول UDP</h2><p class="body">يرسل البيانات دون انتظار تأكيد. أسرع، لكن قد تضيع بعض الأجزاء.</p>`,
      `<h2>أمثلة</h2>
       <div class="list">
        ${item('TCP', 'تصفح المواقع والبريد', 'كل حرف يجب أن يصل صحيحًا.')}
        ${item('UDP', 'الألعاب ومكالمات الفيديو', 'السرعة أهم من جزء صغير ضائع.')}
       </div>`,
      `<h2>للامتحان</h2><p class="body">بروتوكول TCP يبدأ الاتصال بمصافحة ثلاثية، أما UDP فلا يحتاج إليها.</p>`,
      `<div class="q">برأيك، أي بروتوكول يستخدمه DNS؟</div><p class="sub">اكتب إجابتك في التعليقات.</p>`,
    ],
  },
  'chmod': {
    tag: 'Linux',
    slides: [
      `<h1>صلاحيات الملفات في <em>Linux</em></h1><p class="sub">افهم الأمر chmod في 30 ثانية</p>`,
      `<div class="big">01</div><div class="code">-rwxr-xr--</div><h2>ثلاث مجموعات</h2><p class="body">المالك، ثم المجموعة، ثم بقية المستخدمين.</p>`,
      `<div class="big">02</div><h2>ثلاث صلاحيات</h2>
       <div class="list">
        ${item('r', 'القراءة', 'قيمتها 4')}
        ${item('w', 'الكتابة', 'قيمتها 2')}
        ${item('x', 'التنفيذ', 'قيمتها 1')}
       </div>`,
      `<div class="big">03</div><div class="code">chmod 750 script.sh</div><h2>اجمع القيم</h2><p class="body">المالك 7 أي كل الصلاحيات، والمجموعة 5 أي قراءة وتنفيذ، والبقية 0 أي لا شيء.</p>`,
      `<h2>نصيحة أمنية</h2><p class="body">تجنّب الأمر chmod 777، فهو يمنح أي مستخدم على النظام حق تعديل الملف.</p>`,
      `<div class="q">ماذا تعني الصلاحية 644؟</div><p class="sub">اكتب إجابتك في التعليقات.</p>`,
    ],
  },
  'dhcp': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>كيف يحصل جهازك على <em>عنوان IP</em>؟</h1><p class="sub">بروتوكول DHCP في أربع خطوات</p>`,
      `<div class="big">01</div><div class="code">DISCOVER</div><h2>الجهاز يسأل</h2><p class="body">يرسل جهازك رسالة بث إلى الشبكة كلها يبحث فيها عن خادم DHCP.</p>`,
      `<div class="big">02</div><div class="code">OFFER</div><h2>الخادم يعرض</h2><p class="body">يرد الخادم بعرض فيه عنوان IP متاح، مع البوابة وخادم DNS.</p>`,
      `<div class="big">03</div><div class="code">REQUEST</div><h2>الجهاز يطلب</h2><p class="body">يرد جهازك بأنه يريد هذا العنوان تحديدًا.</p>`,
      `<div class="big">04</div><div class="code">ACK</div><h2>الخادم يؤكد</h2><p class="body">يؤكد الخادم الحجز لمدة محددة، ثم يجدّدها جهازك تلقائيًا.</p>`,
      `<h2>طريقة للحفظ</h2><p class="body">اختصار DORA يجمع الحروف الأولى للخطوات الأربع، وهو سؤال متكرر في امتحان CCNA.</p>`,
      `<div class="q">ماذا يحدث إذا لم يجد الجهاز خادم DHCP؟</div><p class="sub">اكتب إجابتك في التعليقات.</p>`,
    ],
  },
  'mfa': {
    tag: 'حماية الحسابات',
    slides: [
      `<h1>المصادقة <em>الثنائية</em></h1><p class="sub">لماذا لا تكفي كلمة المرور وحدها؟</p>`,
      `<div class="big">01</div><h2>كلمة المرور قد تتسرّب</h2><p class="body">من تسريب لموقع آخر، أو رسالة تصيّد، أو تخمين. وعندها يصبح حسابك مكشوفًا.</p>`,
      `<div class="big">02</div><h2>عامل ثانٍ</h2><p class="body">رمز من تطبيق على هاتفك، أو مفتاح أمان. حتى لو عرف المهاجم كلمة المرور، لن يدخل.</p>`,
      `<div class="big">03</div><h2>الأقوى ثم الأضعف</h2>
       <div class="list">
        ${item('1', 'مفتاح الأمان', 'الأقوى ضد التصيّد.')}
        ${item('2', 'تطبيق المصادقة', 'خيار ممتاز ومجاني.')}
        ${item('3', 'رسالة SMS', 'أفضل من لا شيء.')}
       </div>`,
      `<h2>ابدأ اليوم</h2><p class="body">فعّلها أولًا على بريدك الإلكتروني، لأنه مفتاح استعادة كل حساباتك الأخرى.</p>`,
      `<div class="q">هل فعّلت المصادقة الثنائية على بريدك؟</div><p class="sub">أجب في التعليقات.</p>`,
    ],
  },
  'nat': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>ما هو <em>NAT</em>؟</h1><p class="sub">كيف تتصل كل أجهزة بيتك بالإنترنت بعنوان واحد</p>`,
      `<div class="big">01</div><div class="code">192.168.1.0/24</div><h2>عناوين خاصة</h2><p class="body">أجهزتك داخل البيت تستخدم عناوين خاصة لا تُستخدم على الإنترنت.</p>`,
      `<div class="big">02</div><h2>الراوتر يترجم</h2><p class="body">عند الخروج إلى الإنترنت، يستبدل الراوتر العنوان الخاص بعنوانه العام.</p>`,
      `<div class="big">03</div><h2>ويتذكّر</h2><p class="body">يحفظ جدولًا بكل اتصال، ليعيد الرد إلى الجهاز الصحيح داخل الشبكة.</p>`,
      `<h2>فائدة إضافية</h2><p class="body">الأجهزة الداخلية لا تظهر مباشرة على الإنترنت، لكن NAT ليس بديلًا عن الجدار الناري.</p>`,
      `<div class="q">هل تعرف ما هو عنوانك العام الآن؟</div><p class="sub">أخبرنا كيف تكتشفه في التعليقات.</p>`,
    ],
  },
  'py-hash': {
    tag: 'Python للأمن السيبراني',
    slides: [
      `<h1>تأكد من سلامة ملفاتك بلغة <em>Python</em></h1><p class="sub">هل تغيّر الملف الذي حمّلته؟</p>`,
      `<h2>الفكرة</h2><p class="body">نحسب بصمة SHA-256 للملف، ونقارنها بالبصمة المنشورة على موقع المطوّر.</p>`,
      `<div class="codeblock"><b>import</b> hashlib

h = hashlib.sha256()
<b>with</b> open(<b>"tool.zip"</b>, <b>"rb"</b>) <b>as</b> f:
    h.update(f.read())

print(h.hexdigest())</div><p class="note">جرّبه على ملف حمّلته، وقارن الناتج بالبصمة المنشورة.</p>`,
      `<h2>النتيجة</h2><p class="body">إن تطابقت البصمتان فالملف سليم. وإن اختلفتا فلا تفتحه، فقد يكون معدّلًا.</p>`,
      `<h2>استخدام عملي</h2><p class="body">احفظ بصمات ملفات مهمة، وأعد حسابها لاحقًا لتكتشف أي تعديل غير متوقع.</p>`,
      `<div class="q">هل تتحقق من البصمة قبل تثبيت الأدوات؟</div><p class="sub">أجب في التعليقات.</p>`,
    ],
  },
  'arp': {
    tag: 'الشبكات · الأمن',
    slides: [
      `<h1>ما هو <em>ARP</em>؟</h1><p class="sub">وكيف يستغله المهاجم داخل الشبكة المحلية</p>`,
      `<div class="big">01</div><h2>السؤال</h2><p class="body">يعرف جهازك عنوان IP للراوتر، لكنه يحتاج عنوان MAC ليرسل إليه داخل الشبكة.</p>`,
      `<div class="big">02</div><div class="code">Who has 192.168.1.1?</div><h2>البث</h2><p class="body">يرسل جهازك سؤالًا لكل الأجهزة، فيرد صاحب العنوان بعنوان MAC الخاص به.</p>`,
      `<div class="big">03</div><div class="code">arp -a</div><h2>الجدول</h2><p class="body">يحفظ جهازك الإجابة في جدول ARP حتى لا يسأل في كل مرة.</p>`,
      `<h2>نقطة الضعف</h2><p class="body">لا يتحقق ARP من صدق الإجابة. يستطيع مهاجم على الشبكة نفسها أن يدّعي أنه الراوتر، فتمر بياناتك عبره.</p>`,
      `<h2>الحماية</h2>
       <div class="list">
        ${item('1', 'التشفير', 'استخدم HTTPS و VPN على الشبكات العامة.')}
        ${item('2', 'في الشركات', 'ميزة Dynamic ARP Inspection في السويتشات.')}
       </div>`,
      `<div class="q">هل جرّبت الأمر arp -a على جهازك؟</div><p class="sub">أخبرنا ماذا وجدت في التعليقات.</p>`,
    ],
  },
  'linux-procs': {
    tag: 'Linux',
    slides: [
      `<h1>إدارة العمليات في <em>Linux</em></h1><p class="sub">ثلاثة أوامر لكشف أي برنامج غريب</p>`,
      `<div class="big">01</div><div class="code">ps aux</div><h2>اعرض كل العمليات</h2><p class="body">قائمة بكل ما يعمل الآن، ومن شغّله، وكم يستهلك.</p>`,
      `<div class="big">02</div><div class="code">top</div><h2>راقب مباشرة</h2><p class="body">عرض حيّ لأكثر العمليات استهلاكًا للمعالج والذاكرة.</p>`,
      `<div class="big">03</div><div class="code">kill -9 1234</div><h2>أوقف العملية</h2><p class="body">الرقم هو معرّف العملية الذي تجده في الأمرين السابقين.</p>`,
      `<h2>نصيحة أمنية</h2><p class="body">عملية مجهولة تستهلك المعالج باستمرار قد تكون برنامج تعدين خفي. تحقّق منها قبل إيقافها.</p>`,
      `<div class="q">ما الأمر الذي تستخدمه أكثر لمراقبة العمليات؟</div><p class="sub">اكتبه في التعليقات.</p>`,
    ],
  },
  'ipv6': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>لماذا نحتاج <em>IPv6</em>؟</h1><p class="sub">في 30 ثانية</p>`,
      `<div class="big">01</div><h2>نفدت العناوين</h2><p class="body">بروتوكول IPv4 يوفّر نحو 4.3 مليار عنوان فقط، وهي لا تكفي أجهزة العالم اليوم.</p>`,
      `<div class="big">02</div><div class="code">2001:db8::1</div><h2>عنوان أطول</h2><p class="body">عنوان IPv6 طوله 128 بت ويُكتب بالنظام السداسي عشري، فعدد العناوين هائل.</p>`,
      `<div class="big">03</div><h2>اختصار الأصفار</h2><p class="body">الرمز :: يختصر سلسلة من الأصفار المتتالية، ويُستخدم مرة واحدة فقط في العنوان.</p>`,
      `<h2>للامتحان</h2><p class="body">لا يوجد بث Broadcast في IPv6، ويحل محله Multicast.</p>`,
      `<div class="q">هل يدعم مزوّد الإنترنت عندك IPv6؟</div><p class="sub">أخبرنا في التعليقات.</p>`,
    ],
  },
  'hub-switch-router': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>هب أم سويتش أم <em>راوتر</em>؟</h1><p class="sub">ثلاثة أجهزة يخلط بينها كثيرون</p>`,
      `<div class="big">01</div><h2>الهب</h2><p class="body">يرسل كل ما يصله إلى كل المنافذ. بسيط لكنه بطيء وغير آمن، ولم يعد يُستخدم تقريبًا.</p>`,
      `<div class="big">02</div><h2>السويتش</h2><p class="body">يتعلّم عناوين MAC للأجهزة، ويرسل البيانات إلى الجهاز المقصود فقط داخل الشبكة نفسها.</p>`,
      `<div class="big">03</div><h2>الراوتر</h2><p class="body">يربط بين شبكات مختلفة باستخدام عناوين IP، مثل شبكة بيتك والإنترنت.</p>`,
      `<h2>بطريقة أبسط</h2>
       <div class="list">
        ${item('1', 'الهب', 'يصرخ للجميع.')}
        ${item('2', 'السويتش', 'يوصل الرسالة لصاحبها داخل الشبكة.')}
        ${item('3', 'الراوتر', 'ينقل الرسالة إلى شبكة أخرى.')}
       </div>`,
      `<h2>للامتحان</h2><p class="body">السويتش يعمل في الطبقة الثانية من نموذج OSI، والراوتر في الطبقة الثالثة.</p>`,
      `<div class="q">ما الجهاز الذي يوزّع الإنترنت في بيتك فعلًا؟</div><p class="sub">أخبرنا في التعليقات.</p>`,
    ],
  },
  'routing': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>كيف يعرف الراوتر <em>الطريق</em>؟</h1><p class="sub">جدول التوجيه والبوابة الافتراضية</p>`,
      `<div class="big">01</div><h2>جدول التوجيه</h2><p class="body">قائمة بالشبكات التي يعرفها الراوتر، والمنفذ الذي يوصل إلى كل منها.</p>`,
      `<div class="big">02</div><div class="code">route print</div><h2>جرّبه على جهازك</h2><p class="body">جهازك أيضًا لديه جدول توجيه. في لينكس استخدم الأمر ip route.</p>`,
      `<div class="big">03</div><div class="code">0.0.0.0/0</div><h2>البوابة الافتراضية</h2><p class="body">إذا لم يجد الجهاز الوجهة في الجدول، يرسل البيانات إلى البوابة، وغالبًا هي الراوتر.</p>`,
      `<h2>عند حل المشاكل</h2><p class="body">جهاز يتصل بالشبكة المحلية ولا يصل إلى الإنترنت؟ أول ما تتحقق منه هو البوابة الافتراضية.</p>`,
      `<div class="q">هل تعرف عنوان البوابة في شبكتك؟</div><p class="sub">اكتب كيف تجده في التعليقات.</p>`,
    ],
  },
  'grep-logs': {
    tag: 'Linux · الدفاع',
    slides: [
      `<h1>ابحث في السجلات بالأمر <em>grep</em></h1><p class="sub">أسرع طريقة لكشف المشاكل في لينكس</p>`,
      `<div class="big">01</div><div class="code">grep "Failed" auth.log</div><h2>ابحث عن كلمة</h2><p class="body">يعرض كل سطر فيه محاولة دخول فاشلة.</p>`,
      `<div class="big">02</div><div class="code">grep -i "error" syslog</div><h2>تجاهل حالة الأحرف</h2><p class="body">الخيار i يجد الكلمة سواء كُتبت بأحرف كبيرة أو صغيرة.</p>`,
      `<div class="big">03</div><div class="code">grep -c "Failed" auth.log</div><h2>احسب العدد</h2><p class="body">الخيار c يعطيك عدد الأسطر فقط، لتعرف حجم المشكلة بسرعة.</p>`,
      `<h2>نصيحة</h2><p class="body">اجمع grep مع الأمر tail -f لتراقب السجل مباشرة أثناء حدوث المشكلة.</p>`,
      `<div class="q">ما الخيار الذي تستخدمه أكثر عند البحث في السجلات؟</div><p class="sub">اكتبه في التعليقات.</p>`,
    ],
  },
  'py-headers': {
    tag: 'Python للأمن السيبراني',
    slides: [
      `<h1>افحص ترويسات الأمان لموقعك بلغة <em>Python</em></h1><p class="sub">هل موقعك محمي من الهجمات الشائعة؟</p>`,
      `<h2>الفكرة</h2><p class="body">ترويسات HTTP الأمنية تطلب من المتصفح حماية الزوار، ونستطيع فحصها بسطور قليلة.</p>`,
      `<div class="codeblock"><b>import</b> requests

r = requests.get(<b>"https://example.com"</b>)
need = [<b>"Strict-Transport-Security"</b>,
        <b>"Content-Security-Policy"</b>,
        <b>"X-Frame-Options"</b>]
<b>for</b> h <b>in</b> need:
    print(h, h <b>in</b> r.headers)</div><p class="note">افحص مواقعك أنت فقط.</p>`,
      `<h2>ماذا تعني النتيجة؟</h2><p class="body">كل ترويسة تظهر False تعني حماية ناقصة يجب أن يضيفها مسؤول الخادم.</p>`,
      `<h2>الخطوة التالية</h2><p class="body">أضف الترويسات الناقصة في إعدادات الخادم، ثم أعد الفحص للتأكد.</p>`,
      `<div class="q">هل فحصت ترويسات موقعك من قبل؟</div><p class="sub">أجب في التعليقات.</p>`,
    ],
  },
  'incident-response': {
    tag: 'الدفاع السيبراني',
    slides: [
      `<h1>تعرّضت لاختراق؟ <em>ماذا تفعل أولًا</em></h1><p class="sub">مراحل الاستجابة للحوادث باختصار</p>`,
      `<div class="big">01</div><h2>التحضير</h2><p class="body">خطة مكتوبة، وفريق يعرف دوره، ونسخ احتياطية مجرّبة قبل وقوع أي حادث.</p>`,
      `<div class="big">02</div><h2>الاكتشاف والتحليل</h2><p class="body">تأكد أن ما حدث حادث حقيقي، وحدّد الأجهزة والحسابات المتأثرة.</p>`,
      `<div class="big">03</div><h2>الاحتواء</h2><p class="body">اعزل الجهاز المصاب عن الشبكة لتوقف الانتشار، ولا تطفئه قبل جمع الأدلة إن أمكن.</p>`,
      `<div class="big">04</div><h2>الإزالة والتعافي</h2><p class="body">أزل سبب الاختراق، وغيّر كلمات المرور، ثم أعد الأنظمة من نسخ نظيفة.</p>`,
      `<div class="big">05</div><h2>الدروس المستفادة</h2><p class="body">اجتماع بعد الحادث لمعرفة ما حدث، وكيف تمنع تكراره.</p>`,
      `<div class="q">هل لدى مؤسستك خطة استجابة مكتوبة؟</div><p class="sub">أجب في التعليقات.</p>`,
    ],
  },
  'vpn': {
    tag: 'الشبكات · الأمن',
    slides: [
      `<h1>ماذا يفعل <em>VPN</em> فعلًا؟</h1><p class="sub">وما الذي لا يفعله</p>`,
      `<div class="big">01</div><h2>نفق مشفّر</h2><p class="body">يشفّر الاتصال بين جهازك وخادم الشبكة الافتراضية، فلا يقرأ بياناتك من يشاركك الشبكة.</p>`,
      `<div class="big">02</div><h2>متى يفيدك؟</h2><p class="body">على شبكات المقاهي والمطارات، وللدخول الآمن إلى شبكة العمل من الخارج.</p>`,
      `<div class="big">03</div><h2>ما لا يفعله</h2><p class="body">لا يحميك من التصيّد أو البرامج الخبيثة، ولا يجعلك مجهول الهوية تمامًا.</p>`,
      `<h2>نصيحة</h2><p class="body">اختر مزوّدًا موثوقًا، لأن كل حركتك تمر عبر خوادمه.</p>`,
      `<div class="q">هل تستخدم شبكة افتراضية خاصة على هاتفك؟</div><p class="sub">أجب في التعليقات.</p>`,
    ],
  },
  'py-socket': {
    tag: 'Python للأمن السيبراني',
    slides: [
      `<h1>هل المنفذ مفتوح؟ اعرف بلغة <em>Python</em></h1><p class="sub">فحص بسيط على جهازك أنت</p>`,
      `<h2>الفكرة</h2><p class="body">نحاول الاتصال بمنفذ معيّن، فإن نجح الاتصال فالمنفذ مفتوح وهناك خدمة تستمع عليه.</p>`,
      `<div class="codeblock"><b>import</b> socket

s = socket.socket()
s.settimeout(1)
r = s.connect_ex((<b>"127.0.0.1"</b>, 22))
print(<b>"open"</b> <b>if</b> r == 0 <b>else</b> <b>"closed"</b>)
s.close()</div><p class="note">جرّبه على جهازك أو مختبرك فقط.</p>`,
      `<h2>ماذا تعني النتيجة؟</h2><p class="body">الرقم صفر يعني نجاح الاتصال، وأي رقم آخر يعني أن المنفذ مغلق أو محجوب.</p>`,
      `<h2>لماذا يهمك هذا؟</h2><p class="body">كل منفذ مفتوح بلا حاجة هو باب إضافي للمهاجم. أغلق الخدمات التي لا تستخدمها.</p>`,
      `<div class="q">ما المنفذ الذي ستفحصه أولًا على جهازك؟</div><p class="sub">اكتبه في التعليقات.</p>`,
    ],
  },
  'cia-triad': {
    tag: 'أساسيات الأمن',
    slides: [
      `<h1>مثلث <em>CIA</em> في الأمن السيبراني</h1><p class="sub">ثلاثة أهداف يُبنى عليها كل نظام آمن</p>`,
      `<div class="big">C</div><h2>السرية</h2><p class="body">لا يطّلع على البيانات إلا من يحق له. مثال: التشفير وكلمات المرور.</p>`,
      `<div class="big">I</div><h2>السلامة</h2><p class="body">البيانات لم تُعدَّل دون إذن. مثال: الهاش والتوقيع الرقمي.</p>`,
      `<div class="big">A</div><h2>التوفّر</h2><p class="body">الخدمة متاحة عندما يحتاجها المستخدم. مثال: النسخ الاحتياطي والخوادم البديلة.</p>`,
      `<h2>كل هجوم يستهدف ضلعًا</h2>
       <div class="list">
        ${item('C', 'تسريب البيانات', 'يضرب السرية.')}
        ${item('I', 'تعديل الملفات', 'يضرب السلامة.')}
        ${item('A', 'هجمات حجب الخدمة', 'تضرب التوفّر.')}
       </div>`,
      `<h2>للامتحان</h2><p class="body">هذا المثلث أساس معظم أسئلة شهادات الأمن للمبتدئين، فاحفظ أمثلته جيدًا.</p>`,
      `<div class="q">برأيك، برامج الفدية تضرب أي ضلع؟</div><p class="sub">اكتب إجابتك في التعليقات.</p>`,
    ],
  },
  'mac-table': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>كيف يعرف السويتش <em>أين يرسل</em>؟</h1><p class="sub">جدول عناوين MAC في 30 ثانية</p>`,
      `<div class="big">01</div><h2>يتعلّم</h2><p class="body">كلما وصله إطار، يسجّل عنوان MAC المرسل والمنفذ الذي جاء منه.</p>`,
      `<div class="big">02</div><h2>يرسل للمقصود</h2><p class="body">إن وجد عنوان الوجهة في الجدول، يرسل الإطار إلى ذلك المنفذ فقط.</p>`,
      `<div class="big">03</div><h2>أو يرسل للجميع</h2><p class="body">إن لم يجده، يرسل الإطار لكل المنافذ مرة واحدة حتى يتعلّم مكانه.</p>`,
      `<h2>جرّبه على سويتش سيسكو</h2><div class="code">show mac address-table</div><p class="body">يعرض الجدول كاملًا مع رقم كل منفذ.</p>`,
      `<div class="q">ماذا يحدث برأيك إذا امتلأ الجدول؟</div><p class="sub">اكتب إجابتك في التعليقات.</p>`,
    ],
  },
  'cron': {
    tag: 'Linux · الأمن',
    slides: [
      `<h1>المهام المجدولة في <em>Linux</em></h1><p class="sub">الأمر cron، ولماذا يحبه المهاجمون</p>`,
      `<div class="big">01</div><div class="code">crontab -e</div><h2>جدولة مهمة</h2><p class="body">يشغّل أمرًا أو سكربتًا تلقائيًا في وقت تحدده، مثل النسخ الاحتياطي كل ليلة.</p>`,
      `<div class="big">02</div><div class="code">0 2 * * * /backup.sh</div><h2>قراءة السطر</h2><p class="body">الدقيقة صفر من الساعة الثانية فجرًا، كل يوم.</p>`,
      `<div class="big">03</div><h2>وجه آخر</h2><p class="body">المهاجم الذي يخترق خادمًا قد يضيف مهمة مجدولة ليعود إليه حتى بعد إعادة التشغيل.</p>`,
      `<h2>راجع المهام دوريًا</h2><div class="code">crontab -l</div><p class="body">وراجع أيضًا ملفات المجلد cron.d في إعدادات النظام، وابحث عن أي مهمة لا تعرفها.</p>`,
      `<div class="q">متى آخر مرة راجعت المهام المجدولة على خادمك؟</div><p class="sub">أجب في التعليقات.</p>`,
    ],
  },
  'py-fwlogs': {
    tag: 'Python للأمن السيبراني',
    slides: [
      `<h1>حلّل سجلات الجدار الناري بلغة <em>Python</em></h1><p class="sub">من ملف CSV إلى أكثر العناوين المحجوبة</p>`,
      `<h2>الفكرة</h2><p class="body">نقرأ ملف السجلات، ونعدّ الاتصالات المحجوبة لكل عنوان IP مصدر.</p>`,
      `<div class="codeblock"><b>import</b> csv
<b>from</b> collections <b>import</b> Counter

blocked = Counter()
<b>with</b> open(<b>"fw.csv"</b>) <b>as</b> f:
    <b>for</b> row <b>in</b> csv.DictReader(f):
        <b>if</b> row[<b>"action"</b>] == <b>"DENY"</b>:
            blocked[row[<b>"src"</b>]] += 1
print(blocked.most_common(5))</div><p class="note">غيّر أسماء الأعمدة حسب ملفك.</p>`,
      `<h2>النتيجة</h2><p class="body">قائمة بأكثر خمسة عناوين حاولت الدخول وحُجبت، وهي أول ما يراجعه المحلل.</p>`,
      `<h2>الخطوة التالية</h2><p class="body">ابحث عن العناوين في قواعد السمعة، وأضف المتكرر منها إلى قائمة الحظر.</p>`,
      `<div class="q">ما الأداة التي تستخدمها لتحليل السجلات؟</div><p class="sub">اكتبها في التعليقات.</p>`,
    ],
  },
  'wpa3': {
    tag: 'الشبكات · أمان',
    slides: [
      `<h1>أمان شبكة <em>Wi-Fi</em></h1><p class="sub">الفرق بين WPA2 و WPA3، ولماذا يهمك</p>`,
      `<div class="big">01</div><h2>WEP قديم ومكسور</h2><p class="body">يمكن كسره في دقائق. إذا وجدته في إعدادات الراوتر فغيّره فورًا.</p>`,
      `<div class="big">02</div><h2>WPA2 المعيار الشائع</h2><p class="body">تشفيره قوي، لكن كلمة المرور الضعيفة يمكن تخمينها بعد التقاط عملية الاتصال بالشبكة.</p>`,
      `<div class="big">03</div><h2>WPA3 الأحدث والأقوى</h2><p class="body">يمنع تخمين كلمة المرور دون اتصال، ويحمي الاتصالات السابقة حتى لو كُشفت كلمة المرور لاحقًا.</p>`,
      `<h2>احمِ شبكة بيتك</h2>
       <div class="list">
        ${item('1', 'فعّل WPA3', 'أو الوضع المختلط مع WPA2 إن كانت بعض أجهزتك قديمة.')}
        ${item('2', 'عبارة مرور طويلة', '12 حرفًا أو أكثر، لا اسمك ولا رقم هاتفك.')}
        ${item('3', 'أوقف WPS', 'زر الاتصال السريع ثغرة معروفة.')}
       </div>`,
      `<h2>حدّث الراوتر</h2><p class="body">تحديثات البرنامج الثابت تسدّ الثغرات، وتضيف دعم WPA3 في كثير من الأجهزة.</p>`,
      `<div class="q">ما نوع الحماية في شبكة بيتك الآن؟</div><p class="sub">ادخل إعدادات الراوتر وأخبرنا في التعليقات.</p>`,
    ],
  },
  'sudo': {
    tag: 'Linux · الأمن',
    slides: [
      `<h1>الأمر <em>sudo</em> في لينكس</h1><p class="sub">صلاحيات المدير بأمان، ومن يملكها</p>`,
      `<div class="big">01</div><div class="code">id</div><h2>اعرف من أنت</h2><p class="body">يعرض اسم المستخدم والمجموعات التي تنتمي إليها، ومنها مجموعة المدراء.</p>`,
      `<div class="big">02</div><div class="code">sudo apt update</div><h2>صلاحية مؤقتة</h2><p class="body">ينفّذ أمرًا واحدًا بصلاحيات المدير بعد إدخال كلمة مرورك أنت، ويُسجَّل ذلك في السجلات.</p>`,
      `<div class="big">03</div><div class="code">sudo -l</div><h2>ماذا يُسمح لك؟</h2><p class="body">يعرض الأوامر التي يحق لك تشغيلها بصلاحيات المدير، وهو أول ما يفحصه المهاجم بعد دخوله.</p>`,
      `<h2>قاعدة الأمان</h2><p class="body">لا تعمل بحساب المدير مباشرة، وامنح الصلاحية لمن يحتاجها فقط، وعدّلها بأمان عبر الأمر</p><div class="code">sudo visudo</div>`,
      `<div class="q">برأيك، لماذا يُعد العمل بحساب المدير مباشرة خطرًا؟</div><p class="sub">أجب في التعليقات.</p>`,
    ],
  },
  'py-regex-ip': {
    tag: 'Python للأمن السيبراني',
    slides: [
      `<h1>استخرج عناوين <em>IP</em> من أي سجل</h1><p class="sub">بلغة Python والتعابير النمطية في سطور قليلة</p>`,
      `<h2>الفكرة</h2><p class="body">نبحث في ملف السجلات عن كل نص يشبه عنوان IP، ثم نعدّ تكرار كل عنوان.</p>`,
      `<div class="codeblock"><b>import</b> re
<b>from</b> collections <b>import</b> Counter

pat = <b>r"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b"</b>
text = open(<b>"auth.log"</b>).read()
ips = re.findall(pat, text)
print(Counter(ips).most_common(5))</div><p class="note">جرّبه على سجلات جهازك أو مختبرك فقط.</p>`,
      `<h2>النتيجة</h2><p class="body">أكثر خمسة عناوين ظهورًا في السجل، وغالبًا تكون بينها محاولات الدخول المتكررة.</p>`,
      `<h2>انتبه</h2><p class="body">هذا النمط يقبل أرقامًا مثل 999 أيضًا، فتحقّق من النتائج بمكتبة ipaddress قبل الاعتماد عليها.</p>`,
      `<div class="q">ما الملف الذي ستجرّب عليه هذا السكربت أولًا؟</div><p class="sub">اكتبه في التعليقات.</p>`,
    ],
  },
  'launch': {
    tag: 'دورات ديسمبر',
    end: false,
    slides: [
      `<h1>التسجيل <em>مفتوح</em></h1><p class="sub">دورات ديسمبر 2026 في الأمن السيبراني والشبكات والذكاء الاصطناعي</p>`,
      `<div class="big">165</div><p class="sub" style="margin-top:-8px">ريال عماني</p><h2>أساسيات الجاهزية السيبرانية</h2><p class="body">نقطة البداية لكل من يدخل المجال: مفاهيم الحماية، والمخاطر، والثغرات.</p>`,
      `<div class="big">390</div><p class="sub" style="margin-top:-8px">ريال عماني</p><h2>الشبكات المتقدمة CCNA</h2><p class="body">وحدات CCNA كاملة، مع مختبرات عملية في التوجيه والتبديل.</p>`,
      `<div class="big">190</div><p class="sub" style="margin-top:-8px">ريال عماني</p><h2>الأمن السيبراني باستخدام الذكاء الاصطناعي</h2><p class="body">كيف يكشف الذكاء الاصطناعي الهجمات ويسرّع عمل المحلل.</p>`,
      `<h2>ورشة أدوات Kali Linux</h2><p class="body">مجانية لمتدربي الدورات: تطبيق عملي على أشهر أدوات الفحص والتحليل، داخل بيئة مختبر آمنة.</p>`,
      `<h2>الموعد</h2><p class="body">من ديسمبر 2026 حتى 15 يناير 2027. يصلك جدول دورتك ومكانها عند التسجيل.</p>`,
      `<h2>سجّل في 3 خطوات</h2>
       <div class="list">
        ${item('1', 'سجّل بياناتك', 'عبر صفحة التسجيل أو واتساب.')}
        ${item('2', 'حوّل الرسوم', 'لرقم الهاتف أو للحساب البنكي.')}
        ${item('3', 'نؤكد مقعدك', 'خلال 24 ساعة من استلام الإيصال.')}
       </div>`,
      `<div class="q">أي دورة تناسبك؟</div><p class="sub">للتسجيل والاستفسار: واتساب <bdi dir="ltr" style="white-space:nowrap">7999 5041</bdi></p>`,
    ],
  },
  'acl': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>قوائم التحكم <em>ACL</em></h1><p class="sub">كيف يقرر الراوتر من يمر ومن يُمنع</p>`,
      `<h2>الفكرة ببساطة</h2><p class="body">قائمة قواعد على واجهة الراوتر، كل قاعدة تسمح بحركة معينة أو تمنعها، وتُقرأ من الأعلى إلى الأسفل.</p>`,
      `<div class="big">01</div><h2>النوع القياسي</h2><p class="body">يفحص عنوان المصدر فقط. أرقامه من 1 إلى 99، ويوضع قريبًا من الوجهة.</p>`,
      `<div class="big">02</div><h2>النوع الموسّع</h2><p class="body">يفحص المصدر والوجهة والبروتوكول والمنفذ. أرقامه من 100 إلى 199، ويوضع قريبًا من المصدر.</p>`,
      `<h2>مثال: منع Telnet</h2><div class="codeblock"><b>ip access-list extended</b> NO-TELNET
 <b>deny</b> tcp any any eq 23
 <b>permit</b> ip any any
<b>interface</b> g0/0
 ip access-group NO-TELNET in</div><p class="note">يمنع بروتوكول Telnet غير المشفّر، ويسمح بباقي الحركة.</p>`,
      `<h2>قاعدة لا تنساها</h2><p class="body">في نهاية كل قائمة قاعدة مخفية تمنع كل شيء. إذا لم تضف قاعدة سماح، فستُمنع كل الحركة.</p>`,
      `<div class="q">لماذا يوضع النوع القياسي قرب الوجهة؟</div><p class="sub">اكتب إجابتك في التعليقات.</p>`,
    ],
  },
  'stp': {
    tag: 'الشبكات · CCNA',
    slides: [
      `<h1>بروتوكول <em>STP</em> في 30 ثانية</h1><p class="sub">لماذا لا تنهار الشبكة عند وجود حلقة بين السويتشات</p>`,
      `<h2>المشكلة</h2><p class="body">عند ربط السويتشات بأكثر من مسار، تدور الرسائل في حلقة بلا نهاية وتُغرق الشبكة خلال ثوانٍ.</p>`,
      `<div class="big">01</div><h2>اختيار الجذر</h2><p class="body">تنتخب السويتشات سويتشًا جذرًا، وهو صاحب أقل معرّف.</p>`,
      `<div class="big">02</div><h2>أقصر طريق</h2><p class="body">كل سويتش يختار منفذه الأقرب إلى الجذر.</p>`,
      `<div class="big">03</div><h2>إغلاق الزائد</h2><p class="body">المنافذ التي تصنع حلقة توضع في حالة حظر، وتبقى احتياطًا إذا انقطع المسار الأساسي.</p>`,
      `<div class="code">show spanning-tree</div><h2>تحقّق بنفسك</h2><p class="body">يعرض الجذر وحالة كل منفذ على السويتش.</p>`,
      `<div class="q">برأيك، ماذا يحدث إذا انقطع المسار الأساسي؟</div><p class="sub">اكتب إجابتك في التعليقات.</p>`,
    ],
  },
  'py-passcheck': {
    tag: 'Python للأمن السيبراني',
    slides: [
      `<h1>افحص قوة كلمة المرور <em>بلغة Python</em></h1><p class="sub">سكربت قصير يقيّم كلمة المرور ويخبرك بما ينقصها</p>`,
      `<h2>الفكرة</h2><p class="body">نتحقق من الطول، والأحرف الكبيرة والصغيرة، والأرقام، والرموز. كل شرط يضيف نقطة.</p>`,
      `<div class="codeblock"><b>import</b> re

<b>def</b> score(pw):
    checks = [len(pw) >= 12,
        re.search(<b>r"[A-Z]"</b>, pw),
        re.search(<b>r"[a-z]"</b>, pw),
        re.search(<b>r"\\d"</b>, pw),
        re.search(<b>r"[^\\w]"</b>, pw)]
    <b>return</b> sum(bool(c) <b>for</b> c <b>in</b> checks)

print(score(<b>"Muscat@2026"</b>))</div><p class="note">لا تكتب كلمة مرورك الحقيقية في أي سكربت.</p>`,
      `<h2>النتيجة</h2><p class="body">كلمة المرور في المثال تحصل على 4 من 5، لأن طولها 11 حرفًا فقط. الطول أهم شرط.</p>`,
      `<h2>نصيحة</h2><p class="body">عبارة مرور طويلة من كلمات عشوائية أقوى من كلمة قصيرة معقدة، وأسهل للحفظ.</p>`,
      `<div class="q">كم حرفًا طول كلمة مرورك الآن؟</div><p class="sub">أجب بالرقم فقط في التعليقات.</p>`,
    ],
  },
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: H }, deviceScaleFactor: 1 });
  for (const [name, set] of Object.entries(sets)) {
    if (process.argv.length > 2 && !process.argv.includes(name)) continue;
    const dir = path.join(__dirname, REEL ? 'out/reel' : 'out', name);
    if (REEL && set.end !== false) set.slides.push(`<h2>التسجيل مفتوح</h2><p class="body">دورات ديسمبر في الأمن السيبراني، والشبكات، والذكاء الاصطناعي.</p><div class="q">سجّل عبر واتساب <bdi dir="ltr" style="white-space:nowrap">7999 5041</bdi></div>`);
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
