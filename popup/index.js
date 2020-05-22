window.$scrollMan = window.$scrollMan || {};

text = (v) => {
  console.log(v);
  const text = v ? 'ON' : 'OFF';
  $('#on-and-off').text(text);
}

load = () => {
  window.$scrollMan.common.db.get(window.$scrollMan.CONST.ACTIVE).then((v) => {
    text(v);
  });
}

toggle = () => {
  window.$scrollMan.common.db.get(window.$scrollMan.CONST.ACTIVE).then((v) => {
    const next = !v;
    text(next);
    window.$scrollMan.common.db.put(window.$scrollMan.CONST.ACTIVE, next);
  });
};

bindEvent = () => {
  $('#on-and-off').click(() => {
    toggle();
  })
};

init = () => {
  load();
  bindEvent();
};

window.addEventListener('load', init);
