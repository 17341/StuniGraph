import { Select, Form, Input, Button, InputNumber, Switch, TreeSelect, message} from 'antd';
import { useState,useEffect } from 'react';
// import flatten from "../../hooks/flatten"
import queryBuilder from '../../hooks/queryBuilder';
import sendQuery from '../../hooks/sendQuery';
import verificationQuery from '../../hooks/verificationQuery';
const { Option } = Select;

const courses = require('../../utils/Courses');

const TreeGrade = Object.keys(courses.default.CoursesDict).map((key) => {
    if ( Array.isArray(courses.default.CoursesDict[key]) ) {
        return({title : key , value : key})
    }
    else {
        return ({title : key , value : key, children : 
            Object.keys(courses.default.CoursesDict[key])
            .map(elem => { return {title: elem, value: elem} }) })
    }
})

const Courses = () => {
    return( 
        <Form.Item label="Courses" required name = "courses">
            <Select showSearch mode ="multiple">
                {Object.keys(courses.default.CoursesCodes).map(key => <Option value={key}>{courses.default.CoursesCodes[key]}</Option>)}
            </Select>
        </Form.Item> 
    )
}

const AddPage = () =>{
    const [customizePAE , setCustomizePAE ] = useState(false)
    const [status , setStatus ] = useState("Teacher")
    const [form] = Form.useForm();

    const handleClick = (values) => {
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
            layout="horizontal"
            onFinish ={handleClick}
        >
            <Form.Item label="Status" name= 'status' required initialValue = "Teacher" >
                <Select onSelect = {(e) => setStatus(e)} defaultValue = "Teacher">
                    <Option value="Student">Student</Option>
                    <Option value="Teacher">Teacher</Option>
                {/* <Option value="Futur Student">Futur Student</Option> */}
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
                    <TreeSelect showSearch treeData={TreeGrade}/>
                </Form.Item>

                <Form.Item label="Matricule" name= 'identification' required>
                    <InputNumber />
                </Form.Item>

                {customizePAE ? 
                <Courses/>
                : ""
                }
                <Form.Item label="Customize PAE" valuePropName="checked" name = "customPAE">
                    <Switch onChange = {(e) =>setCustomizePAE(e)}/>
                </Form.Item>
            </>
            : 
            <>
                <Courses/>
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