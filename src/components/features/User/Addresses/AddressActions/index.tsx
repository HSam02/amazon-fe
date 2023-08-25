import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Popconfirm, Space } from "antd";
import { AddressForm } from "../AddressForm";
import { AddressDataType } from "../../../../../utils/Addresses/interfaces";
import { deleteAddress } from "../../../../../redux/actionCreators/addresses.actionCreators";
import { updateDefaultAddress } from "../../../../../redux/actionCreators/user.actionCreators";

type AddressActionsProps = {
  address: AddressDataType;
  isDefault?: boolean;
};

export const AddressActions: React.FC<AddressActionsProps> = ({
  address,
  isDefault,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Space>
        <Popconfirm
          title="Delete Address"
          description="Are you sure to delete this Address?"
          onConfirm={() => dispatch(deleteAddress(address.key))}
        >
          <Button>Delete</Button>
        </Popconfirm>
        <Button onClick={() => setIsOpen(true)}>Edit</Button>
        {!isDefault && (
          <Button onClick={() => dispatch(updateDefaultAddress(address.key))}>
            Set as Default
          </Button>
        )}
      </Space>
      {isOpen && (
        <AddressForm address={address} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};
