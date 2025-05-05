// 페이지가 로드되면 실행
document.addEventListener("DOMContentLoaded", () => {
  // 맨 위로 버튼
  const backToTopButton = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = "flex";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 스킬 카드 애니메이션
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const progress = card.querySelector(".progress");
      progress.style.width = progress.style.width; // 트리거 리플로우
      progress.classList.add("animate-progress");
    });

    card.addEventListener("mouseleave", () => {
      const progress = card.querySelector(".progress");
      progress.classList.remove("animate-progress");
    });
  });

  // 포트폴리오 아이템 애니메이션
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
      item.classList.remove("active");
    });
  });
});
