document.addEventListener('DOMContentLoaded', function() {
    const sectionsList = document.getElementById('sections');

    function createListItem(section) {
        const li = document.createElement('li');
        li.classList.add('section-item');

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const createSameLevelButton = document.createElement('button');
        createSameLevelButton.textContent = 'Создать на этом уровне раздел';
        createSameLevelButton.classList.add('create-same-level');
        createSameLevelButton.addEventListener('click', function() {
            createSection(section.parentId);
        });

        const createSubLevelButton = document.createElement('button');
        createSubLevelButton.textContent = 'Создать подраздел';
        createSubLevelButton.classList.add('create-sub-level');
        createSubLevelButton.addEventListener('click', function() {
            createSection(section.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить этот раздел';
        deleteButton.classList.add('delete-section');
        deleteButton.addEventListener('click', function() {
            deleteSection(section.id);
        });

        buttonContainer.appendChild(createSameLevelButton);
        buttonContainer.appendChild(createSubLevelButton);
        buttonContainer.appendChild(deleteButton);

        const title = document.createElement('div');
        title.classList.add('section-title');
        title.textContent = section.title;

        const description = document.createElement('div');
        description.classList.add('section-description');
        description.textContent = section.description;

        li.appendChild(buttonContainer);
        li.appendChild(title);
        li.appendChild(description);

        if (section.children && section.children.length > 0) {
            const ul = document.createElement('ul');
            section.children.forEach(child => ul.appendChild(createListItem(child)));
            li.appendChild(ul);
        }

        return li;
    }

    function loadSections() {
        fetch('/Site_with_tree_of_sections/includes/sections/get_sections.php')
            .then(response => response.text())
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    sectionsList.innerHTML = '';
                    data.forEach(section => sectionsList.appendChild(createListItem(section)));
                } catch (error) {
                    console.error('Failed to parse JSON:', error);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    function createSection(parentId) {
        // Логика создания нового раздела
        // Здесь вы можете открыть модальное окно или форму для ввода данных
        // Затем отправить запрос на сервер для создания раздела
        console.log('Создать новый раздел с родительским ID:', parentId);
    }

    function deleteSection(sectionId) {
        // Логика удаления раздела
        // Вы можете отправить запрос на сервер для удаления раздела по его ID
        console.log('Удалить раздел с ID:', sectionId);
    }

    loadSections();
})