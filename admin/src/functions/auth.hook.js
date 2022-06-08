import React, {useCallback, useState} from 'react'
import {useHttp} from "./http.hook";


const useAuth = (props) => {
   const {requestJson, error} = useHttp()

   const [user, setUser] = useState(null)

   const login = useCallback(async (email, password) => {
      try {
         const data = await requestJson(
            '/auth/login',
            'POST',
            JSON.stringify({email, password, role: 'admin'}),
            {'Content-Type': 'application/json'}
         )

         setUser(data)
         localStorage.setItem('adminToken', data.token)
      } catch (e) {
         console.log(e)
      }
   }, [])

   const getUser = useCallback(async token => {
      try {
         const data = await requestJson(
            '/user/me',
            'GET',
            null,
            {'Authorization': 'Bearer ' + token}
         )

         console.log(data)
         setUser(data)
      } catch (e) {
         console.log(e)
      }
   }, [])

   const logout = useCallback(() => {
      setUser(null)
      localStorage.removeItem('adminToken')
   }, [])

   return {error, user, login, logout, getUser}
}

export default useAuth