import React, {useState} from 'react'
import validator from "validator/es";


const useForms = (fields) => {
   const [form, setForm] = useState(fields)
   const [formError, setError] = useState({})

   const checkValidity = () => {
      const newError = {}

      if (fields.hasOwnProperty('title')) {
         if (form.title.length < 2)
            newError.title = 'Minimum length 2 symbols'

         if (!form.title.match(/^[а-яё\w\d\-&_() ]+$/i))
            newError.title = 'Only letters and &_()-'
      }

      if (fields.hasOwnProperty('price')) {
         if (form.price < 1 || form.price > 1000000)
            newError.price = 'Invalid price'
      }

      if (fields.hasOwnProperty('description')) {
         if (form.description.length < 10)
            newError.description = 'Minimum length 10 symbols'
      }

      if (fields.hasOwnProperty('sex')) {
         if (!form.sex.match(/(женщины|мужчины)/))
            newError.sex = 'Invalid sex'
      }

      if (fields.hasOwnProperty('category')) {
         if (!form.category)
            newError.category = 'Product must have category'
      }

      if (fields.hasOwnProperty('password')){
         if (form.password.length < 8)
            newError.password = 'At least 8 symbols'
      }

      if (fields.hasOwnProperty('email')){
         if (!validator.isEmail(form.email))
            newError.email = 'Invalid email'
      }

      setError(newError)
      return Object.keys(newError).length > 0 ? newError : false
   }

   const changeHandler = (value, type) => {
      setForm(prev => ({...prev, [type]: type === 'price' ? +value : value}))
   }

   const setInitial = () => {
      setForm(fields)
      setError({})
   }

   const resetError = () => {
      setError({})
   }

   return {changeHandler, form, formError, checkValidity, setInitial, resetError}
}

export default useForms