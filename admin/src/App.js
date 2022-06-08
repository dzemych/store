import './App.module.sass';
import Sidebar from "./components/Sidebar/Sidebar";
import AllRoutes from "./AllRoutes";
import classes from './App.module.sass'
import {useEffect} from "react";
import Auth from "./containers/Auth/Auth";
import useAuth from "./functions/auth.hook";
import {AuthContext} from "./context/AuthContext";


function App() {
   const {user, login, logout, getUser, error} = useAuth()

   useEffect(() => {
      const token = localStorage.getItem('adminToken')

      if (token) {
         (async () => {
            await getUser(token)
         })()
      }

   }, [getUser])

  return (
    <div className={classes.container}>
       <AuthContext.Provider value={{
          user, login, logout, getUser, error
       }}>
          {user
             ? <>
                <Sidebar/>
                <AllRoutes/>
             </>
             : <Auth/>
          }
       </AuthContext.Provider>
    </div>
  );
}

export default App;
