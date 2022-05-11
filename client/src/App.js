import './App.module.sass'
import getRoutes from './routes'
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import React from "react";
import classes from './App.module.sass'
import {Phone} from "./functions/mediaCheck";


function App() {
   const routes = getRoutes()

   return (
      <div className={classes.container}>
         <Header/>

         <div className={classes.wrapper}>
            {routes}
         </div>

         <Phone>
            <Footer/>
         </Phone>
      </div>
   );
}

export default App;
