import { Button, Form, Input, Select, Space, TreeSelect } from "antd";
import {
  brandRules,
  nameRules,
  requiredRule,
} from "../../../utils/Products/form.rules";
import { useSelector, useDispatch } from "react-redux";
import { selectColors, selectSizes } from "../../../redux/selectors";
import useCategoryTreeData from "../../../utils/Products/useCategoryTreeData";
import { getAllProducts } from "../../../redux/actionCreators/products.actionCreators";

export const Filters = () => {
  const dispatch = useDispatch();
  const { colors } = useSelector(selectColors);
  const { sizes } = useSelector(selectSizes);
  const categories = useCategoryTreeData();

  const onSubmit = (values: any) => {
    dispatch(getAllProducts(undefined, values));
  };

  return (
    <Form
      style={{
        height: "100vh",
        width: 250,
        padding: 20,
        borderRight: "1px solid #ccc",
      }}
      onFinish={onSubmit}
    >
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
        <Button>Reset</Button>
      </Space>
    </Form>
  );
};
