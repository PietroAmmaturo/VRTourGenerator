AFRAME.registerComponent('hotspot', {
    schema: {
        sky: { type: 'selector', default: 'a-sky' }
    },
    init: function () {
        this.el.addEventListener('click', (function () {
            this.data.sky.setAttribute('color', '#fff')
            this.data.sky.setAttribute('src', this.el.getAttribute('src'));
        }).bind(this));
    }
});


AFRAME.registerComponent('player', {
    schema: {
        mode: { default: 'all'}
    },
    init: function () {
        this.cameraEntity = document.createElement('a-entity');
        this.cameraEntity.setAttribute('camera', '');
        this.cameraEntity.setAttribute('position', '0 1.6 0');
        this.cameraEntity.setAttribute('look-controls', '');

        this.rigEntity = document.createElement('a-entity');
        this.rigEntity.setAttribute('id', 'rig');
        this.rigEntity.setAttribute('position', '0 0 0');
        this.rigEntity.appendChild(this.cameraEntity);
        
        this.el.appendChild(this.rigEntity);

        switch (this.data.mode) {
            case 'vr':
                this.setupVr();
                break;
            case 'mouse':
                this.setupMouse();
                break;
            case 'touch':
                this.setupTouch();
                break;
            case 'gaze':
                this.setupGaze();
                break;
            case 'all':
                this.setupVr();
                this.setupMouse();
                this.setupTouch();
                this.setupGaze();
                break;
            default:
                break;
        }
    },
    setupVr: function () {
        function createController(hand) {
            const controllerEntity = document.createElement('a-entity');
            controllerEntity.setAttribute('generic-tracked-controller-controls', `hand: ${hand}`);
            controllerEntity.setAttribute('cursor', 'downEvents: triggerdown');
            controllerEntity.setAttribute('raycaster', 'showLine: true; far: 1000; interval: 0; objects: [hotspot];');
            controllerEntity.setAttribute('line', 'color: lawngreen; opacity: 0.5');
            controllerEntity.setAttribute('visible', 'true');
            return controllerEntity;
        }
        const leftControllerEntity = createController('left');
        const rightControllerEntity = createController('right');
        this.rigEntity.appendChild(leftControllerEntity);
        this.rigEntity.appendChild(rightControllerEntity);
    },
    setupMouse: function () {
        this.rigEntity.setAttribute('cursor', 'rayOrigin: mouse');
        this.rigEntity.setAttribute('raycaster', 'far: 1000; interval: 0; objects: [hotspot];');
    },
    setupTouch: function () {
        this.rigEntity.setAttribute('cursor', 'rayOrigin: mouse');
        this.rigEntity.setAttribute('raycaster', 'far: 1000; interval: 0; objects: [hotspot];');
    },
    setupGaze: function () {
        const cursorEl = document.createElement('a-entity');
        cursorEl.setAttribute('animation__click', 'property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.0001 0.0001 0.0001; to: 0.001 0.001 0.001');
        cursorEl.setAttribute('animation__fusing', 'property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 0.001 0.001 0.001; to: 0.0001 0.0001 0.0001');
        cursorEl.setAttribute('animation__mouseleave', 'property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 0.001 0.001 0.001');
        cursorEl.setAttribute('cursor', 'fuse: true;');
        cursorEl.setAttribute('material', 'color: black; shader: flat');
        cursorEl.setAttribute('geometry', 'primitive: ring');
        cursorEl.setAttribute('position', '0 0 -0.1');
        cursorEl.setAttribute('scale', '0.001 0.001 0.001');
        cursorEl.setAttribute('raycaster', 'far: 1000; interval: 0; objects: [hotspot];');
        this.cameraEntity.appendChild(cursorEl);
    },
});