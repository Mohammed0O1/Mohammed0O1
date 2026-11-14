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
