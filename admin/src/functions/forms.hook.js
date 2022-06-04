import React, {useState} from 'react'


const useForms = (fields) => {
   const [form, setForm] = useState(fields)
   const [formError, setError] = useState({})

   const checkValidity = () => {
      const newError = {}

      if (fields.hasOwnProperty('title')) {
         if (form.title.length < 2)
            newError.title = 'Minimum length 2 symbols'

         if (!form.title.match(/^[a-zA-Z]+$/))
            newError.title = 'Only a-z'
      }

      if (fields.hasOwnProperty('price')) {
         if (fields.price < 1 && fields.price > 1000000)
            newError.price = 'Invalid price'
      }

      if (fields.hasOwnProperty('description')) {
         if (form.description.length < 10)
            newError.description = 'Minimum length 10 symbols'
      }

      if (fields.hasOwnProperty('sex')) {
         if (!form.sex.match(/(man|woman)/))
            newError.sex = 'Invalid sex'
      }

      if (fields.hasOwnProperty('category')) {
         if (!form.category)
            newError.category = 'Product must have category'
      }

      setError(newError)
      return Object.keys(newError).length > 0 ? newError : false
   }

   const changeHandler = (value, type) => {
      setForm(prev => ({...prev, [type]: value}))
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