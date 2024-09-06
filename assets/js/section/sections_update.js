import {loadSections} from './sections_load.js'

export function openEditModal(sectionId, currentTitle, currentDescription) {
    const title = prompt("Enter a new title:", currentTitle);

    if (title === null) return;

    const description = prompt("Enter a new description:", currentDescription);

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
            console.error('Error updating section:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}