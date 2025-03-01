document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bg-music");
    let playPauseBtn = document.getElementById("playPause");
    let playPauseIcon = document.getElementById("playPauseIcon");

    // Ensure only one instance of audio is playing
    if (!window.audioInstance) {
        window.audioInstance = audio;
    } else {
        audio = window.audioInstance;
    }

    // Restore playback position and state
    if (sessionStorage.getItem("audioTime")) {
        audio.currentTime = sessionStorage.getItem("audioTime");
    }
    if (sessionStorage.getItem("audioPaused") === "true") {
        audio.pause();
        playPauseIcon.innerHTML = "▶"; // Show play icon
    } else {
        audio.play();
        playPauseIcon.innerHTML = "⏸"; // Show pause icon
    }

    // Save playback state before leaving the page
    window.addEventListener("beforeunload", function () {
        sessionStorage.setItem("audioTime", audio.currentTime);
        sessionStorage.setItem("audioPaused", audio.paused);
    });

    // Play/Pause Button
    playPauseBtn.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            playPauseIcon.innerHTML = "⏸"; // Change to pause icon
            sessionStorage.setItem("audioPaused", "false");
        } else {
            audio.pause();
            playPauseIcon.innerHTML = "▶"; // Change to play icon
            sessionStorage.setItem("audioPaused", "true");
        }
    });
});

