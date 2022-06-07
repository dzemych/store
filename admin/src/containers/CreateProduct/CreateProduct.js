import React from 'react'
import classes from "./CreateProduct.module.sass"
import ProductEdit from "../../components/ProductEdit/ProductEdit";


const CreateProduct = (props) => {
   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h1 className={classes.main_title}>Create new product</h1>

            <ProductEdit/>
         </div>
      </div>
   )
}

export default CreateProduct