import React, {useState} from 'react'
import classes from './CreateProduct.module.sass'
import useForms from "../../functions/forms.hook";
import Input from "../../forms/Input/Input";


const CreateProduct = (props) => {

   const [numSizes, setNumSizes] = useState({
      xs: 0,
      s: 0,
      m: 0,
      l: 0,
      xl: 0,
      xxl: 0
   })

   const categories = ['hoodie', 'shirt', 't-shirt']

   const [features, setFeatures] = useState({
      material: '',
      season: '',
      style: '',
      warrant: ''
   })

   const {form, setForm, formError, changeHandler, checkValidity} = useForms({
      title: '',
      description: '',
      price: 0,
      sex: '',
      category: '',
   })

   const [sizeError, setSizeError] = useState('')

   const changeSize = (e, key) => {
      setNumSizes(prev => ({...prev, [key]: e.target.value}))
   }

   const changeFeatures = (e, key) => {
      setFeatures(prev => ({...prev, [key]: e.target.value}))
   }

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h1 className={classes.main_title}>Create new product</h1>

            <div className={classes.inputs_list}>
               <div className={classes.input_container}>
                  <Input
                     type={'text'}
                     title={'Product title'}
                     value={form.title}
                     onChange={e => changeHandler(e.taget.value, 'title')}
                     placeholder={'Title'}
                     error={formError.title}
                  />
               </div>

               <div className={classes.input_container}>
                  <Input
                     type={'number'}
                     title={'Product price'}
                     value={form.price}
                     onChange={e => changeHandler(e.target.value, 'price')}
                     placeholder={'Product price'}
                     error={formError.price}
                  />
               </div>

               <div className={classes.description_container}>
                  <label htmlFor="description_input">
                     Product description
                  </label>

                  <textarea
                     value={form.value}
                     onChange={e => changeHandler(e.target.value, 'description')}
                     name="description"
                     id="description_input"
                     rows="6"
                  />

                  {formError &&
                     <span className={classes.form_error}>
                        {formError.error}
                     </span>
                  }
               </div>

               <div className={classes.main_details_container}>
                  <div className={classes.sex_container}>
                     <label htmlFor={'product_sex'}>
                        Select product sex
                     </label>

                     <select
                        id={'product_sex'}
                        value={form.sex}
                        onChange={e => changeHandler(e.target.value, 'sex')}
                        placeholder={'Product sex'}
                     >
                        <option
                           value={'man'}
                           className={classes.sex_option}
                        >Man</option>

                        <option
                           value={'woman'}
                           className={classes.sex_option}
                        >Woman</option>
                     </select>

                     {formError.sex &&
                        <span className={classes.form_error}>
                           {formError.sex}
                        </span>
                     }
                  </div>

                  <div className={classes.category_container}>
                     <label htmlFor='category_input'>
                        Product category
                     </label>

                     <input
                        type="text"
                        id='category_input'
                        name='category_input'
                        list="category_list"
                        role='combobox'
                        value={form.category}
                        onChange={e => changeHandler(e.target.value, 'category')}
                        placeholder='Product category'
                     />

                     <datalist id='category_list' role='listbox'>
                        {categories.length > 0 &&
                           categories.map((selectEl, i) => (
                              <option value={selectEl} key={i}>
                                 {selectEl}
                              </option>
                           ))
                        }
                     </datalist>

                     {formError.category &&
                        <span className={classes.form_error}>
                           {formError.category}
                        </span>
                     }
                  </div>
               </div>

               <div className={classes.sizes_container}>
                  <h3>Product sizes</h3>

                  <div className={classes.sizes_list}>
                     {Object.keys(numSizes).map((el, i) => (
                        <Input
                           type={'number'}
                           key={i}
                           value={numSizes[el]}
                           onChange={e => changeSize(e, el)}
                           title={el.toUpperCase()}
                        />
                     ))}
                  </div>

                  {sizeError &&
                     <span className={classes.size_error}>
                        {sizeError}
                     </span>
                  }
               </div>

               <div className={classes.features_container}>
                  {Object.keys(features).map((el, i) => (
                     <Input
                        type={'text'}
                        value={features[el]}
                        onChange={e => changeFeatures(e, el)}
                        title={el.slice(0, 1).toUpperCase() + el.slice(1)}
                     />
                  ))}
               </div>

               <div className={classes.photos_container}>

               </div>
            </div>
         </div>
      </div>
   )
}

export default CreateProduct