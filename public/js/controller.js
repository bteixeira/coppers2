$(function () {

    function doSearch() {
        var params = {};
        $formFilters.find('input').each(function () {
            if (this.value) {
                params[this.name] = this.value;
            }
        });
        API.search(params, function (spendings) {
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

    var $data = $('#data');
    $data.on('click', '.js-delete', function (ev) {
        ev.preventDefault();
        if (confirm('Really delete?')) {
            var id = $(this).data('id');
            API.delete(id, function () {
                console.log('deleted ID ' + id);
                doSearch();
            });
        }
    });

    var $formFilters = $('#form-filters');
    $formFilters.on('click', 'button', function (ev) {
        ev.preventDefault();
        doSearch();
    });

    doSearch();
});