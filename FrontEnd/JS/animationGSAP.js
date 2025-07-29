gsap.registerPlugin(ScrollTrigger);

gsap.from("#titre", {
  duration: 1,
  y: -50,
  opacity: 0,
  ease: "power3.out",
});
gsap.from("#slogan", {
  duration: 1.2,
  delay: 0.3,
  y: 20,
  opacity: 0,
  ease: "power2.out",
});

gsap.utils.toArray(".product-card").forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
  });
});

// Animation du titre
const texte = document.getElementById("text");
const lettres = texte.textContent.split("");
texte.textContent = "";

lettres.forEach((lettre, i) => {
  const span = document.createElement("span");
  span.textContent = lettre;
  texte.appendChild(span);
  gsap.from(span, {
    opacity: 0,
    y: 10,
    delay: i * 0.05,
    duration: 1,
    ease: "power1.out",
  });
});
