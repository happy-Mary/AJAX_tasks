$('.runes').ready(function() {
    $(this).on('click', 'td', function() {
        $(this).toggleClass('show');
    })
});