import React from 'react'
import classes from './ShoppingCart.module.sass'
import '../basicStyles.sass'
import ProductCard from "../../components/ProductCard/ProductCard";
import square from '../../img/square.jpg'
import jeans from '../../img/jeans.jpg'


const ShoppingCart = (props) => {
   return (
      <div className={'container'}>
         <div className={'wrapper'}>
            <h1 className={'title'}>Shopping cart</h1>

               <div className={classes.products_container}>
                  <ProductCard
                     type={'basket'}
                     title={'Amazing and cute jeans'}
                     price={850}
                     img={jeans}
                  />

                  <hr className={classes.hr}/>

                  <ProductCard
                     type={'basket'}
                     title={'Fancy T-shirt'}
                     img={square}
                     price={500}
                  />

                  <hr className={classes.hr}/>

                  <ProductCard
                     type={'basket'}
                     title={'Fancy T-shirt'}
                     price={500}
                  />
               </div>
         </div>
      </div>
   )
}

export default ShoppingCart