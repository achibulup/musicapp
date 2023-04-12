const musicSelect = document.getElementById('select-to-upload') as HTMLInputElement;

var selectedNav = document.getElementById('home-nav') as HTMLElement;

document.querySelectorAll('.upload-file').forEach(
  item => item.addEventListener('click', () => {
    musicSelect.click();
  }));

document.querySelectorAll('.nav-item').forEach(item => {
  const navItem = item as HTMLElement;
  navItem.addEventListener('click', () => { 
    if (navItem === selectedNav) return;
    if (selectedNav.dataset.section) {
      const oldSection = document.getElementById(selectedNav.dataset.section);
      if (oldSection) {
        oldSection.classList.add('hidden');
      } else {
        console.log("Element with id " + selectedNav.dataset.section + " not found.");
      }
    }
    selectedNav.classList.remove('selected');
    selectedNav = navItem; 
    if (selectedNav.dataset.section) {
      const newSection = document.getElementById(selectedNav.dataset.section);
      if (newSection) {
        newSection.classList.remove('hidden');
      }
    }
    selectedNav.classList.add('selected');
  })
});

const defaultCover = '../../asset/images/placeholder.jpg';
var fileInput = document.getElementById('select-to-upload') as HTMLInputElement;
var musicPlayer = document.getElementById('music-player') as HTMLAudioElement;
const playButton = nonNull(document.getElementById("play-button"));


fileInput.onchange = function(event) {
  const file = nonNull((this as HTMLInputElement).files)[0];
  const jsmediatags = (window as any).jsmediatags;
  jsmediatags.read(file, {
    onSuccess: function(tag: any) {
      const title = tag.tags.title;
      const artist = tag.tags.artist;
      const album = tag.tags.album;
      const cover = tag.tags.picture;
      const titleElement = nonNull(document.getElementById("current-song-title"));
      const artistElement = nonNull(document.getElementById("current-song-artist"));
      const albumElement = nonNull(document.getElementById("current-song-album"));
      const songCoverElement = document.getElementById("current-song-cover") as HTMLImageElement;
      titleElement.innerText = title;
      artistElement.innerText = artist;
      albumElement.innerText = (album ? album : "");
      if (cover) {
        let base64String = "";
        for (let i = 0; i < cover.data.length; i++) {
          base64String += String.fromCharCode(cover.data[i]);
        }
        const base64 = "data:" + cover.format + ";base64," +
          window.btoa(base64String);
        songCoverElement.src = base64;
      } else {
        songCoverElement.src = defaultCover;
      }
    },
    onError: function(error: any) {
      console.log("Error reading tags: " + error.type + ": " + error.info);
    }
  });
  const fileUrl = URL.createObjectURL(file); 
  musicPlayer.src = fileUrl;
};

function toggleMenu() {
  nonNull(document.getElementById("menu")).classList.toggle("expanded");
}

function collapseMenu() {
  nonNull(document.getElementById("menu")).classList.remove("expanded");
}

async function togglePlay() {
  if (musicPlayer.paused) {
    await musicPlayer.play();
  } else {
    await musicPlayer.pause();
  }
}

musicPlayer.onplay = function() {
  playButton.classList.remove("fa-play");
  playButton.classList.add("fa-pause");
}

musicPlayer.onpause = function() {
  playButton.classList.remove("fa-pause");
  playButton.classList.add("fa-play");
}

musicPlayer.onloadstart = function() {
  if (musicPlayer.paused) {
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");
  } else {
    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");
  }
}


function nonNull<T>(value: T | null): T {
  return value as T;
}