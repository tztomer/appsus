export const utilService = {
  saveToStorage,
  loadFromStorage,
  makeId,
  createWord,
};

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

function _getRandChar() {
  var LETTERS = 'abcdefghijklmnopqrstuvwxyz';
  var randIndex = parseInt(Math.random() * LETTERS.length);
  return LETTERS.charAt(randIndex);
}
