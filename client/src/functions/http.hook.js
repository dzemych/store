import {useCallback, useState} from "react";
import {useSelector} from "react-redux";


export const useHttp = () => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState('')

   const dbUrl = useSelector(state => state.app.dbUrl)

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
         setLoading(false)

         return e
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

         setLoading(false)

         return data
      } catch (e) {
         setError(e)
         setLoading(false)
      }
   }, [dbUrl])

   return {loading, error, requestJson, requestImg, setError}
}