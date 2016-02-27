$(function () {

    $('.single-select').each(function () {

        var $singleSelect = $(this);
        var $listAvailable = $singleSelect.find('.list-available');
        var $default = $listAvailable.find('.default');

        $listAvailable.on('click', '.item.selected:not(.default)', function (ev) {
            ev.preventDefault();
            $(this).removeClass('selected');
            $default.toggleClass('selected', true);
        });
        $listAvailable.on('click', '.item:not(.selected)', function (ev) {
            ev.preventDefault();
            $listAvailable.find('.selected').removeClass('selected');
            $(this).toggleClass('selected', true);
        });

    });

});