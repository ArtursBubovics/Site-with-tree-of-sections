import {checkSections} from './sections_load.js'

export function deleteSection(sectionId) {
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
            console.error('Error deleting section:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}