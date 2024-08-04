const cookies = `.netflix.com	TRUE	/	FALSE	1751725862	OptanonAlertBoxClosed	2024-07-05T14:31:02.831Z
.netflix.com	TRUE	/	FALSE	1751726628	nfvdid	BQFmAAEBEND3j1pTjsJ9f0LxOkSG1mVgaJMsWwiLNAmtMhNM4KhLH50tI-9hhAaxBY3ZUh8rMpsfbLeEoDKdydPoO0SBaLj6vPdYUwScFibqTmcafcdcd3uumEw0voxhqobLCKtgTgB9MWz4pOYHlxRkHLTcit7d
.netflix.com	TRUE	/	FALSE	1752242654	OptanonConsent	isGpcEnabled=0&datestamp=Thu+Jul+11+2024+11%3A04%3A14+GMT-0300+(Hor%C3%A1rio+Padr%C3%A3o+de+Bras%C3%ADlia)&version=202406.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=20aadaed-a50f-47fd-a85d-8cd64cc44c23&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&intType=3&geolocation=BR%3BSP&AwaitingReconsent=false
.netflix.com	TRUE	/	FALSE	1728482654	netflix-sans-bold-3-loaded	true
.netflix.com	TRUE	/	FALSE	1728482654	netflix-sans-normal-3-loaded	true
.netflix.com	TRUE	/	TRUE	1752335322	NetflixId	ct%3DBgjHlOvcAxL5Aun_XCnRb1qA5gDLXKrSZ2Eb6FqeG8UIRAnkDV08GxvzdffREB-9UoQpdSjqp2WifQOfxKnn4IiNRxT7_ITPWYBDtJVbz2CtcgkpE7qsSd-0e4nVjr8sSvvf4Ni5OqMzSLRXaGfiIfUvgvPxgEGuEwuSbEi1drSHt4y75ZchEQUI4I0x1QqM0OCurX3ZzlKGFUXlkFns5zy8LUYW4sNFtwKdym5Ak4mYzKsnWwb_euor89Q7ksA3yWZbs__NVkCYDo-wD6QZt0fiQLh6w1ZVvJlU1T_U86iqkk6rvBMl2gz4afa9PPPqVr13Mrx-TxgW9ec37o7ythL3b4rfnKK9U-X3vFTfDUjYcJNtO_3jJZMMssyG5-V31MZ2fgaz70dsE3ruJMvFpRi2jtR8izDtzjMe6J4EMHPjUDL3_xyA3oK4u4getu9CfsK6Ry2R96C201sXCwyloPyEOh83EHkwSKsLVgg_q5bR97ndGD0QTK8plY9q80Ax8g9YGAYiDgoMGbbZtEm6De72cPQ2%26ch%3DAQEAEAABABTAGpIR_289VSR_lX6tVvYWUpsvj9040lY.%26v%3D3
.netflix.com	TRUE	/	TRUE	1752335322	SecureNetflixId	v%3D3%26mac%3DAQEAEQABABSZROm5gdmkR-dc6lJqUM9eo-3Oz2FDqq0.%26dt%3D1720799322905
`;

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
