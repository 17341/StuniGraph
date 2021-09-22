import { Select, Form, Input, Button, InputNumber, Switch, TreeSelect, message} from 'antd';
import { useState,useEffect } from 'react';
import flatten from "../../hooks/flatten"
import queryBuilder from '../../hooks/queryBuilder';
import sendQuery from '../../hooks/sendQuery';
import CoursesDict from '../../utils/Courses';
import verificationQuery from '../../utils/verificationQuery';
const { Option } = Select;

let CoursesList = []

const TreeGrade = Object.keys(CoursesDict).map((key) => {
    if ( Array.isArray(CoursesDict[key]) ) {
        CoursesList.push(CoursesDict[key].map(elem => {return elem}))
        return({title : key , value : key})
    }
    else {
        CoursesList.push(Object.keys(CoursesDict[key]).map(elem => {return CoursesDict[key][elem]}))
        return ({title : key , value : key, children : Object.keys(CoursesDict[key]).map(elem => { return {title: elem, value: elem} }) })
    }
})

const Courses = () => {
    CoursesList = flatten(CoursesList)
    return( 
        <Form.Item label="Courses" required name = "courses">
            <Select showSearch mode ="multiple">
                {CoursesList.map(key => <Option value={key}>{key}</Option>)}
            </Select>
        </Form.Item> 
    )
}

const AddPage = () =>{
    const [customizePAE , setCustomizePAE ] = useState(false)
    const [status , setStatus ] = useState("Teacher")

    const handleClick = (values) => {
        if ( sendQuery(verificationQuery(values)) == "Success"){
            sendQuery(queryBuilder(values))
            //message.success("Success : You have been added to the graph :)")
        }
        else if(sendQuery(verificationQuery(values) == "Error")){
            message.error("Error : Try again ")
        }
        else {
            //message.warning("Warning : This person is already in the graph")
        }
    }

    useEffect(() => {
        setCustomizePAE(false)
    },[status]);
    
    return (
    <>
        <Form
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

            <Form.Item label="First Name" name= 'first_name' equired>
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
                <Form.Item label="Customize PAE" valuePropName="checked" >
                    <Switch onChange = {(e) =>setCustomizePAE(e)}/>
                </Form.Item>
            </>
            : 
            <>
                <Courses/>
                <Form.Item label="Identification" name= 'identification' required><Input /></Form.Item>
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