import React, {useEffect, useState} from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import {useSelector} from "react-redux";
import Catalog from "../components/Catalog/Catalog";
import Auth from "../components/Auth/Auth";
import SizesTable from "../components/SizesTable/SizesTable";


const Layout = (props) => {
   const isSidebar = useSelector(state => state.app.sidebar)
   const isCatalog = useSelector(state => state.app.catalog)
   const isAuth = useSelector(state => state.app.auth)
   const isSizesTable = useSelector(state => state.app.sizesTable)

   const [lastScroll, setLastScroll] = useState(0)

   useEffect(() => {
      console.log(isSizesTable)
      if (isCatalog || isSidebar || isAuth || isSizesTable) {
         setLastScroll(window.scrollY)
         window.scrollTo(0, 0)
         document.body.style.overflow = 'hidden'
      }

      if (!isCatalog && !isAuth && !isSidebar && !isSizesTable) {
         document.body.style.overflow = 'auto'
         window.scrollTo(0, lastScroll)
      }
   }, [isSidebar, isCatalog, isAuth, isSizesTable])

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

         {isSizesTable &&
            <SizesTable
               isOpen={isSizesTable}
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