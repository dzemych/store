import React, {useEffect, useState} from 'react'
import classes from './Checkout.module.sass'
import defaultPhoto from '../../img/no-image.png'
import {useNavigate} from "react-router-dom";
import {useHttp} from "../../functions/http.hook";


const ProductItem = (props) => {

   const navigate = useNavigate()
   const [photo, setPhoto] = useState(defaultPhoto)

   const {requestImg} = useHttp()

    const productData = [
        {
            title: 'Price',
            value: props.price
        },
        {
            title: 'Amount',
            value: props.amount
        },
        {
            title: 'Total price',
            value: props.price * props.amount
        }
    ]

   const openProduct = () => {
      navigate('/products/' + props.slug)
   }

   useEffect(() => {
      if (props.mainPhoto){
         (async () => {
            const img = await requestImg(
               `/img/product/${props.slug}/${props.mainPhoto}`
            )

            setPhoto(img)
         })()
      }
   }, [])

    return(
        <div className={classes.product_item}>
            <div className={classes.product_topBar}>
                <div className={classes.product_img_container}>
                    <img
                       src={photo}
                       alt=""
                       onClick={openProduct}
                    />
                </div>

                <div
                   className={classes.product_title_container}
                   onClick={openProduct}
                >
                    <span>
                        {props.title} ({props.size.toUpperCase()})
                    </span>
                </div>
            </div>

            <div className={classes.product_bottomBar}>
                {productData.map((el, i) => (
                    <div className={classes.product_data_container} key={i}>
                        <span className={classes.product_data_title}>
                            {el.title}
                        </span>

                        <span className={classes.product_data_value}>
                            {el.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductItem