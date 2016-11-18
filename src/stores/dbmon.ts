import { observable, computed, autorun, action } from 'mobx';
import { generateData } from './dbmon-utils';
import ExponentialMovingAverage from './ema';
import { elapsedClass, formatElapsed } from './dbmon-utils';

export default class Dbmon {
  @observable public model;
  @observable public clear = null;
  @observable public fps = null;
  @observable public playing = false;

  constructor() {
    this.model = generateData();
  }

  @action toggle() {
    if (this.playing) {
      cancelAnimationFrame(this.clear);
      this.clear = null;
      this.fps = null;
      this.playing = false;
    } else {
      console.log('toggling!');
      this.start();
      this.playing = true;
    }
  }

  @action start() {
    console.log('starting!');
    this.playing = true;

    let lastFrame = null;
    let fpsMeter = new ExponentialMovingAverage(2/121);

    let callback = () => {
      let thisFrame = window.performance.now();

      this.onFrame();

      if (lastFrame) {
        this.fps = Math.round(fpsMeter.push(1000 / (thisFrame - lastFrame)));
      }

      this.clear = requestAnimationFrame(callback);
      lastFrame = thisFrame;
    }

    callback();

    lastFrame = null;
  }

  @action onFrame() {
    this.model = generateData(this.model.databaseArray);
  }
}