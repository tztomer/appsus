import { utilService } from '../services/util-service.js';
import { storageService } from '../services/async-storage-service.js';

const EMAIL_KEY = 'emails';
const emailsDB = utilService.loadFromStorage(EMAIL_KEY) || _createSamplesEmails();

export const emailService = {
  getEmails,
  updateEmail,
  createNewEmail,
  getEmailById,
  sendToNotes,
  removeEmail,
  toggleStar,
};

function getEmails() {
  return storageService.query(EMAIL_KEY);
  // return Promise.resolve(emailsDB);
}

function getEmailById(emailId) {
  const email = emailsDB.find(email => email.id === emailId);
  return Promise.resolve(email);
}

function removeEmail(emailId) {
  const idx = emailsDB.findIndex(email => email.id === emailId);
  const fromName = emailsDB[idx].from || '';
  emailsDB.splice(idx, 1);
  utilService.saveToStorage(EMAIL_KEY, emailsDB);
  return Promise.resolve(fromName);
}

// Reuse func - for all updates. When need to return - promise
function updateEmail(prop, val, emailId) {
  const foundEmail = emailsDB.find(email => email.id === emailId);
  const emailIdx = emailsDB.findIndex(email => email.id === emailId);

  // Make a deep copy and splice for vue reactivation
  const emailCopy = JSON.parse(JSON.stringify(foundEmail));
  emailCopy[prop] = val;
  emailsDB.splice(emailIdx, 1, emailCopy);
  utilService.saveToStorage(EMAIL_KEY, emailsDB);
  return Promise.resolve(emailsDB);
}

function toggleStar(emailId) {
  let emailIdx;
  const email = emailsDB.find((email, idx) => {
    if (email.id === emailId) {
      emailIdx = idx;
      return email;
    }
  });
  let emailCopy = JSON.parse(JSON.stringify(email));
  emailCopy.boxes.star = !email.boxes.star;
  emailsDB.splice(emailIdx, 1, emailCopy);
  utilService.saveToStorage(EMAIL_KEY, emailsDB);
}

function sendToNotes(emailId) {
  const foundEmail = emailsDB.find(email => email.id === emailId);
  const boxes = foundEmail.boxes;
  for (const prop in boxes) {
    boxes[prop] = false;
  }
  let noteTxt = 'Email from: ' + foundEmail.from + '  -  ';
  noteTxt += foundEmail.body.length > 0 ? foundEmail.body : foundEmail.subject;

  const note = {
    type: 'noteText',
    noteType: 'txt',
    isPinned: boxes.star,
    info: {
      txt: noteTxt,
      img: '',
      video: '',
      title: '',
      todos: null,
    },
  };
  noteService.createNote(note);
  boxes.note = true;
  utilService.saveToStorage(EMAIL_KEY, emailsDB);
  return Promise.resolve();
}

function createNewEmail(emailInfo) {
  const email = {
    id: utilService.makeId(),
    from: emailInfo.from,
    subject: emailInfo.subject,
    body: emailInfo.body,
    isRead: false,
    sentAt: Date.now(),
    boxes: emailInfo.boxes,
  };
  emailsDB.unshift(email);
  utilService.saveToStorage(EMAIL_KEY, emailsDB);

  return Promise.resolve(email);
}

//Private functions

// Samples data! to move to new service
function _createSamplesEmails() {
  const fromNames = [
    'Rami',
    'Oz',
    'Guy',
    'Ran',
    'Daniel',
    'Yaron',
    'Nadav',
    'Omer',
    'Rami',
    'Oz',
    'Guy',
    'Ran',
    'Daniel',
    'Yaron',
    'Nadav',
    'Omer',
    'Rami',
    'Oz',
    'Guy',
    'Ran',
    'Daniel',
    'Yaron',
    'Nadav',
    'Omer',
  ];
  const emails = fromNames.map(_createEmail);
  utilService.saveToStorage(EMAIL_KEY, emails);
  return emails;
}

function _createEmail(from = utilService.createWord(6)) {
  return {
    id: utilService.makeId(),
    from: from,
    subject: utilService.makeLorem(utilService.getRandom(7, 20)),
    body: utilService.makeLorem(utilService.getRandom(100, 650)),
    isRead: false,
    sentAt: Date.now(),
    boxes: {
      inbox: true,
      sentBox: false,
      draft: false,
      star: false,
      note: false,
    },
  };
}
