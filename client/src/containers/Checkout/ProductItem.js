import React from 'react'
import classes from './Checkout.module.sass'
import defaultPhoto from '../../img/no-image.png'


const ProductItem = (props) => {

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

    return(
        <div className={classes.product_item}>
            <div className={classes.product_topBar}>
                <div className={classes.product_img_container}>
                    <img src={defaultPhoto} alt=""/>
                </div>

                <div className={classes.product_title_container}>
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