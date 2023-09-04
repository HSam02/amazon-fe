import { Image, ImageProps } from "antd";
import { ReactComponent as EmptyImage } from "../../../assets/EmptyImage.svg";
import scss from "./AppImage.module.scss";

type AppImageProps = {
  url?: string;
} & Omit<ImageProps, "src">;

export const AppImage: React.FC<AppImageProps> = ({ url, ...props }) => {
  return url ? (
    <Image
      rootClassName={scss.image}
      src={process.env.REACT_APP_BASE_URL + url.slice(1)}
      {...props}
    />
  ) : (
    <div
      className={`${scss.emptyImage} ${scss.image}`}
      style={{ height: props.height, width: props.width }}
    >
      <EmptyImage />
    </div>
  );
};
