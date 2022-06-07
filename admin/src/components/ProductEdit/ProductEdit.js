import React, {useEffect, useRef, useState} from 'react'
import classes from './ProductEdit.module.sass'
import useForms from "../../functions/forms.hook";
import Input from "../../forms/Input/Input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faHouse, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import slugify from "slugify";


const CreateProduct = (props) => {

   const loadPhotoRef = useRef(null)

   const [photos, setPhotos] = useState([])

   const [numSizes, setNumSizes] = useState({
      xs: 0,
      s: 0,
      m: 0,
      l: 0,
      xl: 0,
      xxl: 0
   })

   const [features, setFeatures] = useState({
      material: '',
      season: '',
      style: '',
      warrant: ''
   })

   const categories = ['hoodie', 'shirt', 't-shirt']

   const {form, formError, changeHandler, checkValidity} = useForms({
      title: '',
      description: '',
      price: 0,
      sex: '',
      category: '',
   })

   const [sizeError, setSizeError] = useState('')
   const [featuresError, setFeaturesError] = useState('')

   const changeSize = (e, key) => {
      setNumSizes(prev => ({...prev, [key]: e.target.value}))
   }

   const changeFeatures = (e, key) => {
      setFeatures(prev => ({...prev, [key]: e.target.value}))
   }

   const loadPhotoHandler = e => {
      e.preventDefault()

      const photo = loadPhotoRef.current.files[0]

      setPhotos(prev => [...prev, {name: URL.createObjectURL(photo), file: photo}])
   }

   const inputClick = () => {
      loadPhotoRef.current.click()
   }

   const deletePhotoHandler = index => {
      setPhotos(prev => prev.filter((el, i) => i !== index))
   }

   const shiftPhotoHandler = index => {
      setPhotos(prev => prev.reduce((acc, el, i) => {
         if (index - 1 === i) {
            acc.push(prev[index])
         } else if (index === i) {
            acc.push(prev[index - 1])
         } else {
            acc.push(prev[i])
         }

         return acc
      }, []))
   }

   const firstPhotoHandler = photo => {
      console.log(photo)
      const arr = [...photos]

      const newArr = arr.sort((a, b) =>
         a === photo ? -1
            : b === photo ? 1
            : 0
      )

      setPhotos(newArr)
   }

   const checkSizes = () => {
      const amount = Object.keys(numSizes).reduce((acc, key) => {
         acc = acc + (+numSizes[key])
         return acc
      }, 0)

      if (amount < 1) {
         setSizeError('Product must have at least one available size')
         return true
      }

      setSizeError('')
      return false
   }

   const checkFeature = () => {
      if (!features.material) {
         setFeaturesError('You must specify at least product material')
         return true
      }

      setFeaturesError('')
      return false
   }

   const onSubmit = async () => {
      const formError = checkValidity()
      const sizesError = checkSizes()
      const featuresError = checkFeature()

      if (!formError && !sizesError && !featuresError) {
         const product = {
            ...form,
            numSizes,
            features
         }

         if (photos.length > 0) {
            const slug = slugify(form.title)

            const photoFiles = photos.map((el, i) => {
               const type = el.file.name.split('.')[1]

               return new File(
                  [el.file],
                  `${slug}-${i + 1}.${type}`,
                  {type: el.file.type}
               )
            })

            const photoNames = photos.map((el, i) => {
               const type = el.file.name.split('.')[1]

               return `${slug}-${i + 1}.${type}`
            })

            product.mainPhoto = photoNames[0]
            product.photos = photoNames
         }

         console.log(product)

      }
   }

   return (
      <div className={classes.inputs_list}>
         <div className={classes.input_container}>
            <Input
               type={'text'}
               title={'Product title'}
               value={form.title}
               onChange={e => changeHandler(e.target.value, 'title')}
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
                        {formError.description}
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
                  <option value="">
                     ---select sex---
                  </option>

                  <option
                     value={'man'}
                     className={classes.sex_option}
                  >
                     Man
                  </option>

                  <option
                     value={'woman'}
                     className={classes.sex_option}
                  >
                     Woman
                  </option>
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
               <span className={classes.form_error}>
                     {sizeError}
                  </span>
            }
         </div>

         <div className={classes.features_container}>
            {Object.keys(features).map((el, i) => (
               <Input
                  key={i}
                  type={'text'}
                  value={features[el]}
                  onChange={e => changeFeatures(e, el)}
                  title={el.slice(0, 1).toUpperCase() + el.slice(1)}
               />
            ))}

            {featuresError &&
               <span className={classes.form_error}>
                        {featuresError}
                     </span>
            }
         </div>

         <div className={classes.photos_container}>
            <h3 className={classes.photos_title}>Upload your photos</h3>

            <div className={classes.photos_list}>
               {photos.map((el, i) => (
                  <div
                     key={i}
                     className={classes.photo_item}
                  >
                     <div className={classes.photo_hover}>
                        {i !== 0 &&
                           <>
                              <FontAwesomeIcon
                                 icon={faHouse}
                                 onClick={() => firstPhotoHandler(el)}
                              />
                              <FontAwesomeIcon
                                 icon={faArrowLeft}
                                 onClick={() => shiftPhotoHandler(i)}
                              />
                           </>
                        }

                        <FontAwesomeIcon
                           icon={faTrash}
                           onClick={() => deletePhotoHandler(i)}
                        />
                     </div>

                     <img src={el.name} alt=""/>
                  </div>
               ))}
            </div>

            <div
               className={classes.addPhoto_input}
               onClick={inputClick}
            >
               <input
                  type="file"
                  accept="image/*"
                  ref={loadPhotoRef}
                  onChange={e => loadPhotoHandler(e)}
               />

               <FontAwesomeIcon
                  icon={faPlus}
               />
            </div>
         </div>

         <div className={classes.submit_container}>
            <button
               onClick={onSubmit}
            >
               Submit
            </button>
         </div>
      </div>
   )
}

export default CreateProduct