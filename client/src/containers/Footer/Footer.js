import React from 'react'
import classes from './Footer.module.sass'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
   faInstagram,
   faFacebook,
   faTelegram,
   faViber
} from '@fortawesome/free-brands-svg-icons'
import {NavLink} from "react-router-dom";


const Footer = (props) => {
    return(
       <div className={classes.container}>
          <div className={classes.wrapper}>
             <div className={classes.links}>
                <NavLink to={'/'}>Главная</NavLink>
                <NavLink to={'about'}>Про нас</NavLink>
                <NavLink to={'contacts'}>Наши контакты</NavLink>
                <NavLink to={'info'}>Помощь</NavLink>
             </div>

             <hr className={classes.hr}/>

             <ul className={classes.social_list}>
                <li className={classes.social_item}>
                   <FontAwesomeIcon icon={faInstagram}/>
                </li>

                <li className={classes.social_item}>
                   <FontAwesomeIcon icon={faFacebook}/>
                </li>

                <li className={classes.social_item}>
                   <FontAwesomeIcon icon={faTelegram}/>
                </li>

                <li className={classes.social_item}>
                   <FontAwesomeIcon icon={faViber}/>
                </li>
             </ul>

            <hr className={classes.hr}/>

             <div className={classes.bottomBar}>
                <button className={classes.mail}>
                   Напишите нам
                </button>

                <div className={classes.rights}>
                   <span className={classes.copyright}>
                      © Copyright {new Date().getFullYear()}
                   </span>

                   <span className={classes.power}>
                      Powered by Dzemych
                   </span>
                </div>
             </div>
          </div>
       </div>
    )
}

export default Footer