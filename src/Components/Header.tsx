import React, { useContext, useState } from 'react';
import '../Styles/Header.scss';
import node from '../Types/Node';
import { AdjacencyListContext } from '../Context/AdjacencyListContext';
import canvasProvider from '../Types/canvasProvider';
import { CanvasContext } from '../Context/CanvasContext';
import drawEdge from '../Actions/drawEdge';

const Header = () => {
	// const transform = () => {
	// 	return null;
	// };
	const [
		source,
		setSource
	] = useState<string>('');
	const [
		target,
		setTarget
	] = useState<string>('');
	const { nodeList, edgeList, addNode, addEdge } = useContext(AdjacencyListContext);

	const { canvas, context } = useContext<canvasProvider>(CanvasContext);
	console.log(nodeList, edgeList, addNode, addEdge);

	let newNode: node = nodeList[0];
	console.log(newNode);
	const handleThemeChange = (value: boolean): void => {
		if (value) {
			transform();
			document.documentElement.setAttribute('data-theme', 'dark');
		}
		else {
			transform();
			document.documentElement.setAttribute('data-theme', 'light');
		}
	};

	const handleSourceChange = (event: React.FormEvent<HTMLSelectElement>) => {
		setSource((event.target as HTMLSelectElement).value);
	};

	const handleTargetChange = (event: React.FormEvent<HTMLSelectElement>) => {
		setTarget((event.target as HTMLSelectElement).value);
	};

	const handleNewEdge = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (context && canvas) {
			const sourceNb = +source;
			const targetNb = +target;
			drawEdge(nodeList, sourceNb, targetNb, context);
		}
	};

	let transform = () => {
		document.documentElement.classList.add('transition');
		window.setTimeout(() => {
			document.documentElement.classList.remove('transition');
		}, 1000);
	};

	return (
		<header className="header">
			<h4 className="header-text">Graph Visualisation</h4>
			<select value={source} onChange={handleSourceChange} className="source-node">
				{nodeList.map((node) => {
					return <option key={node.value} value={node.value}>{`Node ${node.value}`}</option>;
				})}
			</select>
			<select value={target} onChange={handleTargetChange} className="target-node">
				{nodeList.map((node: node) => {
					if (node.value.toString() !== source) {
						return <option key={node.value} value={node.value}>{`Node ${node.value}`}</option>;
					}
					else {
						return <React.Fragment key={Math.random() * 100} />;
					}
				})}
			</select>
			<button className="add-edge" onClick={handleNewEdge}>
				Add Edge
			</button>
			<div className="toggle-container">
				<input
					type="checkbox"
					id="swtich"
					className="toggle-switch"
					onClick={(event) => {
						handleThemeChange((event.target as HTMLInputElement).checked);
					}}
				/>
				<label htmlFor="swtich" className="toggle-label">
					Switch
				</label>
			</div>
		</header>
	);
};

export default Header;
