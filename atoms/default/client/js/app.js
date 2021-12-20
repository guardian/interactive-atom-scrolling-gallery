

// aditionalImages();

// const aditionalImages = () => {
const swiperContainer = document.querySelector('.swiper-container');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const swiperImages = document.querySelectorAll('.swiper-slide');
const swiperButton = document.querySelector('.swiper-button');
let imgSize = 0;
let fullLength = 0;
let imageDuplicates = [];
let playingGallery = true;

swiperButton.addEventListener('click', () => {
    swiperWrapper.style.animationPlayState = playingGallery ? 'paused' : 'running';
    document.querySelector('.swiper-button--play').classList.toggle('active');
    document.querySelector('.swiper-button--pause').classList.toggle('active');
    playingGallery = !playingGallery;
});

swiperWrapper.style.setProperty('--gallery-width', `-${swiperWrapper.offsetWidth}px`);

swiperImages.forEach((img) => {
    if (swiperContainer.offsetWidth > imgSize) {
        imgSize += img.offsetWidth
        imageDuplicates.push(img);
    }
    fullLength += img.offsetWidth
});

imageDuplicates.forEach((img) => {
    console.log('cm-log:', img)
    const newImage = img.cloneNode(true)
    newImage.classList.add('swiper-slide-duplicate')
    newImage.classList.remove('swiper-slide')
    swiperWrapper.appendChild(newImage)
});

swiperWrapper.classList.add('first');

// }