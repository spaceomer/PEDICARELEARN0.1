const courses = document.querySelectorAll('.cours')
courses.forEach(function(cours) {
    cours.addEventListener('click', () => {
        courses.forEach(function(cours) {
            cours.classList.remove('cours1')
        })
        cours.classList.add('cours1')
    })
})