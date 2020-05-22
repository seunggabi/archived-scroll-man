window.$scrollMan = window.$scrollMan || {};
window.$scrollMan.CONST = {
  ACTIVE: 'isActive'
}

window.$scrollMan.common = {
  db:  (function () {
    let name = getName();
    let type = getType();

    function getName() {
      return chrome.runtime.getManifest().name.toUpperCase();
    }

    function getType() {
      return 'local';
    }

    function getStorage() {
      return new Promise((resolve) => {
        try {
          chrome.storage[type].get(name, (storage = {}) => {
            resolve(storage[name] || {});
          });
        } catch(e) {
          resolve();
        }
      });
    }

    function setStorage(data) {
      return new Promise((resolve) => {
        let obj = {};
        obj[name] = data;

        chrome.storage[type].set(obj, () => {
          resolve();
        });
      });
    }

    function put(key, value) {
      return new Promise((resolve) => {
        getStorage().then((storage = {}) => {
          storage[key] = value;

          setStorage(storage).then(() => {
            resolve(storage);
          });
        });
      });
    }

    function get(key) {
      return new Promise((resolve) => {
        getStorage().then((storage = {}) => {
          resolve(storage[key]);
        });
      });
    }

    return {
      put,
      get
    };
  })(),
}

window.$scrollMan.common.data = {
  review: {
    className: "red bold",
    urls: [
      // {
      //   name: "Chrome",
      //   url: "",
      // },
      // {
      //   name: "Whale",
      //   url: "",
      // },
      {
        name: "Toonation",
        url: "https://toon.at/donate/637225213338784448",
      }
    ]
  },
  project: [
    {
      name: "국민청원",
      urls: [
        {
          name: "Whale",
          url: "https://store.whale.naver.com/detail/klmljnjajpkoeidgjpdeplhgcflpdelh",
        }
      ],
      className: "bold",
      style: "",
    },
    {
      name: "Clip History",
      urls: [
        {
          name: "Whale",
          url: "https://store.whale.naver.com/detail/nclmnfnglpbfhdnmdpkjpnnagbkdlhai",
        }
      ],
      className: "bold",
      style: "",
    },
    {
      name: "Smart Boook",
      urls: [
        {
          name: "click",
          url: "http://smartboook.com/",
        }
      ],
      className: "bold",
      style: "",
    },
    {
      name: "Auto Skip",
      urls: [
        {
          name: "Whale",
          url: "https://store.whale.naver.com/detail/elgcmjohjpjgmogomciohcdgofjmddaj",
        }
      ],
      className: "bold",
      style: "",
    },
    {
      name: "Auto Refresh",
      urls: [
        {
          name: "Chrome",
          url: "https://chrome.google.com/webstore/detail/autorefresh/kpblfhpdgghcabcfkndaicjhkppckdfk",
        },
        {
          name: "Whale",
          url: "https://store.whale.naver.com/detail/dmfiihebfllgebodghhgbldipmpiehem",
        }
      ],
      className: "bold",
      style: "",
    },
    {
      name: "Instagram Follower Count",
      urls: [
        {
          name: "click",
          url: "https://seunggabi.tistory.com/entry/insta-follwer-%EC%9D%B8%EC%8A%A4%ED%83%80%EA%B7%B8%EB%9E%A8-%ED%8C%94%EB%A1%9C%EC%9B%8C-%EC%88%98-%EC%B9%B4%EC%9A%B4%ED%8A%B8-%EB%B4%87",
        }
      ],
      className: "bold",
      style: "",
    },
  ]
};

window.$scrollMan.common.doms = {
  link_wrapper: '<div class="link-wrapper"></div>',
  a: '<a href="#" target="_blank" class="padding-left-3"></a>',
  li: '<li>',
  div: '<div>',
  span: '<span>',
  pre: '<pre>',
  button: '<button href="#"></button>',
  img: '<img style="max-width: 400px">'
};

window.$scrollMan.common.getCookie = (cname) => {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

window.$scrollMan.common.a = (link, $parents) => {
  const { doms } = window.$scrollMan.common;

  link.urls && link.urls.forEach(url => {
    let $a = $(doms.a);
    $a.prop('href', url.url);
    $a.text(`(${url.name})`);
    $a.addClass(link.className);

    $parents.append($a);
  });

  if(link instanceof Array) {
    link.forEach(l => {
      let $a = $(doms.a);
      $a.prop('href', l.url);
      $a.text(`${l.name}`);
      $a.addClass(l.className);

      let $li = $(doms.li);
      $li.append($a);
      $parents.append($li);
    })
  }
};

window.$scrollMan.common.r = () => {
  const { a, data, doms } = window.$scrollMan.common;

  a(data.review, $('#review'));

  data.project.forEach(link => {
    let $wrapper = $(doms.li);
    $wrapper.text(link.name);

    a(link, $wrapper);

    $('#project').append($wrapper);
  });
};

function i() {
  window.$scrollMan.common.r()
}

window.addEventListener('load', i);
