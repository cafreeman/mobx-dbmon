import * as React from 'react';
import { observer } from 'mobx-react';
import Database from '../stores/database';
import Overlay from './Overlay';
import DbmonTable from './DbmonTable';

interface Props {
  store: {
    fps: string,
    model: {
      databaseArray: Array<Database>
    },
    toggle: Function
  }
}

const App = ({ store }) => (
  <div>
    <Overlay store={store} />
    <DbmonTable store={store} />
  </div>
)

export default observer(App);
