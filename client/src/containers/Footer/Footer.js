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
import useDesktopCheck from "../../functions/useDesktopCheck";


const Footer = (props) => {
   const isDesktop = useDesktopCheck()

   console.log(isDesktop)
    return(
       <div className={classes.container}>
          <div className={classes.wrapper}>
             <div className={classes.links}>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'about'}>About</NavLink>
                <NavLink to={'contacts'}>Our contacts</NavLink>
                <NavLink to={'info'}>Info</NavLink>
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

             {!isDesktop &&
               <hr className={classes.hr}/>
             }

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