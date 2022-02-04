import PaintManager from "./paint_nodes";
import NodeManager from "./node_manager";

const paintManager = new PaintManager();
const nodeManager = new NodeManager();

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => nodeManager.resetBoard());
