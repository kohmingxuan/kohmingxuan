class LoadingBar {
	constructor(options = {}) {
		this.domElement = document.createElement("div");
		this.domElement.style.position = 'fixed';
		this.domElement.style.top = '0';
		this.domElement.style.left = '0';
		this.domElement.style.width = '100%';
		this.domElement.style.height = '100%';
        	this.domElement.style.background = options.backgroundColor || '#BBA1CB'; // Background color
		this.domElement.style.opacity = options.opacity || '0.7';
		this.domElement.style.display = 'flex';
		this.domElement.style.alignItems = 'center';
		this.domElement.style.justifyContent = 'center';
		this.domElement.style.zIndex = '1111';

const barContainer = document.createElement("div");
        barContainer.style.position = 'relative';
        this.domElement.appendChild(barContainer);

        const textElement = document.createElement("div");
        textElement.textContent = options.text || "Please wait...";
        textElement.style.position = 'absolute';
        textElement.style.top = options.textTop || '-60px'; // Text position
        textElement.style.left = options.textLeft || '50%';
        textElement.style.transform = 'translateX(-50%)';
        textElement.style.fontSize = options.fontSize || '25px';
        textElement.style.color = options.textColor || 'Purple'; // Text color
        textElement.style.width = '100%';
        textElement.style.textAlign = 'center';
        barContainer.appendChild(textElement);

		
		const barBase = document.createElement("div");
		barBase.style.background = options.baseColor || '#7C191E'; //Change bar colour
		barBase.style.width = '50%';
		barBase.style.minWidth = '250px';
		barBase.style.borderRadius = '10px';
		barBase.style.height = '15px';
		this.domElement.appendChild(barBase);

		const bar = document.createElement("div");
		bar.style.background = options.barColor || '#FFF799';
		bar.style.width = '0';
		bar.style.borderRadius = '10px';
		bar.style.height = '100%';
		barBase.appendChild(bar);
		this.progressBar = bar;

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
