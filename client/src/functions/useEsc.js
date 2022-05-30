import React, {useCallback, useEffect} from 'react'


const useEsc = (callback) => {
   const onEscape = useCallback(e => {
      if (e.key === 'Escape')
         callback()
   }, [])

   useEffect(() => {
      document.addEventListener('keyup', onEscape, false)

      return () => {
         document.removeEventListener('keyup', onEscape, false)
      }
   }, [])
}

export default useEsc