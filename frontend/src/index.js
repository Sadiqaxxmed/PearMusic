// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';

import './index.css';

import * as ReactDOMClient from 'react-dom/client';
// import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { ModalProvider, Modal } from './context/Modal';
import App from './App';

// import configureStore from './store';
// import { restoreCSRF, csrfFetch } from "./store/csrf";
// import * as sessionActions from './store/session';

// const store = configureStore();

// if (process.env.NODE_ENV !== 'production') {
//   restoreCSRF();

//   window.csrfFetch = csrfFetch;
//   window.store = store;
//   window.sessionActions = sessionActions;
// }

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    // <ModalProvider>
      // <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
          {/* <Modal /> */}
        </BrowserRouter>
      //{/* </ReduxProvider> */}
    // </ModalProvider>
  // </React.StrictMode>
)