import React, {useContext, useEffect, useState} from 'react'
import classes from './SizesTable.module.sass'
import SizeInput from "./SizeInput";
import {useHttp} from "../../functions/http.hook";
import {AuthContext} from "../../context/AuthContext";


const Table = (props) => {

   const { requestJson, loading } = useHttp()
   const { user } = useContext(AuthContext)

   const [forms, setForms] = useState({
      sex: props.sex,
      chest: {
         description: 'Обхват груди',
         xs: '',
         s: '',
         m: '',
         l: '',
         xl: '',
         xxl: ''
      },
      waist: {
         description: 'Обхват талии',
         xs: '',
         s: '',
         m: '',
         l: '',
         xl: '',
         xxl: ''
      },
      hip: {
         description: 'Обхват бедер',
         xs: '',
         s: '',
         m: '',
         l: '',
         xl: '',
         xxl: ''
      }
   })
   const [status, setStatus] = useState('idle')

   const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl']
   const types = ['chest', 'waist', 'hip']

   const changeHandler = (e, type, size) => {
      setForms(prev => ({
         ...prev,
         [type]: {
            ...prev[type],
            [size]: e.target.value
         }
      }))
   }

   const onSubmit = async e => {
      e.preventDefault()
      console.log(forms)

      const method = status === 'loaded' ? 'PATCH' : 'POST'
      const params = forms._id ? forms._id : ''

      const response = await requestJson(
         '/size-table/' + params,
         method,
         JSON.stringify(forms),
         {
            'Authorization': 'Bearer ' + user.token,
            'Content-Type': 'application/json'
         }
      )

      if (response.ok)
         alert(response.message)
   }

   useEffect(() => {
      if (status === 'idle') {
         (async () => {
            const response = await requestJson(
               '/size-table?sex=' + props.sex,
               'GET',
               null,
               {
                  'Authorization': 'Bearer ' + user.token,
                  'Content-Type': 'application/json'
               }
            )

            if (response.status === 'success' && response.results > 0) {
               setStatus('loaded')
               setForms(response.data[0])
            }
         })()
      }
   }, [requestJson, status])

   return (
      <div className={classes.table_container}>
         <h3>{props.sex}</h3>

         <table>
            <tr>
               <th>Размеры</th>

               {sizes.map((el, i) => (
                  <th key={el + '_' + i}>
                     {el.toUpperCase()}
                  </th>
               ))}
            </tr>

            {types.map((type, i) => (
               <tr key={i}>
                  <th>{type}</th>

                  {sizes.map((el, i) => (
                     <td key={`${el}_${i}`}>
                        <SizeInput
                           value={forms[type][el]}
                           onChange={e => changeHandler(e, type, el)}
                        />
                     </td>
                  ))}
               </tr>
            ))}
         </table>

         <button
            onClick={onSubmit}
            className={classes.submit_btn}
            disabled={loading}
         >
            Change
         </button>
      </div>
   )
}

export default Table