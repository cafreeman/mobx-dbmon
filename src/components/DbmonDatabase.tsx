import * as React from 'react';
import { observer } from 'mobx-react';
import { elapsedClass, formatElapsed, getCountClassName } from '../stores/dbmon-utils';
import DatabaseQueryItem from './DatabaseQueryItem';

@observer
export default class DbmonDatabase extends React.Component<any, any> {
  queries = () => {
    let samples = this.props.db.samples;
    return samples[samples.length - 1].queries;
  }

  topFiveQueries = () => {
    let queries = this.queries();
    let topFiveQueries = queries.slice(0, 5);

    while (topFiveQueries.length < 5) {
      topFiveQueries.push({ query: "" });
    }

    return topFiveQueries.map((query, index) => {
      return {
        key: index+'',
        query: query.query,
        elapsed: query.elapsed ? formatElapsed(query.elapsed) : '',
        className: elapsedClass(query.elapsed)
      };
    });
  }

  countClassName = () => {
    let queries = this.queries();
    return getCountClassName(queries);
  }

  render() {
    return (
      <tr>
        <td className="dbname">
          {this.props.db.name}
        </td>
        <td className="query-count">
          <span className={this.countClassName}>
            {this.queries().length}
          </span>
        </td>
        {
          this.topFiveQueries().map(query => {
            return (
              <td key={query.key} className={`Query ${query.className}`}>
                {query.elapsed}
                <div className="popover left">
                  <div className="popover-content">{query.query}</div>
                  <div className="arrow"></div>
                </div>
              </td>
            )
          })
        }
      </tr>
    );
  }
}