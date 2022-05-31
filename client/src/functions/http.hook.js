import {useCallback, useState} from "react";
import {useSelector} from "react-redux";


export const useHttp = () => {
   const [error, setError] = useState('')

   const dbUrl = useSelector(state => state.app.dbUrl)

   const requestImg = useCallback
   (async (url,method = 'GET',body = null) => {
      try {
         const response = await fetch(
            `${dbUrl}${url}`,
            {
               method,
               body,
               headers: {
                  referrerPolicy: 'no-referrer-when-downgrade',
                  contentType: 'image/jpeg'
               }}
            )

         if (!response.ok)
            throw new Error(response.message || 'Something went wrong')

         const blob = await response.blob()
         const img = URL.createObjectURL(blob)

         return img
      } catch (e) {
         setError(e)
         return e
      }
   }, [dbUrl])

   const requestJson = useCallback
   (async (url, method = 'GET', body = null, headers = {}) => {
      try {
         const response = await fetch(
            `${dbUrl}${url}`,
            {method, body, headers}
         )
         const data = await response.json()

         if (!response.ok)
            throw new Error(data.message || 'Something went wrong')

         return data
      } catch (e) {
         setError(e)
      }
   }, [dbUrl])

   return {error, requestJson, requestImg, setError}
}