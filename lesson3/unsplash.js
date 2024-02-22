const clientId = "go5EvJkErZYJIh03AyV-i_N2ciOBQqheiT628u9rL70";
const imgEl = document.querySelector("#img");
const photografEl = document.querySelector(".photograf_name");
const descriptionEl = document.querySelector(".description_text");
const likesCountEl = document.querySelector(".likes_count");
const dislikesCountEl = document.querySelector(".dislikes_count");
const likesButtonEl = document.querySelector(".likes_button");
const dislikesButtonEl = document.querySelector(".dislikes_button");
const prevButtonEl = document.querySelector(".prev_button");
const nextButtonEl = document.querySelector(".next_button");

let numPage = localStorage.getItem("numPage") ? localStorage.getItem("numPage") : 1;
const url = `https://api.unsplash.com/photos/?client_id=${clientId}&page=${numPage}`;
let likeNum = "";
let likeClick = false;

const render = async function () {
    if (likeClick) {
        likeClick = false;
        const obj = JSON.parse(localStorage.getItem(likeNum));
        if (obj) {
            imgEl.setAttribute("src", obj.url);
            photografEl.innerText = obj.author;
            descriptionEl.innerText = obj.description;
            likesCountEl.innerText = obj.likes;
            dislikesCountEl.innerText = obj.dislikes;
        }
    } else {
        const photo = await getImageFetch();
        const pjson = await photo.json();
        let index = 0;
        let next = true;
        while (index < pjson.length && next) {
            const obj = JSON.parse(localStorage.getItem(pjson[index].id));
            if (!obj) {
                next = false;
                const imgUrl = pjson[index].urls.small;
                localStorage.setItem(pjson[index].id, JSON.stringify({ likes: 0, dislikes: 0, url: imgUrl, author: pjson[index].user.name, description: pjson[index].description }));
                imgEl.setAttribute("src", imgUrl);
                likeNum = pjson[index].id;
                photografEl.innerText = pjson[index].user.name;
                descriptionEl.innerText = pjson[index].description;
            }
            index++;
        }
        if (next) {
            numPage++;
            localStorage.setItem("numPage", numPage);
        }
    }
}

function getImageFetch() {
    return fetch(url);
}

window.addEventListener("load", () => {
    render();
})

likesButtonEl.addEventListener('click', () => {
    localStorage.setItem(likeNum, JSON.stringify({ ...JSON.parse(localStorage.getItem(likeNum)), likes: 1, dislikes: 0 }));
    likesButtonEl.disabled = true;
    dislikesButtonEl.disabled = false;
    likeClick = true;
    render();
})

dislikesButtonEl.addEventListener('click', () => {
    localStorage.setItem(likeNum, JSON.stringify({ ...JSON.parse(localStorage.getItem(likeNum)), likes: 0, dislikes: 1 }));
    likesButtonEl.disabled = false;
    dislikesButtonEl.disabled = true;
    likeClick = true;
    render();
})

function findPrevHistory(num) {
    for (let i = 0; i < localStorage.length; i++) {
        if (num === localStorage.key(i)) {
            if (i > 0) {
                return localStorage.key(i - 1);
            } else {
                return localStorage.key(localStorage.length - 1);
            }
        }
    }
}

function findNextHistory(num) {
    for (let i = 0; i < localStorage.length; i++) {
        if (num === localStorage.key(i)) {
            if (i < localStorage.length - 1) {
                return localStorage.key(i + 1);
            } else {
                return localStorage.key(0);
            }
        }
    }
}

prevButtonEl.addEventListener('click', () => {
    likeNum = findPrevHistory(likeNum);
    likeClick = true;
    render();
})

nextButtonEl.addEventListener('click', () => {
    likeNum = findNextHistory(likeNum);
    likeClick = true;
    render();
})