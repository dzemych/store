import React, {useState} from 'react'
import classes from './Auth.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {toggleAuth} from "../../redux/app/appReducer";
import {useDispatch} from "react-redux";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {clearErrors} from "../../redux/user/userReducer";


const Auth = ({type = 'signin'}) => {
   const [page, setPage] = useState(() => type)

   const dispatch = useDispatch()

   const changePage = () => {
      dispatch(clearErrors())
      setPage(prev => prev === 'signin' ? 'signup' : 'signin')
   }

   return (
      <div className={classes.container}
           onClick={e => e.stopPropagation()}
      >
         <div className={classes.wrapper}>
            <div className={classes.topBar}>
               <span>
                  {page === 'signin' ? 'Log in': 'Registration'}
               </span>

               <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => dispatch(toggleAuth())}
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
   )
}

export default Auth