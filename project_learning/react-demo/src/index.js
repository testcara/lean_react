import React from 'react';
import ReactDOM from 'react-dom/client';
// import Perfroot from './repeatRender/perfRoot';
// import App from './App';
// import Index from './broEvents';
// import Root from './repeatRender/root';
// import Functionroot from './repeatRender/functionRoot';

import Createref from './refExample/createRef';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Index /> */}
    {/* <Root /> */}
    {/* <Functionroot /> */}
    {/* <Perfroot /> */}
    <Createref />
  </React.StrictMode>
);

