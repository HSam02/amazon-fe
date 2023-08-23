import { Categories } from "../../components/features/Admin/Categories";
import { Colors } from "../../components/features/Admin/Colors";
import { Sizes } from "../../components/features/Admin/Sizes";
import scss from "./Admin.module.scss";

export const Admin = () => {
  return (
    <>
      <Categories />
      <Sizes />
      <Colors />
    </>
  );
};
