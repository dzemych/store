import './App.module.sass';
import Sidebar from "./components/Sidebar/Sidebar";
import AllRoutes from "./AllRoutes";
import classes from './App.module.sass'


function App() {
  return (
    <div className={classes.container}>
       <Sidebar/>

       <AllRoutes/>
    </div>
  );
}

export default App;
