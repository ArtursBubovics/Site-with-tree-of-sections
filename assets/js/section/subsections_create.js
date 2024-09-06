import {loadSections} from './sections_load.js'

export function createSubsection(sectionId, title='New title', description='New description') {
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
            console.error('Error creating partition:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}