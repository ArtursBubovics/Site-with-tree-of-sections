document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/Site_with_tree_of_sections/includes/auth/user_login.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            if (response.error === 'User not found') {
                alert('User not found. Please register');
            } else if (response.success) {
                window.location.href = '/Site_with_tree_of_sections/sections/sections.php';
            } else {
                console.error('Login error:', response.error);
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