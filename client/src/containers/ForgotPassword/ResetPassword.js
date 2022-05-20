import React, {useEffect, useState} from 'react'
import classes from './ForgotPassword.module.sass'
import tanDem from "../../img/tan-dem-wide-logo.png";
import Input from "../../forms/Input/Input";
import Button from "../../forms/Button/Button";
import useForms from "../../functions/forms.hook";
import {toggleAuth} from "../../redux/app/appReducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {resetPassword} from "../../redux/user/userAction";


const ResetPassword = (props) => {

   const params = useParams()
   const isReset = useSelector(state => state.user.isReset)
   const [isToken, setIsToken] = useState()
   const dispatch = useDispatch()

   const navigate = useNavigate()

   const {form, error, checkValidity, changeHandler} = useForms({
      password: '',
      passwordConfirm: ''
   })

   const onSubmit = () => {
      checkValidity()
   }

   const inputsArr = [
      {
         type: 'password',
         title: "Новый пароль",
         placeholder: 'Пароль',
         value: form.password,
         changeHandler: (value) => changeHandler(value, 'password'),
         onSubmit,
         error: error.password
      },
      {
         type: 'password',
         title: "Потвердите пароль",
         placeholder: 'Потвердите пароль',
         value: form.passwordConfirm,
         changeHandler: (value) => changeHandler(value, 'passwordConfirm'),
         onSubmit,
         error: error.passwordConfirm
      }
   ]

   useEffect(() => {
      console.log(params.token.length)
      if (params.token.length === 64){
         dispatch(resetPassword({
            token: params.token,
            password: form.password,
            passwordConfirm: form.passwordConfirm
         }))
      } else {
         navigate('/resetPassword')
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

            {isReset === 'rejected'
               ? <div className={classes.rejected_container}>
                  <div className={classes.rejected_text}>
                     <span>Похоже ваш ваша сылка устарела или неверна</span>
                  </div>

                  <Button
                     type={'wideBlue_button'}
                     onClickHanlder={() => navigate('/resetPassword')}
                  >
                     Попробывать заново
                  </Button>
               </div>
               : <>
                  <div className={classes.form_wrapper}>
                     {
                        inputsArr.map((el, i) => (
                           <Input
                              key={i}
                              type={el.type}
                              value={el.value}
                              title={el.title}
                              placeholder={el.email}
                              error={el.error}
                              onChange={(value) => el.changeHandler(value)}
                              onSubmit={el.onSubmit}
                           />
                        ))
                     }


                  </div>

                  <div className={classes.button_container}>
                     <Button
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

export default ResetPassword