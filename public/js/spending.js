/**
 * Spending model
 */
var Spending = (function () {
    function Spending (data) {
        data = data || {};
        this.id = data.id;
        this.amount = data.amount;
        this.date = data.date;
        this.tags = data.tags || [];
        this.description = data.description;
    }

    Spending.prototype.getTagString = function () {
        return this.tags.map(function (tag) { return '#' + tag; }).join(' ');
    };

    Spending.prototype.serialize = function () {
        var me = this;
        return 'id amount date tags description'.split(' ').reduce(function (prev, curr) {
            prev[curr] = me[curr];
            return prev;
        }, {});
    };

    return Spending;
}());
