import React,{useEffect,useState,useCallback} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getArticles} from "../../../features/articleSlice";

import AffichearticlesAdmin from './AffichearticlesAdmin';

import Pagination from '@mui/material/Pagination';
import usePagination from "./Pagination";

const ProductsAppAdmin = () => {

  const dispatch = useDispatch();

  const {articles} = useSelector((state)=>state.storearticles);

  let [page, setPage] = useState(1);
  const PER_PAGE = 24;

  const count = Math.ceil(articles.length / PER_PAGE);
  const _DATA = usePagination(articles, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  
     
 const listproduits= useCallback(()=>{
    
      dispatch(getArticles());

    }, [dispatch])

    useEffect(() => {
        listproduits()
        }, [listproduits])

     
  return (
    <div>
<AffichearticlesAdmin articles={_DATA.currentData()}/>

<Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />

    </div>
  )
}

export default ProductsAppAdmin