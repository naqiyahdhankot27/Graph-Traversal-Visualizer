from collections import deque
from time import perf_counter

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


def build_graph(nodes, edges):
    """Create an adjacency list from the nodes and edges sent by the browser."""
    graph = {node["id"]: [] for node in nodes}

    for edge in edges:
        start = edge.get("from")
        end = edge.get("to")
        if start in graph and end in graph and start != end:
            if end not in graph[start]:
                graph[start].append(end)
            if start not in graph[end]:
                graph[end].append(start)

    return graph


def run_bfs(graph, start):
    """Breadth-First Search: visit nearby vertices before moving farther away."""
    queue = deque([start])
    visited = {start}
    order = []
    steps = [{"type": "start", "node": start, "message": f"Start at node {start} and add it to the queue."}]

    while queue:
        current = queue.popleft()
        order.append(current)
        steps.append({
            "type": "visit",
            "node": current,
            "message": f"Remove {current} from the queue and visit it."
        })

        for neighbour in graph[current]:
            if neighbour not in visited:
                visited.add(neighbour)
                queue.append(neighbour)
                steps.append({
                    "type": "discover",
                    "node": neighbour,
                    "from": current,
                    "message": f"Discover {neighbour} from {current} and add it to the queue."
                })

    return order, steps


def run_dfs(graph, start):
    """Depth-First Search: keep moving deeper until there is no unvisited neighbour."""
    visited = set()
    order = []
    steps = [{"type": "start", "node": start, "message": f"Start at node {start}. Mark it as visited."}]

    def visit(node):
        visited.add(node)
        order.append(node)
        steps.append({
            "type": "visit",
            "node": node,
            "message": f"Visit node {node}."
        })

        for neighbour in graph[node]:
            if neighbour not in visited:
                steps.append({
                    "type": "discover",
                    "node": neighbour,
                    "from": node,
                    "message": f"Move from {node} to its unvisited neighbour {neighbour}."
                })
                visit(neighbour)
            else:
                steps.append({
                    "type": "check",
                    "node": neighbour,
                    "from": node,
                    "message": f"{neighbour} has already been visited, so skip it."
                })

    visit(start)
    return order, steps


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/traverse", methods=["POST"])
def traverse():
    data = request.get_json(silent=True) or {}
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    start = data.get("start")
    algorithm = data.get("algorithm", "bfs").lower()

    if not nodes:
        return jsonify({"error": "Add at least one node before running an algorithm."}), 400

    graph = build_graph(nodes, edges)
    if start not in graph:
        return jsonify({"error": "Choose a valid start node."}), 400

    started = perf_counter()
    if algorithm == "dfs":
        order, steps = run_dfs(graph, start)
        algorithm_name = "Depth-First Search"
    else:
        order, steps = run_bfs(graph, start)
        algorithm_name = "Breadth-First Search"
    elapsed_ms = (perf_counter() - started) * 1000

    unreachable = [node for node in graph if node not in order]
    return jsonify({
        "algorithm": algorithm_name,
        "order": order,
        "steps": steps,
        "visited_count": len(order),
        "total_nodes": len(nodes),
        "unreachable": unreachable,
        "runtime_ms": round(elapsed_ms, 4),
        "complexity": "O(V + E)"
    })


if __name__ == "__main__":
    app.run(debug=True)
