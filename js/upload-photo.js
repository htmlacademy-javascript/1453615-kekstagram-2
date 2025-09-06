const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageUploadInputElement = document.querySelector('.img-upload__input');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectPreviewElements = document.querySelectorAll('.effects__preview');

imageUploadInputElement.addEventListener('change', () => {
  const file = imageUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const imageURL = URL.createObjectURL(file);
    imagePreviewElement.src = imageURL;
    Array.from(effectPreviewElements).forEach((element) => {
      element.style.backgroundImage = `url("${imageURL}")`;
    });
  }
});

export {imageUploadInputElement};
