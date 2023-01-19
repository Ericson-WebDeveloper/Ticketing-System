<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ticketing System</title>
</head>
<body>
    <div class="container">
        <h1>Password Reset Request</h1>
        <p>Hey <b>{{ $user->name }}</b> You request to Update your password. Please click the link to go page for updatin you password.</p>
        <p><a href="http://localhost:3000/reset-password/{{ $token }}?email={{ $email }}">click here</a> before 5 minutes expired the token</p>
        <p>Thank you</p>
        <label>dont's reply in this email this is system generated</label>
    </div>
</body>
</html>