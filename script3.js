/*=========================================
        MUSIC PLAYER
=========================================*/

const songs = [

{
    title: "Believer",
    artist: "Imagine Dragons",
    src: "song1.mp3",
    cover: "cover1.jpg",
    lyrics: "🎵 Believer by Imagine Dragons.\nPowerful rock song about pain and strength."
},

{
    title: "Shape Of You",
    artist: "Ed Sheeran",
    src: "song2.mp3",
    cover: "cover2.jpg",
    lyrics: "🎵 Shape Of You.\nRomantic pop song."
},

{
    title: "Faded",
    artist: "Alan Walker",
    src: "song3.mp3",
    cover: "cover3.jpg",
    lyrics: "🎵 Faded.\nEmotional electronic music."
},

{
    title: "Kesariya",
    artist: "Arijit Singh",
    src: "song4.mp3",
    cover: "cover4.jpg",
    lyrics: "🎵 Kesariya.\nRomantic Bollywood song."
},

{
    title: "Apna Bana Le",
    artist: "Arijit Singh",
    src: "song5.mp3",
    cover: "cover5.jpg",
    lyrics: "🎵 Apna Bana Le.\nSoft romantic melody."
},

{
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    src: "song6.mp3",
    cover: "cover6.jpg",
    lyrics: "🎵 Tum Hi Ho.\nPopular Bollywood love song."
},

{
    title: "Raataan Lambiyan",
    artist: "Jubin Nautiyal",
    src: "song7.mp3",
    cover: "cover7.jpg",
    lyrics: "🎵 Raataan Lambiyan.\nRomantic melody."
},

{
    title: "Heeriye",
    artist: "Arijit Singh & Jasleen Royal",
    src: "song8.mp3",
    cover: "cover8.jpg",
    lyrics: "🎵 Heeriye.\nSoft romantic track."
},

{
    title: "Maan Meri Jaan",
    artist: "King",
    src: "song9.mp3",
    cover: "cover9.jpg",
    lyrics: "🎵 Maan Meri Jaan.\nHindi pop hit."
},

{
    title: "Chaleya",
    artist: "Arijit Singh & Shilpa Rao",
    src: "song10.mp3",
    cover: "cover10.jpg",
    lyrics: "🎵 Chaleya.\nRomantic song from Jawan."
}

];

/*=========================================
        HTML ELEMENTS
=========================================*/

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const playlist = document.querySelectorAll("#playlist li");

const album = document.querySelector(".album");

/* New Features */

const searchSong = document.getElementById("searchSong");
const favoriteBtn = document.getElementById("favoriteBtn");
const themeBtn = document.getElementById("themeBtn");

const lyricsBox = document.getElementById("lyrics");

const miniCover = document.getElementById("miniCover");
const miniTitle = document.getElementById("miniTitle");
const miniArtist = document.getElementById("miniArtist");
const miniPlay = document.getElementById("miniPlay");

const toast = document.getElementById("toast");

/*=========================================
        VARIABLES
=========================================*/

let currentSong = 0;
let playing = false;
let shuffle = false;
let repeat = false;
let favorites = [];

/*=========================================
        LOAD SONG
=========================================*/

function loadSong(index){

    audio.pause();

    audio.src = songs[index].src;

    audio.load();

    cover.src = songs[index].cover;

    title.textContent = songs[index].title;

    artist.textContent = songs[index].artist;

    lyricsBox.textContent = songs[index].lyrics;

    miniCover.src = songs[index].cover;

    miniTitle.textContent = songs[index].title;

    miniArtist.textContent = songs[index].artist;

    playlist.forEach(item => item.classList.remove("active"));

    playlist[index].classList.add("active");

    showToast("Now Playing : " + songs[index].title);

}
/*=========================================
        PLAY SONG
=========================================*/

function playSong() {

    audio.play();

    playing = true;

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

    album.classList.add("playing");

    miniPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';

}

/*=========================================
        PAUSE SONG
=========================================*/

function pauseSong() {

    audio.pause();

    playing = false;

    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

    album.classList.remove("playing");

    miniPlay.innerHTML = '<i class="fa-solid fa-play"></i>';

}

/*=========================================
        PLAY BUTTON
=========================================*/

playBtn.addEventListener("click", () => {

    if (playing) {

        pauseSong();

    } else {

        playSong();

    }

});

/*=========================================
        MINI PLAYER BUTTON
=========================================*/

miniPlay.addEventListener("click", () => {

    if (playing) {

        pauseSong();

    } else {

        playSong();

    }

});

/*=========================================
        NEXT SONG
=========================================*/

function nextSong() {

    if (shuffle) {

        currentSong = Math.floor(Math.random() * songs.length);

    } else {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

    }

    loadSong(currentSong);

    audio.play();

    playSong();

}

/*=========================================
        PREVIOUS SONG
=========================================*/

function prevSong() {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    audio.play();

    playSong();

}

/*=========================================
        BUTTON EVENTS
=========================================*/

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

/*=========================================
        PLAYLIST
=========================================*/

playlist.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentSong = index;

        loadSong(currentSong);

        audio.play();

        playSong();

    });

});

/*=========================================
        SONG ENDED
=========================================*/

audio.addEventListener("ended", () => {

    if (repeat) {

        audio.currentTime = 0;

        playSong();

        return;

    }

    nextSong();

});
/*=========================================
        PROGRESS BAR
=========================================*/

audio.addEventListener("timeupdate", () => {

    const { duration: songDuration, currentTime } = audio;

    if (songDuration) {

        progress.value = (currentTime / songDuration) * 100;

        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);

        if (currentSec < 10) {
            currentSec = "0" + currentSec;
        }

        current.textContent = `${currentMin}:${currentSec}`;

        let totalMin = Math.floor(songDuration / 60);
        let totalSec = Math.floor(songDuration % 60);

        if (totalSec < 10) {
            totalSec = "0" + totalSec;
        }

        duration.textContent = `${totalMin}:${totalSec}`;

    }

});

/*=========================================
        SEEK SONG
=========================================*/

progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime = (progress.value / 100) * audio.duration;

    }

});

/*=========================================
        VOLUME CONTROL
=========================================*/

audio.volume = volume.value / 100;

volume.addEventListener("input", () => {

    audio.volume = volume.value / 100;

});

/*=========================================
        SHUFFLE
=========================================*/

shuffleBtn.addEventListener("click", () => {

    shuffle = !shuffle;

    shuffleBtn.classList.toggle("active");

    showToast(
        shuffle
            ? "Shuffle Enabled"
            : "Shuffle Disabled"
    );

});

/*=========================================
        REPEAT
=========================================*/

repeatBtn.addEventListener("click", () => {

    repeat = !repeat;

    repeatBtn.classList.toggle("active");

    showToast(
        repeat
            ? "Repeat Enabled"
            : "Repeat Disabled"
    );

});

/*=========================================
        AUDIO EVENTS
=========================================*/

audio.addEventListener("play", () => {

    playing = true;

    playBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

    miniPlay.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

    album.classList.add("playing");

});

audio.addEventListener("pause", () => {

    playing = false;

    playBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';

    miniPlay.innerHTML =
        '<i class="fa-solid fa-play"></i>';

    album.classList.remove("playing");

});

audio.addEventListener("error", () => {

    showToast("Unable to load audio.");

});
/*=========================================
        SEARCH SONGS
=========================================*/

searchSong.addEventListener("keyup", () => {

    const value = searchSong.value.toLowerCase();

    playlist.forEach((song) => {

        const text = song.innerText.toLowerCase();

        if (text.includes(value)) {

            song.style.display = "flex";

        } else {

            song.style.display = "none";

        }

    });

});

/*=========================================
        THEME TOGGLE
=========================================*/

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        localStorage.setItem("theme", "light");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        showToast("Light Mode");

    } else {

        localStorage.setItem("theme", "dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        showToast("Dark Mode");

    }

});

/*=========================================
        FAVORITES
=========================================*/

favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function updateFavoriteIcon() {

    if (favorites.includes(currentSong)) {

        favoriteBtn.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

    } else {

        favoriteBtn.innerHTML =
            '<i class="fa-regular fa-heart"></i>';

    }

}

favoriteBtn.addEventListener("click", () => {

    if (favorites.includes(currentSong)) {

        favorites = favorites.filter(
            item => item !== currentSong
        );

        showToast("Removed from Favorites");

    } else {

        favorites.push(currentSong);

        showToast("Added to Favorites");

    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    updateFavoriteIcon();

});

/*=========================================
        TOAST MESSAGE
=========================================*/

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/*=========================================
        UPDATE PLAYER INFO
=========================================*/

function updatePlayer() {

    lyricsBox.textContent = songs[currentSong].lyrics;

    miniCover.src = songs[currentSong].cover;

    miniTitle.textContent = songs[currentSong].title;

    miniArtist.textContent = songs[currentSong].artist;

    updateFavoriteIcon();

}
/*=========================================
        KEYBOARD SHORTCUTS
=========================================*/

document.addEventListener("keydown", (e) => {

    // Ignore shortcuts while typing
    if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
    ) {
        return;
    }

    switch (e.code) {

        case "Space":

            e.preventDefault();

            if (playing) {
                pauseSong();
            } else {
                playSong();
            }

            break;

        case "ArrowRight":

            nextSong();

            break;

        case "ArrowLeft":

            prevSong();

            break;

        case "ArrowUp":

            e.preventDefault();

            volume.value = Math.min(100, Number(volume.value) + 5);

            audio.volume = volume.value / 100;

            showToast("Volume : " + volume.value + "%");

            break;

        case "ArrowDown":

            e.preventDefault();

            volume.value = Math.max(0, Number(volume.value) - 5);

            audio.volume = volume.value / 100;

            showToast("Volume : " + volume.value + "%");

            break;

    }

});

/*=========================================
        EQUALIZER
=========================================*/

const equalizer = document.querySelector(".equalizer");

function startEqualizer() {

    if (equalizer) {

        equalizer.style.opacity = "1";

    }

}

function stopEqualizer() {

    if (equalizer) {

        equalizer.style.opacity = ".35";

    }

}

audio.addEventListener("play", startEqualizer);

audio.addEventListener("pause", stopEqualizer);

/*=========================================
        PRELOAD SONGS
=========================================*/

songs.forEach(song => {

    const preload = new Audio();

    preload.src = song.src;

});

/*=========================================
        LOAD FIRST SONG
=========================================*/

window.addEventListener("load", () => {

    loadSong(currentSong);

    updatePlayer();

    stopEqualizer();

});

/*=========================================
        UPDATE PLAYER WHEN SONG CHANGES
=========================================*/

audio.addEventListener("loadeddata", () => {

    updatePlayer();

});

/*=========================================
        NEXT / PREVIOUS UPDATE
=========================================*/

const oldNextSong = nextSong;

nextSong = function () {

    oldNextSong();

    updatePlayer();

};

const oldPrevSong = prevSong;

prevSong = function () {

    oldPrevSong();

    updatePlayer();

};

/*=========================================
        PLAYLIST UPDATE
=========================================*/

playlist.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentSong = index;

        loadSong(currentSong);

        updatePlayer();

        playSong();

    });

});

/*=========================================
        WELCOME MESSAGE
=========================================*/

setTimeout(() => {

    showToast("🎵 Welcome to Mantasha's Music Player");

}, 800);

/*=========================================
        CONSOLE MESSAGE
=========================================*/

console.log("======================================");

console.log("Spotify Style Music Player Loaded");

console.log("Designed by Mantasha Shaikh");

console.log("CodeAlpha Task 4");

console.log("======================================");