import './App.module.sass'
import getRoutes from './routes'
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import React from "react";
import classes from './App.module.sass'
import useDesktopCheck from "./functions/useDesktopCheck";


function App() {
   const routes = getRoutes()

   const isDesktop = useDesktopCheck()

   return (
      <div className={classes.container}>
         <Header/>

         <div className={classes.wrapper}>
            {routes}
         </div>

         {!isDesktop &&
            <Footer/>
         }
      </div>
   );
}

export default App;
