$(function () {

    function doSearch() {
        var params = {};
        if ($('#amount-text input[type="checkbox"]').is(':checked')) {
            params['amount-min'] = parseFloat($('#amount-min').val());
            params['amount-max'] = parseFloat($('#amount-max').val());
        }
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
            //console.log(spendings);
            DetailedTable.set(spendings);
        });
    }

    var $formNew = $('#form-new');
    $formNew.on('click', 'button.js-add', function (ev) {
        ev.preventDefault();
        var date = new Date(
            parseFloat($formNew.find('[name="date-year"]').val()),
            parseFloat($formNew.find('[name="date-month"]').val() - 1),
            parseFloat($formNew.find('[name="date-day"]').val()),
            parseFloat($formNew.find('[name="date-hour"]').val()),
            parseFloat($formNew.find('[name="date-minute"]').val())
        );
        var spending = new Spending({
            amount: parseFloat($formNew.find('input[name="amount-euros"]').val()),
            tags: $formNew.find('input[name="tags"]').val().trim(),
            date: date,
            description: $formNew.find('input[name="description"]').val()
        });
        API.new(spending, function (id) {
            //console.log('added ID ' + id);
            $('#floater-add-new').removeClass('onscreen');
            Stats.updateAdd(spending);
            doSearch();
        });
    });
    $formNew.on('click', 'button.js-cancel', function (ev) {
        ev.preventDefault();
        $('#floater-add-new').removeClass('onscreen');
    });

    var $data = $('#data');
    $data.on('click', '.delete', function (ev) {
        ev.preventDefault();
        if (confirm('Really delete?')) {
            var id = $(this).data('id');
            API.delete(id, function () {
                //console.log('deleted ID ' + id);
                Stats.updateDelete(null);
                doSearch();
            });
        }
    });

    function format(value) {
        return '&euro; ' + parseFloat(value).toFixed(2);
    }
    $('.range-group').each(function () {
        var $min = $(this).find('.min');
        var $minValue = $(this).parent('form').find('.value-min');
        var $max = $(this).find('.max');
        var $maxValue = $(this).parent('form').find('.value-max');
        //var step = parseFloat($min.attr('step') || 1);

        $min.on('input', function () {
            $minValue.html(format($min.val()));
            if (parseFloat($min.val()) > parseFloat($max.val())) {
                $max.val(parseFloat($min.val()));
                $maxValue.html(format($max.val()));
            }
        });
        $max.on('input', function () {
            $maxValue.html(format($max.val()));
            if (parseFloat($max.val()) < parseFloat($min.val())) {
                $min.val(parseFloat($max.val()));
                $minValue.html(format($min.val()));
            }
        });
    });
    $('#floater-filter button.main').on('click', function () {
        $('#floater-filter').removeClass('onscreen');
        doSearch();
    });





    $('.date-picker .trigger-calendar').on('click', function (ev) {
        ev.preventDefault();
        var $picker = $(this).closest('.date-picker');
        var $popup = $picker.find('.calendar-popup');
        if ($popup.is('.onscreen')) {
            $popup.smoothlyCollapse(150, 'linear', function () {
                $popup.removeClass('onscreen');
            });
        } else {
            $popup.toggleClass('onscreen', true).smoothlyExpand();
        }
    });
    $('.date-picker .calendar-popup tbody td:not(.week-number)').on('click', function (ev) {
        $(this).closest('.date-picker').find('.trigger-calendar .value').text($(this).text());
        $(this).closest('.date-picker').find('.calendar-popup').removeClass('onscreen');
    });
    $('.date-picker input[type="checkbox"]').on('click', function (ev) {
        var $picker = $(this).closest('.date-picker');
        $picker.toggleClass('unselected', !this.checked);
    });
    $('.date-picker button, .date-picker select').on('click', function() {
        $(this).closest('.date-picker').find('input[type="checkbox"]').prop('checked', true);
        $(this).closest('.date-picker').removeClass('unselected');
    });




    doSearch();
    Stats.fetch();
});