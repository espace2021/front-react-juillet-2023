import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';


const PageCache = () => { 
    const [data, setData] = useState([]); 
    useEffect(() => { 
        const fetchData = async () => 
        { try { 
            // Vérifiez d'abord si les données sont déjà en cache dans le localStorage 
            const cachedData = localStorage.getItem('cachedData'); 
            if (cachedData) { 
                // Si les données sont en cache, utilisez-les directement 
                setData(JSON.parse(cachedData)); 
                console.log("data est déjà mise en cache")
            } else { 
                console.log("data n'est pas encore mise en cache")
                // Sinon, faites l'appel API 
                const response = await axios.get('http://localhost:3001/api/articles'); 
                const responseData = response.data; 
                setData(responseData); 
                // Mettez les données en cache dans le localStorage pour une utilisation ultérieure 
                localStorage.setItem('cachedData', JSON.stringify(responseData)); 
            } } 
            catch (error) { 
                console.error('Error fetching data:', error); 
            } }; 
            fetchData(); }, []); 
            return ( 
            <div> 
                <h1>Données en cache depuis le localStorage</h1> 
                {data  && 
        <div style={{"display":"flex","flexWrap":"wrap","justifyContent":"left"}}>
        {data.map((art,ind)=>{  
            return  <Card sx={{ maxWidth: 'auto',margin: 1 }} key={ind}>
            <CardMedia
              component="img"
              alt="image"
              height="160"
              image={art.imageart}
            />
            <CardContent>
          
              <Typography gutterBottom variant="h6" component="div">
              {art.designation.split(" ")[0]}...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                    
              Prix : {art.prix} DT
              </Typography>
            </CardContent>
         
          </Card>
    
      })}</div>
    } 
                 </div> 
                 ); 
                }; 
    export default PageCache;