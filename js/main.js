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
const data = {tasks: [], doing: [], done: [], deleted: []};
let isShow = false;
function addCard(obj, wrap) {
    const createNewCard = document.createElement('div');
    const cardTitle = document.createElement('p');
    const cardDescription = document.createElement('p');
    const blockForIcons = document.createElement('div');
    cardTitle.classList.add('title-text');
    cardTitle.innerHTML = obj.title;
    cardDescription.innerHTML = obj.description;
    blockForIcons.classList.add('task__icons');
    arrIcons.forEach((item) => {
        const createIcon = document.createElement('i');
        if (wrap === 'deleted' && item === 'icon-close') {
            return false;
        } else {
            createIcon.classList.add(item);
            blockForIcons.append(createIcon);
        }
    });
    createNewCard.classList.add('task');
    cardDescription.className = 'hide';
    createNewCard.dataset.edit = 'false';
    createNewCard.dataset.delete = 'false';
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
    const cards = card.parentNode.querySelectorAll('.task');
    cards.forEach((item, index) => {
        if ( item === card) {
            if(card.parentNode.classList.contains('tasks')) {
                data.doing.push(...data.tasks.splice(index, 1));
                newBoard(card.parentNode, data.tasks, 'todo');
                newBoard(doing, data.doing, 'doing');
            } else if (card.parentNode.classList.contains('doing')) {
                data.done.push(...data.doing.splice(index, 1));
                newBoard(card.parentNode, data.doing, 'doing');
                newBoard(done, data.done, 'done');
            } else if (card.parentNode.classList.contains('done')){
                data.tasks.push(...data.done.splice(index, 1));
                newBoard(card.parentNode, data.done, 'done');
                newBoard(tasks, data.tasks, 'todo');
            }else {
                data.tasks.push(...data.deleted.splice(index, 1));
                newBoard(card.parentNode, data.deleted, 'deleted');
                newBoard(tasks, data.tasks, 'todo');
            }
        }
    });
    console.log(data);
}

function newBoard (currentWrap, currentArr, status) {
    currentWrap.innerHTML = '';
    currentArr.forEach(item => {
        const newCard = addCard(item, status);
        currentWrap.append(newCard);
    });
}
function removeCard (currentWrap, card, cards) {
    let currentArr = null;
    let wrap = null;
    if( currentWrap.classList.contains('tasks')) {
        currentArr = data.tasks;
        wrap = 'todo';
    } else if (currentWrap.classList.contains('done')) {
        wrap = 'done';
        currentArr = data.done;
    } else {
        wrap = 'doing';
        currentArr = data.doing;
    }
    cards.forEach((item, index) => {
        if(item.dataset.delete === 'true') {
            data.deleted.push(...currentArr.splice(index, 1));
        }
    });
    deleted.innerHTML = '';
    newBoard(currentWrap, currentArr, wrap);
    newBoard(deleted, data.deleted, 'deleted');
    /*currentWrap.innerHTML = '';*/
}
function editValues (cards, curent, wrap) {
    cards.forEach((item, index) => {
        if(item.dataset.edit === 'true') {
            const title = item.querySelector('.title-text');
            const description = item.querySelector('.hide');
            curent.splice(index, 1, {'title': editTitle.value, 'description': editDescription.value});
            newBoard(wrap, curent);
        }
    });
}
todos.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        const card = e.target.closest('.task');
        if (e.target.closest('.icon-close')) {
            const currentWrap = e.target.closest('.todo');
            const cards = currentWrap.querySelectorAll('.task');

            card.dataset.delete = 'true'
            removeCard(currentWrap, card, cards);
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
    let arrTasks = [...document.querySelectorAll('.task')];
    let currentArr = null;
    let cards = null;
    let wrapper = null;
    arrTasks.forEach((item )=> {
        if (item.dataset.edit === 'true') {
            if(item.parentNode.closest('.deleted')) {
                currentArr = data.deleted;
            }
            if(item.parentNode.closest('.doing')) {
                currentArr = data.doing;
            }
            if(item.parentNode.closest('.done')) {
                currentArr = data.done;
            } 
            if (item.parentNode.closest('.tasks')){
                currentArr = data.tasks;
            }
            wrapper = item.parentNode;
            cards = [...wrapper.querySelectorAll('.task')];
        }
    });
    editValues(cards, currentArr, wrapper);
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
        let wrapper = null;
        if (item.dataset.status === 'todo') {
            wrapper = 'todo';
            data.tasks.push({'title': titleForm[index].value, 'description': descriptionForm[index].value});
            tasks.append(addCard({'title': titleForm[index].value, 'description': descriptionForm[index].value}, wrapper));
        }
        if (item.dataset.status === 'doing') {
            wrapper = 'doing';
            data.doing.push({'title': titleForm[index].value, 'description': descriptionForm[index].value});
            doing.append(addCard({'title': titleForm[index].value, 'description': descriptionForm[index].value}, wrapper));
        }
        if (item.dataset.status === 'done') {
            wrapper = 'done';
            data.done.push({'title': titleForm[index].value, 'description': descriptionForm[index].value});
            done.append(addCard({'title': titleForm[index].value, 'description': descriptionForm[index].value}, wrapper));
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
