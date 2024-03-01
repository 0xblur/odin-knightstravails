function getAdjacents(coordinate) {
import { List, Item } from "linked-list";
class Board extends Map {
	constructor() {
		super();
		this.mapBoard();
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
class ModifiedSet extends Set {
	hasCoordinate(coordinate) {
		return this.has(`${coordinate}`);
	}
	addCoordinate(coordinate) {
		this.add(`${coordinate}`);
	}
}
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
