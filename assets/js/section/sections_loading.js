document.addEventListener('DOMContentLoaded', function() {
    const sectionsList = document.getElementById('sections');

    function createListItem(section) {
        const li = document.createElement('li');
        li.classList.add('section-item');

        const title = document.createElement('div');
        title.classList.add('section-title');
        title.textContent = section.title;

        const description = document.createElement('div');
        description.classList.add('section-description');
        description.textContent = section.description;

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

    loadSections();
})