/* D3, graphlib and dagre-d3 (in that order) */
!function () {
    function n(n, t) { return t > n ? -1 : n > t ? 1 : n >= t ? 0 : 0 / 0 } function t(n) { return null != n && !isNaN(n) } function e(n) { return { left: function (t, e, r, u) { for (arguments.length < 3 && (r = 0), arguments.length < 4 && (u = t.length) ; u > r;) { var i = r + u >>> 1; n(t[i], e) < 0 ? r = i + 1 : u = i } return r }, right: function (t, e, r, u) { for (arguments.length < 3 && (r = 0), arguments.length < 4 && (u = t.length) ; u > r;) { var i = r + u >>> 1; n(t[i], e) > 0 ? u = i : r = i + 1 } return r } } } function r(n) { return n.length } function u(n) { for (var t = 1; n * t % 1;) t *= 10; return t } function i(n, t) { try { for (var e in t) Object.defineProperty(n.prototype, e, { value: t[e], enumerable: !1 }) } catch (r) { n.prototype = t } } function o() { } function a(n) { return ia + n in this } function c(n) { return n = ia + n, n in this && delete this[n] } function s() { var n = []; return this.forEach(function (t) { n.push(t) }), n } function l() { var n = 0; for (var t in this) t.charCodeAt(0) === oa && ++n; return n } function f() { for (var n in this) if (n.charCodeAt(0) === oa) return !1; return !0 } function h() { } function g(n, t, e) { return function () { var r = e.apply(t, arguments); return r === t ? n : r } } function p(n, t) { if (t in n) return t; t = t.charAt(0).toUpperCase() + t.substring(1); for (var e = 0, r = aa.length; r > e; ++e) { var u = aa[e] + t; if (u in n) return u } } function v() { } function d() { } function m(n) { function t() { for (var t, r = e, u = -1, i = r.length; ++u < i;) (t = r[u].on) && t.apply(this, arguments); return n } var e = [], r = new o; return t.on = function (t, u) { var i, o = r.get(t); return arguments.length < 2 ? o && o.on : (o && (o.on = null, e = e.slice(0, i = e.indexOf(o)).concat(e.slice(i + 1)), r.remove(t)), u && e.push(r.set(t, { on: u })), n) }, t } function y() { Zo.event.preventDefault() } function x() { for (var n, t = Zo.event; n = t.sourceEvent;) t = n; return t } function M(n) { for (var t = new d, e = 0, r = arguments.length; ++e < r;) t[arguments[e]] = m(t); return t.of = function (e, r) { return function (u) { try { var i = u.sourceEvent = Zo.event; u.target = n, Zo.event = u, t[u.type].apply(e, r) } finally { Zo.event = i } } }, t } function _(n) { return sa(n, pa), n } function b(n) { return "function" == typeof n ? n : function () { return la(n, this) } } function w(n) { return "function" == typeof n ? n : function () { return fa(n, this) } } function S(n, t) { function e() { this.removeAttribute(n) } function r() { this.removeAttributeNS(n.space, n.local) } function u() { this.setAttribute(n, t) } function i() { this.setAttributeNS(n.space, n.local, t) } function o() { var e = t.apply(this, arguments); null == e ? this.removeAttribute(n) : this.setAttribute(n, e) } function a() { var e = t.apply(this, arguments); null == e ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e) } return n = Zo.ns.qualify(n), null == t ? n.local ? r : e : "function" == typeof t ? n.local ? a : o : n.local ? i : u } function k(n) { return n.trim().replace(/\s+/g, " ") } function E(n) { return new RegExp("(?:^|\\s+)" + Zo.requote(n) + "(?:\\s+|$)", "g") } function A(n) { return (n + "").trim().split(/^|\s+/) } function C(n, t) { function e() { for (var e = -1; ++e < u;) n[e](this, t) } function r() { for (var e = -1, r = t.apply(this, arguments) ; ++e < u;) n[e](this, r) } n = A(n).map(N); var u = n.length; return "function" == typeof t ? r : e } function N(n) { var t = E(n); return function (e, r) { if (u = e.classList) return r ? u.add(n) : u.remove(n); var u = e.getAttribute("class") || ""; r ? (t.lastIndex = 0, t.test(u) || e.setAttribute("class", k(u + " " + n))) : e.setAttribute("class", k(u.replace(t, " "))) } } function z(n, t, e) { function r() { this.style.removeProperty(n) } function u() { this.style.setProperty(n, t, e) } function i() { var r = t.apply(this, arguments); null == r ? this.style.removeProperty(n) : this.style.setProperty(n, r, e) } return null == t ? r : "function" == typeof t ? i : u } function L(n, t) { function e() { delete this[n] } function r() { this[n] = t } function u() { var e = t.apply(this, arguments); null == e ? delete this[n] : this[n] = e } return null == t ? e : "function" == typeof t ? u : r } function T(n) { return "function" == typeof n ? n : (n = Zo.ns.qualify(n)).local ? function () { return this.ownerDocument.createElementNS(n.space, n.local) } : function () { return this.ownerDocument.createElementNS(this.namespaceURI, n) } } function q(n) { return { __data__: n } } function R(n) { return function () { return ga(this, n) } } function D(t) { return arguments.length || (t = n), function (n, e) { return n && e ? t(n.__data__, e.__data__) : !n - !e } } function P(n, t) { for (var e = 0, r = n.length; r > e; e++) for (var u, i = n[e], o = 0, a = i.length; a > o; o++) (u = i[o]) && t(u, o, e); return n } function U(n) { return sa(n, da), n } function j(n) { var t, e; return function (r, u, i) { var o, a = n[i].update, c = a.length; for (i != e && (e = i, t = 0), u >= t && (t = u + 1) ; !(o = a[t]) && ++t < c;); return o } } function H() { var n = this.__transition__; n && ++n.active } function F(n, t, e) { function r() { var t = this[o]; t && (this.removeEventListener(n, t, t.$), delete this[o]) } function u() { var u = c(t, Xo(arguments)); r.call(this), this.addEventListener(n, this[o] = u, u.$ = e), u._ = t } function i() { var t, e = new RegExp("^__on([^.]+)" + Zo.requote(n) + "$"); for (var r in this) if (t = r.match(e)) { var u = this[r]; this.removeEventListener(t[1], u, u.$), delete this[r] } } var o = "__on" + n, a = n.indexOf("."), c = O; a > 0 && (n = n.substring(0, a)); var s = ya.get(n); return s && (n = s, c = Y), a ? t ? u : r : t ? v : i } function O(n, t) { return function (e) { var r = Zo.event; Zo.event = e, t[0] = this.__data__; try { n.apply(this, t) } finally { Zo.event = r } } } function Y(n, t) { var e = O(n, t); return function (n) { var t = this, r = n.relatedTarget; r && (r === t || 8 & r.compareDocumentPosition(t)) || e.call(t, n) } } function I() { var n = ".dragsuppress-" + ++Ma, t = "click" + n, e = Zo.select(Wo).on("touchmove" + n, y).on("dragstart" + n, y).on("selectstart" + n, y); if (xa) { var r = Bo.style, u = r[xa]; r[xa] = "none" } return function (i) { function o() { e.on(t, null) } e.on(n, null), xa && (r[xa] = u), i && (e.on(t, function () { y(), o() }, !0), setTimeout(o, 0)) } } function Z(n, t) { t.changedTouches && (t = t.changedTouches[0]); var e = n.ownerSVGElement || n; if (e.createSVGPoint) { var r = e.createSVGPoint(); if (0 > _a && (Wo.scrollX || Wo.scrollY)) { e = Zo.select("body").append("svg").style({ position: "absolute", top: 0, left: 0, margin: 0, padding: 0, border: "none" }, "important"); var u = e[0][0].getScreenCTM(); _a = !(u.f || u.e), e.remove() } return _a ? (r.x = t.pageX, r.y = t.pageY) : (r.x = t.clientX, r.y = t.clientY), r = r.matrixTransform(n.getScreenCTM().inverse()), [r.x, r.y] } var i = n.getBoundingClientRect(); return [t.clientX - i.left - n.clientLeft, t.clientY - i.top - n.clientTop] } function V() { return Zo.event.changedTouches[0].identifier } function X() { return Zo.event.target } function $() { return Wo } function B(n) { return n > 0 ? 1 : 0 > n ? -1 : 0 } function W(n, t, e) { return (t[0] - n[0]) * (e[1] - n[1]) - (t[1] - n[1]) * (e[0] - n[0]) } function J(n) { return n > 1 ? 0 : -1 > n ? ba : Math.acos(n) } function G(n) { return n > 1 ? Sa : -1 > n ? -Sa : Math.asin(n) } function K(n) { return ((n = Math.exp(n)) - 1 / n) / 2 } function Q(n) { return ((n = Math.exp(n)) + 1 / n) / 2 } function nt(n) { return ((n = Math.exp(2 * n)) - 1) / (n + 1) } function tt(n) { return (n = Math.sin(n / 2)) * n } function et() { } function rt(n, t, e) { return this instanceof rt ? (this.h = +n, this.s = +t, void (this.l = +e)) : arguments.length < 2 ? n instanceof rt ? new rt(n.h, n.s, n.l) : mt("" + n, yt, rt) : new rt(n, t, e) } function ut(n, t, e) { function r(n) { return n > 360 ? n -= 360 : 0 > n && (n += 360), 60 > n ? i + (o - i) * n / 60 : 180 > n ? o : 240 > n ? i + (o - i) * (240 - n) / 60 : i } function u(n) { return Math.round(255 * r(n)) } var i, o; return n = isNaN(n) ? 0 : (n %= 360) < 0 ? n + 360 : n, t = isNaN(t) ? 0 : 0 > t ? 0 : t > 1 ? 1 : t, e = 0 > e ? 0 : e > 1 ? 1 : e, o = .5 >= e ? e * (1 + t) : e + t - e * t, i = 2 * e - o, new gt(u(n + 120), u(n), u(n - 120)) } function it(n, t, e) { return this instanceof it ? (this.h = +n, this.c = +t, void (this.l = +e)) : arguments.length < 2 ? n instanceof it ? new it(n.h, n.c, n.l) : n instanceof at ? st(n.l, n.a, n.b) : st((n = xt((n = Zo.rgb(n)).r, n.g, n.b)).l, n.a, n.b) : new it(n, t, e) } function ot(n, t, e) { return isNaN(n) && (n = 0), isNaN(t) && (t = 0), new at(e, Math.cos(n *= Aa) * t, Math.sin(n) * t) } function at(n, t, e) { return this instanceof at ? (this.l = +n, this.a = +t, void (this.b = +e)) : arguments.length < 2 ? n instanceof at ? new at(n.l, n.a, n.b) : n instanceof it ? ot(n.l, n.c, n.h) : xt((n = gt(n)).r, n.g, n.b) : new at(n, t, e) } function ct(n, t, e) { var r = (n + 16) / 116, u = r + t / 500, i = r - e / 200; return u = lt(u) * ja, r = lt(r) * Ha, i = lt(i) * Fa, new gt(ht(3.2404542 * u - 1.5371385 * r - .4985314 * i), ht(-.969266 * u + 1.8760108 * r + .041556 * i), ht(.0556434 * u - .2040259 * r + 1.0572252 * i)) } function st(n, t, e) { return n > 0 ? new it(Math.atan2(e, t) * Ca, Math.sqrt(t * t + e * e), n) : new it(0 / 0, 0 / 0, n) } function lt(n) { return n > .206893034 ? n * n * n : (n - 4 / 29) / 7.787037 } function ft(n) { return n > .008856 ? Math.pow(n, 1 / 3) : 7.787037 * n + 4 / 29 } function ht(n) { return Math.round(255 * (.00304 >= n ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - .055)) } function gt(n, t, e) { return this instanceof gt ? (this.r = ~~n, this.g = ~~t, void (this.b = ~~e)) : arguments.length < 2 ? n instanceof gt ? new gt(n.r, n.g, n.b) : mt("" + n, gt, ut) : new gt(n, t, e) } function pt(n) { return new gt(n >> 16, 255 & n >> 8, 255 & n) } function vt(n) { return pt(n) + "" } function dt(n) { return 16 > n ? "0" + Math.max(0, n).toString(16) : Math.min(255, n).toString(16) } function mt(n, t, e) { var r, u, i, o = 0, a = 0, c = 0; if (r = /([a-z]+)\((.*)\)/i.exec(n)) switch (u = r[2].split(","), r[1]) { case "hsl": return e(parseFloat(u[0]), parseFloat(u[1]) / 100, parseFloat(u[2]) / 100); case "rgb": return t(_t(u[0]), _t(u[1]), _t(u[2])) } return (i = Ia.get(n)) ? t(i.r, i.g, i.b) : (null == n || "#" !== n.charAt(0) || isNaN(i = parseInt(n.substring(1), 16)) || (4 === n.length ? (o = (3840 & i) >> 4, o = o >> 4 | o, a = 240 & i, a = a >> 4 | a, c = 15 & i, c = c << 4 | c) : 7 === n.length && (o = (16711680 & i) >> 16, a = (65280 & i) >> 8, c = 255 & i)), t(o, a, c)) } function yt(n, t, e) { var r, u, i = Math.min(n /= 255, t /= 255, e /= 255), o = Math.max(n, t, e), a = o - i, c = (o + i) / 2; return a ? (u = .5 > c ? a / (o + i) : a / (2 - o - i), r = n == o ? (t - e) / a + (e > t ? 6 : 0) : t == o ? (e - n) / a + 2 : (n - t) / a + 4, r *= 60) : (r = 0 / 0, u = c > 0 && 1 > c ? 0 : r), new rt(r, u, c) } function xt(n, t, e) { n = Mt(n), t = Mt(t), e = Mt(e); var r = ft((.4124564 * n + .3575761 * t + .1804375 * e) / ja), u = ft((.2126729 * n + .7151522 * t + .072175 * e) / Ha), i = ft((.0193339 * n + .119192 * t + .9503041 * e) / Fa); return at(116 * u - 16, 500 * (r - u), 200 * (u - i)) } function Mt(n) { return (n /= 255) <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4) } function _t(n) { var t = parseFloat(n); return "%" === n.charAt(n.length - 1) ? Math.round(2.55 * t) : t } function bt(n) { return "function" == typeof n ? n : function () { return n } } function wt(n) { return n } function St(n) { return function (t, e, r) { return 2 === arguments.length && "function" == typeof e && (r = e, e = null), kt(t, e, n, r) } } function kt(n, t, e, r) { function u() { var n, t = c.status; if (!t && c.responseText || t >= 200 && 300 > t || 304 === t) { try { n = e.call(i, c) } catch (r) { return o.error.call(i, r), void 0 } o.load.call(i, n) } else o.error.call(i, c) } var i = {}, o = Zo.dispatch("beforesend", "progress", "load", "error"), a = {}, c = new XMLHttpRequest, s = null; return !Wo.XDomainRequest || "withCredentials" in c || !/^(http(s)?:)?\/\//.test(n) || (c = new XDomainRequest), "onload" in c ? c.onload = c.onerror = u : c.onreadystatechange = function () { c.readyState > 3 && u() }, c.onprogress = function (n) { var t = Zo.event; Zo.event = n; try { o.progress.call(i, c) } finally { Zo.event = t } }, i.header = function (n, t) { return n = (n + "").toLowerCase(), arguments.length < 2 ? a[n] : (null == t ? delete a[n] : a[n] = t + "", i) }, i.mimeType = function (n) { return arguments.length ? (t = null == n ? null : n + "", i) : t }, i.responseType = function (n) { return arguments.length ? (s = n, i) : s }, i.response = function (n) { return e = n, i }, ["get", "post"].forEach(function (n) { i[n] = function () { return i.send.apply(i, [n].concat(Xo(arguments))) } }), i.send = function (e, r, u) { if (2 === arguments.length && "function" == typeof r && (u = r, r = null), c.open(e, n, !0), null == t || "accept" in a || (a.accept = t + ",*/*"), c.setRequestHeader) for (var l in a) c.setRequestHeader(l, a[l]); return null != t && c.overrideMimeType && c.overrideMimeType(t), null != s && (c.responseType = s), null != u && i.on("error", u).on("load", function (n) { u(null, n) }), o.beforesend.call(i, c), c.send(null == r ? null : r), i }, i.abort = function () { return c.abort(), i }, Zo.rebind(i, o, "on"), null == r ? i : i.get(Et(r)) } function Et(n) { return 1 === n.length ? function (t, e) { n(null == t ? e : null) } : n } function At() { var n = Ct(), t = Nt() - n; t > 24 ? (isFinite(t) && (clearTimeout($a), $a = setTimeout(At, t)), Xa = 0) : (Xa = 1, Wa(At)) } function Ct() { var n = Date.now(); for (Ba = Za; Ba;) n >= Ba.t && (Ba.f = Ba.c(n - Ba.t)), Ba = Ba.n; return n } function Nt() { for (var n, t = Za, e = 1 / 0; t;) t.f ? t = n ? n.n = t.n : Za = t.n : (t.t < e && (e = t.t), t = (n = t).n); return Va = n, e } function zt(n, t) { return t - (n ? Math.ceil(Math.log(n) / Math.LN10) : 1) } function Lt(n, t) { var e = Math.pow(10, 3 * ua(8 - t)); return { scale: t > 8 ? function (n) { return n / e } : function (n) { return n * e }, symbol: n } } function Tt(n) { var t = n.decimal, e = n.thousands, r = n.grouping, u = n.currency, i = r ? function (n) { for (var t = n.length, u = [], i = 0, o = r[0]; t > 0 && o > 0;) u.push(n.substring(t -= o, t + o)), o = r[i = (i + 1) % r.length]; return u.reverse().join(e) } : wt; return function (n) { var e = Ga.exec(n), r = e[1] || " ", o = e[2] || ">", a = e[3] || "", c = e[4] || "", s = e[5], l = +e[6], f = e[7], h = e[8], g = e[9], p = 1, v = "", d = "", m = !1; switch (h && (h = +h.substring(1)), (s || "0" === r && "=" === o) && (s = r = "0", o = "=", f && (l -= Math.floor((l - 1) / 4))), g) { case "n": f = !0, g = "g"; break; case "%": p = 100, d = "%", g = "f"; break; case "p": p = 100, d = "%", g = "r"; break; case "b": case "o": case "x": case "X": "#" === c && (v = "0" + g.toLowerCase()); case "c": case "d": m = !0, h = 0; break; case "s": p = -1, g = "r" } "$" === c && (v = u[0], d = u[1]), "r" != g || h || (g = "g"), null != h && ("g" == g ? h = Math.max(1, Math.min(21, h)) : ("e" == g || "f" == g) && (h = Math.max(0, Math.min(20, h)))), g = Ka.get(g) || qt; var y = s && f; return function (n) { var e = d; if (m && n % 1) return ""; var u = 0 > n || 0 === n && 0 > 1 / n ? (n = -n, "-") : a; if (0 > p) { var c = Zo.formatPrefix(n, h); n = c.scale(n), e = c.symbol + d } else n *= p; n = g(n, h); var x = n.lastIndexOf("."), M = 0 > x ? n : n.substring(0, x), _ = 0 > x ? "" : t + n.substring(x + 1); !s && f && (M = i(M)); var b = v.length + M.length + _.length + (y ? 0 : u.length), w = l > b ? new Array(b = l - b + 1).join(r) : ""; return y && (M = i(w + M)), u += v, n = M + _, ("<" === o ? u + n + w : ">" === o ? w + u + n : "^" === o ? w.substring(0, b >>= 1) + u + n + w.substring(b) : u + (y ? n : w + n)) + e } } } function qt(n) { return n + "" } function Rt() { this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]) } function Dt(n, t, e) { function r(t) { var e = n(t), r = i(e, 1); return r - t > t - e ? e : r } function u(e) { return t(e = n(new nc(e - 1)), 1), e } function i(n, e) { return t(n = new nc(+n), e), n } function o(n, r, i) { var o = u(n), a = []; if (i > 1) for (; r > o;) e(o) % i || a.push(new Date(+o)), t(o, 1); else for (; r > o;) a.push(new Date(+o)), t(o, 1); return a } function a(n, t, e) { try { nc = Rt; var r = new Rt; return r._ = n, o(r, t, e) } finally { nc = Date } } n.floor = n, n.round = r, n.ceil = u, n.offset = i, n.range = o; var c = n.utc = Pt(n); return c.floor = c, c.round = Pt(r), c.ceil = Pt(u), c.offset = Pt(i), c.range = a, n } function Pt(n) { return function (t, e) { try { nc = Rt; var r = new Rt; return r._ = t, n(r, e)._ } finally { nc = Date } } } function Ut(n) { function t(n) { function t(t) { for (var e, u, i, o = [], a = -1, c = 0; ++a < r;) 37 === n.charCodeAt(a) && (o.push(n.substring(c, a)), null != (u = ec[e = n.charAt(++a)]) && (e = n.charAt(++a)), (i = C[e]) && (e = i(t, null == u ? "e" === e ? " " : "0" : u)), o.push(e), c = a + 1); return o.push(n.substring(c, a)), o.join("") } var r = n.length; return t.parse = function (t) { var r = { y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0, Z: null }, u = e(r, n, t, 0); if (u != t.length) return null; "p" in r && (r.H = r.H % 12 + 12 * r.p); var i = null != r.Z && nc !== Rt, o = new (i ? Rt : nc); return "j" in r ? o.setFullYear(r.y, 0, r.j) : "w" in r && ("W" in r || "U" in r) ? (o.setFullYear(r.y, 0, 1), o.setFullYear(r.y, 0, "W" in r ? (r.w + 6) % 7 + 7 * r.W - (o.getDay() + 5) % 7 : r.w + 7 * r.U - (o.getDay() + 6) % 7)) : o.setFullYear(r.y, r.m, r.d), o.setHours(r.H + Math.floor(r.Z / 100), r.M + r.Z % 100, r.S, r.L), i ? o._ : o }, t.toString = function () { return n }, t } function e(n, t, e, r) { for (var u, i, o, a = 0, c = t.length, s = e.length; c > a;) { if (r >= s) return -1; if (u = t.charCodeAt(a++), 37 === u) { if (o = t.charAt(a++), i = N[o in ec ? t.charAt(a++) : o], !i || (r = i(n, e, r)) < 0) return -1 } else if (u != e.charCodeAt(r++)) return -1 } return r } function r(n, t, e) { b.lastIndex = 0; var r = b.exec(t.substring(e)); return r ? (n.w = w.get(r[0].toLowerCase()), e + r[0].length) : -1 } function u(n, t, e) { M.lastIndex = 0; var r = M.exec(t.substring(e)); return r ? (n.w = _.get(r[0].toLowerCase()), e + r[0].length) : -1 } function i(n, t, e) { E.lastIndex = 0; var r = E.exec(t.substring(e)); return r ? (n.m = A.get(r[0].toLowerCase()), e + r[0].length) : -1 } function o(n, t, e) { S.lastIndex = 0; var r = S.exec(t.substring(e)); return r ? (n.m = k.get(r[0].toLowerCase()), e + r[0].length) : -1 } function a(n, t, r) { return e(n, C.c.toString(), t, r) } function c(n, t, r) { return e(n, C.x.toString(), t, r) } function s(n, t, r) { return e(n, C.X.toString(), t, r) } function l(n, t, e) { var r = x.get(t.substring(e, e += 2).toLowerCase()); return null == r ? -1 : (n.p = r, e) } var f = n.dateTime, h = n.date, g = n.time, p = n.periods, v = n.days, d = n.shortDays, m = n.months, y = n.shortMonths; t.utc = function (n) { function e(n) { try { nc = Rt; var t = new nc; return t._ = n, r(t) } finally { nc = Date } } var r = t(n); return e.parse = function (n) { try { nc = Rt; var t = r.parse(n); return t && t._ } finally { nc = Date } }, e.toString = r.toString, e }, t.multi = t.utc.multi = re; var x = Zo.map(), M = Ht(v), _ = Ft(v), b = Ht(d), w = Ft(d), S = Ht(m), k = Ft(m), E = Ht(y), A = Ft(y); p.forEach(function (n, t) { x.set(n.toLowerCase(), t) }); var C = { a: function (n) { return d[n.getDay()] }, A: function (n) { return v[n.getDay()] }, b: function (n) { return y[n.getMonth()] }, B: function (n) { return m[n.getMonth()] }, c: t(f), d: function (n, t) { return jt(n.getDate(), t, 2) }, e: function (n, t) { return jt(n.getDate(), t, 2) }, H: function (n, t) { return jt(n.getHours(), t, 2) }, I: function (n, t) { return jt(n.getHours() % 12 || 12, t, 2) }, j: function (n, t) { return jt(1 + Qa.dayOfYear(n), t, 3) }, L: function (n, t) { return jt(n.getMilliseconds(), t, 3) }, m: function (n, t) { return jt(n.getMonth() + 1, t, 2) }, M: function (n, t) { return jt(n.getMinutes(), t, 2) }, p: function (n) { return p[+(n.getHours() >= 12)] }, S: function (n, t) { return jt(n.getSeconds(), t, 2) }, U: function (n, t) { return jt(Qa.sundayOfYear(n), t, 2) }, w: function (n) { return n.getDay() }, W: function (n, t) { return jt(Qa.mondayOfYear(n), t, 2) }, x: t(h), X: t(g), y: function (n, t) { return jt(n.getFullYear() % 100, t, 2) }, Y: function (n, t) { return jt(n.getFullYear() % 1e4, t, 4) }, Z: te, "%": function () { return "%" } }, N = { a: r, A: u, b: i, B: o, c: a, d: Wt, e: Wt, H: Gt, I: Gt, j: Jt, L: ne, m: Bt, M: Kt, p: l, S: Qt, U: Yt, w: Ot, W: It, x: c, X: s, y: Vt, Y: Zt, Z: Xt, "%": ee }; return t } function jt(n, t, e) { var r = 0 > n ? "-" : "", u = (r ? -n : n) + "", i = u.length; return r + (e > i ? new Array(e - i + 1).join(t) + u : u) } function Ht(n) { return new RegExp("^(?:" + n.map(Zo.requote).join("|") + ")", "i") } function Ft(n) { for (var t = new o, e = -1, r = n.length; ++e < r;) t.set(n[e].toLowerCase(), e); return t } function Ot(n, t, e) { rc.lastIndex = 0; var r = rc.exec(t.substring(e, e + 1)); return r ? (n.w = +r[0], e + r[0].length) : -1 } function Yt(n, t, e) { rc.lastIndex = 0; var r = rc.exec(t.substring(e)); return r ? (n.U = +r[0], e + r[0].length) : -1 } function It(n, t, e) { rc.lastIndex = 0; var r = rc.exec(t.substring(e)); return r ? (n.W = +r[0], e + r[0].length) : -1 } function Zt(n, t, e) { rc.lastIndex = 0; var r = rc.exec(t.substring(e, e + 4)); return r ? (n.y = +r[0], e + r[0].length) : -1 } function Vt(n, t, e) { rc.lastIndex = 0; var r = rc.exec(t.substring(e, e + 2)); return r ? (n.y = $t(+r[0]), e + r[0].length) : -1 } function Xt(n, t, e) { return /^[+-]\d{4}$/.test(t = t.substring(e, e + 5)) ? (n.Z = -t, e + 5) : -1 } function $t(n) { return n + (n > 68 ? 1900 : 2e3) } function Bt(n, t, e) { rc.lastIndex = 0; var r = rc.exec(t.substring(e, e + 2)); return r ? (n.m = r[0] - 1, e + r[0].length) : -1 } function Wt(n, t, e) { rc.lastIndex = 0; var r = rc.exec(t.substring(e, e + 2)); return r ? (n.d = +r[0], e + r[0].length) : -1 } function Jt(n, t, e) { rc.lastIndex = 0; var r = rc.exec(t.substring(e, e + 3)); return r ? (n.j = +r[0], e + r[0].length) : -1 } function Gt(n, t, e) { rc.lastIndex = 0; var r = rc.exec(t.substring(e, e + 2)); return r ? (n.H = +r[0], e + r[0].length) : -1 } function Kt(n, t, e) { rc.lastIndex = 0; var r = rc.exec(t.substring(e, e + 2)); return r ? (n.M = +r[0], e + r[0].length) : -1 } function Qt(n, t, e) { rc.lastIndex = 0; var r = rc.exec(t.substring(e, e + 2)); return r ? (n.S = +r[0], e + r[0].length) : -1 } function ne(n, t, e) { rc.lastIndex = 0; var r = rc.exec(t.substring(e, e + 3)); return r ? (n.L = +r[0], e + r[0].length) : -1 } function te(n) { var t = n.getTimezoneOffset(), e = t > 0 ? "-" : "+", r = ~~(ua(t) / 60), u = ua(t) % 60; return e + jt(r, "0", 2) + jt(u, "0", 2) } function ee(n, t, e) { uc.lastIndex = 0; var r = uc.exec(t.substring(e, e + 1)); return r ? e + r[0].length : -1 } function re(n) { for (var t = n.length, e = -1; ++e < t;) n[e][0] = this(n[e][0]); return function (t) { for (var e = 0, r = n[e]; !r[1](t) ;) r = n[++e]; return r[0](t) } } function ue() { } function ie(n, t, e) { var r = e.s = n + t, u = r - n, i = r - u; e.t = n - i + (t - u) } function oe(n, t) { n && cc.hasOwnProperty(n.type) && cc[n.type](n, t) } function ae(n, t, e) { var r, u = -1, i = n.length - e; for (t.lineStart() ; ++u < i;) r = n[u], t.point(r[0], r[1], r[2]); t.lineEnd() } function ce(n, t) { var e = -1, r = n.length; for (t.polygonStart() ; ++e < r;) ae(n[e], t, 1); t.polygonEnd() } function se() { function n(n, t) { n *= Aa, t = t * Aa / 2 + ba / 4; var e = n - r, o = e >= 0 ? 1 : -1, a = o * e, c = Math.cos(t), s = Math.sin(t), l = i * s, f = u * c + l * Math.cos(a), h = l * o * Math.sin(a); lc.add(Math.atan2(h, f)), r = n, u = c, i = s } var t, e, r, u, i; fc.point = function (o, a) { fc.point = n, r = (t = o) * Aa, u = Math.cos(a = (e = a) * Aa / 2 + ba / 4), i = Math.sin(a) }, fc.lineEnd = function () { n(t, e) } } function le(n) { var t = n[0], e = n[1], r = Math.cos(e); return [r * Math.cos(t), r * Math.sin(t), Math.sin(e)] } function fe(n, t) { return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] } function he(n, t) { return [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]] } function ge(n, t) { n[0] += t[0], n[1] += t[1], n[2] += t[2] } function pe(n, t) { return [n[0] * t, n[1] * t, n[2] * t] } function ve(n) { var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]); n[0] /= t, n[1] /= t, n[2] /= t } function de(n) { return [Math.atan2(n[1], n[0]), G(n[2])] } function me(n, t) { return ua(n[0] - t[0]) < ka && ua(n[1] - t[1]) < ka } function ye(n, t) { n *= Aa; var e = Math.cos(t *= Aa); xe(e * Math.cos(n), e * Math.sin(n), Math.sin(t)) } function xe(n, t, e) { ++hc, pc += (n - pc) / hc, vc += (t - vc) / hc, dc += (e - dc) / hc } function Me() { function n(n, u) { n *= Aa; var i = Math.cos(u *= Aa), o = i * Math.cos(n), a = i * Math.sin(n), c = Math.sin(u), s = Math.atan2(Math.sqrt((s = e * c - r * a) * s + (s = r * o - t * c) * s + (s = t * a - e * o) * s), t * o + e * a + r * c); gc += s, mc += s * (t + (t = o)), yc += s * (e + (e = a)), xc += s * (r + (r = c)), xe(t, e, r) } var t, e, r; wc.point = function (u, i) { u *= Aa; var o = Math.cos(i *= Aa); t = o * Math.cos(u), e = o * Math.sin(u), r = Math.sin(i), wc.point = n, xe(t, e, r) } } function _e() { wc.point = ye } function be() { function n(n, t) { n *= Aa; var e = Math.cos(t *= Aa), o = e * Math.cos(n), a = e * Math.sin(n), c = Math.sin(t), s = u * c - i * a, l = i * o - r * c, f = r * a - u * o, h = Math.sqrt(s * s + l * l + f * f), g = r * o + u * a + i * c, p = h && -J(g) / h, v = Math.atan2(h, g); Mc += p * s, _c += p * l, bc += p * f, gc += v, mc += v * (r + (r = o)), yc += v * (u + (u = a)), xc += v * (i + (i = c)), xe(r, u, i) } var t, e, r, u, i; wc.point = function (o, a) { t = o, e = a, wc.point = n, o *= Aa; var c = Math.cos(a *= Aa); r = c * Math.cos(o), u = c * Math.sin(o), i = Math.sin(a), xe(r, u, i) }, wc.lineEnd = function () { n(t, e), wc.lineEnd = _e, wc.point = ye } } function we() { return !0 } function Se(n, t, e, r, u) { var i = [], o = []; if (n.forEach(function (n) { if (!((t = n.length - 1) <= 0)) { var t, e = n[0], r = n[t]; if (me(e, r)) { u.lineStart(); for (var a = 0; t > a; ++a) u.point((e = n[a])[0], e[1]); return u.lineEnd(), void 0 } var c = new Ee(e, n, null, !0), s = new Ee(e, null, c, !1); c.o = s, i.push(c), o.push(s), c = new Ee(r, n, null, !1), s = new Ee(r, null, c, !0), c.o = s, i.push(c), o.push(s) } }), o.sort(t), ke(i), ke(o), i.length) { for (var a = 0, c = e, s = o.length; s > a; ++a) o[a].e = c = !c; for (var l, f, h = i[0]; ;) { for (var g = h, p = !0; g.v;) if ((g = g.n) === h) return; l = g.z, u.lineStart(); do { if (g.v = g.o.v = !0, g.e) { if (p) for (var a = 0, s = l.length; s > a; ++a) u.point((f = l[a])[0], f[1]); else r(g.x, g.n.x, 1, u); g = g.n } else { if (p) { l = g.p.z; for (var a = l.length - 1; a >= 0; --a) u.point((f = l[a])[0], f[1]) } else r(g.x, g.p.x, -1, u); g = g.p } g = g.o, l = g.z, p = !p } while (!g.v); u.lineEnd() } } } function ke(n) { if (t = n.length) { for (var t, e, r = 0, u = n[0]; ++r < t;) u.n = e = n[r], e.p = u, u = e; u.n = e = n[0], e.p = u } } function Ee(n, t, e, r) { this.x = n, this.z = t, this.o = e, this.e = r, this.v = !1, this.n = this.p = null } function Ae(n, t, e, r) { return function (u, i) { function o(t, e) { var r = u(t, e); n(t = r[0], e = r[1]) && i.point(t, e) } function a(n, t) { var e = u(n, t); d.point(e[0], e[1]) } function c() { y.point = a, d.lineStart() } function s() { y.point = o, d.lineEnd() } function l(n, t) { v.push([n, t]); var e = u(n, t); M.point(e[0], e[1]) } function f() { M.lineStart(), v = [] } function h() { l(v[0][0], v[0][1]), M.lineEnd(); var n, t = M.clean(), e = x.buffer(), r = e.length; if (v.pop(), p.push(v), v = null, r) if (1 & t) { n = e[0]; var u, r = n.length - 1, o = -1; if (r > 0) { for (_ || (i.polygonStart(), _ = !0), i.lineStart() ; ++o < r;) i.point((u = n[o])[0], u[1]); i.lineEnd() } } else r > 1 && 2 & t && e.push(e.pop().concat(e.shift())), g.push(e.filter(Ce)) } var g, p, v, d = t(i), m = u.invert(r[0], r[1]), y = { point: o, lineStart: c, lineEnd: s, polygonStart: function () { y.point = l, y.lineStart = f, y.lineEnd = h, g = [], p = [] }, polygonEnd: function () { y.point = o, y.lineStart = c, y.lineEnd = s, g = Zo.merge(g); var n = Le(m, p); g.length ? (_ || (i.polygonStart(), _ = !0), Se(g, ze, n, e, i)) : n && (_ || (i.polygonStart(), _ = !0), i.lineStart(), e(null, null, 1, i), i.lineEnd()), _ && (i.polygonEnd(), _ = !1), g = p = null }, sphere: function () { i.polygonStart(), i.lineStart(), e(null, null, 1, i), i.lineEnd(), i.polygonEnd() } }, x = Ne(), M = t(x), _ = !1; return y } } function Ce(n) { return n.length > 1 } function Ne() { var n, t = []; return { lineStart: function () { t.push(n = []) }, point: function (t, e) { n.push([t, e]) }, lineEnd: v, buffer: function () { var e = t; return t = [], n = null, e }, rejoin: function () { t.length > 1 && t.push(t.pop().concat(t.shift())) } } } function ze(n, t) { return ((n = n.x)[0] < 0 ? n[1] - Sa - ka : Sa - n[1]) - ((t = t.x)[0] < 0 ? t[1] - Sa - ka : Sa - t[1]) } function Le(n, t) { var e = n[0], r = n[1], u = [Math.sin(e), -Math.cos(e), 0], i = 0, o = 0; lc.reset(); for (var a = 0, c = t.length; c > a; ++a) { var s = t[a], l = s.length; if (l) for (var f = s[0], h = f[0], g = f[1] / 2 + ba / 4, p = Math.sin(g), v = Math.cos(g), d = 1; ;) { d === l && (d = 0), n = s[d]; var m = n[0], y = n[1] / 2 + ba / 4, x = Math.sin(y), M = Math.cos(y), _ = m - h, b = _ >= 0 ? 1 : -1, w = b * _, S = w > ba, k = p * x; if (lc.add(Math.atan2(k * b * Math.sin(w), v * M + k * Math.cos(w))), i += S ? _ + b * wa : _, S ^ h >= e ^ m >= e) { var E = he(le(f), le(n)); ve(E); var A = he(u, E); ve(A); var C = (S ^ _ >= 0 ? -1 : 1) * G(A[2]); (r > C || r === C && (E[0] || E[1])) && (o += S ^ _ >= 0 ? 1 : -1) } if (!d++) break; h = m, p = x, v = M, f = n } } return (-ka > i || ka > i && 0 > lc) ^ 1 & o } function Te(n) { var t, e = 0 / 0, r = 0 / 0, u = 0 / 0; return { lineStart: function () { n.lineStart(), t = 1 }, point: function (i, o) { var a = i > 0 ? ba : -ba, c = ua(i - e); ua(c - ba) < ka ? (n.point(e, r = (r + o) / 2 > 0 ? Sa : -Sa), n.point(u, r), n.lineEnd(), n.lineStart(), n.point(a, r), n.point(i, r), t = 0) : u !== a && c >= ba && (ua(e - u) < ka && (e -= u * ka), ua(i - a) < ka && (i -= a * ka), r = qe(e, r, i, o), n.point(u, r), n.lineEnd(), n.lineStart(), n.point(a, r), t = 0), n.point(e = i, r = o), u = a }, lineEnd: function () { n.lineEnd(), e = r = 0 / 0 }, clean: function () { return 2 - t } } } function qe(n, t, e, r) { var u, i, o = Math.sin(n - e); return ua(o) > ka ? Math.atan((Math.sin(t) * (i = Math.cos(r)) * Math.sin(e) - Math.sin(r) * (u = Math.cos(t)) * Math.sin(n)) / (u * i * o)) : (t + r) / 2 } function Re(n, t, e, r) { var u; if (null == n) u = e * Sa, r.point(-ba, u), r.point(0, u), r.point(ba, u), r.point(ba, 0), r.point(ba, -u), r.point(0, -u), r.point(-ba, -u), r.point(-ba, 0), r.point(-ba, u); else if (ua(n[0] - t[0]) > ka) { var i = n[0] < t[0] ? ba : -ba; u = e * i / 2, r.point(-i, u), r.point(0, u), r.point(i, u) } else r.point(t[0], t[1]) } function De(n) { function t(n, t) { return Math.cos(n) * Math.cos(t) > i } function e(n) { var e, i, c, s, l; return { lineStart: function () { s = c = !1, l = 1 }, point: function (f, h) { var g, p = [f, h], v = t(f, h), d = o ? v ? 0 : u(f, h) : v ? u(f + (0 > f ? ba : -ba), h) : 0; if (!e && (s = c = v) && n.lineStart(), v !== c && (g = r(e, p), (me(e, g) || me(p, g)) && (p[0] += ka, p[1] += ka, v = t(p[0], p[1]))), v !== c) l = 0, v ? (n.lineStart(), g = r(p, e), n.point(g[0], g[1])) : (g = r(e, p), n.point(g[0], g[1]), n.lineEnd()), e = g; else if (a && e && o ^ v) { var m; d & i || !(m = r(p, e, !0)) || (l = 0, o ? (n.lineStart(), n.point(m[0][0], m[0][1]), n.point(m[1][0], m[1][1]), n.lineEnd()) : (n.point(m[1][0], m[1][1]), n.lineEnd(), n.lineStart(), n.point(m[0][0], m[0][1]))) } !v || e && me(e, p) || n.point(p[0], p[1]), e = p, c = v, i = d }, lineEnd: function () { c && n.lineEnd(), e = null }, clean: function () { return l | (s && c) << 1 } } } function r(n, t, e) { var r = le(n), u = le(t), o = [1, 0, 0], a = he(r, u), c = fe(a, a), s = a[0], l = c - s * s; if (!l) return !e && n; var f = i * c / l, h = -i * s / l, g = he(o, a), p = pe(o, f), v = pe(a, h); ge(p, v); var d = g, m = fe(p, d), y = fe(d, d), x = m * m - y * (fe(p, p) - 1); if (!(0 > x)) { var M = Math.sqrt(x), _ = pe(d, (-m - M) / y); if (ge(_, p), _ = de(_), !e) return _; var b, w = n[0], S = t[0], k = n[1], E = t[1]; w > S && (b = w, w = S, S = b); var A = S - w, C = ua(A - ba) < ka, N = C || ka > A; if (!C && k > E && (b = k, k = E, E = b), N ? C ? k + E > 0 ^ _[1] < (ua(_[0] - w) < ka ? k : E) : k <= _[1] && _[1] <= E : A > ba ^ (w <= _[0] && _[0] <= S)) { var z = pe(d, (-m + M) / y); return ge(z, p), [_, de(z)] } } } function u(t, e) { var r = o ? n : ba - n, u = 0; return -r > t ? u |= 1 : t > r && (u |= 2), -r > e ? u |= 4 : e > r && (u |= 8), u } var i = Math.cos(n), o = i > 0, a = ua(i) > ka, c = sr(n, 6 * Aa); return Ae(t, e, c, o ? [0, -n] : [-ba, n - ba]) } function Pe(n, t, e, r) { return function (u) { var i, o = u.a, a = u.b, c = o.x, s = o.y, l = a.x, f = a.y, h = 0, g = 1, p = l - c, v = f - s; if (i = n - c, p || !(i > 0)) { if (i /= p, 0 > p) { if (h > i) return; g > i && (g = i) } else if (p > 0) { if (i > g) return; i > h && (h = i) } if (i = e - c, p || !(0 > i)) { if (i /= p, 0 > p) { if (i > g) return; i > h && (h = i) } else if (p > 0) { if (h > i) return; g > i && (g = i) } if (i = t - s, v || !(i > 0)) { if (i /= v, 0 > v) { if (h > i) return; g > i && (g = i) } else if (v > 0) { if (i > g) return; i > h && (h = i) } if (i = r - s, v || !(0 > i)) { if (i /= v, 0 > v) { if (i > g) return; i > h && (h = i) } else if (v > 0) { if (h > i) return; g > i && (g = i) } return h > 0 && (u.a = { x: c + h * p, y: s + h * v }), 1 > g && (u.b = { x: c + g * p, y: s + g * v }), u } } } } } } function Ue(n, t, e, r) { function u(r, u) { return ua(r[0] - n) < ka ? u > 0 ? 0 : 3 : ua(r[0] - e) < ka ? u > 0 ? 2 : 1 : ua(r[1] - t) < ka ? u > 0 ? 1 : 0 : u > 0 ? 3 : 2 } function i(n, t) { return o(n.x, t.x) } function o(n, t) { var e = u(n, 1), r = u(t, 1); return e !== r ? e - r : 0 === e ? t[1] - n[1] : 1 === e ? n[0] - t[0] : 2 === e ? n[1] - t[1] : t[0] - n[0] } return function (a) { function c(n) { for (var t = 0, e = d.length, r = n[1], u = 0; e > u; ++u) for (var i, o = 1, a = d[u], c = a.length, s = a[0]; c > o; ++o) i = a[o], s[1] <= r ? i[1] > r && W(s, i, n) > 0 && ++t : i[1] <= r && W(s, i, n) < 0 && --t, s = i; return 0 !== t } function s(i, a, c, s) { var l = 0, f = 0; if (null == i || (l = u(i, c)) !== (f = u(a, c)) || o(i, a) < 0 ^ c > 0) { do s.point(0 === l || 3 === l ? n : e, l > 1 ? r : t); while ((l = (l + c + 4) % 4) !== f) } else s.point(a[0], a[1]) } function l(u, i) { return u >= n && e >= u && i >= t && r >= i } function f(n, t) { l(n, t) && a.point(n, t) } function h() { N.point = p, d && d.push(m = []), S = !0, w = !1, _ = b = 0 / 0 } function g() { v && (p(y, x), M && w && A.rejoin(), v.push(A.buffer())), N.point = f, w && a.lineEnd() } function p(n, t) { n = Math.max(-kc, Math.min(kc, n)), t = Math.max(-kc, Math.min(kc, t)); var e = l(n, t); if (d && m.push([n, t]), S) y = n, x = t, M = e, S = !1, e && (a.lineStart(), a.point(n, t)); else if (e && w) a.point(n, t); else { var r = { a: { x: _, y: b }, b: { x: n, y: t } }; C(r) ? (w || (a.lineStart(), a.point(r.a.x, r.a.y)), a.point(r.b.x, r.b.y), e || a.lineEnd(), k = !1) : e && (a.lineStart(), a.point(n, t), k = !1) } _ = n, b = t, w = e } var v, d, m, y, x, M, _, b, w, S, k, E = a, A = Ne(), C = Pe(n, t, e, r), N = { point: f, lineStart: h, lineEnd: g, polygonStart: function () { a = A, v = [], d = [], k = !0 }, polygonEnd: function () { a = E, v = Zo.merge(v); var t = c([n, r]), e = k && t, u = v.length; (e || u) && (a.polygonStart(), e && (a.lineStart(), s(null, null, 1, a), a.lineEnd()), u && Se(v, i, t, s, a), a.polygonEnd()), v = d = m = null } }; return N } } function je(n, t) { function e(e, r) { return e = n(e, r), t(e[0], e[1]) } return n.invert && t.invert && (e.invert = function (e, r) { return e = t.invert(e, r), e && n.invert(e[0], e[1]) }), e } function He(n) { var t = 0, e = ba / 3, r = tr(n), u = r(t, e); return u.parallels = function (n) { return arguments.length ? r(t = n[0] * ba / 180, e = n[1] * ba / 180) : [180 * (t / ba), 180 * (e / ba)] }, u } function Fe(n, t) { function e(n, t) { var e = Math.sqrt(i - 2 * u * Math.sin(t)) / u; return [e * Math.sin(n *= u), o - e * Math.cos(n)] } var r = Math.sin(n), u = (r + Math.sin(t)) / 2, i = 1 + r * (2 * u - r), o = Math.sqrt(i) / u; return e.invert = function (n, t) { var e = o - t; return [Math.atan2(n, e) / u, G((i - (n * n + e * e) * u * u) / (2 * u))] }, e } function Oe() { function n(n, t) { Ac += u * n - r * t, r = n, u = t } var t, e, r, u; Tc.point = function (i, o) { Tc.point = n, t = r = i, e = u = o }, Tc.lineEnd = function () { n(t, e) } } function Ye(n, t) { Cc > n && (Cc = n), n > zc && (zc = n), Nc > t && (Nc = t), t > Lc && (Lc = t) } function Ie() { function n(n, t) { o.push("M", n, ",", t, i) } function t(n, t) { o.push("M", n, ",", t), a.point = e } function e(n, t) { o.push("L", n, ",", t) } function r() { a.point = n } function u() { o.push("Z") } var i = Ze(4.5), o = [], a = { point: n, lineStart: function () { a.point = t }, lineEnd: r, polygonStart: function () { a.lineEnd = u }, polygonEnd: function () { a.lineEnd = r, a.point = n }, pointRadius: function (n) { return i = Ze(n), a }, result: function () { if (o.length) { var n = o.join(""); return o = [], n } } }; return a } function Ze(n) { return "m0," + n + "a" + n + "," + n + " 0 1,1 0," + -2 * n + "a" + n + "," + n + " 0 1,1 0," + 2 * n + "z" } function Ve(n, t) { pc += n, vc += t, ++dc } function Xe() { function n(n, r) { var u = n - t, i = r - e, o = Math.sqrt(u * u + i * i); mc += o * (t + n) / 2, yc += o * (e + r) / 2, xc += o, Ve(t = n, e = r) } var t, e; Rc.point = function (r, u) { Rc.point = n, Ve(t = r, e = u) } } function $e() { Rc.point = Ve } function Be() { function n(n, t) { var e = n - r, i = t - u, o = Math.sqrt(e * e + i * i); mc += o * (r + n) / 2, yc += o * (u + t) / 2, xc += o, o = u * n - r * t, Mc += o * (r + n), _c += o * (u + t), bc += 3 * o, Ve(r = n, u = t) } var t, e, r, u; Rc.point = function (i, o) { Rc.point = n, Ve(t = r = i, e = u = o) }, Rc.lineEnd = function () { n(t, e) } } function We(n) { function t(t, e) { n.moveTo(t, e), n.arc(t, e, o, 0, wa) } function e(t, e) { n.moveTo(t, e), a.point = r } function r(t, e) { n.lineTo(t, e) } function u() { a.point = t } function i() { n.closePath() } var o = 4.5, a = { point: t, lineStart: function () { a.point = e }, lineEnd: u, polygonStart: function () { a.lineEnd = i }, polygonEnd: function () { a.lineEnd = u, a.point = t }, pointRadius: function (n) { return o = n, a }, result: v }; return a } function Je(n) {
        function t(n) { return (a ? r : e)(n) } function e(t) { return Qe(t, function (e, r) { e = n(e, r), t.point(e[0], e[1]) }) } function r(t) { function e(e, r) { e = n(e, r), t.point(e[0], e[1]) } function r() { x = 0 / 0, S.point = i, t.lineStart() } function i(e, r) { var i = le([e, r]), o = n(e, r); u(x, M, y, _, b, w, x = o[0], M = o[1], y = e, _ = i[0], b = i[1], w = i[2], a, t), t.point(x, M) } function o() { S.point = e, t.lineEnd() } function c() { r(), S.point = s, S.lineEnd = l } function s(n, t) { i(f = n, h = t), g = x, p = M, v = _, d = b, m = w, S.point = i } function l() { u(x, M, y, _, b, w, g, p, f, v, d, m, a, t), S.lineEnd = o, o() } var f, h, g, p, v, d, m, y, x, M, _, b, w, S = { point: e, lineStart: r, lineEnd: o, polygonStart: function () { t.polygonStart(), S.lineStart = c }, polygonEnd: function () { t.polygonEnd(), S.lineStart = r } }; return S } function u(t, e, r, a, c, s, l, f, h, g, p, v, d, m) { var y = l - t, x = f - e, M = y * y + x * x; if (M > 4 * i && d--) { var _ = a + g, b = c + p, w = s + v, S = Math.sqrt(_ * _ + b * b + w * w), k = Math.asin(w /= S), E = ua(ua(w) - 1) < ka || ua(r - h) < ka ? (r + h) / 2 : Math.atan2(b, _), A = n(E, k), C = A[0], N = A[1], z = C - t, L = N - e, T = x * z - y * L; (T * T / M > i || ua((y * z + x * L) / M - .5) > .3 || o > a * g + c * p + s * v) && (u(t, e, r, a, c, s, C, N, E, _ /= S, b /= S, w, d, m), m.point(C, N), u(C, N, E, _, b, w, l, f, h, g, p, v, d, m)) } } var i = .5, o = Math.cos(30 * Aa), a = 16;
        return t.precision = function (n) { return arguments.length ? (a = (i = n * n) > 0 && 16, t) : Math.sqrt(i) }, t
    } function Ge(n) { var t = Je(function (t, e) { return n([t * Ca, e * Ca]) }); return function (n) { return er(t(n)) } } function Ke(n) { this.stream = n } function Qe(n, t) { return { point: t, sphere: function () { n.sphere() }, lineStart: function () { n.lineStart() }, lineEnd: function () { n.lineEnd() }, polygonStart: function () { n.polygonStart() }, polygonEnd: function () { n.polygonEnd() } } } function nr(n) { return tr(function () { return n })() } function tr(n) { function t(n) { return n = a(n[0] * Aa, n[1] * Aa), [n[0] * h + c, s - n[1] * h] } function e(n) { return n = a.invert((n[0] - c) / h, (s - n[1]) / h), n && [n[0] * Ca, n[1] * Ca] } function r() { a = je(o = ir(m, y, x), i); var n = i(v, d); return c = g - n[0] * h, s = p + n[1] * h, u() } function u() { return l && (l.valid = !1, l = null), t } var i, o, a, c, s, l, f = Je(function (n, t) { return n = i(n, t), [n[0] * h + c, s - n[1] * h] }), h = 150, g = 480, p = 250, v = 0, d = 0, m = 0, y = 0, x = 0, M = Sc, _ = wt, b = null, w = null; return t.stream = function (n) { return l && (l.valid = !1), l = er(M(o, f(_(n)))), l.valid = !0, l }, t.clipAngle = function (n) { return arguments.length ? (M = null == n ? (b = n, Sc) : De((b = +n) * Aa), u()) : b }, t.clipExtent = function (n) { return arguments.length ? (w = n, _ = n ? Ue(n[0][0], n[0][1], n[1][0], n[1][1]) : wt, u()) : w }, t.scale = function (n) { return arguments.length ? (h = +n, r()) : h }, t.translate = function (n) { return arguments.length ? (g = +n[0], p = +n[1], r()) : [g, p] }, t.center = function (n) { return arguments.length ? (v = n[0] % 360 * Aa, d = n[1] % 360 * Aa, r()) : [v * Ca, d * Ca] }, t.rotate = function (n) { return arguments.length ? (m = n[0] % 360 * Aa, y = n[1] % 360 * Aa, x = n.length > 2 ? n[2] % 360 * Aa : 0, r()) : [m * Ca, y * Ca, x * Ca] }, Zo.rebind(t, f, "precision"), function () { return i = n.apply(this, arguments), t.invert = i.invert && e, r() } } function er(n) { return Qe(n, function (t, e) { n.point(t * Aa, e * Aa) }) } function rr(n, t) { return [n, t] } function ur(n, t) { return [n > ba ? n - wa : -ba > n ? n + wa : n, t] } function ir(n, t, e) { return n ? t || e ? je(ar(n), cr(t, e)) : ar(n) : t || e ? cr(t, e) : ur } function or(n) { return function (t, e) { return t += n, [t > ba ? t - wa : -ba > t ? t + wa : t, e] } } function ar(n) { var t = or(n); return t.invert = or(-n), t } function cr(n, t) { function e(n, t) { var e = Math.cos(t), a = Math.cos(n) * e, c = Math.sin(n) * e, s = Math.sin(t), l = s * r + a * u; return [Math.atan2(c * i - l * o, a * r - s * u), G(l * i + c * o)] } var r = Math.cos(n), u = Math.sin(n), i = Math.cos(t), o = Math.sin(t); return e.invert = function (n, t) { var e = Math.cos(t), a = Math.cos(n) * e, c = Math.sin(n) * e, s = Math.sin(t), l = s * i - c * o; return [Math.atan2(c * i + s * o, a * r + l * u), G(l * r - a * u)] }, e } function sr(n, t) { var e = Math.cos(n), r = Math.sin(n); return function (u, i, o, a) { var c = o * t; null != u ? (u = lr(e, u), i = lr(e, i), (o > 0 ? i > u : u > i) && (u += o * wa)) : (u = n + o * wa, i = n - .5 * c); for (var s, l = u; o > 0 ? l > i : i > l; l -= c) a.point((s = de([e, -r * Math.cos(l), -r * Math.sin(l)]))[0], s[1]) } } function lr(n, t) { var e = le(t); e[0] -= n, ve(e); var r = J(-e[1]); return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - ka) % (2 * Math.PI) } function fr(n, t, e) { var r = Zo.range(n, t - ka, e).concat(t); return function (n) { return r.map(function (t) { return [n, t] }) } } function hr(n, t, e) { var r = Zo.range(n, t - ka, e).concat(t); return function (n) { return r.map(function (t) { return [t, n] }) } } function gr(n) { return n.source } function pr(n) { return n.target } function vr(n, t, e, r) { var u = Math.cos(t), i = Math.sin(t), o = Math.cos(r), a = Math.sin(r), c = u * Math.cos(n), s = u * Math.sin(n), l = o * Math.cos(e), f = o * Math.sin(e), h = 2 * Math.asin(Math.sqrt(tt(r - t) + u * o * tt(e - n))), g = 1 / Math.sin(h), p = h ? function (n) { var t = Math.sin(n *= h) * g, e = Math.sin(h - n) * g, r = e * c + t * l, u = e * s + t * f, o = e * i + t * a; return [Math.atan2(u, r) * Ca, Math.atan2(o, Math.sqrt(r * r + u * u)) * Ca] } : function () { return [n * Ca, t * Ca] }; return p.distance = h, p } function dr() { function n(n, u) { var i = Math.sin(u *= Aa), o = Math.cos(u), a = ua((n *= Aa) - t), c = Math.cos(a); Dc += Math.atan2(Math.sqrt((a = o * Math.sin(a)) * a + (a = r * i - e * o * c) * a), e * i + r * o * c), t = n, e = i, r = o } var t, e, r; Pc.point = function (u, i) { t = u * Aa, e = Math.sin(i *= Aa), r = Math.cos(i), Pc.point = n }, Pc.lineEnd = function () { Pc.point = Pc.lineEnd = v } } function mr(n, t) { function e(t, e) { var r = Math.cos(t), u = Math.cos(e), i = n(r * u); return [i * u * Math.sin(t), i * Math.sin(e)] } return e.invert = function (n, e) { var r = Math.sqrt(n * n + e * e), u = t(r), i = Math.sin(u), o = Math.cos(u); return [Math.atan2(n * i, r * o), Math.asin(r && e * i / r)] }, e } function yr(n, t) { function e(n, t) { o > 0 ? -Sa + ka > t && (t = -Sa + ka) : t > Sa - ka && (t = Sa - ka); var e = o / Math.pow(u(t), i); return [e * Math.sin(i * n), o - e * Math.cos(i * n)] } var r = Math.cos(n), u = function (n) { return Math.tan(ba / 4 + n / 2) }, i = n === t ? Math.sin(n) : Math.log(r / Math.cos(t)) / Math.log(u(t) / u(n)), o = r * Math.pow(u(n), i) / i; return i ? (e.invert = function (n, t) { var e = o - t, r = B(i) * Math.sqrt(n * n + e * e); return [Math.atan2(n, e) / i, 2 * Math.atan(Math.pow(o / r, 1 / i)) - Sa] }, e) : Mr } function xr(n, t) { function e(n, t) { var e = i - t; return [e * Math.sin(u * n), i - e * Math.cos(u * n)] } var r = Math.cos(n), u = n === t ? Math.sin(n) : (r - Math.cos(t)) / (t - n), i = r / u + n; return ua(u) < ka ? rr : (e.invert = function (n, t) { var e = i - t; return [Math.atan2(n, e) / u, i - B(u) * Math.sqrt(n * n + e * e)] }, e) } function Mr(n, t) { return [n, Math.log(Math.tan(ba / 4 + t / 2))] } function _r(n) { var t, e = nr(n), r = e.scale, u = e.translate, i = e.clipExtent; return e.scale = function () { var n = r.apply(e, arguments); return n === e ? t ? e.clipExtent(null) : e : n }, e.translate = function () { var n = u.apply(e, arguments); return n === e ? t ? e.clipExtent(null) : e : n }, e.clipExtent = function (n) { var o = i.apply(e, arguments); if (o === e) { if (t = null == n) { var a = ba * r(), c = u(); i([[c[0] - a, c[1] - a], [c[0] + a, c[1] + a]]) } } else t && (o = null); return o }, e.clipExtent(null) } function br(n, t) { return [Math.log(Math.tan(ba / 4 + t / 2)), -n] } function wr(n) { return n[0] } function Sr(n) { return n[1] } function kr(n) { for (var t = n.length, e = [0, 1], r = 2, u = 2; t > u; u++) { for (; r > 1 && W(n[e[r - 2]], n[e[r - 1]], n[u]) <= 0;)--r; e[r++] = u } return e.slice(0, r) } function Er(n, t) { return n[0] - t[0] || n[1] - t[1] } function Ar(n, t, e) { return (e[0] - t[0]) * (n[1] - t[1]) < (e[1] - t[1]) * (n[0] - t[0]) } function Cr(n, t, e, r) { var u = n[0], i = e[0], o = t[0] - u, a = r[0] - i, c = n[1], s = e[1], l = t[1] - c, f = r[1] - s, h = (a * (c - s) - f * (u - i)) / (f * o - a * l); return [u + h * o, c + h * l] } function Nr(n) { var t = n[0], e = n[n.length - 1]; return !(t[0] - e[0] || t[1] - e[1]) } function zr() { Gr(this), this.edge = this.site = this.circle = null } function Lr(n) { var t = Bc.pop() || new zr; return t.site = n, t } function Tr(n) { Yr(n), Vc.remove(n), Bc.push(n), Gr(n) } function qr(n) { var t = n.circle, e = t.x, r = t.cy, u = { x: e, y: r }, i = n.P, o = n.N, a = [n]; Tr(n); for (var c = i; c.circle && ua(e - c.circle.x) < ka && ua(r - c.circle.cy) < ka;) i = c.P, a.unshift(c), Tr(c), c = i; a.unshift(c), Yr(c); for (var s = o; s.circle && ua(e - s.circle.x) < ka && ua(r - s.circle.cy) < ka;) o = s.N, a.push(s), Tr(s), s = o; a.push(s), Yr(s); var l, f = a.length; for (l = 1; f > l; ++l) s = a[l], c = a[l - 1], Br(s.edge, c.site, s.site, u); c = a[0], s = a[f - 1], s.edge = Xr(c.site, s.site, null, u), Or(c), Or(s) } function Rr(n) { for (var t, e, r, u, i = n.x, o = n.y, a = Vc._; a;) if (r = Dr(a, o) - i, r > ka) a = a.L; else { if (u = i - Pr(a, o), !(u > ka)) { r > -ka ? (t = a.P, e = a) : u > -ka ? (t = a, e = a.N) : t = e = a; break } if (!a.R) { t = a; break } a = a.R } var c = Lr(n); if (Vc.insert(t, c), t || e) { if (t === e) return Yr(t), e = Lr(t.site), Vc.insert(c, e), c.edge = e.edge = Xr(t.site, c.site), Or(t), Or(e), void 0; if (!e) return c.edge = Xr(t.site, c.site), void 0; Yr(t), Yr(e); var s = t.site, l = s.x, f = s.y, h = n.x - l, g = n.y - f, p = e.site, v = p.x - l, d = p.y - f, m = 2 * (h * d - g * v), y = h * h + g * g, x = v * v + d * d, M = { x: (d * y - g * x) / m + l, y: (h * x - v * y) / m + f }; Br(e.edge, s, p, M), c.edge = Xr(s, n, null, M), e.edge = Xr(n, p, null, M), Or(t), Or(e) } } function Dr(n, t) { var e = n.site, r = e.x, u = e.y, i = u - t; if (!i) return r; var o = n.P; if (!o) return -1 / 0; e = o.site; var a = e.x, c = e.y, s = c - t; if (!s) return a; var l = a - r, f = 1 / i - 1 / s, h = l / s; return f ? (-h + Math.sqrt(h * h - 2 * f * (l * l / (-2 * s) - c + s / 2 + u - i / 2))) / f + r : (r + a) / 2 } function Pr(n, t) { var e = n.N; if (e) return Dr(e, t); var r = n.site; return r.y === t ? r.x : 1 / 0 } function Ur(n) { this.site = n, this.edges = [] } function jr(n) { for (var t, e, r, u, i, o, a, c, s, l, f = n[0][0], h = n[1][0], g = n[0][1], p = n[1][1], v = Zc, d = v.length; d--;) if (i = v[d], i && i.prepare()) for (a = i.edges, c = a.length, o = 0; c > o;) l = a[o].end(), r = l.x, u = l.y, s = a[++o % c].start(), t = s.x, e = s.y, (ua(r - t) > ka || ua(u - e) > ka) && (a.splice(o, 0, new Wr($r(i.site, l, ua(r - f) < ka && p - u > ka ? { x: f, y: ua(t - f) < ka ? e : p } : ua(u - p) < ka && h - r > ka ? { x: ua(e - p) < ka ? t : h, y: p } : ua(r - h) < ka && u - g > ka ? { x: h, y: ua(t - h) < ka ? e : g } : ua(u - g) < ka && r - f > ka ? { x: ua(e - g) < ka ? t : f, y: g } : null), i.site, null)), ++c) } function Hr(n, t) { return t.angle - n.angle } function Fr() { Gr(this), this.x = this.y = this.arc = this.site = this.cy = null } function Or(n) { var t = n.P, e = n.N; if (t && e) { var r = t.site, u = n.site, i = e.site; if (r !== i) { var o = u.x, a = u.y, c = r.x - o, s = r.y - a, l = i.x - o, f = i.y - a, h = 2 * (c * f - s * l); if (!(h >= -Ea)) { var g = c * c + s * s, p = l * l + f * f, v = (f * g - s * p) / h, d = (c * p - l * g) / h, f = d + a, m = Wc.pop() || new Fr; m.arc = n, m.site = u, m.x = v + o, m.y = f + Math.sqrt(v * v + d * d), m.cy = f, n.circle = m; for (var y = null, x = $c._; x;) if (m.y < x.y || m.y === x.y && m.x <= x.x) { if (!x.L) { y = x.P; break } x = x.L } else { if (!x.R) { y = x; break } x = x.R } $c.insert(y, m), y || (Xc = m) } } } } function Yr(n) { var t = n.circle; t && (t.P || (Xc = t.N), $c.remove(t), Wc.push(t), Gr(t), n.circle = null) } function Ir(n) { for (var t, e = Ic, r = Pe(n[0][0], n[0][1], n[1][0], n[1][1]), u = e.length; u--;) t = e[u], (!Zr(t, n) || !r(t) || ua(t.a.x - t.b.x) < ka && ua(t.a.y - t.b.y) < ka) && (t.a = t.b = null, e.splice(u, 1)) } function Zr(n, t) { var e = n.b; if (e) return !0; var r, u, i = n.a, o = t[0][0], a = t[1][0], c = t[0][1], s = t[1][1], l = n.l, f = n.r, h = l.x, g = l.y, p = f.x, v = f.y, d = (h + p) / 2, m = (g + v) / 2; if (v === g) { if (o > d || d >= a) return; if (h > p) { if (i) { if (i.y >= s) return } else i = { x: d, y: c }; e = { x: d, y: s } } else { if (i) { if (i.y < c) return } else i = { x: d, y: s }; e = { x: d, y: c } } } else if (r = (h - p) / (v - g), u = m - r * d, -1 > r || r > 1) if (h > p) { if (i) { if (i.y >= s) return } else i = { x: (c - u) / r, y: c }; e = { x: (s - u) / r, y: s } } else { if (i) { if (i.y < c) return } else i = { x: (s - u) / r, y: s }; e = { x: (c - u) / r, y: c } } else if (v > g) { if (i) { if (i.x >= a) return } else i = { x: o, y: r * o + u }; e = { x: a, y: r * a + u } } else { if (i) { if (i.x < o) return } else i = { x: a, y: r * a + u }; e = { x: o, y: r * o + u } } return n.a = i, n.b = e, !0 } function Vr(n, t) { this.l = n, this.r = t, this.a = this.b = null } function Xr(n, t, e, r) { var u = new Vr(n, t); return Ic.push(u), e && Br(u, n, t, e), r && Br(u, t, n, r), Zc[n.i].edges.push(new Wr(u, n, t)), Zc[t.i].edges.push(new Wr(u, t, n)), u } function $r(n, t, e) { var r = new Vr(n, null); return r.a = t, r.b = e, Ic.push(r), r } function Br(n, t, e, r) { n.a || n.b ? n.l === e ? n.b = r : n.a = r : (n.a = r, n.l = t, n.r = e) } function Wr(n, t, e) { var r = n.a, u = n.b; this.edge = n, this.site = t, this.angle = e ? Math.atan2(e.y - t.y, e.x - t.x) : n.l === t ? Math.atan2(u.x - r.x, r.y - u.y) : Math.atan2(r.x - u.x, u.y - r.y) } function Jr() { this._ = null } function Gr(n) { n.U = n.C = n.L = n.R = n.P = n.N = null } function Kr(n, t) { var e = t, r = t.R, u = e.U; u ? u.L === e ? u.L = r : u.R = r : n._ = r, r.U = u, e.U = r, e.R = r.L, e.R && (e.R.U = e), r.L = e } function Qr(n, t) { var e = t, r = t.L, u = e.U; u ? u.L === e ? u.L = r : u.R = r : n._ = r, r.U = u, e.U = r, e.L = r.R, e.L && (e.L.U = e), r.R = e } function nu(n) { for (; n.L;) n = n.L; return n } function tu(n, t) { var e, r, u, i = n.sort(eu).pop(); for (Ic = [], Zc = new Array(n.length), Vc = new Jr, $c = new Jr; ;) if (u = Xc, i && (!u || i.y < u.y || i.y === u.y && i.x < u.x)) (i.x !== e || i.y !== r) && (Zc[i.i] = new Ur(i), Rr(i), e = i.x, r = i.y), i = n.pop(); else { if (!u) break; qr(u.arc) } t && (Ir(t), jr(t)); var o = { cells: Zc, edges: Ic }; return Vc = $c = Ic = Zc = null, o } function eu(n, t) { return t.y - n.y || t.x - n.x } function ru(n, t, e) { return (n.x - e.x) * (t.y - n.y) - (n.x - t.x) * (e.y - n.y) } function uu(n) { return n.x } function iu(n) { return n.y } function ou() { return { leaf: !0, nodes: [], point: null, x: null, y: null } } function au(n, t, e, r, u, i) { if (!n(t, e, r, u, i)) { var o = .5 * (e + u), a = .5 * (r + i), c = t.nodes; c[0] && au(n, c[0], e, r, o, a), c[1] && au(n, c[1], o, r, u, a), c[2] && au(n, c[2], e, a, o, i), c[3] && au(n, c[3], o, a, u, i) } } function cu(n, t) { n = Zo.rgb(n), t = Zo.rgb(t); var e = n.r, r = n.g, u = n.b, i = t.r - e, o = t.g - r, a = t.b - u; return function (n) { return "#" + dt(Math.round(e + i * n)) + dt(Math.round(r + o * n)) + dt(Math.round(u + a * n)) } } function su(n, t) { var e, r = {}, u = {}; for (e in n) e in t ? r[e] = hu(n[e], t[e]) : u[e] = n[e]; for (e in t) e in n || (u[e] = t[e]); return function (n) { for (e in r) u[e] = r[e](n); return u } } function lu(n, t) { return t -= n = +n, function (e) { return n + t * e } } function fu(n, t) { var e, r, u, i = Gc.lastIndex = Kc.lastIndex = 0, o = -1, a = [], c = []; for (n += "", t += ""; (e = Gc.exec(n)) && (r = Kc.exec(t)) ;) (u = r.index) > i && (u = t.substring(i, u), a[o] ? a[o] += u : a[++o] = u), (e = e[0]) === (r = r[0]) ? a[o] ? a[o] += r : a[++o] = r : (a[++o] = null, c.push({ i: o, x: lu(e, r) })), i = Kc.lastIndex; return i < t.length && (u = t.substring(i), a[o] ? a[o] += u : a[++o] = u), a.length < 2 ? c[0] ? (t = c[0].x, function (n) { return t(n) + "" }) : function () { return t } : (t = c.length, function (n) { for (var e, r = 0; t > r; ++r) a[(e = c[r]).i] = e.x(n); return a.join("") }) } function hu(n, t) { for (var e, r = Zo.interpolators.length; --r >= 0 && !(e = Zo.interpolators[r](n, t)) ;); return e } function gu(n, t) { var e, r = [], u = [], i = n.length, o = t.length, a = Math.min(n.length, t.length); for (e = 0; a > e; ++e) r.push(hu(n[e], t[e])); for (; i > e; ++e) u[e] = n[e]; for (; o > e; ++e) u[e] = t[e]; return function (n) { for (e = 0; a > e; ++e) u[e] = r[e](n); return u } } function pu(n) { return function (t) { return 0 >= t ? 0 : t >= 1 ? 1 : n(t) } } function vu(n) { return function (t) { return 1 - n(1 - t) } } function du(n) { return function (t) { return .5 * (.5 > t ? n(2 * t) : 2 - n(2 - 2 * t)) } } function mu(n) { return n * n } function yu(n) { return n * n * n } function xu(n) { if (0 >= n) return 0; if (n >= 1) return 1; var t = n * n, e = t * n; return 4 * (.5 > n ? e : 3 * (n - t) + e - .75) } function Mu(n) { return function (t) { return Math.pow(t, n) } } function _u(n) { return 1 - Math.cos(n * Sa) } function bu(n) { return Math.pow(2, 10 * (n - 1)) } function wu(n) { return 1 - Math.sqrt(1 - n * n) } function Su(n, t) { var e; return arguments.length < 2 && (t = .45), arguments.length ? e = t / wa * Math.asin(1 / n) : (n = 1, e = t / 4), function (r) { return 1 + n * Math.pow(2, -10 * r) * Math.sin((r - e) * wa / t) } } function ku(n) { return n || (n = 1.70158), function (t) { return t * t * ((n + 1) * t - n) } } function Eu(n) { return 1 / 2.75 > n ? 7.5625 * n * n : 2 / 2.75 > n ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : 2.5 / 2.75 > n ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375 } function Au(n, t) { n = Zo.hcl(n), t = Zo.hcl(t); var e = n.h, r = n.c, u = n.l, i = t.h - e, o = t.c - r, a = t.l - u; return isNaN(o) && (o = 0, r = isNaN(r) ? t.c : r), isNaN(i) ? (i = 0, e = isNaN(e) ? t.h : e) : i > 180 ? i -= 360 : -180 > i && (i += 360), function (n) { return ot(e + i * n, r + o * n, u + a * n) + "" } } function Cu(n, t) { n = Zo.hsl(n), t = Zo.hsl(t); var e = n.h, r = n.s, u = n.l, i = t.h - e, o = t.s - r, a = t.l - u; return isNaN(o) && (o = 0, r = isNaN(r) ? t.s : r), isNaN(i) ? (i = 0, e = isNaN(e) ? t.h : e) : i > 180 ? i -= 360 : -180 > i && (i += 360), function (n) { return ut(e + i * n, r + o * n, u + a * n) + "" } } function Nu(n, t) { n = Zo.lab(n), t = Zo.lab(t); var e = n.l, r = n.a, u = n.b, i = t.l - e, o = t.a - r, a = t.b - u; return function (n) { return ct(e + i * n, r + o * n, u + a * n) + "" } } function zu(n, t) { return t -= n, function (e) { return Math.round(n + t * e) } } function Lu(n) { var t = [n.a, n.b], e = [n.c, n.d], r = qu(t), u = Tu(t, e), i = qu(Ru(e, t, -u)) || 0; t[0] * e[1] < e[0] * t[1] && (t[0] *= -1, t[1] *= -1, r *= -1, u *= -1), this.rotate = (r ? Math.atan2(t[1], t[0]) : Math.atan2(-e[0], e[1])) * Ca, this.translate = [n.e, n.f], this.scale = [r, i], this.skew = i ? Math.atan2(u, i) * Ca : 0 } function Tu(n, t) { return n[0] * t[0] + n[1] * t[1] } function qu(n) { var t = Math.sqrt(Tu(n, n)); return t && (n[0] /= t, n[1] /= t), t } function Ru(n, t, e) { return n[0] += e * t[0], n[1] += e * t[1], n } function Du(n, t) { var e, r = [], u = [], i = Zo.transform(n), o = Zo.transform(t), a = i.translate, c = o.translate, s = i.rotate, l = o.rotate, f = i.skew, h = o.skew, g = i.scale, p = o.scale; return a[0] != c[0] || a[1] != c[1] ? (r.push("translate(", null, ",", null, ")"), u.push({ i: 1, x: lu(a[0], c[0]) }, { i: 3, x: lu(a[1], c[1]) })) : c[0] || c[1] ? r.push("translate(" + c + ")") : r.push(""), s != l ? (s - l > 180 ? l += 360 : l - s > 180 && (s += 360), u.push({ i: r.push(r.pop() + "rotate(", null, ")") - 2, x: lu(s, l) })) : l && r.push(r.pop() + "rotate(" + l + ")"), f != h ? u.push({ i: r.push(r.pop() + "skewX(", null, ")") - 2, x: lu(f, h) }) : h && r.push(r.pop() + "skewX(" + h + ")"), g[0] != p[0] || g[1] != p[1] ? (e = r.push(r.pop() + "scale(", null, ",", null, ")"), u.push({ i: e - 4, x: lu(g[0], p[0]) }, { i: e - 2, x: lu(g[1], p[1]) })) : (1 != p[0] || 1 != p[1]) && r.push(r.pop() + "scale(" + p + ")"), e = u.length, function (n) { for (var t, i = -1; ++i < e;) r[(t = u[i]).i] = t.x(n); return r.join("") } } function Pu(n, t) { return t = t - (n = +n) ? 1 / (t - n) : 0, function (e) { return (e - n) * t } } function Uu(n, t) { return t = t - (n = +n) ? 1 / (t - n) : 0, function (e) { return Math.max(0, Math.min(1, (e - n) * t)) } } function ju(n) { for (var t = n.source, e = n.target, r = Fu(t, e), u = [t]; t !== r;) t = t.parent, u.push(t); for (var i = u.length; e !== r;) u.splice(i, 0, e), e = e.parent; return u } function Hu(n) { for (var t = [], e = n.parent; null != e;) t.push(n), n = e, e = e.parent; return t.push(n), t } function Fu(n, t) { if (n === t) return n; for (var e = Hu(n), r = Hu(t), u = e.pop(), i = r.pop(), o = null; u === i;) o = u, u = e.pop(), i = r.pop(); return o } function Ou(n) { n.fixed |= 2 } function Yu(n) { n.fixed &= -7 } function Iu(n) { n.fixed |= 4, n.px = n.x, n.py = n.y } function Zu(n) { n.fixed &= -5 } function Vu(n, t, e) { var r = 0, u = 0; if (n.charge = 0, !n.leaf) for (var i, o = n.nodes, a = o.length, c = -1; ++c < a;) i = o[c], null != i && (Vu(i, t, e), n.charge += i.charge, r += i.charge * i.cx, u += i.charge * i.cy); if (n.point) { n.leaf || (n.point.x += Math.random() - .5, n.point.y += Math.random() - .5); var s = t * e[n.point.index]; n.charge += n.pointCharge = s, r += s * n.point.x, u += s * n.point.y } n.cx = r / n.charge, n.cy = u / n.charge } function Xu(n, t) { return Zo.rebind(n, t, "sort", "children", "value"), n.nodes = n, n.links = Ku, n } function $u(n, t) { for (var e = [n]; null != (n = e.pop()) ;) if (t(n), (u = n.children) && (r = u.length)) for (var r, u; --r >= 0;) e.push(u[r]) } function Bu(n, t) { for (var e = [n], r = []; null != (n = e.pop()) ;) if (r.push(n), (i = n.children) && (u = i.length)) for (var u, i, o = -1; ++o < u;) e.push(i[o]); for (; null != (n = r.pop()) ;) t(n) } function Wu(n) { return n.children } function Ju(n) { return n.value } function Gu(n, t) { return t.value - n.value } function Ku(n) { return Zo.merge(n.map(function (n) { return (n.children || []).map(function (t) { return { source: n, target: t } }) })) } function Qu(n) { return n.x } function ni(n) { return n.y } function ti(n, t, e) { n.y0 = t, n.y = e } function ei(n) { return Zo.range(n.length) } function ri(n) { for (var t = -1, e = n[0].length, r = []; ++t < e;) r[t] = 0; return r } function ui(n) { for (var t, e = 1, r = 0, u = n[0][1], i = n.length; i > e; ++e) (t = n[e][1]) > u && (r = e, u = t); return r } function ii(n) { return n.reduce(oi, 0) } function oi(n, t) { return n + t[1] } function ai(n, t) { return ci(n, Math.ceil(Math.log(t.length) / Math.LN2 + 1)) } function ci(n, t) { for (var e = -1, r = +n[0], u = (n[1] - r) / t, i = []; ++e <= t;) i[e] = u * e + r; return i } function si(n) { return [Zo.min(n), Zo.max(n)] } function li(n, t) { return n.value - t.value } function fi(n, t) { var e = n._pack_next; n._pack_next = t, t._pack_prev = n, t._pack_next = e, e._pack_prev = t } function hi(n, t) { n._pack_next = t, t._pack_prev = n } function gi(n, t) { var e = t.x - n.x, r = t.y - n.y, u = n.r + t.r; return .999 * u * u > e * e + r * r } function pi(n) { function t(n) { l = Math.min(n.x - n.r, l), f = Math.max(n.x + n.r, f), h = Math.min(n.y - n.r, h), g = Math.max(n.y + n.r, g) } if ((e = n.children) && (s = e.length)) { var e, r, u, i, o, a, c, s, l = 1 / 0, f = -1 / 0, h = 1 / 0, g = -1 / 0; if (e.forEach(vi), r = e[0], r.x = -r.r, r.y = 0, t(r), s > 1 && (u = e[1], u.x = u.r, u.y = 0, t(u), s > 2)) for (i = e[2], yi(r, u, i), t(i), fi(r, i), r._pack_prev = i, fi(i, u), u = r._pack_next, o = 3; s > o; o++) { yi(r, u, i = e[o]); var p = 0, v = 1, d = 1; for (a = u._pack_next; a !== u; a = a._pack_next, v++) if (gi(a, i)) { p = 1; break } if (1 == p) for (c = r._pack_prev; c !== a._pack_prev && !gi(c, i) ; c = c._pack_prev, d++); p ? (d > v || v == d && u.r < r.r ? hi(r, u = a) : hi(r = c, u), o--) : (fi(r, i), u = i, t(i)) } var m = (l + f) / 2, y = (h + g) / 2, x = 0; for (o = 0; s > o; o++) i = e[o], i.x -= m, i.y -= y, x = Math.max(x, i.r + Math.sqrt(i.x * i.x + i.y * i.y)); n.r = x, e.forEach(di) } } function vi(n) { n._pack_next = n._pack_prev = n } function di(n) { delete n._pack_next, delete n._pack_prev } function mi(n, t, e, r) { var u = n.children; if (n.x = t += r * n.x, n.y = e += r * n.y, n.r *= r, u) for (var i = -1, o = u.length; ++i < o;) mi(u[i], t, e, r) } function yi(n, t, e) { var r = n.r + e.r, u = t.x - n.x, i = t.y - n.y; if (r && (u || i)) { var o = t.r + e.r, a = u * u + i * i; o *= o, r *= r; var c = .5 + (r - o) / (2 * a), s = Math.sqrt(Math.max(0, 2 * o * (r + a) - (r -= a) * r - o * o)) / (2 * a); e.x = n.x + c * u + s * i, e.y = n.y + c * i - s * u } else e.x = n.x + r, e.y = n.y } function xi(n, t) { return n.parent == t.parent ? 1 : 2 } function Mi(n) { var t = n.children; return t.length ? t[0] : n.t } function _i(n) { var t, e = n.children; return (t = e.length) ? e[t - 1] : n.t } function bi(n, t, e) { var r = e / (t.i - n.i); t.c -= r, t.s += e, n.c += r, t.z += e, t.m += e } function wi(n) { for (var t, e = 0, r = 0, u = n.children, i = u.length; --i >= 0;) t = u[i], t.z += e, t.m += e, e += t.s + (r += t.c) } function Si(n, t, e) { return n.a.parent === t.parent ? n.a : e } function ki(n) { return 1 + Zo.max(n, function (n) { return n.y }) } function Ei(n) { return n.reduce(function (n, t) { return n + t.x }, 0) / n.length } function Ai(n) { var t = n.children; return t && t.length ? Ai(t[0]) : n } function Ci(n) { var t, e = n.children; return e && (t = e.length) ? Ci(e[t - 1]) : n } function Ni(n) { return { x: n.x, y: n.y, dx: n.dx, dy: n.dy } } function zi(n, t) { var e = n.x + t[3], r = n.y + t[0], u = n.dx - t[1] - t[3], i = n.dy - t[0] - t[2]; return 0 > u && (e += u / 2, u = 0), 0 > i && (r += i / 2, i = 0), { x: e, y: r, dx: u, dy: i } } function Li(n) { var t = n[0], e = n[n.length - 1]; return e > t ? [t, e] : [e, t] } function Ti(n) { return n.rangeExtent ? n.rangeExtent() : Li(n.range()) } function qi(n, t, e, r) { var u = e(n[0], n[1]), i = r(t[0], t[1]); return function (n) { return i(u(n)) } } function Ri(n, t) { var e, r = 0, u = n.length - 1, i = n[r], o = n[u]; return i > o && (e = r, r = u, u = e, e = i, i = o, o = e), n[r] = t.floor(i), n[u] = t.ceil(o), n } function Di(n) { return n ? { floor: function (t) { return Math.floor(t / n) * n }, ceil: function (t) { return Math.ceil(t / n) * n } } : ss } function Pi(n, t, e, r) { var u = [], i = [], o = 0, a = Math.min(n.length, t.length) - 1; for (n[a] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()) ; ++o <= a;) u.push(e(n[o - 1], n[o])), i.push(r(t[o - 1], t[o])); return function (t) { var e = Zo.bisect(n, t, 1, a) - 1; return i[e](u[e](t)) } } function Ui(n, t, e, r) { function u() { var u = Math.min(n.length, t.length) > 2 ? Pi : qi, c = r ? Uu : Pu; return o = u(n, t, c, e), a = u(t, n, c, hu), i } function i(n) { return o(n) } var o, a; return i.invert = function (n) { return a(n) }, i.domain = function (t) { return arguments.length ? (n = t.map(Number), u()) : n }, i.range = function (n) { return arguments.length ? (t = n, u()) : t }, i.rangeRound = function (n) { return i.range(n).interpolate(zu) }, i.clamp = function (n) { return arguments.length ? (r = n, u()) : r }, i.interpolate = function (n) { return arguments.length ? (e = n, u()) : e }, i.ticks = function (t) { return Oi(n, t) }, i.tickFormat = function (t, e) { return Yi(n, t, e) }, i.nice = function (t) { return Hi(n, t), u() }, i.copy = function () { return Ui(n, t, e, r) }, u() } function ji(n, t) { return Zo.rebind(n, t, "range", "rangeRound", "interpolate", "clamp") } function Hi(n, t) { return Ri(n, Di(Fi(n, t)[2])) } function Fi(n, t) { null == t && (t = 10); var e = Li(n), r = e[1] - e[0], u = Math.pow(10, Math.floor(Math.log(r / t) / Math.LN10)), i = t / r * u; return .15 >= i ? u *= 10 : .35 >= i ? u *= 5 : .75 >= i && (u *= 2), e[0] = Math.ceil(e[0] / u) * u, e[1] = Math.floor(e[1] / u) * u + .5 * u, e[2] = u, e } function Oi(n, t) { return Zo.range.apply(Zo, Fi(n, t)) } function Yi(n, t, e) { var r = Fi(n, t); if (e) { var u = Ga.exec(e); if (u.shift(), "s" === u[8]) { var i = Zo.formatPrefix(Math.max(ua(r[0]), ua(r[1]))); return u[7] || (u[7] = "." + Ii(i.scale(r[2]))), u[8] = "f", e = Zo.format(u.join("")), function (n) { return e(i.scale(n)) + i.symbol } } u[7] || (u[7] = "." + Zi(u[8], r)), e = u.join("") } else e = ",." + Ii(r[2]) + "f"; return Zo.format(e) } function Ii(n) { return -Math.floor(Math.log(n) / Math.LN10 + .01) } function Zi(n, t) { var e = Ii(t[2]); return n in ls ? Math.abs(e - Ii(Math.max(ua(t[0]), ua(t[1])))) + +("e" !== n) : e - 2 * ("%" === n) } function Vi(n, t, e, r) { function u(n) { return (e ? Math.log(0 > n ? 0 : n) : -Math.log(n > 0 ? 0 : -n)) / Math.log(t) } function i(n) { return e ? Math.pow(t, n) : -Math.pow(t, -n) } function o(t) { return n(u(t)) } return o.invert = function (t) { return i(n.invert(t)) }, o.domain = function (t) { return arguments.length ? (e = t[0] >= 0, n.domain((r = t.map(Number)).map(u)), o) : r }, o.base = function (e) { return arguments.length ? (t = +e, n.domain(r.map(u)), o) : t }, o.nice = function () { var t = Ri(r.map(u), e ? Math : hs); return n.domain(t), r = t.map(i), o }, o.ticks = function () { var n = Li(r), o = [], a = n[0], c = n[1], s = Math.floor(u(a)), l = Math.ceil(u(c)), f = t % 1 ? 2 : t; if (isFinite(l - s)) { if (e) { for (; l > s; s++) for (var h = 1; f > h; h++) o.push(i(s) * h); o.push(i(s)) } else for (o.push(i(s)) ; s++ < l;) for (var h = f - 1; h > 0; h--) o.push(i(s) * h); for (s = 0; o[s] < a; s++); for (l = o.length; o[l - 1] > c; l--); o = o.slice(s, l) } return o }, o.tickFormat = function (n, t) { if (!arguments.length) return fs; arguments.length < 2 ? t = fs : "function" != typeof t && (t = Zo.format(t)); var r, a = Math.max(.1, n / o.ticks().length), c = e ? (r = 1e-12, Math.ceil) : (r = -1e-12, Math.floor); return function (n) { return n / i(c(u(n) + r)) <= a ? t(n) : "" } }, o.copy = function () { return Vi(n.copy(), t, e, r) }, ji(o, n) } function Xi(n, t, e) { function r(t) { return n(u(t)) } var u = $i(t), i = $i(1 / t); return r.invert = function (t) { return i(n.invert(t)) }, r.domain = function (t) { return arguments.length ? (n.domain((e = t.map(Number)).map(u)), r) : e }, r.ticks = function (n) { return Oi(e, n) }, r.tickFormat = function (n, t) { return Yi(e, n, t) }, r.nice = function (n) { return r.domain(Hi(e, n)) }, r.exponent = function (o) { return arguments.length ? (u = $i(t = o), i = $i(1 / t), n.domain(e.map(u)), r) : t }, r.copy = function () { return Xi(n.copy(), t, e) }, ji(r, n) } function $i(n) { return function (t) { return 0 > t ? -Math.pow(-t, n) : Math.pow(t, n) } } function Bi(n, t) { function e(e) { return i[((u.get(e) || ("range" === t.t ? u.set(e, n.push(e)) : 0 / 0)) - 1) % i.length] } function r(t, e) { return Zo.range(n.length).map(function (n) { return t + e * n }) } var u, i, a; return e.domain = function (r) { if (!arguments.length) return n; n = [], u = new o; for (var i, a = -1, c = r.length; ++a < c;) u.has(i = r[a]) || u.set(i, n.push(i)); return e[t.t].apply(e, t.a) }, e.range = function (n) { return arguments.length ? (i = n, a = 0, t = { t: "range", a: arguments }, e) : i }, e.rangePoints = function (u, o) { arguments.length < 2 && (o = 0); var c = u[0], s = u[1], l = (s - c) / (Math.max(1, n.length - 1) + o); return i = r(n.length < 2 ? (c + s) / 2 : c + l * o / 2, l), a = 0, t = { t: "rangePoints", a: arguments }, e }, e.rangeBands = function (u, o, c) { arguments.length < 2 && (o = 0), arguments.length < 3 && (c = o); var s = u[1] < u[0], l = u[s - 0], f = u[1 - s], h = (f - l) / (n.length - o + 2 * c); return i = r(l + h * c, h), s && i.reverse(), a = h * (1 - o), t = { t: "rangeBands", a: arguments }, e }, e.rangeRoundBands = function (u, o, c) { arguments.length < 2 && (o = 0), arguments.length < 3 && (c = o); var s = u[1] < u[0], l = u[s - 0], f = u[1 - s], h = Math.floor((f - l) / (n.length - o + 2 * c)), g = f - l - (n.length - o) * h; return i = r(l + Math.round(g / 2), h), s && i.reverse(), a = Math.round(h * (1 - o)), t = { t: "rangeRoundBands", a: arguments }, e }, e.rangeBand = function () { return a }, e.rangeExtent = function () { return Li(t.a[0]) }, e.copy = function () { return Bi(n, t) }, e.domain(n) } function Wi(e, r) { function u() { var n = 0, t = r.length; for (o = []; ++n < t;) o[n - 1] = Zo.quantile(e, n / t); return i } function i(n) { return isNaN(n = +n) ? void 0 : r[Zo.bisect(o, n)] } var o; return i.domain = function (r) { return arguments.length ? (e = r.filter(t).sort(n), u()) : e }, i.range = function (n) { return arguments.length ? (r = n, u()) : r }, i.quantiles = function () { return o }, i.invertExtent = function (n) { return n = r.indexOf(n), 0 > n ? [0 / 0, 0 / 0] : [n > 0 ? o[n - 1] : e[0], n < o.length ? o[n] : e[e.length - 1]] }, i.copy = function () { return Wi(e, r) }, u() } function Ji(n, t, e) { function r(t) { return e[Math.max(0, Math.min(o, Math.floor(i * (t - n))))] } function u() { return i = e.length / (t - n), o = e.length - 1, r } var i, o; return r.domain = function (e) { return arguments.length ? (n = +e[0], t = +e[e.length - 1], u()) : [n, t] }, r.range = function (n) { return arguments.length ? (e = n, u()) : e }, r.invertExtent = function (t) { return t = e.indexOf(t), t = 0 > t ? 0 / 0 : t / i + n, [t, t + 1 / i] }, r.copy = function () { return Ji(n, t, e) }, u() } function Gi(n, t) { function e(e) { return e >= e ? t[Zo.bisect(n, e)] : void 0 } return e.domain = function (t) { return arguments.length ? (n = t, e) : n }, e.range = function (n) { return arguments.length ? (t = n, e) : t }, e.invertExtent = function (e) { return e = t.indexOf(e), [n[e - 1], n[e]] }, e.copy = function () { return Gi(n, t) }, e } function Ki(n) { function t(n) { return +n } return t.invert = t, t.domain = t.range = function (e) { return arguments.length ? (n = e.map(t), t) : n }, t.ticks = function (t) { return Oi(n, t) }, t.tickFormat = function (t, e) { return Yi(n, t, e) }, t.copy = function () { return Ki(n) }, t } function Qi(n) { return n.innerRadius } function no(n) { return n.outerRadius } function to(n) { return n.startAngle } function eo(n) { return n.endAngle } function ro(n) { function t(t) { function o() { s.push("M", i(n(l), a)) } for (var c, s = [], l = [], f = -1, h = t.length, g = bt(e), p = bt(r) ; ++f < h;) u.call(this, c = t[f], f) ? l.push([+g.call(this, c, f), +p.call(this, c, f)]) : l.length && (o(), l = []); return l.length && o(), s.length ? s.join("") : null } var e = wr, r = Sr, u = we, i = uo, o = i.key, a = .7; return t.x = function (n) { return arguments.length ? (e = n, t) : e }, t.y = function (n) { return arguments.length ? (r = n, t) : r }, t.defined = function (n) { return arguments.length ? (u = n, t) : u }, t.interpolate = function (n) { return arguments.length ? (o = "function" == typeof n ? i = n : (i = xs.get(n) || uo).key, t) : o }, t.tension = function (n) { return arguments.length ? (a = n, t) : a }, t } function uo(n) { return n.join("L") } function io(n) { return uo(n) + "Z" } function oo(n) { for (var t = 0, e = n.length, r = n[0], u = [r[0], ",", r[1]]; ++t < e;) u.push("H", (r[0] + (r = n[t])[0]) / 2, "V", r[1]); return e > 1 && u.push("H", r[0]), u.join("") } function ao(n) { for (var t = 0, e = n.length, r = n[0], u = [r[0], ",", r[1]]; ++t < e;) u.push("V", (r = n[t])[1], "H", r[0]); return u.join("") } function co(n) { for (var t = 0, e = n.length, r = n[0], u = [r[0], ",", r[1]]; ++t < e;) u.push("H", (r = n[t])[0], "V", r[1]); return u.join("") } function so(n, t) { return n.length < 4 ? uo(n) : n[1] + ho(n.slice(1, n.length - 1), go(n, t)) } function lo(n, t) { return n.length < 3 ? uo(n) : n[0] + ho((n.push(n[0]), n), go([n[n.length - 2]].concat(n, [n[1]]), t)) } function fo(n, t) { return n.length < 3 ? uo(n) : n[0] + ho(n, go(n, t)) } function ho(n, t) { if (t.length < 1 || n.length != t.length && n.length != t.length + 2) return uo(n); var e = n.length != t.length, r = "", u = n[0], i = n[1], o = t[0], a = o, c = 1; if (e && (r += "Q" + (i[0] - 2 * o[0] / 3) + "," + (i[1] - 2 * o[1] / 3) + "," + i[0] + "," + i[1], u = n[1], c = 2), t.length > 1) { a = t[1], i = n[c], c++, r += "C" + (u[0] + o[0]) + "," + (u[1] + o[1]) + "," + (i[0] - a[0]) + "," + (i[1] - a[1]) + "," + i[0] + "," + i[1]; for (var s = 2; s < t.length; s++, c++) i = n[c], a = t[s], r += "S" + (i[0] - a[0]) + "," + (i[1] - a[1]) + "," + i[0] + "," + i[1] } if (e) { var l = n[c]; r += "Q" + (i[0] + 2 * a[0] / 3) + "," + (i[1] + 2 * a[1] / 3) + "," + l[0] + "," + l[1] } return r } function go(n, t) { for (var e, r = [], u = (1 - t) / 2, i = n[0], o = n[1], a = 1, c = n.length; ++a < c;) e = i, i = o, o = n[a], r.push([u * (o[0] - e[0]), u * (o[1] - e[1])]); return r } function po(n) { if (n.length < 3) return uo(n); var t = 1, e = n.length, r = n[0], u = r[0], i = r[1], o = [u, u, u, (r = n[1])[0]], a = [i, i, i, r[1]], c = [u, ",", i, "L", xo(bs, o), ",", xo(bs, a)]; for (n.push(n[e - 1]) ; ++t <= e;) r = n[t], o.shift(), o.push(r[0]), a.shift(), a.push(r[1]), Mo(c, o, a); return n.pop(), c.push("L", r), c.join("") } function vo(n) { if (n.length < 4) return uo(n); for (var t, e = [], r = -1, u = n.length, i = [0], o = [0]; ++r < 3;) t = n[r], i.push(t[0]), o.push(t[1]); for (e.push(xo(bs, i) + "," + xo(bs, o)), --r; ++r < u;) t = n[r], i.shift(), i.push(t[0]), o.shift(), o.push(t[1]), Mo(e, i, o); return e.join("") } function mo(n) { for (var t, e, r = -1, u = n.length, i = u + 4, o = [], a = []; ++r < 4;) e = n[r % u], o.push(e[0]), a.push(e[1]); for (t = [xo(bs, o), ",", xo(bs, a)], --r; ++r < i;) e = n[r % u], o.shift(), o.push(e[0]), a.shift(), a.push(e[1]), Mo(t, o, a); return t.join("") } function yo(n, t) { var e = n.length - 1; if (e) for (var r, u, i = n[0][0], o = n[0][1], a = n[e][0] - i, c = n[e][1] - o, s = -1; ++s <= e;) r = n[s], u = s / e, r[0] = t * r[0] + (1 - t) * (i + u * a), r[1] = t * r[1] + (1 - t) * (o + u * c); return po(n) } function xo(n, t) { return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] + n[3] * t[3] } function Mo(n, t, e) { n.push("C", xo(Ms, t), ",", xo(Ms, e), ",", xo(_s, t), ",", xo(_s, e), ",", xo(bs, t), ",", xo(bs, e)) } function _o(n, t) { return (t[1] - n[1]) / (t[0] - n[0]) } function bo(n) { for (var t = 0, e = n.length - 1, r = [], u = n[0], i = n[1], o = r[0] = _o(u, i) ; ++t < e;) r[t] = (o + (o = _o(u = i, i = n[t + 1]))) / 2; return r[t] = o, r } function wo(n) { for (var t, e, r, u, i = [], o = bo(n), a = -1, c = n.length - 1; ++a < c;) t = _o(n[a], n[a + 1]), ua(t) < ka ? o[a] = o[a + 1] = 0 : (e = o[a] / t, r = o[a + 1] / t, u = e * e + r * r, u > 9 && (u = 3 * t / Math.sqrt(u), o[a] = u * e, o[a + 1] = u * r)); for (a = -1; ++a <= c;) u = (n[Math.min(c, a + 1)][0] - n[Math.max(0, a - 1)][0]) / (6 * (1 + o[a] * o[a])), i.push([u || 0, o[a] * u || 0]); return i } function So(n) { return n.length < 3 ? uo(n) : n[0] + ho(n, wo(n)) } function ko(n) { for (var t, e, r, u = -1, i = n.length; ++u < i;) t = n[u], e = t[0], r = t[1] + ms, t[0] = e * Math.cos(r), t[1] = e * Math.sin(r); return n } function Eo(n) { function t(t) { function c() { v.push("M", a(n(m), f), l, s(n(d.reverse()), f), "Z") } for (var h, g, p, v = [], d = [], m = [], y = -1, x = t.length, M = bt(e), _ = bt(u), b = e === r ? function () { return g } : bt(r), w = u === i ? function () { return p } : bt(i) ; ++y < x;) o.call(this, h = t[y], y) ? (d.push([g = +M.call(this, h, y), p = +_.call(this, h, y)]), m.push([+b.call(this, h, y), +w.call(this, h, y)])) : d.length && (c(), d = [], m = []); return d.length && c(), v.length ? v.join("") : null } var e = wr, r = wr, u = 0, i = Sr, o = we, a = uo, c = a.key, s = a, l = "L", f = .7; return t.x = function (n) { return arguments.length ? (e = r = n, t) : r }, t.x0 = function (n) { return arguments.length ? (e = n, t) : e }, t.x1 = function (n) { return arguments.length ? (r = n, t) : r }, t.y = function (n) { return arguments.length ? (u = i = n, t) : i }, t.y0 = function (n) { return arguments.length ? (u = n, t) : u }, t.y1 = function (n) { return arguments.length ? (i = n, t) : i }, t.defined = function (n) { return arguments.length ? (o = n, t) : o }, t.interpolate = function (n) { return arguments.length ? (c = "function" == typeof n ? a = n : (a = xs.get(n) || uo).key, s = a.reverse || a, l = a.closed ? "M" : "L", t) : c }, t.tension = function (n) { return arguments.length ? (f = n, t) : f }, t } function Ao(n) { return n.radius } function Co(n) { return [n.x, n.y] } function No(n) { return function () { var t = n.apply(this, arguments), e = t[0], r = t[1] + ms; return [e * Math.cos(r), e * Math.sin(r)] } } function zo() { return 64 } function Lo() { return "circle" } function To(n) { var t = Math.sqrt(n / ba); return "M0," + t + "A" + t + "," + t + " 0 1,1 0," + -t + "A" + t + "," + t + " 0 1,1 0," + t + "Z" } function qo(n, t) { return sa(n, Cs), n.id = t, n } function Ro(n, t, e, r) { var u = n.id; return P(n, "function" == typeof e ? function (n, i, o) { n.__transition__[u].tween.set(t, r(e.call(n, n.__data__, i, o))) } : (e = r(e), function (n) { n.__transition__[u].tween.set(t, e) })) } function Do(n) { return null == n && (n = ""), function () { this.textContent = n } } function Po(n, t, e, r) {
        var u = n.__transition__ || (n.__transition__ = { active: 0, count: 0 }), i = u[e]; if (!i) {
            var a = r.time; i = u[e] = { tween: new o, time: a, ease: r.ease, delay: r.delay, duration: r.duration }, ++u.count, Zo.timer(function (r) {
                function o(r) { return u.active > e ? s() : (u.active = e, i.event && i.event.start.call(n, l, t), i.tween.forEach(function (e, r) { (r = r.call(n, l, t)) && v.push(r) }), Zo.timer(function () { return p.c = c(r || 1) ? we : c, 1 }, 0, a), void 0) } function c(r) {
                    if (u.active !== e) return s(); for (var o = r / g, a = f(o), c = v.length; c > 0;) v[--c].call(n, a);
                    return o >= 1 ? (i.event && i.event.end.call(n, l, t), s()) : void 0
                } function s() { return --u.count ? delete u[e] : delete n.__transition__, 1 } var l = n.__data__, f = i.ease, h = i.delay, g = i.duration, p = Ba, v = []; return p.t = h + a, r >= h ? o(r - h) : (p.c = o, void 0)
            }, 0, a)
        }
    } function Uo(n, t) { n.attr("transform", function (n) { return "translate(" + t(n) + ",0)" }) } function jo(n, t) { n.attr("transform", function (n) { return "translate(0," + t(n) + ")" }) } function Ho(n) { return n.toISOString() } function Fo(n, t, e) { function r(t) { return n(t) } function u(n, e) { var r = n[1] - n[0], u = r / e, i = Zo.bisect(Us, u); return i == Us.length ? [t.year, Fi(n.map(function (n) { return n / 31536e6 }), e)[2]] : i ? t[u / Us[i - 1] < Us[i] / u ? i - 1 : i] : [Fs, Fi(n, e)[2]] } return r.invert = function (t) { return Oo(n.invert(t)) }, r.domain = function (t) { return arguments.length ? (n.domain(t), r) : n.domain().map(Oo) }, r.nice = function (n, t) { function e(e) { return !isNaN(e) && !n.range(e, Oo(+e + 1), t).length } var i = r.domain(), o = Li(i), a = null == n ? u(o, 10) : "number" == typeof n && u(o, n); return a && (n = a[0], t = a[1]), r.domain(Ri(i, t > 1 ? { floor: function (t) { for (; e(t = n.floor(t)) ;) t = Oo(t - 1); return t }, ceil: function (t) { for (; e(t = n.ceil(t)) ;) t = Oo(+t + 1); return t } } : n)) }, r.ticks = function (n, t) { var e = Li(r.domain()), i = null == n ? u(e, 10) : "number" == typeof n ? u(e, n) : !n.range && [{ range: n }, t]; return i && (n = i[0], t = i[1]), n.range(e[0], Oo(+e[1] + 1), 1 > t ? 1 : t) }, r.tickFormat = function () { return e }, r.copy = function () { return Fo(n.copy(), t, e) }, ji(r, n) } function Oo(n) { return new Date(n) } function Yo(n) { return JSON.parse(n.responseText) } function Io(n) { var t = $o.createRange(); return t.selectNode($o.body), t.createContextualFragment(n.responseText) } var Zo = { version: "3.4.9" }; Date.now || (Date.now = function () { return +new Date }); var Vo = [].slice, Xo = function (n) { return Vo.call(n) }, $o = document, Bo = $o.documentElement, Wo = window; try { Xo(Bo.childNodes)[0].nodeType } catch (Jo) { Xo = function (n) { for (var t = n.length, e = new Array(t) ; t--;) e[t] = n[t]; return e } } try { $o.createElement("div").style.setProperty("opacity", 0, "") } catch (Go) { var Ko = Wo.Element.prototype, Qo = Ko.setAttribute, na = Ko.setAttributeNS, ta = Wo.CSSStyleDeclaration.prototype, ea = ta.setProperty; Ko.setAttribute = function (n, t) { Qo.call(this, n, t + "") }, Ko.setAttributeNS = function (n, t, e) { na.call(this, n, t, e + "") }, ta.setProperty = function (n, t, e) { ea.call(this, n, t + "", e) } } Zo.ascending = n, Zo.descending = function (n, t) { return n > t ? -1 : t > n ? 1 : t >= n ? 0 : 0 / 0 }, Zo.min = function (n, t) { var e, r, u = -1, i = n.length; if (1 === arguments.length) { for (; ++u < i && !(null != (e = n[u]) && e >= e) ;) e = void 0; for (; ++u < i;) null != (r = n[u]) && e > r && (e = r) } else { for (; ++u < i && !(null != (e = t.call(n, n[u], u)) && e >= e) ;) e = void 0; for (; ++u < i;) null != (r = t.call(n, n[u], u)) && e > r && (e = r) } return e }, Zo.max = function (n, t) { var e, r, u = -1, i = n.length; if (1 === arguments.length) { for (; ++u < i && !(null != (e = n[u]) && e >= e) ;) e = void 0; for (; ++u < i;) null != (r = n[u]) && r > e && (e = r) } else { for (; ++u < i && !(null != (e = t.call(n, n[u], u)) && e >= e) ;) e = void 0; for (; ++u < i;) null != (r = t.call(n, n[u], u)) && r > e && (e = r) } return e }, Zo.extent = function (n, t) { var e, r, u, i = -1, o = n.length; if (1 === arguments.length) { for (; ++i < o && !(null != (e = u = n[i]) && e >= e) ;) e = u = void 0; for (; ++i < o;) null != (r = n[i]) && (e > r && (e = r), r > u && (u = r)) } else { for (; ++i < o && !(null != (e = u = t.call(n, n[i], i)) && e >= e) ;) e = void 0; for (; ++i < o;) null != (r = t.call(n, n[i], i)) && (e > r && (e = r), r > u && (u = r)) } return [e, u] }, Zo.sum = function (n, t) { var e, r = 0, u = n.length, i = -1; if (1 === arguments.length) for (; ++i < u;) isNaN(e = +n[i]) || (r += e); else for (; ++i < u;) isNaN(e = +t.call(n, n[i], i)) || (r += e); return r }, Zo.mean = function (n, e) { var r, u = 0, i = n.length, o = -1, a = i; if (1 === arguments.length) for (; ++o < i;) t(r = n[o]) ? u += r : --a; else for (; ++o < i;) t(r = e.call(n, n[o], o)) ? u += r : --a; return a ? u / a : void 0 }, Zo.quantile = function (n, t) { var e = (n.length - 1) * t + 1, r = Math.floor(e), u = +n[r - 1], i = e - r; return i ? u + i * (n[r] - u) : u }, Zo.median = function (e, r) { return arguments.length > 1 && (e = e.map(r)), e = e.filter(t), e.length ? Zo.quantile(e.sort(n), .5) : void 0 }; var ra = e(n); Zo.bisectLeft = ra.left, Zo.bisect = Zo.bisectRight = ra.right, Zo.bisector = function (t) { return e(1 === t.length ? function (e, r) { return n(t(e), r) } : t) }, Zo.shuffle = function (n) { for (var t, e, r = n.length; r;) e = 0 | Math.random() * r--, t = n[r], n[r] = n[e], n[e] = t; return n }, Zo.permute = function (n, t) { for (var e = t.length, r = new Array(e) ; e--;) r[e] = n[t[e]]; return r }, Zo.pairs = function (n) { for (var t, e = 0, r = n.length - 1, u = n[0], i = new Array(0 > r ? 0 : r) ; r > e;) i[e] = [t = u, u = n[++e]]; return i }, Zo.zip = function () { if (!(u = arguments.length)) return []; for (var n = -1, t = Zo.min(arguments, r), e = new Array(t) ; ++n < t;) for (var u, i = -1, o = e[n] = new Array(u) ; ++i < u;) o[i] = arguments[i][n]; return e }, Zo.transpose = function (n) { return Zo.zip.apply(Zo, n) }, Zo.keys = function (n) { var t = []; for (var e in n) t.push(e); return t }, Zo.values = function (n) { var t = []; for (var e in n) t.push(n[e]); return t }, Zo.entries = function (n) { var t = []; for (var e in n) t.push({ key: e, value: n[e] }); return t }, Zo.merge = function (n) { for (var t, e, r, u = n.length, i = -1, o = 0; ++i < u;) o += n[i].length; for (e = new Array(o) ; --u >= 0;) for (r = n[u], t = r.length; --t >= 0;) e[--o] = r[t]; return e }; var ua = Math.abs; Zo.range = function (n, t, e) { if (arguments.length < 3 && (e = 1, arguments.length < 2 && (t = n, n = 0)), 1 / 0 === (t - n) / e) throw new Error("infinite range"); var r, i = [], o = u(ua(e)), a = -1; if (n *= o, t *= o, e *= o, 0 > e) for (; (r = n + e * ++a) > t;) i.push(r / o); else for (; (r = n + e * ++a) < t;) i.push(r / o); return i }, Zo.map = function (n) { var t = new o; if (n instanceof o) n.forEach(function (n, e) { t.set(n, e) }); else for (var e in n) t.set(e, n[e]); return t }, i(o, { has: a, get: function (n) { return this[ia + n] }, set: function (n, t) { return this[ia + n] = t }, remove: c, keys: s, values: function () { var n = []; return this.forEach(function (t, e) { n.push(e) }), n }, entries: function () { var n = []; return this.forEach(function (t, e) { n.push({ key: t, value: e }) }), n }, size: l, empty: f, forEach: function (n) { for (var t in this) t.charCodeAt(0) === oa && n.call(this, t.substring(1), this[t]) } }); var ia = "\x00", oa = ia.charCodeAt(0); Zo.nest = function () { function n(t, a, c) { if (c >= i.length) return r ? r.call(u, a) : e ? a.sort(e) : a; for (var s, l, f, h, g = -1, p = a.length, v = i[c++], d = new o; ++g < p;) (h = d.get(s = v(l = a[g]))) ? h.push(l) : d.set(s, [l]); return t ? (l = t(), f = function (e, r) { l.set(e, n(t, r, c)) }) : (l = {}, f = function (e, r) { l[e] = n(t, r, c) }), d.forEach(f), l } function t(n, e) { if (e >= i.length) return n; var r = [], u = a[e++]; return n.forEach(function (n, u) { r.push({ key: n, values: t(u, e) }) }), u ? r.sort(function (n, t) { return u(n.key, t.key) }) : r } var e, r, u = {}, i = [], a = []; return u.map = function (t, e) { return n(e, t, 0) }, u.entries = function (e) { return t(n(Zo.map, e, 0), 0) }, u.key = function (n) { return i.push(n), u }, u.sortKeys = function (n) { return a[i.length - 1] = n, u }, u.sortValues = function (n) { return e = n, u }, u.rollup = function (n) { return r = n, u }, u }, Zo.set = function (n) { var t = new h; if (n) for (var e = 0, r = n.length; r > e; ++e) t.add(n[e]); return t }, i(h, { has: a, add: function (n) { return this[ia + n] = !0, n }, remove: function (n) { return n = ia + n, n in this && delete this[n] }, values: s, size: l, empty: f, forEach: function (n) { for (var t in this) t.charCodeAt(0) === oa && n.call(this, t.substring(1)) } }), Zo.behavior = {}, Zo.rebind = function (n, t) { for (var e, r = 1, u = arguments.length; ++r < u;) n[e = arguments[r]] = g(n, t, t[e]); return n }; var aa = ["webkit", "ms", "moz", "Moz", "o", "O"]; Zo.dispatch = function () { for (var n = new d, t = -1, e = arguments.length; ++t < e;) n[arguments[t]] = m(n); return n }, d.prototype.on = function (n, t) { var e = n.indexOf("."), r = ""; if (e >= 0 && (r = n.substring(e + 1), n = n.substring(0, e)), n) return arguments.length < 2 ? this[n].on(r) : this[n].on(r, t); if (2 === arguments.length) { if (null == t) for (n in this) this.hasOwnProperty(n) && this[n].on(r, null); return this } }, Zo.event = null, Zo.requote = function (n) { return n.replace(ca, "\\$&") }; var ca = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g, sa = {}.__proto__ ? function (n, t) { n.__proto__ = t } : function (n, t) { for (var e in t) n[e] = t[e] }, la = function (n, t) { return t.querySelector(n) }, fa = function (n, t) { return t.querySelectorAll(n) }, ha = Bo.matches || Bo[p(Bo, "matchesSelector")], ga = function (n, t) { return ha.call(n, t) }; "function" == typeof Sizzle && (la = function (n, t) { return Sizzle(n, t)[0] || null }, fa = Sizzle, ga = Sizzle.matchesSelector), Zo.selection = function () { return ma }; var pa = Zo.selection.prototype = []; pa.select = function (n) { var t, e, r, u, i = []; n = b(n); for (var o = -1, a = this.length; ++o < a;) { i.push(t = []), t.parentNode = (r = this[o]).parentNode; for (var c = -1, s = r.length; ++c < s;) (u = r[c]) ? (t.push(e = n.call(u, u.__data__, c, o)), e && "__data__" in u && (e.__data__ = u.__data__)) : t.push(null) } return _(i) }, pa.selectAll = function (n) { var t, e, r = []; n = w(n); for (var u = -1, i = this.length; ++u < i;) for (var o = this[u], a = -1, c = o.length; ++a < c;) (e = o[a]) && (r.push(t = Xo(n.call(e, e.__data__, a, u))), t.parentNode = e); return _(r) }; var va = { svg: "http://www.w3.org/2000/svg", xhtml: "http://www.w3.org/1999/xhtml", xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/" }; Zo.ns = { prefix: va, qualify: function (n) { var t = n.indexOf(":"), e = n; return t >= 0 && (e = n.substring(0, t), n = n.substring(t + 1)), va.hasOwnProperty(e) ? { space: va[e], local: n } : n } }, pa.attr = function (n, t) { if (arguments.length < 2) { if ("string" == typeof n) { var e = this.node(); return n = Zo.ns.qualify(n), n.local ? e.getAttributeNS(n.space, n.local) : e.getAttribute(n) } for (t in n) this.each(S(t, n[t])); return this } return this.each(S(n, t)) }, pa.classed = function (n, t) { if (arguments.length < 2) { if ("string" == typeof n) { var e = this.node(), r = (n = A(n)).length, u = -1; if (t = e.classList) { for (; ++u < r;) if (!t.contains(n[u])) return !1 } else for (t = e.getAttribute("class") ; ++u < r;) if (!E(n[u]).test(t)) return !1; return !0 } for (t in n) this.each(C(t, n[t])); return this } return this.each(C(n, t)) }, pa.style = function (n, t, e) { var r = arguments.length; if (3 > r) { if ("string" != typeof n) { 2 > r && (t = ""); for (e in n) this.each(z(e, n[e], t)); return this } if (2 > r) return Wo.getComputedStyle(this.node(), null).getPropertyValue(n); e = "" } return this.each(z(n, t, e)) }, pa.property = function (n, t) { if (arguments.length < 2) { if ("string" == typeof n) return this.node()[n]; for (t in n) this.each(L(t, n[t])); return this } return this.each(L(n, t)) }, pa.text = function (n) { return arguments.length ? this.each("function" == typeof n ? function () { var t = n.apply(this, arguments); this.textContent = null == t ? "" : t } : null == n ? function () { this.textContent = "" } : function () { this.textContent = n }) : this.node().textContent }, pa.html = function (n) { return arguments.length ? this.each("function" == typeof n ? function () { var t = n.apply(this, arguments); this.innerHTML = null == t ? "" : t } : null == n ? function () { this.innerHTML = "" } : function () { this.innerHTML = n }) : this.node().innerHTML }, pa.append = function (n) { return n = T(n), this.select(function () { return this.appendChild(n.apply(this, arguments)) }) }, pa.insert = function (n, t) { return n = T(n), t = b(t), this.select(function () { return this.insertBefore(n.apply(this, arguments), t.apply(this, arguments) || null) }) }, pa.remove = function () { return this.each(function () { var n = this.parentNode; n && n.removeChild(this) }) }, pa.data = function (n, t) { function e(n, e) { var r, u, i, a = n.length, f = e.length, h = Math.min(a, f), g = new Array(f), p = new Array(f), v = new Array(a); if (t) { var d, m = new o, y = new o, x = []; for (r = -1; ++r < a;) d = t.call(u = n[r], u.__data__, r), m.has(d) ? v[r] = u : m.set(d, u), x.push(d); for (r = -1; ++r < f;) d = t.call(e, i = e[r], r), (u = m.get(d)) ? (g[r] = u, u.__data__ = i) : y.has(d) || (p[r] = q(i)), y.set(d, i), m.remove(d); for (r = -1; ++r < a;) m.has(x[r]) && (v[r] = n[r]) } else { for (r = -1; ++r < h;) u = n[r], i = e[r], u ? (u.__data__ = i, g[r] = u) : p[r] = q(i); for (; f > r; ++r) p[r] = q(e[r]); for (; a > r; ++r) v[r] = n[r] } p.update = g, p.parentNode = g.parentNode = v.parentNode = n.parentNode, c.push(p), s.push(g), l.push(v) } var r, u, i = -1, a = this.length; if (!arguments.length) { for (n = new Array(a = (r = this[0]).length) ; ++i < a;) (u = r[i]) && (n[i] = u.__data__); return n } var c = U([]), s = _([]), l = _([]); if ("function" == typeof n) for (; ++i < a;) e(r = this[i], n.call(r, r.parentNode.__data__, i)); else for (; ++i < a;) e(r = this[i], n); return s.enter = function () { return c }, s.exit = function () { return l }, s }, pa.datum = function (n) { return arguments.length ? this.property("__data__", n) : this.property("__data__") }, pa.filter = function (n) { var t, e, r, u = []; "function" != typeof n && (n = R(n)); for (var i = 0, o = this.length; o > i; i++) { u.push(t = []), t.parentNode = (e = this[i]).parentNode; for (var a = 0, c = e.length; c > a; a++) (r = e[a]) && n.call(r, r.__data__, a, i) && t.push(r) } return _(u) }, pa.order = function () { for (var n = -1, t = this.length; ++n < t;) for (var e, r = this[n], u = r.length - 1, i = r[u]; --u >= 0;) (e = r[u]) && (i && i !== e.nextSibling && i.parentNode.insertBefore(e, i), i = e); return this }, pa.sort = function (n) { n = D.apply(this, arguments); for (var t = -1, e = this.length; ++t < e;) this[t].sort(n); return this.order() }, pa.each = function (n) { return P(this, function (t, e, r) { n.call(t, t.__data__, e, r) }) }, pa.call = function (n) { var t = Xo(arguments); return n.apply(t[0] = this, t), this }, pa.empty = function () { return !this.node() }, pa.node = function () { for (var n = 0, t = this.length; t > n; n++) for (var e = this[n], r = 0, u = e.length; u > r; r++) { var i = e[r]; if (i) return i } return null }, pa.size = function () { var n = 0; return this.each(function () { ++n }), n }; var da = []; Zo.selection.enter = U, Zo.selection.enter.prototype = da, da.append = pa.append, da.empty = pa.empty, da.node = pa.node, da.call = pa.call, da.size = pa.size, da.select = function (n) { for (var t, e, r, u, i, o = [], a = -1, c = this.length; ++a < c;) { r = (u = this[a]).update, o.push(t = []), t.parentNode = u.parentNode; for (var s = -1, l = u.length; ++s < l;) (i = u[s]) ? (t.push(r[s] = e = n.call(u.parentNode, i.__data__, s, a)), e.__data__ = i.__data__) : t.push(null) } return _(o) }, da.insert = function (n, t) { return arguments.length < 2 && (t = j(this)), pa.insert.call(this, n, t) }, pa.transition = function () { for (var n, t, e = Ss || ++Ns, r = [], u = ks || { time: Date.now(), ease: xu, delay: 0, duration: 250 }, i = -1, o = this.length; ++i < o;) { r.push(n = []); for (var a = this[i], c = -1, s = a.length; ++c < s;) (t = a[c]) && Po(t, c, e, u), n.push(t) } return qo(r, e) }, pa.interrupt = function () { return this.each(H) }, Zo.select = function (n) { var t = ["string" == typeof n ? la(n, $o) : n]; return t.parentNode = Bo, _([t]) }, Zo.selectAll = function (n) { var t = Xo("string" == typeof n ? fa(n, $o) : n); return t.parentNode = Bo, _([t]) }; var ma = Zo.select(Bo); pa.on = function (n, t, e) { var r = arguments.length; if (3 > r) { if ("string" != typeof n) { 2 > r && (t = !1); for (e in n) this.each(F(e, n[e], t)); return this } if (2 > r) return (r = this.node()["__on" + n]) && r._; e = !1 } return this.each(F(n, t, e)) }; var ya = Zo.map({ mouseenter: "mouseover", mouseleave: "mouseout" }); ya.forEach(function (n) { "on" + n in $o && ya.remove(n) }); var xa = "onselectstart" in $o ? null : p(Bo.style, "userSelect"), Ma = 0; Zo.mouse = function (n) { return Z(n, x()) }; var _a = /WebKit/.test(Wo.navigator.userAgent) ? -1 : 0; Zo.touches = function (n, t) { return arguments.length < 2 && (t = x().touches), t ? Xo(t).map(function (t) { var e = Z(n, t); return e.identifier = t.identifier, e }) : [] }, Zo.behavior.drag = function () { function n() { this.on("mousedown.drag", u).on("touchstart.drag", i) } function t(n, t, u, i, o) { return function () { function a() { var n, e, r = t(h, v); r && (n = r[0] - x[0], e = r[1] - x[1], p |= n | e, x = r, g({ type: "drag", x: r[0] + s[0], y: r[1] + s[1], dx: n, dy: e })) } function c() { t(h, v) && (m.on(i + d, null).on(o + d, null), y(p && Zo.event.target === f), g({ type: "dragend" })) } var s, l = this, f = Zo.event.target, h = l.parentNode, g = e.of(l, arguments), p = 0, v = n(), d = ".drag" + (null == v ? "" : "-" + v), m = Zo.select(u()).on(i + d, a).on(o + d, c), y = I(), x = t(h, v); r ? (s = r.apply(l, arguments), s = [s.x - x[0], s.y - x[1]]) : s = [0, 0], g({ type: "dragstart" }) } } var e = M(n, "drag", "dragstart", "dragend"), r = null, u = t(v, Zo.mouse, $, "mousemove", "mouseup"), i = t(V, Zo.touch, X, "touchmove", "touchend"); return n.origin = function (t) { return arguments.length ? (r = t, n) : r }, Zo.rebind(n, e, "on") }; var ba = Math.PI, wa = 2 * ba, Sa = ba / 2, ka = 1e-6, Ea = ka * ka, Aa = ba / 180, Ca = 180 / ba, Na = Math.SQRT2, za = 2, La = 4; Zo.interpolateZoom = function (n, t) { function e(n) { var t = n * y; if (m) { var e = Q(v), o = i / (za * h) * (e * nt(Na * t + v) - K(v)); return [r + o * s, u + o * l, i * e / Q(Na * t + v)] } return [r + n * s, u + n * l, i * Math.exp(Na * t)] } var r = n[0], u = n[1], i = n[2], o = t[0], a = t[1], c = t[2], s = o - r, l = a - u, f = s * s + l * l, h = Math.sqrt(f), g = (c * c - i * i + La * f) / (2 * i * za * h), p = (c * c - i * i - La * f) / (2 * c * za * h), v = Math.log(Math.sqrt(g * g + 1) - g), d = Math.log(Math.sqrt(p * p + 1) - p), m = d - v, y = (m || Math.log(c / i)) / Na; return e.duration = 1e3 * y, e }, Zo.behavior.zoom = function () { function n(n) { n.on(A, s).on(Ra + ".zoom", f).on(C, h).on("dblclick.zoom", g).on(z, l) } function t(n) { return [(n[0] - S.x) / S.k, (n[1] - S.y) / S.k] } function e(n) { return [n[0] * S.k + S.x, n[1] * S.k + S.y] } function r(n) { S.k = Math.max(E[0], Math.min(E[1], n)) } function u(n, t) { t = e(t), S.x += n[0] - t[0], S.y += n[1] - t[1] } function i() { _ && _.domain(x.range().map(function (n) { return (n - S.x) / S.k }).map(x.invert)), w && w.domain(b.range().map(function (n) { return (n - S.y) / S.k }).map(b.invert)) } function o(n) { n({ type: "zoomstart" }) } function a(n) { i(), n({ type: "zoom", scale: S.k, translate: [S.x, S.y] }) } function c(n) { n({ type: "zoomend" }) } function s() { function n() { l = 1, u(Zo.mouse(r), g), a(s) } function e() { f.on(C, Wo === r ? h : null).on(N, null), p(l && Zo.event.target === i), c(s) } var r = this, i = Zo.event.target, s = L.of(r, arguments), l = 0, f = Zo.select(Wo).on(C, n).on(N, e), g = t(Zo.mouse(r)), p = I(); H.call(r), o(s) } function l() { function n() { var n = Zo.touches(g); return h = S.k, n.forEach(function (n) { n.identifier in v && (v[n.identifier] = t(n)) }), n } function e() { var t = Zo.event.target; Zo.select(t).on(M, i).on(_, f), b.push(t); for (var e = Zo.event.changedTouches, o = 0, c = e.length; c > o; ++o) v[e[o].identifier] = null; var s = n(), l = Date.now(); if (1 === s.length) { if (500 > l - m) { var h = s[0], g = v[h.identifier]; r(2 * S.k), u(h, g), y(), a(p) } m = l } else if (s.length > 1) { var h = s[0], x = s[1], w = h[0] - x[0], k = h[1] - x[1]; d = w * w + k * k } } function i() { for (var n, t, e, i, o = Zo.touches(g), c = 0, s = o.length; s > c; ++c, i = null) if (e = o[c], i = v[e.identifier]) { if (t) break; n = e, t = i } if (i) { var l = (l = e[0] - n[0]) * l + (l = e[1] - n[1]) * l, f = d && Math.sqrt(l / d); n = [(n[0] + e[0]) / 2, (n[1] + e[1]) / 2], t = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2], r(f * h) } m = null, u(n, t), a(p) } function f() { if (Zo.event.touches.length) { for (var t = Zo.event.changedTouches, e = 0, r = t.length; r > e; ++e) delete v[t[e].identifier]; for (var u in v) return void n() } Zo.selectAll(b).on(x, null), w.on(A, s).on(z, l), k(), c(p) } var h, g = this, p = L.of(g, arguments), v = {}, d = 0, x = ".zoom-" + Zo.event.changedTouches[0].identifier, M = "touchmove" + x, _ = "touchend" + x, b = [], w = Zo.select(g).on(A, null).on(z, e), k = I(); H.call(g), e(), o(p) } function f() { var n = L.of(this, arguments); d ? clearTimeout(d) : (H.call(this), o(n)), d = setTimeout(function () { d = null, c(n) }, 50), y(); var e = v || Zo.mouse(this); p || (p = t(e)), r(Math.pow(2, .002 * Ta()) * S.k), u(e, p), a(n) } function h() { p = null } function g() { var n = L.of(this, arguments), e = Zo.mouse(this), i = t(e), s = Math.log(S.k) / Math.LN2; o(n), r(Math.pow(2, Zo.event.shiftKey ? Math.ceil(s) - 1 : Math.floor(s) + 1)), u(e, i), a(n), c(n) } var p, v, d, m, x, _, b, w, S = { x: 0, y: 0, k: 1 }, k = [960, 500], E = qa, A = "mousedown.zoom", C = "mousemove.zoom", N = "mouseup.zoom", z = "touchstart.zoom", L = M(n, "zoomstart", "zoom", "zoomend"); return n.event = function (n) { n.each(function () { var n = L.of(this, arguments), t = S; Ss ? Zo.select(this).transition().each("start.zoom", function () { S = this.__chart__ || { x: 0, y: 0, k: 1 }, o(n) }).tween("zoom:zoom", function () { var e = k[0], r = k[1], u = e / 2, i = r / 2, o = Zo.interpolateZoom([(u - S.x) / S.k, (i - S.y) / S.k, e / S.k], [(u - t.x) / t.k, (i - t.y) / t.k, e / t.k]); return function (t) { var r = o(t), c = e / r[2]; this.__chart__ = S = { x: u - r[0] * c, y: i - r[1] * c, k: c }, a(n) } }).each("end.zoom", function () { c(n) }) : (this.__chart__ = S, o(n), a(n), c(n)) }) }, n.translate = function (t) { return arguments.length ? (S = { x: +t[0], y: +t[1], k: S.k }, i(), n) : [S.x, S.y] }, n.scale = function (t) { return arguments.length ? (S = { x: S.x, y: S.y, k: +t }, i(), n) : S.k }, n.scaleExtent = function (t) { return arguments.length ? (E = null == t ? qa : [+t[0], +t[1]], n) : E }, n.center = function (t) { return arguments.length ? (v = t && [+t[0], +t[1]], n) : v }, n.size = function (t) { return arguments.length ? (k = t && [+t[0], +t[1]], n) : k }, n.x = function (t) { return arguments.length ? (_ = t, x = t.copy(), S = { x: 0, y: 0, k: 1 }, n) : _ }, n.y = function (t) { return arguments.length ? (w = t, b = t.copy(), S = { x: 0, y: 0, k: 1 }, n) : w }, Zo.rebind(n, L, "on") }; var Ta, qa = [0, 1 / 0], Ra = "onwheel" in $o ? (Ta = function () { return -Zo.event.deltaY * (Zo.event.deltaMode ? 120 : 1) }, "wheel") : "onmousewheel" in $o ? (Ta = function () { return Zo.event.wheelDelta }, "mousewheel") : (Ta = function () { return -Zo.event.detail }, "MozMousePixelScroll"); Zo.color = et, et.prototype.toString = function () { return this.rgb() + "" }, Zo.hsl = rt; var Da = rt.prototype = new et; Da.brighter = function (n) { return n = Math.pow(.7, arguments.length ? n : 1), new rt(this.h, this.s, this.l / n) }, Da.darker = function (n) { return n = Math.pow(.7, arguments.length ? n : 1), new rt(this.h, this.s, n * this.l) }, Da.rgb = function () { return ut(this.h, this.s, this.l) }, Zo.hcl = it; var Pa = it.prototype = new et; Pa.brighter = function (n) { return new it(this.h, this.c, Math.min(100, this.l + Ua * (arguments.length ? n : 1))) }, Pa.darker = function (n) { return new it(this.h, this.c, Math.max(0, this.l - Ua * (arguments.length ? n : 1))) }, Pa.rgb = function () { return ot(this.h, this.c, this.l).rgb() }, Zo.lab = at; var Ua = 18, ja = .95047, Ha = 1, Fa = 1.08883, Oa = at.prototype = new et; Oa.brighter = function (n) { return new at(Math.min(100, this.l + Ua * (arguments.length ? n : 1)), this.a, this.b) }, Oa.darker = function (n) { return new at(Math.max(0, this.l - Ua * (arguments.length ? n : 1)), this.a, this.b) }, Oa.rgb = function () { return ct(this.l, this.a, this.b) }, Zo.rgb = gt; var Ya = gt.prototype = new et; Ya.brighter = function (n) { n = Math.pow(.7, arguments.length ? n : 1); var t = this.r, e = this.g, r = this.b, u = 30; return t || e || r ? (t && u > t && (t = u), e && u > e && (e = u), r && u > r && (r = u), new gt(Math.min(255, t / n), Math.min(255, e / n), Math.min(255, r / n))) : new gt(u, u, u) }, Ya.darker = function (n) { return n = Math.pow(.7, arguments.length ? n : 1), new gt(n * this.r, n * this.g, n * this.b) }, Ya.hsl = function () { return yt(this.r, this.g, this.b) }, Ya.toString = function () { return "#" + dt(this.r) + dt(this.g) + dt(this.b) }; var Ia = Zo.map({ aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 }); Ia.forEach(function (n, t) { Ia.set(n, pt(t)) }), Zo.functor = bt, Zo.xhr = St(wt), Zo.dsv = function (n, t) { function e(n, e, i) { arguments.length < 3 && (i = e, e = null); var o = kt(n, t, null == e ? r : u(e), i); return o.row = function (n) { return arguments.length ? o.response(null == (e = n) ? r : u(n)) : e }, o } function r(n) { return e.parse(n.responseText) } function u(n) { return function (t) { return e.parse(t.responseText, n) } } function i(t) { return t.map(o).join(n) } function o(n) { return a.test(n) ? '"' + n.replace(/\"/g, '""') + '"' : n } var a = new RegExp('["' + n + "\n]"), c = n.charCodeAt(0); return e.parse = function (n, t) { var r; return e.parseRows(n, function (n, e) { if (r) return r(n, e - 1); var u = new Function("d", "return {" + n.map(function (n, t) { return JSON.stringify(n) + ": d[" + t + "]" }).join(",") + "}"); r = t ? function (n, e) { return t(u(n), e) } : u }) }, e.parseRows = function (n, t) { function e() { if (l >= s) return o; if (u) return u = !1, i; var t = l; if (34 === n.charCodeAt(t)) { for (var e = t; e++ < s;) if (34 === n.charCodeAt(e)) { if (34 !== n.charCodeAt(e + 1)) break; ++e } l = e + 2; var r = n.charCodeAt(e + 1); return 13 === r ? (u = !0, 10 === n.charCodeAt(e + 2) && ++l) : 10 === r && (u = !0), n.substring(t + 1, e).replace(/""/g, '"') } for (; s > l;) { var r = n.charCodeAt(l++), a = 1; if (10 === r) u = !0; else if (13 === r) u = !0, 10 === n.charCodeAt(l) && (++l, ++a); else if (r !== c) continue; return n.substring(t, l - a) } return n.substring(t) } for (var r, u, i = {}, o = {}, a = [], s = n.length, l = 0, f = 0; (r = e()) !== o;) { for (var h = []; r !== i && r !== o;) h.push(r), r = e(); (!t || (h = t(h, f++))) && a.push(h) } return a }, e.format = function (t) { if (Array.isArray(t[0])) return e.formatRows(t); var r = new h, u = []; return t.forEach(function (n) { for (var t in n) r.has(t) || u.push(r.add(t)) }), [u.map(o).join(n)].concat(t.map(function (t) { return u.map(function (n) { return o(t[n]) }).join(n) })).join("\n") }, e.formatRows = function (n) { return n.map(i).join("\n") }, e }, Zo.csv = Zo.dsv(",", "text/csv"), Zo.tsv = Zo.dsv("	", "text/tab-separated-values"), Zo.touch = function (n, t, e) { if (arguments.length < 3 && (e = t, t = x().changedTouches), t) for (var r, u = 0, i = t.length; i > u; ++u) if ((r = t[u]).identifier === e) return Z(n, r) }; var Za, Va, Xa, $a, Ba, Wa = Wo[p(Wo, "requestAnimationFrame")] || function (n) { setTimeout(n, 17) }; Zo.timer = function (n, t, e) { var r = arguments.length; 2 > r && (t = 0), 3 > r && (e = Date.now()); var u = e + t, i = { c: n, t: u, f: !1, n: null }; Va ? Va.n = i : Za = i, Va = i, Xa || ($a = clearTimeout($a), Xa = 1, Wa(At)) }, Zo.timer.flush = function () { Ct(), Nt() }, Zo.round = function (n, t) { return t ? Math.round(n * (t = Math.pow(10, t))) / t : Math.round(n) }; var Ja = ["y", "z", "a", "f", "p", "n", "\xb5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(Lt); Zo.formatPrefix = function (n, t) { var e = 0; return n && (0 > n && (n *= -1), t && (n = Zo.round(n, zt(n, t))), e = 1 + Math.floor(1e-12 + Math.log(n) / Math.LN10), e = Math.max(-24, Math.min(24, 3 * Math.floor((e - 1) / 3)))), Ja[8 + e / 3] }; var Ga = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i, Ka = Zo.map({ b: function (n) { return n.toString(2) }, c: function (n) { return String.fromCharCode(n) }, o: function (n) { return n.toString(8) }, x: function (n) { return n.toString(16) }, X: function (n) { return n.toString(16).toUpperCase() }, g: function (n, t) { return n.toPrecision(t) }, e: function (n, t) { return n.toExponential(t) }, f: function (n, t) { return n.toFixed(t) }, r: function (n, t) { return (n = Zo.round(n, zt(n, t))).toFixed(Math.max(0, Math.min(20, zt(n * (1 + 1e-15), t)))) } }), Qa = Zo.time = {}, nc = Date; Rt.prototype = { getDate: function () { return this._.getUTCDate() }, getDay: function () { return this._.getUTCDay() }, getFullYear: function () { return this._.getUTCFullYear() }, getHours: function () { return this._.getUTCHours() }, getMilliseconds: function () { return this._.getUTCMilliseconds() }, getMinutes: function () { return this._.getUTCMinutes() }, getMonth: function () { return this._.getUTCMonth() }, getSeconds: function () { return this._.getUTCSeconds() }, getTime: function () { return this._.getTime() }, getTimezoneOffset: function () { return 0 }, valueOf: function () { return this._.valueOf() }, setDate: function () { tc.setUTCDate.apply(this._, arguments) }, setDay: function () { tc.setUTCDay.apply(this._, arguments) }, setFullYear: function () { tc.setUTCFullYear.apply(this._, arguments) }, setHours: function () { tc.setUTCHours.apply(this._, arguments) }, setMilliseconds: function () { tc.setUTCMilliseconds.apply(this._, arguments) }, setMinutes: function () { tc.setUTCMinutes.apply(this._, arguments) }, setMonth: function () { tc.setUTCMonth.apply(this._, arguments) }, setSeconds: function () { tc.setUTCSeconds.apply(this._, arguments) }, setTime: function () { tc.setTime.apply(this._, arguments) } }; var tc = Date.prototype; Qa.year = Dt(function (n) { return n = Qa.day(n), n.setMonth(0, 1), n }, function (n, t) { n.setFullYear(n.getFullYear() + t) }, function (n) { return n.getFullYear() }), Qa.years = Qa.year.range, Qa.years.utc = Qa.year.utc.range, Qa.day = Dt(function (n) { var t = new nc(2e3, 0); return t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), t }, function (n, t) { n.setDate(n.getDate() + t) }, function (n) { return n.getDate() - 1 }), Qa.days = Qa.day.range, Qa.days.utc = Qa.day.utc.range, Qa.dayOfYear = function (n) { var t = Qa.year(n); return Math.floor((n - t - 6e4 * (n.getTimezoneOffset() - t.getTimezoneOffset())) / 864e5) }, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function (n, t) { t = 7 - t; var e = Qa[n] = Dt(function (n) { return (n = Qa.day(n)).setDate(n.getDate() - (n.getDay() + t) % 7), n }, function (n, t) { n.setDate(n.getDate() + 7 * Math.floor(t)) }, function (n) { var e = Qa.year(n).getDay(); return Math.floor((Qa.dayOfYear(n) + (e + t) % 7) / 7) - (e !== t) }); Qa[n + "s"] = e.range, Qa[n + "s"].utc = e.utc.range, Qa[n + "OfYear"] = function (n) { var e = Qa.year(n).getDay(); return Math.floor((Qa.dayOfYear(n) + (e + t) % 7) / 7) } }), Qa.week = Qa.sunday, Qa.weeks = Qa.sunday.range, Qa.weeks.utc = Qa.sunday.utc.range, Qa.weekOfYear = Qa.sundayOfYear; var ec = { "-": "", _: " ", 0: "0" }, rc = /^\s*\d+/, uc = /^%/; Zo.locale = function (n) { return { numberFormat: Tt(n), timeFormat: Ut(n) } }; var ic = Zo.locale({ decimal: ".", thousands: ",", grouping: [3], currency: ["$", ""], dateTime: "%a %b %e %X %Y", date: "%m/%d/%Y", time: "%H:%M:%S", periods: ["AM", "PM"], days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] }); Zo.format = ic.numberFormat, Zo.geo = {}, ue.prototype = { s: 0, t: 0, add: function (n) { ie(n, this.t, oc), ie(oc.s, this.s, this), this.s ? this.t += oc.t : this.s = oc.t }, reset: function () { this.s = this.t = 0 }, valueOf: function () { return this.s } }; var oc = new ue; Zo.geo.stream = function (n, t) { n && ac.hasOwnProperty(n.type) ? ac[n.type](n, t) : oe(n, t) }; var ac = { Feature: function (n, t) { oe(n.geometry, t) }, FeatureCollection: function (n, t) { for (var e = n.features, r = -1, u = e.length; ++r < u;) oe(e[r].geometry, t) } }, cc = { Sphere: function (n, t) { t.sphere() }, Point: function (n, t) { n = n.coordinates, t.point(n[0], n[1], n[2]) }, MultiPoint: function (n, t) { for (var e = n.coordinates, r = -1, u = e.length; ++r < u;) n = e[r], t.point(n[0], n[1], n[2]) }, LineString: function (n, t) { ae(n.coordinates, t, 0) }, MultiLineString: function (n, t) { for (var e = n.coordinates, r = -1, u = e.length; ++r < u;) ae(e[r], t, 0) }, Polygon: function (n, t) { ce(n.coordinates, t) }, MultiPolygon: function (n, t) { for (var e = n.coordinates, r = -1, u = e.length; ++r < u;) ce(e[r], t) }, GeometryCollection: function (n, t) { for (var e = n.geometries, r = -1, u = e.length; ++r < u;) oe(e[r], t) } }; Zo.geo.area = function (n) { return sc = 0, Zo.geo.stream(n, fc), sc }; var sc, lc = new ue, fc = { sphere: function () { sc += 4 * ba }, point: v, lineStart: v, lineEnd: v, polygonStart: function () { lc.reset(), fc.lineStart = se }, polygonEnd: function () { var n = 2 * lc; sc += 0 > n ? 4 * ba + n : n, fc.lineStart = fc.lineEnd = fc.point = v } }; Zo.geo.bounds = function () {
        function n(n, t) { x.push(M = [l = n, h = n]), f > t && (f = t), t > g && (g = t) } function t(t, e) { var r = le([t * Aa, e * Aa]); if (m) { var u = he(m, r), i = [u[1], -u[0], 0], o = he(i, u); ve(o), o = de(o); var c = t - p, s = c > 0 ? 1 : -1, v = o[0] * Ca * s, d = ua(c) > 180; if (d ^ (v > s * p && s * t > v)) { var y = o[1] * Ca; y > g && (g = y) } else if (v = (v + 360) % 360 - 180, d ^ (v > s * p && s * t > v)) { var y = -o[1] * Ca; f > y && (f = y) } else f > e && (f = e), e > g && (g = e); d ? p > t ? a(l, t) > a(l, h) && (h = t) : a(t, h) > a(l, h) && (l = t) : h >= l ? (l > t && (l = t), t > h && (h = t)) : t > p ? a(l, t) > a(l, h) && (h = t) : a(t, h) > a(l, h) && (l = t) } else n(t, e); m = r, p = t } function e() { _.point = t } function r() { M[0] = l, M[1] = h, _.point = n, m = null } function u(n, e) { if (m) { var r = n - p; y += ua(r) > 180 ? r + (r > 0 ? 360 : -360) : r } else v = n, d = e; fc.point(n, e), t(n, e) } function i() { fc.lineStart() } function o() { u(v, d), fc.lineEnd(), ua(y) > ka && (l = -(h = 180)), M[0] = l, M[1] = h, m = null } function a(n, t) { return (t -= n) < 0 ? t + 360 : t } function c(n, t) { return n[0] - t[0] } function s(n, t) { return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n } var l, f, h, g, p, v, d, m, y, x, M, _ = { point: n, lineStart: e, lineEnd: r, polygonStart: function () { _.point = u, _.lineStart = i, _.lineEnd = o, y = 0, fc.polygonStart() }, polygonEnd: function () { fc.polygonEnd(), _.point = n, _.lineStart = e, _.lineEnd = r, 0 > lc ? (l = -(h = 180), f = -(g = 90)) : y > ka ? g = 90 : -ka > y && (f = -90), M[0] = l, M[1] = h } }; return function (n) {
            g = h = -(l = f = 1 / 0), x = [], Zo.geo.stream(n, _); var t = x.length; if (t) {
                x.sort(c); for (var e, r = 1, u = x[0], i = [u]; t > r; ++r) e = x[r], s(e[0], u) || s(e[1], u) ? (a(u[0], e[1]) > a(u[0], u[1]) && (u[1] = e[1]), a(e[0], u[1]) > a(u[0], u[1]) && (u[0] = e[0])) : i.push(u = e);
                for (var o, e, p = -1 / 0, t = i.length - 1, r = 0, u = i[t]; t >= r; u = e, ++r) e = i[r], (o = a(u[1], e[0])) > p && (p = o, l = e[0], h = u[1])
            } return x = M = null, 1 / 0 === l || 1 / 0 === f ? [[0 / 0, 0 / 0], [0 / 0, 0 / 0]] : [[l, f], [h, g]]
        }
    }(), Zo.geo.centroid = function (n) { hc = gc = pc = vc = dc = mc = yc = xc = Mc = _c = bc = 0, Zo.geo.stream(n, wc); var t = Mc, e = _c, r = bc, u = t * t + e * e + r * r; return Ea > u && (t = mc, e = yc, r = xc, ka > gc && (t = pc, e = vc, r = dc), u = t * t + e * e + r * r, Ea > u) ? [0 / 0, 0 / 0] : [Math.atan2(e, t) * Ca, G(r / Math.sqrt(u)) * Ca] }; var hc, gc, pc, vc, dc, mc, yc, xc, Mc, _c, bc, wc = { sphere: v, point: ye, lineStart: Me, lineEnd: _e, polygonStart: function () { wc.lineStart = be }, polygonEnd: function () { wc.lineStart = Me } }, Sc = Ae(we, Te, Re, [-ba, -ba / 2]), kc = 1e9; Zo.geo.clipExtent = function () { var n, t, e, r, u, i, o = { stream: function (n) { return u && (u.valid = !1), u = i(n), u.valid = !0, u }, extent: function (a) { return arguments.length ? (i = Ue(n = +a[0][0], t = +a[0][1], e = +a[1][0], r = +a[1][1]), u && (u.valid = !1, u = null), o) : [[n, t], [e, r]] } }; return o.extent([[0, 0], [960, 500]]) }, (Zo.geo.conicEqualArea = function () { return He(Fe) }).raw = Fe, Zo.geo.albers = function () { return Zo.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070) }, Zo.geo.albersUsa = function () { function n(n) { var i = n[0], o = n[1]; return t = null, e(i, o), t || (r(i, o), t) || u(i, o), t } var t, e, r, u, i = Zo.geo.albers(), o = Zo.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), a = Zo.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), c = { point: function (n, e) { t = [n, e] } }; return n.invert = function (n) { var t = i.scale(), e = i.translate(), r = (n[0] - e[0]) / t, u = (n[1] - e[1]) / t; return (u >= .12 && .234 > u && r >= -.425 && -.214 > r ? o : u >= .166 && .234 > u && r >= -.214 && -.115 > r ? a : i).invert(n) }, n.stream = function (n) { var t = i.stream(n), e = o.stream(n), r = a.stream(n); return { point: function (n, u) { t.point(n, u), e.point(n, u), r.point(n, u) }, sphere: function () { t.sphere(), e.sphere(), r.sphere() }, lineStart: function () { t.lineStart(), e.lineStart(), r.lineStart() }, lineEnd: function () { t.lineEnd(), e.lineEnd(), r.lineEnd() }, polygonStart: function () { t.polygonStart(), e.polygonStart(), r.polygonStart() }, polygonEnd: function () { t.polygonEnd(), e.polygonEnd(), r.polygonEnd() } } }, n.precision = function (t) { return arguments.length ? (i.precision(t), o.precision(t), a.precision(t), n) : i.precision() }, n.scale = function (t) { return arguments.length ? (i.scale(t), o.scale(.35 * t), a.scale(t), n.translate(i.translate())) : i.scale() }, n.translate = function (t) { if (!arguments.length) return i.translate(); var s = i.scale(), l = +t[0], f = +t[1]; return e = i.translate(t).clipExtent([[l - .455 * s, f - .238 * s], [l + .455 * s, f + .238 * s]]).stream(c).point, r = o.translate([l - .307 * s, f + .201 * s]).clipExtent([[l - .425 * s + ka, f + .12 * s + ka], [l - .214 * s - ka, f + .234 * s - ka]]).stream(c).point, u = a.translate([l - .205 * s, f + .212 * s]).clipExtent([[l - .214 * s + ka, f + .166 * s + ka], [l - .115 * s - ka, f + .234 * s - ka]]).stream(c).point, n }, n.scale(1070) }; var Ec, Ac, Cc, Nc, zc, Lc, Tc = { point: v, lineStart: v, lineEnd: v, polygonStart: function () { Ac = 0, Tc.lineStart = Oe }, polygonEnd: function () { Tc.lineStart = Tc.lineEnd = Tc.point = v, Ec += ua(Ac / 2) } }, qc = { point: Ye, lineStart: v, lineEnd: v, polygonStart: v, polygonEnd: v }, Rc = { point: Ve, lineStart: Xe, lineEnd: $e, polygonStart: function () { Rc.lineStart = Be }, polygonEnd: function () { Rc.point = Ve, Rc.lineStart = Xe, Rc.lineEnd = $e } }; Zo.geo.path = function () { function n(n) { return n && ("function" == typeof a && i.pointRadius(+a.apply(this, arguments)), o && o.valid || (o = u(i)), Zo.geo.stream(n, o)), i.result() } function t() { return o = null, n } var e, r, u, i, o, a = 4.5; return n.area = function (n) { return Ec = 0, Zo.geo.stream(n, u(Tc)), Ec }, n.centroid = function (n) { return pc = vc = dc = mc = yc = xc = Mc = _c = bc = 0, Zo.geo.stream(n, u(Rc)), bc ? [Mc / bc, _c / bc] : xc ? [mc / xc, yc / xc] : dc ? [pc / dc, vc / dc] : [0 / 0, 0 / 0] }, n.bounds = function (n) { return zc = Lc = -(Cc = Nc = 1 / 0), Zo.geo.stream(n, u(qc)), [[Cc, Nc], [zc, Lc]] }, n.projection = function (n) { return arguments.length ? (u = (e = n) ? n.stream || Ge(n) : wt, t()) : e }, n.context = function (n) { return arguments.length ? (i = null == (r = n) ? new Ie : new We(n), "function" != typeof a && i.pointRadius(a), t()) : r }, n.pointRadius = function (t) { return arguments.length ? (a = "function" == typeof t ? t : (i.pointRadius(+t), +t), n) : a }, n.projection(Zo.geo.albersUsa()).context(null) }, Zo.geo.transform = function (n) { return { stream: function (t) { var e = new Ke(t); for (var r in n) e[r] = n[r]; return e } } }, Ke.prototype = { point: function (n, t) { this.stream.point(n, t) }, sphere: function () { this.stream.sphere() }, lineStart: function () { this.stream.lineStart() }, lineEnd: function () { this.stream.lineEnd() }, polygonStart: function () { this.stream.polygonStart() }, polygonEnd: function () { this.stream.polygonEnd() } }, Zo.geo.projection = nr, Zo.geo.projectionMutator = tr, (Zo.geo.equirectangular = function () { return nr(rr) }).raw = rr.invert = rr, Zo.geo.rotation = function (n) { function t(t) { return t = n(t[0] * Aa, t[1] * Aa), t[0] *= Ca, t[1] *= Ca, t } return n = ir(n[0] % 360 * Aa, n[1] * Aa, n.length > 2 ? n[2] * Aa : 0), t.invert = function (t) { return t = n.invert(t[0] * Aa, t[1] * Aa), t[0] *= Ca, t[1] *= Ca, t }, t }, ur.invert = rr, Zo.geo.circle = function () { function n() { var n = "function" == typeof r ? r.apply(this, arguments) : r, t = ir(-n[0] * Aa, -n[1] * Aa, 0).invert, u = []; return e(null, null, 1, { point: function (n, e) { u.push(n = t(n, e)), n[0] *= Ca, n[1] *= Ca } }), { type: "Polygon", coordinates: [u] } } var t, e, r = [0, 0], u = 6; return n.origin = function (t) { return arguments.length ? (r = t, n) : r }, n.angle = function (r) { return arguments.length ? (e = sr((t = +r) * Aa, u * Aa), n) : t }, n.precision = function (r) { return arguments.length ? (e = sr(t * Aa, (u = +r) * Aa), n) : u }, n.angle(90) }, Zo.geo.distance = function (n, t) { var e, r = (t[0] - n[0]) * Aa, u = n[1] * Aa, i = t[1] * Aa, o = Math.sin(r), a = Math.cos(r), c = Math.sin(u), s = Math.cos(u), l = Math.sin(i), f = Math.cos(i); return Math.atan2(Math.sqrt((e = f * o) * e + (e = s * l - c * f * a) * e), c * l + s * f * a) }, Zo.geo.graticule = function () { function n() { return { type: "MultiLineString", coordinates: t() } } function t() { return Zo.range(Math.ceil(i / d) * d, u, d).map(h).concat(Zo.range(Math.ceil(s / m) * m, c, m).map(g)).concat(Zo.range(Math.ceil(r / p) * p, e, p).filter(function (n) { return ua(n % d) > ka }).map(l)).concat(Zo.range(Math.ceil(a / v) * v, o, v).filter(function (n) { return ua(n % m) > ka }).map(f)) } var e, r, u, i, o, a, c, s, l, f, h, g, p = 10, v = p, d = 90, m = 360, y = 2.5; return n.lines = function () { return t().map(function (n) { return { type: "LineString", coordinates: n } }) }, n.outline = function () { return { type: "Polygon", coordinates: [h(i).concat(g(c).slice(1), h(u).reverse().slice(1), g(s).reverse().slice(1))] } }, n.extent = function (t) { return arguments.length ? n.majorExtent(t).minorExtent(t) : n.minorExtent() }, n.majorExtent = function (t) { return arguments.length ? (i = +t[0][0], u = +t[1][0], s = +t[0][1], c = +t[1][1], i > u && (t = i, i = u, u = t), s > c && (t = s, s = c, c = t), n.precision(y)) : [[i, s], [u, c]] }, n.minorExtent = function (t) { return arguments.length ? (r = +t[0][0], e = +t[1][0], a = +t[0][1], o = +t[1][1], r > e && (t = r, r = e, e = t), a > o && (t = a, a = o, o = t), n.precision(y)) : [[r, a], [e, o]] }, n.step = function (t) { return arguments.length ? n.majorStep(t).minorStep(t) : n.minorStep() }, n.majorStep = function (t) { return arguments.length ? (d = +t[0], m = +t[1], n) : [d, m] }, n.minorStep = function (t) { return arguments.length ? (p = +t[0], v = +t[1], n) : [p, v] }, n.precision = function (t) { return arguments.length ? (y = +t, l = fr(a, o, 90), f = hr(r, e, y), h = fr(s, c, 90), g = hr(i, u, y), n) : y }, n.majorExtent([[-180, -90 + ka], [180, 90 - ka]]).minorExtent([[-180, -80 - ka], [180, 80 + ka]]) }, Zo.geo.greatArc = function () { function n() { return { type: "LineString", coordinates: [t || r.apply(this, arguments), e || u.apply(this, arguments)] } } var t, e, r = gr, u = pr; return n.distance = function () { return Zo.geo.distance(t || r.apply(this, arguments), e || u.apply(this, arguments)) }, n.source = function (e) { return arguments.length ? (r = e, t = "function" == typeof e ? null : e, n) : r }, n.target = function (t) { return arguments.length ? (u = t, e = "function" == typeof t ? null : t, n) : u }, n.precision = function () { return arguments.length ? n : 0 }, n }, Zo.geo.interpolate = function (n, t) { return vr(n[0] * Aa, n[1] * Aa, t[0] * Aa, t[1] * Aa) }, Zo.geo.length = function (n) { return Dc = 0, Zo.geo.stream(n, Pc), Dc }; var Dc, Pc = { sphere: v, point: v, lineStart: dr, lineEnd: v, polygonStart: v, polygonEnd: v }, Uc = mr(function (n) { return Math.sqrt(2 / (1 + n)) }, function (n) { return 2 * Math.asin(n / 2) }); (Zo.geo.azimuthalEqualArea = function () { return nr(Uc) }).raw = Uc; var jc = mr(function (n) { var t = Math.acos(n); return t && t / Math.sin(t) }, wt); (Zo.geo.azimuthalEquidistant = function () { return nr(jc) }).raw = jc, (Zo.geo.conicConformal = function () { return He(yr) }).raw = yr, (Zo.geo.conicEquidistant = function () { return He(xr) }).raw = xr; var Hc = mr(function (n) { return 1 / n }, Math.atan); (Zo.geo.gnomonic = function () { return nr(Hc) }).raw = Hc, Mr.invert = function (n, t) { return [n, 2 * Math.atan(Math.exp(t)) - Sa] }, (Zo.geo.mercator = function () { return _r(Mr) }).raw = Mr; var Fc = mr(function () { return 1 }, Math.asin); (Zo.geo.orthographic = function () { return nr(Fc) }).raw = Fc; var Oc = mr(function (n) { return 1 / (1 + n) }, function (n) { return 2 * Math.atan(n) }); (Zo.geo.stereographic = function () { return nr(Oc) }).raw = Oc, br.invert = function (n, t) { return [-t, 2 * Math.atan(Math.exp(n)) - Sa] }, (Zo.geo.transverseMercator = function () { var n = _r(br), t = n.center, e = n.rotate; return n.center = function (n) { return n ? t([-n[1], n[0]]) : (n = t(), [-n[1], n[0]]) }, n.rotate = function (n) { return n ? e([n[0], n[1], n.length > 2 ? n[2] + 90 : 90]) : (n = e(), [n[0], n[1], n[2] - 90]) }, n.rotate([0, 0]) }).raw = br, Zo.geom = {}, Zo.geom.hull = function (n) { function t(n) { if (n.length < 3) return []; var t, u = bt(e), i = bt(r), o = n.length, a = [], c = []; for (t = 0; o > t; t++) a.push([+u.call(this, n[t], t), +i.call(this, n[t], t), t]); for (a.sort(Er), t = 0; o > t; t++) c.push([a[t][0], -a[t][1]]); var s = kr(a), l = kr(c), f = l[0] === s[0], h = l[l.length - 1] === s[s.length - 1], g = []; for (t = s.length - 1; t >= 0; --t) g.push(n[a[s[t]][2]]); for (t = +f; t < l.length - h; ++t) g.push(n[a[l[t]][2]]); return g } var e = wr, r = Sr; return arguments.length ? t(n) : (t.x = function (n) { return arguments.length ? (e = n, t) : e }, t.y = function (n) { return arguments.length ? (r = n, t) : r }, t) }, Zo.geom.polygon = function (n) { return sa(n, Yc), n }; var Yc = Zo.geom.polygon.prototype = []; Yc.area = function () { for (var n, t = -1, e = this.length, r = this[e - 1], u = 0; ++t < e;) n = r, r = this[t], u += n[1] * r[0] - n[0] * r[1]; return .5 * u }, Yc.centroid = function (n) { var t, e, r = -1, u = this.length, i = 0, o = 0, a = this[u - 1]; for (arguments.length || (n = -1 / (6 * this.area())) ; ++r < u;) t = a, a = this[r], e = t[0] * a[1] - a[0] * t[1], i += (t[0] + a[0]) * e, o += (t[1] + a[1]) * e; return [i * n, o * n] }, Yc.clip = function (n) { for (var t, e, r, u, i, o, a = Nr(n), c = -1, s = this.length - Nr(this), l = this[s - 1]; ++c < s;) { for (t = n.slice(), n.length = 0, u = this[c], i = t[(r = t.length - a) - 1], e = -1; ++e < r;) o = t[e], Ar(o, l, u) ? (Ar(i, l, u) || n.push(Cr(i, o, l, u)), n.push(o)) : Ar(i, l, u) && n.push(Cr(i, o, l, u)), i = o; a && n.push(n[0]), l = u } return n }; var Ic, Zc, Vc, Xc, $c, Bc = [], Wc = []; Ur.prototype.prepare = function () { for (var n, t = this.edges, e = t.length; e--;) n = t[e].edge, n.b && n.a || t.splice(e, 1); return t.sort(Hr), t.length }, Wr.prototype = { start: function () { return this.edge.l === this.site ? this.edge.a : this.edge.b }, end: function () { return this.edge.l === this.site ? this.edge.b : this.edge.a } }, Jr.prototype = { insert: function (n, t) { var e, r, u; if (n) { if (t.P = n, t.N = n.N, n.N && (n.N.P = t), n.N = t, n.R) { for (n = n.R; n.L;) n = n.L; n.L = t } else n.R = t; e = n } else this._ ? (n = nu(this._), t.P = null, t.N = n, n.P = n.L = t, e = n) : (t.P = t.N = null, this._ = t, e = null); for (t.L = t.R = null, t.U = e, t.C = !0, n = t; e && e.C;) r = e.U, e === r.L ? (u = r.R, u && u.C ? (e.C = u.C = !1, r.C = !0, n = r) : (n === e.R && (Kr(this, e), n = e, e = n.U), e.C = !1, r.C = !0, Qr(this, r))) : (u = r.L, u && u.C ? (e.C = u.C = !1, r.C = !0, n = r) : (n === e.L && (Qr(this, e), n = e, e = n.U), e.C = !1, r.C = !0, Kr(this, r))), e = n.U; this._.C = !1 }, remove: function (n) { n.N && (n.N.P = n.P), n.P && (n.P.N = n.N), n.N = n.P = null; var t, e, r, u = n.U, i = n.L, o = n.R; if (e = i ? o ? nu(o) : i : o, u ? u.L === n ? u.L = e : u.R = e : this._ = e, i && o ? (r = e.C, e.C = n.C, e.L = i, i.U = e, e !== o ? (u = e.U, e.U = n.U, n = e.R, u.L = n, e.R = o, o.U = e) : (e.U = u, u = e, n = e.R)) : (r = n.C, n = e), n && (n.U = u), !r) { if (n && n.C) return n.C = !1, void 0; do { if (n === this._) break; if (n === u.L) { if (t = u.R, t.C && (t.C = !1, u.C = !0, Kr(this, u), t = u.R), t.L && t.L.C || t.R && t.R.C) { t.R && t.R.C || (t.L.C = !1, t.C = !0, Qr(this, t), t = u.R), t.C = u.C, u.C = t.R.C = !1, Kr(this, u), n = this._; break } } else if (t = u.L, t.C && (t.C = !1, u.C = !0, Qr(this, u), t = u.L), t.L && t.L.C || t.R && t.R.C) { t.L && t.L.C || (t.R.C = !1, t.C = !0, Kr(this, t), t = u.L), t.C = u.C, u.C = t.L.C = !1, Qr(this, u), n = this._; break } t.C = !0, n = u, u = u.U } while (!n.C); n && (n.C = !1) } } }, Zo.geom.voronoi = function (n) { function t(n) { var t = new Array(n.length), r = a[0][0], u = a[0][1], i = a[1][0], o = a[1][1]; return tu(e(n), a).cells.forEach(function (e, a) { var c = e.edges, s = e.site, l = t[a] = c.length ? c.map(function (n) { var t = n.start(); return [t.x, t.y] }) : s.x >= r && s.x <= i && s.y >= u && s.y <= o ? [[r, o], [i, o], [i, u], [r, u]] : []; l.point = n[a] }), t } function e(n) { return n.map(function (n, t) { return { x: Math.round(i(n, t) / ka) * ka, y: Math.round(o(n, t) / ka) * ka, i: t } }) } var r = wr, u = Sr, i = r, o = u, a = Jc; return n ? t(n) : (t.links = function (n) { return tu(e(n)).edges.filter(function (n) { return n.l && n.r }).map(function (t) { return { source: n[t.l.i], target: n[t.r.i] } }) }, t.triangles = function (n) { var t = []; return tu(e(n)).cells.forEach(function (e, r) { for (var u, i, o = e.site, a = e.edges.sort(Hr), c = -1, s = a.length, l = a[s - 1].edge, f = l.l === o ? l.r : l.l; ++c < s;) u = l, i = f, l = a[c].edge, f = l.l === o ? l.r : l.l, r < i.i && r < f.i && ru(o, i, f) < 0 && t.push([n[r], n[i.i], n[f.i]]) }), t }, t.x = function (n) { return arguments.length ? (i = bt(r = n), t) : r }, t.y = function (n) { return arguments.length ? (o = bt(u = n), t) : u }, t.clipExtent = function (n) { return arguments.length ? (a = null == n ? Jc : n, t) : a === Jc ? null : a }, t.size = function (n) { return arguments.length ? t.clipExtent(n && [[0, 0], n]) : a === Jc ? null : a && a[1] }, t) }; var Jc = [[-1e6, -1e6], [1e6, 1e6]]; Zo.geom.delaunay = function (n) { return Zo.geom.voronoi().triangles(n) }, Zo.geom.quadtree = function (n, t, e, r, u) { function i(n) { function i(n, t, e, r, u, i, o, a) { if (!isNaN(e) && !isNaN(r)) if (n.leaf) { var c = n.x, l = n.y; if (null != c) if (ua(c - e) + ua(l - r) < .01) s(n, t, e, r, u, i, o, a); else { var f = n.point; n.x = n.y = n.point = null, s(n, f, c, l, u, i, o, a), s(n, t, e, r, u, i, o, a) } else n.x = e, n.y = r, n.point = t } else s(n, t, e, r, u, i, o, a) } function s(n, t, e, r, u, o, a, c) { var s = .5 * (u + a), l = .5 * (o + c), f = e >= s, h = r >= l, g = (h << 1) + f; n.leaf = !1, n = n.nodes[g] || (n.nodes[g] = ou()), f ? u = s : a = s, h ? o = l : c = l, i(n, t, e, r, u, o, a, c) } var l, f, h, g, p, v, d, m, y, x = bt(a), M = bt(c); if (null != t) v = t, d = e, m = r, y = u; else if (m = y = -(v = d = 1 / 0), f = [], h = [], p = n.length, o) for (g = 0; p > g; ++g) l = n[g], l.x < v && (v = l.x), l.y < d && (d = l.y), l.x > m && (m = l.x), l.y > y && (y = l.y), f.push(l.x), h.push(l.y); else for (g = 0; p > g; ++g) { var _ = +x(l = n[g], g), b = +M(l, g); v > _ && (v = _), d > b && (d = b), _ > m && (m = _), b > y && (y = b), f.push(_), h.push(b) } var w = m - v, S = y - d; w > S ? y = d + w : m = v + S; var k = ou(); if (k.add = function (n) { i(k, n, +x(n, ++g), +M(n, g), v, d, m, y) }, k.visit = function (n) { au(n, k, v, d, m, y) }, g = -1, null == t) { for (; ++g < p;) i(k, n[g], f[g], h[g], v, d, m, y); --g } else n.forEach(k.add); return f = h = n = l = null, k } var o, a = wr, c = Sr; return (o = arguments.length) ? (a = uu, c = iu, 3 === o && (u = e, r = t, e = t = 0), i(n)) : (i.x = function (n) { return arguments.length ? (a = n, i) : a }, i.y = function (n) { return arguments.length ? (c = n, i) : c }, i.extent = function (n) { return arguments.length ? (null == n ? t = e = r = u = null : (t = +n[0][0], e = +n[0][1], r = +n[1][0], u = +n[1][1]), i) : null == t ? null : [[t, e], [r, u]] }, i.size = function (n) { return arguments.length ? (null == n ? t = e = r = u = null : (t = e = 0, r = +n[0], u = +n[1]), i) : null == t ? null : [r - t, u - e] }, i) }, Zo.interpolateRgb = cu, Zo.interpolateObject = su, Zo.interpolateNumber = lu, Zo.interpolateString = fu; var Gc = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Kc = new RegExp(Gc.source, "g"); Zo.interpolate = hu, Zo.interpolators = [function (n, t) { var e = typeof t; return ("string" === e ? Ia.has(t) || /^(#|rgb\(|hsl\()/.test(t) ? cu : fu : t instanceof et ? cu : Array.isArray(t) ? gu : "object" === e && isNaN(t) ? su : lu)(n, t) }], Zo.interpolateArray = gu; var Qc = function () { return wt }, ns = Zo.map({ linear: Qc, poly: Mu, quad: function () { return mu }, cubic: function () { return yu }, sin: function () { return _u }, exp: function () { return bu }, circle: function () { return wu }, elastic: Su, back: ku, bounce: function () { return Eu } }), ts = Zo.map({ "in": wt, out: vu, "in-out": du, "out-in": function (n) { return du(vu(n)) } }); Zo.ease = function (n) { var t = n.indexOf("-"), e = t >= 0 ? n.substring(0, t) : n, r = t >= 0 ? n.substring(t + 1) : "in"; return e = ns.get(e) || Qc, r = ts.get(r) || wt, pu(r(e.apply(null, Vo.call(arguments, 1)))) }, Zo.interpolateHcl = Au, Zo.interpolateHsl = Cu, Zo.interpolateLab = Nu, Zo.interpolateRound = zu, Zo.transform = function (n) { var t = $o.createElementNS(Zo.ns.prefix.svg, "g"); return (Zo.transform = function (n) { if (null != n) { t.setAttribute("transform", n); var e = t.transform.baseVal.consolidate() } return new Lu(e ? e.matrix : es) })(n) }, Lu.prototype.toString = function () { return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")" }; var es = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }; Zo.interpolateTransform = Du, Zo.layout = {}, Zo.layout.bundle = function () { return function (n) { for (var t = [], e = -1, r = n.length; ++e < r;) t.push(ju(n[e])); return t } }, Zo.layout.chord = function () { function n() { var n, s, f, h, g, p = {}, v = [], d = Zo.range(i), m = []; for (e = [], r = [], n = 0, h = -1; ++h < i;) { for (s = 0, g = -1; ++g < i;) s += u[h][g]; v.push(s), m.push(Zo.range(i)), n += s } for (o && d.sort(function (n, t) { return o(v[n], v[t]) }), a && m.forEach(function (n, t) { n.sort(function (n, e) { return a(u[t][n], u[t][e]) }) }), n = (wa - l * i) / n, s = 0, h = -1; ++h < i;) { for (f = s, g = -1; ++g < i;) { var y = d[h], x = m[y][g], M = u[y][x], _ = s, b = s += M * n; p[y + "-" + x] = { index: y, subindex: x, startAngle: _, endAngle: b, value: M } } r[y] = { index: y, startAngle: f, endAngle: s, value: (s - f) / n }, s += l } for (h = -1; ++h < i;) for (g = h - 1; ++g < i;) { var w = p[h + "-" + g], S = p[g + "-" + h]; (w.value || S.value) && e.push(w.value < S.value ? { source: S, target: w } : { source: w, target: S }) } c && t() } function t() { e.sort(function (n, t) { return c((n.source.value + n.target.value) / 2, (t.source.value + t.target.value) / 2) }) } var e, r, u, i, o, a, c, s = {}, l = 0; return s.matrix = function (n) { return arguments.length ? (i = (u = n) && u.length, e = r = null, s) : u }, s.padding = function (n) { return arguments.length ? (l = n, e = r = null, s) : l }, s.sortGroups = function (n) { return arguments.length ? (o = n, e = r = null, s) : o }, s.sortSubgroups = function (n) { return arguments.length ? (a = n, e = null, s) : a }, s.sortChords = function (n) { return arguments.length ? (c = n, e && t(), s) : c }, s.chords = function () { return e || n(), e }, s.groups = function () { return r || n(), r }, s }, Zo.layout.force = function () { function n(n) { return function (t, e, r, u) { if (t.point !== n) { var i = t.cx - n.x, o = t.cy - n.y, a = u - e, c = i * i + o * o; if (c > a * a / d) { if (p > c) { var s = t.charge / c; n.px -= i * s, n.py -= o * s } return !0 } if (t.point && c && p > c) { var s = t.pointCharge / c; n.px -= i * s, n.py -= o * s } } return !t.charge } } function t(n) { n.px = Zo.event.x, n.py = Zo.event.y, a.resume() } var e, r, u, i, o, a = {}, c = Zo.dispatch("start", "tick", "end"), s = [1, 1], l = .9, f = rs, h = us, g = -30, p = is, v = .1, d = .64, m = [], y = []; return a.tick = function () { if ((r *= .99) < .005) return c.end({ type: "end", alpha: r = 0 }), !0; var t, e, a, f, h, p, d, x, M, _ = m.length, b = y.length; for (e = 0; b > e; ++e) a = y[e], f = a.source, h = a.target, x = h.x - f.x, M = h.y - f.y, (p = x * x + M * M) && (p = r * i[e] * ((p = Math.sqrt(p)) - u[e]) / p, x *= p, M *= p, h.x -= x * (d = f.weight / (h.weight + f.weight)), h.y -= M * d, f.x += x * (d = 1 - d), f.y += M * d); if ((d = r * v) && (x = s[0] / 2, M = s[1] / 2, e = -1, d)) for (; ++e < _;) a = m[e], a.x += (x - a.x) * d, a.y += (M - a.y) * d; if (g) for (Vu(t = Zo.geom.quadtree(m), r, o), e = -1; ++e < _;) (a = m[e]).fixed || t.visit(n(a)); for (e = -1; ++e < _;) a = m[e], a.fixed ? (a.x = a.px, a.y = a.py) : (a.x -= (a.px - (a.px = a.x)) * l, a.y -= (a.py - (a.py = a.y)) * l); c.tick({ type: "tick", alpha: r }) }, a.nodes = function (n) { return arguments.length ? (m = n, a) : m }, a.links = function (n) { return arguments.length ? (y = n, a) : y }, a.size = function (n) { return arguments.length ? (s = n, a) : s }, a.linkDistance = function (n) { return arguments.length ? (f = "function" == typeof n ? n : +n, a) : f }, a.distance = a.linkDistance, a.linkStrength = function (n) { return arguments.length ? (h = "function" == typeof n ? n : +n, a) : h }, a.friction = function (n) { return arguments.length ? (l = +n, a) : l }, a.charge = function (n) { return arguments.length ? (g = "function" == typeof n ? n : +n, a) : g }, a.chargeDistance = function (n) { return arguments.length ? (p = n * n, a) : Math.sqrt(p) }, a.gravity = function (n) { return arguments.length ? (v = +n, a) : v }, a.theta = function (n) { return arguments.length ? (d = n * n, a) : Math.sqrt(d) }, a.alpha = function (n) { return arguments.length ? (n = +n, r ? r = n > 0 ? n : 0 : n > 0 && (c.start({ type: "start", alpha: r = n }), Zo.timer(a.tick)), a) : r }, a.start = function () { function n(n, r) { if (!e) { for (e = new Array(c), a = 0; c > a; ++a) e[a] = []; for (a = 0; s > a; ++a) { var u = y[a]; e[u.source.index].push(u.target), e[u.target.index].push(u.source) } } for (var i, o = e[t], a = -1, s = o.length; ++a < s;) if (!isNaN(i = o[a][n])) return i; return Math.random() * r } var t, e, r, c = m.length, l = y.length, p = s[0], v = s[1]; for (t = 0; c > t; ++t) (r = m[t]).index = t, r.weight = 0; for (t = 0; l > t; ++t) r = y[t], "number" == typeof r.source && (r.source = m[r.source]), "number" == typeof r.target && (r.target = m[r.target]), ++r.source.weight, ++r.target.weight; for (t = 0; c > t; ++t) r = m[t], isNaN(r.x) && (r.x = n("x", p)), isNaN(r.y) && (r.y = n("y", v)), isNaN(r.px) && (r.px = r.x), isNaN(r.py) && (r.py = r.y); if (u = [], "function" == typeof f) for (t = 0; l > t; ++t) u[t] = +f.call(this, y[t], t); else for (t = 0; l > t; ++t) u[t] = f; if (i = [], "function" == typeof h) for (t = 0; l > t; ++t) i[t] = +h.call(this, y[t], t); else for (t = 0; l > t; ++t) i[t] = h; if (o = [], "function" == typeof g) for (t = 0; c > t; ++t) o[t] = +g.call(this, m[t], t); else for (t = 0; c > t; ++t) o[t] = g; return a.resume() }, a.resume = function () { return a.alpha(.1) }, a.stop = function () { return a.alpha(0) }, a.drag = function () { return e || (e = Zo.behavior.drag().origin(wt).on("dragstart.force", Ou).on("drag.force", t).on("dragend.force", Yu)), arguments.length ? (this.on("mouseover.force", Iu).on("mouseout.force", Zu).call(e), void 0) : e }, Zo.rebind(a, c, "on") }; var rs = 20, us = 1, is = 1 / 0; Zo.layout.hierarchy = function () { function n(u) { var i, o = [u], a = []; for (u.depth = 0; null != (i = o.pop()) ;) if (a.push(i), (s = e.call(n, i, i.depth)) && (c = s.length)) { for (var c, s, l; --c >= 0;) o.push(l = s[c]), l.parent = i, l.depth = i.depth + 1; r && (i.value = 0), i.children = s } else r && (i.value = +r.call(n, i, i.depth) || 0), delete i.children; return Bu(u, function (n) { var e, u; t && (e = n.children) && e.sort(t), r && (u = n.parent) && (u.value += n.value) }), a } var t = Gu, e = Wu, r = Ju; return n.sort = function (e) { return arguments.length ? (t = e, n) : t }, n.children = function (t) { return arguments.length ? (e = t, n) : e }, n.value = function (t) { return arguments.length ? (r = t, n) : r }, n.revalue = function (t) { return r && ($u(t, function (n) { n.children && (n.value = 0) }), Bu(t, function (t) { var e; t.children || (t.value = +r.call(n, t, t.depth) || 0), (e = t.parent) && (e.value += t.value) })), t }, n }, Zo.layout.partition = function () { function n(t, e, r, u) { var i = t.children; if (t.x = e, t.y = t.depth * u, t.dx = r, t.dy = u, i && (o = i.length)) { var o, a, c, s = -1; for (r = t.value ? r / t.value : 0; ++s < o;) n(a = i[s], e, c = a.value * r, u), e += c } } function t(n) { var e = n.children, r = 0; if (e && (u = e.length)) for (var u, i = -1; ++i < u;) r = Math.max(r, t(e[i])); return 1 + r } function e(e, i) { var o = r.call(this, e, i); return n(o[0], 0, u[0], u[1] / t(o[0])), o } var r = Zo.layout.hierarchy(), u = [1, 1]; return e.size = function (n) { return arguments.length ? (u = n, e) : u }, Xu(e, r) }, Zo.layout.pie = function () { function n(i) { var o = i.map(function (e, r) { return +t.call(n, e, r) }), a = +("function" == typeof r ? r.apply(this, arguments) : r), c = (("function" == typeof u ? u.apply(this, arguments) : u) - a) / Zo.sum(o), s = Zo.range(i.length); null != e && s.sort(e === os ? function (n, t) { return o[t] - o[n] } : function (n, t) { return e(i[n], i[t]) }); var l = []; return s.forEach(function (n) { var t; l[n] = { data: i[n], value: t = o[n], startAngle: a, endAngle: a += t * c } }), l } var t = Number, e = os, r = 0, u = wa; return n.value = function (e) { return arguments.length ? (t = e, n) : t }, n.sort = function (t) { return arguments.length ? (e = t, n) : e }, n.startAngle = function (t) { return arguments.length ? (r = t, n) : r }, n.endAngle = function (t) { return arguments.length ? (u = t, n) : u }, n }; var os = {}; Zo.layout.stack = function () { function n(a, c) { var s = a.map(function (e, r) { return t.call(n, e, r) }), l = s.map(function (t) { return t.map(function (t, e) { return [i.call(n, t, e), o.call(n, t, e)] }) }), f = e.call(n, l, c); s = Zo.permute(s, f), l = Zo.permute(l, f); var h, g, p, v = r.call(n, l, c), d = s.length, m = s[0].length; for (g = 0; m > g; ++g) for (u.call(n, s[0][g], p = v[g], l[0][g][1]), h = 1; d > h; ++h) u.call(n, s[h][g], p += l[h - 1][g][1], l[h][g][1]); return a } var t = wt, e = ei, r = ri, u = ti, i = Qu, o = ni; return n.values = function (e) { return arguments.length ? (t = e, n) : t }, n.order = function (t) { return arguments.length ? (e = "function" == typeof t ? t : as.get(t) || ei, n) : e }, n.offset = function (t) { return arguments.length ? (r = "function" == typeof t ? t : cs.get(t) || ri, n) : r }, n.x = function (t) { return arguments.length ? (i = t, n) : i }, n.y = function (t) { return arguments.length ? (o = t, n) : o }, n.out = function (t) { return arguments.length ? (u = t, n) : u }, n }; var as = Zo.map({ "inside-out": function (n) { var t, e, r = n.length, u = n.map(ui), i = n.map(ii), o = Zo.range(r).sort(function (n, t) { return u[n] - u[t] }), a = 0, c = 0, s = [], l = []; for (t = 0; r > t; ++t) e = o[t], c > a ? (a += i[e], s.push(e)) : (c += i[e], l.push(e)); return l.reverse().concat(s) }, reverse: function (n) { return Zo.range(n.length).reverse() }, "default": ei }), cs = Zo.map({ silhouette: function (n) { var t, e, r, u = n.length, i = n[0].length, o = [], a = 0, c = []; for (e = 0; i > e; ++e) { for (t = 0, r = 0; u > t; t++) r += n[t][e][1]; r > a && (a = r), o.push(r) } for (e = 0; i > e; ++e) c[e] = (a - o[e]) / 2; return c }, wiggle: function (n) { var t, e, r, u, i, o, a, c, s, l = n.length, f = n[0], h = f.length, g = []; for (g[0] = c = s = 0, e = 1; h > e; ++e) { for (t = 0, u = 0; l > t; ++t) u += n[t][e][1]; for (t = 0, i = 0, a = f[e][0] - f[e - 1][0]; l > t; ++t) { for (r = 0, o = (n[t][e][1] - n[t][e - 1][1]) / (2 * a) ; t > r; ++r) o += (n[r][e][1] - n[r][e - 1][1]) / a; i += o * n[t][e][1] } g[e] = c -= u ? i / u * a : 0, s > c && (s = c) } for (e = 0; h > e; ++e) g[e] -= s; return g }, expand: function (n) { var t, e, r, u = n.length, i = n[0].length, o = 1 / u, a = []; for (e = 0; i > e; ++e) { for (t = 0, r = 0; u > t; t++) r += n[t][e][1]; if (r) for (t = 0; u > t; t++) n[t][e][1] /= r; else for (t = 0; u > t; t++) n[t][e][1] = o } for (e = 0; i > e; ++e) a[e] = 0; return a }, zero: ri }); Zo.layout.histogram = function () { function n(n, i) { for (var o, a, c = [], s = n.map(e, this), l = r.call(this, s, i), f = u.call(this, l, s, i), i = -1, h = s.length, g = f.length - 1, p = t ? 1 : 1 / h; ++i < g;) o = c[i] = [], o.dx = f[i + 1] - (o.x = f[i]), o.y = 0; if (g > 0) for (i = -1; ++i < h;) a = s[i], a >= l[0] && a <= l[1] && (o = c[Zo.bisect(f, a, 1, g) - 1], o.y += p, o.push(n[i])); return c } var t = !0, e = Number, r = si, u = ai; return n.value = function (t) { return arguments.length ? (e = t, n) : e }, n.range = function (t) { return arguments.length ? (r = bt(t), n) : r }, n.bins = function (t) { return arguments.length ? (u = "number" == typeof t ? function (n) { return ci(n, t) } : bt(t), n) : u }, n.frequency = function (e) { return arguments.length ? (t = !!e, n) : t }, n }, Zo.layout.pack = function () { function n(n, i) { var o = e.call(this, n, i), a = o[0], c = u[0], s = u[1], l = null == t ? Math.sqrt : "function" == typeof t ? t : function () { return t }; if (a.x = a.y = 0, Bu(a, function (n) { n.r = +l(n.value) }), Bu(a, pi), r) { var f = r * (t ? 1 : Math.max(2 * a.r / c, 2 * a.r / s)) / 2; Bu(a, function (n) { n.r += f }), Bu(a, pi), Bu(a, function (n) { n.r -= f }) } return mi(a, c / 2, s / 2, t ? 1 : 1 / Math.max(2 * a.r / c, 2 * a.r / s)), o } var t, e = Zo.layout.hierarchy().sort(li), r = 0, u = [1, 1]; return n.size = function (t) { return arguments.length ? (u = t, n) : u }, n.radius = function (e) { return arguments.length ? (t = null == e || "function" == typeof e ? e : +e, n) : t }, n.padding = function (t) { return arguments.length ? (r = +t, n) : r }, Xu(n, e) }, Zo.layout.tree = function () { function n(n, u) { var l = o.call(this, n, u), f = l[0], h = t(f); if (Bu(h, e), h.parent.m = -h.z, $u(h, r), s) $u(f, i); else { var g = f, p = f, v = f; $u(f, function (n) { n.x < g.x && (g = n), n.x > p.x && (p = n), n.depth > v.depth && (v = n) }); var d = a(g, p) / 2 - g.x, m = c[0] / (p.x + a(p, g) / 2 + d), y = c[1] / (v.depth || 1); $u(f, function (n) { n.x = (n.x + d) * m, n.y = n.depth * y }) } return l } function t(n) { for (var t, e = { A: null, children: [n] }, r = [e]; null != (t = r.pop()) ;) for (var u, i = t.children, o = 0, a = i.length; a > o; ++o) r.push((i[o] = u = { _: i[o], parent: t, children: (u = i[o].children) && u.slice() || [], A: null, a: null, z: 0, m: 0, c: 0, s: 0, t: null, i: o }).a = u); return e.children[0] } function e(n) { var t = n.children, e = n.parent.children, r = n.i ? e[n.i - 1] : null; if (t.length) { wi(n); var i = (t[0].z + t[t.length - 1].z) / 2; r ? (n.z = r.z + a(n._, r._), n.m = n.z - i) : n.z = i } else r && (n.z = r.z + a(n._, r._)); n.parent.A = u(n, r, n.parent.A || e[0]) } function r(n) { n._.x = n.z + n.parent.m, n.m += n.parent.m } function u(n, t, e) { if (t) { for (var r, u = n, i = n, o = t, c = u.parent.children[0], s = u.m, l = i.m, f = o.m, h = c.m; o = _i(o), u = Mi(u), o && u;) c = Mi(c), i = _i(i), i.a = n, r = o.z + f - u.z - s + a(o._, u._), r > 0 && (bi(Si(o, n, e), n, r), s += r, l += r), f += o.m, s += u.m, h += c.m, l += i.m; o && !_i(i) && (i.t = o, i.m += f - l), u && !Mi(c) && (c.t = u, c.m += s - h, e = n) } return e } function i(n) { n.x *= c[0], n.y = n.depth * c[1] } var o = Zo.layout.hierarchy().sort(null).value(null), a = xi, c = [1, 1], s = null; return n.separation = function (t) { return arguments.length ? (a = t, n) : a }, n.size = function (t) { return arguments.length ? (s = null == (c = t) ? i : null, n) : s ? null : c }, n.nodeSize = function (t) { return arguments.length ? (s = null == (c = t) ? null : i, n) : s ? c : null }, Xu(n, o) }, Zo.layout.cluster = function () { function n(n, i) { var o, a = t.call(this, n, i), c = a[0], s = 0; Bu(c, function (n) { var t = n.children; t && t.length ? (n.x = Ei(t), n.y = ki(t)) : (n.x = o ? s += e(n, o) : 0, n.y = 0, o = n) }); var l = Ai(c), f = Ci(c), h = l.x - e(l, f) / 2, g = f.x + e(f, l) / 2; return Bu(c, u ? function (n) { n.x = (n.x - c.x) * r[0], n.y = (c.y - n.y) * r[1] } : function (n) { n.x = (n.x - h) / (g - h) * r[0], n.y = (1 - (c.y ? n.y / c.y : 1)) * r[1] }), a } var t = Zo.layout.hierarchy().sort(null).value(null), e = xi, r = [1, 1], u = !1; return n.separation = function (t) { return arguments.length ? (e = t, n) : e }, n.size = function (t) { return arguments.length ? (u = null == (r = t), n) : u ? null : r }, n.nodeSize = function (t) { return arguments.length ? (u = null != (r = t), n) : u ? r : null }, Xu(n, t) }, Zo.layout.treemap = function () { function n(n, t) { for (var e, r, u = -1, i = n.length; ++u < i;) r = (e = n[u]).value * (0 > t ? 0 : t), e.area = isNaN(r) || 0 >= r ? 0 : r } function t(e) { var i = e.children; if (i && i.length) { var o, a, c, s = f(e), l = [], h = i.slice(), p = 1 / 0, v = "slice" === g ? s.dx : "dice" === g ? s.dy : "slice-dice" === g ? 1 & e.depth ? s.dy : s.dx : Math.min(s.dx, s.dy); for (n(h, s.dx * s.dy / e.value), l.area = 0; (c = h.length) > 0;) l.push(o = h[c - 1]), l.area += o.area, "squarify" !== g || (a = r(l, v)) <= p ? (h.pop(), p = a) : (l.area -= l.pop().area, u(l, v, s, !1), v = Math.min(s.dx, s.dy), l.length = l.area = 0, p = 1 / 0); l.length && (u(l, v, s, !0), l.length = l.area = 0), i.forEach(t) } } function e(t) { var r = t.children; if (r && r.length) { var i, o = f(t), a = r.slice(), c = []; for (n(a, o.dx * o.dy / t.value), c.area = 0; i = a.pop() ;) c.push(i), c.area += i.area, null != i.z && (u(c, i.z ? o.dx : o.dy, o, !a.length), c.length = c.area = 0); r.forEach(e) } } function r(n, t) { for (var e, r = n.area, u = 0, i = 1 / 0, o = -1, a = n.length; ++o < a;) (e = n[o].area) && (i > e && (i = e), e > u && (u = e)); return r *= r, t *= t, r ? Math.max(t * u * p / r, r / (t * i * p)) : 1 / 0 } function u(n, t, e, r) { var u, i = -1, o = n.length, a = e.x, s = e.y, l = t ? c(n.area / t) : 0; if (t == e.dx) { for ((r || l > e.dy) && (l = e.dy) ; ++i < o;) u = n[i], u.x = a, u.y = s, u.dy = l, a += u.dx = Math.min(e.x + e.dx - a, l ? c(u.area / l) : 0); u.z = !0, u.dx += e.x + e.dx - a, e.y += l, e.dy -= l } else { for ((r || l > e.dx) && (l = e.dx) ; ++i < o;) u = n[i], u.x = a, u.y = s, u.dx = l, s += u.dy = Math.min(e.y + e.dy - s, l ? c(u.area / l) : 0); u.z = !1, u.dy += e.y + e.dy - s, e.x += l, e.dx -= l } } function i(r) { var u = o || a(r), i = u[0]; return i.x = 0, i.y = 0, i.dx = s[0], i.dy = s[1], o && a.revalue(i), n([i], i.dx * i.dy / i.value), (o ? e : t)(i), h && (o = u), u } var o, a = Zo.layout.hierarchy(), c = Math.round, s = [1, 1], l = null, f = Ni, h = !1, g = "squarify", p = .5 * (1 + Math.sqrt(5)); return i.size = function (n) { return arguments.length ? (s = n, i) : s }, i.padding = function (n) { function t(t) { var e = n.call(i, t, t.depth); return null == e ? Ni(t) : zi(t, "number" == typeof e ? [e, e, e, e] : e) } function e(t) { return zi(t, n) } if (!arguments.length) return l; var r; return f = null == (l = n) ? Ni : "function" == (r = typeof n) ? t : "number" === r ? (n = [n, n, n, n], e) : e, i }, i.round = function (n) { return arguments.length ? (c = n ? Math.round : Number, i) : c != Number }, i.sticky = function (n) { return arguments.length ? (h = n, o = null, i) : h }, i.ratio = function (n) { return arguments.length ? (p = n, i) : p }, i.mode = function (n) { return arguments.length ? (g = n + "", i) : g }, Xu(i, a) }, Zo.random = { normal: function (n, t) { var e = arguments.length; return 2 > e && (t = 1), 1 > e && (n = 0), function () { var e, r, u; do e = 2 * Math.random() - 1, r = 2 * Math.random() - 1, u = e * e + r * r; while (!u || u > 1); return n + t * e * Math.sqrt(-2 * Math.log(u) / u) } }, logNormal: function () { var n = Zo.random.normal.apply(Zo, arguments); return function () { return Math.exp(n()) } }, bates: function (n) { var t = Zo.random.irwinHall(n); return function () { return t() / n } }, irwinHall: function (n) { return function () { for (var t = 0, e = 0; n > e; e++) t += Math.random(); return t } } }, Zo.scale = {}; var ss = { floor: wt, ceil: wt }; Zo.scale.linear = function () { return Ui([0, 1], [0, 1], hu, !1) }; var ls = { s: 1, g: 1, p: 1, r: 1, e: 1 }; Zo.scale.log = function () { return Vi(Zo.scale.linear().domain([0, 1]), 10, !0, [1, 10]) }; var fs = Zo.format(".0e"), hs = { floor: function (n) { return -Math.ceil(-n) }, ceil: function (n) { return -Math.floor(-n) } }; Zo.scale.pow = function () { return Xi(Zo.scale.linear(), 1, [0, 1]) }, Zo.scale.sqrt = function () { return Zo.scale.pow().exponent(.5) }, Zo.scale.ordinal = function () { return Bi([], { t: "range", a: [[]] }) }, Zo.scale.category10 = function () { return Zo.scale.ordinal().range(gs) }, Zo.scale.category20 = function () { return Zo.scale.ordinal().range(ps) }, Zo.scale.category20b = function () { return Zo.scale.ordinal().range(vs) }, Zo.scale.category20c = function () { return Zo.scale.ordinal().range(ds) }; var gs = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(vt), ps = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(vt), vs = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(vt), ds = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(vt); Zo.scale.quantile = function () { return Wi([], []) }, Zo.scale.quantize = function () { return Ji(0, 1, [0, 1]) }, Zo.scale.threshold = function () { return Gi([.5], [0, 1]) }, Zo.scale.identity = function () { return Ki([0, 1]) }, Zo.svg = {}, Zo.svg.arc = function () {
        function n() {
            var n = t.apply(this, arguments), i = e.apply(this, arguments), o = r.apply(this, arguments) + ms, a = u.apply(this, arguments) + ms, c = (o > a && (c = o, o = a, a = c), a - o), s = ba > c ? "0" : "1", l = Math.cos(o), f = Math.sin(o), h = Math.cos(a), g = Math.sin(a);
            return c >= ys ? n ? "M0," + i + "A" + i + "," + i + " 0 1,1 0," + -i + "A" + i + "," + i + " 0 1,1 0," + i + "M0," + n + "A" + n + "," + n + " 0 1,0 0," + -n + "A" + n + "," + n + " 0 1,0 0," + n + "Z" : "M0," + i + "A" + i + "," + i + " 0 1,1 0," + -i + "A" + i + "," + i + " 0 1,1 0," + i + "Z" : n ? "M" + i * l + "," + i * f + "A" + i + "," + i + " 0 " + s + ",1 " + i * h + "," + i * g + "L" + n * h + "," + n * g + "A" + n + "," + n + " 0 " + s + ",0 " + n * l + "," + n * f + "Z" : "M" + i * l + "," + i * f + "A" + i + "," + i + " 0 " + s + ",1 " + i * h + "," + i * g + "L0,0" + "Z"
        } var t = Qi, e = no, r = to, u = eo; return n.innerRadius = function (e) { return arguments.length ? (t = bt(e), n) : t }, n.outerRadius = function (t) { return arguments.length ? (e = bt(t), n) : e }, n.startAngle = function (t) { return arguments.length ? (r = bt(t), n) : r }, n.endAngle = function (t) { return arguments.length ? (u = bt(t), n) : u }, n.centroid = function () { var n = (t.apply(this, arguments) + e.apply(this, arguments)) / 2, i = (r.apply(this, arguments) + u.apply(this, arguments)) / 2 + ms; return [Math.cos(i) * n, Math.sin(i) * n] }, n
    }; var ms = -Sa, ys = wa - ka; Zo.svg.line = function () { return ro(wt) }; var xs = Zo.map({ linear: uo, "linear-closed": io, step: oo, "step-before": ao, "step-after": co, basis: po, "basis-open": vo, "basis-closed": mo, bundle: yo, cardinal: fo, "cardinal-open": so, "cardinal-closed": lo, monotone: So }); xs.forEach(function (n, t) { t.key = n, t.closed = /-closed$/.test(n) }); var Ms = [0, 2 / 3, 1 / 3, 0], _s = [0, 1 / 3, 2 / 3, 0], bs = [0, 1 / 6, 2 / 3, 1 / 6]; Zo.svg.line.radial = function () { var n = ro(ko); return n.radius = n.x, delete n.x, n.angle = n.y, delete n.y, n }, ao.reverse = co, co.reverse = ao, Zo.svg.area = function () { return Eo(wt) }, Zo.svg.area.radial = function () { var n = Eo(ko); return n.radius = n.x, delete n.x, n.innerRadius = n.x0, delete n.x0, n.outerRadius = n.x1, delete n.x1, n.angle = n.y, delete n.y, n.startAngle = n.y0, delete n.y0, n.endAngle = n.y1, delete n.y1, n }, Zo.svg.chord = function () { function n(n, a) { var c = t(this, i, n, a), s = t(this, o, n, a); return "M" + c.p0 + r(c.r, c.p1, c.a1 - c.a0) + (e(c, s) ? u(c.r, c.p1, c.r, c.p0) : u(c.r, c.p1, s.r, s.p0) + r(s.r, s.p1, s.a1 - s.a0) + u(s.r, s.p1, c.r, c.p0)) + "Z" } function t(n, t, e, r) { var u = t.call(n, e, r), i = a.call(n, u, r), o = c.call(n, u, r) + ms, l = s.call(n, u, r) + ms; return { r: i, a0: o, a1: l, p0: [i * Math.cos(o), i * Math.sin(o)], p1: [i * Math.cos(l), i * Math.sin(l)] } } function e(n, t) { return n.a0 == t.a0 && n.a1 == t.a1 } function r(n, t, e) { return "A" + n + "," + n + " 0 " + +(e > ba) + ",1 " + t } function u(n, t, e, r) { return "Q 0,0 " + r } var i = gr, o = pr, a = Ao, c = to, s = eo; return n.radius = function (t) { return arguments.length ? (a = bt(t), n) : a }, n.source = function (t) { return arguments.length ? (i = bt(t), n) : i }, n.target = function (t) { return arguments.length ? (o = bt(t), n) : o }, n.startAngle = function (t) { return arguments.length ? (c = bt(t), n) : c }, n.endAngle = function (t) { return arguments.length ? (s = bt(t), n) : s }, n }, Zo.svg.diagonal = function () { function n(n, u) { var i = t.call(this, n, u), o = e.call(this, n, u), a = (i.y + o.y) / 2, c = [i, { x: i.x, y: a }, { x: o.x, y: a }, o]; return c = c.map(r), "M" + c[0] + "C" + c[1] + " " + c[2] + " " + c[3] } var t = gr, e = pr, r = Co; return n.source = function (e) { return arguments.length ? (t = bt(e), n) : t }, n.target = function (t) { return arguments.length ? (e = bt(t), n) : e }, n.projection = function (t) { return arguments.length ? (r = t, n) : r }, n }, Zo.svg.diagonal.radial = function () { var n = Zo.svg.diagonal(), t = Co, e = n.projection; return n.projection = function (n) { return arguments.length ? e(No(t = n)) : t }, n }, Zo.svg.symbol = function () { function n(n, r) { return (ws.get(t.call(this, n, r)) || To)(e.call(this, n, r)) } var t = Lo, e = zo; return n.type = function (e) { return arguments.length ? (t = bt(e), n) : t }, n.size = function (t) { return arguments.length ? (e = bt(t), n) : e }, n }; var ws = Zo.map({ circle: To, cross: function (n) { var t = Math.sqrt(n / 5) / 2; return "M" + -3 * t + "," + -t + "H" + -t + "V" + -3 * t + "H" + t + "V" + -t + "H" + 3 * t + "V" + t + "H" + t + "V" + 3 * t + "H" + -t + "V" + t + "H" + -3 * t + "Z" }, diamond: function (n) { var t = Math.sqrt(n / (2 * As)), e = t * As; return "M0," + -t + "L" + e + ",0" + " 0," + t + " " + -e + ",0" + "Z" }, square: function (n) { var t = Math.sqrt(n) / 2; return "M" + -t + "," + -t + "L" + t + "," + -t + " " + t + "," + t + " " + -t + "," + t + "Z" }, "triangle-down": function (n) { var t = Math.sqrt(n / Es), e = t * Es / 2; return "M0," + e + "L" + t + "," + -e + " " + -t + "," + -e + "Z" }, "triangle-up": function (n) { var t = Math.sqrt(n / Es), e = t * Es / 2; return "M0," + -e + "L" + t + "," + e + " " + -t + "," + e + "Z" } }); Zo.svg.symbolTypes = ws.keys(); var Ss, ks, Es = Math.sqrt(3), As = Math.tan(30 * Aa), Cs = [], Ns = 0; Cs.call = pa.call, Cs.empty = pa.empty, Cs.node = pa.node, Cs.size = pa.size, Zo.transition = function (n) { return arguments.length ? Ss ? n.transition() : n : ma.transition() }, Zo.transition.prototype = Cs, Cs.select = function (n) { var t, e, r, u = this.id, i = []; n = b(n); for (var o = -1, a = this.length; ++o < a;) { i.push(t = []); for (var c = this[o], s = -1, l = c.length; ++s < l;) (r = c[s]) && (e = n.call(r, r.__data__, s, o)) ? ("__data__" in r && (e.__data__ = r.__data__), Po(e, s, u, r.__transition__[u]), t.push(e)) : t.push(null) } return qo(i, u) }, Cs.selectAll = function (n) { var t, e, r, u, i, o = this.id, a = []; n = w(n); for (var c = -1, s = this.length; ++c < s;) for (var l = this[c], f = -1, h = l.length; ++f < h;) if (r = l[f]) { i = r.__transition__[o], e = n.call(r, r.__data__, f, c), a.push(t = []); for (var g = -1, p = e.length; ++g < p;) (u = e[g]) && Po(u, g, o, i), t.push(u) } return qo(a, o) }, Cs.filter = function (n) { var t, e, r, u = []; "function" != typeof n && (n = R(n)); for (var i = 0, o = this.length; o > i; i++) { u.push(t = []); for (var e = this[i], a = 0, c = e.length; c > a; a++) (r = e[a]) && n.call(r, r.__data__, a, i) && t.push(r) } return qo(u, this.id) }, Cs.tween = function (n, t) { var e = this.id; return arguments.length < 2 ? this.node().__transition__[e].tween.get(n) : P(this, null == t ? function (t) { t.__transition__[e].tween.remove(n) } : function (r) { r.__transition__[e].tween.set(n, t) }) }, Cs.attr = function (n, t) { function e() { this.removeAttribute(a) } function r() { this.removeAttributeNS(a.space, a.local) } function u(n) { return null == n ? e : (n += "", function () { var t, e = this.getAttribute(a); return e !== n && (t = o(e, n), function (n) { this.setAttribute(a, t(n)) }) }) } function i(n) { return null == n ? r : (n += "", function () { var t, e = this.getAttributeNS(a.space, a.local); return e !== n && (t = o(e, n), function (n) { this.setAttributeNS(a.space, a.local, t(n)) }) }) } if (arguments.length < 2) { for (t in n) this.attr(t, n[t]); return this } var o = "transform" == n ? Du : hu, a = Zo.ns.qualify(n); return Ro(this, "attr." + n, t, a.local ? i : u) }, Cs.attrTween = function (n, t) { function e(n, e) { var r = t.call(this, n, e, this.getAttribute(u)); return r && function (n) { this.setAttribute(u, r(n)) } } function r(n, e) { var r = t.call(this, n, e, this.getAttributeNS(u.space, u.local)); return r && function (n) { this.setAttributeNS(u.space, u.local, r(n)) } } var u = Zo.ns.qualify(n); return this.tween("attr." + n, u.local ? r : e) }, Cs.style = function (n, t, e) { function r() { this.style.removeProperty(n) } function u(t) { return null == t ? r : (t += "", function () { var r, u = Wo.getComputedStyle(this, null).getPropertyValue(n); return u !== t && (r = hu(u, t), function (t) { this.style.setProperty(n, r(t), e) }) }) } var i = arguments.length; if (3 > i) { if ("string" != typeof n) { 2 > i && (t = ""); for (e in n) this.style(e, n[e], t); return this } e = "" } return Ro(this, "style." + n, t, u) }, Cs.styleTween = function (n, t, e) { function r(r, u) { var i = t.call(this, r, u, Wo.getComputedStyle(this, null).getPropertyValue(n)); return i && function (t) { this.style.setProperty(n, i(t), e) } } return arguments.length < 3 && (e = ""), this.tween("style." + n, r) }, Cs.text = function (n) { return Ro(this, "text", n, Do) }, Cs.remove = function () { return this.each("end.transition", function () { var n; this.__transition__.count < 2 && (n = this.parentNode) && n.removeChild(this) }) }, Cs.ease = function (n) { var t = this.id; return arguments.length < 1 ? this.node().__transition__[t].ease : ("function" != typeof n && (n = Zo.ease.apply(Zo, arguments)), P(this, function (e) { e.__transition__[t].ease = n })) }, Cs.delay = function (n) { var t = this.id; return arguments.length < 1 ? this.node().__transition__[t].delay : P(this, "function" == typeof n ? function (e, r, u) { e.__transition__[t].delay = +n.call(e, e.__data__, r, u) } : (n = +n, function (e) { e.__transition__[t].delay = n })) }, Cs.duration = function (n) { var t = this.id; return arguments.length < 1 ? this.node().__transition__[t].duration : P(this, "function" == typeof n ? function (e, r, u) { e.__transition__[t].duration = Math.max(1, n.call(e, e.__data__, r, u)) } : (n = Math.max(1, n), function (e) { e.__transition__[t].duration = n })) }, Cs.each = function (n, t) { var e = this.id; if (arguments.length < 2) { var r = ks, u = Ss; Ss = e, P(this, function (t, r, u) { ks = t.__transition__[e], n.call(t, t.__data__, r, u) }), ks = r, Ss = u } else P(this, function (r) { var u = r.__transition__[e]; (u.event || (u.event = Zo.dispatch("start", "end"))).on(n, t) }); return this }, Cs.transition = function () { for (var n, t, e, r, u = this.id, i = ++Ns, o = [], a = 0, c = this.length; c > a; a++) { o.push(n = []); for (var t = this[a], s = 0, l = t.length; l > s; s++) (e = t[s]) && (r = Object.create(e.__transition__[u]), r.delay += r.duration, Po(e, s, i, r)), n.push(e) } return qo(o, i) }, Zo.svg.axis = function () { function n(n) { n.each(function () { var n, s = Zo.select(this), l = this.__chart__ || e, f = this.__chart__ = e.copy(), h = null == c ? f.ticks ? f.ticks.apply(f, a) : f.domain() : c, g = null == t ? f.tickFormat ? f.tickFormat.apply(f, a) : wt : t, p = s.selectAll(".tick").data(h, f), v = p.enter().insert("g", ".domain").attr("class", "tick").style("opacity", ka), d = Zo.transition(p.exit()).style("opacity", ka).remove(), m = Zo.transition(p.order()).style("opacity", 1), y = Ti(f), x = s.selectAll(".domain").data([0]), M = (x.enter().append("path").attr("class", "domain"), Zo.transition(x)); v.append("line"), v.append("text"); var _ = v.select("line"), b = m.select("line"), w = p.select("text").text(g), S = v.select("text"), k = m.select("text"); switch (r) { case "bottom": n = Uo, _.attr("y2", u), S.attr("y", Math.max(u, 0) + o), b.attr("x2", 0).attr("y2", u), k.attr("x", 0).attr("y", Math.max(u, 0) + o), w.attr("dy", ".71em").style("text-anchor", "middle"), M.attr("d", "M" + y[0] + "," + i + "V0H" + y[1] + "V" + i); break; case "top": n = Uo, _.attr("y2", -u), S.attr("y", -(Math.max(u, 0) + o)), b.attr("x2", 0).attr("y2", -u), k.attr("x", 0).attr("y", -(Math.max(u, 0) + o)), w.attr("dy", "0em").style("text-anchor", "middle"), M.attr("d", "M" + y[0] + "," + -i + "V0H" + y[1] + "V" + -i); break; case "left": n = jo, _.attr("x2", -u), S.attr("x", -(Math.max(u, 0) + o)), b.attr("x2", -u).attr("y2", 0), k.attr("x", -(Math.max(u, 0) + o)).attr("y", 0), w.attr("dy", ".32em").style("text-anchor", "end"), M.attr("d", "M" + -i + "," + y[0] + "H0V" + y[1] + "H" + -i); break; case "right": n = jo, _.attr("x2", u), S.attr("x", Math.max(u, 0) + o), b.attr("x2", u).attr("y2", 0), k.attr("x", Math.max(u, 0) + o).attr("y", 0), w.attr("dy", ".32em").style("text-anchor", "start"), M.attr("d", "M" + i + "," + y[0] + "H0V" + y[1] + "H" + i) } if (f.rangeBand) { var E = f, A = E.rangeBand() / 2; l = f = function (n) { return E(n) + A } } else l.rangeBand ? l = f : d.call(n, f); v.call(n, l), m.call(n, f) }) } var t, e = Zo.scale.linear(), r = zs, u = 6, i = 6, o = 3, a = [10], c = null; return n.scale = function (t) { return arguments.length ? (e = t, n) : e }, n.orient = function (t) { return arguments.length ? (r = t in Ls ? t + "" : zs, n) : r }, n.ticks = function () { return arguments.length ? (a = arguments, n) : a }, n.tickValues = function (t) { return arguments.length ? (c = t, n) : c }, n.tickFormat = function (e) { return arguments.length ? (t = e, n) : t }, n.tickSize = function (t) { var e = arguments.length; return e ? (u = +t, i = +arguments[e - 1], n) : u }, n.innerTickSize = function (t) { return arguments.length ? (u = +t, n) : u }, n.outerTickSize = function (t) { return arguments.length ? (i = +t, n) : i }, n.tickPadding = function (t) { return arguments.length ? (o = +t, n) : o }, n.tickSubdivide = function () { return arguments.length && n }, n }; var zs = "bottom", Ls = { top: 1, right: 1, bottom: 1, left: 1 }; Zo.svg.brush = function () { function n(i) { i.each(function () { var i = Zo.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", u).on("touchstart.brush", u), o = i.selectAll(".background").data([0]); o.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), i.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move"); var a = i.selectAll(".resize").data(p, wt); a.exit().remove(), a.enter().append("g").attr("class", function (n) { return "resize " + n }).style("cursor", function (n) { return Ts[n] }).append("rect").attr("x", function (n) { return /[ew]$/.test(n) ? -3 : null }).attr("y", function (n) { return /^[ns]/.test(n) ? -3 : null }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), a.style("display", n.empty() ? "none" : null); var l, f = Zo.transition(i), h = Zo.transition(o); c && (l = Ti(c), h.attr("x", l[0]).attr("width", l[1] - l[0]), e(f)), s && (l = Ti(s), h.attr("y", l[0]).attr("height", l[1] - l[0]), r(f)), t(f) }) } function t(n) { n.selectAll(".resize").attr("transform", function (n) { return "translate(" + l[+/e$/.test(n)] + "," + f[+/^s/.test(n)] + ")" }) } function e(n) { n.select(".extent").attr("x", l[0]), n.selectAll(".extent,.n>rect,.s>rect").attr("width", l[1] - l[0]) } function r(n) { n.select(".extent").attr("y", f[0]), n.selectAll(".extent,.e>rect,.w>rect").attr("height", f[1] - f[0]) } function u() { function u() { 32 == Zo.event.keyCode && (C || (x = null, z[0] -= l[1], z[1] -= f[1], C = 2), y()) } function p() { 32 == Zo.event.keyCode && 2 == C && (z[0] += l[1], z[1] += f[1], C = 0, y()) } function v() { var n = Zo.mouse(_), u = !1; M && (n[0] += M[0], n[1] += M[1]), C || (Zo.event.altKey ? (x || (x = [(l[0] + l[1]) / 2, (f[0] + f[1]) / 2]), z[0] = l[+(n[0] < x[0])], z[1] = f[+(n[1] < x[1])]) : x = null), E && d(n, c, 0) && (e(S), u = !0), A && d(n, s, 1) && (r(S), u = !0), u && (t(S), w({ type: "brush", mode: C ? "move" : "resize" })) } function d(n, t, e) { var r, u, a = Ti(t), c = a[0], s = a[1], p = z[e], v = e ? f : l, d = v[1] - v[0]; return C && (c -= p, s -= d + p), r = (e ? g : h) ? Math.max(c, Math.min(s, n[e])) : n[e], C ? u = (r += p) + d : (x && (p = Math.max(c, Math.min(s, 2 * x[e] - r))), r > p ? (u = r, r = p) : u = p), v[0] != r || v[1] != u ? (e ? o = null : i = null, v[0] = r, v[1] = u, !0) : void 0 } function m() { v(), S.style("pointer-events", "all").selectAll(".resize").style("display", n.empty() ? "none" : null), Zo.select("body").style("cursor", null), L.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), N(), w({ type: "brushend" }) } var x, M, _ = this, b = Zo.select(Zo.event.target), w = a.of(_, arguments), S = Zo.select(_), k = b.datum(), E = !/^(n|s)$/.test(k) && c, A = !/^(e|w)$/.test(k) && s, C = b.classed("extent"), N = I(), z = Zo.mouse(_), L = Zo.select(Wo).on("keydown.brush", u).on("keyup.brush", p); if (Zo.event.changedTouches ? L.on("touchmove.brush", v).on("touchend.brush", m) : L.on("mousemove.brush", v).on("mouseup.brush", m), S.interrupt().selectAll("*").interrupt(), C) z[0] = l[0] - z[0], z[1] = f[0] - z[1]; else if (k) { var T = +/w$/.test(k), q = +/^n/.test(k); M = [l[1 - T] - z[0], f[1 - q] - z[1]], z[0] = l[T], z[1] = f[q] } else Zo.event.altKey && (x = z.slice()); S.style("pointer-events", "none").selectAll(".resize").style("display", null), Zo.select("body").style("cursor", b.style("cursor")), w({ type: "brushstart" }), v() } var i, o, a = M(n, "brushstart", "brush", "brushend"), c = null, s = null, l = [0, 0], f = [0, 0], h = !0, g = !0, p = qs[0]; return n.event = function (n) { n.each(function () { var n = a.of(this, arguments), t = { x: l, y: f, i: i, j: o }, e = this.__chart__ || t; this.__chart__ = t, Ss ? Zo.select(this).transition().each("start.brush", function () { i = e.i, o = e.j, l = e.x, f = e.y, n({ type: "brushstart" }) }).tween("brush:brush", function () { var e = gu(l, t.x), r = gu(f, t.y); return i = o = null, function (u) { l = t.x = e(u), f = t.y = r(u), n({ type: "brush", mode: "resize" }) } }).each("end.brush", function () { i = t.i, o = t.j, n({ type: "brush", mode: "resize" }), n({ type: "brushend" }) }) : (n({ type: "brushstart" }), n({ type: "brush", mode: "resize" }), n({ type: "brushend" })) }) }, n.x = function (t) { return arguments.length ? (c = t, p = qs[!c << 1 | !s], n) : c }, n.y = function (t) { return arguments.length ? (s = t, p = qs[!c << 1 | !s], n) : s }, n.clamp = function (t) { return arguments.length ? (c && s ? (h = !!t[0], g = !!t[1]) : c ? h = !!t : s && (g = !!t), n) : c && s ? [h, g] : c ? h : s ? g : null }, n.extent = function (t) { var e, r, u, a, h; return arguments.length ? (c && (e = t[0], r = t[1], s && (e = e[0], r = r[0]), i = [e, r], c.invert && (e = c(e), r = c(r)), e > r && (h = e, e = r, r = h), (e != l[0] || r != l[1]) && (l = [e, r])), s && (u = t[0], a = t[1], c && (u = u[1], a = a[1]), o = [u, a], s.invert && (u = s(u), a = s(a)), u > a && (h = u, u = a, a = h), (u != f[0] || a != f[1]) && (f = [u, a])), n) : (c && (i ? (e = i[0], r = i[1]) : (e = l[0], r = l[1], c.invert && (e = c.invert(e), r = c.invert(r)), e > r && (h = e, e = r, r = h))), s && (o ? (u = o[0], a = o[1]) : (u = f[0], a = f[1], s.invert && (u = s.invert(u), a = s.invert(a)), u > a && (h = u, u = a, a = h))), c && s ? [[e, u], [r, a]] : c ? [e, r] : s && [u, a]) }, n.clear = function () { return n.empty() || (l = [0, 0], f = [0, 0], i = o = null), n }, n.empty = function () { return !!c && l[0] == l[1] || !!s && f[0] == f[1] }, Zo.rebind(n, a, "on") }; var Ts = { n: "ns-resize", e: "ew-resize", s: "ns-resize", w: "ew-resize", nw: "nwse-resize", ne: "nesw-resize", se: "nwse-resize", sw: "nesw-resize" }, qs = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []], Rs = Qa.format = ic.timeFormat, Ds = Rs.utc, Ps = Ds("%Y-%m-%dT%H:%M:%S.%LZ"); Rs.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? Ho : Ps, Ho.parse = function (n) { var t = new Date(n); return isNaN(t) ? null : t }, Ho.toString = Ps.toString, Qa.second = Dt(function (n) { return new nc(1e3 * Math.floor(n / 1e3)) }, function (n, t) { n.setTime(n.getTime() + 1e3 * Math.floor(t)) }, function (n) { return n.getSeconds() }), Qa.seconds = Qa.second.range, Qa.seconds.utc = Qa.second.utc.range, Qa.minute = Dt(function (n) { return new nc(6e4 * Math.floor(n / 6e4)) }, function (n, t) { n.setTime(n.getTime() + 6e4 * Math.floor(t)) }, function (n) { return n.getMinutes() }), Qa.minutes = Qa.minute.range, Qa.minutes.utc = Qa.minute.utc.range, Qa.hour = Dt(function (n) { var t = n.getTimezoneOffset() / 60; return new nc(36e5 * (Math.floor(n / 36e5 - t) + t)) }, function (n, t) { n.setTime(n.getTime() + 36e5 * Math.floor(t)) }, function (n) { return n.getHours() }), Qa.hours = Qa.hour.range, Qa.hours.utc = Qa.hour.utc.range, Qa.month = Dt(function (n) { return n = Qa.day(n), n.setDate(1), n }, function (n, t) { n.setMonth(n.getMonth() + t) }, function (n) { return n.getMonth() }), Qa.months = Qa.month.range, Qa.months.utc = Qa.month.utc.range; var Us = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6], js = [[Qa.second, 1], [Qa.second, 5], [Qa.second, 15], [Qa.second, 30], [Qa.minute, 1], [Qa.minute, 5], [Qa.minute, 15], [Qa.minute, 30], [Qa.hour, 1], [Qa.hour, 3], [Qa.hour, 6], [Qa.hour, 12], [Qa.day, 1], [Qa.day, 2], [Qa.week, 1], [Qa.month, 1], [Qa.month, 3], [Qa.year, 1]], Hs = Rs.multi([[".%L", function (n) { return n.getMilliseconds() }], [":%S", function (n) { return n.getSeconds() }], ["%I:%M", function (n) { return n.getMinutes() }], ["%I %p", function (n) { return n.getHours() }], ["%a %d", function (n) { return n.getDay() && 1 != n.getDate() }], ["%b %d", function (n) { return 1 != n.getDate() }], ["%B", function (n) { return n.getMonth() }], ["%Y", we]]), Fs = { range: function (n, t, e) { return Zo.range(Math.ceil(n / e) * e, +t, e).map(Oo) }, floor: wt, ceil: wt }; js.year = Qa.year, Qa.scale = function () { return Fo(Zo.scale.linear(), js, Hs) }; var Os = js.map(function (n) { return [n[0].utc, n[1]] }), Ys = Ds.multi([[".%L", function (n) { return n.getUTCMilliseconds() }], [":%S", function (n) { return n.getUTCSeconds() }], ["%I:%M", function (n) { return n.getUTCMinutes() }], ["%I %p", function (n) { return n.getUTCHours() }], ["%a %d", function (n) { return n.getUTCDay() && 1 != n.getUTCDate() }], ["%b %d", function (n) { return 1 != n.getUTCDate() }], ["%B", function (n) { return n.getUTCMonth() }], ["%Y", we]]); Os.year = Qa.year.utc, Qa.scale.utc = function () { return Fo(Zo.scale.linear(), Os, Ys) }, Zo.text = St(function (n) { return n.responseText }), Zo.json = function (n, t) { return kt(n, "application/json", Yo, t) }, Zo.html = function (n, t) { return kt(n, "text/html", Io, t) }, Zo.xml = St(function (n) { return n.responseXML }), "function" == typeof define && define.amd ? define(Zo) : "object" == typeof module && module.exports ? module.exports = Zo : this.d3 = Zo
}();

(function a(b, c, d) { function e(g, h) { if (!c[g]) { if (!b[g]) { var j = typeof require == "function" && require; if (!h && j) return j(g, !0); if (f) return f(g, !0); throw new Error("Cannot find module '" + g + "'") } var k = c[g] = { exports: {} }; b[g][0].call(k.exports, function (a) { var c = b[g][1][a]; return e(c ? c : a) }, k, k.exports, a, b, c, d) } return c[g].exports } var f = typeof require == "function" && require; for (var g = 0; g < d.length; g++) e(d[g]); return e })({ 1: [function (a, b, c) { var d = typeof self != "undefined" ? self : typeof window != "undefined" ? window : {}; d.graphlib = a("./index") }, { "./index": 2 }], 2: [function (a, b, c) { c.Graph = a("./lib/Graph"), c.Digraph = a("./lib/Digraph"), c.CGraph = a("./lib/CGraph"), c.CDigraph = a("./lib/CDigraph"), a("./lib/graph-converters"), c.alg = { isAcyclic: a("./lib/alg/isAcyclic"), components: a("./lib/alg/components"), dijkstra: a("./lib/alg/dijkstra"), dijkstraAll: a("./lib/alg/dijkstraAll"), findCycles: a("./lib/alg/findCycles"), floydWarshall: a("./lib/alg/floydWarshall"), postorder: a("./lib/alg/postorder"), preorder: a("./lib/alg/preorder"), prim: a("./lib/alg/prim"), tarjan: a("./lib/alg/tarjan"), topsort: a("./lib/alg/topsort") }, c.converter = { json: a("./lib/converter/json.js") }; var d = a("./lib/filter"); c.filter = { all: d.all, nodesFromList: d.nodesFromList }, c.version = a("./lib/version") }, { "./lib/CDigraph": 4, "./lib/CGraph": 5, "./lib/Digraph": 6, "./lib/Graph": 7, "./lib/alg/components": 8, "./lib/alg/dijkstra": 9, "./lib/alg/dijkstraAll": 10, "./lib/alg/findCycles": 11, "./lib/alg/floydWarshall": 12, "./lib/alg/isAcyclic": 13, "./lib/alg/postorder": 14, "./lib/alg/preorder": 15, "./lib/alg/prim": 16, "./lib/alg/tarjan": 17, "./lib/alg/topsort": 18, "./lib/converter/json.js": 20, "./lib/filter": 21, "./lib/graph-converters": 22, "./lib/version": 24 }], 3: [function (a, b, c) { function e() { this._value = undefined, this._nodes = {}, this._edges = {}, this._nextId = 0 } function f(a, b, c) { (a[b] || (a[b] = new d)).add(c) } function g(a, b, c) { var d = a[b]; d.remove(c), d.size() === 0 && delete a[b] } var d = a("cp-data").Set; b.exports = e, e.prototype.order = function () { return Object.keys(this._nodes).length }, e.prototype.size = function () { return Object.keys(this._edges).length }, e.prototype.graph = function (a) { if (arguments.length === 0) return this._value; this._value = a }, e.prototype.hasNode = function (a) { return a in this._nodes }, e.prototype.node = function (a, b) { var c = this._strictGetNode(a); if (arguments.length === 1) return c.value; c.value = b }, e.prototype.nodes = function () { var a = []; return this.eachNode(function (b) { a.push(b) }), a }, e.prototype.eachNode = function (a) { for (var b in this._nodes) { var c = this._nodes[b]; a(c.id, c.value) } }, e.prototype.hasEdge = function (a) { return a in this._edges }, e.prototype.edge = function (a, b) { var c = this._strictGetEdge(a); if (arguments.length === 1) return c.value; c.value = b }, e.prototype.edges = function () { var a = []; return this.eachEdge(function (b) { a.push(b) }), a }, e.prototype.eachEdge = function (a) { for (var b in this._edges) { var c = this._edges[b]; a(c.id, c.u, c.v, c.value) } }, e.prototype.incidentNodes = function (a) { var b = this._strictGetEdge(a); return [b.u, b.v] }, e.prototype.addNode = function (a, b) { if (a === undefined || a === null) { do a = "_" + ++this._nextId; while (this.hasNode(a)) } else if (this.hasNode(a)) throw new Error("Graph already has node '" + a + "'"); return this._nodes[a] = { id: a, value: b }, a }, e.prototype.delNode = function (a) { this._strictGetNode(a), this.incidentEdges(a).forEach(function (a) { this.delEdge(a) }, this), delete this._nodes[a] }, e.prototype._addEdge = function (a, b, c, d, e, g) { this._strictGetNode(b), this._strictGetNode(c); if (a === undefined || a === null) { do a = "_" + ++this._nextId; while (this.hasEdge(a)) } else if (this.hasEdge(a)) throw new Error("Graph already has edge '" + a + "'"); return this._edges[a] = { id: a, u: b, v: c, value: d }, f(e[c], b, a), f(g[b], c, a), a }, e.prototype._delEdge = function (a, b, c) { var d = this._strictGetEdge(a); g(b[d.v], d.u, a), g(c[d.u], d.v, a), delete this._edges[a] }, e.prototype.copy = function () { var a = new this.constructor; return a.graph(this.graph()), this.eachNode(function (b, c) { a.addNode(b, c) }), this.eachEdge(function (b, c, d, e) { a.addEdge(b, c, d, e) }), a._nextId = this._nextId, a }, e.prototype.filterNodes = function (a) { var b = new this.constructor; return b.graph(this.graph()), this.eachNode(function (c, d) { a(c) && b.addNode(c, d) }), this.eachEdge(function (a, c, d, e) { b.hasNode(c) && b.hasNode(d) && b.addEdge(a, c, d, e) }), b }, e.prototype._strictGetNode = function (a) { var b = this._nodes[a]; if (b === undefined) throw new Error("Node '" + a + "' is not in graph"); return b }, e.prototype._strictGetEdge = function (a) { var b = this._edges[a]; if (b === undefined) throw new Error("Edge '" + a + "' is not in graph"); return b } }, { "cp-data": 25 }], 4: [function (a, b, c) { var d = a("./Digraph"), e = a("./compoundify"), f = e(d); b.exports = f, f.fromDigraph = function (a) { var b = new f, c = a.graph(); return c !== undefined && b.graph(c), a.eachNode(function (a, c) { c === undefined ? b.addNode(a) : b.addNode(a, c) }), a.eachEdge(function (a, c, d, e) { e === undefined ? b.addEdge(null, c, d) : b.addEdge(null, c, d, e) }), b }, f.prototype.toString = function () { return "CDigraph " + JSON.stringify(this, null, 2) } }, { "./Digraph": 6, "./compoundify": 19 }], 5: [function (a, b, c) { var d = a("./Graph"), e = a("./compoundify"), f = e(d); b.exports = f, f.fromGraph = function (a) { var b = new f, c = a.graph(); return c !== undefined && b.graph(c), a.eachNode(function (a, c) { c === undefined ? b.addNode(a) : b.addNode(a, c) }), a.eachEdge(function (a, c, d, e) { e === undefined ? b.addEdge(null, c, d) : b.addEdge(null, c, d, e) }), b }, f.prototype.toString = function () { return "CGraph " + JSON.stringify(this, null, 2) } }, { "./Graph": 7, "./compoundify": 19 }], 6: [function (a, b, c) { function g() { e.call(this), this._inEdges = {}, this._outEdges = {} } var d = a("./util"), e = a("./BaseGraph"), f = a("cp-data").Set; b.exports = g, g.prototype = new e, g.prototype.constructor = g, g.prototype.isDirected = function () { return !0 }, g.prototype.successors = function (a) { return this._strictGetNode(a), Object.keys(this._outEdges[a]).map(function (a) { return this._nodes[a].id }, this) }, g.prototype.predecessors = function (a) { return this._strictGetNode(a), Object.keys(this._inEdges[a]).map(function (a) { return this._nodes[a].id }, this) }, g.prototype.neighbors = function (a) { return f.union([this.successors(a), this.predecessors(a)]).keys() }, g.prototype.sources = function () { var a = this; return this._filterNodes(function (b) { return a.inEdges(b).length === 0 }) }, g.prototype.sinks = function () { var a = this; return this._filterNodes(function (b) { return a.outEdges(b).length === 0 }) }, g.prototype.source = function (a) { return this._strictGetEdge(a).u }, g.prototype.target = function (a) { return this._strictGetEdge(a).v }, g.prototype.inEdges = function (a, b) { this._strictGetNode(a); var c = f.union(d.values(this._inEdges[a])).keys(); return arguments.length > 1 && (this._strictGetNode(b), c = c.filter(function (a) { return this.source(a) === b }, this)), c }, g.prototype.outEdges = function (a, b) { this._strictGetNode(a); var c = f.union(d.values(this._outEdges[a])).keys(); return arguments.length > 1 && (this._strictGetNode(b), c = c.filter(function (a) { return this.target(a) === b }, this)), c }, g.prototype.incidentEdges = function (a, b) { return arguments.length > 1 ? f.union([this.outEdges(a, b), this.outEdges(b, a)]).keys() : f.union([this.inEdges(a), this.outEdges(a)]).keys() }, g.prototype.toString = function () { return "Digraph " + JSON.stringify(this, null, 2) }, g.prototype.addNode = function (a, b) { return a = e.prototype.addNode.call(this, a, b), this._inEdges[a] = {}, this._outEdges[a] = {}, a }, g.prototype.delNode = function (a) { e.prototype.delNode.call(this, a), delete this._inEdges[a], delete this._outEdges[a] }, g.prototype.addEdge = function (a, b, c, d) { return e.prototype._addEdge.call(this, a, b, c, d, this._inEdges, this._outEdges) }, g.prototype.delEdge = function (a) { e.prototype._delEdge.call(this, a, this._inEdges, this._outEdges) }, g.prototype._filterNodes = function (a) { var b = []; return this.eachNode(function (c) { a(c) && b.push(c) }), b } }, { "./BaseGraph": 3, "./util": 23, "cp-data": 25 }], 7: [function (a, b, c) { function g() { e.call(this), this._incidentEdges = {} } var d = a("./util"), e = a("./BaseGraph"), f = a("cp-data").Set; b.exports = g, g.prototype = new e, g.prototype.constructor = g, g.prototype.isDirected = function () { return !1 }, g.prototype.neighbors = function (a) { return this._strictGetNode(a), Object.keys(this._incidentEdges[a]).map(function (a) { return this._nodes[a].id }, this) }, g.prototype.incidentEdges = function (a, b) { return this._strictGetNode(a), arguments.length > 1 ? (this._strictGetNode(b), b in this._incidentEdges[a] ? this._incidentEdges[a][b].keys() : []) : f.union(d.values(this._incidentEdges[a])).keys() }, g.prototype.toString = function () { return "Graph " + JSON.stringify(this, null, 2) }, g.prototype.addNode = function (a, b) { return a = e.prototype.addNode.call(this, a, b), this._incidentEdges[a] = {}, a }, g.prototype.delNode = function (a) { e.prototype.delNode.call(this, a), delete this._incidentEdges[a] }, g.prototype.addEdge = function (a, b, c, d) { return e.prototype._addEdge.call(this, a, b, c, d, this._incidentEdges, this._incidentEdges) }, g.prototype.delEdge = function (a) { e.prototype._delEdge.call(this, a, this._incidentEdges, this._incidentEdges) } }, { "./BaseGraph": 3, "./util": 23, "cp-data": 25 }], 8: [function (a, b, c) { function e(a) { function e(b, d) { c.has(b) || (c.add(b), d.push(b), a.neighbors(b).forEach(function (a) { e(a, d) })) } var b = [], c = new d; return a.nodes().forEach(function (a) { var c = []; e(a, c), c.length > 0 && b.push(c) }), b } var d = a("cp-data").Set; b.exports = e }, { "cp-data": 25 }], 9: [function (a, b, c) { function e(a, b, c, e) { function h(b) { var d = a.incidentNodes(b), e = d[0] !== i ? d[0] : d[1], h = f[e], k = c(b), l = j.distance + k; if (k < 0) throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + b + " Weight: " + k); l < h.distance && (h.distance = l, h.predecessor = i, g.decrease(e, l)) } var f = {}, g = new d; c = c || function () { return 1 }, e = e || (a.isDirected() ? function (b) { return a.outEdges(b) } : function (b) { return a.incidentEdges(b) }), a.eachNode(function (a) { var c = a === b ? 0 : Number.POSITIVE_INFINITY; f[a] = { distance: c }, g.add(a, c) }); var i, j; while (g.size() > 0) { i = g.removeMin(), j = f[i]; if (j.distance === Number.POSITIVE_INFINITY) break; e(i).forEach(h) } return f } var d = a("cp-data").PriorityQueue; b.exports = e }, { "cp-data": 25 }], 10: [function (a, b, c) { function e(a, b, c) { var e = {}; return a.eachNode(function (f) { e[f] = d(a, f, b, c) }), e } var d = a("./dijkstra"); b.exports = e }, { "./dijkstra": 9 }], 11: [function (a, b, c) { function e(a) { return d(a).filter(function (a) { return a.length > 1 }) } var d = a("./tarjan"); b.exports = e }, { "./tarjan": 17 }], 12: [function (a, b, c) { function d(a, b, c) { var d = {}, e = a.nodes(); return b = b || function () { return 1 }, c = c || (a.isDirected() ? function (b) { return a.outEdges(b) } : function (b) { return a.incidentEdges(b) }), e.forEach(function (f) { d[f] = {}, d[f][f] = { distance: 0 }, e.forEach(function (a) { f !== a && (d[f][a] = { distance: Number.POSITIVE_INFINITY }) }), c(f).forEach(function (c) { var e = a.incidentNodes(c), h = e[0] !== f ? e[0] : e[1], i = b(c); i < d[f][h].distance && (d[f][h] = { distance: i, predecessor: f }) }) }), e.forEach(function (a) { var b = d[a]; e.forEach(function (c) { var f = d[c]; e.forEach(function (c) { var d = f[a], e = b[c], g = f[c], h = d.distance + e.distance; h < g.distance && (g.distance = h, g.predecessor = e.predecessor) }) }) }), d } b.exports = d }, {}], 13: [function (a, b, c) { function e(a) { try { d(a) } catch (b) { if (b instanceof d.CycleException) return !1; throw b } return !0 } var d = a("./topsort"); b.exports = e }, { "./topsort": 18 }], 14: [function (a, b, c) { function e(a, b, c) { function f(b, d) { if (e.has(b)) throw new Error("The input graph is not a tree: " + a); e.add(b), a.neighbors(b).forEach(function (a) { a !== d && f(a, b) }), c(b) } var e = new d; if (a.isDirected()) throw new Error("This function only works for undirected graphs"); f(b) } var d = a("cp-data").Set; b.exports = e }, { "cp-data": 25 }], 15: [function (a, b, c) { function e(a, b, c) { function f(b, d) { if (e.has(b)) throw new Error("The input graph is not a tree: " + a); e.add(b), c(b), a.neighbors(b).forEach(function (a) { a !== d && f(a, b) }) } var e = new d; if (a.isDirected()) throw new Error("This function only works for undirected graphs"); f(b) } var d = a("cp-data").Set; b.exports = e }, { "cp-data": 25 }], 16: [function (a, b, c) { function f(a, b) { function i(c) { var d = a.incidentNodes(c), e = d[0] !== h ? d[0] : d[1], i = g.priority(e); if (i !== undefined) { var j = b(c); j < i && (f[e] = h, g.decrease(e, j)) } } var c = new d, f = {}, g = new e, h; if (a.order() === 0) return c; a.eachNode(function (a) { g.add(a, Number.POSITIVE_INFINITY), c.addNode(a) }), g.decrease(a.nodes()[0], 0); var j = !1; while (g.size() > 0) { h = g.removeMin(); if (h in f) c.addEdge(null, h, f[h]); else { if (j) throw new Error("Input graph is not connected: " + a); j = !0 } a.incidentEdges(h).forEach(i) } return c } var d = a("../Graph"), e = a("cp-data").PriorityQueue; b.exports = f }, { "../Graph": 7, "cp-data": 25 }], 17: [function (a, b, c) { function d(a) { function f(h) { var i = d[h] = { onStack: !0, lowlink: b, index: b++ }; c.push(h), a.successors(h).forEach(function (a) { a in d ? d[a].onStack && (i.lowlink = Math.min(i.lowlink, d[a].index)) : (f(a), i.lowlink = Math.min(i.lowlink, d[a].lowlink)) }); if (i.lowlink === i.index) { var j = [], k; do k = c.pop(), d[k].onStack = !1, j.push(k); while (h !== k); e.push(j) } } if (!a.isDirected()) throw new Error("tarjan can only be applied to a directed graph. Bad input: " + a); var b = 0, c = [], d = {}, e = []; return a.nodes().forEach(function (a) { a in d || f(a) }), e } b.exports = d }, {}], 18: [function (a, b, c) { function d(a) { function f(g) { if (g in c) throw new e; g in b || (c[g] = !0, b[g] = !0, a.predecessors(g).forEach(function (a) { f(a) }), delete c[g], d.push(g)) } if (!a.isDirected()) throw new Error("topsort can only be applied to a directed graph. Bad input: " + a); var b = {}, c = {}, d = [], g = a.sinks(); if (a.order() !== 0 && g.length === 0) throw new e; return a.sinks().forEach(function (a) { f(a) }), d } function e() { } b.exports = d, d.CycleException = e, e.prototype.toString = function () { return "Graph has at least one cycle" } }, {}], 19: [function (a, b, c) { function e(a) { function b() { a.call(this), this._parents = {}, this._children = {}, this._children[null] = new d } return b.prototype = new a, b.prototype.constructor = b, b.prototype.parent = function (a, b) { this._strictGetNode(a); if (arguments.length < 2) return this._parents[a]; if (a === b) throw new Error("Cannot make " + a + " a parent of itself"); b !== null && this._strictGetNode(b), this._children[this._parents[a]].remove(a), this._parents[a] = b, this._children[b].add(a) }, b.prototype.children = function (a) { return a !== null && this._strictGetNode(a), this._children[a].keys() }, b.prototype.addNode = function (b, c) { return b = a.prototype.addNode.call(this, b, c), this._parents[b] = null, this._children[b] = new d, this._children[null].add(b), b }, b.prototype.delNode = function (b) { var c = this.parent(b); return this._children[b].keys().forEach(function (a) { this.parent(a, c) }, this), this._children[c].remove(b), delete this._parents[b], delete this._children[b], a.prototype.delNode.call(this, b) }, b.prototype.copy = function () { var b = a.prototype.copy.call(this); return this.nodes().forEach(function (a) { b.parent(a, this.parent(a)) }, this), b }, b.prototype.filterNodes = function (b) { function f(a) { var b = c.parent(a); return b === null || d.hasNode(b) ? (e[a] = b, b) : b in e ? e[b] : f(b) } var c = this, d = a.prototype.filterNodes.call(this, b), e = {}; return d.eachNode(function (a) { d.parent(a, f(a)) }), d }, b } var d = a("cp-data").Set; b.exports = e }, { "cp-data": 25 }], 20: [function (a, b, c) { function h(a) { return Object.prototype.toString.call(a).slice(8, -1) } var d = a("../Graph"), e = a("../Digraph"), f = a("../CGraph"), g = a("../CDigraph"); c.decode = function (a, b, c) { c = c || e; if (h(a) !== "Array") throw new Error("nodes is not an Array"); if (h(b) !== "Array") throw new Error("edges is not an Array"); if (typeof c == "string") switch (c) { case "graph": c = d; break; case "digraph": c = e; break; case "cgraph": c = f; break; case "cdigraph": c = g; break; default: throw new Error("Unrecognized graph type: " + c) } var i = new c; return a.forEach(function (a) { i.addNode(a.id, a.value) }), i.parent && a.forEach(function (a) { a.children && a.children.forEach(function (b) { i.parent(b, a.id) }) }), b.forEach(function (a) { i.addEdge(a.id, a.u, a.v, a.value) }), i }, c.encode = function (a) { var b = [], c = []; a.eachNode(function (c, d) { var e = { id: c, value: d }; if (a.children) { var f = a.children(c); f.length && (e.children = f) } b.push(e) }), a.eachEdge(function (a, b, d, e) { c.push({ id: a, u: b, v: d, value: e }) }); var h; if (a instanceof g) h = "cdigraph"; else if (a instanceof f) h = "cgraph"; else if (a instanceof e) h = "digraph"; else if (a instanceof d) h = "graph"; else throw new Error("Couldn't determine type of graph: " + a); return { nodes: b, edges: c, type: h } } }, { "../CDigraph": 4, "../CGraph": 5, "../Digraph": 6, "../Graph": 7 }], 21: [function (a, b, c) { var d = a("cp-data").Set; c.all = function () { return function () { return !0 } }, c.nodesFromList = function (a) { var b = new d(a); return function (a) { return b.has(a) } } }, { "cp-data": 25 }], 22: [function (a, b, c) { var d = a("./Graph"), e = a("./Digraph"); d.prototype.toDigraph = d.prototype.asDirected = function () { var a = new e; return this.eachNode(function (b, c) { a.addNode(b, c) }), this.eachEdge(function (b, c, d, e) { a.addEdge(null, c, d, e), a.addEdge(null, d, c, e) }), a }, e.prototype.toGraph = e.prototype.asUndirected = function () { var a = new d; return this.eachNode(function (b, c) { a.addNode(b, c) }), this.eachEdge(function (b, c, d, e) { a.addEdge(b, c, d, e) }), a } }, { "./Digraph": 6, "./Graph": 7 }], 23: [function (a, b, c) { c.values = function (a) { var b = Object.keys(a), c = b.length, d = new Array(c), e; for (e = 0; e < c; ++e) d[e] = a[b[e]]; return d } }, {}], 24: [function (a, b, c) { b.exports = "0.7.4" }, {}], 25: [function (a, b, c) { c.Set = a("./lib/Set"), c.PriorityQueue = a("./lib/PriorityQueue"), c.version = a("./lib/version") }, { "./lib/PriorityQueue": 26, "./lib/Set": 27, "./lib/version": 29 }], 26: [function (a, b, c) { function d() { this._arr = [], this._keyIndices = {} } b.exports = d, d.prototype.size = function () { return this._arr.length }, d.prototype.keys = function () { return this._arr.map(function (a) { return a.key }) }, d.prototype.has = function (a) { return a in this._keyIndices }, d.prototype.priority = function (a) { var b = this._keyIndices[a]; if (b !== undefined) return this._arr[b].priority }, d.prototype.min = function () { if (this.size() === 0) throw new Error("Queue underflow"); return this._arr[0].key }, d.prototype.add = function (a, b) { var c = this._keyIndices; if (a in c) return !1; var d = this._arr, e = d.length; return c[a] = e, d.push({ key: a, priority: b }), this._decrease(e), !0 }, d.prototype.removeMin = function () { this._swap(0, this._arr.length - 1); var a = this._arr.pop(); return delete this._keyIndices[a.key], this._heapify(0), a.key }, d.prototype.decrease = function (a, b) { var c = this._keyIndices[a]; if (b > this._arr[c].priority) throw new Error("New priority is greater than current priority. Key: " + a + " Old: " + this._arr[c].priority + " New: " + b); this._arr[c].priority = b, this._decrease(c) }, d.prototype._heapify = function (a) { var b = this._arr, c = 2 * a, d = c + 1, e = a; c < b.length && (e = b[c].priority < b[e].priority ? c : e, d < b.length && (e = b[d].priority < b[e].priority ? d : e), e !== a && (this._swap(a, e), this._heapify(e))) }, d.prototype._decrease = function (a) { var b = this._arr, c = b[a].priority, d; while (a !== 0) { d = a >> 1; if (b[d].priority < c) break; this._swap(a, d), a = d } }, d.prototype._swap = function (a, b) { var c = this._arr, d = this._keyIndices, e = c[a], f = c[b]; c[a] = f, c[b] = e, d[f.key] = a, d[e.key] = b } }, {}], 27: [function (a, b, c) { function e(a) { this._size = 0, this._keys = {}; if (a) for (var b = 0, c = a.length; b < c; ++b) this.add(a[b]) } function f(a) { var b = Object.keys(a), c = b.length, d = new Array(c), e; for (e = 0; e < c; ++e) d[e] = a[b[e]]; return d } var d = a("./util"); b.exports = e, e.intersect = function (a) { if (a.length === 0) return new e; var b = new e(d.isArray(a[0]) ? a[0] : a[0].keys()); for (var c = 1, f = a.length; c < f; ++c) { var g = b.keys(), h = d.isArray(a[c]) ? new e(a[c]) : a[c]; for (var i = 0, j = g.length; i < j; ++i) { var k = g[i]; h.has(k) || b.remove(k) } } return b }, e.union = function (a) { var b = d.reduce(a, function (a, b) { return a + (b.size ? b.size() : b.length) }, 0), c = new Array(b), f = 0; for (var g = 0, h = a.length; g < h; ++g) { var i = a[g], j = d.isArray(i) ? i : i.keys(); for (var k = 0, l = j.length; k < l; ++k) c[f++] = j[k] } return new e(c) }, e.prototype.size = function () { return this._size }, e.prototype.keys = function () { return f(this._keys) }, e.prototype.has = function (a) { return a in this._keys }, e.prototype.add = function (a) { return a in this._keys ? !1 : (this._keys[a] = a, ++this._size, !0) }, e.prototype.remove = function (a) { return a in this._keys ? (delete this._keys[a], --this._size, !0) : !1 } }, { "./util": 28 }], 28: [function (a, b, c) { Array.isArray ? c.isArray = Array.isArray : c.isArray = function (a) { return Object.prototype.toString.call(a) === "[object Array]" }, "function" != typeof Array.prototype.reduce ? c.reduce = function (a, b, c) { "use strict"; if (null === a || "undefined" == typeof a) throw new TypeError("Array.prototype.reduce called on null or undefined"); if ("function" != typeof b) throw new TypeError(b + " is not a function"); var d, e, f = a.length >>> 0, g = !1; 1 < arguments.length && (e = c, g = !0); for (d = 0; f > d; ++d) a.hasOwnProperty(d) && (g ? e = b(e, a[d], d, a) : (e = a[d], g = !0)); if (!g) throw new TypeError("Reduce of empty array with no initial value"); return e } : c.reduce = function (a, b, c) { return a.reduce(b, c) } }, {}], 29: [function (a, b, c) { b.exports = "1.1.3" }, {}] }, {}, [1]);

; (function e(t, n, r) { function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); throw new Error("Cannot find module '" + o + "'") } var f = n[o] = { exports: {} }; t[o][0].call(f.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, f, f.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++) s(r[o]); return s })({
    1: [function (require, module, exports) {
        var global = self;/**
 * @license
 * Copyright (c) 2012-2013 Chris Pettitt
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
        global.dagreD3 = require('./index');

    }, { "./index": 2 }], 2: [function (require, module, exports) {
        /**
         * @license
         * Copyright (c) 2012-2013 Chris Pettitt
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */
        module.exports = {
            Digraph: require('graphlib').Digraph,
            Renderer: require('./lib/Renderer'),
            json: require('graphlib').converter.json,
            layout: require('dagre').layout,
            version: require('./lib/version'),
            debug: require('dagre').debug
        };

    }, { "./lib/Renderer": 3, "./lib/version": 4, "dagre": 11, "graphlib": 28 }], 3: [function (require, module, exports) {
        var layout = require('dagre').layout;

        var d3;
        try { d3 = require('d3'); } catch (_) { d3 = window.d3; }

        module.exports = Renderer;

        function Renderer() {
            // Set up defaults...
            this._layout = layout();

            this.drawNodes(defaultDrawNodes);
            this.drawEdgeLabels(defaultDrawEdgeLabels);
            this.drawEdgePaths(defaultDrawEdgePaths);
            this.positionNodes(defaultPositionNodes);
            this.positionEdgeLabels(defaultPositionEdgeLabels);
            this.positionEdgePaths(defaultPositionEdgePaths);
            this.zoomSetup(defaultZoomSetup);
            this.zoom(defaultZoom);
            this.transition(defaultTransition);
            this.postLayout(defaultPostLayout);
            this.postRender(defaultPostRender);

            this.edgeInterpolate('bundle');
            this.edgeTension(0.95);
        }

        Renderer.prototype.layout = function (layout) {
            if (!arguments.length) { return this._layout; }
            this._layout = layout;
            return this;
        };

        Renderer.prototype.drawNodes = function (drawNodes) {
            if (!arguments.length) { return this._drawNodes; }
            this._drawNodes = bind(drawNodes, this);
            return this;
        };

        Renderer.prototype.drawEdgeLabels = function (drawEdgeLabels) {
            if (!arguments.length) { return this._drawEdgeLabels; }
            this._drawEdgeLabels = bind(drawEdgeLabels, this);
            return this;
        };

        Renderer.prototype.drawEdgePaths = function (drawEdgePaths) {
            if (!arguments.length) { return this._drawEdgePaths; }
            this._drawEdgePaths = bind(drawEdgePaths, this);
            return this;
        };

        Renderer.prototype.positionNodes = function (positionNodes) {
            if (!arguments.length) { return this._positionNodes; }
            this._positionNodes = bind(positionNodes, this);
            return this;
        };

        Renderer.prototype.positionEdgeLabels = function (positionEdgeLabels) {
            if (!arguments.length) { return this._positionEdgeLabels; }
            this._positionEdgeLabels = bind(positionEdgeLabels, this);
            return this;
        };

        Renderer.prototype.positionEdgePaths = function (positionEdgePaths) {
            if (!arguments.length) { return this._positionEdgePaths; }
            this._positionEdgePaths = bind(positionEdgePaths, this);
            return this;
        };

        Renderer.prototype.transition = function (transition) {
            if (!arguments.length) { return this._transition; }
            this._transition = bind(transition, this);
            return this;
        };

        Renderer.prototype.zoomSetup = function (zoomSetup) {
            if (!arguments.length) { return this._zoomSetup; }
            this._zoomSetup = bind(zoomSetup, this);
            return this;
        };

        Renderer.prototype.zoom = function (zoom) {
            if (!arguments.length) { return this._zoom; }
            if (zoom) {
                this._zoom = bind(zoom, this);
            } else {
                delete this._zoom;
            }
            return this;
        };

        Renderer.prototype.postLayout = function (postLayout) {
            if (!arguments.length) { return this._postLayout; }
            this._postLayout = bind(postLayout, this);
            return this;
        };

        Renderer.prototype.postRender = function (postRender) {
            if (!arguments.length) { return this._postRender; }
            this._postRender = bind(postRender, this);
            return this;
        };

        Renderer.prototype.edgeInterpolate = function (edgeInterpolate) {
            if (!arguments.length) { return this._edgeInterpolate; }
            this._edgeInterpolate = edgeInterpolate;
            return this;
        };

        Renderer.prototype.edgeTension = function (edgeTension) {
            if (!arguments.length) { return this._edgeTension; }
            this._edgeTension = edgeTension;
            return this;
        };

        Renderer.prototype.run = function (graph, svg) {
            // First copy the input graph so that it is not changed by the rendering
            // process.
            graph = copyAndInitGraph(graph);

            // Create zoom elements
            svg = this._zoomSetup(graph, svg);

            // Create layers
            svg
              .selectAll('g.edgePaths, g.edgeLabels, g.nodes')
              .data(['edgePaths', 'edgeLabels', 'nodes'])
              .enter()
                .append('g')
                .attr('class', function (d) { return d; });

            // Create node and edge roots, attach labels, and capture dimension
            // information for use with layout.
            var svgNodes = this._drawNodes(graph, svg.select('g.nodes'));
            var svgEdgeLabels = this._drawEdgeLabels(graph, svg.select('g.edgeLabels'));

            svgNodes.each(function (u) { calculateDimensions(this, graph.node(u)); });
            svgEdgeLabels.each(function (e) { calculateDimensions(this, graph.edge(e)); });

            // Now apply the layout function
            var result = runLayout(graph, this._layout);

            // Run any user-specified post layout processing
            this._postLayout(result, svg);

            var svgEdgePaths = this._drawEdgePaths(graph, svg.select('g.edgePaths'));

            // Apply the layout information to the graph
            this._positionNodes(result, svgNodes);
            this._positionEdgeLabels(result, svgEdgeLabels);
            this._positionEdgePaths(result, svgEdgePaths);

            this._postRender(result, svg);

            return result;
        };

        function copyAndInitGraph(graph) {
            var copy = graph.copy();

            // Init labels if they were not present in the source graph
            copy.nodes().forEach(function (u) {
                var value = copy.node(u);
                if (value === undefined) {
                    value = {};
                    copy.node(u, value);
                }
                if (!('label' in value)) { value.label = ''; }
            });

            copy.edges().forEach(function (e) {
                var value = copy.edge(e);
                if (value === undefined) {
                    value = {};
                    copy.edge(e, value);
                }
                if (!('label' in value)) { value.label = ''; }
            });

            return copy;
        }

        function calculateDimensions(group, value) {
            var bbox = group.getBBox();
            value.width = bbox.width;
            value.height = bbox.height;
        }

        function runLayout(graph, layout) {
            var result = layout.run(graph);

            // Copy labels to the result graph
            graph.eachNode(function (u, value) { result.node(u).label = value.label; });
            graph.eachEdge(function (e, u, v, value) { result.edge(e).label = value.label; });

            return result;
        }

        function defaultDrawNodes(g, root) {
            var nodes = g.nodes().filter(function (u) { return !isComposite(g, u); });

            var svgNodes = root
              .selectAll('g.node')
              .classed('enter', false)
              .data(nodes, function (u) { return u; });

            svgNodes.selectAll('*').remove();

            svgNodes
              .enter()
                .append('g')
                  .style('opacity', 0)
                  .attr('class', 'node enter');

            svgNodes.each(function (u) { addLabel(g.node(u), d3.select(this), 10, 10); });

            this._transition(svgNodes.exit())
                .style('opacity', 0)
                .remove();

            return svgNodes;
        }

        function defaultDrawEdgeLabels(g, root) {
            var svgEdgeLabels = root
              .selectAll('g.edgeLabel')
              .classed('enter', false)
              .data(g.edges(), function (e) { return e; });

            svgEdgeLabels.selectAll('*').remove();

            svgEdgeLabels
              .enter()
                .append('g')
                  .style('opacity', 0)
                  .attr('class', 'edgeLabel enter');

            svgEdgeLabels.each(function (e) { addLabel(g.edge(e), d3.select(this), 0, 0); });

            this._transition(svgEdgeLabels.exit())
                .style('opacity', 0)
                .remove();

            return svgEdgeLabels;
        }

        var defaultDrawEdgePaths = function (g, root) {
            var svgEdgePaths = root
              .selectAll('g.edgePath')
              .classed('enter', false)
              .data(g.edges(), function (e) { return e; });

            svgEdgePaths
              .enter()
                .append('g')
                  .attr('class', 'edgePath enter')
                  .append('path')
                    .style('opacity', 0)
                    .attr('marker-end', 'url(#arrowhead)');

            this._transition(svgEdgePaths.exit())
                .style('opacity', 0)
                .remove();

            return svgEdgePaths;
        };

        function defaultPositionNodes(g, svgNodes) {
            function transform(u) {
                var value = g.node(u);
                return 'translate(' + value.x + ',' + value.y + ')';
            }

            // For entering nodes, position immediately without transition
            svgNodes.filter('.enter').attr('transform', transform);

            this._transition(svgNodes)
                .style('opacity', 1)
                .attr('transform', transform);
        }

        function defaultPositionEdgeLabels(g, svgEdgeLabels) {
            function transform(e) {
                var value = g.edge(e);
                var point = findMidPoint(value.points);
                return 'translate(' + point.x + ',' + point.y + ')';
            }

            // For entering edge labels, position immediately without transition
            svgEdgeLabels.filter('.enter').attr('transform', transform);

            this._transition(svgEdgeLabels)
              .style('opacity', 1)
              .attr('transform', transform);
        }

        function defaultPositionEdgePaths(g, svgEdgePaths) {
            var interpolate = this._edgeInterpolate,
                tension = this._edgeTension;

            function calcPoints(e) {
                var value = g.edge(e);
                var source = g.node(g.incidentNodes(e)[0]);
                var target = g.node(g.incidentNodes(e)[1]);
                var points = value.points.slice();

                var p0 = points.length === 0 ? target : points[0];
                var p1 = points.length === 0 ? source : points[points.length - 1];

                points.unshift(intersectRect(source, p0));
                // TODO: use bpodgursky's shortening algorithm here
                points.push(intersectRect(target, p1));

                return d3.svg.line()
                  .x(function (d) { return d.x; })
                  .y(function (d) { return d.y; })
                  .interpolate(interpolate)
                  .tension(tension)
                  (points);
            }

            svgEdgePaths.filter('.enter').selectAll('path')
                .attr('d', calcPoints);

            this._transition(svgEdgePaths.selectAll('path'))
                .attr('d', calcPoints)
                .style('opacity', 1);
        }

        // By default we do not use transitions
        function defaultTransition(selection) {
            return selection;
        }

        // Setup dom for zooming
        function defaultZoomSetup(graph, svg) {
            var root = svg.property('ownerSVGElement');
            // If the svg node is the root, we get null, so set to svg.
            if (!root) { root = svg; }
            root = d3.select(root);

            if (root.select('rect.overlay').empty()) {
                // Create an overlay for capturing mouse events that don't touch foreground
                root.append('rect')
                  .attr('class', 'overlay')
                  .attr('width', '100%')
                  .attr('height', '100%')
                  .style('fill', 'none');

                // Capture the zoom behaviour from the svg
                svg = svg.append('g')
                  .attr('class', 'zoom');

                if (this._zoom) {
                    root.call(this._zoom(graph, svg));
                }
            }

            return svg;
        }

        // By default allow pan and zoom
        function defaultZoom(graph, svg) {
            return d3.behavior.zoom().on('zoom', function () {
                svg.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
            });
        }

        function defaultPostLayout() {
            // Do nothing
        }

        function defaultPostRender(graph, root) {
            if (graph.isDirected() && root.select('#arrowhead').empty()) {
                root
                  .append('svg:defs')
                    .append('svg:marker')
                      .attr('id', 'arrowhead')
                      .attr('viewBox', '0 0 10 10')
                      .attr('refX', 8)
                      .attr('refY', 5)
                      .attr('markerUnits', 'strokeWidth')
                      .attr('markerWidth', 8)
                      .attr('markerHeight', 5)
                      .attr('orient', 'auto')
                      .attr('style', 'fill: #333')
                      .append('svg:path')
                        .attr('d', 'M 0 0 L 10 5 L 0 10 z');
            }
        }

        function addLabel(node, root, marginX, marginY) {
            // Add the rect first so that it appears behind the label
            var label = node.label;
            var rect = root.append('rect');
            var labelSvg = root.append('g');

            if (label[0] === '<') {
                addForeignObjectLabel(label, labelSvg);
                // No margin for HTML elements
                marginX = marginY = 0;
            } else {
                addTextLabel(label,
                             labelSvg,
                             Math.floor(node.labelCols),
                             node.labelCut);
            }

            var bbox = root.node().getBBox();

            labelSvg.attr('transform',
                       'translate(' + (-bbox.width / 2) + ',' + (-bbox.height / 2) + ')');

            rect
              .attr('rx', 5)
              .attr('ry', 5)
              .attr('x', -(bbox.width / 2 + marginX))
              .attr('y', -(bbox.height / 2 + marginY))
              .attr('width', bbox.width + 2 * marginX)
              .attr('height', bbox.height + 2 * marginY);
        }

        function addForeignObjectLabel(label, root) {
            var fo = root
              .append('foreignObject')
                .attr('width', '100000');

            var w, h;
            fo
              .append('xhtml:div')
                .style('float', 'left')
                // TODO find a better way to get dimensions for foreignObjects...
                .html(function () { return label; })
                .each(function () {
                    w = this.clientWidth;
                    h = this.clientHeight;
                });

            fo
              .attr('width', w)
              .attr('height', h);
        }

        function addTextLabel(label, root, labelCols, labelCut) {
            if (labelCut === undefined) labelCut = 'false';
            labelCut = (labelCut.toString().toLowerCase() === 'true');

            var node = root
              .append('text')
              .attr('text-anchor', 'left');

            label = label.replace(/\\n/g, '\n');

            var arr = labelCols ? wordwrap(label, labelCols, labelCut) : label;
            arr = arr.split('\n');
            for (var i = 0; i < arr.length; i++) {
                node
                  .append('tspan')
                    .attr('dy', '1em')
                    .attr('x', '1')
                    .text(arr[i]);
            }
        }

        // Thanks to
        // http://james.padolsey.com/javascript/wordwrap-for-javascript/
        function wordwrap(str, width, cut, brk) {
            brk = brk || '\n';
            width = width || 75;
            cut = cut || false;

            if (!str) { return str; }

            var regex = '.{1,' + width + '}(\\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');

            return str.match(new RegExp(regex, 'g')).join(brk);
        }

        function findMidPoint(points) {
            var midIdx = points.length / 2;
            if (points.length % 2) {
                return points[Math.floor(midIdx)];
            } else {
                var p0 = points[midIdx - 1];
                var p1 = points[midIdx];
                return { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
            }
        }

        function intersectRect(rect, point) {
            var x = rect.x;
            var y = rect.y;

            // For now we only support rectangles

            // Rectangle intersection algorithm from:
            // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
            var dx = point.x - x;
            var dy = point.y - y;
            var w = rect.width / 2;
            var h = rect.height / 2;

            var sx, sy;
            if (Math.abs(dy) * w > Math.abs(dx) * h) {
                // Intersection is top or bottom of rect.
                if (dy < 0) {
                    h = -h;
                }
                sx = dy === 0 ? 0 : h * dx / dy;
                sy = h;
            } else {
                // Intersection is left or right of rect.
                if (dx < 0) {
                    w = -w;
                }
                sx = w;
                sy = dx === 0 ? 0 : w * dy / dx;
            }

            return { x: x + sx, y: y + sy };
        }

        function isComposite(g, u) {
            return 'children' in g && g.children(u).length;
        }

        function bind(func, thisArg) {
            // For some reason PhantomJS occassionally fails when using the builtin bind,
            // so we check if it is available and if not, use a degenerate polyfill.
            if (func.bind) {
                return func.bind(thisArg);
            }

            return function () {
                return func.apply(thisArg, arguments);
            };
        }

    }, { "d3": 10, "dagre": 11 }], 4: [function (require, module, exports) {
        module.exports = '0.2.0';

    }, {}], 5: [function (require, module, exports) {
        exports.Set = require('./lib/Set');
        exports.PriorityQueue = require('./lib/PriorityQueue');
        exports.version = require('./lib/version');

    }, { "./lib/PriorityQueue": 6, "./lib/Set": 7, "./lib/version": 9 }], 6: [function (require, module, exports) {
        module.exports = PriorityQueue;

        /**
         * A min-priority queue data structure. This algorithm is derived from Cormen,
         * et al., "Introduction to Algorithms". The basic idea of a min-priority
         * queue is that you can efficiently (in O(1) time) get the smallest key in
         * the queue. Adding and removing elements takes O(log n) time. A key can
         * have its priority decreased in O(log n) time.
         */
        function PriorityQueue() {
            this._arr = [];
            this._keyIndices = {};
        }

        /**
         * Returns the number of elements in the queue. Takes `O(1)` time.
         */
        PriorityQueue.prototype.size = function () {
            return this._arr.length;
        };

        /**
         * Returns the keys that are in the queue. Takes `O(n)` time.
         */
        PriorityQueue.prototype.keys = function () {
            return this._arr.map(function (x) { return x.key; });
        };

        /**
         * Returns `true` if **key** is in the queue and `false` if not.
         */
        PriorityQueue.prototype.has = function (key) {
            return key in this._keyIndices;
        };

        /**
         * Returns the priority for **key**. If **key** is not present in the queue
         * then this function returns `undefined`. Takes `O(1)` time.
         *
         * @param {Object} key
         */
        PriorityQueue.prototype.priority = function (key) {
            var index = this._keyIndices[key];
            if (index !== undefined) {
                return this._arr[index].priority;
            }
        };

        /**
         * Returns the key for the minimum element in this queue. If the queue is
         * empty this function throws an Error. Takes `O(1)` time.
         */
        PriorityQueue.prototype.min = function () {
            if (this.size() === 0) {
                throw new Error("Queue underflow");
            }
            return this._arr[0].key;
        };

        /**
         * Inserts a new key into the priority queue. If the key already exists in
         * the queue this function returns `false`; otherwise it will return `true`.
         * Takes `O(n)` time.
         *
         * @param {Object} key the key to add
         * @param {Number} priority the initial priority for the key
         */
        PriorityQueue.prototype.add = function (key, priority) {
            var keyIndices = this._keyIndices;
            if (!(key in keyIndices)) {
                var arr = this._arr;
                var index = arr.length;
                keyIndices[key] = index;
                arr.push({ key: key, priority: priority });
                this._decrease(index);
                return true;
            }
            return false;
        };

        /**
         * Removes and returns the smallest key in the queue. Takes `O(log n)` time.
         */
        PriorityQueue.prototype.removeMin = function () {
            this._swap(0, this._arr.length - 1);
            var min = this._arr.pop();
            delete this._keyIndices[min.key];
            this._heapify(0);
            return min.key;
        };

        /**
         * Decreases the priority for **key** to **priority**. If the new priority is
         * greater than the previous priority, this function will throw an Error.
         *
         * @param {Object} key the key for which to raise priority
         * @param {Number} priority the new priority for the key
         */
        PriorityQueue.prototype.decrease = function (key, priority) {
            var index = this._keyIndices[key];
            if (priority > this._arr[index].priority) {
                throw new Error("New priority is greater than current priority. " +
                    "Key: " + key + " Old: " + this._arr[index].priority + " New: " + priority);
            }
            this._arr[index].priority = priority;
            this._decrease(index);
        };

        PriorityQueue.prototype._heapify = function (i) {
            var arr = this._arr;
            var l = 2 * i,
                r = l + 1,
                largest = i;
            if (l < arr.length) {
                largest = arr[l].priority < arr[largest].priority ? l : largest;
                if (r < arr.length) {
                    largest = arr[r].priority < arr[largest].priority ? r : largest;
                }
                if (largest !== i) {
                    this._swap(i, largest);
                    this._heapify(largest);
                }
            }
        };

        PriorityQueue.prototype._decrease = function (index) {
            var arr = this._arr;
            var priority = arr[index].priority;
            var parent;
            while (index !== 0) {
                parent = index >> 1;
                if (arr[parent].priority < priority) {
                    break;
                }
                this._swap(index, parent);
                index = parent;
            }
        };

        PriorityQueue.prototype._swap = function (i, j) {
            var arr = this._arr;
            var keyIndices = this._keyIndices;
            var origArrI = arr[i];
            var origArrJ = arr[j];
            arr[i] = origArrJ;
            arr[j] = origArrI;
            keyIndices[origArrJ.key] = i;
            keyIndices[origArrI.key] = j;
        };

    }, {}], 7: [function (require, module, exports) {
        var util = require('./util');

        module.exports = Set;

        /**
         * Constructs a new Set with an optional set of `initialKeys`.
         *
         * It is important to note that keys are coerced to String for most purposes
         * with this object, similar to the behavior of JavaScript's Object. For
         * example, the following will add only one key:
         *
         *     var s = new Set();
         *     s.add(1);
         *     s.add("1");
         *
         * However, the type of the key is preserved internally so that `keys` returns
         * the original key set uncoerced. For the above example, `keys` would return
         * `[1]`.
         */
        function Set(initialKeys) {
            this._size = 0;
            this._keys = {};

            if (initialKeys) {
                for (var i = 0, il = initialKeys.length; i < il; ++i) {
                    this.add(initialKeys[i]);
                }
            }
        }

        /**
         * Returns a new Set that represents the set intersection of the array of given
         * sets.
         */
        Set.intersect = function (sets) {
            if (sets.length === 0) {
                return new Set();
            }

            var result = new Set(!util.isArray(sets[0]) ? sets[0].keys() : sets[0]);
            for (var i = 1, il = sets.length; i < il; ++i) {
                var resultKeys = result.keys(),
                    other = !util.isArray(sets[i]) ? sets[i] : new Set(sets[i]);
                for (var j = 0, jl = resultKeys.length; j < jl; ++j) {
                    var key = resultKeys[j];
                    if (!other.has(key)) {
                        result.remove(key);
                    }
                }
            }

            return result;
        };

        /**
         * Returns a new Set that represents the set union of the array of given sets.
         */
        Set.union = function (sets) {
            var totalElems = util.reduce(sets, function (lhs, rhs) {
                return lhs + (rhs.size ? rhs.size() : rhs.length);
            }, 0);
            var arr = new Array(totalElems);

            var k = 0;
            for (var i = 0, il = sets.length; i < il; ++i) {
                var cur = sets[i],
                    keys = !util.isArray(cur) ? cur.keys() : cur;
                for (var j = 0, jl = keys.length; j < jl; ++j) {
                    arr[k++] = keys[j];
                }
            }

            return new Set(arr);
        };

        /**
         * Returns the size of this set in `O(1)` time.
         */
        Set.prototype.size = function () {
            return this._size;
        };

        /**
         * Returns the keys in this set. Takes `O(n)` time.
         */
        Set.prototype.keys = function () {
            return values(this._keys);
        };

        /**
         * Tests if a key is present in this Set. Returns `true` if it is and `false`
         * if not. Takes `O(1)` time.
         */
        Set.prototype.has = function (key) {
            return key in this._keys;
        };

        /**
         * Adds a new key to this Set if it is not already present. Returns `true` if
         * the key was added and `false` if it was already present. Takes `O(1)` time.
         */
        Set.prototype.add = function (key) {
            if (!(key in this._keys)) {
                this._keys[key] = key;
                ++this._size;
                return true;
            }
            return false;
        };

        /**
         * Removes a key from this Set. If the key was removed this function returns
         * `true`. If not, it returns `false`. Takes `O(1)` time.
         */
        Set.prototype.remove = function (key) {
            if (key in this._keys) {
                delete this._keys[key];
                --this._size;
                return true;
            }
            return false;
        };

        /*
         * Returns an array of all values for properties of **o**.
         */
        function values(o) {
            var ks = Object.keys(o),
                len = ks.length,
                result = new Array(len),
                i;
            for (i = 0; i < len; ++i) {
                result[i] = o[ks[i]];
            }
            return result;
        }

    }, { "./util": 8 }], 8: [function (require, module, exports) {
        /*
         * This polyfill comes from
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
         */
        if (!Array.isArray) {
            exports.isArray = function (vArg) {
                return Object.prototype.toString.call(vArg) === '[object Array]';
            };
        } else {
            exports.isArray = Array.isArray;
        }

        /*
         * Slightly adapted polyfill from
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
         */
        if ('function' !== typeof Array.prototype.reduce) {
            exports.reduce = function (array, callback, opt_initialValue) {
                'use strict';
                if (null === array || 'undefined' === typeof array) {
                    // At the moment all modern browsers, that support strict mode, have
                    // native implementation of Array.prototype.reduce. For instance, IE8
                    // does not support strict mode, so this check is actually useless.
                    throw new TypeError(
                        'Array.prototype.reduce called on null or undefined');
                }
                if ('function' !== typeof callback) {
                    throw new TypeError(callback + ' is not a function');
                }
                var index, value,
                    length = array.length >>> 0,
                    isValueSet = false;
                if (1 < arguments.length) {
                    value = opt_initialValue;
                    isValueSet = true;
                }
                for (index = 0; length > index; ++index) {
                    if (array.hasOwnProperty(index)) {
                        if (isValueSet) {
                            value = callback(value, array[index], index, array);
                        }
                        else {
                            value = array[index];
                            isValueSet = true;
                        }
                    }
                }
                if (!isValueSet) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }
                return value;
            };
        } else {
            exports.reduce = function (array, callback, opt_initialValue) {
                return array.reduce(callback, opt_initialValue);
            };
        }

    }, {}], 9: [function (require, module, exports) {
        module.exports = '1.1.3';

    }, {}], 10: [function (require, module, exports) {
        require("./d3");
        module.exports = d3;
        (function () { delete this.d3; })(); // unset global

    }, {}], 11: [function (require, module, exports) {
        /*
        Copyright (c) 2012-2013 Chris Pettitt
        
        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:
        
        The above copyright notice and this permission notice shall be included in
        all copies or substantial portions of the Software.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
        THE SOFTWARE.
        */
        exports.Digraph = require("graphlib").Digraph;
        exports.Graph = require("graphlib").Graph;
        exports.layout = require("./lib/layout");
        exports.version = require("./lib/version");

    }, { "./lib/layout": 12, "./lib/version": 27, "graphlib": 28 }], 12: [function (require, module, exports) {
        var util = require('./util'),
            rank = require('./rank'),
            order = require('./order'),
            CGraph = require('graphlib').CGraph,
            CDigraph = require('graphlib').CDigraph;

        module.exports = function () {
            // External configuration
            var config = {
                // How much debug information to include?
                debugLevel: 0,
                // Max number of sweeps to perform in order phase
                orderMaxSweeps: order.DEFAULT_MAX_SWEEPS,
                // Use network simplex algorithm in ranking
                rankSimplex: false,
                // Rank direction. Valid values are (TB, LR)
                rankDir: 'TB'
            };

            // Phase functions
            var position = require('./position')();

            // This layout object
            var self = {};

            self.orderIters = util.propertyAccessor(self, config, 'orderMaxSweeps');

            self.rankSimplex = util.propertyAccessor(self, config, 'rankSimplex');

            self.nodeSep = delegateProperty(position.nodeSep);
            self.edgeSep = delegateProperty(position.edgeSep);
            self.universalSep = delegateProperty(position.universalSep);
            self.rankSep = delegateProperty(position.rankSep);
            self.rankDir = util.propertyAccessor(self, config, 'rankDir');
            self.debugAlignment = delegateProperty(position.debugAlignment);

            self.debugLevel = util.propertyAccessor(self, config, 'debugLevel', function (x) {
                util.log.level = x;
                position.debugLevel(x);
            });

            self.run = util.time('Total layout', run);

            self._normalize = normalize;

            return self;

            /*
             * Constructs an adjacency graph using the nodes and edges specified through
             * config. For each node and edge we add a property `dagre` that contains an
             * object that will hold intermediate and final layout information. Some of
             * the contents include:
             *
             *  1) A generated ID that uniquely identifies the object.
             *  2) Dimension information for nodes (copied from the source node).
             *  3) Optional dimension information for edges.
             *
             * After the adjacency graph is constructed the code no longer needs to use
             * the original nodes and edges passed in via config.
             */
            function initLayoutGraph(inputGraph) {
                var g = new CDigraph();

                inputGraph.eachNode(function (u, value) {
                    if (value === undefined) value = {};
                    g.addNode(u, {
                        width: value.width,
                        height: value.height
                    });
                    if (value.hasOwnProperty('rank')) {
                        g.node(u).prefRank = value.rank;
                    }
                });

                // Set up subgraphs
                if (inputGraph.parent) {
                    inputGraph.nodes().forEach(function (u) {
                        g.parent(u, inputGraph.parent(u));
                    });
                }

                inputGraph.eachEdge(function (e, u, v, value) {
                    if (value === undefined) value = {};
                    var newValue = {
                        e: e,
                        minLen: value.minLen || 1,
                        width: value.width || 0,
                        height: value.height || 0,
                        points: []
                    };

                    g.addEdge(null, u, v, newValue);
                });

                // Initial graph attributes
                var graphValue = inputGraph.graph() || {};
                g.graph({
                    rankDir: graphValue.rankDir || config.rankDir,
                    orderRestarts: graphValue.orderRestarts
                });

                return g;
            }

            function run(inputGraph) {
                var rankSep = self.rankSep();
                var g;
                try {
                    // Build internal graph
                    g = util.time('initLayoutGraph', initLayoutGraph)(inputGraph);

                    if (g.order() === 0) {
                        return g;
                    }

                    // Make space for edge labels
                    g.eachEdge(function (e, s, t, a) {
                        a.minLen *= 2;
                    });
                    self.rankSep(rankSep / 2);

                    // Determine the rank for each node. Nodes with a lower rank will appear
                    // above nodes of higher rank.
                    util.time('rank.run', rank.run)(g, config.rankSimplex);

                    // Normalize the graph by ensuring that every edge is proper (each edge has
                    // a length of 1). We achieve this by adding dummy nodes to long edges,
                    // thus shortening them.
                    util.time('normalize', normalize)(g);

                    // Order the nodes so that edge crossings are minimized.
                    util.time('order', order)(g, config.orderMaxSweeps);

                    // Find the x and y coordinates for every node in the graph.
                    util.time('position', position.run)(g);

                    // De-normalize the graph by removing dummy nodes and augmenting the
                    // original long edges with coordinate information.
                    util.time('undoNormalize', undoNormalize)(g);

                    // Reverses points for edges that are in a reversed state.
                    util.time('fixupEdgePoints', fixupEdgePoints)(g);

                    // Restore delete edges and reverse edges that were reversed in the rank
                    // phase.
                    util.time('rank.restoreEdges', rank.restoreEdges)(g);

                    // Construct final result graph and return it
                    return util.time('createFinalGraph', createFinalGraph)(g, inputGraph.isDirected());
                } finally {
                    self.rankSep(rankSep);
                }
            }

            /*
             * This function is responsible for 'normalizing' the graph. The process of
             * normalization ensures that no edge in the graph has spans more than one
             * rank. To do this it inserts dummy nodes as needed and links them by adding
             * dummy edges. This function keeps enough information in the dummy nodes and
             * edges to ensure that the original graph can be reconstructed later.
             *
             * This method assumes that the input graph is cycle free.
             */
            function normalize(g) {
                var dummyCount = 0;
                g.eachEdge(function (e, s, t, a) {
                    var sourceRank = g.node(s).rank;
                    var targetRank = g.node(t).rank;
                    if (sourceRank + 1 < targetRank) {
                        for (var u = s, rank = sourceRank + 1, i = 0; rank < targetRank; ++rank, ++i) {
                            var v = '_D' + (++dummyCount);
                            var node = {
                                width: a.width,
                                height: a.height,
                                edge: { id: e, source: s, target: t, attrs: a },
                                rank: rank,
                                dummy: true
                            };

                            // If this node represents a bend then we will use it as a control
                            // point. For edges with 2 segments this will be the center dummy
                            // node. For edges with more than two segments, this will be the
                            // first and last dummy node.
                            if (i === 0) node.index = 0;
                            else if (rank + 1 === targetRank) node.index = 1;

                            g.addNode(v, node);
                            g.addEdge(null, u, v, {});
                            u = v;
                        }
                        g.addEdge(null, u, t, {});
                        g.delEdge(e);
                    }
                });
            }

            /*
             * Reconstructs the graph as it was before normalization. The positions of
             * dummy nodes are used to build an array of points for the original 'long'
             * edge. Dummy nodes and edges are removed.
             */
            function undoNormalize(g) {
                g.eachNode(function (u, a) {
                    if (a.dummy) {
                        if ('index' in a) {
                            var edge = a.edge;
                            if (!g.hasEdge(edge.id)) {
                                g.addEdge(edge.id, edge.source, edge.target, edge.attrs);
                            }
                            var points = g.edge(edge.id).points;
                            points[a.index] = { x: a.x, y: a.y, ul: a.ul, ur: a.ur, dl: a.dl, dr: a.dr };
                        }
                        g.delNode(u);
                    }
                });
            }

            /*
             * For each edge that was reversed during the `acyclic` step, reverse its
             * array of points.
             */
            function fixupEdgePoints(g) {
                g.eachEdge(function (e, s, t, a) { if (a.reversed) a.points.reverse(); });
            }

            function createFinalGraph(g, isDirected) {
                var out = isDirected ? new CDigraph() : new CGraph();
                out.graph(g.graph());
                g.eachNode(function (u, value) { out.addNode(u, value); });
                g.eachNode(function (u) { out.parent(u, g.parent(u)); });
                g.eachEdge(function (e, u, v, value) {
                    out.addEdge(value.e, u, v, value);
                });

                // Attach bounding box information
                var maxX = 0, maxY = 0;
                g.eachNode(function (u, value) {
                    if (!g.children(u).length) {
                        maxX = Math.max(maxX, value.x + value.width / 2);
                        maxY = Math.max(maxY, value.y + value.height / 2);
                    }
                });
                g.eachEdge(function (e, u, v, value) {
                    var maxXPoints = Math.max.apply(Math, value.points.map(function (p) { return p.x; }));
                    var maxYPoints = Math.max.apply(Math, value.points.map(function (p) { return p.y; }));
                    maxX = Math.max(maxX, maxXPoints + value.width / 2);
                    maxY = Math.max(maxY, maxYPoints + value.height / 2);
                });
                out.graph().width = maxX;
                out.graph().height = maxY;

                return out;
            }

            /*
             * Given a function, a new function is returned that invokes the given
             * function. The return value from the function is always the `self` object.
             */
            function delegateProperty(f) {
                return function () {
                    if (!arguments.length) return f();
                    f.apply(null, arguments);
                    return self;
                };
            }
        };


    }, { "./order": 13, "./position": 18, "./rank": 19, "./util": 26, "graphlib": 28 }], 13: [function (require, module, exports) {
        var util = require('./util'),
            crossCount = require('./order/crossCount'),
            initLayerGraphs = require('./order/initLayerGraphs'),
            initOrder = require('./order/initOrder'),
            sortLayer = require('./order/sortLayer');

        module.exports = order;

        // The maximum number of sweeps to perform before finishing the order phase.
        var DEFAULT_MAX_SWEEPS = 24;
        order.DEFAULT_MAX_SWEEPS = DEFAULT_MAX_SWEEPS;

        /*
         * Runs the order phase with the specified `graph, `maxSweeps`, and
         * `debugLevel`. If `maxSweeps` is not specified we use `DEFAULT_MAX_SWEEPS`.
         * If `debugLevel` is not set we assume 0.
         */
        function order(g, maxSweeps) {
            if (arguments.length < 2) {
                maxSweeps = DEFAULT_MAX_SWEEPS;
            }

            var restarts = g.graph().orderRestarts || 0;

            var layerGraphs = initLayerGraphs(g);
            // TODO: remove this when we add back support for ordering clusters
            layerGraphs.forEach(function (lg) {
                lg = lg.filterNodes(function (u) { return !g.children(u).length; });
            });

            var iters = 0,
                currentBestCC,
                allTimeBestCC = Number.MAX_VALUE,
                allTimeBest = {};

            function saveAllTimeBest() {
                g.eachNode(function (u, value) { allTimeBest[u] = value.order; });
            }

            for (var j = 0; j < Number(restarts) + 1 && allTimeBestCC !== 0; ++j) {
                currentBestCC = Number.MAX_VALUE;
                initOrder(g, restarts > 0);

                util.log(2, 'Order phase start cross count: ' + g.graph().orderInitCC);

                var i, lastBest, cc;
                for (i = 0, lastBest = 0; lastBest < 4 && i < maxSweeps && currentBestCC > 0; ++i, ++lastBest, ++iters) {
                    sweep(g, layerGraphs, i);
                    cc = crossCount(g);
                    if (cc < currentBestCC) {
                        lastBest = 0;
                        currentBestCC = cc;
                        if (cc < allTimeBestCC) {
                            saveAllTimeBest();
                            allTimeBestCC = cc;
                        }
                    }
                    util.log(3, 'Order phase start ' + j + ' iter ' + i + ' cross count: ' + cc);
                }
            }

            Object.keys(allTimeBest).forEach(function (u) {
                if (!g.children || !g.children(u).length) {
                    g.node(u).order = allTimeBest[u];
                }
            });
            g.graph().orderCC = allTimeBestCC;

            util.log(2, 'Order iterations: ' + iters);
            util.log(2, 'Order phase best cross count: ' + g.graph().orderCC);
        }

        function predecessorWeights(g, nodes) {
            var weights = {};
            nodes.forEach(function (u) {
                weights[u] = g.inEdges(u).map(function (e) {
                    return g.node(g.source(e)).order;
                });
            });
            return weights;
        }

        function successorWeights(g, nodes) {
            var weights = {};
            nodes.forEach(function (u) {
                weights[u] = g.outEdges(u).map(function (e) {
                    return g.node(g.target(e)).order;
                });
            });
            return weights;
        }

        function sweep(g, layerGraphs, iter) {
            if (iter % 2 === 0) {
                sweepDown(g, layerGraphs, iter);
            } else {
                sweepUp(g, layerGraphs, iter);
            }
        }

        function sweepDown(g, layerGraphs) {
            var cg;
            for (i = 1; i < layerGraphs.length; ++i) {
                cg = sortLayer(layerGraphs[i], cg, predecessorWeights(g, layerGraphs[i].nodes()));
            }
        }

        function sweepUp(g, layerGraphs) {
            var cg;
            for (i = layerGraphs.length - 2; i >= 0; --i) {
                sortLayer(layerGraphs[i], cg, successorWeights(g, layerGraphs[i].nodes()));
            }
        }

    }, { "./order/crossCount": 14, "./order/initLayerGraphs": 15, "./order/initOrder": 16, "./order/sortLayer": 17, "./util": 26 }], 14: [function (require, module, exports) {
        var util = require('../util');

        module.exports = crossCount;

        /*
         * Returns the cross count for the given graph.
         */
        function crossCount(g) {
            var cc = 0;
            var ordering = util.ordering(g);
            for (var i = 1; i < ordering.length; ++i) {
                cc += twoLayerCrossCount(g, ordering[i - 1], ordering[i]);
            }
            return cc;
        }

        /*
         * This function searches through a ranked and ordered graph and counts the
         * number of edges that cross. This algorithm is derived from:
         *
         *    W. Barth et al., Bilayer Cross Counting, JGAA, 8(2) 179–194 (2004)
         */
        function twoLayerCrossCount(g, layer1, layer2) {
            var indices = [];
            layer1.forEach(function (u) {
                var nodeIndices = [];
                g.outEdges(u).forEach(function (e) { nodeIndices.push(g.node(g.target(e)).order); });
                nodeIndices.sort(function (x, y) { return x - y; });
                indices = indices.concat(nodeIndices);
            });

            var firstIndex = 1;
            while (firstIndex < layer2.length) firstIndex <<= 1;

            var treeSize = 2 * firstIndex - 1;
            firstIndex -= 1;

            var tree = [];
            for (var i = 0; i < treeSize; ++i) { tree[i] = 0; }

            var cc = 0;
            indices.forEach(function (i) {
                var treeIndex = i + firstIndex;
                ++tree[treeIndex];
                while (treeIndex > 0) {
                    if (treeIndex % 2) {
                        cc += tree[treeIndex + 1];
                    }
                    treeIndex = (treeIndex - 1) >> 1;
                    ++tree[treeIndex];
                }
            });

            return cc;
        }

    }, { "../util": 26 }], 15: [function (require, module, exports) {
        var nodesFromList = require('graphlib').filter.nodesFromList,
            /* jshint -W079 */
            Set = require('cp-data').Set;

        module.exports = initLayerGraphs;

        /*
         * This function takes a compound layered graph, g, and produces an array of
         * layer graphs. Each entry in the array represents a subgraph of nodes
         * relevant for performing crossing reduction on that layer.
         */
        function initLayerGraphs(g) {
            var ranks = [];

            function dfs(u) {
                if (u === null) {
                    g.children(u).forEach(function (v) { dfs(v); });
                    return;
                }

                var value = g.node(u);
                value.minRank = ('rank' in value) ? value.rank : Number.MAX_VALUE;
                value.maxRank = ('rank' in value) ? value.rank : Number.MIN_VALUE;
                var uRanks = new Set();
                g.children(u).forEach(function (v) {
                    var rs = dfs(v);
                    uRanks = Set.union([uRanks, rs]);
                    value.minRank = Math.min(value.minRank, g.node(v).minRank);
                    value.maxRank = Math.max(value.maxRank, g.node(v).maxRank);
                });

                if ('rank' in value) uRanks.add(value.rank);

                uRanks.keys().forEach(function (r) {
                    if (!(r in ranks)) ranks[r] = [];
                    ranks[r].push(u);
                });

                return uRanks;
            }
            dfs(null);

            var layerGraphs = [];
            ranks.forEach(function (us, rank) {
                layerGraphs[rank] = g.filterNodes(nodesFromList(us));
            });

            return layerGraphs;
        }

    }, { "cp-data": 5, "graphlib": 28 }], 16: [function (require, module, exports) {
        var crossCount = require('./crossCount'),
            util = require('../util');

        module.exports = initOrder;

        /*
         * Given a graph with a set of layered nodes (i.e. nodes that have a `rank`
         * attribute) this function attaches an `order` attribute that uniquely
         * arranges each node of each rank. If no constraint graph is provided the
         * order of the nodes in each rank is entirely arbitrary.
         */
        function initOrder(g, random) {
            var layers = [];

            g.eachNode(function (u, value) {
                var layer = layers[value.rank];
                if (g.children && g.children(u).length > 0) return;
                if (!layer) {
                    layer = layers[value.rank] = [];
                }
                layer.push(u);
            });

            layers.forEach(function (layer) {
                if (random) {
                    util.shuffle(layer);
                }
                layer.forEach(function (u, i) {
                    g.node(u).order = i;
                });
            });

            var cc = crossCount(g);
            g.graph().orderInitCC = cc;
            g.graph().orderCC = Number.MAX_VALUE;
        }

    }, { "../util": 26, "./crossCount": 14 }], 17: [function (require, module, exports) {
        var util = require('../util');
        /*
            Digraph = require('graphlib').Digraph,
            topsort = require('graphlib').alg.topsort,
            nodesFromList = require('graphlib').filter.nodesFromList;
        */

        module.exports = sortLayer;

        /*
        function sortLayer(g, cg, weights) {
          var result = sortLayerSubgraph(g, null, cg, weights);
          result.list.forEach(function(u, i) {
            g.node(u).order = i;
          });
          return result.constraintGraph;
        }
        */

        function sortLayer(g, cg, weights) {
            var ordering = [];
            var bs = {};
            g.eachNode(function (u, value) {
                ordering[value.order] = u;
                var ws = weights[u];
                if (ws.length) {
                    bs[u] = util.sum(ws) / ws.length;
                }
            });

            var toSort = g.nodes().filter(function (u) { return bs[u] !== undefined; });
            toSort.sort(function (x, y) {
                return bs[x] - bs[y] || g.node(x).order - g.node(y).order;
            });

            for (var i = 0, j = 0, jl = toSort.length; j < jl; ++i) {
                if (bs[ordering[i]] !== undefined) {
                    g.node(toSort[j++]).order = i;
                }
            }
        }

        // TOOD: re-enable constrained sorting once we have a strategy for handling
        // undefined barycenters.
        /*
        function sortLayerSubgraph(g, sg, cg, weights) {
          cg = cg ? cg.filterNodes(nodesFromList(g.children(sg))) : new Digraph();
        
          var nodeData = {};
          g.children(sg).forEach(function(u) {
            if (g.children(u).length) {
              nodeData[u] = sortLayerSubgraph(g, u, cg, weights);
              nodeData[u].firstSG = u;
              nodeData[u].lastSG = u;
            } else {
              var ws = weights[u];
              nodeData[u] = {
                degree: ws.length,
                barycenter: ws.length > 0 ? util.sum(ws) / ws.length : 0,
                list: [u]
              };
            }
          });
        
          resolveViolatedConstraints(g, cg, nodeData);
        
          var keys = Object.keys(nodeData);
          keys.sort(function(x, y) {
            return nodeData[x].barycenter - nodeData[y].barycenter;
          });
        
          var result =  keys.map(function(u) { return nodeData[u]; })
                            .reduce(function(lhs, rhs) { return mergeNodeData(g, lhs, rhs); });
          return result;
        }
        
        /*
        function mergeNodeData(g, lhs, rhs) {
          var cg = mergeDigraphs(lhs.constraintGraph, rhs.constraintGraph);
        
          if (lhs.lastSG !== undefined && rhs.firstSG !== undefined) {
            if (cg === undefined) {
              cg = new Digraph();
            }
            if (!cg.hasNode(lhs.lastSG)) { cg.addNode(lhs.lastSG); }
            cg.addNode(rhs.firstSG);
            cg.addEdge(null, lhs.lastSG, rhs.firstSG);
          }
        
          return {
            degree: lhs.degree + rhs.degree,
            barycenter: (lhs.barycenter * lhs.degree + rhs.barycenter * rhs.degree) /
                        (lhs.degree + rhs.degree),
            list: lhs.list.concat(rhs.list),
            firstSG: lhs.firstSG !== undefined ? lhs.firstSG : rhs.firstSG,
            lastSG: rhs.lastSG !== undefined ? rhs.lastSG : lhs.lastSG,
            constraintGraph: cg
          };
        }
        
        function mergeDigraphs(lhs, rhs) {
          if (lhs === undefined) return rhs;
          if (rhs === undefined) return lhs;
        
          lhs = lhs.copy();
          rhs.nodes().forEach(function(u) { lhs.addNode(u); });
          rhs.edges().forEach(function(e, u, v) { lhs.addEdge(null, u, v); });
          return lhs;
        }
        
        function resolveViolatedConstraints(g, cg, nodeData) {
          // Removes nodes `u` and `v` from `cg` and makes any edges incident on them
          // incident on `w` instead.
          function collapseNodes(u, v, w) {
            // TODO original paper removes self loops, but it is not obvious when this would happen
            cg.inEdges(u).forEach(function(e) {
              cg.delEdge(e);
              cg.addEdge(null, cg.source(e), w);
            });
        
            cg.outEdges(v).forEach(function(e) {
              cg.delEdge(e);
              cg.addEdge(null, w, cg.target(e));
            });
        
            cg.delNode(u);
            cg.delNode(v);
          }
        
          var violated;
          while ((violated = findViolatedConstraint(cg, nodeData)) !== undefined) {
            var source = cg.source(violated),
                target = cg.target(violated);
        
            var v;
            while ((v = cg.addNode(null)) && g.hasNode(v)) {
              cg.delNode(v);
            }
        
            // Collapse barycenter and list
            nodeData[v] = mergeNodeData(g, nodeData[source], nodeData[target]);
            delete nodeData[source];
            delete nodeData[target];
        
            collapseNodes(source, target, v);
            if (cg.incidentEdges(v).length === 0) { cg.delNode(v); }
          }
        }
        
        function findViolatedConstraint(cg, nodeData) {
          var us = topsort(cg);
          for (var i = 0; i < us.length; ++i) {
            var u = us[i];
            var inEdges = cg.inEdges(u);
            for (var j = 0; j < inEdges.length; ++j) {
              var e = inEdges[j];
              if (nodeData[cg.source(e)].barycenter >= nodeData[u].barycenter) {
                return e;
              }
            }
          }
        }
        */

    }, { "../util": 26 }], 18: [function (require, module, exports) {
        var util = require('./util');

        /*
         * The algorithms here are based on Brandes and Köpf, "Fast and Simple
         * Horizontal Coordinate Assignment".
         */
        module.exports = function () {
            // External configuration
            var config = {
                nodeSep: 50,
                edgeSep: 10,
                universalSep: null,
                rankSep: 30
            };

            var self = {};

            self.nodeSep = util.propertyAccessor(self, config, 'nodeSep');
            self.edgeSep = util.propertyAccessor(self, config, 'edgeSep');
            // If not null this separation value is used for all nodes and edges
            // regardless of their widths. `nodeSep` and `edgeSep` are ignored with this
            // option.
            self.universalSep = util.propertyAccessor(self, config, 'universalSep');
            self.rankSep = util.propertyAccessor(self, config, 'rankSep');
            self.debugLevel = util.propertyAccessor(self, config, 'debugLevel');

            self.run = run;

            return self;

            function run(g) {
                g = g.filterNodes(util.filterNonSubgraphs(g));

                var layering = util.ordering(g);

                var conflicts = findConflicts(g, layering);

                var xss = {};
                ['u', 'd'].forEach(function (vertDir) {
                    if (vertDir === 'd') layering.reverse();

                    ['l', 'r'].forEach(function (horizDir) {
                        if (horizDir === 'r') reverseInnerOrder(layering);

                        var dir = vertDir + horizDir;
                        var align = verticalAlignment(g, layering, conflicts, vertDir === 'u' ? 'predecessors' : 'successors');
                        xss[dir] = horizontalCompaction(g, layering, align.pos, align.root, align.align);

                        if (config.debugLevel >= 3)
                            debugPositioning(vertDir + horizDir, g, layering, xss[dir]);

                        if (horizDir === 'r') flipHorizontally(xss[dir]);

                        if (horizDir === 'r') reverseInnerOrder(layering);
                    });

                    if (vertDir === 'd') layering.reverse();
                });

                balance(g, layering, xss);

                g.eachNode(function (v) {
                    var xs = [];
                    for (var alignment in xss) {
                        var alignmentX = xss[alignment][v];
                        posXDebug(alignment, g, v, alignmentX);
                        xs.push(alignmentX);
                    }
                    xs.sort(function (x, y) { return x - y; });
                    posX(g, v, (xs[1] + xs[2]) / 2);
                });

                // Align y coordinates with ranks
                var y = 0, reverseY = g.graph().rankDir === 'BT' || g.graph().rankDir === 'RL';
                layering.forEach(function (layer) {
                    var maxHeight = util.max(layer.map(function (u) { return height(g, u); }));
                    y += maxHeight / 2;
                    layer.forEach(function (u) {
                        posY(g, u, reverseY ? -y : y);
                    });
                    y += maxHeight / 2 + config.rankSep;
                });

                // Translate layout so that top left corner of bounding rectangle has
                // coordinate (0, 0).
                var minX = util.min(g.nodes().map(function (u) { return posX(g, u) - width(g, u) / 2; }));
                var minY = util.min(g.nodes().map(function (u) { return posY(g, u) - height(g, u) / 2; }));
                g.eachNode(function (u) {
                    posX(g, u, posX(g, u) - minX);
                    posY(g, u, posY(g, u) - minY);
                });
            }

            /*
             * Generate an ID that can be used to represent any undirected edge that is
             * incident on `u` and `v`.
             */
            function undirEdgeId(u, v) {
                return u < v
                  ? u.toString().length + ':' + u + '-' + v
                  : v.toString().length + ':' + v + '-' + u;
            }

            function findConflicts(g, layering) {
                var conflicts = {}, // Set of conflicting edge ids
                    pos = {},       // Position of node in its layer
                    prevLayer,
                    currLayer,
                    k0,     // Position of the last inner segment in the previous layer
                    l,      // Current position in the current layer (for iteration up to `l1`)
                    k1;     // Position of the next inner segment in the previous layer or
                // the position of the last element in the previous layer

                if (layering.length <= 2) return conflicts;

                function updateConflicts(v) {
                    var k = pos[v];
                    if (k < k0 || k > k1) {
                        conflicts[undirEdgeId(currLayer[l], v)] = true;
                    }
                }

                layering[1].forEach(function (u, i) { pos[u] = i; });
                for (var i = 1; i < layering.length - 1; ++i) {
                    prevLayer = layering[i];
                    currLayer = layering[i + 1];
                    k0 = 0;
                    l = 0;

                    // Scan current layer for next node that is incident to an inner segement
                    // between layering[i+1] and layering[i].
                    for (var l1 = 0; l1 < currLayer.length; ++l1) {
                        var u = currLayer[l1]; // Next inner segment in the current layer or
                        // last node in the current layer
                        pos[u] = l1;
                        k1 = undefined;

                        if (g.node(u).dummy) {
                            var uPred = g.predecessors(u)[0];
                            // Note: In the case of self loops and sideways edges it is possible
                            // for a dummy not to have a predecessor.
                            if (uPred !== undefined && g.node(uPred).dummy)
                                k1 = pos[uPred];
                        }
                        if (k1 === undefined && l1 === currLayer.length - 1)
                            k1 = prevLayer.length - 1;

                        if (k1 !== undefined) {
                            for (; l <= l1; ++l) {
                                g.predecessors(currLayer[l]).forEach(updateConflicts);
                            }
                            k0 = k1;
                        }
                    }
                }

                return conflicts;
            }

            function verticalAlignment(g, layering, conflicts, relationship) {
                var pos = {},   // Position for a node in its layer
                    root = {},  // Root of the block that the node participates in
                    align = {}; // Points to the next node in the block or, if the last
                // element in the block, points to the first block's root

                layering.forEach(function (layer) {
                    layer.forEach(function (u, i) {
                        root[u] = u;
                        align[u] = u;
                        pos[u] = i;
                    });
                });

                layering.forEach(function (layer) {
                    var prevIdx = -1;
                    layer.forEach(function (v) {
                        var related = g[relationship](v), // Adjacent nodes from the previous layer
                            mid;                          // The mid point in the related array

                        if (related.length > 0) {
                            related.sort(function (x, y) { return pos[x] - pos[y]; });
                            mid = (related.length - 1) / 2;
                            related.slice(Math.floor(mid), Math.ceil(mid) + 1).forEach(function (u) {
                                if (align[v] === v) {
                                    if (!conflicts[undirEdgeId(u, v)] && prevIdx < pos[u]) {
                                        align[u] = v;
                                        align[v] = root[v] = root[u];
                                        prevIdx = pos[u];
                                    }
                                }
                            });
                        }
                    });
                });

                return { pos: pos, root: root, align: align };
            }

            // This function deviates from the standard BK algorithm in two ways. First
            // it takes into account the size of the nodes. Second it includes a fix to
            // the original algorithm that is described in Carstens, "Node and Label
            // Placement in a Layered Layout Algorithm".
            function horizontalCompaction(g, layering, pos, root, align) {
                var sink = {},       // Mapping of node id -> sink node id for class
                    maybeShift = {}, // Mapping of sink node id -> { class node id, min shift }
                    shift = {},      // Mapping of sink node id -> shift
                    pred = {},       // Mapping of node id -> predecessor node (or null)
                    xs = {};         // Calculated X positions

                layering.forEach(function (layer) {
                    layer.forEach(function (u, i) {
                        sink[u] = u;
                        maybeShift[u] = {};
                        if (i > 0)
                            pred[u] = layer[i - 1];
                    });
                });

                function updateShift(toShift, neighbor, delta) {
                    if (!(neighbor in maybeShift[toShift])) {
                        maybeShift[toShift][neighbor] = delta;
                    } else {
                        maybeShift[toShift][neighbor] = Math.min(maybeShift[toShift][neighbor], delta);
                    }
                }

                function placeBlock(v) {
                    if (!(v in xs)) {
                        xs[v] = 0;
                        var w = v;
                        do {
                            if (pos[w] > 0) {
                                var u = root[pred[w]];
                                placeBlock(u);
                                if (sink[v] === v) {
                                    sink[v] = sink[u];
                                }
                                var delta = sep(g, pred[w]) + sep(g, w);
                                if (sink[v] !== sink[u]) {
                                    updateShift(sink[u], sink[v], xs[v] - xs[u] - delta);
                                } else {
                                    xs[v] = Math.max(xs[v], xs[u] + delta);
                                }
                            }
                            w = align[w];
                        } while (w !== v);
                    }
                }

                // Root coordinates relative to sink
                util.values(root).forEach(function (v) {
                    placeBlock(v);
                });

                // Absolute coordinates
                // There is an assumption here that we've resolved shifts for any classes
                // that begin at an earlier layer. We guarantee this by visiting layers in
                // order.
                layering.forEach(function (layer) {
                    layer.forEach(function (v) {
                        xs[v] = xs[root[v]];
                        if (v === root[v] && v === sink[v]) {
                            var minShift = 0;
                            if (v in maybeShift && Object.keys(maybeShift[v]).length > 0) {
                                minShift = util.min(Object.keys(maybeShift[v])
                                                     .map(function (u) {
                                                         return maybeShift[v][u] + (u in shift ? shift[u] : 0);
                                                     }
                                                     ));
                            }
                            shift[v] = minShift;
                        }
                    });
                });

                layering.forEach(function (layer) {
                    layer.forEach(function (v) {
                        xs[v] += shift[sink[root[v]]] || 0;
                    });
                });

                return xs;
            }

            function findMinCoord(g, layering, xs) {
                return util.min(layering.map(function (layer) {
                    var u = layer[0];
                    return xs[u];
                }));
            }

            function findMaxCoord(g, layering, xs) {
                return util.max(layering.map(function (layer) {
                    var u = layer[layer.length - 1];
                    return xs[u];
                }));
            }

            function balance(g, layering, xss) {
                var min = {},                            // Min coordinate for the alignment
                    max = {},                            // Max coordinate for the alginment
                    smallestAlignment,
                    shift = {};                          // Amount to shift a given alignment

                function updateAlignment(v) {
                    xss[alignment][v] += shift[alignment];
                }

                var smallest = Number.POSITIVE_INFINITY;
                for (var alignment in xss) {
                    var xs = xss[alignment];
                    min[alignment] = findMinCoord(g, layering, xs);
                    max[alignment] = findMaxCoord(g, layering, xs);
                    var w = max[alignment] - min[alignment];
                    if (w < smallest) {
                        smallest = w;
                        smallestAlignment = alignment;
                    }
                }

                // Determine how much to adjust positioning for each alignment
                ['u', 'd'].forEach(function (vertDir) {
                    ['l', 'r'].forEach(function (horizDir) {
                        var alignment = vertDir + horizDir;
                        shift[alignment] = horizDir === 'l'
                            ? min[smallestAlignment] - min[alignment]
                            : max[smallestAlignment] - max[alignment];
                    });
                });

                // Find average of medians for xss array
                for (alignment in xss) {
                    g.eachNode(updateAlignment);
                }
            }

            function flipHorizontally(xs) {
                for (var u in xs) {
                    xs[u] = -xs[u];
                }
            }

            function reverseInnerOrder(layering) {
                layering.forEach(function (layer) {
                    layer.reverse();
                });
            }

            function width(g, u) {
                switch (g.graph().rankDir) {
                    case 'LR': return g.node(u).height;
                    case 'RL': return g.node(u).height;
                    default: return g.node(u).width;
                }
            }

            function height(g, u) {
                switch (g.graph().rankDir) {
                    case 'LR': return g.node(u).width;
                    case 'RL': return g.node(u).width;
                    default: return g.node(u).height;
                }
            }

            function sep(g, u) {
                if (config.universalSep !== null) {
                    return config.universalSep;
                }
                var w = width(g, u);
                var s = g.node(u).dummy ? config.edgeSep : config.nodeSep;
                return (w + s) / 2;
            }

            function posX(g, u, x) {
                if (g.graph().rankDir === 'LR' || g.graph().rankDir === 'RL') {
                    if (arguments.length < 3) {
                        return g.node(u).y;
                    } else {
                        g.node(u).y = x;
                    }
                } else {
                    if (arguments.length < 3) {
                        return g.node(u).x;
                    } else {
                        g.node(u).x = x;
                    }
                }
            }

            function posXDebug(name, g, u, x) {
                if (g.graph().rankDir === 'LR' || g.graph().rankDir === 'RL') {
                    if (arguments.length < 3) {
                        return g.node(u)[name];
                    } else {
                        g.node(u)[name] = x;
                    }
                } else {
                    if (arguments.length < 3) {
                        return g.node(u)[name];
                    } else {
                        g.node(u)[name] = x;
                    }
                }
            }

            function posY(g, u, y) {
                if (g.graph().rankDir === 'LR' || g.graph().rankDir === 'RL') {
                    if (arguments.length < 3) {
                        return g.node(u).x;
                    } else {
                        g.node(u).x = y;
                    }
                } else {
                    if (arguments.length < 3) {
                        return g.node(u).y;
                    } else {
                        g.node(u).y = y;
                    }
                }
            }

            function debugPositioning(align, g, layering, xs) {
                layering.forEach(function (l, li) {
                    var u, xU;
                    l.forEach(function (v) {
                        var xV = xs[v];
                        if (u) {
                            var s = sep(g, u) + sep(g, v);
                            if (xV - xU < s)
                                console.log('Position phase: sep violation. Align: ' + align + '. Layer: ' + li + '. ' +
                                  'U: ' + u + ' V: ' + v + '. Actual sep: ' + (xV - xU) + ' Expected sep: ' + s);
                        }
                        u = v;
                        xU = xV;
                    });
                });
            }
        };

    }, { "./util": 26 }], 19: [function (require, module, exports) {
        var util = require('./util'),
            acyclic = require('./rank/acyclic'),
            initRank = require('./rank/initRank'),
            feasibleTree = require('./rank/feasibleTree'),
            constraints = require('./rank/constraints'),
            simplex = require('./rank/simplex'),
            components = require('graphlib').alg.components,
            filter = require('graphlib').filter;

        exports.run = run;
        exports.restoreEdges = restoreEdges;

        /*
         * Heuristic function that assigns a rank to each node of the input graph with
         * the intent of minimizing edge lengths, while respecting the `minLen`
         * attribute of incident edges.
         *
         * Prerequisites:
         *
         *  * Each edge in the input graph must have an assigned 'minLen' attribute
         */
        function run(g, useSimplex) {
            expandSelfLoops(g);

            // If there are rank constraints on nodes, then build a new graph that
            // encodes the constraints.
            util.time('constraints.apply', constraints.apply)(g);

            expandSidewaysEdges(g);

            // Reverse edges to get an acyclic graph, we keep the graph in an acyclic
            // state until the very end.
            util.time('acyclic', acyclic)(g);

            // Convert the graph into a flat graph for ranking
            var flatGraph = g.filterNodes(util.filterNonSubgraphs(g));

            // Assign an initial ranking using DFS.
            initRank(flatGraph);

            // For each component improve the assigned ranks.
            components(flatGraph).forEach(function (cmpt) {
                var subgraph = flatGraph.filterNodes(filter.nodesFromList(cmpt));
                rankComponent(subgraph, useSimplex);
            });

            // Relax original constraints
            util.time('constraints.relax', constraints.relax(g));

            // When handling nodes with constrained ranks it is possible to end up with
            // edges that point to previous ranks. Most of the subsequent algorithms assume
            // that edges are pointing to successive ranks only. Here we reverse any "back
            // edges" and mark them as such. The acyclic algorithm will reverse them as a
            // post processing step.
            util.time('reorientEdges', reorientEdges)(g);
        }

        function restoreEdges(g) {
            acyclic.undo(g);
        }

        /*
         * Expand self loops into three dummy nodes. One will sit above the incident
         * node, one will be at the same level, and one below. The result looks like:
         *
         *         /--<--x--->--\
         *     node              y
         *         \--<--z--->--/
         *
         * Dummy nodes x, y, z give us the shape of a loop and node y is where we place
         * the label.
         *
         * TODO: consolidate knowledge of dummy node construction.
         * TODO: support minLen = 2
         */
        function expandSelfLoops(g) {
            g.eachEdge(function (e, u, v, a) {
                if (u === v) {
                    var x = addDummyNode(g, e, u, v, a, 0, false),
                        y = addDummyNode(g, e, u, v, a, 1, true),
                        z = addDummyNode(g, e, u, v, a, 2, false);
                    g.addEdge(null, x, u, { minLen: 1, selfLoop: true });
                    g.addEdge(null, x, y, { minLen: 1, selfLoop: true });
                    g.addEdge(null, u, z, { minLen: 1, selfLoop: true });
                    g.addEdge(null, y, z, { minLen: 1, selfLoop: true });
                    g.delEdge(e);
                }
            });
        }

        function expandSidewaysEdges(g) {
            g.eachEdge(function (e, u, v, a) {
                if (u === v) {
                    var origEdge = a.originalEdge,
                        dummy = addDummyNode(g, origEdge.e, origEdge.u, origEdge.v, origEdge.value, 0, true);
                    g.addEdge(null, u, dummy, { minLen: 1 });
                    g.addEdge(null, dummy, v, { minLen: 1 });
                    g.delEdge(e);
                }
            });
        }

        function addDummyNode(g, e, u, v, a, index, isLabel) {
            return g.addNode(null, {
                width: isLabel ? a.width : 0,
                height: isLabel ? a.height : 0,
                edge: { id: e, source: u, target: v, attrs: a },
                dummy: true,
                index: index
            });
        }

        function reorientEdges(g) {
            g.eachEdge(function (e, u, v, value) {
                if (g.node(u).rank > g.node(v).rank) {
                    g.delEdge(e);
                    value.reversed = true;
                    g.addEdge(e, v, u, value);
                }
            });
        }

        function rankComponent(subgraph, useSimplex) {
            var spanningTree = feasibleTree(subgraph);

            if (useSimplex) {
                util.log(1, 'Using network simplex for ranking');
                simplex(subgraph, spanningTree);
            }
            normalize(subgraph);
        }

        function normalize(g) {
            var m = util.min(g.nodes().map(function (u) { return g.node(u).rank; }));
            g.eachNode(function (u, node) { node.rank -= m; });
        }

    }, { "./rank/acyclic": 20, "./rank/constraints": 21, "./rank/feasibleTree": 22, "./rank/initRank": 23, "./rank/simplex": 25, "./util": 26, "graphlib": 28 }], 20: [function (require, module, exports) {
        var util = require('../util');

        module.exports = acyclic;
        module.exports.undo = undo;

        /*
         * This function takes a directed graph that may have cycles and reverses edges
         * as appropriate to break these cycles. Each reversed edge is assigned a
         * `reversed` attribute with the value `true`.
         *
         * There should be no self loops in the graph.
         */
        function acyclic(g) {
            var onStack = {},
                visited = {},
                reverseCount = 0;

            function dfs(u) {
                if (u in visited) return;
                visited[u] = onStack[u] = true;
                g.outEdges(u).forEach(function (e) {
                    var t = g.target(e),
                        value;

                    if (u === t) {
                        console.error('Warning: found self loop "' + e + '" for node "' + u + '"');
                    } else if (t in onStack) {
                        value = g.edge(e);
                        g.delEdge(e);
                        value.reversed = true;
                        ++reverseCount;
                        g.addEdge(e, t, u, value);
                    } else {
                        dfs(t);
                    }
                });

                delete onStack[u];
            }

            g.eachNode(function (u) { dfs(u); });

            util.log(2, 'Acyclic Phase: reversed ' + reverseCount + ' edge(s)');

            return reverseCount;
        }

        /*
         * Given a graph that has had the acyclic operation applied, this function
         * undoes that operation. More specifically, any edge with the `reversed`
         * attribute is again reversed to restore the original direction of the edge.
         */
        function undo(g) {
            g.eachEdge(function (e, s, t, a) {
                if (a.reversed) {
                    delete a.reversed;
                    g.delEdge(e);
                    g.addEdge(e, t, s, a);
                }
            });
        }

    }, { "../util": 26 }], 21: [function (require, module, exports) {
        exports.apply = function (g) {
            function dfs(sg) {
                var rankSets = {};
                g.children(sg).forEach(function (u) {
                    if (g.children(u).length) {
                        dfs(u);
                        return;
                    }

                    var value = g.node(u),
                        prefRank = value.prefRank;
                    if (prefRank !== undefined) {
                        if (!checkSupportedPrefRank(prefRank)) { return; }

                        if (!(prefRank in rankSets)) {
                            rankSets.prefRank = [u];
                        } else {
                            rankSets.prefRank.push(u);
                        }

                        var newU = rankSets[prefRank];
                        if (newU === undefined) {
                            newU = rankSets[prefRank] = g.addNode(null, { originalNodes: [] });
                            g.parent(newU, sg);
                        }

                        redirectInEdges(g, u, newU, prefRank === 'min');
                        redirectOutEdges(g, u, newU, prefRank === 'max');

                        // Save original node and remove it from reduced graph
                        g.node(newU).originalNodes.push({ u: u, value: value, parent: sg });
                        g.delNode(u);
                    }
                });

                addLightEdgesFromMinNode(g, sg, rankSets.min);
                addLightEdgesToMaxNode(g, sg, rankSets.max);
            }

            dfs(null);
        };

        function checkSupportedPrefRank(prefRank) {
            if (prefRank !== 'min' && prefRank !== 'max' && prefRank.indexOf('same_') !== 0) {
                console.error('Unsupported rank type: ' + prefRank);
                return false;
            }
            return true;
        }

        function redirectInEdges(g, u, newU, reverse) {
            g.inEdges(u).forEach(function (e) {
                var origValue = g.edge(e),
                    value;
                if (origValue.originalEdge) {
                    value = origValue;
                } else {
                    value = {
                        originalEdge: { e: e, u: g.source(e), v: g.target(e), value: origValue },
                        minLen: g.edge(e).minLen
                    };
                }

                // Do not reverse edges for self-loops.
                if (origValue.selfLoop) {
                    reverse = false;
                }

                if (reverse) {
                    // Ensure that all edges to min are reversed
                    g.addEdge(null, newU, g.source(e), value);
                    value.reversed = true;
                } else {
                    g.addEdge(null, g.source(e), newU, value);
                }
            });
        }

        function redirectOutEdges(g, u, newU, reverse) {
            g.outEdges(u).forEach(function (e) {
                var origValue = g.edge(e),
                    value;
                if (origValue.originalEdge) {
                    value = origValue;
                } else {
                    value = {
                        originalEdge: { e: e, u: g.source(e), v: g.target(e), value: origValue },
                        minLen: g.edge(e).minLen
                    };
                }

                // Do not reverse edges for self-loops.
                if (origValue.selfLoop) {
                    reverse = false;
                }

                if (reverse) {
                    // Ensure that all edges from max are reversed
                    g.addEdge(null, g.target(e), newU, value);
                    value.reversed = true;
                } else {
                    g.addEdge(null, newU, g.target(e), value);
                }
            });
        }

        function addLightEdgesFromMinNode(g, sg, minNode) {
            if (minNode !== undefined) {
                g.children(sg).forEach(function (u) {
                    // The dummy check ensures we don't add an edge if the node is involved
                    // in a self loop or sideways edge.
                    if (u !== minNode && !g.outEdges(minNode, u).length && !g.node(u).dummy) {
                        g.addEdge(null, minNode, u, { minLen: 0 });
                    }
                });
            }
        }

        function addLightEdgesToMaxNode(g, sg, maxNode) {
            if (maxNode !== undefined) {
                g.children(sg).forEach(function (u) {
                    // The dummy check ensures we don't add an edge if the node is involved
                    // in a self loop or sideways edge.
                    if (u !== maxNode && !g.outEdges(u, maxNode).length && !g.node(u).dummy) {
                        g.addEdge(null, u, maxNode, { minLen: 0 });
                    }
                });
            }
        }

        /*
         * This function "relaxes" the constraints applied previously by the "apply"
         * function. It expands any nodes that were collapsed and assigns the rank of
         * the collapsed node to each of the expanded nodes. It also restores the
         * original edges and removes any dummy edges pointing at the collapsed nodes.
         *
         * Note that the process of removing collapsed nodes also removes dummy edges
         * automatically.
         */
        exports.relax = function (g) {
            // Save original edges
            var originalEdges = [];
            g.eachEdge(function (e, u, v, value) {
                var originalEdge = value.originalEdge;
                if (originalEdge) {
                    originalEdges.push(originalEdge);
                }
            });

            // Expand collapsed nodes
            g.eachNode(function (u, value) {
                var originalNodes = value.originalNodes;
                if (originalNodes) {
                    originalNodes.forEach(function (originalNode) {
                        originalNode.value.rank = value.rank;
                        g.addNode(originalNode.u, originalNode.value);
                        g.parent(originalNode.u, originalNode.parent);
                    });
                    g.delNode(u);
                }
            });

            // Restore original edges
            originalEdges.forEach(function (edge) {
                g.addEdge(edge.e, edge.u, edge.v, edge.value);
            });
        };

    }, {}], 22: [function (require, module, exports) {
        /* jshint -W079 */
        var Set = require('cp-data').Set,
        /* jshint +W079 */
            Digraph = require('graphlib').Digraph,
            util = require('../util');

        module.exports = feasibleTree;

        /*
         * Given an acyclic graph with each node assigned a `rank` attribute, this
         * function constructs and returns a spanning tree. This function may reduce
         * the length of some edges from the initial rank assignment while maintaining
         * the `minLen` specified by each edge.
         *
         * Prerequisites:
         *
         * * The input graph is acyclic
         * * Each node in the input graph has an assigned `rank` attribute
         * * Each edge in the input graph has an assigned `minLen` attribute
         *
         * Outputs:
         *
         * A feasible spanning tree for the input graph (i.e. a spanning tree that
         * respects each graph edge's `minLen` attribute) represented as a Digraph with
         * a `root` attribute on graph.
         *
         * Nodes have the same id and value as that in the input graph.
         *
         * Edges in the tree have arbitrarily assigned ids. The attributes for edges
         * include `reversed`. `reversed` indicates that the edge is a
         * back edge in the input graph.
         */
        function feasibleTree(g) {
            var remaining = new Set(g.nodes()),
                tree = new Digraph();

            if (remaining.size() === 1) {
                var root = g.nodes()[0];
                tree.addNode(root, {});
                tree.graph({ root: root });
                return tree;
            }

            function addTightEdges(v) {
                var continueToScan = true;
                g.predecessors(v).forEach(function (u) {
                    if (remaining.has(u) && !slack(g, u, v)) {
                        if (remaining.has(v)) {
                            tree.addNode(v, {});
                            remaining.remove(v);
                            tree.graph({ root: v });
                        }

                        tree.addNode(u, {});
                        tree.addEdge(null, u, v, { reversed: true });
                        remaining.remove(u);
                        addTightEdges(u);
                        continueToScan = false;
                    }
                });

                g.successors(v).forEach(function (w) {
                    if (remaining.has(w) && !slack(g, v, w)) {
                        if (remaining.has(v)) {
                            tree.addNode(v, {});
                            remaining.remove(v);
                            tree.graph({ root: v });
                        }

                        tree.addNode(w, {});
                        tree.addEdge(null, v, w, {});
                        remaining.remove(w);
                        addTightEdges(w);
                        continueToScan = false;
                    }
                });
                return continueToScan;
            }

            function createTightEdge() {
                var minSlack = Number.MAX_VALUE;
                remaining.keys().forEach(function (v) {
                    g.predecessors(v).forEach(function (u) {
                        if (!remaining.has(u)) {
                            var edgeSlack = slack(g, u, v);
                            if (Math.abs(edgeSlack) < Math.abs(minSlack)) {
                                minSlack = -edgeSlack;
                            }
                        }
                    });

                    g.successors(v).forEach(function (w) {
                        if (!remaining.has(w)) {
                            var edgeSlack = slack(g, v, w);
                            if (Math.abs(edgeSlack) < Math.abs(minSlack)) {
                                minSlack = edgeSlack;
                            }
                        }
                    });
                });

                tree.eachNode(function (u) { g.node(u).rank -= minSlack; });
            }

            while (remaining.size()) {
                var nodesToSearch = !tree.order() ? remaining.keys() : tree.nodes();
                for (var i = 0, il = nodesToSearch.length;
                     i < il && addTightEdges(nodesToSearch[i]) ;
                     ++i);
                if (remaining.size()) {
                    createTightEdge();
                }
            }

            return tree;
        }

        function slack(g, u, v) {
            var rankDiff = g.node(v).rank - g.node(u).rank;
            var maxMinLen = util.max(g.outEdges(u, v)
                                      .map(function (e) { return g.edge(e).minLen; }));
            return rankDiff - maxMinLen;
        }

    }, { "../util": 26, "cp-data": 5, "graphlib": 28 }], 23: [function (require, module, exports) {
        var util = require('../util'),
            topsort = require('graphlib').alg.topsort;

        module.exports = initRank;

        /*
         * Assigns a `rank` attribute to each node in the input graph and ensures that
         * this rank respects the `minLen` attribute of incident edges.
         *
         * Prerequisites:
         *
         *  * The input graph must be acyclic
         *  * Each edge in the input graph must have an assigned 'minLen' attribute
         */
        function initRank(g) {
            var sorted = topsort(g);

            sorted.forEach(function (u) {
                var inEdges = g.inEdges(u);
                if (inEdges.length === 0) {
                    g.node(u).rank = 0;
                    return;
                }

                var minLens = inEdges.map(function (e) {
                    return g.node(g.source(e)).rank + g.edge(e).minLen;
                });
                g.node(u).rank = util.max(minLens);
            });
        }

    }, { "../util": 26, "graphlib": 28 }], 24: [function (require, module, exports) {
        module.exports = {
            slack: slack
        };

        /*
         * A helper to calculate the slack between two nodes (`u` and `v`) given a
         * `minLen` constraint. The slack represents how much the distance between `u`
         * and `v` could shrink while maintaining the `minLen` constraint. If the value
         * is negative then the constraint is currently violated.
         *
          This function requires that `u` and `v` are in `graph` and they both have a
          `rank` attribute.
         */
        function slack(graph, u, v, minLen) {
            return Math.abs(graph.node(u).rank - graph.node(v).rank) - minLen;
        }

    }, {}], 25: [function (require, module, exports) {
        var util = require('../util'),
            rankUtil = require('./rankUtil');

        module.exports = simplex;

        function simplex(graph, spanningTree) {
            // The network simplex algorithm repeatedly replaces edges of
            // the spanning tree with negative cut values until no such
            // edge exists.
            initCutValues(graph, spanningTree);
            while (true) {
                var e = leaveEdge(spanningTree);
                if (e === null) break;
                var f = enterEdge(graph, spanningTree, e);
                exchange(graph, spanningTree, e, f);
            }
        }

        /*
         * Set the cut values of edges in the spanning tree by a depth-first
         * postorder traversal.  The cut value corresponds to the cost, in
         * terms of a ranking's edge length sum, of lengthening an edge.
         * Negative cut values typically indicate edges that would yield a
         * smaller edge length sum if they were lengthened.
         */
        function initCutValues(graph, spanningTree) {
            computeLowLim(spanningTree);

            spanningTree.eachEdge(function (id, u, v, treeValue) {
                treeValue.cutValue = 0;
            });

            // Propagate cut values up the tree.
            function dfs(n) {
                var children = spanningTree.successors(n);
                for (var c in children) {
                    var child = children[c];
                    dfs(child);
                }
                if (n !== spanningTree.graph().root) {
                    setCutValue(graph, spanningTree, n);
                }
            }
            dfs(spanningTree.graph().root);
        }

        /*
         * Perform a DFS postorder traversal, labeling each node v with
         * its traversal order 'lim(v)' and the minimum traversal number
         * of any of its descendants 'low(v)'.  This provides an efficient
         * way to test whether u is an ancestor of v since
         * low(u) <= lim(v) <= lim(u) if and only if u is an ancestor.
         */
        function computeLowLim(tree) {
            var postOrderNum = 0;

            function dfs(n) {
                var children = tree.successors(n);
                var low = postOrderNum;
                for (var c in children) {
                    var child = children[c];
                    dfs(child);
                    low = Math.min(low, tree.node(child).low);
                }
                tree.node(n).low = low;
                tree.node(n).lim = postOrderNum++;
            }

            dfs(tree.graph().root);
        }

        /*
         * To compute the cut value of the edge parent -> child, we consider
         * it and any other graph edges to or from the child.
         *          parent
         *             |
         *           child
         *          /      \
         *         u        v
         */
        function setCutValue(graph, tree, child) {
            var parentEdge = tree.inEdges(child)[0];

            // List of child's children in the spanning tree.
            var grandchildren = [];
            var grandchildEdges = tree.outEdges(child);
            for (var gce in grandchildEdges) {
                grandchildren.push(tree.target(grandchildEdges[gce]));
            }

            var cutValue = 0;

            // TODO: Replace unit increment/decrement with edge weights.
            var E = 0;    // Edges from child to grandchild's subtree.
            var F = 0;    // Edges to child from grandchild's subtree.
            var G = 0;    // Edges from child to nodes outside of child's subtree.
            var H = 0;    // Edges from nodes outside of child's subtree to child.

            // Consider all graph edges from child.
            var outEdges = graph.outEdges(child);
            var gc;
            for (var oe in outEdges) {
                var succ = graph.target(outEdges[oe]);
                for (gc in grandchildren) {
                    if (inSubtree(tree, succ, grandchildren[gc])) {
                        E++;
                    }
                }
                if (!inSubtree(tree, succ, child)) {
                    G++;
                }
            }

            // Consider all graph edges to child.
            var inEdges = graph.inEdges(child);
            for (var ie in inEdges) {
                var pred = graph.source(inEdges[ie]);
                for (gc in grandchildren) {
                    if (inSubtree(tree, pred, grandchildren[gc])) {
                        F++;
                    }
                }
                if (!inSubtree(tree, pred, child)) {
                    H++;
                }
            }

            // Contributions depend on the alignment of the parent -> child edge
            // and the child -> u or v edges.
            var grandchildCutSum = 0;
            for (gc in grandchildren) {
                var cv = tree.edge(grandchildEdges[gc]).cutValue;
                if (!tree.edge(grandchildEdges[gc]).reversed) {
                    grandchildCutSum += cv;
                } else {
                    grandchildCutSum -= cv;
                }
            }

            if (!tree.edge(parentEdge).reversed) {
                cutValue += grandchildCutSum - E + F - G + H;
            } else {
                cutValue -= grandchildCutSum - E + F - G + H;
            }

            tree.edge(parentEdge).cutValue = cutValue;
        }

        /*
         * Return whether n is a node in the subtree with the given
         * root.
         */
        function inSubtree(tree, n, root) {
            return (tree.node(root).low <= tree.node(n).lim &&
                    tree.node(n).lim <= tree.node(root).lim);
        }

        /*
         * Return an edge from the tree with a negative cut value, or null if there
         * is none.
         */
        function leaveEdge(tree) {
            var edges = tree.edges();
            for (var n in edges) {
                var e = edges[n];
                var treeValue = tree.edge(e);
                if (treeValue.cutValue < 0) {
                    return e;
                }
            }
            return null;
        }

        /*
         * The edge e should be an edge in the tree, with an underlying edge
         * in the graph, with a negative cut value.  Of the two nodes incident
         * on the edge, take the lower one.  enterEdge returns an edge with
         * minimum slack going from outside of that node's subtree to inside
         * of that node's subtree.
         */
        function enterEdge(graph, tree, e) {
            var source = tree.source(e);
            var target = tree.target(e);
            var lower = tree.node(target).lim < tree.node(source).lim ? target : source;

            // Is the tree edge aligned with the graph edge?
            var aligned = !tree.edge(e).reversed;

            var minSlack = Number.POSITIVE_INFINITY;
            var minSlackEdge;
            if (aligned) {
                graph.eachEdge(function (id, u, v, value) {
                    if (id !== e && inSubtree(tree, u, lower) && !inSubtree(tree, v, lower)) {
                        var slack = rankUtil.slack(graph, u, v, value.minLen);
                        if (slack < minSlack) {
                            minSlack = slack;
                            minSlackEdge = id;
                        }
                    }
                });
            } else {
                graph.eachEdge(function (id, u, v, value) {
                    if (id !== e && !inSubtree(tree, u, lower) && inSubtree(tree, v, lower)) {
                        var slack = rankUtil.slack(graph, u, v, value.minLen);
                        if (slack < minSlack) {
                            minSlack = slack;
                            minSlackEdge = id;
                        }
                    }
                });
            }

            if (minSlackEdge === undefined) {
                var outside = [];
                var inside = [];
                graph.eachNode(function (id) {
                    if (!inSubtree(tree, id, lower)) {
                        outside.push(id);
                    } else {
                        inside.push(id);
                    }
                });
                throw new Error('No edge found from outside of tree to inside');
            }

            return minSlackEdge;
        }

        /*
         * Replace edge e with edge f in the tree, recalculating the tree root,
         * the nodes' low and lim properties and the edges' cut values.
         */
        function exchange(graph, tree, e, f) {
            tree.delEdge(e);
            var source = graph.source(f);
            var target = graph.target(f);

            // Redirect edges so that target is the root of its subtree.
            function redirect(v) {
                var edges = tree.inEdges(v);
                for (var i in edges) {
                    var e = edges[i];
                    var u = tree.source(e);
                    var value = tree.edge(e);
                    redirect(u);
                    tree.delEdge(e);
                    value.reversed = !value.reversed;
                    tree.addEdge(e, v, u, value);
                }
            }

            redirect(target);

            var root = source;
            var edges = tree.inEdges(root);
            while (edges.length > 0) {
                root = tree.source(edges[0]);
                edges = tree.inEdges(root);
            }

            tree.graph().root = root;

            tree.addEdge(null, source, target, { cutValue: 0 });

            initCutValues(graph, tree);

            adjustRanks(graph, tree);
        }

        /*
         * Reset the ranks of all nodes based on the current spanning tree.
         * The rank of the tree's root remains unchanged, while all other
         * nodes are set to the sum of minimum length constraints along
         * the path from the root.
         */
        function adjustRanks(graph, tree) {
            function dfs(p) {
                var children = tree.successors(p);
                children.forEach(function (c) {
                    var minLen = minimumLength(graph, p, c);
                    graph.node(c).rank = graph.node(p).rank + minLen;
                    dfs(c);
                });
            }

            dfs(tree.graph().root);
        }

        /*
         * If u and v are connected by some edges in the graph, return the
         * minimum length of those edges, as a positive number if v succeeds
         * u and as a negative number if v precedes u.
         */
        function minimumLength(graph, u, v) {
            var outEdges = graph.outEdges(u, v);
            if (outEdges.length > 0) {
                return util.max(outEdges.map(function (e) {
                    return graph.edge(e).minLen;
                }));
            }

            var inEdges = graph.inEdges(u, v);
            if (inEdges.length > 0) {
                return -util.max(inEdges.map(function (e) {
                    return graph.edge(e).minLen;
                }));
            }
        }

    }, { "../util": 26, "./rankUtil": 24 }], 26: [function (require, module, exports) {
        /*
         * Returns the smallest value in the array.
         */
        exports.min = function (values) {
            return Math.min.apply(Math, values);
        };

        /*
         * Returns the largest value in the array.
         */
        exports.max = function (values) {
            return Math.max.apply(Math, values);
        };

        /*
         * Returns `true` only if `f(x)` is `true` for all `x` in `xs`. Otherwise
         * returns `false`. This function will return immediately if it finds a
         * case where `f(x)` does not hold.
         */
        exports.all = function (xs, f) {
            for (var i = 0; i < xs.length; ++i) {
                if (!f(xs[i])) {
                    return false;
                }
            }
            return true;
        };

        /*
         * Accumulates the sum of elements in the given array using the `+` operator.
         */
        exports.sum = function (values) {
            return values.reduce(function (acc, x) { return acc + x; }, 0);
        };

        /*
         * Returns an array of all values in the given object.
         */
        exports.values = function (obj) {
            return Object.keys(obj).map(function (k) { return obj[k]; });
        };

        exports.shuffle = function (array) {
            for (i = array.length - 1; i > 0; --i) {
                var j = Math.floor(Math.random() * (i + 1));
                var aj = array[j];
                array[j] = array[i];
                array[i] = aj;
            }
        };

        exports.propertyAccessor = function (self, config, field, setHook) {
            return function (x) {
                if (!arguments.length) return config[field];
                config[field] = x;
                if (setHook) setHook(x);
                return self;
            };
        };

        /*
         * Given a layered, directed graph with `rank` and `order` node attributes,
         * this function returns an array of ordered ranks. Each rank contains an array
         * of the ids of the nodes in that rank in the order specified by the `order`
         * attribute.
         */
        exports.ordering = function (g) {
            var ordering = [];
            g.eachNode(function (u, value) {
                var rank = ordering[value.rank] || (ordering[value.rank] = []);
                rank[value.order] = u;
            });
            return ordering;
        };

        /*
         * A filter that can be used with `filterNodes` to get a graph that only
         * includes nodes that do not contain others nodes.
         */
        exports.filterNonSubgraphs = function (g) {
            return function (u) {
                return g.children(u).length === 0;
            };
        };

        /*
         * Returns a new function that wraps `func` with a timer. The wrapper logs the
         * time it takes to execute the function.
         *
         * The timer will be enabled provided `log.level >= 1`.
         */
        function time(name, func) {
            return function () {
                var start = new Date().getTime();
                try {
                    return func.apply(null, arguments);
                } finally {
                    log(1, name + ' time: ' + (new Date().getTime() - start) + 'ms');
                }
            };
        }
        time.enabled = false;

        exports.time = time;

        /*
         * A global logger with the specification `log(level, message, ...)` that
         * will log a message to the console if `log.level >= level`.
         */
        function log(level) {
            if (log.level >= level) {
                console.log.apply(console, Array.prototype.slice.call(arguments, 1));
            }
        }
        log.level = 0;

        exports.log = log;

    }, {}], 27: [function (require, module, exports) {
        module.exports = '0.4.5';

    }, {}], 28: [function (require, module, exports) {
        exports.Graph = require("./lib/Graph");
        exports.Digraph = require("./lib/Digraph");
        exports.CGraph = require("./lib/CGraph");
        exports.CDigraph = require("./lib/CDigraph");
        require("./lib/graph-converters");

        exports.alg = {
            isAcyclic: require("./lib/alg/isAcyclic"),
            components: require("./lib/alg/components"),
            dijkstra: require("./lib/alg/dijkstra"),
            dijkstraAll: require("./lib/alg/dijkstraAll"),
            findCycles: require("./lib/alg/findCycles"),
            floydWarshall: require("./lib/alg/floydWarshall"),
            postorder: require("./lib/alg/postorder"),
            preorder: require("./lib/alg/preorder"),
            prim: require("./lib/alg/prim"),
            tarjan: require("./lib/alg/tarjan"),
            topsort: require("./lib/alg/topsort")
        };

        exports.converter = {
            json: require("./lib/converter/json.js")
        };

        var filter = require("./lib/filter");
        exports.filter = {
            all: filter.all,
            nodesFromList: filter.nodesFromList
        };

        exports.version = require("./lib/version");

    }, { "./lib/CDigraph": 30, "./lib/CGraph": 31, "./lib/Digraph": 32, "./lib/Graph": 33, "./lib/alg/components": 34, "./lib/alg/dijkstra": 35, "./lib/alg/dijkstraAll": 36, "./lib/alg/findCycles": 37, "./lib/alg/floydWarshall": 38, "./lib/alg/isAcyclic": 39, "./lib/alg/postorder": 40, "./lib/alg/preorder": 41, "./lib/alg/prim": 42, "./lib/alg/tarjan": 43, "./lib/alg/topsort": 44, "./lib/converter/json.js": 46, "./lib/filter": 47, "./lib/graph-converters": 48, "./lib/version": 50 }], 29: [function (require, module, exports) {
        /* jshint -W079 */
        var Set = require("cp-data").Set;
        /* jshint +W079 */

        module.exports = BaseGraph;

        function BaseGraph() {
            // The value assigned to the graph itself.
            this._value = undefined;

            // Map of node id -> { id, value }
            this._nodes = {};

            // Map of edge id -> { id, u, v, value }
            this._edges = {};

            // Used to generate a unique id in the graph
            this._nextId = 0;
        }

        // Number of nodes
        BaseGraph.prototype.order = function () {
            return Object.keys(this._nodes).length;
        };

        // Number of edges
        BaseGraph.prototype.size = function () {
            return Object.keys(this._edges).length;
        };

        // Accessor for graph level value
        BaseGraph.prototype.graph = function (value) {
            if (arguments.length === 0) {
                return this._value;
            }
            this._value = value;
        };

        BaseGraph.prototype.hasNode = function (u) {
            return u in this._nodes;
        };

        BaseGraph.prototype.node = function (u, value) {
            var node = this._strictGetNode(u);
            if (arguments.length === 1) {
                return node.value;
            }
            node.value = value;
        };

        BaseGraph.prototype.nodes = function () {
            var nodes = [];
            this.eachNode(function (id) { nodes.push(id); });
            return nodes;
        };

        BaseGraph.prototype.eachNode = function (func) {
            for (var k in this._nodes) {
                var node = this._nodes[k];
                func(node.id, node.value);
            }
        };

        BaseGraph.prototype.hasEdge = function (e) {
            return e in this._edges;
        };

        BaseGraph.prototype.edge = function (e, value) {
            var edge = this._strictGetEdge(e);
            if (arguments.length === 1) {
                return edge.value;
            }
            edge.value = value;
        };

        BaseGraph.prototype.edges = function () {
            var es = [];
            this.eachEdge(function (id) { es.push(id); });
            return es;
        };

        BaseGraph.prototype.eachEdge = function (func) {
            for (var k in this._edges) {
                var edge = this._edges[k];
                func(edge.id, edge.u, edge.v, edge.value);
            }
        };

        BaseGraph.prototype.incidentNodes = function (e) {
            var edge = this._strictGetEdge(e);
            return [edge.u, edge.v];
        };

        BaseGraph.prototype.addNode = function (u, value) {
            if (u === undefined || u === null) {
                do {
                    u = "_" + (++this._nextId);
                } while (this.hasNode(u));
            } else if (this.hasNode(u)) {
                throw new Error("Graph already has node '" + u + "'");
            }
            this._nodes[u] = { id: u, value: value };
            return u;
        };

        BaseGraph.prototype.delNode = function (u) {
            this._strictGetNode(u);
            this.incidentEdges(u).forEach(function (e) { this.delEdge(e); }, this);
            delete this._nodes[u];
        };

        // inMap and outMap are opposite sides of an incidence map. For example, for
        // Graph these would both come from the _incidentEdges map, while for Digraph
        // they would come from _inEdges and _outEdges.
        BaseGraph.prototype._addEdge = function (e, u, v, value, inMap, outMap) {
            this._strictGetNode(u);
            this._strictGetNode(v);

            if (e === undefined || e === null) {
                do {
                    e = "_" + (++this._nextId);
                } while (this.hasEdge(e));
            }
            else if (this.hasEdge(e)) {
                throw new Error("Graph already has edge '" + e + "'");
            }

            this._edges[e] = { id: e, u: u, v: v, value: value };
            addEdgeToMap(inMap[v], u, e);
            addEdgeToMap(outMap[u], v, e);

            return e;
        };

        // See note for _addEdge regarding inMap and outMap.
        BaseGraph.prototype._delEdge = function (e, inMap, outMap) {
            var edge = this._strictGetEdge(e);
            delEdgeFromMap(inMap[edge.v], edge.u, e);
            delEdgeFromMap(outMap[edge.u], edge.v, e);
            delete this._edges[e];
        };

        BaseGraph.prototype.copy = function () {
            var copy = new this.constructor();
            copy.graph(this.graph());
            this.eachNode(function (u, value) { copy.addNode(u, value); });
            this.eachEdge(function (e, u, v, value) { copy.addEdge(e, u, v, value); });
            copy._nextId = this._nextId;
            return copy;
        };

        BaseGraph.prototype.filterNodes = function (filter) {
            var copy = new this.constructor();
            copy.graph(this.graph());
            this.eachNode(function (u, value) {
                if (filter(u)) {
                    copy.addNode(u, value);
                }
            });
            this.eachEdge(function (e, u, v, value) {
                if (copy.hasNode(u) && copy.hasNode(v)) {
                    copy.addEdge(e, u, v, value);
                }
            });
            return copy;
        };

        BaseGraph.prototype._strictGetNode = function (u) {
            var node = this._nodes[u];
            if (node === undefined) {
                throw new Error("Node '" + u + "' is not in graph");
            }
            return node;
        };

        BaseGraph.prototype._strictGetEdge = function (e) {
            var edge = this._edges[e];
            if (edge === undefined) {
                throw new Error("Edge '" + e + "' is not in graph");
            }
            return edge;
        };

        function addEdgeToMap(map, v, e) {
            (map[v] || (map[v] = new Set())).add(e);
        }

        function delEdgeFromMap(map, v, e) {
            var vEntry = map[v];
            vEntry.remove(e);
            if (vEntry.size() === 0) {
                delete map[v];
            }
        }


    }, { "cp-data": 5 }], 30: [function (require, module, exports) {
        var Digraph = require("./Digraph"),
            compoundify = require("./compoundify");

        var CDigraph = compoundify(Digraph);

        module.exports = CDigraph;

        CDigraph.fromDigraph = function (src) {
            var g = new CDigraph(),
                graphValue = src.graph();

            if (graphValue !== undefined) {
                g.graph(graphValue);
            }

            src.eachNode(function (u, value) {
                if (value === undefined) {
                    g.addNode(u);
                } else {
                    g.addNode(u, value);
                }
            });
            src.eachEdge(function (e, u, v, value) {
                if (value === undefined) {
                    g.addEdge(null, u, v);
                } else {
                    g.addEdge(null, u, v, value);
                }
            });
            return g;
        };

        CDigraph.prototype.toString = function () {
            return "CDigraph " + JSON.stringify(this, null, 2);
        };

    }, { "./Digraph": 32, "./compoundify": 45 }], 31: [function (require, module, exports) {
        var Graph = require("./Graph"),
            compoundify = require("./compoundify");

        var CGraph = compoundify(Graph);

        module.exports = CGraph;

        CGraph.fromGraph = function (src) {
            var g = new CGraph(),
                graphValue = src.graph();

            if (graphValue !== undefined) {
                g.graph(graphValue);
            }

            src.eachNode(function (u, value) {
                if (value === undefined) {
                    g.addNode(u);
                } else {
                    g.addNode(u, value);
                }
            });
            src.eachEdge(function (e, u, v, value) {
                if (value === undefined) {
                    g.addEdge(null, u, v);
                } else {
                    g.addEdge(null, u, v, value);
                }
            });
            return g;
        };

        CGraph.prototype.toString = function () {
            return "CGraph " + JSON.stringify(this, null, 2);
        };

    }, { "./Graph": 33, "./compoundify": 45 }], 32: [function (require, module, exports) {
        /*
         * This file is organized with in the following order:
         *
         * Exports
         * Graph constructors
         * Graph queries (e.g. nodes(), edges()
         * Graph mutators
         * Helper functions
         */

        var util = require("./util"),
            BaseGraph = require("./BaseGraph"),
        /* jshint -W079 */
            Set = require("cp-data").Set;
        /* jshint +W079 */

        module.exports = Digraph;

        /*
         * Constructor to create a new directed multi-graph.
         */
        function Digraph() {
            BaseGraph.call(this);

            /*! Map of sourceId -> {targetId -> Set of edge ids} */
            this._inEdges = {};

            /*! Map of targetId -> {sourceId -> Set of edge ids} */
            this._outEdges = {};
        }

        Digraph.prototype = new BaseGraph();
        Digraph.prototype.constructor = Digraph;

        /*
         * Always returns `true`.
         */
        Digraph.prototype.isDirected = function () {
            return true;
        };

        /*
         * Returns all successors of the node with the id `u`. That is, all nodes
         * that have the node `u` as their source are returned.
         * 
         * If no node `u` exists in the graph this function throws an Error.
         *
         * @param {String} u a node id
         */
        Digraph.prototype.successors = function (u) {
            this._strictGetNode(u);
            return Object.keys(this._outEdges[u])
                         .map(function (v) { return this._nodes[v].id; }, this);
        };

        /*
         * Returns all predecessors of the node with the id `u`. That is, all nodes
         * that have the node `u` as their target are returned.
         * 
         * If no node `u` exists in the graph this function throws an Error.
         *
         * @param {String} u a node id
         */
        Digraph.prototype.predecessors = function (u) {
            this._strictGetNode(u);
            return Object.keys(this._inEdges[u])
                         .map(function (v) { return this._nodes[v].id; }, this);
        };

        /*
         * Returns all nodes that are adjacent to the node with the id `u`. In other
         * words, this function returns the set of all successors and predecessors of
         * node `u`.
         *
         * @param {String} u a node id
         */
        Digraph.prototype.neighbors = function (u) {
            return Set.union([this.successors(u), this.predecessors(u)]).keys();
        };

        /*
         * Returns all nodes in the graph that have no in-edges.
         */
        Digraph.prototype.sources = function () {
            var self = this;
            return this._filterNodes(function (u) {
                // This could have better space characteristics if we had an inDegree function.
                return self.inEdges(u).length === 0;
            });
        };

        /*
         * Returns all nodes in the graph that have no out-edges.
         */
        Digraph.prototype.sinks = function () {
            var self = this;
            return this._filterNodes(function (u) {
                // This could have better space characteristics if we have an outDegree function.
                return self.outEdges(u).length === 0;
            });
        };

        /*
         * Returns the source node incident on the edge identified by the id `e`. If no
         * such edge exists in the graph this function throws an Error.
         *
         * @param {String} e an edge id
         */
        Digraph.prototype.source = function (e) {
            return this._strictGetEdge(e).u;
        };

        /*
         * Returns the target node incident on the edge identified by the id `e`. If no
         * such edge exists in the graph this function throws an Error.
         *
         * @param {String} e an edge id
         */
        Digraph.prototype.target = function (e) {
            return this._strictGetEdge(e).v;
        };

        /*
         * Returns an array of ids for all edges in the graph that have the node
         * `target` as their target. If the node `target` is not in the graph this
         * function raises an Error.
         *
         * Optionally a `source` node can also be specified. This causes the results
         * to be filtered such that only edges from `source` to `target` are included.
         * If the node `source` is specified but is not in the graph then this function
         * raises an Error.
         *
         * @param {String} target the target node id
         * @param {String} [source] an optional source node id
         */
        Digraph.prototype.inEdges = function (target, source) {
            this._strictGetNode(target);
            var results = Set.union(util.values(this._inEdges[target])).keys();
            if (arguments.length > 1) {
                this._strictGetNode(source);
                results = results.filter(function (e) { return this.source(e) === source; }, this);
            }
            return results;
        };

        /*
         * Returns an array of ids for all edges in the graph that have the node
         * `source` as their source. If the node `source` is not in the graph this
         * function raises an Error.
         *
         * Optionally a `target` node may also be specified. This causes the results
         * to be filtered such that only edges from `source` to `target` are included.
         * If the node `target` is specified but is not in the graph then this function
         * raises an Error.
         *
         * @param {String} source the source node id
         * @param {String} [target] an optional target node id
         */
        Digraph.prototype.outEdges = function (source, target) {
            this._strictGetNode(source);
            var results = Set.union(util.values(this._outEdges[source])).keys();
            if (arguments.length > 1) {
                this._strictGetNode(target);
                results = results.filter(function (e) { return this.target(e) === target; }, this);
            }
            return results;
        };

        /*
         * Returns an array of ids for all edges in the graph that have the `u` as
         * their source or their target. If the node `u` is not in the graph this
         * function raises an Error.
         *
         * Optionally a `v` node may also be specified. This causes the results to be
         * filtered such that only edges between `u` and `v` - in either direction -
         * are included. IF the node `v` is specified but not in the graph then this
         * function raises an Error.
         *
         * @param {String} u the node for which to find incident edges
         * @param {String} [v] option node that must be adjacent to `u`
         */
        Digraph.prototype.incidentEdges = function (u, v) {
            if (arguments.length > 1) {
                return Set.union([this.outEdges(u, v), this.outEdges(v, u)]).keys();
            } else {
                return Set.union([this.inEdges(u), this.outEdges(u)]).keys();
            }
        };

        /*
         * Returns a string representation of this graph.
         */
        Digraph.prototype.toString = function () {
            return "Digraph " + JSON.stringify(this, null, 2);
        };

        /*
         * Adds a new node with the id `u` to the graph and assigns it the value
         * `value`. If a node with the id is already a part of the graph this function
         * throws an Error.
         *
         * @param {String} u a node id
         * @param {Object} [value] an optional value to attach to the node
         */
        Digraph.prototype.addNode = function (u, value) {
            u = BaseGraph.prototype.addNode.call(this, u, value);
            this._inEdges[u] = {};
            this._outEdges[u] = {};
            return u;
        };

        /*
         * Removes a node from the graph that has the id `u`. Any edges incident on the
         * node are also removed. If the graph does not contain a node with the id this
         * function will throw an Error.
         *
         * @param {String} u a node id
         */
        Digraph.prototype.delNode = function (u) {
            BaseGraph.prototype.delNode.call(this, u);
            delete this._inEdges[u];
            delete this._outEdges[u];
        };

        /*
         * Adds a new edge to the graph with the id `e` from a node with the id `source`
         * to a node with an id `target` and assigns it the value `value`. This graph
         * allows more than one edge from `source` to `target` as long as the id `e`
         * is unique in the set of edges. If `e` is `null` the graph will assign a
         * unique identifier to the edge.
         *
         * If `source` or `target` are not present in the graph this function will
         * throw an Error.
         *
         * @param {String} [e] an edge id
         * @param {String} source the source node id
         * @param {String} target the target node id
         * @param {Object} [value] an optional value to attach to the edge
         */
        Digraph.prototype.addEdge = function (e, source, target, value) {
            return BaseGraph.prototype._addEdge.call(this, e, source, target, value,
                                                     this._inEdges, this._outEdges);
        };

        /*
         * Removes an edge in the graph with the id `e`. If no edge in the graph has
         * the id `e` this function will throw an Error.
         *
         * @param {String} e an edge id
         */
        Digraph.prototype.delEdge = function (e) {
            BaseGraph.prototype._delEdge.call(this, e, this._inEdges, this._outEdges);
        };

        // Unlike BaseGraph.filterNodes, this helper just returns nodes that
        // satisfy a predicate.
        Digraph.prototype._filterNodes = function (pred) {
            var filtered = [];
            this.eachNode(function (u) {
                if (pred(u)) {
                    filtered.push(u);
                }
            });
            return filtered;
        };


    }, { "./BaseGraph": 29, "./util": 49, "cp-data": 5 }], 33: [function (require, module, exports) {
        /*
         * This file is organized with in the following order:
         *
         * Exports
         * Graph constructors
         * Graph queries (e.g. nodes(), edges()
         * Graph mutators
         * Helper functions
         */

        var util = require("./util"),
            BaseGraph = require("./BaseGraph"),
        /* jshint -W079 */
            Set = require("cp-data").Set;
        /* jshint +W079 */

        module.exports = Graph;

        /*
         * Constructor to create a new undirected multi-graph.
         */
        function Graph() {
            BaseGraph.call(this);

            /*! Map of nodeId -> { otherNodeId -> Set of edge ids } */
            this._incidentEdges = {};
        }

        Graph.prototype = new BaseGraph();
        Graph.prototype.constructor = Graph;

        /*
         * Always returns `false`.
         */
        Graph.prototype.isDirected = function () {
            return false;
        };

        /*
         * Returns all nodes that are adjacent to the node with the id `u`.
         *
         * @param {String} u a node id
         */
        Graph.prototype.neighbors = function (u) {
            this._strictGetNode(u);
            return Object.keys(this._incidentEdges[u])
                         .map(function (v) { return this._nodes[v].id; }, this);
        };

        /*
         * Returns an array of ids for all edges in the graph that are incident on `u`.
         * If the node `u` is not in the graph this function raises an Error.
         *
         * Optionally a `v` node may also be specified. This causes the results to be
         * filtered such that only edges between `u` and `v` are included. If the node
         * `v` is specified but not in the graph then this function raises an Error.
         *
         * @param {String} u the node for which to find incident edges
         * @param {String} [v] option node that must be adjacent to `u`
         */
        Graph.prototype.incidentEdges = function (u, v) {
            this._strictGetNode(u);
            if (arguments.length > 1) {
                this._strictGetNode(v);
                return v in this._incidentEdges[u] ? this._incidentEdges[u][v].keys() : [];
            } else {
                return Set.union(util.values(this._incidentEdges[u])).keys();
            }
        };

        /*
         * Returns a string representation of this graph.
         */
        Graph.prototype.toString = function () {
            return "Graph " + JSON.stringify(this, null, 2);
        };

        /*
         * Adds a new node with the id `u` to the graph and assigns it the value
         * `value`. If a node with the id is already a part of the graph this function
         * throws an Error.
         *
         * @param {String} u a node id
         * @param {Object} [value] an optional value to attach to the node
         */
        Graph.prototype.addNode = function (u, value) {
            u = BaseGraph.prototype.addNode.call(this, u, value);
            this._incidentEdges[u] = {};
            return u;
        };

        /*
         * Removes a node from the graph that has the id `u`. Any edges incident on the
         * node are also removed. If the graph does not contain a node with the id this
         * function will throw an Error.
         *
         * @param {String} u a node id
         */
        Graph.prototype.delNode = function (u) {
            BaseGraph.prototype.delNode.call(this, u);
            delete this._incidentEdges[u];
        };

        /*
         * Adds a new edge to the graph with the id `e` between a node with the id `u`
         * and a node with an id `v` and assigns it the value `value`. This graph
         * allows more than one edge between `u` and `v` as long as the id `e`
         * is unique in the set of edges. If `e` is `null` the graph will assign a
         * unique identifier to the edge.
         *
         * If `u` or `v` are not present in the graph this function will throw an
         * Error.
         *
         * @param {String} [e] an edge id
         * @param {String} u the node id of one of the adjacent nodes
         * @param {String} v the node id of the other adjacent node
         * @param {Object} [value] an optional value to attach to the edge
         */
        Graph.prototype.addEdge = function (e, u, v, value) {
            return BaseGraph.prototype._addEdge.call(this, e, u, v, value,
                                                     this._incidentEdges, this._incidentEdges);
        };

        /*
         * Removes an edge in the graph with the id `e`. If no edge in the graph has
         * the id `e` this function will throw an Error.
         *
         * @param {String} e an edge id
         */
        Graph.prototype.delEdge = function (e) {
            BaseGraph.prototype._delEdge.call(this, e, this._incidentEdges, this._incidentEdges);
        };


    }, { "./BaseGraph": 29, "./util": 49, "cp-data": 5 }], 34: [function (require, module, exports) {
        /* jshint -W079 */
        var Set = require("cp-data").Set;
        /* jshint +W079 */

        module.exports = components;

        /**
         * Finds all [connected components][] in a graph and returns an array of these
         * components. Each component is itself an array that contains the ids of nodes
         * in the component.
         *
         * This function only works with undirected Graphs.
         *
         * [connected components]: http://en.wikipedia.org/wiki/Connected_component_(graph_theory)
         *
         * @param {Graph} g the graph to search for components
         */
        function components(g) {
            var results = [];
            var visited = new Set();

            function dfs(v, component) {
                if (!visited.has(v)) {
                    visited.add(v);
                    component.push(v);
                    g.neighbors(v).forEach(function (w) {
                        dfs(w, component);
                    });
                }
            }

            g.nodes().forEach(function (v) {
                var component = [];
                dfs(v, component);
                if (component.length > 0) {
                    results.push(component);
                }
            });

            return results;
        }

    }, { "cp-data": 5 }], 35: [function (require, module, exports) {
        var PriorityQueue = require("cp-data").PriorityQueue;

        module.exports = dijkstra;

        /**
         * This function is an implementation of [Dijkstra's algorithm][] which finds
         * the shortest path from **source** to all other nodes in **g**. This
         * function returns a map of `u -> { distance, predecessor }`. The distance
         * property holds the sum of the weights from **source** to `u` along the
         * shortest path or `Number.POSITIVE_INFINITY` if there is no path from
         * **source**. The predecessor property can be used to walk the individual
         * elements of the path from **source** to **u** in reverse order.
         *
         * This function takes an optional `weightFunc(e)` which returns the
         * weight of the edge `e`. If no weightFunc is supplied then each edge is
         * assumed to have a weight of 1. This function throws an Error if any of
         * the traversed edges have a negative edge weight.
         *
         * This function takes an optional `incidentFunc(u)` which returns the ids of
         * all edges incident to the node `u` for the purposes of shortest path
         * traversal. By default this function uses the `g.outEdges` for Digraphs and
         * `g.incidentEdges` for Graphs.
         *
         * This function takes `O((|E| + |V|) * log |V|)` time.
         *
         * [Dijkstra's algorithm]: http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
         *
         * @param {Graph} g the graph to search for shortest paths from **source**
         * @param {Object} source the source from which to start the search
         * @param {Function} [weightFunc] optional weight function
         * @param {Function} [incidentFunc] optional incident function
         */
        function dijkstra(g, source, weightFunc, incidentFunc) {
            var results = {},
                pq = new PriorityQueue();

            function updateNeighbors(e) {
                var incidentNodes = g.incidentNodes(e),
                    v = incidentNodes[0] !== u ? incidentNodes[0] : incidentNodes[1],
                    vEntry = results[v],
                    weight = weightFunc(e),
                    distance = uEntry.distance + weight;

                if (weight < 0) {
                    throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + e + " Weight: " + weight);
                }

                if (distance < vEntry.distance) {
                    vEntry.distance = distance;
                    vEntry.predecessor = u;
                    pq.decrease(v, distance);
                }
            }

            weightFunc = weightFunc || function () { return 1; };
            incidentFunc = incidentFunc || (g.isDirected()
                ? function (u) { return g.outEdges(u); }
                : function (u) { return g.incidentEdges(u); });

            g.eachNode(function (u) {
                var distance = u === source ? 0 : Number.POSITIVE_INFINITY;
                results[u] = { distance: distance };
                pq.add(u, distance);
            });

            var u, uEntry;
            while (pq.size() > 0) {
                u = pq.removeMin();
                uEntry = results[u];
                if (uEntry.distance === Number.POSITIVE_INFINITY) {
                    break;
                }

                incidentFunc(u).forEach(updateNeighbors);
            }

            return results;
        }

    }, { "cp-data": 5 }], 36: [function (require, module, exports) {
        var dijkstra = require("./dijkstra");

        module.exports = dijkstraAll;

        /**
         * This function finds the shortest path from each node to every other
         * reachable node in the graph. It is similar to [alg.dijkstra][], but
         * instead of returning a single-source array, it returns a mapping of
         * of `source -> alg.dijksta(g, source, weightFunc, incidentFunc)`.
         *
         * This function takes an optional `weightFunc(e)` which returns the
         * weight of the edge `e`. If no weightFunc is supplied then each edge is
         * assumed to have a weight of 1. This function throws an Error if any of
         * the traversed edges have a negative edge weight.
         *
         * This function takes an optional `incidentFunc(u)` which returns the ids of
         * all edges incident to the node `u` for the purposes of shortest path
         * traversal. By default this function uses the `outEdges` function on the
         * supplied graph.
         *
         * This function takes `O(|V| * (|E| + |V|) * log |V|)` time.
         *
         * [alg.dijkstra]: dijkstra.js.html#dijkstra
         *
         * @param {Graph} g the graph to search for shortest paths from **source**
         * @param {Function} [weightFunc] optional weight function
         * @param {Function} [incidentFunc] optional incident function
         */
        function dijkstraAll(g, weightFunc, incidentFunc) {
            var results = {};
            g.eachNode(function (u) {
                results[u] = dijkstra(g, u, weightFunc, incidentFunc);
            });
            return results;
        }

    }, { "./dijkstra": 35 }], 37: [function (require, module, exports) {
        var tarjan = require("./tarjan");

        module.exports = findCycles;

        /*
         * Given a Digraph **g** this function returns all nodes that are part of a
         * cycle. Since there may be more than one cycle in a graph this function
         * returns an array of these cycles, where each cycle is itself represented
         * by an array of ids for each node involved in that cycle.
         *
         * [alg.isAcyclic][] is more efficient if you only need to determine whether
         * a graph has a cycle or not.
         *
         * [alg.isAcyclic]: isAcyclic.js.html#isAcyclic
         *
         * @param {Digraph} g the graph to search for cycles.
         */
        function findCycles(g) {
            return tarjan(g).filter(function (cmpt) { return cmpt.length > 1; });
        }

    }, { "./tarjan": 43 }], 38: [function (require, module, exports) {
        module.exports = floydWarshall;

        /**
         * This function is an implementation of the [Floyd-Warshall algorithm][],
         * which finds the shortest path from each node to every other reachable node
         * in the graph. It is similar to [alg.dijkstraAll][], but it handles negative
         * edge weights and is more efficient for some types of graphs. This function
         * returns a map of `source -> { target -> { distance, predecessor }`. The
         * distance property holds the sum of the weights from `source` to `target`
         * along the shortest path of `Number.POSITIVE_INFINITY` if there is no path
         * from `source`. The predecessor property can be used to walk the individual
         * elements of the path from `source` to `target` in reverse order.
         *
         * This function takes an optional `weightFunc(e)` which returns the
         * weight of the edge `e`. If no weightFunc is supplied then each edge is
         * assumed to have a weight of 1.
         *
         * This function takes an optional `incidentFunc(u)` which returns the ids of
         * all edges incident to the node `u` for the purposes of shortest path
         * traversal. By default this function uses the `outEdges` function on the
         * supplied graph.
         *
         * This algorithm takes O(|V|^3) time.
         *
         * [Floyd-Warshall algorithm]: https://en.wikipedia.org/wiki/Floyd-Warshall_algorithm
         * [alg.dijkstraAll]: dijkstraAll.js.html#dijkstraAll
         *
         * @param {Graph} g the graph to search for shortest paths from **source**
         * @param {Function} [weightFunc] optional weight function
         * @param {Function} [incidentFunc] optional incident function
         */
        function floydWarshall(g, weightFunc, incidentFunc) {
            var results = {},
                nodes = g.nodes();

            weightFunc = weightFunc || function () { return 1; };
            incidentFunc = incidentFunc || (g.isDirected()
                ? function (u) { return g.outEdges(u); }
                : function (u) { return g.incidentEdges(u); });

            nodes.forEach(function (u) {
                results[u] = {};
                results[u][u] = { distance: 0 };
                nodes.forEach(function (v) {
                    if (u !== v) {
                        results[u][v] = { distance: Number.POSITIVE_INFINITY };
                    }
                });
                incidentFunc(u).forEach(function (e) {
                    var incidentNodes = g.incidentNodes(e),
                        v = incidentNodes[0] !== u ? incidentNodes[0] : incidentNodes[1],
                        d = weightFunc(e);
                    if (d < results[u][v].distance) {
                        results[u][v] = { distance: d, predecessor: u };
                    }
                });
            });

            nodes.forEach(function (k) {
                var rowK = results[k];
                nodes.forEach(function (i) {
                    var rowI = results[i];
                    nodes.forEach(function (j) {
                        var ik = rowI[k];
                        var kj = rowK[j];
                        var ij = rowI[j];
                        var altDistance = ik.distance + kj.distance;
                        if (altDistance < ij.distance) {
                            ij.distance = altDistance;
                            ij.predecessor = kj.predecessor;
                        }
                    });
                });
            });

            return results;
        }

    }, {}], 39: [function (require, module, exports) {
        var topsort = require("./topsort");

        module.exports = isAcyclic;

        /*
         * Given a Digraph **g** this function returns `true` if the graph has no
         * cycles and returns `false` if it does. This algorithm returns as soon as it
         * detects the first cycle.
         *
         * Use [alg.findCycles][] if you need the actual list of cycles in a graph.
         *
         * [alg.findCycles]: findCycles.js.html#findCycles
         *
         * @param {Digraph} g the graph to test for cycles
         */
        function isAcyclic(g) {
            try {
                topsort(g);
            } catch (e) {
                if (e instanceof topsort.CycleException) return false;
                throw e;
            }
            return true;
        }

    }, { "./topsort": 44 }], 40: [function (require, module, exports) {
        /* jshint -W079 */
        var Set = require("cp-data").Set;
        /* jshint +W079 */

        module.exports = postorder;

        // Postorder traversal of g, calling f for each visited node. Assumes the graph
        // is a tree.
        function postorder(g, root, f) {
            var visited = new Set();
            if (g.isDirected()) {
                throw new Error("This function only works for undirected graphs");
            }
            function dfs(u, prev) {
                if (visited.has(u)) {
                    throw new Error("The input graph is not a tree: " + g);
                }
                visited.add(u);
                g.neighbors(u).forEach(function (v) {
                    if (v !== prev) dfs(v, u);
                });
                f(u);
            }
            dfs(root);
        }

    }, { "cp-data": 5 }], 41: [function (require, module, exports) {
        /* jshint -W079 */
        var Set = require("cp-data").Set;
        /* jshint +W079 */

        module.exports = preorder;

        // Preorder traversal of g, calling f for each visited node. Assumes the graph
        // is a tree.
        function preorder(g, root, f) {
            var visited = new Set();
            if (g.isDirected()) {
                throw new Error("This function only works for undirected graphs");
            }
            function dfs(u, prev) {
                if (visited.has(u)) {
                    throw new Error("The input graph is not a tree: " + g);
                }
                visited.add(u);
                f(u);
                g.neighbors(u).forEach(function (v) {
                    if (v !== prev) dfs(v, u);
                });
            }
            dfs(root);
        }

    }, { "cp-data": 5 }], 42: [function (require, module, exports) {
        var Graph = require("../Graph"),
            PriorityQueue = require("cp-data").PriorityQueue;

        module.exports = prim;

        /**
         * [Prim's algorithm][] takes a connected undirected graph and generates a
         * [minimum spanning tree][]. This function returns the minimum spanning
         * tree as an undirected graph. This algorithm is derived from the description
         * in "Introduction to Algorithms", Third Edition, Cormen, et al., Pg 634.
         *
         * This function takes a `weightFunc(e)` which returns the weight of the edge
         * `e`. It throws an Error if the graph is not connected.
         *
         * This function takes `O(|E| log |V|)` time.
         *
         * [Prim's algorithm]: https://en.wikipedia.org/wiki/Prim's_algorithm
         * [minimum spanning tree]: https://en.wikipedia.org/wiki/Minimum_spanning_tree
         *
         * @param {Graph} g the graph used to generate the minimum spanning tree
         * @param {Function} weightFunc the weight function to use
         */
        function prim(g, weightFunc) {
            var result = new Graph(),
                parents = {},
                pq = new PriorityQueue(),
                u;

            function updateNeighbors(e) {
                var incidentNodes = g.incidentNodes(e),
                    v = incidentNodes[0] !== u ? incidentNodes[0] : incidentNodes[1],
                    pri = pq.priority(v);
                if (pri !== undefined) {
                    var edgeWeight = weightFunc(e);
                    if (edgeWeight < pri) {
                        parents[v] = u;
                        pq.decrease(v, edgeWeight);
                    }
                }
            }

            if (g.order() === 0) {
                return result;
            }

            g.eachNode(function (u) {
                pq.add(u, Number.POSITIVE_INFINITY);
                result.addNode(u);
            });

            // Start from an arbitrary node
            pq.decrease(g.nodes()[0], 0);

            var init = false;
            while (pq.size() > 0) {
                u = pq.removeMin();
                if (u in parents) {
                    result.addEdge(null, u, parents[u]);
                } else if (init) {
                    throw new Error("Input graph is not connected: " + g);
                } else {
                    init = true;
                }

                g.incidentEdges(u).forEach(updateNeighbors);
            }

            return result;
        }

    }, { "../Graph": 33, "cp-data": 5 }], 43: [function (require, module, exports) {
        module.exports = tarjan;

        /**
         * This function is an implementation of [Tarjan's algorithm][] which finds
         * all [strongly connected components][] in the directed graph **g**. Each
         * strongly connected component is composed of nodes that can reach all other
         * nodes in the component via directed edges. A strongly connected component
         * can consist of a single node if that node cannot both reach and be reached
         * by any other specific node in the graph. Components of more than one node
         * are guaranteed to have at least one cycle.
         *
         * This function returns an array of components. Each component is itself an
         * array that contains the ids of all nodes in the component.
         *
         * [Tarjan's algorithm]: http://en.wikipedia.org/wiki/Tarjan's_strongly_connected_components_algorithm
         * [strongly connected components]: http://en.wikipedia.org/wiki/Strongly_connected_component
         *
         * @param {Digraph} g the graph to search for strongly connected components
         */
        function tarjan(g) {
            if (!g.isDirected()) {
                throw new Error("tarjan can only be applied to a directed graph. Bad input: " + g);
            }

            var index = 0,
                stack = [],
                visited = {}, // node id -> { onStack, lowlink, index }
                results = [];

            function dfs(u) {
                var entry = visited[u] = {
                    onStack: true,
                    lowlink: index,
                    index: index++
                };
                stack.push(u);

                g.successors(u).forEach(function (v) {
                    if (!(v in visited)) {
                        dfs(v);
                        entry.lowlink = Math.min(entry.lowlink, visited[v].lowlink);
                    } else if (visited[v].onStack) {
                        entry.lowlink = Math.min(entry.lowlink, visited[v].index);
                    }
                });

                if (entry.lowlink === entry.index) {
                    var cmpt = [],
                        v;
                    do {
                        v = stack.pop();
                        visited[v].onStack = false;
                        cmpt.push(v);
                    } while (u !== v);
                    results.push(cmpt);
                }
            }

            g.nodes().forEach(function (u) {
                if (!(u in visited)) {
                    dfs(u);
                }
            });

            return results;
        }

    }, {}], 44: [function (require, module, exports) {
        module.exports = topsort;
        topsort.CycleException = CycleException;

        /*
         * Given a graph **g**, this function returns an ordered list of nodes such
         * that for each edge `u -> v`, `u` appears before `v` in the list. If the
         * graph has a cycle it is impossible to generate such a list and
         * **CycleException** is thrown.
         *
         * See [topological sorting](https://en.wikipedia.org/wiki/Topological_sorting)
         * for more details about how this algorithm works.
         *
         * @param {Digraph} g the graph to sort
         */
        function topsort(g) {
            if (!g.isDirected()) {
                throw new Error("topsort can only be applied to a directed graph. Bad input: " + g);
            }

            var visited = {};
            var stack = {};
            var results = [];

            function visit(node) {
                if (node in stack) {
                    throw new CycleException();
                }

                if (!(node in visited)) {
                    stack[node] = true;
                    visited[node] = true;
                    g.predecessors(node).forEach(function (pred) {
                        visit(pred);
                    });
                    delete stack[node];
                    results.push(node);
                }
            }

            var sinks = g.sinks();
            if (g.order() !== 0 && sinks.length === 0) {
                throw new CycleException();
            }

            g.sinks().forEach(function (sink) {
                visit(sink);
            });

            return results;
        }

        function CycleException() { }

        CycleException.prototype.toString = function () {
            return "Graph has at least one cycle";
        };

    }, {}], 45: [function (require, module, exports) {
        // This file provides a helper function that mixes-in Dot behavior to an
        // existing graph prototype.

        /* jshint -W079 */
        var Set = require("cp-data").Set;
        /* jshint +W079 */

        module.exports = compoundify;

        // Extends the given SuperConstructor with the ability for nodes to contain
        // other nodes. A special node id `null` is used to indicate the root graph.
        function compoundify(SuperConstructor) {
            function Constructor() {
                SuperConstructor.call(this);

                // Map of object id -> parent id (or null for root graph)
                this._parents = {};

                // Map of id (or null) -> children set
                this._children = {};
                this._children[null] = new Set();
            }

            Constructor.prototype = new SuperConstructor();
            Constructor.prototype.constructor = Constructor;

            Constructor.prototype.parent = function (u, parent) {
                this._strictGetNode(u);

                if (arguments.length < 2) {
                    return this._parents[u];
                }

                if (u === parent) {
                    throw new Error("Cannot make " + u + " a parent of itself");
                }
                if (parent !== null) {
                    this._strictGetNode(parent);
                }

                this._children[this._parents[u]].remove(u);
                this._parents[u] = parent;
                this._children[parent].add(u);
            };

            Constructor.prototype.children = function (u) {
                if (u !== null) {
                    this._strictGetNode(u);
                }
                return this._children[u].keys();
            };

            Constructor.prototype.addNode = function (u, value) {
                u = SuperConstructor.prototype.addNode.call(this, u, value);
                this._parents[u] = null;
                this._children[u] = new Set();
                this._children[null].add(u);
                return u;
            };

            Constructor.prototype.delNode = function (u) {
                // Promote all children to the parent of the subgraph
                var parent = this.parent(u);
                this._children[u].keys().forEach(function (child) {
                    this.parent(child, parent);
                }, this);

                this._children[parent].remove(u);
                delete this._parents[u];
                delete this._children[u];

                return SuperConstructor.prototype.delNode.call(this, u);
            };

            Constructor.prototype.copy = function () {
                var copy = SuperConstructor.prototype.copy.call(this);
                this.nodes().forEach(function (u) {
                    copy.parent(u, this.parent(u));
                }, this);
                return copy;
            };

            Constructor.prototype.filterNodes = function (filter) {
                var self = this,
                    copy = SuperConstructor.prototype.filterNodes.call(this, filter);

                var parents = {};
                function findParent(u) {
                    var parent = self.parent(u);
                    if (parent === null || copy.hasNode(parent)) {
                        parents[u] = parent;
                        return parent;
                    } else if (parent in parents) {
                        return parents[parent];
                    } else {
                        return findParent(parent);
                    }
                }

                copy.eachNode(function (u) { copy.parent(u, findParent(u)); });

                return copy;
            };

            return Constructor;
        }

    }, { "cp-data": 5 }], 46: [function (require, module, exports) {
        var Graph = require("../Graph"),
            Digraph = require("../Digraph"),
            CGraph = require("../CGraph"),
            CDigraph = require("../CDigraph");

        exports.decode = function (nodes, edges, Ctor) {
            Ctor = Ctor || Digraph;

            if (typeOf(nodes) !== "Array") {
                throw new Error("nodes is not an Array");
            }

            if (typeOf(edges) !== "Array") {
                throw new Error("edges is not an Array");
            }

            if (typeof Ctor === "string") {
                switch (Ctor) {
                    case "graph": Ctor = Graph; break;
                    case "digraph": Ctor = Digraph; break;
                    case "cgraph": Ctor = CGraph; break;
                    case "cdigraph": Ctor = CDigraph; break;
                    default: throw new Error("Unrecognized graph type: " + Ctor);
                }
            }

            var graph = new Ctor();

            nodes.forEach(function (u) {
                graph.addNode(u.id, u.value);
            });

            // If the graph is compound, set up children...
            if (graph.parent) {
                nodes.forEach(function (u) {
                    if (u.children) {
                        u.children.forEach(function (v) {
                            graph.parent(v, u.id);
                        });
                    }
                });
            }

            edges.forEach(function (e) {
                graph.addEdge(e.id, e.u, e.v, e.value);
            });

            return graph;
        };

        exports.encode = function (graph) {
            var nodes = [];
            var edges = [];

            graph.eachNode(function (u, value) {
                var node = { id: u, value: value };
                if (graph.children) {
                    var children = graph.children(u);
                    if (children.length) {
                        node.children = children;
                    }
                }
                nodes.push(node);
            });

            graph.eachEdge(function (e, u, v, value) {
                edges.push({ id: e, u: u, v: v, value: value });
            });

            var type;
            if (graph instanceof CDigraph) {
                type = "cdigraph";
            } else if (graph instanceof CGraph) {
                type = "cgraph";
            } else if (graph instanceof Digraph) {
                type = "digraph";
            } else if (graph instanceof Graph) {
                type = "graph";
            } else {
                throw new Error("Couldn't determine type of graph: " + graph);
            }

            return { nodes: nodes, edges: edges, type: type };
        };

        function typeOf(obj) {
            return Object.prototype.toString.call(obj).slice(8, -1);
        }

    }, { "../CDigraph": 30, "../CGraph": 31, "../Digraph": 32, "../Graph": 33 }], 47: [function (require, module, exports) {
        /* jshint -W079 */
        var Set = require("cp-data").Set;
        /* jshint +W079 */

        exports.all = function () {
            return function () { return true; };
        };

        exports.nodesFromList = function (nodes) {
            var set = new Set(nodes);
            return function (u) {
                return set.has(u);
            };
        };

    }, { "cp-data": 5 }], 48: [function (require, module, exports) {
        var Graph = require("./Graph"),
            Digraph = require("./Digraph");

        // Side-effect based changes are lousy, but node doesn't seem to resolve the
        // requires cycle.

        /**
         * Returns a new directed graph using the nodes and edges from this graph. The
         * new graph will have the same nodes, but will have twice the number of edges:
         * each edge is split into two edges with opposite directions. Edge ids,
         * consequently, are not preserved by this transformation.
         */
        Graph.prototype.toDigraph =
        Graph.prototype.asDirected = function () {
            var g = new Digraph();
            this.eachNode(function (u, value) { g.addNode(u, value); });
            this.eachEdge(function (e, u, v, value) {
                g.addEdge(null, u, v, value);
                g.addEdge(null, v, u, value);
            });
            return g;
        };

        /**
         * Returns a new undirected graph using the nodes and edges from this graph.
         * The new graph will have the same nodes, but the edges will be made
         * undirected. Edge ids are preserved in this transformation.
         */
        Digraph.prototype.toGraph =
        Digraph.prototype.asUndirected = function () {
            var g = new Graph();
            this.eachNode(function (u, value) { g.addNode(u, value); });
            this.eachEdge(function (e, u, v, value) {
                g.addEdge(e, u, v, value);
            });
            return g;
        };

    }, { "./Digraph": 32, "./Graph": 33 }], 49: [function (require, module, exports) {
        // Returns an array of all values for properties of **o**.
        exports.values = function (o) {
            var ks = Object.keys(o),
                len = ks.length,
                result = new Array(len),
                i;
            for (i = 0; i < len; ++i) {
                result[i] = o[ks[i]];
            }
            return result;
        };

    }, {}], 50: [function (require, module, exports) {
        module.exports = '0.7.4';

    }, {}]
}, {}, [1])
;