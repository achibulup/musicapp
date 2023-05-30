/// <reference path="utils.ts" />
/// <reference path="song.ts" />
/// <reference path="dom.ts" />

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


fileInput.onchange = async function(event) {
  const file = nonNull((this as HTMLInputElement).files)[0];
  const songData = await getInfo(file);
  const song = addSong(songData);
  if (musicPlayer.paused) {
    setCurrentSong(song);
  }
};

function getInfo(file: File) : Promise<SongData> {
  return new Promise((resolve, reject) => {
    const jsmediatags = (window as any).jsmediatags;
    jsmediatags.read(file, {
      onSuccess: function(song: any) {
        const title: string = song.tags.title;
        const artist: string = song.tags.artist;
        const album: string = song.tags.album;
        const picture: any = song.tags.picture;
        const fileUrl = URL.createObjectURL(file); 
        let coverUrl: string | null = null;
        if (picture) {
          let base64String = "";
          base64String += String.fromCharCode(...picture.data);
          const base64 = "data:" + picture.format + ";base64," +
            window.btoa(base64String);
          coverUrl = base64;
        }
        resolve({ title, artist, album, coverUrl, fileUrl });
      },
      onError: function(error: any) {
        reject("Error reading tags: " + error.type + ": " + error.info);
      }
    });
  });
}

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

function setCurrentSong(song: SongData) {
  const titleElement = nonNull(document.getElementById("current-song-title"));
  const artistElement = nonNull(document.getElementById("current-song-artist"));
  const albumElement = nonNull(document.getElementById("current-song-album"));
  const songCoverElement = document.getElementById("current-song-cover") as HTMLImageElement;
  titleElement.innerText = song.title;
  artistElement.innerText = song.artist ?? 'Unknown';
  albumElement.innerText = song.album ?? '';
  songCoverElement.src = song.coverUrl ?? defaultCover;
  musicPlayer.src = song.fileUrl;
}

function makeSongElement(song: Song) : HTMLLIElement {
  const element = makeDomElement<HTMLLIElement>(`
    <li class="song has-cover" data-id="${song.id}">
      <div class="text">
        <div class="song-title">${song.title}</div>
        <div class="song-author">${song.artist ?? 'Unknown'}</div>
      </div>
      <div class="tasks">
        <div class="task set-fav dark-hover-circle">
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="task song-options dark-hover-circle">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div> 
    </li>`);
    element.addEventListener('click', function (this: HTMLElement, event) {
      darkBlink(this);
      setCurrentSong(song);
      musicPlayer.play();
    });
    element.children[1].children[0].addEventListener('click', function (this: HTMLElement, event) {
      event.stopPropagation();
      dark2Blink(this);
    });
    return element;
}

function darkBlink(element: HTMLElement) {
  element.classList.remove('dark-click-fade');
  element.classList.add('dark-click-active');
  setTimeout(() => {
    element.classList.add('dark-click-fade');
    element.classList.remove('dark-click-active');
  }, 5);
  setTimeout(() => {
    element.classList.remove('dark-click-fade');
  }, 100);
}

function dark2Blink(element: HTMLElement) {
  element.classList.remove('dark2-click-fade');
  element.classList.add('dark2-click-active');
  setTimeout(() => {
    element.classList.add('dark2-click-fade');
    element.classList.remove('dark2-click-active');
  });
  setTimeout(() => {
    element.classList.remove('dark2-click-fade');
  }, 100);
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
