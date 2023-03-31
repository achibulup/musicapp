const musicUploadLabel = document.querySelector('music-upload');
const musicSelect = document.querySelector('music-select');

musicUploadLabel.addEventListener('click', () => {
	musicSelect.click();
});
