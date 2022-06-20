import React from 'react'
import classes from './About.module.sass'
import aboutUs from '../../img/about-us.png'
import Button from "../../forms/Button/Button";
import '../basicStyles.sass'
import {useDispatch, useSelector} from "react-redux";
import {toggleCatalog} from "../../redux/app/appReducer";


const About = (props) => {
   const about = useSelector(state => state.app.staticData.aboutUs)

   const dispatch = useDispatch()

   return (
      <div className={'container'}>
         <div className={'wrapper'}>
            <h1 className={'title'}>Про нас</h1>
            <div className={classes.title_img}>
               <img src={aboutUs} alt="About us"/>
            </div>

            <div className={classes.article}>
               <h2 className={classes.article_title}>Наша история</h2>

               <span className={classes.article_text}>{about.eng}</span>
            </div>

            <hr className={classes.hr}/>

            <h2 className={classes.add_title}>Наш каталог</h2>

            <div className={classes.catalogBtn_container}>
               <Button
                  type={'big_orange_button'}
                  onClickHandler={() => dispatch(toggleCatalog())}
               >
                  Каталог
               </Button>
            </div>

            <hr className={classes.hr}/>
         </div>
      </div>
   )
}

export default About