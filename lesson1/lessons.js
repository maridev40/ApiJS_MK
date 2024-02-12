let jsonLessons = `[
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
]`;

const lessonsList = document.querySelector('.lessonsList');
console.log(lessonsList);

const writeLessons = (nodes) => {
    const array = JSON.parse(jsonLessons);
    for (let i = 0; i < nodes.childNodes.length; ++i) {
        if (nodes.childNodes[i].nodeType == 1) {
            for (j = 0; j < array.length; j++) {
                if (array[j].id === Number(nodes.childNodes[i].getAttribute("id"))) {
                    const childs = nodes.childNodes[i].childNodes;
                    for (let k = 0; k < childs.length; ++k) {
                        if (childs[k].nodeType == 1) {
                            if (childs[k].classList.contains('currentParticipants')) {
                                array[j].currentParticipants = childs[k].innerText;
                            }
                        }
                    }
                }
            }
        }

    }

    localStorage.setItem('lessons', JSON.stringify(array));
};

const renderLessons = (lessonsString) => {
    const array = JSON.parse(lessonsString);
    let less = array.map((el) => (
        `<div class="lesson" id="${el.id}">
            <div class="name">название занятия: ${el.name}</div>
            <div class="time"> время проведения занятия: ${el.time}</div>
            <span>максимальное количество участников:</span><div class="maxParticipants">${el.maxParticipants}</div>
            <span>текущее количество участников:</span><div class="currentParticipants">${el.currentParticipants}</div>
            <button class="btn_save button">Записаться</button>
            <button class="btn_remove button" disabled>Отменить запись</button>
            <br>
            <br>
        </div>
        `
    )).join("");
    return less;
};

window.addEventListener('load', () => {
    const lessonLocal = localStorage.getItem('lessons');
    if(lessonLocal) {
        lessonsList.innerHTML = renderLessons(lessonLocal);
    } else {
        lessonsList.innerHTML = renderLessons(jsonLessons);
    }
});

window.addEventListener('click', ({ target }) => {
    if (target.classList.contains('button')) {
        const lessonEl = target.closest('.lesson');
        const curPartEl = lessonEl.querySelector('.currentParticipants');
        const maxPartEl = lessonEl.querySelector('.maxParticipants');
        const btnSave = lessonEl.querySelector('.btn_save');
        const btnRemove = lessonEl.querySelector('.btn_remove');
        if (target.classList.contains('btn_save')) {
            if (Number(curPartEl.innerText) + 1 <= Number(maxPartEl.innerText)) {
                btnSave.disabled = true;
                btnRemove.disabled = false;
                curPartEl.innerHTML = Number(curPartEl.innerText) + 1;
            } else {
                btnSave.disabled = false;
            }
        } else if (target.classList.contains('btn_remove')) {
            if (Number(curPartEl.innerText) - 1 >= 0) {
                btnSave.disabled = false;
                btnRemove.disabled = true;
                curPartEl.innerHTML = Number(curPartEl.innerText) - 1;
            } else {
                btnRemove.disabled = false;
            }
        }
    }

    writeLessons(lessonsList);

})
