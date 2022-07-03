import { utilService } from '../services/util-service.js';
import { storageService } from '../services/async-storage-service.js';

const EMAIL_KEY = 'emails';
const emailsFromStorage = utilService.loadFromStorage(EMAIL_KEY) || initCreateEmails();

export const emailService = {
  getEmails,
  updateEmail,
  createNewEmail,
  getEmailById,
  removeEmail,
  toggleStar,
};

function getEmails() {
  return storageService.query(EMAIL_KEY);
}

function getEmailById(bookId) {
  return storageService.get(EMAIL_KEY, bookId);
}

function removeEmail(emailId) {
  return storageService.remove(EMAIL_KEY, emailId);
}

function updateEmail(email) {
  return storageService.put(EMAIL_KEY, email);
}

function toggleStar(emailId) {
  let emailIdx;
  const email = emailsFromStorage.find((email, idx) => {
    if (email.id === emailId) {
      emailIdx = idx;
      return email;
    }
  });
  let emailCopy = JSON.parse(JSON.stringify(email));
  emailCopy.boxes.star = !email.boxes.star;
  emailsFromStorage.splice(emailIdx, 1, emailCopy);
  utilService.saveToStorage(EMAIL_KEY, emailsFromStorage);
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
  emailsFromStorage.unshift(email);
  utilService.saveToStorage(EMAIL_KEY, emailsFromStorage);

  return Promise.resolve(email);
}

//Private functions

// Samples data! to move to new service
function initCreateEmails() {
  const fromNames = [
    'Tomer Zairi',
    'Mayan Shlomi',
    'Idan Sor',
    'Michel Pollen',
    'Meir Arial',
    'David Broza',
    'Astrix Music',
    'Jesus',
    'Shani Simeon',
    'Avi Biter',
    'Mia Zairi',
    'Oren Ran',
    'Netflix New Arrivals',
    'Boris Barchan',
    'Ron Gavial',
    'Petter Pan',
    'Ben Shapiro',
    'New Sale!',
    'Gondi',
    'Steve Jobs',
    'ACA Trips',
    'Google Account',
    'Sony Playstation',
    'Boris Barchan',
    'Ron Gavial',
    'Petter Pan',
    'Ben Shapiro',
    'New Sale!',
    'Gondi',
    'Steve Jobs',
    'ACA Trips',
    'Google Account',
    'Sony Playstation',
    'Last But Not list',
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
