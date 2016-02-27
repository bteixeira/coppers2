window.Floaters = window.Floaters || {};

window.Floaters.New = (function () {

    var $formNew;
    var $floater;
    var $inputYear;
    var $inputMonth;
    var $inputDay;
    var $inputAmount;
    var $inputTags;
    var $inputDescr;
    var $buttonAdd;
    var $buttonCancel;

    var editing = false;

    $(function () {
        $floater = $('#floater-add-new');
        $formNew = $('#form-new');
        $buttonAdd = $formNew.find('button.js-add');
        $buttonCancel = $formNew.find('button.js-cancel');
        $inputYear = $formNew.find('[name="date-year"]');
        $inputMonth = $formNew.find('[name="date-month"]');
        $inputDay = $formNew.find('[name="date-day"]');
        $inputAmount = $formNew.find('input[name="amount-euros"]');
        $inputTags = $formNew.find('input[name="tags"]');
        $inputDescr = $formNew.find('[name="description"]');

        $formNew.on('submit', function (ev) {
            ev.preventDefault();

            var date = new Date(
                parseFloat($inputYear.val()),
                parseFloat($inputMonth.val() - 1),
                parseFloat($inputDay.val())
            );

            var spending;

            if (editing) {
                spending = editing;
            } else {
                spending = new Spending();
            }

            spending.amount = parseFloat($inputAmount.val());
            spending.tags = $inputTags.val().trim();
            spending.date = date;
            spending.description = $inputDescr.val().trim();

            if (editing) {
                API.update(spending, function () {
                    exports.hide();
                    clearForm();
                    editing = false;
                    // TODO Stats. ?
                    Controller.doSearch();
                });
            } else {
                API.insert(spending, function (id) {
                    exports.hide();
                    clearForm();
                    spending.id = id;
                    Stats.updateAdd(spending);
                    Controller.doSearch();
                });
            }
            //console.log('submitting');
        });

        $buttonCancel.on('click', function (ev) {
            ev.preventDefault();
            exports.hide();
            clearForm();
        });
    });

    function clearForm () {
        $inputAmount.val('');
        $inputTags.val('');
        $inputDescr.val('');
    }

    function setDate (date) {
        $inputYear.val(date.getFullYear());
        $inputMonth.val(date.getMonth() + 1);
        $inputDay.val(date.getDate());
    }

    var exports = {
        hide: function () {
            $floater.removeClass('onscreen');
            $('#floater-overlay').toggleClass('active', false); // TODO
            $buttonAdd.find('.text').text('Add');
        },
        show: function (resetDate) {
            $('.floater.onscreen').removeClass('onscreen');
            $floater.toggleClass('onscreen', true);
            $('#floater-overlay').toggleClass('active', true); // TODO

            if (arguments.length === 0 || resetDate) {
                setDate(new Date());
            }
            $inputAmount.focus();
        },
        edit: function (spending) {
            $buttonAdd.find('.text').text('Save');
            editing = spending;
            exports.show(false);

            setDate(spending.date);
            $inputAmount.val(spending.amount);
            $inputTags.val(spending.getTagString());
            $inputDescr.val(spending.description);

        }
    };

    return exports;

}());
