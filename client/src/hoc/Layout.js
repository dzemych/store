import React, {useEffect} from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import {useSelector} from "react-redux";
import Catalog from "../components/Catalog/Catalog";
import Auth from "../components/Auth/Auth";


const Layout = (props) => {
   const isSidebar = useSelector(state => state.app.sidebar)
   const isCatalog = useSelector(state => state.app.catalog)
   const isAuth = useSelector(state => state.app.auth)

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
            <Catalog/>
         }

         {isAuth &&
            <Auth
               isOpen={isAuth}
            />
         }

         <Sidebar
            isOpen={isSidebar}
         />

         <main>
            {props.children}
         </main>
      </>
   )
}


export default Layout