import React, { useEffect, useCallback,useState } from 'react';

import { useDispatch} from 'react-redux';

import { fetchArticlesPag  } from '../../features/articleSlice'; 

import ArticlesCardsAffiche from './ArticlesCardsAffiche'

const CardsList = () => {

  const dispatch = useDispatch();


      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
 
      const cardsFetch = useCallback(() => {
        const mesParams={
          currentPage:currentPage,
          itemsPerPage:itemsPerPage
        };
        dispatch(fetchArticlesPag(mesParams));
      }, [dispatch])
    
      useEffect(() => {
        cardsFetch()
      }, [cardsFetch])

 


  return (

  <ArticlesCardsAffiche />

  );

};

 

export default CardsList;