import { ButtonProps } from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const SmallClearButton: React.FC<ButtonProps> = (props) => {
  return (
    <IconButton
      style={{
        color: "gray",
      }}
      {...props}
    >
      <ClearIcon />
    </IconButton>
  );
};

export default SmallClearButton;
