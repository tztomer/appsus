function on(eventName, listener) {
  //              a fun that gets the data we send
  const callListener = ({ detail }) => {
    //run the func we got with the data
    listener(detail);
  };
  //put on the window an eventListener to our custom event we created
  window.addEventListener(eventName, callListener); // when the event trigger run our func with the data we pass
  //return a func soo we could remove the listener
  return () => {
    window.removeEventListener(eventName, callListener);
  };
}

//2 params -> eventName and data that we want to pass
function emit(eventName, data) {
  //emit a custom event with the name and the data
  window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

// // we got 2 funcs on and emit
export const EVENT_ADD_BOOK = 'addBook';
export const EVENT_MESSAGE = 'message';
export const EVENT_CLOSE_MESSAGE = 'closeMessage';
export const EVENT_EMAIL_REMOVED = 'emailRemoved';
export const EVENT_EMAIL_UPDATED = 'emailUpdated';
export const EVENT_EMAIL_TO_NOTES = 'emailSentToNotes';
export const EVENT_EMAIL_REPLY = 'replyToEmail';
// export const EVENT_EMAIL_STARRED = 'toggleEmailStar';

export const EVENT_NOTE_COLOR = 'changeNoteBGcolor';
export const EVENT_NOTE_TO_MAIL = 'sendNoteToMail';
export const eventBus = { on, emit };
// export const EVENT_EMAIL_STARRED = 'toggleEmailStar';
