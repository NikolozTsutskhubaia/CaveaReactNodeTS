interface Props {
  imageUrl: string;
  onClick?: () => void;
}

const ClickableImage: React.FC<Props> = ({ imageUrl, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return <img src={imageUrl} alt="Clickable Image" onClick={handleClick} />;
};

export default ClickableImage;
