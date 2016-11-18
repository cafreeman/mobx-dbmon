import * as React from 'react';
import { observer } from 'mobx-react';
import Database from '../stores/database';

interface Props {
  db: Database
}

@observer
export default class DbmonDatabase extends React.Component<Props, any> {
  render() {
    return (
      <tr>
        <td className="dbname">
          {this.props.db.name}
        </td>
        <td className="query-count">
          <span className={this.props.db.countClassName}>
            {this.props.db.queries.length}
          </span>
        </td>
        {this.props.db.topFiveQueries.map(query => {
          return (
            <td key={query.key} className={`Query ${query.className}`}>
              {query.elapsed}
              <div className="popover left">
                <div className="popover-content">
                  {query.query}
                </div>
                <div className="arrow"></div>
              </div>
            </td>
          )
        })}
      </tr> 
    )
  }
}