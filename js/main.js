const addTodo = document.querySelectorAll('.todo__add');
const todoForm = document.querySelectorAll('.todo__form');
const closeForm = document.querySelectorAll('.form__close');
const titleForm = document.querySelectorAll('.form__title');
const descriptionForm = document.querySelectorAll('.form__description');
const tasks = document.querySelector('.tasks');
const doing = document.querySelector('.doing');
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
const arrIcons = ['icon-view-show', 'icon-pencil', 'icon-close'];
const arr = [];
let isShow = false;
function addCard(title, description) {
    const createNewCard = document.createElement('div');
    const cardTitle = document.createElement('p');
    const cardDescription = document.createElement('p');
    const blockForIcons = document.createElement('div');
    cardTitle.innerHTML = title;
    cardDescription.innerHTML = description;
    blockForIcons.classList.add('task__icons');
    arrIcons.forEach((item) => {
        const createIcon = document.createElement('i');
        createIcon.classList.add(item);
        blockForIcons.append(createIcon);
    });
    createNewCard.classList.add('task');
    cardDescription.id = 'hide';
    createNewCard.append(cardTitle);
    createNewCard.append(cardDescription);
    createNewCard.append(blockForIcons);
    createNewCard.addEventListener('click', (e) => {
        if (e.target.closest('.icon-close')) {
            deleted.append(createNewCard);
            blockForIcons.remove();
        }
        if (e.target.closest('.icon-view-show')) {
            modalWrapper.style.display = 'block';
            editForm.style.display = 'none';
            modalContent.style.display = 'block';
            modaldescription.innerHTML = cardDescription.innerHTML;
            modalTitle.innerHTML = cardTitle.innerHTML;
        }
        if (e.target.closest('.icon-pencil')) {
            modalWrapper.style.display = 'block';
            editForm.style.display = 'block';
            modalContent.style.display = 'none';
            editTitle.value = cardTitle.innerHTML;
            editDescription.value = cardDescription.innerHTML;
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                cardDescription.innerHTML = editDescription.value;
                cardTitle.innerHTML = editTitle.value;
                closeModalFunc();
            });
        }
    });
    return createNewCard;
}
function closeModalFunc() {
    modalWrapper.style.display = 'none';
    modaldescription.innerHTML = '';
    modalTitle.innerHTML = '';
}
console.log(addTodo);
for ( let i = 0; i < addTodo.length; i++) {
    addTodo[i].addEventListener('click', (e) => {
        e.preventDefault();
        todoForm[i].style.display = 'block';
        addTodo[i].style.display = 'none';
    });
}
for (let i = 0; i < closeForm.length; i++ ) {
    closeForm[i].addEventListener('click', () => {
        titleForm[i].value = '';
        descriptionForm[i].value = '';
        todoForm[i].style.display = 'none';
        addTodo[i].style.display = 'block';
    });
}

for ( let i = 0; i < todoForm.length; i++) {
    todoForm[i].addEventListener('submit', (e) => {
        e.preventDefault();
        const newCard = addCard(titleForm[i].value, descriptionForm[i].value);
        if(todoForm[i].dataset.status === 'todo') {
            tasks.append(newCard);
        }
        if(todoForm[i].dataset.status === 'doing') {
            doing.append(newCard);
        }
        titleForm[i].value = '';
        descriptionForm[i].value = '';
        todoForm[i].style.display = 'none';
        addTodo[i].style.display = 'block';
    });
}

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
