import './index.sass';
import React from 'react';
import App from './App';
import Layout from './hoc/Layout'
import store from './redux/store'
import { Provider } from "react-redux";
import {createRoot} from "react-dom/client";


const container = document.getElementById('root')
const root = createRoot(container)

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <Layout>
            <App />
         </Layout>
      </Provider>
   </React.StrictMode>
)