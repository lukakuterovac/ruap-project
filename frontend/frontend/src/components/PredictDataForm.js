import React, { useState } from 'react';
import { Form, InputNumber, Slider, Button } from 'antd';

const PredictDataForm = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    Size: 10,
    Weight: 100,
    Sweetness: 0,
    Crunchiness: 0,
    Juiciness: 0,
    Ripeness: 0,
    Acidity: 0,
  });

  const handleSliderChange = (key, value) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleInputNumberChange = (key, value) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  return (
    <Form
      labelCol={{
        span: 4,
        textAlign: 'center',
      }}
      wrapperCol={{
        span: 14,
        textAlign: 'center',
      }}
      layout="horizontal"
      style={{
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <Form.Item label="Size[cm]:">
        <Slider
          min={3}
          max={20}
          onChange={(value) => handleSliderChange('Size', value)}
          value={formValues.Size}
        />
        <div style={{ textAlign: 'center' }}>3cm - 20cm</div>
      </Form.Item>
      <Form.Item label="Weight[gram]:">
        <Slider
          min={30}
          max={250}
          onChange={(value) => handleSliderChange('Weight', value)}
          value={formValues.Weight}
        />
        <div style={{ textAlign: 'center' }}>30g - 250g</div>
      </Form.Item>
      <Form.Item label="Sweetness">
        <InputNumber
          value={formValues.Sweetness}
          onChange={(value) => handleInputNumberChange('Sweetness', value)}
        />
      </Form.Item>
      <Form.Item label="Crunchiness">
        <InputNumber
          value={formValues.Crunchiness}
          onChange={(value) => handleInputNumberChange('Crunchiness', value)}
        />
      </Form.Item>
      <Form.Item label="Juiciness">
        <InputNumber
          value={formValues.Juiciness}
          onChange={(value) => handleInputNumberChange('Juiciness', value)}
        />
      </Form.Item>
      <Form.Item label="Ripeness">
        <InputNumber
          value={formValues.Ripeness}
          onChange={(value) => handleInputNumberChange('Ripeness', value)}
        />
      </Form.Item>
      <Form.Item label="Acidity">
        <InputNumber
          value={formValues.Acidity}
          onChange={(value) => handleInputNumberChange('Acidity', value)}
        />
      </Form.Item>
      <Form.Item
        style={{
          margin: 'auto',
          marginLeft: '200px',
          width: '50%',
          color: 'blue',
          alignContent: 'center',
        }}
      >
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PredictDataForm;
