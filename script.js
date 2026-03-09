document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const nameSelect = document.getElementById('name-select');
    const ideaInput = document.getElementById('idea-input');
    const ideaList = document.getElementById('idea-list');

    // Trigger add function on button click
    addBtn.addEventListener('click', addIdea);

    // Trigger add function when the Enter key is pressed in the text box
    ideaInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addIdea();
        }
    });

    function addIdea() {
        const name = nameSelect.value;
        const ideaText = ideaInput.value.trim();

        // Basic validation so empty ideas aren't added
        if (!name) {
            alert('Please select your name from the dropdown.');
            return;
        }
        if (ideaText === '') {
            alert('Please type an idea before adding.');
            return;
        }

        // Create the new list item element
        const newListItem = document.createElement('li');
        
        // Create the text and formatting nodes
        const ideaNode = document.createTextNode(ideaText + ' ');
        const authorSpan = document.createElement('span');
        authorSpan.className = 'author';
        authorSpan.textContent = `– suggested by ${name}`;

        // Assemble the list item
        newListItem.appendChild(ideaNode);
        newListItem.appendChild(authorSpan);

        // Add the new item to the unordered list
        ideaList.appendChild(newListItem);

        // Clear the input field for the next idea
        ideaInput.value = '';
    }
});