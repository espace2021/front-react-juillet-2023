import React,{useCallback, useEffect,useState}  from 'react'
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { fetchArticles } from '../../services/ArticleService';

import Printarticles from './Printarticles';

const Printdocument = () => {

    const [products,setProducts]=useState(null)
 
    const listproduits= useCallback(()=>{
        fetchArticles()
        .then((res1)=>{setProducts(res1.data)
        return res1;
       })
        .catch(err=>console.log(err))
       },[])

       useEffect(() => {
        listproduits()
                        
       },[listproduits])  

  return (
    <div className="App">
{products ? <>
<PDFViewer width={800} height={600} showToolbar={false}>
        <Printarticles data={products} />
  </PDFViewer>

<PDFDownloadLink document={
     
<Printarticles data={products}/>
   
} filename="FORM">
      {({loading}) =>(loading ? <button disabled={true}>Loading Document...</button> 
      : <button>Print PDF</button>  )}
  
</PDFDownloadLink>
</>
: <div>loading</div>}


</div>

  )
}

export default Printdocument
