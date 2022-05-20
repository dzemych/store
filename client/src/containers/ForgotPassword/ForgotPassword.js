import React, {useEffect, useState} from 'react'
import classes from './ForgotPassword.module.sass'
import tanDem from '../../img/tan-dem-wide-logo.png'
import Input from "../../forms/Input/Input";
import {useDispatch, useSelector} from "react-redux";
import Button from "../../forms/Button/Button";
import useForms from "../../functions/forms.hook";
import {toggleAuth} from "../../redux/app/appReducer";
import {useNavigate} from "react-router-dom";
import {forgotPassword} from "../../redux/user/userAction";
import {toggleSent} from "../../redux/user/userReducer";


const ForgotPassword = (props) => {

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const emailError = useSelector(state => state.user.emailError)
   const loading = useSelector(state => state.user.loading)
   const sent = useSelector(state => state.user.sent)

   const {form, error, checkValidity, changeHandler} = useForms({
      email: ''
   })

   const onSubmit = () => {
      const isErr = checkValidity()
      if (!isErr) {
         dispatch(forgotPassword(form.email))
      }
   }

   useEffect(() => {
      return () => {
         dispatch(toggleSent(false))
      }
   }, [])

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.photo_container}>
               <img src={tanDem} alt=""/>
            </div>

            <div className={classes.title_container}>
               <span>Востановление пароля</span>
            </div>

            {sent
               ? <div className={classes.sent_wrapper}>
                  <span className={classes.sent_text}>Проверьте свою почту. Если ссылка
                     не прийдет в течение пары минут проверьте спам папку
                     или повоторите операцию.
                  </span>

                  <Button
                     type={'wideBlue_button'}
                     onClickHandler={() => {
                        navigate('/')
                        dispatch(toggleAuth())
                     }}
                  >
                     Войти заново
                  </Button>
               </div>
               : <>
                  <div className={classes.form_wrapper}>
                     <Input
                        type={'text'}
                        value={form.email}
                        title={'Введите вашу электроную почту ' +
                        'к которой привязан аккаунт и мы отправим вам ссылку для сброса пароля'}
                        placeholder={'Ваша эл. почта'}
                        error={emailError
                           ? 'Аккаунта с этой эл. почтой не существует'
                           : error.email ? error.email : false
                        }
                        onChange={(value) => changeHandler(value, 'email')}
                        onSubmit={onSubmit}
                     />
                  </div>

                  <div className={classes.button_container}>
                     <Button
                        disabled={loading}
                        type={'wideBlue_button'}
                        onClickHandler={onSubmit}
                     >
                        Отправить
                     </Button>
                  </div>
               </>
            }
         </div>
      </div>
   )
}

export default ForgotPassword