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

    function createSection(parentId, title='New title', description='New description') {
        console.log(JSON.stringify({ parentId, title, description }));
        fetch('/Site_with_tree_of_sections/includes/sections/create_a_section_at_the_same_level.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ parentId, title, description })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadSections();
            } else {
                console.error('Ошибка при создании раздела:', data.error);
            }
        })
        .catch(error => console.error('Ошибка:', error));
    }

    function deleteSection(sectionId) {
        fetch('/Site_with_tree_of_sections/includes/sections/delete_section.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sectionId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadSections();
            } else {
                console.error('Ошибка при удалении раздела:', data.error);
            }
        })
        .catch(error => console.error('Ошибка:', error));
    }

    loadSections();
})