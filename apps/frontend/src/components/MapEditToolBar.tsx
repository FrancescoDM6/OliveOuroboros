import * as React from "react";
import TimelineIcon from "@mui/icons-material/Timeline";
import AddLocationRoundedIcon from "@mui/icons-material/AddLocationRounded";
import OpenWithRoundedIcon from "@mui/icons-material/OpenWithRounded";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";
import { MapContext } from "../routes/MapEdit.tsx";
import { useContext } from "react";
import { ButtonStyling } from "../common/StylingCommon.ts";

const styles = {
  color: "white",
  width: "40px",
  height: "35px",
  fontWeight: "light",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: ButtonStyling.blueButtonHover,
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: ButtonStyling.blueButtonClicked,
    color: "white",
    fontWeight: "bold",
  },
} as const;

export default function ToggleButtons(props: {
  SelectNode: () => void;
  MoveNode: () => void;
  CreateNode: () => void;
  CreateEdge: () => void;
}) {
  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  const selectedAction = useContext(MapContext).selectedAction;

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      sx={{ backgroundColor: ButtonStyling.blueButton, borderRadius: "5px" }}
    >
      <Tooltip
        TransitionComponent={Zoom}
        title="Select Node"
        placement="bottom"
        arrow
      >
        <ToggleButton
          value="select"
          aria-label="left aligned"
          onClick={props.SelectNode}
          selected={selectedAction.toString() == "SelectNode"}
          sx={styles}
        >
          <GpsFixedIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip
        TransitionComponent={Zoom}
        title="Move Node"
        placement="bottom"
        arrow
      >
        <ToggleButton
          value="move"
          aria-label="left aligned"
          onClick={props.MoveNode}
          selected={selectedAction.toString() == "MoveNode"}
          sx={styles}
        >
          <OpenWithRoundedIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip
        TransitionComponent={Zoom}
        title="Create Node"
        placement="bottom"
        arrow
      >
        <ToggleButton
          value="createNode"
          aria-label="centered"
          onClick={props.CreateNode}
          selected={selectedAction.toString() == "CreateNode"}
          sx={styles}
        >
          <AddLocationRoundedIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip
        TransitionComponent={Zoom}
        title="Create Edge"
        placement="bottom"
        arrow
      >
        <ToggleButton
          value="createEdge"
          aria-label="right aligned"
          onClick={props.CreateEdge}
          selected={selectedAction.toString() == "CreateEdge"}
          sx={styles}
        >
          <TimelineIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
