import { Checkbox, CheckboxProps } from '@chakra-ui/react';

interface CustomCheckboxProps extends CheckboxProps {
  mr?: string | number;
  size?: string;
  colorScheme?: string;
  defaultChecked?: boolean; // Kiểu boolean đã được định nghĩa
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
                                                         mr,
                                                         size = 'md', // Default size nếu không được truyền vào
                                                         colorScheme = 'blue', // Default colorScheme nếu không được truyền vào
                                                         defaultChecked = false, // Default cho defaultChecked
                                                         ...props
                                                       }) => {
  return (
    <Checkbox
      mr={mr}
      size={size}
      colorScheme={colorScheme}
      defaultChecked={defaultChecked}
      sx={{
        '.chakra-checkbox__control': {
          borderRadius: '50%', // Đặt góc tròn
          h: '24px', // Chiều cao tùy chỉnh
          width: '24px', // Chiều rộng tùy chỉnh
        },
        '.chakra-checkbox__control[data-checked]': {
          backgroundColor: colorScheme === 'green' ? 'green.500' : 'blue.500', // Màu nền khi được chọn
          borderColor: colorScheme === 'green' ? 'green.500' : 'blue.500', // Màu viền khi được chọn
        },
      }}
      {...props}
    />
  );
};

export default CustomCheckbox;
