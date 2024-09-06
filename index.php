<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main page</title>
    <link rel="stylesheet" href="./assets/css/main_settings/min-reset.css">
    <link rel="stylesheet" href="./assets/css/main_settings/main.css">
    <link rel="stylesheet" href="./assets/css/authentication_login.css">
    <link rel="stylesheet" href="./assets/css/input_fields/input_fields.css">
    <script src="assets/js/authentication/redirect_to_another_page/login/login.js" defer></script>
    <script src="./assets/js/authentication/authorization_forms/login_form.js" defer></script>
</head>

<body class="authentication-block-login-container">
    <div class="authentication-block-login">
        <div class="authentication-block-login_inner-container">
            <div class="authentication-block-login_another-page">
                <p class="authentication-block-login_additional-text">Haven't registered yet?</p>
                <button class="authentication-block-login_additional-text authentication-block-login_link" id="authentication-to-registration-btn">Registration</button>
            </div>
            <h3 class="main-header">Login</h3>
            <form class="authentication-block-login_form" id="loginForm" method="post">
                <div class="authentication-block-login_form-container">
                    <div class="authentication-block-login_form-inputs_block">
                        <input class="input_field login_field" type="text" name="username" placeholder="Name" minlength="6" required>
                        <input class="input_field login_field" type="password" name="password" placeholder="Password" minlength="6" required>
                    </div>
                    <div class="authentication-block-login_form-button-block">
                        <button class="authentication-block-login_form-button" type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>

    </div>
</body>

</html>