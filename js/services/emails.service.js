import { utilService } from '../services/util-service.js';
// import { noteService } from '../services/note.service.js';

const EMAIL_KEY = 'emails';
const emailsDB = utilService.load(EMAIL_KEY) || _createSamplesEmails();

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
