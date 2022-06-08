import React, {useContext} from 'react'
import classes from './Auth.module.sass'
import useForms from "../../functions/forms.hook";
import Input from "../../forms/Input/Input";
import {AuthContext} from "../../context/AuthContext";


const Auth = (props) => {
   const {form, formError, changeHandler, checkValidity} = useForms({password: '', email: ''})

   const auth = useContext(AuthContext)

   const inputsArr = [
      {
         type: 'email',
         value: form.email,
         error: formError.email,
         onChange: e => changeHandler(e, 'email'),
         title: 'Email',
         placeholder: 'Email'
      },
      {
         type: 'password',
         value: form.password,
         error: formError.password,
         onChange: e => changeHandler(e, 'password'),
         title: 'Password',
         placeholder: 'Password'
      }
   ]

   const onSubmit = async () => {
      const newError = checkValidity()

      console.log(newError)
      if (!newError) {
         const email = form.email
         const password = form.password

         await auth.login(email, password)
      }

   }

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h1 className={classes.title}>Log in</h1>

            <div className={classes.inputs_container}>
               {inputsArr.map((el, i) => (
                  <Input
                     key={i}
                     title={el.title}
                     placeholder={el.placeholder}
                     value={el.value}
                     onChange={el.onChange}
                     error={el.error}
                     onSubmit={onSubmit}
                  />
               ))}

               {auth.error &&
                  <span className={classes.authError}>
                  Invalid email or password
               </span>
               }
            </div>

            <button
               className={classes.submit_button}
               onClick={onSubmit}
            >
               Log in
            </button>
         </div>
      </div>
   )
}

export default Auth