gsap.registerPlugin(ScrollTrigger);

// TIMELINE PRINCIPALE DELLA SLIDE 1
const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".slide-1",
    start: "top top",
    end: "+=150%",          // quanto “lungo” è l’effetto mentre scrolli
    scrub: true,            // collega il tempo della timeline allo scroll
    pin: true,              // la sezione resta fissa come uno slider
    anticipatePin: 1
  }
});

// Animazioni sequenziali (ognuna con il suo ritardo naturale nella timeline)
heroTl
  // leggero zoom del background
  .from(".slide-bg", {
    duration: 1.2,
    scale: 1.15,
    opacity: 0,
    ease: "power2.out"
  })

  // buggy che entra da destra
  .from(".hero-anim-6", {
    duration: 1.2,
    x: 250,
    opacity: 0,
    ease: "power3.out"
  }, "-=0.5")

  // testo che entra dopo, uno dietro l'altro
  .from(".hero-anim-1", {
    duration: 0.6,
    y: 40,
    opacity: 0,
    ease: "power3.out"
  }, "-=0.3")
  .from(".hero-anim-2", {
    duration: 0.9,
    y: 50,
    opacity: 0,
    ease: "power3.out"
  }, "-=0.2")
  .from(".hero-anim-3", {
    duration: 0.9,
    y: 40,
    opacity: 0,
    ease: "power2.out"
  }, "-=0.1")
  .from(".hero-anim-4", {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: "power2.out"
  }, "-=0.2")
  .from(".hero-anim-5 span", {
    duration: 0.6,
    y: 25,
    opacity: 0,
    stagger: 0.12,
    ease: "power2.out"
  }, "-=0.3")

  // piccolo movimento finale (parallax) mentre continui a scrollare
  .to(".buggy-img", {
    duration: 1.2,
    y: -60,
    rotateY: 8,
    ease: "power1.inOut"
  }, ">-0.3")
  .to(".hero-left", {
    duration: 1.2,
    y: 40,
    opacity: 0.92,
    ease: "power1.inOut"
  }, "<");

// PARALLAX LEGGERO CON IL MOUSE (solo desktop)
const hero = document.querySelector(".slide-1");
const buggy = document.querySelector(".buggy-img");
const orbit = document.querySelector(".buggy-orbit");

if (hero && buggy && orbit) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(buggy, {
      x: x * 40,
      y: y * 20 - 20,
      rotateY: x * 12,
      ease: "power2.out",
      duration: 0.4
    });

    gsap.to(orbit, {
      rotate: -16 + x * 10,
      ease: "power2.out",
      duration: 0.6
    });
  });

  hero.addEventListener("mouseleave", () => {
    gsap.to(buggy, {
      x: 0,
      y: -20,
      rotateY: 8,
      duration: 0.6,
      ease: "power2.out"
    });
    gsap.to(orbit, {
      rotate: -16,
      duration: 0.6,
      ease: "power2.out"
    });
  });
}
