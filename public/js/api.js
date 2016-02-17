var API = (function () {
    return {
        search: function (params, cb) {
            $.get('/api/search', params, function (data) {
                cb(data && data.map(function (raw) {
                    return new Spending({
                        amount: raw.amount && parseFloat(raw.amount.replace('.', '').replace(',','.')),
                        date: new Date(raw.date),
                        description: raw.description,
                        id: raw.id,
                        tags: raw.tags
                    });
                }));
            });
        },
        new: function (data, cb) {
            $.post('/api/new', data, function (data) {
                cb(data.id);
            });
        },
        delete: function (id, cb) {
            $.post('/api/delete', {id: id}, function () {
                cb();
            });
        },
        stats: {
            spendings: function (cb) {
                $.get('/api/stats/spendings', cb);
            }
        },
        tags: {
            all: function (cb) {
                $.get('/api/tags/all', cb);
            }
        }
    }
}());