import {useCallback, useRef, useState} from "react";
import {useSelector} from "react-redux";


export const useHttp = () => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const dbUrl = useSelector(state => state.app.dbUrl)

   // const dbUrl = useRef("http://localhost:5000/api")

   const requestImg = useCallback
   (async (
      url,
      method = 'GET',
      body = null,
      headers = {}
      ) => {

      setLoading(true)

      try {
         const response = await fetch(
            `${dbUrl}${url}`,
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
            `${dbUrl}${url}`,
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

         throw e
      }
   }, [])

   return {loading, error, requestJson, requestImg}
}