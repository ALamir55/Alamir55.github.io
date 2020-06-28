// Select Elements
const landingPage = document.querySelector(".landing-page");
const SettingsBox = document.querySelector(".settings-box");
const settingBoxGear = document.querySelector(".gear-icon");

/*****************************************
 *****  LandingPage Backgroudn image *****
 ******************************************/

const imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Background images randomize otption
let backgroundRandomizeOpt = true;
// Variable to control interval funtion
let backgroundInterval;

// Randomize Images Function
function randomizImgs() {
  if (backgroundRandomizeOpt === true) {
    backgroundInterval = setInterval(() => {
      // Random Index
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 3000);
  }
}

// init the function
randomizImgs();

// Settings Box
let SettingsBoxWidth = SettingsBox.offsetWidth;
SettingsBox.style.left = "-" + SettingsBoxWidth + "px";

settingBoxGear.addEventListener("click", () => {
  settingBoxGear.classList.toggle("fa-spin");
  SettingsBox.classList.toggle("open");
  if (SettingsBox.classList.contains("open")) SettingsBox.style.left = 0;
  else SettingsBox.style.left = "-" + SettingsBoxWidth + "px";
});

/*********************************
 *****  Start Colors Options *****
 **********************************/
const colorsLi = document.querySelectorAll(".colors-list li");

// check if thers is color in local storage
let mainColorStorage = localStorage.getItem("main-color");
if (mainColorStorage != null) {
  // if there then set the color from local storage
  document.documentElement.style.setProperty("--main-color", mainColorStorage);
  colorsLi.forEach((li) => {
    if (li.dataset.color === mainColorStorage) li.classList.add("active");
  });
} else {
  // Set the default color if there is no color in local storage
  document.documentElement.style.setProperty("--main-color", colorsLi[0].dataset.color);
  colorsLi[0].classList.add("active");
}

// Loop on li
colorsLi.forEach((li) => {
  // set background-color to all li based on data-color
  li.style.backgroundColor = li.dataset.color;

  // Click Event on every Li
  li.addEventListener("click", (e) => {
    // set the color in variables root AND local storage
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    localStorage.setItem("main-color", e.target.dataset.color);

    handleActiveClass(e);
  });
});

/***********************************************
 ******  Start Random Backgrounds Options ******
 ***********************************************/

const randomBackgroundBtns = document.querySelectorAll(".random-background span");
let backgroundRandomizeStorage = localStorage.getItem("background-random");

// check if there is value in local storage
if (backgroundRandomizeStorage !== null) {
  // first remove class 'active' from all buttons
  randomBackgroundBtns.forEach((btn) => {
    btn.classList.remove("active");
  });

  // if local storage is true
  if (backgroundRandomizeStorage === "true") {
    // Background images randomize otption > true
    backgroundRandomizeOpt = true;
    // init the randomize function
    randomizImgs();
    // add class active on 'yes' button
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    // Background images randomize otption > false
    backgroundRandomizeOpt = false;
    // stop the fandomize function
    clearInterval(backgroundInterval);
    // add class active on 'no' button
    document.querySelector(".random-background .no").classList.add("active");
  }
}

randomBackgroundBtns.forEach((btn) => {
  // Click On Every Button (span)
  btn.addEventListener("click", (e) => {
    handleActiveClass(e);
    // if click on YES
    if (e.target.dataset.background === "yes") {
      backgroundRandomizeOpt = true;
      randomizImgs();
      localStorage.setItem("background-random", true);
    } else {
      // if click on NO
      backgroundRandomizeOpt = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-random", false);
    }
  });
});

/*********************************
 *****  Start Skills Section *****
 *********************************/

// Select Skills Selector
let skills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = skills.offsetTop;
  // Skills Outer Height
  let skillsOuterHeight = skills.offsetHeight;
  // Window inner Height
  let windowHeight = this.innerHeight;
  // Window Scroll Top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(".skills .skill-progress span");
    allSkills.forEach((skill) => (skill.style.width = skill.dataset.progress));
  }
};

// Start Gallery
let galleryImages = document.querySelectorAll(".images-box img");
let popup = document.querySelector(".gallery .pop-up");
let popupInfo = document.querySelector(".gallery .pop-up .info");
let popupClose = document.querySelector(".gallery .pop-up .close");

galleryImages.forEach((img) => {
  img.onclick = function (e) {
    // Create Popup Overlay
    let popupOvelay = document.createElement("div");
    // Give the Popup Overlay class
    popupOvelay.className = "popup-overlay";
    // Append the popup-overlay to body
    document.body.appendChild(popupOvelay);

    // Create th popup box
    let popupBox = document.createElement("div");
    // add class to popup box
    popupBox.className = "popup-box";
    // append the popup box to body
    document.body.appendChild(popupBox);

    // Create the image element
    let popupImage = document.createElement("img");
    // Set up the image from img src
    popupImage.src = img.src;
    // append the popup image to popup box
    popupBox.appendChild(popupImage);

    if (img.alt !== null) {
      // Create the h3
      let popupTitle = document.createElement("h3");
      // create the h3 element text from alt ATTR from image
      let popupTitleText = document.createTextNode(img.alt);
      // append the text to h3
      popupTitle.appendChild(popupTitleText);
      // prepend the h3 element to popup box
      popupBox.prepend(popupTitle);
    }

    if (img.dataset.creator !== null && img.dataset.creator !== undefined && img.dataset.creator !== "") {
      // Create the h4
      let popupCreator = document.createElement("h4");
      // create the h4 element text from data-creator ATTR from image
      let popupCreatorName = document.createTextNode(`From : ${img.dataset.creator}`);
      // append the text to h4
      popupCreator.appendChild(popupCreatorName);
      // append the h4 element to popup box
      popupBox.appendChild(popupCreator);
    }

    // Create the close button
    let closeButton = document.createElement("div");
    // add class on the close button
    closeButton.className = "close-button";
    // Create the X text to the button
    closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    // append the close button to popupbox
    popupBox.appendChild(closeButton);
  };
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    // Remove the popup box
    e.target.parentElement.remove();
    // Remove the popup overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Scroll With Smooth Function
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

function scrollToWithSmooth(elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({ behavior: "smooth" });
    });
  });
}

scrollToWithSmooth(allBullets);
scrollToWithSmooth(allLinks);

// Handle Active Class State
function handleActiveClass(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  event.target.classList.add("active");
}

// Nav Bullets Otpion
let bulletSpans = document.querySelectorAll(".bullets-Option span");
let navBullets = document.querySelector(".nav-bullets");
let bulletOptionLocalStorage = localStorage.getItem("bullets-option");

if (bulletOptionLocalStorage !== null) {
  bulletSpans.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletOptionLocalStorage === "block") {
    navBullets.style.display = "block";
    document.querySelector(".bullets-Option .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".bullets-Option .no").classList.add("active");
  }
}

bulletSpans.forEach((span) => {
  span.addEventListener("click", (event) => {
    if (event.target.classList.contains("yes")) {
      navBullets.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      navBullets.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handleActiveClass(event);
  });
});

// Reset Defalut
document.querySelector(".settings-box .reset-button").onclick = () => {
  // localStorage.clear();
  localStorage.removeItem("main-color");
  localStorage.removeItem("background-random");
  localStorage.removeItem("bullets-option");
  window.location.reload();
};

let meunToggle = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

meunToggle.onclick = function (e) {
  e.stopPropagation();
  meunToggle.classList.toggle("menu-active");
  tlinks.classList.toggle("open");
};

tlinks.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target !== meunToggle && e.target !== tlinks) {
    if (tlinks.classList.contains("open")) {
      meunToggle.classList.toggle("menu-active");
      tlinks.classList.toggle("open");
    }
  }
});
