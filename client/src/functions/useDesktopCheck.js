import React from 'react'
import {useMediaQuery} from "react-responsive";


const useDesktopCheck = (props) => {
   return useMediaQuery({minWidth: 520})
}

export default useDesktopCheck