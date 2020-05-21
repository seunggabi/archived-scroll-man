const BUTTON_STYLE = 'background-color: white; width: 45px; height: 45px;'

const common = (text, bottom, right, fn) => {
    const $d = $('<div>');
    $d.prop('style', `border: 1px solid black; position: fixed; z-index:9999; bottom: ${bottom}px; right: ${right}px;`);

    const $b = $(`<button>${text}</button>`);
    $b.prop('style', BUTTON_STYLE);
    $b.click((e) => {
        e.stopPropagation();
        e.preventDefault();

        fn && setTimeout(fn, 1);
    })

    $d.append($b);
    $('body').append($d);
}

(function(){
    common('&uarr;', 18, 110, () => window.scrollTo(0, 0));
    common('&darr;', 18, 50, () => window.scrollTo(0, document.body.scrollHeight));
})();
