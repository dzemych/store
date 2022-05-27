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
   const [showMore, setShowMore] = useState(true)
   const [sort, setSort] = useState('-avgRating')

   const {requestJson} = useHttp()
   const location = useLocation()

   useEffect(() => {
         (async () => {
            try {
               const data = await requestJson(
                  `/product${location.search}&page=1&limit=10&` +
                  `fields=price,title,slug,avgRating,numRating,mainPhoto,_id&` +
                  `sort=${sort}`
               )

               setProducts(data.products)

               if (data.results < 10)
                  setShowMore(false)
            } catch (e) {
               console.log(e)
            }
         })()
   }, [location.search, requestJson, sort])

   const getProduct = useMemo(() => {
      if (!products || products.length === 0)
         return (<span className={classes.noProducts}>No products found</span>)

      if (products.length >= 1)
         return (
            products.map((item, i) => (
               <ProductCard
                  id={item._id}
                  slug={item.slug}
                  title={item.title}
                  price={item.price}
                  mainPhoto={item.mainPhoto}
                  avgRating={item.avgRating}
                  numRating={item.numRating}
                  key={item.slug}
               />
            ))
         )
   }, [products])

   return (
      <div className={'container'}>
         <div className={classes.wrapper}>
            <h2 className={classes.title}>Title</h2>

            <div className={classes.sort_panel}>
               <select
                  name="sort"
                  id="sort"
                  className={classes.select}
                  onChange={e => setSort(e.target.value)}
               >
                  <option value="-avgRating">Most popular</option>
                  <option value="-price">Price from high to low</option>
                  <option value="price">Price from low to high</option>
                  <option value="newest">Newest</option>
               </select>
            </div>

            <div className={classes.products_container}>
               {getProduct}
            </div>

            {showMore &&
               <Button
                  type={'viewAll_button'}
               >
                  Show more
               </Button>
            }

            <hr className={classes.hr}/>

            <RecentlySlider/>
         </div>
      </div>
   )
}

export default ProductsList