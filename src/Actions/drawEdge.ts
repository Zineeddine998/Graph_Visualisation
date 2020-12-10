import node from '../Types/Node';

const drawEdge = (nodeList: node[], source: number, target: number, context: CanvasRenderingContext2D): void => {
	const sourceX = nodeList[source].x;
	const sourceY = nodeList[source].y;
	const targetX = nodeList[target].x;
	const targetY = nodeList[target].y;
	context.beginPath();
	context.moveTo(sourceX, sourceY);
	context.lineTo(targetX, targetY);
	context.stroke();
};

export default drawEdge;
