import Node, { NodeType } from "./node";
import NodeManager from "./node_manager";

function calculateManhattanDistance(start: Node, end: Node) {
  return (
    Math.abs(start.coordinates.x - end.coordinates.x) +
    Math.abs(start.coordinates.y - end.coordinates.y)
  );
}

export async function runPathfinding() {
  let openList: Node[] = [];
  let closedList: Node[] = [];
  let foundDestination = false;

  openList.push(NodeManager.startNode);
  NodeManager.startNode.fCost = 0;

  while (!foundDestination) {
    // Get node with lowest f cost.
    let currentNode: Node;
    openList.forEach((node, i) => {
      if (currentNode == null || node.fCost < currentNode.fCost) {
        currentNode = node;
        openList.splice(i, 1);
        closedList.push(currentNode);
      }
    });

    // Check if found end.
    if (currentNode == NodeManager.endNode) {
      console.log("FOUND THE GOAL");

      // Paint path.
      let currentPathNode = currentNode.getParentNode();

      const drawPathInterval = setInterval(() => {
        if (currentPathNode.getParentNode() == NodeManager.startNode)
          clearInterval(drawPathInterval);

        currentPathNode.updateNodeType(NodeType.Path);
        currentPathNode = currentPathNode.getParentNode();
      }, 100);

      foundDestination = true;
      continue;
    }

    // Get children of current node.
    const children = currentNode.getNeighbours();
    children.forEach((node) => {
      if (closedList.includes(node)) return;
      node.setParentNode(currentNode);

      node.gCost = currentNode.gCost + 10;
      node.hCost = calculateManhattanDistance(node, NodeManager.endNode);
      node.fCost = node.gCost + node.hCost;

      openList.push(node);
    });
  }
}
