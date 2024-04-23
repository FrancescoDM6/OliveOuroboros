import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import axios from "axios";
import type { Node } from "database";
import React, {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import NodeDropdown from "./NodeDropdown.tsx";
import { PathAlgorithm, PathNodesObject } from "common/src/Path.ts";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import IconButton from "@mui/material/IconButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PathAlgorithmDropdown from "./PathAlgorithmDropdown.tsx";
import LocationIcon from "@mui/icons-material/LocationOn";

/*const initialState: PathNodesObject = {
  startNode: "",
  endNode: "",
};*/

const textFieldStyles = {
  width: "17vw",
};

const defaultPathAlgorithm: PathAlgorithm = "A-Star";

function DirectionsCard(props: {
  onSubmit: FormEventHandler;
  pathNodeObject: PathNodesObject;
  setPathNodeObject: Dispatch<SetStateAction<PathNodesObject>>;
  onReset: FormEventHandler;
}) {
  // Populates selection menu from database
  const [nodes, setNodes] = useState<Node[]>([]);
  const [pathAlgorithm, setPathAlgorithm] =
    useState<string>(defaultPathAlgorithm);
  //const [clickedNode, setClickedNode] = useState<GraphNode>();

  function getNodeID(value: string): string {
    const foundNode = nodes.find((node) => node.longName === value);
    return foundNode ? foundNode.nodeID : "";
  }

  useEffect(() => {
    //get the nodes from the db
    async function getNodesFromDb() {
      const rawNodes = await axios.get(APIEndpoints.mapGetNodes);
      let graphNodes: Node[] = rawNodes.data;
      graphNodes = graphNodes.filter((node) => node.nodeType != "HALL");
      graphNodes = graphNodes.sort((a, b) =>
        a.longName.localeCompare(b.longName),
      );
      setNodes(graphNodes);
      return graphNodes;
    }
    getNodesFromDb().then();
  }, []);

  function swapLocations() {
    const start = props.pathNodeObject.startNode;
    props.setPathNodeObject({
      startNode: props.pathNodeObject.endNode,
      endNode: start,
    });
  }
  /*function reset() {
    props.setPathNodeObject(initialState);
    setPathAlgorithm(defaultPathAlgorithm);
  }*/

  /*function setStartNodeLabel(): string {
    if (props.clickedNodeStart) {
      return props.clickedNodeStart.longName;
    } else {
      return pathNodeObject.startNode;
    }
  }
  function setStartNodeValue() {
    if (props.clickedNodeStart) {
      return props.clickedNodeStart.nodeID;
    } else {
      return getNodeID(pathNodeObject.startNode);
    }
  }

  function setEndNodeLabel() {
    if (props.clickedNodeEnd) {
      return props.clickedNodeEnd.longName;
    } else {
      return pathNodeObject.endNode;
    }
  }
  function setEndNodeValue() {
    if (props.clickedNodeEnd) {
      return props.clickedNodeEnd.nodeID;
    } else {
      return getNodeID(pathNodeObject.endNode);
    }
  }*/

  return (
    <div>
      <div className="border-5 flex p-4 bg-white rounded-2xl shadow-xl">
        <div className="flex flex-col">
          <div className="flex flex-row gap-1 items-center">
            <MyLocationIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <NodeDropdown
              value={props.pathNodeObject.startNode}
              sx={textFieldStyles}
              label="Start Location"
              onChange={(newValue: string) =>
                props.setPathNodeObject((currentPathNode) => ({
                  ...currentPathNode,
                  startNode: newValue,
                }))
              }
            />
            <input
              type="hidden"
              name={`${NavigateAttributes.startLocationKey}`}
              value={getNodeID(props.pathNodeObject.startNode)}
            />
          </div>
          <MoreVertIcon style={{ color: "#012D5A" }} />
          <div className="flex flex-row gap-1 items-center">
            <LocationIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <NodeDropdown
              value={props.pathNodeObject.endNode}
              sx={textFieldStyles}
              label="End Location"
              onChange={(newValue: string) =>
                props.setPathNodeObject((currentPathNode) => ({
                  ...currentPathNode,
                  endNode: newValue,
                }))
              }
            />
            <input
              type="hidden"
              name={`${NavigateAttributes.endLocationKey}`}
              value={getNodeID(props.pathNodeObject.endNode)}
            />
          </div>
          <div className="ml-[2rem] flex flex-row mt-4 justify-between">
            <PathAlgorithmDropdown
              value={pathAlgorithm}
              sx={{ width: "10vw" }}
              label="Algorithm"
              onChange={setPathAlgorithm}
            ></PathAlgorithmDropdown>
            <input
              type="hidden"
              name={`${NavigateAttributes.algorithmKey}`}
              value={pathAlgorithm}
            />
            {/*<NavigateButton type="submit" className={"flex"} />*/}
          </div>
        </div>

        <div className="flex flex-col ml-[0.2rem] items-center">
          <div className="flex-grow flex justify-center items-center">
            <IconButton onClick={swapLocations}>
              <SwapVertIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectionsCard;
