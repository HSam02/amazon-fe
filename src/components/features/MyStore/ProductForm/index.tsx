import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import useCategoryTreeData from "../../../../utils/Products/useCategoryTreeData";
import {
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  TreeSelect,
  Upload,
  UploadFile,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { selectColors, selectSizes } from "../../../../redux/selectors";
import {
  createProduct,
  updateProduct,
} from "../../../../redux/actionCreators/products.actionCreators";
import { IProduct } from "../../../../utils/types/interfaces";
import { IProductUpdateSchema } from "../../../../utils/Products/interfaces";
import {
  brandRules,
  descriptionRules,
  nameRules,
  priceRules,
  requiredRule,
} from "../../../../utils/Products/form.rules";

type ProductFormProps = {
  product?: IProduct;
  onClose: () => void;
};

export const ProductForm: React.FC<ProductFormProps> = ({
  onClose,
  product,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { colors } = useSelector(selectColors);
  const { sizes } = useSelector(selectSizes);
  const categories = useCategoryTreeData();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [defaultFile, setDefaultFile] = useState<UploadFile<any>>();

  const onSubmit = (values: any) => {
    if (!values.description) {
      values.description = null;
    } else {
      values.description = values.description.trim();
    }
    const formData = new FormData();

    fileList.forEach(
      ({ originFileObj }) =>
        originFileObj && formData.append("media", originFileObj)
    );
    if (product) {
      values.imageIds = fileList
        .filter(({ originFileObj }) => !originFileObj)
        .map(({ uid }) => +uid);
    }

    defaultFile?.originFileObj &&
      formData.append("default", defaultFile.originFileObj);
    formData.append("data", JSON.stringify(values));

    product
      ? dispatch(updateProduct(product.id, formData))
      : dispatch(createProduct(formData));
    onClose();
  };

  const initialValues = useMemo(() => {
    if (!product) {
      return undefined;
    }
    const {
      id,
      sizes,
      user,
      images,
      category,
      defaultImg,
      colors,
      status,
      ...otherData
    } = product;
    const values = otherData as IProductUpdateSchema;
    values.sizeIds = sizes.map(({ id }) => id);
    values.colorIds = colors.map(({ id }) => id);
    if (category) {
      values.categoryId = category.id;
    }
    setDefaultFile(
      product?.defaultImg
        ? {
            uid: product.defaultImg.id.toString(),
            status: "success",
            name: "image",
            url:
              process.env.REACT_APP_BASE_URL + product.defaultImg.url.slice(1),
          }
        : undefined
    );
    setFileList(
      product?.images.map(({ id, url }) => ({
        uid: id.toString(),
        status: "success",
        name: "image",
        url: process.env.REACT_APP_BASE_URL + url.slice(1),
      }))
    );
    return values;
  }, []);

  return (
    <Modal
      open
      centered
      closeIcon={false}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Form.Item name="name" rules={nameRules}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description" rules={descriptionRules}>
          <Input.TextArea
            maxLength={150}
            style={{ maxHeight: 100 }}
            autoSize
            placeholder="Description"
          />
        </Form.Item>
        <Form.Item name="brand" rules={brandRules}>
          <Input placeholder="Brand" />
        </Form.Item>
        <Form.Item name="price" rules={priceRules}>
          <Input placeholder="Price" />
        </Form.Item>
        <Form.Item name="categoryId" rules={[requiredRule]}>
          <TreeSelect
            placeholder="Category"
            defaultValue={undefined}
            allowClear
            treeData={categories}
          />
        </Form.Item>
        <Form.Item name="colorIds" rules={[requiredRule]}>
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
        <Form.Item name="sizeIds" rules={[requiredRule]}>
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
        <Form.Item name="isAvailable" valuePropName="checked">
          <Checkbox>Publish</Checkbox>
        </Form.Item>
        <Form.Item>
          <Upload
            listType="picture-card"
            maxCount={1}
            customRequest={() => {}}
            onChange={({ file, fileList }) => {
              file.status = "success";
              setDefaultFile(fileList[0]);
            }}
            showUploadList={{ showPreviewIcon: false }}
            defaultFileList={defaultFile ? [defaultFile] : undefined}
          >
            {!defaultFile && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Upload
            listType="picture-card"
            maxCount={8}
            multiple
            customRequest={() => {}}
            onChange={({ file, fileList }) => {
              file.status = "success";
              setFileList(fileList.map((file) => file));
            }}
            defaultFileList={fileList}
            showUploadList={{ showPreviewIcon: false }}
          >
            {fileList.length < 8 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
