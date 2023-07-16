import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


import Modal from 'react-bootstrap/Modal';
import { addArticle } from '../../services/ArticleService';

import {UploadFirebase} from '../../utils/UploadFirebase';

import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const Createarticle = ({ addProduct, scategories }) => {

  const [reference, setReference] = useState("");
  const [designation, setDesignation] = useState("");
  const [prix, setPrix] = useState("");
  const [marque, setMarque] = useState("");
  const [qtestock, setQtestock] = useState("");
  const [imageart, setImageart] = useState("");
  const [scategorieID, setScategorieID] = useState("");

  const [validated, setValidated] = useState(false);

  const [file, setFile] = useState("");

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

  

  const handleSubmit = (url) => {
   
    const newProduct = {
      reference,
      designation,
      prix, 
      marque,
      qtestock, 
      imageart:url,
      scategorieID
    };
  
//faire le add dans la BD
addArticle(newProduct)

.then(res => {  
const response = res.data; 
console.log(response) 
   // faire le add dans le tableau affiché
    addProduct(response);
    //vider le form
    setReference('');
    setDesignation('');
    setPrix('');
    setMarque('');
    setQtestock('');
    setImageart('');
    setScategorieID('');
    setValidated(false);

    setFile("")

    handleClose()

  })   
  .catch(error=>{
    console.log(error)
    alert("Erreur ! Insertion non effectuée")
    })
     
}

const handleUpload = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
 if (form.checkValidity() === true) {
        if (!file[0].file) {
            alert("Please upload an image first!");
        }
        else {
          console.log(file[0].file)
          resultHandleUpload(file[0].file,event);
      }
      if (!file[0].file) {
        alert("Please upload an image first!");
    }
    }
 setValidated(true);
};

const resultHandleUpload = async(file) => {
  
  try {
   
  const url =  await UploadFirebase(file);
  console.log(url);

  handleSubmit(url)
 } catch (error) {
    console.log(error);
 }

}

const handleReset=()=>{
  setReference('');
    setDesignation('');
    setPrix('');
    setMarque('');
    setQtestock('');
    setImageart('');
    setScategorieID('');
    setValidated(false);

    setFile('')

    handleClose()

}

  return (
    <div>
      
       
     
      <Button  
        
                    
                    onClick={handleShow}
                    variant="success"
                    size="sm"
                     style={{float: 'left','margin':10,'left':10,fontFamily:'Arial'}}
                  >
                  <i className="fa-solid fa-circle-plus"></i>
                  &nbsp;
                  Nouveau
                  </Button>
                  
  <Modal show={show} onHide={handleClose}>

      <Form noValidate validated={validated} onSubmit={handleUpload}>
  <Modal.Header closeButton>
  <h2>Create Product</h2>
  </Modal.Header>
  <Modal.Body>
  <div className="container w-100 d-flex justify-content-center">
  <div>
  
  <div className='form mt-3'>
  <Row className="mb-2">
  <Form.Group as={Col} md="6" >
  <Form.Label >Référence *</Form.Label>
  <Form.Control
  required
  type="text"
  placeholder="Référence"
  value={reference}
  onChange={(e)=>setReference(e.target.value)}
  />
  <Form.Control.Feedback type="invalid">
  Saisir Référence Article
  </Form.Control.Feedback>
  </Form.Group>
  <Form.Group as={Col} md="6">
  <Form.Label>Désignation *</Form.Label>
  <Form.Control
  required
  type="text"
  placeholder="Désignation"
  value={designation}
  onChange={(e)=>setDesignation(e.target.value)}
  />
  <Form.Control.Feedback type="invalid">
  Saisir Désignation
  </Form.Control.Feedback>
  </Form.Group>
  </Row>
  <Row className="mb-2">
  <Form.Group className="col-md-6">
  <Form.Label>Marque *</Form.Label>
  <InputGroup hasValidation>
  <Form.Control
  type="text"
  required
  placeholder="Marque"
  value={marque}
  onChange={(e)=>setMarque(e.target.value)}
  />
  <Form.Control.Feedback type="invalid">
  Marque Incorrecte
  </Form.Control.Feedback>
  </InputGroup>
  </Form.Group>
  <Form.Group as={Col} md="6">
<Form.Label>Prix</Form.Label>
<Form.Control
type="number"
placeholder="Prix"
value={prix}
onChange={(e)=>setPrix(e.target.value)}
/>
</Form.Group>
</Row>
<Row className="mb-3">
<Form.Group className="col-md-6 ">
<Form.Label>
Qté stock<span className="req-tag">*</span>
</Form.Label>
<Form.Control
required
type="number"
value={qtestock}
onChange={(e)=>setQtestock(e.target.value)}
placeholder="Qté stock"
/>
<Form.Control.Feedback type="invalid">
Qté stock Incorrect
</Form.Control.Feedback>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Image</Form.Label>

<FilePond
              files={file}
              allowMultiple={false}
              onupdatefiles={setFile}
              labelIdle='<span className="filepond--label-action">Browse One</span>'
            
            />

</Form.Group>
<Form.Group as={Col} md="12">
<Form.Label>S/Catégorie</Form.Label>
<Form.Control
as="select"
type="select"
value={scategorieID}
onChange={(e)=>setScategorieID(e.target.value)}
>
<option></option>
{scategories.map((scat)=><option key={scat._id}
value={scat._id}>{scat.nomscategorie}</option>
)}
</Form.Control>
</Form.Group>
</Row>
</div>
</div>
</div>
</Modal.Body>
<Modal.Footer>
<Button type="submit">Enregistrer</Button>
<Button type="button" className="btn btn-warning" onClick={()=>handleReset()}>Annuler</Button>
</Modal.Footer>
</Form>
</Modal>
    </div>
  );
};

export default Createarticle;
