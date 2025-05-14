import scrollama from 'scrollama';

import joteraDesktop from './images/jotera_v2.jpg';
import joteraMobile from './images/jotera-phone.jpg';

import vienDesktop from './images/vien_v2.jpg';
import vienMobile from './images/vien-phone.jpg';

import malkyDesktop from './images/malky_v2.jpg';
import malkyMobile from './images/malky-phone.jpg';

import davidDesktop from './images/david_v2.jpg';
import davidMobile from './images/david-phone.jpg';

function getResponsiveImage(name) {
  const width = window.innerWidth;
  const device = width <= 500 ? 'mobile' : 'desktop';

  const imageMap = {
    jotera: {
      desktop: joteraDesktop,
      mobile: joteraMobile,
      courtesy: 'Courtesy of Jotera Webster',
      photographer: null,
    },
    vien: {
      desktop: vienDesktop,
      mobile: vienMobile,
      courtesy: 'Courtesy of Vien Nguyen',
      photographer: 'Photo by Morgan Desfosses',
    },
    malky: {
      desktop: malkyDesktop,
      mobile: malkyMobile,
      courtesy: 'Courtesy of Malky Schwartz',
      photographer: null,
    },
    david: {
      desktop: davidDesktop,
      mobile: davidMobile,
      courtesy: 'Courtesy of David Benson',
      photographer: 'Photo by Morgan Desfosses',
    },
  };

  const entry = imageMap[name];
  return {
    url: entry && entry[device],
    courtesy: entry && entry.courtesy,
    photographer: entry && entry.photographer,
  };
}

const scroller = scrollama();

scroller
  .setup({
    step: ".step, .title-section, .intro-section, .concluding-section",
    offset: 0.5,
  })
  .onStepEnter(response => {
    const imgFrame = document.getElementById("sticky-img-frame");
    const newImageKey = response.element.getAttribute("data-image");
    const newColor = response.element.getAttribute("data-color");

    const { url: newImage, courtesy, photographer } = getResponsiveImage(newImageKey);

    if (newImage && imgFrame) {
      imgFrame.style.backgroundImage = `url('${newImage}')`;
    }

    // Set photo credits
    const leftCredit = document.getElementById("photo-credit-left");
    const rightCredit = document.getElementById("photo-credit-right");
    if (leftCredit) leftCredit.textContent = photographer || "";
    if (rightCredit) rightCredit.textContent = courtesy || "";

    // For mobile: semi-transparent text overlay
    if (window.innerWidth <= 500 && response.element.classList.contains("step")) {
      document.querySelectorAll(".step").forEach(step => {
        step.style.backgroundColor = "transparent";
      });
      response.element.style.backgroundColor = newColor ? `${newColor}80` : "rgba(0, 0, 0, 0.5)";
    }

    // Background color transition for section headers
    if (
      response.element.classList.contains("title-section") ||
      response.element.classList.contains("intro-section") ||
      response.element.classList.contains("concluding-section")
    ) {
      document.getElementById("fade-overlay").style.opacity = 0.4;
      setTimeout(() => {
        document.body.style.backgroundColor = newColor || "#264653";
        document.getElementById("fade-overlay").style.opacity = 0;
      }, 200);
    } else if (newColor) {
      document.body.style.backgroundColor = newColor;
    }
  });