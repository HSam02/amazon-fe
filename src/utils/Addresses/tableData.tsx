import { Space, Button, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { IAddress } from "../types/interfaces";
import { requestStatus } from "../types/enums";
import { LoadingIcon } from "../../components/shared/Loading/LoadingIcon";
import { AddressDataType } from "./interfaces";
import { AddressActions } from "../../components/features/User/Addresses/AddressActions";

export const columns: ColumnsType<AddressDataType> = [
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (_, record, index) => (
      <Space>
        {record.status === requestStatus.PENDING && <LoadingIcon size={18} />}
        <Typography.Text
          type={record.status === requestStatus.ERROR ? "danger" : undefined}
        >
          {`${record.address}${
            index === 0 && !record.address.includes("You have no")
              ? " (default)"
              : ""
          }`}
        </Typography.Text>
      </Space>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record, index) =>
      record.key !== 0 && (
        <AddressActions address={record} isDefault={index === 0} />
      ),
  },
];

export const getDataSource = (
  defaultAddress?: IAddress,
  addresses?: IAddress[]
) => {
  const data: AddressDataType[] = [];
  data.push(
    defaultAddress
      ? {
          key: defaultAddress.id,
          address: defaultAddress.value,
          status: defaultAddress.status,
        }
      : {
          key: 0,
          address: "You have no default address",
          status: requestStatus.SUCCESS,
        }
  );

  if (addresses && addresses.length > 0) {
    data.push(
      ...addresses.map((address) => ({
        key: address.id,
        address: address.value,
        status: address.status,
      }))
    );
  } else if (!defaultAddress) {
    data[0].address = "You have no addresses";
  }

  return data;
};
