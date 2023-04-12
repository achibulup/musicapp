var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var musicSelect = document.getElementById('select-to-upload');
var selectedNav = document.getElementById('home-nav');
document.querySelectorAll('.upload-file').forEach(function (item) { return item.addEventListener('click', function () {
    musicSelect.click();
}); });
document.querySelectorAll('.nav-item').forEach(function (item) {
    var navItem = item;
    navItem.addEventListener('click', function () {
        if (navItem === selectedNav)
            return;
        if (selectedNav.dataset.section) {
            var oldSection = document.getElementById(selectedNav.dataset.section);
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
            var newSection = document.getElementById(selectedNav.dataset.section);
            if (newSection) {
                newSection.classList.remove('hidden');
            }
        }
        selectedNav.classList.add('selected');
    });
});
var defaultCover = '/asset/images/placeholder.jpg';
var fileInput = document.getElementById('select-to-upload');
var musicPlayer = document.getElementById('music-player');
var playButton = nonNull(document.getElementById("play-button"));
fileInput.onchange = function (event) {
    var file = nonNull(this.files)[0];
    var jsmediatags = window.jsmediatags;
    jsmediatags.read(file, {
        onSuccess: function (tag) {
            var title = tag.tags.title;
            var artist = tag.tags.artist;
            var album = tag.tags.album;
            var cover = tag.tags.picture;
            var titleElement = nonNull(document.getElementById("current-song-title"));
            var artistElement = nonNull(document.getElementById("current-song-artist"));
            var albumElement = nonNull(document.getElementById("current-song-album"));
            var songCoverElement = document.getElementById("current-song-cover");
            titleElement.innerText = title;
            artistElement.innerText = artist;
            albumElement.innerText = (album ? album : "");
            if (cover) {
                var base64String = "";
                for (var i = 0; i < cover.data.length; i++) {
                    base64String += String.fromCharCode(cover.data[i]);
                }
                var base64 = "data:" + cover.format + ";base64," +
                    window.btoa(base64String);
                songCoverElement.src = base64;
            }
            else {
                songCoverElement.src = defaultCover;
            }
        },
        onError: function (error) {
            console.log("Error reading tags: " + error.type + ": " + error.info);
        }
    });
    var fileUrl = URL.createObjectURL(file);
    musicPlayer.src = fileUrl;
};
function toggleMenu() {
    nonNull(document.getElementById("menu")).classList.toggle("expanded");
}
function collapseMenu() {
    nonNull(document.getElementById("menu")).classList.remove("expanded");
}
function togglePlay() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!musicPlayer.paused) return [3 /*break*/, 2];
                    return [4 /*yield*/, musicPlayer.play()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, musicPlayer.pause()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
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
function nonNull(value) {
    return value;
}
