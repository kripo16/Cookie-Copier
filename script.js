// Define the cookies for Prime Video and Netflix
const primeVideoCookies = `cookies1`; // Replace with actual Prime Video cookies
const netflixCookies = `
.netflix.com	TRUE	/	TRUE	1693215879	nfvdid	BQFmAAEBEBCIqauCCpHWwD_IgD1m7WNgcE121VnglfZNz3cbMlHQiSwWb9rrGzF8BTGieRBO2GVkR1YQfXMHFiKUzK-F0G9mvUaO-Rn5qEPlhvZ6ZgpEkltp4iVR7DkjpOcthrAUJzYV2OdStKeCNEEFNKOmLdyJ
.netflix.com	TRUE	/	TRUE	1693922104	memclid	286f629e-34bc-4237-b08e-861d951eb161
.netflix.com	FALSE	/	FALSE	1707342942	NetflixId	ct%3DBQAOAAEBEOYKWMelUYi7amgRHkIOtZyCYFonqnDfrE4GkG8YGqycAqD-0kz2CgGE-F4V_GseIqzuCbJCzbfNFhiCz2WUTzoh59F7jramAiuBvbgc11ZmERRpOdLxZAc5n6kiJn-1StbzO1zHas-xxrNvITwmQK5JrMuNcGCC7gd_xtOncGQ1e8ts6C4miWEbsFvqwFN-b3SMyOsdo4kwMa99uWk-h3KYSp4eoN8Tk94ACy6DD-xHV9mn5WyGii8QRvX1VbS6io7esdHyEZZmn9ZJKT373MEIoHVLmNW4d0_eLLKYlt1NFBwDgxsSVKde-zAAPA97thRU_9VFk1wC8eMmBzNM_jVWigyvaVbiLA7KtSOh8Tp7r8Z2NWza1pnhtqi0WLqC3yoL1SF7GseTt0vqUmSidc7Io6whbpRGLCdtVRr1fL2IT2cl5IpoW-v2VWV2LVTOxfhczDQzf2RNnpQApZIjdZBNSkG2zxfUpL_cWd3yjBVplL3Yx62F9aFsmy9f7cm875MxT2Z1ic4k9qyB4NnCV5aE3sXkp6WsjM3xm2gF6P5k_haPdfM45ScT9tyEAvtGTKB_nlRuLPOqoi3Wp_DVkP-JGRf2mow-S5RnNNnifYu6w7fSIqK-kRlHbI64pjmePj3xzfIGMDMCxOA0q4FR2_Wap1ADBAANQXz6mM5SBc-T-FsUZ3UC4vVJ00qlcLHfE1HTXI9-Yj1WRm8KkVbD07_kj5oxgN66HUx59SwdgnUIXH_hq8iovjAHp9Fhye_-J9WiB97Y_AtoIY7AF8gMaswPmgxyu2ZD0RlXTi902JGgTdWO0MhmMEHEehoiwTnIUtDO%26bt%3Ddbl%26ch%3DAQEAEAABABRKnQv5y6LKEL1TtjUyRKSToKTntJ3lwfE.%26v%3D2%26mac%3DAQEAEAABABT_6RVU2YuascFh1xxvhq5EDJpQXWRg3V8.
.netflix.com	FALSE	/	FALSE	1707342942	SecureNetflixId	v%3D2%26mac%3DAQEAEQABABRzKQJ2Wt_orpmT6rsiV2fYkj6BrOx1wns.%26dt%3D1691798140776
.netflix.com	TRUE	/	TRUE	1699566944	pas	%7B%22supplementals%22%3A%7B%22muted%22%3Afalse%7D%7D
`; // Replace with actual Netflix cookies

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

