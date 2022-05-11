import React, {useState} from 'react'
import classes from './Auth.module.sass'
import Button from "../../forms/Button/Button";


const SignUp = (props) => {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   return (
      <div className={classes.auth_body}>
         <div className={classes.form_wrapper}>
            <div className={classes.form_item}>
               <label htmlFor="email_input">Enter your name</label>

               <div className={classes.input_wrapper}>
                  <input
                     type="text"
                     value={name}
                     id='email_input'
                     placeholder={'Your name'}
                     onChange={e => setName(e.target.value)}
                  />
               </div>
            </div>

            <div className={classes.form_item}>
               <label htmlFor="phoneNumber_input">Enter your email</label>

               <div className={classes.input_wrapper}>
                  <input
                     type="text"
                     value={email}
                     id='phoneNumber_input'
                     placeholder={'Your email'}
                     onChange={e => setEmail(e.target.value)}
                  />
               </div>
            </div>

            <div className={classes.form_item}>
               <label htmlFor="password_input">Create your password</label>

               <div className={classes.input_wrapper}>
                  <input
                     type='text'
                     value={password}
                     id='password_input'
                     placeholder={'Your password'}
                     onChange={e => setPassword(e.target.value)}
                  />
               </div>
            </div>
         </div>

         <div className={classes.actions_container}>
            <div className={classes.primaryAction}>
               <Button type={'wideBlue_button'}>
                  Registration
               </Button>
            </div>

            <div className={classes.secondaryAction}>
               <Button
                  type={'wideEmptyBlue_button'}
                  onClickHandler={props.changePage}
               >
                  Sing in
               </Button>
            </div>
         </div>
      </div>
   )
}

export default SignUp