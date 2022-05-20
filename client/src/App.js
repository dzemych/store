import './App.module.sass'
import useRoutes from './routes'
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import React, {useEffect} from "react";
import classes from './App.module.sass'
import {Phone} from "./functions/mediaCheck";
import {useDispatch} from "react-redux";
import {fetchUser} from "./redux/user/userAction";


function App() {
   const routes = useRoutes()

   const dispatch = useDispatch()

   useEffect(() => {
      const token = localStorage.getItem('token')

      if (token)
         dispatch(fetchUser(token))
   }, [dispatch])

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
