import {useCallback, useEffect} from 'react'


const useEsc = (callback) => {
   const onEscape = useCallback(e => {
      if (e.key === 'Escape')
         callback()
   }, [callback])

   useEffect(() => {
      document.addEventListener('keyup', onEscape, false)

      return () => {
         document.removeEventListener('keyup', onEscape, false)
      }
   }, [onEscape])
}

export default useEsc