import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useCategoryTreeData from "../../../utils/Products/useCategoryTreeData";
import { Button, Form, Input, Select, Space, TreeSelect } from "antd";
import { ProductFilterType } from "../../../utils/Products/interfaces";
import { getAllProducts } from "../../../redux/actionCreators/products.actionCreators";
import { selectColors, selectProducts, selectSizes } from "../../../redux/selectors";
import scss from "./Filters.module.scss";

type FiltersProps = {
  setFilters: React.Dispatch<
    React.SetStateAction<ProductFilterType | undefined>
  >;
};

export const Filters: React.FC<FiltersProps> = ({ setFilters }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { colors } = useSelector(selectColors);
  const { sizes } = useSelector(selectSizes);
  const { status } = useSelector(selectProducts);
  const categories = useCategoryTreeData();

  const onSubmit = (values: any) => {
    setFilters(values);
    dispatch(getAllProducts(undefined, values));
  };

  const handleReset = () => {
    setFilters(undefined);
    form.resetFields();
    dispatch(getAllProducts());
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <Form className={scss.form} form={form} onFinish={onSubmit}>
      <Form.Item name="name">
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item name="brand">
        <Input placeholder="Brand" />
      </Form.Item>
      <Form.Item name="categoryId">
        <TreeSelect
          placeholder="Category"
          defaultValue={undefined}
          allowClear
          treeData={categories}
        />
      </Form.Item>
      <Form.Item name="colorIds">
        <Select
          placeholder="Colors"
          options={colors?.map((size) => ({
            label: size.value,
            value: size.id,
          }))}
          showSearch
          allowClear
          mode="multiple"
        />
      </Form.Item>
      <Form.Item name="sizeIds">
        <Select
          placeholder="Sizes"
          options={sizes?.map((size) => ({
            label: size.value,
            value: size.id,
          }))}
          showSearch
          allowClear
          mode="multiple"
        />
      </Form.Item>
      <Space>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </Space>
    </Form>
  );
};
