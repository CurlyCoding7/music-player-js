let currentMusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const songDuration = document.querySelector('.song-duration');
const backwardIcon = document.querySelector('#backward-icon');
const playIcon = document.querySelector('#play-icon');
const forwardIcon = document.querySelector('#forward-icon');

playIcon.addEventListener('click', () => {
    if(playIcon.className.includes('fa-pause')){
        music.pause();
    }
    else{
        music.play();
    }
    playIcon.classList.toggle('fa-pause');
    disk.classList.toggle('play');
})

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url(${song.cover})`;

    currentMusic.innerHTML = '00:00';

    setTimeout(() => {
        seekBar.max = music.duration;
        songDuration.innerHTML = formatTime(music.duration);
    }, 500);

}

setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time / 60);

    if(min < 10){
        min = `0${min}`;
    }

    let sec = Math.floor(time % 60);

    if(sec < 10){
        sec = `0${sec}`;
    }

    return `${min} : ${sec}`;

}

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        forwardIcon.click();
    }
}, 500);

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

const playMusic = () => {
    music.play();
    playIcon.classList.add('fa-pause');
    disk.classList.add('play');
}

forwardIcon.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }
    else{
        currentMusic++;
    }

    setMusic(currentMusic);
    playMusic();
})

backwardIcon.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    }
    else{
        currentMusic--;
    }

    setMusic(currentMusic);
    playMusic();
})
