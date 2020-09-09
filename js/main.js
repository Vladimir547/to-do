const addTodo = [...document.querySelectorAll('.todo__add')];
const todoForm = [...document.querySelectorAll('.todo__form')];
const closeForm = [...document.querySelectorAll('.form__close')];
const titleForm = document.querySelectorAll('.form__title');
const todos = [...document.querySelectorAll('.todo')];
const descriptionForm = document.querySelectorAll('.form__description');
const tasks = document.querySelector('.tasks');
const doing = document.querySelector('.doing');
const done = document.querySelector('.done');
const deleted = document.querySelector('.deleted');
const modalWrapper = document.querySelector('.modal-wrapper');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const closeModal = document.querySelector('.modal-close');
const modaldescription = document.querySelector('#modal-description');
const modalTitle = document.querySelector('#modal-title');
const editForm = document.querySelector('.edit-form');
const editTitle = document.querySelector('#edit-form__title');
const editDescription = document.querySelector('#edit-form__description');
const arrIcons = ['icon-view-show', 'icon-point-right', 'icon-pencil', 'icon-close'];
const arr = [];
let isShow = false;
function addCard(title, description) {
    const createNewCard = document.createElement('div');
    const cardTitle = document.createElement('p');
    const cardDescription = document.createElement('p');
    const blockForIcons = document.createElement('div');
    cardTitle.classList.add('title-text');
    cardTitle.innerHTML = title;
    cardDescription.innerHTML = description;
    blockForIcons.classList.add('task__icons');
    arrIcons.forEach((item) => {
        const createIcon = document.createElement('i');
        createIcon.classList.add(item);
        blockForIcons.append(createIcon);
    });
    createNewCard.classList.add('task');
    cardDescription.className = 'hide';
    createNewCard.dataset.edit = 'false';
    createNewCard.append(cardTitle);
    createNewCard.append(cardDescription);
    createNewCard.append(blockForIcons);
    return createNewCard;
}
function previewValues (card) {
    const title = card.querySelector('.title-text');
    const description = card.querySelector('.hide');
    modalWrapper.style.display = 'block';
    editForm.style.display = 'none';
    modalContent.style.display = 'block';
    modaldescription.innerHTML = description.innerHTML;
    modalTitle.innerHTML = title.innerHTML;
}
function editValues (cards) {
    cards.forEach(item => {
        if (item.dataset.edit === 'true') {
            const title = item.querySelector('.title-text');
            const description = item.querySelector('.hide');
            description.textContent = editDescription.value;
            title.textContent = editTitle.value;
            item.dataset.edit = 'false';
        }
    });
}
function showModalEdit (card) {
    const title = card.querySelector('.title-text');
    const description = card.querySelector('.hide');
    modalWrapper.style.display = 'block';
    editForm.style.display = 'block';
    modalContent.style.display = 'none';
    editTitle.value = title.innerHTML;
    editDescription.value = description.innerHTML;
    card.dataset.edit = 'true';
}
function moveCard (card) {
    if(card.parentNode.classList.contains('tasks')) {
        doing.append(card);
    } else if (card.parentNode.classList.contains('doing')) {
        done.append(card);
    } else if (card.parentNode.classList.contains('done')){
        tasks.append(card);
    }else {
        const icons = card.querySelector('.task__icons');
        const createNewDeleteBtn = document.createElement('i');
        createNewDeleteBtn.classList.add(arrIcons[3]);
        icons.append(createNewDeleteBtn);
        tasks.append(card);
    }
}
todos.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        const card = e.target.closest('.task');
        const blockIcons = card.querySelector('.task__icons');
        if (e.target.closest('.icon-close')) {
            const icons = blockIcons.querySelectorAll('i');
            console.log(icons);
            for ( let elem of icons) {
                if(elem.classList.contains('icon-close')) {
                    elem.remove();
                }
            }
            deleted.append(card);
        }
        if (e.target.closest('.icon-view-show')) {
            previewValues(card);
        }
        if (e.target.closest('.icon-point-right')) {
            moveCard(card);
        }
        if (e.target.closest('.icon-pencil')) {
            showModalEdit(card);
        }
    });
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const arrTasks = [...document.querySelectorAll('.task')];
    editValues(arrTasks);
    closeModalFunc();
})
function closeModalFunc() {
    modalWrapper.style.display = 'none';
    modaldescription.innerHTML = '';
    modalTitle.innerHTML = '';
}
addTodo.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = item.parentNode;
        parent.previousElementSibling.style.display = 'block';
        item.style.display = 'none';
    });
});
closeForm.forEach((item,index) => {
    item.addEventListener('click', () => {
        titleForm[index].value = '';
        descriptionForm[index].value = '';
        todoForm[index].style.display = 'none';
        addTodo[index].style.display = 'block';
    })
});

todoForm.forEach((item, index) => {
    item.addEventListener('submit', (e) => {
        e.preventDefault();
        const newCard = addCard(titleForm[index].value, descriptionForm[index].value);
        if (item.dataset.status === 'todo') {
            tasks.append(newCard);
        }
        if (item.dataset.status === 'doing') {
            doing.append(newCard);
        }
        if (item.dataset.status === 'done') {
            done.append(newCard);
        }
        titleForm[index].value = '';
        descriptionForm[index].value = '';
        todoForm[index].style.display = 'none';
        addTodo[index].style.display = 'block';
    });
});


closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    closeModalFunc();
});
modalWrapper.addEventListener('click', (e) => {
    if (e.target.closest('.modal') || e.target.closest('.modal-content')) {
        return;
    }
    closeModalFunc();
});
