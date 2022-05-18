import React from 'react'
import Review from "./ProductFiller/Review";
import Ratings from "./ProductFiller/Ratings";
import Questions from "./ProductFiller/Questions";
import LeaveRecord from "./ProductFiller/LeaveRecord";


const ProductFiller = (props) => {
   switch (props.page) {
      case 'review':
         return <Review/>
      case 'ratings':
         return <Ratings/>
      case 'questions':
         return <Questions/>
      case 'leaveRating':
         return <LeaveRecord title={props.title} type={'rating'}/>
      case 'askQuestion':
         return <LeaveRecord title={props.title} type={'question'}/>

      default: return <Review title={props.title}/>
   }
}

export default ProductFiller