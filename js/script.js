//Mouse Circle
const mouseCircle = document.querySelector(".mouse__circle");
const mouseDot = document.querySelector(".mouse__dot");

const mouseCircleFn = (x, y) => {
  mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
  mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
};

// End of Mouse Circle

// Animated circles
const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main__circle img");

let mX = 0;
let mY = 0;
const animatedCircles = (e, x, y) => {
  if (x < mX) {
    circles.forEach((circle) => {
      circle.style.left = `100px`;
    });
    mainImg.style.left = `100px`;
  }

  if (x < mY) {
  }

  mX = e.clientX;
  mY = e.clientY;
};
// End of Animated circles

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);
  animatedCircles(e, x, y);
});

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = "0";
  mouseDot.style.opacity = "0";
});
