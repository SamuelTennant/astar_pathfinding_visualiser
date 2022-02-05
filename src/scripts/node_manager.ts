import Node, { NodeType, Vec2 } from "./node";

const NODE_COUNT = 100;

export default class NodeManager {
  static nodes: Node[] = [];
  static startNode: Node;
  static endNode: Node;

  constructor() {
    this.generateBoard();
  }

  private generateBoard() {
    for (let i = 0; i < NODE_COUNT; i++) {
      // Generate coordinates
      const x = i % 10;
      const y = 10 - Math.floor(i / 10);
      const coords = { x, y };

      let node = new Node(NodeType.Blank, coords);

      NodeManager.nodes.push(node);
    }
  }

  resetBoard() {
    // Set all nodes to blank.
    NodeManager.nodes.forEach((node: Node) => {
      node.updateNodeType(NodeType.Blank);
      NodeManager.startNode = null;
      NodeManager.endNode = null;
    });
  }

  static setStartNode(node: Node) {
    if (this.startNode != null)
      // There is an existing one, so set it blank.
      this.startNode.updateNodeType(NodeType.Blank);

    // Update variable and new start node.
    this.startNode = node;
    node.updateNodeType(NodeType.Start);
  }

  static setEndNode(node: Node) {
    if (this.endNode != null)
      // There is an existing one, so set it to blank.
      this.endNode.updateNodeType(NodeType.Blank);

    // Update variable and new end node.
    this.endNode = node;
    node.updateNodeType(NodeType.Start);
  }

  static getNodeByCoordinates(coordinates: Vec2): Node {
    let foundNode: Node;
    NodeManager.nodes.forEach((node) => {
      if (
        coordinates.x == node.coordinates.x &&
        coordinates.y == node.coordinates.y
      ) {
        foundNode = node;
      }
    });

    return foundNode;
  }
}
