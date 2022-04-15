import './App.module.sass'
import { BrowserRouter } from 'react-router-dom'
import getRoutes from './routes'
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import React from "react";
import classes from './App.module.sass'


function App() {
   const routes = getRoutes()

   return (
      <div className={classes.container}>
         <Header/>
            <BrowserRouter>
               {routes}
            </BrowserRouter>
         <Footer/>
      </div>
   );
}

export default App;
