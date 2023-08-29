import { Carousel, Image } from "antd";
import { IImage } from "../../../../utils/types/interfaces";
import { AppImage } from "../../AppImage";

type ImagesProps = {
  images: IImage[];
};

export const Images: React.FC<ImagesProps> = ({ images }) => {
  return (
    <Carousel dots autoplay>
      {images.map(({ id, url }) => (
        <AppImage
          key={id}
          url={process.env.REACT_APP_BASE_URL + url.slice(1)}
          preview={false}
        />
      ))}
    </Carousel>
  );
};
