// index.js
import React from 'react';
import ReactDOM from 'react-dom';
//import Routes from './Routes';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ChainInfo from './Components/ChainInfo/ChainInfo'; // Assurez-vous que ce composant est bien défini
import FakeBayc from './Components/FakeBayc/fakeBayc'; // Assurez-vous que ce composant est bien défini
import ErrorPage from './Components/Wrong_Page_404/ErrorPage'; // Assurez-vous que ce composant est bien défini
import FakeNefturians from './Components/fakeNefturians/fakeNefturians'; // Assurez-vous que ce chemin est correct
import FakeNefturiansUser from './Components/fakeNefturians/fakeNefturianUser'; // Assurez-vous que ce chemin est correct

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';


const router = createBrowserRouter([
  {
    path: "/ChainInfo",
    element: <ChainInfo/>,
  },
  {
    path: "/",
    element: <App/>,
  },

{
  path:"/error",
  element:<ErrorPage/>,
}
,
{
  path:"/fakeBayc",
  element:<FakeBayc/>,
},

{
  path:"/fakeBayc/:tokenId",
  element:<FakeBayc/>,
}
,
{
  path: "/fakeNefturians",
  element: <FakeNefturians />,
},
{
  path: "/fakeNefturians/:userAddress",
  element: <FakeNefturiansUser />,
},


]);



ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();