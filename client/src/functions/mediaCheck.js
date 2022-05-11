import React from "react";
import MediaQuery from "react-responsive";


export const Desktop = ({children}) => (
   <MediaQuery minWidth={1024}>
      {children}
   </MediaQuery>
)

export const Laptop = ({children}) => (
   <MediaQuery minWidth={768}>
      {children}
   </MediaQuery>
)

export const Tablet = ({children}) => (
   <MediaQuery minWidth={425}>
      {children}
   </MediaQuery>
)

export const Phone = ({children}) => (
   <MediaQuery maxWidth={425}>
      {children}
   </MediaQuery>
)