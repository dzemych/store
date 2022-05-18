import React, {useState} from 'react'
import classes from './Auth.module.sass'
import validator from "validator/es";
import Button from "../../forms/Button/Button";
import {useDispatch} from "react-redux";
import {signUp} from "../../redux/user/userAction";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const SignUp = (props) => {
   const dispatch = useDispatch()

   const [showPwd, setShowPwd] = useState(false)
   const [showConfirm, setShowConfirm] = useState(false)

   const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
   })

   const [error, setError] = useState({})

   const fieldsValidity = () => {
      const newError = {}

      if (form.name.length < 2)
         newError['name'] = 'Min length 2'

      if (!validator.isEmail(form.email))
         newError['email'] = 'Invalid email'

      if (form.password.length < 8)
         newError['password'] = 'Min password length 8'

      if (!form.passwordConfirm || form.password !== form.passwordConfirm)
         newError['passwordConfirm'] = 'Password and password confirm must be the same'

      return Object.keys(newError).length > 0 ? newError : false
   }

   const clickHandler = () => {
      const newError = fieldsValidity()

      console.log(newError)
      if (!newError) {
         dispatch(signUp(form))
      } else {
         setError(newError)
      }
   }

   const changeHandler = (e, field) => {
      setForm(prev => ({...prev, [field]: e.target.value}))
   }

   return (
      <div className={classes.auth_body}>
         <div className={classes.form_wrapper}>
            <div className={classes.form_item}>
               <label htmlFor="email_input">Enter your name</label>

               <div className={classes.input_wrapper}>
                  <input
                     type="text"
                     value={form['name']}
                     id='email_input'
                     placeholder={'Your name'}
                     onChange={e => changeHandler(e, 'name')}
                  />
               </div>

               {error.name &&
                  <span className={classes.errorMessage}>
                     {error.name}
                  </span>
               }
            </div>

            <div className={classes.form_item}>
               <label htmlFor="phoneNumber_input">Enter your email</label>

               <div className={classes.input_wrapper}>
                  <input
                     type="text"
                     value={form['email']}
                     id='phoneNumber_input'
                     placeholder={'Your email'}
                     onChange={e => changeHandler(e, 'email')}
                  />
               </div>

               {error.email &&
                  <span className={classes.errorMessage}>
                     {error.email}
                  </span>
               }
            </div>

            <div className={classes.form_item}>
               <label htmlFor="password_input">Create your password</label>

               <div className={classes.input_wrapper}>
                  <input
                     type={showPwd ? 'text' : 'password'}
                     value={form['password']}
                     id='password_input'
                     placeholder={'Your password'}
                     onChange={e => changeHandler(e, 'password')}
                  />

                  <FontAwesomeIcon
                     icon={showPwd ? faEye : faEyeSlash}
                     onClick={() => setShowPwd(prev => !prev)}
                  />
               </div>

               {error.password &&
                  <span className={classes.errorMessage}>
                     {error.password}
                  </span>
               }
            </div>

            <div className={classes.form_item}>
               <label htmlFor="passwordConfirm_input">Password confirm</label>

               <div className={classes.input_wrapper}>
                  <input
                     type={showConfirm ? 'text' : 'password'}
                     value={form['passwordConfirm']}
                     id='passwordConfirm_input'
                     placeholder={'Confirm password'}
                     onChange={e => changeHandler(e, 'passwordConfirm')}
                  />

                  <FontAwesomeIcon
                     icon={showConfirm ? faEye : faEyeSlash}
                     onClick={() => setShowConfirm(prev => !prev)}
                  />
               </div>

               {error.passwordConfirm &&
                  <span className={classes.errorMessage}>
                     {error.passwordConfirm}
                  </span>
               }
            </div>
         </div>

         <div className={classes.actions_container}>
            <div className={classes.primaryAction}>
               <Button
                  type={'wideBlue_button'}
                  onClickHandler={() => clickHandler()}
               >
                  Registration
               </Button>
            </div>

            <div className={classes.secondaryAction}>
               <Button
                  type={'wideEmptyBlue_button'}
                  onClickHandler={props.changePage}
               >
                  Sing in
               </Button>
            </div>
         </div>
      </div>
   )
}

export default SignUp