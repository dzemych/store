import React from 'react'
import classes from './Home.module.sass'
import {NavLink} from "react-router-dom";
import {ReactComponent as FashionAndStyle} from '../../img/fashionAndStyle.svg'
import laptop from '../../img/laptop.png'
import Button from "../../forms/Button/Button";
import {toggleCatalog} from "../../redux/app/appReducer";
import {useDispatch, useSelector} from "react-redux";
import RecentlySlider from "../../components/Slider/RecentlySlider";


const Home = (props) => {
   const data = useSelector(state => state.app.staticData)

   const dispatch = useDispatch()

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <section className={classes.preview}>
               <nav className={classes.preview_nav}>
                  <NavLink
                     to={'/contacts'}
                     className={classes.nav_contact}
                  >
                     Контакты
                  </NavLink>

                  <NavLink to={'/about'}>
                     Про нас
                  </NavLink>
               </nav>

               <FashionAndStyle className={classes.preview_img}/>

               <div className={classes.catalog_container}>
                  <Button
                     type={'big_orange_button'}
                     onClickHandler={() => dispatch(toggleCatalog())}
                  >
                     Каталог
                  </Button>
               </div>
            </section>

            <span className={classes.manuscript}>
                {data.tagline.eng}
            </span>

            <section className={classes.notation}>
               <h2 className={classes.note_title}>
                  Про нас
               </h2>

               <span className={classes.note_text}>{data.aboutUsShort.eng}</span>

               <div className={classes.note_img}>
                  <img src={laptop} alt=""/>
               </div>
            </section>

            <section className={classes.recently}>
               <RecentlySlider/>

               <Button
                  type={'viewAll_button'}
                  onClickHandler={() => dispatch(toggleCatalog())}
               >
                  Наш каталог
               </Button>

               <hr className={classes.hr}/>
            </section>
         </div>
      </div>
   )
}


export default Home