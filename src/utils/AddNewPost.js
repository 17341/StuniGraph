import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import EditableTagGroup from './Tags'

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  
  const AddNewPost = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
      //Getting tags from localstorage
      values.tag = localStorage.getItem("tags")
      console.log(values);
      //Clearing all
      localStorage.setItem("tags", '')
      form.resetFields();
    };
  
    return (
      <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} >
        <Form.Item name="title" label="Title">
            <Input/>
        </Form.Item>
        <Form.Item name="category" label="Category">
            <Select/>
        </Form.Item>
        <Form.Item name="tags" label="Tags">
            <EditableTagGroup/>
        </Form.Item>
        <Form.Item name="content" label="Content">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };
export default AddNewPost;


