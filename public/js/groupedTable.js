var GroupedTable = (function () {

    var $data;
    $(function () {
        $data = $('#data');
    });

    function formatMoney(raw) {
        return '<span style="white-space: nowrap;">&euro; ' + parseFloat(raw).toFixed(2) + '</span>';
    }

    var exports = {
        set: function (data_, grouping) {
            $data.empty();
            var p;
            var $table;
            var $tbody;
            var $tr;
            if (data_) {
                $('#no-data-yet').removeClass('onscreen');
                $table = $('<table><thead><tr><th colspan="3">Grouping by ' + grouping + '</th></tr></thead></table>');
                $tbody = $('<tbody></tbody>');
                $table.append($tbody);
                data_.forEach(function (row) {
                    $tr = $('<tr></tr>');
                    for (p in row) {
                        $tr.append('<td>' + row[p] + '</td>');
                    }
                    $tbody.append($tr);
                });
                $data.append($table);
            } else {
                $('#no-data-yet').toggleClass('onscreen', true);
            }
        }
    };

    return exports;
}());