
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const DateFilter = () => (
    <Space direction="vertical" size={12}>
        <RangePicker />
    </Space>
);
export default DateFilter;