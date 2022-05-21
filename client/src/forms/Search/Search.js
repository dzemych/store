import React from 'react'
import classes from './Search.module.sass'


const Search = (props) => {
   return (
      <div className={classes.container}>
         <form
            className={classes.main_input}
            onSubmit={e => props.onSubmit(e)}
         >
            <input
               type="text"
               placeholder='Я ищу...'
               onChange={props.onChange}
               value={props.value}
               onSubmit={e => props.onSubmit(e)}
            />
         </form>
      </div>
   )
}

export default Search