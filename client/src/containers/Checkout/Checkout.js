import React from 'react'
import classes from './Checkout.module.sass'
import smallLogo from '../../img/small-logo.png'
import wideLogo from '../../img/tan-dem-wide-logo.png'


const Checkout = (props) => {
   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.topBar_logo_container}>
               <div className={classes.smallLogo_container}>
                  <img src={smallLogo} alt=""/>
               </div>

               <div className={classes.wideLogo_container}>
                  <img src={wideLogo} alt=""/>
               </div>
            </div>

            <h1 className={classes.orderDetails_container}>
               Order details
            </h1>

            <div className={classses.contact_data_container}>
               <h2 className={classes.contact_title}>
                  Your contact details
               </h2>

               <div className={contact_form}>
         
               </div>
            </div>
         </div>
      </div>
   )
}

export default Checkout