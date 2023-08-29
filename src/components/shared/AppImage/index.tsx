import { Image, ImageProps, Skeleton } from "antd";
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
    <Skeleton.Image
      rootClassName={scss.rootSkeleton}
      className={scss.skeleton}
    />
  );
};
