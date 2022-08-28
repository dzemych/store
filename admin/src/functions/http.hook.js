import {useCallback, useState} from "react";


export const useHttp = () => {
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)

   let dbUrl = '/api'

   const requestImg = useCallback
   (async (url,method = 'GET',body = null) => {
      setLoading(true)
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

         setError(null)
         return {blob, imgUrl}
      } catch (e) {
         setError(e)
         throw e
      } finally {
         setLoading(false)
      }
   }, [dbUrl])

   const requestJson = useCallback
   (async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true)
      try {
         const response = await fetch(
            `${dbUrl}${url}`,
            {method, body, headers}
         )
         const data = await response.json()

         if (!response.ok)
            throw new Error(data.message || 'Something went wrong')

         setError(null)
         return data
      } catch (e) {
         setError(e)
         throw e
      } finally {
         setLoading(false)
      }
   }, [dbUrl])

   return {error, requestJson, requestImg, setError, loading}
}