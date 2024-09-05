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
            createSectionOnTheSameLavel(section.parentId);
        });

        const createSubLevelButton = document.createElement('button');
        createSubLevelButton.textContent = 'Создать подраздел';
        createSubLevelButton.classList.add('create-sub-level');
        createSubLevelButton.addEventListener('click', function() {
            createSubsection(section.id);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать раздел';
        editButton.classList.add('edit-section');
        editButton.addEventListener('click', function() {
            openEditModal(section.id, section.title, section.description);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить этот раздел';
        deleteButton.classList.add('delete-section');
        deleteButton.addEventListener('click', function() {
            deleteSection(section.id);
        });

        buttonContainer.appendChild(createSameLevelButton);
        buttonContainer.appendChild(createSubLevelButton);
        buttonContainer.appendChild(editButton);
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
            .then(response => {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    return response.text().then(text => {
                        throw new Error(`Unexpected response type: ${text}`);
                    });
                }
            })
            .then(data => {
                sectionsList.innerHTML = '';
                data.forEach(section => sectionsList.appendChild(createListItem(section)));
            })
            .catch(error => console.error('Error:', error));
    }

    function checkSections() {
        fetch('/Site_with_tree_of_sections/includes/sections/check_sections.php')
            .then(response => response.json())
            .then(data => {
                if (data.hasSections) {
                    loadSections();
                } else {
                    createSectionOnTheSameLavel(null);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    function openEditModal(sectionId, currentTitle, currentDescription) {
        const title = prompt("Введите новый заголовок:", currentTitle);
    
        if (title === null) return;
    
        const description = prompt("Введите новое описание:", currentDescription);
    
        if (description === null) {
            updateSection(sectionId, title, currentDescription);
        } else {
            updateSection(sectionId, title, description);
        }
    }

    function updateSection(sectionId, title, description) {
        fetch('/Site_with_tree_of_sections/includes/sections/update_section.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sectionId, title, description })
        })
        .then(response => {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text().then(text => {
                    throw new Error(`Unexpected response type: ${text}`);
                });
            }
        })
        .then(data => {
            if (data.success) {
                loadSections();
            } else {
                console.error('Ошибка при обновлении раздела:', data.error);
            }
        })
        .catch(error => console.error('Ошибка:', error));
    }
    

    function createSectionOnTheSameLavel(parentId, title='New title', description='New description') {
        fetch('/Site_with_tree_of_sections/includes/sections/create_a_section_at_the_same_level.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ parentId, title, description })
        })
        .then(response => {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text().then(text => {
                    throw new Error(`Unexpected response type: ${text}`);
                });
            }
        })
        .then(data => {
            if (data.success) {
                loadSections();
            } else {
                console.error('Ошибка при создании раздела:', data.error);
            }
        })
        .catch(error => console.error('Ошибка:', error));
    }
    
    function createSubsection(sectionId, title='New title', description='New description') {
        fetch('/Site_with_tree_of_sections/includes/sections/create_a_subsection.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sectionId, title, description })
        })
        .then(response => {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text().then(text => {
                    throw new Error(`Unexpected response type: ${text}`);
                });
            }
        })
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
        .then(response => {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text().then(text => {
                    throw new Error(`Unexpected response type: ${text}`);
                });
            }
        })
        .then(data => {
            if (data.success) {
                checkSections();
            } else {
                console.error('Ошибка при удалении раздела:', data.error);
            }
        })
        .catch(error => console.error('Ошибка:', error));
    }

    checkSections();
})