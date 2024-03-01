import { List, Item } from "linked-list";
class Board extends Map {
	constructor() {
		super();
		this.createGraph();
	}

	/**
	 * @param {Array} start
	 * @param {Array} end
	 * @returns {Array}
	 *
	 * knightMoves relies on a Breadth-First-Search algorithm.
	 * this is supposed to give us the shortest path.
	 */
	knightMoves(start, end) {
		const possiblePaths = [];
		const visited = new ModifiedSet();
		visited.addCoordinate(start);

		const startingNode = this.getNode(start);
		const startingPath = [start];
		const queue = [];
		queue.push(startingNode, startingPath);
		while (queue.length > 0) {
			const currentNode = queue.shift();
			const currentPath = queue.shift();

			if (arraysEqual(currentNode.value, end)) {
				const pathFound = currentPath;
				possiblePaths.push(pathFound);
			}

			let neighbor = currentNode.next;
			while (neighbor) {
				if (!visited.hasCoordinate(neighbor.value)) {
					const neighborNode = this.getNode(neighbor.value);
					const extendedPath = [...currentPath, neighbor?.value];
					queue.push(neighborNode, extendedPath);
					markAsVisited(neighbor);
				}
				neighbor = neighbor.next;
			}
		}
		const message = `You made in in ${possiblePaths[0].length - 1} moves!`;
		return [...possiblePaths, message] || "no path found";

		function arraysEqual(arr1, arr2) {
			return JSON.stringify(arr1) === JSON.stringify(arr2);
		}

		function markAsVisited(node) {
			visited.addCoordinate(node.value);
		}
	}

	createGraph() {
		const coordinates = [];

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const coordinate = [i, j];
				coordinates.push(coordinate);
			}
		}

		for (const coordinate of coordinates) {
			const adjacentCoordinates = calculateAdjacents(coordinate);
			const adjacentsList = new List();
			const head = new Item();
			head.value = coordinate;
			adjacentsList.prepend(head);
			for (const adjacent of adjacentCoordinates) {
				const item = new Item();
				item.value = adjacent;
				adjacentsList.append(item);
			}
			this.setAdjacents(coordinate, adjacentsList);
		}

		function calculateAdjacents(coordinate) {
			const [x, y] = coordinate;
			const adjacents = [
				[x - 2, y - 1],
				[x - 2, y + 1],
				[x - 1, y - 2],
				[x - 1, y + 2],
				[x + 1, y - 2],
				[x + 1, y + 2],
				[x + 2, y - 1],
				[x + 2, y + 1],
			];

			const cleanAdjacents = adjacents.filter(
				(coordinate) =>
					coordinate[0] >= 0 &&
					coordinate[1] >= 0 &&
					coordinate[0] < 8 &&
					coordinate[1] < 8,
			);

			return cleanAdjacents;
		}
	}

	getNode(coordinate) {
		if (!coordinate) return null;
		return this.get(`${coordinate}`)?.head;
	}

	setAdjacents(coordinate, adjacents) {
		this.set(`${coordinate}`, adjacents);
	}
}

class ModifiedSet extends Set {
	hasCoordinate(coordinate) {
		return this.has(`${coordinate}`);
	}
	addCoordinate(coordinate) {
		this.add(`${coordinate}`);
	}
}

const m = new Board();
console.log(m.knightMoves([3, 3], [5, 7]));
