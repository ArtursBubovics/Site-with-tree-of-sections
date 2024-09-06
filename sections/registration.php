<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main page</title>
    <link rel="stylesheet" href="../assets/css/main_settings/min-reset.css">
    <link rel="stylesheet" href="../assets/css/main_settings/main.css">
    <link rel="stylesheet" href="../assets/css/authentication_registration.css">
    <link rel="stylesheet" href="../assets/css/input_fields/input_fields.css">
    <script src="../assets/js/authentication/redirect_to_another_page/registration/registration.js" defer></script>
    <script src="../assets/js/authentication/authorization_forms/registration_form.js" defer></script>
</head>

<body class="authentication-block-registration-container">
    <div class="authentication-block-registration">
        <div class="authentication-block-registration_inner-container">
            <div class="authentication-block-registration_another-page">
                <p class="authentication-block-registration_additional-text">Do you already have an account?</p>
                <button class="authentication-block-registration_additional-text authentication-block-registration_link" id="authentication-to-login-btn">Login</button>
            </div>
            <h3 class="main-header">Registration</h3>
            <form class="authentication-block-registration_form" id="registrationForm" method="post">
                <div class="authentication-block-registration_form-container">
                    <div class="authentication-block-registration_form-inputs_block">
                        <input class="input_field registration_field" type="text" name="username" placeholder="Name" minlength="6" required>
                        <input class="input_field registration_field" type="password" name="password" placeholder="Password" minlength="6" required>
                        <input class="input_field registration_field" type="password" name="confirm_password" placeholder="Confirm Password" minlength="6" required>
                    </div>
                    <div class="authentication-block-registration_form-button-block">
                        <button class="authentication-block-registration_form-button" type="submit">Register</button>
                    </div>
                </div>
            </form>
        </div>

    </div>
</body>

</html>