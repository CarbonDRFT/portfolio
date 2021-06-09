// Navigation

const menuIcon = document.querySelector(".menu__icon");
const navbar = document.querySelector(".navbar");

document.addEventListener("scroll", () => {
  menuIcon.classList.add("show__menu--icon");
  navbar.classList.add("hide__navbar");

  if (window.scrollY === 0) {
    menuIcon.classList.remove("show__menu--icon");
    navbar.classList.remove("hide__navbar");
  }
});

menuIcon.addEventListener("click", () => {
  menuIcon.classList.remove("show__menu--icon");
  navbar.classList.remove("hide__navbar");
});

//End of Navigation

//Mouse Circle
const mouseCircle = document.querySelector(".mouse__circle");
const mouseDot = document.querySelector(".mouse__dot");

let mouseCircleBool = true;

const mouseCircleFn = (x, y) => {
  mouseCircleBool &&
    (mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`);

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

let hoveredElPosition = [];

const stickyElement = (x, y, hoveredEl) => {
  // Sticky Element

  if (hoveredEl.classList.contains("sticky")) {
    if (hoveredElPosition.length < 1) {
      hoveredElPosition = [hoveredEl.offsetTop, hoveredEl.offsetLeft];
    }
    console.log(hoveredElPosition);
    hoveredEl.style.cssText = `top: ${y}px; left: ${x}px`;

    if (
      hoveredEl.offsetTop <= hoveredElPosition[0] - 100 ||
      hoveredEl.offsetTop >= hoveredElPosition[0] + 100 ||
      hoveredEl.offsetLeft <= hoveredElPosition[1] - 100 ||
      hoveredEl.offsetLeft >= hoveredElPosition[1] + 100
    ) {
      hoveredEl.style.cssText = "";
      hoveredElPosition = [];
    }

    hoveredEl.onmouseleave = () => {
      hoveredEl.style.cssText = "";
      hoveredElPosition = [];
    };
  }
  // End of Sticky Element
};

// Mouse circle transfrom
const mouseCircleTransform = (hoveredEl) => {
  if (hoveredEl.classList.contains("pointer__enter")) {
    hoveredEl.onmousemove = () => {
      mouseCircleBool = false;
      mouseCircle.style.cssText = `
      width: ${hoveredEl.getBoundingClientRect().width}px;
      height: ${hoveredEl.getBoundingClientRect().height}px;
      top: ${hoveredEl.getBoundingClientRect().top}px;
      left: ${hoveredEl.getBoundingClientRect().left}px;
      opacity: 1; 
      transform: translate(0, 0);
      animation: none;
      border-radius: ${getComputedStyle(hoveredEl).borderBottomLeftRadius};
      transition: width .5s, height .5s, top .5s, left .5s, transform .5s, border-radius .5s;`;
    };

    hoveredEl.onmouseleave = () => {
      mouseCircleBool = true;
    };

    document.onscroll = () => {
      if (!mouseCircleBool) {
        mouseCircle.style.top = `${hoveredEl.getBoundingClientRect().top}px`;
      }
    };
  }
};

// End of Mouse Circle Transform

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);
  animateCircles(e, x, y);

  const hoveredEl = document.elementFromPoint(x, y);

  stickyElement(x, y, hoveredEl);

  mouseCircleTransform(hoveredEl);
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

projects.forEach((project, i) => {
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

    mouseCircle.style.opacity = 0;

    projectHideBtn.classList.add("change");

    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove("change");
      bigImgWrapper.remove();
      document.body.style.overflowY = "scroll";
    };
  });
  // End of Big projects image

  i >= 6 && (project.style.cssText = "display: none; opacity:0");
});

//Project Button
const section3 = document.querySelector(".section-3");
const projectBtn = document.querySelector(".projects__btn");
const projectBtnText = document.querySelector(".projects__btn span");

let showHideBool = true;

const showProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "flex";
    section3.scrollIntoView({ block: "end" });
  }, 600);

  setTimeout(() => {
    project.style.opacity = "1";
  }, i * 200);
};

const hideProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "none";
    section3.scrollIntoView({ block: "end" });
  }, 1200);
  setTimeout(() => {
    project.style.opacity = "0";
  }, i * 100);
};

projectBtn.addEventListener("click", (e) => {
  e.preventDefault();

  projectBtn.firstElementChild.nextElementSibling.classList.toggle("change");

  showHideBool
    ? (projectBtnText.textContent = "Show Less")
    : (projectBtnText.textContent = "Show More");

  projects.forEach((project, i) => {
    i >= 6 &&
      (showHideBool ? showProjects(project, i) : hideProjects(project, i));
  });
  showHideBool = !showHideBool;
});
// End of projects

// Section 4
document.querySelectorAll(".service__btn").forEach((service) => {
  service.addEventListener("click", (e) => {
    e.preventDefault();

    const serviceText = service.nextElementSibling;
    serviceText.classList.toggle("change");

    const rightPosition = serviceText.classList.contains("change")
      ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})`
      : 0;

    service.firstElementChild.style.right = rightPosition;
  });
});
// End of Section 4

//Section 5
//Form
const formHeading = document.querySelector(".form__heading");
const formInput = document.querySelectorAll(".contact__form--input");

formInput.forEach((input) => {
  input.addEventListener("focus", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`;
      formHeading.style.opacity = "1";
    }, 300);
  });

  input.addEventListener("blur", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Let's Talk`;
      formHeading.style.opacity = "1";
    }, 300);
  });
});
//End of Form

// SlideIcon
const slideicon = document.querySelector(".slideicon");

setInterval(() => {
  const firstIcon = slideicon.firstElementChild;

  firstIcon.classList.add("faded__out");

  const thirdIcon = slideicon.children[3];

  thirdIcon.classList.add("light");

  thirdIcon.previousElementSibling.classList.remove("light");

  setTimeout(() => {
    slideicon.removeChild(firstIcon);

    slideicon.appendChild(firstIcon);

    setTimeout(() => {
      firstIcon.classList.remove("faded__out");
    }, 500);
  }, 500);
}, 3000);

//End of SlideIcon

// End of Section 5
