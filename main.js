function getAdjacents(coordinate) {
import { List, Item } from "linked-list";
class Board extends Map {
	constructor() {
		super();
		this.mapBoard();
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
