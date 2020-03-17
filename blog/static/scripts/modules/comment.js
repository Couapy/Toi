var editor = null
var csrf_token = getCookie('csrftoken')

/**
 * Get the cookie value from his name
 * This is the Django function from the documentation
 * Source : https://docs.djangoproject.com/fr/3.0/ref/csrf/
 * @param {string} name 
 */
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/**
 * Editor class for create forms to reply or publish a comment
 */
export class Editor {

    constructor(reply_id, close = true) {
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
            <input type="hidden" name="csrfmiddlewaretoken" value="${csrf_token}">
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

    /**
     * Send a request to toggle the like
     */

    // Prepare the request
    let url = '/comment/' + comment.dataset.id + '/like/'
    let form = new FormData()
    let success_callback = function(response) {
        let res = JSON.parse(response)
        if (res.success) {
            link.classList.toggle('liked')
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

/**
 * This function call an url to deliver a form
 * @param {string} url The url for the request
 * @param {Form} form The form data to transmit
 * @param {callback} success_callback This callback is called on success
 * @param {callback} error_callback This callback is called on error
 */
function request(url, form, success_callback = function () {}, error_callback = function () {}) {
    let request = null
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+...
        request = new XMLHttpRequest()
    }
    else if (window.ActiveXObject) { // IE 6 et antérieurs
        request = new ActiveXObject("Microsoft.XMLHTTP")
    }
    else {
        alert('Your navigator is not compatible')
        return false
    }

    // Open the URL
    request.open('POST', url, true);
    // Enable POST data
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader("X-CSRFToken", csrf_token);
    request.addEventListener('readystatechange', function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                success_callback(request.responseText)
            }
            else {
                error_callback(request.responseText)
            }
        }
    })
    // Send the request
    request.send(form);
}