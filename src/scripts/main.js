"use strict";
/// <reference path="utils.ts" />
/// <reference path="song.ts" />
/// <reference path="dom.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const musicSelect = document.getElementById('select-to-upload');
var selectedNav = document.getElementById('home-nav');
document.querySelectorAll('.upload-file').forEach(item => item.addEventListener('click', () => {
    musicSelect.click();
}));
document.querySelectorAll('.nav-item').forEach(item => {
    const navItem = item;
    navItem.addEventListener('click', () => {
        if (navItem === selectedNav)
            return;
        if (selectedNav.dataset.section) {
            const oldSection = document.getElementById(selectedNav.dataset.section);
            if (oldSection) {
                oldSection.classList.add('hidden');
            }
            else {
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
    });
});
const defaultCover = '../../asset/images/placeholder.jpg';
var fileInput = document.getElementById('select-to-upload');
var musicPlayer = document.getElementById('music-player');
const playButton = nonNull(document.getElementById("play-button"));
fileInput.onchange = function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = nonNull(this.files)[0];
        const songData = yield getInfo(file);
        const song = addSong(songData);
        if (musicPlayer.paused) {
            setCurrentSong(song);
        }
    });
};
function getInfo(file) {
    return new Promise((resolve, reject) => {
        const jsmediatags = window.jsmediatags;
        jsmediatags.read(file, {
            onSuccess: function (song) {
                const title = song.tags.title;
                const artist = song.tags.artist;
                const album = song.tags.album;
                const picture = song.tags.picture;
                const fileUrl = URL.createObjectURL(file);
                let coverUrl = null;
                if (picture) {
                    let base64String = "";
                    base64String += String.fromCharCode(...picture.data);
                    const base64 = "data:" + picture.format + ";base64," +
                        window.btoa(base64String);
                    coverUrl = base64;
                }
                resolve({ title, artist, album, coverUrl, fileUrl });
            },
            onError: function (error) {
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
function togglePlay() {
    return __awaiter(this, void 0, void 0, function* () {
        if (musicPlayer.paused) {
            yield musicPlayer.play();
        }
        else {
            yield musicPlayer.pause();
        }
    });
}
function setCurrentSong(song) {
    var _a, _b, _c;
    const titleElement = nonNull(document.getElementById("current-song-title"));
    const artistElement = nonNull(document.getElementById("current-song-artist"));
    const albumElement = nonNull(document.getElementById("current-song-album"));
    const songCoverElement = document.getElementById("current-song-cover");
    titleElement.innerText = song.title;
    artistElement.innerText = (_a = song.artist) !== null && _a !== void 0 ? _a : 'Unknown';
    albumElement.innerText = (_b = song.album) !== null && _b !== void 0 ? _b : '';
    songCoverElement.src = (_c = song.coverUrl) !== null && _c !== void 0 ? _c : defaultCover;
    musicPlayer.src = song.fileUrl;
}
function makeSongElement(song) {
    var _a;
    const element = makeDomElement(`
    <li class="song has-cover" data-id="${song.id}">
      <div class="text">
        <div class="song-title">${song.title}</div>
        <div class="song-author">${(_a = song.artist) !== null && _a !== void 0 ? _a : 'Unknown'}</div>
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
    element.addEventListener('click', function (event) {
        darkBlink(this);
        setCurrentSong(song);
        musicPlayer.play();
    });
    element.children[1].children[0].addEventListener('click', function (event) {
        event.stopPropagation();
        dark2Blink(this);
    });
    return element;
}
function darkBlink(element) {
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
function dark2Blink(element) {
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
musicPlayer.onplay = function () {
    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");
};
musicPlayer.onpause = function () {
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");
};
musicPlayer.onloadstart = function () {
    if (musicPlayer.paused) {
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
    }
    else {
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");
    }
};
