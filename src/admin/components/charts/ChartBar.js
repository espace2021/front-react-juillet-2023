import React,{useEffect,useState} from 'react'
import { ResponsiveBar } from '@nivo/bar'
import {Box} from '@mui/material'

const ChartBar = () => {

    const [data, setData] = useState([]);

    const fetchArticles=async()=>{
        const response = await fetch(`https://hn.algolia.com/api/v1/search?query=redux`);
        const data = await response.json();
        setData(data.hits.slice(0, 5))
        return await data
    }
    
    useEffect(() => {
        
        fetchArticles();
       
    }, []);
   
      
  return (
    <Box sx={{height: "75vh"}}> 
     <ResponsiveBar
        data={data}
        keys={[
            'num_comments',
            'points',
            
        ]}
        indexBy="_tags[1]"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        
        
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Author',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'graduation',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart Articles"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" : "+e.indexValue}
    />
       
    </Box>
  )
}

export default ChartBar
