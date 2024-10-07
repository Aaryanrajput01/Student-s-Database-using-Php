document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        const username = form.querySelector('input[type="text"]').value;
        const password = form.querySelector('input[type="password"]').value;

        // Check if the entered username and password are correct
        if (username === 'Admin' && password === 'Admin@1234') {
            // Redirect to the next page
            window.location.href = 'students-data.html';
        } else {
            // Show an alert if the credentials are incorrect
            alert('Wrong Credentials');
        }
    });
});
