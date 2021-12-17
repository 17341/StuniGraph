import { useState, createElement, useEffect } from "react";
import Posts from "./Posts";
import { List, Avatar, Space, Button } from 'antd';
import { MessageOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { GetPost, SetReaction } from "./API";

const Post = ({ postId }) => {
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)
  const [post, setPost] = useState(undefined);

  useEffect(() => {
    GetPost(postId).then((e) => { setPost(e) })
  }, []);

  const IconText = ({ icon, text }) => (
    <Space>
      {createElement(icon)}
      {text}
    </Space>
  );

  const handleReaction = (value) => {
    if (value == 1) {
      setLike(true)
      setDislike(false)
    } else {
      setLike(false)
      setDislike(true)
    }
    SetReaction(postId, value)
  }

  return (
    <List.Item
      actions={[
        <Button onClick={() => handleReaction(1)} type={like ? "primary" : "secondary"} shape="circle" size="large" icon={<IconText icon={UpOutlined} text={post?.upvotes + like ? 1 : 0} />} />,
        <Button onClick={() => handleReaction(-1)} type={dislike ? "primary" : "secondary"} shape="circle" size="large" icon={<IconText icon={DownOutlined} text={post?.downvotes + dislike ? 1 : 0} />} />,
        <Button onClick={() => setShowAnswers(!showAnswers)} type={showAnswers ? "primary" : "secondary"} shape="circle" size="large" icon={<IconText icon={MessageOutlined} text={post?.children?.lenght} />} />,
      ]}

      style={{ backgroundColor: "#f5f5f5", border: "solid", marginBottom: "10px", borderColor: "green", borderRadius: "20px", borderWidth: "2px" }}
    >
      <List.Item.Meta
        avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
        title={<a href={"https://github.com/17341/StuniGraph"}>{post?.id}</a>}
        description={`Published at : ${post?.datePosted} / Modified at : ${post?.dateModified}`}
      />
      <div style={{ marginLeft: "48px", marginBottom: "10px" }}>
        {post?.content}
      </div>
      {showAnswers ? <Posts firstPostId={post?.id} /> : ""}
    </List.Item>
  );
};

export default Post;