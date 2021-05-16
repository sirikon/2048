import { update } from './update'
import { render } from './render'

let lastUpdate: number;

export function loop(): void {
	lastUpdate = performance.now();
	animate();
}

function animate() {
	requestAnimationFrame(animate);
	const now = performance.now();
	const deltaTime = now - lastUpdate;
	update(deltaTime);
	render();
	lastUpdate = now;
}
