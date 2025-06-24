// carouselEnhancer.js
export function enhanceCarousels() {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const images = JSON.parse(carousel.dataset.images || "[]");
    if (!images.length) return;

    let index = 0;
    const imgs = carousel.querySelectorAll("img");

    const swap = () => {
      imgs.forEach((img, i) => {
        img.style.display = i === index ? "block" : "none";
      });
    };

    swap();

    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      swap();
    }, 3000);

    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchmove", (e) => {
      touchEndX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", () => {
      const deltaX = touchStartX - touchEndX;
      const threshold = 50;

      if (deltaX > threshold) {
        index = (index + 1) % images.length;
        swap();
      } else if (deltaX < -threshold) {
        index = (index - 1 + images.length) % images.length;
        swap();
      }
    });
  });
}
