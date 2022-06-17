import React from 'react'
import classes from './Info.module.sass'
import {faCreditCard, faTruck, faBox, faShield}
   from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const QuestionsList = (props) => {
   return (
      <div className={classes.list}>
         <ul className={classes.list_container}>
            <li className={classes.list_item}>
               <div className={classes.item_left}>
                  <FontAwesomeIcon
                     icon={faCreditCard}
                     className={classes.item_icon}
                  />
               </div>

               <div className={classes.item_right}>
                  <h3 className={classes.item_title}>Оплата</h3>
                  <span className={classes.item_text}>
                     Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod tempor
                     incididunt ut labore et dolore magna aliqua.
                  </span>
               </div>
            </li>

               <hr className={classes.item_hr}/>

            <li className={classes.list_item}>
               <div className={classes.item_left}>
                  <FontAwesomeIcon
                     icon={faTruck}
                     className={classes.item_icon}
                  />
               </div>

               <div className={classes.item_right}>
                  <h3 className={classes.item_title}>Доставка</h3>
                  <span className={classes.item_text}>
                     Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod tempor
                     incididunt ut labore et dolore magna aliqua.
                  </span>
               </div>
            </li>

               <hr className={classes.item_hr}/>

            <li className={classes.list_item}>
               <div className={classes.item_left}>
                  <FontAwesomeIcon
                     icon={faBox}
                     className={classes.item_icon}
                  />
               </div>

               <div className={classes.item_right}>
                  <h3 className={classes.item_title}>Помощь в оплате</h3>
                  <span className={classes.item_text}>
                     Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod.
                  </span>
               </div>
            </li>

               <hr className={classes.item_hr}/>

            <li className={classes.list_item}>
               <div className={classes.item_left}>
                  <FontAwesomeIcon
                     icon={faShield}
                     className={classes.item_icon}
                  />
               </div>

               <div className={classes.item_right}>
                  <h3 className={classes.item_title}>Гарантия</h3>
                  <span className={classes.item_text}>
                     Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod.
                  </span>
               </div>
            </li>
         </ul>
      </div>
   )
}

export default QuestionsList