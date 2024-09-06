import {createSectionOnTheSameLavel} from './sections_create.js'
import {createSubsection} from './subsections_create.js';
import {openEditModal} from './sections_update.js';
import {deleteSection} from './sections_delete.js';

const sectionsList = document.getElementById('sections');

export function loadSections() {
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

export function checkSections() {
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

function createListItem(section) {
    const li = document.createElement('li');
    li.classList.add('section-item');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const createSameLevelButton = document.createElement('button');
    createSameLevelButton.textContent = 'Create a section at this level';
    createSameLevelButton.classList.add('create-same-level');
    createSameLevelButton.addEventListener('click', function() {
        createSectionOnTheSameLavel(section.parentId);
    });

    const createSubLevelButton = document.createElement('button');
    createSubLevelButton.textContent = 'Create a subsection';
    createSubLevelButton.classList.add('create-sub-level');
    createSubLevelButton.addEventListener('click', function() {
        createSubsection(section.id);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit section';
    editButton.classList.add('edit-section');
    editButton.addEventListener('click', function() {
        openEditModal(section.id, section.title, section.description);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete this section';
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