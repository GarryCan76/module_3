let current_sec = 0;
let current_min = 0;
let duration_min = 0;
let music_playing = false;
let music = document.getElementById("music");
let player = document.getElementById("player");
let volume_slider = document.getElementById('volume_slider');
let song_num;
let music_list = [0, 1, 2, 3, 4];
let index = 0;
let shuffle = false;
let repeat = false
song_detail = 0;
const song_index = [
    {"file":'assets/audio/Purple_Hills.mp3', "title":"Purple Hills"},
    {"file":'assets/audio/Floating_Corn.mp3', "title":"Floating Corn"},
    {"file":'assets/audio/Stone_Ankle.mp3', "title":"Stone Ankle"},
    {"file":'assets/audio/Lower_Shelf.mp3', "title":"Lower Shelf"},
    {"file":'assets/audio/Bat_Feet.mp3', "title":"Bat Feet"}]
volume_slider.oninput = function (){
    volume_span.innerHTML = this.value
    music.volume = this.value / 100
}
function repeat_toggle(){
    repeat = repeat === false
    if (repeat){
        document.getElementById('repeat').style.filter="invert(100%)"
    }else {
        document.getElementById('repeat').style.filter="invert(0%)"
    }
}
function music_shuffle(){
    shuffle = shuffle === false;
    if (shuffle === true){
        music_list.sort(() => Math.random() - 0.5)
        document.getElementById('shuffle').style.filter="invert(100%)"
    }else{
        music_list.sort()
        document.getElementById('shuffle').style.filter="invert(0%)"
    }
    const id = music_list.indexOf(song_num);
    music_list.splice(id, 1);
    music_list.push(song_num)
    console.log(music_list + shuffle)
}

function backward(){
    if (index !== 0){
        index = index - 1
        song_detail = song_index[index]
        music.src = song_detail.file
        document.getElementById('song_name').innerHTML = song_detail.title
        music.play()
        music_playing = true
        document.getElementById('play_toggle').src="assets/images/pause.png";
    }
}
function forward(){
    if (repeat && index === music_list.length){
        index = -1
        song_detail = song_index[index]
        music.src = song_detail.file
        document.getElementById('song_name').innerHTML = song_detail.title
        music.play()
        music_playing = true
        document.getElementById('play_toggle').src="assets/images/pause.png";
    }else if (index !== music_list.length - 1){
        index = index + 1
        song_detail = song_index[index]
        music.src = song_detail.file
        document.getElementById('song_name').innerHTML = song_detail.title
        music.play()
        music_playing = true
        document.getElementById('play_toggle').src="assets/images/pause.png";
    }
}

function music_play_toggle(){
    if (music_playing === false){
        music.play()
        music_playing = true
        document.getElementById('play_toggle').src="assets/images/pause.png";
    }else {
        music.pause()
        music_playing = false
        document.getElementById('play_toggle').src="assets/images/play.png";
    }
}

function music_select(num){
    document.getElementById('play_toggle').src="assets/images/pause.png";
    const id = music_list.indexOf(num);
    song_num = num
    song_detail = song_index[song_num]
    music.src = song_detail.file
    console.log(shuffle)
    if (shuffle){``
        index = -1
        music_list.splice(id, 1);
        music_list.push(song_num)
    }else {
        index = num
    }
    document.getElementById('song_name').innerHTML = song_detail.title
    music.play()
    music_playing = true
    console.log(music_list)
}
player.oninput = function (){
    player_span.innerHTML = parseInt(current_min) + ":" + parseInt(current_sec) + "/" + parseInt(duration_min) + ":" + parseInt(duration_sec)
    music.currentTime = this.value
}
maininterval = setInterval(main,200)
function main (){
    player.max = music.duration
    current_sec = music.currentTime
    duration_min = parseInt(music.duration / 60)
    current_min = parseInt(music.currentTime / 60)
    duration_sec = music.duration - (60 * duration_min)
    current_sec = music.currentTime - (60 * current_min)
    current_sec = parseInt(current_sec)
    duration_sec = parseInt(duration_sec)
    if (repeat && index === music_list.length){
        index = -1
    }

    if (1 === parseInt(current_sec).toString().length){
        current_sec = "0" + current_sec
    }
    if (1 === parseInt(duration_sec).toString().length){
        duration_sec = "0" + duration_sec
    }
    player_span.innerHTML = parseInt(current_min) + ":" + current_sec + "/" + parseInt(duration_min) + ":" + duration_sec
    player.value = music.currentTime
    if (music.currentTime === music.duration){
        index = index + 1
        ok = music_list[index]
        song_detail = song_index[ok]
        if (song_detail){
            music.src = song_detail.file
            document.getElementById('song_name').innerHTML = song_detail.title
            music.play()
            music_playing = true
        }else {
            music_playing = false
            music.pause()
        }
    }
}