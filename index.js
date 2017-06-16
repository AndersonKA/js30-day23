const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

// getting the voices (less creepy than it sounds)
function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// changing the voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle(); // this makes it so if the user clicks on another voice it plays that one right away instead of waiting for the first voice to finish
}

// start a new one if a second thing is clicked.
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if(startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);

options.forEach(option => option.addEventListener('change', setOption));
// making the start and stop buttons
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
