class UploadManager {
    constructor(dropzoneSelector, containerSelector, fileInputSelector) {
        this.dropzone = document.querySelector(dropzoneSelector);
        this.thumbnailsContainer = document.querySelector(containerSelector);
        this.reorderManager = new ReorderManager(".thumbnail");
        this.fileInput = document.querySelector(fileInputSelector);

        this.dropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            this.dropzone.style.border = "2px dashed #666";
        });

        this.dropzone.addEventListener("dragleave", () => {
            this.dropzone.style.border = "2px dashed #aaa";
        });

        this.dropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            this.dropzone.style.border = "2px dashed #aaa";

            const files = e.dataTransfer.files;
            for (const file of files) {
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = new Image();
                        img.onload = () => {
                            const thumbnailSize = 150; // Adjust this value as needed
                            const aspectRatio = img.width / img.height;
                            img.width = thumbnailSize;
                            img.height = thumbnailSize / aspectRatio;
                        };
                        img.src = event.target.result;
                        img.className = "thumbnail";
                        img.draggable = true;
                        img.addEventListener("dragstart", (e) => {
                            e.dataTransfer.setData("text/plain", img.src);
                        });
                        const wrapper = document.createElement("div");
                        wrapper.appendChild(img);
                        this.thumbnailsContainer.appendChild(wrapper);
                        this.reorderManager.refresh();
                    };
                    reader.readAsDataURL(file);
                }
            }
        });

        this.fileInput.addEventListener("change", (e) => {
            const files = e.target.files;
            for (const file of files) {
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = new Image();
                        img.onload = () => {
                            const thumbnailSize = 150; // Adjust this value as needed
                            const aspectRatio = img.width / img.height;
                            img.width = thumbnailSize;
                            img.height = thumbnailSize / aspectRatio;
                        };
                        img.src = event.target.result;
                        img.className = "thumbnail";
                        img.draggable = true;
                        img.addEventListener("dragstart", (e) => {
                            e.dataTransfer.setData("text/plain", img.src);
                        });
                        const wrapper = document.createElement("div");
                        wrapper.appendChild(img);
                        this.thumbnailsContainer.appendChild(wrapper);
                        this.reorderManager.refresh();
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    }
}

const uploadManager = new UploadManager("#dropzone", "#container", "#fileInput");
