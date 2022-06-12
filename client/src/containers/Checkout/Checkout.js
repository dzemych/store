import React, {useEffect, useMemo, useState} from 'react'
import classes from './Checkout.module.sass'
import smallLogo from '../../img/small-logo.png'
import wideLogo from '../../img/tan-dem-wide-logo.png'
import Input from "../../forms/Input/Input";
import useForms from "../../functions/forms.hook";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useHttp} from "../../functions/http.hook";
import ProductItem from "./ProductItem";
import DeliveryInputs from "./DeliveryInputs";
import Button from "../../forms/Button/Button";
import useNewPay from "../../functions/useNewPay.hook";
import {fetchCreatePurchase} from "../../redux/purchase/purchaseActions";
import {setStatus} from "../../redux/purchase/purchaseReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";


const Checkout = (props) => {

   const checkout = useSelector(state => state.purchase.checkout)
   const status = useSelector(state => state.purchase.status)

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const {requestJson} = useHttp()
   const {loadCities, cities, setCities, loadBranches, branches} = useNewPay()

   const [delivery, setDelivery] = useState('pickup')
   const [location, setLocation] = useState('')
   const [branch, setBranch] = useState('')
   const [deliveryError, setDeliveryError] = useState('')

   const [products, setProducts] = useState([])

   const totalPrice = useMemo(() => {
      let price = 0

      if (Object.keys(checkout) && products.length > 0)
         price = products.reduce((acc, el) => {
            acc = acc + (el.price * checkout[el._id].amount)
            return acc
         }, 0)

      return price
   }, [products, checkout])

   const totalAmount = useMemo(() => {
      let amount = 0

      if (Object.keys(checkout))
         amount = Object.keys(checkout).reduce((acc, el) => {
            acc = acc + checkout[el].amount
            return acc
         }, 0)

      return amount
   }, [checkout])

   const {form, changeHandler, error, checkValidity} = useForms({
      name: '',
      surname: '',
      email: '',
      tel: 380
   })

   const methodHandler = val => {
      setDelivery(val)
   }

   const locationHandler = e => {
      setLocation(e.target.value)
   }

   const branchHandler = e => {
      setBranch(e.target.value)
   }

   const checkDelivery = () => {
      let error = ''

      if (!cities) {
         error = 'Что то пошло не так...'
      } else {
         const curCity = cities.find(city => city.name === location)

         // If no correct city
         if (!curCity && !error) {
            error = 'Выберете ваш город'
         } else {
            const curBranch = branches.find(el => el.address === branch)

            // If no correct branch, two options:
            if (!curBranch && !error) {

               // If city has a branch but invalid
               if ((+curCity.isBranch) && !error) {
                  error = 'Выберете отделение'
               } else {

                  // If city has no branch
                  if (branch.length < 5 && !error)
                     error = 'Напишите свой адрес'
               }

            }

         }
      }

      return error
   }

   const submitHandler = () =>   {
      let formError = checkValidity()

      if (!formError) {
         const products = Object.keys(checkout).reduce((acc, id) => {
            acc.push({
               id,
               amount: checkout[id].amount,
               size: checkout[id].size
            })

            return acc
         }, [])

         if (delivery === 'delivery') {
            const locationError = checkDelivery()

            if (!locationError) {
               if (+cities.find(city => city.name === location).isBranch) {
                  dispatch(fetchCreatePurchase({
                     user: {
                        ...form,
                        tel: +form.tel.replace(/(\+|\s)/g, '')
                     },
                     products,
                     deliveryType: delivery,
                     deliveryAddress: {
                        city: location,
                        address: branch
                     }
                  }))
               } else {
                  dispatch(fetchCreatePurchase({
                     user: {
                        ...form,
                        tel: +form.tel.replace(/(\+|\s)/g, '')
                     },
                     products,
                     deliveryType: 'courier',
                     deliveryAddress: {
                        city: location,
                        address: branch
                     }
                  }))
               }

               setDeliveryError('')
            } else {
               setDeliveryError(locationError)
            }

         } else {
            dispatch(fetchCreatePurchase({
               user: {
                  ...form,
                  tel: +form.tel.replace(/(\+|\s)/g, '')
               },
               products,
               deliveryType: delivery
            }))
         }
      }
   }

   const inputsArr = [
      {
         type: 'text',
         title: 'Имя',
         placeholder: '',
         value: form.name,
         onChange: (val) => {changeHandler(val, 'name')},
         error: error.name
      },
      {
         type: 'text',
         title: 'Фамилия',
         placeholder: '',
         value: form.surname,
         onChange: (val) => {changeHandler(val, 'surname')},
         error: error.surname
      },
      {
         type: 'email',
         title: 'Электронная почта',
         placeholder: '',
         value: form.email,
         onChange: (val) => {changeHandler(val, 'email')},
         error: error.email
      },
      {
         type: 'tel',
         title: 'Мобильный телефон',
         placeholder: '',
         value: form.tel,
         onChange: (val) => {changeHandler(val, 'tel')},
         error: error.tel
      },
   ]

   useEffect(() => {
      if (Object.keys(checkout).length < 1)
         navigate('/shopping-cart')
   }, [])

   useEffect(() => {
      (async () => {
         // 1) Get products
         const data = await requestJson(
            '/product/getProducts',
            'POST',
            JSON.stringify({products: Object.keys(checkout)}),
            {'Content-Type': 'application/json'}
         )
         setProducts(data.products)
      })()
   }, [])

   useEffect(() => {
      return () => {
         dispatch(setStatus('idle'))
      }
   }, [])

   if (status === 'success') {
      return (
         <div className={classes.success_container}>
            <FontAwesomeIcon icon={faCircleCheck}/>

            <span>
               Ваша покупка успешно совершена. В течении дня
               менеджер свяжиться с вами для уточнение деталей.
            </span>

            <div className={classes.success_btn_container}>
               <Button
                  type={'wideBlue_button'}
                  onClickHandler={() => navigate('/')}
               >
                  Продолжить покупки
               </Button>
            </div>
         </div>
      )
   } else {
      return (
         <div className={classes.container}>
            <div className={classes.wrapper}>
               <div className={classes.topBar_logo_container}>
                  <div className={classes.smallLogo_container}>
                     <img src={smallLogo} alt=""/>
                  </div>

                  <div className={classes.wideLogo_container}>
                     <img src={wideLogo} alt=""/>
                  </div>
               </div>

               <hr className={classes.topBar_hr}/>

               <h1 className={classes.orderDetails_title}>
                  Оформление заказа
               </h1>

               <div className={classes.data_wrapper}>
                  <div className={classes.order_body}>
                     <div className={classes.details_container}>
                        <div className={classes.contact_data_container}>
                           <h2 className={classes.section_title}>
                              Ваши контактные данные
                           </h2>

                           <div className={classes.contact_form}>
                              <div className={classes.userNames_container}>
                                 {inputsArr.slice(0, -2).map((el, i) => (
                                    <Input
                                       key={`${el.type}_${i}`}
                                       type={el.type}
                                       title={el.title}
                                       placeholder={el.placeholder}
                                       value={el.value}
                                       error={el.error}
                                       onChange={el.onChange}
                                    />
                                 ))}
                              </div>

                              {inputsArr.slice(-2).map((el, i) => (
                                 <Input
                                    key={`${el.type}_${i}`}
                                    type={el.type}
                                    title={el.title}
                                    placeholder={el.placeholder}
                                    value={el.value}
                                    error={el.error}
                                    onChange={el.onChange}
                                 />
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className={classes.products_container}>
                        <div className={classes.products_title}>
                           <h2 className={classes.section_title}>
                              Вашы заказы
                           </h2>

                           <span onClick={() => navigate('/shopping-cart')}>
                              Редактировать
                           </span>
                        </div>

                        <div className={classes.products_list}>
                           {products.map((el, i) => (
                              <ProductItem
                                 key={el.slug + '_' + i}
                                 img={el.mainPhoto}
                                 slug={el.slug}
                                 mainPhoto={el.mainPhoto}
                                 title={el.title}
                                 id={el._id}
                                 price={el.price}
                                 amount={checkout[el._id].amount}
                                 size={checkout[el._id].size}
                              />
                           ))}
                        </div>

                        <div className={classes.totalPrice_container}>
                        <span>
                           Итого: {totalPrice} ₴
                        </span>
                        </div>
                     </div>

                     <hr className={classes.delivery_hr}/>

                     <div className={classes.delivery_container}>
                        <h2 className={classes.section_title}>
                           Выберете способ доставки
                        </h2>

                        <DeliveryInputs
                           loadCities={loadCities}
                           cities={cities}
                           setCities={setCities}
                           loadBranches={loadBranches}
                           branches={branches}
                           delivery={delivery}
                           location={location}
                           branch={branch}
                           setBranch={setBranch}
                           methodHandler={methodHandler}
                           locationHandler={locationHandler}
                           branchHandler={branchHandler}
                           error={deliveryError}
                        />
                     </div>
                  </div>

                  <div className={classes.submit_container}>
                     <h2>Итого</h2>

                     <div className={classes.submit_data}>
                        <div className={classes.total_container}>
                           <span className={classes.total_left}>
                              {totalAmount} товара на сумму
                           </span>

                           <span className={classes.total_right}>
                              {totalPrice} ₴
                           </span>
                        </div>

                        <div className={classes.total_container}>
                           <span className={classes.total_left}>
                              Стоимосить доставки
                           </span>

                           <span className={classes.total_right}>
                              {delivery === 'pickup'
                                 ? 'Бесплатно'
                                 : 'По тарифам перевозчика'
                              }
                           </span>
                        </div>
                     </div>

                     <hr className={classes.total_hr}/>

                     <div className={classes.toPay_container}>
                        <span className={classes.total_left}>
                           К оплате
                        </span>

                        <span className={classes.payPrice}>
                           {totalPrice} ₴
                        </span>
                     </div>

                     <div className={classes.submit_btn_container}>
                        <Button
                           type={'wideBlue_button'}
                           onClickHandler={submitHandler}
                        >
                           Потвердить покупку
                        </Button>
                     </div>
                  </div>
               </div>

               <hr className={classes.last_hr}/>
            </div>
         </div>
      )
   }
}

export default Checkout