import {useCallback, useRef, useState} from "react";


export const useHttp = () => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const dbUrl = useRef("http://localhost:5000/api")

   const getImg = useCallback
   (async (
      url,
      method = 'GET',
      body = null,
      headers = {}
      ) => {

      setLoading(true)

      try {
         const response = await fetch(
            `${dbUrl.current}${url}`,
            {method, body, headers}
            )

         if (!response.ok)
            throw new Error(response.message || 'Something went wrong')

         setLoading(false)

         return response
      } catch (e) {
         setError(e)
         setLoading(true)

         return e
      }
   }, [])

   const requestJson = useCallback
   (async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true)

      try {
         const response = await fetch(
            `${dbUrl.current}${url}`,
            {method, body, headers}
         )
         const data = response.json()

         if (!response.ok)
            throw new Error(data.message || 'Something went wrong')

         setLoading(false)

         return data
      } catch (e) {
         setError(e)
         setLoading(true)

         return e
      }
   }, [])

   return {loading, error, requestJson, getImg}
}