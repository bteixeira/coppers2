$(function () {

    doSearch();

    function doSearch() {
        API.search({}, function (spendings) {
            console.log(spendings);
            DetailedTable.set(spendings);
        });
    }

    var $formNew = $('#form-new');
    $formNew.on('click', 'button', function (ev) {
        ev.preventDefault();
        API.new({
            amount: parseFloat($formNew.find('input[name="amount"]').val()),
            tags: $formNew.find('input[name="tags"]').val().trim(),
            date: new Date(),
            description: $formNew.find('input[name="description"]').val()
        }, function (id) {
            console.log('added ID ' + id);
            doSearch();
        });
    });
});