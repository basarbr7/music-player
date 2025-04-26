const music = document.querySelector("audio")
const playbtn = document.querySelector(".play-pause")
const play = document.querySelector(".play")
const pause = document.querySelector(".pause")
const songTitle = document.querySelector(".song-title")
const artistName = document.querySelector(".artist-name")


const songsItem= [
    {
        title: "Song1",
        artist: "brand1",
        src: "./songs/pheliDafa.mp3"
    },
    {
        title: "Song2",
        artist: "brand2",
        src: "./songs/ishq.mp3"
    },
    {
        title: "Song3",
        artist: "brand3",
        src: "./songs/Pyaar.mp3"
    },
    {
        title: "Song4",
        artist: "brand4",
        src: "./songs/Raid.mp3"
    }
]


let isMusicPlaying = false
let songNumber = 0

function playMusic(){
    music.play()
    isMusicPlaying = true    
    UpdatePlayPause()
}
function pauseMusic(){
    music.pause()
    isMusicPlaying = false
    UpdatePlayPause()
}
function UpdatePlayPause(){
    play.style.display = isMusicPlaying ? "none": "block"
    pause.style.display = isMusicPlaying ? "block": "none"
}
function updateSongs(song){
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    music.src = song.src
}
updateSongs(songsItem[songNumber])

playbtn.addEventListener("click", ()=>isMusicPlaying ? pauseMusic() : playMusic())











