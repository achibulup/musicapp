"use strict";
/// <reference path="song.ts" />
const generateSongId = (() => {
    let id = 0;
    return () => id++;
})();
function addSong(song) {
    const newSong = Object.assign({ id: generateSongId() }, song);
    SongList.push(newSong);
    const songElement = makeSongElement(newSong);
    const recentSongsElement = nonNull(document.getElementById('recent-songs'));
    recentSongsElement.appendChild(songElement);
    const songElement2 = makeSongElement(newSong);
    const uploadedSongsElement = nonNull(document.getElementById('uploaded-songs'));
    uploadedSongsElement.appendChild(songElement2);
    return newSong;
}
const SongList = (() => {
    const songIds = sessionStorage.getItem(getSongsKey());
    if (songIds) {
        const songList = [];
        songIds.split(',').forEach(idStr => {
            const id = Number(idStr);
            const song = sessionStorage.getItem(getSongKey(id));
            if (song) {
                songList.push(JSON.parse(song));
            }
            else {
                console.log("Song with id " + id + " not found.");
            }
        });
        return songList;
    }
    else {
        return [];
    }
})();
function getSongsKey() {
    return 'musicAppSongIds';
}
function getSongKey(id) {
    return 'musicAppSong' + id;
}
