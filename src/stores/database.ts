import { observable, computed, action } from 'mobx';
import { elapsedClass, formatElapsed, getCountClassName } from './dbmon-utils';

export default class Database {
  @observable public name: string;
  @observable public samples: Array<any>;

  constructor(name, samples = []) {
    this.name = name;
    this.samples = samples;
  }

  @computed get queries() {
    let samples = this.samples;
    return samples[samples.length -1].queries;
  }

  @computed get topFiveQueries() {
    let queries = this.queries;
    let topFiveQueries = queries.slice(0, 5);

    while (topFiveQueries.length < 5) {
      topFiveQueries.push({ query: ""});
    }

    return topFiveQueries.map((query, index) => {
      return {
        key: index+'',
        query: query.query,
        elapsed: query.elapsed ? formatElapsed(query.elapsed) : '',
        className: elapsedClass(query.elapsed)
      };
    });
  }

  @computed get countClassName() {
    let queries = this.queries;
    
    return getCountClassName(queries);
  }
}