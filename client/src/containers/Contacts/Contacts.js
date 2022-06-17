import React from 'react'
import classes from './Contacts.module.sass'
import Map, {Marker} from 'react-map-gl'
import pin from '../../img/pin.png'
import 'mapbox-gl/dist/mapbox-gl.css';
import '../basicStyles.sass'


const Contacts = (props) => {
   return (
      <div className={'container'}>
         <div className={'wrapper'}>
            <h1 className={'title'}>
               Наши контакты
            </h1>

            <hr className={classes.hr}/>

            <div className={classes.contacts_container}>
               <div className={classes.contact_person}>
                  <div className={classes.leftBar}>
                     <span>Имя:</span>
                     <span>Номер:</span>
                     <span>Имейл:</span>
                     <span>Инстаграм:</span>
                  </div>

                  <div className={classes.rightBar}>
                     <span>Татьяна</span>
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
                     <span>Адрес:</span>
                  </div>

                  <div className={classes.rightBar}>
                     <span>Вулиця свободи 9а</span>
                  </div>
               </div>

               <Map
                  mapboxAccessToken='pk.eyJ1IjoiZHplbXljaCIsImEiOiJjbDB6cjRramwyNjV4M2lubWtzdjU2ejIyIn0.53BxV3A_eVL8B8TTQMUNZA'
                  initialViewState={{
                     longitude: 27.001403,
                     latitude: 49.435459,
                     zoom: 16
                  }}
                  style={{
                     width: "100%",
                     height: "40vh",
                  }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
               >
                  <Marker
                     longitude={27.001403}
                     latitude={49.435459}
                     anchor="bottom"
                  >
                     <img src={pin} alt='!'/>
                  </Marker>
               </Map>
            </div>
         </div>
      </div>
   )
}

export default Contacts