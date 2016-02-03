$(function () {
    $('button.add').on('click', function (ev) {
        ev.preventDefault();
        var name = $('input[name="name"]').val();
        $.post('/api/new', {name: name});
    });
});