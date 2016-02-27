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
            //var first = true;
            if (data_) {
                $('#no-data-yet').removeClass('onscreen');
                //data_.forEach(function (spending) {
                //    var key = spending.date.toDateString();
                //    if (key !== prevKey) {
                //        prevKey = key;
                //        $table = $('<table><thead><tr><th colspan="3">' + key + '</th></tr></thead></table>');
                //        $tbody = $('<tbody></tbody>');
                //        $table.append($tbody);
                //        $data.append($table);
                //    }
                //    $tbody.append(
                //        '<tr><td class="amount">' +
                //        formatMoney(spending.amount) +
                //        '</td><td class="tags">' +
                //        spending.tags.map(function (tag) {
                //            return '#' + tag;
                //        }).join(' ') +
                //        '</td><td>' +
                //        '<button class="delete" data-id="' + spending.id + '"><span class="batch-icon">&#xf155;</span></button>' +
                //        '</td></tr>');
                //});
                $table = $('<table><thead><tr><th colspan="3">' + grouping + '</th></tr></thead></table>');
                $tbody = $('<tbody></tbody>');
                $table.append($tbody);
                data_.forEach(function (row) {
                    $tr = $('<tr></tr>');
                    for (p in row) {
                        //if (first) {
                        //    $thead.append('<th>' + p + '</th>');
                        //}
                        $tr.append('<td>' + row[p] + '</td>');
                    }
                    //first = false;
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