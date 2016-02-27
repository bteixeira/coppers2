$('#nav-new').on('click', function (ev) {
    ev.preventDefault();
    Floaters.New.show();
});

$('#nav-filter').on('click', function (ev) {
    ev.preventDefault();
    $('.floater.onscreen').removeClass('onscreen');
    $('#floater-filter').toggleClass('onscreen', true);
    $('#floater-overlay').toggleClass('active', true);
});

$('#nav-group').on('click', function (ev) {
    ev.preventDefault();
    $('.floater.onscreen').removeClass('onscreen');
    $('#floater-group').toggleClass('onscreen', true);
    $('#floater-overlay').toggleClass('active', true);
});

$('#nav-user').on('click', function (ev) {
    ev.preventDefault();
    $('.floater.onscreen').removeClass('onscreen');
    $('#floater-user').toggleClass('onscreen', true);
    $('#floater-overlay').toggleClass('active', true);
});

$('.floater .trigger-close').on('click', function (ev) {
    ev.preventDefault();
    $(this).closest('.floater').removeClass('onscreen');
    $('#floater-overlay').toggleClass('active', false);
});
