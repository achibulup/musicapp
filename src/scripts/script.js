const musicForm = document.querySelector('#music-upload-form');
const musicSelect = document.querySelector('#select-to-upload');

var selectedTab = document.getElementById('home');

musicForm.addEventListener('click', () => {
  musicSelect.click();
});

function toggleMenu() {
  document.getElementById("menu").classList.toggle("open");
}

function collapseMenu() {
  document.getElementById("menu").classList.remove("open");
}

document.querySelectorAll('li.nav-button').forEach(item => {
  item.addEventListener('click', () => { 
    selectedTab.classList.remove('selected');
    selectedTab = item; 
    selectedTab.classList.add('selected');
  })
});