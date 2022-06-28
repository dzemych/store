import React from 'react'
import classes from './Footer.module.sass'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
   faInstagram,
   faFacebook,
   faTelegram,
} from '@fortawesome/free-brands-svg-icons'
import {NavLink} from "react-router-dom";


const Footer = (props) => {
    return(
       <div className={classes.container}>
          <div className={classes.wrapper}>
             <div className={classes.links}>
                <NavLink to={'/'}>Главная</NavLink>
                <NavLink to={'about'}>О нас</NavLink>
                <NavLink to={'contacts'}>Наши контакты</NavLink>
                <NavLink to={'info'}>Помощь</NavLink>
             </div>

             <hr className={classes.hr}/>

             <ul className={classes.social_list}>
                <li className={classes.social_item}>
                   <a
                      href={'https://www.instagram.com/taniadzemich/?hl=ru'}
                      target={'_blank'}
                   >
                     <FontAwesomeIcon icon={faInstagram}/>
                   </a>
                </li>

                <li className={classes.social_item}>
                   <a
                      href="https://www.facebook.com/profile.php?id=100013643565993"
                      target={'_blank'}
                   >
                      <FontAwesomeIcon icon={faFacebook}/>
                   </a>
                </li>

                <li className={classes.social_item}>
                   <a
                      href="https://t.me/taniadzemich"
                      target={'_blank'}
                   >
                      <FontAwesomeIcon icon={faTelegram}/>
                   </a>
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