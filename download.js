const downloadButton = document.getElementById("downloadButton");

downloadButton.addEventListener("click", () => {
  const orderedPhotos = Array.from(document.querySelectorAll(".thumbnail")).map(imageEl => imageEl.getAttribute('src'));
  const wrapper = document.querySelector(".wrapper").cloneNode(true);
  wrapper.querySelector('a-scene').removeChild(wrapper.querySelector('canvas'));
  wrapper.querySelector('a-sky').removeAttribute('src');

  const images = wrapper.querySelectorAll("a-image");

  if (orderedPhotos.length === 0) {
    alert("No photos to download.");
    return;
  }

  const zip = new JSZip();
  const folder = zip.folder("VRTour");

  // Fetch the content of components.js
  fetch("hotspot.js")
    .then(response => response.text())
    .then(componentsContent => {
      // Include the fetched components content in the ZIP folder
      folder.file("hotspot.js", componentsContent);

      orderedPhotos.forEach((imageUrl, index) => {
        fetch(imageUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const fileName = `image${index + 1}.jpg`;
            folder.file(fileName, blob);
            images[index].setAttribute('src', fileName);

            if (index === orderedPhotos.length - 1) {
              const wrapperContent = wrapper.innerHTML;
              folder.file("index.html", new Blob([wrapperContent], { type: "text/html" }));

              zip.generateAsync({ type: "blob" }).then((content) => {
                const url = window.URL.createObjectURL(content);
                const a = document.createElement("a");
                a.href = url;
                a.download = "VRTour.zip";
                a.click();
              });
            }
          });
      });
    });
});