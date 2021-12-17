import AddNewThread from "./AddNewThread";
import Threads from "./Threads";
import { Button, Input } from "antd";
import { useState, useEffect } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { HStack } from "@chakra-ui/react";

const ForumPage = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [ghost, setGhost] = useState(false)

  useEffect(() => {
    setGhost(!ghost)
  }, [showAdd])

  return (
    <>
      <HStack alignItems="flex-start">
        <Input placeholder="Future search bar" style={{ marginBottom: "20px", borderRadius: "20px" }} />
        <Button size="medium" ghost={ghost} onClick={() => setShowAdd(!showAdd)} type="primary" shape="circle" icon={<PlusOutlined />} />
      </HStack>
      {showAdd ? <AddNewThread handleSubmit={() => setShowAdd(false)} /> : <Threads addThread={() => setShowAdd(true)} />}
    </>
  );
};

export default ForumPage;
