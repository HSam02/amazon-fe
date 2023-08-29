import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserProducts } from "../../redux/actionCreators/products.actionCreators";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/selectors";
import { requestStatus } from "../../utils/types/enums";
import { Loading } from "../../components/shared/Loading";
import { Products } from "../../components/features/MyStore/Products";

export const MyStore = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getUserProducts());
  }, []);

  if (status === requestStatus.PENDING || status === requestStatus.IDLE) {
    return <Loading />;
  }

  return <Products />;
};
