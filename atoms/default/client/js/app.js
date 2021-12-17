

// aditionalImages();

// const aditionalImages = () => {
const swiperContainer = document.querySelector('.swiper-container');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const swiperImages = document.querySelectorAll('.swiper-slide');
console.log('cm-log:', swiperContainer.offsetWidth)
let imgSize = 0;
let fullLength = 0;
let imageDuplicates = [];

document.documentElement.style.setProperty('--gallery-width', `-${swiperWrapper.offsetWidth}px`);

swiperImages.forEach((img) => {
    if (swiperContainer.offsetWidth > imgSize) {
        imgSize += img.offsetWidth
        imageDuplicates.push(img);
    }
    fullLength += img.offsetWidth
    console.log('cm-log: fullLength', fullLength)
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