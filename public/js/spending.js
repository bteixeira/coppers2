/**
 * Spending model
 */
var Spending = (function () {
    return function Spending (data) {
        this.id = data.id;
        this.amount = data.amount;
        this.date = data.date;
        this.tags = data.tags;
        this.description = data.description;
    }
}());