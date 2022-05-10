import React, {useState} from 'react'
import classes from './Auth.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Button from "../../forms/Button/Button";


const Signin = (props) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [inputType, setInputType] = useState('text')

   const changeInputType = e => {
      setInputType(prev => prev === 'text' ? 'password' : 'text')
   }

   return (
      <div className={classes.auth_body}>
         <div className={classes.form_wrapper}>
            <div className={classes.form_item}>
               <label htmlFor="phoneNumber_input">Email</label>

               <div className={classes.input_wrapper}>
                  <input
                     type="text"
                     value={email}
                     id='phoneNumber_input'
                     placeholder={'Email'}
                     onChange={e => setEmail(e.target.value)}
                  />
               </div>
            </div>

            <div className={classes.form_item}>
               <label htmlFor="password_input">Password</label>

               <div className={classes.input_wrapper}>
                  <input
                     type={inputType}
                     value={password}
                     id='password_input'
                     placeholder={'Password'}
                     onChange={e => setPassword(e.target.value)}
                  />

                  <FontAwesomeIcon
                     icon={inputType === 'password' ? faEyeSlash : faEye}
                     onClick={e => changeInputType(e)}
                  />
               </div>
            </div>
         </div>

         <div className={classes.actions_container}>
            <span className={classes.forgotPassword}>Forgot password</span>

            <div className={classes.primaryAction}>
               <Button type={'wideBlue_button'}>
                  Sign in
               </Button>
            </div>

            <div className={classes.secondaryAction}>
               <Button
                  type={'wideEmptyBlue_button'}
                  onClickHandler={props.changePage}
               >
                  Registration
               </Button>
            </div>
         </div>
      </div>
   )
}

export default Signin