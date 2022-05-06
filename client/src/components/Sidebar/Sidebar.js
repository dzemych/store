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
   faPeopleGroup,
   faHeart,
   faHouse
} from "@fortawesome/free-solid-svg-icons"
import instagramImg from '../../img/instagram.png'
import facebookImg from '../../img/facebook.png'
import viberImg from '../../img/viber.png'
import telegramImg from '../../img/telegram.png'
import smallLogo from '../../img/small-logo.png'
import tdLogo from '../../img/tan-dem-wide-logo.png'
import userPhoto from '../../img/user-photo.png'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toggleSidebar} from '../../redux/app/appReducer'
import LinksList from "./LinksList";


const Sidebar = (props) => {

   const [lang, setLang] = useState('rus')
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const openPageHandler = (e, page) => {
      dispatch(toggleSidebar())
      if (page !== '/')
         return navigate('/' + page)
      navigate('/')
   }

   const openCatalog = e => {
      console.log('Open catalog')
   }

   const links = [
      {
         icon: faHouse,
         text: "Home",
         onClickHandler: e => openPageHandler(e, '/')
      },
      {
         icon: faShirt,
         text: "Catalog",
         onClickHandler: e => openCatalog(e)
      },
      {
         icon: faList,
         text: "Your orders",
         onClickHandler: e => openPageHandler(e, 'orders')
      },
      {
         icon: faBasketShopping,
         text: "Shopping cart",
         onClickHandler: e => openPageHandler(e, 'shopping-cart')
      },
      {
         icon: faHeart,
         text: "Wish list",
         onClickHandler: e => openPageHandler(e, 'wish-list')
      },
      {
         icon: faPeopleGroup,
         text: "About us",
         onClickHandler: e => openPageHandler(e, 'about')
      },
      {
         icon: faSquarePhone,
         text: "Our contacts",
         onClickHandler: e => openPageHandler(e, 'contacts')
      },
      {
         icon: faCircleQuestion,
         text: "Q&A",
         onClickHandler: e => openPageHandler(e, 'info')
      },
   ]

   const switchLanguage = val => {
      setLang(val)
   }

   return (
      <div
         className={[classes.container, classes[props.state]].join(' ')}
         onClick={e => e.stopPropagation()}
      >
         <div className={classes.wrapper}>
            <div className={classes.topBar}>
               <div
                  className={classes.smallLogo}
                  onClick={e => openPageHandler(e, 'about')}
               >
                  <img
                     src={smallLogo}
                     alt=""
                  />
               </div>

               <div
                  className={classes.tdLogo}
                  onClick={e => openPageHandler(e, '')}
               >
                  <img
                     src={tdLogo}
                     alt=""
                  />
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

            <LinksList links={links}/>

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