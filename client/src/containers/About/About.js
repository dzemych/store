import React from 'react'
import classes from './About.module.sass'
import aboutUs from '../../img/about-us.png'
import Button from "../../components/Button/Button";
import '../basicStyles.sass'


const About = (props) => {
   return (
      <div className={'container'}>
         <div className={'wrapper'}>
            <h1 className={'title'}>About us</h1>
            <div className={classes.title_img}>
               <img src={aboutUs} alt="About us"/>
            </div>

            <div className={classes.article}>
               <h2 className={classes.article_title}>Our history</h2>

               <span className={classes.article_text}>
                  Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
               </span>
            </div>

            <hr className={classes.hr}/>

            <h2 className={classes.add_title}>View our catalog</h2>

            <Button
               type={'big_orange_button'}
               onClickHandler={() => {}}
            >
               Catalog
            </Button>

            <hr className={classes.hr}/>
         </div>
      </div>
   )
}

export default About