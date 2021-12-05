import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setPosts([{id : 1,category : "ECAM", title : "Comment ne pas rater a l'ECAM ?",upVotesCount : 1, downVotesCount : 0, content : "YAAAD?KAKDAKDAKDNAKDNAKDNAKDNAKDNAKDNAKDNAKDNADKA"},
    {id : 3, title : "test",category : "ECAM",upVotesCount : 1, downVotesCount : 0, content : "YAAAD?KAKDAKDAKDNAKDNAKDNAKDNAKDNAKDNAKDNAKDNADKA"},])
  }, []);

  if (isLoading) {
    return (
      <Flex minH="100vh" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      <Container maxW="md" centerContent p={8}>
        <VStack spacing={8} w="100%">
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </VStack>
      </Container>
    </>
  );
};

export default Posts;