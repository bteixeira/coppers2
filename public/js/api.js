var API = (function () {
    return {
        search: function (params, cb) {
            $.get('/api/search', params, function (data) {
                cb(params.group ? data : data.map(function (raw) {
                    return new Spending({
                        amount: raw.amount && parseFloat(raw.amount.replace('.', '').replace(',','.')),
                        date: new Date(raw.date),
                        description: raw.description,
                        id: raw.id,
                        tags: raw.tags.split(' ')
                    });
                }));
            });
        },
        insert: function (spending, cb) {
            $.post('/api/new', spending.serialize(), function (data) {
                cb(data.id);
            });
        },
        update: function (spending, cb) {
            $.post('/api/edit', spending.serialize(), function () {
                cb();
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