// ==UserScript==
// @name         Direct YouTube Description URLs
// @namespace    https://www.jabedmiah.com
// @version      3.4
// @description  Changes the masked urls in youtube descriptions to their direct versions.
// @author       Jabed Miah
// @match        *.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @supportURL   https://github.com/miahj1/direct-youtube-description-urls/issues
// @license      MIT
// ==/UserScript==

(new MutationObserver(elementCheck)).observe(document, {childList: true, subtree: true});

function descEventHandler() {
    const descExpanded = document.getElementsByClassName("style-scope ytd-text-inline-expander")[0];
    const allDescUrls = descExpanded.querySelectorAll("a[target='_blank']");

    for (let i = 0; i < allDescUrls.length; i++) {
        if (allDescUrls[i].href === allDescUrls[i].text) { break; }

        if (isHttps(allDescUrls[i])) {
            if (isTruncated(allDescUrls[i])) {
                allDescUrls[i].href = allDescUrls[i].text = ytUriDecoder(allDescUrls[i].href);
            } else {
                allDescUrls[i].href = allDescUrls[i].text;
            }
        } else if (isHttp(allDescUrls[i])) {
            if (isTruncated(allDescUrls[i])) {
                allDescUrls[i].href = allDescUrls[i].text = ytUriDecoder(allDescUrls[i].href).replace('http', 'https');
            } else {
                allDescUrls[i].href = allDescUrls[i].text = allDescUrls[i].text.replace('http', 'https');
            }
        }
    }
}

function ytUriDecoder(uglyUrl) {
    let directUrl = uglyUrl.split("q=")[1].split("&v")[0];
    return directUrl.replaceAll('%3A', ':').replaceAll('%2F', '/');
}

function isHttp(uglyUrl) {
    return uglyUrl.text.startsWith("http://");
}

function isHttps(uglyUrl) {
    return uglyUrl.text.startsWith("https://");
}

function isTruncated(uglyUrl) {
    return uglyUrl.text.endsWith("...");
}

function elementCheck(changes, observer) {
    const desc = document.getElementsByClassName("item style-scope ytd-watch-metadata")[2];

    if (desc) {
        ["click", "mouseenter"].forEach((event) => {
            desc.addEventListener(event, descEventHandler);
        });

        observer.disconnect();
    }
}
