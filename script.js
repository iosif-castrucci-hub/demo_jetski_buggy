// Smooth scroll to slide when clicking dots or nav links
const dots = document.querySelectorAll(".dot");
const slides = document.querySelectorAll(".slide");

// Helper: scroll to a slide
function scrollToSlide(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth" });
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const id = dot.dataset.target;
    scrollToSlide(id);
  });
});

// Top nav links (anchor) – keep smooth scroll behavior
document.querySelectorAll('.top-nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href").substring(1);
    scrollToSlide(id);
  });
});

// Update active dot based on current slide in viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dots.forEach((dot) => {
          dot.classList.toggle("active", dot.dataset.target === id);
        });
        // Update body background color based on slide data-bg
        const bg = entry.target.getAttribute("data-bg");
        if (bg) {
          document.body.style.background =
            "radial-gradient(circle at top, #151a3a 0, " + bg + " 55%)";
        }
      }
    });
  },
  {
    threshold: 0.55,
  }
);

slides.forEach((slide) => observer.observe(slide));

// Parallax effect on scroll
function handleParallax() {
  const viewportHeight = window.innerHeight;

  slides.forEach((slide) => {
    const rect = slide.getBoundingClientRect();
    const slideCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;

    const distance = (slideCenter - viewportCenter) / viewportHeight;

    slide.querySelectorAll(".layer").forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 0;
      const translateY = distance * speed * -120; // tweak strength here
      layer.style.transform = `translate3d(0, ${translateY}px, 0)`;
    });
  });
}

window.addEventListener("scroll", handleParallax);
window.addEventListener("resize", handleParallax);

// Initial call
handleParallax();
