import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { editArticle } from '../../services/ArticleService';


import {UploadFirebase} from '../../utils/UploadFirebase';

import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const EditArticle = ({art,scategories,updateProduct}) => {
    
    const [reference, setReference] = useState(art.reference);
  const [designation, setDesignation] = useState(art.designation);
  const [prix, setPrix] = useState(art.prix);
  const [marque, setMarque] = useState(art.marque);
  const [qtestock, setQtestock] = useState(art.qtestock);
  const [imageart, setImageart] = useState(art.imageart);
  const [scategorieID, setScategorieID] = useState(art.scategorieID?._id);

  const [validated, setValidated] = useState(false);

  const [file, setFile] = useState("");

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


   const handleSubmit = (url) => {

    setImageart(url);

  const prmod = {
    ...art,
    reference,
        designation,
        prix, 
        marque,
        qtestock, 
        imageart:url,
        scategorieID
  };
  console.log(prmod)
  editArticle(prmod)
.then(res=> {
   //update dans le tableau affiché
   updateProduct(prmod)
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
      
   })
.catch(error=>console.log(error))
handleClose()
}

const handleUpload = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
 if (form.checkValidity() === true) {
  if (!file) {
    const url = imageart;
    handleSubmit(url);
  }
  else {
    console.log(file[0].file)
    resultHandleUpload(file[0].file);
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
 handleReset()
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
      setFile("")
      handleClose()

  }

  return (
    <div>
      <Button                 
        onClick={handleShow}
        variant="warning"
        size="md"
        style={{float: 'left'}}
        className="text-warning btn-link edit"

      >
      <i className="fa-solid fa-pen-to-square"></i>
      
      </Button>
      
                  
  <Modal show={show} onHide={handleClose}>
  <Form noValidate validated={validated} onSubmit={handleUpload}>
  <Modal.Header closeButton>
      <h2>Modification Product</h2>
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
{!file?<img src={imageart} style={{width:50, height:50}}/> :null} 
<FilePond
              files={file}
              allowMultiple={false}
              onupdatefiles={setFile}
              labelIdle='<span class="filepond--label-action">Browse One</span>'
            
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

  )
}

export default EditArticle
