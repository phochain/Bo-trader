import {Button, ButtonProps} from "@chakra-ui/react";
import {FC, isValidElement, ReactElement} from "react";

interface BtnGrayProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon'> {
  leftIcon?: string | ReactElement;
  rightIcon?: any | ReactElement;
  background?: string;
  onClick?: () => void; // Type onClick properly
}

const BtnGray: FC<BtnGrayProps> = ({
                                     onClick,
                                     children,
                                     leftIcon,
                                     rightIcon,
                                     background = "#1d233b"
                                   }) => {
  const renderIcon = (icon: string | ReactElement | undefined): ReactElement | undefined => {
    if (typeof icon === 'string') {
      return <img src={icon} alt="Icon" width={'22px'} height={'22px'}/>;
    } else if (isValidElement(icon)) {
      return icon;
    }
    return undefined;
  };

  return (
    <Button
      style={{
        color: "#fff",
        fontWeight: "400",
        borderRadius: "4px",
        padding: "22px 12px",
        width: "100%",
        marginBottom: "15px",
        justifyContent: "start",
      }}
      onClick={onClick}
      leftIcon={leftIcon ? renderIcon(leftIcon) : undefined}
      rightIcon={rightIcon ? renderIcon(rightIcon) : undefined}
      background={background}
      _hover='transparent'
    >
      {children}
    </Button>
  );
};

export default BtnGray;