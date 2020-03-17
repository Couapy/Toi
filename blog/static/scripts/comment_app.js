import { Editor, reply, like } from './modules/comment.js'

if (user.connected) {
    /**
     * Add an Editor's instance to the beginning of the comments
     */
    var publish_editor = new Editor(0, false)
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