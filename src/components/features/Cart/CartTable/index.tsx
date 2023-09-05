import { useSelector } from "react-redux";
import Table from "antd/es/table";
import { columns, getFooter } from "../../../../utils/Cart/cartTableData";
import { requestStatus } from "../../../../utils/types/enums";
import { selectCart } from "../../../../redux/selectors";

export const CartTable = () => {
  const { cartItems, status } = useSelector(selectCart);

  return (
    <Table
      loading={status === requestStatus.PENDING}
      columns={columns}
      dataSource={cartItems?.map(({ status, id, ...otherData }) => ({
        key: id,
        ...otherData,
      }))}
      pagination={false}
      footer={(data) => getFooter(data)}
    />
  );
};
