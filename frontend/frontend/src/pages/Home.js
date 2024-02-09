import axios from "axios";
import React, { useEffect, useState } from 'react';


function Home(){
    const [data, setData] = useState(null);

    useEffect(() => {
        // Make a GET request to your Django backend API endpoint
        axios.get('/api/data')
          .then(response => {
            // Handle successful response
            setData(response.data.data);
            console.log(response.data.data);
          })
          .catch(error => {
            // Handle error
            console.error('ERROR fetching data:', error);
          });
      }, []); // Empty dependency array means this effect runs once after the initial render
    

    return(
        <div>
            <p>This is Home page. Data:</p>
            {Array.isArray(data) ? (
            <ul>
                {data.map(entry => (
                    <li key={entry.pk}>
                        <strong>Entry {entry.pk}:</strong>
                        <ul>
                            {Object.entries(entry.fields).map(([key, value]) => (
                                <li key={key}>
                                    {key}: {value || 'N/A'}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No data available</p>
        )}
            
        </div>
    );
}

export default Home;