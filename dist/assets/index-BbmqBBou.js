(function () {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const f of document.querySelectorAll('link[rel="modulepreload"]')) d(f);
  new MutationObserver((f) => {
    for (const p of f)
      if (p.type === "childList")
        for (const m of p.addedNodes)
          m.tagName === "LINK" && m.rel === "modulepreload" && d(m);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(f) {
    const p = {};
    return (
      f.integrity && (p.integrity = f.integrity),
      f.referrerPolicy && (p.referrerPolicy = f.referrerPolicy),
      f.crossOrigin === "use-credentials"
        ? (p.credentials = "include")
        : f.crossOrigin === "anonymous"
          ? (p.credentials = "omit")
          : (p.credentials = "same-origin"),
      p
    );
  }
  function d(f) {
    if (f.ep) return;
    f.ep = !0;
    const p = o(f);
    fetch(f.href, p);
  }
})();
function qp(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default")
    ? l.default
    : l;
}
var Ho = { exports: {} },
  dl = {},
  Qo = { exports: {} },
  pe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Jc;
function Xp() {
  if (Jc) return pe;
  Jc = 1;
  var l = Symbol.for("react.element"),
    a = Symbol.for("react.portal"),
    o = Symbol.for("react.fragment"),
    d = Symbol.for("react.strict_mode"),
    f = Symbol.for("react.profiler"),
    p = Symbol.for("react.provider"),
    m = Symbol.for("react.context"),
    y = Symbol.for("react.forward_ref"),
    S = Symbol.for("react.suspense"),
    w = Symbol.for("react.memo"),
    P = Symbol.for("react.lazy"),
    R = Symbol.iterator;
  function L(k) {
    return k === null || typeof k != "object"
      ? null
      : ((k = (R && k[R]) || k["@@iterator"]),
        typeof k == "function" ? k : null);
  }
  var z = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    F = Object.assign,
    $ = {};
  function D(k, O, ce) {
    (this.props = k),
      (this.context = O),
      (this.refs = $),
      (this.updater = ce || z);
  }
  (D.prototype.isReactComponent = {}),
    (D.prototype.setState = function (k, O) {
      if (typeof k != "object" && typeof k != "function" && k != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, k, O, "setState");
    }),
    (D.prototype.forceUpdate = function (k) {
      this.updater.enqueueForceUpdate(this, k, "forceUpdate");
    });
  function U() {}
  U.prototype = D.prototype;
  function M(k, O, ce) {
    (this.props = k),
      (this.context = O),
      (this.refs = $),
      (this.updater = ce || z);
  }
  var le = (M.prototype = new U());
  (le.constructor = M), F(le, D.prototype), (le.isPureReactComponent = !0);
  var ae = Array.isArray,
    oe = Object.prototype.hasOwnProperty,
    ke = { current: null },
    _e = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Ce(k, O, ce) {
    var fe,
      ve = {},
      he = null,
      Ee = null;
    if (O != null)
      for (fe in (O.ref !== void 0 && (Ee = O.ref),
      O.key !== void 0 && (he = "" + O.key),
      O))
        oe.call(O, fe) && !_e.hasOwnProperty(fe) && (ve[fe] = O[fe]);
    var ge = arguments.length - 2;
    if (ge === 1) ve.children = ce;
    else if (1 < ge) {
      for (var Re = Array(ge), ut = 0; ut < ge; ut++)
        Re[ut] = arguments[ut + 2];
      ve.children = Re;
    }
    if (k && k.defaultProps)
      for (fe in ((ge = k.defaultProps), ge))
        ve[fe] === void 0 && (ve[fe] = ge[fe]);
    return {
      $$typeof: l,
      type: k,
      key: he,
      ref: Ee,
      props: ve,
      _owner: ke.current,
    };
  }
  function je(k, O) {
    return {
      $$typeof: l,
      type: k.type,
      key: O,
      ref: k.ref,
      props: k.props,
      _owner: k._owner,
    };
  }
  function we(k) {
    return typeof k == "object" && k !== null && k.$$typeof === l;
  }
  function at(k) {
    var O = { "=": "=0", ":": "=2" };
    return (
      "$" +
      k.replace(/[=:]/g, function (ce) {
        return O[ce];
      })
    );
  }
  var ie = /\/+/g;
  function ue(k, O) {
    return typeof k == "object" && k !== null && k.key != null
      ? at("" + k.key)
      : O.toString(36);
  }
  function Se(k, O, ce, fe, ve) {
    var he = typeof k;
    (he === "undefined" || he === "boolean") && (k = null);
    var Ee = !1;
    if (k === null) Ee = !0;
    else
      switch (he) {
        case "string":
        case "number":
          Ee = !0;
          break;
        case "object":
          switch (k.$$typeof) {
            case l:
            case a:
              Ee = !0;
          }
      }
    if (Ee)
      return (
        (Ee = k),
        (ve = ve(Ee)),
        (k = fe === "" ? "." + ue(Ee, 0) : fe),
        ae(ve)
          ? ((ce = ""),
            k != null && (ce = k.replace(ie, "$&/") + "/"),
            Se(ve, O, ce, "", function (ut) {
              return ut;
            }))
          : ve != null &&
            (we(ve) &&
              (ve = je(
                ve,
                ce +
                  (!ve.key || (Ee && Ee.key === ve.key)
                    ? ""
                    : ("" + ve.key).replace(ie, "$&/") + "/") +
                  k,
              )),
            O.push(ve)),
        1
      );
    if (((Ee = 0), (fe = fe === "" ? "." : fe + ":"), ae(k)))
      for (var ge = 0; ge < k.length; ge++) {
        he = k[ge];
        var Re = fe + ue(he, ge);
        Ee += Se(he, O, ce, Re, ve);
      }
    else if (((Re = L(k)), typeof Re == "function"))
      for (k = Re.call(k), ge = 0; !(he = k.next()).done; )
        (he = he.value),
          (Re = fe + ue(he, ge++)),
          (Ee += Se(he, O, ce, Re, ve));
    else if (he === "object")
      throw (
        ((O = String(k)),
        Error(
          "Objects are not valid as a React child (found: " +
            (O === "[object Object]"
              ? "object with keys {" + Object.keys(k).join(", ") + "}"
              : O) +
            "). If you meant to render a collection of children, use an array instead.",
        ))
      );
    return Ee;
  }
  function Pe(k, O, ce) {
    if (k == null) return k;
    var fe = [],
      ve = 0;
    return (
      Se(k, fe, "", "", function (he) {
        return O.call(ce, he, ve++);
      }),
      fe
    );
  }
  function Le(k) {
    if (k._status === -1) {
      var O = k._result;
      (O = O()),
        O.then(
          function (ce) {
            (k._status === 0 || k._status === -1) &&
              ((k._status = 1), (k._result = ce));
          },
          function (ce) {
            (k._status === 0 || k._status === -1) &&
              ((k._status = 2), (k._result = ce));
          },
        ),
        k._status === -1 && ((k._status = 0), (k._result = O));
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var me = { current: null },
    Q = { transition: null },
    ee = {
      ReactCurrentDispatcher: me,
      ReactCurrentBatchConfig: Q,
      ReactCurrentOwner: ke,
    };
  function Y() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (pe.Children = {
      map: Pe,
      forEach: function (k, O, ce) {
        Pe(
          k,
          function () {
            O.apply(this, arguments);
          },
          ce,
        );
      },
      count: function (k) {
        var O = 0;
        return (
          Pe(k, function () {
            O++;
          }),
          O
        );
      },
      toArray: function (k) {
        return (
          Pe(k, function (O) {
            return O;
          }) || []
        );
      },
      only: function (k) {
        if (!we(k))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return k;
      },
    }),
    (pe.Component = D),
    (pe.Fragment = o),
    (pe.Profiler = f),
    (pe.PureComponent = M),
    (pe.StrictMode = d),
    (pe.Suspense = S),
    (pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ee),
    (pe.act = Y),
    (pe.cloneElement = function (k, O, ce) {
      if (k == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            k +
            ".",
        );
      var fe = F({}, k.props),
        ve = k.key,
        he = k.ref,
        Ee = k._owner;
      if (O != null) {
        if (
          (O.ref !== void 0 && ((he = O.ref), (Ee = ke.current)),
          O.key !== void 0 && (ve = "" + O.key),
          k.type && k.type.defaultProps)
        )
          var ge = k.type.defaultProps;
        for (Re in O)
          oe.call(O, Re) &&
            !_e.hasOwnProperty(Re) &&
            (fe[Re] = O[Re] === void 0 && ge !== void 0 ? ge[Re] : O[Re]);
      }
      var Re = arguments.length - 2;
      if (Re === 1) fe.children = ce;
      else if (1 < Re) {
        ge = Array(Re);
        for (var ut = 0; ut < Re; ut++) ge[ut] = arguments[ut + 2];
        fe.children = ge;
      }
      return {
        $$typeof: l,
        type: k.type,
        key: ve,
        ref: he,
        props: fe,
        _owner: Ee,
      };
    }),
    (pe.createContext = function (k) {
      return (
        (k = {
          $$typeof: m,
          _currentValue: k,
          _currentValue2: k,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (k.Provider = { $$typeof: p, _context: k }),
        (k.Consumer = k)
      );
    }),
    (pe.createElement = Ce),
    (pe.createFactory = function (k) {
      var O = Ce.bind(null, k);
      return (O.type = k), O;
    }),
    (pe.createRef = function () {
      return { current: null };
    }),
    (pe.forwardRef = function (k) {
      return { $$typeof: y, render: k };
    }),
    (pe.isValidElement = we),
    (pe.lazy = function (k) {
      return { $$typeof: P, _payload: { _status: -1, _result: k }, _init: Le };
    }),
    (pe.memo = function (k, O) {
      return { $$typeof: w, type: k, compare: O === void 0 ? null : O };
    }),
    (pe.startTransition = function (k) {
      var O = Q.transition;
      Q.transition = {};
      try {
        k();
      } finally {
        Q.transition = O;
      }
    }),
    (pe.unstable_act = Y),
    (pe.useCallback = function (k, O) {
      return me.current.useCallback(k, O);
    }),
    (pe.useContext = function (k) {
      return me.current.useContext(k);
    }),
    (pe.useDebugValue = function () {}),
    (pe.useDeferredValue = function (k) {
      return me.current.useDeferredValue(k);
    }),
    (pe.useEffect = function (k, O) {
      return me.current.useEffect(k, O);
    }),
    (pe.useId = function () {
      return me.current.useId();
    }),
    (pe.useImperativeHandle = function (k, O, ce) {
      return me.current.useImperativeHandle(k, O, ce);
    }),
    (pe.useInsertionEffect = function (k, O) {
      return me.current.useInsertionEffect(k, O);
    }),
    (pe.useLayoutEffect = function (k, O) {
      return me.current.useLayoutEffect(k, O);
    }),
    (pe.useMemo = function (k, O) {
      return me.current.useMemo(k, O);
    }),
    (pe.useReducer = function (k, O, ce) {
      return me.current.useReducer(k, O, ce);
    }),
    (pe.useRef = function (k) {
      return me.current.useRef(k);
    }),
    (pe.useState = function (k) {
      return me.current.useState(k);
    }),
    (pe.useSyncExternalStore = function (k, O, ce) {
      return me.current.useSyncExternalStore(k, O, ce);
    }),
    (pe.useTransition = function () {
      return me.current.useTransition();
    }),
    (pe.version = "18.3.1"),
    pe
  );
}
var Zc;
function ra() {
  return Zc || ((Zc = 1), (Qo.exports = Xp())), Qo.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bc;
function Gp() {
  if (bc) return dl;
  bc = 1;
  var l = ra(),
    a = Symbol.for("react.element"),
    o = Symbol.for("react.fragment"),
    d = Object.prototype.hasOwnProperty,
    f = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    p = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(y, S, w) {
    var P,
      R = {},
      L = null,
      z = null;
    w !== void 0 && (L = "" + w),
      S.key !== void 0 && (L = "" + S.key),
      S.ref !== void 0 && (z = S.ref);
    for (P in S) d.call(S, P) && !p.hasOwnProperty(P) && (R[P] = S[P]);
    if (y && y.defaultProps)
      for (P in ((S = y.defaultProps), S)) R[P] === void 0 && (R[P] = S[P]);
    return {
      $$typeof: a,
      type: y,
      key: L,
      ref: z,
      props: R,
      _owner: f.current,
    };
  }
  return (dl.Fragment = o), (dl.jsx = m), (dl.jsxs = m), dl;
}
var ed;
function Jp() {
  return ed || ((ed = 1), (Ho.exports = Gp())), Ho.exports;
}
var u = Jp(),
  Oi = {},
  Ko = { exports: {} },
  yt = {},
  Yo = { exports: {} },
  qo = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var td;
function Zp() {
  return (
    td ||
      ((td = 1),
      (function (l) {
        function a(Q, ee) {
          var Y = Q.length;
          Q.push(ee);
          e: for (; 0 < Y; ) {
            var k = (Y - 1) >>> 1,
              O = Q[k];
            if (0 < f(O, ee)) (Q[k] = ee), (Q[Y] = O), (Y = k);
            else break e;
          }
        }
        function o(Q) {
          return Q.length === 0 ? null : Q[0];
        }
        function d(Q) {
          if (Q.length === 0) return null;
          var ee = Q[0],
            Y = Q.pop();
          if (Y !== ee) {
            Q[0] = Y;
            e: for (var k = 0, O = Q.length, ce = O >>> 1; k < ce; ) {
              var fe = 2 * (k + 1) - 1,
                ve = Q[fe],
                he = fe + 1,
                Ee = Q[he];
              if (0 > f(ve, Y))
                he < O && 0 > f(Ee, ve)
                  ? ((Q[k] = Ee), (Q[he] = Y), (k = he))
                  : ((Q[k] = ve), (Q[fe] = Y), (k = fe));
              else if (he < O && 0 > f(Ee, Y))
                (Q[k] = Ee), (Q[he] = Y), (k = he);
              else break e;
            }
          }
          return ee;
        }
        function f(Q, ee) {
          var Y = Q.sortIndex - ee.sortIndex;
          return Y !== 0 ? Y : Q.id - ee.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var p = performance;
          l.unstable_now = function () {
            return p.now();
          };
        } else {
          var m = Date,
            y = m.now();
          l.unstable_now = function () {
            return m.now() - y;
          };
        }
        var S = [],
          w = [],
          P = 1,
          R = null,
          L = 3,
          z = !1,
          F = !1,
          $ = !1,
          D = typeof setTimeout == "function" ? setTimeout : null,
          U = typeof clearTimeout == "function" ? clearTimeout : null,
          M = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function le(Q) {
          for (var ee = o(w); ee !== null; ) {
            if (ee.callback === null) d(w);
            else if (ee.startTime <= Q)
              d(w), (ee.sortIndex = ee.expirationTime), a(S, ee);
            else break;
            ee = o(w);
          }
        }
        function ae(Q) {
          if ((($ = !1), le(Q), !F))
            if (o(S) !== null) (F = !0), Le(oe);
            else {
              var ee = o(w);
              ee !== null && me(ae, ee.startTime - Q);
            }
        }
        function oe(Q, ee) {
          (F = !1), $ && (($ = !1), U(Ce), (Ce = -1)), (z = !0);
          var Y = L;
          try {
            for (
              le(ee), R = o(S);
              R !== null && (!(R.expirationTime > ee) || (Q && !at()));

            ) {
              var k = R.callback;
              if (typeof k == "function") {
                (R.callback = null), (L = R.priorityLevel);
                var O = k(R.expirationTime <= ee);
                (ee = l.unstable_now()),
                  typeof O == "function"
                    ? (R.callback = O)
                    : R === o(S) && d(S),
                  le(ee);
              } else d(S);
              R = o(S);
            }
            if (R !== null) var ce = !0;
            else {
              var fe = o(w);
              fe !== null && me(ae, fe.startTime - ee), (ce = !1);
            }
            return ce;
          } finally {
            (R = null), (L = Y), (z = !1);
          }
        }
        var ke = !1,
          _e = null,
          Ce = -1,
          je = 5,
          we = -1;
        function at() {
          return !(l.unstable_now() - we < je);
        }
        function ie() {
          if (_e !== null) {
            var Q = l.unstable_now();
            we = Q;
            var ee = !0;
            try {
              ee = _e(!0, Q);
            } finally {
              ee ? ue() : ((ke = !1), (_e = null));
            }
          } else ke = !1;
        }
        var ue;
        if (typeof M == "function")
          ue = function () {
            M(ie);
          };
        else if (typeof MessageChannel < "u") {
          var Se = new MessageChannel(),
            Pe = Se.port2;
          (Se.port1.onmessage = ie),
            (ue = function () {
              Pe.postMessage(null);
            });
        } else
          ue = function () {
            D(ie, 0);
          };
        function Le(Q) {
          (_e = Q), ke || ((ke = !0), ue());
        }
        function me(Q, ee) {
          Ce = D(function () {
            Q(l.unstable_now());
          }, ee);
        }
        (l.unstable_IdlePriority = 5),
          (l.unstable_ImmediatePriority = 1),
          (l.unstable_LowPriority = 4),
          (l.unstable_NormalPriority = 3),
          (l.unstable_Profiling = null),
          (l.unstable_UserBlockingPriority = 2),
          (l.unstable_cancelCallback = function (Q) {
            Q.callback = null;
          }),
          (l.unstable_continueExecution = function () {
            F || z || ((F = !0), Le(oe));
          }),
          (l.unstable_forceFrameRate = function (Q) {
            0 > Q || 125 < Q
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (je = 0 < Q ? Math.floor(1e3 / Q) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return L;
          }),
          (l.unstable_getFirstCallbackNode = function () {
            return o(S);
          }),
          (l.unstable_next = function (Q) {
            switch (L) {
              case 1:
              case 2:
              case 3:
                var ee = 3;
                break;
              default:
                ee = L;
            }
            var Y = L;
            L = ee;
            try {
              return Q();
            } finally {
              L = Y;
            }
          }),
          (l.unstable_pauseExecution = function () {}),
          (l.unstable_requestPaint = function () {}),
          (l.unstable_runWithPriority = function (Q, ee) {
            switch (Q) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                Q = 3;
            }
            var Y = L;
            L = Q;
            try {
              return ee();
            } finally {
              L = Y;
            }
          }),
          (l.unstable_scheduleCallback = function (Q, ee, Y) {
            var k = l.unstable_now();
            switch (
              (typeof Y == "object" && Y !== null
                ? ((Y = Y.delay),
                  (Y = typeof Y == "number" && 0 < Y ? k + Y : k))
                : (Y = k),
              Q)
            ) {
              case 1:
                var O = -1;
                break;
              case 2:
                O = 250;
                break;
              case 5:
                O = 1073741823;
                break;
              case 4:
                O = 1e4;
                break;
              default:
                O = 5e3;
            }
            return (
              (O = Y + O),
              (Q = {
                id: P++,
                callback: ee,
                priorityLevel: Q,
                startTime: Y,
                expirationTime: O,
                sortIndex: -1,
              }),
              Y > k
                ? ((Q.sortIndex = Y),
                  a(w, Q),
                  o(S) === null &&
                    Q === o(w) &&
                    ($ ? (U(Ce), (Ce = -1)) : ($ = !0), me(ae, Y - k)))
                : ((Q.sortIndex = O), a(S, Q), F || z || ((F = !0), Le(oe))),
              Q
            );
          }),
          (l.unstable_shouldYield = at),
          (l.unstable_wrapCallback = function (Q) {
            var ee = L;
            return function () {
              var Y = L;
              L = ee;
              try {
                return Q.apply(this, arguments);
              } finally {
                L = Y;
              }
            };
          });
      })(qo)),
    qo
  );
}
var nd;
function bp() {
  return nd || ((nd = 1), (Yo.exports = Zp())), Yo.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var rd;
function eh() {
  if (rd) return yt;
  rd = 1;
  var l = ra(),
    a = bp();
  function o(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        n = 1;
      n < arguments.length;
      n++
    )
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var d = new Set(),
    f = {};
  function p(e, t) {
    m(e, t), m(e + "Capture", t);
  }
  function m(e, t) {
    for (f[e] = t, e = 0; e < t.length; e++) d.add(t[e]);
  }
  var y = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    S = Object.prototype.hasOwnProperty,
    w =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    P = {},
    R = {};
  function L(e) {
    return S.call(R, e)
      ? !0
      : S.call(P, e)
        ? !1
        : w.test(e)
          ? (R[e] = !0)
          : ((P[e] = !0), !1);
  }
  function z(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r
          ? !1
          : n !== null
            ? !n.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function F(e, t, n, r) {
    if (t === null || typeof t > "u" || z(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function $(e, t, n, r, i, s, c) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = r),
      (this.attributeNamespace = i),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = s),
      (this.removeEmptyString = c);
  }
  var D = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      D[e] = new $(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      D[t] = new $(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        D[e] = new $(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      D[e] = new $(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        D[e] = new $(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      D[e] = new $(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      D[e] = new $(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      D[e] = new $(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      D[e] = new $(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
  var U = /[\-:]([a-z])/g;
  function M(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(U, M);
      D[t] = new $(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(U, M);
        D[t] = new $(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(U, M);
      D[t] = new $(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      D[e] = new $(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (D.xlinkHref = new $(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      D[e] = new $(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
  function le(e, t, n, r) {
    var i = D.hasOwnProperty(t) ? D[t] : null;
    (i !== null
      ? i.type !== 0
      : r ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")) &&
      (F(t, n, i, r) && (n = null),
      r || i === null
        ? L(t) &&
          (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        : i.mustUseProperty
          ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
          : ((t = i.attributeName),
            (r = i.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((i = i.type),
                (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var ae = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    oe = Symbol.for("react.element"),
    ke = Symbol.for("react.portal"),
    _e = Symbol.for("react.fragment"),
    Ce = Symbol.for("react.strict_mode"),
    je = Symbol.for("react.profiler"),
    we = Symbol.for("react.provider"),
    at = Symbol.for("react.context"),
    ie = Symbol.for("react.forward_ref"),
    ue = Symbol.for("react.suspense"),
    Se = Symbol.for("react.suspense_list"),
    Pe = Symbol.for("react.memo"),
    Le = Symbol.for("react.lazy"),
    me = Symbol.for("react.offscreen"),
    Q = Symbol.iterator;
  function ee(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Q && e[Q]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var Y = Object.assign,
    k;
  function O(e) {
    if (k === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        k = (t && t[1]) || "";
      }
    return (
      `
` +
      k +
      e
    );
  }
  var ce = !1;
  function fe(e, t) {
    if (!e || ce) return "";
    ce = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (C) {
            var r = C;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (C) {
            r = C;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (C) {
          r = C;
        }
        e();
      }
    } catch (C) {
      if (C && r && typeof C.stack == "string") {
        for (
          var i = C.stack.split(`
`),
            s = r.stack.split(`
`),
            c = i.length - 1,
            h = s.length - 1;
          1 <= c && 0 <= h && i[c] !== s[h];

        )
          h--;
        for (; 1 <= c && 0 <= h; c--, h--)
          if (i[c] !== s[h]) {
            if (c !== 1 || h !== 1)
              do
                if ((c--, h--, 0 > h || i[c] !== s[h])) {
                  var v =
                    `
` + i[c].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      v.includes("<anonymous>") &&
                      (v = v.replace("<anonymous>", e.displayName)),
                    v
                  );
                }
              while (1 <= c && 0 <= h);
            break;
          }
      }
    } finally {
      (ce = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? O(e) : "";
  }
  function ve(e) {
    switch (e.tag) {
      case 5:
        return O(e.type);
      case 16:
        return O("Lazy");
      case 13:
        return O("Suspense");
      case 19:
        return O("SuspenseList");
      case 0:
      case 2:
      case 15:
        return (e = fe(e.type, !1)), e;
      case 11:
        return (e = fe(e.type.render, !1)), e;
      case 1:
        return (e = fe(e.type, !0)), e;
      default:
        return "";
    }
  }
  function he(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case _e:
        return "Fragment";
      case ke:
        return "Portal";
      case je:
        return "Profiler";
      case Ce:
        return "StrictMode";
      case ue:
        return "Suspense";
      case Se:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case at:
          return (e.displayName || "Context") + ".Consumer";
        case we:
          return (e._context.displayName || "Context") + ".Provider";
        case ie:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case Pe:
          return (
            (t = e.displayName || null), t !== null ? t : he(e.type) || "Memo"
          );
        case Le:
          (t = e._payload), (e = e._init);
          try {
            return he(e(t));
          } catch {}
      }
    return null;
  }
  function Ee(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ""),
          t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return he(t);
      case 8:
        return t === Ce ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function ge(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Re(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function ut(e) {
    var t = Re(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var i = n.get,
        s = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return i.call(this);
          },
          set: function (c) {
            (r = "" + c), s.call(this, c);
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (c) {
            r = "" + c;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function An(e) {
    e._valueTracker || (e._valueTracker = ut(e));
  }
  function kl(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = "";
    return (
      e && (r = Re(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function Mn(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function er(e, t) {
    var n = t.checked;
    return Y({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function Zi(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
      r = t.checked != null ? t.checked : t.defaultChecked;
    (n = ge(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          t.type === "checkbox" || t.type === "radio"
            ? t.checked != null
            : t.value != null,
      });
  }
  function bi(e, t) {
    (t = t.checked), t != null && le(e, "checked", t, !1);
  }
  function jl(e, t) {
    bi(e, t);
    var n = ge(t.value),
      r = t.type;
    if (n != null)
      r === "number"
        ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value")
      ? _(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && _(e, t.type, ge(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked);
  }
  function g(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (
        !(
          (r !== "submit" && r !== "reset") ||
          (t.value !== void 0 && t.value !== null)
        )
      )
        return;
      (t = "" + e._wrapperState.initialValue),
        n || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (n = e.name),
      n !== "" && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      n !== "" && (e.name = n);
  }
  function _(e, t, n) {
    (t !== "number" || Mn(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var T = Array.isArray;
  function K(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++)
        (i = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== i && (e[n].selected = i),
          i && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + ge(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          (e[i].selected = !0), r && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function H(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(o(91));
    return Y({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function W(e, t) {
    var n = t.value;
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(o(92));
        if (T(n)) {
          if (1 < n.length) throw Error(o(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: ge(n) };
  }
  function te(e, t) {
    var n = ge(t.value),
      r = ge(t.defaultValue);
    n != null &&
      ((n = "" + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      r != null && (e.defaultValue = "" + r);
  }
  function de(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== "" &&
      t !== null &&
      (e.value = t);
  }
  function Ue(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function $e(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? Ue(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var wt,
    El = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (t, n, r, i) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, r, i);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = t;
      else {
        for (
          wt = wt || document.createElement("div"),
            wt.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = wt.firstChild;
          e.firstChild;

        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function bt(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var en = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    es = ["Webkit", "ms", "Moz", "O"];
  Object.keys(en).forEach(function (e) {
    es.forEach(function (t) {
      (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (en[t] = en[e]);
    });
  });
  function Pr(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : n || typeof t != "number" || t === 0 || (en.hasOwnProperty(e) && en[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function Nl(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf("--") === 0,
          i = Pr(n, t[n], r);
        n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
      }
  }
  var _l = Y(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function ts(e, t) {
    if (t) {
      if (_l[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(o(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(o(60));
        if (
          typeof t.dangerouslySetInnerHTML != "object" ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(o(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(o(62));
    }
  }
  function ns(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var rs = null;
  function ls(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var is = null,
    tr = null,
    nr = null;
  function ha(e) {
    if ((e = Gr(e))) {
      if (typeof is != "function") throw Error(o(280));
      var t = e.stateNode;
      t && ((t = Xl(t)), is(e.stateNode, e.type, t));
    }
  }
  function ma(e) {
    tr ? (nr ? nr.push(e) : (nr = [e])) : (tr = e);
  }
  function va() {
    if (tr) {
      var e = tr,
        t = nr;
      if (((nr = tr = null), ha(e), t)) for (e = 0; e < t.length; e++) ha(t[e]);
    }
  }
  function ga(e, t) {
    return e(t);
  }
  function ya() {}
  var ss = !1;
  function xa(e, t, n) {
    if (ss) return e(t, n);
    ss = !0;
    try {
      return ga(e, t, n);
    } finally {
      (ss = !1), (tr !== null || nr !== null) && (ya(), va());
    }
  }
  function Rr(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Xl(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) ||
          ((e = e.type),
          (r = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !r);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(o(231, t, typeof n));
    return n;
  }
  var os = !1;
  if (y)
    try {
      var Lr = {};
      Object.defineProperty(Lr, "passive", {
        get: function () {
          os = !0;
        },
      }),
        window.addEventListener("test", Lr, Lr),
        window.removeEventListener("test", Lr, Lr);
    } catch {
      os = !1;
    }
  function ef(e, t, n, r, i, s, c, h, v) {
    var C = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, C);
    } catch (A) {
      this.onError(A);
    }
  }
  var Tr = !1,
    Cl = null,
    Pl = !1,
    as = null,
    tf = {
      onError: function (e) {
        (Tr = !0), (Cl = e);
      },
    };
  function nf(e, t, n, r, i, s, c, h, v) {
    (Tr = !1), (Cl = null), ef.apply(tf, arguments);
  }
  function rf(e, t, n, r, i, s, c, h, v) {
    if ((nf.apply(this, arguments), Tr)) {
      if (Tr) {
        var C = Cl;
        (Tr = !1), (Cl = null);
      } else throw Error(o(198));
      Pl || ((Pl = !0), (as = C));
    }
  }
  function $n(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function wa(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function Sa(e) {
    if ($n(e) !== e) throw Error(o(188));
  }
  function lf(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = $n(e)), t === null)) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var i = n.return;
      if (i === null) break;
      var s = i.alternate;
      if (s === null) {
        if (((r = i.return), r !== null)) {
          n = r;
          continue;
        }
        break;
      }
      if (i.child === s.child) {
        for (s = i.child; s; ) {
          if (s === n) return Sa(i), e;
          if (s === r) return Sa(i), t;
          s = s.sibling;
        }
        throw Error(o(188));
      }
      if (n.return !== r.return) (n = i), (r = s);
      else {
        for (var c = !1, h = i.child; h; ) {
          if (h === n) {
            (c = !0), (n = i), (r = s);
            break;
          }
          if (h === r) {
            (c = !0), (r = i), (n = s);
            break;
          }
          h = h.sibling;
        }
        if (!c) {
          for (h = s.child; h; ) {
            if (h === n) {
              (c = !0), (n = s), (r = i);
              break;
            }
            if (h === r) {
              (c = !0), (r = s), (n = i);
              break;
            }
            h = h.sibling;
          }
          if (!c) throw Error(o(189));
        }
      }
      if (n.alternate !== r) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
    return n.stateNode.current === n ? e : t;
  }
  function ka(e) {
    return (e = lf(e)), e !== null ? ja(e) : null;
  }
  function ja(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = ja(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Ea = a.unstable_scheduleCallback,
    Na = a.unstable_cancelCallback,
    sf = a.unstable_shouldYield,
    of = a.unstable_requestPaint,
    Be = a.unstable_now,
    af = a.unstable_getCurrentPriorityLevel,
    us = a.unstable_ImmediatePriority,
    _a = a.unstable_UserBlockingPriority,
    Rl = a.unstable_NormalPriority,
    uf = a.unstable_LowPriority,
    Ca = a.unstable_IdlePriority,
    Ll = null,
    Bt = null;
  function cf(e) {
    if (Bt && typeof Bt.onCommitFiberRoot == "function")
      try {
        Bt.onCommitFiberRoot(Ll, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var Ft = Math.clz32 ? Math.clz32 : pf,
    df = Math.log,
    ff = Math.LN2;
  function pf(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((df(e) / ff) | 0)) | 0;
  }
  var Tl = 64,
    Fl = 4194304;
  function Fr(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function zl(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
      i = e.suspendedLanes,
      s = e.pingedLanes,
      c = n & 268435455;
    if (c !== 0) {
      var h = c & ~i;
      h !== 0 ? (r = Fr(h)) : ((s &= c), s !== 0 && (r = Fr(s)));
    } else (c = n & ~i), c !== 0 ? (r = Fr(c)) : s !== 0 && (r = Fr(s));
    if (r === 0) return 0;
    if (
      t !== 0 &&
      t !== r &&
      !(t & i) &&
      ((i = r & -r), (s = t & -t), i >= s || (i === 16 && (s & 4194240) !== 0))
    )
      return t;
    if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= r; 0 < t; )
        (n = 31 - Ft(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
    return r;
  }
  function hf(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function mf(e, t) {
    for (
      var n = e.suspendedLanes,
        r = e.pingedLanes,
        i = e.expirationTimes,
        s = e.pendingLanes;
      0 < s;

    ) {
      var c = 31 - Ft(s),
        h = 1 << c,
        v = i[c];
      v === -1
        ? (!(h & n) || h & r) && (i[c] = hf(h, t))
        : v <= t && (e.expiredLanes |= h),
        (s &= ~h);
    }
  }
  function cs(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function Pa() {
    var e = Tl;
    return (Tl <<= 1), !(Tl & 4194240) && (Tl = 64), e;
  }
  function ds(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function zr(e, t, n) {
    (e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - Ft(t)),
      (e[t] = n);
  }
  function vf(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements);
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var i = 31 - Ft(n),
        s = 1 << i;
      (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~s);
    }
  }
  function fs(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - Ft(n),
        i = 1 << r;
      (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
    }
  }
  var Ne = 0;
  function Ra(e) {
    return (
      (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
    );
  }
  var La,
    ps,
    Ta,
    Fa,
    za,
    hs = !1,
    Ol = [],
    hn = null,
    mn = null,
    vn = null,
    Or = new Map(),
    Dr = new Map(),
    gn = [],
    gf =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function Oa(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        hn = null;
        break;
      case "dragenter":
      case "dragleave":
        mn = null;
        break;
      case "mouseover":
      case "mouseout":
        vn = null;
        break;
      case "pointerover":
      case "pointerout":
        Or.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Dr.delete(t.pointerId);
    }
  }
  function Ir(e, t, n, r, i, s) {
    return e === null || e.nativeEvent !== s
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: r,
          nativeEvent: s,
          targetContainers: [i],
        }),
        t !== null && ((t = Gr(t)), t !== null && ps(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        i !== null && t.indexOf(i) === -1 && t.push(i),
        e);
  }
  function yf(e, t, n, r, i) {
    switch (t) {
      case "focusin":
        return (hn = Ir(hn, e, t, n, r, i)), !0;
      case "dragenter":
        return (mn = Ir(mn, e, t, n, r, i)), !0;
      case "mouseover":
        return (vn = Ir(vn, e, t, n, r, i)), !0;
      case "pointerover":
        var s = i.pointerId;
        return Or.set(s, Ir(Or.get(s) || null, e, t, n, r, i)), !0;
      case "gotpointercapture":
        return (
          (s = i.pointerId), Dr.set(s, Ir(Dr.get(s) || null, e, t, n, r, i)), !0
        );
    }
    return !1;
  }
  function Da(e) {
    var t = Vn(e.target);
    if (t !== null) {
      var n = $n(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = wa(n)), t !== null)) {
            (e.blockedOn = t),
              za(e.priority, function () {
                Ta(n);
              });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Dl(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = vs(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        (rs = r), n.target.dispatchEvent(r), (rs = null);
      } else return (t = Gr(n)), t !== null && ps(t), (e.blockedOn = n), !1;
      t.shift();
    }
    return !0;
  }
  function Ia(e, t, n) {
    Dl(e) && n.delete(t);
  }
  function xf() {
    (hs = !1),
      hn !== null && Dl(hn) && (hn = null),
      mn !== null && Dl(mn) && (mn = null),
      vn !== null && Dl(vn) && (vn = null),
      Or.forEach(Ia),
      Dr.forEach(Ia);
  }
  function Ar(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      hs ||
        ((hs = !0),
        a.unstable_scheduleCallback(a.unstable_NormalPriority, xf)));
  }
  function Mr(e) {
    function t(i) {
      return Ar(i, e);
    }
    if (0 < Ol.length) {
      Ar(Ol[0], e);
      for (var n = 1; n < Ol.length; n++) {
        var r = Ol[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      hn !== null && Ar(hn, e),
        mn !== null && Ar(mn, e),
        vn !== null && Ar(vn, e),
        Or.forEach(t),
        Dr.forEach(t),
        n = 0;
      n < gn.length;
      n++
    )
      (r = gn[n]), r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < gn.length && ((n = gn[0]), n.blockedOn === null); )
      Da(n), n.blockedOn === null && gn.shift();
  }
  var rr = ae.ReactCurrentBatchConfig,
    Il = !0;
  function wf(e, t, n, r) {
    var i = Ne,
      s = rr.transition;
    rr.transition = null;
    try {
      (Ne = 1), ms(e, t, n, r);
    } finally {
      (Ne = i), (rr.transition = s);
    }
  }
  function Sf(e, t, n, r) {
    var i = Ne,
      s = rr.transition;
    rr.transition = null;
    try {
      (Ne = 4), ms(e, t, n, r);
    } finally {
      (Ne = i), (rr.transition = s);
    }
  }
  function ms(e, t, n, r) {
    if (Il) {
      var i = vs(e, t, n, r);
      if (i === null) zs(e, t, r, Al, n), Oa(e, r);
      else if (yf(i, e, t, n, r)) r.stopPropagation();
      else if ((Oa(e, r), t & 4 && -1 < gf.indexOf(e))) {
        for (; i !== null; ) {
          var s = Gr(i);
          if (
            (s !== null && La(s),
            (s = vs(e, t, n, r)),
            s === null && zs(e, t, r, Al, n),
            s === i)
          )
            break;
          i = s;
        }
        i !== null && r.stopPropagation();
      } else zs(e, t, r, null, n);
    }
  }
  var Al = null;
  function vs(e, t, n, r) {
    if (((Al = null), (e = ls(r)), (e = Vn(e)), e !== null))
      if (((t = $n(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = wa(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return (Al = e), null;
  }
  function Aa(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (af()) {
          case us:
            return 1;
          case _a:
            return 4;
          case Rl:
          case uf:
            return 16;
          case Ca:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var yn = null,
    gs = null,
    Ml = null;
  function Ma() {
    if (Ml) return Ml;
    var e,
      t = gs,
      n = t.length,
      r,
      i = "value" in yn ? yn.value : yn.textContent,
      s = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++);
    var c = n - e;
    for (r = 1; r <= c && t[n - r] === i[s - r]; r++);
    return (Ml = i.slice(e, 1 < r ? 1 - r : void 0));
  }
  function $l(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Vl() {
    return !0;
  }
  function $a() {
    return !1;
  }
  function St(e) {
    function t(n, r, i, s, c) {
      (this._reactName = n),
        (this._targetInst = i),
        (this.type = r),
        (this.nativeEvent = s),
        (this.target = c),
        (this.currentTarget = null);
      for (var h in e)
        e.hasOwnProperty(h) && ((n = e[h]), (this[h] = n ? n(s) : s[h]));
      return (
        (this.isDefaultPrevented = (
          s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
        )
          ? Vl
          : $a),
        (this.isPropagationStopped = $a),
        this
      );
    }
    return (
      Y(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = Vl));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = Vl));
        },
        persist: function () {},
        isPersistent: Vl,
      }),
      t
    );
  }
  var lr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ys = St(lr),
    $r = Y({}, lr, { view: 0, detail: 0 }),
    kf = St($r),
    xs,
    ws,
    Vr,
    Ul = Y({}, $r, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: ks,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Vr &&
              (Vr && e.type === "mousemove"
                ? ((xs = e.screenX - Vr.screenX), (ws = e.screenY - Vr.screenY))
                : (ws = xs = 0),
              (Vr = e)),
            xs);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : ws;
      },
    }),
    Va = St(Ul),
    jf = Y({}, Ul, { dataTransfer: 0 }),
    Ef = St(jf),
    Nf = Y({}, $r, { relatedTarget: 0 }),
    Ss = St(Nf),
    _f = Y({}, lr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Cf = St(_f),
    Pf = Y({}, lr, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Rf = St(Pf),
    Lf = Y({}, lr, { data: 0 }),
    Ua = St(Lf),
    Tf = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Ff = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    zf = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Of(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = zf[e])
        ? !!t[e]
        : !1;
  }
  function ks() {
    return Of;
  }
  var Df = Y({}, $r, {
      key: function (e) {
        if (e.key) {
          var t = Tf[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = $l(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Ff[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: ks,
      charCode: function (e) {
        return e.type === "keypress" ? $l(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? $l(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    If = St(Df),
    Af = Y({}, Ul, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Ba = St(Af),
    Mf = Y({}, $r, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ks,
    }),
    $f = St(Mf),
    Vf = Y({}, lr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Uf = St(Vf),
    Bf = Y({}, Ul, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Wf = St(Bf),
    Hf = [9, 13, 27, 32],
    js = y && "CompositionEvent" in window,
    Ur = null;
  y && "documentMode" in document && (Ur = document.documentMode);
  var Qf = y && "TextEvent" in window && !Ur,
    Wa = y && (!js || (Ur && 8 < Ur && 11 >= Ur)),
    Ha = " ",
    Qa = !1;
  function Ka(e, t) {
    switch (e) {
      case "keyup":
        return Hf.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ya(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var ir = !1;
  function Kf(e, t) {
    switch (e) {
      case "compositionend":
        return Ya(t);
      case "keypress":
        return t.which !== 32 ? null : ((Qa = !0), Ha);
      case "textInput":
        return (e = t.data), e === Ha && Qa ? null : e;
      default:
        return null;
    }
  }
  function Yf(e, t) {
    if (ir)
      return e === "compositionend" || (!js && Ka(e, t))
        ? ((e = Ma()), (Ml = gs = yn = null), (ir = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Wa && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var qf = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function qa(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!qf[e.type] : t === "textarea";
  }
  function Xa(e, t, n, r) {
    ma(r),
      (t = Kl(t, "onChange")),
      0 < t.length &&
        ((n = new ys("onChange", "change", null, n, r)),
        e.push({ event: n, listeners: t }));
  }
  var Br = null,
    Wr = null;
  function Xf(e) {
    pu(e, 0);
  }
  function Bl(e) {
    var t = cr(e);
    if (kl(t)) return e;
  }
  function Gf(e, t) {
    if (e === "change") return t;
  }
  var Ga = !1;
  if (y) {
    var Es;
    if (y) {
      var Ns = "oninput" in document;
      if (!Ns) {
        var Ja = document.createElement("div");
        Ja.setAttribute("oninput", "return;"),
          (Ns = typeof Ja.oninput == "function");
      }
      Es = Ns;
    } else Es = !1;
    Ga = Es && (!document.documentMode || 9 < document.documentMode);
  }
  function Za() {
    Br && (Br.detachEvent("onpropertychange", ba), (Wr = Br = null));
  }
  function ba(e) {
    if (e.propertyName === "value" && Bl(Wr)) {
      var t = [];
      Xa(t, Wr, e, ls(e)), xa(Xf, t);
    }
  }
  function Jf(e, t, n) {
    e === "focusin"
      ? (Za(), (Br = t), (Wr = n), Br.attachEvent("onpropertychange", ba))
      : e === "focusout" && Za();
  }
  function Zf(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Bl(Wr);
  }
  function bf(e, t) {
    if (e === "click") return Bl(t);
  }
  function ep(e, t) {
    if (e === "input" || e === "change") return Bl(t);
  }
  function tp(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var zt = typeof Object.is == "function" ? Object.is : tp;
  function Hr(e, t) {
    if (zt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (!S.call(t, i) || !zt(e[i], t[i])) return !1;
    }
    return !0;
  }
  function eu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function tu(e, t) {
    var n = eu(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (((r = e + n.textContent.length), e <= t && r >= t))
          return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = eu(n);
    }
  }
  function nu(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? nu(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function ru() {
    for (var e = window, t = Mn(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Mn(e.document);
    }
    return t;
  }
  function _s(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function np(e) {
    var t = ru(),
      n = e.focusedElem,
      r = e.selectionRange;
    if (
      t !== n &&
      n &&
      n.ownerDocument &&
      nu(n.ownerDocument.documentElement, n)
    ) {
      if (r !== null && _s(n)) {
        if (
          ((t = r.start),
          (e = r.end),
          e === void 0 && (e = t),
          "selectionStart" in n)
        )
          (n.selectionStart = t),
            (n.selectionEnd = Math.min(e, n.value.length));
        else if (
          ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection();
          var i = n.textContent.length,
            s = Math.min(r.start, i);
          (r = r.end === void 0 ? s : Math.min(r.end, i)),
            !e.extend && s > r && ((i = r), (r = s), (s = i)),
            (i = tu(n, s));
          var c = tu(n, r);
          i &&
            c &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== i.node ||
              e.anchorOffset !== i.offset ||
              e.focusNode !== c.node ||
              e.focusOffset !== c.offset) &&
            ((t = t.createRange()),
            t.setStart(i.node, i.offset),
            e.removeAllRanges(),
            s > r
              ? (e.addRange(t), e.extend(c.node, c.offset))
              : (t.setEnd(c.node, c.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; (e = e.parentNode); )
        e.nodeType === 1 &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
        (e = t[n]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top);
    }
  }
  var rp = y && "documentMode" in document && 11 >= document.documentMode,
    sr = null,
    Cs = null,
    Qr = null,
    Ps = !1;
  function lu(e, t, n) {
    var r =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ps ||
      sr == null ||
      sr !== Mn(r) ||
      ((r = sr),
      "selectionStart" in r && _s(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (Qr && Hr(Qr, r)) ||
        ((Qr = r),
        (r = Kl(Cs, "onSelect")),
        0 < r.length &&
          ((t = new ys("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = sr))));
  }
  function Wl(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var or = {
      animationend: Wl("Animation", "AnimationEnd"),
      animationiteration: Wl("Animation", "AnimationIteration"),
      animationstart: Wl("Animation", "AnimationStart"),
      transitionend: Wl("Transition", "TransitionEnd"),
    },
    Rs = {},
    iu = {};
  y &&
    ((iu = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete or.animationend.animation,
      delete or.animationiteration.animation,
      delete or.animationstart.animation),
    "TransitionEvent" in window || delete or.transitionend.transition);
  function Hl(e) {
    if (Rs[e]) return Rs[e];
    if (!or[e]) return e;
    var t = or[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in iu) return (Rs[e] = t[n]);
    return e;
  }
  var su = Hl("animationend"),
    ou = Hl("animationiteration"),
    au = Hl("animationstart"),
    uu = Hl("transitionend"),
    cu = new Map(),
    du =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function xn(e, t) {
    cu.set(e, t), p(t, [e]);
  }
  for (var Ls = 0; Ls < du.length; Ls++) {
    var Ts = du[Ls],
      lp = Ts.toLowerCase(),
      ip = Ts[0].toUpperCase() + Ts.slice(1);
    xn(lp, "on" + ip);
  }
  xn(su, "onAnimationEnd"),
    xn(ou, "onAnimationIteration"),
    xn(au, "onAnimationStart"),
    xn("dblclick", "onDoubleClick"),
    xn("focusin", "onFocus"),
    xn("focusout", "onBlur"),
    xn(uu, "onTransitionEnd"),
    m("onMouseEnter", ["mouseout", "mouseover"]),
    m("onMouseLeave", ["mouseout", "mouseover"]),
    m("onPointerEnter", ["pointerout", "pointerover"]),
    m("onPointerLeave", ["pointerout", "pointerover"]),
    p(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    p(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    p("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    p(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    p(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    p(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    );
  var Kr =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    sp = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(Kr),
    );
  function fu(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = n), rf(r, t, void 0, e), (e.currentTarget = null);
  }
  function pu(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        i = r.event;
      r = r.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var c = r.length - 1; 0 <= c; c--) {
            var h = r[c],
              v = h.instance,
              C = h.currentTarget;
            if (((h = h.listener), v !== s && i.isPropagationStopped()))
              break e;
            fu(i, h, C), (s = v);
          }
        else
          for (c = 0; c < r.length; c++) {
            if (
              ((h = r[c]),
              (v = h.instance),
              (C = h.currentTarget),
              (h = h.listener),
              v !== s && i.isPropagationStopped())
            )
              break e;
            fu(i, h, C), (s = v);
          }
      }
    }
    if (Pl) throw ((e = as), (Pl = !1), (as = null), e);
  }
  function Fe(e, t) {
    var n = t[$s];
    n === void 0 && (n = t[$s] = new Set());
    var r = e + "__bubble";
    n.has(r) || (hu(t, e, 2, !1), n.add(r));
  }
  function Fs(e, t, n) {
    var r = 0;
    t && (r |= 4), hu(n, e, r, t);
  }
  var Ql = "_reactListening" + Math.random().toString(36).slice(2);
  function Yr(e) {
    if (!e[Ql]) {
      (e[Ql] = !0),
        d.forEach(function (n) {
          n !== "selectionchange" && (sp.has(n) || Fs(n, !1, e), Fs(n, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ql] || ((t[Ql] = !0), Fs("selectionchange", !1, t));
    }
  }
  function hu(e, t, n, r) {
    switch (Aa(t)) {
      case 1:
        var i = wf;
        break;
      case 4:
        i = Sf;
        break;
      default:
        i = ms;
    }
    (n = i.bind(null, t, n, e)),
      (i = void 0),
      !os ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (i = !0),
      r
        ? i !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: i })
          : e.addEventListener(t, n, !0)
        : i !== void 0
          ? e.addEventListener(t, n, { passive: i })
          : e.addEventListener(t, n, !1);
  }
  function zs(e, t, n, r, i) {
    var s = r;
    if (!(t & 1) && !(t & 2) && r !== null)
      e: for (;;) {
        if (r === null) return;
        var c = r.tag;
        if (c === 3 || c === 4) {
          var h = r.stateNode.containerInfo;
          if (h === i || (h.nodeType === 8 && h.parentNode === i)) break;
          if (c === 4)
            for (c = r.return; c !== null; ) {
              var v = c.tag;
              if (
                (v === 3 || v === 4) &&
                ((v = c.stateNode.containerInfo),
                v === i || (v.nodeType === 8 && v.parentNode === i))
              )
                return;
              c = c.return;
            }
          for (; h !== null; ) {
            if (((c = Vn(h)), c === null)) return;
            if (((v = c.tag), v === 5 || v === 6)) {
              r = s = c;
              continue e;
            }
            h = h.parentNode;
          }
        }
        r = r.return;
      }
    xa(function () {
      var C = s,
        A = ls(n),
        V = [];
      e: {
        var I = cu.get(e);
        if (I !== void 0) {
          var q = ys,
            G = e;
          switch (e) {
            case "keypress":
              if ($l(n) === 0) break e;
            case "keydown":
            case "keyup":
              q = If;
              break;
            case "focusin":
              (G = "focus"), (q = Ss);
              break;
            case "focusout":
              (G = "blur"), (q = Ss);
              break;
            case "beforeblur":
            case "afterblur":
              q = Ss;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              q = Va;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              q = Ef;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              q = $f;
              break;
            case su:
            case ou:
            case au:
              q = Cf;
              break;
            case uu:
              q = Uf;
              break;
            case "scroll":
              q = kf;
              break;
            case "wheel":
              q = Wf;
              break;
            case "copy":
            case "cut":
            case "paste":
              q = Rf;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              q = Ba;
          }
          var Z = (t & 4) !== 0,
            We = !Z && e === "scroll",
            j = Z ? (I !== null ? I + "Capture" : null) : I;
          Z = [];
          for (var x = C, E; x !== null; ) {
            E = x;
            var B = E.stateNode;
            if (
              (E.tag === 5 &&
                B !== null &&
                ((E = B),
                j !== null &&
                  ((B = Rr(x, j)), B != null && Z.push(qr(x, B, E)))),
              We)
            )
              break;
            x = x.return;
          }
          0 < Z.length &&
            ((I = new q(I, G, null, n, A)), V.push({ event: I, listeners: Z }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (
            ((I = e === "mouseover" || e === "pointerover"),
            (q = e === "mouseout" || e === "pointerout"),
            I &&
              n !== rs &&
              (G = n.relatedTarget || n.fromElement) &&
              (Vn(G) || G[tn]))
          )
            break e;
          if (
            (q || I) &&
            ((I =
              A.window === A
                ? A
                : (I = A.ownerDocument)
                  ? I.defaultView || I.parentWindow
                  : window),
            q
              ? ((G = n.relatedTarget || n.toElement),
                (q = C),
                (G = G ? Vn(G) : null),
                G !== null &&
                  ((We = $n(G)), G !== We || (G.tag !== 5 && G.tag !== 6)) &&
                  (G = null))
              : ((q = null), (G = C)),
            q !== G)
          ) {
            if (
              ((Z = Va),
              (B = "onMouseLeave"),
              (j = "onMouseEnter"),
              (x = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((Z = Ba),
                (B = "onPointerLeave"),
                (j = "onPointerEnter"),
                (x = "pointer")),
              (We = q == null ? I : cr(q)),
              (E = G == null ? I : cr(G)),
              (I = new Z(B, x + "leave", q, n, A)),
              (I.target = We),
              (I.relatedTarget = E),
              (B = null),
              Vn(A) === C &&
                ((Z = new Z(j, x + "enter", G, n, A)),
                (Z.target = E),
                (Z.relatedTarget = We),
                (B = Z)),
              (We = B),
              q && G)
            )
              t: {
                for (Z = q, j = G, x = 0, E = Z; E; E = ar(E)) x++;
                for (E = 0, B = j; B; B = ar(B)) E++;
                for (; 0 < x - E; ) (Z = ar(Z)), x--;
                for (; 0 < E - x; ) (j = ar(j)), E--;
                for (; x--; ) {
                  if (Z === j || (j !== null && Z === j.alternate)) break t;
                  (Z = ar(Z)), (j = ar(j));
                }
                Z = null;
              }
            else Z = null;
            q !== null && mu(V, I, q, Z, !1),
              G !== null && We !== null && mu(V, We, G, Z, !0);
          }
        }
        e: {
          if (
            ((I = C ? cr(C) : window),
            (q = I.nodeName && I.nodeName.toLowerCase()),
            q === "select" || (q === "input" && I.type === "file"))
          )
            var b = Gf;
          else if (qa(I))
            if (Ga) b = ep;
            else {
              b = Zf;
              var ne = Jf;
            }
          else
            (q = I.nodeName) &&
              q.toLowerCase() === "input" &&
              (I.type === "checkbox" || I.type === "radio") &&
              (b = bf);
          if (b && (b = b(e, C))) {
            Xa(V, b, n, A);
            break e;
          }
          ne && ne(e, I, C),
            e === "focusout" &&
              (ne = I._wrapperState) &&
              ne.controlled &&
              I.type === "number" &&
              _(I, "number", I.value);
        }
        switch (((ne = C ? cr(C) : window), e)) {
          case "focusin":
            (qa(ne) || ne.contentEditable === "true") &&
              ((sr = ne), (Cs = C), (Qr = null));
            break;
          case "focusout":
            Qr = Cs = sr = null;
            break;
          case "mousedown":
            Ps = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (Ps = !1), lu(V, n, A);
            break;
          case "selectionchange":
            if (rp) break;
          case "keydown":
          case "keyup":
            lu(V, n, A);
        }
        var re;
        if (js)
          e: {
            switch (e) {
              case "compositionstart":
                var se = "onCompositionStart";
                break e;
              case "compositionend":
                se = "onCompositionEnd";
                break e;
              case "compositionupdate":
                se = "onCompositionUpdate";
                break e;
            }
            se = void 0;
          }
        else
          ir
            ? Ka(e, n) && (se = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (se = "onCompositionStart");
        se &&
          (Wa &&
            n.locale !== "ko" &&
            (ir || se !== "onCompositionStart"
              ? se === "onCompositionEnd" && ir && (re = Ma())
              : ((yn = A),
                (gs = "value" in yn ? yn.value : yn.textContent),
                (ir = !0))),
          (ne = Kl(C, se)),
          0 < ne.length &&
            ((se = new Ua(se, e, null, n, A)),
            V.push({ event: se, listeners: ne }),
            re
              ? (se.data = re)
              : ((re = Ya(n)), re !== null && (se.data = re)))),
          (re = Qf ? Kf(e, n) : Yf(e, n)) &&
            ((C = Kl(C, "onBeforeInput")),
            0 < C.length &&
              ((A = new Ua("onBeforeInput", "beforeinput", null, n, A)),
              V.push({ event: A, listeners: C }),
              (A.data = re)));
      }
      pu(V, t);
    });
  }
  function qr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Kl(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var i = e,
        s = i.stateNode;
      i.tag === 5 &&
        s !== null &&
        ((i = s),
        (s = Rr(e, n)),
        s != null && r.unshift(qr(e, s, i)),
        (s = Rr(e, t)),
        s != null && r.push(qr(e, s, i))),
        (e = e.return);
    }
    return r;
  }
  function ar(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function mu(e, t, n, r, i) {
    for (var s = t._reactName, c = []; n !== null && n !== r; ) {
      var h = n,
        v = h.alternate,
        C = h.stateNode;
      if (v !== null && v === r) break;
      h.tag === 5 &&
        C !== null &&
        ((h = C),
        i
          ? ((v = Rr(n, s)), v != null && c.unshift(qr(n, v, h)))
          : i || ((v = Rr(n, s)), v != null && c.push(qr(n, v, h)))),
        (n = n.return);
    }
    c.length !== 0 && e.push({ event: t, listeners: c });
  }
  var op = /\r\n?/g,
    ap = /\u0000|\uFFFD/g;
  function vu(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        op,
        `
`,
      )
      .replace(ap, "");
  }
  function Yl(e, t, n) {
    if (((t = vu(t)), vu(e) !== t && n)) throw Error(o(425));
  }
  function ql() {}
  var Os = null,
    Ds = null;
  function Is(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var As = typeof setTimeout == "function" ? setTimeout : void 0,
    up = typeof clearTimeout == "function" ? clearTimeout : void 0,
    gu = typeof Promise == "function" ? Promise : void 0,
    cp =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof gu < "u"
          ? function (e) {
              return gu.resolve(null).then(e).catch(dp);
            }
          : As;
  function dp(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Ms(e, t) {
    var n = t,
      r = 0;
    do {
      var i = n.nextSibling;
      if ((e.removeChild(n), i && i.nodeType === 8))
        if (((n = i.data), n === "/$")) {
          if (r === 0) {
            e.removeChild(i), Mr(t);
            return;
          }
          r--;
        } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
      n = i;
    } while (n);
    Mr(t);
  }
  function wn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function yu(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var ur = Math.random().toString(36).slice(2),
    Wt = "__reactFiber$" + ur,
    Xr = "__reactProps$" + ur,
    tn = "__reactContainer$" + ur,
    $s = "__reactEvents$" + ur,
    fp = "__reactListeners$" + ur,
    pp = "__reactHandles$" + ur;
  function Vn(e) {
    var t = e[Wt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[tn] || n[Wt])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = yu(e); e !== null; ) {
            if ((n = e[Wt])) return n;
            e = yu(e);
          }
        return t;
      }
      (e = n), (n = e.parentNode);
    }
    return null;
  }
  function Gr(e) {
    return (
      (e = e[Wt] || e[tn]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function cr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Xl(e) {
    return e[Xr] || null;
  }
  var Vs = [],
    dr = -1;
  function Sn(e) {
    return { current: e };
  }
  function ze(e) {
    0 > dr || ((e.current = Vs[dr]), (Vs[dr] = null), dr--);
  }
  function Te(e, t) {
    dr++, (Vs[dr] = e.current), (e.current = t);
  }
  var kn = {},
    lt = Sn(kn),
    pt = Sn(!1),
    Un = kn;
  function fr(e, t) {
    var n = e.type.contextTypes;
    if (!n) return kn;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var i = {},
      s;
    for (s in n) i[s] = t[s];
    return (
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = i)),
      i
    );
  }
  function ht(e) {
    return (e = e.childContextTypes), e != null;
  }
  function Gl() {
    ze(pt), ze(lt);
  }
  function xu(e, t, n) {
    if (lt.current !== kn) throw Error(o(168));
    Te(lt, t), Te(pt, n);
  }
  function wu(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
      return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(o(108, Ee(e) || "Unknown", i));
    return Y({}, n, r);
  }
  function Jl(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        kn),
      (Un = lt.current),
      Te(lt, e),
      Te(pt, pt.current),
      !0
    );
  }
  function Su(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(o(169));
    n
      ? ((e = wu(e, t, Un)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        ze(pt),
        ze(lt),
        Te(lt, e))
      : ze(pt),
      Te(pt, n);
  }
  var nn = null,
    Zl = !1,
    Us = !1;
  function ku(e) {
    nn === null ? (nn = [e]) : nn.push(e);
  }
  function hp(e) {
    (Zl = !0), ku(e);
  }
  function jn() {
    if (!Us && nn !== null) {
      Us = !0;
      var e = 0,
        t = Ne;
      try {
        var n = nn;
        for (Ne = 1; e < n.length; e++) {
          var r = n[e];
          do r = r(!0);
          while (r !== null);
        }
        (nn = null), (Zl = !1);
      } catch (i) {
        throw (nn !== null && (nn = nn.slice(e + 1)), Ea(us, jn), i);
      } finally {
        (Ne = t), (Us = !1);
      }
    }
    return null;
  }
  var pr = [],
    hr = 0,
    bl = null,
    ei = 0,
    Nt = [],
    _t = 0,
    Bn = null,
    rn = 1,
    ln = "";
  function Wn(e, t) {
    (pr[hr++] = ei), (pr[hr++] = bl), (bl = e), (ei = t);
  }
  function ju(e, t, n) {
    (Nt[_t++] = rn), (Nt[_t++] = ln), (Nt[_t++] = Bn), (Bn = e);
    var r = rn;
    e = ln;
    var i = 32 - Ft(r) - 1;
    (r &= ~(1 << i)), (n += 1);
    var s = 32 - Ft(t) + i;
    if (30 < s) {
      var c = i - (i % 5);
      (s = (r & ((1 << c) - 1)).toString(32)),
        (r >>= c),
        (i -= c),
        (rn = (1 << (32 - Ft(t) + i)) | (n << i) | r),
        (ln = s + e);
    } else (rn = (1 << s) | (n << i) | r), (ln = e);
  }
  function Bs(e) {
    e.return !== null && (Wn(e, 1), ju(e, 1, 0));
  }
  function Ws(e) {
    for (; e === bl; )
      (bl = pr[--hr]), (pr[hr] = null), (ei = pr[--hr]), (pr[hr] = null);
    for (; e === Bn; )
      (Bn = Nt[--_t]),
        (Nt[_t] = null),
        (ln = Nt[--_t]),
        (Nt[_t] = null),
        (rn = Nt[--_t]),
        (Nt[_t] = null);
  }
  var kt = null,
    jt = null,
    De = !1,
    Ot = null;
  function Eu(e, t) {
    var n = Lt(5, null, null, 0);
    (n.elementType = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
  }
  function Nu(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          (t =
            t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (kt = e), (jt = wn(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (kt = e), (jt = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = Bn !== null ? { id: rn, overflow: ln } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824,
              }),
              (n = Lt(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (kt = e),
              (jt = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Hs(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Qs(e) {
    if (De) {
      var t = jt;
      if (t) {
        var n = t;
        if (!Nu(e, t)) {
          if (Hs(e)) throw Error(o(418));
          t = wn(n.nextSibling);
          var r = kt;
          t && Nu(e, t)
            ? Eu(r, n)
            : ((e.flags = (e.flags & -4097) | 2), (De = !1), (kt = e));
        }
      } else {
        if (Hs(e)) throw Error(o(418));
        (e.flags = (e.flags & -4097) | 2), (De = !1), (kt = e);
      }
    }
  }
  function _u(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
      e = e.return;
    kt = e;
  }
  function ti(e) {
    if (e !== kt) return !1;
    if (!De) return _u(e), (De = !0), !1;
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== "head" && t !== "body" && !Is(e.type, e.memoizedProps))),
      t && (t = jt))
    ) {
      if (Hs(e)) throw (Cu(), Error(o(418)));
      for (; t; ) Eu(e, t), (t = wn(t.nextSibling));
    }
    if ((_u(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                jt = wn(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          }
          e = e.nextSibling;
        }
        jt = null;
      }
    } else jt = kt ? wn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Cu() {
    for (var e = jt; e; ) e = wn(e.nextSibling);
  }
  function mr() {
    (jt = kt = null), (De = !1);
  }
  function Ks(e) {
    Ot === null ? (Ot = [e]) : Ot.push(e);
  }
  var mp = ae.ReactCurrentBatchConfig;
  function Jr(e, t, n) {
    if (
      ((e = n.ref),
      e !== null && typeof e != "function" && typeof e != "object")
    ) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(o(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(o(147, e));
        var i = r,
          s = "" + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == "function" &&
          t.ref._stringRef === s
          ? t.ref
          : ((t = function (c) {
              var h = i.refs;
              c === null ? delete h[s] : (h[s] = c);
            }),
            (t._stringRef = s),
            t);
      }
      if (typeof e != "string") throw Error(o(284));
      if (!n._owner) throw Error(o(290, e));
    }
    return e;
  }
  function ni(e, t) {
    throw (
      ((e = Object.prototype.toString.call(t)),
      Error(
        o(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      ))
    );
  }
  function Pu(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Ru(e) {
    function t(j, x) {
      if (e) {
        var E = j.deletions;
        E === null ? ((j.deletions = [x]), (j.flags |= 16)) : E.push(x);
      }
    }
    function n(j, x) {
      if (!e) return null;
      for (; x !== null; ) t(j, x), (x = x.sibling);
      return null;
    }
    function r(j, x) {
      for (j = new Map(); x !== null; )
        x.key !== null ? j.set(x.key, x) : j.set(x.index, x), (x = x.sibling);
      return j;
    }
    function i(j, x) {
      return (j = Tn(j, x)), (j.index = 0), (j.sibling = null), j;
    }
    function s(j, x, E) {
      return (
        (j.index = E),
        e
          ? ((E = j.alternate),
            E !== null
              ? ((E = E.index), E < x ? ((j.flags |= 2), x) : E)
              : ((j.flags |= 2), x))
          : ((j.flags |= 1048576), x)
      );
    }
    function c(j) {
      return e && j.alternate === null && (j.flags |= 2), j;
    }
    function h(j, x, E, B) {
      return x === null || x.tag !== 6
        ? ((x = Mo(E, j.mode, B)), (x.return = j), x)
        : ((x = i(x, E)), (x.return = j), x);
    }
    function v(j, x, E, B) {
      var b = E.type;
      return b === _e
        ? A(j, x, E.props.children, B, E.key)
        : x !== null &&
            (x.elementType === b ||
              (typeof b == "object" &&
                b !== null &&
                b.$$typeof === Le &&
                Pu(b) === x.type))
          ? ((B = i(x, E.props)), (B.ref = Jr(j, x, E)), (B.return = j), B)
          : ((B = _i(E.type, E.key, E.props, null, j.mode, B)),
            (B.ref = Jr(j, x, E)),
            (B.return = j),
            B);
    }
    function C(j, x, E, B) {
      return x === null ||
        x.tag !== 4 ||
        x.stateNode.containerInfo !== E.containerInfo ||
        x.stateNode.implementation !== E.implementation
        ? ((x = $o(E, j.mode, B)), (x.return = j), x)
        : ((x = i(x, E.children || [])), (x.return = j), x);
    }
    function A(j, x, E, B, b) {
      return x === null || x.tag !== 7
        ? ((x = Jn(E, j.mode, B, b)), (x.return = j), x)
        : ((x = i(x, E)), (x.return = j), x);
    }
    function V(j, x, E) {
      if ((typeof x == "string" && x !== "") || typeof x == "number")
        return (x = Mo("" + x, j.mode, E)), (x.return = j), x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case oe:
            return (
              (E = _i(x.type, x.key, x.props, null, j.mode, E)),
              (E.ref = Jr(j, null, x)),
              (E.return = j),
              E
            );
          case ke:
            return (x = $o(x, j.mode, E)), (x.return = j), x;
          case Le:
            var B = x._init;
            return V(j, B(x._payload), E);
        }
        if (T(x) || ee(x))
          return (x = Jn(x, j.mode, E, null)), (x.return = j), x;
        ni(j, x);
      }
      return null;
    }
    function I(j, x, E, B) {
      var b = x !== null ? x.key : null;
      if ((typeof E == "string" && E !== "") || typeof E == "number")
        return b !== null ? null : h(j, x, "" + E, B);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case oe:
            return E.key === b ? v(j, x, E, B) : null;
          case ke:
            return E.key === b ? C(j, x, E, B) : null;
          case Le:
            return (b = E._init), I(j, x, b(E._payload), B);
        }
        if (T(E) || ee(E)) return b !== null ? null : A(j, x, E, B, null);
        ni(j, E);
      }
      return null;
    }
    function q(j, x, E, B, b) {
      if ((typeof B == "string" && B !== "") || typeof B == "number")
        return (j = j.get(E) || null), h(x, j, "" + B, b);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case oe:
            return (
              (j = j.get(B.key === null ? E : B.key) || null), v(x, j, B, b)
            );
          case ke:
            return (
              (j = j.get(B.key === null ? E : B.key) || null), C(x, j, B, b)
            );
          case Le:
            var ne = B._init;
            return q(j, x, E, ne(B._payload), b);
        }
        if (T(B) || ee(B)) return (j = j.get(E) || null), A(x, j, B, b, null);
        ni(x, B);
      }
      return null;
    }
    function G(j, x, E, B) {
      for (
        var b = null, ne = null, re = x, se = (x = 0), et = null;
        re !== null && se < E.length;
        se++
      ) {
        re.index > se ? ((et = re), (re = null)) : (et = re.sibling);
        var xe = I(j, re, E[se], B);
        if (xe === null) {
          re === null && (re = et);
          break;
        }
        e && re && xe.alternate === null && t(j, re),
          (x = s(xe, x, se)),
          ne === null ? (b = xe) : (ne.sibling = xe),
          (ne = xe),
          (re = et);
      }
      if (se === E.length) return n(j, re), De && Wn(j, se), b;
      if (re === null) {
        for (; se < E.length; se++)
          (re = V(j, E[se], B)),
            re !== null &&
              ((x = s(re, x, se)),
              ne === null ? (b = re) : (ne.sibling = re),
              (ne = re));
        return De && Wn(j, se), b;
      }
      for (re = r(j, re); se < E.length; se++)
        (et = q(re, j, se, E[se], B)),
          et !== null &&
            (e &&
              et.alternate !== null &&
              re.delete(et.key === null ? se : et.key),
            (x = s(et, x, se)),
            ne === null ? (b = et) : (ne.sibling = et),
            (ne = et));
      return (
        e &&
          re.forEach(function (Fn) {
            return t(j, Fn);
          }),
        De && Wn(j, se),
        b
      );
    }
    function Z(j, x, E, B) {
      var b = ee(E);
      if (typeof b != "function") throw Error(o(150));
      if (((E = b.call(E)), E == null)) throw Error(o(151));
      for (
        var ne = (b = null), re = x, se = (x = 0), et = null, xe = E.next();
        re !== null && !xe.done;
        se++, xe = E.next()
      ) {
        re.index > se ? ((et = re), (re = null)) : (et = re.sibling);
        var Fn = I(j, re, xe.value, B);
        if (Fn === null) {
          re === null && (re = et);
          break;
        }
        e && re && Fn.alternate === null && t(j, re),
          (x = s(Fn, x, se)),
          ne === null ? (b = Fn) : (ne.sibling = Fn),
          (ne = Fn),
          (re = et);
      }
      if (xe.done) return n(j, re), De && Wn(j, se), b;
      if (re === null) {
        for (; !xe.done; se++, xe = E.next())
          (xe = V(j, xe.value, B)),
            xe !== null &&
              ((x = s(xe, x, se)),
              ne === null ? (b = xe) : (ne.sibling = xe),
              (ne = xe));
        return De && Wn(j, se), b;
      }
      for (re = r(j, re); !xe.done; se++, xe = E.next())
        (xe = q(re, j, se, xe.value, B)),
          xe !== null &&
            (e &&
              xe.alternate !== null &&
              re.delete(xe.key === null ? se : xe.key),
            (x = s(xe, x, se)),
            ne === null ? (b = xe) : (ne.sibling = xe),
            (ne = xe));
      return (
        e &&
          re.forEach(function (Yp) {
            return t(j, Yp);
          }),
        De && Wn(j, se),
        b
      );
    }
    function We(j, x, E, B) {
      if (
        (typeof E == "object" &&
          E !== null &&
          E.type === _e &&
          E.key === null &&
          (E = E.props.children),
        typeof E == "object" && E !== null)
      ) {
        switch (E.$$typeof) {
          case oe:
            e: {
              for (var b = E.key, ne = x; ne !== null; ) {
                if (ne.key === b) {
                  if (((b = E.type), b === _e)) {
                    if (ne.tag === 7) {
                      n(j, ne.sibling),
                        (x = i(ne, E.props.children)),
                        (x.return = j),
                        (j = x);
                      break e;
                    }
                  } else if (
                    ne.elementType === b ||
                    (typeof b == "object" &&
                      b !== null &&
                      b.$$typeof === Le &&
                      Pu(b) === ne.type)
                  ) {
                    n(j, ne.sibling),
                      (x = i(ne, E.props)),
                      (x.ref = Jr(j, ne, E)),
                      (x.return = j),
                      (j = x);
                    break e;
                  }
                  n(j, ne);
                  break;
                } else t(j, ne);
                ne = ne.sibling;
              }
              E.type === _e
                ? ((x = Jn(E.props.children, j.mode, B, E.key)),
                  (x.return = j),
                  (j = x))
                : ((B = _i(E.type, E.key, E.props, null, j.mode, B)),
                  (B.ref = Jr(j, x, E)),
                  (B.return = j),
                  (j = B));
            }
            return c(j);
          case ke:
            e: {
              for (ne = E.key; x !== null; ) {
                if (x.key === ne)
                  if (
                    x.tag === 4 &&
                    x.stateNode.containerInfo === E.containerInfo &&
                    x.stateNode.implementation === E.implementation
                  ) {
                    n(j, x.sibling),
                      (x = i(x, E.children || [])),
                      (x.return = j),
                      (j = x);
                    break e;
                  } else {
                    n(j, x);
                    break;
                  }
                else t(j, x);
                x = x.sibling;
              }
              (x = $o(E, j.mode, B)), (x.return = j), (j = x);
            }
            return c(j);
          case Le:
            return (ne = E._init), We(j, x, ne(E._payload), B);
        }
        if (T(E)) return G(j, x, E, B);
        if (ee(E)) return Z(j, x, E, B);
        ni(j, E);
      }
      return (typeof E == "string" && E !== "") || typeof E == "number"
        ? ((E = "" + E),
          x !== null && x.tag === 6
            ? (n(j, x.sibling), (x = i(x, E)), (x.return = j), (j = x))
            : (n(j, x), (x = Mo(E, j.mode, B)), (x.return = j), (j = x)),
          c(j))
        : n(j, x);
    }
    return We;
  }
  var vr = Ru(!0),
    Lu = Ru(!1),
    ri = Sn(null),
    li = null,
    gr = null,
    Ys = null;
  function qs() {
    Ys = gr = li = null;
  }
  function Xs(e) {
    var t = ri.current;
    ze(ri), (e._currentValue = t);
  }
  function Gs(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function yr(e, t) {
    (li = e),
      (Ys = gr = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        (e.lanes & t && (mt = !0), (e.firstContext = null));
  }
  function Ct(e) {
    var t = e._currentValue;
    if (Ys !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), gr === null)) {
        if (li === null) throw Error(o(308));
        (gr = e), (li.dependencies = { lanes: 0, firstContext: e });
      } else gr = gr.next = e;
    return t;
  }
  var Hn = null;
  function Js(e) {
    Hn === null ? (Hn = [e]) : Hn.push(e);
  }
  function Tu(e, t, n, r) {
    var i = t.interleaved;
    return (
      i === null ? ((n.next = n), Js(t)) : ((n.next = i.next), (i.next = n)),
      (t.interleaved = n),
      sn(e, r)
    );
  }
  function sn(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      (e.childLanes |= t),
        (n = e.alternate),
        n !== null && (n.childLanes |= t),
        (n = e),
        (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
  }
  var En = !1;
  function Zs(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function Fu(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        });
  }
  function on(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function Nn(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), ye & 2)) {
      var i = r.pending;
      return (
        i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
        (r.pending = t),
        sn(e, n)
      );
    }
    return (
      (i = r.interleaved),
      i === null ? ((t.next = t), Js(r)) : ((t.next = i.next), (i.next = t)),
      (r.interleaved = t),
      sn(e, n)
    );
  }
  function ii(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
      var r = t.lanes;
      (r &= e.pendingLanes), (n |= r), (t.lanes = n), fs(e, n);
    }
  }
  function zu(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var i = null,
        s = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var c = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null,
          };
          s === null ? (i = s = c) : (s = s.next = c), (n = n.next);
        } while (n !== null);
        s === null ? (i = s = t) : (s = s.next = t);
      } else i = s = t;
      (n = {
        baseState: r.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: s,
        shared: r.shared,
        effects: r.effects,
      }),
        (e.updateQueue = n);
      return;
    }
    (e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t);
  }
  function si(e, t, n, r) {
    var i = e.updateQueue;
    En = !1;
    var s = i.firstBaseUpdate,
      c = i.lastBaseUpdate,
      h = i.shared.pending;
    if (h !== null) {
      i.shared.pending = null;
      var v = h,
        C = v.next;
      (v.next = null), c === null ? (s = C) : (c.next = C), (c = v);
      var A = e.alternate;
      A !== null &&
        ((A = A.updateQueue),
        (h = A.lastBaseUpdate),
        h !== c &&
          (h === null ? (A.firstBaseUpdate = C) : (h.next = C),
          (A.lastBaseUpdate = v)));
    }
    if (s !== null) {
      var V = i.baseState;
      (c = 0), (A = C = v = null), (h = s);
      do {
        var I = h.lane,
          q = h.eventTime;
        if ((r & I) === I) {
          A !== null &&
            (A = A.next =
              {
                eventTime: q,
                lane: 0,
                tag: h.tag,
                payload: h.payload,
                callback: h.callback,
                next: null,
              });
          e: {
            var G = e,
              Z = h;
            switch (((I = t), (q = n), Z.tag)) {
              case 1:
                if (((G = Z.payload), typeof G == "function")) {
                  V = G.call(q, V, I);
                  break e;
                }
                V = G;
                break e;
              case 3:
                G.flags = (G.flags & -65537) | 128;
              case 0:
                if (
                  ((G = Z.payload),
                  (I = typeof G == "function" ? G.call(q, V, I) : G),
                  I == null)
                )
                  break e;
                V = Y({}, V, I);
                break e;
              case 2:
                En = !0;
            }
          }
          h.callback !== null &&
            h.lane !== 0 &&
            ((e.flags |= 64),
            (I = i.effects),
            I === null ? (i.effects = [h]) : I.push(h));
        } else
          (q = {
            eventTime: q,
            lane: I,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null,
          }),
            A === null ? ((C = A = q), (v = V)) : (A = A.next = q),
            (c |= I);
        if (((h = h.next), h === null)) {
          if (((h = i.shared.pending), h === null)) break;
          (I = h),
            (h = I.next),
            (I.next = null),
            (i.lastBaseUpdate = I),
            (i.shared.pending = null);
        }
      } while (!0);
      if (
        (A === null && (v = V),
        (i.baseState = v),
        (i.firstBaseUpdate = C),
        (i.lastBaseUpdate = A),
        (t = i.shared.interleaved),
        t !== null)
      ) {
        i = t;
        do (c |= i.lane), (i = i.next);
        while (i !== t);
      } else s === null && (i.shared.lanes = 0);
      (Yn |= c), (e.lanes = c), (e.memoizedState = V);
    }
  }
  function Ou(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          i = r.callback;
        if (i !== null) {
          if (((r.callback = null), (r = n), typeof i != "function"))
            throw Error(o(191, i));
          i.call(r);
        }
      }
  }
  var Zr = {},
    Ht = Sn(Zr),
    br = Sn(Zr),
    el = Sn(Zr);
  function Qn(e) {
    if (e === Zr) throw Error(o(174));
    return e;
  }
  function bs(e, t) {
    switch ((Te(el, t), Te(br, e), Te(Ht, Zr), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : $e(null, "");
        break;
      default:
        (e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = $e(t, e));
    }
    ze(Ht), Te(Ht, t);
  }
  function xr() {
    ze(Ht), ze(br), ze(el);
  }
  function Du(e) {
    Qn(el.current);
    var t = Qn(Ht.current),
      n = $e(t, e.type);
    t !== n && (Te(br, e), Te(Ht, n));
  }
  function eo(e) {
    br.current === e && (ze(Ht), ze(br));
  }
  var Ie = Sn(0);
  function oi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if (t.flags & 128) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  var to = [];
  function no() {
    for (var e = 0; e < to.length; e++)
      to[e]._workInProgressVersionPrimary = null;
    to.length = 0;
  }
  var ai = ae.ReactCurrentDispatcher,
    ro = ae.ReactCurrentBatchConfig,
    Kn = 0,
    Ae = null,
    Ye = null,
    Ze = null,
    ui = !1,
    tl = !1,
    nl = 0,
    vp = 0;
  function it() {
    throw Error(o(321));
  }
  function lo(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!zt(e[n], t[n])) return !1;
    return !0;
  }
  function io(e, t, n, r, i, s) {
    if (
      ((Kn = s),
      (Ae = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (ai.current = e === null || e.memoizedState === null ? wp : Sp),
      (e = n(r, i)),
      tl)
    ) {
      s = 0;
      do {
        if (((tl = !1), (nl = 0), 25 <= s)) throw Error(o(301));
        (s += 1),
          (Ze = Ye = null),
          (t.updateQueue = null),
          (ai.current = kp),
          (e = n(r, i));
      } while (tl);
    }
    if (
      ((ai.current = fi),
      (t = Ye !== null && Ye.next !== null),
      (Kn = 0),
      (Ze = Ye = Ae = null),
      (ui = !1),
      t)
    )
      throw Error(o(300));
    return e;
  }
  function so() {
    var e = nl !== 0;
    return (nl = 0), e;
  }
  function Qt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Ze === null ? (Ae.memoizedState = Ze = e) : (Ze = Ze.next = e), Ze;
  }
  function Pt() {
    if (Ye === null) {
      var e = Ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ye.next;
    var t = Ze === null ? Ae.memoizedState : Ze.next;
    if (t !== null) (Ze = t), (Ye = e);
    else {
      if (e === null) throw Error(o(310));
      (Ye = e),
        (e = {
          memoizedState: Ye.memoizedState,
          baseState: Ye.baseState,
          baseQueue: Ye.baseQueue,
          queue: Ye.queue,
          next: null,
        }),
        Ze === null ? (Ae.memoizedState = Ze = e) : (Ze = Ze.next = e);
    }
    return Ze;
  }
  function rl(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function oo(e) {
    var t = Pt(),
      n = t.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = e;
    var r = Ye,
      i = r.baseQueue,
      s = n.pending;
    if (s !== null) {
      if (i !== null) {
        var c = i.next;
        (i.next = s.next), (s.next = c);
      }
      (r.baseQueue = i = s), (n.pending = null);
    }
    if (i !== null) {
      (s = i.next), (r = r.baseState);
      var h = (c = null),
        v = null,
        C = s;
      do {
        var A = C.lane;
        if ((Kn & A) === A)
          v !== null &&
            (v = v.next =
              {
                lane: 0,
                action: C.action,
                hasEagerState: C.hasEagerState,
                eagerState: C.eagerState,
                next: null,
              }),
            (r = C.hasEagerState ? C.eagerState : e(r, C.action));
        else {
          var V = {
            lane: A,
            action: C.action,
            hasEagerState: C.hasEagerState,
            eagerState: C.eagerState,
            next: null,
          };
          v === null ? ((h = v = V), (c = r)) : (v = v.next = V),
            (Ae.lanes |= A),
            (Yn |= A);
        }
        C = C.next;
      } while (C !== null && C !== s);
      v === null ? (c = r) : (v.next = h),
        zt(r, t.memoizedState) || (mt = !0),
        (t.memoizedState = r),
        (t.baseState = c),
        (t.baseQueue = v),
        (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
      i = e;
      do (s = i.lane), (Ae.lanes |= s), (Yn |= s), (i = i.next);
      while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function ao(e) {
    var t = Pt(),
      n = t.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      i = n.pending,
      s = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var c = (i = i.next);
      do (s = e(s, c.action)), (c = c.next);
      while (c !== i);
      zt(s, t.memoizedState) || (mt = !0),
        (t.memoizedState = s),
        t.baseQueue === null && (t.baseState = s),
        (n.lastRenderedState = s);
    }
    return [s, r];
  }
  function Iu() {}
  function Au(e, t) {
    var n = Ae,
      r = Pt(),
      i = t(),
      s = !zt(r.memoizedState, i);
    if (
      (s && ((r.memoizedState = i), (mt = !0)),
      (r = r.queue),
      uo(Vu.bind(null, n, r, e), [e]),
      r.getSnapshot !== t || s || (Ze !== null && Ze.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        ll(9, $u.bind(null, n, r, i, t), void 0, null),
        be === null)
      )
        throw Error(o(349));
      Kn & 30 || Mu(n, t, i);
    }
    return i;
  }
  function Mu(e, t, n) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = Ae.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (Ae.updateQueue = t),
          (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
  }
  function $u(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), Uu(t) && Bu(e);
  }
  function Vu(e, t, n) {
    return n(function () {
      Uu(t) && Bu(e);
    });
  }
  function Uu(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !zt(e, n);
    } catch {
      return !0;
    }
  }
  function Bu(e) {
    var t = sn(e, 1);
    t !== null && Mt(t, e, 1, -1);
  }
  function Wu(e) {
    var t = Qt();
    return (
      typeof e == "function" && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: rl,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = xp.bind(null, Ae, e)),
      [t.memoizedState, e]
    );
  }
  function ll(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      (t = Ae.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (Ae.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
      e
    );
  }
  function Hu() {
    return Pt().memoizedState;
  }
  function ci(e, t, n, r) {
    var i = Qt();
    (Ae.flags |= e),
      (i.memoizedState = ll(1 | t, n, void 0, r === void 0 ? null : r));
  }
  function di(e, t, n, r) {
    var i = Pt();
    r = r === void 0 ? null : r;
    var s = void 0;
    if (Ye !== null) {
      var c = Ye.memoizedState;
      if (((s = c.destroy), r !== null && lo(r, c.deps))) {
        i.memoizedState = ll(t, n, s, r);
        return;
      }
    }
    (Ae.flags |= e), (i.memoizedState = ll(1 | t, n, s, r));
  }
  function Qu(e, t) {
    return ci(8390656, 8, e, t);
  }
  function uo(e, t) {
    return di(2048, 8, e, t);
  }
  function Ku(e, t) {
    return di(4, 2, e, t);
  }
  function Yu(e, t) {
    return di(4, 4, e, t);
  }
  function qu(e, t) {
    if (typeof t == "function")
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Xu(e, t, n) {
    return (
      (n = n != null ? n.concat([e]) : null), di(4, 4, qu.bind(null, t, e), n)
    );
  }
  function co() {}
  function Gu(e, t) {
    var n = Pt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && lo(t, r[1])
      ? r[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function Ju(e, t) {
    var n = Pt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && lo(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function Zu(e, t, n) {
    return Kn & 21
      ? (zt(n, t) ||
          ((n = Pa()), (Ae.lanes |= n), (Yn |= n), (e.baseState = !0)),
        t)
      : (e.baseState && ((e.baseState = !1), (mt = !0)), (e.memoizedState = n));
  }
  function gp(e, t) {
    var n = Ne;
    (Ne = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = ro.transition;
    ro.transition = {};
    try {
      e(!1), t();
    } finally {
      (Ne = n), (ro.transition = r);
    }
  }
  function bu() {
    return Pt().memoizedState;
  }
  function yp(e, t, n) {
    var r = Rn(e);
    if (
      ((n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ec(e))
    )
      tc(t, n);
    else if (((n = Tu(e, t, n, r)), n !== null)) {
      var i = dt();
      Mt(n, e, r, i), nc(n, t, r);
    }
  }
  function xp(e, t, n) {
    var r = Rn(e),
      i = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (ec(e)) tc(t, i);
    else {
      var s = e.alternate;
      if (
        e.lanes === 0 &&
        (s === null || s.lanes === 0) &&
        ((s = t.lastRenderedReducer), s !== null)
      )
        try {
          var c = t.lastRenderedState,
            h = s(c, n);
          if (((i.hasEagerState = !0), (i.eagerState = h), zt(h, c))) {
            var v = t.interleaved;
            v === null
              ? ((i.next = i), Js(t))
              : ((i.next = v.next), (v.next = i)),
              (t.interleaved = i);
            return;
          }
        } catch {
        } finally {
        }
      (n = Tu(e, t, i, r)),
        n !== null && ((i = dt()), Mt(n, e, r, i), nc(n, t, r));
    }
  }
  function ec(e) {
    var t = e.alternate;
    return e === Ae || (t !== null && t === Ae);
  }
  function tc(e, t) {
    tl = ui = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t);
  }
  function nc(e, t, n) {
    if (n & 4194240) {
      var r = t.lanes;
      (r &= e.pendingLanes), (n |= r), (t.lanes = n), fs(e, n);
    }
  }
  var fi = {
      readContext: Ct,
      useCallback: it,
      useContext: it,
      useEffect: it,
      useImperativeHandle: it,
      useInsertionEffect: it,
      useLayoutEffect: it,
      useMemo: it,
      useReducer: it,
      useRef: it,
      useState: it,
      useDebugValue: it,
      useDeferredValue: it,
      useTransition: it,
      useMutableSource: it,
      useSyncExternalStore: it,
      useId: it,
      unstable_isNewReconciler: !1,
    },
    wp = {
      readContext: Ct,
      useCallback: function (e, t) {
        return (Qt().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: Ct,
      useEffect: Qu,
      useImperativeHandle: function (e, t, n) {
        return (
          (n = n != null ? n.concat([e]) : null),
          ci(4194308, 4, qu.bind(null, t, e), n)
        );
      },
      useLayoutEffect: function (e, t) {
        return ci(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return ci(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = Qt();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (n.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, n) {
        var r = Qt();
        return (
          (t = n !== void 0 ? n(t) : t),
          (r.memoizedState = r.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (r.queue = e),
          (e = e.dispatch = yp.bind(null, Ae, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Qt();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: Wu,
      useDebugValue: co,
      useDeferredValue: function (e) {
        return (Qt().memoizedState = e);
      },
      useTransition: function () {
        var e = Wu(!1),
          t = e[0];
        return (e = gp.bind(null, e[1])), (Qt().memoizedState = e), [t, e];
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = Ae,
          i = Qt();
        if (De) {
          if (n === void 0) throw Error(o(407));
          n = n();
        } else {
          if (((n = t()), be === null)) throw Error(o(349));
          Kn & 30 || Mu(r, t, n);
        }
        i.memoizedState = n;
        var s = { value: n, getSnapshot: t };
        return (
          (i.queue = s),
          Qu(Vu.bind(null, r, s, e), [e]),
          (r.flags |= 2048),
          ll(9, $u.bind(null, r, s, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = Qt(),
          t = be.identifierPrefix;
        if (De) {
          var n = ln,
            r = rn;
          (n = (r & ~(1 << (32 - Ft(r) - 1))).toString(32) + n),
            (t = ":" + t + "R" + n),
            (n = nl++),
            0 < n && (t += "H" + n.toString(32)),
            (t += ":");
        } else (n = vp++), (t = ":" + t + "r" + n.toString(32) + ":");
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    Sp = {
      readContext: Ct,
      useCallback: Gu,
      useContext: Ct,
      useEffect: uo,
      useImperativeHandle: Xu,
      useInsertionEffect: Ku,
      useLayoutEffect: Yu,
      useMemo: Ju,
      useReducer: oo,
      useRef: Hu,
      useState: function () {
        return oo(rl);
      },
      useDebugValue: co,
      useDeferredValue: function (e) {
        var t = Pt();
        return Zu(t, Ye.memoizedState, e);
      },
      useTransition: function () {
        var e = oo(rl)[0],
          t = Pt().memoizedState;
        return [e, t];
      },
      useMutableSource: Iu,
      useSyncExternalStore: Au,
      useId: bu,
      unstable_isNewReconciler: !1,
    },
    kp = {
      readContext: Ct,
      useCallback: Gu,
      useContext: Ct,
      useEffect: uo,
      useImperativeHandle: Xu,
      useInsertionEffect: Ku,
      useLayoutEffect: Yu,
      useMemo: Ju,
      useReducer: ao,
      useRef: Hu,
      useState: function () {
        return ao(rl);
      },
      useDebugValue: co,
      useDeferredValue: function (e) {
        var t = Pt();
        return Ye === null ? (t.memoizedState = e) : Zu(t, Ye.memoizedState, e);
      },
      useTransition: function () {
        var e = ao(rl)[0],
          t = Pt().memoizedState;
        return [e, t];
      },
      useMutableSource: Iu,
      useSyncExternalStore: Au,
      useId: bu,
      unstable_isNewReconciler: !1,
    };
  function Dt(e, t) {
    if (e && e.defaultProps) {
      (t = Y({}, t)), (e = e.defaultProps);
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function fo(e, t, n, r) {
    (t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : Y({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var pi = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? $n(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = dt(),
        i = Rn(e),
        s = on(r, i);
      (s.payload = t),
        n != null && (s.callback = n),
        (t = Nn(e, s, i)),
        t !== null && (Mt(t, e, i, r), ii(t, e, i));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = dt(),
        i = Rn(e),
        s = on(r, i);
      (s.tag = 1),
        (s.payload = t),
        n != null && (s.callback = n),
        (t = Nn(e, s, i)),
        t !== null && (Mt(t, e, i, r), ii(t, e, i));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = dt(),
        r = Rn(e),
        i = on(n, r);
      (i.tag = 2),
        t != null && (i.callback = t),
        (t = Nn(e, i, r)),
        t !== null && (Mt(t, e, r, n), ii(t, e, r));
    },
  };
  function rc(e, t, n, r, i, s, c) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(r, s, c)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Hr(n, r) || !Hr(i, s)
          : !0
    );
  }
  function lc(e, t, n) {
    var r = !1,
      i = kn,
      s = t.contextType;
    return (
      typeof s == "object" && s !== null
        ? (s = Ct(s))
        : ((i = ht(t) ? Un : lt.current),
          (r = t.contextTypes),
          (s = (r = r != null) ? fr(e, i) : kn)),
      (t = new t(n, s)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = pi),
      (e.stateNode = t),
      (t._reactInternals = e),
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = i),
        (e.__reactInternalMemoizedMaskedChildContext = s)),
      t
    );
  }
  function ic(e, t, n, r) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && pi.enqueueReplaceState(t, t.state, null);
  }
  function po(e, t, n, r) {
    var i = e.stateNode;
    (i.props = n), (i.state = e.memoizedState), (i.refs = {}), Zs(e);
    var s = t.contextType;
    typeof s == "object" && s !== null
      ? (i.context = Ct(s))
      : ((s = ht(t) ? Un : lt.current), (i.context = fr(e, s))),
      (i.state = e.memoizedState),
      (s = t.getDerivedStateFromProps),
      typeof s == "function" && (fo(e, t, s, n), (i.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function" ||
        (typeof i.UNSAFE_componentWillMount != "function" &&
          typeof i.componentWillMount != "function") ||
        ((t = i.state),
        typeof i.componentWillMount == "function" && i.componentWillMount(),
        typeof i.UNSAFE_componentWillMount == "function" &&
          i.UNSAFE_componentWillMount(),
        t !== i.state && pi.enqueueReplaceState(i, i.state, null),
        si(e, n, i, r),
        (i.state = e.memoizedState)),
      typeof i.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function wr(e, t) {
    try {
      var n = "",
        r = t;
      do (n += ve(r)), (r = r.return);
      while (r);
      var i = n;
    } catch (s) {
      i =
        `
Error generating stack: ` +
        s.message +
        `
` +
        s.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
  }
  function ho(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function mo(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var jp = typeof WeakMap == "function" ? WeakMap : Map;
  function sc(e, t, n) {
    (n = on(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
      (n.callback = function () {
        wi || ((wi = !0), (Lo = r)), mo(e, t);
      }),
      n
    );
  }
  function oc(e, t, n) {
    (n = on(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      (n.payload = function () {
        return r(i);
      }),
        (n.callback = function () {
          mo(e, t);
        });
    }
    var s = e.stateNode;
    return (
      s !== null &&
        typeof s.componentDidCatch == "function" &&
        (n.callback = function () {
          mo(e, t),
            typeof r != "function" &&
              (Cn === null ? (Cn = new Set([this])) : Cn.add(this));
          var c = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: c !== null ? c : "",
          });
        }),
      n
    );
  }
  function ac(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new jp();
      var i = new Set();
      r.set(t, i);
    } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
    i.has(n) || (i.add(n), (e = Ap.bind(null, e, t, n)), t.then(e, e));
  }
  function uc(e) {
    do {
      var t;
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState),
          (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function cc(e, t, n, r, i) {
    return e.mode & 1
      ? ((e.flags |= 65536), (e.lanes = i), e)
      : (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 &&
              (n.alternate === null
                ? (n.tag = 17)
                : ((t = on(-1, 1)), (t.tag = 2), Nn(n, t, 1))),
            (n.lanes |= 1)),
        e);
  }
  var Ep = ae.ReactCurrentOwner,
    mt = !1;
  function ct(e, t, n, r) {
    t.child = e === null ? Lu(t, null, n, r) : vr(t, e.child, n, r);
  }
  function dc(e, t, n, r, i) {
    n = n.render;
    var s = t.ref;
    return (
      yr(t, i),
      (r = io(e, t, n, r, s, i)),
      (n = so()),
      e !== null && !mt
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~i),
          an(e, t, i))
        : (De && n && Bs(t), (t.flags |= 1), ct(e, t, r, i), t.child)
    );
  }
  function fc(e, t, n, r, i) {
    if (e === null) {
      var s = n.type;
      return typeof s == "function" &&
        !Ao(s) &&
        s.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = s), pc(e, t, s, r, i))
        : ((e = _i(n.type, null, r, t, t.mode, i)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((s = e.child), !(e.lanes & i))) {
      var c = s.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Hr), n(c, r) && e.ref === t.ref)
      )
        return an(e, t, i);
    }
    return (
      (t.flags |= 1),
      (e = Tn(s, r)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function pc(e, t, n, r, i) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (Hr(s, r) && e.ref === t.ref)
        if (((mt = !1), (t.pendingProps = r = s), (e.lanes & i) !== 0))
          e.flags & 131072 && (mt = !0);
        else return (t.lanes = e.lanes), an(e, t, i);
    }
    return vo(e, t, n, r, i);
  }
  function hc(e, t, n) {
    var r = t.pendingProps,
      i = r.children,
      s = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
      if (!(t.mode & 1))
        (t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          Te(kr, Et),
          (Et |= n);
      else {
        if (!(n & 1073741824))
          return (
            (e = s !== null ? s.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            Te(kr, Et),
            (Et |= e),
            null
          );
        (t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (r = s !== null ? s.baseLanes : n),
          Te(kr, Et),
          (Et |= r);
      }
    else
      s !== null ? ((r = s.baseLanes | n), (t.memoizedState = null)) : (r = n),
        Te(kr, Et),
        (Et |= r);
    return ct(e, t, i, n), t.child;
  }
  function mc(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function vo(e, t, n, r, i) {
    var s = ht(n) ? Un : lt.current;
    return (
      (s = fr(t, s)),
      yr(t, i),
      (n = io(e, t, n, r, s, i)),
      (r = so()),
      e !== null && !mt
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~i),
          an(e, t, i))
        : (De && r && Bs(t), (t.flags |= 1), ct(e, t, n, i), t.child)
    );
  }
  function vc(e, t, n, r, i) {
    if (ht(n)) {
      var s = !0;
      Jl(t);
    } else s = !1;
    if ((yr(t, i), t.stateNode === null))
      mi(e, t), lc(t, n, r), po(t, n, r, i), (r = !0);
    else if (e === null) {
      var c = t.stateNode,
        h = t.memoizedProps;
      c.props = h;
      var v = c.context,
        C = n.contextType;
      typeof C == "object" && C !== null
        ? (C = Ct(C))
        : ((C = ht(n) ? Un : lt.current), (C = fr(t, C)));
      var A = n.getDerivedStateFromProps,
        V =
          typeof A == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function";
      V ||
        (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
          typeof c.componentWillReceiveProps != "function") ||
        ((h !== r || v !== C) && ic(t, c, r, C)),
        (En = !1);
      var I = t.memoizedState;
      (c.state = I),
        si(t, r, c, i),
        (v = t.memoizedState),
        h !== r || I !== v || pt.current || En
          ? (typeof A == "function" && (fo(t, n, A, r), (v = t.memoizedState)),
            (h = En || rc(t, n, h, r, I, v, C))
              ? (V ||
                  (typeof c.UNSAFE_componentWillMount != "function" &&
                    typeof c.componentWillMount != "function") ||
                  (typeof c.componentWillMount == "function" &&
                    c.componentWillMount(),
                  typeof c.UNSAFE_componentWillMount == "function" &&
                    c.UNSAFE_componentWillMount()),
                typeof c.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof c.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = v)),
            (c.props = r),
            (c.state = v),
            (c.context = C),
            (r = h))
          : (typeof c.componentDidMount == "function" && (t.flags |= 4194308),
            (r = !1));
    } else {
      (c = t.stateNode),
        Fu(e, t),
        (h = t.memoizedProps),
        (C = t.type === t.elementType ? h : Dt(t.type, h)),
        (c.props = C),
        (V = t.pendingProps),
        (I = c.context),
        (v = n.contextType),
        typeof v == "object" && v !== null
          ? (v = Ct(v))
          : ((v = ht(n) ? Un : lt.current), (v = fr(t, v)));
      var q = n.getDerivedStateFromProps;
      (A =
        typeof q == "function" ||
        typeof c.getSnapshotBeforeUpdate == "function") ||
        (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
          typeof c.componentWillReceiveProps != "function") ||
        ((h !== V || I !== v) && ic(t, c, r, v)),
        (En = !1),
        (I = t.memoizedState),
        (c.state = I),
        si(t, r, c, i);
      var G = t.memoizedState;
      h !== V || I !== G || pt.current || En
        ? (typeof q == "function" && (fo(t, n, q, r), (G = t.memoizedState)),
          (C = En || rc(t, n, C, r, I, G, v) || !1)
            ? (A ||
                (typeof c.UNSAFE_componentWillUpdate != "function" &&
                  typeof c.componentWillUpdate != "function") ||
                (typeof c.componentWillUpdate == "function" &&
                  c.componentWillUpdate(r, G, v),
                typeof c.UNSAFE_componentWillUpdate == "function" &&
                  c.UNSAFE_componentWillUpdate(r, G, v)),
              typeof c.componentDidUpdate == "function" && (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof c.componentDidUpdate != "function" ||
                (h === e.memoizedProps && I === e.memoizedState) ||
                (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != "function" ||
                (h === e.memoizedProps && I === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = G)),
          (c.props = r),
          (c.state = G),
          (c.context = v),
          (r = C))
        : (typeof c.componentDidUpdate != "function" ||
            (h === e.memoizedProps && I === e.memoizedState) ||
            (t.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != "function" ||
            (h === e.memoizedProps && I === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return go(e, t, n, r, s, i);
  }
  function go(e, t, n, r, i, s) {
    mc(e, t);
    var c = (t.flags & 128) !== 0;
    if (!r && !c) return i && Su(t, n, !1), an(e, t, s);
    (r = t.stateNode), (Ep.current = t);
    var h =
      c && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return (
      (t.flags |= 1),
      e !== null && c
        ? ((t.child = vr(t, e.child, null, s)), (t.child = vr(t, null, h, s)))
        : ct(e, t, h, s),
      (t.memoizedState = r.state),
      i && Su(t, n, !0),
      t.child
    );
  }
  function gc(e) {
    var t = e.stateNode;
    t.pendingContext
      ? xu(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && xu(e, t.context, !1),
      bs(e, t.containerInfo);
  }
  function yc(e, t, n, r, i) {
    return mr(), Ks(i), (t.flags |= 256), ct(e, t, n, r), t.child;
  }
  var yo = { dehydrated: null, treeContext: null, retryLane: 0 };
  function xo(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function xc(e, t, n) {
    var r = t.pendingProps,
      i = Ie.current,
      s = !1,
      c = (t.flags & 128) !== 0,
      h;
    if (
      ((h = c) ||
        (h = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
      h
        ? ((s = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (i |= 1),
      Te(Ie, i & 1),
      e === null)
    )
      return (
        Qs(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? (t.mode & 1
              ? e.data === "$!"
                ? (t.lanes = 8)
                : (t.lanes = 1073741824)
              : (t.lanes = 1),
            null)
          : ((c = r.children),
            (e = r.fallback),
            s
              ? ((r = t.mode),
                (s = t.child),
                (c = { mode: "hidden", children: c }),
                !(r & 1) && s !== null
                  ? ((s.childLanes = 0), (s.pendingProps = c))
                  : (s = Ci(c, r, 0, null)),
                (e = Jn(e, r, n, null)),
                (s.return = t),
                (e.return = t),
                (s.sibling = e),
                (t.child = s),
                (t.child.memoizedState = xo(n)),
                (t.memoizedState = yo),
                e)
              : wo(t, c))
      );
    if (((i = e.memoizedState), i !== null && ((h = i.dehydrated), h !== null)))
      return Np(e, t, c, r, h, i, n);
    if (s) {
      (s = r.fallback), (c = t.mode), (i = e.child), (h = i.sibling);
      var v = { mode: "hidden", children: r.children };
      return (
        !(c & 1) && t.child !== i
          ? ((r = t.child),
            (r.childLanes = 0),
            (r.pendingProps = v),
            (t.deletions = null))
          : ((r = Tn(i, v)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
        h !== null ? (s = Tn(h, s)) : ((s = Jn(s, c, n, null)), (s.flags |= 2)),
        (s.return = t),
        (r.return = t),
        (r.sibling = s),
        (t.child = r),
        (r = s),
        (s = t.child),
        (c = e.child.memoizedState),
        (c =
          c === null
            ? xo(n)
            : {
                baseLanes: c.baseLanes | n,
                cachePool: null,
                transitions: c.transitions,
              }),
        (s.memoizedState = c),
        (s.childLanes = e.childLanes & ~n),
        (t.memoizedState = yo),
        r
      );
    }
    return (
      (s = e.child),
      (e = s.sibling),
      (r = Tn(s, { mode: "visible", children: r.children })),
      !(t.mode & 1) && (r.lanes = n),
      (r.return = t),
      (r.sibling = null),
      e !== null &&
        ((n = t.deletions),
        n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
      (t.child = r),
      (t.memoizedState = null),
      r
    );
  }
  function wo(e, t) {
    return (
      (t = Ci({ mode: "visible", children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function hi(e, t, n, r) {
    return (
      r !== null && Ks(r),
      vr(t, e.child, null, n),
      (e = wo(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Np(e, t, n, r, i, s, c) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (r = ho(Error(o(422)))), hi(e, t, c, r))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((s = r.fallback),
            (i = t.mode),
            (r = Ci({ mode: "visible", children: r.children }, i, 0, null)),
            (s = Jn(s, i, c, null)),
            (s.flags |= 2),
            (r.return = t),
            (s.return = t),
            (r.sibling = s),
            (t.child = r),
            t.mode & 1 && vr(t, e.child, null, c),
            (t.child.memoizedState = xo(c)),
            (t.memoizedState = yo),
            s);
    if (!(t.mode & 1)) return hi(e, t, c, null);
    if (i.data === "$!") {
      if (((r = i.nextSibling && i.nextSibling.dataset), r)) var h = r.dgst;
      return (
        (r = h), (s = Error(o(419))), (r = ho(s, r, void 0)), hi(e, t, c, r)
      );
    }
    if (((h = (c & e.childLanes) !== 0), mt || h)) {
      if (((r = be), r !== null)) {
        switch (c & -c) {
          case 4:
            i = 2;
            break;
          case 16:
            i = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            i = 32;
            break;
          case 536870912:
            i = 268435456;
            break;
          default:
            i = 0;
        }
        (i = i & (r.suspendedLanes | c) ? 0 : i),
          i !== 0 &&
            i !== s.retryLane &&
            ((s.retryLane = i), sn(e, i), Mt(r, e, i, -1));
      }
      return Io(), (r = ho(Error(o(421)))), hi(e, t, c, r);
    }
    return i.data === "$?"
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = Mp.bind(null, e)),
        (i._reactRetry = t),
        null)
      : ((e = s.treeContext),
        (jt = wn(i.nextSibling)),
        (kt = t),
        (De = !0),
        (Ot = null),
        e !== null &&
          ((Nt[_t++] = rn),
          (Nt[_t++] = ln),
          (Nt[_t++] = Bn),
          (rn = e.id),
          (ln = e.overflow),
          (Bn = t)),
        (t = wo(t, r.children)),
        (t.flags |= 4096),
        t);
  }
  function wc(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Gs(e.return, t, n);
  }
  function So(e, t, n, r, i) {
    var s = e.memoizedState;
    s === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailMode: i,
        })
      : ((s.isBackwards = t),
        (s.rendering = null),
        (s.renderingStartTime = 0),
        (s.last = r),
        (s.tail = n),
        (s.tailMode = i));
  }
  function Sc(e, t, n) {
    var r = t.pendingProps,
      i = r.revealOrder,
      s = r.tail;
    if ((ct(e, t, r.children, n), (r = Ie.current), r & 2))
      (r = (r & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && e.flags & 128)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && wc(e, n, t);
          else if (e.tag === 19) wc(e, n, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      r &= 1;
    }
    if ((Te(Ie, r), !(t.mode & 1))) t.memoizedState = null;
    else
      switch (i) {
        case "forwards":
          for (n = t.child, i = null; n !== null; )
            (e = n.alternate),
              e !== null && oi(e) === null && (i = n),
              (n = n.sibling);
          (n = i),
            n === null
              ? ((i = t.child), (t.child = null))
              : ((i = n.sibling), (n.sibling = null)),
            So(t, !1, i, n, s);
          break;
        case "backwards":
          for (n = null, i = t.child, t.child = null; i !== null; ) {
            if (((e = i.alternate), e !== null && oi(e) === null)) {
              t.child = i;
              break;
            }
            (e = i.sibling), (i.sibling = n), (n = i), (i = e);
          }
          So(t, !0, n, null, s);
          break;
        case "together":
          So(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function mi(e, t) {
    !(t.mode & 1) &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function an(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Yn |= t.lanes),
      !(n & t.childLanes))
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (
        e = t.child, n = Tn(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (n = n.sibling = Tn(e, e.pendingProps)),
          (n.return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function _p(e, t, n) {
    switch (t.tag) {
      case 3:
        gc(t), mr();
        break;
      case 5:
        Du(t);
        break;
      case 1:
        ht(t.type) && Jl(t);
        break;
      case 4:
        bs(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context,
          i = t.memoizedProps.value;
        Te(ri, r._currentValue), (r._currentValue = i);
        break;
      case 13:
        if (((r = t.memoizedState), r !== null))
          return r.dehydrated !== null
            ? (Te(Ie, Ie.current & 1), (t.flags |= 128), null)
            : n & t.child.childLanes
              ? xc(e, t, n)
              : (Te(Ie, Ie.current & 1),
                (e = an(e, t, n)),
                e !== null ? e.sibling : null);
        Te(Ie, Ie.current & 1);
        break;
      case 19:
        if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
          if (r) return Sc(e, t, n);
          t.flags |= 128;
        }
        if (
          ((i = t.memoizedState),
          i !== null &&
            ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
          Te(Ie, Ie.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), hc(e, t, n);
    }
    return an(e, t, n);
  }
  var kc, ko, jc, Ec;
  (kc = function (e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        (n.child.return = n), (n = n.child);
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      (n.sibling.return = n.return), (n = n.sibling);
    }
  }),
    (ko = function () {}),
    (jc = function (e, t, n, r) {
      var i = e.memoizedProps;
      if (i !== r) {
        (e = t.stateNode), Qn(Ht.current);
        var s = null;
        switch (n) {
          case "input":
            (i = er(e, i)), (r = er(e, r)), (s = []);
            break;
          case "select":
            (i = Y({}, i, { value: void 0 })),
              (r = Y({}, r, { value: void 0 })),
              (s = []);
            break;
          case "textarea":
            (i = H(e, i)), (r = H(e, r)), (s = []);
            break;
          default:
            typeof i.onClick != "function" &&
              typeof r.onClick == "function" &&
              (e.onclick = ql);
        }
        ts(n, r);
        var c;
        n = null;
        for (C in i)
          if (!r.hasOwnProperty(C) && i.hasOwnProperty(C) && i[C] != null)
            if (C === "style") {
              var h = i[C];
              for (c in h) h.hasOwnProperty(c) && (n || (n = {}), (n[c] = ""));
            } else
              C !== "dangerouslySetInnerHTML" &&
                C !== "children" &&
                C !== "suppressContentEditableWarning" &&
                C !== "suppressHydrationWarning" &&
                C !== "autoFocus" &&
                (f.hasOwnProperty(C)
                  ? s || (s = [])
                  : (s = s || []).push(C, null));
        for (C in r) {
          var v = r[C];
          if (
            ((h = i != null ? i[C] : void 0),
            r.hasOwnProperty(C) && v !== h && (v != null || h != null))
          )
            if (C === "style")
              if (h) {
                for (c in h)
                  !h.hasOwnProperty(c) ||
                    (v && v.hasOwnProperty(c)) ||
                    (n || (n = {}), (n[c] = ""));
                for (c in v)
                  v.hasOwnProperty(c) &&
                    h[c] !== v[c] &&
                    (n || (n = {}), (n[c] = v[c]));
              } else n || (s || (s = []), s.push(C, n)), (n = v);
            else
              C === "dangerouslySetInnerHTML"
                ? ((v = v ? v.__html : void 0),
                  (h = h ? h.__html : void 0),
                  v != null && h !== v && (s = s || []).push(C, v))
                : C === "children"
                  ? (typeof v != "string" && typeof v != "number") ||
                    (s = s || []).push(C, "" + v)
                  : C !== "suppressContentEditableWarning" &&
                    C !== "suppressHydrationWarning" &&
                    (f.hasOwnProperty(C)
                      ? (v != null && C === "onScroll" && Fe("scroll", e),
                        s || h === v || (s = []))
                      : (s = s || []).push(C, v));
        }
        n && (s = s || []).push("style", n);
        var C = s;
        (t.updateQueue = C) && (t.flags |= 4);
      }
    }),
    (Ec = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    });
  function il(e, t) {
    if (!De)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), (t = t.sibling);
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; n !== null; )
            n.alternate !== null && (r = n), (n = n.sibling);
          r === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function st(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      r = 0;
    if (t)
      for (var i = e.child; i !== null; )
        (n |= i.lanes | i.childLanes),
          (r |= i.subtreeFlags & 14680064),
          (r |= i.flags & 14680064),
          (i.return = e),
          (i = i.sibling);
    else
      for (i = e.child; i !== null; )
        (n |= i.lanes | i.childLanes),
          (r |= i.subtreeFlags),
          (r |= i.flags),
          (i.return = e),
          (i = i.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = n), t;
  }
  function Cp(e, t, n) {
    var r = t.pendingProps;
    switch ((Ws(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return st(t), null;
      case 1:
        return ht(t.type) && Gl(), st(t), null;
      case 3:
        return (
          (r = t.stateNode),
          xr(),
          ze(pt),
          ze(lt),
          no(),
          r.pendingContext &&
            ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (ti(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                ((t.flags |= 1024), Ot !== null && (zo(Ot), (Ot = null)))),
          ko(e, t),
          st(t),
          null
        );
      case 5:
        eo(t);
        var i = Qn(el.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          jc(e, t, n, r, i),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(o(166));
            return st(t), null;
          }
          if (((e = Qn(Ht.current)), ti(t))) {
            (r = t.stateNode), (n = t.type);
            var s = t.memoizedProps;
            switch (((r[Wt] = t), (r[Xr] = s), (e = (t.mode & 1) !== 0), n)) {
              case "dialog":
                Fe("cancel", r), Fe("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                Fe("load", r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Kr.length; i++) Fe(Kr[i], r);
                break;
              case "source":
                Fe("error", r);
                break;
              case "img":
              case "image":
              case "link":
                Fe("error", r), Fe("load", r);
                break;
              case "details":
                Fe("toggle", r);
                break;
              case "input":
                Zi(r, s), Fe("invalid", r);
                break;
              case "select":
                (r._wrapperState = { wasMultiple: !!s.multiple }),
                  Fe("invalid", r);
                break;
              case "textarea":
                W(r, s), Fe("invalid", r);
            }
            ts(n, s), (i = null);
            for (var c in s)
              if (s.hasOwnProperty(c)) {
                var h = s[c];
                c === "children"
                  ? typeof h == "string"
                    ? r.textContent !== h &&
                      (s.suppressHydrationWarning !== !0 &&
                        Yl(r.textContent, h, e),
                      (i = ["children", h]))
                    : typeof h == "number" &&
                      r.textContent !== "" + h &&
                      (s.suppressHydrationWarning !== !0 &&
                        Yl(r.textContent, h, e),
                      (i = ["children", "" + h]))
                  : f.hasOwnProperty(c) &&
                    h != null &&
                    c === "onScroll" &&
                    Fe("scroll", r);
              }
            switch (n) {
              case "input":
                An(r), g(r, s, !0);
                break;
              case "textarea":
                An(r), de(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof s.onClick == "function" && (r.onclick = ql);
            }
            (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
          } else {
            (c = i.nodeType === 9 ? i : i.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = Ue(n)),
              e === "http://www.w3.org/1999/xhtml"
                ? n === "script"
                  ? ((e = c.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof r.is == "string"
                    ? (e = c.createElement(n, { is: r.is }))
                    : ((e = c.createElement(n)),
                      n === "select" &&
                        ((c = e),
                        r.multiple
                          ? (c.multiple = !0)
                          : r.size && (c.size = r.size)))
                : (e = c.createElementNS(e, n)),
              (e[Wt] = t),
              (e[Xr] = r),
              kc(e, t, !1, !1),
              (t.stateNode = e);
            e: {
              switch (((c = ns(n, r)), n)) {
                case "dialog":
                  Fe("cancel", e), Fe("close", e), (i = r);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Fe("load", e), (i = r);
                  break;
                case "video":
                case "audio":
                  for (i = 0; i < Kr.length; i++) Fe(Kr[i], e);
                  i = r;
                  break;
                case "source":
                  Fe("error", e), (i = r);
                  break;
                case "img":
                case "image":
                case "link":
                  Fe("error", e), Fe("load", e), (i = r);
                  break;
                case "details":
                  Fe("toggle", e), (i = r);
                  break;
                case "input":
                  Zi(e, r), (i = er(e, r)), Fe("invalid", e);
                  break;
                case "option":
                  i = r;
                  break;
                case "select":
                  (e._wrapperState = { wasMultiple: !!r.multiple }),
                    (i = Y({}, r, { value: void 0 })),
                    Fe("invalid", e);
                  break;
                case "textarea":
                  W(e, r), (i = H(e, r)), Fe("invalid", e);
                  break;
                default:
                  i = r;
              }
              ts(n, i), (h = i);
              for (s in h)
                if (h.hasOwnProperty(s)) {
                  var v = h[s];
                  s === "style"
                    ? Nl(e, v)
                    : s === "dangerouslySetInnerHTML"
                      ? ((v = v ? v.__html : void 0), v != null && El(e, v))
                      : s === "children"
                        ? typeof v == "string"
                          ? (n !== "textarea" || v !== "") && bt(e, v)
                          : typeof v == "number" && bt(e, "" + v)
                        : s !== "suppressContentEditableWarning" &&
                          s !== "suppressHydrationWarning" &&
                          s !== "autoFocus" &&
                          (f.hasOwnProperty(s)
                            ? v != null && s === "onScroll" && Fe("scroll", e)
                            : v != null && le(e, s, v, c));
                }
              switch (n) {
                case "input":
                  An(e), g(e, r, !1);
                  break;
                case "textarea":
                  An(e), de(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + ge(r.value));
                  break;
                case "select":
                  (e.multiple = !!r.multiple),
                    (s = r.value),
                    s != null
                      ? K(e, !!r.multiple, s, !1)
                      : r.defaultValue != null &&
                        K(e, !!r.multiple, r.defaultValue, !0);
                  break;
                default:
                  typeof i.onClick == "function" && (e.onclick = ql);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return st(t), null;
      case 6:
        if (e && t.stateNode != null) Ec(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(o(166));
          if (((n = Qn(el.current)), Qn(Ht.current), ti(t))) {
            if (
              ((r = t.stateNode),
              (n = t.memoizedProps),
              (r[Wt] = t),
              (s = r.nodeValue !== n) && ((e = kt), e !== null))
            )
              switch (e.tag) {
                case 3:
                  Yl(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    Yl(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            s && (t.flags |= 4);
          } else
            (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
              (r[Wt] = t),
              (t.stateNode = r);
        }
        return st(t), null;
      case 13:
        if (
          (ze(Ie),
          (r = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (De && jt !== null && t.mode & 1 && !(t.flags & 128))
            Cu(), mr(), (t.flags |= 98560), (s = !1);
          else if (((s = ti(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!s) throw Error(o(318));
              if (
                ((s = t.memoizedState),
                (s = s !== null ? s.dehydrated : null),
                !s)
              )
                throw Error(o(317));
              s[Wt] = t;
            } else
              mr(),
                !(t.flags & 128) && (t.memoizedState = null),
                (t.flags |= 4);
            st(t), (s = !1);
          } else Ot !== null && (zo(Ot), (Ot = null)), (s = !0);
          if (!s) return t.flags & 65536 ? t : null;
        }
        return t.flags & 128
          ? ((t.lanes = n), t)
          : ((r = r !== null),
            r !== (e !== null && e.memoizedState !== null) &&
              r &&
              ((t.child.flags |= 8192),
              t.mode & 1 &&
                (e === null || Ie.current & 1 ? qe === 0 && (qe = 3) : Io())),
            t.updateQueue !== null && (t.flags |= 4),
            st(t),
            null);
      case 4:
        return (
          xr(),
          ko(e, t),
          e === null && Yr(t.stateNode.containerInfo),
          st(t),
          null
        );
      case 10:
        return Xs(t.type._context), st(t), null;
      case 17:
        return ht(t.type) && Gl(), st(t), null;
      case 19:
        if ((ze(Ie), (s = t.memoizedState), s === null)) return st(t), null;
        if (((r = (t.flags & 128) !== 0), (c = s.rendering), c === null))
          if (r) il(s, !1);
          else {
            if (qe !== 0 || (e !== null && e.flags & 128))
              for (e = t.child; e !== null; ) {
                if (((c = oi(e)), c !== null)) {
                  for (
                    t.flags |= 128,
                      il(s, !1),
                      r = c.updateQueue,
                      r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      r = n,
                      n = t.child;
                    n !== null;

                  )
                    (s = n),
                      (e = r),
                      (s.flags &= 14680066),
                      (c = s.alternate),
                      c === null
                        ? ((s.childLanes = 0),
                          (s.lanes = e),
                          (s.child = null),
                          (s.subtreeFlags = 0),
                          (s.memoizedProps = null),
                          (s.memoizedState = null),
                          (s.updateQueue = null),
                          (s.dependencies = null),
                          (s.stateNode = null))
                        : ((s.childLanes = c.childLanes),
                          (s.lanes = c.lanes),
                          (s.child = c.child),
                          (s.subtreeFlags = 0),
                          (s.deletions = null),
                          (s.memoizedProps = c.memoizedProps),
                          (s.memoizedState = c.memoizedState),
                          (s.updateQueue = c.updateQueue),
                          (s.type = c.type),
                          (e = c.dependencies),
                          (s.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (n = n.sibling);
                  return Te(Ie, (Ie.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            s.tail !== null &&
              Be() > jr &&
              ((t.flags |= 128), (r = !0), il(s, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = oi(c)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                il(s, !0),
                s.tail === null &&
                  s.tailMode === "hidden" &&
                  !c.alternate &&
                  !De)
              )
                return st(t), null;
            } else
              2 * Be() - s.renderingStartTime > jr &&
                n !== 1073741824 &&
                ((t.flags |= 128), (r = !0), il(s, !1), (t.lanes = 4194304));
          s.isBackwards
            ? ((c.sibling = t.child), (t.child = c))
            : ((n = s.last),
              n !== null ? (n.sibling = c) : (t.child = c),
              (s.last = c));
        }
        return s.tail !== null
          ? ((t = s.tail),
            (s.rendering = t),
            (s.tail = t.sibling),
            (s.renderingStartTime = Be()),
            (t.sibling = null),
            (n = Ie.current),
            Te(Ie, r ? (n & 1) | 2 : n & 1),
            t)
          : (st(t), null);
      case 22:
      case 23:
        return (
          Do(),
          (r = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
          r && t.mode & 1
            ? Et & 1073741824 &&
              (st(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : st(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function Pp(e, t) {
    switch ((Ws(t), t.tag)) {
      case 1:
        return (
          ht(t.type) && Gl(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          xr(),
          ze(pt),
          ze(lt),
          no(),
          (e = t.flags),
          e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 5:
        return eo(t), null;
      case 13:
        if (
          (ze(Ie), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(o(340));
          mr();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return ze(Ie), null;
      case 4:
        return xr(), null;
      case 10:
        return Xs(t.type._context), null;
      case 22:
      case 23:
        return Do(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var vi = !1,
    ot = !1,
    Rp = typeof WeakSet == "function" ? WeakSet : Set,
    X = null;
  function Sr(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          Ve(e, t, r);
        }
      else n.current = null;
  }
  function jo(e, t, n) {
    try {
      n();
    } catch (r) {
      Ve(e, t, r);
    }
  }
  var Nc = !1;
  function Lp(e, t) {
    if (((Os = Il), (e = ru()), _s(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var i = r.anchorOffset,
              s = r.focusNode;
            r = r.focusOffset;
            try {
              n.nodeType, s.nodeType;
            } catch {
              n = null;
              break e;
            }
            var c = 0,
              h = -1,
              v = -1,
              C = 0,
              A = 0,
              V = e,
              I = null;
            t: for (;;) {
              for (
                var q;
                V !== n || (i !== 0 && V.nodeType !== 3) || (h = c + i),
                  V !== s || (r !== 0 && V.nodeType !== 3) || (v = c + r),
                  V.nodeType === 3 && (c += V.nodeValue.length),
                  (q = V.firstChild) !== null;

              )
                (I = V), (V = q);
              for (;;) {
                if (V === e) break t;
                if (
                  (I === n && ++C === i && (h = c),
                  I === s && ++A === r && (v = c),
                  (q = V.nextSibling) !== null)
                )
                  break;
                (V = I), (I = V.parentNode);
              }
              V = q;
            }
            n = h === -1 || v === -1 ? null : { start: h, end: v };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      Ds = { focusedElem: e, selectionRange: n }, Il = !1, X = t;
      X !== null;

    )
      if (((t = X), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        (e.return = t), (X = e);
      else
        for (; X !== null; ) {
          t = X;
          try {
            var G = t.alternate;
            if (t.flags & 1024)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (G !== null) {
                    var Z = G.memoizedProps,
                      We = G.memoizedState,
                      j = t.stateNode,
                      x = j.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? Z : Dt(t.type, Z),
                        We,
                      );
                    j.__reactInternalSnapshotBeforeUpdate = x;
                  }
                  break;
                case 3:
                  var E = t.stateNode.containerInfo;
                  E.nodeType === 1
                    ? (E.textContent = "")
                    : E.nodeType === 9 &&
                      E.documentElement &&
                      E.removeChild(E.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(o(163));
              }
          } catch (B) {
            Ve(t, t.return, B);
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (X = e);
            break;
          }
          X = t.return;
        }
    return (G = Nc), (Nc = !1), G;
  }
  function sl(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
      var i = (r = r.next);
      do {
        if ((i.tag & e) === e) {
          var s = i.destroy;
          (i.destroy = void 0), s !== void 0 && jo(t, n, s);
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function gi(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function Eo(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : (t.current = e);
    }
  }
  function _c(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), _c(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[Wt],
          delete t[Xr],
          delete t[$s],
          delete t[fp],
          delete t[pp])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  function Cc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Pc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Cc(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function No(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8
              ? ((t = n.parentNode), t.insertBefore(e, n))
              : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = ql));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (No(e, t, n), e = e.sibling; e !== null; )
        No(e, t, n), (e = e.sibling);
  }
  function _o(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
      for (_o(e, t, n), e = e.sibling; e !== null; )
        _o(e, t, n), (e = e.sibling);
  }
  var tt = null,
    It = !1;
  function _n(e, t, n) {
    for (n = n.child; n !== null; ) Rc(e, t, n), (n = n.sibling);
  }
  function Rc(e, t, n) {
    if (Bt && typeof Bt.onCommitFiberUnmount == "function")
      try {
        Bt.onCommitFiberUnmount(Ll, n);
      } catch {}
    switch (n.tag) {
      case 5:
        ot || Sr(n, t);
      case 6:
        var r = tt,
          i = It;
        (tt = null),
          _n(e, t, n),
          (tt = r),
          (It = i),
          tt !== null &&
            (It
              ? ((e = tt),
                (n = n.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(n)
                  : e.removeChild(n))
              : tt.removeChild(n.stateNode));
        break;
      case 18:
        tt !== null &&
          (It
            ? ((e = tt),
              (n = n.stateNode),
              e.nodeType === 8
                ? Ms(e.parentNode, n)
                : e.nodeType === 1 && Ms(e, n),
              Mr(e))
            : Ms(tt, n.stateNode));
        break;
      case 4:
        (r = tt),
          (i = It),
          (tt = n.stateNode.containerInfo),
          (It = !0),
          _n(e, t, n),
          (tt = r),
          (It = i);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !ot &&
          ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
        ) {
          i = r = r.next;
          do {
            var s = i,
              c = s.destroy;
            (s = s.tag),
              c !== void 0 && (s & 2 || s & 4) && jo(n, t, c),
              (i = i.next);
          } while (i !== r);
        }
        _n(e, t, n);
        break;
      case 1:
        if (
          !ot &&
          (Sr(n, t),
          (r = n.stateNode),
          typeof r.componentWillUnmount == "function")
        )
          try {
            (r.props = n.memoizedProps),
              (r.state = n.memoizedState),
              r.componentWillUnmount();
          } catch (h) {
            Ve(n, t, h);
          }
        _n(e, t, n);
        break;
      case 21:
        _n(e, t, n);
        break;
      case 22:
        n.mode & 1
          ? ((ot = (r = ot) || n.memoizedState !== null), _n(e, t, n), (ot = r))
          : _n(e, t, n);
        break;
      default:
        _n(e, t, n);
    }
  }
  function Lc(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new Rp()),
        t.forEach(function (r) {
          var i = $p.bind(null, e, r);
          n.has(r) || (n.add(r), r.then(i, i));
        });
    }
  }
  function At(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        try {
          var s = e,
            c = t,
            h = c;
          e: for (; h !== null; ) {
            switch (h.tag) {
              case 5:
                (tt = h.stateNode), (It = !1);
                break e;
              case 3:
                (tt = h.stateNode.containerInfo), (It = !0);
                break e;
              case 4:
                (tt = h.stateNode.containerInfo), (It = !0);
                break e;
            }
            h = h.return;
          }
          if (tt === null) throw Error(o(160));
          Rc(s, c, i), (tt = null), (It = !1);
          var v = i.alternate;
          v !== null && (v.return = null), (i.return = null);
        } catch (C) {
          Ve(i, t, C);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; ) Tc(t, e), (t = t.sibling);
  }
  function Tc(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((At(t, e), Kt(e), r & 4)) {
          try {
            sl(3, e, e.return), gi(3, e);
          } catch (Z) {
            Ve(e, e.return, Z);
          }
          try {
            sl(5, e, e.return);
          } catch (Z) {
            Ve(e, e.return, Z);
          }
        }
        break;
      case 1:
        At(t, e), Kt(e), r & 512 && n !== null && Sr(n, n.return);
        break;
      case 5:
        if (
          (At(t, e),
          Kt(e),
          r & 512 && n !== null && Sr(n, n.return),
          e.flags & 32)
        ) {
          var i = e.stateNode;
          try {
            bt(i, "");
          } catch (Z) {
            Ve(e, e.return, Z);
          }
        }
        if (r & 4 && ((i = e.stateNode), i != null)) {
          var s = e.memoizedProps,
            c = n !== null ? n.memoizedProps : s,
            h = e.type,
            v = e.updateQueue;
          if (((e.updateQueue = null), v !== null))
            try {
              h === "input" && s.type === "radio" && s.name != null && bi(i, s),
                ns(h, c);
              var C = ns(h, s);
              for (c = 0; c < v.length; c += 2) {
                var A = v[c],
                  V = v[c + 1];
                A === "style"
                  ? Nl(i, V)
                  : A === "dangerouslySetInnerHTML"
                    ? El(i, V)
                    : A === "children"
                      ? bt(i, V)
                      : le(i, A, V, C);
              }
              switch (h) {
                case "input":
                  jl(i, s);
                  break;
                case "textarea":
                  te(i, s);
                  break;
                case "select":
                  var I = i._wrapperState.wasMultiple;
                  i._wrapperState.wasMultiple = !!s.multiple;
                  var q = s.value;
                  q != null
                    ? K(i, !!s.multiple, q, !1)
                    : I !== !!s.multiple &&
                      (s.defaultValue != null
                        ? K(i, !!s.multiple, s.defaultValue, !0)
                        : K(i, !!s.multiple, s.multiple ? [] : "", !1));
              }
              i[Xr] = s;
            } catch (Z) {
              Ve(e, e.return, Z);
            }
        }
        break;
      case 6:
        if ((At(t, e), Kt(e), r & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          (i = e.stateNode), (s = e.memoizedProps);
          try {
            i.nodeValue = s;
          } catch (Z) {
            Ve(e, e.return, Z);
          }
        }
        break;
      case 3:
        if (
          (At(t, e), Kt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Mr(t.containerInfo);
          } catch (Z) {
            Ve(e, e.return, Z);
          }
        break;
      case 4:
        At(t, e), Kt(e);
        break;
      case 13:
        At(t, e),
          Kt(e),
          (i = e.child),
          i.flags & 8192 &&
            ((s = i.memoizedState !== null),
            (i.stateNode.isHidden = s),
            !s ||
              (i.alternate !== null && i.alternate.memoizedState !== null) ||
              (Ro = Be())),
          r & 4 && Lc(e);
        break;
      case 22:
        if (
          ((A = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((ot = (C = ot) || A), At(t, e), (ot = C)) : At(t, e),
          Kt(e),
          r & 8192)
        ) {
          if (
            ((C = e.memoizedState !== null),
            (e.stateNode.isHidden = C) && !A && e.mode & 1)
          )
            for (X = e, A = e.child; A !== null; ) {
              for (V = X = A; X !== null; ) {
                switch (((I = X), (q = I.child), I.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    sl(4, I, I.return);
                    break;
                  case 1:
                    Sr(I, I.return);
                    var G = I.stateNode;
                    if (typeof G.componentWillUnmount == "function") {
                      (r = I), (n = I.return);
                      try {
                        (t = r),
                          (G.props = t.memoizedProps),
                          (G.state = t.memoizedState),
                          G.componentWillUnmount();
                      } catch (Z) {
                        Ve(r, n, Z);
                      }
                    }
                    break;
                  case 5:
                    Sr(I, I.return);
                    break;
                  case 22:
                    if (I.memoizedState !== null) {
                      Oc(V);
                      continue;
                    }
                }
                q !== null ? ((q.return = I), (X = q)) : Oc(V);
              }
              A = A.sibling;
            }
          e: for (A = null, V = e; ; ) {
            if (V.tag === 5) {
              if (A === null) {
                A = V;
                try {
                  (i = V.stateNode),
                    C
                      ? ((s = i.style),
                        typeof s.setProperty == "function"
                          ? s.setProperty("display", "none", "important")
                          : (s.display = "none"))
                      : ((h = V.stateNode),
                        (v = V.memoizedProps.style),
                        (c =
                          v != null && v.hasOwnProperty("display")
                            ? v.display
                            : null),
                        (h.style.display = Pr("display", c)));
                } catch (Z) {
                  Ve(e, e.return, Z);
                }
              }
            } else if (V.tag === 6) {
              if (A === null)
                try {
                  V.stateNode.nodeValue = C ? "" : V.memoizedProps;
                } catch (Z) {
                  Ve(e, e.return, Z);
                }
            } else if (
              ((V.tag !== 22 && V.tag !== 23) ||
                V.memoizedState === null ||
                V === e) &&
              V.child !== null
            ) {
              (V.child.return = V), (V = V.child);
              continue;
            }
            if (V === e) break e;
            for (; V.sibling === null; ) {
              if (V.return === null || V.return === e) break e;
              A === V && (A = null), (V = V.return);
            }
            A === V && (A = null),
              (V.sibling.return = V.return),
              (V = V.sibling);
          }
        }
        break;
      case 19:
        At(t, e), Kt(e), r & 4 && Lc(e);
        break;
      case 21:
        break;
      default:
        At(t, e), Kt(e);
    }
  }
  function Kt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (Cc(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(o(160));
        }
        switch (r.tag) {
          case 5:
            var i = r.stateNode;
            r.flags & 32 && (bt(i, ""), (r.flags &= -33));
            var s = Pc(e);
            _o(e, s, i);
            break;
          case 3:
          case 4:
            var c = r.stateNode.containerInfo,
              h = Pc(e);
            No(e, h, c);
            break;
          default:
            throw Error(o(161));
        }
      } catch (v) {
        Ve(e, e.return, v);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Tp(e, t, n) {
    (X = e), Fc(e);
  }
  function Fc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; X !== null; ) {
      var i = X,
        s = i.child;
      if (i.tag === 22 && r) {
        var c = i.memoizedState !== null || vi;
        if (!c) {
          var h = i.alternate,
            v = (h !== null && h.memoizedState !== null) || ot;
          h = vi;
          var C = ot;
          if (((vi = c), (ot = v) && !C))
            for (X = i; X !== null; )
              (c = X),
                (v = c.child),
                c.tag === 22 && c.memoizedState !== null
                  ? Dc(i)
                  : v !== null
                    ? ((v.return = c), (X = v))
                    : Dc(i);
          for (; s !== null; ) (X = s), Fc(s), (s = s.sibling);
          (X = i), (vi = h), (ot = C);
        }
        zc(e);
      } else
        i.subtreeFlags & 8772 && s !== null ? ((s.return = i), (X = s)) : zc(e);
    }
  }
  function zc(e) {
    for (; X !== null; ) {
      var t = X;
      if (t.flags & 8772) {
        var n = t.alternate;
        try {
          if (t.flags & 8772)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                ot || gi(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !ot)
                  if (n === null) r.componentDidMount();
                  else {
                    var i =
                      t.elementType === t.type
                        ? n.memoizedProps
                        : Dt(t.type, n.memoizedProps);
                    r.componentDidUpdate(
                      i,
                      n.memoizedState,
                      r.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var s = t.updateQueue;
                s !== null && Ou(t, s, r);
                break;
              case 3:
                var c = t.updateQueue;
                if (c !== null) {
                  if (((n = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  Ou(t, c, n);
                }
                break;
              case 5:
                var h = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = h;
                  var v = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      v.autoFocus && n.focus();
                      break;
                    case "img":
                      v.src && (n.src = v.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var C = t.alternate;
                  if (C !== null) {
                    var A = C.memoizedState;
                    if (A !== null) {
                      var V = A.dehydrated;
                      V !== null && Mr(V);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(o(163));
            }
          ot || (t.flags & 512 && Eo(t));
        } catch (I) {
          Ve(t, t.return, I);
        }
      }
      if (t === e) {
        X = null;
        break;
      }
      if (((n = t.sibling), n !== null)) {
        (n.return = t.return), (X = n);
        break;
      }
      X = t.return;
    }
  }
  function Oc(e) {
    for (; X !== null; ) {
      var t = X;
      if (t === e) {
        X = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        (n.return = t.return), (X = n);
        break;
      }
      X = t.return;
    }
  }
  function Dc(e) {
    for (; X !== null; ) {
      var t = X;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              gi(4, t);
            } catch (v) {
              Ve(t, n, v);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var i = t.return;
              try {
                r.componentDidMount();
              } catch (v) {
                Ve(t, i, v);
              }
            }
            var s = t.return;
            try {
              Eo(t);
            } catch (v) {
              Ve(t, s, v);
            }
            break;
          case 5:
            var c = t.return;
            try {
              Eo(t);
            } catch (v) {
              Ve(t, c, v);
            }
        }
      } catch (v) {
        Ve(t, t.return, v);
      }
      if (t === e) {
        X = null;
        break;
      }
      var h = t.sibling;
      if (h !== null) {
        (h.return = t.return), (X = h);
        break;
      }
      X = t.return;
    }
  }
  var Fp = Math.ceil,
    yi = ae.ReactCurrentDispatcher,
    Co = ae.ReactCurrentOwner,
    Rt = ae.ReactCurrentBatchConfig,
    ye = 0,
    be = null,
    Qe = null,
    nt = 0,
    Et = 0,
    kr = Sn(0),
    qe = 0,
    ol = null,
    Yn = 0,
    xi = 0,
    Po = 0,
    al = null,
    vt = null,
    Ro = 0,
    jr = 1 / 0,
    un = null,
    wi = !1,
    Lo = null,
    Cn = null,
    Si = !1,
    Pn = null,
    ki = 0,
    ul = 0,
    To = null,
    ji = -1,
    Ei = 0;
  function dt() {
    return ye & 6 ? Be() : ji !== -1 ? ji : (ji = Be());
  }
  function Rn(e) {
    return e.mode & 1
      ? ye & 2 && nt !== 0
        ? nt & -nt
        : mp.transition !== null
          ? (Ei === 0 && (Ei = Pa()), Ei)
          : ((e = Ne),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : Aa(e.type))),
            e)
      : 1;
  }
  function Mt(e, t, n, r) {
    if (50 < ul) throw ((ul = 0), (To = null), Error(o(185)));
    zr(e, n, r),
      (!(ye & 2) || e !== be) &&
        (e === be && (!(ye & 2) && (xi |= n), qe === 4 && Ln(e, nt)),
        gt(e, r),
        n === 1 &&
          ye === 0 &&
          !(t.mode & 1) &&
          ((jr = Be() + 500), Zl && jn()));
  }
  function gt(e, t) {
    var n = e.callbackNode;
    mf(e, t);
    var r = zl(e, e === be ? nt : 0);
    if (r === 0)
      n !== null && Na(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
      if ((n != null && Na(n), t === 1))
        e.tag === 0 ? hp(Ac.bind(null, e)) : ku(Ac.bind(null, e)),
          cp(function () {
            !(ye & 6) && jn();
          }),
          (n = null);
      else {
        switch (Ra(r)) {
          case 1:
            n = us;
            break;
          case 4:
            n = _a;
            break;
          case 16:
            n = Rl;
            break;
          case 536870912:
            n = Ca;
            break;
          default:
            n = Rl;
        }
        n = Qc(n, Ic.bind(null, e));
      }
      (e.callbackPriority = t), (e.callbackNode = n);
    }
  }
  function Ic(e, t) {
    if (((ji = -1), (Ei = 0), ye & 6)) throw Error(o(327));
    var n = e.callbackNode;
    if (Er() && e.callbackNode !== n) return null;
    var r = zl(e, e === be ? nt : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = Ni(e, r);
    else {
      t = r;
      var i = ye;
      ye |= 2;
      var s = $c();
      (be !== e || nt !== t) && ((un = null), (jr = Be() + 500), Xn(e, t));
      do
        try {
          Dp();
          break;
        } catch (h) {
          Mc(e, h);
        }
      while (!0);
      qs(),
        (yi.current = s),
        (ye = i),
        Qe !== null ? (t = 0) : ((be = null), (nt = 0), (t = qe));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((i = cs(e)), i !== 0 && ((r = i), (t = Fo(e, i)))),
        t === 1)
      )
        throw ((n = ol), Xn(e, 0), Ln(e, r), gt(e, Be()), n);
      if (t === 6) Ln(e, r);
      else {
        if (
          ((i = e.current.alternate),
          !(r & 30) &&
            !zp(i) &&
            ((t = Ni(e, r)),
            t === 2 && ((s = cs(e)), s !== 0 && ((r = s), (t = Fo(e, s)))),
            t === 1))
        )
          throw ((n = ol), Xn(e, 0), Ln(e, r), gt(e, Be()), n);
        switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
          case 0:
          case 1:
            throw Error(o(345));
          case 2:
            Gn(e, vt, un);
            break;
          case 3:
            if (
              (Ln(e, r),
              (r & 130023424) === r && ((t = Ro + 500 - Be()), 10 < t))
            ) {
              if (zl(e, 0) !== 0) break;
              if (((i = e.suspendedLanes), (i & r) !== r)) {
                dt(), (e.pingedLanes |= e.suspendedLanes & i);
                break;
              }
              e.timeoutHandle = As(Gn.bind(null, e, vt, un), t);
              break;
            }
            Gn(e, vt, un);
            break;
          case 4:
            if ((Ln(e, r), (r & 4194240) === r)) break;
            for (t = e.eventTimes, i = -1; 0 < r; ) {
              var c = 31 - Ft(r);
              (s = 1 << c), (c = t[c]), c > i && (i = c), (r &= ~s);
            }
            if (
              ((r = i),
              (r = Be() - r),
              (r =
                (120 > r
                  ? 120
                  : 480 > r
                    ? 480
                    : 1080 > r
                      ? 1080
                      : 1920 > r
                        ? 1920
                        : 3e3 > r
                          ? 3e3
                          : 4320 > r
                            ? 4320
                            : 1960 * Fp(r / 1960)) - r),
              10 < r)
            ) {
              e.timeoutHandle = As(Gn.bind(null, e, vt, un), r);
              break;
            }
            Gn(e, vt, un);
            break;
          case 5:
            Gn(e, vt, un);
            break;
          default:
            throw Error(o(329));
        }
      }
    }
    return gt(e, Be()), e.callbackNode === n ? Ic.bind(null, e) : null;
  }
  function Fo(e, t) {
    var n = al;
    return (
      e.current.memoizedState.isDehydrated && (Xn(e, t).flags |= 256),
      (e = Ni(e, t)),
      e !== 2 && ((t = vt), (vt = n), t !== null && zo(t)),
      e
    );
  }
  function zo(e) {
    vt === null ? (vt = e) : vt.push.apply(vt, e);
  }
  function zp(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && ((n = n.stores), n !== null))
          for (var r = 0; r < n.length; r++) {
            var i = n[r],
              s = i.getSnapshot;
            i = i.value;
            try {
              if (!zt(s(), i)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        (n.return = t), (t = n);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function Ln(e, t) {
    for (
      t &= ~Po,
        t &= ~xi,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;

    ) {
      var n = 31 - Ft(t),
        r = 1 << n;
      (e[n] = -1), (t &= ~r);
    }
  }
  function Ac(e) {
    if (ye & 6) throw Error(o(327));
    Er();
    var t = zl(e, 0);
    if (!(t & 1)) return gt(e, Be()), null;
    var n = Ni(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = cs(e);
      r !== 0 && ((t = r), (n = Fo(e, r)));
    }
    if (n === 1) throw ((n = ol), Xn(e, 0), Ln(e, t), gt(e, Be()), n);
    if (n === 6) throw Error(o(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      Gn(e, vt, un),
      gt(e, Be()),
      null
    );
  }
  function Oo(e, t) {
    var n = ye;
    ye |= 1;
    try {
      return e(t);
    } finally {
      (ye = n), ye === 0 && ((jr = Be() + 500), Zl && jn());
    }
  }
  function qn(e) {
    Pn !== null && Pn.tag === 0 && !(ye & 6) && Er();
    var t = ye;
    ye |= 1;
    var n = Rt.transition,
      r = Ne;
    try {
      if (((Rt.transition = null), (Ne = 1), e)) return e();
    } finally {
      (Ne = r), (Rt.transition = n), (ye = t), !(ye & 6) && jn();
    }
  }
  function Do() {
    (Et = kr.current), ze(kr);
  }
  function Xn(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), up(n)), Qe !== null))
      for (n = Qe.return; n !== null; ) {
        var r = n;
        switch ((Ws(r), r.tag)) {
          case 1:
            (r = r.type.childContextTypes), r != null && Gl();
            break;
          case 3:
            xr(), ze(pt), ze(lt), no();
            break;
          case 5:
            eo(r);
            break;
          case 4:
            xr();
            break;
          case 13:
            ze(Ie);
            break;
          case 19:
            ze(Ie);
            break;
          case 10:
            Xs(r.type._context);
            break;
          case 22:
          case 23:
            Do();
        }
        n = n.return;
      }
    if (
      ((be = e),
      (Qe = e = Tn(e.current, null)),
      (nt = Et = t),
      (qe = 0),
      (ol = null),
      (Po = xi = Yn = 0),
      (vt = al = null),
      Hn !== null)
    ) {
      for (t = 0; t < Hn.length; t++)
        if (((n = Hn[t]), (r = n.interleaved), r !== null)) {
          n.interleaved = null;
          var i = r.next,
            s = n.pending;
          if (s !== null) {
            var c = s.next;
            (s.next = i), (r.next = c);
          }
          n.pending = r;
        }
      Hn = null;
    }
    return e;
  }
  function Mc(e, t) {
    do {
      var n = Qe;
      try {
        if ((qs(), (ai.current = fi), ui)) {
          for (var r = Ae.memoizedState; r !== null; ) {
            var i = r.queue;
            i !== null && (i.pending = null), (r = r.next);
          }
          ui = !1;
        }
        if (
          ((Kn = 0),
          (Ze = Ye = Ae = null),
          (tl = !1),
          (nl = 0),
          (Co.current = null),
          n === null || n.return === null)
        ) {
          (qe = 1), (ol = t), (Qe = null);
          break;
        }
        e: {
          var s = e,
            c = n.return,
            h = n,
            v = t;
          if (
            ((t = nt),
            (h.flags |= 32768),
            v !== null && typeof v == "object" && typeof v.then == "function")
          ) {
            var C = v,
              A = h,
              V = A.tag;
            if (!(A.mode & 1) && (V === 0 || V === 11 || V === 15)) {
              var I = A.alternate;
              I
                ? ((A.updateQueue = I.updateQueue),
                  (A.memoizedState = I.memoizedState),
                  (A.lanes = I.lanes))
                : ((A.updateQueue = null), (A.memoizedState = null));
            }
            var q = uc(c);
            if (q !== null) {
              (q.flags &= -257),
                cc(q, c, h, s, t),
                q.mode & 1 && ac(s, C, t),
                (t = q),
                (v = C);
              var G = t.updateQueue;
              if (G === null) {
                var Z = new Set();
                Z.add(v), (t.updateQueue = Z);
              } else G.add(v);
              break e;
            } else {
              if (!(t & 1)) {
                ac(s, C, t), Io();
                break e;
              }
              v = Error(o(426));
            }
          } else if (De && h.mode & 1) {
            var We = uc(c);
            if (We !== null) {
              !(We.flags & 65536) && (We.flags |= 256),
                cc(We, c, h, s, t),
                Ks(wr(v, h));
              break e;
            }
          }
          (s = v = wr(v, h)),
            qe !== 4 && (qe = 2),
            al === null ? (al = [s]) : al.push(s),
            (s = c);
          do {
            switch (s.tag) {
              case 3:
                (s.flags |= 65536), (t &= -t), (s.lanes |= t);
                var j = sc(s, v, t);
                zu(s, j);
                break e;
              case 1:
                h = v;
                var x = s.type,
                  E = s.stateNode;
                if (
                  !(s.flags & 128) &&
                  (typeof x.getDerivedStateFromError == "function" ||
                    (E !== null &&
                      typeof E.componentDidCatch == "function" &&
                      (Cn === null || !Cn.has(E))))
                ) {
                  (s.flags |= 65536), (t &= -t), (s.lanes |= t);
                  var B = oc(s, h, t);
                  zu(s, B);
                  break e;
                }
            }
            s = s.return;
          } while (s !== null);
        }
        Uc(n);
      } catch (b) {
        (t = b), Qe === n && n !== null && (Qe = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function $c() {
    var e = yi.current;
    return (yi.current = fi), e === null ? fi : e;
  }
  function Io() {
    (qe === 0 || qe === 3 || qe === 2) && (qe = 4),
      be === null || (!(Yn & 268435455) && !(xi & 268435455)) || Ln(be, nt);
  }
  function Ni(e, t) {
    var n = ye;
    ye |= 2;
    var r = $c();
    (be !== e || nt !== t) && ((un = null), Xn(e, t));
    do
      try {
        Op();
        break;
      } catch (i) {
        Mc(e, i);
      }
    while (!0);
    if ((qs(), (ye = n), (yi.current = r), Qe !== null)) throw Error(o(261));
    return (be = null), (nt = 0), qe;
  }
  function Op() {
    for (; Qe !== null; ) Vc(Qe);
  }
  function Dp() {
    for (; Qe !== null && !sf(); ) Vc(Qe);
  }
  function Vc(e) {
    var t = Hc(e.alternate, e, Et);
    (e.memoizedProps = e.pendingProps),
      t === null ? Uc(e) : (Qe = t),
      (Co.current = null);
  }
  function Uc(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), t.flags & 32768)) {
        if (((n = Pp(n, t)), n !== null)) {
          (n.flags &= 32767), (Qe = n);
          return;
        }
        if (e !== null)
          (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
        else {
          (qe = 6), (Qe = null);
          return;
        }
      } else if (((n = Cp(n, t, Et)), n !== null)) {
        Qe = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Qe = t;
        return;
      }
      Qe = t = e;
    } while (t !== null);
    qe === 0 && (qe = 5);
  }
  function Gn(e, t, n) {
    var r = Ne,
      i = Rt.transition;
    try {
      (Rt.transition = null), (Ne = 1), Ip(e, t, n, r);
    } finally {
      (Rt.transition = i), (Ne = r);
    }
    return null;
  }
  function Ip(e, t, n, r) {
    do Er();
    while (Pn !== null);
    if (ye & 6) throw Error(o(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
      throw Error(o(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var s = n.lanes | n.childLanes;
    if (
      (vf(e, s),
      e === be && ((Qe = be = null), (nt = 0)),
      (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
        Si ||
        ((Si = !0),
        Qc(Rl, function () {
          return Er(), null;
        })),
      (s = (n.flags & 15990) !== 0),
      n.subtreeFlags & 15990 || s)
    ) {
      (s = Rt.transition), (Rt.transition = null);
      var c = Ne;
      Ne = 1;
      var h = ye;
      (ye |= 4),
        (Co.current = null),
        Lp(e, n),
        Tc(n, e),
        np(Ds),
        (Il = !!Os),
        (Ds = Os = null),
        (e.current = n),
        Tp(n),
        of(),
        (ye = h),
        (Ne = c),
        (Rt.transition = s);
    } else e.current = n;
    if (
      (Si && ((Si = !1), (Pn = e), (ki = i)),
      (s = e.pendingLanes),
      s === 0 && (Cn = null),
      cf(n.stateNode),
      gt(e, Be()),
      t !== null)
    )
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
    if (wi) throw ((wi = !1), (e = Lo), (Lo = null), e);
    return (
      ki & 1 && e.tag !== 0 && Er(),
      (s = e.pendingLanes),
      s & 1 ? (e === To ? ul++ : ((ul = 0), (To = e))) : (ul = 0),
      jn(),
      null
    );
  }
  function Er() {
    if (Pn !== null) {
      var e = Ra(ki),
        t = Rt.transition,
        n = Ne;
      try {
        if (((Rt.transition = null), (Ne = 16 > e ? 16 : e), Pn === null))
          var r = !1;
        else {
          if (((e = Pn), (Pn = null), (ki = 0), ye & 6)) throw Error(o(331));
          var i = ye;
          for (ye |= 4, X = e.current; X !== null; ) {
            var s = X,
              c = s.child;
            if (X.flags & 16) {
              var h = s.deletions;
              if (h !== null) {
                for (var v = 0; v < h.length; v++) {
                  var C = h[v];
                  for (X = C; X !== null; ) {
                    var A = X;
                    switch (A.tag) {
                      case 0:
                      case 11:
                      case 15:
                        sl(8, A, s);
                    }
                    var V = A.child;
                    if (V !== null) (V.return = A), (X = V);
                    else
                      for (; X !== null; ) {
                        A = X;
                        var I = A.sibling,
                          q = A.return;
                        if ((_c(A), A === C)) {
                          X = null;
                          break;
                        }
                        if (I !== null) {
                          (I.return = q), (X = I);
                          break;
                        }
                        X = q;
                      }
                  }
                }
                var G = s.alternate;
                if (G !== null) {
                  var Z = G.child;
                  if (Z !== null) {
                    G.child = null;
                    do {
                      var We = Z.sibling;
                      (Z.sibling = null), (Z = We);
                    } while (Z !== null);
                  }
                }
                X = s;
              }
            }
            if (s.subtreeFlags & 2064 && c !== null) (c.return = s), (X = c);
            else
              e: for (; X !== null; ) {
                if (((s = X), s.flags & 2048))
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      sl(9, s, s.return);
                  }
                var j = s.sibling;
                if (j !== null) {
                  (j.return = s.return), (X = j);
                  break e;
                }
                X = s.return;
              }
          }
          var x = e.current;
          for (X = x; X !== null; ) {
            c = X;
            var E = c.child;
            if (c.subtreeFlags & 2064 && E !== null) (E.return = c), (X = E);
            else
              e: for (c = x; X !== null; ) {
                if (((h = X), h.flags & 2048))
                  try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        gi(9, h);
                    }
                  } catch (b) {
                    Ve(h, h.return, b);
                  }
                if (h === c) {
                  X = null;
                  break e;
                }
                var B = h.sibling;
                if (B !== null) {
                  (B.return = h.return), (X = B);
                  break e;
                }
                X = h.return;
              }
          }
          if (
            ((ye = i),
            jn(),
            Bt && typeof Bt.onPostCommitFiberRoot == "function")
          )
            try {
              Bt.onPostCommitFiberRoot(Ll, e);
            } catch {}
          r = !0;
        }
        return r;
      } finally {
        (Ne = n), (Rt.transition = t);
      }
    }
    return !1;
  }
  function Bc(e, t, n) {
    (t = wr(n, t)),
      (t = sc(e, t, 1)),
      (e = Nn(e, t, 1)),
      (t = dt()),
      e !== null && (zr(e, 1, t), gt(e, t));
  }
  function Ve(e, t, n) {
    if (e.tag === 3) Bc(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Bc(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof r.componentDidCatch == "function" &&
              (Cn === null || !Cn.has(r)))
          ) {
            (e = wr(n, e)),
              (e = oc(t, e, 1)),
              (t = Nn(t, e, 1)),
              (e = dt()),
              t !== null && (zr(t, 1, e), gt(t, e));
            break;
          }
        }
        t = t.return;
      }
  }
  function Ap(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
      (t = dt()),
      (e.pingedLanes |= e.suspendedLanes & n),
      be === e &&
        (nt & n) === n &&
        (qe === 4 || (qe === 3 && (nt & 130023424) === nt && 500 > Be() - Ro)
          ? Xn(e, 0)
          : (Po |= n)),
      gt(e, t);
  }
  function Wc(e, t) {
    t === 0 &&
      (e.mode & 1
        ? ((t = Fl), (Fl <<= 1), !(Fl & 130023424) && (Fl = 4194304))
        : (t = 1));
    var n = dt();
    (e = sn(e, t)), e !== null && (zr(e, t, n), gt(e, n));
  }
  function Mp(e) {
    var t = e.memoizedState,
      n = 0;
    t !== null && (n = t.retryLane), Wc(e, n);
  }
  function $p(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          i = e.memoizedState;
        i !== null && (n = i.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(o(314));
    }
    r !== null && r.delete(t), Wc(e, n);
  }
  var Hc;
  Hc = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || pt.current) mt = !0;
      else {
        if (!(e.lanes & n) && !(t.flags & 128)) return (mt = !1), _p(e, t, n);
        mt = !!(e.flags & 131072);
      }
    else (mt = !1), De && t.flags & 1048576 && ju(t, ei, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        mi(e, t), (e = t.pendingProps);
        var i = fr(t, lt.current);
        yr(t, n), (i = io(null, t, r, e, i, n));
        var s = so();
        return (
          (t.flags |= 1),
          typeof i == "object" &&
          i !== null &&
          typeof i.render == "function" &&
          i.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              ht(r) ? ((s = !0), Jl(t)) : (s = !1),
              (t.memoizedState =
                i.state !== null && i.state !== void 0 ? i.state : null),
              Zs(t),
              (i.updater = pi),
              (t.stateNode = i),
              (i._reactInternals = t),
              po(t, r, e, n),
              (t = go(null, t, r, !0, s, n)))
            : ((t.tag = 0), De && s && Bs(t), ct(null, t, i, n), (t = t.child)),
          t
        );
      case 16:
        r = t.elementType;
        e: {
          switch (
            (mi(e, t),
            (e = t.pendingProps),
            (i = r._init),
            (r = i(r._payload)),
            (t.type = r),
            (i = t.tag = Up(r)),
            (e = Dt(r, e)),
            i)
          ) {
            case 0:
              t = vo(null, t, r, e, n);
              break e;
            case 1:
              t = vc(null, t, r, e, n);
              break e;
            case 11:
              t = dc(null, t, r, e, n);
              break e;
            case 14:
              t = fc(null, t, r, Dt(r.type, e), n);
              break e;
          }
          throw Error(o(306, r, ""));
        }
        return t;
      case 0:
        return (
          (r = t.type),
          (i = t.pendingProps),
          (i = t.elementType === r ? i : Dt(r, i)),
          vo(e, t, r, i, n)
        );
      case 1:
        return (
          (r = t.type),
          (i = t.pendingProps),
          (i = t.elementType === r ? i : Dt(r, i)),
          vc(e, t, r, i, n)
        );
      case 3:
        e: {
          if ((gc(t), e === null)) throw Error(o(387));
          (r = t.pendingProps),
            (s = t.memoizedState),
            (i = s.element),
            Fu(e, t),
            si(t, r, null, n);
          var c = t.memoizedState;
          if (((r = c.element), s.isDehydrated))
            if (
              ((s = {
                element: r,
                isDehydrated: !1,
                cache: c.cache,
                pendingSuspenseBoundaries: c.pendingSuspenseBoundaries,
                transitions: c.transitions,
              }),
              (t.updateQueue.baseState = s),
              (t.memoizedState = s),
              t.flags & 256)
            ) {
              (i = wr(Error(o(423)), t)), (t = yc(e, t, r, n, i));
              break e;
            } else if (r !== i) {
              (i = wr(Error(o(424)), t)), (t = yc(e, t, r, n, i));
              break e;
            } else
              for (
                jt = wn(t.stateNode.containerInfo.firstChild),
                  kt = t,
                  De = !0,
                  Ot = null,
                  n = Lu(t, null, r, n),
                  t.child = n;
                n;

              )
                (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
          else {
            if ((mr(), r === i)) {
              t = an(e, t, n);
              break e;
            }
            ct(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          Du(t),
          e === null && Qs(t),
          (r = t.type),
          (i = t.pendingProps),
          (s = e !== null ? e.memoizedProps : null),
          (c = i.children),
          Is(r, i) ? (c = null) : s !== null && Is(r, s) && (t.flags |= 32),
          mc(e, t),
          ct(e, t, c, n),
          t.child
        );
      case 6:
        return e === null && Qs(t), null;
      case 13:
        return xc(e, t, n);
      case 4:
        return (
          bs(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = vr(t, null, r, n)) : ct(e, t, r, n),
          t.child
        );
      case 11:
        return (
          (r = t.type),
          (i = t.pendingProps),
          (i = t.elementType === r ? i : Dt(r, i)),
          dc(e, t, r, i, n)
        );
      case 7:
        return ct(e, t, t.pendingProps, n), t.child;
      case 8:
        return ct(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return ct(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (
            ((r = t.type._context),
            (i = t.pendingProps),
            (s = t.memoizedProps),
            (c = i.value),
            Te(ri, r._currentValue),
            (r._currentValue = c),
            s !== null)
          )
            if (zt(s.value, c)) {
              if (s.children === i.children && !pt.current) {
                t = an(e, t, n);
                break e;
              }
            } else
              for (s = t.child, s !== null && (s.return = t); s !== null; ) {
                var h = s.dependencies;
                if (h !== null) {
                  c = s.child;
                  for (var v = h.firstContext; v !== null; ) {
                    if (v.context === r) {
                      if (s.tag === 1) {
                        (v = on(-1, n & -n)), (v.tag = 2);
                        var C = s.updateQueue;
                        if (C !== null) {
                          C = C.shared;
                          var A = C.pending;
                          A === null
                            ? (v.next = v)
                            : ((v.next = A.next), (A.next = v)),
                            (C.pending = v);
                        }
                      }
                      (s.lanes |= n),
                        (v = s.alternate),
                        v !== null && (v.lanes |= n),
                        Gs(s.return, n, t),
                        (h.lanes |= n);
                      break;
                    }
                    v = v.next;
                  }
                } else if (s.tag === 10) c = s.type === t.type ? null : s.child;
                else if (s.tag === 18) {
                  if (((c = s.return), c === null)) throw Error(o(341));
                  (c.lanes |= n),
                    (h = c.alternate),
                    h !== null && (h.lanes |= n),
                    Gs(c, n, t),
                    (c = s.sibling);
                } else c = s.child;
                if (c !== null) c.return = s;
                else
                  for (c = s; c !== null; ) {
                    if (c === t) {
                      c = null;
                      break;
                    }
                    if (((s = c.sibling), s !== null)) {
                      (s.return = c.return), (c = s);
                      break;
                    }
                    c = c.return;
                  }
                s = c;
              }
          ct(e, t, i.children, n), (t = t.child);
        }
        return t;
      case 9:
        return (
          (i = t.type),
          (r = t.pendingProps.children),
          yr(t, n),
          (i = Ct(i)),
          (r = r(i)),
          (t.flags |= 1),
          ct(e, t, r, n),
          t.child
        );
      case 14:
        return (
          (r = t.type),
          (i = Dt(r, t.pendingProps)),
          (i = Dt(r.type, i)),
          fc(e, t, r, i, n)
        );
      case 15:
        return pc(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (i = t.pendingProps),
          (i = t.elementType === r ? i : Dt(r, i)),
          mi(e, t),
          (t.tag = 1),
          ht(r) ? ((e = !0), Jl(t)) : (e = !1),
          yr(t, n),
          lc(t, r, i),
          po(t, r, i, n),
          go(null, t, r, !0, e, n)
        );
      case 19:
        return Sc(e, t, n);
      case 22:
        return hc(e, t, n);
    }
    throw Error(o(156, t.tag));
  };
  function Qc(e, t) {
    return Ea(e, t);
  }
  function Vp(e, t, n, r) {
    (this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function Lt(e, t, n, r) {
    return new Vp(e, t, n, r);
  }
  function Ao(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function Up(e) {
    if (typeof e == "function") return Ao(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === ie)) return 11;
      if (e === Pe) return 14;
    }
    return 2;
  }
  function Tn(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = Lt(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 14680064),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    );
  }
  function _i(e, t, n, r, i, s) {
    var c = 2;
    if (((r = e), typeof e == "function")) Ao(e) && (c = 1);
    else if (typeof e == "string") c = 5;
    else
      e: switch (e) {
        case _e:
          return Jn(n.children, i, s, t);
        case Ce:
          (c = 8), (i |= 8);
          break;
        case je:
          return (
            (e = Lt(12, n, t, i | 2)), (e.elementType = je), (e.lanes = s), e
          );
        case ue:
          return (e = Lt(13, n, t, i)), (e.elementType = ue), (e.lanes = s), e;
        case Se:
          return (e = Lt(19, n, t, i)), (e.elementType = Se), (e.lanes = s), e;
        case me:
          return Ci(n, i, s, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case we:
                c = 10;
                break e;
              case at:
                c = 9;
                break e;
              case ie:
                c = 11;
                break e;
              case Pe:
                c = 14;
                break e;
              case Le:
                (c = 16), (r = null);
                break e;
            }
          throw Error(o(130, e == null ? e : typeof e, ""));
      }
    return (
      (t = Lt(c, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = s), t
    );
  }
  function Jn(e, t, n, r) {
    return (e = Lt(7, e, r, t)), (e.lanes = n), e;
  }
  function Ci(e, t, n, r) {
    return (
      (e = Lt(22, e, r, t)),
      (e.elementType = me),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function Mo(e, t, n) {
    return (e = Lt(6, e, null, t)), (e.lanes = n), e;
  }
  function $o(e, t, n) {
    return (
      (t = Lt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function Bp(e, t, n, r, i) {
    (this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = ds(0)),
      (this.expirationTimes = ds(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = ds(0)),
      (this.identifierPrefix = r),
      (this.onRecoverableError = i),
      (this.mutableSourceEagerHydrationData = null);
  }
  function Vo(e, t, n, r, i, s, c, h, v) {
    return (
      (e = new Bp(e, t, n, h, v)),
      t === 1 ? ((t = 1), s === !0 && (t |= 8)) : (t = 0),
      (s = Lt(3, null, null, t)),
      (e.current = s),
      (s.stateNode = e),
      (s.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Zs(s),
      e
    );
  }
  function Wp(e, t, n) {
    var r =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: ke,
      key: r == null ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function Kc(e) {
    if (!e) return kn;
    e = e._reactInternals;
    e: {
      if ($n(e) !== e || e.tag !== 1) throw Error(o(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (ht(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(o(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (ht(n)) return wu(e, n, t);
    }
    return t;
  }
  function Yc(e, t, n, r, i, s, c, h, v) {
    return (
      (e = Vo(n, r, !0, e, i, s, c, h, v)),
      (e.context = Kc(null)),
      (n = e.current),
      (r = dt()),
      (i = Rn(n)),
      (s = on(r, i)),
      (s.callback = t ?? null),
      Nn(n, s, i),
      (e.current.lanes = i),
      zr(e, i, r),
      gt(e, r),
      e
    );
  }
  function Pi(e, t, n, r) {
    var i = t.current,
      s = dt(),
      c = Rn(i);
    return (
      (n = Kc(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = on(s, c)),
      (t.payload = { element: e }),
      (r = r === void 0 ? null : r),
      r !== null && (t.callback = r),
      (e = Nn(i, t, c)),
      e !== null && (Mt(e, i, c, s), ii(e, i, c)),
      c
    );
  }
  function Ri(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function qc(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Uo(e, t) {
    qc(e, t), (e = e.alternate) && qc(e, t);
  }
  var Xc =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function Bo(e) {
    this._internalRoot = e;
  }
  (Li.prototype.render = Bo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      Pi(e, t, null, null);
    }),
    (Li.prototype.unmount = Bo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          qn(function () {
            Pi(null, e, null, null);
          }),
            (t[tn] = null);
        }
      });
  function Li(e) {
    this._internalRoot = e;
  }
  Li.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Fa();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < gn.length && t !== 0 && t < gn[n].priority; n++);
      gn.splice(n, 0, e), n === 0 && Da(e);
    }
  };
  function Wo(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function Ti(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Gc() {}
  function Hp(e, t, n, r, i) {
    if (i) {
      if (typeof r == "function") {
        var s = r;
        r = function () {
          var C = Ri(c);
          s.call(C);
        };
      }
      var c = Yc(t, r, e, 0, null, !1, !1, "", Gc);
      return (
        (e._reactRootContainer = c),
        (e[tn] = c.current),
        Yr(e.nodeType === 8 ? e.parentNode : e),
        qn(),
        c
      );
    }
    for (; (i = e.lastChild); ) e.removeChild(i);
    if (typeof r == "function") {
      var h = r;
      r = function () {
        var C = Ri(v);
        h.call(C);
      };
    }
    var v = Vo(e, 0, !1, null, null, !1, !1, "", Gc);
    return (
      (e._reactRootContainer = v),
      (e[tn] = v.current),
      Yr(e.nodeType === 8 ? e.parentNode : e),
      qn(function () {
        Pi(t, v, n, r);
      }),
      v
    );
  }
  function Fi(e, t, n, r, i) {
    var s = n._reactRootContainer;
    if (s) {
      var c = s;
      if (typeof i == "function") {
        var h = i;
        i = function () {
          var v = Ri(c);
          h.call(v);
        };
      }
      Pi(t, c, e, i);
    } else c = Hp(n, t, e, i, r);
    return Ri(c);
  }
  (La = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Fr(t.pendingLanes);
          n !== 0 &&
            (fs(t, n | 1), gt(t, Be()), !(ye & 6) && ((jr = Be() + 500), jn()));
        }
        break;
      case 13:
        qn(function () {
          var r = sn(e, 1);
          if (r !== null) {
            var i = dt();
            Mt(r, e, 1, i);
          }
        }),
          Uo(e, 1);
    }
  }),
    (ps = function (e) {
      if (e.tag === 13) {
        var t = sn(e, 134217728);
        if (t !== null) {
          var n = dt();
          Mt(t, e, 134217728, n);
        }
        Uo(e, 134217728);
      }
    }),
    (Ta = function (e) {
      if (e.tag === 13) {
        var t = Rn(e),
          n = sn(e, t);
        if (n !== null) {
          var r = dt();
          Mt(n, e, t, r);
        }
        Uo(e, t);
      }
    }),
    (Fa = function () {
      return Ne;
    }),
    (za = function (e, t) {
      var n = Ne;
      try {
        return (Ne = e), t();
      } finally {
        Ne = n;
      }
    }),
    (is = function (e, t, n) {
      switch (t) {
        case "input":
          if ((jl(e, n), (t = n.name), n.type === "radio" && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var i = Xl(r);
                if (!i) throw Error(o(90));
                kl(r), jl(r, i);
              }
            }
          }
          break;
        case "textarea":
          te(e, n);
          break;
        case "select":
          (t = n.value), t != null && K(e, !!n.multiple, t, !1);
      }
    }),
    (ga = Oo),
    (ya = qn);
  var Qp = { usingClientEntryPoint: !1, Events: [Gr, cr, Xl, ma, va, Oo] },
    cl = {
      findFiberByHostInstance: Vn,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    Kp = {
      bundleType: cl.bundleType,
      version: cl.version,
      rendererPackageName: cl.rendererPackageName,
      rendererConfig: cl.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: ae.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return (e = ka(e)), e === null ? null : e.stateNode;
      },
      findFiberByHostInstance: cl.findFiberByHostInstance,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var zi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!zi.isDisabled && zi.supportsFiber)
      try {
        (Ll = zi.inject(Kp)), (Bt = zi);
      } catch {}
  }
  return (
    (yt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qp),
    (yt.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Wo(t)) throw Error(o(200));
      return Wp(e, t, null, n);
    }),
    (yt.createRoot = function (e, t) {
      if (!Wo(e)) throw Error(o(299));
      var n = !1,
        r = "",
        i = Xc;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = Vo(e, 1, !1, null, null, n, !1, r, i)),
        (e[tn] = t.current),
        Yr(e.nodeType === 8 ? e.parentNode : e),
        new Bo(t)
      );
    }),
    (yt.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(o(188))
          : ((e = Object.keys(e).join(",")), Error(o(268, e)));
      return (e = ka(t)), (e = e === null ? null : e.stateNode), e;
    }),
    (yt.flushSync = function (e) {
      return qn(e);
    }),
    (yt.hydrate = function (e, t, n) {
      if (!Ti(t)) throw Error(o(200));
      return Fi(null, e, t, !0, n);
    }),
    (yt.hydrateRoot = function (e, t, n) {
      if (!Wo(e)) throw Error(o(405));
      var r = (n != null && n.hydratedSources) || null,
        i = !1,
        s = "",
        c = Xc;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (i = !0),
          n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (c = n.onRecoverableError)),
        (t = Yc(t, null, e, 1, n ?? null, i, !1, s, c)),
        (e[tn] = t.current),
        Yr(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          (n = r[e]),
            (i = n._getVersion),
            (i = i(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, i])
              : t.mutableSourceEagerHydrationData.push(n, i);
      return new Li(t);
    }),
    (yt.render = function (e, t, n) {
      if (!Ti(t)) throw Error(o(200));
      return Fi(null, e, t, !1, n);
    }),
    (yt.unmountComponentAtNode = function (e) {
      if (!Ti(e)) throw Error(o(40));
      return e._reactRootContainer
        ? (qn(function () {
            Fi(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[tn] = null);
            });
          }),
          !0)
        : !1;
    }),
    (yt.unstable_batchedUpdates = Oo),
    (yt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!Ti(n)) throw Error(o(200));
      if (e == null || e._reactInternals === void 0) throw Error(o(38));
      return Fi(e, t, n, !1, r);
    }),
    (yt.version = "18.3.1-next-f1338f8080-20240426"),
    yt
  );
}
var ld;
function th() {
  if (ld) return Ko.exports;
  ld = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (a) {
        console.error(a);
      }
  }
  return l(), (Ko.exports = eh()), Ko.exports;
}
var id;
function nh() {
  if (id) return Oi;
  id = 1;
  var l = th();
  return (Oi.createRoot = l.createRoot), (Oi.hydrateRoot = l.hydrateRoot), Oi;
}
var rh = nh(),
  N = ra();
const Ge = qp(N);
var fl = {},
  sd;
function lh() {
  if (sd) return fl;
  (sd = 1),
    Object.defineProperty(fl, "__esModule", { value: !0 }),
    (fl.parse = m),
    (fl.serialize = w);
  const l = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    a = /^[\u0021-\u003A\u003C-\u007E]*$/,
    o =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    d = /^[\u0020-\u003A\u003D-\u007E]*$/,
    f = Object.prototype.toString,
    p = (() => {
      const L = function () {};
      return (L.prototype = Object.create(null)), L;
    })();
  function m(L, z) {
    const F = new p(),
      $ = L.length;
    if ($ < 2) return F;
    const D = (z == null ? void 0 : z.decode) || P;
    let U = 0;
    do {
      const M = L.indexOf("=", U);
      if (M === -1) break;
      const le = L.indexOf(";", U),
        ae = le === -1 ? $ : le;
      if (M > ae) {
        U = L.lastIndexOf(";", M - 1) + 1;
        continue;
      }
      const oe = y(L, U, M),
        ke = S(L, M, oe),
        _e = L.slice(oe, ke);
      if (F[_e] === void 0) {
        let Ce = y(L, M + 1, ae),
          je = S(L, ae, Ce);
        const we = D(L.slice(Ce, je));
        F[_e] = we;
      }
      U = ae + 1;
    } while (U < $);
    return F;
  }
  function y(L, z, F) {
    do {
      const $ = L.charCodeAt(z);
      if ($ !== 32 && $ !== 9) return z;
    } while (++z < F);
    return F;
  }
  function S(L, z, F) {
    for (; z > F; ) {
      const $ = L.charCodeAt(--z);
      if ($ !== 32 && $ !== 9) return z + 1;
    }
    return F;
  }
  function w(L, z, F) {
    const $ = (F == null ? void 0 : F.encode) || encodeURIComponent;
    if (!l.test(L)) throw new TypeError(`argument name is invalid: ${L}`);
    const D = $(z);
    if (!a.test(D)) throw new TypeError(`argument val is invalid: ${z}`);
    let U = L + "=" + D;
    if (!F) return U;
    if (F.maxAge !== void 0) {
      if (!Number.isInteger(F.maxAge))
        throw new TypeError(`option maxAge is invalid: ${F.maxAge}`);
      U += "; Max-Age=" + F.maxAge;
    }
    if (F.domain) {
      if (!o.test(F.domain))
        throw new TypeError(`option domain is invalid: ${F.domain}`);
      U += "; Domain=" + F.domain;
    }
    if (F.path) {
      if (!d.test(F.path))
        throw new TypeError(`option path is invalid: ${F.path}`);
      U += "; Path=" + F.path;
    }
    if (F.expires) {
      if (!R(F.expires) || !Number.isFinite(F.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${F.expires}`);
      U += "; Expires=" + F.expires.toUTCString();
    }
    if (
      (F.httpOnly && (U += "; HttpOnly"),
      F.secure && (U += "; Secure"),
      F.partitioned && (U += "; Partitioned"),
      F.priority)
    )
      switch (
        typeof F.priority == "string" ? F.priority.toLowerCase() : void 0
      ) {
        case "low":
          U += "; Priority=Low";
          break;
        case "medium":
          U += "; Priority=Medium";
          break;
        case "high":
          U += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${F.priority}`);
      }
    if (F.sameSite)
      switch (
        typeof F.sameSite == "string" ? F.sameSite.toLowerCase() : F.sameSite
      ) {
        case !0:
        case "strict":
          U += "; SameSite=Strict";
          break;
        case "lax":
          U += "; SameSite=Lax";
          break;
        case "none":
          U += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${F.sameSite}`);
      }
    return U;
  }
  function P(L) {
    if (L.indexOf("%") === -1) return L;
    try {
      return decodeURIComponent(L);
    } catch {
      return L;
    }
  }
  function R(L) {
    return f.call(L) === "[object Date]";
  }
  return fl;
}
lh();
/**
 * react-router v7.1.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var od = "popstate";
function ih(l = {}) {
  function a(d, f) {
    let { pathname: p, search: m, hash: y } = d.location;
    return ea(
      "",
      { pathname: p, search: m, hash: y },
      (f.state && f.state.usr) || null,
      (f.state && f.state.key) || "default",
    );
  }
  function o(d, f) {
    return typeof f == "string" ? f : gl(f);
  }
  return oh(a, o, null, l);
}
function Me(l, a) {
  if (l === !1 || l === null || typeof l > "u") throw new Error(a);
}
function Jt(l, a) {
  if (!l) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {}
  }
}
function sh() {
  return Math.random().toString(36).substring(2, 10);
}
function ad(l, a) {
  return { usr: l.state, key: l.key, idx: a };
}
function ea(l, a, o = null, d) {
  return {
    pathname: typeof l == "string" ? l : l.pathname,
    search: "",
    hash: "",
    ...(typeof a == "string" ? _r(a) : a),
    state: o,
    key: (a && a.key) || d || sh(),
  };
}
function gl({ pathname: l = "/", search: a = "", hash: o = "" }) {
  return (
    a && a !== "?" && (l += a.charAt(0) === "?" ? a : "?" + a),
    o && o !== "#" && (l += o.charAt(0) === "#" ? o : "#" + o),
    l
  );
}
function _r(l) {
  let a = {};
  if (l) {
    let o = l.indexOf("#");
    o >= 0 && ((a.hash = l.substring(o)), (l = l.substring(0, o)));
    let d = l.indexOf("?");
    d >= 0 && ((a.search = l.substring(d)), (l = l.substring(0, d))),
      l && (a.pathname = l);
  }
  return a;
}
function oh(l, a, o, d = {}) {
  let { window: f = document.defaultView, v5Compat: p = !1 } = d,
    m = f.history,
    y = "POP",
    S = null,
    w = P();
  w == null && ((w = 0), m.replaceState({ ...m.state, idx: w }, ""));
  function P() {
    return (m.state || { idx: null }).idx;
  }
  function R() {
    y = "POP";
    let D = P(),
      U = D == null ? null : D - w;
    (w = D), S && S({ action: y, location: $.location, delta: U });
  }
  function L(D, U) {
    y = "PUSH";
    let M = ea($.location, D, U);
    w = P() + 1;
    let le = ad(M, w),
      ae = $.createHref(M);
    try {
      m.pushState(le, "", ae);
    } catch (oe) {
      if (oe instanceof DOMException && oe.name === "DataCloneError") throw oe;
      f.location.assign(ae);
    }
    p && S && S({ action: y, location: $.location, delta: 1 });
  }
  function z(D, U) {
    y = "REPLACE";
    let M = ea($.location, D, U);
    w = P();
    let le = ad(M, w),
      ae = $.createHref(M);
    m.replaceState(le, "", ae),
      p && S && S({ action: y, location: $.location, delta: 0 });
  }
  function F(D) {
    let U = f.location.origin !== "null" ? f.location.origin : f.location.href,
      M = typeof D == "string" ? D : gl(D);
    return (
      (M = M.replace(/ $/, "%20")),
      Me(
        U,
        `No window.location.(origin|href) available to create URL for href: ${M}`,
      ),
      new URL(M, U)
    );
  }
  let $ = {
    get action() {
      return y;
    },
    get location() {
      return l(f, m);
    },
    listen(D) {
      if (S) throw new Error("A history only accepts one active listener");
      return (
        f.addEventListener(od, R),
        (S = D),
        () => {
          f.removeEventListener(od, R), (S = null);
        }
      );
    },
    createHref(D) {
      return a(f, D);
    },
    createURL: F,
    encodeLocation(D) {
      let U = F(D);
      return { pathname: U.pathname, search: U.search, hash: U.hash };
    },
    push: L,
    replace: z,
    go(D) {
      return m.go(D);
    },
  };
  return $;
}
function _d(l, a, o = "/") {
  return ah(l, a, o, !1);
}
function ah(l, a, o, d) {
  let f = typeof a == "string" ? _r(a) : a,
    p = On(f.pathname || "/", o);
  if (p == null) return null;
  let m = Cd(l);
  uh(m);
  let y = null;
  for (let S = 0; y == null && S < m.length; ++S) {
    let w = wh(p);
    y = yh(m[S], w, d);
  }
  return y;
}
function Cd(l, a = [], o = [], d = "") {
  let f = (p, m, y) => {
    let S = {
      relativePath: y === void 0 ? p.path || "" : y,
      caseSensitive: p.caseSensitive === !0,
      childrenIndex: m,
      route: p,
    };
    S.relativePath.startsWith("/") &&
      (Me(
        S.relativePath.startsWith(d),
        `Absolute route path "${S.relativePath}" nested under path "${d}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
      (S.relativePath = S.relativePath.slice(d.length)));
    let w = fn([d, S.relativePath]),
      P = o.concat(S);
    p.children &&
      p.children.length > 0 &&
      (Me(
        p.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${w}".`,
      ),
      Cd(p.children, a, P, w)),
      !(p.path == null && !p.index) &&
        a.push({ path: w, score: vh(w, p.index), routesMeta: P });
  };
  return (
    l.forEach((p, m) => {
      var y;
      if (p.path === "" || !((y = p.path) != null && y.includes("?"))) f(p, m);
      else for (let S of Pd(p.path)) f(p, m, S);
    }),
    a
  );
}
function Pd(l) {
  let a = l.split("/");
  if (a.length === 0) return [];
  let [o, ...d] = a,
    f = o.endsWith("?"),
    p = o.replace(/\?$/, "");
  if (d.length === 0) return f ? [p, ""] : [p];
  let m = Pd(d.join("/")),
    y = [];
  return (
    y.push(...m.map((S) => (S === "" ? p : [p, S].join("/")))),
    f && y.push(...m),
    y.map((S) => (l.startsWith("/") && S === "" ? "/" : S))
  );
}
function uh(l) {
  l.sort((a, o) =>
    a.score !== o.score
      ? o.score - a.score
      : gh(
          a.routesMeta.map((d) => d.childrenIndex),
          o.routesMeta.map((d) => d.childrenIndex),
        ),
  );
}
var ch = /^:[\w-]+$/,
  dh = 3,
  fh = 2,
  ph = 1,
  hh = 10,
  mh = -2,
  ud = (l) => l === "*";
function vh(l, a) {
  let o = l.split("/"),
    d = o.length;
  return (
    o.some(ud) && (d += mh),
    a && (d += fh),
    o
      .filter((f) => !ud(f))
      .reduce((f, p) => f + (ch.test(p) ? dh : p === "" ? ph : hh), d)
  );
}
function gh(l, a) {
  return l.length === a.length && l.slice(0, -1).every((d, f) => d === a[f])
    ? l[l.length - 1] - a[a.length - 1]
    : 0;
}
function yh(l, a, o = !1) {
  let { routesMeta: d } = l,
    f = {},
    p = "/",
    m = [];
  for (let y = 0; y < d.length; ++y) {
    let S = d[y],
      w = y === d.length - 1,
      P = p === "/" ? a : a.slice(p.length) || "/",
      R = Ui(
        { path: S.relativePath, caseSensitive: S.caseSensitive, end: w },
        P,
      ),
      L = S.route;
    if (
      (!R &&
        w &&
        o &&
        !d[d.length - 1].route.index &&
        (R = Ui(
          { path: S.relativePath, caseSensitive: S.caseSensitive, end: !1 },
          P,
        )),
      !R)
    )
      return null;
    Object.assign(f, R.params),
      m.push({
        params: f,
        pathname: fn([p, R.pathname]),
        pathnameBase: Eh(fn([p, R.pathnameBase])),
        route: L,
      }),
      R.pathnameBase !== "/" && (p = fn([p, R.pathnameBase]));
  }
  return m;
}
function Ui(l, a) {
  typeof l == "string" && (l = { path: l, caseSensitive: !1, end: !0 });
  let [o, d] = xh(l.path, l.caseSensitive, l.end),
    f = a.match(o);
  if (!f) return null;
  let p = f[0],
    m = p.replace(/(.)\/+$/, "$1"),
    y = f.slice(1);
  return {
    params: d.reduce((w, { paramName: P, isOptional: R }, L) => {
      if (P === "*") {
        let F = y[L] || "";
        m = p.slice(0, p.length - F.length).replace(/(.)\/+$/, "$1");
      }
      const z = y[L];
      return (
        R && !z ? (w[P] = void 0) : (w[P] = (z || "").replace(/%2F/g, "/")), w
      );
    }, {}),
    pathname: p,
    pathnameBase: m,
    pattern: l,
  };
}
function xh(l, a = !1, o = !0) {
  Jt(
    l === "*" || !l.endsWith("*") || l.endsWith("/*"),
    `Route path "${l}" will be treated as if it were "${l.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${l.replace(/\*$/, "/*")}".`,
  );
  let d = [],
    f =
      "^" +
      l
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (m, y, S) => (
            d.push({ paramName: y, isOptional: S != null }),
            S ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    l.endsWith("*")
      ? (d.push({ paramName: "*" }),
        (f += l === "*" || l === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : o
        ? (f += "\\/*$")
        : l !== "" && l !== "/" && (f += "(?:(?=\\/|$))"),
    [new RegExp(f, a ? void 0 : "i"), d]
  );
}
function wh(l) {
  try {
    return l
      .split("/")
      .map((a) => decodeURIComponent(a).replace(/\//g, "%2F"))
      .join("/");
  } catch (a) {
    return (
      Jt(
        !1,
        `The URL path "${l}" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`,
      ),
      l
    );
  }
}
function On(l, a) {
  if (a === "/") return l;
  if (!l.toLowerCase().startsWith(a.toLowerCase())) return null;
  let o = a.endsWith("/") ? a.length - 1 : a.length,
    d = l.charAt(o);
  return d && d !== "/" ? null : l.slice(o) || "/";
}
function Sh(l, a = "/") {
  let {
    pathname: o,
    search: d = "",
    hash: f = "",
  } = typeof l == "string" ? _r(l) : l;
  return {
    pathname: o ? (o.startsWith("/") ? o : kh(o, a)) : a,
    search: Nh(d),
    hash: _h(f),
  };
}
function kh(l, a) {
  let o = a.replace(/\/+$/, "").split("/");
  return (
    l.split("/").forEach((f) => {
      f === ".." ? o.length > 1 && o.pop() : f !== "." && o.push(f);
    }),
    o.length > 1 ? o.join("/") : "/"
  );
}
function Xo(l, a, o, d) {
  return `Cannot include a '${l}' character in a manually specified \`to.${a}\` field [${JSON.stringify(d)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function jh(l) {
  return l.filter(
    (a, o) => o === 0 || (a.route.path && a.route.path.length > 0),
  );
}
function Rd(l) {
  let a = jh(l);
  return a.map((o, d) => (d === a.length - 1 ? o.pathname : o.pathnameBase));
}
function Ld(l, a, o, d = !1) {
  let f;
  typeof l == "string"
    ? (f = _r(l))
    : ((f = { ...l }),
      Me(
        !f.pathname || !f.pathname.includes("?"),
        Xo("?", "pathname", "search", f),
      ),
      Me(
        !f.pathname || !f.pathname.includes("#"),
        Xo("#", "pathname", "hash", f),
      ),
      Me(!f.search || !f.search.includes("#"), Xo("#", "search", "hash", f)));
  let p = l === "" || f.pathname === "",
    m = p ? "/" : f.pathname,
    y;
  if (m == null) y = o;
  else {
    let R = a.length - 1;
    if (!d && m.startsWith("..")) {
      let L = m.split("/");
      for (; L[0] === ".."; ) L.shift(), (R -= 1);
      f.pathname = L.join("/");
    }
    y = R >= 0 ? a[R] : "/";
  }
  let S = Sh(f, y),
    w = m && m !== "/" && m.endsWith("/"),
    P = (p || m === ".") && o.endsWith("/");
  return !S.pathname.endsWith("/") && (w || P) && (S.pathname += "/"), S;
}
var fn = (l) => l.join("/").replace(/\/\/+/g, "/"),
  Eh = (l) => l.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Nh = (l) => (!l || l === "?" ? "" : l.startsWith("?") ? l : "?" + l),
  _h = (l) => (!l || l === "#" ? "" : l.startsWith("#") ? l : "#" + l);
function Ch(l) {
  return (
    l != null &&
    typeof l.status == "number" &&
    typeof l.statusText == "string" &&
    typeof l.internal == "boolean" &&
    "data" in l
  );
}
var Td = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Td);
var Ph = ["GET", ...Td];
new Set(Ph);
var Cr = N.createContext(null);
Cr.displayName = "DataRouter";
var qi = N.createContext(null);
qi.displayName = "DataRouterState";
var Fd = N.createContext({ isTransitioning: !1 });
Fd.displayName = "ViewTransition";
var Rh = N.createContext(new Map());
Rh.displayName = "Fetchers";
var Lh = N.createContext(null);
Lh.displayName = "Await";
var Zt = N.createContext(null);
Zt.displayName = "Navigation";
var yl = N.createContext(null);
yl.displayName = "Location";
var Ut = N.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Ut.displayName = "Route";
var la = N.createContext(null);
la.displayName = "RouteError";
function Th(l, { relative: a } = {}) {
  Me(
    xl(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: o, navigator: d } = N.useContext(Zt),
    { hash: f, pathname: p, search: m } = wl(l, { relative: a }),
    y = p;
  return (
    o !== "/" && (y = p === "/" ? o : fn([o, p])),
    d.createHref({ pathname: y, search: m, hash: f })
  );
}
function xl() {
  return N.useContext(yl) != null;
}
function bn() {
  return (
    Me(
      xl(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    N.useContext(yl).location
  );
}
var zd =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Od(l) {
  N.useContext(Zt).static || N.useLayoutEffect(l);
}
function Dn() {
  let { isDataRoute: l } = N.useContext(Ut);
  return l ? Kh() : Fh();
}
function Fh() {
  Me(
    xl(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let l = N.useContext(Cr),
    { basename: a, navigator: o } = N.useContext(Zt),
    { matches: d } = N.useContext(Ut),
    { pathname: f } = bn(),
    p = JSON.stringify(Rd(d)),
    m = N.useRef(!1);
  return (
    Od(() => {
      m.current = !0;
    }),
    N.useCallback(
      (S, w = {}) => {
        if ((Jt(m.current, zd), !m.current)) return;
        if (typeof S == "number") {
          o.go(S);
          return;
        }
        let P = Ld(S, JSON.parse(p), f, w.relative === "path");
        l == null &&
          a !== "/" &&
          (P.pathname = P.pathname === "/" ? a : fn([a, P.pathname])),
          (w.replace ? o.replace : o.push)(P, w.state, w);
      },
      [a, o, p, f, l],
    )
  );
}
var zh = N.createContext(null);
function Oh(l) {
  let a = N.useContext(Ut).outlet;
  return a && N.createElement(zh.Provider, { value: l }, a);
}
function Dd() {
  let { matches: l } = N.useContext(Ut),
    a = l[l.length - 1];
  return a ? a.params : {};
}
function wl(l, { relative: a } = {}) {
  let { matches: o } = N.useContext(Ut),
    { pathname: d } = bn(),
    f = JSON.stringify(Rd(o));
  return N.useMemo(() => Ld(l, JSON.parse(f), d, a === "path"), [l, f, d, a]);
}
function Dh(l, a) {
  return Id(l, a);
}
function Id(l, a, o, d) {
  var U;
  Me(
    xl(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: f } = N.useContext(Zt),
    { matches: p } = N.useContext(Ut),
    m = p[p.length - 1],
    y = m ? m.params : {},
    S = m ? m.pathname : "/",
    w = m ? m.pathnameBase : "/",
    P = m && m.route;
  {
    let M = (P && P.path) || "";
    Ad(
      S,
      !P || M.endsWith("*") || M.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${S}" (under <Route path="${M}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${M}"> to <Route path="${M === "/" ? "*" : `${M}/*`}">.`,
    );
  }
  let R = bn(),
    L;
  if (a) {
    let M = typeof a == "string" ? _r(a) : a;
    Me(
      w === "/" || ((U = M.pathname) == null ? void 0 : U.startsWith(w)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${w}" but pathname "${M.pathname}" was given in the \`location\` prop.`,
    ),
      (L = M);
  } else L = R;
  let z = L.pathname || "/",
    F = z;
  if (w !== "/") {
    let M = w.replace(/^\//, "").split("/");
    F = "/" + z.replace(/^\//, "").split("/").slice(M.length).join("/");
  }
  let $ = _d(l, { pathname: F });
  Jt(
    P || $ != null,
    `No routes matched location "${L.pathname}${L.search}${L.hash}" `,
  ),
    Jt(
      $ == null ||
        $[$.length - 1].route.element !== void 0 ||
        $[$.length - 1].route.Component !== void 0 ||
        $[$.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${L.pathname}${L.search}${L.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    );
  let D = Vh(
    $ &&
      $.map((M) =>
        Object.assign({}, M, {
          params: Object.assign({}, y, M.params),
          pathname: fn([
            w,
            f.encodeLocation
              ? f.encodeLocation(M.pathname).pathname
              : M.pathname,
          ]),
          pathnameBase:
            M.pathnameBase === "/"
              ? w
              : fn([
                  w,
                  f.encodeLocation
                    ? f.encodeLocation(M.pathnameBase).pathname
                    : M.pathnameBase,
                ]),
        }),
      ),
    p,
    o,
    d,
  );
  return a && D
    ? N.createElement(
        yl.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...L,
            },
            navigationType: "POP",
          },
        },
        D,
      )
    : D;
}
function Ih() {
  let l = Qh(),
    a = Ch(l)
      ? `${l.status} ${l.statusText}`
      : l instanceof Error
        ? l.message
        : JSON.stringify(l),
    o = l instanceof Error ? l.stack : null,
    d = "rgba(200,200,200, 0.5)",
    f = { padding: "0.5rem", backgroundColor: d },
    p = { padding: "2px 4px", backgroundColor: d },
    m = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", l),
    (m = N.createElement(
      N.Fragment,
      null,
      N.createElement("p", null, "💿 Hey developer 👋"),
      N.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        N.createElement("code", { style: p }, "ErrorBoundary"),
        " or",
        " ",
        N.createElement("code", { style: p }, "errorElement"),
        " prop on your route.",
      ),
    )),
    N.createElement(
      N.Fragment,
      null,
      N.createElement("h2", null, "Unexpected Application Error!"),
      N.createElement("h3", { style: { fontStyle: "italic" } }, a),
      o ? N.createElement("pre", { style: f }, o) : null,
      m,
    )
  );
}
var Ah = N.createElement(Ih, null),
  Mh = class extends N.Component {
    constructor(l) {
      super(l),
        (this.state = {
          location: l.location,
          revalidation: l.revalidation,
          error: l.error,
        });
    }
    static getDerivedStateFromError(l) {
      return { error: l };
    }
    static getDerivedStateFromProps(l, a) {
      return a.location !== l.location ||
        (a.revalidation !== "idle" && l.revalidation === "idle")
        ? { error: l.error, location: l.location, revalidation: l.revalidation }
        : {
            error: l.error !== void 0 ? l.error : a.error,
            location: a.location,
            revalidation: l.revalidation || a.revalidation,
          };
    }
    componentDidCatch(l, a) {
      console.error(
        "React Router caught the following error during render",
        l,
        a,
      );
    }
    render() {
      return this.state.error !== void 0
        ? N.createElement(
            Ut.Provider,
            { value: this.props.routeContext },
            N.createElement(la.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          )
        : this.props.children;
    }
  };
function $h({ routeContext: l, match: a, children: o }) {
  let d = N.useContext(Cr);
  return (
    d &&
      d.static &&
      d.staticContext &&
      (a.route.errorElement || a.route.ErrorBoundary) &&
      (d.staticContext._deepestRenderedBoundaryId = a.route.id),
    N.createElement(Ut.Provider, { value: l }, o)
  );
}
function Vh(l, a = [], o = null, d = null) {
  if (l == null) {
    if (!o) return null;
    if (o.errors) l = o.matches;
    else if (a.length === 0 && !o.initialized && o.matches.length > 0)
      l = o.matches;
    else return null;
  }
  let f = l,
    p = o == null ? void 0 : o.errors;
  if (p != null) {
    let S = f.findIndex(
      (w) => w.route.id && (p == null ? void 0 : p[w.route.id]) !== void 0,
    );
    Me(
      S >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(p).join(",")}`,
    ),
      (f = f.slice(0, Math.min(f.length, S + 1)));
  }
  let m = !1,
    y = -1;
  if (o)
    for (let S = 0; S < f.length; S++) {
      let w = f[S];
      if (
        ((w.route.HydrateFallback || w.route.hydrateFallbackElement) && (y = S),
        w.route.id)
      ) {
        let { loaderData: P, errors: R } = o,
          L =
            w.route.loader &&
            !P.hasOwnProperty(w.route.id) &&
            (!R || R[w.route.id] === void 0);
        if (w.route.lazy || L) {
          (m = !0), y >= 0 ? (f = f.slice(0, y + 1)) : (f = [f[0]]);
          break;
        }
      }
    }
  return f.reduceRight((S, w, P) => {
    let R,
      L = !1,
      z = null,
      F = null;
    o &&
      ((R = p && w.route.id ? p[w.route.id] : void 0),
      (z = w.route.errorElement || Ah),
      m &&
        (y < 0 && P === 0
          ? (Ad(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (L = !0),
            (F = null))
          : y === P &&
            ((L = !0), (F = w.route.hydrateFallbackElement || null))));
    let $ = a.concat(f.slice(0, P + 1)),
      D = () => {
        let U;
        return (
          R
            ? (U = z)
            : L
              ? (U = F)
              : w.route.Component
                ? (U = N.createElement(w.route.Component, null))
                : w.route.element
                  ? (U = w.route.element)
                  : (U = S),
          N.createElement($h, {
            match: w,
            routeContext: { outlet: S, matches: $, isDataRoute: o != null },
            children: U,
          })
        );
      };
    return o && (w.route.ErrorBoundary || w.route.errorElement || P === 0)
      ? N.createElement(Mh, {
          location: o.location,
          revalidation: o.revalidation,
          component: z,
          error: R,
          children: D(),
          routeContext: { outlet: null, matches: $, isDataRoute: !0 },
        })
      : D();
  }, null);
}
function ia(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Uh(l) {
  let a = N.useContext(Cr);
  return Me(a, ia(l)), a;
}
function Bh(l) {
  let a = N.useContext(qi);
  return Me(a, ia(l)), a;
}
function Wh(l) {
  let a = N.useContext(Ut);
  return Me(a, ia(l)), a;
}
function sa(l) {
  let a = Wh(l),
    o = a.matches[a.matches.length - 1];
  return (
    Me(
      o.route.id,
      `${l} can only be used on routes that contain a unique "id"`,
    ),
    o.route.id
  );
}
function Hh() {
  return sa("useRouteId");
}
function Qh() {
  var d;
  let l = N.useContext(la),
    a = Bh("useRouteError"),
    o = sa("useRouteError");
  return l !== void 0 ? l : (d = a.errors) == null ? void 0 : d[o];
}
function Kh() {
  let { router: l } = Uh("useNavigate"),
    a = sa("useNavigate"),
    o = N.useRef(!1);
  return (
    Od(() => {
      o.current = !0;
    }),
    N.useCallback(
      async (f, p = {}) => {
        Jt(o.current, zd),
          o.current &&
            (typeof f == "number"
              ? l.navigate(f)
              : await l.navigate(f, { fromRouteId: a, ...p }));
      },
      [l, a],
    )
  );
}
var cd = {};
function Ad(l, a, o) {
  !a && !cd[l] && ((cd[l] = !0), Jt(!1, o));
}
N.memo(Yh);
function Yh({ routes: l, future: a, state: o }) {
  return Id(l, void 0, o, a);
}
function qh(l) {
  return Oh(l.context);
}
function rt(l) {
  Me(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function Xh({
  basename: l = "/",
  children: a = null,
  location: o,
  navigationType: d = "POP",
  navigator: f,
  static: p = !1,
}) {
  Me(
    !xl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let m = l.replace(/^\/*/, "/"),
    y = N.useMemo(
      () => ({ basename: m, navigator: f, static: p, future: {} }),
      [m, f, p],
    );
  typeof o == "string" && (o = _r(o));
  let {
      pathname: S = "/",
      search: w = "",
      hash: P = "",
      state: R = null,
      key: L = "default",
    } = o,
    z = N.useMemo(() => {
      let F = On(S, m);
      return F == null
        ? null
        : {
            location: { pathname: F, search: w, hash: P, state: R, key: L },
            navigationType: d,
          };
    }, [m, S, w, P, R, L, d]);
  return (
    Jt(
      z != null,
      `<Router basename="${m}"> is not able to match the URL "${S}${w}${P}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    z == null
      ? null
      : N.createElement(
          Zt.Provider,
          { value: y },
          N.createElement(yl.Provider, { children: a, value: z }),
        )
  );
}
function Gh({ children: l, location: a }) {
  return Dh(ta(l), a);
}
function ta(l, a = []) {
  let o = [];
  return (
    N.Children.forEach(l, (d, f) => {
      if (!N.isValidElement(d)) return;
      let p = [...a, f];
      if (d.type === N.Fragment) {
        o.push.apply(o, ta(d.props.children, p));
        return;
      }
      Me(
        d.type === rt,
        `[${typeof d.type == "string" ? d.type : d.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        Me(
          !d.props.index || !d.props.children,
          "An index route cannot have child routes.",
        );
      let m = {
        id: d.props.id || p.join("-"),
        caseSensitive: d.props.caseSensitive,
        element: d.props.element,
        Component: d.props.Component,
        index: d.props.index,
        path: d.props.path,
        loader: d.props.loader,
        action: d.props.action,
        hydrateFallbackElement: d.props.hydrateFallbackElement,
        HydrateFallback: d.props.HydrateFallback,
        errorElement: d.props.errorElement,
        ErrorBoundary: d.props.ErrorBoundary,
        hasErrorBoundary:
          d.props.hasErrorBoundary === !0 ||
          d.props.ErrorBoundary != null ||
          d.props.errorElement != null,
        shouldRevalidate: d.props.shouldRevalidate,
        handle: d.props.handle,
        lazy: d.props.lazy,
      };
      d.props.children && (m.children = ta(d.props.children, p)), o.push(m);
    }),
    o
  );
}
var Ai = "get",
  Mi = "application/x-www-form-urlencoded";
function Xi(l) {
  return l != null && typeof l.tagName == "string";
}
function Jh(l) {
  return Xi(l) && l.tagName.toLowerCase() === "button";
}
function Zh(l) {
  return Xi(l) && l.tagName.toLowerCase() === "form";
}
function bh(l) {
  return Xi(l) && l.tagName.toLowerCase() === "input";
}
function em(l) {
  return !!(l.metaKey || l.altKey || l.ctrlKey || l.shiftKey);
}
function tm(l, a) {
  return l.button === 0 && (!a || a === "_self") && !em(l);
}
var Di = null;
function nm() {
  if (Di === null)
    try {
      new FormData(document.createElement("form"), 0), (Di = !1);
    } catch {
      Di = !0;
    }
  return Di;
}
var rm = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Go(l) {
  return l != null && !rm.has(l)
    ? (Jt(
        !1,
        `"${l}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Mi}"`,
      ),
      null)
    : l;
}
function lm(l, a) {
  let o, d, f, p, m;
  if (Zh(l)) {
    let y = l.getAttribute("action");
    (d = y ? On(y, a) : null),
      (o = l.getAttribute("method") || Ai),
      (f = Go(l.getAttribute("enctype")) || Mi),
      (p = new FormData(l));
  } else if (Jh(l) || (bh(l) && (l.type === "submit" || l.type === "image"))) {
    let y = l.form;
    if (y == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let S = l.getAttribute("formaction") || y.getAttribute("action");
    if (
      ((d = S ? On(S, a) : null),
      (o = l.getAttribute("formmethod") || y.getAttribute("method") || Ai),
      (f =
        Go(l.getAttribute("formenctype")) ||
        Go(y.getAttribute("enctype")) ||
        Mi),
      (p = new FormData(y, l)),
      !nm())
    ) {
      let { name: w, type: P, value: R } = l;
      if (P === "image") {
        let L = w ? `${w}.` : "";
        p.append(`${L}x`, "0"), p.append(`${L}y`, "0");
      } else w && p.append(w, R);
    }
  } else {
    if (Xi(l))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    (o = Ai), (d = null), (f = Mi), (m = l);
  }
  return (
    p && f === "text/plain" && ((m = p), (p = void 0)),
    { action: d, method: o.toLowerCase(), encType: f, formData: p, body: m }
  );
}
function oa(l, a) {
  if (l === !1 || l === null || typeof l > "u") throw new Error(a);
}
async function im(l, a) {
  if (l.id in a) return a[l.id];
  try {
    let o = await import(l.module);
    return (a[l.id] = o), o;
  } catch (o) {
    return (
      console.error(
        `Error loading route module \`${l.module}\`, reloading page...`,
      ),
      console.error(o),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function sm(l) {
  return l == null
    ? !1
    : l.href == null
      ? l.rel === "preload" &&
        typeof l.imageSrcSet == "string" &&
        typeof l.imageSizes == "string"
      : typeof l.rel == "string" && typeof l.href == "string";
}
async function om(l, a, o) {
  let d = await Promise.all(
    l.map(async (f) => {
      let p = a.routes[f.route.id];
      if (p) {
        let m = await im(p, o);
        return m.links ? m.links() : [];
      }
      return [];
    }),
  );
  return dm(
    d
      .flat(1)
      .filter(sm)
      .filter((f) => f.rel === "stylesheet" || f.rel === "preload")
      .map((f) =>
        f.rel === "stylesheet"
          ? { ...f, rel: "prefetch", as: "style" }
          : { ...f, rel: "prefetch" },
      ),
  );
}
function dd(l, a, o, d, f, p) {
  let m = (S, w) => (o[w] ? S.route.id !== o[w].route.id : !0),
    y = (S, w) => {
      var P;
      return (
        o[w].pathname !== S.pathname ||
        (((P = o[w].route.path) == null ? void 0 : P.endsWith("*")) &&
          o[w].params["*"] !== S.params["*"])
      );
    };
  return p === "assets"
    ? a.filter((S, w) => m(S, w) || y(S, w))
    : p === "data"
      ? a.filter((S, w) => {
          var R;
          let P = d.routes[S.route.id];
          if (!P || !P.hasLoader) return !1;
          if (m(S, w) || y(S, w)) return !0;
          if (S.route.shouldRevalidate) {
            let L = S.route.shouldRevalidate({
              currentUrl: new URL(
                f.pathname + f.search + f.hash,
                window.origin,
              ),
              currentParams: ((R = o[0]) == null ? void 0 : R.params) || {},
              nextUrl: new URL(l, window.origin),
              nextParams: S.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof L == "boolean") return L;
          }
          return !0;
        })
      : [];
}
function am(l, a) {
  return um(
    l
      .map((o) => {
        let d = a.routes[o.route.id];
        if (!d) return [];
        let f = [d.module];
        return d.imports && (f = f.concat(d.imports)), f;
      })
      .flat(1),
  );
}
function um(l) {
  return [...new Set(l)];
}
function cm(l) {
  let a = {},
    o = Object.keys(l).sort();
  for (let d of o) a[d] = l[d];
  return a;
}
function dm(l, a) {
  let o = new Set();
  return (
    new Set(a),
    l.reduce((d, f) => {
      let p = JSON.stringify(cm(f));
      return o.has(p) || (o.add(p), d.push({ key: p, link: f })), d;
    }, [])
  );
}
function fm(l) {
  let a =
    typeof l == "string"
      ? new URL(
          l,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : l;
  return (
    a.pathname === "/"
      ? (a.pathname = "_root.data")
      : (a.pathname = `${a.pathname.replace(/\/$/, "")}.data`),
    a
  );
}
function pm() {
  let l = N.useContext(Cr);
  return (
    oa(
      l,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    l
  );
}
function hm() {
  let l = N.useContext(qi);
  return (
    oa(
      l,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    l
  );
}
var aa = N.createContext(void 0);
aa.displayName = "FrameworkContext";
function Md() {
  let l = N.useContext(aa);
  return (
    oa(l, "You must render this element inside a <HydratedRouter> element"), l
  );
}
function mm(l, a) {
  let o = N.useContext(aa),
    [d, f] = N.useState(!1),
    [p, m] = N.useState(!1),
    {
      onFocus: y,
      onBlur: S,
      onMouseEnter: w,
      onMouseLeave: P,
      onTouchStart: R,
    } = a,
    L = N.useRef(null);
  N.useEffect(() => {
    if ((l === "render" && m(!0), l === "viewport")) {
      let $ = (U) => {
          U.forEach((M) => {
            m(M.isIntersecting);
          });
        },
        D = new IntersectionObserver($, { threshold: 0.5 });
      return (
        L.current && D.observe(L.current),
        () => {
          D.disconnect();
        }
      );
    }
  }, [l]),
    N.useEffect(() => {
      if (d) {
        let $ = setTimeout(() => {
          m(!0);
        }, 100);
        return () => {
          clearTimeout($);
        };
      }
    }, [d]);
  let z = () => {
      f(!0);
    },
    F = () => {
      f(!1), m(!1);
    };
  return o
    ? l !== "intent"
      ? [p, L, {}]
      : [
          p,
          L,
          {
            onFocus: pl(y, z),
            onBlur: pl(S, F),
            onMouseEnter: pl(w, z),
            onMouseLeave: pl(P, F),
            onTouchStart: pl(R, z),
          },
        ]
    : [!1, L, {}];
}
function pl(l, a) {
  return (o) => {
    l && l(o), o.defaultPrevented || a(o);
  };
}
function vm({ page: l, ...a }) {
  let { router: o } = pm(),
    d = N.useMemo(() => _d(o.routes, l, o.basename), [o.routes, l, o.basename]);
  return d ? N.createElement(ym, { page: l, matches: d, ...a }) : null;
}
function gm(l) {
  let { manifest: a, routeModules: o } = Md(),
    [d, f] = N.useState([]);
  return (
    N.useEffect(() => {
      let p = !1;
      return (
        om(l, a, o).then((m) => {
          p || f(m);
        }),
        () => {
          p = !0;
        }
      );
    }, [l, a, o]),
    d
  );
}
function ym({ page: l, matches: a, ...o }) {
  let d = bn(),
    { manifest: f, routeModules: p } = Md(),
    { loaderData: m, matches: y } = hm(),
    S = N.useMemo(() => dd(l, a, y, f, d, "data"), [l, a, y, f, d]),
    w = N.useMemo(() => dd(l, a, y, f, d, "assets"), [l, a, y, f, d]),
    P = N.useMemo(() => {
      if (l === d.pathname + d.search + d.hash) return [];
      let z = new Set(),
        F = !1;
      if (
        (a.forEach((D) => {
          var M;
          let U = f.routes[D.route.id];
          !U ||
            !U.hasLoader ||
            ((!S.some((le) => le.route.id === D.route.id) &&
              D.route.id in m &&
              (M = p[D.route.id]) != null &&
              M.shouldRevalidate) ||
            U.hasClientLoader
              ? (F = !0)
              : z.add(D.route.id));
        }),
        z.size === 0)
      )
        return [];
      let $ = fm(l);
      return (
        F &&
          z.size > 0 &&
          $.searchParams.set(
            "_routes",
            a
              .filter((D) => z.has(D.route.id))
              .map((D) => D.route.id)
              .join(","),
          ),
        [$.pathname + $.search]
      );
    }, [m, d, f, S, a, l, p]),
    R = N.useMemo(() => am(w, f), [w, f]),
    L = gm(w);
  return N.createElement(
    N.Fragment,
    null,
    P.map((z) =>
      N.createElement("link", {
        key: z,
        rel: "prefetch",
        as: "fetch",
        href: z,
        ...o,
      }),
    ),
    R.map((z) =>
      N.createElement("link", { key: z, rel: "modulepreload", href: z, ...o }),
    ),
    L.map(({ key: z, link: F }) => N.createElement("link", { key: z, ...F })),
  );
}
function xm(...l) {
  return (a) => {
    l.forEach((o) => {
      typeof o == "function" ? o(a) : o != null && (o.current = a);
    });
  };
}
var $d =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  $d && (window.__reactRouterVersion = "7.1.0");
} catch {}
function wm({ basename: l, children: a, window: o }) {
  let d = N.useRef();
  d.current == null && (d.current = ih({ window: o, v5Compat: !0 }));
  let f = d.current,
    [p, m] = N.useState({ action: f.action, location: f.location }),
    y = N.useCallback(
      (S) => {
        N.startTransition(() => m(S));
      },
      [m],
    );
  return (
    N.useLayoutEffect(() => f.listen(y), [f, y]),
    N.createElement(Xh, {
      basename: l,
      children: a,
      location: p.location,
      navigationType: p.action,
      navigator: f,
    })
  );
}
var Vd = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Je = N.forwardRef(function (
    {
      onClick: a,
      discover: o = "render",
      prefetch: d = "none",
      relative: f,
      reloadDocument: p,
      replace: m,
      state: y,
      target: S,
      to: w,
      preventScrollReset: P,
      viewTransition: R,
      ...L
    },
    z,
  ) {
    let { basename: F } = N.useContext(Zt),
      $ = typeof w == "string" && Vd.test(w),
      D,
      U = !1;
    if (typeof w == "string" && $ && ((D = w), $d))
      try {
        let je = new URL(window.location.href),
          we = w.startsWith("//") ? new URL(je.protocol + w) : new URL(w),
          at = On(we.pathname, F);
        we.origin === je.origin && at != null
          ? (w = at + we.search + we.hash)
          : (U = !0);
      } catch {
        Jt(
          !1,
          `<Link to="${w}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
        );
      }
    let M = Th(w, { relative: f }),
      [le, ae, oe] = mm(d, L),
      ke = jm(w, {
        replace: m,
        state: y,
        target: S,
        preventScrollReset: P,
        relative: f,
        viewTransition: R,
      });
    function _e(je) {
      a && a(je), je.defaultPrevented || ke(je);
    }
    let Ce = N.createElement("a", {
      ...L,
      ...oe,
      href: D || M,
      onClick: U || p ? a : _e,
      ref: xm(z, ae),
      target: S,
      "data-discover": !$ && o === "render" ? "true" : void 0,
    });
    return le && !$
      ? N.createElement(N.Fragment, null, Ce, N.createElement(vm, { page: M }))
      : Ce;
  });
Je.displayName = "Link";
var dn = N.forwardRef(function (
  {
    "aria-current": a = "page",
    caseSensitive: o = !1,
    className: d = "",
    end: f = !1,
    style: p,
    to: m,
    viewTransition: y,
    children: S,
    ...w
  },
  P,
) {
  let R = wl(m, { relative: w.relative }),
    L = bn(),
    z = N.useContext(qi),
    { navigator: F, basename: $ } = N.useContext(Zt),
    D = z != null && Pm(R) && y === !0,
    U = F.encodeLocation ? F.encodeLocation(R).pathname : R.pathname,
    M = L.pathname,
    le =
      z && z.navigation && z.navigation.location
        ? z.navigation.location.pathname
        : null;
  o ||
    ((M = M.toLowerCase()),
    (le = le ? le.toLowerCase() : null),
    (U = U.toLowerCase())),
    le && $ && (le = On(le, $) || le);
  const ae = U !== "/" && U.endsWith("/") ? U.length - 1 : U.length;
  let oe = M === U || (!f && M.startsWith(U) && M.charAt(ae) === "/"),
    ke =
      le != null &&
      (le === U || (!f && le.startsWith(U) && le.charAt(U.length) === "/")),
    _e = { isActive: oe, isPending: ke, isTransitioning: D },
    Ce = oe ? a : void 0,
    je;
  typeof d == "function"
    ? (je = d(_e))
    : (je = [
        d,
        oe ? "active" : null,
        ke ? "pending" : null,
        D ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let we = typeof p == "function" ? p(_e) : p;
  return N.createElement(
    Je,
    {
      ...w,
      "aria-current": Ce,
      className: je,
      ref: P,
      style: we,
      to: m,
      viewTransition: y,
    },
    typeof S == "function" ? S(_e) : S,
  );
});
dn.displayName = "NavLink";
var Sm = N.forwardRef(
  (
    {
      discover: l = "render",
      fetcherKey: a,
      navigate: o,
      reloadDocument: d,
      replace: f,
      state: p,
      method: m = Ai,
      action: y,
      onSubmit: S,
      relative: w,
      preventScrollReset: P,
      viewTransition: R,
      ...L
    },
    z,
  ) => {
    let F = _m(),
      $ = Cm(y, { relative: w }),
      D = m.toLowerCase() === "get" ? "get" : "post",
      U = typeof y == "string" && Vd.test(y),
      M = (le) => {
        if ((S && S(le), le.defaultPrevented)) return;
        le.preventDefault();
        let ae = le.nativeEvent.submitter,
          oe = (ae == null ? void 0 : ae.getAttribute("formmethod")) || m;
        F(ae || le.currentTarget, {
          fetcherKey: a,
          method: oe,
          navigate: o,
          replace: f,
          state: p,
          relative: w,
          preventScrollReset: P,
          viewTransition: R,
        });
      };
    return N.createElement("form", {
      ref: z,
      method: D,
      action: $,
      onSubmit: d ? S : M,
      ...L,
      "data-discover": !U && l === "render" ? "true" : void 0,
    });
  },
);
Sm.displayName = "Form";
function km(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ud(l) {
  let a = N.useContext(Cr);
  return Me(a, km(l)), a;
}
function jm(
  l,
  {
    target: a,
    replace: o,
    state: d,
    preventScrollReset: f,
    relative: p,
    viewTransition: m,
  } = {},
) {
  let y = Dn(),
    S = bn(),
    w = wl(l, { relative: p });
  return N.useCallback(
    (P) => {
      if (tm(P, a)) {
        P.preventDefault();
        let R = o !== void 0 ? o : gl(S) === gl(w);
        y(l, {
          replace: R,
          state: d,
          preventScrollReset: f,
          relative: p,
          viewTransition: m,
        });
      }
    },
    [S, y, w, o, d, a, l, f, p, m],
  );
}
var Em = 0,
  Nm = () => `__${String(++Em)}__`;
function _m() {
  let { router: l } = Ud("useSubmit"),
    { basename: a } = N.useContext(Zt),
    o = Hh();
  return N.useCallback(
    async (d, f = {}) => {
      let { action: p, method: m, encType: y, formData: S, body: w } = lm(d, a);
      if (f.navigate === !1) {
        let P = f.fetcherKey || Nm();
        await l.fetch(P, o, f.action || p, {
          preventScrollReset: f.preventScrollReset,
          formData: S,
          body: w,
          formMethod: f.method || m,
          formEncType: f.encType || y,
          flushSync: f.flushSync,
        });
      } else
        await l.navigate(f.action || p, {
          preventScrollReset: f.preventScrollReset,
          formData: S,
          body: w,
          formMethod: f.method || m,
          formEncType: f.encType || y,
          replace: f.replace,
          state: f.state,
          fromRouteId: o,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition,
        });
    },
    [l, a, o],
  );
}
function Cm(l, { relative: a } = {}) {
  let { basename: o } = N.useContext(Zt),
    d = N.useContext(Ut);
  Me(d, "useFormAction must be used inside a RouteContext");
  let [f] = d.matches.slice(-1),
    p = { ...wl(l || ".", { relative: a }) },
    m = bn();
  if (l == null) {
    p.search = m.search;
    let y = new URLSearchParams(p.search),
      S = y.getAll("index");
    if (S.some((P) => P === "")) {
      y.delete("index"),
        S.filter((R) => R).forEach((R) => y.append("index", R));
      let P = y.toString();
      p.search = P ? `?${P}` : "";
    }
  }
  return (
    (!l || l === ".") &&
      f.route.index &&
      (p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index"),
    o !== "/" && (p.pathname = p.pathname === "/" ? o : fn([o, p.pathname])),
    gl(p)
  );
}
function Pm(l, a = {}) {
  let o = N.useContext(Fd);
  Me(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: d } = Ud("useViewTransitionState"),
    f = wl(l, { relative: a.relative });
  if (!o.isTransitioning) return !1;
  let p = On(o.currentLocation.pathname, d) || o.currentLocation.pathname,
    m = On(o.nextLocation.pathname, d) || o.nextLocation.pathname;
  return Ui(f.pathname, m) != null || Ui(f.pathname, p) != null;
}
new TextEncoder();
const Vt = "http://localhost:3001";
var Bd = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  fd = Ge.createContext && Ge.createContext(Bd),
  Rm = ["attr", "size", "title"];
function Lm(l, a) {
  if (l == null) return {};
  var o = Tm(l, a),
    d,
    f;
  if (Object.getOwnPropertySymbols) {
    var p = Object.getOwnPropertySymbols(l);
    for (f = 0; f < p.length; f++)
      (d = p[f]),
        !(a.indexOf(d) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(l, d) &&
          (o[d] = l[d]);
  }
  return o;
}
function Tm(l, a) {
  if (l == null) return {};
  var o = {};
  for (var d in l)
    if (Object.prototype.hasOwnProperty.call(l, d)) {
      if (a.indexOf(d) >= 0) continue;
      o[d] = l[d];
    }
  return o;
}
function Bi() {
  return (
    (Bi = Object.assign
      ? Object.assign.bind()
      : function (l) {
          for (var a = 1; a < arguments.length; a++) {
            var o = arguments[a];
            for (var d in o)
              Object.prototype.hasOwnProperty.call(o, d) && (l[d] = o[d]);
          }
          return l;
        }),
    Bi.apply(this, arguments)
  );
}
function pd(l, a) {
  var o = Object.keys(l);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(l);
    a &&
      (d = d.filter(function (f) {
        return Object.getOwnPropertyDescriptor(l, f).enumerable;
      })),
      o.push.apply(o, d);
  }
  return o;
}
function Wi(l) {
  for (var a = 1; a < arguments.length; a++) {
    var o = arguments[a] != null ? arguments[a] : {};
    a % 2
      ? pd(Object(o), !0).forEach(function (d) {
          Fm(l, d, o[d]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(l, Object.getOwnPropertyDescriptors(o))
        : pd(Object(o)).forEach(function (d) {
            Object.defineProperty(l, d, Object.getOwnPropertyDescriptor(o, d));
          });
  }
  return l;
}
function Fm(l, a, o) {
  return (
    (a = zm(a)),
    a in l
      ? Object.defineProperty(l, a, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (l[a] = o),
    l
  );
}
function zm(l) {
  var a = Om(l, "string");
  return typeof a == "symbol" ? a : a + "";
}
function Om(l, a) {
  if (typeof l != "object" || !l) return l;
  var o = l[Symbol.toPrimitive];
  if (o !== void 0) {
    var d = o.call(l, a || "default");
    if (typeof d != "object") return d;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (a === "string" ? String : Number)(l);
}
function Wd(l) {
  return (
    l &&
    l.map((a, o) =>
      Ge.createElement(a.tag, Wi({ key: o }, a.attr), Wd(a.child)),
    )
  );
}
function In(l) {
  return (a) =>
    Ge.createElement(Dm, Bi({ attr: Wi({}, l.attr) }, a), Wd(l.child));
}
function Dm(l) {
  var a = (o) => {
    var { attr: d, size: f, title: p } = l,
      m = Lm(l, Rm),
      y = f || o.size || "1em",
      S;
    return (
      o.className && (S = o.className),
      l.className && (S = (S ? S + " " : "") + l.className),
      Ge.createElement(
        "svg",
        Bi(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          o.attr,
          d,
          m,
          {
            className: S,
            style: Wi(Wi({ color: l.color || o.color }, o.style), l.style),
            height: y,
            width: y,
            xmlns: "http://www.w3.org/2000/svg",
          },
        ),
        p && Ge.createElement("title", null, p),
        l.children,
      )
    );
  };
  return fd !== void 0
    ? Ge.createElement(fd.Consumer, null, (o) => a(o))
    : a(Bd);
}
function hd(l) {
  return In({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z",
        },
        child: [],
      },
    ],
  })(l);
}
function md(l) {
  return In({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z",
        },
        child: [],
      },
    ],
  })(l);
}
function qt(l) {
  return In({
    tag: "svg",
    attr: { viewBox: "0 0 320 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z",
        },
        child: [],
      },
    ],
  })(l);
}
function Im(l) {
  return In({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z",
        },
        child: [],
      },
    ],
  })(l);
}
function Am() {
  const { auth: l, setAuth: a } = N.useContext(pn),
    [o, d] = N.useState(!1),
    f = async () => {
      if (
        (confirm("ログアウトしますか？"),
        !(
          await fetch(`${Vt}/session`, {
            method: "DELETE",
            credentials: "include",
          })
        ).ok)
      )
        throw new Error("ログアウトに失敗しました");
      a(!1);
    };
  return u.jsxs(u.Fragment, {
    children: [
      u.jsxs("header", {
        className: "w-full overflow-x-hidden relative",
        children: [
          u.jsx("nav", {
            className: "bg-gray-900 h-20 flex items-center",
            children: u.jsxs("div", {
              className:
                "w-4/5  mx-auto px-4 sm:px-6 relative flex md:justify-between justify-center items-center",
              children: [
                u.jsx("div", {
                  className: "flex items-center",
                  children: u.jsxs(dn, {
                    to: "/",
                    className: "font-bold text-2xl flex items-center gap-4",
                    children: [
                      u.jsx("div", {
                        className: "rounded-full overflow-hidden",
                        children: u.jsx("img", {
                          src: "/logo.webp",
                          alt: "麻雀好きが集まる場所",
                          className: "w-12 h-12 object-contain",
                        }),
                      }),
                      u.jsx("span", {
                        className:
                          "lg:text-3xl text-2xl font-bold text-gray-300 hover:text-white",
                        children: "麻雀ヤリタイ",
                      }),
                    ],
                  }),
                }),
                u.jsxs("div", {
                  className: "md:flex hidden space-x-4 text-xl",
                  children: [
                    l
                      ? u.jsx("button", {
                          onClick: f,
                          className: "text-gray-300 hover:text-white",
                          children: "ログアウト",
                        })
                      : u.jsxs(u.Fragment, {
                          children: [
                            u.jsx(dn, {
                              to: "/auth/login",
                              className: "text-gray-300 hover:text-white",
                              children: "ログイン",
                            }),
                            u.jsx(dn, {
                              to: "/users/new",
                              className: "text-gray-300 hover:text-white",
                              children: "ユーザー登録",
                            }),
                          ],
                        }),
                    u.jsx(dn, {
                      to: "/what-to-discard-problems",
                      className: "text-gray-300 hover:text-white",
                      children: "何切る問題",
                    }),
                  ],
                }),
                u.jsxs("button", {
                  className:
                    "flex flex-col gap-[7px] md:hidden z-50 absolute top-1/2 -right-5 -translate-y-1/2",
                  onClick: () => d(!o),
                  children: [
                    u.jsx("input", {
                      type: "checkbox",
                      id: "side-menu",
                      hidden: !0,
                      className: "peer",
                      defaultChecked: o,
                    }),
                    u.jsx("span", {
                      className: `w-7 h-[3px] bg-white transition-all ${o && "rotate-45 translate-y-[6px] w-8"}`,
                    }),
                    u.jsx("span", {
                      className: `w-7 h-[3px] bg-white ${o && "hidden"}`,
                    }),
                    u.jsx("span", {
                      className: `w-7 h-[3px] bg-white transition-all ${o && "-rotate-45 -translate-y-1 w-8"}`,
                    }),
                  ],
                }),
              ],
            }),
          }),
          u.jsx("nav", {
            className: `fixed top-0 right-0 z-40 bg-base w-3/4 max-w-80 h-screen transition-all ${!o && "translate-x-full"}`,
            children: u.jsxs("ul", {
              className: "text-white px-8 pt-16 flex flex-col gap-4",
              children: [
                u.jsxs("li", {
                  children: [
                    u.jsx("input", {
                      id: "profile",
                      type: "checkbox",
                      className: "hidden peer",
                    }),
                    u.jsx("label", {
                      htmlFor: "profile",
                      className: "text-lg inline-flex items-center gap-1",
                      children: u.jsx("span", { children: "プロフィール" }),
                    }),
                    u.jsx("div", {
                      className: "w-fit ml-1 inline-block peer-checked:hidden",
                      children: u.jsx(hd, {}),
                    }),
                    u.jsx("div", {
                      className: "w-fit ml-1 hidden peer-checked:inline-block",
                      children: u.jsx(md, {}),
                    }),
                    u.jsxs("ul", {
                      className: "h-0 overflow-hidden peer-checked:h-auto ml-4",
                      children: [
                        u.jsx(dn, {
                          to: "profile",
                          children: u.jsxs("li", {
                            className: "flex gap-1 items-center",
                            children: [
                              u.jsx(qt, { size: 12 }),
                              u.jsx("span", { children: "プロフィール" }),
                            ],
                          }),
                        }),
                        u.jsx(dn, {
                          to: "profile/edit",
                          children: u.jsxs("li", {
                            className: "flex gap-1 items-center",
                            children: [
                              u.jsx(qt, { size: 12 }),
                              u.jsx("span", { children: "編集" }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                u.jsxs("li", {
                  children: [
                    u.jsx("input", {
                      id: "what-to-discard-problems",
                      type: "checkbox",
                      className: "hidden peer",
                    }),
                    u.jsx("label", {
                      htmlFor: "what-to-discard-problems",
                      className: "text-lg inline-flex items-center gap-1",
                      children: u.jsx("span", { children: "何切る問題" }),
                    }),
                    u.jsx("div", {
                      className: "w-fit ml-1 inline-block peer-checked:hidden",
                      children: u.jsx(hd, {}),
                    }),
                    u.jsx("div", {
                      className: "w-fit ml-1 hidden peer-checked:inline-block",
                      children: u.jsx(md, {}),
                    }),
                    u.jsxs("ul", {
                      className: "h-0 overflow-hidden peer-checked:h-auto ml-4",
                      children: [
                        u.jsx(dn, {
                          to: "what-to-discard-problems",
                          children: u.jsxs("li", {
                            className: "flex gap-1 items-center",
                            children: [
                              u.jsx(qt, { size: 12 }),
                              u.jsx("span", { children: "一覧" }),
                            ],
                          }),
                        }),
                        u.jsx(dn, {
                          to: "what-to-discard-problems/new",
                          children: u.jsxs("li", {
                            className: "flex gap-1 items-center",
                            children: [
                              u.jsx(qt, { size: 12 }),
                              u.jsx("span", { children: "新規作成" }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      u.jsx("label", {
        htmlFor: "side-menu",
        className: `absolute top-0 left-0 z-30 bg-black opacity-[0.5] w-screen h-screen ${!o && "hidden"}`,
      }),
    ],
  });
}
function Mm() {
  return u.jsxs("footer", {
    className: "mt-32 w-full lg:h-72 flex flex-col justify-between bg-gray-800",
    children: [
      u.jsx("nav", {
        className: "lg:px-16 px-8 lg:pt-12 lg:pb-12 pt-8 pb-20",
        children: u.jsxs("ul", {
          className: "flex lg:flex-row flex-col lg:gap-16 gap-8",
          children: [
            u.jsx(Je, {
              to: "/",
              className: "font-bold hover:text-white lg:text-xl",
              children: u.jsxs("li", {
                className: "flex items-center gap-1",
                children: [
                  u.jsx(qt, { size: 16 }),
                  u.jsx("span", { children: "ホーム" }),
                ],
              }),
            }),
            u.jsxs("li", {
              children: [
                u.jsx("span", {
                  className: "font-bold lg:text-xl text-base",
                  children: "プロフィール",
                }),
                u.jsxs("ul", {
                  className:
                    "lg:text-lg text-sm lg:mt-2 mt-1 flex flex-col gap-1",
                  children: [
                    u.jsx(Je, {
                      to: "/profile",
                      className: "hover:text-white",
                      children: u.jsxs("li", {
                        className: "flex items-center gap-1 lg:pl-0 pl-4",
                        children: [
                          u.jsx(qt, { size: 12 }),
                          u.jsx("span", { children: "見る" }),
                        ],
                      }),
                    }),
                    u.jsx(Je, {
                      to: "/profile/edit",
                      className: "hover:text-white",
                      children: u.jsxs("li", {
                        className: "flex items-center gap-1 lg:pl-0 pl-4",
                        children: [
                          u.jsx(qt, { size: 12 }),
                          u.jsx("span", { children: "編集する" }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
            u.jsxs("li", {
              children: [
                u.jsx("span", {
                  className: "font-bold lg:text-xl text-base",
                  children: "何切る問題",
                }),
                u.jsxs("ul", {
                  className:
                    "lg:text-lg text-sm lg:mt-2 mt-1 flex flex-col gap-1",
                  children: [
                    u.jsx(Je, {
                      to: "/what-to-discard-problems",
                      className: "hover:text-white",
                      children: u.jsxs("li", {
                        className: "flex items-center gap-1 lg:pl-0 pl-4",
                        children: [
                          u.jsx(qt, { size: 12 }),
                          u.jsx("span", { children: "一覧" }),
                        ],
                      }),
                    }),
                    u.jsx(Je, {
                      to: "/what-to-discard-problems/new",
                      className: "hover:text-white",
                      children: u.jsxs("li", {
                        className: "flex items-center gap-1 lg:pl-0 pl-4",
                        children: [
                          u.jsx(qt, { size: 12 }),
                          u.jsx("span", { children: "新規作成" }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      u.jsxs("p", {
        className: "text-center py-2 bg-gray-900",
        children: ["© ", u.jsx("span", { children: "2025" })],
      }),
    ],
  });
}
function $m(l) {
  return In({
    tag: "svg",
    attr: { fill: "currentColor", viewBox: "0 0 16 16" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5",
        },
        child: [],
      },
    ],
  })(l);
}
function Vm(l) {
  return In({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M431.654 39.256c-7.94 0-15.646 1.078-23.123 3.236-7.398 2.158-14.72 5.435-21.966 9.828v21.735c7.477-5.164 14.645-9.096 21.504-11.793 6.937-2.698 13.45-4.045 19.54-4.045 8.324 0 14.99 2.118 20 6.357 5.088 4.24 7.63 9.79 7.63 16.65 0 3.775-1.002 7.476-3.006 11.098-1.926 3.623-5.087 7.476-9.48 11.56l-10.404 10.292c-6.937 6.628-11.485 12.447-13.643 17.457-2.158 5.01-3.236 11.408-3.236 19.192v17.805h22.08v-14.22c0-4.01.115-7.17.346-9.48.232-2.314.58-4.277 1.04-5.896.618-1.926 1.658-3.89 3.123-5.895 1.54-2.08 4.122-4.934 7.745-8.557l10.174-9.943c6.935-6.63 11.792-12.562 14.567-17.803 2.775-5.318 4.162-10.908 4.162-16.766 0-12.255-4.318-22.12-12.95-29.595-8.556-7.476-19.924-11.214-34.106-11.214zm-253.76 6.365C97.293 45.62 30 127.903 30 231.77c0 47.6 14.142 90.66 37.213 123.353 5.01-2.917 10.87-4.5 17.02-4.005 9.196.74 18.27 5.864 26.245 14.832 18.47 20.77 35.302 33.96 59.48 49.117 62.787-35.66 93.123-76.714 139.263-117.365 2.854-2.516 5.8-4.558 8.777-6.177 5.04-18.706 7.783-38.79 7.783-59.755 0-103.866-67.292-186.147-147.89-186.147zM97.01 146.063c15.177.09 30.255 8.09 43.607 23.764l-13.7 11.674c-11.907-13.977-21.85-18.017-31.802-17.385-9.952.633-21.423 6.88-33.7 18.172L49.228 169.04c13.87-12.76 28.547-21.86 44.743-22.89a43.78 43.78 0 0 1 3.037-.088zm151.96 0a43.78 43.78 0 0 1 3.036.088c16.196 1.03 30.874 10.13 44.744 22.89l-12.186 13.247c-12.278-11.293-23.748-17.54-33.7-18.172-9.953-.632-19.896 3.408-31.802 17.385l-13.7-11.674c13.352-15.674 28.43-23.673 43.607-23.763zm165.803 39.56v29.366h23.47v-29.365h-23.47zm-315.326 7.874c12.646 0 24.26 3.752 33.117 10.36 8.857 6.61 15.106 16.57 15.106 27.912 0 11.342-6.25 21.302-15.106 27.912-8.856 6.61-20.47 10.36-33.117 10.36-12.646 0-24.26-3.75-33.117-10.36-8.856-6.61-15.105-16.57-15.105-27.912 0-11.342 6.25-21.3 15.105-27.91 8.857-6.61 20.47-10.362 33.117-10.362zm156.89 0c12.647 0 24.262 3.752 33.118 10.36 8.857 6.61 15.106 16.57 15.106 27.912 0 11.342-6.248 21.302-15.105 27.912-8.856 6.61-20.47 10.36-33.117 10.36-12.646 0-24.26-3.75-33.117-10.36-8.856-6.61-15.105-16.57-15.105-27.912 0-11.342 6.25-21.3 15.106-27.91 8.857-6.61 20.472-10.362 33.118-10.362zm-160.064 18.12c-7.707.567-14.474 3.155-19.177 6.665-5.34 3.986-7.87 8.663-7.87 13.488 0 4.824 2.53 9.5 7.87 13.486 5.34 3.985 13.335 6.785 22.35 6.785 9.017 0 17.013-2.8 22.353-6.786 5.338-3.985 7.87-8.662 7.87-13.486 0-.09-.006-.177-.008-.266a19.61 19.515 0 0 1-15.506 7.584 19.61 19.515 0 0 1-19.61-19.516 19.61 19.515 0 0 1 1.727-7.955zm156.688.013c-7.623.596-14.31 3.172-18.974 6.65-5.34 3.986-7.87 8.663-7.87 13.488 0 4.824 2.53 9.5 7.87 13.486 5.34 3.985 13.336 6.785 22.352 6.785s17.012-2.8 22.35-6.786c5.34-3.985 7.873-8.662 7.873-13.486 0-.23-.01-.46-.02-.688a19.61 19.515 0 0 1-15.493 7.566 19.61 19.515 0 0 1-19.61-19.515 19.61 19.515 0 0 1 1.524-7.5zm83.263 92.337a11.32 11.32 0 0 0-1.32.012c-3.626.24-8.098 2.217-13.782 7.225-41.548 36.606-72.158 76.506-129.536 112.022l-39.91 26.484-9.953-14.997 12.454-8.264c-22.1-14.347-39.177-28.335-57.145-48.542-5.797-6.518-10.678-8.563-14.24-8.85-3.56-.286-6.562.945-9.528 3.948-5.88 5.95-9.498 19.257-4.2 32.29 12.462 22.93 36.147 44.15 54.038 71.204l1.953 2.95-.582 3.49a521.26 521.26 0 0 0-1.74 11.06h211.452c.103-1.217.18-2.456.193-3.746-.11-4.19-3.22-10.067-8.258-14.563-5.066-4.518-11.74-7.125-15.402-7.032l-12.436.317 3.587-11.91c1.944-6.454.005-14.632-4.613-18.827-4.62-4.195-12.2-6.694-27.313.99l-10.743-14.072c28.086-30.964 65.366-68.32 87.653-102.594 3.04-4.676 1.373-11.558-3.237-15.41-2.017-1.685-4.398-3.036-7.39-3.185zm-122.707 36.64l7.197 16.498c-28.058 12.24-57.48 12.936-85.8-.072l7.513-16.355c23.976 11.013 46.85 10.504 71.09-.07z",
        },
        child: [],
      },
    ],
  })(l);
}
function Um(l) {
  return In({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          fill: "none",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "32",
          d: "M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212",
        },
        child: [],
      },
      {
        tag: "path",
        attr: {
          fill: "none",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "32",
          d: "M480 256 266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69",
        },
        child: [],
      },
    ],
  })(l);
}
function Bm() {
  return u.jsx("nav", {
    className: "md:hidden block w-full h-16 bg-gray-900 fixed bottom-0",
    children: u.jsxs("ul", {
      className: "flex justify-around items-center h-full",
      children: [
        u.jsx(Je, {
          to: "/",
          children: u.jsxs("li", {
            className: "flex items-center flex-col",
            children: [
              u.jsx(Um, { color: "white", size: 25, title: "ホーム" }),
              u.jsx("span", { className: "text-[10px]", children: "ホーム" }),
            ],
          }),
        }),
        u.jsx(Je, {
          to: "/records",
          children: u.jsxs("li", {
            className: "flex items-center flex-col w-10 aspect-square",
            children: [
              u.jsx($m, { color: "white", size: 25, title: "記録" }),
              u.jsx("span", { className: "text-[10px]", children: "記録" }),
            ],
          }),
        }),
        u.jsx(Je, {
          to: "/what-to-discard-problems",
          children: u.jsxs("li", {
            className: "flex items-center flex-col w-10 aspect-square",
            children: [
              u.jsx(Vm, { color: "white", size: 25, title: "何切る問題" }),
              u.jsx("span", { className: "text-[10px]", children: "何切る？" }),
            ],
          }),
        }),
        u.jsx(Je, {
          to: "/settings",
          children: u.jsxs("li", {
            className: "flex items-center flex-col w-10 aspect-square",
            children: [
              u.jsx(Im, { color: "white", size: 25, title: "設定" }),
              u.jsx("span", { className: "text-[10px]", children: "設定" }),
            ],
          }),
        }),
      ],
    }),
  });
}
function Wm() {
  return u.jsxs("div", {
    className: "flex flex-col min-h-screen",
    children: [
      u.jsx(Am, {}),
      u.jsx("main", { className: "flex-grow", children: u.jsx(qh, {}) }),
      u.jsx(Mm, {}),
      u.jsx(Bm, {}),
    ],
  });
}
function Ii(l) {
  return In({
    tag: "svg",
    attr: { viewBox: "0 0 256 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z",
        },
        child: [],
      },
    ],
  })(l);
}
function Hm() {
  const l = N.useRef(null),
    a = (f, p) => {
      l.current &&
        (console.log(f),
        p.unobserve(l.current),
        console.log(`*****************${l.current}**************`));
    },
    o = { threshold: 1 },
    d = new IntersectionObserver(a, o);
  return (
    N.useEffect(() => {
      l.current && d.observe(l.current);
    }),
    u.jsxs("div", {
      children: [
        u.jsxs("div", {
          className: "w-full h-[500px] relative",
          children: [
            u.jsxs("div", {
              className:
                "absolute top-1/2 -translate-y-1/2 w-full text-white z-20 flex sm:flex-col flex-row-reverse justify-center items-center sm:gap-0 gap-2 sm:pr-0 pr-8",
              children: [
                u.jsxs("h1", {
                  className:
                    "fade-in sm:text-center text-start font-bold sm:text-[clamp(0px,12vw,140px)] text-7xl sm:[writing-mode:_horizontal-tb] [writing-mode:_vertical-rl] tracking-widest",
                  children: [
                    "麻雀",
                    u.jsx("br", { className: "sm:hidden" }),
                    u.jsx("span", {
                      className: "sm:pt-0 pt-8",
                      children: "ヤリタイ",
                    }),
                  ],
                }),
                u.jsx("h2", {
                  className:
                    "sm:pt-0 pt-32 delayed-fade-in text-center font-semibold sm:text-[clamp(12px,2vw,20px)] sm:[writing-mode:_horizontal-tb] [writing-mode:_vertical-rl]",
                  children: "麻雀をやりたい人たちが集まる場所です。",
                }),
              ],
            }),
            u.jsx("div", {
              className:
                "absolute top-0 left-0 w-full h-full bg-blue-900 opacity-[0.5] z-10",
            }),
            u.jsx("img", {
              src: "/main-visual.webp",
              alt: "麻雀をやりたい人が語らう場所",
              className: "w-full h-full object-cover contrast-125",
            }),
          ],
        }),
        u.jsxs("section", {
          className: "mt-24 md:px-[20vw] px-6 text-slate-100",
          children: [
            u.jsx("h2", {
              className:
                "sm:text-5xl text-[clamp(24px,8vw,48px)] text-center font-bold",
              children: "麻雀ヤリタイとは？",
            }),
            u.jsxs("div", {
              className: "mt-8 sm:text-xl leading-loose",
              children: [
                u.jsx("p", {
                  children:
                    "ここは、麻雀を愛する人たちが集まり、繋がれる場所です。",
                }),
                u.jsx("p", {
                  className: "mt-4",
                  children:
                    "最近の対局の話をしたり、好きなプロ雀士を語り合ったり、何切る問題を出し合ったり、日々の麻雀の成績を記録したり、一緒に麻雀をしたり！",
                }),
                u.jsx("p", {
                  className: "mt-4",
                  children:
                    "そして、これから麻雀を始める人や麻雀に興味がある人が、もっともっと麻雀の楽しさを感じることができるお手伝いができる場になることを目指しています。",
                }),
              ],
            }),
          ],
        }),
        u.jsxs("section", {
          className: "mt-24 md:px-[20vw] px-6 text-slate-100",
          children: [
            u.jsx("h2", {
              className:
                "sm:text-5xl text-[clamp(24px,8vw,48px)] text-center font-bold",
              children: "はじめる",
            }),
            u.jsxs("div", {
              className: "mt-8 leading-loose",
              children: [
                u.jsx("p", {
                  ref: l,
                  className: "sm:text-xl",
                  children: "ここでは麻雀に関する色々なことができます。",
                }),
                u.jsxs("ul", {
                  className:
                    "mt-4 grid sm:grid-cols-2 grid-cols-1 gap-2 sm:text-[clamp(16px,2vw,20px)]",
                  children: [
                    u.jsx(Je, {
                      to: "/what-to-discard-problems",
                      className:
                        "col-span1 py-5 px-4 border border-blue-700 hover:underline bg-slate-100 text-blue-700 rounded-sm",
                      children: u.jsxs("li", {
                        className: "flex items-center gap-4",
                        children: [
                          u.jsx("span", { children: "みんなの ｢何切る？｣" }),
                          u.jsx(Ii, {}),
                        ],
                      }),
                    }),
                    u.jsx("li", {
                      className:
                        "col-span-1 py-5 px-4 border border-blue-700 hover:underline bg-slate-100 text-blue-700 rounded-sm",
                      children: u.jsxs("span", {
                        className: "flex items-center gap-4 relative",
                        children: [
                          u.jsx("span", {
                            className: "line-through",
                            children: "成績の記録",
                          }),
                          u.jsx(Ii, {}),
                          u.jsx("span", {
                            className:
                              "w-full absolute top-1/2 left-0 -translate-y-1/2 text-2xl text-center text-gray-800 font-bold bg-[rgba(241,245,249,0.5)]",
                            children: "Coming Soon...",
                          }),
                        ],
                      }),
                    }),
                    u.jsx("li", {
                      className:
                        "col-span-1 py-5 px-4 border border-blue-700 hover:underline bg-slate-100 text-blue-700 rounded-sm",
                      children: u.jsxs("span", {
                        className: "flex items-center gap-4 relative",
                        children: [
                          u.jsx("span", {
                            className: "line-through",
                            children: "麻雀チュートリアル",
                          }),
                          u.jsx(Ii, {}),
                          u.jsx("p", {
                            className:
                              "w-full absolute top-1/2 left-0 -translate-y-1/2 text-2xl text-center text-gray-800 font-bold bg-[rgba(241,245,249,0.5)]",
                            children: "Coming Soon...",
                          }),
                        ],
                      }),
                    }),
                    u.jsx("li", {
                      className:
                        "col-span-1 py-5 px-4 border border-blue-700 hover:underline bg-slate-100 text-blue-700 rounded-sm",
                      children: u.jsxs("span", {
                        className: "flex items-center gap-4 relative",
                        children: [
                          u.jsx("span", {
                            className: "line-through",
                            children: "スレッド",
                          }),
                          u.jsx(Ii, {}),
                          u.jsx("p", {
                            className:
                              "w-full absolute top-1/2 left-0 -translate-y-1/2 text-2xl text-center text-gray-800 font-bold bg-[rgba(241,245,249,0.5)]",
                            children: "Coming Soon...",
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
var Sl = (l) => l.type === "checkbox",
  Zn = (l) => l instanceof Date,
  ft = (l) => l == null;
const Hd = (l) => typeof l == "object";
var He = (l) => !ft(l) && !Array.isArray(l) && Hd(l) && !Zn(l),
  Qm = (l) =>
    He(l) && l.target ? (Sl(l.target) ? l.target.checked : l.target.value) : l,
  Km = (l) => l.substring(0, l.search(/\.\d+(\.|$)/)) || l,
  Ym = (l, a) => l.has(Km(a)),
  qm = (l) => {
    const a = l.constructor && l.constructor.prototype;
    return He(a) && a.hasOwnProperty("isPrototypeOf");
  },
  ua =
    typeof window < "u" &&
    typeof window.HTMLElement < "u" &&
    typeof document < "u";
function Tt(l) {
  let a;
  const o = Array.isArray(l),
    d = typeof FileList < "u" ? l instanceof FileList : !1;
  if (l instanceof Date) a = new Date(l);
  else if (l instanceof Set) a = new Set(l);
  else if (!(ua && (l instanceof Blob || d)) && (o || He(l)))
    if (((a = o ? [] : {}), !o && !qm(l))) a = l;
    else for (const f in l) l.hasOwnProperty(f) && (a[f] = Tt(l[f]));
  else return l;
  return a;
}
var Gi = (l) => (Array.isArray(l) ? l.filter(Boolean) : []),
  Ke = (l) => l === void 0,
  J = (l, a, o) => {
    if (!a || !He(l)) return o;
    const d = Gi(a.split(/[,[\].]+?/)).reduce((f, p) => (ft(f) ? f : f[p]), l);
    return Ke(d) || d === l ? (Ke(l[a]) ? o : l[a]) : d;
  },
  Yt = (l) => typeof l == "boolean",
  ca = (l) => /^\w*$/.test(l),
  Qd = (l) => Gi(l.replace(/["|']|\]/g, "").split(/\.|\[/)),
  Oe = (l, a, o) => {
    let d = -1;
    const f = ca(a) ? [a] : Qd(a),
      p = f.length,
      m = p - 1;
    for (; ++d < p; ) {
      const y = f[d];
      let S = o;
      if (d !== m) {
        const w = l[y];
        S = He(w) || Array.isArray(w) ? w : isNaN(+f[d + 1]) ? {} : [];
      }
      if (y === "__proto__" || y === "constructor" || y === "prototype") return;
      (l[y] = S), (l = l[y]);
    }
    return l;
  };
const vd = { BLUR: "blur", FOCUS_OUT: "focusout", CHANGE: "change" },
  $t = {
    onBlur: "onBlur",
    onChange: "onChange",
    onSubmit: "onSubmit",
    onTouched: "onTouched",
    all: "all",
  },
  cn = {
    max: "max",
    min: "min",
    maxLength: "maxLength",
    minLength: "minLength",
    pattern: "pattern",
    required: "required",
    validate: "validate",
  };
Ge.createContext(null);
var Xm = (l, a, o, d = !0) => {
    const f = { defaultValues: a._defaultValues };
    for (const p in l)
      Object.defineProperty(f, p, {
        get: () => {
          const m = p;
          return (
            a._proxyFormState[m] !== $t.all &&
              (a._proxyFormState[m] = !d || $t.all),
            l[m]
          );
        },
      });
    return f;
  },
  xt = (l) => He(l) && !Object.keys(l).length,
  Gm = (l, a, o, d) => {
    o(l);
    const { name: f, ...p } = l;
    return (
      xt(p) ||
      Object.keys(p).length >= Object.keys(a).length ||
      Object.keys(p).find((m) => a[m] === $t.all)
    );
  },
  $i = (l) => (Array.isArray(l) ? l : [l]);
function Jm(l) {
  const a = Ge.useRef(l);
  (a.current = l),
    Ge.useEffect(() => {
      const o =
        !l.disabled &&
        a.current.subject &&
        a.current.subject.subscribe({ next: a.current.next });
      return () => {
        o && o.unsubscribe();
      };
    }, [l.disabled]);
}
var Gt = (l) => typeof l == "string",
  Zm = (l, a, o, d, f) =>
    Gt(l)
      ? (d && a.watch.add(l), J(o, l, f))
      : Array.isArray(l)
        ? l.map((p) => (d && a.watch.add(p), J(o, p)))
        : (d && (a.watchAll = !0), o),
  bm = (l, a, o, d, f) =>
    a
      ? {
          ...o[l],
          types: { ...(o[l] && o[l].types ? o[l].types : {}), [d]: f || !0 },
        }
      : {},
  gd = (l) => ({
    isOnSubmit: !l || l === $t.onSubmit,
    isOnBlur: l === $t.onBlur,
    isOnChange: l === $t.onChange,
    isOnAll: l === $t.all,
    isOnTouch: l === $t.onTouched,
  }),
  yd = (l, a, o) =>
    !o &&
    (a.watchAll ||
      a.watch.has(l) ||
      [...a.watch].some(
        (d) => l.startsWith(d) && /^\.\w+/.test(l.slice(d.length)),
      ));
const vl = (l, a, o, d) => {
  for (const f of o || Object.keys(l)) {
    const p = J(l, f);
    if (p) {
      const { _f: m, ...y } = p;
      if (m) {
        if (m.refs && m.refs[0] && a(m.refs[0], f) && !d) return !0;
        if (m.ref && a(m.ref, m.name) && !d) return !0;
        if (vl(y, a)) break;
      } else if (He(y) && vl(y, a)) break;
    }
  }
};
var e0 = (l, a, o) => {
    const d = $i(J(l, o));
    return Oe(d, "root", a[o]), Oe(l, o, d), l;
  },
  da = (l) => l.type === "file",
  Xt = (l) => typeof l == "function",
  Hi = (l) => {
    if (!ua) return !1;
    const a = l ? l.ownerDocument : 0;
    return (
      l instanceof
      (a && a.defaultView ? a.defaultView.HTMLElement : HTMLElement)
    );
  },
  Vi = (l) => Gt(l),
  fa = (l) => l.type === "radio",
  Qi = (l) => l instanceof RegExp;
const xd = { value: !1, isValid: !1 },
  wd = { value: !0, isValid: !0 };
var Kd = (l) => {
  if (Array.isArray(l)) {
    if (l.length > 1) {
      const a = l
        .filter((o) => o && o.checked && !o.disabled)
        .map((o) => o.value);
      return { value: a, isValid: !!a.length };
    }
    return l[0].checked && !l[0].disabled
      ? l[0].attributes && !Ke(l[0].attributes.value)
        ? Ke(l[0].value) || l[0].value === ""
          ? wd
          : { value: l[0].value, isValid: !0 }
        : wd
      : xd;
  }
  return xd;
};
const Sd = { isValid: !1, value: null };
var Yd = (l) =>
  Array.isArray(l)
    ? l.reduce(
        (a, o) =>
          o && o.checked && !o.disabled ? { isValid: !0, value: o.value } : a,
        Sd,
      )
    : Sd;
function kd(l, a, o = "validate") {
  if (Vi(l) || (Array.isArray(l) && l.every(Vi)) || (Yt(l) && !l))
    return { type: o, message: Vi(l) ? l : "", ref: a };
}
var Nr = (l) => (He(l) && !Qi(l) ? l : { value: l, message: "" }),
  jd = async (l, a, o, d, f, p) => {
    const {
        ref: m,
        refs: y,
        required: S,
        maxLength: w,
        minLength: P,
        min: R,
        max: L,
        pattern: z,
        validate: F,
        name: $,
        valueAsNumber: D,
        mount: U,
      } = l._f,
      M = J(o, $);
    if (!U || a.has($)) return {};
    const le = y ? y[0] : m,
      ae = (ie) => {
        f &&
          le.reportValidity &&
          (le.setCustomValidity(Yt(ie) ? "" : ie || ""), le.reportValidity());
      },
      oe = {},
      ke = fa(m),
      _e = Sl(m),
      Ce = ke || _e,
      je =
        ((D || da(m)) && Ke(m.value) && Ke(M)) ||
        (Hi(m) && m.value === "") ||
        M === "" ||
        (Array.isArray(M) && !M.length),
      we = bm.bind(null, $, d, oe),
      at = (ie, ue, Se, Pe = cn.maxLength, Le = cn.minLength) => {
        const me = ie ? ue : Se;
        oe[$] = {
          type: ie ? Pe : Le,
          message: me,
          ref: m,
          ...we(ie ? Pe : Le, me),
        };
      };
    if (
      p
        ? !Array.isArray(M) || !M.length
        : S &&
          ((!Ce && (je || ft(M))) ||
            (Yt(M) && !M) ||
            (_e && !Kd(y).isValid) ||
            (ke && !Yd(y).isValid))
    ) {
      const { value: ie, message: ue } = Vi(S)
        ? { value: !!S, message: S }
        : Nr(S);
      if (
        ie &&
        ((oe[$] = {
          type: cn.required,
          message: ue,
          ref: le,
          ...we(cn.required, ue),
        }),
        !d)
      )
        return ae(ue), oe;
    }
    if (!je && (!ft(R) || !ft(L))) {
      let ie, ue;
      const Se = Nr(L),
        Pe = Nr(R);
      if (!ft(M) && !isNaN(M)) {
        const Le = m.valueAsNumber || (M && +M);
        ft(Se.value) || (ie = Le > Se.value),
          ft(Pe.value) || (ue = Le < Pe.value);
      } else {
        const Le = m.valueAsDate || new Date(M),
          me = (Y) => new Date(new Date().toDateString() + " " + Y),
          Q = m.type == "time",
          ee = m.type == "week";
        Gt(Se.value) &&
          M &&
          (ie = Q
            ? me(M) > me(Se.value)
            : ee
              ? M > Se.value
              : Le > new Date(Se.value)),
          Gt(Pe.value) &&
            M &&
            (ue = Q
              ? me(M) < me(Pe.value)
              : ee
                ? M < Pe.value
                : Le < new Date(Pe.value));
      }
      if ((ie || ue) && (at(!!ie, Se.message, Pe.message, cn.max, cn.min), !d))
        return ae(oe[$].message), oe;
    }
    if ((w || P) && !je && (Gt(M) || (p && Array.isArray(M)))) {
      const ie = Nr(w),
        ue = Nr(P),
        Se = !ft(ie.value) && M.length > +ie.value,
        Pe = !ft(ue.value) && M.length < +ue.value;
      if ((Se || Pe) && (at(Se, ie.message, ue.message), !d))
        return ae(oe[$].message), oe;
    }
    if (z && !je && Gt(M)) {
      const { value: ie, message: ue } = Nr(z);
      if (
        Qi(ie) &&
        !M.match(ie) &&
        ((oe[$] = {
          type: cn.pattern,
          message: ue,
          ref: m,
          ...we(cn.pattern, ue),
        }),
        !d)
      )
        return ae(ue), oe;
    }
    if (F) {
      if (Xt(F)) {
        const ie = await F(M, o),
          ue = kd(ie, le);
        if (ue && ((oe[$] = { ...ue, ...we(cn.validate, ue.message) }), !d))
          return ae(ue.message), oe;
      } else if (He(F)) {
        let ie = {};
        for (const ue in F) {
          if (!xt(ie) && !d) break;
          const Se = kd(await F[ue](M, o), le, ue);
          Se &&
            ((ie = { ...Se, ...we(ue, Se.message) }),
            ae(Se.message),
            d && (oe[$] = ie));
        }
        if (!xt(ie) && ((oe[$] = { ref: le, ...ie }), !d)) return oe;
      }
    }
    return ae(!0), oe;
  };
function t0(l, a) {
  const o = a.slice(0, -1).length;
  let d = 0;
  for (; d < o; ) l = Ke(l) ? d++ : l[a[d++]];
  return l;
}
function n0(l) {
  for (const a in l) if (l.hasOwnProperty(a) && !Ke(l[a])) return !1;
  return !0;
}
function Xe(l, a) {
  const o = Array.isArray(a) ? a : ca(a) ? [a] : Qd(a),
    d = o.length === 1 ? l : t0(l, o),
    f = o.length - 1,
    p = o[f];
  return (
    d && delete d[p],
    f !== 0 &&
      ((He(d) && xt(d)) || (Array.isArray(d) && n0(d))) &&
      Xe(l, o.slice(0, -1)),
    l
  );
}
var Jo = () => {
    let l = [];
    return {
      get observers() {
        return l;
      },
      next: (f) => {
        for (const p of l) p.next && p.next(f);
      },
      subscribe: (f) => (
        l.push(f),
        {
          unsubscribe: () => {
            l = l.filter((p) => p !== f);
          },
        }
      ),
      unsubscribe: () => {
        l = [];
      },
    };
  },
  na = (l) => ft(l) || !Hd(l);
function zn(l, a) {
  if (na(l) || na(a)) return l === a;
  if (Zn(l) && Zn(a)) return l.getTime() === a.getTime();
  const o = Object.keys(l),
    d = Object.keys(a);
  if (o.length !== d.length) return !1;
  for (const f of o) {
    const p = l[f];
    if (!d.includes(f)) return !1;
    if (f !== "ref") {
      const m = a[f];
      if (
        (Zn(p) && Zn(m)) ||
        (He(p) && He(m)) ||
        (Array.isArray(p) && Array.isArray(m))
          ? !zn(p, m)
          : p !== m
      )
        return !1;
    }
  }
  return !0;
}
var qd = (l) => l.type === "select-multiple",
  r0 = (l) => fa(l) || Sl(l),
  Zo = (l) => Hi(l) && l.isConnected,
  Xd = (l) => {
    for (const a in l) if (Xt(l[a])) return !0;
    return !1;
  };
function Ki(l, a = {}) {
  const o = Array.isArray(l);
  if (He(l) || o)
    for (const d in l)
      Array.isArray(l[d]) || (He(l[d]) && !Xd(l[d]))
        ? ((a[d] = Array.isArray(l[d]) ? [] : {}), Ki(l[d], a[d]))
        : ft(l[d]) || (a[d] = !0);
  return a;
}
function Gd(l, a, o) {
  const d = Array.isArray(l);
  if (He(l) || d)
    for (const f in l)
      Array.isArray(l[f]) || (He(l[f]) && !Xd(l[f]))
        ? Ke(a) || na(o[f])
          ? (o[f] = Array.isArray(l[f]) ? Ki(l[f], []) : { ...Ki(l[f]) })
          : Gd(l[f], ft(a) ? {} : a[f], o[f])
        : (o[f] = !zn(l[f], a[f]));
  return o;
}
var hl = (l, a) => Gd(l, a, Ki(a)),
  Jd = (l, { valueAsNumber: a, valueAsDate: o, setValueAs: d }) =>
    Ke(l)
      ? l
      : a
        ? l === ""
          ? NaN
          : l && +l
        : o && Gt(l)
          ? new Date(l)
          : d
            ? d(l)
            : l;
function bo(l) {
  const a = l.ref;
  return da(a)
    ? a.files
    : fa(a)
      ? Yd(l.refs).value
      : qd(a)
        ? [...a.selectedOptions].map(({ value: o }) => o)
        : Sl(a)
          ? Kd(l.refs).value
          : Jd(Ke(a.value) ? l.ref.value : a.value, l);
}
var l0 = (l, a, o, d) => {
    const f = {};
    for (const p of l) {
      const m = J(a, p);
      m && Oe(f, p, m._f);
    }
    return {
      criteriaMode: o,
      names: [...l],
      fields: f,
      shouldUseNativeValidation: d,
    };
  },
  ml = (l) =>
    Ke(l)
      ? l
      : Qi(l)
        ? l.source
        : He(l)
          ? Qi(l.value)
            ? l.value.source
            : l.value
          : l;
const Ed = "AsyncFunction";
var i0 = (l) =>
    !!l &&
    !!l.validate &&
    !!(
      (Xt(l.validate) && l.validate.constructor.name === Ed) ||
      (He(l.validate) &&
        Object.values(l.validate).find((a) => a.constructor.name === Ed))
    ),
  s0 = (l) =>
    l.mount &&
    (l.required ||
      l.min ||
      l.max ||
      l.maxLength ||
      l.minLength ||
      l.pattern ||
      l.validate);
function Nd(l, a, o) {
  const d = J(l, o);
  if (d || ca(o)) return { error: d, name: o };
  const f = o.split(".");
  for (; f.length; ) {
    const p = f.join("."),
      m = J(a, p),
      y = J(l, p);
    if (m && !Array.isArray(m) && o !== p) return { name: o };
    if (y && y.type) return { name: p, error: y };
    f.pop();
  }
  return { name: o };
}
var o0 = (l, a, o, d, f) =>
    f.isOnAll
      ? !1
      : !o && f.isOnTouch
        ? !(a || l)
        : (o ? d.isOnBlur : f.isOnBlur)
          ? !l
          : (o ? d.isOnChange : f.isOnChange)
            ? l
            : !0,
  a0 = (l, a) => !Gi(J(l, a)).length && Xe(l, a);
const u0 = {
  mode: $t.onSubmit,
  reValidateMode: $t.onChange,
  shouldFocusError: !0,
};
function c0(l = {}) {
  let a = { ...u0, ...l },
    o = {
      submitCount: 0,
      isDirty: !1,
      isLoading: Xt(a.defaultValues),
      isValidating: !1,
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      touchedFields: {},
      dirtyFields: {},
      validatingFields: {},
      errors: a.errors || {},
      disabled: a.disabled || !1,
    },
    d = {},
    f =
      He(a.defaultValues) || He(a.values)
        ? Tt(a.defaultValues || a.values) || {}
        : {},
    p = a.shouldUnregister ? {} : Tt(f),
    m = { action: !1, mount: !1, watch: !1 },
    y = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
    },
    S,
    w = 0;
  const P = {
      isDirty: !1,
      dirtyFields: !1,
      validatingFields: !1,
      touchedFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    },
    R = { values: Jo(), array: Jo(), state: Jo() },
    L = gd(a.mode),
    z = gd(a.reValidateMode),
    F = a.criteriaMode === $t.all,
    $ = (g) => (_) => {
      clearTimeout(w), (w = setTimeout(g, _));
    },
    D = async (g) => {
      if (!a.disabled && (P.isValid || g)) {
        const _ = a.resolver ? xt((await Ce()).errors) : await we(d, !0);
        _ !== o.isValid && R.state.next({ isValid: _ });
      }
    },
    U = (g, _) => {
      !a.disabled &&
        (P.isValidating || P.validatingFields) &&
        ((g || Array.from(y.mount)).forEach((T) => {
          T && (_ ? Oe(o.validatingFields, T, _) : Xe(o.validatingFields, T));
        }),
        R.state.next({
          validatingFields: o.validatingFields,
          isValidating: !xt(o.validatingFields),
        }));
    },
    M = (g, _ = [], T, K, H = !0, W = !0) => {
      if (K && T && !a.disabled) {
        if (((m.action = !0), W && Array.isArray(J(d, g)))) {
          const te = T(J(d, g), K.argA, K.argB);
          H && Oe(d, g, te);
        }
        if (W && Array.isArray(J(o.errors, g))) {
          const te = T(J(o.errors, g), K.argA, K.argB);
          H && Oe(o.errors, g, te), a0(o.errors, g);
        }
        if (P.touchedFields && W && Array.isArray(J(o.touchedFields, g))) {
          const te = T(J(o.touchedFields, g), K.argA, K.argB);
          H && Oe(o.touchedFields, g, te);
        }
        P.dirtyFields && (o.dirtyFields = hl(f, p)),
          R.state.next({
            name: g,
            isDirty: ie(g, _),
            dirtyFields: o.dirtyFields,
            errors: o.errors,
            isValid: o.isValid,
          });
      } else Oe(p, g, _);
    },
    le = (g, _) => {
      Oe(o.errors, g, _), R.state.next({ errors: o.errors });
    },
    ae = (g) => {
      (o.errors = g), R.state.next({ errors: o.errors, isValid: !1 });
    },
    oe = (g, _, T, K) => {
      const H = J(d, g);
      if (H) {
        const W = J(p, g, Ke(T) ? J(f, g) : T);
        Ke(W) || (K && K.defaultChecked) || _
          ? Oe(p, g, _ ? W : bo(H._f))
          : Pe(g, W),
          m.mount && D();
      }
    },
    ke = (g, _, T, K, H) => {
      let W = !1,
        te = !1;
      const de = { name: g };
      if (!a.disabled) {
        const Ue = !!(J(d, g) && J(d, g)._f && J(d, g)._f.disabled);
        if (!T || K) {
          P.isDirty &&
            ((te = o.isDirty),
            (o.isDirty = de.isDirty = ie()),
            (W = te !== de.isDirty));
          const $e = Ue || zn(J(f, g), _);
          (te = !!(!Ue && J(o.dirtyFields, g))),
            $e || Ue ? Xe(o.dirtyFields, g) : Oe(o.dirtyFields, g, !0),
            (de.dirtyFields = o.dirtyFields),
            (W = W || (P.dirtyFields && te !== !$e));
        }
        if (T) {
          const $e = J(o.touchedFields, g);
          $e ||
            (Oe(o.touchedFields, g, T),
            (de.touchedFields = o.touchedFields),
            (W = W || (P.touchedFields && $e !== T)));
        }
        W && H && R.state.next(de);
      }
      return W ? de : {};
    },
    _e = (g, _, T, K) => {
      const H = J(o.errors, g),
        W = P.isValid && Yt(_) && o.isValid !== _;
      if (
        (a.delayError && T
          ? ((S = $(() => le(g, T))), S(a.delayError))
          : (clearTimeout(w),
            (S = null),
            T ? Oe(o.errors, g, T) : Xe(o.errors, g)),
        (T ? !zn(H, T) : H) || !xt(K) || W)
      ) {
        const te = {
          ...K,
          ...(W && Yt(_) ? { isValid: _ } : {}),
          errors: o.errors,
          name: g,
        };
        (o = { ...o, ...te }), R.state.next(te);
      }
    },
    Ce = async (g) => {
      U(g, !0);
      const _ = await a.resolver(
        p,
        a.context,
        l0(g || y.mount, d, a.criteriaMode, a.shouldUseNativeValidation),
      );
      return U(g), _;
    },
    je = async (g) => {
      const { errors: _ } = await Ce(g);
      if (g)
        for (const T of g) {
          const K = J(_, T);
          K ? Oe(o.errors, T, K) : Xe(o.errors, T);
        }
      else o.errors = _;
      return _;
    },
    we = async (g, _, T = { valid: !0 }) => {
      for (const K in g) {
        const H = g[K];
        if (H) {
          const { _f: W, ...te } = H;
          if (W) {
            const de = y.array.has(W.name),
              Ue = H._f && i0(H._f);
            Ue && P.validatingFields && U([K], !0);
            const $e = await jd(
              H,
              y.disabled,
              p,
              F,
              a.shouldUseNativeValidation && !_,
              de,
            );
            if (
              (Ue && P.validatingFields && U([K]),
              $e[W.name] && ((T.valid = !1), _))
            )
              break;
            !_ &&
              (J($e, W.name)
                ? de
                  ? e0(o.errors, $e, W.name)
                  : Oe(o.errors, W.name, $e[W.name])
                : Xe(o.errors, W.name));
          }
          !xt(te) && (await we(te, _, T));
        }
      }
      return T.valid;
    },
    at = () => {
      for (const g of y.unMount) {
        const _ = J(d, g);
        _ &&
          (_._f.refs ? _._f.refs.every((T) => !Zo(T)) : !Zo(_._f.ref)) &&
          he(g);
      }
      y.unMount = new Set();
    },
    ie = (g, _) => !a.disabled && (g && _ && Oe(p, g, _), !zn(k(), f)),
    ue = (g, _, T) =>
      Zm(g, y, { ...(m.mount ? p : Ke(_) ? f : Gt(g) ? { [g]: _ } : _) }, T, _),
    Se = (g) =>
      Gi(J(m.mount ? p : f, g, a.shouldUnregister ? J(f, g, []) : [])),
    Pe = (g, _, T = {}) => {
      const K = J(d, g);
      let H = _;
      if (K) {
        const W = K._f;
        W &&
          (!W.disabled && Oe(p, g, Jd(_, W)),
          (H = Hi(W.ref) && ft(_) ? "" : _),
          qd(W.ref)
            ? [...W.ref.options].forEach(
                (te) => (te.selected = H.includes(te.value)),
              )
            : W.refs
              ? Sl(W.ref)
                ? W.refs.length > 1
                  ? W.refs.forEach(
                      (te) =>
                        (!te.defaultChecked || !te.disabled) &&
                        (te.checked = Array.isArray(H)
                          ? !!H.find((de) => de === te.value)
                          : H === te.value),
                    )
                  : W.refs[0] && (W.refs[0].checked = !!H)
                : W.refs.forEach((te) => (te.checked = te.value === H))
              : da(W.ref)
                ? (W.ref.value = "")
                : ((W.ref.value = H),
                  W.ref.type || R.values.next({ name: g, values: { ...p } })));
      }
      (T.shouldDirty || T.shouldTouch) &&
        ke(g, H, T.shouldTouch, T.shouldDirty, !0),
        T.shouldValidate && Y(g);
    },
    Le = (g, _, T) => {
      for (const K in _) {
        const H = _[K],
          W = `${g}.${K}`,
          te = J(d, W);
        (y.array.has(g) || He(H) || (te && !te._f)) && !Zn(H)
          ? Le(W, H, T)
          : Pe(W, H, T);
      }
    },
    me = (g, _, T = {}) => {
      const K = J(d, g),
        H = y.array.has(g),
        W = Tt(_);
      Oe(p, g, W),
        H
          ? (R.array.next({ name: g, values: { ...p } }),
            (P.isDirty || P.dirtyFields) &&
              T.shouldDirty &&
              R.state.next({
                name: g,
                dirtyFields: hl(f, p),
                isDirty: ie(g, W),
              }))
          : K && !K._f && !ft(W)
            ? Le(g, W, T)
            : Pe(g, W, T),
        yd(g, y) && R.state.next({ ...o }),
        R.values.next({ name: m.mount ? g : void 0, values: { ...p } });
    },
    Q = async (g) => {
      m.mount = !0;
      const _ = g.target;
      let T = _.name,
        K = !0;
      const H = J(d, T),
        W = () => (_.type ? bo(H._f) : Qm(g)),
        te = (de) => {
          K =
            Number.isNaN(de) ||
            (Zn(de) && isNaN(de.getTime())) ||
            zn(de, J(p, T, de));
        };
      if (H) {
        let de, Ue;
        const $e = W(),
          wt = g.type === vd.BLUR || g.type === vd.FOCUS_OUT,
          El =
            (!s0(H._f) && !a.resolver && !J(o.errors, T) && !H._f.deps) ||
            o0(wt, J(o.touchedFields, T), o.isSubmitted, z, L),
          bt = yd(T, y, wt);
        Oe(p, T, $e),
          wt
            ? (H._f.onBlur && H._f.onBlur(g), S && S(0))
            : H._f.onChange && H._f.onChange(g);
        const en = ke(T, $e, wt, !1),
          es = !xt(en) || bt;
        if (
          (!wt && R.values.next({ name: T, type: g.type, values: { ...p } }),
          El)
        )
          return (
            P.isValid && (a.mode === "onBlur" && wt ? D() : wt || D()),
            es && R.state.next({ name: T, ...(bt ? {} : en) })
          );
        if ((!wt && bt && R.state.next({ ...o }), a.resolver)) {
          const { errors: Pr } = await Ce([T]);
          if ((te($e), K)) {
            const Nl = Nd(o.errors, d, T),
              _l = Nd(Pr, d, Nl.name || T);
            (de = _l.error), (T = _l.name), (Ue = xt(Pr));
          }
        } else
          U([T], !0),
            (de = (await jd(H, y.disabled, p, F, a.shouldUseNativeValidation))[
              T
            ]),
            U([T]),
            te($e),
            K && (de ? (Ue = !1) : P.isValid && (Ue = await we(d, !0)));
        K && (H._f.deps && Y(H._f.deps), _e(T, Ue, de, en));
      }
    },
    ee = (g, _) => {
      if (J(o.errors, _) && g.focus) return g.focus(), 1;
    },
    Y = async (g, _ = {}) => {
      let T, K;
      const H = $i(g);
      if (a.resolver) {
        const W = await je(Ke(g) ? g : H);
        (T = xt(W)), (K = g ? !H.some((te) => J(W, te)) : T);
      } else
        g
          ? ((K = (
              await Promise.all(
                H.map(async (W) => {
                  const te = J(d, W);
                  return await we(te && te._f ? { [W]: te } : te);
                }),
              )
            ).every(Boolean)),
            !(!K && !o.isValid) && D())
          : (K = T = await we(d));
      return (
        R.state.next({
          ...(!Gt(g) || (P.isValid && T !== o.isValid) ? {} : { name: g }),
          ...(a.resolver || !g ? { isValid: T } : {}),
          errors: o.errors,
        }),
        _.shouldFocus && !K && vl(d, ee, g ? H : y.mount),
        K
      );
    },
    k = (g) => {
      const _ = { ...(m.mount ? p : f) };
      return Ke(g) ? _ : Gt(g) ? J(_, g) : g.map((T) => J(_, T));
    },
    O = (g, _) => ({
      invalid: !!J((_ || o).errors, g),
      isDirty: !!J((_ || o).dirtyFields, g),
      error: J((_ || o).errors, g),
      isValidating: !!J(o.validatingFields, g),
      isTouched: !!J((_ || o).touchedFields, g),
    }),
    ce = (g) => {
      g && $i(g).forEach((_) => Xe(o.errors, _)),
        R.state.next({ errors: g ? o.errors : {} });
    },
    fe = (g, _, T) => {
      const K = (J(d, g, { _f: {} })._f || {}).ref,
        H = J(o.errors, g) || {},
        { ref: W, message: te, type: de, ...Ue } = H;
      Oe(o.errors, g, { ...Ue, ..._, ref: K }),
        R.state.next({ name: g, errors: o.errors, isValid: !1 }),
        T && T.shouldFocus && K && K.focus && K.focus();
    },
    ve = (g, _) =>
      Xt(g)
        ? R.values.subscribe({ next: (T) => g(ue(void 0, _), T) })
        : ue(g, _, !0),
    he = (g, _ = {}) => {
      for (const T of g ? $i(g) : y.mount)
        y.mount.delete(T),
          y.array.delete(T),
          _.keepValue || (Xe(d, T), Xe(p, T)),
          !_.keepError && Xe(o.errors, T),
          !_.keepDirty && Xe(o.dirtyFields, T),
          !_.keepTouched && Xe(o.touchedFields, T),
          !_.keepIsValidating && Xe(o.validatingFields, T),
          !a.shouldUnregister && !_.keepDefaultValue && Xe(f, T);
      R.values.next({ values: { ...p } }),
        R.state.next({ ...o, ...(_.keepDirty ? { isDirty: ie() } : {}) }),
        !_.keepIsValid && D();
    },
    Ee = ({ disabled: g, name: _, field: T, fields: K }) => {
      ((Yt(g) && m.mount) || g || y.disabled.has(_)) &&
        (g ? y.disabled.add(_) : y.disabled.delete(_),
        ke(_, bo(T ? T._f : J(K, _)._f), !1, !1, !0));
    },
    ge = (g, _ = {}) => {
      let T = J(d, g);
      const K = Yt(_.disabled) || Yt(a.disabled);
      return (
        Oe(d, g, {
          ...(T || {}),
          _f: {
            ...(T && T._f ? T._f : { ref: { name: g } }),
            name: g,
            mount: !0,
            ..._,
          },
        }),
        y.mount.add(g),
        T
          ? Ee({
              field: T,
              disabled: Yt(_.disabled) ? _.disabled : a.disabled,
              name: g,
            })
          : oe(g, !0, _.value),
        {
          ...(K ? { disabled: _.disabled || a.disabled } : {}),
          ...(a.progressive
            ? {
                required: !!_.required,
                min: ml(_.min),
                max: ml(_.max),
                minLength: ml(_.minLength),
                maxLength: ml(_.maxLength),
                pattern: ml(_.pattern),
              }
            : {}),
          name: g,
          onChange: Q,
          onBlur: Q,
          ref: (H) => {
            if (H) {
              ge(g, _), (T = J(d, g));
              const W =
                  (Ke(H.value) &&
                    H.querySelectorAll &&
                    H.querySelectorAll("input,select,textarea")[0]) ||
                  H,
                te = r0(W),
                de = T._f.refs || [];
              if (te ? de.find((Ue) => Ue === W) : W === T._f.ref) return;
              Oe(d, g, {
                _f: {
                  ...T._f,
                  ...(te
                    ? {
                        refs: [
                          ...de.filter(Zo),
                          W,
                          ...(Array.isArray(J(f, g)) ? [{}] : []),
                        ],
                        ref: { type: W.type, name: g },
                      }
                    : { ref: W }),
                },
              }),
                oe(g, !1, void 0, W);
            } else
              (T = J(d, g, {})),
                T._f && (T._f.mount = !1),
                (a.shouldUnregister || _.shouldUnregister) &&
                  !(Ym(y.array, g) && m.action) &&
                  y.unMount.add(g);
          },
        }
      );
    },
    Re = () => a.shouldFocusError && vl(d, ee, y.mount),
    ut = (g) => {
      Yt(g) &&
        (R.state.next({ disabled: g }),
        vl(
          d,
          (_, T) => {
            const K = J(d, T);
            K &&
              ((_.disabled = K._f.disabled || g),
              Array.isArray(K._f.refs) &&
                K._f.refs.forEach((H) => {
                  H.disabled = K._f.disabled || g;
                }));
          },
          0,
          !1,
        ));
    },
    An = (g, _) => async (T) => {
      let K;
      T && (T.preventDefault && T.preventDefault(), T.persist && T.persist());
      let H = Tt(p);
      if (y.disabled.size) for (const W of y.disabled) Oe(H, W, void 0);
      if ((R.state.next({ isSubmitting: !0 }), a.resolver)) {
        const { errors: W, values: te } = await Ce();
        (o.errors = W), (H = te);
      } else await we(d);
      if ((Xe(o.errors, "root"), xt(o.errors))) {
        R.state.next({ errors: {} });
        try {
          await g(H, T);
        } catch (W) {
          K = W;
        }
      } else _ && (await _({ ...o.errors }, T)), Re(), setTimeout(Re);
      if (
        (R.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: xt(o.errors) && !K,
          submitCount: o.submitCount + 1,
          errors: o.errors,
        }),
        K)
      )
        throw K;
    },
    kl = (g, _ = {}) => {
      J(d, g) &&
        (Ke(_.defaultValue)
          ? me(g, Tt(J(f, g)))
          : (me(g, _.defaultValue), Oe(f, g, Tt(_.defaultValue))),
        _.keepTouched || Xe(o.touchedFields, g),
        _.keepDirty ||
          (Xe(o.dirtyFields, g),
          (o.isDirty = _.defaultValue ? ie(g, Tt(J(f, g))) : ie())),
        _.keepError || (Xe(o.errors, g), P.isValid && D()),
        R.state.next({ ...o }));
    },
    Mn = (g, _ = {}) => {
      const T = g ? Tt(g) : f,
        K = Tt(T),
        H = xt(g),
        W = H ? f : K;
      if ((_.keepDefaultValues || (f = T), !_.keepValues)) {
        if (_.keepDirtyValues) {
          const te = new Set([...y.mount, ...Object.keys(hl(f, p))]);
          for (const de of Array.from(te))
            J(o.dirtyFields, de) ? Oe(W, de, J(p, de)) : me(de, J(W, de));
        } else {
          if (ua && Ke(g))
            for (const te of y.mount) {
              const de = J(d, te);
              if (de && de._f) {
                const Ue = Array.isArray(de._f.refs)
                  ? de._f.refs[0]
                  : de._f.ref;
                if (Hi(Ue)) {
                  const $e = Ue.closest("form");
                  if ($e) {
                    $e.reset();
                    break;
                  }
                }
              }
            }
          d = {};
        }
        (p = a.shouldUnregister ? (_.keepDefaultValues ? Tt(f) : {}) : Tt(W)),
          R.array.next({ values: { ...W } }),
          R.values.next({ values: { ...W } });
      }
      (y = {
        mount: _.keepDirtyValues ? y.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: "",
      }),
        (m.mount = !P.isValid || !!_.keepIsValid || !!_.keepDirtyValues),
        (m.watch = !!a.shouldUnregister),
        R.state.next({
          submitCount: _.keepSubmitCount ? o.submitCount : 0,
          isDirty: H
            ? !1
            : _.keepDirty
              ? o.isDirty
              : !!(_.keepDefaultValues && !zn(g, f)),
          isSubmitted: _.keepIsSubmitted ? o.isSubmitted : !1,
          dirtyFields: H
            ? {}
            : _.keepDirtyValues
              ? _.keepDefaultValues && p
                ? hl(f, p)
                : o.dirtyFields
              : _.keepDefaultValues && g
                ? hl(f, g)
                : _.keepDirty
                  ? o.dirtyFields
                  : {},
          touchedFields: _.keepTouched ? o.touchedFields : {},
          errors: _.keepErrors ? o.errors : {},
          isSubmitSuccessful: _.keepIsSubmitSuccessful
            ? o.isSubmitSuccessful
            : !1,
          isSubmitting: !1,
        });
    },
    er = (g, _) => Mn(Xt(g) ? g(p) : g, _);
  return {
    control: {
      register: ge,
      unregister: he,
      getFieldState: O,
      handleSubmit: An,
      setError: fe,
      _executeSchema: Ce,
      _getWatch: ue,
      _getDirty: ie,
      _updateValid: D,
      _removeUnmounted: at,
      _updateFieldArray: M,
      _updateDisabledField: Ee,
      _getFieldArray: Se,
      _reset: Mn,
      _resetDefaultValues: () =>
        Xt(a.defaultValues) &&
        a.defaultValues().then((g) => {
          er(g, a.resetOptions), R.state.next({ isLoading: !1 });
        }),
      _updateFormState: (g) => {
        o = { ...o, ...g };
      },
      _disableForm: ut,
      _subjects: R,
      _proxyFormState: P,
      _setErrors: ae,
      get _fields() {
        return d;
      },
      get _formValues() {
        return p;
      },
      get _state() {
        return m;
      },
      set _state(g) {
        m = g;
      },
      get _defaultValues() {
        return f;
      },
      get _names() {
        return y;
      },
      set _names(g) {
        y = g;
      },
      get _formState() {
        return o;
      },
      set _formState(g) {
        o = g;
      },
      get _options() {
        return a;
      },
      set _options(g) {
        a = { ...a, ...g };
      },
    },
    trigger: Y,
    register: ge,
    handleSubmit: An,
    watch: ve,
    setValue: me,
    getValues: k,
    reset: er,
    resetField: kl,
    clearErrors: ce,
    unregister: he,
    setError: fe,
    setFocus: (g, _ = {}) => {
      const T = J(d, g),
        K = T && T._f;
      if (K) {
        const H = K.refs ? K.refs[0] : K.ref;
        H.focus && (H.focus(), _.shouldSelect && Xt(H.select) && H.select());
      }
    },
    getFieldState: O,
  };
}
function Ji(l = {}) {
  const a = Ge.useRef(void 0),
    o = Ge.useRef(void 0),
    [d, f] = Ge.useState({
      isDirty: !1,
      isValidating: !1,
      isLoading: Xt(l.defaultValues),
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      validatingFields: {},
      errors: l.errors || {},
      disabled: l.disabled || !1,
      defaultValues: Xt(l.defaultValues) ? void 0 : l.defaultValues,
    });
  a.current || (a.current = { ...c0(l), formState: d });
  const p = a.current.control;
  return (
    (p._options = l),
    Jm({
      subject: p._subjects.state,
      next: (m) => {
        Gm(m, p._proxyFormState, p._updateFormState) && f({ ...p._formState });
      },
    }),
    Ge.useEffect(() => p._disableForm(l.disabled), [p, l.disabled]),
    Ge.useEffect(() => {
      if (p._proxyFormState.isDirty) {
        const m = p._getDirty();
        m !== d.isDirty && p._subjects.state.next({ isDirty: m });
      }
    }, [p, d.isDirty]),
    Ge.useEffect(() => {
      l.values && !zn(l.values, o.current)
        ? (p._reset(l.values, p._options.resetOptions),
          (o.current = l.values),
          f((m) => ({ ...m })))
        : p._resetDefaultValues();
    }, [l.values, p]),
    Ge.useEffect(() => {
      l.errors && p._setErrors(l.errors);
    }, [l.errors, p]),
    Ge.useEffect(() => {
      p._state.mount || (p._updateValid(), (p._state.mount = !0)),
        p._state.watch &&
          ((p._state.watch = !1), p._subjects.state.next({ ...p._formState })),
        p._removeUnmounted();
    }),
    Ge.useEffect(() => {
      l.shouldUnregister && p._subjects.values.next({ values: p._getWatch() });
    }, [l.shouldUnregister, p]),
    (a.current.formState = Xm(d, p)),
    a.current
  );
}
function pa({ errors: l }) {
  return u.jsxs("div", {
    className: "bg-red-200 p-2 rounded-sm text-red-500 text-red",
    children: [
      u.jsx("p", { className: "text-lg font-bold", children: "ERROR!!" }),
      u.jsx("ul", {
        className: "list-disc pl-4",
        children:
          l[0] &&
          l.map((a, o) =>
            u.jsx("li", { className: "text-red-500", children: a.message }, o),
          ),
      }),
    ],
  });
}
function d0() {
  const l = Dn(),
    { auth: a, setAuth: o } = N.useContext(pn),
    [d, f] = N.useState(!1);
  N.useEffect(() => {
    a === !0 && l("/dashboard"), console.log(`Login: ${a}`);
  }, [a]);
  const [p, m] = N.useState([]),
    {
      register: y,
      handleSubmit: S,
      formState: { errors: w },
    } = Ji(),
    P = async (R) => {
      var z;
      const L = await fetch(`${Vt}/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(R),
      });
      L.ok
        ? (o(!0), l("/dashboard"))
        : m([...p, (z = await L.json()) == null ? void 0 : z.errors]);
    };
  return u.jsx(u.Fragment, {
    children:
      a === !1 &&
      u.jsx("div", {
        className:
          "lg:w-1/2 mx-auto bg-white py-8 lg:px-16 px-4  mt-16 rounded-md text-gray-800",
        children: u.jsxs("div", {
          children: [
            u.jsx("h1", {
              className: "lg:text-3xl text-2xl text-gray-800 font-semibold",
              children: "ログインする",
            }),
            u.jsxs("div", {
              className: "w-full mt-4",
              children: [
                p[0] && u.jsx(pa, { errors: p[p.length - 1] }),
                u.jsxs("form", {
                  onSubmit: S(P),
                  children: [
                    u.jsxs("div", {
                      className: "grid grid-cols-6 lg:gap-8 gap-1",
                      children: [
                        u.jsx("div", {
                          className:
                            "col-span-2 flex items-center lg:text-2xl text-gray-800",
                          children: u.jsx("label", {
                            htmlFor: "name",
                            children: "Email",
                          }),
                        }),
                        u.jsxs("div", {
                          className: "col-span-4 p-2",
                          children: [
                            u.jsx("input", {
                              type: "email",
                              autoComplete: "email",
                              className: `border border-black rounded-sm h-8 w-full p-2 ${w.email ? "bg-red-200" : ""}`,
                              ...y("email", {
                                required: "必須です",
                                pattern: {
                                  value: /[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "不正なパターンです",
                                },
                              }),
                            }),
                            w.email &&
                              u.jsx("span", {
                                className: "text-red-500",
                                children: w.email.message,
                              }),
                          ],
                        }),
                      ],
                    }),
                    u.jsxs("div", {
                      children: [
                        u.jsxs("div", {
                          className: "grid grid-cols-6 lg:gap-8 gap-1",
                          children: [
                            u.jsx("div", {
                              className:
                                "col-span-2 flex items-center lg:text-2xl text-gray-800",
                              children: u.jsx("label", {
                                htmlFor: "name",
                                children: "パスワード",
                              }),
                            }),
                            u.jsxs("div", {
                              className: "col-span-4 p-2",
                              children: [
                                u.jsx("input", {
                                  type: d ? "text" : "password",
                                  autoComplete: "password",
                                  className: `border border-black rounded-sm h-8 w-full p-2 ${w.password ? "bg-red-200" : ""}`,
                                  ...y("password", { required: "必須です" }),
                                }),
                                w.password &&
                                  u.jsx("span", {
                                    className: "text-red-500",
                                    children: w.password.message,
                                  }),
                              ],
                            }),
                          ],
                        }),
                        u.jsx("div", {
                          className: "text-end text-gray-800",
                          children: u.jsxs("button", {
                            type: "button",
                            className:
                              "bg-gray-300 text-sm py-1 px-3 rounded-full",
                            onClick: () => f(!d),
                            children: ["パスワードを", d && "非", "表示"],
                          }),
                        }),
                      ],
                    }),
                    u.jsx("div", {
                      className: "mt-4 flex lg:gap-4 gap-2",
                      children: u.jsx("div", {
                        children: u.jsx("input", {
                          type: "submit",
                          value: "ログインする",
                          className: "btn btn-main",
                        }),
                      }),
                    }),
                  ],
                }),
                u.jsx("div", {
                  className: "mt-6",
                  children: u.jsx("p", {
                    className: "text-lg",
                    children: u.jsx(Je, {
                      to: "/users/new",
                      className: "text-blue-500 hover:text-blue-300 underline",
                      children: "新規会員登録はこちら",
                    }),
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
  });
}
function f0() {
  return u.jsxs("div", {
    className: "w-96 mx-auto flex flex-col items-center mt-24",
    children: [
      u.jsx("span", {
        className: "text-3xl",
        children: "既にログイン済みです",
      }),
      u.jsx(Je, {
        to: "/dashboard",
        className: "btn btn-main mt-8",
        children: "ダッシュボードに戻る",
      }),
    ],
  });
}
function p0() {
  const l = Dn(),
    { auth: a, setAuth: o } = N.useContext(pn),
    [d, f] = N.useState(!1),
    [p, m] = N.useState(!1),
    [y, S] = N.useState([]),
    {
      register: w,
      handleSubmit: P,
      formState: { errors: R },
    } = Ji(),
    L = async (z) => {
      var D;
      const F = await fetch(`${Vt}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ user: z }),
        }),
        $ = await F.json();
      console.log($),
        F.ok
          ? (o(!0), l("/dashboard"))
          : S([...y, (D = await F.json()) == null ? void 0 : D.errors]);
    };
  return u.jsx(u.Fragment, {
    children:
      a === !1
        ? u.jsx("div", {
            className:
              "lg:w-1/2 mx-auto bg-white py-8 lg:px-16 px-4  mt-16 rounded-md text-gray-800",
            children: u.jsxs("div", {
              className: "mt-2",
              children: [
                u.jsx("h1", {
                  className: "lg:text-3xl text-2xl font-semibold",
                  children: "新規ユーザー登録",
                }),
                u.jsxs("div", {
                  className: "w-full mt-6",
                  children: [
                    y[0] && u.jsx(pa, { errors: y[y.length - 1] }),
                    u.jsxs("form", {
                      onSubmit: P(L),
                      children: [
                        u.jsxs("div", {
                          children: [
                            u.jsxs("div", {
                              className: "grid grid-cols-6 lg:gap-8 gap-1",
                              children: [
                                u.jsx("div", {
                                  className:
                                    "col-span-2 h-full flex items-center lg:text-xl",
                                  children: u.jsx("label", {
                                    htmlFor: "name",
                                    children: "ハンドルネーム",
                                  }),
                                }),
                                u.jsx("div", {
                                  className:
                                    "col-span-4 p-2 h-full flex flex-col items-center ",
                                  children: u.jsx("input", {
                                    type: "text",
                                    autoComplete: "name",
                                    className: `border border-black rounded-sm h-8 w-full p-2 ${R.email ? "bg-red-200" : ""}`,
                                    ...w("name", { required: "必須です" }),
                                  }),
                                }),
                              ],
                            }),
                            R.name &&
                              u.jsx("div", {
                                className:
                                  "text-red-500 w-full text-sm text-end",
                                children: R.name.message,
                              }),
                          ],
                        }),
                        u.jsxs("div", {
                          children: [
                            u.jsxs("div", {
                              className: "grid grid-cols-6 lg:gap-8 gap-1",
                              children: [
                                u.jsx("div", {
                                  className:
                                    "col-span-2 h-full flex items-center lg:text-xl",
                                  children: u.jsx("label", {
                                    htmlFor: "name",
                                    children: "Email",
                                  }),
                                }),
                                u.jsx("div", {
                                  className:
                                    "col-span-4 p-2 h-full flex flex-col items-center ",
                                  children: u.jsx("input", {
                                    type: "email",
                                    autoComplete: "email",
                                    className: `border border-black rounded-sm h-8 w-full p-2 ${R.email ? "bg-red-200" : ""}`,
                                    ...w("email", {
                                      required: "必須です",
                                      pattern: {
                                        value: /[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "不正なパターンです",
                                      },
                                    }),
                                  }),
                                }),
                              ],
                            }),
                            R.email &&
                              u.jsx("div", {
                                className:
                                  "text-red-500 w-full text-sm text-end",
                                children: R.email.message,
                              }),
                          ],
                        }),
                        u.jsxs("div", {
                          children: [
                            u.jsxs("div", {
                              className: "grid grid-cols-6 lg:gap-8 gap-1",
                              children: [
                                u.jsx("div", {
                                  className:
                                    "col-span-2 h-full flex items-center lg:text-xl text-gray-800",
                                  children: u.jsx("label", {
                                    htmlFor: "name",
                                    children: "パスワード",
                                  }),
                                }),
                                u.jsxs("div", {
                                  className:
                                    "col-span-4 p-2 h-full flex flex-col items-center",
                                  children: [
                                    u.jsx("input", {
                                      type: d ? "text" : "password",
                                      autoComplete: "password",
                                      className: `border border-black rounded-sm h-8 w-full p-2 ${R.password ? "bg-red-200" : ""}`,
                                      ...w("password", {
                                        required: "必須です",
                                      }),
                                    }),
                                    R.password &&
                                      u.jsx("div", {
                                        className:
                                          "text-red-500 w-full text-sm text-end",
                                        children: R.password.message,
                                      }),
                                  ],
                                }),
                              ],
                            }),
                            u.jsx("div", {
                              className: "text-end",
                              children: u.jsxs("button", {
                                type: "button",
                                className:
                                  "bg-gray-300 text-sm py-1 px-3 rounded-full",
                                onClick: () => f(!d),
                                children: ["パスワードを", d && "非", "表示"],
                              }),
                            }),
                          ],
                        }),
                        u.jsxs("div", {
                          children: [
                            u.jsxs("div", {
                              className: "grid grid-cols-6 lg:gap-8 gap-1",
                              children: [
                                u.jsx("div", {
                                  className:
                                    "col-span-2 h-full flex items-center lg:text-xl text-gray-800",
                                  children: u.jsx("label", {
                                    htmlFor: "name",
                                    children: "パスワード（確認）",
                                  }),
                                }),
                                u.jsxs("div", {
                                  className:
                                    "col-span-4 p-2 h-full flex flex-col items-center",
                                  children: [
                                    u.jsx("input", {
                                      type: p ? "text" : "password",
                                      autoComplete: "password-confirmation",
                                      className: `border border-black rounded-sm h-8 w-full p-2 ${R.password ? "bg-red-200" : ""}`,
                                      ...w("password_confirmation", {
                                        required: "必須です",
                                      }),
                                    }),
                                    R.password_confirmation &&
                                      u.jsx("div", {
                                        className:
                                          "text-red-500 w-full text-sm text-end",
                                        children:
                                          R.password_confirmation.message,
                                      }),
                                  ],
                                }),
                              ],
                            }),
                            u.jsx("div", {
                              className: "text-end",
                              children: u.jsxs("button", {
                                type: "button",
                                className:
                                  "bg-gray-300 text-sm py-1 px-3 rounded-full",
                                onClick: () => m(!p),
                                children: ["パスワードを", p && "非", "表示"],
                              }),
                            }),
                          ],
                        }),
                        u.jsx("div", {
                          className: "mt-4 flex lg:gap-4 gap-2",
                          children: u.jsx("div", {
                            children: u.jsx("input", {
                              type: "submit",
                              value: "確認メールを送信する",
                              className: "btn btn-main",
                            }),
                          }),
                        }),
                      ],
                    }),
                    u.jsx("div", {
                      className: "mt-6",
                      children: u.jsx("p", {
                        className: "text-lg text-gray-800",
                        children: u.jsxs(Je, {
                          to: "/auth/login",
                          className:
                            "text-blue-500 hover:text-blue-300 underline flex items-center",
                          children: [
                            u.jsx("span", { children: "ログインはこちら" }),
                            u.jsx(qt, { size: 16 }),
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
              ],
            }),
          })
        : u.jsx(f0, {}),
  });
}
function h0() {
  const { auth: l } = N.useContext(pn),
    a = Dn();
  return (
    N.useEffect(() => {
      l === !1 && a("/auth/login"), console.log(`Dashboard: ${l}`);
    }, [l]),
    u.jsx("div", { className: "bg-red-200" })
  );
}
const m0 = () => {
    const l = N.useContext(Zd);
    if (!l) throw new Error("Context is null");
    const { count: a, setCount: o } = l,
      d = () => {
        o(a + 1);
      };
    return u.jsxs("div", {
      children: [
        u.jsxs("p", { children: ["カウント: ", a] }),
        u.jsx("button", { onClick: () => d(), children: "推してね！" }),
      ],
    });
  },
  Zd = N.createContext(null),
  v0 = () => {
    const [l, a] = N.useState(0);
    return u.jsx("div", {
      children: u.jsx(Zd.Provider, {
        value: { count: l, setCount: a },
        children: u.jsx(m0, {}),
      }),
    });
  };
function g0() {
  var S;
  const { auth: l } = N.useContext(pn),
    [a, o] = N.useState([]),
    d = Dn(),
    {
      register: f,
      handleSubmit: p,
      formState: { errors: m },
    } = Ji({ mode: "onChange" });
  N.useEffect(() => {
    l === !1 && d("/auth/login"), console.log(`ForumThreadNew: ${l}`);
  }, [l]);
  const y = async (w) => {
    var z, F;
    const P =
        (z = document.querySelector("meta[name='csrf-token']")) == null
          ? void 0
          : z.getAttribute("content"),
      R = await fetch(`${Vt}/forum_threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": P || "",
        },
        credentials: "include",
        body: JSON.stringify({ forum_thread: w }),
      });
    R.ok || o([...a, (F = await R.json()) == null ? void 0 : F.errors]);
    const L = await R.json();
    d(`/forum-threads/${L.forum_thread.id}`);
  };
  return u.jsx("div", {
    className: "lg:w-1/2 mx-auto bg-white py-8 lg:px-16 px-4  mt-16 rounded-md",
    children: u.jsxs("div", {
      children: [
        u.jsx("h1", {
          className: "lg:text-3xl text-2xl font-semibold",
          children: "スレッドを作る",
        }),
        u.jsxs("div", {
          className: "w-full mt-4",
          children: [
            a[0] && u.jsx(pa, { errors: a[a.length - 1] }),
            u.jsxs("form", {
              onSubmit: p(y),
              children: [
                u.jsxs("div", {
                  className: "grid grid-cols-6 lg:gap-8 gap-1",
                  children: [
                    u.jsx("div", {
                      className: "col-span-2 flex items-center lg:text-lg",
                      children: u.jsx("label", {
                        htmlFor: "name",
                        children: "タイトル",
                      }),
                    }),
                    u.jsxs("div", {
                      className: "col-span-4 p-2",
                      children: [
                        u.jsx("input", {
                          type: "text",
                          ...f("topic", { required: "必須です" }),
                          className: `border border-black rounded-sm h-8 w-full p-2 ${m.topic ? "bg-red-200" : ""}`,
                        }),
                        m.topic &&
                          u.jsx("span", {
                            className: "text-red-500",
                            children:
                              (S = m.topic) == null ? void 0 : S.message,
                          }),
                      ],
                    }),
                  ],
                }),
                u.jsx("div", {
                  className: "mt-8 flex lg:gap-4 gap-2",
                  children: u.jsx("div", {
                    children: u.jsx("input", {
                      type: "submit",
                      value: "スレッドを作る",
                      className: "btn btn-main",
                    }),
                  }),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function y0() {
  const { auth: l } = N.useContext(pn),
    a = Dn(),
    [o, d] = N.useState();
  return (
    N.useEffect(() => {
      l === !1 && a("/auth/login"),
        console.log(`ForumThreadIndex: ${l}`),
        (async () => {
          const m = await (await fetch(`${Vt}/forum_threads`)).json();
          console.log(`DATA: ${JSON.stringify(m)}`), d(m.forum_threads);
        })();
    }, [l]),
    u.jsx("div", {
      children:
        o !== void 0 && o.length > 0
          ? u.jsx("ul", {
              children: o.map((f) =>
                u.jsx("li", {
                  className: "text-white",
                  children: JSON.stringify(f),
                }),
              ),
            })
          : u.jsxs("div", {
              className: "text-center text-white mt-16",
              children: [
                u.jsxs("p", {
                  className: "text-4xl",
                  children: [
                    "スレッドはまだありません。",
                    u.jsx("br", {}),
                    "スレッドを立ててみましょう。",
                  ],
                }),
                u.jsx(Je, {
                  to: "/forum-threads/new",
                  className: "inline-block text-xl mt-4 underline",
                  children: "スレッドを作る",
                }),
              ],
            }),
    })
  );
}
function x0() {
  const { auth: l } = N.useContext(pn),
    a = Dn(),
    { id: o } = Dd();
  return (
    N.useEffect(() => {
      l === !1 && a("/auth/login"),
        console.log(`ForumThreadNew: ${l}`),
        (async () => {
          const p = await (await fetch(`${Vt}/forum_threads/${o}`)).json();
          console.log(`DATA: ${JSON.stringify(p)}`);
        })();
    }, [l]),
    u.jsx("div", {})
  );
}
function w0() {
  return u.jsx("div", {});
}
const Yi = 13,
  bd = 34,
  S0 = 18;
function k0() {
  const l = [
      {
        species: "萬子",
        tiles: [
          { id: 1, name: "一萬" },
          { id: 2, name: "二萬" },
          { id: 3, name: "三萬" },
          { id: 4, name: "四萬" },
          { id: 5, name: "五萬" },
          { id: 6, name: "六萬" },
          { id: 7, name: "七萬" },
          { id: 8, name: "八萬" },
          { id: 9, name: "九萬" },
        ],
      },
      {
        species: "筒子",
        tiles: [
          { id: 10, name: "一筒" },
          { id: 11, name: "二筒" },
          { id: 12, name: "三筒" },
          { id: 13, name: "四筒" },
          { id: 14, name: "五筒" },
          { id: 15, name: "六筒" },
          { id: 16, name: "七筒" },
          { id: 17, name: "八筒" },
          { id: 18, name: "九筒" },
        ],
      },
      {
        species: "索子",
        tiles: [
          { id: 19, name: "一索" },
          { id: 20, name: "二索" },
          { id: 21, name: "三索" },
          { id: 22, name: "四索" },
          { id: 23, name: "五索" },
          { id: 24, name: "六索" },
          { id: 25, name: "七索" },
          { id: 26, name: "八索" },
          { id: 27, name: "九索" },
        ],
      },
      {
        species: "字牌",
        tiles: [
          { id: 28, name: "東" },
          { id: 29, name: "南" },
          { id: 30, name: "西" },
          { id: 31, name: "北" },
          { id: 32, name: "白" },
          { id: 33, name: "發" },
          { id: 34, name: "中" },
        ],
      },
    ],
    [a, o] = N.useState([]),
    d = Dn(),
    [f, p] = N.useState([]);
  N.useEffect(() => {
    (async () => {
      const z = await Promise.all(
        Array(bd)
          .fill(null)
          .map(async (F, $) => `/tiles/${$ + 1}.png`),
      );
      p(z);
    })();
  }, []);
  const m = (L) => {
      const z = f[Number(L) - 1];
      return u.jsx("img", { src: z });
    },
    {
      register: y,
      handleSubmit: S,
      watch: w,
      formState: { errors: P },
    } = Ji(),
    R = async (L) => {
      var D, U;
      const z =
          (D = document.querySelector("meta[name='csrf-token']")) == null
            ? void 0
            : D.getAttribute("content"),
        F = await fetch(`${Vt}/what_to_discard_problems`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": z || "",
          },
          credentials: "include",
          body: JSON.stringify({ what_to_discard_problem: L }),
        });
      F.ok || o([...a, (U = await F.json()) == null ? void 0 : U.errors]);
      const $ = await F.json();
      d(`/what-to-discard-problems/${$.what_to_discard_problem.id}`);
    };
  return u.jsx("div", {
    className: "lg:w-4/5 mx-auto",
    children: u.jsxs("form", {
      onSubmit: S(R),
      children: [
        u.jsx("h1", {
          className: "mt-8 lg:text-4xl text-2xl text-center",
          children: "何切る問題を作る",
        }),
        u.jsxs("div", {
          className:
            "flex flex-col justify-between mt-8 min-h-40 bg-green-700 text-white rounded-md px-4 py-2",
          children: [
            u.jsxs("div", {
              children: [
                u.jsxs("div", {
                  className:
                    "md:text-2xl text-lg font-bold flex gap-2 md:h-8 h-6",
                  children: [
                    u.jsx("span", {
                      children: w("round") && `${w("round")}局`,
                    }),
                    u.jsx("span", {
                      children: w("turn") && `${w("turn")}巡目`,
                    }),
                    u.jsx("span", { children: w("wind") && `${w("wind")}家` }),
                    u.jsxs("div", {
                      className: "flex gap-2",
                      children: [
                        w("dora") && "ドラ:",
                        w("dora") && m(w("dora")),
                      ],
                    }),
                  ],
                }),
                u.jsxs("div", {
                  className:
                    "md:text-2xl text-lg md:flex grid grid-cols-2 md:gap-4",
                  children: [
                    u.jsx("span", {
                      children: w("point_east")
                        ? `東家:${w("point_east")}00点`
                        : "東家25000点",
                    }),
                    u.jsx("span", {
                      children: w("point_south")
                        ? `南家:${w("point_south")}00点`
                        : "南家25000点",
                    }),
                    u.jsx("span", {
                      children: w("point_west")
                        ? `西家:${w("point_west")}00点`
                        : "西家25000点",
                    }),
                    u.jsx("span", {
                      children: w("point_north")
                        ? `北家:${w("point_north")}00点`
                        : "北家25000点",
                    }),
                  ],
                }),
              ],
            }),
            u.jsxs("div", {
              className: "flex justify-center items-end mt-6",
              children: [
                Array(Yi)
                  .fill(null)
                  .map((L, z) =>
                    u.jsx(
                      "div",
                      {
                        className: "w-12",
                        children: w(`hand${z + 1}`) && m(w(`hand${z + 1}`)),
                      },
                      z,
                    ),
                  ),
                u.jsxs("div", {
                  className: "w-12 ml-4 flex flex-col",
                  children: [
                    w("tsumo") &&
                      u.jsx("span", {
                        className:
                          "font-bold text-center md:text-base text-[10px]",
                        children: "ツモ",
                      }),
                    w("tsumo") && m(w("tsumo")),
                  ],
                }),
              ],
            }),
          ],
        }),
        u.jsxs("section", {
          children: [
            u.jsxs("div", {
              className: "mt-12 flex items-baseline",
              children: [
                u.jsx("h2", {
                  className: "lg:text-3xl text-2xl",
                  children: "状況",
                }),
                u.jsx("span", {
                  className: "text-xl ml-2 text-red-400",
                  children: "※必須",
                }),
              ],
            }),
            u.jsx("hr", {}),
            u.jsx("div", {
              className: "mt-2 text-xl text-red-400",
              children:
                (P.round ||
                  P.turn ||
                  P.wind ||
                  P.dora ||
                  P.point_east ||
                  P.point_south ||
                  P.point_west ||
                  P.point_north) &&
                u.jsx("span", { children: "※場の状況を全て入力してください" }),
            }),
            u.jsxs("div", {
              className: "flex md:flex-row flex-col gap-8 text-2xl mt-2",
              children: [
                u.jsxs("div", {
                  className: "flex gap-1",
                  children: [
                    u.jsxs("select", {
                      className: "text-gray-800 md:w-fit w-10/12 text-center",
                      defaultValue: "",
                      ...y("round", { required: !0 }),
                      children: [
                        u.jsx("option", {
                          value: "",
                          disabled: !0,
                          children: "未選択",
                        }),
                        u.jsx("option", { value: "東一", children: "東一" }),
                        u.jsx("option", { value: "東二", children: "東二" }),
                        u.jsx("option", { value: "東三", children: "東三" }),
                        u.jsx("option", { value: "東四", children: "東四" }),
                        u.jsx("option", { value: "南一", children: "南一" }),
                        u.jsx("option", { value: "南二", children: "南二" }),
                        u.jsx("option", { value: "南三", children: "南三" }),
                        u.jsx("option", { value: "南四", children: "南四" }),
                      ],
                    }),
                    u.jsx("span", { children: "局" }),
                  ],
                }),
                u.jsxs("div", {
                  className: "flex gap-1",
                  children: [
                    u.jsxs("select", {
                      className: "text-gray-800 md:w-fit w-10/12 text-center",
                      defaultValue: "",
                      ...y("turn", { required: !0 }),
                      children: [
                        u.jsx("option", {
                          value: "",
                          disabled: !0,
                          children: "未選択",
                        }),
                        Array(S0)
                          .fill(null)
                          .map((L, z) =>
                            u.jsx(
                              "option",
                              { value: z + 1, children: z + 1 },
                              z,
                            ),
                          ),
                      ],
                    }),
                    u.jsx("span", { className: "min-w-fit", children: "巡目" }),
                  ],
                }),
                u.jsxs("div", {
                  className: "flex gap-1",
                  children: [
                    u.jsxs("select", {
                      className: "text-gray-800 md:w-fit w-10/12 text-center",
                      defaultValue: "",
                      ...y("wind", { required: !0 }),
                      children: [
                        u.jsx("option", {
                          value: "",
                          disabled: !0,
                          children: "未選択",
                        }),
                        u.jsx("option", { value: "東", children: "東" }),
                        u.jsx("option", { value: "南", children: "南" }),
                        u.jsx("option", { value: "西", children: "西" }),
                        u.jsx("option", { value: "北", children: "北" }),
                      ],
                    }),
                    u.jsx("span", { children: "家" }),
                  ],
                }),
                u.jsxs("div", {
                  className: "flex gap-2 text-2xl",
                  children: [
                    u.jsx("span", {
                      className: "min-w-fit",
                      children: "ドラ:",
                    }),
                    u.jsx("div", {
                      className: "w-full",
                      children: u.jsx("select", {
                        className:
                          "text-gray-800 border border-gray-800 md:w-fit w-10/12 text-center",
                        defaultValue: "",
                        ...y("dora", { required: !0 }),
                        children: l.map((L, z) =>
                          u.jsxs(
                            "optgroup",
                            {
                              label: L.species,
                              children: [
                                u.jsx("option", {
                                  value: "",
                                  disabled: !0,
                                  children: "未選択",
                                }),
                                L.tiles.map((F) =>
                                  u.jsx(
                                    "option",
                                    { value: F.id, children: F.name },
                                    F.id,
                                  ),
                                ),
                              ],
                            },
                            z,
                          ),
                        ),
                      }),
                    }),
                  ],
                }),
              ],
            }),
            u.jsxs("div", {
              className:
                "mt-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6",
              children: [
                u.jsxs("div", {
                  className: "flex gap-2 text-2xl mt-6",
                  children: [
                    u.jsx("span", { children: "東家:" }),
                    u.jsx("input", {
                      type: "number",
                      className: "text-gray-800 text-right w-20 px-2",
                      defaultValue: "250",
                      max: "1500",
                      ...y("point_east", { required: !0 }),
                    }),
                    u.jsx("span", { children: "00点" }),
                  ],
                }),
                u.jsxs("div", {
                  className: "flex gap-2 text-2xl mt-6",
                  children: [
                    u.jsx("span", { children: "南家:" }),
                    u.jsx("input", {
                      type: "number",
                      className: "text-gray-800 text-right w-20 px-2",
                      defaultValue: "250",
                      max: "1500",
                      ...y("point_south", { required: !0 }),
                    }),
                    u.jsx("span", { children: "00点" }),
                  ],
                }),
                u.jsxs("div", {
                  className: "flex gap-2 text-2xl mt-6",
                  children: [
                    u.jsx("span", { children: "西家:" }),
                    u.jsx("input", {
                      type: "number",
                      className: "text-gray-800 text-right w-20 px-2",
                      defaultValue: "250",
                      max: "1500",
                      ...y("point_west", { required: !0 }),
                    }),
                    u.jsx("span", { children: "00点" }),
                  ],
                }),
                u.jsxs("div", {
                  className: "flex gap-2 text-2xl mt-6",
                  children: [
                    u.jsx("span", { children: "北家:" }),
                    u.jsx("input", {
                      type: "number",
                      className: "text-gray-800 text-right w-20 px-2",
                      defaultValue: "250",
                      max: "1500",
                      ...y("point_north", { required: !0 }),
                    }),
                    u.jsx("span", { children: "00点" }),
                  ],
                }),
              ],
            }),
          ],
        }),
        u.jsxs("section", {
          children: [
            u.jsxs("div", {
              className: "mt-12 flex items-baseline",
              children: [
                u.jsx("h2", {
                  className: "lg:text-3xl text-2xl",
                  children: "手牌",
                }),
                u.jsx("span", {
                  className: "text-xl ml-2 text-red-400",
                  children: "※必須",
                }),
              ],
            }),
            u.jsx("hr", {}),
            u.jsx("div", {
              className: "mt-2 text-xl text-red-400",
              children:
                (P.hand1 ||
                  P.hand2 ||
                  P.hand3 ||
                  P.hand4 ||
                  P.hand5 ||
                  P.hand6 ||
                  P.hand7 ||
                  P.hand8 ||
                  P.hand9 ||
                  P.hand10 ||
                  P.hand11 ||
                  P.hand12 ||
                  P.hand13 ||
                  P.tsumo) &&
                u.jsx("span", { children: "※手牌情報を全て入力してください" }),
            }),
            u.jsxs("div", {
              className:
                "mt-4 grid lg:grid-cols-7 md:grid-cols-4 grid-cols-3 ml-0 max-w-fit mx-auto gap-x-4 gap-y-4",
              children: [
                Array(Yi)
                  .fill(null)
                  .map((L, z) =>
                    u.jsxs(
                      "div",
                      {
                        className: "flex flex-col items-center",
                        children: [
                          u.jsx("span", {
                            className: "text-white",
                            children: z + 1,
                          }),
                          u.jsxs("select", {
                            className:
                              "text-gray-800 text-2xl border border-gray-800",
                            defaultValue: "",
                            ...y(`hand${z + 1}`, { required: !0 }),
                            children: [
                              u.jsx("option", {
                                value: "",
                                disabled: !0,
                                children: "未選択",
                              }),
                              l.map((F, $) =>
                                u.jsx(
                                  "optgroup",
                                  {
                                    label: F.species,
                                    children: F.tiles.map((D) =>
                                      u.jsx(
                                        "option",
                                        { value: D.id, children: D.name },
                                        D.id,
                                      ),
                                    ),
                                  },
                                  $,
                                ),
                              ),
                            ],
                          }),
                        ],
                      },
                      z,
                    ),
                  ),
                u.jsxs("div", {
                  className: "flex flex-col items-center",
                  children: [
                    u.jsx("span", {
                      className: "text-white",
                      children: "ツモ",
                    }),
                    u.jsxs("select", {
                      className:
                        "text-gray-800 text-2xl border border-gray-800",
                      defaultValue: "",
                      ...y("tsumo", { required: !0 }),
                      children: [
                        u.jsx("option", {
                          value: "",
                          disabled: !0,
                          children: "未選択",
                        }),
                        l.map((L, z) =>
                          u.jsx(
                            "optgroup",
                            {
                              label: L.species,
                              children: L.tiles.map((F) =>
                                u.jsx(
                                  "option",
                                  { value: F.id, children: F.name },
                                  F.id,
                                ),
                              ),
                            },
                            z,
                          ),
                        ),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        u.jsx("input", {
          type: "submit",
          value: "作成する",
          className: "btn btn-main mt-16",
        }),
      ],
    }),
  });
}
function j0() {
  const { auth: l } = N.useContext(pn);
  return u.jsxs("div", {
    className:
      "px-4 lg:text-2xl text-lg w-fit mx-auto text-center flex flex-col items-center mt-24",
    children: [
      u.jsxs("p", {
        children: [
          "何切る問題はまだ投稿されていません。",
          u.jsx("br", {}),
          l
            ? ""
            : u.jsxs("span", {
                children: [
                  u.jsx(Je, {
                    to: "/users/new",
                    className: "text-blue-400 hover:text-blue-200 underline",
                    children: "ユーザー登録",
                  }),
                  u.jsx("span", { children: "して" }),
                ],
              }),
          "最初の問題を",
          u.jsx("br", { className: "lg:hidden" }),
          "投稿しに行きましょう！",
        ],
      }),
      l &&
        u.jsx(Je, {
          to: "/what-to-discard-problems/new",
          className: "btn btn-main mt-8",
          children: "何切る問題を作りにいく",
        }),
    ],
  });
}
function E0() {
  const [l, a] = N.useState([]),
    [o, d] = N.useState([]),
    f = (p) => {
      const m = o[Number(p) - 1];
      return u.jsx("img", { src: m });
    };
  return (
    N.useEffect(() => {
      (async () => {
        const y = await (await fetch(`${Vt}/what_to_discard_problems`)).json();
        a(y.what_to_discard_problems);
        const S = await Promise.all(
          Array(bd)
            .fill(null)
            .map(async (w, P) => `/tiles/${P + 1}.png`),
        );
        d(S);
      })();
    }, []),
    u.jsx("div", {
      children: l.length
        ? l.map((p) =>
            u.jsx(
              Je,
              {
                to: `/what-to-discard-problems/${p.id}`,
                children: u.jsxs("div", {
                  className:
                    "w-4/5 mx-auto flex flex-col justify-between mt-8 min-h-40 bg-green-700 rounded-md px-4 py-2",
                  children: [
                    u.jsxs("div", {
                      className:
                        "md:text-2xl text-lg font-bold flex gap-2 md:h-8 h-6",
                      children: [
                        u.jsx("span", { children: `${p.round}局` }),
                        u.jsx("span", { children: `${p.turn}巡目` }),
                        u.jsx("span", { children: `${p.wind}家` }),
                        u.jsxs("div", {
                          className: "flex gap-2",
                          children: [
                            u.jsx("span", { children: "ドラ:" }),
                            f(p.dora),
                          ],
                        }),
                      ],
                    }),
                    u.jsxs("div", {
                      className:
                        "md:text-2xl text-lg md:flex grid grid-cols-2 md:gap-4",
                      children: [
                        u.jsx("span", { children: `東家:${p.point_east}00点` }),
                        u.jsx("span", {
                          children: `南家:${p.point_south}00点`,
                        }),
                        u.jsx("span", { children: `西家:${p.point_west}00点` }),
                        u.jsx("span", {
                          children: `北家:${p.point_north}00点`,
                        }),
                      ],
                    }),
                    u.jsxs("div", {
                      className: "flex justify-center items-end mt-6",
                      children: [
                        Array(Yi)
                          .fill(null)
                          .map((m, y) =>
                            u.jsx(
                              "div",
                              {
                                className: "w-12",
                                children: f(p[`hand${y + 1}`]),
                              },
                              y,
                            ),
                          ),
                        u.jsxs("div", {
                          className: "w-12 ml-4 flex flex-col",
                          children: [
                            u.jsx("span", {
                              className:
                                "font-bold text-center md:text-base text-[10px]",
                              children: "ツモ",
                            }),
                            f(p.tsumo),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              },
              p.id,
            ),
          )
        : u.jsx(j0, {}),
    })
  );
}
function N0() {
  const [l, a] = N.useState(),
    [o, d] = N.useState([]),
    [f, p] = N.useState(""),
    [m, y] = N.useState(""),
    { id: S } = Dd();
  return (
    N.useEffect(() => {
      (async () => {
        const R = await (
          await fetch(`${Vt}/what_to_discard_problems/${S}`)
        ).json();
        if ((a(R.what_to_discard_problem), l)) {
          const L = await Promise.all(
            Array(Yi)
              .fill(null)
              .map(async ($, D) => `/tiles/${l[`hand${D + 1}`]}.png`),
          );
          d(L);
          const z = l.dora;
          p(`/tiles/${z}.png`);
          const F = l.dora;
          y(`/tiles/${F}.png`);
        }
      })();
    }, [JSON.stringify(l)]),
    u.jsx("div", {
      children: u.jsxs("div", {
        className:
          "w-4/5 mx-auto flex flex-col justify-between mt-8 min-h-40 bg-green-700 rounded-md px-4 py-2",
        children: [
          u.jsxs("div", {
            className: "md:text-2xl text-lg font-bold flex gap-2 md:h-8 h-6",
            children: [
              u.jsx("span", { children: `${l == null ? void 0 : l.round}局` }),
              u.jsx("span", { children: `${l == null ? void 0 : l.turn}巡目` }),
              u.jsx("span", { children: `${l == null ? void 0 : l.wind}家` }),
              u.jsxs("div", {
                className: "flex gap-2",
                children: [
                  u.jsx("span", { children: "ドラ:" }),
                  u.jsx("img", { src: f }),
                ],
              }),
            ],
          }),
          u.jsxs("div", {
            className: "md:text-2xl text-lg md:flex grid grid-cols-2 md:gap-4",
            children: [
              u.jsx("span", {
                children: `東家:${l == null ? void 0 : l.point_east}00点`,
              }),
              u.jsx("span", {
                children: `南家:${l == null ? void 0 : l.point_south}00点`,
              }),
              u.jsx("span", {
                children: `西家:${l == null ? void 0 : l.point_west}00点`,
              }),
              u.jsx("span", {
                children: `北家:${l == null ? void 0 : l.point_north}00点`,
              }),
            ],
          }),
          u.jsxs("div", {
            className: "flex justify-center items-end mt-6",
            children: [
              o.map((w, P) => u.jsx("img", { src: w }, P)),
              u.jsxs("div", {
                className: "w-12 ml-4 flex flex-col",
                children: [
                  u.jsx("span", {
                    className: "font-bold text-center md:text-base text-[10px]",
                    children: "ツモ",
                  }),
                  u.jsx("img", { src: m }),
                ],
              }),
            ],
          }),
        ],
      }),
    })
  );
}
function _0() {
  return u.jsx("div", {});
}
const pn = N.createContext({ auth: void 0, setAuth: () => {} });
N.createContext({ csrfToken: void 0, setCsrfToken: () => {} });
function C0() {
  const [l, a] = N.useState();
  return (
    N.useEffect(() => {
      l === void 0 &&
        (async () => {
          if (
            (
              await (
                await fetch(`${Vt}/session/state`, { credentials: "include" })
              ).json()
            ).auth != !0
          ) {
            a(!1);
            return;
          }
          a(!0);
          const m = await (
              await fetch(`${Vt}/csrf_token`, { credentials: "include" })
            ).json(),
            y = document.querySelector("meta[name='csrf-token']");
          if (y) y.setAttribute("content", m.csrf_token);
          else {
            const S = document.createElement("meta");
            (S.name = "csrf-token"),
              (S.content = m.csrf_token),
              document.head.appendChild(S);
          }
        })(),
        console.log(`App: ${l}`);
    }, [l]),
    u.jsx(pn.Provider, {
      value: { auth: l, setAuth: a },
      children: u.jsx(wm, {
        children: u.jsx(Gh, {
          children: u.jsxs(rt, {
            element: u.jsx(Wm, {}),
            children: [
              u.jsx(rt, { path: "/", element: u.jsx(Hm, {}) }),
              u.jsx(rt, { path: "/auth/login", element: u.jsx(d0, {}) }),
              u.jsx(rt, { path: "/users/new", element: u.jsx(p0, {}) }),
              u.jsx(rt, { path: "/dashboard", element: u.jsx(h0, {}) }),
              u.jsx(rt, { path: "/about", element: u.jsx(_0, {}) }),
              u.jsxs(rt, {
                path: "/forum-threads",
                children: [
                  u.jsx(rt, { index: !0, element: u.jsx(y0, {}) }),
                  u.jsx(rt, { path: "new", element: u.jsx(g0, {}) }),
                  u.jsx(rt, { path: ":id", element: u.jsx(x0, {}) }),
                  u.jsx(rt, { path: ":id/edit", element: u.jsx(w0, {}) }),
                ],
              }),
              u.jsxs(rt, {
                path: "/what-to-discard-problems",
                children: [
                  u.jsx(rt, { index: !0, element: u.jsx(E0, {}) }),
                  u.jsx(rt, { path: "new", element: u.jsx(k0, {}) }),
                  u.jsx(rt, { path: ":id", element: u.jsx(N0, {}) }),
                ],
              }),
              u.jsx(rt, { path: "/practice", element: u.jsx(v0, {}) }),
            ],
          }),
        }),
      }),
    })
  );
}
rh.createRoot(document.getElementById("root")).render(u.jsx(C0, {}));
