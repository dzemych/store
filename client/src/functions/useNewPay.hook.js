import React, {useCallback, useMemo, useState} from 'react'

const useNewPay = (props) => {
   const [error, setError] = useState('')
   const [regions, setRegions] = useState([])

   const makeRequest = async params => {
      const response = await fetch(
         'https://api.novaposhta.ua/v2.0/json/',
         {
            method: 'POST',
            body: JSON.stringify({
               apiKey: '89f016a5da4199489aa559ba1d6bd52d',
               modelName: "Address",
               ...params
            }),
            headers: {'Content-Type': 'application/json'}
         })

      const data = await response.json()

      if (!response.ok)
         throw data

      return data
   }

   const loadRegions = useCallback(async () => {
      try {
         const data = await makeRequest({
            calledMethod: "getAreas",
            methodProperties: {}
         })

         const regions = data.data.map(el => el.DescriptionRu)
         setRegions(regions)
      } catch (e) {
         setError(e)
      }
   }, [])

   return {error, loadRegions, regions}
}

export default useNewPay