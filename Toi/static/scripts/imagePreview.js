function updateImagePreview(input, imageselector) {
    if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = function (e) {
            document.querySelector(imageselector).src = e.target.result
        }
        reader.readAsDataURL(input.files[0])
    }
}
function listenImagePreview(inputselector, imageselector) {
    document.querySelector(inputselector).addEventListener('change', function () {
        updateImagePreview(this, imageselector)
    })
}