$(function () {

    $('.multi-select').each(function () {

        var $multiSelect = $(this);
        var $heading = $multiSelect.find('.heading');
        var $listSelected = $multiSelect.find('.list-selected');
        var $listAvailable = $multiSelect.find('.list-available');

        $heading.on('click', function (ev) {
            var $items;

            ev.preventDefault();

            if ($multiSelect.is('.expanded')) {

                $items = $listAvailable.find('.item.selected');
                $items.remove().removeClass('selected').appendTo($listSelected);

                $items = $listSelected.find('.item.inactive');
                $items.remove().removeClass('inactive').appendTo($listAvailable);

                $multiSelect.toggleClass('empty', $listSelected.find('.item').length === 0);

                $listAvailable.smoothlyCollapse(null, null, function () {
                    $multiSelect.removeClass('expanded');
                });
            } else {
                $multiSelect.toggleClass('expanded', true);
                $listAvailable.smoothlyExpand();
            }

        });

        $multiSelect.on('click', '.list-available .item', function (ev) {
            ev.preventDefault();
            $(this).toggleClass('selected');
        });

        $multiSelect.on('click', '.list-selected .item', function (ev) {
            ev.preventDefault();
            var $this = $(this);
            if ($multiSelect.is('.expanded')) {
                $this.toggleClass('inactive');
            } else {
                setTimeout(function () {
                    $this.remove().appendTo($listAvailable);
                    $multiSelect.toggleClass('empty', $listSelected.find('.item').length === 0);
                }, 150);
            }
        });

    });

});