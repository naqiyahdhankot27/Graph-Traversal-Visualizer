
const svg = document.getElementById("graphSvg");
const startNodeSelect = document.getElementById("startNode");
const edgeFromSelect = document.getElementById("edgeFrom");
const edgeToSelect = document.getElementById("edgeTo");
const toast = document.getElementById("toast");

let nodes = [];
let edges = [];
let selectedAlgorithm = "bfs";
let traversal = null;
let currentStep = -1;
let toastTimer = null;

// Sample graph
const sampleNodes = [
    { id: "A", x: 115, y: 110 },
    { id: "B", x: 300, y: 75 },
    { id: "C", x: 300, y: 220 },
    { id: "D", x: 490, y: 110 },
    { id: "E", x: 490, y: 280 },
    { id: "F", x: 665, y: 190 },
    { id: "G", x: 115, y: 290 }
];

const sampleEdges = [
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "A", to: "G" },
    { from: "B", to: "D" },
    { from: "C", to: "D" },
    { from: "C", to: "E" },
    { from: "D", to: "F" },
    { from: "E", to: "F" }
];

// Display a temporary message
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

// Reset traversal results
function resetTraversalUI() {
    traversal = null;
    currentStep = -1;

    document.getElementById("visitedCount").textContent = "—";
    document.getElementById("visitedHint").textContent =
        "Run an algorithm to begin";

    document.getElementById("runtime").textContent = "—";
    document.getElementById("resultTag").textContent = "Waiting to run";

    document.getElementById("visitOrder").innerHTML =
        '<span class="placeholder-text">Your traversal sequence will appear here.</span>';

    document.getElementById("stepMessage").innerHTML =
        '<span class="message-icon">i</span><span>Run BFS or DFS to see an explanation for each step.</span>';

    document.getElementById("stepCount").textContent = "Step 0 of 0";
    document.getElementById("prevStepButton").disabled = true;
    document.getElementById("nextStepButton").disabled = true;

    drawGraph();
}

// Update a dropdown with the current nodes
function fillSelect(select, selectedValue) {
    const oldValue = selectedValue || select.value;

    select.innerHTML = "";

    nodes.forEach(node => {
        const option = document.createElement("option");

        option.value = node.id;
        option.textContent = node.id;

        select.appendChild(option);
    });

    if (nodes.some(node => node.id === oldValue)) {
        select.value = oldValue;
    }
}

// Update graph statistics
function updateCounts() {
    document.getElementById("vertexCount").textContent = nodes.length;
    document.getElementById("edgeCount").textContent = edges.length;

    const emptyState = document.getElementById("emptyState");

    if (emptyState) {
        emptyState.hidden = nodes.length > 0;
    }
}

// Find a node by its ID
function getNode(id) {
    return nodes.find(node => node.id === id);
}

// Create an SVG element
function makeSvg(tag, attributes = {}) {
    const element = document.createElementNS(
        "http://www.w3.org/2000/svg",
        tag
    );

    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });

    return element;
}

/*
 * HIERARCHICAL GRAPH LAYOUT
 *
 * The selected starting node is placed at the top of its component.
 * Its neighbours are placed on the next level, followed by nodes
 * farther away from the starting node.
 *
 * Only existing edges are used to calculate the layout.
 * This function does not add, delete, or change graph connections.
 *
 * Cycles and cross-edges remain part of the original graph.
 * Disconnected components are kept separate.
 */
function layoutGraph() {
    if (nodes.length === 0) {
        return;
    }

    // Build an adjacency list using only real edges.
    const adjacency = new Map();

    nodes.forEach(node => {
        adjacency.set(node.id, []);
    });

    edges.forEach(edge => {
        if (
            adjacency.has(edge.from) &&
            adjacency.has(edge.to)
        ) {
            adjacency.get(edge.from).push(edge.to);
            adjacency.get(edge.to).push(edge.from);
        }
    });

    // Prefer the selected start node as the root.
    const root = nodes.some(node => node.id === startNodeSelect.value)
        ? startNodeSelect.value
        : nodes[0].id;

    const levels = new Map();
    const componentOf = new Map();
    const components = [];

    /*
     * Discover connected components using BFS.
     * The selected starting node's component is handled first.
     */
    const rootOrder = [
        root,
        ...nodes
            .map(node => node.id)
            .filter(id => id !== root)
    ];

    rootOrder.forEach(componentRoot => {
        if (componentOf.has(componentRoot)) {
            return;
        }

        const componentIndex = components.length;
        const queue = [componentRoot];

        components.push({
            root: componentRoot,
            index: componentIndex
        });

        componentOf.set(componentRoot, componentIndex);
        levels.set(componentRoot, 0);

        let head = 0;

        while (head < queue.length) {
            const current = queue[head];
            head++;

            const neighbours = adjacency.get(current) || [];

            neighbours.forEach(neighbour => {
                if (!componentOf.has(neighbour)) {
                    componentOf.set(neighbour, componentIndex);

                    levels.set(
                        neighbour,
                        levels.get(current) + 1
                    );

                    queue.push(neighbour);
                }
            });
        }
    });

    /*
     * Group nodes by their distance from the root of their
     * connected component.
     */
    const levelGroups = new Map();

    nodes.forEach(node => {
        const level = levels.get(node.id) || 0;

        if (!levelGroups.has(level)) {
            levelGroups.set(level, []);
        }

        levelGroups.get(level).push(node);
    });

    const width = 760;
    const top = 40;
    const bottom = 325;

    const maxLevel = Math.max(0, ...levels.values());

    const verticalGap = maxLevel === 0
        ? 0
        : Math.min(85, (bottom - top) / maxLevel);

    /*
     * Keep the levels horizontally centred.
     * Stable ordering makes the layout predictable.
     */
    levelGroups.forEach((group, level) => {
        group.sort((a, b) => {
            const componentDifference =
                componentOf.get(a.id) - componentOf.get(b.id);

            if (componentDifference !== 0) {
                return componentDifference;
            }

            return a.id.localeCompare(
                b.id,
                undefined,
                { numeric: true }
            );
        });

        const leftMargin = 45;
        const rightMargin = width - 45;

        const horizontalGap = group.length > 1
            ? (rightMargin - leftMargin) / (group.length - 1)
            : 0;

        group.forEach((node, index) => {
            node.x = group.length === 1
                ? width / 2
                : leftMargin + horizontalGap * index;

            node.y = top + verticalGap * level;
        });
    });
}

// Draw the graph
function drawGraph() {
    // Recalculate node positions before drawing.
    layoutGraph();

    svg.innerHTML = "";

    const visited = new Set();

    const current =
        currentStep >= 0 && traversal
            ? traversal.steps[currentStep]?.node
            : null;

    if (traversal && currentStep >= 0) {
        traversal.steps
            .slice(0, currentStep + 1)
            .forEach(step => {
                if (step.type === "visit") {
                    visited.add(step.node);
                }
            });
    }

    /*
     * Draw only edges that actually exist.
     * Cross-edges and cycles are preserved.
     */
    edges.forEach(edge => {
        const a = getNode(edge.from);
        const b = getNode(edge.to);

        if (!a || !b) {
            return;
        }

        const line = makeSvg("line", {
            x1: a.x,
            y1: a.y,
            x2: b.x,
            y2: b.y,
            class: "edge-line"
        });

        svg.appendChild(line);
    });

    // Draw nodes after edges so the nodes appear in front of the lines.
    nodes.forEach(node => {
        const classes = [
            "graph-node",
            visited.has(node.id) ? "visited" : "",
            current === node.id ? "current" : "",
            startNodeSelect.value === node.id ? "start-node" : ""
        ].filter(Boolean).join(" ");

        const group = makeSvg("g", {
            class: classes,
            tabindex: "0",
            role: "button",
            "aria-label": `Set ${node.id} as starting node`
        });

        group.appendChild(
            makeSvg("circle", {
                cx: node.x,
                cy: node.y,
                r: 27,
                class: "node-halo"
            })
        );

        group.appendChild(
            makeSvg("circle", {
                cx: node.x,
                cy: node.y,
                r: 20,
                class: "node-circle"
            })
        );

        const label = makeSvg("text", {
            x: node.x,
            y: node.y + 1,
            class: "node-label"
        });

        label.textContent = node.id;
        group.appendChild(label);

        // Clicking a node makes it the starting node.
        group.addEventListener("click", () => {
            startNodeSelect.value = node.id;

            drawGraph();

            showToast(`Starting node set to ${node.id}`);
        });

        // Allow keyboard selection too.
        group.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();

                startNodeSelect.value = node.id;

                drawGraph();
            }
        });

        svg.appendChild(group);
    });

    updateCounts();
}

// Load the default sample graph
function loadSample() {
    nodes = sampleNodes.map(node => ({ ...node }));
    edges = sampleEdges.map(edge => ({ ...edge }));

    fillSelect(startNodeSelect, "A");
    fillSelect(edgeFromSelect, "A");
    fillSelect(edgeToSelect, "B");

    resetTraversalUI();
    drawGraph();

    showToast("Sample graph loaded.");
}

// Display the BFS or DFS traversal order
function renderVisitOrder() {
    const output = document.getElementById("visitOrder");

    output.innerHTML = "";

    traversal.order.forEach((id, index) => {
        const chip = document.createElement("div");
        chip.className = "visit-chip";

        const node = document.createElement("span");
        node.className = "chip-node";
        node.textContent = id;

        chip.appendChild(node);

        if (index < traversal.order.length - 1) {
            const arrow = document.createElement("span");

            arrow.className = "chip-arrow";
            arrow.textContent = "→";

            chip.appendChild(arrow);
        }

        output.appendChild(chip);
    });
}

// Show an individual traversal step
function showStep(index) {
    if (
        !traversal ||
        index < 0 ||
        index >= traversal.steps.length
    ) {
        return;
    }

    currentStep = index;

    const step = traversal.steps[index];

    document.getElementById("stepCount").textContent =
        `Step ${index + 1} of ${traversal.steps.length}`;

    const message = document.getElementById("stepMessage");

    message.innerHTML = "";

    const icon = document.createElement("span");
    icon.className = "message-icon";
    icon.textContent = "i";

    const text = document.createElement("span");
    text.textContent = step.message;

    message.append(icon, text);

    document.getElementById("prevStepButton").disabled =
        index === 0;

    document.getElementById("nextStepButton").disabled =
        index === traversal.steps.length - 1;

    drawGraph();
}

// Run BFS or DFS using the Flask backend
async function runTraversal() {
    if (!nodes.length) {
        showToast("Add at least one node first.");
        return;
    }

    const runButton = document.getElementById("runButton");

    runButton.disabled = true;
    runButton.textContent = "Running...";

    try {
        const response = await fetch("/traverse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nodes,
                edges,
                start: startNodeSelect.value,
                algorithm: selectedAlgorithm
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Could not run the algorithm."
            );
        }

        traversal = result;
        currentStep = -1;

        renderVisitOrder();

        document.getElementById("visitedCount").textContent =
            result.visited_count;

        document.getElementById("visitedHint").textContent =
            `of ${result.total_nodes} total nodes`;

        document.getElementById("runtime").textContent =
            `${result.runtime_ms} ms`;

        document.getElementById("resultTag").textContent =
            selectedAlgorithm.toUpperCase() + " complete";

        if (result.unreachable.length) {
            showToast(
                `Traversal finished. Unreachable nodes: ${result.unreachable.join(", ")}`
            );
        } else {
            showToast(
                "Traversal calculated. Use Next to explore each step."
            );
        }

        if (result.steps.length) {
            showStep(0);
        }

    } catch (error) {
        showToast(error.message);

    } finally {
        runButton.disabled = false;
        runButton.textContent = "▶ Run traversal";
    }
}

// Choose BFS or DFS
document.querySelectorAll(".algorithm-option").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".algorithm-option").forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedAlgorithm = button.dataset.algorithm;

        resetTraversalUI();
    });
});

// Main controls
document.getElementById("runButton")
    .addEventListener("click", runTraversal);

document.getElementById("resetButton")
    .addEventListener("click", resetTraversalUI);

document.getElementById("sampleButton")
    .addEventListener("click", loadSample);

document.getElementById("prevStepButton")
    .addEventListener("click", () => {
        showStep(currentStep - 1);
    });

document.getElementById("nextStepButton")
    .addEventListener("click", () => {
        showStep(currentStep + 1);
    });

// Re-layout when the starting node changes.
startNodeSelect.addEventListener("change", drawGraph);

// Add a new node
document.getElementById("addNodeButton")
    .addEventListener("click", () => {
        const input = document.getElementById("newNodeInput");

        const id = input.value.trim().toUpperCase();

        if (!id) {
            return showToast("Enter a label for the new node.");
        }

        if (nodes.some(node => node.id === id)) {
            return showToast("A node with that label already exists.");
        }

        if (nodes.length >= 20) {
            return showToast("This demo supports up to 20 nodes.");
        }

        // Initial coordinates are replaced by layoutGraph().
        nodes.push({
            id,
            x: 380,
            y: 180
        });

        fillSelect(startNodeSelect, id);
        fillSelect(edgeFromSelect, edgeFromSelect.value || id);
        fillSelect(edgeToSelect, edgeToSelect.value || id);

        input.value = "";

        resetTraversalUI();

        showToast(`Node ${id} added. Connect it to another node.`);
    });

// Connect two nodes
document.getElementById("connectButton")
    .addEventListener("click", () => {
        const from = edgeFromSelect.value;
        const to = edgeToSelect.value;

        if (!from || !to) {
            return showToast("Add at least two nodes first.");
        }

        if (from === to) {
            return showToast("Choose two different nodes.");
        }

        const alreadyConnected = edges.some(edge =>
            (edge.from === from && edge.to === to) ||
            (edge.from === to && edge.to === from)
        );

        if (alreadyConnected) {
            return showToast("Those nodes are already connected.");
        }

        edges.push({ from, to });

        resetTraversalUI();

        showToast(`Connected ${from} ↔ ${to}.`);
    });

// Clear the graph
document.getElementById("clearButton")
    .addEventListener("click", () => {
        nodes = [];
        edges = [];

        fillSelect(startNodeSelect);
        fillSelect(edgeFromSelect);
        fillSelect(edgeToSelect);

        resetTraversalUI();

        showToast("Graph cleared. Add a node or load the sample.");
    });

// Start with the sample graph
loadSample();
