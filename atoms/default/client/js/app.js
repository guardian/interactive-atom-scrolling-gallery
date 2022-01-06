/* eslint-disable no-param-reassign */
const galleryContainer = document.querySelector('.gallery-container');
const galleryWrapper = document.querySelector('.gallery-wrapper');
const galleryImages = document.querySelectorAll('.gallery-slide');
const galleryButton = document.querySelector('.gallery-button');

let imgSize = 0;
const imageDuplicates = [];
let playingGallery = true;

let mouseDown = false;
let startX = 0;
const initialLeft = galleryWrapper.getBoundingClientRect().left;

const galleryPlaying = () => {
  galleryWrapper.classList.add('first');
  galleryWrapper.style.animationPlayState = playingGallery ? 'paused' : 'running';
  document.querySelector('.gallery-button--play').classList.toggle('active');
  document.querySelector('.gallery-button--pause').classList.toggle('active');
  playingGallery = !playingGallery;
};

const createImagesDuplicatesToAllowLoopingGallery = () => {
  galleryImages.forEach((img) => {
    if (galleryContainer.offsetWidth > imgSize) {
      imgSize += img.offsetWidth;
      imageDuplicates.push(img);
    }
  });

  imageDuplicates.forEach((img) => {
    const newImage = img.cloneNode(true);
    newImage.classList.add('gallery-slide-duplicate');
    newImage.classList.remove('gallery-slide');
    galleryWrapper.appendChild(newImage);
  });
};

const timing = () => {
  const startPosition = -gallery.translate || 0;
  const startTime = null;
  let time;
  const duration = gallery.params.speed || 40;

  window.cancelAnimationFrame(gallery.cssModeFrameID);

  const dir = targetPosition > startPosition ? 'next' : 'prev';

  const isOutOfBound = (current, target) => (dir === 'next' && current >= target) || (dir === 'prev' && current <= target);

  return targetPosition;
};

// something that adds the animation class
// then measures how long it's been running for and uses that to calculate the distance it must have traveled
// Does this really need to be linked to an animation loop
// call it when you need it

// const animate = () => {
//   time = new Date().getTime();
//   if (startTime === null) {
//     startTime = time;
//   }

//   const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
//   const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
//   let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);

//   if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
//   gallery.wrapperEl.scrollTo({
//     [side]: currentPosition,
//   });
//   if (isOutOfBound(currentPosition, targetPosition)) {
//     gallery.wrapperEl.style.scrollSnapType = '';
//     window.cancelAnimationFrame(gallery.cssModeFrameID);
//     return;
//   }
//   gallery.cssModeFrameID = window.requestAnimationFrame(animate);
// };

// animate();

const startDragging = (e) => {
  e.preventDefault();
  mouseDown = true;
  console.log('cm-log:', e.currentTarget);
  galleryWrapper.style.animationPlayState = 'paused';
  galleryWrapper.classList.remove('first');
  document.querySelector('.gallery-button--play').classList.add('active');
  document.querySelector('.gallery-button--pause').classList.remove('active');
  // eslint-disable-next-line max-len
  document.querySelectorAll('.gallery-slide-duplicate').forEach((img) => { img.style.display = 'none'; });
  startX = initialLeft - galleryWrapper.getBoundingClientRect().left;
  console.log('cm-log: e.pageX', e.pageX);
  console.log('cm-log: e.clientX', e.clientX);
  console.log('cm-log: initialLeft', initialLeft);
  console.log('cm-log: galleryWrapper.e.currentTarget', e.currentTarget.getBoundingClientRect().left);
  console.log('cm-log: galleryWrapper.e.currentTarget', e.currentTarget.getBoundingClientRect().left - initialLeft);
  console.log('cm-log: galleryWrapper.offsetLeft', galleryWrapper.getBoundingClientRect().left);
  console.log('cm-log: galleryWrapper.scrollLeft', galleryWrapper.scrollLeft);
  console.log('cm-log: startX', startX);
  timing();
  // console.log('cm-log: timing', timing());
  galleryWrapper.style.transform = `translate3d(-${e.currentTarget.getBoundingClientRect().left - e.pageX - initialLeft}px, 0, 0)`;
};

const stopDragging = () => {
  mouseDown = false;
};

const addDraggingFunctionalityToGallery = () => {
  galleryImages.forEach((img) => {
    img.addEventListener('touchstart', startDragging, false);
    img.addEventListener('mousedown', startDragging, false);

    // img.addEventListener('touchmove', dragging, false);
    // img.addEventListener('mousemove', dragging, false);

    img.addEventListener('touchend', stopDragging, false);
    img.addEventListener('mouseup', stopDragging, false);
  });
};

const init = () => {
  galleryPlaying();
  galleryWrapper.style.setProperty('--gallery-width', `-${galleryWrapper.offsetWidth}px`);
  galleryButton.addEventListener('click', () => galleryPlaying());
  createImagesDuplicatesToAllowLoopingGallery();
  addDraggingFunctionalityToGallery();
};

init();

// const dragging = (e) => {
//   e.preventDefault();
//   if (!mouseDown) return;
//   const x = e.pageX - galleryWrapper.getBoundingClientRect().left;
//   const scroll = x - startX;
//   galleryWrapper.style.transform = `translate3d(${scroll}px, 0, 0)`;
// };

// Add the event listeners
