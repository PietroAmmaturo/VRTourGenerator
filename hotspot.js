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
