import * as React from 'react';
import { observer } from 'mobx-react';
import DatabaseQueryItem from  './DatabaseQueryItem';

const DatabaseTopFive = ({ db }) => (
  db.topFiveQueries.map(query => (
    <DatabaseQueryItem
      key={query.key}
      query={query}
      className={`Query ${query.className}`}
    />
  ))
);

export default observer(DatabaseTopFive);
