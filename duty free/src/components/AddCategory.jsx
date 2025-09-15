import { Button } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, SaveFilled } from "@ant-design/icons";


const AddCategory = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<PlusOutlined />}
      >
        Add Category
      </Button>
    </>
  )
}

export default AddCategory