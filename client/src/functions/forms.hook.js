import React, {useState} from 'react'
import validator from "validator/es";


const useForms = (fields) => {
   const [form, setForm] = useState(fields)
   const [error, setError] = useState({})

   const checkValidity = () => {
      const newError = {}

      if (fields.hasOwnProperty('name')) {
         if (form.name.length < 2)
            newError['name'] = 'Минимальная длина имени 2 символа'

         if (!form.name.match(/^[а-яА-ЯёЁ]+$/))
            newError.name = 'Возможные символы: А-Я'
      }

      if (fields.hasOwnProperty('email')) {
         if (!validator.isEmail(form.email))
            newError.email = 'Некоректная электроная почта'
      }

      if (fields.hasOwnProperty('password')) {
         if (form.password.length < 8)
            newError.password = 'Минимальная длина пароля 8 символов'
      }

      if (fields.hasOwnProperty('passwordConfirm')) {
         if (form.password !== form.passwordConfirm)
            newError.passwordConfirm = 'Пароли не совпадают'
      }

      if (fields.hasOwnProperty('oldPassword')) {
         if (form.oldPassword.length < 8)
            newError.oldPassword = 'Минимальная длина пароля 8 символов'
         if (form.oldPassword === form.password)
            newError.password = 'Вы не можете поставить новый пароль такой же как новый'
      }

      setError(newError)
      return Object.keys(newError).length > 0 ? newError : false
   }

   const changeHandler = (value, type) => {
      setForm(prev => ({...prev, [type]: value}))
   }

   const setInitial = () => {
      console.log(fields)
      setForm(fields)
      setError({})
   }

   const resetError = () => {
      setError({})
   }

   return {changeHandler, form, error, checkValidity, setInitial, resetError}
}

export default useForms