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
      <Form.Item label="Size:">
        <Slider
          min={1}
          max={10}
          onChange={(value) => handleSliderChange('Size', value)}
          value={formValues.Size}
        />
      </Form.Item>
      <Form.Item label="Weight:">
        <Slider
          min={1}
          max={10}
          onChange={(value) => handleSliderChange('Weight', value)}
          value={formValues.Weight}
        />
      </Form.Item>
      <Form.Item label="Sweetness">
        <Slider
          min={1}
          max={10}
          onChange={(value) => handleSliderChange('Sweetness', value)}
          value={formValues.Sweetness}
        />
      </Form.Item>
      <Form.Item label="Crunchiness">
        <Slider
          min={1}
          max={10}
          onChange={(value) => handleSliderChange('Crunchiness', value)}
          value={formValues.Crunchiness}
        />
      </Form.Item>
      <Form.Item label="Juiciness">
        <Slider
          min={1}
          max={10}
          onChange={(value) => handleSliderChange('Juiciness', value)}
          value={formValues.Juiciness}
        />
      </Form.Item>
      <Form.Item label="Ripeness">
         <Slider
          min={1}
          max={10}
          onChange={(value) => handleSliderChange('Ripeness', value)}
          value={formValues.Ripeness}
        />
      </Form.Item>
      <Form.Item label="Acidity">
         <Slider
          min={1}
          max={10}
          onChange={(value) => handleSliderChange('Acidity', value)}
          value={formValues.Acidity}
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
