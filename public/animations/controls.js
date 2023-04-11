const playButton = document.querySelector('#play')
const BackwordButton = document.querySelector('#backword')
const video = document.querySelector('.video')
const progressBar = document.querySelector('.videoProggress')
const volumeButton = document.querySelector('#volume')
const currentTime = document.querySelector('.currentTime')
const videoTime = document.querySelector('.videoTime')
const quiz = document.querySelector('.quizBack')
const dataTime = document.querySelector('#currentTimeInput')
const end = document.querySelector('.nextback')
const controls = document.querySelector('.controls')
const restart = document.querySelector('#restart')
const next = document.querySelector('#next')
const value = window.togglePlay;

start()


video.addEventListener("ended", () => {
    video.style.display = "none"
    end.style.display = "flex" 
    window.togglePlay = null;

    restart.addEventListener("click", () => {
        video.style.display = "block"
        end.style.display = "none" 
        window.togglePlay = value;
        video.currentTime = 0
    })
})

playButton.innerHTML = "pause"
video.play()

function save() {
    dataTime.setAttribute("value", video.currentTime)
}

video.addEventListener("timeupdate", () => {
    currentTime.textContent = formatDuration(video.currentTime)
    dataTime.setAttribute("value", video.currentTime)
})

video.addEventListener("loadeddata", () => {
    videoTime.textContent = formatDuration(video.duration)
})



const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
})

function formatDuration(time) {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)
    if (hours === 0 ) {
        return `${minutes}:${leadingZeroFormatter.format(seconds)}`
    } else {
        return `${hours}:${leadingZeroFormatter.format(
            minutes
        )}:${leadingZeroFormatter.format(seconds)}`
    }
}

volumeButton.addEventListener('click', () => {
    if (volumeButton.innerHTML === "volume_down") {
        volumeButton.innerHTML = "volume_mute" 
        video.volume = 0
    } else if (volumeButton.innerHTML === "volume_up") {
        volumeButton.innerHTML = "volume_down"
        video.volume = 0.4
    } else {
        volumeButton.innerHTML = "volume_up"
        video.volume = 0.9
    }
})

playButton.addEventListener('click', () => {
    togglePlay()
})

document.addEventListener('keydown', e => {
    switch (e.key.toLowerCase()) {
        case " ":
        case "k":
            togglePlay()
            break
        case "n":
            video.currentTime = video.currentTime + 300
            break
    }
})

video.addEventListener('click', () => {
    togglePlay()
})

function togglePlay() {
    if(video.paused) {
        video.play()
        playButton.innerHTML = "pause"
    } else {
        video.pause()
        playButton.innerHTML = "play_arrow"
    }
}


BackwordButton.addEventListener('click', () => {
    video.currentTime = video.currentTime - 5
})

video.addEventListener('timeupdate', () => {
    let percent = (video.currentTime / video.duration) * 100   
    progressBar.style.width = `${percent}%`
})
