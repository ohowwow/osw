// slider module
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

  // --- 建立 thumbnails ---
  slides.forEach((slide, i) => {
    const t = document.createElement("img");
    t.src = slide.src;
    t.classList.add("thumb");
    t.addEventListener("click", () => showSlide(i));
    thumbsContainer.appendChild(t);

    // 點 slide 開 overlay
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

  // --- 自動播放 ---
  function autoNext() {
    showSlide(slideIndex + 1);
  }

  function start() {
    timer = setInterval(autoNext, 3000);
  }

  function stop() {
    clearInterval(timer);
  }

  // --- 左右按鈕事件 ---
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

  // --- 滑鼠覆蓋停止自動播放 ---
  slider.addEventListener("mouseenter", () => {
    isHover = true;
    stop();
  });

  slider.addEventListener("mouseleave", () => {
    isHover = false;
    start();
  });

  // 初始執行
  showSlide(0);
  start();
}

// Overlay
const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlay-img");
const overlayThumbs = document.getElementById("overlay-thumbs");

let overlaySlides = [];
let overlayIndex = 0;

function showOverlay(slides, index) {
  overlaySlides = Array.from(slides);
  overlayIndex = index;

  overlay.style.display = "flex";
  updateOverlay();
}

function updateOverlay() {
  overlayImg.src = overlaySlides[overlayIndex].src;

  overlayThumbs.innerHTML = "";
  overlaySlides.forEach((sl, i) => {
    const t = document.createElement("img");
    t.src = sl.src;
    if (i === overlayIndex) t.classList.add("active");
    t.addEventListener("click", e => {
      e.stopPropagation();
      overlayIndex = i;
      updateOverlay();
    });
    overlayThumbs.appendChild(t);
  });
}

// 點空白關閉 overlay
overlay.addEventListener("click", () => overlay.style.display = "none");

// 點大圖切換左 / 右
overlayImg.addEventListener("click", (e) => {
  e.stopPropagation();

  const rect = overlayImg.getBoundingClientRect();
  const x = e.clientX - rect.left;

  if (x < rect.width / 2) {
    overlayIndex = (overlayIndex - 1 + overlaySlides.length) % overlaySlides.length;
  } else {
    overlayIndex = (overlayIndex + 1) % overlaySlides.length;
  }

  updateOverlay();


});
