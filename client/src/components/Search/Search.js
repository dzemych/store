import React, {useState} from 'react'
import classes from './Search.module.sass'


const Search = (props) => {
   const [value, setValue] = useState('')

   const onChange = (e) => {
      setValue(e.target.value)
      // Make find request
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
            {/*<button>Find</button>*/}
         </form>
      </div>
   )
}

export default Search