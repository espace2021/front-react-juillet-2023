import React from 'react'
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import Printarticles from './Printarticles';

import { useLocation } from "react-router-dom";

const Printdocument = (props) => {
 
const location = useLocation();
console.log(props, " props");
console.log(location, " useLocation Hook");
const products = location.state?.products;
console.log(products)

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
