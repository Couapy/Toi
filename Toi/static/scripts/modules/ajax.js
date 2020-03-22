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
 * This function call an url to deliver a form
 * @param {string} url The url for the request
 * @param {Form} form The form data to transmit
 * @param {callback} success_callback This callback is called on success
 * @param {callback} error_callback This callback is called on error
 */
export function request(url, form, success_callback = function () {}, error_callback = function () {}) {
    let request = new XMLHttpRequest()

    // Open the URL
    request.open('POST', url, true);

    // Enable POST data
    request.setRequestHeader("X-CSRFToken", csrf_token);

    // Add events listeners
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