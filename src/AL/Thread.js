import { useEffect, useState, createElement } from "react";
import { GetThread, SetReaction } from "./API";
import Posts from "./Posts";
import { List, Avatar, Space, Button } from 'antd';
import { MessageOutlined, DownOutlined, UpOutlined, CheckOutlined, QuestionOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

const Thread = ({ threadId }) => {
    const [thread, setThread] = useState(undefined)
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    const [showAnswers, setShowAnswers] = useState(false)

    useEffect(() => {
        GetThread(threadId).then((e) => setThread(typeof e === "object" ? e : thread))
    }, [like, dislike])

    const handleReaction = (value) => {
        SetReaction(thread.first_post.id, value)
        if (value == 1) {
            setLike(true)
            setDislike(false)
        } else {
            setLike(false)
            setDislike(true)
        }
    }

    const IconText = ({ icon, text }) => (
        <Space>
            {createElement(icon)}
            {text}
        </Space>
    );

    if (thread !== undefined) {
        return (
            <List.Item
                key={thread.title}
                actions={[
                    <Button onClick={() => handleReaction(1)} type={like ? "primary" : "secondary"} shape="circle" size="large" icon={<IconText icon={UpOutlined} text={thread.first_post.upvotes + like ? 1 : 0} />} />,
                    <Button onClick={() => handleReaction(-1)} type={dislike ? "primary" : "secondary"} shape="circle" size="large" icon={<IconText icon={DownOutlined} text={thread.first_post.downvotes + dislike ? 1 : 0} />} />,
                    <Button onClick={() => setShowAnswers(!showAnswers)} type={showAnswers ? "primary" : "secondary"} shape="circle" size="large" icon={<IconText icon={MessageOutlined} text={thread.first_post.children.lenght} />} />,
                    <IconText icon={thread.answered ? CheckOutlined : QuestionOutlined} />,
                ]}

                style={{ backgroundColor: "#f5f5f5", marginBottom: "20px", border: "solid", borderColor: "white", borderRadius: "20px" }}
            >
                <List.Item.Meta
                    avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                    title={<a href={"https://github.com/17341/StuniGraph"}>{thread.title}</a>}
                    description={thread.category}
                />
                <div style={{ marginLeft: "48px", marginBottom: "10px" }}>
                    {thread.tags.map((t) => (
                        <Tag> {t} </Tag>
                    ))}
                    <br></br>
                    <br></br>
                    {thread.first_post.content}
                </div>
                {showAnswers ? <Posts firstPostId={thread.first_post.id} /> : ""}
            </List.Item>
        );
    }
    else {
        return ""
    }

};

export default Thread;
