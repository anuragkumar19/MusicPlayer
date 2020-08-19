// Getting DOM Elements
const disc = document.getElementById('disc');
const titleElm = document.getElementById('Tracktitle');
const fileInp = document.getElementById('file');
const AudioElm = document.getElementById('AudioElm');
const rangeInp = document.getElementById('rangeInpJ');
const playPauseBtn = document.getElementById('playPauseBtn');
const backBtn = document.getElementById('backBtn');
const forBtn = document.getElementById('forBtn');
const stopBtn = document.getElementById('stopBtn');
const muteBtn = document.getElementById('muteBtn');


// Add event listener on fileInp to change
fileInp.addEventListener('change', InputChanged);

// Play/pause sound
playPauseBtn.addEventListener('click', playPause);

// Pluse 10 s
forBtn.addEventListener('click', e=> AudioElm.currentTime = AudioElm.currentTime + 10);
// Minus 10 s
backBtn.addEventListener('click', e=> AudioElm.currentTime = AudioElm.currentTime - 10);
// Toggle mute
muteBtn.addEventListener('click', muteAudio);
// Stop music
stopBtn.addEventListener('click', e=> {
  AudioElm.currentTime = 0;
  AudioElm.pause();
});






function InputChanged(e) {
  let file = fileInp.files[0];
  if (!file) {
    alertErr('No file chosen!');
    titleElm.innerText = 'No track selected.';
    return;
  }

  if (!file.type.includes('audio')) {
    alertErr('File type not supported.');
    return;
  }

  // Set file name
  titleElm.innerText = file.name;

  // Initialize reader
  let reader = new FileReader();

  reader.onload = ()=> {
    AudioElm.src = reader.result;
  };

  // Pass file
  reader.readAsDataURL(file);

}

function playPause() {
  if (AudioElm.paused) {
    AudioElm.play();
  } else {
    AudioElm.pause();
  }
}

function muteAudio() {
  if (AudioElm.volume == 0) {
    AudioElm.volume = 1;
    muteBtn.classList.add('fa-volume-up');
    muteBtn.classList.remove('fa-volume-mute');
  } else {
    AudioElm.volume = 0;
    muteBtn.classList.remove('fa-volume-up');
    muteBtn.classList.add('fa-volume-mute');
  }
}

setInterval(()=> {
  if (!isNaN(AudioElm.duration) && AudioElm.duration !== 0 && typeof(AudioElm.duration) == 'number') {
    rangeInp.value = (AudioElm.currentTime / AudioElm.duration)*100;
  }
}, 1000);

// Alert mesaage
function alertErr(msg) {
  let div = document.createElement('div');
  div.classList.add('alert');
  div.innerText = msg;
  document.body.appendChild(div);
  setTimeout(()=> div.remove(),
    5000);
}

// Add event listener for pause/play
AudioElm.onpause = () => {
  playPauseBtn.classList.add('fa-play');
  playPauseBtn.classList.remove('fa-pause');
  disc.classList.remove('rotate');
};

AudioElm.onplay = ()=> {
  playPauseBtn.classList.remove('fa-play');
  playPauseBtn.classList.add('fa-pause');
  disc.classList.add('rotate');
};

// Add event listener to rangeInp
rangeInp.addEventListener('change', e=> {
  if (!isNaN(AudioElm.duration) && AudioElm.duration !== 0 && typeof(AudioElm.duration) == 'number') {
    AudioElm.currentTime = (rangeInp.value/100)*AudioElm.duration;
  }
});


// moment format time
function cfd(sec) {
  if (sec < 3600) {
    return moment.utc(sec*1000).format('mm:ss');
  } else {
    return moment.utc(sec*1000).format('HH:mm:ss');
  }
}