import {Form,Switch, TreeSelect, Select} from 'antd';
import queryBuilder from '../../hooks/queryBuilder';
import sendQuery from '../../hooks/sendQuery';
import verificationQuery from '../../hooks/verificationQuery';
import Courses from '../../utils/Courses';
import CoursesDict from '../../utils/CoursesDict';
import { useState } from 'react'; 
const { Option } = Select;

const CoursePage = () =>{
    let values = JSON.parse(window.localStorage.getItem("registerQuery"))
    const [customizePAE, setCustomizePAE] = useState(false)
    const [form] = Form.useForm();
    const handleClick = (courses) => {
        values["courses"] = courses.courses
        values["customPAE"] = customizePAE
        window.localStorage.setItem("registerQuery",JSON.stringify(values))
        console.log(JSON.parse(window.localStorage.getItem("registerQuery")))
    }

    return (
    <>
        <Form
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onValuesChange={handleClick}
        >
            {values.status == "STUDENT" ?
            <>
            <Form.Item label="Customize PAE" valuePropName="checked" name = "customPAE">
                <Switch onChange = {(e) =>setCustomizePAE(e)}/>
            </Form.Item>
                {!customizePAE ? 
                    <div style = {{textAlign : "center"}}>
                        You will be registered to all the courses of the {values.grade} grade.
                    </div>
                    : 
                        <Form.Item label="Courses" name= 'courses' required>
                            <TreeSelect multiple showSearch treeData={Courses}/>
                        </Form.Item>
                    }
            </>
            :
                <Form.Item label="Courses" name= 'courses' required>
                    <TreeSelect multiple showSearch treeData={Courses}/>
                </Form.Item>
            }
        </Form>
    </>
    )
}

export default CoursePage;