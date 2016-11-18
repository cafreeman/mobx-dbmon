import * as React from 'react';
import { observer } from 'mobx-react';
import Database from '../stores/database';
import DbmonDatabase from './DbmonDatabase';

interface Props {
  store: {
    fps: string,
    model: {
      databaseArray: Array<Database>
    },
    toggle: Function
  }
}

@observer
export default class App extends React.Component<Props, any> {
  render() {
    return (
      <div>
        <button id="playpause" onClick={() => this.props.store.toggle()}>Play</button>

        { this.props.store.fps ? <div id ="fps">{this.props.store.fps}</div>: '' }

        <table className="table table-striped latest-data">
          <tbody>
            {
              this.props.store.model.databaseArray.map(db => (
                <DbmonDatabase key={db.name} db={db} />
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }  
}