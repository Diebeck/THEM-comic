const link = document.createElement("link")
link.rel = "stylesheet"
link.href = "/style.css"
document.head.appendChild(link)

const title = document.createElement("title")
title.innerHTML = "THEM"
document.head.appendChild(title)

const favicon = document.createElement("link")
favicon.rel = "shortcut icon"
favicon.href = "/logo.png"
favicon.type = "image/x-icon"
document.head.appendChild(favicon)

const imgView = document.createElement("div")
imgView.id = "imgView"
imgView.addEventListener("click", () => {
    imgView.style.opacity = 0
    imgView.style.pointerEvents = "none"
})
const bigImg = document.createElement("img")
bigImg.id = "bigImg"
bigImg.className = "noView"
imgView.appendChild(bigImg)

const nav = document.createElement("div")
nav.id = "nav"
const backBtn = document.createElement("a")
backBtn.id = "backBtn"
backBtn.innerHTML = "Back"
backBtn.href = window.location.pathname
nav.appendChild(backBtn)
const nextBtn = document.createElement("a")
nextBtn.id = "nextBtn"
nextBtn.innerHTML = "Next"
nextBtn.href = window.location.pathname
nav.appendChild(nextBtn)

document.addEventListener("DOMContentLoaded", function(event) {
    document.body.appendChild(imgView)
    document.body.appendChild(nav)
    const imgs = document.querySelectorAll("img")
    for (let i=0; i < imgs.length; i++) {
        const img = imgs[i];
        if (img.className != "noView") {
            img.addEventListener("click", () => {
                imgView.style.opacity = 1
                imgView.style.pointerEvents = "all"
                bigImg.src = img.src
                bigImg.title = img.title
                bigImg.style.border = img.style.border
            })
        }
    }
})


async function checkPages() {
    let urlParts = window.location.pathname.split("/")
    urlParts.splice(0, 1)
    urlParts.splice(urlParts.length-1, 1)
    const currentPage = Number(urlParts[urlParts.length-1])
    const nextPage = currentPage + 1
    const previousPage = currentPage - 1

    nextBtn.style.visibility = "hidden"
    backBtn.style.visibility = "hidden"

    let beginUrl = ""
    for (let i=0; i<urlParts.length-1; i++) {
        beginUrl += "/"+ urlParts[i]
    }
    beginUrl += "/"

    let response = await fetch(beginUrl+ nextPage)
    if (response.ok) {
        nextBtn.style.visibility = "visible"
        nextBtn.href = beginUrl+ nextPage
    }
    response = await fetch(beginUrl+ previousPage)
    if (response.ok) {
        backBtn.style.visibility = "visible"
        backBtn.href = beginUrl+ previousPage
    }
}
checkPages()