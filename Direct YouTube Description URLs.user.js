// ==UserScript==
// @name         Direct YouTube Description URLs
// @namespace    https://www.jabedmiah.com
// @version      3.3
// @description  Changes the masked urls in youtube descriptions to their direct versions.
// @author       Jabed Miah
// @match        https://www.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @supportURL   https://github.com/miahj1/direct-youtube-description-urls/issues
// @license      MIT
// ==/UserScript==

(new MutationObserver(elementCheck)).observe(document, {childList: true, subtree: true});

function descEventHandler() {
    const descExpanded = document.getElementsByClassName("style-scope ytd-text-inline-expander")[0];
    const allDescUrls = descExpanded.getElementsByTagName("a");

    for (let i = 0; i < allDescUrls.length; i++) {
        if (allDescUrls[i].href.startsWith("https://www.youtube.com/redirect?event=video_description")){
            if (allDescUrls[i].text.startsWith("https://")) {
                allDescUrls[i].href = allDescUrls[i].text;
            } else if (allDescUrls[i].text.startsWith("http://")) {
                let httpToHttps = allDescUrls[i].text.replace('http', 'https');
                allDescUrls[i].href = httpToHttps;
                allDescUrls[i].text = httpToHttps;
            }
        }
    }
}

function elementCheck(changes, observer) {
    const desc = document.getElementsByClassName("item style-scope ytd-watch-metadata")[2];

    if (desc) {
        ["click", "mouseover"].forEach((event) => {
            desc.addEventListener(event, descEventHandler);
        });
        observer.disconnect();
    }
}
