import { useSelector } from "react-redux";
import { selectBuyLater } from "../../../../redux/selectors";
import { Table } from "antd";
import { requestStatus } from "../../../../utils/types/enums";
import { columns } from "../../../../utils/Cart/buyLaterTableData";

export const BuyLater = () => {
  const { buyLaterItems, status } = useSelector(selectBuyLater);

  return (
    <Table
      loading={status === requestStatus.PENDING}
      columns={columns}
      dataSource={buyLaterItems?.map(({ status, id, ...otherData }) => ({
        key: id,
        ...otherData,
      }))}
      pagination={false}
    />
  );
};
