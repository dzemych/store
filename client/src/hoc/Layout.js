import React from 'react'
import Drawer from "../components/Drawer/Drawer";
import Sidebar from "../components/Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {toggleCatalog, toggleSidebar} from '../redux/app/appReducer'
import {Transition} from "react-transition-group";
import Catalog from "../components/Catalog/Catalog";


const Layout = (props) => {
   const isSidebar = useSelector(state => state.app.sidebar)
   const isCatalog = useSelector(state => state.app.catalog)

   const dispatch = useDispatch()

   return (
      <>

         {isCatalog &&
         <Drawer
            onClick={() => dispatch(toggleCatalog())}
         >
            <Catalog/>
         </Drawer>}

         <Transition
            in={isSidebar}
            timeout={{
               appear: 0,
               enter: 400,
               exit: 500
            }}
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

         <main
            style={{
               position: isSidebar || isCatalog ? 'fixed' : 'relative'
            }}
         >
            {props.children}
         </main>
      </>
   )
}


export default Layout