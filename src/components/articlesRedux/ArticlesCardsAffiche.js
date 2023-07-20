import React from 'react';

import {  useSelector } from 'react-redux';


const CardsList = () => {

    const {articles,isLoading,error} = useSelector((state)=>state.storearticles);
 
   return (

   <>
   {
    articles.map((pro)=>{
      return  <div key={pro._id}>{pro.designation}</div>
    })
   }
   </>

  );

};

 

export default CardsList;