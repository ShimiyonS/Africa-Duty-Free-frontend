import { Button } from 'antd'

const NotifyBtn = ({ icon, action, notifyLength }) => {
    return (
        <>
            <Button type="link" onClick={action} className="antd-custom-btn admin-product-toggle">
                {icon}
                <div className='admin-product-total text-color-secondary bg-color-danger'>{notifyLength}</div>
            </Button>
        </>
    )
}

export default NotifyBtn