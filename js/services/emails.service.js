import { utilService } from '../services/util-service.js';
// import { noteService } from '../services/note.service.js';

const EMAIL_KEY = 'emails';
const emailsStorage = utilService.loadFromStorage(EMAIL_KEY) || _createSamplesEmails();

export default {
  getEmails,
  toggleStar,
  update,
  createNewEmail,
  getEmailById,
  removeEmail,
  updateEmail,
};

function getEmails() {
  return Promise.resolve(emailsStorage);
}

function getEmailById(emailId) {
  const email = emailsStorage.find(email => email.id === emailId);
  return Promise.resolve(email);
}

function removeEmail(emailId) {
  const idx = emailsStorage.findIndex(email => email.id === emailId);
  const fromName = emailsStorage[idx].from || '';
  emailsStorage.splice(idx, 1);
  utilService.saveToStorage(EMAIL_KEY, emailsStorage);
  return Promise.resolve(fromName);
}

// Reuse func - for all updates. When need to return - promise
function updateEmail(prop, val, emailId) {
  const foundEmail = emailsStorage.find(email => email.id === emailId);
  const emailIdx = emailsStorage.findIndex(email => email.id === emailId);

  // Make a deep copy and splice for vue reactivation
  const emailCopy = JSON.parse(JSON.stringify(foundEmail));
  emailCopy[prop] = val;
  emailsStorage.splice(emailIdx, 1, emailCopy);
  utilService.saveToStorage(EMAIL_KEY, emailsStorage);
  return Promise.resolve(emailsStorage);
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
  emailsStorage.unshift(email);
  utilService.saveToStorage(EMAIL_KEY, emailsStorage);

  return Promise.resolve(email);
}

function _createSamplesEmails() {
  const fromNames = ['Tomer', 'Mayan', 'Raffi', 'Tom', 'Michel', 'Guy', 'Shlomi', 'Ran', 'David', 'Jassy', 'Bryan', 'Shone', 'Jesus', 'Peter'];
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

function toggleStar(emailId) {
  let emailIdx;
  const email = emailsStorage.find((email, idx) => {
    if (email.id === emailId) {
      emailIdx = idx;
      return email;
    }
  });
  let emailCopy = JSON.parse(JSON.stringify(email));
  emailCopy.boxes.star = !email.boxes.star;
  emailsStorage.splice(emailIdx, 1, emailCopy);
  utilService.saveToStorage(EMAIL_KEY, emailsStorage);
}

function update(email) {
  return utilService.saveToStorage(EMAIL_KEY, email);
}
