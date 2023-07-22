import React,{useEffect,useState,useCallback} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {fetchArticlesPag} from "../../../features/articleSlice";

import AffichearticlesAdmin from './AffichearticlesAdmin';

import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const ProductsAppAdmin = () => {

  const dispatch = useDispatch();

  const {tot} = useSelector((state)=>state.storearticles);

      const [currentPage, setCurrentPage] = useState(1);
    
      const itemsPerPage = 8
     

const [filtre, setFiltre] = useState("");

    const listproduits= useCallback(()=>{
      const mesParams={
        filtre :filtre,
        currentPage:currentPage,
        itemsPerPage:itemsPerPage
      };
      dispatch(fetchArticlesPag(mesParams));

    }, [currentPage,dispatch,filtre,tot])

    useEffect(() => {
        listproduits()
        }, [listproduits])

    const handleChange = (event, value) => {
          setCurrentPage(value);
        };

  return (
    <div>
<form>
  Recherche par désignation
  <input type="search" value={filtre} onChange={(e)=>setFiltre(e.target.value)} />
</form>

      <AffichearticlesAdmin />

<Stack spacing={2}>
      <Typography>Page: {currentPage}</Typography>
      <Pagination  
      variant="outlined" 
      color="secondary"
      count={Math.round(tot/itemsPerPage)+1} 
      page={currentPage} 
      onChange={handleChange} />
</Stack>

    </div>
  )
}

export default ProductsAppAdmin