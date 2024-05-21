const imageArray = [
  {
    thumbnail: "./img/pizza1.png",
    fullSize: "./img/pizza1.png",
    altText: "текстовий опис зображення",
  },
  {
    thumbnail: "./img/pizza2.png",
    fullSize: "./img/pizza2.png",
    altText: "текстовий опис зображення",
  },
  {
    thumbnail: "./img/pizza3.png",
    fullSize: "./img/pizza3.png",
    altText: "текстовий опис зображення",
  },
  {
    thumbnail: "./img/pizza4.png",
    fullSize: "./img/pizza4.png",
    altText: "текстовий опис зображення",
  },
  {
    thumbnail: "./img/pizza5.png",
    fullSize: "./img/pizza5.png",
    altText: "текстовий опис зображення",
  },
  {
    thumbnail: "./img/pizza6.png",
    fullSize: "./img/pizza6.png",
    altText: "текстовий опис зображення",
  },
  {
    thumbnail: "./img/pizza7.png",
    fullSize: "./img/pizza7.png",
    altText: "текстовий опис зображення",
  },
  {
    thumbnail: "./img/pizza8.png",
    fullSize: "./img/pizza8.png",
    altText: "текстовий опис зображення",
  },
  {
    thumbnail: "./img/pizza9.png",
    fullSize: "./img/pizza9.png",
    altText: "текстовий опис зображення",
  },
];

const galleryContainer = document.querySelector(".gallery");

const galleryMarkup = imageArray
  .map(({ thumbnail, fullSize, altText }) => {
    return `
      <li>
        <a href="${fullSize}" class="gallery__item">
          <img src="${thumbnail}" alt="${altText}" class="gallery__image">
        </a>
      </li>`;
  })
  .join("");

galleryContainer.innerHTML = galleryMarkup;

galleryContainer.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(`
    <div class="modal">
        <button class="modal__close">&#10005;</button>
        <div class="modal__content">
            <img src="${event.target.parentNode.href}" width="800" height="600">
        </div>
        <div class="controls">
            <button class="prev-btn btnrl"> < </button>
            <button class="next-btn btnrl"> > </button>
        </div>
    </div>
  `);

  instance.show();

  const modalContent = instance.element().querySelector(".modal__content");
  let currentIndex = 0;
  const imageUrls = imageArray.map((image) => image.fullSize);
  const currentImageUrl = event.target.parentNode.href;
  currentIndex = imageUrls.indexOf(currentImageUrl);

  instance.element().addEventListener("click", (e) => {
    if (e.target.classList.contains("modal__close")) {
      instance.close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
      modalContent.innerHTML = `<img src="${imageArray[currentIndex].fullSize}" width="800" height="600">`;
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % imageArray.length;
      modalContent.innerHTML = `<img src="${imageArray[currentIndex].fullSize}" width="800" height="600">`;
    }
  });

  instance
    .element()
    .querySelector(".prev-btn")
    .addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
      modalContent.innerHTML = `<img src="${imageArray[currentIndex].fullSize}" width="800" height="600">`;
    });

  instance
    .element()
    .querySelector(".next-btn")
    .addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % imageArray.length;
      modalContent.innerHTML = `<img src="${imageArray[currentIndex].fullSize}" width="800" height="600">`;
    });
});
