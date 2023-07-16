import React,{useMemo} from 'react'
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';


import Button from 'react-bootstrap/Button';
import EditArticle from './EditArticle';
const ArticleList = ({articles,deleteProduct,scategories,updateProduct}) => {

  const confirmMessage=(id,ref)=>{
   
   deleteProduct(id,ref)
  }
  
 


    const columns = useMemo(
        () => [
            {
            accessorKey: 'imageart', //access nested data with dot notation
            header: 'Image',
            Cell: ({ cell}) => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <img
                    alt=""
                    height={60}
                    src={cell.getValue()}
                    loading="lazy"
                    style={{ borderRadius: '20%' }}
                  />
                 
                  
                </Box>),
            },
          {
            accessorKey: 'reference', //access nested data with dot notation
            header: 'Référence',
            size: 100,
          },
          {
            accessorKey: 'designation',
            header: 'Désignation',
            size: 100,
          },
          {
            accessorKey: 'marque', //normal accessorKey
            header: 'Marque',
            size: 100,
          },
          {
            accessorKey: 'prix',
            header: 'Prix',
            size: 100,
          },
          {
            accessorKey: 'qtestock',
            header: 'Stock',
            size: 100,
          },
          {
            accessorKey: 'scategorieID.nomscategorie',
            header: 'Sous categ',
            size: 100,
          },

            {
              accessorKey: '_id',
              header: 'actions',
              size: 100,
              Cell: ({ cell, row }) => (
                <div >
       
                 <EditArticle art={cell.row.original} scategories={scategories} updateProduct={updateProduct}/>
          

                  <Button
                    
                    onClick={(e) => {
                      confirmMessage(cell.row.original._id,cell.row.original.reference, e);
                    }}
                    variant="danger"
                    size="md"
                    className="text-danger btn-link delete"
                  >
                  <i className="fa fa-trash" />
                  </Button>
                </div>
              ),
            },
            




        ],
        [articles],
      );
    
      
      
      
  return (
    <div>
      { articles && (
   <MaterialReactTable 
   columns={columns} 
   data={articles} 
   
   />)};
    </div>
  )
}

export default ArticleList
