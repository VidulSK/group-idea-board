document.addEventListener('DOMContentLoaded', () => {
    let ideas = [];

    const addBtn = document.getElementById('add-btn');
    const nameSelect = document.getElementById('name-select');
    const ideaInput = document.getElementById('idea-input');
    const ideaList = document.getElementById('idea-list');
    
    // New variables for Part 6 elements
    const ideaCountDisplay = document.getElementById('idea-count');
    const clearBtn = document.getElementById('clear-btn');

    function renderIdeas() {
        ideaList.innerHTML = '';

        ideas.forEach((idea) => {
            const newListItem = document.createElement('li');
            const ideaTextNode = document.createTextNode(idea.text);
            
            const authorSpan = document.createElement('span');
            authorSpan.className = 'author';
            authorSpan.textContent = `– suggested by ${idea.author}`;

            newListItem.appendChild(ideaTextNode);
            newListItem.appendChild(authorSpan);
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
    
    // Event listener for the new clear button
    clearBtn.addEventListener('click', clearIdeas);

    renderIdeas();
});