import * as React from 'react';
import { observer } from 'mobx-react';
import DbmonDatabase from './DbmonDatabase';

const DbmonTable = ({ store }) => (
  <table className="table table-striped latest-data">
    <tbody>
    {
      store.model.databaseArray.map(db => (
        <DbmonDatabase key={db.name} db={db} />
      ))
    }
    </tbody>
  </table>
)

export default observer(DbmonTable);