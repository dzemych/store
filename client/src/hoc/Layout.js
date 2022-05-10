import React, {useEffect, useState} from 'react'
import Drawer from "../components/Drawer/Drawer";
import Sidebar from "../components/Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {toggleAuth, toggleCatalog, toggleSidebar} from '../redux/app/appReducer'
import {Transition} from "react-transition-group";
import Catalog from "../components/Catalog/Catalog";
import Auth from "../components/Auth/Auth";


const Layout = (props) => {
   const isSidebar = useSelector(state => state.app.sidebar)
   const isCatalog = useSelector(state => state.app.catalog)
   const isAuth = useSelector(state => state.app.auth)

   const [bodyScroll, setScroll] = useState(true)

   const dispatch = useDispatch()

   useEffect(() => {
      if (isCatalog || isSidebar || isAuth)
         setScroll(false)

      if (!isCatalog && !isAuth && !isSidebar)
         setScroll(true)
   }, [isSidebar, isCatalog, isAuth])

   return (
      <>

         {isCatalog &&
            <Drawer
               onClick={() => dispatch(toggleCatalog())}
            >
               <Catalog/>
            </Drawer>
         }

         {
            isAuth &&
               <Drawer
                  onClick={() => dispatch(toggleAuth())}
               >
                  <Auth type={isAuth}/>
               </Drawer>
         }

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
               position: bodyScroll ?  'relative' : 'fixed'
            }}
         >
            {props.children}
         </main>
      </>
   )
}


export default Layout