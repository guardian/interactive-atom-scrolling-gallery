/* eslint-disable no-param-reassign */
export default class Gallery {
  constructor() {
    this.galleryContainer = document.querySelector('.gallery-container');
    this.galleryWrapper = document.querySelector('.gallery-wrapper');
    this.galleryImages = document.querySelectorAll('.gallery-slide');
    this.galleryButton = document.querySelector('.gallery-button');

    this.initialSpeed = 40;
    this.speed = this.initialSpeed;
    this.playingGallery = false;
    this.mouseDown = false;
    this.scroll = 0;
    this.initialLeft = this.galleryWrapper.getBoundingClientRect().left;
    this.galleryInitialLength = this.galleryWrapper.offsetWidth;

    this.galleryWrapper.style.setProperty('--gallery-width', `-${this.galleryWrapper.offsetWidth}px`);
    this.createImagesDuplicatesToAllowLoopingGallery();
    this.galleryStart();
    // this.addDraggingFunctionalityToGallery();

    // this.galleryWrapper.addEventListener('animationend', (e) => this.resetAnimation(e));
    this.galleryWrapper.addEventListener('animationiteration', (e) => this.resetAnimation(e));
    this.galleryButton.addEventListener('click', () => (this.playingGallery ? this.galleryPause() : this.galleryPlay()));
  }

  resetAnimation(e) {
    e.preventDefault();
    if (this.galleryWrapper.classList.contains('second')) {
      this.galleryWrapper.classList.remove('second');
      this.speed = this.initialSpeed;
      this.galleryWrapper.style.setProperty('--gallery-speed-resume', `${this.speed}s`);
      this.galleryWrapper.classList.add('first');
    }
    this.galleryPlayingInitialTime = new Date().getTime();
    this.scroll = 0;
  }

  galleryStart() {
    this.galleryWrapper.classList.add('first');
    this.playingGallery = true;
    this.galleryPlayingInitialTime = new Date().getTime();
  }

  galleryPause() {
    this.galleryWrapper.style.animationPlayState = 'paused';
    document.querySelector('.gallery-button--play').classList.add('active');
    document.querySelector('.gallery-button--pause').classList.remove('active');
    this.playingGallery = false;
  }

  galleryPlay() {
    this.galleryPlayingInitialTime = new Date().getTime();
    this.galleryWrapper.style.animationPlayState = 'running';
    document.querySelector('.gallery-button--play').classList.remove('active');
    document.querySelector('.gallery-button--pause').classList.add('active');
    this.playingGallery = true;
  }

  createImagesDuplicatesToAllowLoopingGallery() {
    this.imgSize = 0;
    this.imageDuplicates = [];
    this.galleryImages.forEach((img) => {
      img.classList.add('slides');
      if (this.galleryContainer.offsetWidth > this.imgSize) {
        this.imgSize += img.offsetWidth;
        this.imageDuplicates.push(img);
      }
    });

    this.imageDuplicates.forEach((img) => {
      const newImage = img.cloneNode(true);
      newImage.classList.add('gallery-slide-duplicate');
      newImage.classList.remove('gallery-slide');
      this.galleryWrapper.appendChild(newImage);
    });
  }

  translateTo() {
    this.time = new Date().getTime() - this.galleryPlayingInitialTime;
    const progress = this.time / (this.speed * 1000);
    const currentPosition = progress * this.galleryWrapper.offsetWidth + this.translate;
    return currentPosition;
  }

  startDragging(e) {
    e.preventDefault();
    this.mouseDown = true;
    // eslint-disable-next-line max-len
    this.initialLocale = e.pageX;
    this.translate = -this.scroll;
    if (this.playingGallery) {
      this.galleryWrapper.classList.remove('first');
      this.galleryWrapper.classList.remove('second');
      this.galleryPause();
      this.translate = this.translateTo(e);
      this.galleryWrapper.style.transform = `translate3d(-${this.translate}px, 0, 0)`;
    }
  }

  dragging(e) {
    e.preventDefault();
    if (!this.mouseDown) return;
    this.scroll = e.pageX - this.translate - this.initialLocale;
    this.galleryWrapper.style.transform = `translate3d(${this.scroll}px, 0, 0)`;
  }

  stopDragging() {
    this.mouseDown = false;
    this.galleryWrapper.style.setProperty('--gallery-current-location', `${this.scroll}px`);
    // eslint-disable-next-line max-len
    this.speed = Math.round(this.initialSpeed + (this.scroll / this.galleryInitialLength) * this.initialSpeed);
    this.galleryWrapper.style.setProperty('--gallery-speed-resume', `${this.speed}s`);
    this.galleryWrapper.classList.add('second');
  }

  addDraggingFunctionalityToGallery() {
    document.querySelectorAll('.slides').forEach((img) => {
      img.addEventListener('touchstart', this.startDragging.bind(this), false);
      img.addEventListener('mousedown', this.startDragging.bind(this), false);

      img.addEventListener('touchmove', this.dragging.bind(this), false);
      img.addEventListener('mousemove', this.dragging.bind(this), false);

      img.addEventListener('touchend', this.stopDragging.bind(this), false);
      img.addEventListener('mouseup', this.stopDragging.bind(this), false);
    });
  }
}
