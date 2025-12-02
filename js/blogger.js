// ===== 全局 Overlay =====
(function () {
  const overlay = document.createElement("div");
  overlay.id = "slider-overlay";
  overlay.style.cssText = `
    display:none; position:fixed; top:0; left:0; width:100%; height:100%;
    background:rgba(0,0,0,0.85); justify-content:center; align-items:center;
    flex-direction:column; z-index:999999;
  `;

  const overlayImg = document.createElement("img");
  overlayImg.id = "slider-overlay-img";
  overlayImg.style.cssText = `
    max-width:90%; max-height:85%; cursor:pointer; border-radius:10px;
  `;

  const overlayThumbs = document.createElement("div");
  overlayThumbs.id = "slider-overlay-thumbs";
  overlayThumbs.style.cssText = `
    display:flex; margin-top:12px;
  `;

  overlay.appendChild(overlayImg);
  overlay.appendChild(overlayThumbs);
  document.body.appendChild(overlay);

  let overlaySlides = [];
  let overlayIndex = 0;

  window.showOverlay = function (slides, index) {
    overlaySlides = Array.from(slides);
    overlayIndex = index;
    overlay.style.display = "flex";
    updateOverlay();
  };

  function updateOverlay() {
    overlayImg.src = overlaySlides[overlayIndex].src;

    overlayThumbs.innerHTML = "";
    overlaySlides.forEach((sl, i) => {
      const t = document.createElement("img");
      t.src = sl.src;
      t.style.cssText = `
        width:60px;height:40px;object-fit:cover;margin:0 5px;cursor:pointer;
        opacity:0.6;border:2px solid transparent;border-radius:4px;
      `;
      if (i === overlayIndex) t.style.opacity = "1";

      t.addEventListener("click", (e) => {
        e.stopPropagation();
        overlayIndex = i;
        updateOverlay();
      });

      overlayThumbs.appendChild(t);
    });
  }

  overlay.addEventListener("click", () => (overlay.style.display = "none"));

  overlayImg.addEventListener("click", (e) => {
    e.stopPropagation();
    const rect = overlayImg.getBoundingClientRect();
    const x = e.clientX - rect.left;

    overlayIndex =
      x < rect.width / 2
        ? (overlayIndex - 1 + overlaySlides.length) % overlaySlides.length
        : (overlayIndex + 1) % overlaySlides.length;

    updateOverlay();
  });
})();

// ===== Slider 主程式（可多個 slider）=====
function createSlider(slider) {
  let slideIndex = 0;
  let timer;
  let isHover = false;

  const slidesContainer = slider.querySelector(".slides");
  const slides = slider.querySelectorAll(".slide");
  const thumbsContainer = slider.querySelector(".thumbs");
  const btnPrev = slider.querySelector(".prev");
  const btnNext = slider.querySelector(".next");

  const totalSlides = slides.length;

  // 建立 thumbnails
  thumbsContainer.innerHTML = "";
  slides.forEach((slide, i) => {
    const t = document.createElement("img");
    t.src = slide.src;
    t.classList.add("thumb");
    t.addEventListener("click", () => showSlide(i));
    thumbsContainer.appendChild(t);

    slide.addEventListener("click", () => showOverlay(slides, i));
  });

  const thumbs = thumbsContainer.querySelectorAll(".thumb");

  function showSlide(n) {
    slideIndex = (n + totalSlides) % totalSlides;
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;

    thumbs.forEach((t, i) =>
      t.classList.toggle("active", i === slideIndex)
    );
  }

  function autoNext() {
    showSlide(slideIndex + 1);
  }

  function start() {
    timer = setInterval(autoNext, 3000);
  }

  function stop() {
    clearInterval(timer);
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      stop();
      showSlide(slideIndex - 1);
      if (!isHover) start();
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", (e) => {
      e.stopPropagation();
      stop();
      showSlide(slideIndex + 1);
      if (!isHover) start();
    });
  }

  slider.addEventListener("mouseenter", () => {
    isHover = true;
    stop();
  });

  slider.addEventListener("mouseleave", () => {
    isHover = false;
    start();
  });

  showSlide(0);
  start();
}

// 全部 slider 啟動
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slider").forEach(createSlider);
});
