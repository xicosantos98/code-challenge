import React from 'react'
import { Spin } from 'antd';

const Loading = ({ children }) => {
    return (
        <Spin spinning>
            {children}
        </Spin>
    )
}

export default Loading
