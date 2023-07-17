import React,{ useEffect,useCallback }  from 'react'
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import Printcart from './Printcart';

import { useDispatch, useSelector } from "react-redux";

import { getTotals } from "../../features/cartSlice";

function PdfCart() {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.storecart);

    const calTotals = useCallback(() => {
        dispatch(getTotals());
      }, [cart, dispatch])
    
      useEffect(() => {
        calTotals()
      }, [calTotals])

  return (
    <div>
         <div className="App">
{cart? <>
<PDFViewer width={800} height={600} showToolbar={false}>
        <Printcart data={cart} />
  </PDFViewer>

<PDFDownloadLink document={
     
<Printcart data={cart}/>
   
} filename="FORM">
      {({loading}) =>(loading ? <button disabled={true}>Loading Document...</button> 
      : <button>Print PDF</button>  )}
  
</PDFDownloadLink>
</>
: <div>loading</div>}

</div>


    </div>
  )
}

export default PdfCart
