import NodeManager from "./node_manager";
import PaintManager, { PaintMode } from "./paint_nodes";

export enum NodeType {
  Blank = "blank",
  Start = "start",
  End = "end",
  Wall = "wall",
}

const board = document.getElementById("board");

export default class Node {
  private type = NodeType.Blank;
  private element: HTMLElement;

  constructor(type: NodeType) {
    this.type = type;
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
}
