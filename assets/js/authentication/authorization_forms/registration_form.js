document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/Site_with_tree_of_sections/includes/auth/user_registration.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
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