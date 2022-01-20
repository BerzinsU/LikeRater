const viewCountSelector = '.ytd-video-primary-info-renderer .view-count'
const likeCountSelector = 'div#top-level-buttons-computed ytd-toggle-button-renderer:first-child #text'
const percentageParentSelector = 'div#top-level-buttons-computed .ytd-menu-renderer:first-child .ytd-toggle-button-renderer'
const percentageElementClass = "ytRater"

function getViewCount(){
    const countString = document.querySelector(viewCountSelector).innerText
    return parseInt(countString.replace(/\D/g,''))
}

function getLikesCount(){
    const likesString = document.querySelector(likeCountSelector).ariaLabel
    let number = parseInt(likesString.replace(/\D/g,''))
    return number
}

function getLikesPercentage(){
    const views = getViewCount();
    const likes = getLikesCount();
    const percentageRaw = likes/views*100

    return percentageRaw.toPrecision(2)+ "%"
}

function injectPercentage(){
    const likesPercent = getLikesPercentage()
    var node = document.createElement("span");
    node.className = percentageElementClass;
    var textnode = document.createTextNode(likesPercent);
    node.appendChild(textnode);

    const likeButton = document.querySelector(percentageParentSelector)
    likeButton.appendChild(node)
}

function inject() {
    if (!document.querySelector(viewCountSelector)) {
        window.requestAnimationFrame(inject);
    }else {
        injectPercentage()
    }
};

function update(){
    const likesPercent = getLikesPercentage()
    const element = document.querySelector("."+percentageElementClass)
    if(element) {
        element.innerText = likesPercent
    } else{
        inject()
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Roger Roger")
        // listen for messages sent from background.js
        if (request.message === 'Hello There!') {
            update()
        }
    });

inject()

