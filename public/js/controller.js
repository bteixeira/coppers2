$(function () {
    API.search({}, function (data) {
        console.log(data);
        DetailedTable.set(data);
    });
});