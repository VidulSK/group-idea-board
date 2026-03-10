document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // THEME TOGGLE (Works safely on all pages)
    // ==========================================
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun');
    const moonIcon = document.querySelector('.moon');

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'inline';
            } else {
                sunIcon.style.display = 'inline';
                moonIcon.style.display = 'none';
            }
        });
    }

    // ==========================================
    // IDEA BOARD LOGIC (Only runs on Idea Board)
    // ==========================================
    const addBtn = document.getElementById('add-btn');
    
    // SAFETY CHECK: Only run this code if the Add button exists on the current page
    if (addBtn) {
        let ideas = [];
        const nameSelect = document.getElementById('name-select');
        const ideaInput = document.getElementById('idea-input');
        const ideaList = document.getElementById('idea-list');
        const ideaCountDisplay = document.getElementById('idea-count');
        const clearBtn = document.getElementById('clear-btn');

        function renderIdeas() {
            ideaList.innerHTML = '';
            ideas.forEach((idea, index) => {
                const newListItem = document.createElement('li');
                const ideaTextNode = document.createTextNode(idea.text);
                
                const authorSpan = document.createElement('span');
                authorSpan.className = 'author';
                authorSpan.textContent = `– suggested by ${idea.author}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '&times;';
                deleteBtn.title = 'Remove this idea';
                
                deleteBtn.addEventListener('click', () => {
                    ideas.splice(index, 1); 
                    renderIdeas(); 
                });

                newListItem.appendChild(ideaTextNode);
                newListItem.appendChild(authorSpan);
                newListItem.appendChild(deleteBtn); 
                ideaList.appendChild(newListItem);
            });
            ideaCountDisplay.textContent = `Total Ideas: ${ideas.length}`;
        }

        function addIdea() {
            const name = nameSelect.value;
            const ideaText = ideaInput.value.trim();

            if (!name) { alert('Please select your name from the dropdown.'); return; }
            if (ideaText === '') { alert('Please type an idea before adding.'); return; }

            ideas.push({ text: ideaText, author: name });
            renderIdeas();
            ideaInput.value = '';
        }

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
    }
});