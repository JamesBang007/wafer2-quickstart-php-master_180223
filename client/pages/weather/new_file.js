! function () {
    define("dataCtrl", ["jquery", "promise"], function (t, e) {
        function n(t, n, i, r) {
            var s = "//" + o + "/weather/common?source=pc&weather_type=observe|forecast_1h|forecast_24h|index|alarm|limit|tips|rise",
                c = "//" + o + "/weather/common?source=pc&weather_type=air|rise",
                l = [],
                u = {};
            return l.push(new e(function (e, r) {
                a(encodeURI(s + "&province=" + t + "&city=" + n + "&county=" + i), function (i) {
                    "200" == i.status && (u.weather = i.data, a(encodeURI(c + "&province=" + t + "&city=" + n), function (t) {
                        "200" == t.status && (u.weather.air = t.data.air, e(t.data))
                    }))
                })
            })), e.all(l).then(function (t) {
                return new e(function (t, e) {
                    t(u)
                })
            }, function (t) {})
        }

        function i(t, n, i, r) {
            var s = "//" + o + "/weather/common?source=pc&weather_type=" + r;
            return new e(function (e, o) {
                a(encodeURI(s + "&province=" + t + "&city=" + n + "&county=" + i), function (t) {
                    "200" == t.status && e(t.data[r])
                })
            })
        }

        function r(t) {
            return new e(function (e, n) {
                a("//" + o + "/city/like?source=pc&city=" + encodeURI(t), function (t) {
                    200 == t.status ? e(t.data) : n(t)
                }, function (t) {
                    n(t)
                })
            })
        }

        function s(t, n, i) {
            var r = "//" + o + "/city/getcode?source=pc";
            return new e(function (e, s) {
                a(encodeURI(r + "&province=" + t + "&city=" + n + "&county=" + i), function (t) {
                    "200" == t.status && e(t.data)
                })
            })
        }
        var a = function (e, n, i, r) {
                t.ajax({
                    type: "get",
                    async: !0,
                    url: e,
                    charset: "UTF-8",
                    dataType: "jsonp",
                    success: function (t) {
                        n(t)
                    }, error: function () {
                        i()
                    }
                })
            },
            o = "wis.qq.com";
        return {
            getWeatherInof: n,
            getCustomInfo: i,
            getCityId: s,
            getMatchPlace: r
        }
    }), ! function () {
        function t(t, e) {
            return (/string|function/.test(typeof e) ? o : a)(t, e)
        }

        function e(t, n) {
            return "string" != typeof t && (n = typeof t, "number" === n ? t += "" : t = "function" === n ? e(t.call(t)) : ""), t
        }

        function n(t) {
            return h[t]
        }

        function i(t) {
            return e(t).replace(/&(?![\w#]+;)|[<>"']/g, n)
        }

        function r(t, e) {
            if (d(t))
                for (var n = 0, i = t.length; n < i; n++) e.call(t, t[n], n, t);
            else
                for (n in t) e.call(t, t[n], n)
        }

        function s(t, e) {
            var n = /(\/)[^\/]+\1\.\.\1/,
                i = ("./" + t).replace(/[^\/]+$/, ""),
                r = i + e;
            for (r = r.replace(/\/\.\//g, "/"); r.match(n);) r = r.replace(n, "/");
            return r
        }

        function a(e, n) {
            var i = t.get(e) || c({
                filename: e,
                name: "Render Error",
                message: "Template not found"
            });
            return n ? i(n) : i
        }

        function o(t, e) {
            if ("string" == typeof e) {
                var n = e;
                e = function () {
                    return new u(n)
                }
            }
            var i = l[t] = function (n) {
                try {
                    return new e(n, t) + ""
                } catch (i) {
                    return c(i)()
                }
            };
            return i.prototype = e.prototype = f, i.toString = function () {
                return e + ""
            }, i
        }

        function c(t) {
            var e = "{Template Error}",
                n = t.stack || "";
            if (n) n = n.split("\n").slice(0, 2).join("\n");
            else
                for (var i in t) n += "<" + i + ">\n" + t[i] + "\n\n";
            return function () {
                return "object" == typeof console && console.error(e + "\n\n" + n), e
            }
        }
        var l = t.cache = {},
            u = this.String,
            h = {
                "<": "&#60;",
                ">": "&#62;",
                '"': "&#34;",
                "'": "&#39;",
                "&": "&#38;"
            },
            d = Array.isArray || function (t) {
                return "[object Array]" === {}.toString.call(t)
            },
            f = t.utils = {
                $helpers: {},
                $include: function (t, e, n) {
                    return t = s(n, t), a(t, e)
                }, $string: e,
                $escape: i,
                $each: r
            },
            m = t.helpers = f.$helpers;
        t.get = function (t) {
            return l[t.replace(/^\.\//, "")]
        }, t.helper = function (t, e) {
            m[t] = e
        }, "function" == typeof define ? define("templateModule", [], function () {
            return t
        }) : "undefined" != typeof exports ? module.exports = t : this.template = t, t("aqi", function (t, e) {
            "use strict";
            var n = this,
                i = (n.$helpers, n.$escape),
                r = t.air,
                s = "";
            return s += '<p class="info-aqi">', s += i(r.aqi + " " + r.aqi_name), s += '</p> <div id="air-window" class="popwindow"> <div class="header">\u7a7a\u6c14\u8d28\u91cf\u6307\u6570 ', s += i(r.aqi + "&nbsp;" + r.aqi_name), s += '</div> <div class="detail"> <div class="inner"> <table id="tb-detail"> <tbody> <tr class="line1"> <td> <p class="val">', s += i(r["pm2.5"]), s += '</p> <p class="titl">PM2.5</p> </td> <td class="nth-2"> <p class="val">', s += i(r.pm10), s += '</p> <p class="titl">PM10</p> </td> <td> <p class="val">', s += i(r.so2), s += '</p> <p class="titl">SO2</p> </td> </tr> <tr> <td> <p class="val">', s += i(r.no2), s += '</p> <p class="titl">NO2</p> </td> <td class="nth-2"> <p class="val">', s += i(r.o3), s += '</p> <p class="titl">O3</p> </td> <td> <p class="val">', s += i(r.co), s += '</p> <p class="titl">CO</p> </td> </tr> </tbody> </table> </div> </div> </div>', new u(s)
        }), t("attention", function (t, e) {
            "use strict";
            var n = this,
                i = (n.$helpers, t.data),
                r = n.$each,
                s = (t.$val, t.$index, n.$escape),
                a = "";
            return i.length ? (a += " ", r(i, function (t, e) {
                a += ' <li class="city" data-province="', a += s(t.province), a += '" data-city="', a += s(t.city), a += '" data-district=', a += s(t.district), a += '> <div class="ct-location"> <p class="location">', a += s(t.district ? t.district : t.city), a += "</p> ", a += t.isDefault ? ' <p class="mark">\u9ed8\u8ba4</p> <a href="javascript:;" class="btn btn-cancel">\u53d6\u6d88\u9ed8\u8ba4</a> ' : ' <a href="javascript:;" class="btn btn-set-default">\u8bbe\u4e3a\u9ed8\u8ba4</a> ', a += ' </div> <img class="icon" src="//mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/', a += s(t.day_weather_code), a += '.png" alt="', a += s(t.day_weather_short), a += '" title="', a += s(t.day_weather_short), a += '"> <p class="weather">', a += s(t.weather), a += '</p> <p class="temperature">', a += s(t.temprature), a += '</p> <a href="javascript:;" class="btn btn-delete"></a> </li> '
            }), a += " ") : a += ' <li id="tips-attention">\u70b9\u51fb\u201c\u6dfb\u52a0\u5173\u6ce8\u201d\u6dfb\u52a0\u57ce\u5e02\u54df~</li> ', new u(a)
        }), t("citys", function (t, e) {
            "use strict";
            var n = this,
                i = (n.$helpers, n.$each),
                r = t.data,
                s = (t.$val, t.$index, n.$escape),
                a = "";
            return i(r, function (t, e) {
                a += " ", t.district ? (a += ' <li class="opts" data-province="', a += s(t.province), a += '" data-city="', a += s(t.city), a += '" data-district=', a += s(t.district), a += "><span>", a += s(t.show), a += "</span></li> ") : (a += ' <li class="opts" data-province="', a += s(t.province), a += '" data-city="', a += s(t.city), a += '"><span>', a += s(t.show), a += "</span></li> "), a += " "
            }), new u(a)
        }), t("currentweather", function (t, e) {
            "use strict";
            var n = this,
                i = (n.$helpers, n.$escape),
                r = t.weatherData,
                s = "";
            return s += '<img class="icon" src="//mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/currentweather/', s += i(r.type), s += "/", s += i(r.weather_code), s += '.png" />', new u(s)
        }), t("days", function (t, e) {
            "use strict";
            var n = this,
                i = (n.$helpers, n.$each),
                r = t.data,
                s = (t.$val, t.$idx, n.$escape),
                a = t.itemWidth,
                o = "";
            return i(r, function (t, e) {
                o += " ", 0 == e ? (o += ' <li class="item first" style="width: ', o += s(a), o += 'px"> ') : 1 == e ? (o += ' <li class="item second" style="width: ', o += s(a), o += 'px"> ') : r.length == e + 1 ? (o += ' <li class="item last" style="width: ', o += s(a), o += 'px"> ') : (o += ' <li class="item" style="width: ', o += s(a), o += 'px"> '), o += ' <p class="day">', o += s(t.showText), o += '</p> <p class="date">', o += s(t.formatTime), o += '</p> <div class="ct-daytime"> <p class="weather">', o += s(t.day_weather_short), o += '</p> <img class="icon" src="//mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/', o += s(t.day_weather_code), o += '.png" alt="', o += s(t.day_weather_short), o += '" title="', o += s(t.day_weather_short), o += '"> </div> <div class="ct-night"> <img class="icon" src="//mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/night/', o += s(t.night_weather_code), o += '.png" alt="', o += s(t.night_weather_short), o += '" title="', o += s(t.night_weather_short), o += '"> <p class="weather">', o += s(t.night_weather_short), o += '</p> </div> <p class="wind">', o += s(t.night_wind_direction), o += " ", o += s(t.night_wind_power), o += "\u7ea7</p> </li> "
            }), new u(o)
        }), t("hours", function (t, e) {
            "use strict";
            var n = this,
                i = (n.$helpers, n.$each),
                r = t.data,
                s = (t.$val, t.$idx, n.$escape),
                a = "";
            return i(r, function (t, e) {
                a += " ", "keypoint" == t.type ? (a += ' <li class="item"> <p class="txt-time">', a += s(t.format_time), a += '</p> <img src="//mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/', a += s(t.key_type), a += '.png" alt="', a += s(t.show), a += '" title="', a += s(t.show), a += '" class="icon"> <p class="txt-degree">', a += s(t.show), a += "</p> </li> ") : (a += ' <li class="item"> <p class="txt-time">', a += s(t.format_time), a += '</p> <img src="//mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/', a += s(t.type), a += "/", a += s(t.weather_code), a += '.png" alt="', a += s(t.weather), a += '" title="', a += s(t.weather), a += '" class="icon"> <p class="txt-degree">', a += s(t.degree), a += "\xb0</p> </li> "), a += " "
            }), new u(a)
        }), t("living", function (t, e) {
            "use strict";
            var n = this,
                i = (n.$helpers, n.$each),
                r = t.data,
                s = (t.$val, t.$idx, n.$escape),
                a = "";
            return i(r, function (t, e) {
                a += ' <li class="item ', a += s(e % 2 == 0 ? "odd" : "even"), a += '"> <div class="ct-sub"> <i class="icon ', a += s(t.icon), a += '"></i> <p class="content">', a += s(t.name), a += "&nbsp;", a += s(t.info), a += '</p> </div> <div class="ct-detail"> <div class="detail">', a += s(t.detail), a += "</div> </div> </li> "
            }), new u(a)
        }), t("news", function (t, e) {
            "use strict";
            var n = this,
                i = (n.$helpers, n.$each),
                r = t.data,
                s = (t.$val, t.$idx, n.$escape),
                a = "";
            return i(r, function (t, e) {
                a += " ", a += r.length - 1 == e ? ' <li class="item last"> ' : ' <li class="item"> ', a += ' <a href="', a += s(t.surl), a += '" target="_blank"> <p class="time">', a += s(t.publish_time), a += '</p> <div class="ct-detail"> <div class="ct-img"> <img src="', a += s(t.img.replace("http://", "//")), a += '" alt="" class="preview"> </div> <div class="ct-info"> <p class="title">', a += s(t.title), a += '</p> <p class="copyright">', a += s(t.source), a += " ", a += s(t.comment_num), a += "\u8bc4</p> </div> </div> </a> </li> "
            }), new u(a)
        }), t("sogo", function (t, e) {
            "use strict";
            var n = this,
                i = (n.$helpers, n.$each),
                r = t.data,
                s = (t.$val, t.$index, n.$escape),
                a = "";
            return i(r, function (t, e) {
                a += ' <li class="item"> <a target="_blank" href="https://www.sogou.com/sie?rfg=1&prs=5&query=', a += s(t.word2), a += '&ie=utf8&pid=sogou-wsse-3e524bf740dc8cfd">\xb7', a += s(t.word), a += "</a> </li> "
            }), new u(a)
        }), t("vidoes", function (t, e) {
            "use strict";
            var n = this,
                i = (n.$helpers, n.$each),
                r = t.data,
                s = (t.$val, t.$idx, n.$escape),
                a = "";
            return i(r, function (t, e) {
                a += " ", a += e % 2 == 0 ? ' <li class="item even"> ' : ' <li class="item"> ', a += ' <a href="', a += s(t.url), a += '" target="_blank"> <div class="ct-preview"> <img src="', a += s(t.img.replace("http://", "//")), a += '" alt="" class="preview"> </div> <p class="title">', a += s(t.title), a += "</p> </a> </li> "
            }), new u(a)
        }), t("warning", function (t, e) {
            "use strict";
            var n = this,
                i = (n.$helpers, n.$each),
                r = t.data,
                s = (t.$val, t.$index, n.$escape),
                a = "";
            return i(r, function (t, e) {
                a += ' <li class="tag level', a += s(t.level_code), a += '"> ', a += s(t.type_name), a += '\u9884\u8b66 <div class="popwindow warning-window"> <div class="header">', a += s(t.type_name + t.level_name + "\u9884\u8b66"), a += '</div> <div class="detail"> <div class="inner"> <p>', a += s(t.detail), a += "</p> </div> </div> </div> </li> "
            }), new u(a)
        })
    }(), ! function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("moment", e) : t.moment = e()
    }(this, function () {
        "use strict";

        function t() {
            return vi.apply(null, arguments)
        }

        function e(t) {
            vi = t
        }

        function n(t) {
            return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t)
        }

        function i(t) {
            return null != t && "[object Object]" === Object.prototype.toString.call(t)
        }

        function r(t) {
            var e;
            for (e in t) return !1;
            return !0
        }

        function s(t) {
            return void 0 === t
        }

        function a(t) {
            return "number" == typeof t || "[object Number]" === Object.prototype.toString.call(t)
        }

        function o(t) {
            return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
        }

        function c(t, e) {
            var n, i = [];
            for (n = 0; n < t.length; ++n) i.push(e(t[n], n));
            return i
        }

        function l(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }

        function u(t, e) {
            for (var n in e) l(e, n) && (t[n] = e[n]);
            return l(e, "toString") && (t.toString = e.toString), l(e, "valueOf") && (t.valueOf = e.valueOf), t
        }

        function h(t, e, n, i) {
            return ge(t, e, n, i, !0).utc()
        }

        function d() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1,
                parsedDateParts: [],
                meridiem: null,
                rfc2822: !1,
                weekdayMismatch: !1
            }
        }

        function f(t) {
            return null == t._pf && (t._pf = d()), t._pf
        }

        function m(t) {
            if (null == t._isValid) {
                var e = f(t),
                    n = ki.call(e.parsedDateParts, function (t) {
                        return null != t
                    }),
                    i = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && n);
                if (t._strict && (i = i && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour), null != Object.isFrozen && Object.isFrozen(t)) return i;
                t._isValid = i
            }
            return t._isValid
        }

        function p(t) {
            var e = h(NaN);
            return null != t ? u(f(e), t) : f(e).userInvalidated = !0, e
        }

        function y(t, e) {
            var n, i, r;
            if (s(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), s(e._i) || (t._i = e._i), s(e._f) || (t._f = e._f), s(e._l) || (t._l = e._l), s(e._strict) || (t._strict = e._strict), s(e._tzm) || (t._tzm = e._tzm), s(e._isUTC) || (t._isUTC = e._isUTC), s(e._offset) || (t._offset = e._offset), s(e._pf) || (t._pf = f(e)), s(e._locale) || (t._locale = e._locale), Mi.length > 0)
                for (n = 0; n < Mi.length; n++) i = Mi[n], r = e[i], s(r) || (t[i] = r);
            return t
        }

        function _(e) {
            y(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), Si === !1 && (Si = !0, t.updateOffset(this), Si = !1)
        }

        function g(t) {
            return t instanceof _ || null != t && null != t._isAMomentObject
        }

        function v(t) {
            return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
        }

        function w(t) {
            var e = +t,
                n = 0;
            return 0 !== e && isFinite(e) && (n = v(e)), n
        }

        function k(t, e, n) {
            var i, r = Math.min(t.length, e.length),
                s = Math.abs(t.length - e.length),
                a = 0;
            for (i = 0; i < r; i++)(n && t[i] !== e[i] || !n && w(t[i]) !== w(e[i])) && a++;
            return a + s
        }

        function M(e) {
            t.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
        }

        function S(e, n) {
            var i = !0;
            return u(function () {
                if (null != t.deprecationHandler && t.deprecationHandler(null, e), i) {
                    for (var r, s = [], a = 0; a < arguments.length; a++) {
                        if (r = "", "object" == typeof arguments[a]) {
                            r += "\n[" + a + "] ";
                            for (var o in arguments[0]) r += o + ": " + arguments[0][o] + ", ";
                            r = r.slice(0, -2)
                        } else r = arguments[a];
                        s.push(r)
                    }
                    M(e + "\nArguments: " + Array.prototype.slice.call(s).join("") + "\n" + (new Error).stack), i = !1
                }
                return n.apply(this, arguments)
            }, n)
        }

        function D(e, n) {
            null != t.deprecationHandler && t.deprecationHandler(e, n), Di[e] || (M(n), Di[e] = !0)
        }

        function Y(t) {
            return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t)
        }

        function x(t) {
            var e, n;
            for (n in t) e = t[n], Y(e) ? this[n] = e : this["_" + n] = e;
            this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
        }

        function b(t, e) {
            var n, r = u({}, t);
            for (n in e) l(e, n) && (i(t[n]) && i(e[n]) ? (r[n] = {}, u(r[n], t[n]), u(r[n], e[n])) : null != e[n] ? r[n] = e[n] : delete r[n]);
            for (n in t) l(t, n) && !l(e, n) && i(t[n]) && (r[n] = u({}, r[n]));
            return r
        }

        function O(t) {
            null != t && this.set(t)
        }

        function T(t, e, n) {
            var i = this._calendar[t] || this._calendar.sameElse;
            return Y(i) ? i.call(e, n) : i
        }

        function P(t) {
            var e = this._longDateFormat[t],
                n = this._longDateFormat[t.toUpperCase()];
            return e || !n ? e : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, function (t) {
                return t.slice(1)
            }), this._longDateFormat[t])
        }

        function C() {
            return this._invalidDate
        }

        function W(t) {
            return this._ordinal.replace("%d", t)
        }

        function H(t, e, n, i) {
            var r = this._relativeTime[n];
            return Y(r) ? r(t, e, n, i) : r.replace(/%d/i, t)
        }

        function R(t, e) {
            var n = this._relativeTime[t > 0 ? "future" : "past"];
            return Y(n) ? n(e) : n.replace(/%s/i, e)
        }

        function j(t, e) {
            var n = t.toLowerCase();
            Ri[n] = Ri[n + "s"] = Ri[e] = t
        }

        function F(t) {
            return "string" == typeof t ? Ri[t] || Ri[t.toLowerCase()] : void 0
        }

        function U(t) {
            var e, n, i = {};
            for (n in t) l(t, n) && (e = F(n), e && (i[e] = t[n]));
            return i
        }

        function L(t, e) {
            ji[t] = e
        }

        function A(t) {
            var e = [];
            for (var n in t) e.push({
                unit: n,
                priority: ji[n]
            });
            return e.sort(function (t, e) {
                return t.priority - e.priority
            }), e
        }

        function E(e, n) {
            return function (i) {
                return null != i ? (N(this, e, i), t.updateOffset(this, n), this) : $(this, e)
            }
        }

        function $(t, e) {
            return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN
        }

        function N(t, e, n) {
            t.isValid() && t._d["set" + (t._isUTC ? "UTC" : "") + e](n)
        }

        function G(t) {
            return t = F(t), Y(this[t]) ? this[t]() : this
        }

        function I(t, e) {
            if ("object" == typeof t) {
                t = U(t);
                for (var n = A(t), i = 0; i < n.length; i++) this[n[i].unit](t[n[i].unit])
            } else if (t = F(t), Y(this[t])) return this[t](e);
            return this
        }

        function V(t, e, n) {
            var i = "" + Math.abs(t),
                r = e - i.length,
                s = t >= 0;
            return (s ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + i
        }

        function q(t, e, n, i) {
            var r = i;
            "string" == typeof i && (r = function () {
                return this[i]()
            }), t && (Ai[t] = r), e && (Ai[e[0]] = function () {
                return V(r.apply(this, arguments), e[1], e[2])
            }), n && (Ai[n] = function () {
                return this.localeData().ordinal(r.apply(this, arguments), t)
            })
        }

        function z(t) {
            return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
        }

        function Z(t) {
            var e, n, i = t.match(Fi);
            for (e = 0, n = i.length; e < n; e++) Ai[i[e]] ? i[e] = Ai[i[e]] : i[e] = z(i[e]);
            return function (e) {
                var r, s = "";
                for (r = 0; r < n; r++) s += Y(i[r]) ? i[r].call(e, t) : i[r];
                return s
            }
        }

        function B(t, e) {
            return t.isValid() ? (e = J(e, t.localeData()), Li[e] = Li[e] || Z(e), Li[e](t)) : t.localeData().invalidDate()
        }

        function J(t, e) {
            function n(t) {
                return e.longDateFormat(t) || t
            }
            var i = 5;
            for (Ui.lastIndex = 0; i >= 0 && Ui.test(t);) t = t.replace(Ui, n), Ui.lastIndex = 0, i -= 1;
            return t
        }

        function Q(t, e, n) {
            ir[t] = Y(e) ? e : function (t, i) {
                return t && n ? n : e
            }
        }

        function X(t, e) {
            return l(ir, t) ? ir[t](e._strict, e._locale) : new RegExp(K(t))
        }

        function K(t) {
            return tt(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, e, n, i, r) {
                return e || n || i || r
            }))
        }

        function tt(t) {
            return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }

        function et(t, e) {
            var n, i = e;
            for ("string" == typeof t && (t = [t]), a(e) && (i = function (t, n) {
                n[e] = w(t)
            }), n = 0; n < t.length; n++) rr[t[n]] = i
        }

        function nt(t, e) {
            et(t, function (t, n, i, r) {
                i._w = i._w || {}, e(t, i._w, i, r)
            })
        }

        function it(t, e, n) {
            null != e && l(rr, t) && rr[t](e, n._a, n, t)
        }

        function rt(t, e) {
            return new Date(Date.UTC(t, e + 1, 0)).getUTCDate()
        }

        function st(t, e) {
            return t ? n(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || pr).test(e) ? "format" : "standalone"][t.month()] : n(this._months) ? this._months : this._months.standalone
        }

        function at(t, e) {
            return t ? n(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[pr.test(e) ? "format" : "standalone"][t.month()] : n(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
        }

        function ot(t, e, n) {
            var i, r, s, a = t.toLocaleLowerCase();
            if (!this._monthsParse)
                for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], i = 0; i < 12; ++i) s = h([2e3, i]), this._shortMonthsParse[i] = this.monthsShort(s, "").toLocaleLowerCase(), this._longMonthsParse[i] = this.months(s, "").toLocaleLowerCase();
            return n ? "MMM" === e ? (r = mr.call(this._shortMonthsParse, a), r !== -1 ? r : null) : (r = mr.call(this._longMonthsParse, a), r !== -1 ? r : null) : "MMM" === e ? (r = mr.call(this._shortMonthsParse, a), r !== -1 ? r : (r = mr.call(this._longMonthsParse, a), r !== -1 ? r : null)) : (r = mr.call(this._longMonthsParse, a), r !== -1 ? r : (r = mr.call(this._shortMonthsParse, a), r !== -1 ? r : null))
        }

        function ct(t, e, n) {
            var i, r, s;
            if (this._monthsParseExact) return ot.call(this, t, e, n);
            for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; i < 12; i++) {
                if (r = h([2e3, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), n || this._monthsParse[i] || (s = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[i] = new RegExp(s.replace(".", ""), "i")), n && "MMMM" === e && this._longMonthsParse[i].test(t)) return i;
                if (n && "MMM" === e && this._shortMonthsParse[i].test(t)) return i;
                if (!n && this._monthsParse[i].test(t)) return i
            }
        }

        function lt(t, e) {
            var n;
            if (!t.isValid()) return t;
            if ("string" == typeof e)
                if (/^\d+$/.test(e)) e = w(e);
                else if (e = t.localeData().monthsParse(e), !a(e)) return t;
            return n = Math.min(t.date(), rt(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), t
        }

        function ut(e) {
            return null != e ? (lt(this, e), t.updateOffset(this, !0), this) : $(this, "Month")
        }

        function ht() {
            return rt(this.year(), this.month())
        }

        function dt(t) {
            return this._monthsParseExact ? (l(this, "_monthsRegex") || mt.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (l(this, "_monthsShortRegex") || (this._monthsShortRegex = gr), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex)
        }

        function ft(t) {
            return this._monthsParseExact ? (l(this, "_monthsRegex") || mt.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (l(this, "_monthsRegex") || (this._monthsRegex = vr), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex)
        }

        function mt() {
            function t(t, e) {
                return e.length - t.length
            }
            var e, n, i = [],
                r = [],
                s = [];
            for (e = 0; e < 12; e++) n = h([2e3, e]), i.push(this.monthsShort(n, "")), r.push(this.months(n, "")), s.push(this.months(n, "")), s.push(this.monthsShort(n, ""));
            for (i.sort(t), r.sort(t), s.sort(t), e = 0; e < 12; e++) i[e] = tt(i[e]), r[e] = tt(r[e]);
            for (e = 0; e < 24; e++) s[e] = tt(s[e]);
            this._monthsRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i")
        }

        function pt(t) {
            return yt(t) ? 366 : 365
        }

        function yt(t) {
            return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
        }

        function _t() {
            return yt(this.year())
        }

        function gt(t, e, n, i, r, s, a) {
            var o = new Date(t, e, n, i, r, s, a);
            return t < 100 && t >= 0 && isFinite(o.getFullYear()) && o.setFullYear(t), o
        }

        function vt(t) {
            var e = new Date(Date.UTC.apply(null, arguments));
            return t < 100 && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), e
        }

        function wt(t, e, n) {
            var i = 7 + e - n,
                r = (7 + vt(t, 0, i).getUTCDay() - e) % 7;
            return -r + i - 1
        }

        function kt(t, e, n, i, r) {
            var s, a, o = (7 + n - i) % 7,
                c = wt(t, i, r),
                l = 1 + 7 * (e - 1) + o + c;
            return l <= 0 ? (s = t - 1, a = pt(s) + l) : l > pt(t) ? (s = t + 1, a = l - pt(t)) : (s = t, a = l), {
                year: s,
                dayOfYear: a
            }
        }

        function Mt(t, e, n) {
            var i, r, s = wt(t.year(), e, n),
                a = Math.floor((t.dayOfYear() - s - 1) / 7) + 1;
            return a < 1 ? (r = t.year() - 1, i = a + St(r, e, n)) : a > St(t.year(), e, n) ? (i = a - St(t.year(), e, n), r = t.year() + 1) : (r = t.year(), i = a), {
                week: i,
                year: r
            }
        }

        function St(t, e, n) {
            var i = wt(t, e, n),
                r = wt(t + 1, e, n);
            return (pt(t) - i + r) / 7
        }

        function Dt(t) {
            return Mt(t, this._week.dow, this._week.doy).week
        }

        function Yt() {
            return this._week.dow
        }

        function xt() {
            return this._week.doy
        }

        function bt(t) {
            var e = this.localeData().week(this);
            return null == t ? e : this.add(7 * (t - e), "d")
        }

        function Ot(t) {
            var e = Mt(this, 1, 4).week;
            return null == t ? e : this.add(7 * (t - e), "d")
        }

        function Tt(t, e) {
            return "string" != typeof t ? t : isNaN(t) ? (t = e.weekdaysParse(t), "number" == typeof t ? t : null) : parseInt(t, 10)
        }

        function Pt(t, e) {
            return "string" == typeof t ? e.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t
        }

        function Ct(t, e) {
            return t ? n(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? "format" : "standalone"][t.day()] : n(this._weekdays) ? this._weekdays : this._weekdays.standalone
        }

        function Wt(t) {
            return t ? this._weekdaysShort[t.day()] : this._weekdaysShort
        }

        function Ht(t) {
            return t ? this._weekdaysMin[t.day()] : this._weekdaysMin
        }

        function Rt(t, e, n) {
            var i, r, s, a = t.toLocaleLowerCase();
            if (!this._weekdaysParse)
                for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], i = 0; i < 7; ++i) s = h([2e3, 1]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(s, "").toLocaleLowerCase(), this._shortWeekdaysParse[i] = this.weekdaysShort(s, "").toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(s, "").toLocaleLowerCase();
            return n ? "dddd" === e ? (r = mr.call(this._weekdaysParse, a), r !== -1 ? r : null) : "ddd" === e ? (r = mr.call(this._shortWeekdaysParse, a), r !== -1 ? r : null) : (r = mr.call(this._minWeekdaysParse, a), r !== -1 ? r : null) : "dddd" === e ? (r = mr.call(this._weekdaysParse, a), r !== -1 ? r : (r = mr.call(this._shortWeekdaysParse, a), r !== -1 ? r : (r = mr.call(this._minWeekdaysParse, a), r !== -1 ? r : null))) : "ddd" === e ? (r = mr.call(this._shortWeekdaysParse, a), r !== -1 ? r : (r = mr.call(this._weekdaysParse, a), r !== -1 ? r : (r = mr.call(this._minWeekdaysParse, a), r !== -1 ? r : null))) : (r = mr.call(this._minWeekdaysParse, a), r !== -1 ? r : (r = mr.call(this._weekdaysParse, a), r !== -1 ? r : (r = mr.call(this._shortWeekdaysParse, a), r !== -1 ? r : null)))
        }

        function jt(t, e, n) {
            var i, r, s;
            if (this._weekdaysParseExact) return Rt.call(this, t, e, n);
            for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; i < 7; i++) {
                if (r = h([2e3, 1]).day(i), n && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(r, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[i] || (s = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[i] = new RegExp(s.replace(".", ""), "i")), n && "dddd" === e && this._fullWeekdaysParse[i].test(t)) return i;
                if (n && "ddd" === e && this._shortWeekdaysParse[i].test(t)) return i;
                if (n && "dd" === e && this._minWeekdaysParse[i].test(t)) return i;
                if (!n && this._weekdaysParse[i].test(t)) return i
            }
        }

        function Ft(t) {
            if (!this.isValid()) return null != t ? this : NaN;
            var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != t ? (t = Tt(t, this.localeData()), this.add(t - e, "d")) : e
        }

        function Ut(t) {
            if (!this.isValid()) return null != t ? this : NaN;
            var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == t ? e : this.add(t - e, "d")
        }

        function Lt(t) {
            if (!this.isValid()) return null != t ? this : NaN;
            if (null != t) {
                var e = Pt(t, this.localeData());
                return this.day(this.day() % 7 ? e : e - 7)
            }
            return this.day() || 7
        }

        function At(t) {
            return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Nt.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (l(this, "_weekdaysRegex") || (this._weekdaysRegex = Yr), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex)
        }

        function Et(t) {
            return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Nt.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (l(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = xr), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        }

        function $t(t) {
            return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Nt.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (l(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = br), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        }

        function Nt() {
            function t(t, e) {
                return e.length - t.length
            }
            var e, n, i, r, s, a = [],
                o = [],
                c = [],
                l = [];
            for (e = 0; e < 7; e++) n = h([2e3, 1]).day(e), i = this.weekdaysMin(n, ""), r = this.weekdaysShort(n, ""), s = this.weekdays(n, ""), a.push(i), o.push(r), c.push(s), l.push(i), l.push(r), l.push(s);
            for (a.sort(t), o.sort(t), c.sort(t), l.sort(t), e = 0; e < 7; e++) o[e] = tt(o[e]), c[e] = tt(c[e]), l[e] = tt(l[e]);
            this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + c.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")
        }

        function Gt() {
            return this.hours() % 12 || 12
        }

        function It() {
            return this.hours() || 24
        }

        function Vt(t, e) {
            q(t, 0, 0, function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), e)
            })
        }

        function qt(t, e) {
            return e._meridiemParse
        }

        function zt(t) {
            return "p" === (t + "").toLowerCase().charAt(0)
        }

        function Zt(t, e, n) {
            return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
        }

        function Bt(t) {
            return t ? t.toLowerCase().replace("_", "-") : t
        }

        function Jt(t) {
            for (var e, n, i, r, s = 0; s < t.length;) {
                for (r = Bt(t[s]).split("-"), e = r.length, n = Bt(t[s + 1]), n = n ? n.split("-") : null; e > 0;) {
                    if (i = Qt(r.slice(0, e).join("-"))) return i;
                    if (n && n.length >= e && k(r, n, !0) >= e - 1) break;
                    e--
                }
                s++
            }
            return null
        }

        function Qt(t) {
            var e = null;
            if (!Wr[t] && "undefined" != typeof module && module && module.exports) try {
                e = Or._abbr, require("./locale/" + t), Xt(e)
            } catch (t) {}
            return Wr[t]
        }

        function Xt(t, e) {
            var n;
            return t && (n = s(e) ? ee(t) : Kt(t, e), n && (Or = n)), Or._abbr
        }

        function Kt(t, e) {
            if (null !== e) {
                var n = Cr;
                if (e.abbr = t, null != Wr[t]) D("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), n = Wr[t]._config;
                else if (null != e.parentLocale) {
                    if (null == Wr[e.parentLocale]) return Hr[e.parentLocale] || (Hr[e.parentLocale] = []), Hr[e.parentLocale].push({
                        name: t,
                        config: e
                    }), null;
                    n = Wr[e.parentLocale]._config
                }
                return Wr[t] = new O(b(n, e)), Hr[t] && Hr[t].forEach(function (t) {
                    Kt(t.name, t.config)
                }), Xt(t), Wr[t]
            }
            return delete Wr[t], null
        }

        function te(t, e) {
            if (null != e) {
                var n, i = Cr;
                null != Wr[t] && (i = Wr[t]._config), e = b(i, e), n = new O(e), n.parentLocale = Wr[t], Wr[t] = n, Xt(t)
            } else null != Wr[t] && (null != Wr[t].parentLocale ? Wr[t] = Wr[t].parentLocale : null != Wr[t] && delete Wr[t]);
            return Wr[t]
        }

        function ee(t) {
            var e;
            if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return Or;
            if (!n(t)) {
                if (e = Qt(t)) return e;
                t = [t]
            }
            return Jt(t)
        }

        function ne() {
            return bi(Wr)
        }

        function ie(t) {
            var e, n = t._a;
            return n && f(t).overflow === -2 && (e = n[ar] < 0 || n[ar] > 11 ? ar : n[or] < 1 || n[or] > rt(n[sr], n[ar]) ? or : n[cr] < 0 || n[cr] > 24 || 24 === n[cr] && (0 !== n[lr] || 0 !== n[ur] || 0 !== n[hr]) ? cr : n[lr] < 0 || n[lr] > 59 ? lr : n[ur] < 0 || n[ur] > 59 ? ur : n[hr] < 0 || n[hr] > 999 ? hr : -1, f(t)._overflowDayOfYear && (e < sr || e > or) && (e = or), f(t)._overflowWeeks && e === -1 && (e = dr), f(t)._overflowWeekday && e === -1 && (e = fr), f(t).overflow = e), t
        }

        function re(t) {
            var e, n, i, r, s, a, o = t._i,
                c = Rr.exec(o) || jr.exec(o);
            if (c) {
                for (f(t).iso = !0, e = 0, n = Ur.length; e < n; e++)
                    if (Ur[e][1].exec(c[1])) {
                        r = Ur[e][0], i = Ur[e][2] !== !1;
                        break
                    }
                if (null == r) return void(t._isValid = !1);
                if (c[3]) {
                    for (e = 0, n = Lr.length; e < n; e++)
                        if (Lr[e][1].exec(c[3])) {
                            s = (c[2] || " ") + Lr[e][0];
                            break
                        }
                    if (null == s) return void(t._isValid = !1)
                }
                if (!i && null != s) return void(t._isValid = !1);
                if (c[4]) {
                    if (!Fr.exec(c[4])) return void(t._isValid = !1);
                    a = "Z"
                }
                t._f = r + (s || "") + (a || ""), he(t)
            } else t._isValid = !1
        }

        function se(t) {
            var e, n, i, r, s, a, o, c, l = {
                    " GMT": " +0000",
                    " EDT": " -0400",
                    " EST": " -0500",
                    " CDT": " -0500",
                    " CST": " -0600",
                    " MDT": " -0600",
                    " MST": " -0700",
                    " PDT": " -0700",
                    " PST": " -0800"
                },
                u = "YXWVUTSRQPONZABCDEFGHIKLM";
            if (e = t._i.replace(/\([^\)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s|\s$/g, ""), n = Er.exec(e)) {
                if (i = n[1] ? "ddd" + (5 === n[1].length ? ", " : " ") : "", r = "D MMM " + (n[2].length > 10 ? "YYYY " : "YY "), s = "HH:mm" + (n[4] ? ":ss" : ""), n[1]) {
                    var h = new Date(n[2]),
                        d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][h.getDay()];
                    if (n[1].substr(0, 3) !== d) return f(t).weekdayMismatch = !0, void(t._isValid = !1)
                }
                switch (n[5].length) {
                case 2:
                    0 === c ? o = " +0000" : (c = u.indexOf(n[5][1].toUpperCase()) - 12, o = (c < 0 ? " -" : " +") + ("" + c).replace(/^-?/, "0").match(/..$/)[0] + "00");
                    break;
                case 4:
                    o = l[n[5]];
                    break;
                default:
                    o = l[" GMT"]
                }
                n[5] = o, t._i = n.splice(1).join(""), a = " ZZ", t._f = i + r + s + a, he(t), f(t).rfc2822 = !0
            } else t._isValid = !1
        }

        function ae(e) {
            var n = Ar.exec(e._i);
            return null !== n ? void(e._d = new Date((+n[1]))) : (re(e), void(e._isValid === !1 && (delete e._isValid, se(e), e._isValid === !1 && (delete e._isValid, t.createFromInputFallback(e)))))
        }

        function oe(t, e, n) {
            return null != t ? t : null != e ? e : n
        }

        function ce(e) {
            var n = new Date(t.now());
            return e._useUTC ? [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()] : [n.getFullYear(), n.getMonth(), n.getDate()]
        }

        function le(t) {
            var e, n, i, r, s = [];
            if (!t._d) {
                for (i = ce(t), t._w && null == t._a[or] && null == t._a[ar] && ue(t), null != t._dayOfYear && (r = oe(t._a[sr], i[sr]), (t._dayOfYear > pt(r) || 0 === t._dayOfYear) && (f(t)._overflowDayOfYear = !0), n = vt(r, 0, t._dayOfYear), t._a[ar] = n.getUTCMonth(), t._a[or] = n.getUTCDate()), e = 0; e < 3 && null == t._a[e]; ++e) t._a[e] = s[e] = i[e];
                for (; e < 7; e++) t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                24 === t._a[cr] && 0 === t._a[lr] && 0 === t._a[ur] && 0 === t._a[hr] && (t._nextDay = !0, t._a[cr] = 0), t._d = (t._useUTC ? vt : gt).apply(null, s), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[cr] = 24)
            }
        }

        function ue(t) {
            var e, n, i, r, s, a, o, c;
            if (e = t._w, null != e.GG || null != e.W || null != e.E) s = 1, a = 4, n = oe(e.GG, t._a[sr], Mt(ve(), 1, 4).year), i = oe(e.W, 1), r = oe(e.E, 1), (r < 1 || r > 7) && (c = !0);
            else {
                s = t._locale._week.dow, a = t._locale._week.doy;
                var l = Mt(ve(), s, a);
                n = oe(e.gg, t._a[sr], l.year), i = oe(e.w, l.week), null != e.d ? (r = e.d, (r < 0 || r > 6) && (c = !0)) : null != e.e ? (r = e.e + s, (e.e < 0 || e.e > 6) && (c = !0)) : r = s
            }
            i < 1 || i > St(n, s, a) ? f(t)._overflowWeeks = !0 : null != c ? f(t)._overflowWeekday = !0 : (o = kt(n, i, r, s, a), t._a[sr] = o.year, t._dayOfYear = o.dayOfYear)
        }

        function he(e) {
            if (e._f === t.ISO_8601) return void re(e);
            if (e._f === t.RFC_2822) return void se(e);
            e._a = [], f(e).empty = !0;
            var n, i, r, s, a, o = "" + e._i,
                c = o.length,
                l = 0;
            for (r = J(e._f, e._locale).match(Fi) || [], n = 0; n < r.length; n++) s = r[n], i = (o.match(X(s, e)) || [])[0], i && (a = o.substr(0, o.indexOf(i)), a.length > 0 && f(e).unusedInput.push(a), o = o.slice(o.indexOf(i) + i.length), l += i.length), Ai[s] ? (i ? f(e).empty = !1 : f(e).unusedTokens.push(s), it(s, i, e)) : e._strict && !i && f(e).unusedTokens.push(s);
            f(e).charsLeftOver = c - l, o.length > 0 && f(e).unusedInput.push(o), e._a[cr] <= 12 && f(e).bigHour === !0 && e._a[cr] > 0 && (f(e).bigHour = void 0), f(e).parsedDateParts = e._a.slice(0), f(e).meridiem = e._meridiem, e._a[cr] = de(e._locale, e._a[cr], e._meridiem), le(e), ie(e)
        }

        function de(t, e, n) {
            var i;
            return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? (i = t.isPM(n), i && e < 12 && (e += 12), i || 12 !== e || (e = 0), e) : e;
        }

        function fe(t) {
            var e, n, i, r, s;
            if (0 === t._f.length) return f(t).invalidFormat = !0, void(t._d = new Date(NaN));
            for (r = 0; r < t._f.length; r++) s = 0, e = y({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[r], he(e), m(e) && (s += f(e).charsLeftOver, s += 10 * f(e).unusedTokens.length, f(e).score = s, (null == i || s < i) && (i = s, n = e));
            u(t, n || e)
        }

        function me(t) {
            if (!t._d) {
                var e = U(t._i);
                t._a = c([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function (t) {
                    return t && parseInt(t, 10)
                }), le(t)
            }
        }

        function pe(t) {
            var e = new _(ie(ye(t)));
            return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e
        }

        function ye(t) {
            var e = t._i,
                i = t._f;
            return t._locale = t._locale || ee(t._l), null === e || void 0 === i && "" === e ? p({
                nullInput: !0
            }) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), g(e) ? new _(ie(e)) : (o(e) ? t._d = e : n(i) ? fe(t) : i ? he(t) : _e(t), m(t) || (t._d = null), t))
        }

        function _e(e) {
            var r = e._i;
            s(r) ? e._d = new Date(t.now()) : o(r) ? e._d = new Date(r.valueOf()) : "string" == typeof r ? ae(e) : n(r) ? (e._a = c(r.slice(0), function (t) {
                return parseInt(t, 10)
            }), le(e)) : i(r) ? me(e) : a(r) ? e._d = new Date(r) : t.createFromInputFallback(e)
        }

        function ge(t, e, s, a, o) {
            var c = {};
            return s !== !0 && s !== !1 || (a = s, s = void 0), (i(t) && r(t) || n(t) && 0 === t.length) && (t = void 0), c._isAMomentObject = !0, c._useUTC = c._isUTC = o, c._l = s, c._i = t, c._f = e, c._strict = a, pe(c)
        }

        function ve(t, e, n, i) {
            return ge(t, e, n, i, !1)
        }

        function we(t, e) {
            var i, r;
            if (1 === e.length && n(e[0]) && (e = e[0]), !e.length) return ve();
            for (i = e[0], r = 1; r < e.length; ++r) e[r].isValid() && !e[r][t](i) || (i = e[r]);
            return i
        }

        function ke() {
            var t = [].slice.call(arguments, 0);
            return we("isBefore", t)
        }

        function Me() {
            var t = [].slice.call(arguments, 0);
            return we("isAfter", t)
        }

        function Se(t) {
            for (var e in t)
                if (Ir.indexOf(e) === -1 || null != t[e] && isNaN(t[e])) return !1;
            for (var n = !1, i = 0; i < Ir.length; ++i)
                if (t[Ir[i]]) {
                    if (n) return !1;
                    parseFloat(t[Ir[i]]) !== w(t[Ir[i]]) && (n = !0)
                }
            return !0
        }

        function De() {
            return this._isValid
        }

        function Ye() {
            return Ie(NaN)
        }

        function xe(t) {
            var e = U(t),
                n = e.year || 0,
                i = e.quarter || 0,
                r = e.month || 0,
                s = e.week || 0,
                a = e.day || 0,
                o = e.hour || 0,
                c = e.minute || 0,
                l = e.second || 0,
                u = e.millisecond || 0;
            this._isValid = Se(e), this._milliseconds = +u + 1e3 * l + 6e4 * c + 1e3 * o * 60 * 60, this._days = +a + 7 * s, this._months = +r + 3 * i + 12 * n, this._data = {}, this._locale = ee(), this._bubble()
        }

        function be(t) {
            return t instanceof xe
        }

        function Oe(t) {
            return t < 0 ? Math.round(-1 * t) * -1 : Math.round(t)
        }

        function Te(t, e) {
            q(t, 0, 0, function () {
                var t = this.utcOffset(),
                    n = "+";
                return t < 0 && (t = -t, n = "-"), n + V(~~(t / 60), 2) + e + V(~~t % 60, 2)
            })
        }

        function Pe(t, e) {
            var n = (e || "").match(t);
            if (null === n) return null;
            var i = n[n.length - 1] || [],
                r = (i + "").match(Vr) || ["-", 0, 0],
                s = +(60 * r[1]) + w(r[2]);
            return 0 === s ? 0 : "+" === r[0] ? s : -s
        }

        function Ce(e, n) {
            var i, r;
            return n._isUTC ? (i = n.clone(), r = (g(e) || o(e) ? e.valueOf() : ve(e).valueOf()) - i.valueOf(), i._d.setTime(i._d.valueOf() + r), t.updateOffset(i, !1), i) : ve(e).local()
        }

        function We(t) {
            return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
        }

        function He(e, n, i) {
            var r, s = this._offset || 0;
            if (!this.isValid()) return null != e ? this : NaN;
            if (null != e) {
                if ("string" == typeof e) {
                    if (e = Pe(tr, e), null === e) return this
                } else Math.abs(e) < 16 && !i && (e = 60 * e);
                return !this._isUTC && n && (r = We(this)), this._offset = e, this._isUTC = !0, null != r && this.add(r, "m"), s !== e && (!n || this._changeInProgress ? Be(this, Ie(e - s, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, t.updateOffset(this, !0), this._changeInProgress = null)), this
            }
            return this._isUTC ? s : We(this)
        }

        function Re(t, e) {
            return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset()
        }

        function je(t) {
            return this.utcOffset(0, t)
        }

        function Fe(t) {
            return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(We(this), "m")), this
        }

        function Ue() {
            if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
            else if ("string" == typeof this._i) {
                var t = Pe(Ki, this._i);
                null != t ? this.utcOffset(t) : this.utcOffset(0, !0)
            }
            return this
        }

        function Le(t) {
            return !!this.isValid() && (t = t ? ve(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0)
        }

        function Ae() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        }

        function Ee() {
            if (!s(this._isDSTShifted)) return this._isDSTShifted;
            var t = {};
            if (y(t, this), t = ye(t), t._a) {
                var e = t._isUTC ? h(t._a) : ve(t._a);
                this._isDSTShifted = this.isValid() && k(t._a, e.toArray()) > 0
            } else this._isDSTShifted = !1;
            return this._isDSTShifted
        }

        function $e() {
            return !!this.isValid() && !this._isUTC
        }

        function Ne() {
            return !!this.isValid() && this._isUTC
        }

        function Ge() {
            return !!this.isValid() && this._isUTC && 0 === this._offset
        }

        function Ie(t, e) {
            var n, i, r, s = t,
                o = null;
            return be(t) ? s = {
                ms: t._milliseconds,
                d: t._days,
                M: t._months
            } : a(t) ? (s = {}, e ? s[e] = t : s.milliseconds = t) : (o = qr.exec(t)) ? (n = "-" === o[1] ? -1 : 1, s = {
                y: 0,
                d: w(o[or]) * n,
                h: w(o[cr]) * n,
                m: w(o[lr]) * n,
                s: w(o[ur]) * n,
                ms: w(Oe(1e3 * o[hr])) * n
            }) : (o = zr.exec(t)) ? (n = "-" === o[1] ? -1 : 1, s = {
                y: Ve(o[2], n),
                M: Ve(o[3], n),
                w: Ve(o[4], n),
                d: Ve(o[5], n),
                h: Ve(o[6], n),
                m: Ve(o[7], n),
                s: Ve(o[8], n)
            }) : null == s ? s = {} : "object" == typeof s && ("from" in s || "to" in s) && (r = ze(ve(s.from), ve(s.to)), s = {}, s.ms = r.milliseconds, s.M = r.months), i = new xe(s), be(t) && l(t, "_locale") && (i._locale = t._locale), i
        }

        function Ve(t, e) {
            var n = t && parseFloat(t.replace(",", "."));
            return (isNaN(n) ? 0 : n) * e
        }

        function qe(t, e) {
            var n = {
                milliseconds: 0,
                months: 0
            };
            return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, n.milliseconds = +e - +t.clone().add(n.months, "M"), n
        }

        function ze(t, e) {
            var n;
            return t.isValid() && e.isValid() ? (e = Ce(e, t), t.isBefore(e) ? n = qe(t, e) : (n = qe(e, t), n.milliseconds = -n.milliseconds, n.months = -n.months), n) : {
                milliseconds: 0,
                months: 0
            }
        }

        function Ze(t, e) {
            return function (n, i) {
                var r, s;
                return null === i || isNaN(+i) || (D(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), s = n, n = i, i = s), n = "string" == typeof n ? +n : n, r = Ie(n, i), Be(this, r, t), this
            }
        }

        function Be(e, n, i, r) {
            var s = n._milliseconds,
                a = Oe(n._days),
                o = Oe(n._months);
            e.isValid() && (r = null == r || r, s && e._d.setTime(e._d.valueOf() + s * i), a && N(e, "Date", $(e, "Date") + a * i), o && lt(e, $(e, "Month") + o * i), r && t.updateOffset(e, a || o))
        }

        function Je(t, e) {
            var n = t.diff(e, "days", !0);
            return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse"
        }

        function Qe(e, n) {
            var i = e || ve(),
                r = Ce(i, this).startOf("day"),
                s = t.calendarFormat(this, r) || "sameElse",
                a = n && (Y(n[s]) ? n[s].call(this, i) : n[s]);
            return this.format(a || this.localeData().calendar(s, this, ve(i)))
        }

        function Xe() {
            return new _(this)
        }

        function Ke(t, e) {
            var n = g(t) ? t : ve(t);
            return !(!this.isValid() || !n.isValid()) && (e = F(s(e) ? "millisecond" : e), "millisecond" === e ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(e).valueOf())
        }

        function tn(t, e) {
            var n = g(t) ? t : ve(t);
            return !(!this.isValid() || !n.isValid()) && (e = F(s(e) ? "millisecond" : e), "millisecond" === e ? this.valueOf() < n.valueOf() : this.clone().endOf(e).valueOf() < n.valueOf())
        }

        function en(t, e, n, i) {
            return i = i || "()", ("(" === i[0] ? this.isAfter(t, n) : !this.isBefore(t, n)) && (")" === i[1] ? this.isBefore(e, n) : !this.isAfter(e, n))
        }

        function nn(t, e) {
            var n, i = g(t) ? t : ve(t);
            return !(!this.isValid() || !i.isValid()) && (e = F(e || "millisecond"), "millisecond" === e ? this.valueOf() === i.valueOf() : (n = i.valueOf(), this.clone().startOf(e).valueOf() <= n && n <= this.clone().endOf(e).valueOf()))
        }

        function rn(t, e) {
            return this.isSame(t, e) || this.isAfter(t, e)
        }

        function sn(t, e) {
            return this.isSame(t, e) || this.isBefore(t, e)
        }

        function an(t, e, n) {
            var i, r, s, a;
            return this.isValid() ? (i = Ce(t, this), i.isValid() ? (r = 6e4 * (i.utcOffset() - this.utcOffset()), e = F(e), "year" === e || "month" === e || "quarter" === e ? (a = on(this, i), "quarter" === e ? a /= 3 : "year" === e && (a /= 12)) : (s = this - i, a = "second" === e ? s / 1e3 : "minute" === e ? s / 6e4 : "hour" === e ? s / 36e5 : "day" === e ? (s - r) / 864e5 : "week" === e ? (s - r) / 6048e5 : s), n ? a : v(a)) : NaN) : NaN
        }

        function on(t, e) {
            var n, i, r = 12 * (e.year() - t.year()) + (e.month() - t.month()),
                s = t.clone().add(r, "months");
            return e - s < 0 ? (n = t.clone().add(r - 1, "months"), i = (e - s) / (s - n)) : (n = t.clone().add(r + 1, "months"), i = (e - s) / (n - s)), -(r + i) || 0
        }

        function cn() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        }

        function ln() {
            if (!this.isValid()) return null;
            var t = this.clone().utc();
            return t.year() < 0 || t.year() > 9999 ? B(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : Y(Date.prototype.toISOString) ? this.toDate().toISOString() : B(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        }

        function un() {
            if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
            var t = "moment",
                e = "";
            this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", e = "Z");
            var n = "[" + t + '("]',
                i = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
                r = "-MM-DD[T]HH:mm:ss.SSS",
                s = e + '[")]';
            return this.format(n + i + r + s)
        }

        function hn(e) {
            e || (e = this.isUtc() ? t.defaultFormatUtc : t.defaultFormat);
            var n = B(this, e);
            return this.localeData().postformat(n)
        }

        function dn(t, e) {
            return this.isValid() && (g(t) && t.isValid() || ve(t).isValid()) ? Ie({
                to: this,
                from: t
            }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
        }

        function fn(t) {
            return this.from(ve(), t)
        }

        function mn(t, e) {
            return this.isValid() && (g(t) && t.isValid() || ve(t).isValid()) ? Ie({
                from: this,
                to: t
            }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
        }

        function pn(t) {
            return this.to(ve(), t)
        }

        function yn(t) {
            var e;
            return void 0 === t ? this._locale._abbr : (e = ee(t), null != e && (this._locale = e), this)
        }

        function _n() {
            return this._locale
        }

        function gn(t) {
            switch (t = F(t)) {
            case "year":
                this.month(0);
            case "quarter":
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
            case "date":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
            }
            return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
        }

        function vn(t) {
            return t = F(t), void 0 === t || "millisecond" === t ? this : ("date" === t && (t = "day"), this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms"))
        }

        function wn() {
            return this._d.valueOf() - 6e4 * (this._offset || 0)
        }

        function kn() {
            return Math.floor(this.valueOf() / 1e3)
        }

        function Mn() {
            return new Date(this.valueOf())
        }

        function Sn() {
            var t = this;
            return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
        }

        function Dn() {
            var t = this;
            return {
                years: t.year(),
                months: t.month(),
                date: t.date(),
                hours: t.hours(),
                minutes: t.minutes(),
                seconds: t.seconds(),
                milliseconds: t.milliseconds()
            }
        }

        function Yn() {
            return this.isValid() ? this.toISOString() : null
        }

        function xn() {
            return m(this)
        }

        function bn() {
            return u({}, f(this))
        }

        function On() {
            return f(this).overflow
        }

        function Tn() {
            return {
                input: this._i,
                format: this._f,
                locale: this._locale,
                isUTC: this._isUTC,
                strict: this._strict
            }
        }

        function Pn(t, e) {
            q(0, [t, t.length], 0, e)
        }

        function Cn(t) {
            return jn.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
        }

        function Wn(t) {
            return jn.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4)
        }

        function Hn() {
            return St(this.year(), 1, 4)
        }

        function Rn() {
            var t = this.localeData()._week;
            return St(this.year(), t.dow, t.doy)
        }

        function jn(t, e, n, i, r) {
            var s;
            return null == t ? Mt(this, i, r).year : (s = St(t, i, r), e > s && (e = s), Fn.call(this, t, e, n, i, r))
        }

        function Fn(t, e, n, i, r) {
            var s = kt(t, e, n, i, r),
                a = vt(s.year, 0, s.dayOfYear);
            return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this
        }

        function Un(t) {
            return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
        }

        function Ln(t) {
            var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
            return null == t ? e : this.add(t - e, "d")
        }

        function An(t, e) {
            e[hr] = w(1e3 * ("0." + t))
        }

        function En() {
            return this._isUTC ? "UTC" : ""
        }

        function $n() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        }

        function Nn(t) {
            return ve(1e3 * t)
        }

        function Gn() {
            return ve.apply(null, arguments).parseZone()
        }

        function In(t) {
            return t
        }

        function Vn(t, e, n, i) {
            var r = ee(),
                s = h().set(i, e);
            return r[n](s, t)
        }

        function qn(t, e, n) {
            if (a(t) && (e = t, t = void 0), t = t || "", null != e) return Vn(t, e, n, "month");
            var i, r = [];
            for (i = 0; i < 12; i++) r[i] = Vn(t, i, n, "month");
            return r
        }

        function zn(t, e, n, i) {
            "boolean" == typeof t ? (a(e) && (n = e, e = void 0), e = e || "") : (e = t, n = e, t = !1, a(e) && (n = e, e = void 0), e = e || "");
            var r = ee(),
                s = t ? r._week.dow : 0;
            if (null != n) return Vn(e, (n + s) % 7, i, "day");
            var o, c = [];
            for (o = 0; o < 7; o++) c[o] = Vn(e, (o + s) % 7, i, "day");
            return c
        }

        function Zn(t, e) {
            return qn(t, e, "months")
        }

        function Bn(t, e) {
            return qn(t, e, "monthsShort")
        }

        function Jn(t, e, n) {
            return zn(t, e, n, "weekdays")
        }

        function Qn(t, e, n) {
            return zn(t, e, n, "weekdaysShort")
        }

        function Xn(t, e, n) {
            return zn(t, e, n, "weekdaysMin")
        }

        function Kn() {
            var t = this._data;
            return this._milliseconds = rs(this._milliseconds), this._days = rs(this._days), this._months = rs(this._months), t.milliseconds = rs(t.milliseconds), t.seconds = rs(t.seconds), t.minutes = rs(t.minutes), t.hours = rs(t.hours), t.months = rs(t.months), t.years = rs(t.years), this
        }

        function ti(t, e, n, i) {
            var r = Ie(e, n);
            return t._milliseconds += i * r._milliseconds, t._days += i * r._days, t._months += i * r._months, t._bubble()
        }

        function ei(t, e) {
            return ti(this, t, e, 1)
        }

        function ni(t, e) {
            return ti(this, t, e, -1)
        }

        function ii(t) {
            return t < 0 ? Math.floor(t) : Math.ceil(t)
        }

        function ri() {
            var t, e, n, i, r, s = this._milliseconds,
                a = this._days,
                o = this._months,
                c = this._data;
            return s >= 0 && a >= 0 && o >= 0 || s <= 0 && a <= 0 && o <= 0 || (s += 864e5 * ii(ai(o) + a), a = 0, o = 0), c.milliseconds = s % 1e3, t = v(s / 1e3), c.seconds = t % 60, e = v(t / 60), c.minutes = e % 60, n = v(e / 60), c.hours = n % 24, a += v(n / 24), r = v(si(a)), o += r, a -= ii(ai(r)), i = v(o / 12), o %= 12, c.days = a, c.months = o, c.years = i, this
        }

        function si(t) {
            return 4800 * t / 146097
        }

        function ai(t) {
            return 146097 * t / 4800
        }

        function oi(t) {
            if (!this.isValid()) return NaN;
            var e, n, i = this._milliseconds;
            if (t = F(t), "month" === t || "year" === t) return e = this._days + i / 864e5, n = this._months + si(e), "month" === t ? n : n / 12;
            switch (e = this._days + Math.round(ai(this._months)), t) {
            case "week":
                return e / 7 + i / 6048e5;
            case "day":
                return e + i / 864e5;
            case "hour":
                return 24 * e + i / 36e5;
            case "minute":
                return 1440 * e + i / 6e4;
            case "second":
                return 86400 * e + i / 1e3;
            case "millisecond":
                return Math.floor(864e5 * e) + i;
            default:
                throw new Error("Unknown unit " + t)
            }
        }

        function ci() {
            return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * w(this._months / 12) : NaN
        }

        function li(t) {
            return function () {
                return this.as(t)
            }
        }

        function ui(t) {
            return t = F(t), this.isValid() ? this[t + "s"]() : NaN
        }

        function hi(t) {
            return function () {
                return this.isValid() ? this._data[t] : NaN
            }
        }

        function di() {
            return v(this.days() / 7)
        }

        function fi(t, e, n, i, r) {
            return r.relativeTime(e || 1, !!n, t, i)
        }

        function mi(t, e, n) {
            var i = Ie(t).abs(),
                r = ws(i.as("s")),
                s = ws(i.as("m")),
                a = ws(i.as("h")),
                o = ws(i.as("d")),
                c = ws(i.as("M")),
                l = ws(i.as("y")),
                u = r <= ks.ss && ["s", r] || r < ks.s && ["ss", r] || s <= 1 && ["m"] || s < ks.m && ["mm", s] || a <= 1 && ["h"] || a < ks.h && ["hh", a] || o <= 1 && ["d"] || o < ks.d && ["dd", o] || c <= 1 && ["M"] || c < ks.M && ["MM", c] || l <= 1 && ["y"] || ["yy", l];
            return u[2] = e, u[3] = +t > 0, u[4] = n, fi.apply(null, u)
        }

        function pi(t) {
            return void 0 === t ? ws : "function" == typeof t && (ws = t, !0)
        }

        function yi(t, e) {
            return void 0 !== ks[t] && (void 0 === e ? ks[t] : (ks[t] = e, "s" === t && (ks.ss = e - 1), !0))
        }

        function _i(t) {
            if (!this.isValid()) return this.localeData().invalidDate();
            var e = this.localeData(),
                n = mi(this, !t, e);
            return t && (n = e.pastFuture(+this, n)), e.postformat(n)
        }

        function gi() {
            if (!this.isValid()) return this.localeData().invalidDate();
            var t, e, n, i = Ms(this._milliseconds) / 1e3,
                r = Ms(this._days),
                s = Ms(this._months);
            t = v(i / 60), e = v(t / 60), i %= 60, t %= 60, n = v(s / 12), s %= 12;
            var a = n,
                o = s,
                c = r,
                l = e,
                u = t,
                h = i,
                d = this.asSeconds();
            return d ? (d < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (o ? o + "M" : "") + (c ? c + "D" : "") + (l || u || h ? "T" : "") + (l ? l + "H" : "") + (u ? u + "M" : "") + (h ? h + "S" : "") : "P0D"
        }
        var vi, wi;
        wi = Array.prototype.some ? Array.prototype.some : function (t) {
            for (var e = Object(this), n = e.length >>> 0, i = 0; i < n; i++)
                if (i in e && t.call(this, e[i], i, e)) return !0;
            return !1
        };
        var ki = wi,
            Mi = t.momentProperties = [],
            Si = !1,
            Di = {};
        t.suppressDeprecationWarnings = !1, t.deprecationHandler = null;
        var Yi;
        Yi = Object.keys ? Object.keys : function (t) {
            var e, n = [];
            for (e in t) l(t, e) && n.push(e);
            return n
        };
        var xi, bi = Yi,
            Oi = {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            Ti = {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
            },
            Pi = "Invalid date",
            Ci = "%d",
            Wi = /\d{1,2}/,
            Hi = {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            Ri = {},
            ji = {},
            Fi = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            Ui = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            Li = {},
            Ai = {},
            Ei = /\d/,
            $i = /\d\d/,
            Ni = /\d{3}/,
            Gi = /\d{4}/,
            Ii = /[+-]?\d{6}/,
            Vi = /\d\d?/,
            qi = /\d\d\d\d?/,
            zi = /\d\d\d\d\d\d?/,
            Zi = /\d{1,3}/,
            Bi = /\d{1,4}/,
            Ji = /[+-]?\d{1,6}/,
            Qi = /\d+/,
            Xi = /[+-]?\d+/,
            Ki = /Z|[+-]\d\d:?\d\d/gi,
            tr = /Z|[+-]\d\d(?::?\d\d)?/gi,
            er = /[+-]?\d+(\.\d{1,3})?/,
            nr = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
            ir = {},
            rr = {},
            sr = 0,
            ar = 1,
            or = 2,
            cr = 3,
            lr = 4,
            ur = 5,
            hr = 6,
            dr = 7,
            fr = 8;
        xi = Array.prototype.indexOf ? Array.prototype.indexOf : function (t) {
            var e;
            for (e = 0; e < this.length; ++e)
                if (this[e] === t) return e;
            return -1
        };
        var mr = xi;
        q("M", ["MM", 2], "Mo", function () {
            return this.month() + 1
        }), q("MMM", 0, 0, function (t) {
            return this.localeData().monthsShort(this, t)
        }), q("MMMM", 0, 0, function (t) {
            return this.localeData().months(this, t)
        }), j("month", "M"), L("month", 8), Q("M", Vi), Q("MM", Vi, $i), Q("MMM", function (t, e) {
            return e.monthsShortRegex(t)
        }), Q("MMMM", function (t, e) {
            return e.monthsRegex(t)
        }), et(["M", "MM"], function (t, e) {
            e[ar] = w(t) - 1
        }), et(["MMM", "MMMM"], function (t, e, n, i) {
            var r = n._locale.monthsParse(t, i, n._strict);
            null != r ? e[ar] = r : f(n).invalidMonth = t
        });
        var pr = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
            yr = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            _r = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            gr = nr,
            vr = nr;
        q("Y", 0, 0, function () {
            var t = this.year();
            return t <= 9999 ? "" + t : "+" + t
        }), q(0, ["YY", 2], 0, function () {
            return this.year() % 100
        }), q(0, ["YYYY", 4], 0, "year"), q(0, ["YYYYY", 5], 0, "year"), q(0, ["YYYYYY", 6, !0], 0, "year"), j("year", "y"), L("year", 1), Q("Y", Xi), Q("YY", Vi, $i), Q("YYYY", Bi, Gi), Q("YYYYY", Ji, Ii), Q("YYYYYY", Ji, Ii), et(["YYYYY", "YYYYYY"], sr), et("YYYY", function (e, n) {
            n[sr] = 2 === e.length ? t.parseTwoDigitYear(e) : w(e)
        }), et("YY", function (e, n) {
            n[sr] = t.parseTwoDigitYear(e)
        }), et("Y", function (t, e) {
            e[sr] = parseInt(t, 10)
        }), t.parseTwoDigitYear = function (t) {
            return w(t) + (w(t) > 68 ? 1900 : 2e3)
        };
        var wr = E("FullYear", !0);
        q("w", ["ww", 2], "wo", "week"), q("W", ["WW", 2], "Wo", "isoWeek"), j("week", "w"), j("isoWeek", "W"), L("week", 5), L("isoWeek", 5), Q("w", Vi), Q("ww", Vi, $i), Q("W", Vi), Q("WW", Vi, $i), nt(["w", "ww", "W", "WW"], function (t, e, n, i) {
            e[i.substr(0, 1)] = w(t)
        });
        var kr = {
            dow: 0,
            doy: 6
        };
        q("d", 0, "do", "day"), q("dd", 0, 0, function (t) {
            return this.localeData().weekdaysMin(this, t)
        }), q("ddd", 0, 0, function (t) {
            return this.localeData().weekdaysShort(this, t)
        }), q("dddd", 0, 0, function (t) {
            return this.localeData().weekdays(this, t)
        }), q("e", 0, 0, "weekday"), q("E", 0, 0, "isoWeekday"), j("day", "d"), j("weekday", "e"), j("isoWeekday", "E"), L("day", 11), L("weekday", 11), L("isoWeekday", 11), Q("d", Vi), Q("e", Vi), Q("E", Vi), Q("dd", function (t, e) {
            return e.weekdaysMinRegex(t)
        }), Q("ddd", function (t, e) {
            return e.weekdaysShortRegex(t)
        }), Q("dddd", function (t, e) {
            return e.weekdaysRegex(t)
        }), nt(["dd", "ddd", "dddd"], function (t, e, n, i) {
            var r = n._locale.weekdaysParse(t, i, n._strict);
            null != r ? e.d = r : f(n).invalidWeekday = t
        }), nt(["d", "e", "E"], function (t, e, n, i) {
            e[i] = w(t)
        });
        var Mr = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            Sr = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            Dr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            Yr = nr,
            xr = nr,
            br = nr;
        q("H", ["HH", 2], 0, "hour"), q("h", ["hh", 2], 0, Gt), q("k", ["kk", 2], 0, It), q("hmm", 0, 0, function () {
            return "" + Gt.apply(this) + V(this.minutes(), 2)
        }), q("hmmss", 0, 0, function () {
            return "" + Gt.apply(this) + V(this.minutes(), 2) + V(this.seconds(), 2)
        }), q("Hmm", 0, 0, function () {
            return "" + this.hours() + V(this.minutes(), 2)
        }), q("Hmmss", 0, 0, function () {
            return "" + this.hours() + V(this.minutes(), 2) + V(this.seconds(), 2)
        }), Vt("a", !0), Vt("A", !1), j("hour", "h"), L("hour", 13), Q("a", qt), Q("A", qt), Q("H", Vi), Q("h", Vi), Q("k", Vi), Q("HH", Vi, $i), Q("hh", Vi, $i), Q("kk", Vi, $i), Q("hmm", qi), Q("hmmss", zi), Q("Hmm", qi), Q("Hmmss", zi), et(["H", "HH"], cr), et(["k", "kk"], function (t, e, n) {
            var i = w(t);
            e[cr] = 24 === i ? 0 : i
        }), et(["a", "A"], function (t, e, n) {
            n._isPm = n._locale.isPM(t), n._meridiem = t
        }), et(["h", "hh"], function (t, e, n) {
            e[cr] = w(t), f(n).bigHour = !0
        }), et("hmm", function (t, e, n) {
            var i = t.length - 2;
            e[cr] = w(t.substr(0, i)), e[lr] = w(t.substr(i)), f(n).bigHour = !0
        }), et("hmmss", function (t, e, n) {
            var i = t.length - 4,
                r = t.length - 2;
            e[cr] = w(t.substr(0, i)), e[lr] = w(t.substr(i, 2)), e[ur] = w(t.substr(r)), f(n).bigHour = !0
        }), et("Hmm", function (t, e, n) {
            var i = t.length - 2;
            e[cr] = w(t.substr(0, i)), e[lr] = w(t.substr(i))
        }), et("Hmmss", function (t, e, n) {
            var i = t.length - 4,
                r = t.length - 2;
            e[cr] = w(t.substr(0, i)), e[lr] = w(t.substr(i, 2)), e[ur] = w(t.substr(r))
        });
        var Or, Tr = /[ap]\.?m?\.?/i,
            Pr = E("Hours", !0),
            Cr = {
                calendar: Oi,
                longDateFormat: Ti,
                invalidDate: Pi,
                ordinal: Ci,
                dayOfMonthOrdinalParse: Wi,
                relativeTime: Hi,
                months: yr,
                monthsShort: _r,
                week: kr,
                weekdays: Mr,
                weekdaysMin: Dr,
                weekdaysShort: Sr,
                meridiemParse: Tr
            },
            Wr = {},
            Hr = {},
            Rr = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            jr = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            Fr = /Z|[+-]\d\d(?::?\d\d)?/,
            Ur = [
                ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
                ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
                ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
                ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
                ["YYYY-DDD", /\d{4}-\d{3}/],
                ["YYYY-MM", /\d{4}-\d\d/, !1],
                ["YYYYYYMMDD", /[+-]\d{10}/],
                ["YYYYMMDD", /\d{8}/],
                ["GGGG[W]WWE", /\d{4}W\d{3}/],
                ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
                ["YYYYDDD", /\d{7}/]
            ],
            Lr = [
                ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
                ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
                ["HH:mm:ss", /\d\d:\d\d:\d\d/],
                ["HH:mm", /\d\d:\d\d/],
                ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
                ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
                ["HHmmss", /\d\d\d\d\d\d/],
                ["HHmm", /\d\d\d\d/],
                ["HH", /\d\d/]
            ],
            Ar = /^\/?Date\((\-?\d+)/i,
            Er = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;
        t.createFromInputFallback = S("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (t) {
            t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
        }), t.ISO_8601 = function () {}, t.RFC_2822 = function () {};
        var $r = S("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
                var t = ve.apply(null, arguments);
                return this.isValid() && t.isValid() ? t < this ? this : t : p()
            }),
            Nr = S("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
                var t = ve.apply(null, arguments);
                return this.isValid() && t.isValid() ? t > this ? this : t : p()
            }),
            Gr = function () {
                return Date.now ? Date.now() : +new Date
            },
            Ir = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
        Te("Z", ":"), Te("ZZ", ""), Q("Z", tr), Q("ZZ", tr), et(["Z", "ZZ"], function (t, e, n) {
            n._useUTC = !0, n._tzm = Pe(tr, t)
        });
        var Vr = /([\+\-]|\d\d)/gi;
        t.updateOffset = function () {};
        var qr = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
            zr = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
        Ie.fn = xe.prototype, Ie.invalid = Ye;
        var Zr = Ze(1, "add"),
            Br = Ze(-1, "subtract");
        t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", t.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        var Jr = S("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
            return void 0 === t ? this.localeData() : this.locale(t)
        });
        q(0, ["gg", 2], 0, function () {
            return this.weekYear() % 100
        }), q(0, ["GG", 2], 0, function () {
            return this.isoWeekYear() % 100
        }), Pn("gggg", "weekYear"), Pn("ggggg", "weekYear"), Pn("GGGG", "isoWeekYear"), Pn("GGGGG", "isoWeekYear"), j("weekYear", "gg"), j("isoWeekYear", "GG"), L("weekYear", 1), L("isoWeekYear", 1), Q("G", Xi), Q("g", Xi), Q("GG", Vi, $i), Q("gg", Vi, $i), Q("GGGG", Bi, Gi), Q("gggg", Bi, Gi), Q("GGGGG", Ji, Ii), Q("ggggg", Ji, Ii), nt(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, n, i) {
            e[i.substr(0, 2)] = w(t)
        }), nt(["gg", "GG"], function (e, n, i, r) {
            n[r] = t.parseTwoDigitYear(e)
        }), q("Q", 0, "Qo", "quarter"), j("quarter", "Q"), L("quarter", 7), Q("Q", Ei), et("Q", function (t, e) {
            e[ar] = 3 * (w(t) - 1)
        }), q("D", ["DD", 2], "Do", "date"), j("date", "D"), L("date", 9), Q("D", Vi), Q("DD", Vi, $i), Q("Do", function (t, e) {
            return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient
        }), et(["D", "DD"], or), et("Do", function (t, e) {
            e[or] = w(t.match(Vi)[0], 10)
        });
        var Qr = E("Date", !0);
        q("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), j("dayOfYear", "DDD"), L("dayOfYear", 4), Q("DDD", Zi), Q("DDDD", Ni), et(["DDD", "DDDD"], function (t, e, n) {
            n._dayOfYear = w(t)
        }), q("m", ["mm", 2], 0, "minute"), j("minute", "m"), L("minute", 14), Q("m", Vi), Q("mm", Vi, $i), et(["m", "mm"], lr);
        var Xr = E("Minutes", !1);
        q("s", ["ss", 2], 0, "second"), j("second", "s"), L("second", 15), Q("s", Vi), Q("ss", Vi, $i), et(["s", "ss"], ur);
        var Kr = E("Seconds", !1);
        q("S", 0, 0, function () {
            return~~ (this.millisecond() / 100)
        }), q(0, ["SS", 2], 0, function () {
            return~~ (this.millisecond() / 10)
        }), q(0, ["SSS", 3], 0, "millisecond"), q(0, ["SSSS", 4], 0, function () {
            return 10 * this.millisecond()
        }), q(0, ["SSSSS", 5], 0, function () {
            return 100 * this.millisecond()
        }), q(0, ["SSSSSS", 6], 0, function () {
            return 1e3 * this.millisecond()
        }), q(0, ["SSSSSSS", 7], 0, function () {
            return 1e4 * this.millisecond()
        }), q(0, ["SSSSSSSS", 8], 0, function () {
            return 1e5 * this.millisecond()
        }), q(0, ["SSSSSSSSS", 9], 0, function () {
            return 1e6 * this.millisecond()
        }), j("millisecond", "ms"), L("millisecond", 16), Q("S", Zi, Ei), Q("SS", Zi, $i), Q("SSS", Zi, Ni);
        var ts;
        for (ts = "SSSS"; ts.length <= 9; ts += "S") Q(ts, Qi);
        for (ts = "S"; ts.length <= 9; ts += "S") et(ts, An);
        var es = E("Milliseconds", !1);
        q("z", 0, 0, "zoneAbbr"), q("zz", 0, 0, "zoneName");
        var ns = _.prototype;
        ns.add = Zr, ns.calendar = Qe, ns.clone = Xe, ns.diff = an, ns.endOf = vn, ns.format = hn, ns.from = dn, ns.fromNow = fn, ns.to = mn, ns.toNow = pn, ns.get = G, ns.invalidAt = On, ns.isAfter = Ke, ns.isBefore = tn, ns.isBetween = en, ns.isSame = nn, ns.isSameOrAfter = rn, ns.isSameOrBefore = sn, ns.isValid = xn, ns.lang = Jr, ns.locale = yn, ns.localeData = _n, ns.max = Nr, ns.min = $r, ns.parsingFlags = bn, ns.set = I, ns.startOf = gn, ns.subtract = Br, ns.toArray = Sn, ns.toObject = Dn, ns.toDate = Mn, ns.toISOString = ln, ns.inspect = un, ns.toJSON = Yn, ns.toString = cn, ns.unix = kn, ns.valueOf = wn, ns.creationData = Tn, ns.year = wr, ns.isLeapYear = _t, ns.weekYear = Cn, ns.isoWeekYear = Wn, ns.quarter = ns.quarters = Un, ns.month = ut, ns.daysInMonth = ht, ns.week = ns.weeks = bt, ns.isoWeek = ns.isoWeeks = Ot, ns.weeksInYear = Rn, ns.isoWeeksInYear = Hn, ns.date = Qr, ns.day = ns.days = Ft, ns.weekday = Ut, ns.isoWeekday = Lt, ns.dayOfYear = Ln, ns.hour = ns.hours = Pr, ns.minute = ns.minutes = Xr, ns.second = ns.seconds = Kr, ns.millisecond = ns.milliseconds = es, ns.utcOffset = He, ns.utc = je, ns.local = Fe, ns.parseZone = Ue, ns.hasAlignedHourOffset = Le, ns.isDST = Ae, ns.isLocal = $e, ns.isUtcOffset = Ne, ns.isUtc = Ge, ns.isUTC = Ge, ns.zoneAbbr = En, ns.zoneName = $n, ns.dates = S("dates accessor is deprecated. Use date instead.", Qr), ns.months = S("months accessor is deprecated. Use month instead", ut), ns.years = S("years accessor is deprecated. Use year instead", wr), ns.zone = S("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Re), ns.isDSTShifted = S("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Ee);
        var is = O.prototype;
        is.calendar = T, is.longDateFormat = P, is.invalidDate = C, is.ordinal = W, is.preparse = In, is.postformat = In, is.relativeTime = H, is.pastFuture = R, is.set = x, is.months = st, is.monthsShort = at, is.monthsParse = ct, is.monthsRegex = ft, is.monthsShortRegex = dt, is.week = Dt, is.firstDayOfYear = xt, is.firstDayOfWeek = Yt, is.weekdays = Ct, is.weekdaysMin = Ht, is.weekdaysShort = Wt, is.weekdaysParse = jt, is.weekdaysRegex = At, is.weekdaysShortRegex = Et, is.weekdaysMinRegex = $t, is.isPM = zt, is.meridiem = Zt, Xt("en", {
            dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function (t) {
                var e = t % 10,
                    n = 1 === w(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
                return t + n
            }
        }), t.lang = S("moment.lang is deprecated. Use moment.locale instead.", Xt), t.langData = S("moment.langData is deprecated. Use moment.localeData instead.", ee);
        var rs = Math.abs,
            ss = li("ms"),
            as = li("s"),
            os = li("m"),
            cs = li("h"),
            ls = li("d"),
            us = li("w"),
            hs = li("M"),
            ds = li("y"),
            fs = hi("milliseconds"),
            ms = hi("seconds"),
            ps = hi("minutes"),
            ys = hi("hours"),
            _s = hi("days"),
            gs = hi("months"),
            vs = hi("years"),
            ws = Math.round,
            ks = {
                ss: 44,
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                M: 11
            },
            Ms = Math.abs,
            Ss = xe.prototype;
        return Ss.isValid = De, Ss.abs = Kn, Ss.add = ei, Ss.subtract = ni, Ss.as = oi, Ss.asMilliseconds = ss, Ss.asSeconds = as, Ss.asMinutes = os, Ss.asHours = cs, Ss.asDays = ls, Ss.asWeeks = us, Ss.asMonths = hs, Ss.asYears = ds, Ss.valueOf = ci, Ss._bubble = ri, Ss.get = ui, Ss.milliseconds = fs, Ss.seconds = ms, Ss.minutes = ps, Ss.hours = ys, Ss.days = _s, Ss.weeks = di, Ss.months = gs, Ss.years = vs, Ss.humanize = _i, Ss.toISOString = gi, Ss.toString = gi, Ss.toJSON = gi, Ss.locale = yn, Ss.localeData = _n, Ss.toIsoString = S("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", gi), Ss.lang = Jr, q("X", 0, 0, "unix"), q("x", 0, 0, "valueOf"), Q("x", Xi), Q("X", er), et("X", function (t, e, n) {
            n._d = new Date(1e3 * parseFloat(t, 10))
        }), et("x", function (t, e, n) {
            n._d = new Date(w(t))
        }), t.version = "2.18.1", e(ve), t.fn = ns, t.min = ke, t.max = Me, t.now = Gr, t.utc = h, t.unix = Nn, t.months = Zn, t.isDate = o, t.locale = Xt, t.invalid = p, t.duration = Ie, t.isMoment = g, t.weekdays = Jn, t.parseZone = Gn, t.localeData = ee, t.isDuration = be, t.monthsShort = Bn, t.weekdaysMin = Xn, t.defineLocale = Kt, t.updateLocale = te, t.locales = ne, t.weekdaysShort = Qn, t.normalizeUnits = F, t.relativeTimeRounding = pi, t.relativeTimeThreshold = yi, t.calendarFormat = Je, t.prototype = ns, t
    }), define("current", ["jquery", "templateModule", "moment"], function (t, e, n) {
        function i(i, s, a, o, c, l) {
            function u(t) {
                switch (t) {
                case "\u84dd\u8272":
                    return "01";
                case "\u9ec4\u8272":
                    return "02";
                case "\u6a59\u8272":
                    return "03";
                case "\u7ea2\u8272":
                    return "04"
                }
                return "02"
            }

            function h(e) {
                var n = [];
                return t.each(e, function (t, e) {
                    n.indexOf(e.type_name) == -1 && (["01", "02", "03", "04"].indexOf(e.level_code) == -1 && (e.level_code = u(e.level_name)), n.push(e.type_name), w.push(e))
                }), n
            }

            function d(t) {
                t && Object.keys(t).map(function (e) {
                    var n = t[e];
                    k.push(n)
                })
            }
            t("#txt-pub-time").text("\u4e2d\u592e\u6c14\u8c61\u53f0 " + n(i.update_time, "YYYYMMDDHHmmss").format("HH:mm") + "\u53d1\u5e03"), t("#txt-temperature").text(i.degree ? i.degree + "\xb0" : ""), t("#txt-name").text(i.weather ? i.weather : ""), t("#ct-aqi").html(e("aqi", {
                air: a
            })), t("#ct-aqi")[0].className = "air-level" + a.aqi_level;
            var f = {},
                m = Object.keys(l);
            m.length && m.forEach(function (t) {
                var e = l[t];
                e.riseTime = n(e.time + e.sunrise, "YYYYMMDDHH:mm"), e.setTime = n(e.time + e.sunset, "YYYYMMDDHH:mm"), f[e.time] = e
            });
            var p = [],
                y = n(i.update_time, "YYYYMMDDHHmmss"),
                _ = y.format("YYYYMMDD"),
                g = f[_] ? f[_].riseTime : null,
                v = f[_] ? f[_].setTime : null;
            p.weather_code = i.weather_code, y.isAfter(g) && y.isBefore(v) ? p.type = "day" : p.type = "night", t("#ct-current-weather").html(e("currentweather", {
                weatherData: p
            }));
            var w = [];
            h(s), t("#ls-warning").html(e("warning", {
                data: w
            })), i.wind_direction && i.wind_power && t("#txt-wind").html(r[i.wind_direction] + "&nbsp;" + i.wind_power + "\u7ea7"), t("#icon-wind")[0].className = "icon wind-" + i.wind_direction, i.humidity ? t("#txt-humidity").html("\u6e7f\u5ea6&nbsp;" + i.humidity + "%").show() : t("#txt-humidity").hide(), i.pressure.length && "?" != i.pressure ? (t("#txt-kPa").html("\u6c14\u538b&nbsp;" + i.pressure + "hPa").show(), t("#icon-kPa").show()) : (t("#txt-kPa").hide(), t("#icon-kPa").hide()), o.tail_number && o.tail_number.length ? ("\u4e0d\u9650\u884c" == o.tail_number ? t("#txt-limit").html(o.tail_number) : t("#txt-limit").html("\u9650\u884c&nbsp;" + o.tail_number), t("#info-limit").addClass("show")) : t("#info-limit").removeClass("show");
            var k = [];
            d(c.forecast_24h), d(c.observe), d(c.special);
            var M = Math.floor(Math.random() * k.length),
                S = k.length ? k[M] : "",
                D = t("#btn-tip-switch");
            D.click(function (e) {
                t("#txt-tips").text(k[++M % k.length])
            }), t("#txt-tips").text(S), k.length > 1 ? D.css("display", "inline-block") : D.css("display", "none")
        }
        var r = {
            0: "\u65e0\u6301\u7eed\u98ce\u5411",
            1: "\u4e1c\u5317\u98ce",
            2: "\u4e1c\u98ce",
            3: "\u4e1c\u5357\u98ce",
            4: "\u5357\u98ce",
            5: "\u897f\u5357\u98ce",
            6: "\u897f\u98ce",
            7: "\u897f\u5317\u98ce",
            8: "\u5317\u98ce",
            9: "\u65cb\u8f6c\u98ce"
        };
        return {
            init: i
        }
    }), define("hours", ["jquery", "templateModule", "moment"], function (t, e, n) {
        function i(i, a) {
            var o = [],
                c = {},
                l = Object.keys(a);
            l.length && l.forEach(function (t) {
                var e = a[t];
                e.riseTime = n(e.time + e.sunrise, "YYYYMMDDHH:mm"), e.setTime = n(e.time + e.sunset, "YYYYMMDDHH:mm"), c[e.time] = e
            });
            for (var u = 0; u < 24; u++) {
                var h = i[u],
                    d = n(h.update_time, "YYYYMMDDHHmmss"),
                    f = d.format("YYYYMMDD"),
                    m = c[f] ? c[f].riseTime : null,
                    p = c[f] ? c[f].setTime : null;
                if (0 == d.hour()) {
                    var y = parseInt(d.diff(s) / 864e5);
                    y >= 0 && (h.format_time = r[y])
                } else h.format_time = d.format("HH:mm");
                d.isAfter(m) && d.isBefore(p) ? h.type = "day" : h.type = "night", m && m.isBefore(d) && m.isAfter(d.subtract(1, "hours")) ? o.push({
                    type: "keypoint",
                    update_time: m.format("YYYYMMDDHHmmss"),
                    format_time: m.format("HH:mm"),
                    key_type: "rise",
                    show: "\u65e5\u51fa"
                }) : p && p.isAfter(d) && p.isBefore(d.add(1, "hours")) && o.push({
                    type: "keypoint",
                    update_time: p.format("YYYYMMDDHHmmss"),
                    format_time: p.format("HH:mm"),
                    key_type: "set",
                    show: "\u65e5\u843d"
                }), o.push(h)
            }
            t("#ls-weather-hour").html(e("hours", {
                data: o
            }))
        }
        var r = ["\u4eca\u5929", "\u660e\u5929", "\u540e\u5929", "\u5927\u540e\u5929"],
            s = n().startOf("day"),
            a = t("#ct-weather"),
            o = 0,
            c = 1100,
            l = [-1400, 0];
        return t("#ct-hours #btn-prev").click(function (t) {
            var e = o + c;
            o = e > l[1] ? l[1] : e, a.css("marginLeft", o + "px")
        }), t("#ct-hours #btn-next").click(function (t) {
            var e = o - c;
            o = e < l[0] ? l[0] : e, a.css("marginLeft", o + "px")
        }), {
            init: i
        }
    }), define("days", ["jquery", "templateModule", "moment"], function (t, e, n) {
        function i(i) {
            for (var r = [], s = [], a = [], o = [], c = n(), l = 0; l < 8; l++) {
                var u = i[l];
                u.day_weather_short && u.night_weather_short && u.max_degree && u.min_degree && (n(u.time).add(1, "days").isSame(c, "day") ? u.showText = "\u6628\u5929" : n(u.time).isSame(c, "day") ? u.showText = "\u4eca\u5929" : n(u.time).subtract(1, "days").isSame(c, "day") ? u.showText = "\u660e\u5929" : n(u.time).subtract(2, "days").isSame(c, "day") ? u.showText = "\u540e\u5929" : u.showText = n(u.time).format("ddd"), s.push(u.time), a.push(u.max_degree - 0), o.push(u.min_degree - 0), u.time && (u.formatTime = u.time.substring(5).replace("-", "\u6708") + "\u65e5"), r.push(u))
            }
            var h = Math.floor(740 / r.length);
            t("#ls-weather-day").html(e("days", {
                data: r,
                itemWidth: h
            }));
            var d = echarts.init(document.getElementById("chart-days"));
            option = {
                backgroundColor: "rgba(0,0,0,0.0)",
                color: ["#FCC370", "#94CCF9"],
                animation: !1,
                tooltip: {
                    show: !1
                },
                xAxis: [{
                    type: "category",
                    show: !1,
                    data: s
                }],
                yAxis: [{
                    type: "value",
                    show: !1,
                    boundaryGap: ["45%", "45%"],
                    scale: !0
                }],
                grid: {
                    x: 0,
                    y: 0,
                    y2: 0,
                    height: 174,
                    width: 740,
                    borderWidth: "0px"
                },
                series: [{
                    type: "line",
                    data: a,
                    smooth: !0,
                    symbol: "circle",
                    symbolSize: 8,
                    clipOverflow: !1,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    },
                    label: {
                        normal: {
                            show: !0,
                            textStyle: {
                                fontSize: "18",
                                fontFamily: "\u5fae\u8f6f\u96c5\u9ed1",
                                color: "#384C78"
                            },
                            distance: 10,
                            formatter: function (t) {
                                return 0 == t.dataIndex ? "{first|" + t.data + "\xb0}" : t.data + "\xb0"
                            }, rich: {
                                first: {
                                    fontSize: "18",
                                    fontFamily: "\u5fae\u8f6f\u96c5\u9ed1",
                                    color: "#C2C2C2"
                                }
                            }
                        }
                    }
                }, {
                    type: "line",
                    data: o,
                    smooth: !0,
                    symbol: "circle",
                    symbolSize: 8,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    },
                    label: {
                        normal: {
                            show: !0,
                            position: "bottom",
                            textStyle: {
                                fontSize: "18",
                                fontFamily: "\u5fae\u8f6f\u96c5\u9ed1",
                                color: "#555555"
                            },
                            distance: 10,
                            formatter: function (t) {
                                return 0 == t.dataIndex ? "{first|" + t.data + "\xb0}" : t.data + "\xb0"
                            }, rich: {
                                first: {
                                    fontSize: "18",
                                    fontFamily: "\u5fae\u8f6f\u96c5\u9ed1",
                                    color: "#C2C2C2"
                                }
                            }
                        }
                    }
                }]
            }, d.setOption(option)
        }
        return n.locale("zh-cn", {
            weekdaysShort: "\u5468\u65e5_\u5468\u4e00_\u5468\u4e8c_\u5468\u4e09_\u5468\u56db_\u5468\u4e94_\u5468\u516d".split("_")
        }), {
            init: i
        }
    }), define("living", ["jquery", "templateModule"], function (t, e) {
        function n(n) {
            var i = [];
            s.forEach(function (t) {
                "clothes" === t.key && a.forEach(function (e) {
                    n[t.key].info === e.level && (t.icon = e.icon)
                }), i.push({
                    name: n[t.key].name,
                    info: n[t.key].info,
                    detail: n[t.key].detail,
                    icon: t.icon
                })
            }), t("#ls-living1").html(e("living", {
                data: i.slice(0, 6)
            })), t("#ls-living2").html(e("living", {
                data: i.slice(6, 12)
            }))
        }

        function i() {
            var t = c + l;
            c = t > u[1] ? u[1] : t, o.css("marginLeft", c + "px")
        }

        function r() {
            var t = c - l;
            c = t < u[0] ? u[0] : t, o.css("marginLeft", c + "px")
        }
        var s = [{
                key: "clothes",
                icon: "icon_chuanyi"
            }, {
                key: "umbrella",
                icon: "icon_yusan"
            }, {
                key: "cold",
                icon: "icon_ganmao"
            }, {
                key: "carwash",
                icon: "icon_xiche"
            }, {
                key: "sports",
                icon: "icon_yundong"
            }, {
                key: "sunscreen",
                icon: "icon_fangsai"
            }, {
                key: "fish",
                icon: "icon_diaoyu"
            }, {
                key: "tourism",
                icon: "icon_lvyou"
            }, {
                key: "traffic",
                icon: "icon_jiaotong"
            }, {
                key: "diffusion",
                icon: "icon_wurankuosan"
            }, {
                key: "comfort",
                icon: "icon_shushidu"
            }, {
                key: "drying",
                icon: "icon_liangshai"
            }],
            a = [{
                key: 1,
                level: "\u708e\u70ed",
                icon: "icon_chuanyi_hot"
            }, {
                key: 2,
                level: "\u70ed",
                icon: "icon_chuanyi_hot"
            }, {
                key: 3,
                level: "\u8212\u9002",
                icon: "icon_chuanyi_shushi"
            }, {
                key: 4,
                level: "\u8f83\u8212\u9002",
                icon: "icon_chuanyi_shushi"
            }, {
                key: 5,
                level: "\u8f83\u51b7",
                icon: "icon_chuanyi_jiaoleng"
            }, {
                key: 6,
                level: "\u51b7",
                icon: "icon_chuanyi_cool"
            }, {
                key: 7,
                level: "\u5bd2\u51b7",
                icon: "icon_chuanyi_cool"
            }],
            o = t("#ct-content"),
            c = 0,
            l = 440,
            u = [-440, 0];
        return t("#ct-living-index #btn-prev").click(function (t) {
            i()
        }), t("#ct-living-index #btn-next").click(function (t) {
            r()
        }), {
            init: n
        }
    }), define("attention", ["jquery", "templateModule", "dataCtrl", "promise", "moment"], function (t, e, n, i, r) {
        function s() {
            if (localStorage) {
                var e = localStorage.getItem(p);
                return e ? t.parseJSON(e) : []
            }
        }

        function a(t) {
            var e = s(),
                n = e.some(function (t) {
                    return h(t, S)
                });
            return e.length < 5 && !n ? (e.push(t), u(e), f(e), !0) : (v.show(), !1)
        }

        function o(t) {
            var e = s(),
                n = e.filter(function (e) {
                    return !h(t, e)
                });
            u(n), f(n)
        }

        function c(t) {
            var e = s();
            e.forEach(function (e) {
                e.isDefault = h(t, e)
            }), u(e)
        }

        function l(t) {
            var e = s();
            e.forEach(function (e) {
                h(t, e) && (e.isDefault = !1)
            }), u(e)
        }

        function u(t) {
            localStorage.setItem(p, JSON.stringify(t));
            var s = t.map(function (t) {
                return n.getCustomInfo(t.province, t.city, t.district, "forecast_24h")
            });
            i.all(s).then(function (n) {
                for (var i = n.length - 1; i >= 0; i--)
                    for (var s = n[i], a = 0; a < 8; a++) {
                        var o = s[a];
                        if (r(o.time).isSame(y, "day")) {
                            t[i].weather = o.day_weather_short == o.night_weather_short ? o.day_weather_short : o.day_weather_short + "\u8f6c" + o.night_weather_short, t[i].temprature = o.min_degree + "\xb0/" + o.max_degree + "\xb0", t[i].day_weather_code = o.day_weather_code, t[i].day_weather_short = o.day_weather_short;
                            break
                        }
                    }
                w.html(e("attention", {
                    data: t
                }))
            })
        }

        function h(t, e) {
            return t.province == e.province && t.city == e.city && t.district == e.district
        }

        function d(t, e) {
            M = e, S = t;
            var n = s();
            f(n), u(n)
        }

        function f(t) {
            var e = t.some(function (t) {
                return h(t, S)
            });
            e ? k.text("[\u5df2\u5173\u6ce8]").addClass("hasAttention").unbind("click").css("display", "inline-block") : k.text("[\u6dfb\u52a0\u5173\u6ce8]").removeClass("hasAttention").bind("click", function (t) {
                t.stopPropagation(), a(S)
            }).css("display", "inline-block")
        }

        function m() {
            return s().find(function (t) {
                return t.isDefault
            })
        }
        var p = "attentionCity",
            y = r(),
            _ = t("#txt-cur-location"),
            g = t("#ct-attention"),
            v = t("#tips-attention-size"),
            w = t("#ls-attention"),
            k = t("#btn-attention");
        _.hover(function () {
            t("#i-location").trigger("blur")
        }), k.mouseleave(function (t) {
            v.hide()
        }), g.click(function (t) {
            t.stopPropagation()
        }), w.on("click", ".city", function (e) {
            e.preventDefault();
            var n = t(this);
            M && M(n.attr("data-province"), n.attr("data-city"), n.attr("data-district"))
        }), w.on("click", ".btn", function (e) {
            e.preventDefault(), e.stopPropagation();
            var n = t(this),
                i = n.parents(".city"),
                r = {
                    province: i.attr("data-province"),
                    city: i.attr("data-city"),
                    district: i.attr("data-district")
                };
            n.hasClass("btn-set-default") ? c(r) : n.hasClass("btn-delete") ? o(r) : n.hasClass("btn-cancel") && l(r)
        }), t(window).click(function (t) {
            v.hide()
        });
        var M, S;
        return {
            init: d,
            getDeafult: m
        }
    }), define("main", ["jquery", "current", "dataCtrl", "hours", "days", "living", "attention"], function (t, e, n, i, r, s, a) {
        var o = function (c, l, u, h) {
            console.log(c, l, u, h), n.getWeatherInof(c, l, u).then(function (d) {
                u && u.length > 0 ? t("#txt-cur-location").html(l + "&nbsp;" + u) : c == l ? t("#txt-cur-location").html(c) : t("#txt-cur-location").html(c + "&nbsp;" + l), h ? t("#txt-cur-location").addClass("position") : t("#txt-cur-location").removeClass("position"), e.init(d.weather.observe, d.weather.alarm, d.weather.air, d.weather.limit, d.weather.tips, d.weather.rise), i.init(d.weather.forecast_1h, d.weather.rise), r.init(d.weather.forecast_24h), s.init(d.weather.index), a.init({
                    province: c,
                    city: l,
                    district: u
                }, o), n.getCityId(c, l, u).then(function (e) {
                    t("#link-15").attr("href", "http://www.weather.com.cn/weather15d/" + e + ".shtml")
                })
            }, function (t) {
                console.log(t)
            })
        };
        return {
            load: o
        }
    }), define("location", ["jquery", "promise", "dataCtrl", "main", "templateModule"], function (t, e, n, i, r) {
        function s(t) {
            switch (t) {
            case "hot":
                g.hide(), v.show();
                break;
            case "match":
                g.show(), v.hide();
                break;
            case "close":
                g.hide(), v.hide()
            }
        }

        function a(t, e) {
            var n = t.split(","),
                i = n[2] ? n[2].trim() : "";
            return '<li class="item" data-province="' + n[0].trim() + '" data-city="' + n[1].trim() + '" data-district="' + i + '">' + t.replace(new RegExp(p, "g"), "<em>" + p + "</em>") + "</li>"
        }

        function o() {
            w.val(""), g.html("").hide(), p = ""
        }

        function c() {
            localStorage && (localStorage.setItem("searchHistory", JSON.stringify([])), h())
        }

        function l() {
            if (localStorage) {
                var e = localStorage.getItem("searchHistory");
                return e ? t.parseJSON(e) : []
            }
        }

        function u(t) {
            if (localStorage) {
                var e = l(),
                    n = JSON.stringify(t);
                e = e.filter(function (t) {
                    return n != JSON.stringify(t)
                }), e.length >= 4 && e.pop(), e.unshift(t), localStorage.setItem("searchHistory", JSON.stringify(e)), h()
            }
        }

        function h() {
            var e = l();
            e.length ? k.show() : k.hide(), e.forEach(function (t) {
                t.show.length > 4 && (t.show = t.show.substring(0, 3) + "...")
            }), t("#ls-history").html(r("citys", {
                data: e
            }))
        }

        function d() {
            return new e(function (e, i) {
                function r(n) {
                    e(n), t("#cur-location").text(n.city).show().attr({
                        "data-province": n.province,
                        "data-city": n.city,
                        "data-district": ""
                    }), t("#tit-cur").show()
                }

                function s() {
                    m().then(function (t) {
                        r(t)
                    }, function () {
                        r({
                            province: "\u5317\u4eac\u5e02",
                            city: "\u5317\u4eac\u5e02"
                        })
                    })
                }
                t.ajax({
                    type: "get",
                    async: !0,
                    url: "//apis.map.qq.com/ws/location/v1/ip?key=3BFBZ-ZKD3X-LW54A-ZT76D-E7AHO-4RBD5&&output=jsonp",
                    charset: "UTF-8",
                    dataType: "jsonp",
                    success: function (e) {
                        if (0 == e.status) {
                            var i = e.result.ad_info,
                                a = i.province,
                                o = i.city;
                            f(a) ? f(o) ? r({
                                province: a,
                                city: o
                            }) : m().then(function (t) {
                                r(t)
                            }, function () {
                                var t = S[i.province];
                                r({
                                    province: a,
                                    city: t
                                })
                            }) : f(o) ? n.getMatchPlace(o).then(function (e) {
                                t.each(e, function (e, n) {
                                    var i = n.split(",");
                                    r({
                                        province: t.trim(i[0]),
                                        city: t.trim(i[1])
                                    })
                                })
                            }, function (t) {
                                r({
                                    province: "\u5317\u4eac\u5e02",
                                    city: "\u5317\u4eac\u5e02"
                                })
                            }) : s()
                        } else s()
                    }, error: function () {
                        s()
                    }
                })
            })
        }

        function f(t) {
            return !(!t || "string" != typeof t || !t.length || "undefined" == t.toLocaleLowerCase())
        }

        function m() {
            return new e(function (e, n) {
                t.ajax({
                    type: "get",
                    async: !0,
                    url: "//api.map.baidu.com/location/ip?ak=wPxSWYNs0X6cbZTFHg1QLnwuyrGOYT8N",
                    charset: "UTF-8",
                    dataType: "jsonp",
                    success: function (t) {
                        t.content && t.content.address_detail && f(t.content.address_detail.province) && f(t.content.address_detail.city) ? e({
                            province: t.content.address_detail.province,
                            city: t.content.address_detail.city
                        }) : n()
                    }, error: function () {
                        n()
                    }
                })
            })
        }
        var p, y, _ = !1,
            g = (t("#ct-location"), t("#ls-match")),
            v = t("#ct-hot-city"),
            w = t("#i-location");
        w.on("focus", function (t) {
            s("hot")
        }), w.on("blur", function (e) {
            t("#i-ie-bug").trigger("focus"), setTimeout(function () {
                o(), s("close")
            }, 200)
        }), g.on("click", ".item", function (e) {
            if (!t(this).hasClass("tips")) {
                var n = t(this).attr("data-province"),
                    r = t(this).attr("data-city"),
                    s = t(this).attr("data-district");
                i.load(n, r, s), u({
                    show: s ? s : r,
                    province: n,
                    city: r,
                    district: s
                })
            }
            o()
        }), t("#i-location").on("input propertychange", function (e) {
            var i = t(this).val();
            return i.length ? (s("match"), void(i != p && (p = i, clearTimeout(y), y = setTimeout(function () {
                _ = !0, n.getMatchPlace(p).then(function (e) {
                    if (_ = !1, 0 === Object.keys(e).length) g.html('<li class="item tips">\u62b1\u6b49\uff0c\u672a\u627e\u5230\u76f8\u5173\u4f4d\u7f6e</li>');
                    else {
                        var n = "";
                        t.each(e, function (t, e) {
                            n += a(e, p)
                        }), g.html(n)
                    }
                }, function (t) {
                    console.log(t), _ = !1
                })
            }, 500)))) : (s("hot"), void g.html("").hide())
        });
        var k = t("#ct-history");
        h(), t("#ct-search #btn-clean").click(function (t) {
            c()
        });
        var M = [{
            show: "\u5317\u4eac",
            province: "\u5317\u4eac",
            city: "\u5317\u4eac"
        }, {
            show: "\u4e0a\u6d77",
            province: "\u4e0a\u6d77",
            city: "\u4e0a\u6d77"
        }, {
            show: "\u5e7f\u5dde",
            province: "\u5e7f\u4e1c",
            city: "\u5e7f\u5dde"
        }, {
            show: "\u6df1\u5733",
            province: "\u5e7f\u4e1c",
            city: "\u6df1\u5733"
        }, {
            show: "\u5929\u6d25",
            province: "\u5929\u6d25",
            city: "\u5929\u6d25"
        }, {
            show: "\u897f\u5b89",
            province: "\u9655\u897f",
            city: "\u897f\u5b89"
        }, {
            show: "\u6b66\u6c49",
            province: "\u6e56\u5317",
            city: "\u6b66\u6c49"
        }, {
            show: "\u6210\u90fd",
            province: "\u56db\u5ddd",
            city: "\u6210\u90fd"
        }, {
            show: "\u77f3\u5bb6\u5e84",
            province: "\u6cb3\u5317",
            city: "\u77f3\u5bb6\u5e84"
        }, {
            show: "\u90d1\u5dde",
            province: "\u6cb3\u5357",
            city: "\u90d1\u5dde"
        }, {
            show: "\u54c8\u5c14\u6ee8",
            province: "\u9ed1\u9f99\u6c5f",
            city: "\u54c8\u5c14\u6ee8"
        }, {
            show: "\u592a\u539f",
            province: "\u5c71\u897f",
            city: "\u592a\u539f"
        }, {
            show: "\u4e4c\u9c81\u6728\u9f50",
            province: "\u65b0\u7586",
            city: "\u4e4c\u9c81\u6728\u9f50"
        }, {
            show: "\u6d4e\u5357",
            province: "\u5c71\u4e1c",
            city: "\u6d4e\u5357"
        }, {
            show: "\u798f\u5dde",
            province: "\u798f\u5efa",
            city: "\u798f\u5dde"
        }, {
            show: "\u65e5\u5580\u5219",
            province: "\u897f\u85cf",
            city: "\u65e5\u5580\u5219"
        }, {
            show: "\u53a6\u95e8",
            province: "\u798f\u5efa",
            city: "\u53a6\u95e8"
        }, {
            show: "\u9752\u5c9b",
            province: "\u5c71\u4e1c",
            city: "\u9752\u5c9b"
        }, {
            show: "\u626c\u5dde",
            province: "\u6c5f\u82cf",
            city: "\u626c\u5dde"
        }, {
            show: "\u5408\u80a5",
            province: "\u5b89\u5fbd",
            city: "\u5408\u80a5"
        }, {
            show: "\u91cd\u5e86",
            province: "\u91cd\u5e86",
            city: "\u91cd\u5e86"
        }, {
            show: "\u5357\u660c",
            province: "\u6c5f\u897f",
            city: "\u5357\u660c"
        }, {
            show: "\u5510\u5c71",
            province: "\u6cb3\u5317",
            city: "\u5510\u5c71"
        }, {
            show: "\u676d\u5dde",
            province: "\u6d59\u6c5f",
            city: "\u676d\u5dde"
        }, {
            show: "\u90a2\u53f0",
            province: "\u6cb3\u5317",
            city: "\u90a2\u53f0"
        }, {
            show: "\u6c88\u9633",
            province: "\u8fbd\u5b81",
            city: "\u6c88\u9633"
        }, {
            show: "\u90af\u90f8",
            province: "\u6cb3\u5317",
            city: "\u90af\u90f8"
        }, {
            show: "\u6606\u660e",
            province: "\u4e91\u5357",
            city: "\u6606\u660e"
        }];
        t("#ls-hot-city").append(r("citys", {
            data: M
        })), t("#ct-hot-city").on("click", "li, #cur-location", function (e) {
            var n = t(this).attr("data-province"),
                r = t(this).attr("data-city"),
                s = t(this).attr("data-district");
            s = s ? s : "", i.load(n, r, s, t(this).hasClass("match")), u({
                show: s ? s : r,
                province: n,
                city: r,
                district: s
            }), w.trigger("blur")
        });
        var S = {
            "\u5317\u4eac\u5e02": "\u5317\u4eac\u5e02",
            "\u5929\u6d25\u5e02": "\u5929\u6d25\u5e02",
            "\u6cb3\u5317\u7701": "\u77f3\u5bb6\u5e84\u5e02",
            "\u5c71\u897f\u7701": "\u592a\u539f\u5e02",
            "\u5185\u8499\u53e4\u81ea\u6cbb\u533a": "\u547c\u548c\u6d69\u7279\u5e02",
            "\u8fbd\u5b81\u7701": "\u6c88\u9633\u5e02",
            "\u5409\u6797\u7701": "\u957f\u6625\u5e02",
            "\u9ed1\u9f99\u6c5f\u7701": "\u54c8\u5c14\u6ee8\u5e02",
            "\u4e0a\u6d77\u5e02": "\u4e0a\u6d77\u5e02",
            "\u6c5f\u82cf\u7701": "\u5357\u4eac\u5e02",
            "\u6d59\u6c5f\u7701": "\u676d\u5dde\u5e02",
            "\u5b89\u5fbd\u7701": "\u5408\u80a5\u5e02",
            "\u798f\u5efa\u7701": "\u798f\u5dde\u5e02",
            "\u6c5f\u897f\u7701": "\u5357\u660c\u5e02",
            "\u5c71\u4e1c\u7701": "\u6d4e\u5357\u5e02",
            "\u6cb3\u5357\u7701": "\u90d1\u5dde\u5e02",
            "\u6e56\u5317\u7701": "\u6b66\u6c49\u5e02",
            "\u6e56\u5357\u7701": "\u957f\u6c99\u5e02",
            "\u5e7f\u4e1c\u7701": "\u5e7f\u5dde\u5e02",
            "\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a": "\u5357\u5b81\u5e02",
            "\u6d77\u5357\u7701": "\u6d77\u53e3\u5e02",
            "\u91cd\u5e86\u5e02": "\u91cd\u5e86\u5e02",
            "\u56db\u5ddd\u7701": "\u6210\u90fd\u5e02",
            "\u8d35\u5dde\u7701": "\u8d35\u9633\u5e02",
            "\u4e91\u5357\u7701": "\u6606\u660e\u5e02",
            "\u897f\u85cf\u81ea\u6cbb\u533a": "\u62c9\u8428\u5e02",
            "\u9655\u897f\u7701": "\u897f\u5b89\u5e02",
            "\u7518\u8083\u7701": "\u5170\u5dde\u5e02",
            "\u9752\u6d77\u7701": "\u897f\u5b81\u5e02",
            "\u5b81\u590f\u56de\u65cf\u81ea\u6cbb\u533a": "\u94f6\u5ddd\u5e02",
            "\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a": "\u4e4c\u9c81\u6728\u9f50\u5e02",
            "\u9999\u6e2f\u7279\u522b\u884c\u653f\u533a": "\u9999\u6e2f",
            "\u6fb3\u95e8\u7279\u522b\u884c\u653f\u533a": "\u6fb3\u95e8"
        };
        return {
            init: d
        }
    }), define("tools", [], function () {
        function t() {
            var t = navigator.userAgent.toLowerCase();
            return {
                iphone: /iphone/.test(t),
                android: /android/.test(t),
                winphone: /windows phone/.test(t),
                qqnews: /qqnews/.test(t),
                weixin: /micromessenger/.test(t),
                mqqbrowser: /mqqbrowser/.test(t),
                qq: /\sqq/.test(t),
                ucbrowser: t.match(/ucbrowser/)
            }
        }

        function e(t) {
            var e = location.href;
            t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var n = "[\\?&]" + t + "=([^&#]*)",
                i = new RegExp(n),
                r = i.exec(e);
            return null == r ? null : decodeURI(r[1])
        }
        return {
            getUserAgent: t,
            getUrlParam: e
        }
    }), define("index", ["jquery", "location", "main", "tools", "finalboss", "attention"], function (t, e, n, i, r, s) {
        function a(t) {
            return t.replace(/[^\u4e00-\u9fa5]/g, "")
        }
        var o = e.init();
        if (i.getUrlParam("province") && i.getUrlParam("city")) n.load(a(i.getUrlParam("province")), a(i.getUrlParam("city")), a(i.getUrlParam("district") ? i.getUrlParam("district") : ""));
        else if (s.getDeafult()) {
            var c = s.getDeafult();
            n.load(c.province, c.city, c.district)
        } else o.then(function (t) {
            n.load(t.province, t.city, "", !0)
        }, function (t) {
            console.log(t), n.load("\u5317\u4eac\u5e02", "\u5317\u4eac\u5e02")
        });
        r("BossId=5199&Pwd=451708158&platform=pc&ref={URL}&fun={%v}&qq={QQ}&url={HREF}&ua={UA}").start(), t("#btn-close-qt").click(function (e) {
            t("#ct-xcx-qt").hide()
        })
    }), /(iPhone|Android|iPad|iPod|iOS)/i.test(navigator.userAgent) && (window.location.href = "https://xw.tianqi.qq.com"), require.config({
        baseUrl: "./scripts/",
        paths: {
            jquery: "//mat1.gtimg.com/libs/jquery/1.11.3/jquery.min",
            finalboss: "//mat1.gtimg.com/libs/t/finalboss/0.1.4/finalboss.jq.min",
            promise: "//mat1.gtimg.com/statsnba/libs/bluebird.min"
        },
        shim: {}
    }), Array.prototype.forEach || (Array.prototype.forEach = function (t, e) {
        var n, i;
        if (null == this) throw new TypeError(" this is null or not defined");
        var r = Object(this),
            s = r.length >>> 0;
        if ("function" != typeof t) throw new TypeError(t + " is not a function");
        for (arguments.length > 1 && (n = e), i = 0; i < s;) {
            var a;
            i in r && (a = r[i], t.call(n, a, i, r)), i++
        }
    }), Object.keys || (Object.keys = function () {
        var t = Object.prototype.hasOwnProperty,
            e = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            i = n.length;
        return function (r) {
            if ("object" != typeof r && "function" != typeof r || null === r) throw new TypeError("Object.keys called on non-object");
            var s = [];
            for (var a in r) t.call(r, a) && s.push(a);
            if (e)
                for (var o = 0; o < i; o++) t.call(r, n[o]) && s.push(n[o]);
            return s
        }
    }()), String.prototype.trim || (String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (t, e) {
        var n;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var i = Object(this),
            r = i.length >>> 0;
        if (0 === r) return -1;
        var s = +e || 0;
        if (Math.abs(s) === 1 / 0 && (s = 0), s >= r) return -1;
        for (n = Math.max(s >= 0 ? s : r - Math.abs(s), 0); n < r;) {
            if (n in i && i[n] === t) return n;
            n++
        }
        return -1
    }), Array.prototype.map || (Array.prototype.map = function (t) {
        var e, n, i;
        if (null == this) throw new TypeError("this is null or not defined");
        var r = Object(this),
            s = r.length >>> 0;
        if ("function" != typeof t) throw new TypeError(t + " is not a function");
        for (arguments.length > 1 && (e = arguments[1]), n = new Array(s), i = 0; i < s;) {
            var a, o;
            i in r && (a = r[i], o = t.call(e, a, i, r), n[i] = o), i++
        }
        return n
    }), Array.prototype.find || (Array.prototype.find = function (t) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var e = Object(this),
            n = e.length >>> 0;
        if ("function" != typeof t) throw new TypeError("predicate must be a function");
        for (var i = arguments[1], r = 0; r < n;) {
            var s = e[r];
            if (t.call(i, s, r, e)) return s;
            r++
        }
    }), Array.prototype.some || (Array.prototype.some = function (t) {
        "use strict";
        if (void 0 === this || null === this) throw new TypeError;
        var e = Object(this),
            n = e.length >>> 0;
        if ("function" != typeof t) throw new TypeError;
        for (var i = arguments.length >= 2 ? arguments[1] : void 0, r = 0; r < n; r++)
            if (r in e && t.call(i, e[r], r, e)) return !0;
        return !1
    }), require(["index"]), define("config", function () {})
}();
//# sourceMappingURL=main-11bd2a74de.js.map
/*  |xGv00|5e15545b9cb382482462ec57f186442c */