var Filters = (function () {

    return {
        updateMin: function (min) {
            $('#amount input').attr('min', min);
        },
        updateMax: function (max) {
            $('#amount input').attr('max', max);
        },
        updateTags: function (tags) {
            $('#tags .list-selected').empty();
            $('#tags .list-available').empty();
            tags.forEach(function (tag) {
                $('#tags .list-available').append('<li class="item" data-value="' + tag + '">\n<a href="#">#' + tag + '</a></li>')
            });
        }
    }


}());