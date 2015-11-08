// JavaScript File
$(function() {
    var socket = io.connect('https://penguins-colehansen.c9users.io');
    socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
    });

    socket.on('message', function(data) {
       $('h2').html(data);
    });
    
    $('form').submit(function(e){
        e.preventDefault();
        submit($('#chat_input').val());
    });
    
    $('form').on('keypress', function(e) {
        if (e.keyCode == 13) {
            submit($(this).val());
        }
    });
    
    function submit(message) {
        socket.emit('send', message);
    }
});