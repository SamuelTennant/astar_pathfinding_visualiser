import NodeManager from "./node_manager";
import PaintManager, { PaintMode } from "./paint_nodes";

export enum NodeType {
  Blank = "blank",
  Start = "start",
  End = "end",
  Wall = "wall",
  Path = "path",
}

export type Vec2 = {
  x: number;
  y: number;
};

const board = document.getElementById("board");

export default class Node {
  private type = NodeType.Blank;
  private element: HTMLElement;
  private parent: Node;

  coordinates: Vec2;
  gCost: number;
  hCost: number;
  fCost: number;

  constructor(type: NodeType, coordinates: Vec2) {
    this.type = type;
    this.coordinates = coordinates;

    this.createElement();
    this.createListener();
  }

  private createElement() {
    let nodeElement = document.createElement("div");
    nodeElement.classList.add("node");
    nodeElement.classList.add(`node-${this.type}`);
    board.appendChild(nodeElement);
    this.element = nodeElement;
  }

  private createListener() {
    this.element.addEventListener("click", () => {
      switch (PaintManager.mode) {
        case PaintMode.Blank:
          this.updateNodeType(NodeType.Blank);
          break;
        case PaintMode.Start:
          NodeManager.setStartNode(this);
          this.updateNodeType(NodeType.Start);
          break;
        case PaintMode.End:
          NodeManager.setEndNode(this);
          this.updateNodeType(NodeType.End);
          break;
        case PaintMode.Wall:
          this.updateNodeType(NodeType.Wall);
          break;
      }
    });
  }

  updateNodeType(type: NodeType) {
    const oldType = this.type;
    this.type = type;

    // Change the classes to update colour.
    this.element.classList.remove(`node-${oldType}`);
    this.element.classList.add(`node-${type}`);
  }

  getNeighbours() {
    let neighbours: Node[] = [];

    // Top.
    const top = NodeManager.getNodeByCoordinates({
      x: this.coordinates.x,
      y: this.coordinates.y - 1,
    });
    if (top != null && top.type != NodeType.Wall) neighbours.push(top);

    // Left.
    const left = NodeManager.getNodeByCoordinates({
      x: this.coordinates.x - 1,
      y: this.coordinates.y,
    });
    if (left != null && left.type != NodeType.Wall) neighbours.push(left);

    // Right.
    const right = NodeManager.getNodeByCoordinates({
      x: this.coordinates.x + 1,
      y: this.coordinates.y,
    });
    if (right != null && right.type != NodeType.Wall) neighbours.push(right);

    // Top.
    const bottom = NodeManager.getNodeByCoordinates({
      x: this.coordinates.x,
      y: this.coordinates.y + 1,
    });
    if (bottom != null && bottom.type != NodeType.Wall) neighbours.push(bottom);

    return neighbours;
  }

  setParentNode(parent: Node) {
    this.parent = parent;
  }

  getParentNode() {
    return this.parent;
  }
}
