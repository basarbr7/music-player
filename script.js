const music = document.querySelector("audio");
const playbtn = document.querySelector(".play-pause");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const songTitle = document.querySelector(".song-title");
const artistName = document.querySelector(".artist-name");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const totalTime = document.querySelector(".total-time");
const currentTime = document.querySelector(".current-time");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const progressDot = document.querySelector(".progress-dot");
const albumArt = document.querySelector(".album-art img");
const playList = document.querySelectorAll(".playlist-item");

const songsItem = [
  {
    title: "Song1",
    artist: "brand1",
    src: "./songs/pheliDafa.mp3",
  },
  {
    title: "Song2",
    artist: "brand2",
    src: "./songs/ishq.mp3",
  },
  {
    title: "Song3",
    artist: "brand3",
    src: "./songs/Pyaar.mp3",
  },
  {
    title: "Song4",
    artist: "brand4",
    src: "./songs/Raid.mp3",
  },
];

let isMusicPlaying = false;
let songNumber = 0;

function playMusic() {
  music.play();
  isMusicPlaying = true;
  UpdatePlayPause();
}
function pauseMusic() {
  music.pause();
  isMusicPlaying = false;
  UpdatePlayPause();
}
function UpdatePlayPause() {
  play.style.display = isMusicPlaying ? "none" : "block";
  pause.style.display = isMusicPlaying ? "block" : "none";
}
function updateSongs(song) {
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  music.src = song.src;
}
updateSongs(songsItem[songNumber]);

playbtn.addEventListener("click", () =>
  isMusicPlaying ? pauseMusic() : playMusic()
);

prev.addEventListener("click", () => {
  songNumber = (songNumber - 1 + songsItem.length) % songsItem.length;
  updateSongs(songsItem[songNumber]);
  updatePlayList(songNumber);
  playMusic();
});
next.addEventListener("click", () => {
  songNumber = (songNumber + 1) % songsItem.length;
  updateSongs(songsItem[songNumber]);
  updatePlayList(songNumber);
  playMusic();
});
music.addEventListener("ended", () => {
  songNumber = (songNumber + 1) % songsItem.length;
  updateSongs(songsItem[songNumber]);
  updatePlayList(songNumber);
  playMusic();
});

function timeUpdate(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes} : ${seconds.toString().padStart(2, "0")}`;
}

music.addEventListener("loadedmetadata", () => {
  totalTime.textContent = timeUpdate(music.duration);
});

music.addEventListener("timeupdate", () => {
  currentTime.textContent = timeUpdate(music.currentTime);

  const percentage = (music.currentTime / music.duration) * 100;
  progress.style.width = `${percentage}%`;
  progressDot.style.left = `${percentage}%`;

  const rotateDeg = (music.currentTime / music.duration) * 360;
  albumArt.style.transform = `rotate(${rotateDeg}deg)`;
});

progressBar.addEventListener("click", (e) => {
  // console.log(e);
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
});
progressDot.addEventListener("click", (e) => {
  e.stopPropagation();
});

music.addEventListener("play", () => {
  albumArt.style.animationPlayState = "running";
});
music.addEventListener("pause", () => {
  albumArt.style.animationPlayState = "paused";
});

function updatePlayList(songNumber) {
  playList.forEach((item, index) => {

    const oldDiv = item.querySelector(".active-indicator");
    if (oldDiv) {
      oldDiv.remove();
    }
    
    if (index === songNumber) {
      item.classList.add("active");
      const newdiv = document.createElement("div");
      newdiv.classList.add("active-indicator");

      for (let i = 0; i < 3; i++) {
        const wave = document.createElement("div");
        wave.classList.add("wave");
        newdiv.appendChild(wave);
      }
      item.appendChild(newdiv);
    } else {
      item.classList.remove("active");
      const oldDiv = item.querySelector(".active-indicator");
      if (oldDiv) {
        oldDiv.remove();
      }
    }
  });
}
updatePlayList(songNumber);

playList.forEach((item, index) => {
  item.addEventListener("click", () => {
    songNumber = index;
    updateSongs(songsItem[songNumber]);
    updatePlayList(songNumber);
    playMusic();
  });
});
