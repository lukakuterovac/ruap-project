    import React, { useState } from 'react';
    import { PlusOutlined } from '@ant-design/icons';
    import { DatePicker, Form, Input, InputNumber, Slider, Button} from 'antd';
    import { ConfigProvider, theme } from 'antd';

    const customTheme2 = {
        ...theme, // Spread existing theme to keep defaults
        token: {
        ...theme.token, // Spread existing tokens to keep defaults
        colorPrimary: 'green',
        colorSecondary: 'white',
        color: "white", // Replace with your desired color
        },
    };

    const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
    };
    function PredictDataForm({onSubmit}) {
        const [formValues, setFormValues] = useState({
            Size: 10, // default values or initial state
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
            // Pass the form data to the parent component
            onSubmit(formValues);
        };

    return (
        <ConfigProvider 
            theme={{
                // 1. Use dark algorithm
                //algorithm: theme.defaultAlgorithm,
        
                // 2. Combine dark algorithm and compact algorithm
                //algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
                components: {
                    Item: {
                        colorPrimary: 'white',
                        algorithm: true, // Enable algorithm
                    },
                    Form: {
                        colorPrimary: 'white',
                        algorithm: true, // Enable algorithm
                    }
                }
            }}
            >
        <>
        <Form
            labelCol={{
            span: 4,
            textAlign: "center",
            }}
            wrapperCol={{
            span: 14,
            textAlign: "center"
            }}
            layout="horizontal"
            style={{
            maxWidth: 600,
            margin: "auto",
            textAlign: "center"
            }}
        >
            <ConfigProvider theme={customTheme2}>
                <Form.Item label="Size[cm]:" style={{color:"white"}}>
                    <Slider min={3} max={20} onChange={(value) => handleSliderChange('Size', value)} />
                </Form.Item>
                <Form.Item label="Weight[gram]:">
                    <Slider min={30} max={250} onChange={(value) => handleSliderChange('Weight', value)} />
                </Form.Item>
                <Form.Item label="Sweetness">
                    <InputNumber value={formValues.sweetness} onChange={(value) => handleInputNumberChange('Sweetness', value)} />
                </Form.Item>
                <Form.Item label="Crunchiness">
                    <InputNumber value={formValues.crunchiness} onChange={(value) => handleInputNumberChange('Crunchiness', value)} />
                </Form.Item>
                <Form.Item label="Juiciness">
                    <InputNumber value={formValues.juiciness} onChange={(value) => handleInputNumberChange('Juiciness', value)} />
                </Form.Item>
                <Form.Item label="Ripeness">
                    <InputNumber value={formValues.ripeness} onChange={(value) => handleInputNumberChange('Ripeness', value)} />
                </Form.Item>
                <Form.Item label="Acidity">
                    <InputNumber value={formValues.acidity} onChange={(value) => handleInputNumberChange('Acidity', value)} />
                </Form.Item>  
            </ConfigProvider>
            
            <Form.Item style={{
                margin: "auto",
                marginLeft: "200px",
                width: "50%",
                color: "blue",
                alignContent: "center"
            }}>
            <Button type="primary" onClick={handleSubmit}>Submit</Button>
        </Form.Item>
        </Form>
        </>
        </ConfigProvider>
    );
    };
    export default PredictDataForm;