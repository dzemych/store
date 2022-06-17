import React, {useState} from 'react'
import classes from './Auth.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {toggleAuth} from "../../redux/app/appReducer";
import {useDispatch} from "react-redux";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {clearErrors} from "../../redux/user/userReducer";
import {Tablet} from "../../functions/mediaCheck";
import Backdrop from "../Backdrop/Backdrop";
import useEsc from "../../functions/useEsc";


const Auth = (props) => {
   const [page, setPage] = useState('signin')

   const dispatch = useDispatch()

   const changePage = () => {
      dispatch(clearErrors())
      setPage(prev => prev === 'signin' ? 'signup' : 'signin')
   }

   const authHandler = () => {
      dispatch(toggleAuth())
   }

   useEsc(authHandler)

   return (
      <>
         <div className={classes.container}
              onClick={e => e.stopPropagation()}
         >
            <div className={classes.wrapper}>
               <div className={classes.topBar}>
               <span>
                  {page === 'signin' ? 'Войти': 'Регистарция'}
               </span>

                  <FontAwesomeIcon
                     icon={faTimes}
                     onClick={authHandler}
                  />
               </div>

               <hr/>

               {
                  page === 'signin' ?
                     <SignIn changePage={changePage}/> :
                     <SignUp changePage={changePage}/>
               }
            </div>
         </div>

         <Tablet>
            {props.isOpen &&
               <Backdrop
                  onClick={authHandler}
               />}
         </Tablet>
      </>
   )
}

export default Auth