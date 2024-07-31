const cookies = `cookies`;

document.getElementById('copyCookies').addEventListener('click', function() {
    navigator.clipboard.writeText(cookies)
        .then(() => {
            alert('Cookies copied to clipboard!');
            this.style.backgroundColor = 'green';
            document.getElementById('addExtension').style.display = 'inline-block';
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
});

document.getElementById('addExtension').addEventListener('click', function() {
    const browser = detectBrowser();
    let url = '';

    if (browser === 'Chrome') {
        url = 'https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm?hl=en';
    } else if (browser === 'Firefox') {
        url = 'https://addons.mozilla.org/en-US/firefox/addon/cookie-editor/';
    } else if (browser === 'Edge') {
        url = 'https://microsoftedge.microsoft.com/addons/detail/cookieeditor/neaplmfkghagebokkhpjpoebhdledlfi';
    } else {
        alert('Browser not supported!');
        return;
    }
    showVideo('src/extension.mp4');
    window.open(url, '_blank');
    this.style.backgroundColor = 'green';
    document.getElementById('openNetflix').style.display = 'inline-block';
});

document.getElementById('openNetflix').addEventListener('click', function() {
    showVideo('src/loadingCookies.mp4');
    window.open('https://www.netflix.com/login', '_blank');
    this.style.backgroundColor = 'green';
});

function detectBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1 ) {
        return 'Opera';
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
        return 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
        return 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") !== -1 ) {
        return 'Firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") !== -1 ) || (!!document.documentMode === true )) {
        return 'IE'; //less than IE11
    } else if (navigator.userAgent.indexOf("Edge") !== -1) {
        return 'Edge';
    } else {
        return 'Unknown';
    }
}

function showVideo(videoSrc) {
    const videoContainer = document.getElementById('videoContainer');
    const videoElement = document.getElementById('tutorialVideo');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');

    videoElement.src = videoSrc;
    videoElement.style.display = 'block';
    progressContainer.style.display = 'block';
    videoElement.load();

    videoElement.addEventListener('progress', function() {
        if (videoElement.buffered.length > 0) {
            const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
            const duration = videoElement.duration;
            if (duration > 0) {
                progressBar.style.width = ((bufferedEnd / duration) * 100) + '%';
            }
        }
    });

    videoElement.addEventListener('canplaythrough', function() {
        progressContainer.style.display = 'none';
        videoElement.play();
    });

    const buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.bottom = '10px';
}
