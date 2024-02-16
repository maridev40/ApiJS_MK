let pictures = [
    {
        "id": 1,
        "url": "./img/1.webp"
    },
    {
        "id": 2,
        "url": "./img/2.webp"
    },
    {
        "id": 3,
        "url": "./img/3.webp"
    },
    {
        "id": 4,
        "url": "./img/4.webp"
    },
    {
        "id": 5,
        "url": "./img/5.webp"
    },
    {
        "id": 6,
        "url": "./img/6.webp"
    }
];

const imgEl = document.querySelector('.img');
const pointsEl = document.querySelector('.points');
const leftEl = document.querySelector('.button-left');
const rightEl = document.querySelector('.button-right');


window.addEventListener('load', () => {
    pictures.forEach((img, index) => {
        const btnEl = document.createElement("button");
        btnEl.classList.add("point");
        btnEl.dataset.id = index + 1;
        btnEl.innerText = index + 1;

        if (index == 0) {
            imgEl.setAttribute("src", img.url);
            btnEl.classList.add("active");
        }

        pointsEl.insertAdjacentElement("beforeEnd", btnEl);

    });
});

pointsEl.addEventListener('click', ({ target }) => {
    console.log("pointsEl.addEventListener");
    [...document.querySelectorAll('.point')].forEach((point) => {
        point.classList.remove("active");
    });
    target.classList.add("active");
    imgEl.setAttribute("src", pictures[target.dataset.id - 1].url);
});

let clickEvent = new Event('click', { bubbles: true });

rightEl.addEventListener('click', () => {
    const elm = [...document.querySelectorAll('.point')].find((element) => {
        return element.classList.contains('active');
    }); 
    if (elm) {
        if (elm.nextElementSibling == null) {
            pointsEl.firstElementChild.dispatchEvent(clickEvent);
        } else {
            elm.nextElementSibling.dispatchEvent(clickEvent);
        }
    }
});

leftEl.addEventListener('click', () => {
    const elm = [...document.querySelectorAll('.point')].find((element) => {
        return element.classList.contains('active');
    }); 
    if (elm) {
        if (elm.previousElementSibling == null) {
            pointsEl.lastElementChild.dispatchEvent(clickEvent);
        } else {
            elm.previousElementSibling.dispatchEvent(clickEvent);
        }
    }
});


