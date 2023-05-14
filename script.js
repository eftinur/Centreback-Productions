const images = document.getElementsByClassName("image");

let globalIndex = 0;
console.log(globalIndex);
let last = { x: 0, y: 0 };

const activate = (images, x, y) => {
  images.style.left = `${x}px`;
  images.style.top = `${y}px`;

  images.dataset.status = "active";

  last = { x, y };
};

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
};

window.onmousemove = (e) => {
  if (distanceFromLast(e.clientX, e.clientY) > 100) {
    const lead = images[globalIndex % images.length];
    const tail = images[(globalIndex - 5) % images.length];

    activate(lead, e.clientX, e.clientY);

    if (tail) tail.dataset.status = "inactive";

    globalIndex++;
  }
};
