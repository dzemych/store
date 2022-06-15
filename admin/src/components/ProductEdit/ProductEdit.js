import React, {useContext, useEffect, useRef, useState} from 'react'
import classes from './ProductEdit.module.sass'
import useForms from "../../functions/forms.hook";
import Input from "../../forms/Input/Input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faHouse, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import slugify from "slugify";
import {useHttp} from "../../functions/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";


const CreateProduct = (props) => {

   const navigate = useNavigate()

   const auth = useContext(AuthContext)

   const {requestJson, requestImg} = useHttp()

   const [duplicateError, setDuplicate] = useState(null)

   const {form, formError, changeHandler, checkValidity} = useForms({
      title: props.title ? props.title : '',
      description: props.description ? props.description : '',
      price: props.price ? props.price : 0,
      sex: props.sex ? props.sex : '',
      category: props.category ? props.category : '',
   })

   const loadPhotoRef = useRef(null)

   const [status, setStatus] = useState('idle')
   const [allCategories, setAllCategories] = useState([])
   const [photos, setPhotos] = useState([])

   const [numSizes, setNumSizes] = useState(() => (
      props.numSizes ? props.numSizes
         : {
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0
         }
   ))

   const [features, setFeatures] = useState(() => (
      props.features ? props.features
         : {
            material: '',
            season: '',
            style: '',
            warrant: ''
         }
   ))

   const [sizeError, setSizeError] = useState('')
   const [featuresError, setFeaturesError] = useState('')

   const changeSize = (val, key) => {
      setNumSizes(prev => ({...prev, [key]: +val}))
   }

   const changeFeatures = (val, key) => {
      setFeatures(prev => ({...prev, [key]: val}))
   }

   const loadPhotoHandler = e => {
      e.preventDefault()

      const photo = loadPhotoRef.current.files[0]

      if (photo)
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

   const uploadProduct = async product => {
      try {
         const url = props.type === 'edit' ? `/product/${props.slug}` : `/product/`
         const method = props.type === 'edit' ? 'PATCH' : 'POST'

         return await requestJson(
            url, method, JSON.stringify(product),
            {
               'Content-Type' : 'application/json',
               'Authorization': 'Bearer ' + auth.user.token
            }
         )
      } catch (e) {
         if (e.message.includes('E11000')) {
            setDuplicate('This product name has already been used')
         }

         console.log(e)
         return e.message
      }
   }

   const uploadPhotos = async (photoFiles, slug) => {
      try {
         const oldSlug = props.slug ? props.slug : slug

         const form = new FormData()
         photoFiles.forEach(el => {
            form.append('photos', el)
         })

         return await requestJson(
            '/product/uploadPhotos/' + oldSlug.toLowerCase(),
            'POST',
            form,
            {'Authorization': 'Bearer ' + auth.user.token}
         )
      } catch (e) {
         console.log(e)
         return e.message
      }
   }

   const goBack = () => {
      navigate(-1)
   }

   const onSubmit = async () => {
      const formError = checkValidity()
      const sizesError = checkSizes()
      const featuresError = checkFeature()

      if (!formError && !sizesError && !featuresError) {
         const product = {
            ...form,
            title: form.title.trimEnd().trimStart(),
            numSizes,
            features,
            mainPhoto: '',
            photos: []
         }

         const slug = slugify(form.title)
         let photoFiles = []

         // If there are photos add them to product
         if (photos.length > 0) {
            photoFiles = photos.map((el, i) => {
               const type = el.file.type.split('/')[1]

               return new File(
                  [el.file],
                  `${slug}-${i + 1}.${type}`,
                  {type: el.file.type}
               )
            })

            const photoNames = photos.map((el, i) => {
               const type = el.file.type.split('/')[1]

               return `${slug}-${i + 1}.${type}`
            })

            product.mainPhoto = photoNames[0]
            product.photos = photoNames
         }

         const productResponse = await uploadProduct(product)
         const photoResponse = await uploadPhotos(photoFiles, slug)

         if (productResponse.status === 'success' && photoResponse.status === 'success')
            setStatus('success')
      }
   }

   useEffect(() => {
      (async () => {
         const data = await requestJson(
            '/product/allCategories'
         )

         if (data) {
            const sex = Object.keys(data.categories)
            const categories = sex.reduce((acc, el) => {
               acc = acc.concat(data.categories[el])
               return acc
            }, [])

            const uniques = categories.filter((el, index, arr) => (
               arr.indexOf(el) === index
            ))

            setAllCategories(uniques)
         }
      })()
   }, [])

   useEffect(() => {
      if ((props.photos && props.photos.length > 0) && props.slug) {
         (async () => {
            const promises = props.photos.map(el => {
               return requestImg(
                  `/img/product/${props.slug}/${el}`
               )
            })

            const data = await Promise.all(promises)

            const productPhotos = data.map((el, i) => {
               const file = new File([el.blob], `${props.slug}-${i + 1}`, {
                  type: el.blob.type
               })

               return {
                  file, name: el.imgUrl
               }
            })

            setPhotos(productPhotos)
         })()
      }
   }, [props.photos, props.slug])

   if (status === 'success') {
      return (
         <div className={classes.success_container}>
            <h1 className={classes.success_title}>
               {props.type === 'edit'
                  ? 'Product was successfully updated'
                  : 'Product was successfully created'
               }
            </h1>

            <button
               className={classes.goBack_btn}
               onClick={goBack}
            >
               Go back
            </button>
         </div>
      )
   } else {
      return (
         <div className={classes.inputs_list}>
            {props.type === 'edit' &&
               <span className={classes.goBack} onClick={goBack}>
                  Go back
               </span>
            }

            <div className={classes.input_container}>
               <Input
                  type={'text'}
                  title={'Product title'}
                  value={form.title}
                  onChange={value => changeHandler(value, 'title')}
                  placeholder={'Title'}
                  error={formError.title || duplicateError}
               />
            </div>

            <div className={classes.input_container}>
               <Input
                  type={'number'}
                  title={'Product price'}
                  value={form.price}
                  onChange={value => changeHandler(value, 'price')}
                  placeholder={'Product price'}
                  error={formError.price}
               />
            </div>

            <div className={classes.description_container}>
               <label htmlFor="description_input">
                  Product description
               </label>

               <textarea
                  value={form.description}
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
                        value={'мужчины'}
                        className={classes.sex_option}
                     >
                        Мужчины
                     </option>

                     <option
                        value={'женщины'}
                        className={classes.sex_option}
                     >
                        Женщины
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
                     {allCategories.length > 0 &&
                        allCategories.map((selectEl, i) => (
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
                        onChange={value => changeSize(value, el)}
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
                     onChange={value => changeFeatures(value, el)}
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
                        key={el.name + '_' + i}
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

               {photos.length < 10 &&
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
               }
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
}

export default CreateProduct