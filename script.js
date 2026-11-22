// 밤하늘 배경: 반짝이는 별과 천천히 떠오르는 요정 빛가루
(function () {
  const canvas = document.getElementById("sky");
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const colors = ["#4FD1C5", "#7FA8FF", "#B9A7FF", "#FDE68A"];
  let w, h, stars, motes;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const area = w * h;
    stars = Array.from({ length: Math.round(area / 6000) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.1 + .2, p: Math.random() * Math.PI * 2,
    }));
    motes = Array.from({ length: Math.round(area / 40000) + 8 }, newMote);
  }

  function newMote(_, i, fromBottom) {
    return {
      x: Math.random() * w,
      y: fromBottom ? h + 10 : Math.random() * h,
      r: Math.random() * 2 + 1,
      vy: Math.random() * .25 + .08,
      sway: Math.random() * Math.PI * 2,
      c: colors[Math.floor(Math.random() * colors.length)],
    };
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const a = .35 + .35 * Math.sin(t / 1400 + s.p);
      ctx.fillStyle = `rgba(231,236,255,${a})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    }
    for (let i = 0; i < motes.length; i++) {
      const m = motes[i];
      if (!reduce) {
        m.y -= m.vy;
        m.sway += .01;
        if (m.y < -10) motes[i] = newMote(null, i, true);
      }
      const x = m.x + Math.sin(m.sway) * 14;
      ctx.shadowBlur = 12; ctx.shadowColor = m.c; ctx.fillStyle = m.c;
      ctx.globalAlpha = .55;
      ctx.beginPath(); ctx.arc(x, m.y, m.r, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    }
    if (!reduce) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
})();

// 스크롤하면 요소가 부드럽게 나타남
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("shown"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add("shown"); io.unobserve(e.target); }
    }
  }, { threshold: .12 });
  items.forEach((el) => io.observe(el));
})();

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
