import axios from "axios";
import React, { useState } from 'react';
import Nav from '../components/Nav';
import PredictDataForm from '../components/PredictDataForm';
import { ConfigProvider, Modal, Button, theme } from 'antd';

// const customTheme = {
//     ...theme, // Spread existing theme to keep defaults
//     token: {
//       ...theme.token, // Spread existing tokens to keep defaults
//       colorPrimary: 'green',
//       colorSecondary: 'white', // Replace with your desired color
//     },
// };

function Predict() {
  const [formData, setFormData] = useState({
    Size: 10,
    Weight: 100,
    Sweetness: 0,
    Crunchiness: 0,
    Juiciness: 0,
    Ripeness: 0,
    Acidity: 0,
  });
  const [prediction, setPrediction] = useState(null);

  const handleFormSubmit = (formDataUpdate) => {
    setFormData(formDataUpdate);

    const scaledData = {
        Size: formDataUpdate.Size / 10,
        Weight: formDataUpdate.Weight / 10,
        Sweetness: formDataUpdate.Sweetness / 10,
        Crunchiness: formDataUpdate.Crunchiness / 10,
        Juiciness: formDataUpdate.Juiciness / 10,
        Ripeness: formDataUpdate.Ripeness / 10,
        Acidity: formDataUpdate.Acidity / 10,
    }

    const requestData = {
      Inputs: {
        data: [scaledData],
      },
      GlobalParameters: {
        method: "predict",
      },
    };

    console.log('Form Data Submitted:', requestData);

    axios.post('/api/predict/', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log("Response from the model:", response.data);
        setPrediction(response.data.prediction); // Assuming response has a 'prediction' field
        showModal();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle the error if needed
      });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const footer = (
    <Button key="ok" type="primary" onClick={handleOk}>
      OK
    </Button>
  );

  return (
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
          <Nav />
        </div>
        <div
          style={{
            margin: "auto",
            width: "50%",
          }}
        >
          <p style={{ textAlign: "center" }}>
            <strong>Insert Apple Data:</strong>
          </p>
          <PredictDataForm onSubmit={handleFormSubmit} />
        </div>
      </div>

      <Modal title="Prediction Result" visible={isModalVisible} onOk={handleOk} onCancel={handleOk} footer={footer}>
        {prediction === 1 ? 'Apple is good' : 'Apple is bad'}
      </Modal>
    </ConfigProvider>
  );
}

export default Predict;
