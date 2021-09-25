import React, { useState } from 'react';
import { Form, Input, Button, Select, TreeSelect} from 'antd';
import Courses from './Courses';
import CoursesDict from '../utils/CoursesDict';

const { Option } = Select

const Filter = () =>{
    const [form] = Form.useForm();
    const handleClick = ()=>{}
    return (
        <>
          <Form
            form={form}
            layout="inline"
            style={{
                borderRadius: "20px",
                boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.05)",
                padding: '20px',
                backgroundColor: 'white',
                marginBottom : "20px"
            }}
            onFinish ={handleClick}
          >
            <Form.Item label="Status" name= 'status' labelCol={{ span: 20 }} wrapperCol={{ span: 20 }}>
                <Select >
                    <Option value="Student">Student</Option>
                    <Option value="Teacher">Teacher</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Grade" name= 'grade' labelCol={{ span: 20 }} wrapperCol={{ span: 20 }}  style={{ marginLeft: 30 , width: 100 }}>
                <Select showSearch mode ="multiple">
                    {Object.keys(CoursesDict).map(key => <Option value={key}>{key}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item label="Courses" name= 'courses' labelCol={{ span: 20 }} wrapperCol={{ span: 20 }}  style={{ marginLeft: 30 , width: 300 }}>
                <TreeSelect multiple showSearch treeData={Courses}/>
            </Form.Item>
            <Form.Item labelCol={{ span: 20 }} wrapperCol={{ span: 20 }}  style={{ marginLeft: '50px' }}>
              <Button  style={{ borderRadius: '20px' }} type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </>
      );
    

}
export default Filter