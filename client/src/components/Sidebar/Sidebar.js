import React, {useCallback, useEffect} from 'react'
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
   faHouse, faRightToBracket
} from "@fortawesome/free-solid-svg-icons"
import instagramImg from '../../img/instagram.png'
import facebookImg from '../../img/facebook.png'
import viberImg from '../../img/viber.png'
import telegramImg from '../../img/telegram.png'
import smallLogo from '../../img/small-logo.png'
import tdLogo from '../../img/tan-dem-wide-logo.png'
import userPhoto from '../../img/user-photo.png'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toggleAuth, toggleCatalog, toggleSidebar} from '../../redux/app/appReducer'
import LinksList from "./LinksList";
import {logOut} from "../../redux/user/userReducer";
import Backdrop from "../Backdrop/Backdrop";
import {CSSTransition} from "react-transition-group";


const Sidebar = (props) => {

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const isAuth = useSelector(state => state.user.token)
   const {name, email} = useSelector(state => state.user)

   const cls = [classes.container]

   if (props.isOpen)
      cls.push(classes.active)

   const openPageHandler = (e, page) => {
      dispatch(toggleSidebar())
      if (page !== '/')
         return navigate('/' + page)
      navigate('/')
   }

   const openCatalog = async e => {
      e.preventDefault()
      dispatch(toggleCatalog())
      dispatch(toggleSidebar())
   }

   const authHandler = () => {
      if (isAuth) {
         dispatch(logOut())
         dispatch(toggleSidebar())
      } else {
         dispatch(toggleAuth())
         dispatch(toggleSidebar())
      }
   }

   const sidebarHandler = () => {
      dispatch(toggleSidebar())
   }

   const onEscape = useCallback(e => {
      if (e.key === 'Escape')
         sidebarHandler()
   }, [])

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

   useEffect(() => {
      if (props.isOpen)
         document.addEventListener('keyup', onEscape, true)

      if (!props.isOpen) {
         document.removeEventListener('keyup', onEscape, true)
      }
   }, [props.isOpen])

   return (
      <>
         <div
            className={cls.join(' ')}
            onClick={e => e.stopPropagation()}
         >
            <div className={classes.wrapper}>
               <div className={classes.topBar}>
                  <div
                     className={classes.smallLogo}
                     onClick={e => openPageHandler(e, '/')}
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

                  <FontAwesomeIcon
                     icon={faXmark}
                     onClick={sidebarHandler}
                  />
               </div>

               <div className={classes.userBar}>
                  <div className={classes.userPhoto}>
                     {isAuth
                        ? <img
                           src={userPhoto}
                           alt="user_photo"
                           onClick={e => openPageHandler(e, 'user')}
                        />
                        : <FontAwesomeIcon
                           icon={faRightToBracket}
                           className={classes.logIn}
                           onClick={() => authHandler()}
                        />
                     }
                  </div>

                  {isAuth &&
                  <div className={classes.userInfo}>
                     <span
                        className={classes.userName}
                        onClick={e => openPageHandler(e, 'user')}
                     >
                        {name}
                     </span>
                     <span
                        className={classes.userEmail}
                        onClick={e => openPageHandler(e, 'user')}
                     >
                        {email}
                     </span>
                  </div>
                  }

               </div>

               <LinksList links={links}/>

               <hr className={classes.hr}/>

               <div className={classes.infoBar}>
                  <span className={classes.info_title}>Company information</span>

                  <ul className={classes.info_list}>
                     <li
                        className={classes.info_item}
                        onClick={e => openPageHandler(e, 'about')}
                     >About us
                     </li>
                     <li
                        className={classes.info_item}
                        onClick={e => openPageHandler(e, 'contacts')}
                     >Contacts
                     </li>
                     <li
                        className={classes.info_item}
                        onClick={e => openPageHandler(e, 'info')}
                     >Delivery and payment
                     </li>
                     <li
                        className={classes.info_item}
                        onClick={e => openPageHandler(e, 'info')}
                     >Warrant
                     </li>
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

               <div
                  className={classes.logOut}
                  onClick={() => authHandler()}
               >
                  {isAuth ? 'Log out' : 'Log in'}
               </div>
            </div>
         </div>

         <CSSTransition
            in={props.isOpen}
            timeout={300}
            mountOnEnter
            unmountOnExit
         >
            <Backdrop
               onClick={sidebarHandler}
            />
         </CSSTransition>
      </>
   )
}

export default Sidebar