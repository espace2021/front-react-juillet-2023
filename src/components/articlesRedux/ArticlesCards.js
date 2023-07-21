import React, { useEffect, useCallback,useState } from 'react';

import { useDispatch, useSelector} from 'react-redux';

import { fetchArticlesPag  } from '../../features/articleSlice'; 

import ArticlesCardsAffiche from './ArticlesCardsAffiche';

import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CardsList = () => {

  const dispatch = useDispatch();

  const {tot} = useSelector((state)=>state.storearticles);

      const [currentPage, setCurrentPage] = useState(1);
    
      const itemsPerPage = 6
     

const [filtre, setFiltre] = useState("");

        const cardsFetch = useCallback(() => {
        const mesParams={
          filtre :filtre,
          currentPage:currentPage,
          itemsPerPage:itemsPerPage
        };
        dispatch(fetchArticlesPag(mesParams));
  
      }, [currentPage,dispatch,filtre,tot])
    
      useEffect(() => {
      
        cardsFetch()
        }, [cardsFetch])

        const handleChange = (event, value) => {
          setCurrentPage(value);
        };


  return (
<>
<form>
  Recherche par désignation
  <input type="search" value={filtre} onChange={(e)=>setFiltre(e.target.value)} />
</form>
<ArticlesCardsAffiche />
      <Stack spacing={2}>
      <Typography>Page: {currentPage}</Typography>
      <Pagination  
      variant="outlined" 
      color="secondary"
      count={Math.round(tot/6)} 
      page={currentPage} 
      onChange={handleChange} />
    </Stack>
</>
 

  );

};

 

export default CardsList;