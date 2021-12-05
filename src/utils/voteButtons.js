import { IconButton, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const VoteButtons = ({ post }) => {
  const handleClick = async (type) => {
    // Do calculation to save the vote.
    let upVotesCount = post.upVotesCount;
    let downVotesCount = post.downVotesCount;

    const date = new Date();

    if (type === "upvote") {
      upVotesCount = upVotesCount + 1;
    
    } else {
      downVotesCount = downVotesCount + 1;
    }

  };

  return (
    <>
      <VStack>
        <IconButton
          size="lg"
          colorScheme="purple"
          aria-label="Upvote"
          icon={<ThumbUpIcon />}
          onClick={() => handleClick("upvote")}
        />
        <Text >
          {post.upVotesCount}
        </Text>
      </VStack>
      <VStack>
        <IconButton
          size="lg"
          colorScheme="yellow"
          aria-label="Downvote"
          icon={<ThumbDownIcon />}
          onClick={() => handleClick("downvote")}
        />
        <Text >
          {post.downVotesCount}
        </Text>
      </VStack>
    </>
  );
};

export default VoteButtons;