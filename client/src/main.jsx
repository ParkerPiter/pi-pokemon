import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider} from 'react-redux' //engloba los estados
import { store } from './redux/store' /* store={store} */

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store} >
      <App />
    </Provider>
  </BrowserRouter>,
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>

//       <App />

//   </BrowserRouter>,
// )
