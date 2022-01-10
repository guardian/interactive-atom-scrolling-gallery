/* eslint-disable no-param-reassign */
export default class Gallery {
  constructor() {
    this.galleryContainer = document.querySelector('.gallery-container');
    this.galleryWrapper = document.querySelector('.gallery-wrapper');
    this.galleryImages = document.querySelectorAll('.gallery-slide');
    this.galleryButton = document.querySelector('.gallery-button');
    this.speed = 40;

    this.playingGallery = false;
    this.userPaused = false;

    this.mouseDown = false;
    this.scroll = 0;
    this.initialLeft = this.galleryWrapper.getBoundingClientRect().left;
    this.galleryWrapper.style.setProperty('--gallery-width', `-${this.galleryWrapper.offsetWidth}px`);

    this.galleryStart();
    this.galleryButton.addEventListener('click', () => {
      if (this.playingGallery) {
        this.galleryPause();
        this.userPaused = true;
      } else {
        this.galleryPlay();
        this.userPaused = false;
      }
    });
    this.createImagesDuplicatesToAllowLoopingGallery();
    this.addDraggingFunctionalityToGallery();
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
    const time = new Date().getTime() - this.galleryPlayingInitialTime;
    const progress = time / (this.speed * 1000);
    const currentPosition = progress * this.galleryWrapper.offsetWidth;
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
      this.galleryPause();
      document.querySelectorAll('.gallery-slide-duplicate').forEach((img) => { img.style.display = 'none'; });

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
    this.galleryWrapper.classList.add('second');
    // if (!this.userPaused) this.galleryPlay();
    // this.galleryWrapper.addEventListener('animationend', () => {
    //     this.galleryWrapper.classList.remove('second');
    //     this.galleryWrapper.classList.remove('first');
    // }), false);
  }

  addDraggingFunctionalityToGallery() {
    this.galleryImages.forEach((img) => {
      img.addEventListener('touchstart', this.startDragging.bind(this), false);
      img.addEventListener('mousedown', this.startDragging.bind(this), false);

      img.addEventListener('touchmove', this.dragging.bind(this), false);
      img.addEventListener('mousemove', this.dragging.bind(this), false);

      img.addEventListener('touchend', this.stopDragging.bind(this), false);
      img.addEventListener('mouseup', this.stopDragging.bind(this), false);
    });
  }
}
