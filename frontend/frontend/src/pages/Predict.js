import axios from "axios";
import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import PredictDataForm from '../components/PredictDataForm';
import { ConfigProvider, theme } from 'antd';

// const customTheme = {
//     ...theme, // Spread existing theme to keep defaults
//     token: {
//       ...theme.token, // Spread existing tokens to keep defaults
//       colorPrimary: 'green',
//       colorSecondary: 'white', // Replace with your desired color
//     },
// };

function Predict(){
const [formData, setFormData] = useState({
    Size: 10, // default values or initial state
    Weight: 100,
    Sweetness: 0,
    Crunchiness: 0,
    Juiciness: 0,
    Ripeness: 0,
    Acidity: 0,
    });

    const handleFormSubmit = (formDataUpdate) => {
        const params = new URLSearchParams();
        params.append('Size', formDataUpdate.Size);
        params.append('Weight', formDataUpdate.Weight);
        params.append('Sweetness', formDataUpdate.Sweetness);
        params.append('Crunchiness', formDataUpdate.Crunchiness);
        params.append('Juiciness', formDataUpdate.Juiciness);
        params.append('Ripeness', formDataUpdate.Ripeness);
        params.append('Acidity', formDataUpdate.Acidity);

        const scaledFormData = {
            Size: formDataUpdate.Size /  10,
            Weight: formDataUpdate.Weight /  10,
            Sweetness: formDataUpdate.Sweetness / 10,
            Crunchiness: formDataUpdate.Crunchiness / 10,
            Juiciness: formDataUpdate.Juiciness / 10,
            Ripeness: formDataUpdate.Ripeness / 10,
            Acidity: formDataUpdate.Acidity / 10
        };
    
        setFormData(scaledFormData);
    const requestData = {
        Inputs: {
            data: [formData],//////
        },
        GlobalParameters: {
            method: "predict",
        },
    };

    axios.post('/api/predict/', requestData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        console.log("Response from the model:", response.data);
        // Handle the response if needed
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // Handle the error if needed
    });

    console.log('Form Data Submitted:', requestData);
};
    // useEffect(() => {
    //     axios.post('/api/predict')
    //         .then(response => {
    //             setData(response.data.data);
    //         })
    //         .catch(error => {
    //             console.error('ERROR PREDICTING:', error);
    //         });
    // }, []);

    return(
        <ConfigProvider 
        theme={{
            // 1. Use dark algorithm
            //algorithm: theme.defaultAlgorithm,
      
            // 2. Combine dark algorithm and compact algorithm
            //algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
          }}
        >
            <div>
                <div>
                    <Nav></Nav>
                </div>
                <div style={{
                    margin: "auto",
                    width: "50%"
                    }}>
                    <p style={{textAlign:"center"}}><strong>Insert Apple Data:</strong></p>        
                    <PredictDataForm onSubmit={handleFormSubmit}/>
                </div> 
            </div>
        </ConfigProvider>   
    );
}

export default Predict;