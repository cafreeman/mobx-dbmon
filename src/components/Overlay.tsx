import * as React from 'react';
import { observer } from 'mobx-react';

const Overlay = ({ store }) => (
   <div>
    <button id="playpause" onClick={() => store.toggle()}>Play</button>

    {
      store.fps ?
        <div id ="fps">{store.fps}</div> : '' 
    }
  </div>
);

export default observer(Overlay);