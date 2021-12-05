import {
  Box,
  HStack,
  Text,
  Flex,
  Spacer,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import React from "react";
import VoteButtons from "./voteButtons";
import { TagOutlined } from "@ant-design/icons";

const Post = ({ post }) => {
  return (
    <HStack key={post.id} w="80%" alignItems="flex-start">
      <VoteButtons post={post} />
      <Box bg="lightblue" p={10} rounded="md" w="100%">
        <Flex>
          <Text>{post.id}</Text>
          <Spacer />
          <Text>{post.category}</Text>
          <Spacer />
          <Text fontSize={12}> Published at : 12h00</Text>
        </Flex>
        <Text fontSize={25}>{post.title}</Text>
        <HStack spacing={20} mt = {-20} mb = {20}>
          {["Tag 1", "Tag 2", "Tag 3"].map((t) => (
            <Tag size={30}color="red">
              <TagLeftIcon boxSize="12px" as={TagOutlined} />
              <TagLabel>{t}</TagLabel>
            </Tag>
          ))}
        </HStack>
        <Box bg="yellow" p={30} rounded="md" w="100%">
          <Text>{post.content}</Text>
        </Box>
      </Box>
    </HStack>
  );
};

export default Post;
