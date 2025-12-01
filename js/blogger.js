let index = 0;
const slides = document.querySelector(".slides");
const total = document.querySelectorAll(".slide").length;

function showSlide(i) {
    index = (i + total) % total; // 防止超界
    console.log("slides :", slides, ", i : ", i, ", total : ", total, "index : ", index)
    slides.style.transform = `translateX(${-index * 100}%)`;
}

// 左右按鈕
function moveSlide(step) {
    showSlide(index + step);
}

// 自動播放（每 3 秒）
setInterval(() => moveSlide(1), 3000);
