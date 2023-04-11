const UserBar = document.querySelector('.userBar')
const button = document.querySelector('#moreOptions')
const block = document.querySelector('.userOptions')
UserBar.classList.add('pointer')

UserBar.addEventListener('click', () => {
    if( button.innerHTML === "expand_more") {
        button.innerHTML= "expand_less" 
        block.classList.add('display')
    } else {
        button.innerHTML= "expand_more"
        block.classList.remove('display')
    }
})

