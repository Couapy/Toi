import { Editor, like, reply, edit, del } from './modules/comment.js'
import { request } from './modules/ajax.js'

if (user.connected) {
    /**
     * Add an Editor's instance to the beginning of the comments
     */
    var publish_editor = new Editor({
        action: 'comment/publish/',
        reply_id: 0,
        close: false
    })
    document.querySelector('.comments').prepend(publish_editor.toDOM)
    publish_editor.setEvents()

    /**
     * Add events for Reply and Like comments
     */
    document.querySelectorAll('.comment .like').forEach(link => {
        link.addEventListener('click', like)
    })
    document.querySelectorAll('.comment .reply').forEach(link => {
        link.addEventListener('click', reply)
    })
    document.querySelectorAll('.comment .edit').forEach(link => {
        link.addEventListener('click', edit)
    })
    document.querySelectorAll('.comment .delete').forEach(link => {
        link.addEventListener('click', del)
    })
}
else {
    /**
     * Add events for Reply and Like comments
     */
    document.querySelectorAll('.comment .like').forEach(link => {
        link.addEventListener('click', () => {
            alert('Connectez-vous pour utiliser cette fonctionnalité.')
        })
    })
    document.querySelectorAll('.comment .reply').forEach(link => {
        link.addEventListener('click', () => {
            alert('Connectez-vous pour utiliser cette fonctionnalité.')
        })
    })
}
