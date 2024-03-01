import { List, Item } from "linked-list";
class Board extends Map {
	constructor() {
		super();
		this.mapBoard();
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
		//BUG: It does not return the shortest path for all possibilities.
		const node = this.getNode(start);
		const possiblePaths = [];
		const path = [];
		path.push(node.value);
		const visited = new ModifiedSet();
		visited.addCoordinate(start);
		const queue = [];
		queue.push(node);
		queue.push(path);
		while (queue.length > 0) {
			const currentNode = queue.shift();
			const path = queue.shift();
			if (arraysEqual(currentNode.value, end)) {
				const pathFound = path;
				possiblePaths.push(pathFound);
			}
			let neighbor = currentNode.next;
			while (neighbor) {
				if (!visited.hasCoordinate(neighbor.value)) {
					queue.push(this.getNode(neighbor.value));
					queue.push([...path, neighbor?.value]);
					visited.addCoordinate(neighbor.value);
				}
				neighbor = neighbor.next;
			}
		}
		return null;

		function arraysEqual(arr1, arr2) {
			return JSON.stringify(arr1) === JSON.stringify(arr2);
		}
	}

	mapBoard() {
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

const m = new Board();
console.log(m.knightMoves([0, 0], [3, 2]));
