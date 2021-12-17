import { useState, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import EditableTagGroup from "./Tags";
import { CreateThread, GetAllCategories } from "./API";
import { ThreadSchema, PostSchema } from "./Schemas";
import { v4 as uuidv4 } from 'uuid'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const { Option } = Select;

const AddNewThread = ({ handleSubmit }) => {
  const [form] = Form.useForm();
  const [category, setCategory] = useState([])

  useEffect(() => {
    GetAllCategories().then((e) => setCategory(e.data))
  }, [])

  const onFinish = (values) => {
    //Getting tags from localstorage
    values.tags = localStorage.getItem("tags");

    let thread = ThreadSchema({
      title: values.title,
      first_post: PostSchema({
        id: uuidv4(),
        content: values.content,
        authorId: uuidv4(),
        children: []
      }),
      tags: values.tags.split(","),
      category: values.category
    })

    CreateThread(thread).then((e) => console.log(e))

    //Clearing all

    localStorage.setItem("tags", "");
    form.resetFields();
    handleSubmit();
  };

  return (
    <Form form={form} {...layout} name="nest-messages" onFinish={onFinish}>
      <h1 align="center">Create New Thread</h1>
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="category" label="Category">
        <Select>
          {category.map(element =>
            <Option value={element}>{element}</Option>)
          }
        </Select>
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
