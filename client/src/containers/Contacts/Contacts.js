import React from 'react'
import classes from './Contacts.module.sass'
import GoogleMapReact, {Location} from 'google-maps-react'


const location = {
   address: '1600 Amphitheatre Parkway, Mountain View, california.',
   lat: 37.42216,
   lng: -122.08427,
}

const Contacts = (props) => {
   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h1 className={classes.title}>
               Our contacts
            </h1>

            <hr className={classes.hr}/>

            <div className={classes.contacts_container}>
               <div className={classes.contact_person}>
                  <div className={classes.leftBar}>
                     <span>Name:</span>
                     <span>Number:</span>
                     <span>Email:</span>
                     <span>Instagram:</span>
                  </div>

                  <div className={classes.rightBar}>
                     <span>Tatyana</span>
                     <span>+380509008875</span>
                     <span>tanya16khm@gmail.com</span>
                     <span>tania_dzemich</span>
                  </div>
               </div>
            </div>

            <hr className={classes.hr}/>

            <div className={classes.address}>
               <div className={classes.address_info}>
                  <div className={classes.leftBar}>
                     <span>Address:</span>
                  </div>

                  <div className={classes.rightBar}>
                     <span>Вулиця свободи 9а</span>
                  </div>
               </div>

               <GoogleMapReact
                  bootstrapURLKeys={{ key: '' }}
                  defaultCenter={location}
                  defaultZoom={15}
               >
               </GoogleMapReact>
            </div>
         </div>
      </div>
   )
}

export default Contacts