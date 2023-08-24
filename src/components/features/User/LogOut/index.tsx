import { useDispatch } from "react-redux";
import { Modal, Typography } from "antd";
import { logout } from "../../../../redux/actionCreators/user.actionCreators";

type LogOutProps = {
  onClose: () => void;
};

export const LogOut: React.FC<LogOutProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  return (
    <Modal
      open
      centered
      closeIcon={false}
      onCancel={onClose}
      onOk={() => dispatch(logout())}
    >
      <Typography.Text>Are You sure, that You want to log out?</Typography.Text>
    </Modal>
  );
};
