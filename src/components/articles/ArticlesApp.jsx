import React,{useCallback, useEffect,useState} from 'react'
import { deleteArticle, fetchArticles } from '../../services/ArticleService';
import { fetchSCategories } from '../../services/ScategorieService';
import ArticleList from './ArticleList';
import Createarticle from './Createarticle';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const ArticlesApp = () => {

  const navigation=useNavigate()

    const [products,setProducts]=useState(null)
    const [scategories,setScategories]=useState([])
   
   
     const listproduits= useCallback(()=>{
        fetchArticles()
        .then((res1)=>{setProducts(res1.data)
        return res1;
       })
        .then((res1)=>{console.log(res1.data)})
        
        .catch(err=>console.log(err))
       },[])

       const listscategories=useCallback(()=>{
        fetchSCategories()
        .then((res)=>{setScategories(res.data)
          return res;
        })
        .then((res)=>{console.log(res.data)})

        
        .catch(err=>console.log(err))
       },[])

       useEffect(() => {
        listproduits()
       
                   
       },[listproduits])

       useEffect(() => {
        listscategories()
       
            
       },[listscategories])
       
    const addproduct=(newproduit)=>{
        setProducts([newproduit,...products])
    }

    const deleteProduct = (productId,ref) => {
      confirmAlert({
        title: "Confirm delete...",
        message: " supprimer l' article: " + ref,
        buttons: [
          {
            label: 'Oui',
            onClick: () => deleteArticle(productId)
            .then(res=>
              setProducts(products.filter((product) => product._id !== productId)))
              //.then(console.log("suppression effectuée avec success"))
            .catch(error=>console.log(error))
          },
          {
            label: 'Non',
            
          }
        ]
      });
  
        
      //}
        };

        const updateProduct = (prmod) => {
            setProducts(
            products.map((product) =>
            product._id === prmod._id ? prmod : product
            )
            );
           
            };
  return (
    <div>
         <Button  
               
        onClick={()=>navigation("/printart")}
        variant="default"
        size="sm"
         style={{float: 'left','margin':10,'left':10,fontFamily:'Arial'}}
      >
      <i className="fa-solid fa-print">  </i>
               Print PDF
      </Button>

      <Createarticle addProduct={addproduct} scategories={scategories} />
      <ArticleList articles={products} deleteProduct={deleteProduct} scategories={scategories} updateProduct={updateProduct}/>
    </div>
  )
}

export default ArticlesApp
