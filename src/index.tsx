import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dbmon from './stores/dbmon';

import App from './components/App';

const store = new Dbmon();

const root = document.createElement('div');
root.id = 'app';
document.body.appendChild(root);

ReactDOM.render(
  <App store={store} />,
  document.querySelector('#app')
);
