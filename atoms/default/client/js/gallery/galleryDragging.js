import events from '../../events-emitter';

export default class Dragging {
  constructor(initialSpeed) {
    this.galleryWrapper = document.querySelector('.gallery-wrapper');
    this.galleryPlayingInitialTime = 0;
    this.initialSpeed = initialSpeed;
    this.speed = this.initialSpeed;
    this.galleryPlaying = false;

    this.scroll = 0;

    this.initialLeft = this.galleryWrapper.getBoundingClientRect().left;
    this.galleryInitialLength = this.galleryWrapper.offsetWidth;

    this.galleryWrapper.addEventListener('animationend', (e) => this.resetAnimation(e));
    this.galleryWrapper.addEventListener('animationiteration', (e) => this.resetAnimation(e));
    events.on('gallery-start', () => {
      this.galleryPlaying = true;
      this.galleryPlayingInitialTime = new Date().getTime();
    });
    events.on('gallery-play', () => {
      this.galleryPlaying = true;
      this.galleryPlayingInitialTime = new Date().getTime();
    });
    events.on('gallery-pause', () => {
      this.galleryPlaying = false;
    });
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
    this.galleryWrapper.classList.remove('first');
    this.galleryWrapper.classList.remove('second');
    events.emit('galleryDragging-pause');
    // if paused translate should just be previous scroll location
    this.translate = this.galleryPlaying ? this.translateTo(e) : this.translate;
    this.galleryWrapper.style.transform = `translate3d(-${this.translate}px, 0, 0)`;
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
}
