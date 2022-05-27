import React, {useEffect, useState} from 'react'
import classes from './Slider.module.sass'
import Slider, {SliderItem} from "./Slider";
import ProductCard from "../ProductCard/ProductCard";
import {useMediaQuery} from "react-responsive";
import {useSelector} from "react-redux";
import {useHttp} from "../../functions/http.hook";


const RecentlySlider = (props) => {

   const {requestJson} = useHttp()

   const [products, setProducts] = useState([])
   const recently = useSelector(state => state.recently.products)

   const isTablet = useMediaQuery({minWidth: 660})
   const isLaptop = useMediaQuery({minWidth: 836})
   const isDesktop = useMediaQuery({minWidth: 1240})
   const isBigDesktop = useMediaQuery({minWidth: 1750})

   const slides = props.slides
      ? props.slides
      : isBigDesktop ? 6
      : isDesktop ? 5
      : isLaptop ? 4
      : isTablet ? 3
      : 2

   useEffect(() => {
      if (recently.length > 0)
         (async () => {
            const data = await requestJson(
               `/product/getProducts`,
               'POST',
               JSON.stringify({products: recently}),
               {'Content-Type': 'application/json'}
            )

            console.log(data.products)
            setProducts(() => (
               data.products.reduce((acc, el) => {
                  const {_id, ...product} = el
                  acc[_id] = product

                  return acc
               }, {})
            ))
         })()
   }, [recently])

   useEffect(() => {console.log(products)}, [products])

   return (
      <div className={classes.recently_container}>
         <h2 className={classes.recently_title}>Recently watched</h2>

         {Object.keys(products).length > 0
         && <Slider slides={slides}>
               {recently.map((id, i) => (
                  <SliderItem slides={slides} key={i}>
                     <ProductCard
                        key={products[id].slug}
                        slug={products[id].slug}
                        id={id}
                        title={products[id].title}
                        price={products[id].price}
                        mainPhoto={products[id].mainPhoto}
                        avgRarting={products[id].avgRating}
                        numRating={products[id].numRating}
                        numSizes={products[id].numSizes}
                     />
                  </SliderItem>
               ))}
            </Slider>}
      </div>
   )
}

export default RecentlySlider