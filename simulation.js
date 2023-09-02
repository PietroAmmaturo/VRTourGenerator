AFRAME.registerComponent('image-tour', {
    schema: {
        images: { type: 'selectorAll' },
        radius: { type: 'number', default: 2 },
        scale: { type: 'string', default: '1 1 1' },
        mode: { type: 'string', default: 'all' }
    },
    init: function () {
        const sources = this.data.images.map(el => el.src);

        sources.forEach((source, index) => {
            const radius = this.data.radius;
            const angle = (2 * Math.PI * index) / sources.length; // Calculate the angle for each point
            const x = radius * Math.cos(angle);   // Calculate the x-coordinate
            const z = radius * Math.sin(angle);   // Calculate the y-coordinate
            const scale = this.data.scale;
            const mode = this.data.mode;

            const hotspotEl =
            `<a-image src='${source}' scale='${scale}'
            position='${x} 0 ${z}' look-at='[camera]'
            hotspot></a-image>`
            this.el.innerHTML += hotspotEl;

            const playerEl =
            `<a-entity player='mode: ${mode}'></a-entity>`
            this.el.innerHTML += playerEl;
        });
    },
    remove: function () {
        while (this.el.firstChild) {
            this.el.removeChild(this.el.lastChild);
        }
    }
});

class Simulationmanager {
    constructor(simulateButtonSelector, radiusInputSelector, widthInputSelector, heightInputSelector, hotspotsSelector, modeInputSelector) {
      this.simulateButton = document.querySelector(simulateButtonSelector);
      this.radiusInput = document.querySelector(radiusInputSelector);
      this.widthInput = document.querySelector(widthInputSelector);
      this.heightInput = document.querySelector(heightInputSelector);
      this.modeInput = document.querySelector(modeInputSelector);
      this.hotspots = document.querySelector(hotspotsSelector);
  
      this.simulateButton.addEventListener('click', () => this.simulate());
    }
  
    simulate() {
      const radius = parseFloat(this.radiusInput.value);
      const scale = this.parseScale(this.widthInput.value, this.heightInput.value);
      const mode = this.modeInput.value;

      document.querySelectorAll('.thumbnail').forEach(el => el.setAttribute('id', ('id' + Math.random()).replace('0.', '_')));
  
      this.hotspots.removeAttribute('image-tour');
      this.hotspots.setAttribute('image-tour', {
        images: '.thumbnail',
        radius: radius,
        scale: scale,
        mode: mode
      });
    }
  
    parseScale(w, h) {
      return w + ' ' + h + ' 1';
    }
  }
  
  // Instantiate the class with appropriate selectors
  const simulator = new Simulationmanager(
    "#simulateButton",
    "#radius",
    "#width",
    "#height",
    "#hotspots",
    "#mode"
  );

  
  
  
  