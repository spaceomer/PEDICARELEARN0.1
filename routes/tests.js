const options = document.querySelectorAll('.nuv')

options.forEach(function(option) {
    option.addEventListener("click", () => {
        options.forEach(function(op) {
            op.style.backgroundColor = 'initial'
        })
        this.style.backgroundColor = '#3477b3'
    })
})