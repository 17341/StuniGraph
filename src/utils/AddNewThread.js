import React from "react";
import { Form, Input, Select, Button } from "antd";
import EditableTagGroup from "./Tags";
import { CreateThread } from "../hooks/API";
import { ThreadSchema, PostSchema } from "./Schemas";
import Post from "./Post";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const AddNewThread = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    //Getting tags from localstorage
    values.tags = localStorage.getItem("tags");
    console.log(
      ThreadSchema({
        id: "12",
        title: values.title,
        content: values.content,
        tags: values.tags,
        category: "Test",
        first_post : PostSchema({id : 1, content : values.content, authorId : "7", children : []})
      })
    );
    //CreateThread()
    //Clearing all
    localStorage.setItem("tags", "");
    form.resetFields();
  };

  return (
    <Form form={form} {...layout} name="nest-messages" onFinish={onFinish}>
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="category" label="Category">
        <Select />
      </Form.Item>
      <Form.Item name="tags" label="Tags">
        <EditableTagGroup />
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
export default AddNewThread;
