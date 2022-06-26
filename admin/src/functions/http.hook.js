import {useCallback, useState} from "react";


export const useHttp = () => {
   const [error, setError] = useState('')

   const dbUrl = 'https://tandem.km.ua:443/api'

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
                  contentType: 'image/*'
               }}
         )

         if (!response.ok)
            throw new Error(response.message || 'Something went wrong')

         const blob = await response.blob()
         const imgUrl = URL.createObjectURL(blob)

         return {blob, imgUrl}
      } catch (e) {
         setError(e)
         throw e
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
         throw e
      }
   }, [dbUrl])

   return {error, requestJson, requestImg, setError}
}