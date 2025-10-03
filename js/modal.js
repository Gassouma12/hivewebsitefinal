document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('info-modal');
    if (!modal) return; // Don't run if modal isn't on the page

    const modalBody = modal.querySelector('.modal-body');
    const closeModalBtn = modal.querySelector('.modal-close-btn');

    // Function to open the modal and populate it with content
    function openModal(content) {
        modalBody.innerHTML = content;
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('visible'), 10); // Delay for transition
    }

    // Function to close the modal
    function closeModal() {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.style.display = 'none';
            modalBody.innerHTML = ''; // Clear content
        }, 300); // Wait for transition to finish
    }

    // Add click listeners to all cards
    const cards = document.querySelectorAll('.team-card, .service-card, .expert-card, .startup-tile, .founder-card');
    cards.forEach(card => {
        card.style.cursor = 'pointer'; // Add pointer cursor to indicate clickability
        card.addEventListener('click', () => {
            const details = card.querySelector('.modal-details');
            const imageContainer = card.querySelector('.portrait-badge') || card.querySelector('img');
            
            let content = '';

            if (imageContainer) {
                // Clone the image or its container to avoid moving it from the card
                const imageClone = imageContainer.cloneNode(true);
                // Add a class for styling within the modal
                imageClone.classList.add('modal-image');
                content += imageClone.outerHTML;
            }

            if (details) {
                content += details.innerHTML;
            }

            if (content) {
                openModal(content);
            }
        });
    });

    // Close modal when the close button is clicked
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking on the overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with the Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('visible')) {
            closeModal();
        }
    });
});
