import React, {useEffect} from 'react'
import classes from './User.module.sass'
import {useDispatch, useSelector} from "react-redux";
import Button from "../../forms/Button/Button";
import {updateUser} from "../../redux/user/userAction";
import {clearErrors, setDataUpdate} from "../../redux/user/userReducer";
import Input from "../../forms/Input/Input";
import useForms from "../../functions/forms.hook";


const User = (props) => {

   const dispatch = useDispatch()

   const {name, email} = useSelector(state => state.user)
   const pwdError = useSelector(state => state.user.pwdError)
   const isUpdated = useSelector(state => state.user.dataUpdate)

   const loading = useSelector(state => state.user.loading)

   const {form, error, checkValidity, changeHandler, setInitial} = useForms({
      email, name,
      password: '',
      passwordConfirm: '',
      oldPassword: ''
   })

   const submitHandler = () => {
      const error = checkValidity()

      if (!error) {
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
         if (isUpdated)
            setInitial()
      }
   }

   useEffect(() => {
      if (isUpdated)
         setInitial()
   }, [isUpdated])

   useEffect(() => {
      return () => {
         dispatch(clearErrors())
         dispatch(setDataUpdate(false))
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

            {isUpdated &&
               <div className={classes.dataUpdate}>
                  <span>Data has been successfully updated</span>
               </div>}

            <hr className={classes.basic_hr}/>

         </div>
      </div>
   )
}

export default User