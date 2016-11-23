import { observable, computed, autorun, action } from 'mobx';
import { generateData } from './dbmon-utils';
import ExponentialMovingAverage from './ema';
import { elapsedClass, formatElapsed } from './dbmon-utils';
import Monitoring from '../lib/monitoring';

const monitoring = Monitoring();
let clear = null;

export default class Dbmon {
  @observable public model;
  @observable public playing = false;

  constructor() {
    this.model = generateData();
  }

  @action toggle() {
    if (this.playing) {
      cancelAnimationFrame(clear);
      clear = null;
      this.playing = false;
    } else {
      this.loadSamples();
      this.playing = true;
    }
  }

  loadSamples = () => {
    this.model = generateData(this.model.databaseArray);
    monitoring.renderRate.ping();
    clear = requestAnimationFrame(this.loadSamples.bind(this));
  }
}
