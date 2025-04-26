const music = document.querySelector("audio")
const playbtn = document.querySelector(".play-pause")
const play = document.querySelector(".play")
const pause = document.querySelector(".pause")
const songTitle = document.querySelector(".song-title")
const artistName = document.querySelector(".artist-name")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")


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
let songNumber = 2

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

prev.addEventListener("click", ()=>{
    if(songNumber){
        songNumber -=1
        updateSongs(songsItem[songNumber])
        playMusic()
    }else{
        songNumber = songsItem.length-1
        updateSongs(songsItem[songNumber])
        playMusic()
    }
})
next.addEventListener("click", ()=>{
    if(songNumber< songsItem.length-1){
        songNumber +=1
        updateSongs(songsItem[songNumber])
        playMusic()
    }else{
        songNumber = 0
        updateSongs(songsItem[songNumber])
        playMusic()
    }
})









