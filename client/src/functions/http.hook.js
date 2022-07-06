import {useCallback, useState} from "react";


export const useHttp = () => {
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)

   const requestImg = useCallback
   (async (url,method = 'GET',body = null) => {
      setLoading(true)

      try {
         const response = await fetch(
            `/api${url}`,
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
         const img = URL.createObjectURL(blob)

         setLoading(false)

         return img
      } catch (e) {
         setLoading(false)
         setError(e)

         throw e
      }
   }, [])

   const requestJson = useCallback
   (async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true)

      try {
         const response = await fetch(
            `/api${url}`,
            {method, body, headers}
         )
         const data = await response.json()

         if (!response.ok)
            throw new Error(data.message || 'Something went wrong')

         setLoading(false)

         return data
      } catch (e) {
         setLoading(false)
         setError(e)

         throw e
      }
   }, [])

   return {loading, error, requestJson, requestImg, setError}
}