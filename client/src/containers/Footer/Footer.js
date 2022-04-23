import React from 'react'
import classes from './Footer.module.sass'
// import instagramImg from "../../img/instagram.png";
// import facebookImg from "../../img/facebook.png";
// import telegramImg from "../../img/telegram.png";
// import viberImg from "../../img/viber.png";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAnglesUp} from "@fortawesome/free-solid-svg-icons";
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
             <FontAwesomeIcon
                icon={faAnglesUp}
                className={classes.angleUp}
             />

             <div className={classes.links}>
                <NavLink to={'about'}>About</NavLink>
                <NavLink to={'contacts'}>Our contacts</NavLink>
                <NavLink to={'info'}>Info</NavLink>
                <NavLink to={'qanda'}>Q&A</NavLink>
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
                <button className={classes.mail}>Mail us</button>

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