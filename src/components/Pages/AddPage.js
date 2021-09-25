import { Select, Form, Input, Button, InputNumber, Switch, TreeSelect, message} from 'antd';
import { useState,useEffect } from 'react';
import queryBuilder from '../../hooks/queryBuilder';
import sendQuery from '../../hooks/sendQuery';
import verificationQuery from '../../hooks/verificationQuery';
import CoursesDict from '../../utils/CoursesDict';
import Courses from '../Courses';

const { Option } = Select;

const AddPage = () =>{
    const [customizePAE , setCustomizePAE ] = useState(false)
    const [status , setStatus ] = useState("Teacher")
    const [form] = Form.useForm();

    const handleClick = (values) => {
        //console.log(queryBuilder(values))
        sendQuery(verificationQuery(values),true)
            .then(function(res){
                if(res == "New") { sendQuery(queryBuilder(values)); message.success("Added"); form.resetFields()}
                else if(res == "Found") {message.warning("This user already exists");form.resetFields(["identification"])}
                else{message.error("Error : Try again")}
            })
    }

    useEffect(() => {
        setCustomizePAE(false)
    },[status]);
    
    return (
    <>
        <Form
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 14 }}
            initialValues={{
                status : "Teacher"
            }}
            layout="horizontal"
            onFinish ={handleClick}
        >
            <Form.Item label="Status" name= 'status' required  >
                <Select onSelect = {(e) => setStatus(e)} >
                    <Option value="Student">Student</Option>
                    <Option value="Teacher">Teacher</Option>
                </Select>
            </Form.Item>

            <Form.Item label="First Name" name= 'first_name' required>
                <Input />
            </Form.Item>

            <Form.Item label="Last Name" name= 'last_name' required>
                <Input />
            </Form.Item>
           
            {status=== "Student" ? 
            <>
                <Form.Item label="Grade" name= 'grade' required >
                    <Select showSearch>
                        {Object.keys(CoursesDict).map(key => <Option value={key}>{key}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item label="Matricule" name= 'identification' required>
                    <InputNumber />
                </Form.Item>

                {customizePAE ? 
                <Form.Item label="Courses" name= 'courses' required>
                    <TreeSelect multiple showSearch treeData={Courses}/>
                </Form.Item>
                : ""
                }
                <Form.Item label="Customize PAE" valuePropName="checked" name = "customPAE">
                    <Switch onChange = {(e) =>setCustomizePAE(e)}/>
                </Form.Item>
            </>
            : 
            <>
                <Form.Item label="Courses" name= 'courses' required>
                    <TreeSelect multiple showSearch treeData={Courses}/>
                </Form.Item>
                <Form.Item label="Identification" name= 'identification' required><Input /></Form.Item>
                <Form.Item label="Salary" name= 'salary' ><InputNumber /></Form.Item>
            </>
            }
            
            <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    </>
    )
}

export default AddPage;