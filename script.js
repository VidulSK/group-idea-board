document.addEventListener('DOMContentLoaded', () => {
    let ideas = [];

    const addBtn = document.getElementById('add-btn');
    const nameSelect = document.getElementById('name-select');
    const ideaInput = document.getElementById('idea-input');
    const ideaList = document.getElementById('idea-list');
    
    const ideaCountDisplay = document.getElementById('idea-count');
    const clearBtn = document.getElementById('clear-btn');

    function renderIdeas() {
        ideaList.innerHTML = '';

        // Added 'index' to specifically target which idea to delete
        ideas.forEach((idea, index) => {
            const newListItem = document.createElement('li');
            const ideaTextNode = document.createTextNode(idea.text);
            
            const authorSpan = document.createElement('span');
            authorSpan.className = 'author';
            authorSpan.textContent = `– suggested by ${idea.author}`;

            // Create the new individual delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '&times;'; // This creates a nice 'X' symbol
            deleteBtn.title = 'Remove this idea';
            
            // Add the click event to remove this specific item
            deleteBtn.addEventListener('click', () => {
                ideas.splice(index, 1); // Removes 1 item at the current index
                renderIdeas(); // Refresh the list
            });

            newListItem.appendChild(ideaTextNode);
            newListItem.appendChild(authorSpan);
            newListItem.appendChild(deleteBtn); // Add the button to the list item
            ideaList.appendChild(newListItem);
        });

        // Update the counter text
        ideaCountDisplay.textContent = `Total Ideas: ${ideas.length}`;
    }

    function addIdea() {
        const name = nameSelect.value;
        const ideaText = ideaInput.value.trim();

        if (!name) {
            alert('Please select your name from the dropdown.');
            return;
        }
        if (ideaText === '') {
            alert('Please type an idea before adding.');
            return;
        }

        const newIdea = { text: ideaText, author: name };
        ideas.push(newIdea);
        renderIdeas();
        ideaInput.value = '';
    }

    // Clear all ideas function
    function clearIdeas() {
        if (confirm("Are you sure you want to clear all ideas?")) {
            ideas = [];
            renderIdeas();
        }
    }

    addBtn.addEventListener('click', addIdea);
    ideaInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') { addIdea(); }
    });
    
    clearBtn.addEventListener('click', clearIdeas);

    renderIdeas();
});