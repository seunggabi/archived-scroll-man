const BUTTON_STYLE = 'background-color: white; width: 25px; height: 25px;'
const TIMER = 500;

const common = (text, bottom, right, fn) => {
    const $d = $('<div class="scroll-man">');
    $d.prop('style', `border: 1px solid black; position: fixed; z-index:99999; bottom: ${bottom}px; right: ${right}px;`);

    const $b = $(`<button class="scroll-man">${text}</button>`);
    $b.prop('style', BUTTON_STYLE);
    $b.click((e) => {
        e.stopPropagation();
        e.preventDefault();

        fn && setTimeout(fn, 1);
    })

    $d.append($b);
    $('body').append($d);
}

const button = () => {
    if($("div.scroll-man").length) {
        return;
    }

    common('&uarr;', 15, 55, () => window.scrollTo(0, 0));
    common('&darr;', 15, 15, () => window.scrollTo(0, document.body.scrollHeight));
}

const draw = () => {
    window.$scrollMan.common.db.get(window.$scrollMan.CONST.ACTIVE).then((v) => {
        $('div.scroll-man').remove();

        if(!v) {
            return;
        }

        button();
    });
}

(function() {
    draw();

    setInterval(draw, TIMER)
})();
