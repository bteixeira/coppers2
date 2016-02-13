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
            if (data_) {
                $('#no-data-yet').removeClass('on-screen');
                data_.forEach(function (spending) {
                    var key = spending.date.toDateString();
                    if (key !== prevKey) {
                        prevKey = key;
                        $table = $('<table><thead><tr><th colspan="3">' + key + '</th></tr></thead></table>');
                        $tbody = $('<tbody></tbody>');
                        $table.append($tbody);
                        $data.append($table);
                    }
                    $tbody.append(
                        '<tr><td class="amount">' +
                        formatMoney(spending.amount) +
                        '</td><td class="tags">' +
                        spending.tags.map(function (tag) {
                            return '#' + tag;
                        }).join(' ') +
                        '</td><td>' +
                        '<button class="js-delete" data-id="' + spending.id + '">X</button>' +
                        '</td></tr>');
                });
            } else {
                $('#no-data-yet').toggleClass('on-screen', true);
            }
        }
    };

    return exports;
}());