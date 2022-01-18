/* eslint-disable no-param-reassign */
import Dragging from './galleryDragging';
import events from '../../events-emitter';

export default class Gallery {
  constructor() {
    this.galleryContainer = document.querySelector('.gallery-container');
    this.galleryWrapper = document.querySelector('.gallery-wrapper');
    this.galleryImages = document.querySelectorAll('.gallery-slide');
    this.galleryButton = document.querySelector('.gallery-button');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion)').matches;

    this.playingGallery = false;
    // Plays the gallery when it comes into view, unless prefers-reduced-motion is set to true
    this.initialPlay = !prefersReducedMotion;
    this.mouseDown = false;

    this.createImagesDuplicatesToAllowLoopingGallery();
    this.galleryStart();
    this.galleryPause();

    this.galleryButton.addEventListener('click', () => (this.playingGallery ? this.galleryPause() : this.galleryPlay()));

    window.addEventListener('blur', () => {
      this.currentlyPlaying = this.playingGallery;
      this.galleryPause();
    });

    window.addEventListener('focus', () => {
      if (this.currentlyPlaying) this.galleryPlay();
    });

    const intersectionOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(this.observeGallery.bind(this), intersectionOptions);
    observer.observe(this.galleryContainer);

    this.draggingEnabled = false;
    if (this.draggingEnabled) {
      this.dragging = new Dragging();
      this.dragging.addDraggingFunctionalityToGallery();

      events.on('galleryDragging-pause', () => {
        this.galleryPause();
      });
    }
  }

  observeGallery(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (this.initialPlay) {
          this.galleryPlay();
          this.currentlyPlaying = true;
        }
        if (this.currentlyPlaying) this.galleryPlay();
      } else {
        this.currentlyPlaying = this.playingGallery;
        this.galleryPause();
      }
    });
  }

  galleryStart() {
    this.galleryWrapper.classList.add('first');
    this.playingGallery = true;
    this.initialPlay = true;
    events.emit('gallery-start');
  }

  galleryPause() {
    this.galleryWrapper.style.animationPlayState = 'paused';
    document.querySelector('.gallery-button--play').classList.add('active');
    document.querySelector('.gallery-button--pause').classList.remove('active');
    this.playingGallery = false;
    events.emit('gallery-pause');
  }

  galleryPlay() {
    this.galleryPlayingInitialTime = new Date().getTime();
    this.galleryWrapper.style.animationPlayState = 'running';
    document.querySelector('.gallery-button--play').classList.remove('active');
    document.querySelector('.gallery-button--pause').classList.add('active');
    this.playingGallery = true;
    this.initialPlay = false;
    events.emit('gallery-play');
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
}
