import React from 'react'
import classes from "./Sidebar.module.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const LinksList = (props) => {
   return (
      <ul className={classes.list}>

         {props.links.map((link, i) => (
            <li
               className={classes.item}
               onClick={link.onClickHandler}
               key={i}
            >
               <div className={classes.item_icon}>
                  <FontAwesomeIcon icon={link.icon} />
               </div>

               <span className={classes.item_text}>{link.text}</span>
            </li>
         ))}

      </ul>
   )
}

export default LinksList