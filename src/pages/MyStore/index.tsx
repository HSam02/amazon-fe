import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserProducts } from "../../redux/actionCreators/products.actionCreators";

export const MyStore = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProducts());
  }, []);

  return <>Store</>;
};
