import * as React from 'react';
import { observer } from 'mobx-react';
import Database from '../stores/database';
import DbmonDatabase from './DbmonDatabase';
import Overlay from './Overlay';
import DbmonTable from './DbmonTable';

const App = ({ store }) => (
  <div>
    <Overlay store={store} />
    <DbmonTable store={store} />
  </div>
)

export default observer(App);
