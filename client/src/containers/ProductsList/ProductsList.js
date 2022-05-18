import React, {useEffect, useMemo, useState} from 'react'
import classes from './ProductsList.module.sass'
import '../basicStyles.sass'
import ProductCard from "../../components/ProductCard/ProductCard";
import Button from "../../forms/Button/Button";
import RecentlySlider from "../../components/Slider/RecentlySlider";
import {useHttp} from "../../functions/http.hook";
import {useLocation} from "react-router-dom";


const ProductsList = (props) => {

   const [products, setProducts] = useState([])
   const [status, setStatus] = useState('idle')

   const {requestJson} = useHttp()
   const location = useLocation()

   useEffect(() => {
      if (status === 'idle'){
         (async () => {
            try {
               const data = await requestJson(
                  `/product${location.search}&fields=price,title,slug,avgRating,numRating,mainPhoto`
               )

               setProducts(data.resObj)
               setStatus('success')
            } catch (e) {
               console.log(e)
               setStatus('error')
            }
         })()
      }
   }, [location, requestJson, status])

   const getProduct = useMemo(() => {
      if (!products || products.length === 0)
         return (<span className={classes.noProducts}>No products found</span>)

      if (products.length >= 1)
         return (
            products.map((item, i) => (
               <ProductCard
                  slug={item.slug}
                  title={item.title}
                  price={item.price}
                  mainPhoto={item.mainPhoto}
                  avgRating={item.avgRating}
                  numRating={item.numRating}
                  key={i}
               />
            ))
         )
   }, [products])

   return (
      <div className={'container'}>
         <div className={classes.wrapper}>
            <h2 className={classes.title}>Title</h2>

            <div className={classes.sort_panel}>
               <select name="sort" id="sort" className={classes.select}>
                  <option value="price_h_to_l">Price from high to low</option>
                  <option value="price_l_to_h">Price from low to high</option>
                  <option value="most_popular">Most popular</option>
                  <option value="newest">Newest</option>
               </select>
            </div>

            <div className={classes.products_container}>
               {getProduct}
            </div>

            <Button type={'viewAll_button'}>Show more</Button>

            <hr className={classes.hr}/>

            <RecentlySlider/>
         </div>
      </div>
   )
}

export default ProductsList