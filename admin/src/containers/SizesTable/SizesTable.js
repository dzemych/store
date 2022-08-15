import React from 'react'
import classes from './SizesTable.module.sass'
import Table from "./Table";


const SizesTable = (props) => {

   const sex = ['man', 'woman']

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h1>Sizes table</h1>

            {sex.map(el => <Table key={el} sex={el}/>)}
         </div>
      </div>
   )
}

export default SizesTable