import * as React from 'react';
import { observer } from 'mobx-react';
import DbmonTableRow from './DbmonTableRow';

const DbmonTable = ({ store }) => (
  <table className="table table-striped latest-data">
    <tbody>
    {
      store.model.databaseArray.map(db => (
        <DbmonTableRow key={db.name} db={db} />
      ))
    }
    </tbody>
  </table>
)

export default observer(DbmonTable);