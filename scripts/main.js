const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* year */
$('#yr').textContent = new Date().getFullYear();

/* theme */
const root = document.documentElement, tb = $('#theme');
const saved = localStorage.getItem('axivo-theme'); if (saved) root.dataset.theme = saved;
const syncIcon = () => { tb.innerHTML = `<svg class="i"><use href="#i-${root.dataset.theme === 'dark' ? 'moon' : 'sun'}"/></svg>` };
syncIcon();
tb.onclick = () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('axivo-theme', root.dataset.theme); syncIcon() };

/* mobile menu */
$('#burger').onclick = () => $('#nav').classList.toggle('open');
$$('#nav a').forEach(a => a.onclick = () => $('#nav').classList.remove('open'));

/* marquee duplicate */
const tr = $('#track'); tr.innerHTML += tr.innerHTML;

/* typed headline */
const words = ['startups.', 'enterprises.', 'the cloud.', 'the AI era.', 'what\'s next.'];
let wi = 0, ci = 0, del = false; const tEl = $('#typed');
(function type() {
    const w = words[wi];
    tEl.textContent = w.slice(0, ci) || '\u00A0';
    if (!del && ci < w.length) { ci++; setTimeout(type, 90) }
    else if (!del) { del = true; setTimeout(type, 1500) }
    else if (ci > 0) { ci--; setTimeout(type, 45) }
    else { del = false; wi = (wi + 1) % words.length; setTimeout(type, 300) }
})();

/* reveal on scroll */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .12 });
$$('.rv').forEach(el => io.observe(el));

/* counters */
const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; const el = e.target, to = +el.dataset.to; let n = 0; const step = Math.max(1, to / 50);
    const t = setInterval(() => { n += step; if (n >= to) { n = to; clearInterval(t) } el.textContent = Math.round(n) }, 30);
    co.unobserve(el);
}), { threshold: .6 });
$$('.count').forEach(el => co.observe(el));

/* bento spotlight */
$$('.bento .b').forEach(b => b.addEventListener('mousemove', e => {
    const r = b.getBoundingClientRect(); b.style.setProperty('--x', e.clientX - r.left + 'px'); b.style.setProperty('--y', e.clientY - r.top + 'px');
}));

/* tabs */
$$('.tab').forEach(t => t.onclick = () => {
    $$('.tab').forEach(x => x.classList.remove('on')); t.classList.add('on');
    $$('.panel').forEach((p, i) => p.classList.toggle('on', i == t.dataset.t));
});

/* testimonials */
const slides = $$('.slide'), dots = $$('#dots button'); let si = 0;
function show(i) { si = i; slides.forEach((s, k) => s.classList.toggle('on', k === i)); dots.forEach((d, k) => d.classList.toggle('on', k === i)) }
dots.forEach((d, i) => d.onclick = () => show(i));
setInterval(() => show((si + 1) % slides.length), 6500);

/* faq */
$$('.qa').forEach(q => {
    const panel = $('.ans', q);
    if (q.classList.contains('on')) panel.style.maxHeight = panel.scrollHeight + 'px';
    $('button', q).onclick = () => {
        const open = q.classList.contains('on');
        $$('.qa').forEach(o => { o.classList.remove('on'); $('.ans', o).style.maxHeight = 0 });
        if (!open) { q.classList.add('on'); panel.style.maxHeight = panel.scrollHeight + 'px' }
    };
});

/* contact form (replace with your backend / Formspree endpoint) */
$('#form').onsubmit = e => { e.preventDefault(); $('#msg').textContent = 'Thanks! We\'ll reply within one business day.'; e.target.reset() };

/* progress + back-to-top */
const top_ = $('#top'); top_.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
addEventListener('scroll', () => {
    const h = document.documentElement;
    $('#progress').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
    top_.classList.toggle('show', h.scrollTop > 600);
}, { passive: true });
