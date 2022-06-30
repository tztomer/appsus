export const utilService = {
  saveToStorage,
  loadFromStorage,
  getRandom,
  makeLorem,
  makeId,
  createWord,
  getFormattedHour,
  getFormattedDate,
  getFormattedDateShort,
};
let words = [];
_populateWords();
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function createWord(length) {
  var word = '';
  while (word.length < length) {
    var randChar = _getRandChar();
    word += randChar;
  }
  return word;
}

function makeLorem(length) {
  var randStr = '';
  while (randStr.length < length) {
    var word = words[getRandom(1, 28)];
    randStr += word + ' ';
  }
  randStr = randStr[0].toUpperCase() + randStr.substr(1);
  return randStr;
}

function _getRandChar() {
  var LETTERS = 'abcdefghijklmnopqrstuvwxyz';
  var randIndex = parseInt(Math.random() * LETTERS.length);
  return LETTERS.charAt(randIndex);
}

function getFormattedHour(timestamp) {
  const time = new Date(timestamp);
  let hours = time.getHours();
  let minutes = time.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const timeStr = hours + ':' + minutes + ' ' + ampm;
  return timeStr;
}

function getFormattedDateShort(timestamp) {
  const time = new Date(timestamp);
  const prop = { month: 'long', day: 'numeric' };
  return moment(time).format('D MMMM');
  // time.format('D MMMM');
  // return time.toLocaleDateString('en', prop);
}

function getFormattedDate(timestamp) {
  const time = new Date(timestamp);
  // Replacing '.' with '/'
  var options = { month: 'long', day: 'numeric' };
  return time.toLocaleString().split(',')[0].replace(/\./g, '/');
}

function _populateWords() {
  words[1] = 'escapology';
  words[2] = 'brightwork';
  words[3] = 'verkrampte';
  words[4] = 'protectrix';
  words[5] = 'nudibranch';
  words[6] = 'grandchild';
  words[7] = 'newfangled';
  words[8] = 'flugelhorn';
  words[9] = 'mythologer';
  words[10] = 'pluperfect';
  words[11] = 'jellygraph';
  words[12] = 'quickthorn';
  words[13] = 'rottweiler';
  words[14] = 'technician';
  words[15] = 'cowpuncher';
  words[16] = 'middlebrow';
  words[17] = 'jackhammer';
  words[18] = 'triphthong';
  words[19] = 'wunderkind';
  words[20] = 'dazzlement';
  words[21] = 'jabberwock';
  words[22] = 'witchcraft';
  words[23] = 'pawnbroker';
  words[24] = 'thumbprint';
  words[25] = 'motorcycle';
  words[26] = 'cryptogram';
  words[27] = 'torchlight';
  words[28] = 'bankruptcy';
}
