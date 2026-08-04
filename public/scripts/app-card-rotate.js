(() => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const INTERVAL_MS = 3500;

  function hashId(id) {
    let h = 0;
    for (let i = 0; i < String(id).length; i++) {
      h = (h * 31 + String(id).charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }

  function initCard(el) {
    let images = [];
    try {
      images = JSON.parse(el.getAttribute("data-images") || "[]");
    } catch {
      images = [];
    }
    if (!Array.isArray(images) || images.length < 2) return;

    const imgs = [...el.querySelectorAll("img[data-rotate-index]")];
    if (imgs.length < 2) return;

    let index = hashId(el.getAttribute("data-track-id") || "") % imgs.length;
    imgs.forEach((img, i) => {
      img.style.opacity = i === index ? "1" : "0";
    });

    setInterval(() => {
      index = (index + 1) % imgs.length;
      imgs.forEach((img, i) => {
        img.style.opacity = i === index ? "1" : "0";
      });
    }, INTERVAL_MS);
  }

  document.querySelectorAll(".app-card-media").forEach(initCard);
})();
