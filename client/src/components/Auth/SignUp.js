import React, {useState} from 'react'
import classes from './Auth.module.sass'
import validator from "validator/es";
import Button from "../../forms/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {signUp} from "../../redux/user/userAction";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import Input from "../../forms/Input/Input";


const SignUp = (props) => {

   const initialState = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
   }

   const emailError = useSelector(state => state.user.emailError)
   const loading = useSelector(state => state.user.loading)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [form, setForm] = useState(initialState)
   const [error, setError] = useState({})

   const fieldsValidity = () => {
      const newError = {}

      if (form.name.length < 2)
         newError['name'] = 'Минимальная длина имени 2 символа'

      if (!form.name.match(/^[а-яА-ЯёЁ]+$/))
         newError['name'] = 'Возможные символы: А-Я'

      if (!validator.isEmail(form.email))
         newError['email'] = 'Неверная электроная почта'

      if (form.password.length < 8)
         newError['password'] = 'Минимальная длина пароля 8 символов'

      if (!form.passwordConfirm || form.password !== form.passwordConfirm)
         newError['passwordConfirm'] = 'Пароли не совпадают'

      return Object.keys(newError).length > 0 ? newError : false
   }

   const submitHandler = () => {
      const newError = fieldsValidity()

      if (!newError) {
         dispatch(signUp(form))
         setError({})
         navigate('/')
      } else {
         setError(newError)
      }
   }

   const changeHandler = (val, field) => {
      setForm(prev => ({...prev, [field]: val}))
   }

   const inputsArr = [
      {
         type: 'text',
         title: 'Имя',
         placeholder: 'Ваше имя',
         value: form.name,
         onChange: (val) => {changeHandler(val, 'name')},
         error: error.name
      },
      {
         type: 'text',
         title: 'Электроная почта',
         placeholder: 'Ваша почта',
         value: form.email,
         onChange: (val) => {changeHandler(val, 'email')},
         error: error.email
            ? error.email
            : emailError
            ? 'Эта ел. почта уже зарегистрирована'
            : false
      },
      {
         type: 'password',
         title: 'Придумайте пароль',
         placeholder: 'Пароль',
         value: form.password,
         onChange: (val) => {changeHandler(val, 'password')},
         error: error.password
      },
      {
         type: 'password',
         title: 'Потвердите пароль',
         placeholder: 'Потвердите пароль',
         value: form.passwordConfirm,
         onChange: (val) => {changeHandler(val, 'passwordConfirm')},
         error: error.passwordConfirm
      },
   ]

   return (
      <div className={classes.auth_body}>
         <div className={classes.form_wrapper}>
            {inputsArr.map((el, i) => (
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
            ))}

         </div>

         <div className={classes.actions_container}>
            <div className={classes.primaryAction}>
               <Button
                  disabled={loading}
                  type={'wideBlue_button'}
                  onClickHandler={() => submitHandler()}
               >
                  Регистрация
               </Button>
            </div>

            <div className={classes.secondaryAction}>
               <Button
                  type={'wideEmptyBlue_button'}
                  onClickHandler={props.changePage}
               >
                  Войти
               </Button>
            </div>
         </div>
      </div>
   )
}

export default SignUp