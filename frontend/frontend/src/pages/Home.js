import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Card, Pagination } from 'antd';
import Nav from '../components/Nav';

function Home() {
    const [allData, setAllData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        axios.get('/api/data')
            .then(response => {
                setAllData(response.data.data);
            })
            .catch(error => {
                console.error('ERROR fetching data:', error);
            });
    }, []);

    const getPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allData.slice(startIndex, endIndex);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div style={{ padding: '0 16px' }}>
            <Nav></Nav>
            <strong><h2 style={{textAlign: "center"}}>Welcome to Apple Evaluation Model</h2></strong>
            <p style={{textAlign: "center"}}>Dataset:</p>
            {Array.isArray(allData) ? (
                <>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {getPageData().map(entry => (
                            <li key={entry.pk} style={{ width: 'calc(25% - 16px)', marginBottom: '16px' }}>
                                <Card
                                    title={`Apple ${entry.pk}`}
                                    bordered={false}
                                    headStyle={{ background: '#1890ff', color: '#fff', borderBottom: 0 }}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        borderRadius: '8px',
                                        padding: '16px',
                                        background: '#fff',
                                    }}
                                >
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {Object.entries(entry.fields).map(([key, value]) => (
                                            <li key={key}>
                                                <p>{key}: {key === 'quality' ? (value.toFixed(4)) : (value * 10).toFixed(4) || 'N/A'}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </li>
                        ))}
                    </ul>
                    <Pagination current={currentPage} total={allData.length} pageSize={itemsPerPage} onChange={handlePageChange} />
                </>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default Home;
