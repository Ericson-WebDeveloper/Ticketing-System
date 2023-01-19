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
        <h1>Ticket ReAssign/Assign</h1>
        <p>Hey <b>{{ $ticket->programmer->name }}</b> You have new ticket task. Re-assign by {{ $ticket->creator->name }}. as {{ $as }}</p>
        <p>Title: <b>{{ $ticket->ticket_name }}</b></p>
        <p>Control: <b>{{ $ticket->control_no }}</b></p>
        <p>Status: <b>{{ $ticket->progress->status->status_name }}</b></p>
        <p>Type: <b>{{ $ticket->progress->type->type_name }}</b></p>
        <p>Environment: <b>{{ $ticket->progress->env->environment_name }}</b></p>
        <p>Q.A: <b>{{ $ticket->qa->name }}</b></p>
        <p>Programmer: <b>{{ $ticket->programmer->name  }}</b></p>
        <p>Owner: <b>{{ $ticket->owner->name  }}</b></p>
        <br>
        <p>Thank you</p>
        <label>dont's reply in this email this is system generated</label>
    </div>
</body>
</html>