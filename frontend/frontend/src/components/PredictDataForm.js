import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Slider,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const PredictDataForm = () => {
  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Apple size[cm]:">
          <Slider />
        </Form.Item>
        <Form.Item label="Apple weight[gram]:">
          <Slider />
        </Form.Item>
        <Form.Item label="Sweetness">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Crunchiness">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Juiciness">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Ripeness">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Acidity">
          <InputNumber />
        </Form.Item>
      </Form>
    </>
  );
};
export default () => <PredictDataForm />;