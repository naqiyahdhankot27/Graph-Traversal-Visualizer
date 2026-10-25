# GraphVista — Interactive Graph Traversal Visualizer

A small DAA project demonstrating Breadth-First Search (BFS) and Depth-First Search (DFS) with a Python Flask backend and interactive SVG frontend.

## Features
- BFS and DFS implemented in Python
- Interactive graph canvas with sample graph
- Add nodes and connect two nodes
- Animated traversal output
- Runtime display and complexity notes
- Responsive dashboard

## Setup (Windows / VS Code)

1. Open this folder in VS Code.
2. Open Terminal → New Terminal.
3. Create a virtual environment (recommended):

   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

   If PowerShell blocks activation, use Command Prompt terminal and run:

   ```bat
   .venv\Scripts\activate.bat
   ```

4. Install Flask:

   ```powershell
   python -m pip install -r requirements.txt
   ```

5. Start the application:

   ```powershell
   python app.py
   ```

6. Open the local address shown in the terminal, usually `http://127.0.0.1:5000`.

## How to demonstrate
1. Click **Load sample**.
2. Choose BFS and start node A; click **Run traversal**.
3. Observe the visit order and animated node states.
4. Switch to DFS and run again from A.
5. Add a node, click **Connect nodes**, then select two nodes.
6. Explain the queue used in BFS and stack/recursion used in DFS.

## DAA notes
For adjacency-list representation, BFS and DFS each run in **O(V + E)** time. Their auxiliary traversal space is **O(V)**. The runtime shown in the interface is a small local measurement and can vary between runs.

The graph is treated as undirected. Nodes unreachable from the selected start node are not included in the traversal order.
