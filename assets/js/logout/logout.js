document.getElementById('logoutButton').addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/Site_with_tree_of_sections/includes/auth/logout.php', true);
    
    xhr.onload = function () {
        if (xhr.status === 200) {
            window.location.href = '/Site_with_tree_of_sections/index.php';
        } else {
            console.error('Error:', xhr.statusText);
        }
    };
    
    xhr.send();
});