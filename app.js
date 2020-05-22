const BUTTON_STYLE = 'background-color: white; width: 45px; height: 45px;'
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

const draw = () => {
    window.$scrollMan.common.db.get(window.$scrollMan.CONST.ACTIVE).then((v) => {
        $('div.scroll-man').remove();

        if(!v) {
            return;
        }

        common('&uarr;', 15, 75, () => window.scrollTo(0, 0));
        common('&darr;', 15, 15, () => window.scrollTo(0, document.body.scrollHeight));
    });
}

(function(){
    setInterval(draw, TIMER)
})();
