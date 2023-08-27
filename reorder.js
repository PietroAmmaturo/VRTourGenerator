class ReorderManager {
    constructor(selector) {
        this.selector = selector;
        this.images = document.querySelectorAll(selector);
        this.draggedItem;

        this.handleDragStart = function (event) {
            this.draggedItem = event.target;
            event.dataTransfer.effectAllowed = "move";
            event.target.style.opacity = "0.4";
        };

        this.handleDragOver = function (event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
            return false;
        };

        this.handleDragEnter = function (event) {
            event.target.classList.add("drag-over");
        };

        this.handleDragLeave = function (event) {
            event.target.classList.remove("drag-over");
        };

        this.handleDrop = function (event) {
            event.stopPropagation();
            event.target.classList.remove("drag-over");
            if (this.draggedItem !== event.target) {
                const startingWrapper = this.draggedItem.parentElement;
                const targetWrapper = event.target.parentElement;
                targetWrapper.appendChild(this.draggedItem);
                startingWrapper.appendChild(event.target);
            }
            return false;
        };

        this.handleDragEnd = function (event) {
            event.target.style.opacity = "1";
            var dragItems = document.getElementsByClassName(selector);
            for (var i = 0; i < dragItems.length; i++) {
                dragItems[i].classList.remove("drag-over");
            }
        };

        this.images.forEach((imageEl) => imageEl.addEventListener("dragstart", this.handleDragStart.bind(this)));
        this.images.forEach((imageEl) => imageEl.addEventListener("dragover", this.handleDragOver.bind(this)));
        this.images.forEach((imageEl) => imageEl.addEventListener("dragenter", this.handleDragEnter.bind(this)));
        this.images.forEach((imageEl) => imageEl.addEventListener("dragleave", this.handleDragLeave.bind(this)));
        this.images.forEach((imageEl) => imageEl.addEventListener("drop", this.handleDrop.bind(this)));
        this.images.forEach((imageEl) => imageEl.addEventListener("dragend", this.handleDragEnd.bind(this)));

        this.refresh = function () {
            const elements = Array.from(document.querySelectorAll(this.selector));
            const newElements = elements.filter(el => ![...this.images].includes(el));
            newElements.forEach((imageEl) => imageEl.addEventListener("dragstart", this.handleDragStart.bind(this)));
            newElements.forEach((imageEl) => imageEl.addEventListener("dragover", this.handleDragOver.bind(this)));
            newElements.forEach((imageEl) => imageEl.addEventListener("dragenter", this.handleDragEnter.bind(this)));
            newElements.forEach((imageEl) => imageEl.addEventListener("dragleave", this.handleDragLeave.bind(this)));
            newElements.forEach((imageEl) => imageEl.addEventListener("drop", this.handleDrop.bind(this)));
            newElements.forEach((imageEl) => imageEl.addEventListener("dragend", this.handleDragEnd.bind(this)));
            this.images=elements;
        }
    }
}