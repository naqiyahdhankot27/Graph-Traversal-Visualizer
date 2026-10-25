# GraphVista — Graph Traversal Visualizer

A DAA (Design and Analysis of Algorithms) implementation project built using Python and Flask. It visualizes two fundamental graph traversal algorithms, **Breadth-First Search (BFS)** and **Depth-First Search (DFS)**, through an interactive web interface.

GraphVista helps users understand how graph traversal algorithms explore vertices and how their traversal order differs depending on the algorithm used.

## Features

* Visualizes graph vertices and edges through an interactive interface
* Implements Breadth-First Search (BFS)
* Implements Depth-First Search (DFS)
* Allows users to select a starting vertex
* Loads a predefined sample graph
* Supports adding vertices and edges
* Displays the traversal order of visited vertices
* Provides step-by-step traversal visualization
* Explains the time and space complexity of the algorithms

## Algorithms Used

**1. Breadth-First Search (BFS)**

BFS explores a graph level by level. It visits the starting vertex first, followed by its unvisited neighbors, before moving to the next level.

* **Data structure:** Queue
* **Approach:** First In, First Out (FIFO)
* **Time complexity:** `O(V + E)`

**2. Depth-First Search (DFS)**

DFS explores one path as deeply as possible before backtracking to explore other unvisited vertices.

* **Data structure:** Recursion stack
* **Approach:** Recursive traversal
* **Time complexity:** `O(V + E)`

Here, `V` represents the number of vertices and `E` represents the number of edges.

## Technologies Used

* Python — graph representation and traversal algorithms
* Flask — backend web framework
* HTML — structure of the web interface
* CSS — styling and layout
* JavaScript — user interactions and graph visualization
* SVG (Scalable Vector Graphics) — drawing graph vertices, edges, and highlights
* `collections.deque` — queue implementation for BFS

## Project Structure

```text
GraphVista/
├── app.py                 # Flask application and backend logic
├── requirements.txt       # Python dependencies
├── README.md              # Project documentation
├── LICENSE                # Project license
├── .gitignore             # Files excluded from Git
│
├── templates/
│   └── index.html         # Main webpage
│
└── static/
    ├── style.css          # Interface styling
    └── script.js          # Frontend logic and visualization
```

## Setup and Run (Step by Step)

### Step 1: Install the Requirements

Make sure you have the following installed:

* Python
* Visual Studio Code
* Python extension for VS Code
* Git (optional, if downloading the project ZIP)

During Python installation on Windows, enable the option to add Python to PATH if it is available.

### Step 2: Get the Project

Clone the GitHub repository:

```bash
git clone https://github.com/YOUR-USERNAME/GraphVista.git
cd GraphVista
```

Replace `YOUR-USERNAME` with your actual GitHub username.

Alternatively, download the ZIP file from GitHub, extract it, and open the `GraphVista` folder in VS Code.

### Step 3: Create a Virtual Environment

Open the terminal in VS Code and run:

```bash
python -m venv .venv
```

On Windows PowerShell, activate the environment:

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, run the following command in the same terminal:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then activate the environment again.

### Step 4: Install the Libraries

Install the required Python packages:

```bash
python -m pip install -r requirements.txt
```

### Step 5: Run the Application

Start the Flask server:

```bash
python app.py
```

Wait for the server to start. Open the local address shown in the terminal. If Flask is using its default port, the address will normally be:

```text
http://127.0.0.1:5000
```

### Step 6: Use the Application

1. Open GraphVista in your browser.
2. Load the sample graph or create a graph using the available controls.
3. Select a starting vertex.
4. Choose BFS or DFS.
5. Start the traversal.
6. Observe the order in which vertices are visited.
7. Use the available navigation controls to examine the traversal steps.

To stop the application, press `Ctrl + C` in the terminal.

## How It Works

| Concept        | Meaning in GraphVista                             |
| -------------- | ------------------------------------------------- |
| Graph          | A collection of vertices connected by edges       |
| Vertex         | An individual node in the graph                   |
| Edge           | A connection between two vertices                 |
| Adjacency list | A representation of each vertex and its neighbors |
| BFS            | Explores neighboring vertices level by level      |
| DFS            | Explores a path deeply before backtracking        |
| Queue          | Stores vertices waiting to be explored in BFS     |
| Recursion      | Allows DFS to explore vertices and backtrack      |
| Visited set    | Tracks vertices that have already been visited    |

## Complexity Analysis

Let:

* `V` = number of vertices
* `E` = number of edges

| Parameter                             | BFS            | DFS             |
| ------------------------------------- | -------------- | --------------- |
| Traversal method                      | Level by level | Depth first     |
| Data structure                        | Queue          | Recursion stack |
| Time complexity                       | `O(V + E)`     | `O(V + E)`      |
| Auxiliary space complexity            | `O(V)`         | `O(V)`          |
| Graph storage using an adjacency list | `O(V + E)`     | `O(V + E)`      |

The time complexity of both algorithms is `O(V + E)` when using an adjacency-list representation.

The auxiliary space complexity is `O(V)` for the visited information and the queue or recursion stack in the worst case. The graph itself requires `O(V + E)` space.

## Applications

Graph traversal algorithms are useful in many areas of computer science, including:

* Network exploration
* Connectivity checking
* Social network analysis
* Web crawling
* Pathfinding and route exploration
* Dependency analysis
* Search and problem-solving applications

## Future Improvements

* Support for directed and weighted graphs
* Additional algorithms such as Dijkstra's shortest-path algorithm
* More graph layout options
* Graph import and export functionality
* Improved visualization controls
* Support for larger and more complex graphs

These are possible future improvements and are not necessarily implemented in the current version.

## Output

Screenshots of the running application can be added to demonstrate the graph visualization and traversal results.

Create a folder named `screenshots` in the project directory and save your screenshots inside it.

Example structure:

```text
screenshots/
├── graphvista-demo.png
└── graphvista-traversal.png
```

Display them in this section using:

```markdown
![GraphVista Demo](screenshots/graphvista-demo.png)

![Graph Traversal Visualization](screenshots/graphvista-traversal.png)
```

Replace these example filenames with the actual names of your screenshots.

## Author

**Naqiyah Dhankot**

B.Tech in Computer Science and Engineering (Artificial Intelligence)
Third-Year Student | Semester 5

**Project:** GraphVista — Graph Traversal Visualizer
**Subject:** Design and Analysis of Algorithms (DAA)

This project was developed as part of the DAA coursework to understand and visualize BFS and DFS using Python and web technologies.

## License

Refer to the `LICENSE` file in this repository for the applicable license terms.
