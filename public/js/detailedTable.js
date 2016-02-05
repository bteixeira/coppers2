/**
 * Keeps track of the data that goes into the table
 */
var DetailedTable = (function () {

    var $data;
    $(function () {
        $data = $('#data');
    });

    var exports = {
        set: function (data_) {
            $data.empty();
            var prevKey;
            var $table;
            var $tbody;
            data_.forEach(function (spending) {
                var key = spending.date.toDateString();
                if (key !== prevKey) {
                    prevKey = key;
                    $table = $('<table><thead><tr><th>' + key + '</th></tr></thead></table>');
                    $tbody = $('<tbody></tbody>');
                    $table.append($tbody);
                    $data.append($table);
                }
                $tbody.append('<tr><td>' + spending.amount + '</td><td>' + spending.tags + '</td></tr>');
            });
        }
    };

    return exports;
}());