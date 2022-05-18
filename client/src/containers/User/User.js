import React, {useState} from 'react'
import classes from './User.module.sass'
import {useSelector} from "react-redux";
import validator from "validator/es";


const User = (props) => {

   const {name, email} = useSelector(state => state.user)

   const [form, setForm] = useState({name, email, oldPassword: '', newPassword: ''})

   const [error, setError] = useState({})

   const changeHandler = (val, type) => {
      setForm(prev => ({...prev, [type]: val}))
   }

   const fieldsValidity = () => {
      const newError = {}

      if (!validator.isEmail(form.email))
         newError['email'] = 'Некореткная эл. почта'

      if (form.name.length < 2)
         newError['name'] = 'Минимальная длина имени 2 символа'

      if (form.oldPassword.length < 8)
         newError['email'] = 'Минимальная длина пароля 8 символов'

      return Object.keys(newError).length > 0 ? newError : false
   }

   const submitHandler = () => {
      const newError = fieldsValidity()
      console.log(newError)
   }

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <hr className={classes.basic_hr}/>

            <div className={classes.form_wrapper}>
               <div className={classes.form_item}>
                  <label htmlFor="phoneNumber_input">Электроная почта</label>

                  <div className={classes.input_wrapper}>
                     <input
                        type="text"
                        value={form.name}
                        id='phoneNumber_input'
                        placeholder={'Ваше имя'}
                        onChange={e => changeHandler(e.target.value, 'email')}
                     />
                  </div>

                  {error.name &&
                  <span className={classes.errorMessage}>
                     {error.name}
                  </span>
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default User