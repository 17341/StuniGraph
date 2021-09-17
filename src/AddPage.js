import { Select } from 'antd';

const { Option } = Select;

const AddPage = () =>{
    const handleChange = (value) =>{
        console.log(`selected ${value}`);
    }

    const Inputs = {
        first_name :"First Name",
        last_name  :"Last Name",
        matricule : "Matricule",
        
    }
    return (
    <>
        <Select defaultValue="student" style={{ width: 120 }} onChange={handleChange}>
            <Option value="student">Student</Option>
            <Option value="teacher">Teacher</Option>
        </Select>
                
    </>
    )
}

export default AddPage;