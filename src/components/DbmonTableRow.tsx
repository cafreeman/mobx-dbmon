import * as React from 'react';
import { observer } from 'mobx-react';
import Database from '../stores/database';
import DatabaseQueryItem from  './DatabaseQueryItem';

interface Props {
  db: Database
}

const DbmonTableRow = ({ db }) => (
  <tr>
    <td className="dbname">
      {db.name}
    </td>
    <td className="query-count">
      <span className={db.countClassName}>
        {db.queries.length}
      </span>
    </td>
    {
      db.topFiveQueries.map(query => (
        <DatabaseQueryItem
          key={query.key}
          query={query}
          className={`Query ${query.className}`}
        />
      ))
    } 
  </tr> 
)

export default observer(DbmonTableRow);
