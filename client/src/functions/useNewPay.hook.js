import React, {useCallback, useEffect, useMemo, useState} from 'react'

const useNewPay = (props) => {
   const [error, setError] = useState('')

   const [cities, setCities] = useState([])
   const [branches, setBranches] = useState([])

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

   const loadCities = useCallback(async name => {
      try {
         const data = await makeRequest({
            calledMethod: "getCities",
            methodProperties: {
               FindByString: name
            }
         })

         const cities = data.data.reduce((acc, el) => {
            acc.push({name: el.Description, isBranch: el.IsBranch})
            return acc
         }, [])

         setCities(cities)
      } catch (e) {
         setError(e)
      }
   }, [])

   const loadBranches = useCallback(async name => {
      try {
         const data = await makeRequest({
            calledMethod: "getWarehouses",
            methodProperties: {
               CityName: name
            }
         })

         const branches = data.data.reduce((acc, el) => {
            if (!(/Поштомат/i.test(el.Description)))
               acc.push({address: el.Description, ref: el.Ref})

            return acc
         }, [])

         setBranches(branches)
      } catch (e) {
         setError(e)
      }
   }, [])

   return {loadCities, cities, setCities, loadBranches, branches}
}

export default useNewPay