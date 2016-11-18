import * as React from 'react';
import { observer } from 'mobx-react';

const DatabaseQueryItem = ({ query }) => (
  <td key={query.key} className={`Query ${query.className}`}>
    {query.elapsed}
    <div className="popover left">
      <div className="popover-content">
        {query.query}
      </div>
      <div className="arrow"></div>
    </div>
  </td>
);

export default observer(DatabaseQueryItem);