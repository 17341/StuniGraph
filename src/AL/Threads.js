import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Thread from "./Thread";
import { GetAllThreads } from "./API";
import { Empty, Button } from "antd"
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';

const Threads = ({ addThread }) => {
    const [threads, setThreads] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        GetAllThreads().then((e) => setThreads(e.threads))
    }, []);

    if (isLoading) {
        return (
            <Flex minH="100vh" justifyContent="center" alignItems="center">
                <Spinner />
            </Flex>
        );
    }

    return (threads.length > 0 ?
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={threads}

            renderItem={item => (
                <Thread threadId={item.id} />
            )}
        /> :
        <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
                height: 60,
            }}
            description={
                <span>
                    No threads
                </span>
            }
        >
            <Button type="primary" onClick={() => addThread()}>Add threads</Button>
        </Empty>
    )
};

export default Threads;