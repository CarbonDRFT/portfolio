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
const z = 100;

const animateCircles = (e, x, y) => {
  if (x < mX) {
    circles.forEach((circle) => {
      circle.style.left = `${z}px`;
    });
    mainImg.style.left = `${z}px`;
  } else if (x > mX) {
    circles.forEach((circle) => {
      circle.style.left = `-${z}px`;
    });
    mainImg.style.left = `-${z}px`;
  }

  if (y < mY) {
    circles.forEach((circle) => {
      circle.style.top = `${z}px`;
    });
    mainImg.style.top = `${z}px`;
  } else if (y > mY) {
    circles.forEach((circle) => {
      circle.style.top = `-${z}px`;
    });
    mainImg.style.top = `-${z}px`;
  }

  mX = e.clientX;
  mY = e.clientY;
};
// End of Animated circles

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);
  animateCircles(e, x, y);
});

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = "0";
  mouseDot.style.opacity = "0";
});

// Main Button
const mainBtns = document.querySelectorAll(".main__btn");

mainBtns.forEach((btn) => {
  let ripple;

  btn.addEventListener("mouseenter", (e) => {
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;

    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });

  btn.addEventListener("mouseleave", () => {
    btn.removeChild(ripple);
  });
});

// End of Main Button

//About me text
const aboutMeText = document.querySelector(".about__me--text");
const aboutMeTextContent = `I started programming in 2020 at Noroff School of Technology. After a year in front end development, I have gained enough knowledge to take upon projects that does not contain any frameworks. I work on improving my skills everyday and gaining new knowledge. At this time, I might work a bit slow with projects but I make sure that I deliver a quality work and you are happy with it. 
\n I have experience in leadership where I have joined a team and started up Indoor Trampoline Park in Stavanger which costs us 18 million kroner. I was part of the leadership where I managed 50 staff members and worked with investors. 
\n My interest changed towards programming in 2019 and decided to look into what programming field would be interesting to me. Front-End development was the one that I found to be fun to work with.
I started getting into Wordpress and took upon few wordpress projects. While studying at Noroff, I got a job within finance industry. I am IT consultant and work mainly updating their website. 
I have also had many courses and now work with customers to help them with their finance and help them get loan. So having a experience in startup, leadership, marketing, finance, working with the banks combine that with front end development will make my career fun. :) `;

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutMeText.appendChild(span);

  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutMeTextAnim 20s infinite";
  });
});
//End of About me text

// Projects

const container = document.querySelector(".container");
const projects = document.querySelectorAll(".project");
const projectHideBtn = document.querySelector(".project__hide--btn");

projects.forEach((project) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`;
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });

  // Big projects image
  project.addEventListener("click", () => {
    const bigImgWrapper = document.createElement("div");
    bigImgWrapper.className = "project__img--wrapper";
    container.appendChild(bigImgWrapper);

    const bigImg = document.createElement("img");
    bigImg.className = "project__img";
    const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];
    bigImg.setAttribute("src", `${imgPath}-big.jpg`);
    bigImgWrapper.appendChild(bigImg);
    document.body.style.overflowY = "hidden";

    projectHideBtn.classList.add("change");

    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove("change");
      bigImgWrapper.remove();
      document.body.style.overflowY = "scroll";
    };
  });
  // End of Big projects image
});
// End of projects
