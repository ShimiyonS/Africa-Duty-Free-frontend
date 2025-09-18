import { useParams } from "react-router-dom";
import Common from "../../commonMethod/common";
import AddressForm from "../../components/commonComponents/MyAccountComponents/AddressForm";
const AddressHandle = () => {
    const { type } = useParams();
    const{firstLetterCapital} = Common()
    return (
        <div>
           <h2 className='fw-bold mb-4 cart-heading'>{firstLetterCapital(type)} address</h2>
            <AddressForm/>
        </div>
    )
}

export default AddressHandle