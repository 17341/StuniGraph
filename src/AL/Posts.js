import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { GetPost, CreateAnswer } from "./API";
import { Empty, Button, Input } from "antd";
import { PostSchema } from "./Schemas";
import { v4 as uuidv4 } from 'uuid'

const Posts = ({ firstPostId }) => {
  const [post, setPost] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    GetPost(firstPostId).then((e) => { setPost(e) })
  }, []);

  const onAdd = () => {
    CreateAnswer(post.id, PostSchema({
      id: uuidv4(),
      content: answer,
      authorId: uuidv4(),
      children: []
    }))
    GetPost(firstPostId).then((e) => { setPost(e) })
    setAnswer("")
  }

  if (isLoading) {
    return (
      <Flex minH="100vh" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      {post?.children.map((child) => <Post postId={child} />)}
      <Input.Group compact size="large">
        <Input.TextArea value={answer} onChange={(e) => setAnswer(e.target.value)} showCount maxLength={500} style={{ height: 120 }} style={{ width: 'calc(100% - 60px)' }} placeholder="Add an answer" />
        <Button onClick={() => onAdd()} style={{ height: 65 }} type="primary">Add</Button>
      </Input.Group>
    </>
  )
}

export default Posts;

