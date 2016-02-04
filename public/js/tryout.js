$(function () {
    $('button.add').on('click', function (ev) {
        ev.preventDefault();
        var amount = $('input[name="amount"]').val();
        var tags = $('input[name="tags"]').val();
        var description = $('input[name="description"]').val();
        $.post('/api/new', {amount: amount, tags: tags, description: description}, function (data) {
            console.log('done');
            console.log(data);
            $('.list').append('<li>[' + data.id + '] ' + amount + ' on [' + tags + '] <em>(' + description + ')</em></li>');
        });
    });
});