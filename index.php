<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main page</title>
    <link rel="stylesheet" href="./assets/css/main_settings/min-reset.css">
    <link rel="stylesheet" href="./assets/css/main_settings/main.css">
    <link rel="stylesheet" href="./assets/css/authentication.css">
    <link rel="stylesheet" href="./assets/css/input_fields/input_fields.css">

</head>

<body class="authentication-block-container">
    <div class="authentication-block">
        <div class="authentication-block_inner-container">
            <div class="authentication-block_another-page">
                <p class="authentication-block_additional-text">Haven't registered yet?</p>
                <button class="authentication-block_additional-text authentication-block_link">Registration</button>
            </div>
            <h3 class="main-header">Login</h3>
            <form class="authentication-block_form" action="login-action.php" method="post">
                <div class="authentication-block_form-container">
                    <div class="authentication-block_form-inputs_block">
                        <input class="input_field" type="text" name="username" placeholder="Name" required>
                        <input class="input_field" type="password" name="password" placeholder="Password" required>
                    </div>
                    <div class="authentication-block_form-button-block">
                        <button class="authentication-block_form-button" type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>

    </div>
</body>

</html>