class Editor {

  constructor(reply_id, close=true) {
    this.reply_id = reply_id
    this.form = null
    this.close = close
  }

  get toDOM() {
    let close = ''
    if (this.close) {
      close = ' data-close="true"'
    }
    let form = `
    <div class="comment editor">
      <img src="${user.profile}" alt="${user.username}'s profile image" class="profile">
      <div class="body">
        <div class="head">
          <span class="author">${user.username}</span>
          <span class="date">A l'instant</span>
        </div>
        <div class="content">
          <form method="post" class="form-comment">
            <textarea name="comment" placeholder="Commencez par écrire votre commentaire ici"${close}></textarea>
            <input type="hidden" name="ref" value="${this.reply_id}">
            <div class="buttons">
              <button type="reset"${close}>Annuler</button>
              <button type="submit" class="primary">Valider</button>
            </div>
          </form>
        </div>
      </div>
    </div>`

    let parser = new DOMParser();
  	let doc = parser.parseFromString(form, 'text/html');
    this.form = doc.body.firstChild

  	return this.form;
  }

  inputHandler(e) {
    var textarea = this.form.querySelector('textarea'),
        buttons = this.form.querySelector('.buttons')
    if (e.key === "Escape") {
      if (this.dataset.close) {
        editor.remove()
      }
      else {
        textarea.style.height = ''
        buttons.style.maxHeight = '0px'
      }
    }
    if (textarea.scrollHeight > textarea.clientHeight) {
      textarea.style.height = (textarea.scrollHeight + 10) + "px";
    }
    if (textarea.value.length != 0) {
      buttons.style.maxHeight = '100px'
    }
    else {
      buttons.style.maxHeight = '0px'
    }
  }

  cancelHandler() {
    var textarea = this.form.querySelector('textarea'),
        buttons = this.form.querySelector('.buttons')
    if (this.dataset.close) {
      editor.remove()
    }
    else {
      textarea.style.height = ''
      buttons.style.maxHeight = '0px'
    }
  }

  setEvents() {
    var textarea = this.form.querySelector('textarea'),
        buttons = this.form.querySelector('.buttons')
    textarea.addEventListener('keydown', this.inputHandler, true)
    buttons.querySelector('[type="reset"]').addEventListener('click', this.cancelHandler, true)
    textarea.addEventListener("touchcancel", this.cancelHandler, true);
  }

  removeEvents() {
    var textarea = this.form.querySelector('textarea'),
        buttons = this.form.querySelector('.buttons')
    textarea.removeEventListener('keydown', this.inputHandler)
    buttons.querySelector('[type="reset"]').removeEventListener('click', this.cancelHandler)
    textarea.removeEventListener("touchcancel", this.cancelHandler);

  }

  remove() {
    this.removeEvents()
    this.form.remove()
  }

}

/** Publish **/
var publish_editor = new Editor(0, false)
document.querySelector('.comments').prepend(publish_editor.toDOM)
publish_editor.setEvents()

/** Reply **/
var editor = null

function reply(link) {
  // Select the comment
  let comment = link;
  while (!comment.classList.contains('comment')) {
    comment = comment.parentNode
  }

  // Remove previous editor
  if (editor != null) {
    editor.remove()
    editor = null
  }

  // Create new editor
  let replies = comment.querySelector('.replies')
  let form = new Editor(comment.dataset.id)
  let DOM_form = form.toDOM
  editor = form
  replies.appendChild(DOM_form)

  // Setup events and scroll to element
  form.setEvents()
  let textarea = DOM_form.querySelector('textarea')
  window.scroll({
    left: 0,
    top: textarea.offsetTop - 200,
    behavior: 'smooth',
  });
  textarea.focus()
}

function like(link) {
  link.classList.toggle('liked')

  // Select the comment
  let comment = link;
  while (!comment.classList.contains('comment')) {
    comment = comment.parentNode
  }

  // Ajax here
}
