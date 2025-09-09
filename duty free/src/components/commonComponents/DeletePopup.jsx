import { useState } from 'react';
import Common from '../../commonMethod/common'
import { Button, Col, Flex, Modal, Row } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import defaultimg from '../../assets/default.png'
import { toast } from 'react-toastify';

const DeletePopup = ({ title, apiEndpoint, data }) => {

    const { apiRequest } = Common()
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleDelete = async () => {
        setConfirmLoading(true)
        try {
            const res = await apiRequest("DELETE", apiEndpoint)
            setConfirmLoading(false)
            toast.success("deleted successfully")
            setModalOpen(false)
        }
        catch (error) {
            console.error("api fetching error", error);
            toast.error("Problem in deleting!!!!!")
        } finally {
            setConfirmLoading(false)
            setModalOpen(false)
        }
    }
    return (
        <>
            <Button type="link" onClick={() => setModalOpen(true)}>
                <MdDeleteOutline className='text-color-danger' size={19} />
            </Button>
            <Modal
                title={title}
                centered
                open={modalOpen}
                onOk={() => handleDelete()}
                confirmLoading={confirmLoading}
                onCancel={() => setModalOpen(false)}
                okButtonProps={{ className: "antd-custom-btn delete-ok-ant-btn" }}
                cancelButtonProps={{ className: "antd-custom-btn delete-cancel-ant-btn" }}
            >
                <Flex align='center'>
                    <img className='delete-product-img'src={data.image || defaultimg} alt={data.name || "No image"}></img>
                    <p className='delete-product-name'>{data.name}</p>
                </Flex>
            </Modal>

        </>
    );
};
export default DeletePopup;