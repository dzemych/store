import React from 'react'
import classes from './Info.module.sass'
import * as icons from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector} from "react-redux";


const QuestionsList = (props) => {
   const data = useSelector(state => state.app.staticData.info)

   return (
      <div className={classes.list}>
         <ul className={classes.list_container}>
            {
               data.map((el, i) => (
                  <div key={i}>
                     <li className={classes.list_item}>
                        <div className={classes.item_left}>
                           <FontAwesomeIcon
                              icon={icons[el.icon]}
                              className={classes.item_icon}
                           />
                        </div>

                        <div className={classes.item_right}>
                           <h3 className={classes.item_title}>{el.titleRus}</h3>

                           <span className={classes.item_text}>
                              {el.textRus.split('\n').map((el, i) => (
                                 <span key={i}>
                                    {el}
                                    <br/>
                                 </span>
                              ))}
                           </span>
                        </div>
                     </li>

                     {i < data.length - 1 &&
                        <hr className={classes.item_hr}/>
                     }
                  </div>
               ))
            }
         </ul>
      </div>
   )
}

export default QuestionsList