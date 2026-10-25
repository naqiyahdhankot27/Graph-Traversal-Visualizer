# GraphVista — Graph Traversal Visualizer

A DAA (Design and Analysis of Algorithms) project developed using Python and Flask. It visualizes two fundamental graph traversal algorithms, **Breadth-First Search (BFS)** and **Depth-First Search (DFS)**, through an interactive web interface.

GraphVista helps users understand how graph traversal algorithms explore vertices and how their traversal order differs.

## Features

* Interactive visualization of graph vertices and edges
* Implementation of Breadth-First Search (BFS)
* Implementation of Depth-First Search (DFS)
* Selection of a starting vertex
* Predefined sample graph
* Option to add vertices and edges
* Visualization of the traversal order
* Step-by-step traversal navigation
* Algorithm complexity information

## Algorithms Used

### 1. Breadth-First Search (BFS)

BFS explores a graph level by level, visiting neighboring vertices before moving to the next level.

* **Data structure:** Queue
* **Approach:** First In, First Out (FIFO)
* **Time complexity:** `O(V + E)`

### 2. Depth-First Search (DFS)

DFS explores one path as deeply as possible before backtracking to explore other unvisited vertices.

* **Data structure:** Recursion stack
* **Approach:** Recursive traversal
* **Time complexity:** `O(V + E)`

Here, `V` represents the number of vertices and `E` represents the number of edges.

## Technologies Used

* **Python:** Graph representation and traversal algorithms
* **Flask:** Backend web framework
* **HTML:** Structure of the web interface
* **CSS:** Interface styling
* **JavaScript:** User interactions and visualization
* **SVG:** Drawing graph vertices, edges, and highlights
* **collections.deque:** Queue implementation for BFS

## Project Structure

```text
GraphVista/
├── app.py
├── requirements.txt
├── README.md
├── LICENSE
├── .gitignore
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── screenshots/
    ├── graphvista-demo.png
    └── graphvista-traversal.png
```

## Setup and Run (Step by Step)

### Step 1: Install the Requirements

The following software is required:

* Python
* Visual Studio Code
* Python extension for VS Code
* Git

### Step 2: Clone the Repository

```bash
git clone https://github.com/naqiyahdhankot27/GraphVista.git
cd GraphVista
```

### Step 3: Create a Virtual Environment

```bash
python -m venv .venv
```

On Windows PowerShell, activate the virtual environment:

```powershell
.\.venv\Scripts\Activate.ps1
```

### Step 4: Install Dependencies

```bash
python -m pip install -r requirements.txt
```

### Step 5: Run the Application

```bash
python app.py
```

Once the Flask server starts, open the application in a browser:

http://127.0.0.1:5000

### Step 6: Use GraphVista

1. Open the application in your browser.
2. Load the sample graph or create a graph using the available controls.
3. Select a starting vertex.
4. Choose BFS or DFS.
5. Start the traversal.
6. Observe the traversal order and visualization.
7. Use the available navigation controls to examine the traversal steps.

Press `Ctrl + C` in the terminal to stop the application.

## How It Works

| Concept        | Description                                    |
| -------------- | ---------------------------------------------- |
| Graph          | A collection of vertices connected by edges    |
| Vertex         | An individual node in the graph                |
| Edge           | A connection between two vertices              |
| Adjacency list | Stores the neighboring vertices of each vertex |
| BFS            | Explores neighboring vertices level by level   |
| DFS            | Explores a path deeply before backtracking     |
| Queue          | Stores vertices waiting to be explored in BFS  |
| Recursion      | Allows DFS to explore and backtrack            |
| Visited set    | Tracks vertices that have already been visited |

## Complexity Analysis

Let:

* `V` = number of vertices
* `E` = number of edges

| Parameter                  | BFS            | DFS             |
| -------------------------- | -------------- | --------------- |
| Traversal method           | Level by level | Depth first     |
| Data structure             | Queue          | Recursion stack |
| Time complexity            | `O(V + E)`     | `O(V + E)`      |
| Auxiliary space complexity | `O(V)`         | `O(V)`          |
| Graph storage              | `O(V + E)`     | `O(V + E)`      |

The time complexity of BFS and DFS is `O(V + E)` when the graph is represented using an adjacency list.

The auxiliary space complexity is `O(V)` for the visited information and traversal data structures in the worst case. The graph itself requires `O(V + E)` space.

## Applications

Graph traversal algorithms are commonly used in:

* Network exploration
* Connectivity checking
* Social network analysis
* Web crawling
* Pathfinding
* Dependency analysis
* Search and problem-solving applications

## Future Improvements

* Support for directed and weighted graphs
* Additional graph algorithms, such as Dijkstra's algorithm
* More graph layout options
* Graph import and export functionality
* Enhanced visualization controls
* Support for larger and more complex graphs

## Output

### GraphVista Interface

![GraphVista Demo](screenshots/graphvista-demo.png)

### Graph Traversal Visualization

![Graph Traversal](screenshots/graphvista-traversal.png)

## Author

**Naqiyah Dhankot**

B.Tech in Computer Science and Engineering (Artificial Intelligence)
Third-Year Student | Semester 5

**Project:** GraphVista — Graph Traversal Visualizer
**Subject:** Design and Analysis of Algorithms (DAA)

This project was developed as part of the DAA coursework to understand and visualize BFS and DFS using Python and web technologies.

## License

This project is distributed under the terms specified in the `LICENSE` file.
