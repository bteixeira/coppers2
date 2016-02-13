$('#nav-new').on('click', function (ev) {
    ev.preventDefault();
    $('#floater-add-new').toggleClass('onscreen', true);
});

$('#nav-filter').on('click', function (ev) {
    ev.preventDefault();
    $('#floater-filter').toggleClass('onscreen', true);
});

$('#nav-group').on('click', function (ev) {
    ev.preventDefault();
    $('#floater-group').toggleClass('onscreen', true);
});

$('#nav-user').on('click', function (ev) {
    ev.preventDefault();
    $('.floater.onscreen').removeClass('onscreen');
    $('#floater-user').toggleClass('onscreen', true);
});

$('.floater .trigger-close').on('click', function (ev) {
    ev.preventDefault();
    $(this).closest('.floater').removeClass('onscreen');
});
