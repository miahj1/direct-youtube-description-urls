// ==UserScript==
// @name         Direct YouTube Description URLs
// @namespace    https://www.jabedmiah.com
// @version      3.1
// @description  Changes the masked urls in youtube descriptions to their direct versions.
// @author       Jabed Miah
// @match        https://www.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @supportURL   https://github.com/miahj1/direct-youtube-description-urls/issues
// @license      MIT
// ==/UserScript==

(new MutationObserver(check)).observe(document, {childList: true, subtree: true});

function urlEventHandler() {
    const description = document.getElementsByClassName("style-scope ytd-text-inline-expander")[0];
    const allDescUrls = description.getElementsByTagName("a");

    for (let i = 0; i < allDescUrls.length; i++) {
        if (allDescUrls[i].text.startsWith("https://")) {
            allDescUrls[i].href = allDescUrls[i].text;
        } else if (allDescUrls[i].text.startsWith("http://")) {
            let httpToHttps = allDescUrls[i].text.replace('http', 'https')
            allDescUrls[i].href = httpToHttps;
            allDescUrls[i].text = httpToHttps;
        }
    }
};

function check(changes, observer) {
    const metaDataCollapsed = document.getElementsByClassName("item style-scope ytd-watch-metadata")[2]
    if (metaDataCollapsed) {
        metaDataCollapsed.addEventListener("click", urlEventHandler)
        observer.disconnect();
    } 
};
