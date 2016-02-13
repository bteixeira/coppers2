$('#nav-new').on('click', function (ev) {
    ev.preventDefault();
    $('#floater-add-new').toggleClass('onscreen', true);

    var now = new Date();
    var $form = $('#form-new');
    $form.find('[name="date-year"]').val(now.getFullYear());
    $form.find('[name="date-month"]').val(now.getMonth() + 1);
    $form.find('[name="date-day"]').val(now.getDate());
    $form.find('[name="date-hour"]').val(now.getHours());
    $form.find('[name="date-minute"]').val(now.getMinutes());


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
