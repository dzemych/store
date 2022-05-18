import React, {useState} from 'react'
import classes from './Auth.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Button from "../../forms/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../redux/user/userAction";
import validator from "validator/es";


const SignIn = (props) => {
   const initialState = {
      email: '',
      password: '',
   }

   const emailError = useSelector(state => state.user.emailError)
   const pwdError = useSelector(state => state.user.pwdError)

   const dispatch = useDispatch()

   const [showPwd, setShowPwd] = useState(false)

   const [form, setForm] = useState(initialState)
   const [error, setError] = useState({})


   const fieldsValidity = () => {
      const newError = {}

      if (!validator.isEmail(form.email))
         newError['email'] = 'Неверная электроная почта'

      if (form.password.length < 8)
         newError['password'] = 'Минимальная длина пароля 8 символов'

      return Object.keys(newError).length > 0 ? newError : false
   }

   const signInHandler = () => {
      const newError = fieldsValidity()

      if (!newError) {
         dispatch(signIn(form))
         setError({})
      } else {
         setError(newError)
      }
      dispatch(signIn())
   }

   const changeHandler = (val, type) => {
      setForm(prev => ({...prev, [type]: val}))
   }

   return (
      <div className={classes.auth_body}>
         <div className={classes.form_wrapper}>
            <div className={classes.form_item}>
               <label htmlFor="phoneNumber_input">Электроная почта</label>

               <div className={classes.input_wrapper}>
                  <input
                     type="text"
                     value={form.email}
                     id='phoneNumber_input'
                     placeholder={'Электроная почта'}
                     onChange={e => changeHandler(e.target.value, 'email')}
                  />
               </div>

               {error.email &&
                  <span className={classes.errorMessage}>
                     {error.email}
                  </span>
               }
               {emailError &&
                  <span className={classes.errorMessage}>
                     Пользователя не найдено
                  </span>
               }
            </div>

            <div className={classes.form_item}>
               <label htmlFor="password_input">Пароль</label>

               <div className={classes.input_wrapper}>
                  <input
                     type={showPwd ? 'text' : 'password'}
                     value={form.password}
                     id='password_input'
                     placeholder={'Пароль'}
                     onChange={e => changeHandler(e.target.value, 'password')}
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
               {pwdError &&
                  <span className={classes.errorMessage}>
                     Неверный пароль
                  </span>
               }
               <span className={classes.forgotPassword}>Забыл пароль</span>
            </div>
         </div>

         <div className={classes.actions_container}>
            <div className={classes.primaryAction}>
               <Button
                  type={'wideBlue_button'}
                  onClickHandler={() => signInHandler()}
               >
                  Войти
               </Button>
            </div>

            <div className={classes.secondaryAction}>
               <Button
                  type={'wideEmptyBlue_button'}
                  onClickHandler={props.changePage}
               >
                  Регистрация
               </Button>
            </div>
         </div>
      </div>
   )
}

export default SignIn