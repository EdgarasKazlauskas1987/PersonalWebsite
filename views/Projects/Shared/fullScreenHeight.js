var row = $('.fullHeight');
var body = document.body,
    html = document.documentElement;

var screenHeight = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);

row.css({
    'height': screenHeight + 'px',
});

$(window).resize(function () {
    screenHeight = $(window).height();
    row.css({
        'height': screenHeight + 'px',
    });
});