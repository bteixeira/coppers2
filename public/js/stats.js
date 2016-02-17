var Stats = (function () {

    var stats = {};

    return {
        fetch: function () {
            API.stats.spendings(function (data) {
                stats.count = data.count;
                stats.min = data.min;
                stats.max = data.max;
                Filters.updateMin(stats.min);
                Filters.updateMax(stats.max);
            });
            API.tags.all(function (data) {
                stats.tags = data;
                Filters.updateTags(stats.tags.map(function (tag) {
                    return tag.tag;
                }));
            });
        },
        updateAdd: function (spending) {
            if (typeof spending.amount === 'number') {
                if (spending.amount > stats.max) {
                    stats.max = spending.amount;
                }
                if (spending.amount < stats.min) {
                    stats.min = spending.amount;
                }
                stats.count += 1;
            }
        },
        updateDelete: function (spending) {
            this.fetch();
        },
        get: function () {
            return stats; //TODO RETURN A COPY
        }
    };
}());