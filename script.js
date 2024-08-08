// Define the cookies for Prime Video and Netflix
const primeVideoCookies = `cookies1`; // Replace with actual Prime Video cookies
const netflixCookies = `cookies2`; // Replace with actual Netflix cookies

let selectedWebsite = ''; // Track the selected website

document.getElementById('copyCookies').addEventListener('click', function() {
    showPopup();
    this.style.backgroundColor = '#9f4c13';
    this.style.color = 'white'
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
    this.style.backgroundColor = '#9f4c13';
    this.style.color = 'white'
    window.open('https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm?hl=en', '_blank');
    document.getElementById('openWebsite').style.display = 'inline-block'; // Ensure button is displayed
});

document.getElementById('openWebsite').addEventListener('click', function() {
    if (selectedWebsite === 'Netflix') {
        window.open('https://www.netflix.com/login', '_blank');
    } else if (selectedWebsite === 'PrimeVideo') {
        window.open('https://www.primevideo.com', '_blank');
    } else {
        alert('No website selected!');
    }
    showVideo('src/loadingCookies.mp4');
    this.style.backgroundColor = '#9f4c13';
    this.style.color = 'white'
});

function showPopup() {
    const popupHtml = `
        <div class="popup">
            <div class="popup-content">
                <button id="copyNetflixCookies" class="btn">Copy Netflix Cookies</button>
                <button id="copyPrimeVideoCookies" class="btn">Copy Prime Video Cookies</button>
                <button id="closePopup" class="btn">Close</button>
            </div>
        </div>
    `;
    const popupContainer = document.createElement('div');
    popupContainer.innerHTML = popupHtml;
    document.body.appendChild(popupContainer);

    document.getElementById('copyNetflixCookies').addEventListener('click', function() {
        navigator.clipboard.writeText(netflixCookies); // Copy Netflix cookies to clipboard
        alert('Netflix cookies copied to clipboard!');
        selectedWebsite = 'Netflix'; // Set selected website to Netflix
        document.body.removeChild(popupContainer);
        document.getElementById('addExtension').style.display = 'inline-block';
    });

    document.getElementById('copyPrimeVideoCookies').addEventListener('click', function() {
        navigator.clipboard.writeText(primeVideoCookies); // Copy Prime Video cookies to clipboard
        alert('Prime Video cookies copied to clipboard!');
        selectedWebsite = 'PrimeVideo'; // Set selected website to Prime Video
        document.body.removeChild(popupContainer);
        document.getElementById('addExtension').style.display = 'inline-block';
    });

    document.getElementById('closePopup').addEventListener('click', function() {
        document.body.removeChild(popupContainer);
    });
}

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
    const title = document.querySelector('h1'); // Get the title element

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
        document.querySelector('.container').classList.add('expanded'); // Expand the container
        
        // Add margin-top to the title after video is loaded
        if (title) {
            title.style.marginBottom = '20px'; // Adjust the margin value as needed
        }
    });

    const buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.bottom = '10px';
}

