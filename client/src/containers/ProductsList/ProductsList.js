import React, {useEffect, useMemo, useState} from 'react'
import classes from './ProductsList.module.sass'
import '../basicStyles.sass'
import ProductCard from "../../components/ProductCard/ProductCard";
import RecentlySlider from "../../components/Slider/RecentlySlider";
import {useHttp} from "../../functions/http.hook";
import {useLocation, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";


const ProductsList = (props) => {

   const [products, setProducts] = useState([])
   const [showNext, setShowNext] = useState(true)
   const [sort, setSort] = useState('-avgRating')

   const {requestJson} = useHttp()
   const location = useLocation()
   const navigate = useNavigate()

   const page = useMemo(() => {
      const page = location.search.match(/page=\d+/)

      if (page) {
         return +page[0].split('=')[1]
      }

      return '1'
   }, [location.search])

   const getProduct = useMemo(() => {
      if (!products || products.length === 0)
         return (<span className={classes.noProducts}>No products found</span>)

      if (products.length >= 1)
         return (
            products.map(item => (
               <ProductCard
                  key={item.slug}
                  id={item._id}
                  sex={item.sex}
                  slug={item.slug}
                  title={item.title}
                  price={item.price}
                  status={item.status}
                  mainPhoto={item.mainPhoto}
                  avgRating={item.avgRating}
                  numRating={item.numRating}
               />
            ))
         )
   }, [products])

   const changePage = async type => {
      try {
         const newPage = type === 'next' ? page + 1 : page - 1

         const newSearch = location.search.replace(/page=\d+/, `page=${newPage}`)

         navigate(newSearch)
      } catch (e) {
         console.log(e)
      }
   }

   useEffect(() => {
      (async () => {
         try {
            const data = await requestJson(
               `/product${location.search}&limit=20&` +
               `fields=sex,price,title,slug,avgRating,numRating,mainPhoto,_id,status&` +
               `sort=${sort}`
            )

            setProducts(data.products)

            if (data.results < 20) {
               setShowNext(false)
            } else {
               setShowNext(true)
            }
         } catch (e) {
            console.log(e)
         }
      })()
   }, [location.search, requestJson, sort])

   return (
      <div className={'container'}>
         <div className={classes.wrapper}>
            <div className={classes.sort_panel}>
               <select
                  name="sort"
                  id="sort"
                  className={classes.select}
                  onChange={e => setSort(e.target.value)}
               >
                  <option value="-avgRating">Самые популярные</option>
                  <option value="createdAt">Новые</option>
                  <option value="-price">Цена: от высокой к низкой</option>
                  <option value="price">Цена: от низкой к высокой</option>
               </select>
            </div>

            <div className={classes.products_container}>
               {getProduct}
            </div>

            {(showNext && page > 1) &&
               <div className={classes.page_container}>
                  {page > 1
                     ? <div
                        className={classes.page_item}
                        onClick={() => changePage('back')}
                     >
                        <FontAwesomeIcon icon={faArrowLeft}/>

                        <span>Назад</span>
                     </div>
                     : <div className={classes.page_item}/>
                  }

                  {showNext
                     ? <div
                        className={classes.page_item}
                        onClick={() => changePage('next')}
                     >
                        <span>Вперед</span>

                        <FontAwesomeIcon icon={faArrowRight}/>
                     </div>
                     : <div className={classes.page_item}/>
                  }
               </div>
            }

            <hr className={classes.hr}/>

            <RecentlySlider/>
         </div>
      </div>
   )
}

export default ProductsList