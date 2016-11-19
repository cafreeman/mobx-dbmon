import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { mutations, mutationsValue } from './stores/dbmon-utils';
import Dbmon from './stores/dbmon';

import App from './components/App';

// let body = document.querySelector('body');
// let theFirstChild = body.firstChild;

// let sliderContainer = document.createElement( 'div' );
// sliderContainer.style.cssText = "display: flex";
// let slider = document.createElement('input');
// let text = document.createElement('label');
// text.innerHTML = 'mutations : ' + (mutationsValue * 100).toFixed(0) + '%';
// text.id = "ratioval";
// slider.setAttribute("type", "range");
// slider.style.cssText = 'margin-bottom: 10px; margin-top: 5px';
// slider.addEventListener('change', function(e) {
//   mutations(e.target.value / 100);
//   document.querySelector('#ratioval').innerHTML = 'mutations : ' + (mutations() * 100).toFixed(0) + '%';
// });
// sliderContainer.appendChild( text );
// sliderContainer.appendChild( slider );
// body.insertBefore( sliderContainer, theFirstChild );

const store = new Dbmon();

const root = document.createElement('div');
root.id = 'app';
document.body.appendChild(root);

ReactDOM.render(
  <App store={store} />,
  document.querySelector('#app')
);
