document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // THEME TOGGLE (Works safely on all pages)
    // ==========================================
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun');
    const moonIcon = document.querySelector('.moon');

    // Restore theme from localStorage on load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'inline';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            // Save theme preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            if (isDark) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'inline';
            } else {
                sunIcon.style.display = 'inline';
                moonIcon.style.display = 'none';
            }
        });
    }

    // ==========================================
    // IDEA BOARD LOGIC
    // ==========================================
    const addBtn = document.getElementById('add-btn');
    
    if (addBtn) {
        const nameSelect = document.getElementById('name-select');
        const ideaInput = document.getElementById('idea-input');
        const ideaList = document.getElementById('idea-list');
        const ideaCountDisplay = document.getElementById('idea-count');
        const clearBtn = document.getElementById('clear-btn');

        // SOLUTION 3: Fetching data from Local Storage
        let ideas = JSON.parse(localStorage.getItem('UCSC_Hub_IdeaBoard_Data')) || [];

        function syncData() {
            // Explicitly saving to localStorage
            localStorage.setItem('UCSC_Hub_IdeaBoard_Data', JSON.stringify(ideas));
            renderIdeas();
        }

        function renderIdeas() {
            if (!ideaList) return;
            ideaList.innerHTML = '';
            
            ideas.forEach((idea, index) => {
                const newListItem = document.createElement('li');
                
                const ideaTextNode = document.createTextNode(idea.text);
                const authorSpan = document.createElement('span');
                authorSpan.className = 'author';
                authorSpan.textContent = ` – suggested by ${idea.author}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '&times;';
                deleteBtn.onclick = () => {
                    ideas.splice(index, 1);
                    syncData();
                };

                newListItem.appendChild(ideaTextNode);
                newListItem.appendChild(authorSpan);
                newListItem.appendChild(deleteBtn);
                ideaList.appendChild(newListItem);
            });

            if (ideaCountDisplay) {
                ideaCountDisplay.textContent = `Total Ideas: ${ideas.length}`;
            }
        }

        function addIdea() {
            const name = nameSelect.value;
            let ideaText = ideaInput.value.trim();

            if (!name) { alert('Please select your name.'); return; }
            if (ideaText === '') { alert('Please type an idea.'); return; }

            // SOLUTION 2: Neglect second part if first two words are identical
            const words = ideaText.split(/\s+/); // Splits by any whitespace
            if (words.length >= 2 && words[0].toLowerCase() === words[1].toLowerCase()) {
                ideaText = words[0];
            }

            // SOLUTION 1: Block same idea from the same person
            const isDuplicate = ideas.some(item => 
                item.text.toLowerCase() === ideaText.toLowerCase() && item.author === name
            );

            if (isDuplicate) {
                alert('Error: You have already submitted this exact idea!');
                return;
            }

            ideas.push({ text: ideaText, author: name });
            syncData();
            ideaInput.value = '';
        }

        addBtn.addEventListener('click', addIdea);
        ideaInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addIdea();
        });
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm("Clear all ideas?")) {
                    ideas = [];
                    syncData();
                }
            });
        }

        // Initial render
        renderIdeas();
    }
});