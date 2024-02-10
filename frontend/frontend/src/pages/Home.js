import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import Nav from '../components/Nav';

function Home(){
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/api/data')
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error('ERROR fetching data:', error);
            });
    }, []);

    return(
        <div style={{ padding: '0 16px' }}>
            <Nav></Nav>
            <p>This is Home page. Data:</p>
            {Array.isArray(data) ? (
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {data.map(entry => (
                        <li key={entry.pk} style={{ width: 'calc(25% - 16px)', marginBottom: '16px' }}>
                            <Card
                                title={`Apple ${entry.pk}`} 
                                bordered={false}
                                style={{
                                    width: '100%',
                                }}
                            >
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {Object.entries(entry.fields).map(([key, value]) => (
                                        <li key={key}>
                                            <p>{key}: {value || 'N/A'}</p>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
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
