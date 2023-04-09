const musicForm = document.querySelector('#music-upload-form');
const musicSelect = document.querySelector('#select-to-upload');

musicForm.addEventListener('click', () => {
  musicSelect.click();
});
