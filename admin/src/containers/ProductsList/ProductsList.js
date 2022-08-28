import React, {useEffect, useState} from 'react'
import classes from './ProductsList.module.sass'
import {useLocation, useNavigate} from "react-router-dom";
import {useHttp} from "../../functions/http.hook";
import ProductCard from "./ProductCard/ProductCard";


// Limit products per one page
const limit = 7

const ProductsList = (props) => {
   const {requestJson} = useHttp()

   const location = useLocation()
   const navigate = useNavigate()

   const [page, setPage] = useState(1)
   const [showMore, setShowMore] = useState(true)

   const [allSex, setAllSex] = useState(['all'])
   const [allCategories, setAllCategories] = useState([])

   const [sex, setSex] = useState([])
   const [category, setCategory] = useState([])
   const [title, setTitle] = useState(() => '')
   const [sort, setSort] = useState('-avgRating')

   const [products, setProducts] = useState([])

   const showMoreHandler = e => {
      e.preventDefault()
      setPage(prev => prev + 1)
   }

   const sexChange = e => {
      const value = e.target.value

      if (sex.includes(value)) {
         setSex(prev => prev.filter(el => el !== value))
      } else {
         setSex(prev => prev.concat([value]))
      }

   }

   const categoryChange = e => {
      const value = e.target.value

      if (category.includes(value)) {
         setCategory(prev => prev.filter(el => el !== value))
      } else {
         setCategory(prev => prev.concat([value]))
      }

   }

   useEffect(() => {
      (async () => {
         const data = await requestJson(
            '/product/allCategories'
         )

         if (data) {
            const sex = Object.keys(data.categories)
            const categories = sex.reduce((acc, el) => {
               acc = acc.concat(data.categories[el])
               return acc
            }, [])

            const uniques = categories.filter((el, index, arr) => (
               arr.indexOf(el) === index
            ))

            setAllSex(sex)
            setAllCategories(uniques)
         }
      })()
   }, [])

   useEffect(() => {
      const sexStr = sex.length > 0 ? `&sex[in]=${sex.join(',')}` : ''
      const categoryStr = category.length > 0 ? `&category[in]=${category.join(',')}` : ''
      const titleStr = title.length > 0 ? `&title[regex]=${title}` : ''

      navigate(
         '/admin/products?' +
         `page=${page}&` +
         `limit=${limit}&`+
         'status[in]=active,nosizes,unavailable&' +
         'fields=-questions,-ratings,-features,-description' +
         `&sort=${sort}` + sexStr + categoryStr + titleStr
      )
   }, [sort, sex, category, title, page])

   useEffect(() => {
      (async () => {
         const data = await requestJson(
            `/product${location.search}`
         )

         if (data.results < limit)
            setShowMore(false)

         console.log(data)
         setProducts(prev => prev.concat(data.products))
      })()
   }, [location.search])

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.filter_bar}>
               <div className={classes.sort_container}>
                  <select
                     name="sort"
                     id="sort_select"
                     value={sort}
                     onChange={e => setSort(e.target.value)}
                  >
                     <option value="-avgRating">
                        Rating high to low
                     </option>

                     <option value="avgRating">
                        Rating low to high
                     </option>

                     <option value="-price">
                        Price high to low
                     </option>

                     <option value="price">
                        Price low to high
                     </option>

                     <option value="createdAt">
                        Newest
                     </option>
                  </select>
               </div>

               <div className={classes.filter_container}>
                  <div className={classes.category_container}>
                     {allCategories.map((el, i) => (
                        <div className={classes.category_item} key={i}>
                           <input
                              type="checkbox"
                              value={el}
                              id={`${el}_${i}`}
                              checked={category.includes(el)}
                              onChange={categoryChange}
                           />

                           <label htmlFor={`${el}_${i}`}>
                              {` ${el.slice(0,1).toUpperCase()}${el.slice(1)}`}
                           </label>
                        </div>
                     ))}
                  </div>

                  <div className={classes.sex_container}>
                     {allSex.map((el, i) => (
                        <div className={classes.sex_item} key={i}>
                           <input
                              type="checkbox"
                              value={el}
                              id={`${el}_${i}`}
                              checked={sex.includes(el)}
                              onChange={sexChange}
                           />

                           <label>
                              {` ${el.slice(0,1).toUpperCase()}${el.slice(1)}`}
                           </label>
                        </div>
                     ))}
                  </div>

                  <div className={classes.title_container}>
                     <span>
                        Product title
                     </span>

                     <input
                        type='text'
                        value={title}
                        placeholder={'Product title'}
                        onChange={e => setTitle(e.target.value)}
                     />
                  </div>
               </div>
            </div>

            <div className={classes.products_list}>
               {products.length > 0 &&
                  products.map((el, i) => (
                     <ProductCard
                        key={`${el.slug}_${i}`}
                        slug={el.slug}
                        mainPhoto={el.mainPhoto}
                        title={el.title}
                        price={el.price}
                        sex={el.sex}
                        avgRating={el.avgRating}
                        numRating={el.numRating}
                        numQuestions={el.numQuestions}
                        sold={el.sold}
                        numSizes={el.numSizes}
                     />
                  ))
               }
            </div>

            {showMore &&
               <div className={classes.showMore}>
                  <button
                     onClick={showMoreHandler}
                  >
                     Show more
                  </button>
               </div>
            }
         </div>
      </div>
   )
}

export default ProductsList