
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

// GreenSock Animation
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

const { innerHeight } = window;

// Zoom Out on Scrolling
gsap.from(".zoom_out h2", {
  scale: 50,
  opacity: 0,
  stagger: 0.25,
  duration: 3,
  scrollTrigger: {
    trigger: ".zoom_out",
    pin: true,
    end: `+=${innerHeight * 1.3}`,
    scrub: 3,
    markers: true,
  },
});

// Zoom In on Scrolling
gsap.to(".zoom_in h2", {
  scale: 50,
  opacity: 0,
  stagger: 0.25,
  duration: 3,
  scrollTrigger: {
    trigger: ".zoom_in",
    pin: true,
    end: `+=${innerHeight * 1.3}`,
    scrub: 3,
    markers: true,
  },
});
