document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    let password = formData.get('password');
    let confirmPassword = formData.get('confirm_password');


    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/Site_with_tree_of_sections/includes/auth/user_registration.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            if (response.error === 'Username already exists') {
                alert('Username already exists. Please choose a different one.');
            } else if (response.error === 'Incorrect password') {
                alert('Incorrect password. Please try again.');
            } else if (response.success) {
                window.location.href = '/Site_with_tree_of_sections/sections/sections.php';
            } else {
                console.error('Registration error:', response.error);
            }
        } else {
            console.error('Error:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Request failed');
    };

    xhr.send(formData);
});