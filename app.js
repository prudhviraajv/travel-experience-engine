document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const searchBtn = document.getElementById('searchBtn');
    const destinationInput = document.getElementById('destinationInput');
    const loadingState = document.getElementById('loadingState');
    const resultsSection = document.getElementById('resultsSection');
    const displayLocation = document.getElementById('displayLocation');
    const experienceGrid = document.getElementById('experienceGrid');

    // Theme Toggle Logic
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    });

    // Mock Data Generator
    const generateExperiences = (location) => {
        const categories = ['Culinary', 'Adventure', 'Culture', 'Relaxation'];
        const experiences = [
            { title: 'Hidden Street Food Tour', desc: `Discover the secret culinary gems of ${location} with a local expert.` },
            { title: 'Sunset Hot Air Balloon', desc: `Float above the beautiful landscapes of ${location} as the sun goes down.` },
            { title: 'Ancient Architecture Walk', desc: `Explore the historical significance and breathtaking buildings in ${location}.` },
            { title: 'Bespoke Spa Retreat', desc: `Unwind with traditional relaxation methods native to ${location}.` }
        ];

        return experiences.map((exp, index) => ({
            ...exp,
            category: categories[index],
            price: '$' + (Math.floor(Math.random() * 200) + 50)
        }));
    };

    // Render Cards
    const renderCards = (experiences) => {
        experienceGrid.innerHTML = '';
        experiences.forEach((exp, index) => {
            const delay = index * 100;
            const card = document.createElement('div');
            card.className = 'experience-card';
            card.style.animation = `fadeUp 0.5s ease forwards ${delay}ms`;
            card.style.opacity = '0';
            
            card.innerHTML = `
                <span class="card-tag">${exp.category}</span>
                <h3 class="card-title">${exp.title}</h3>
                <p class="card-desc">${exp.desc}</p>
                <div class="card-footer">
                    <span>${exp.price} / person</span>
                    <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Book</button>
                </div>
            `;
            experienceGrid.appendChild(card);
        });

        // Add keyframes dynamically if not exists
        if (!document.getElementById('dynamic-styles')) {
            const style = document.createElement('style');
            style.id = 'dynamic-styles';
            style.innerHTML = `
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // Search Logic
    searchBtn.addEventListener('click', () => {
        const location = destinationInput.value.trim();
        if (!location) return alert('Please enter a destination.');

        // Hide results, show loading
        resultsSection.classList.add('hidden');
        loadingState.classList.add('active');

        // Simulate API Call / Engine Processing
        setTimeout(() => {
            loadingState.classList.remove('active');
            displayLocation.textContent = location;
            
            const curatedExperiences = generateExperiences(location);
            renderCards(curatedExperiences);
            
            resultsSection.classList.remove('hidden');
            
            // Smooth scroll
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 2000);
    });

    // Allow Enter key to trigger search
    destinationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
});
