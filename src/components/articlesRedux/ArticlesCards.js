import React, { useEffect, useCallback,useState } from 'react';

import { useDispatch} from 'react-redux';

import { fetchArticlesPag  } from '../../features/articleSlice'; 

import ArticlesCardsAffiche from './ArticlesCardsAffiche';

// npm install react-responsive-pagination
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const CardsList = () => {

  const dispatch = useDispatch();


      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
 
      const cardsFetch = useCallback(() => {
        const mesParams={
          currentPage:currentPage,
          itemsPerPage:itemsPerPage
        };
        dispatch(fetchArticlesPag(mesParams));
      }, [currentPage,dispatch])
    
      useEffect(() => {
        cardsFetch()
      }, [cardsFetch])

 


  return (
<>
<ArticlesCardsAffiche />
<ResponsivePagination
      current={currentPage}
      total={itemsPerPage}
      onPageChange={setCurrentPage}
    />
</>
 

  );

};

 

export default CardsList;