/**
 * Keeps track of the data that goes into the table
 */
var DetailedTable = (function () {

    var $data;
    $(function () {
        $data = $('#data');
    });

    function formatMoney(raw) {
        return '<span style="white-space: nowrap;">&euro; ' + parseFloat(raw).toFixed(2) + '</span>';
    }

    var exports = {
        set: function (data_) {
            $data.empty();
            var prevKey;
            var $table;
            var $tbody;
            var $tr;
            if (data_) {
                $('#no-data-yet').removeClass('onscreen');
                data_.forEach(function (spending) {
                    var key = spending.date.toDateString();
                    if (key !== prevKey) {
                        prevKey = key;
                        $table = $('<table class="detailed"><thead><tr><th colspan="3">' + key + '</th></tr></thead></table>');
                        $tbody = $('<tbody></tbody>');
                        $table.append($tbody);
                        $data.append($table);
                    }
                    $tr = $('<tr><td class="amount">' +
                        formatMoney(spending.amount) +
                        '</td><td class="tags">' +
                        spending.tags.map(function (tag) {
                            return '#' + tag;
                        }).join(' ') +
                        '</td><td>' +
                        '<button class="delete" data-id="' + spending.id + '"><span class="batch-icon">&#xf155;</span></button>' +
                        '</td></tr>');
                    $tr.data('spending', spending);
                    $tbody.append($tr);
                });
            } else {
                $('#no-data-yet').toggleClass('onscreen', true);
            }
        }
    };

    return exports;
}());