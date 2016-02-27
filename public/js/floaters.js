$('#nav-new').on('click', function (ev) {
    ev.preventDefault();
    $('.floater.onscreen').removeClass('onscreen');
    $('#floater-add-new').toggleClass('onscreen', true);
    $('#floater-overlay').toggleClass('active', true);

    var now = new Date();
    var $form = $('#form-new');
    $form.find('[name="date-year"]').val(now.getFullYear());
    $form.find('[name="date-month"]').val(now.getMonth() + 1);
    $form.find('[name="date-day"]').val(now.getDate());
    $form.find('[name="amount-euros"]').focus();


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
