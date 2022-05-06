import React, {useState} from 'react'
import classes from './Search.module.sass'


const Search = (props) => {
   const [value, setValue] = useState('')


   const onChange = (e) => {
      setValue(e.target.value)
   }

   return (
      <div className={classes.container}>
         <form className={classes.main_input}>
            <input
               type="text"
               placeholder='Я ищу...'
               onChange={onChange}
               value={value}
            />
         </form>
      </div>
   )
}

export default Search