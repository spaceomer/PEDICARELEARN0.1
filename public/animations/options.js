const optionsButton = document.querySelector('.optionsButton') 
const options = document.querySelector('.options') 

function optionsOpen() {
    options.classList.remove('options')
    options.classList.add('optionsVisibal')
}

optionsButton.addEventListener('click', optionsOpen)