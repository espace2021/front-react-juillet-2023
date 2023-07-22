import React from 'react'
import ReactLoading from 'react-loading';
import {useSelector} from "react-redux"

const AffichearticlesAdmin = ({articles}) => {

    const {isLoading,error} = useSelector((state)=>state.storearticles);
    if (isLoading) return  <center><ReactLoading type='spokes' color="red" height={'8%'} width={'8%'}  /></center>
    if (error) return <p>Impossible d'afficher la liste des articles...</p>
  return (

      <div style={{overflowX: "auto"}}>
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Référence</th>
          <th>Désignation</th>
          <th>Quantité</th>
          <th>Prix</th>
          <th>Action</th>
        </tr>
      </thead>
      {articles  && 
      <tbody>
      {  articles.map((art,ind)=> 
        <tr key={ind}>
          
          <td><img src={art.imageart} alt=""/></td>
          <td>{art.reference}</td>
          <td>{art.designation}</td>
          <td>{art.qtestock}</td>
          <td>{art.prix}</td>
          <td>
            <span className="action_btn">
              <a href="#">Edit</a>
              <a href="#">Remove</a>
            </span>
          </td>
        </tr>
)}
             

      </tbody>
}
    </table>
    
  </div>

  )
}

export default AffichearticlesAdmin
