import { useSelector } from "react-redux";
import { selectAddresses, selectUser } from "../../redux/selectors";

const useAddresses = () => {
  const { addresses, status } = useSelector(selectAddresses);
  const { user } = useSelector(selectUser);
  const defaultAddressId = user?.defaultAddressId;
  const defaultAddress = addresses?.find(
    (address) => address.id === defaultAddressId
  );
  return {
    defaultAddress,
    addresses: addresses?.filter((address) => address.id !== defaultAddressId),
    status,
  };
};

export default useAddresses;
