$.fn.smoothlyCollapse = function (time, fun, cb) {
    time = time || 150;
    fun = fun || 'linear';
    var $this = $(this);
    var h = $this.outerHeight();
    $this.css('height', h + 'px');
    $this[0].offsetHeight;
    $this.css('transition', 'height ' + fun + ' ' + time + 'ms');
    $this.one('transitionend', function () {
        $this.css('height', '');
        $this.css('transition', '');
        if (cb) {
            cb();
        }
    });
    $this.css('height', '0');
    return $this;
};
$.fn.smoothlyExpand = function (time, fun, cb) {
    time = time || 300;
    fun = fun || '';
    var $this = $(this);
    var h = $this.outerHeight();
    $this.css('height', '0');
    $this[0].offsetHeight;
    $this.css('transition', 'height ' + fun + ' ' + time + 'ms');
    $this.one('transitionend', function () {
        $this.css('height', '');
        $this.css('transition', '');
        if (cb) {
            cb();
        }
    });
    $this.css('height', h + 'px');
    return $this;
};