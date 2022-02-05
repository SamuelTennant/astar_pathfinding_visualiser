import PaintManager from "./paint_nodes";
import NodeManager from "./node_manager";
import { runPathfinding } from "./pathfinding";

const paintManager = new PaintManager();
const nodeManager = new NodeManager();

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", nodeManager.resetBoard);
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", runPathfinding);
