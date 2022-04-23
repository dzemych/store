import React from 'react'
import Drawer from "../components/Drawer/Drawer";
import Sidebar from "../components/Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {toggleSidebar} from '../redux/app/appReducer'
import {Transition} from "react-transition-group";


const Layout = (props) => {
   const isSidebar = useSelector(state => state.app.sidebar)
   const dispatch = useDispatch()

   return (
      <>
         <Transition
            in={isSidebar}
            timeout={{
               appear: 0,
               enter: 400,
               exit: 500
            }}
            // classNames={fadeStyles}
            mountOnEnter
            unmountOnExit
         >
            {state => (
               <Drawer
                  state={state}
                  onClick={() => dispatch(toggleSidebar())}
               >
                  <Sidebar state={state}/>
               </Drawer>
            )}
         </Transition>

         <main>
            {props.children}
         </main>
      </>
   )
}


export default Layout