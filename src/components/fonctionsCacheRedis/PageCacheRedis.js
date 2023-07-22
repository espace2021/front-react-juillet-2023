import React, { useEffect, useState } from 'react'; 

import Redis from 'ioredis'; 
const redisClient = new Redis({
    host: 'localhost',
    port: 6379,
  }); 
// Initialisez ici votre client Redis avec les bonnes informations de connexion (hôte, port, etc.)

const PageCacheRedis = () => { 
    const [data, setData] = useState([]); 
   
        useEffect(() => { 
             // Vérifiez d'abord si les données sont déjà en cache dans Redis
            redisClient.get('cachedData', (err, cachedData) => { 
                if (err) { 
                    console.error('Error fetching cached data from Redis:', err); 
                    return; 
                } 
                if (cachedData) { 
                    // Si les données sont en cache, utilisez-les directement 
                    setData(JSON.parse(cachedData)); 
                } else { 
                    // Sinon, faites l'appel API et mettez les données en cache pour la prochaine fois 
                    fetch('http://localhost:3001/api/articles') 
                    .then((response) => response.json()) 
                    .then((responseData) => { 
                        setData(responseData); 
                        redisClient.set('cachedData', JSON.stringify(responseData));
                         // Mettez les données en cache dans Redis pour une utilisation ultérieure 
                        }) 
                        .catch((error) => console.error('Error fetching data:', error)); 
                    } }); }, []);
            return ( 
            <div> 
                <h1>Données en cache depuis le localStorage</h1> 
                <ul> 
                    {data.map((item) => ( 
                <li key={item._id}>{item.designation}
                </li>
                 ))} 
                 </ul> 
                 </div> 
                 ); 
                }; 
    export default PageCacheRedis;