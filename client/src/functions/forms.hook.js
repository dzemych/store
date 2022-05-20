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
      }

      setError(newError)
      return Object.keys(newError).length > 0 ? newError : false
   }

   const changeHandler = (value, type) => {
      setForm(prev => ({...prev, [type]: value}))
   }

   return {changeHandler, form, error, checkValidity}
}

export default useForms