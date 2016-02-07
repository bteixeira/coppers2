$(function () {

    function doSearch() {
        var params = {};
        $formFilters.find('input').each(function () {
            if (this.value) {
                params[this.name] = this.value;
            }
        });
        var dateMin = params['date-min'];
        if (dateMin) {
            var p = dateMin.split('-');
            params['date-min'] = new Date(p[0], p[1] - 1, p[2], 0, 0, 0);
        }
        var dateMax = params['date-max'];
        if (dateMax) {
            p = dateMax.split('-');
            params['date-max'] = new Date(p[0], p[1] - 1, p[2], 23, 59, 59);
        }
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