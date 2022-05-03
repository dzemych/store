import './App.module.sass'
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

         {routes}

         <Footer/>
      </div>
   );
}

export default App;
