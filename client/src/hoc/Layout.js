import React, {useEffect} from 'react'
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

   const dispatch = useDispatch()

   useEffect(() => {
      if (isCatalog || isSidebar || isAuth)
         document.body.style.overflowY = 'hidden'

      if (!isCatalog && !isAuth && !isSidebar)
         document.body.style.overflow = 'auto'
   }, [isSidebar, isCatalog, isAuth])

   // TODO Global error handling

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
                  <Auth/>
               </Drawer>
         }

         {/*<Transition*/}
         {/*   in={isSidebar}*/}
         {/*   timeout={{*/}
         {/*      appear: 350,*/}
         {/*      enter: 350,*/}
         {/*      exit: 350*/}
         {/*   }}*/}
         {/*   unmountOnExit*/}
         {/*>*/}
         {/*   {state => (*/}
         {/*      <Drawer*/}
         {/*         state={state}*/}
         {/*         onClick={() => dispatch(toggleSidebar())}*/}
         {/*      >*/}
         {/*         <Sidebar state={state}/>*/}
         {/*      </Drawer>*/}
         {/*   )}*/}
         {/*</Transition>*/}



         {isSidebar &&
         <Drawer
            onClick={() => dispatch(toggleSidebar())}
         >
            <Transition
               in={isSidebar}
               timeout={350}
               unmountOnExit
            >
               {state => (
                  <Sidebar state={state}/>
               )}
            </Transition>
         </Drawer>
         }

         <main>
            {props.children}
         </main>
      </>
   )
}


export default Layout