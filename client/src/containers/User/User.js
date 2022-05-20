import React, {useEffect, useState} from 'react'
import classes from './User.module.sass'
import {useDispatch, useSelector} from "react-redux";
import validator from "validator/es";
import Button from "../../forms/Button/Button";
import {updateUser} from "../../redux/user/userAction";
import {clearErrors} from "../../redux/user/userReducer";
import Input from "../../forms/Input/Input";


const User = (props) => {

   const dispatch = useDispatch()

   const {name, email} = useSelector(state => state.user)
   const pwdError = useSelector(state => state.user.pwdError)
   const loading = useSelector(state => state.user.loading)

   const [form, setForm] = useState(() => ( {
      name, email, password: '', passwordConfirm: ''
   } ))

   const [error, setError] = useState({})

   const changeHandler = (val, type) => {
      setForm(prev => ({...prev, [type]: val}))
   }

   const fieldsValidity = () => {
      const newError = {}

      if (!validator.isEmail(form.email))
         newError.email = 'Некореткная эл. почта'

      if (form.name.length < 2)
         newError.name = 'Минимальная длина имени 2 символа'

      if (!form.name.match(/^[а-яА-ЯёЁ]+$/))
         newError.name = 'Возможные символы: А-Я'

      if (!form.oldPassword)
         newError.oldPassword = 'Для сохранения данных введите пароль'

      if (form.oldPassword && form.oldPassword.length < 8)
         newError.oldPassword = 'Минимальная длина пароля 8 символов'

      if (form.password && form.password.length < 8)
         newError.password = 'Минимальная длина пароля 8 символов'

      if (form.password && form.password === form.oldPassword)
         newError.password = 'Вы пытаетесь установить старый пароль'

      if (form.passwordConfirm !== form.password)
         newError.passwordConfirm = 'Пароли не совпадают'

      return Object.keys(newError).length > 0 ? newError : false
   }

   const submitHandler = () => {
      const newError = fieldsValidity()

      if (newError) {
         setError(newError)
      } else {
         // 1) Make a request
         if (form.password)
            dispatch(updateUser({form}))

         if (!form.password)
            dispatch(updateUser({
               name: form.name,
               email: form.email,
               oldPassword: form.oldPassword
            }))

         // 2) Reset error and form state
         setError({})
         setForm({
            name, email, password: '', oldPassword: '', passwordConfirm: ''
         })
      }
   }

   useEffect(() => {
      return () => {
         dispatch(clearErrors())
      }
   }, [dispatch])

   const inputsArr = [
      {
         type: 'text',
         title: 'Имя',
         placeholder: 'Новое имя',
         value: form.name,
         onChange: (val) => {changeHandler(val, 'name')},
         error: error.name
      },
      {
         type: 'text',
         title: 'Электроная почта',
         placeholder: 'Новая почта',
         value: form.email,
         onChange: (val) => {changeHandler(val, 'email')},
         error: error.email
      },
      {
         type: 'password',
         title: 'Новый пароль',
         placeholder: 'Новый пароль',
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
      {
         type: 'password',
         title: 'Старый пароль',
         placeholder: 'Ваш пароль',
         value: form.oldPassword,
         onChange: (val) => {changeHandler(val, 'oldPassword')},
         error: error.oldPassword
            ? error.oldPassword
            : pwdError
            ? 'Неверный пароль'
            : false
      }
   ]

   const lastInput = inputsArr.slice(-1)[0]

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <hr className={classes.basic_hr}/>

            <div className={classes.form_wrapper}>

               {
                  inputsArr.slice(0, -1).map((el, i) => (
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

               {/*<hr className={classes.basic_hr}/>*/}
               <div className={classes.whiteSpace}/>

               <Input
                  type={lastInput.type}
                  title={lastInput.title}
                  placeholder={lastInput.placeholder}
                  value={lastInput.value}
                  error={lastInput.error}
                  onChange={lastInput.onChange}
                  onSubmit={() => submitHandler()}
               />

               <Button
                  disabled={loading}
                  onClickHandler={submitHandler}
                  type={'wideBlue_button'}
               >
                  Потвердить
               </Button>
            </div>

            <hr className={classes.basic_hr}/>

         </div>
      </div>
   )
}

export default User