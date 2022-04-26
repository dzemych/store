import React, {useState} from 'react'
import classes from './Sidebar.module.sass'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
   faShirt,
   faXmark,
   faList,
   faBasketShopping,
   faCircleQuestion,
   faSquarePhone,
   faPeopleGroup
} from "@fortawesome/free-solid-svg-icons"
import instagramImg from '../../img/instagram.png'
import facebookImg from '../../img/facebook.png'
import viberImg from '../../img/viber.png'
import telegramImg from '../../img/telegram.png'
import smallLogo from '../../img/small-logo.png'
import tdLogo from '../../img/tan-dem-wide-logo.png'
import userPhoto from '../../img/user-photo.png'


const Sidebar = (props) => {

   const [lang, setLang] = useState('rus')

   const switchLanguage = val => {
      console.log(val)
      setLang(val)
   }

   return (
      <div
         className={[classes.container, classes[props.state]].join(' ')}
         onClick={e => e.stopPropagation()}
      >
         <div className={classes.wrapper}>
            <div className={classes.topBar}>
               <div className={classes.smallLogo}>
                  <img src={smallLogo} alt=""/>
               </div>

               <div className={classes.tdLogo}>
                  <img src={tdLogo} alt=""/>
               </div>

               <FontAwesomeIcon icon={faXmark}/>
            </div>

            <div className={classes.userBar}>
               <div className={classes.userPhoto}>
                  <img src={userPhoto} alt="user_photo"/>
               </div>

               <div className={classes.userInfo}>
                  <span className={classes.userName}>
                     Name
                  </span>
                  <span className={classes.userEmail}>
                     test@gmail.com
                  </span>
               </div>
            </div>

            <ul className={classes.list}>
               <li className={classes.item}>
                  <div className={classes.item_icon}>
                     <FontAwesomeIcon icon={faShirt} />
                  </div>
                  <span className={classes.item_text}>Catalog</span>
               </li>

               <li className={classes.item}>
                  <div className={classes.item_icon}>
                     <FontAwesomeIcon icon={faList} />
                  </div>
                  <span className={classes.item_text}>Your orders</span>
               </li>

               <li className={classes.item}>
                  <div className={classes.item_icon}>
                     <FontAwesomeIcon icon={faBasketShopping} />
                  </div>
                  <span className={classes.item_text}>Shopping cart</span>
               </li>

               <li className={classes.item}>
                  <div className={classes.item_icon}>
                     <FontAwesomeIcon icon={faPeopleGroup} />
                  </div>
                  <span className={classes.item_text}>About us</span>
               </li>

               <li className={classes.item}>
                  <div className={classes.item_icon}>
                     <FontAwesomeIcon icon={faSquarePhone} />
                  </div>
                  <span className={classes.item_text}>Our contacts</span>
               </li>

               <li className={classes.item}>
                  <div className={classes.item_icon}>
                     <FontAwesomeIcon icon={faCircleQuestion} />
                  </div>
                  <span className={classes.item_text}>Q&A</span>
               </li>
            </ul>

            <hr className={classes.hr}/>

            <div className={classes.lang_container}>
               <span>Language</span>

               <input
                  type="radio"
                  onChange={switchLanguage}
                  value='rus'
                  id='radio_rus'
                  checked={lang === 'rus'}
               />
               <label
                  htmlFor="radio_rus"
                  onClick={() => switchLanguage('rus')}
               >
                  RU
               </label>

               <input
                  type="radio"
                  value='ukr'
                  id='radio_ukr'
                  checked={lang === 'ukr'}
                  onChange={switchLanguage}
               />
               <label
                  htmlFor="radio_ukr"
                  onClick={() => switchLanguage('ukr')}
               >
                  UK
               </label>
            </div>

            <hr className={classes.hr}/>

            <div className={classes.infoBar}>
               <span className={classes.info_title}>Company information</span>

               <ul className={classes.info_list}>
                  <li className={classes.info_item}>About us</li>
                  <li className={classes.info_item}>Contacts</li>
                  <li className={classes.info_item}>Delivery and payment</li>
                  <li className={classes.info_item}>Warrant</li>
               </ul>
            </div>

            <hr className={classes.hr}/>

            <div className={classes.socialBar}>
               <span className={classes.social_title}>We in network</span>

               <ul className={classes.social_list}>
                  <li className={classes.social_item}>
                     <img src={instagramImg} alt="instagram"/>
                  </li>

                  <li className={classes.social_item}>
                     <img src={facebookImg} alt="facebook"/>
                  </li>

                  <li className={classes.social_item}>
                     <img src={telegramImg} alt="telegram"/>
                  </li>

                  <li className={classes.social_item}>
                     <img src={viberImg} alt="viber"/>
                  </li>
               </ul>
            </div>

            <hr className={classes.hr}/>

            <div className={classes.logOut}>Log out</div>
         </div>
      </div>
   )
}

export default Sidebar