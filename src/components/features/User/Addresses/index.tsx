import { useMemo, useState } from "react";
import useAddresses from "../../../../utils/Addresses/useAddressess";
import { Button, Space, Table } from "antd";
import { Loading } from "../../../shared/Loading";
import { AddressForm } from "./AddressForm";
import { columns, getDataSource } from "../../../../utils/Addresses/tableData";
import { requestStatus } from "../../../../utils/types/enums";

export const Addresses = () => {
  const { addresses, defaultAddress, status } = useAddresses();
  const [isOpen, setIsOpen] = useState(false);

  const dataSource = useMemo(
    () => getDataSource(defaultAddress, addresses),
    [addresses, defaultAddress]
  );

  if (status === requestStatus.PENDING) {
    return <Loading />;
  }

  return (
    <>
      <Space direction="vertical" style={{ paddingTop: 20 }}>
        <Button onClick={() => setIsOpen(true)} type="primary">
          Add Addres
        </Button>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </Space>
      {isOpen && <AddressForm onClose={() => setIsOpen(false)} />}
    </>
  );
};
