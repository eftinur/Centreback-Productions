// Mouse Cursor Trail
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.setAttribute(
    "style",
    "top: " + (e.pageY - 15) + "px; left: " + (e.pageX - 15) + "px;"
  );
});

document.addEventListener("click", () => {
  cursor.classList.add("expand");

  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});

// Lenis Setup
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Hero Area Image Trail Animation
const images = document.getElementsByClassName("image");

let globalIndex = 0;
let last = { x: 0, y: 0 };

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = globalIndex;

  image.dataset.status = "active";

  last = { x, y };
};

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
};

const handleOnMove = (e) => {
  if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / 20) {
    const lead = images[globalIndex % images.length];
    const tail = images[(globalIndex - 5) % images.length];

    activate(lead, e.clientX, e.clientY);

    if (tail) tail.dataset.status = "inactive";

    globalIndex++;
  }
};

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

// GreenSock
gsap.from(
  ".test",
  {
    x: -200,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".test",
      start: "top 90%",
      end: "bottom 10%",
    },
  },
  0
);

// GSAP Navigation
const revealBtn = document.querySelector(".hamburger_menu");
const unrevealBtn = document.querySelector(".unreveal_btn");

let menuTl = gsap.timeline({ paused: true });
menuTl
  .to(".menu_main", {
    opacity: 1,
    duration: 1,
    top: 0,
    ease: Power2.easeInOut,
  })
  .from(".nav_list", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: Power2.easeInOut,
    stagger: 0.3,
  });

revealBtn.addEventListener("click", () => {
  menuTl.play().timeScale(1);
});

unrevealBtn.addEventListener("click", () => {
  menuTl.timeScale(2.5);
  menuTl.reverse();
  console.log("Hola");
});
