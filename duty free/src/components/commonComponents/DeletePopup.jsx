import { useState } from 'react';
import Common from '../../commonMethod/common'
import { Button, Col, Modal, Row } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
const DeletePopup = ({ title, apiEndpoint, name, image }) => {

    const { apiRequest } = Common()
    const [modalOpen, setModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const res = await apiRequest("DELETE", apiEndpoint)
            setModalOpen(false)
        }
        catch (error) {
            console.error("api fetching error", error);
        }
    }
    return (
        <>
            <Button type="link" danger onClick={() => setModalOpen(true)}>
                <MdDeleteOutline size={19} />
            </Button>
            <Modal
                title={title}
                centered
                open={modalOpen}
                onOk={() => handleDelete()}
                onCancel={() => setModalOpen(false)}
            >
                <Row justify={`center`}>
                    <Col>
                        <div>
                            {image && <img src={image}></img>}
                            <p className='text-center'>{name}</p>
                        </div>
                    </Col>
                </Row>

            </Modal>
        </>
    );
};
export default DeletePopup;