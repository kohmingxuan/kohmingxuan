class LoadingBar {
	constructor(options = {}) {
		this.domElement = document.createElement("div");
		this.domElement.style.position = 'fixed';
		this.domElement.style.top = '0';
		this.domElement.style.left = '0';
		this.domElement.style.width = '100%';
		this.domElement.style.height = '100%';
		this.domElement.style.background = options.backgroundColor || '#000';
		this.domElement.style.opacity = options.opacity || '0.7';
		this.domElement.style.display = 'flex';
		this.domElement.style.alignItems = 'center';
		this.domElement.style.justifyContent = 'center';
		this.domElement.style.zIndex = '1111';

		const barBase = document.createElement("div");
		barBase.style.background = options.baseColor || '#aaa';
		barBase.style.width = '50%';
		barBase.style.minWidth = '250px';
		barBase.style.borderRadius = '10px';
		barBase.style.height = '15px';
		this.domElement.appendChild(barBase);

		const bar = document.createElement("div");
		bar.style.background = options.barColor || '#22a';
		bar.style.width = '0';
		bar.style.borderRadius = '10px';
		bar.style.height = '100%';
		barBase.appendChild(bar);
		this.progressBar = bar;

		// Add text element
		const textElement = document.createElement("div");
		textElement.style.position = 'absolute';
		textElement.style.color = options.textColor || '#fff';
		textElement.style.fontSize = options.fontSize || '16px';
		textElement.style.top = options.textTop || '70%';
		textElement.innerText = options.text || 'Loading...';
		this.domElement.appendChild(textElement);

		document.body.appendChild(this.domElement);
	}

	set progress(delta) {
		const percent = delta * 100;
		this.progressBar.style.width = `${percent}%`;
	}

	set visible(value) {
		if (value) {
			this.domElement.style.display = 'flex';
		} else {
			this.domElement.style.display = 'none';
		}
	}
}

export { LoadingBar };

// Usage example
const loader = new LoadingBar({
	backgroundColor: '#333',
	baseColor: '#555',
	barColor: '#4caf50',
	textColor: '#fff',
	fontSize: '18px',
	textTop: '60%',
	text: 'Please wait...'
});

loader.progress = 0.5;