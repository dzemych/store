import React, {useState} from 'react'
import classes from './Auth.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Button from "../../forms/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../redux/user/userAction";
import validator from "validator/es";
import Input from "../../forms/Input/Input";
import {useNavigate} from "react-router-dom";
import {toggleAuth} from "../../redux/app/appReducer";


const SignIn = (props) => {
   const initialState = {
      email: '',
      password: '',
   }

   const navigate = useNavigate()

   const emailError = useSelector(state => state.user.emailError)
   const pwdError = useSelector(state => state.user.pwdError)
   const loading = useSelector(state => state.user.loading)

   const dispatch = useDispatch()

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

   const submitHandler = () => {
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

   const inputsArr = [
      {
         type: 'text',
         title: 'Электроная почта',
         placeholder: 'Электроная почта',
         value: form.email,
         onChange: (val) => {changeHandler(val, 'email')},
         error: error.email
            ? error.email
            : emailError
            ? 'Пользователя не найдено'
            : false
      },
      {
         type: 'password',
         title: 'Пароль',
         placeholder: 'Пароль',
         value: form.password,
         onChange: (val) => {changeHandler(val, 'password')},
         error: error.password
            ? error.password
            : pwdError
            ? 'Неверный пароль'
            : false
      }
   ]

   return (
      <div className={classes.auth_body}>
         <div className={classes.form_wrapper}>
            {
               inputsArr.map((el, i) => (
                  <Input
                     key={i}
                     type={el.type}
                     title={el.title}
                     placeholder={el.placeholder}
                     value={el.value}
                     error={el.error}
                     onChange={el.onChange}
                     onSubmit={() => submitHandler()}
                  />
               ))
            }
         </div>

         <span
            className={classes.forgotPassword}
            onClick={() => {
               dispatch(toggleAuth())
               navigate('/resetPassword')
            }}
         >
            Забыл пароль
         </span>

         <div className={classes.actions_container}>
            <div className={classes.primaryAction}>
               <Button
                  disabled={loading}
                  type={'wideBlue_button'}
                  onClickHandler={() => submitHandler()}
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