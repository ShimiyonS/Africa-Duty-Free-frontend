import React, { useState } from 'react'
import { Button } from 'antd'
import { PlusOutlined, SaveFilled } from "@ant-design/icons";


const AddSubCategory = () => {
    const [open, setOpen] = useState(false);
    return (
        <Button
            type="primary"
            onClick={() => setOpen(true)}
            icon={<PlusOutlined />}
        >
            Add Sub Category
        </Button>
    )
}

export default AddSubCategory