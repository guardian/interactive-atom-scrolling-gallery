/* eslint-disable no-param-reassign */
const swiperContainer = document.querySelector('.swiper-container');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const swiperImages = document.querySelectorAll('.swiper-slide');
const swiperButton = document.querySelector('.swiper-button');

let imgSize = 0;
const imageDuplicates = [];
let playingGallery = true;

swiperButton.addEventListener('click', () => {
  swiperWrapper.classList.add('first');
  swiperWrapper.style.animationPlayState = playingGallery ? 'paused' : 'running';
  document.querySelector('.swiper-button--play').classList.toggle('active');
  document.querySelector('.swiper-button--pause').classList.toggle('active');
  playingGallery = !playingGallery;
});

swiperWrapper.style.setProperty('--gallery-width', `-${swiperWrapper.offsetWidth}px`);

swiperImages.forEach((img) => {
  if (swiperContainer.offsetWidth > imgSize) {
    imgSize += img.offsetWidth;
    imageDuplicates.push(img);
  }
});

imageDuplicates.forEach((img) => {
  const newImage = img.cloneNode(true);
  newImage.classList.add('swiper-slide-duplicate');
  newImage.classList.remove('swiper-slide');
  swiperWrapper.appendChild(newImage);
});

swiperWrapper.classList.add('first');

// let mouseDown = false;
// let startX = 0;
// let scrollLeft = 0;

// const startDragging = (e) => {
//   e.preventDefault();
//   mouseDown = true;
//   console.log('cm-log:', e.currentTarget);
//   swiperWrapper.style.animationPlayState = 'paused';
//   swiperWrapper.classList.remove('first');
//   document.querySelector('.swiper-button--play').classList.add('active');
//   document.querySelector('.swiper-button--pause').classList.remove('active');
// eslint-disable-next-line max-len
//   document.querySelectorAll('.swiper-slide-duplicate').forEach((img) => { img.style.display = 'none'; });
//   startX = e.pageX - swiperWrapper.offsetLeft;
//   scrollLeft = swiperWrapper.scrollLeft;
// };

// const stopDragging = () => {
//   mouseDown = false;
// };

// const dragging = (e) => {
//   e.preventDefault();
//   if (!mouseDown) return;
//   const x = e.pageX - swiperWrapper.offsetLeft;
//   const scroll = x - startX;
//   swiperWrapper.style.transform = `translate3d(-${scrollLeft - scroll}px, 0, 0)`;
// };

// // Add the event listeners
// swiperImages.forEach((img) => {
//   img.addEventListener('touchstart', startDragging, false);
//   img.addEventListener('mousedown', startDragging, false);

//   img.addEventListener('touchmove', dragging, false);
//   img.addEventListener('mousemove', dragging, false);

//   img.addEventListener('touchend', stopDragging, false);
//   img.addEventListener('mouseup', stopDragging, false);
// });
