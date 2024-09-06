import {loadSections} from './sections_load.js'

export function createSectionOnTheSameLavel(parentId, title='New title', description='New description') {
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
            console.error('Error creating partition:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}