import { request } from './ajax.js'

var editor = null

/**
 * Editor class for create forms to reply or publish a comment
 */
export class Editor {

    constructor(params = {} ) {
        /**
         * Setup the editor params
         */
        this.action = ''
        this.reply_id = 0
        this.edit_id = null
        this.close = true
        this.cancel_callback = this.cancelHandler.bind(this)
        if ('action' in params) {
            this.action = params['action']
        }
        if ('reply_id' in params) {
            this.reply_id = params['reply_id']
        }
        if ('edit_id' in params) {
            this.edit_id = params['edit_id']
        }
        if ('close' in params) {
            this.close = params['close']
        }
        if ('cancel_callback' in params) {
            this.cancel_callback = params['cancel_callback'].bind(this)
        }

        /**
         * Sets the DOM Elements
         */
        this.editor = null
        this.form = null
        this.textarea = null
        this.buttons = null
        
        /**
         * Bind this to event handler functions
         */
        this.inputHandler = this.inputHandler.bind(this)
        this.sendHandler = this.sendHandler.bind(this)
    }

    get toDOM() {
        let input_ref = {
            name: 'replyto',
            value: this.reply_id
        }
        if (this.edit_id != null) {
            input_ref.name = 'edit'
            input_ref.value = this.reply_id
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
            <textarea name="comment" placeholder="Commencez par écrire votre commentaire ici"></textarea>
            <input type="hidden" name="${input_ref.name}" value="${input_ref.value}">
            <div class="buttons">
              <button type="reset">Annuler</button>
              <button type="submit" class="primary">Valider</button>
            </div>
          </form>
        </div>
      </div>
    </div>`

        let parser = new DOMParser();
        let doc = parser.parseFromString(form, 'text/html');
        this.editor = doc.body.firstChild
        this.form = this.editor.querySelector('form')

        /**
         * Set the events
         */
        this.textarea = this.editor.querySelector('textarea')
        this.buttons = this.editor.querySelector('.buttons')
        this.setEvents()

        return this.editor;
    }

    inputHandler(e) {
        if (e.key === "Escape") {
            if (this.dataset.close) {
                this.remove()
            }
            else {
                this.textarea.style.height = ''
                this.buttons.style.maxHeight = '0px'
            }
        }
        if (this.textarea.scrollHeight > this.textarea.clientHeight) {
            this.textarea.style.height = (this.textarea.scrollHeight + 10) + "px";
        }
        if (this.textarea.value.length != 0) {
            this.buttons.style.maxHeight = '100px'
        }
        else {
            this.buttons.style.maxHeight = '0px'
        }
    }

    cancelHandler() {
        if (this.close) {
            this.remove()
        }
        else {
            this.textarea.style.height = ''
            this.buttons.style.maxHeight = '0px'
        }
    }

    sendHandler(e) {
        e.preventDefault()
        let data = new FormData(this.form)

        request(
            this.action,
            data,
            function (e) {
                let res = JSON.parse(e)
                if (res.success) {
                    document.location.href = res.redirect_link
                }
                else {
                    console.log(res.error);
                }
            },
            function (e) {
                console.log(e);
            }
        )
    }

    setEvents() {
        this.form.addEventListener('submit', this.sendHandler)
        this.textarea.addEventListener('keydown', this.inputHandler, true)
        this.buttons.querySelector('[type="reset"]').addEventListener('click', this.cancel_callback, true)
    }

    removeEvents() {
        this.form.removeEventListener('submit', this.sendHandler)
        this.textarea.removeEventListener('keydown', this.inputHandler)
        this.buttons.querySelector('[type="reset"]').removeEventListener('click', this.cancel_callback)
    }

    remove() {
        this.removeEvents()
        this.editor.remove()
    }

}

/**
 * Like a comment
 * @param {Event} event
 */
export function like(event) {
    let link = event.currentTarget

    // Select the comment
    let comment = link;
    while (!comment.classList.contains('comment')) {
        comment = comment.parentNode
    }

    // Prepare the request
    let url = 'comment/' + comment.dataset.id + '/like/'
    let form = new FormData()
    let success_callback = function(response) {
        let res = JSON.parse(response)
        if (res.success) {
            link.classList.toggle('liked')
            let likes = comment.querySelector('.likes')
            if (link.classList.contains('liked')) {
                likes.innerText = parseInt(likes.innerText)+1
            }
            else {
                likes.innerText = parseInt(likes.innerText)-1
            }
        }
        else {
            console.log(res);
        }
    }
    let error_callback = function(response) {
        console.log('An unexepected error was encountered.')
    }
    // Send the request
    request(url, form, success_callback, error_callback)
}

/**
 * Spawn a new editor instance to reply to a existing comment
 * @param {Event} event 
 */
export function reply(event) {
    // Select the comment
    let comment = event.currentTarget;
    while (!comment.classList.contains('comment')) {
        comment = comment.parentNode
    }

    // Remove previous editor
    if (editor != null) {
        editor.remove()
    }

    // Create new editor
    let replies = comment.querySelector('.replies')
    let form = new Editor({
        reply_id: comment.dataset.id
    })
    let DOM_form = form.toDOM
    editor = form
    replies.appendChild(DOM_form)

    // Setup events and scroll to element
    let textarea = DOM_form.querySelector('textarea')
    scrollTo(textarea)
    textarea.focus()
}

/**
 * Spawn a new editor instance to edit this comment
 * @param {Event} event The click event from the link 'Edit this comment'
 */
export function edit(event) {
    // Select the comment
    let comment = event.currentTarget;
    while (!comment.classList.contains('comment')) {
        comment = comment.parentNode
    }

    // Remove previous editor
    if (editor != null) {
        editor.remove()
    }

    // Create new editor
    let form = new Editor({
        action: 'comment/' + comment.dataset.id + '/edit/',
        edit_id: comment.dataset.id,
        cancel_callback: function() {
            comment.style.display = ''
            this.remove()
        }
    })
    let DOM_form = form.toDOM
    editor = form
    comment.after(DOM_form)

    // Add content
    comment.style.display = 'none'
    editor.textarea.innerHTML = comment.querySelector('.text').innerHTML
    editor.inputHandler(new Event(null))

    // Setup events and scroll to element
    let textarea = DOM_form.querySelector('textarea')
    scrollTo(textarea)
    textarea.focus()
}

function scrollTo(element) {
    window.scroll({
        left: 0,
        top: element.offsetTop - 200,
        behavior: 'smooth',
    })
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.location.hash.match('#comment')) {
        let element = document.querySelector(document.location.hash)
        scrollTo(element)
    }
})
