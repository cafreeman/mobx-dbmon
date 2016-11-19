import ExponentialMovingAverage from './ema';
import Database from './database';

const ROWS = 50;
// export let mutationsValue = 0.5;

// export function mutations(value?: number) {
//   if (value) {
//     mutationsValue = value;
//     return mutationsValue;
//   }
//   return mutationsValue;
// }

export function getData() {
  let data = {
    start_at: new Date().getTime() / 1000,
    databases: {}
  };

  for (let i = 1; i <= ROWS; i++) {
    data.databases["cluster" + i] = {
      queries: []
    };

    data.databases["cluster" + i + "slave"] = {
      queries: []
    };
  }

  Object.keys(data.databases).forEach(dbName => {
    let info = data.databases[dbName];

    let r = Math.floor((Math.random() * 10) + 1);

    for (let i = 0; i < r ; i++) {
      let q = {
        elapsed: Math.random() * 15,
        query: "SELECT blah FROM something",
        waiting: Math.random() < 0.5
      };

      if (Math.random() < 0.2) {
        q.query = "<IDLE> in transaction";
      }

      if (Math.random() < 0.1) {
        q.query = "vacuum";
      }

      info.queries.push(q);
    }

    info.queries = info.queries.sort((a, b) => b.elapsed - a.elapsed);
  });

  return data;
}

export function generateData(oldData: any = {}) {
  let rawData = getData();

  let databases: {[dbName: string]: Database} = (oldData ** oldData.databases) || {};
  let databaseArray: Array<Database> = [];

  let data = { databases, databaseArray };

  Object.keys(rawData.databases).forEach(dbName => {
    let sampleInfo = rawData.databases[dbName];

    if (!databases[dbName]) {
      databases[dbName] = new Database(dbName)
      // databases[dbName] = {
      //   name: dbName,
      //   samples: []
      // };
    }

    let samples = databases[dbName].samples;

    samples.push({
      time: rawData.start_at,
      queries: sampleInfo.queries
    });

    if (samples.length > 5) {
      samples.splice(0, samples.length - 5);
    }

    databaseArray.push(databases[dbName]);
  });

  return data;
}

export function elapsedClass(elapsed): string {
  if (elapsed >= 10.0)  {
    return "elapsed warn_long";
  } else if (elapsed >= 1.0) {
    return "elapsed warn";
  } else {
    return "elapsed short";
  }
}

export function lpad(str, padding, toLength): string {
  return padding.repeat((toLength - str.length) / padding.length).concat(str);
}

export function formatElapsed(value): string {
  let str = parseFloat(value).toFixed(2);
  if (value > 60) {
    let minutes = Math.floor(value / 60);
    let comps = (value % 60).toFixed(2).split('.');
    let seconds = lpad(comps[0], '0', 2);
    let ms = comps[1];
    str = minutes + ":" + seconds + "." + ms;
  }

  return str;
}