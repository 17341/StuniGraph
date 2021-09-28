import { Spin } from 'antd';

const LoadingPage = () => {
    return (
        <div style={{
            margin: "20% 0",
            marginBottom: "20%",
            padding: "30px 50px",
            textAlign: "center",
        }}> 
        <Spin />
            <p>Loading</p>
        </div >
    )
}
export default LoadingPage;