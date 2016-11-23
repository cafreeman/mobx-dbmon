# mobx-dbmon

This app is intended to serve as a benchmark for React + Mobx using the dbmon benchmark.

Prior work on dbmon can be found [here](https://github.com/mathieuancelin/js-repaint-perfs).

Live demo can be found [here](http://mobx-dbmon.surge.sh/)

To run this demo:

- clone this repo
- `npm run setup` (This will install all the dependencies *and* configure the necessary TypeScript declarations so the compiler doesn't yell at you.)
- `npm run compile` (This will generate a production build of the dbmon app)
- open `dist/index.html` (preferably in an incognito window so your extensions don't mess with things).

Note: If you run `npm start`, the app will build in `dev` mode, which means the rebuild times will be faster, but the app itself will be slower.

You should see something like this: ![dbmon-screenshot](https://github.com/cafreeman/mobx-dbmon/blob/master/libs/dbmon-screenshot.png)

