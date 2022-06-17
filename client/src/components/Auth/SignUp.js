import React from 'react'
import classes from './Auth.module.sass'
import Button from "../../forms/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {signUp} from "../../redux/user/userAction";
import {useNavigate} from "react-router-dom";
import Input from "../../forms/Input/Input";
import useForms from "../../functions/forms.hook";


const SignUp = (props) => {

   const emailError = useSelector(state => state.user.emailError)
   const loading = useSelector(state => state.user.loading)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const {form, error, checkValidity, changeHandler, resetError} = useForms({
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
   })

   const submitHandler = () => {
      const error = checkValidity()

      if (!error) {
         dispatch(signUp(form))
         resetError({})
         navigate('/')
      }
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
                  onSubmit={submitHandler}
               />
            ))}

         </div>

         <div className={classes.actions_container}>
            <div className={classes.primaryAction}>
               <Button
                  disabled={loading}
                  type={'wideBlue_button'}
                  onClickHandler={submitHandler}
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