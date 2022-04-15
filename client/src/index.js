import React from 'react';
import './index.sass';
import App from './App';
import Layer from './hoc/Layer'
import {createRoot} from "react-dom/client";


const container = document.getElementById('root')
const root = createRoot(container)

root.render(
   <React.StrictMode>
      <Layer>
         <App />
      </Layer>
   </React.StrictMode>
)