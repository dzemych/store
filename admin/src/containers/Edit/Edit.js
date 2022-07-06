import React, {useEffect, useState} from 'react'
import classes from './Edit.module.sass'
import {useParams} from "react-router-dom";
import {useHttp} from "../../functions/http.hook";
import ProductEdit from "../../components/ProductEdit/ProductEdit";


const Edit = (props) => {
   const params = useParams()

   const {requestJson} = useHttp()

   const [product, setProduct] = useState(null)

   useEffect(() => {
      (async () => {
         const data = await requestJson('/product/' + params.slug)

         setProduct(data.product)
      })()
   }, [params.slug, requestJson])

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h1 className={classes.main_title}>Edit product</h1>

            {product &&
               <div className={classes.product_title}>
                  {product.title}
               </div>
            }

            {product &&
               <ProductEdit
                  type={'edit'}
                  slug={product.slug}
                  id={product._id}
                  status={product.status}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  sex={product.sex}
                  category={product.category}
                  numSizes={product.numSizes}
                  features={product.features}
                  photos={product.photos}
               />
            }
         </div>
      </div>
   )
}

export default Edit