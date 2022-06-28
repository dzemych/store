import React, {useEffect, useState} from 'react'
import classes from './ShoppingCart.module.sass'
import '../basicStyles.sass'
import Button from "../../forms/Button/Button";
import MediaQuery from "react-responsive";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../functions/http.hook";
import {useNavigate} from "react-router-dom";
import ShoppingCard from "../../components/ProductCard/ShoppingCard";
import {addCheckout} from "../../redux/purchase/purchaseReducer";


const ShoppingCart = (props) => {

   const {requestJson} = useHttp()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const basket = useSelector(state => state.user.basket)
   const [items, setItems] = useState({})

   const [products, setProducts] = useState([])

   const onPurchase = () => {
      dispatch(addCheckout(items))
      navigate('/checkout')
   }

   useEffect(() => {
      if (basket.length > 0) {
         (async () => {
            const data = await requestJson(
               '/product/getProducts',
               'POST',
               JSON.stringify({products: basket}),
               {'Content-Type': 'application/json'}
            )

            setProducts(data.products)
         })()
      } else {setProducts([])}
   }, [basket, requestJson])

   return (
      <div className={classes.container}>
         <div className={'wrapper'}>
            <h1 className={'title'}>Корзина</h1>

            <div className={classes.body}>
               <div className={classes.products_container}>

                  {products.length > 0
                     ? products.map((el, i, arr) => (
                        <div
                           key={i}
                           className={classes.product_item}
                        >
                           <ShoppingCard
                              setSize={setItems}
                              key={el.slug}
                              slug={el.slug}
                              id={el._id}
                              title={el.title}
                              price={el.price}
                              mainPhoto={el.mainPhoto}
                              avgRarting={el.avgRating}
                              numRating={el.numRating}
                              numSizes={el.numSizes}
                           />
                           {i < arr.length - 1 && <hr className={classes.hr}/>}
                        </div>
                     ))
                     : <div className={classes.noProducts}>
                        <h1>Нет продуктов</h1>
                     </div>
                  }

               </div>

               <div className={classes.total_container}>
                  <div className={classes.total_amount}>
                     <MediaQuery maxWidth={768}>
                        <span>Всего к оплате</span>
                     </MediaQuery>

                     <span className={classes.total_price}>
                        {(Object.keys(items).length > 0 && products.length > 0) &&
                           products.reduce((acc, el) => {
                              acc += el.price * items[el._id].amount
                              return acc
                           }, 0)
                        }
                        ₴
                     </span>
                  </div>

                  {products.length > 0 &&
                     <Button
                        type={'bigGreen_button'}
                        onClickHandler={onPurchase}
                     >
                        Купить
                     </Button>
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default ShoppingCart