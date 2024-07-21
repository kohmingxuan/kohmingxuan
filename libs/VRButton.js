/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 * @author NikLever / http://niklever.com
 */

/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 * @author NikLever / http://niklever.com
 */

class VRButton {

    constructor(renderer, options) {
        this.renderer = renderer;
        if (options !== undefined) {
            this.onSessionStart = options.onSessionStart;
            this.onSessionEnd = options.onSessionEnd;
            this.sessionInit = options.sessionInit;
            this.sessionMode = (options.inline !== undefined && options.inline) ? 'inline' : 'immersive-vr';
        } else {
            this.sessionMode = 'immersive-vr';
        }

        if (this.sessionInit === undefined) this.sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor'] };

        if ('xr' in navigator) {

            const button = document.createElement('button');
            button.style.display = 'none';
            button.style.height = '60px'; // Updated height to make it circular

            navigator.xr.isSessionSupported(this.sessionMode).then((supported) => {

                supported ? this.showEnterVR(button) : this.showWebXRNotFound(button);
                if (options && options.vrStatus) options.vrStatus(supported);

            });

            document.body.appendChild(button);

        } else {

            const message = document.createElement('a');

            if (window.isSecureContext === false) {

                message.href = document.location.href.replace(/^http:/, 'https:');
                message.innerHTML = 'WEBXR NEEDS HTTPS';

            } else {

                message.href = 'https://immersiveweb.dev/';
                message.innerHTML = 'WEBXR NOT AVAILABLE';

            }

            message.style.left = '0px';
            message.style.width = '100%';
            message.style.textDecoration = 'none';

            this.stylizeElement(message, false);
            message.style.bottom = '0px';
            message.style.opacity = '1';

            document.body.appendChild(message);

            if (options.vrStatus) options.vrStatus(false);

        }

    }

    showEnterVR(button) {

        let currentSession = null;
        const self = this;

        this.stylizeElement(button, true, 30, true);

        function onSessionStarted(session) {

            session.addEventListener('end', onSessionEnded);

            self.renderer.xr.setSession(session);
            self.stylizeElement(button, false, 12, true);

            button.textContent = 'END VR';

            currentSession = session;

            if (self.onSessionStart !== undefined) self.onSessionStart();

        }

        function onSessionEnded() {

            currentSession.removeEventListener('end', onSessionEnded);

            self.stylizeElement(button, true, 12, true);
            button.textContent = 'VR MODE';

            currentSession = null;

            if (self.onSessionEnd !== undefined) self.onSessionEnd();

        }

        //

        button.style.display = '';
        button.style.right = '20px';
        button.style.width = '60px'; // Updated width
        button.style.height = '60px'; // Updated height to make it circular
        button.style.cursor = 'pointer';
        button.style.background = 'rgba(0,123,255,1)'; // Updated background color
        button.style.borderRadius = '50%'; // Updated to make the button circular
        button.style.border = '2px solid #000'; // Updated border
        button.innerHTML = '<i class="fas fa-vr-cardboard"></i>';

        button.onmouseenter = function () {

            button.style.fontSize = '12px';
            button.textContent = (currentSession === null) ? 'VR MODE' : 'END VR';
            button.style.opacity = '1.0';

        };

        button.onmouseleave = function () {

            button.style.fontSize = '30px';
            button.innerHTML = '<i class="fas fa-vr-cardboard"></i>';
            button.style.opacity = '0.8';

        };

        button.onclick = function () {

            if (currentSession === null) {

                navigator.xr.requestSession(self.sessionMode, self.sessionInit).then(onSessionStarted);

            } else {

                currentSession.end();

            }

        };

    }

    disableButton(button) {

        button.style.cursor = 'auto';
        button.style.opacity = '0.5';

        button.onmouseenter = null;
        button.onmouseleave = null;

        button.onclick = null;

    }

    showWebXRNotFound(button) {
        this.stylizeElement(button, false);

        this.disableButton(button);

        button.style.display = '';
        button.style.width = '100%';
        button.style.right = '0px';
        button.style.bottom = '0px';
        button.style.border = '';
        button.style.opacity = '1';
        button.style.fontSize = '13px';
        button.textContent = 'VR NOT SUPPORTED';

    }

    stylizeElement(element, active = true, fontSize = 13, ignorePadding = false) {

        element.style.position = 'absolute';
        element.style.bottom = '20px';
        if (!ignorePadding) element.style.padding = '12px 6px';
        element.style.border = '2px solid #000'; // Changed border color and thickness
        element.style.borderRadius = '50%'; // Changed to make the button circular
        element.style.background = (active) ? 'rgba(0,123,255,1)' : 'rgba(220,53,69,1)'; // Changed background colors
        element.style.color = '#fff'; // Text color
        element.style.font = `normal ${fontSize}px sans-serif`;
        element.style.textAlign = 'center';
        element.style.opacity = '0.8'; // Changed opacity
        element.style.outline = 'none';
        element.style.zIndex = '999';

    }

};

export { VRButton };
