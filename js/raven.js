! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Raven = t()
    }
}(function() {
    return function t(e, r, n) {
        function i(o, s) {
            if (!r[o]) {
                if (!e[o]) {
                    var u = "function" == typeof require && require;
                    if (!s && u) return u(o, !0);
                    if (a) return a(o, !0);
                    var c = new Error("Cannot find module '" + o + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var l = r[o] = {
                    exports: {}
                };
                e[o][0].call(l.exports, function(t) {
                    var r = e[o][1][t];
                    return i(r || t)
                }, l, l.exports, t, e, r, n)
            }
            return r[o].exports
        }
        for (var a = "function" == typeof require && require, o = 0; o < n.length; o++) i(n[o]);
        return i
    }({
        1: [function(t, e) {
            function r(t) {
                this.name = "RavenConfigError", this.message = t
            }
            r.prototype = new Error, r.prototype.constructor = r, e.exports = r
        }, {}],
        2: [function(t, e) {
            var r = function(t, e, r) {
                var n = t[e],
                    i = t;
                if (e in t) {
                    var a = "warn" === e ? "warning" : e;
                    t[e] = function() {
                        var t = [].slice.call(arguments),
                            o = "" + t.join(" "),
                            s = {
                                level: a,
                                logger: "console",
                                extra: {
                                    arguments: t
                                }
                            };
                        "assert" === e ? !1 === t[0] && (o = "Assertion failed: " + (t.slice(1).join(" ") || "console.assert"), s.extra.arguments = t.slice(1), r && r(o, s)) : r && r(o, s), n && Function.prototype.apply.call(n, i, t)
                    }
                }
            };
            e.exports = {
                wrapMethod: r
            }
        }, {}],
        3: [function(t, e) {
            (function(r) {
                function n() {
                    return +new Date
                }

                function i(t, e) {
                    return d(e) ? function(r) {
                        return e(r, t)
                    } : e
                }

                function a() {
                    this.a = !("object" != typeof JSON || !JSON.stringify), this.b = !p(M), this.c = !p(q), this.d = null, this.e = null, this.f = null, this.g = null, this.h = null, this.i = null, this.j = {}, this.k = {
                        logger: "javascript",
                        ignoreErrors: [],
                        ignoreUrls: [],
                        whitelistUrls: [],
                        includePaths: [],
                        collectWindowErrors: !0,
                        maxMessageLength: 0,
                        maxUrlLength: 250,
                        stackTraceLimit: 50,
                        autoBreadcrumbs: !0,
                        instrument: !0,
                        sampleRate: 1
                    }, this.l = 0, this.m = !1, this.n = Error.stackTraceLimit, this.o = F.console || {}, this.p = {}, this.q = [], this.r = n(), this.s = [], this.t = [], this.u = null, this.v = F.location, this.w = this.v && this.v.href, this.x();
                    for (var t in this.o) this.p[t] = this.o[t]
                }
                var o = t(6),
                    s = t(7),
                    u = t(1),
                    c = t(5),
                    l = c.isError,
                    f = c.isObject,
                    f = c.isObject,
                    h = c.isErrorEvent,
                    p = c.isUndefined,
                    d = c.isFunction,
                    v = c.isString,
                    m = c.isEmptyObject,
                    g = c.each,
                    y = c.objectMerge,
                    b = c.truncate,
                    k = c.objectFrozen,
                    w = c.hasKey,
                    x = c.joinRegExp,
                    E = c.urlencode,
                    S = c.uuid4,
                    R = c.htmlTreeAsString,
                    j = c.isSameException,
                    C = c.isSameStacktrace,
                    T = c.parseUrl,
                    U = c.fill,
                    O = t(2).wrapMethod,
                    L = "source protocol user pass host port path".split(" "),
                    N = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/,
                    F = "undefined" != typeof window ? window : void 0 !== r ? r : "undefined" != typeof self ? self : {},
                    M = F.document,
                    q = F.navigator;
                a.prototype = {
                    VERSION: "3.19.1",
                    debug: !1,
                    TraceKit: o,
                    config: function(t, e) {
                        var r = this;
                        if (r.g) return this.y("error", "Error: Raven has already been configured"), r;
                        if (!t) return r;
                        var n = r.k;
                        e && g(e, function(t, e) {
                            "tags" === t || "extra" === t || "user" === t ? r.j[t] = e : n[t] = e
                        }), r.setDSN(t), n.ignoreErrors.push(/^Script error\.?$/), n.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), n.ignoreErrors = x(n.ignoreErrors), n.ignoreUrls = !!n.ignoreUrls.length && x(n.ignoreUrls), n.whitelistUrls = !!n.whitelistUrls.length && x(n.whitelistUrls), n.includePaths = x(n.includePaths), n.maxBreadcrumbs = Math.max(0, Math.min(n.maxBreadcrumbs || 100, 100));
                        var i = {
                                xhr: !0,
                                console: !0,
                                dom: !0,
                                location: !0
                            },
                            a = n.autoBreadcrumbs;
                        "[object Object]" === {}.toString.call(a) ? a = y(i, a) : !1 !== a && (a = i), n.autoBreadcrumbs = a;
                        var s = {
                                tryCatch: !0
                            },
                            u = n.instrument;
                        return "[object Object]" === {}.toString.call(u) ? u = y(s, u) : !1 !== u && (u = s), n.instrument = u, o.collectWindowErrors = !!n.collectWindowErrors, r
                    },
                    install: function() {
                        var t = this;
                        return t.isSetup() && !t.m && (o.report.subscribe(function() {
                            t.z.apply(t, arguments)
                        }), t.k.instrument && t.k.instrument.tryCatch && t.A(), t.k.autoBreadcrumbs && t.B(), t.C(), t.m = !0), Error.stackTraceLimit = t.k.stackTraceLimit, this
                    },
                    setDSN: function(t) {
                        var e = this,
                            r = e.D(t),
                            n = r.path.lastIndexOf("/"),
                            i = r.path.substr(1, n);
                        e.E = t, e.h = r.user, e.F = r.pass && r.pass.substr(1), e.i = r.path.substr(n + 1), e.g = e.G(r), e.H = e.g + "/" + i + "api/" + e.i + "/store/", this.x()
                    },
                    context: function(t, e, r) {
                        return d(t) && (r = e || [], e = t, t = void 0), this.wrap(t, e).apply(this, r)
                    },
                    wrap: function(t, e, r) {
                        function n() {
                            var n = [],
                                a = arguments.length,
                                o = !t || t && !1 !== t.deep;
                            for (r && d(r) && r.apply(this, arguments); a--;) n[a] = o ? i.wrap(t, arguments[a]) : arguments[a];
                            try {
                                return e.apply(this, n)
                            } catch (e) {
                                throw i.I(), i.captureException(e, t), e
                            }
                        }
                        var i = this;
                        if (p(e) && !d(t)) return t;
                        if (d(t) && (e = t, t = void 0), !d(e)) return e;
                        try {
                            if (e.J) return e;
                            if (e.K) return e.K
                        } catch (t) {
                            return e
                        }
                        for (var a in e) w(e, a) && (n[a] = e[a]);
                        return n.prototype = e.prototype, e.K = n, n.J = !0, n.L = e, n
                    },
                    uninstall: function() {
                        return o.report.uninstall(), this.M(), Error.stackTraceLimit = this.n, this.m = !1, this
                    },
                    captureException: function(t, e) {
                        var r = !l(t),
                            n = !h(t),
                            i = h(t) && !t.error;
                        if (r && n || i) return this.captureMessage(t, y({
                            trimHeadFrames: 1,
                            stacktrace: !0
                        }, e));
                        h(t) && (t = t.error), this.d = t;
                        try {
                            var a = o.computeStackTrace(t);
                            this.N(a, e)
                        } catch (e) {
                            if (t !== e) throw e
                        }
                        return this
                    },
                    captureMessage: function(t, e) {
                        if (!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(t)) {
                            e = e || {};
                            var r, n = y({
                                message: t + ""
                            }, e);
                            try {
                                throw new Error(t)
                            } catch (t) {
                                r = t
                            }
                            r.name = null;
                            var i = o.computeStackTrace(r),
                                a = i.stack[1],
                                s = a && a.url || "";
                            if ((!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(s)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(s))) {
                                if (this.k.stacktrace || e && e.stacktrace) {
                                    e = y({
                                        fingerprint: t,
                                        trimHeadFrames: (e.trimHeadFrames || 0) + 1
                                    }, e);
                                    var u = this.O(i, e);
                                    n.stacktrace = {
                                        frames: u.reverse()
                                    }
                                }
                                return this.P(n), this
                            }
                        }
                    },
                    captureBreadcrumb: function(t) {
                        var e = y({
                            timestamp: n() / 1e3
                        }, t);
                        if (d(this.k.breadcrumbCallback)) {
                            var r = this.k.breadcrumbCallback(e);
                            if (f(r) && !m(r)) e = r;
                            else if (!1 === r) return this
                        }
                        return this.t.push(e), this.t.length > this.k.maxBreadcrumbs && this.t.shift(), this
                    },
                    addPlugin: function(t) {
                        var e = [].slice.call(arguments, 1);
                        return this.q.push([t, e]), this.m && this.C(), this
                    },
                    setUserContext: function(t) {
                        return this.j.user = t, this
                    },
                    setExtraContext: function(t) {
                        return this.Q("extra", t), this
                    },
                    setTagsContext: function(t) {
                        return this.Q("tags", t), this
                    },
                    clearContext: function() {
                        return this.j = {}, this
                    },
                    getContext: function() {
                        return JSON.parse(s(this.j))
                    },
                    setEnvironment: function(t) {
                        return this.k.environment = t, this
                    },
                    setRelease: function(t) {
                        return this.k.release = t, this
                    },
                    setDataCallback: function(t) {
                        var e = this.k.dataCallback;
                        return this.k.dataCallback = i(e, t), this
                    },
                    setBreadcrumbCallback: function(t) {
                        var e = this.k.breadcrumbCallback;
                        return this.k.breadcrumbCallback = i(e, t), this
                    },
                    setShouldSendCallback: function(t) {
                        var e = this.k.shouldSendCallback;
                        return this.k.shouldSendCallback = i(e, t), this
                    },
                    setTransport: function(t) {
                        return this.k.transport = t, this
                    },
                    lastException: function() {
                        return this.d
                    },
                    lastEventId: function() {
                        return this.f
                    },
                    isSetup: function() {
                        return !(!this.a || !this.g && (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0, this.y("error", "Error: Raven has not been configured.")), 1))
                    },
                    afterLoad: function() {
                        var t = F.RavenConfig;
                        t && this.config(t.dsn, t.config).install()
                    },
                    showReportDialog: function(t) {
                        if (M) {
                            t = t || {};
                            var e = t.eventId || this.lastEventId();
                            if (!e) throw new u("Missing eventId");
                            var r = t.dsn || this.E;
                            if (!r) throw new u("Missing DSN");
                            var n = encodeURIComponent,
                                i = "";
                            i += "?eventId=" + n(e), i += "&dsn=" + n(r);
                            var a = t.user || this.j.user;
                            a && (a.name && (i += "&name=" + n(a.name)), a.email && (i += "&email=" + n(a.email)));
                            var o = this.G(this.D(r)),
                                s = M.createElement("script");
                            s.async = !0, s.src = o + "/api/embed/error-page/" + i, (M.head || M.body).appendChild(s)
                        }
                    },
                    I: function() {
                        var t = this;
                        this.l += 1, setTimeout(function() {
                            t.l -= 1
                        })
                    },
                    R: function(t, e) {
                        var r, n;
                        if (this.b) {
                            e = e || {}, t = "raven" + t.substr(0, 1).toUpperCase() + t.substr(1), M.createEvent ? (r = M.createEvent("HTMLEvents"), r.initEvent(t, !0, !0)) : (r = M.createEventObject(), r.eventType = t);
                            for (n in e) w(e, n) && (r[n] = e[n]);
                            if (M.createEvent) M.dispatchEvent(r);
                            else try {
                                M.fireEvent("on" + r.eventType.toLowerCase(), r)
                            } catch (t) {}
                        }
                    },
                    S: function(t) {
                        var e = this;
                        return function(r) {
                            if (e.T = null, e.u !== r) {
                                e.u = r;
                                var n;
                                try {
                                    n = R(r.target)
                                } catch (t) {
                                    n = "<unknown>"
                                }
                                e.captureBreadcrumb({
                                    category: "ui." + t,
                                    message: n
                                })
                            }
                        }
                    },
                    U: function() {
                        var t = this;
                        return function(e) {
                            var r;
                            try {
                                r = e.target
                            } catch (t) {
                                return
                            }
                            var n = r && r.tagName;
                            if (n && ("INPUT" === n || "TEXTAREA" === n || r.isContentEditable)) {
                                var i = t.T;
                                i || t.S("input")(e), clearTimeout(i), t.T = setTimeout(function() {
                                    t.T = null
                                }, 1e3)
                            }
                        }
                    },
                    V: function(t, e) {
                        var r = T(this.v.href),
                            n = T(e),
                            i = T(t);
                        this.w = e, r.protocol === n.protocol && r.host === n.host && (e = n.relative), r.protocol === i.protocol && r.host === i.host && (t = i.relative), this.captureBreadcrumb({
                            category: "navigation",
                            data: {
                                to: e,
                                from: t
                            }
                        })
                    },
                    A: function() {
                        function t(t) {
                            return function() {
                                for (var e = new Array(arguments.length), n = 0; n < e.length; ++n) e[n] = arguments[n];
                                var i = e[0];
                                return d(i) && (e[0] = r.wrap(i)), t.apply ? t.apply(this, e) : t(e[0], e[1])
                            }
                        }

                        function e(t) {
                            var e = F[t] && F[t].prototype;
                            e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (U(e, "addEventListener", function(e) {
                                return function(n, a, o, s) {
                                    try {
                                        a && a.handleEvent && (a.handleEvent = r.wrap(a.handleEvent))
                                    } catch (t) {}
                                    var u, c, l;
                                    return i && i.dom && ("EventTarget" === t || "Node" === t) && (c = r.S("click"), l = r.U(), u = function(t) {
                                        if (t) {
                                            var e;
                                            try {
                                                e = t.type
                                            } catch (t) {
                                                return
                                            }
                                            return "click" === e ? c(t) : "keypress" === e ? l(t) : void 0
                                        }
                                    }), e.call(this, n, r.wrap(a, void 0, u), o, s)
                                }
                            }, n), U(e, "removeEventListener", function(t) {
                                return function(e, r, n, i) {
                                    try {
                                        r = r && (r.K ? r.K : r)
                                    } catch (t) {}
                                    return t.call(this, e, r, n, i)
                                }
                            }, n))
                        }
                        var r = this,
                            n = r.s,
                            i = this.k.autoBreadcrumbs;
                        U(F, "setTimeout", t, n), U(F, "setInterval", t, n), F.requestAnimationFrame && U(F, "requestAnimationFrame", function(t) {
                            return function(e) {
                                return t(r.wrap(e))
                            }
                        }, n);
                        for (var a = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], o = 0; o < a.length; o++) e(a[o])
                    },
                    B: function() {
                        function t(t, r) {
                            t in r && d(r[t]) && U(r, t, function(t) {
                                return e.wrap(t)
                            })
                        }
                        var e = this,
                            r = this.k.autoBreadcrumbs,
                            n = e.s;
                        if (r.xhr && "XMLHttpRequest" in F) {
                            var i = XMLHttpRequest.prototype;
                            U(i, "open", function(t) {
                                return function(r, n) {
                                    return v(n) && -1 === n.indexOf(e.h) && (this.W = {
                                        method: r,
                                        url: n,
                                        status_code: null
                                    }), t.apply(this, arguments)
                                }
                            }, n), U(i, "send", function(r) {
                                return function() {
                                    function n() {
                                        if (i.W && 4 === i.readyState) {
                                            try {
                                                i.W.status_code = i.status
                                            } catch (t) {}
                                            e.captureBreadcrumb({
                                                type: "http",
                                                category: "xhr",
                                                data: i.W
                                            })
                                        }
                                    }
                                    for (var i = this, a = ["onload", "onerror", "onprogress"], o = 0; o < a.length; o++) t(a[o], i);
                                    return "onreadystatechange" in i && d(i.onreadystatechange) ? U(i, "onreadystatechange", function(t) {
                                        return e.wrap(t, void 0, n)
                                    }) : i.onreadystatechange = n, r.apply(this, arguments)
                                }
                            }, n)
                        }
                        r.xhr && "fetch" in F && U(F, "fetch", function(t) {
                            return function() {
                                for (var r = new Array(arguments.length), n = 0; n < r.length; ++n) r[n] = arguments[n];
                                var i, a = r[0],
                                    o = "GET";
                                "string" == typeof a ? i = a : "Request" in F && a instanceof F.Request ? (i = a.url, a.method && (o = a.method)) : i = "" + a, r[1] && r[1].method && (o = r[1].method);
                                var s = {
                                    method: o,
                                    url: i,
                                    status_code: null
                                };
                                return e.captureBreadcrumb({
                                    type: "http",
                                    category: "fetch",
                                    data: s
                                }), t.apply(this, r).then(function(t) {
                                    return s.status_code = t.status, t
                                })
                            }
                        }, n), r.dom && this.b && (M.addEventListener ? (M.addEventListener("click", e.S("click"), !1), M.addEventListener("keypress", e.U(), !1)) : (M.attachEvent("onclick", e.S("click")), M.attachEvent("onkeypress", e.U())));
                        var a = F.chrome,
                            o = a && a.app && a.app.runtime,
                            s = !o && F.history && history.pushState && history.replaceState;
                        if (r.location && s) {
                            var u = F.onpopstate;
                            F.onpopstate = function() {
                                var t = e.v.href;
                                if (e.V(e.w, t), u) return u.apply(this, arguments)
                            };
                            var c = function(t) {
                                return function() {
                                    var r = arguments.length > 2 ? arguments[2] : void 0;
                                    return r && e.V(e.w, r + ""), t.apply(this, arguments)
                                }
                            };
                            U(history, "pushState", c, n), U(history, "replaceState", c, n)
                        }
                        if (r.console && "console" in F && console.log) {
                            var l = function(t, r) {
                                e.captureBreadcrumb({
                                    message: t,
                                    level: r.level,
                                    category: "console"
                                })
                            };
                            g(["debug", "info", "warn", "error", "log"], function(t, e) {
                                O(console, e, l)
                            })
                        }
                    },
                    M: function() {
                        for (var t; this.s.length;) {
                            t = this.s.shift();
                            var e = t[0],
                                r = t[1],
                                n = t[2];
                            e[r] = n
                        }
                    },
                    C: function() {
                        var t = this;
                        g(this.q, function(e, r) {
                            var n = r[0],
                                i = r[1];
                            n.apply(t, [t].concat(i))
                        })
                    },
                    D: function(t) {
                        var e = N.exec(t),
                            r = {},
                            n = 7;
                        try {
                            for (; n--;) r[L[n]] = e[n] || ""
                        } catch (e) {
                            throw new u("Invalid DSN: " + t)
                        }
                        if (r.pass && !this.k.allowSecretKey) throw new u("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                        return r
                    },
                    G: function(t) {
                        var e = "//" + t.host + (t.port ? ":" + t.port : "");
                        return t.protocol && (e = t.protocol + ":" + e), e
                    },
                    z: function() {
                        this.l || this.N.apply(this, arguments)
                    },
                    N: function(t, e) {
                        var r = this.O(t, e);
                        this.R("handle", {
                            stackInfo: t,
                            options: e
                        }), this.X(t.name, t.message, t.url, t.lineno, r, e)
                    },
                    O: function(t, e) {
                        var r = this,
                            n = [];
                        if (t.stack && t.stack.length && (g(t.stack, function(e, i) {
                                var a = r.Y(i, t.url);
                                a && n.push(a)
                            }), e && e.trimHeadFrames))
                            for (var i = 0; i < e.trimHeadFrames && i < n.length; i++) n[i].in_app = !1;
                        return n = n.slice(0, this.k.stackTraceLimit)
                    },
                    Y: function(t, e) {
                        var r = {
                            filename: t.url,
                            lineno: t.line,
                            colno: t.column,
                            "function": t.func || "?"
                        };
                        return t.url || (r.filename = e), r.in_app = !(this.k.includePaths.test && !this.k.includePaths.test(r.filename) || /(Raven|TraceKit)\./.test(r["function"]) || /raven\.(min\.)?js$/.test(r.filename)), r
                    },
                    X: function(t, e, r, n, i, a) {
                        var o = (t ? t + ": " : "") + (e || "");
                        if (!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(e) && !this.k.ignoreErrors.test(o)) {
                            var s;
                            if (i && i.length ? (r = i[0].filename || r, i.reverse(), s = {
                                    frames: i
                                }) : r && (s = {
                                    frames: [{
                                        filename: r,
                                        lineno: n,
                                        in_app: !0
                                    }]
                                }), (!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(r)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(r))) {
                                var u = y({
                                    exception: {
                                        values: [{
                                            type: t,
                                            value: e,
                                            stacktrace: s
                                        }]
                                    },
                                    culprit: r
                                }, a);
                                this.P(u)
                            }
                        }
                    },
                    Z: function(t) {
                        var e = this.k.maxMessageLength;
                        if (t.message && (t.message = b(t.message, e)), t.exception) {
                            var r = t.exception.values[0];
                            r.value = b(r.value, e)
                        }
                        var n = t.request;
                        return n && (n.url && (n.url = b(n.url, this.k.maxUrlLength)), n.Referer && (n.Referer = b(n.Referer, this.k.maxUrlLength))), t.breadcrumbs && t.breadcrumbs.values && this.$(t.breadcrumbs), t
                    },
                    $: function(t) {
                        for (var e, r, n, i = ["to", "from", "url"], a = 0; a < t.values.length; ++a)
                            if (r = t.values[a], r.hasOwnProperty("data") && f(r.data) && !k(r.data)) {
                                n = y({}, r.data);
                                for (var o = 0; o < i.length; ++o) e = i[o], n.hasOwnProperty(e) && n[e] && (n[e] = b(n[e], this.k.maxUrlLength));
                                t.values[a].data = n
                            }
                    },
                    _: function() {
                        if (this.c || this.b) {
                            var t = {};
                            return this.c && q.userAgent && (t.headers = {
                                "User-Agent": navigator.userAgent
                            }), this.b && (M.location && M.location.href && (t.url = M.location.href), M.referrer && (t.headers || (t.headers = {}), t.headers.Referer = M.referrer)), t
                        }
                    },
                    x: function() {
                        this.aa = 0, this.ba = null
                    },
                    ca: function() {
                        return this.aa && n() - this.ba < this.aa
                    },
                    da: function(t) {
                        var e = this.e;
                        return !(!e || t.message !== e.message || t.culprit !== e.culprit) && (t.stacktrace || e.stacktrace ? C(t.stacktrace, e.stacktrace) : !t.exception && !e.exception || j(t.exception, e.exception))
                    },
                    ea: function(t) {
                        if (!this.ca()) {
                            var e = t.status;
                            if (400 === e || 401 === e || 429 === e) {
                                var r;
                                try {
                                    r = t.getResponseHeader("Retry-After"), r = 1e3 * parseInt(r, 10)
                                } catch (t) {}
                                this.aa = r || (2 * this.aa || 1e3), this.ba = n()
                            }
                        }
                    },
                    P: function(t) {
                        var e = this.k,
                            r = {
                                project: this.i,
                                logger: e.logger,
                                platform: "javascript"
                            },
                            i = this._();
                        if (i && (r.request = i), t.trimHeadFrames && delete t.trimHeadFrames, t = y(r, t), t.tags = y(y({}, this.j.tags), t.tags), t.extra = y(y({}, this.j.extra), t.extra), t.extra["session:duration"] = n() - this.r, this.t && this.t.length > 0 && (t.breadcrumbs = {
                                values: [].slice.call(this.t, 0)
                            }), m(t.tags) && delete t.tags, this.j.user && (t.user = this.j.user), e.environment && (t.environment = e.environment), e.release && (t.release = e.release), e.serverName && (t.server_name = e.serverName), d(e.dataCallback) && (t = e.dataCallback(t) || t), t && !m(t) && (!d(e.shouldSendCallback) || e.shouldSendCallback(t))) return this.ca() ? void this.y("warn", "Raven dropped error due to backoff: ", t) : void("number" == typeof e.sampleRate ? Math.random() < e.sampleRate && this.fa(t) : this.fa(t))
                    },
                    ga: function() {
                        return S()
                    },
                    fa: function(t, e) {
                        var r = this,
                            n = this.k;
                        if (this.isSetup()) {
                            if (t = this.Z(t), !this.k.allowDuplicates && this.da(t)) return void this.y("warn", "Raven dropped repeat event: ", t);
                            this.f = t.event_id || (t.event_id = this.ga()), this.e = t, this.y("debug", "Raven about to send:", t);
                            var i = {
                                sentry_version: "7",
                                sentry_client: "raven-js/" + this.VERSION,
                                sentry_key: this.h
                            };
                            this.F && (i.sentry_secret = this.F);
                            var a = t.exception && t.exception.values[0];
                            this.captureBreadcrumb({
                                category: "sentry",
                                message: a ? (a.type ? a.type + ": " : "") + a.value : t.message,
                                event_id: t.event_id,
                                level: t.level || "error"
                            });
                            var o = this.H;
                            (n.transport || this.ha).call(this, {
                                url: o,
                                auth: i,
                                data: t,
                                options: n,
                                onSuccess: function() {
                                    r.x(), r.R("success", {
                                        data: t,
                                        src: o
                                    }), e && e()
                                },
                                onError: function(n) {
                                    r.y("error", "Raven transport failed to send: ", n), n.request && r.ea(n.request), r.R("failure", {
                                        data: t,
                                        src: o
                                    }), n = n || new Error("Raven send failed (no additional details provided)"), e && e(n)
                                }
                            })
                        }
                    },
                    ha: function(t) {
                        var e = F.XMLHttpRequest && new F.XMLHttpRequest;
                        if (e) {
                            if ("withCredentials" in e || "undefined" != typeof XDomainRequest) {
                                var r = t.url;
                                "withCredentials" in e ? e.onreadystatechange = function() {
                                    if (4 === e.readyState)
                                        if (200 === e.status) t.onSuccess && t.onSuccess();
                                        else if (t.onError) {
                                        var r = new Error("Sentry error code: " + e.status);
                                        r.request = e, t.onError(r)
                                    }
                                } : (e = new XDomainRequest, r = r.replace(/^https?:/, ""), t.onSuccess && (e.onload = t.onSuccess), t.onError && (e.onerror = function() {
                                    var r = new Error("Sentry error code: XDomainRequest");
                                    r.request = e, t.onError(r)
                                })), e.open("POST", r + "?" + E(t.auth)), e.send(s(t.data))
                            }
                        }
                    },
                    y: function(t) {
                        this.p[t] && this.debug && Function.prototype.apply.call(this.p[t], this.o, [].slice.call(arguments, 1))
                    },
                    Q: function(t, e) {
                        p(e) ? delete this.j[t] : this.j[t] = y(this.j[t] || {}, e)
                    }
                }, a.prototype.setUser = a.prototype.setUserContext, a.prototype.setReleaseContext = a.prototype.setRelease, e.exports = a
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            1: 1,
            2: 2,
            5: 5,
            6: 6,
            7: 7
        }],
        4: [function(t, e) {
            (function(r) {
                var n = t(3),
                    i = "undefined" != typeof window ? window : void 0 !== r ? r : "undefined" != typeof self ? self : {},
                    a = i.Raven,
                    o = new n;
                o.noConflict = function() {
                    return i.Raven = a, o
                }, o.afterLoad(), e.exports = o
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            3: 3
        }],
        5: [function(t, e) {
            (function(t) {
                function r(t) {
                    return "object" == typeof t && null !== t
                }

                function n(t) {
                    switch ({}.toString.call(t)) {
                        case "[object Error]":
                        case "[object Exception]":
                        case "[object DOMException]":
                            return !0;
                        default:
                            return t instanceof Error
                    }
                }

                function i(t) {
                    return c() && "[object ErrorEvent]" === {}.toString.call(t)
                }

                function a(t) {
                    return void 0 === t
                }

                function o(t) {
                    return "function" == typeof t
                }

                function s(t) {
                    return "[object String]" === Object.prototype.toString.call(t)
                }

                function u(t) {
                    for (var e in t) return !1;
                    return !0
                }

                function c() {
                    try {
                        return new ErrorEvent(""), !0
                    } catch (t) {
                        return !1
                    }
                }

                function l(t) {
                    function e(e, r) {
                        var n = t(e) || e;
                        return r ? r(n) || n : n
                    }
                    return e
                }

                function f(t, e) {
                    var r, n;
                    if (a(t.length))
                        for (r in t) v(t, r) && e.call(null, r, t[r]);
                    else if (n = t.length)
                        for (r = 0; r < n; r++) e.call(null, r, t[r])
                }

                function h(t, e) {
                    return e ? (f(e, function(e, r) {
                        t[e] = r
                    }), t) : t
                }

                function p(t) {
                    return !!Object.isFrozen && Object.isFrozen(t)
                }

                function d(t, e) {
                    return !e || t.length <= e ? t : t.substr(0, e) + "\u2026"
                }

                function v(t, e) {
                    return Object.prototype.hasOwnProperty.call(t, e)
                }

                function m(t) {
                    for (var e, r = [], n = 0, i = t.length; n < i; n++) e = t[n], s(e) ? r.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : e && e.source && r.push(e.source);
                    return new RegExp(r.join("|"), "i")
                }

                function g(t) {
                    var e = [];
                    return f(t, function(t, r) {
                        e.push(encodeURIComponent(t) + "=" + encodeURIComponent(r))
                    }), e.join("&")
                }

                function y(t) {
                    var e = t.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
                    if (!e) return {};
                    var r = e[6] || "",
                        n = e[8] || "";
                    return {
                        protocol: e[2],
                        host: e[4],
                        path: e[5],
                        relative: e[5] + r + n
                    }
                }

                function b() {
                    var t = j.crypto || j.msCrypto;
                    if (!a(t) && t.getRandomValues) {
                        var e = new Uint16Array(8);
                        t.getRandomValues(e), e[3] = 4095 & e[3] | 16384, e[4] = 16383 & e[4] | 32768;
                        var r = function(t) {
                            for (var e = t.toString(16); e.length < 4;) e = "0" + e;
                            return e
                        };
                        return r(e[0]) + r(e[1]) + r(e[2]) + r(e[3]) + r(e[4]) + r(e[5]) + r(e[6]) + r(e[7])
                    }
                    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                        var e = 16 * Math.random() | 0;
                        return ("x" === t ? e : 3 & e | 8).toString(16)
                    })
                }

                function k(t) {
                    for (var e, r = 5, n = 80, i = [], a = 0, o = 0, s = " > ", u = s.length; t && a++ < r && !("html" === (e = w(t)) || a > 1 && o + i.length * u + e.length >= n);) i.push(e), o += e.length, t = t.parentNode;
                    return i.reverse().join(s)
                }

                function w(t) {
                    var e, r, n, i, a, o = [];
                    if (!t || !t.tagName) return "";
                    if (o.push(t.tagName.toLowerCase()), t.id && o.push("#" + t.id), (e = t.className) && s(e))
                        for (r = e.split(/\s+/), a = 0; a < r.length; a++) o.push("." + r[a]);
                    var u = ["type", "name", "title", "alt"];
                    for (a = 0; a < u.length; a++) n = u[a], (i = t.getAttribute(n)) && o.push("[" + n + '="' + i + '"]');
                    return o.join("")
                }

                function x(t, e) {
                    return !!(!!t ^ !!e)
                }

                function E(t, e) {
                    return !x(t, e) && (t = t.values[0], e = e.values[0], t.type === e.type && t.value === e.value && S(t.stacktrace, e.stacktrace))
                }

                function S(t, e) {
                    if (x(t, e)) return !1;
                    var r = t.frames,
                        n = e.frames;
                    if (r.length !== n.length) return !1;
                    for (var i, a, o = 0; o < r.length; o++)
                        if (i = r[o], a = n[o], i.filename !== a.filename || i.lineno !== a.lineno || i.colno !== a.colno || i["function"] !== a["function"]) return !1;
                    return !0
                }

                function R(t, e, r, n) {
                    var i = t[e];
                    t[e] = r(i), n && n.push([t, e, i])
                }
                var j = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {};
                e.exports = {
                    isObject: r,
                    isError: n,
                    isErrorEvent: i,
                    isUndefined: a,
                    isFunction: o,
                    isString: s,
                    isEmptyObject: u,
                    supportsErrorEvent: c,
                    wrappedCallback: l,
                    each: f,
                    objectMerge: h,
                    truncate: d,
                    objectFrozen: p,
                    hasKey: v,
                    joinRegExp: m,
                    urlencode: g,
                    uuid4: b,
                    htmlTreeAsString: k,
                    htmlElementAsString: w,
                    isSameException: E,
                    isSameStacktrace: S,
                    parseUrl: y,
                    fill: R
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        6: [function(t, e) {
            (function(r) {
                function n() {
                    return "undefined" == typeof document || null == document.location ? "" : document.location.href
                }
                var i = t(5),
                    a = {
                        collectWindowErrors: !0,
                        debug: !1
                    },
                    o = "undefined" != typeof window ? window : void 0 !== r ? r : "undefined" != typeof self ? self : {},
                    s = [].slice,
                    u = "?",
                    c = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
                a.report = function() {
                    function t(t) {
                        h(), y.push(t)
                    }

                    function e(t) {
                        for (var e = y.length - 1; e >= 0; --e) y[e] === t && y.splice(e, 1)
                    }

                    function r() {
                        p(), y = []
                    }

                    function l(t, e) {
                        var r = null;
                        if (!e || a.collectWindowErrors) {
                            for (var n in y)
                                if (y.hasOwnProperty(n)) try {
                                    y[n].apply(null, [t].concat(s.call(arguments, 2)))
                                } catch (t) {
                                    r = t
                                }
                                if (r) throw r
                        }
                    }

                    function f(t, e, r, o, s) {
                        var f = null;
                        if (w) a.computeStackTrace.augmentStackTraceWithInitialElement(w, e, r, t), d();
                        else if (s && i.isError(s)) f = a.computeStackTrace(s), l(f, !0);
                        else {
                            var h, p = {
                                    url: e,
                                    line: r,
                                    column: o
                                },
                                v = void 0,
                                g = t;
                            if ("[object String]" === {}.toString.call(t)) {
                                var h = t.match(c);
                                h && (v = h[1], g = h[2])
                            }
                            p.func = u, f = {
                                name: v,
                                message: g,
                                url: n(),
                                stack: [p]
                            }, l(f, !0)
                        }
                        return !!m && m.apply(this, arguments)
                    }

                    function h() {
                        g || (m = o.onerror, o.onerror = f, g = !0)
                    }

                    function p() {
                        g && (o.onerror = m, g = !1, m = void 0)
                    }

                    function d() {
                        var t = w,
                            e = b;
                        b = null, w = null, k = null, l.apply(null, [t, !1].concat(e))
                    }

                    function v(t, e) {
                        var r = s.call(arguments, 1);
                        if (w) {
                            if (k === t) return;
                            d()
                        }
                        var n = a.computeStackTrace(t);
                        if (w = n, k = t, b = r, setTimeout(function() {
                                k === t && d()
                            }, n.incomplete ? 2e3 : 0), !1 !== e) throw t
                    }
                    var m, g, y = [],
                        b = null,
                        k = null,
                        w = null;
                    return v.subscribe = t, v.unsubscribe = e, v.uninstall = r, v
                }(), a.computeStackTrace = function() {
                    function t(t) {
                        if ("undefined" != typeof t.stack && t.stack) {
                            for (var e, r, i, a = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, o = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, s = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, c = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, l = /\((\S*)(?::(\d+))(?::(\d+))\)/, f = t.stack.split("\n"), h = [], p = (/^(.*) is undefined$/.exec(t.message), 0), d = f.length; p < d; ++p) {
                                if (r = a.exec(f[p])) {
                                    var v = r[2] && 0 === r[2].indexOf("native"),
                                        m = r[2] && 0 === r[2].indexOf("eval");
                                    m && (e = l.exec(r[2])) && (r[2] = e[1], r[3] = e[2], r[4] = e[3]), i = {
                                        url: v ? null : r[2],
                                        func: r[1] || u,
                                        args: v ? [r[2]] : [],
                                        line: r[3] ? +r[3] : null,
                                        column: r[4] ? +r[4] : null
                                    }
                                } else if (r = s.exec(f[p])) i = {
                                    url: r[2],
                                    func: r[1] || u,
                                    args: [],
                                    line: +r[3],
                                    column: r[4] ? +r[4] : null
                                };
                                else {
                                    if (!(r = o.exec(f[p]))) continue;
                                    var m = r[3] && r[3].indexOf(" > eval") > -1;
                                    m && (e = c.exec(r[3])) ? (r[3] = e[1], r[4] = e[2], r[5] = null) : 0 !== p || r[5] || "undefined" == typeof t.columnNumber || (h[0].column = t.columnNumber + 1), i = {
                                        url: r[3],
                                        func: r[1] || u,
                                        args: r[2] ? r[2].split(",") : [],
                                        line: r[4] ? +r[4] : null,
                                        column: r[5] ? +r[5] : null
                                    }
                                }!i.func && i.line && (i.func = u), h.push(i)
                            }
                            return h.length ? {
                                name: t.name,
                                message: t.message,
                                url: n(),
                                stack: h
                            } : null
                        }
                    }

                    function e(t, e, r) {
                        var n = {
                            url: e,
                            line: r
                        };
                        if (n.url && n.line) {
                            if (t.incomplete = !1, n.func || (n.func = u), t.stack.length > 0 && t.stack[0].url === n.url) {
                                if (t.stack[0].line === n.line) return !1;
                                if (!t.stack[0].line && t.stack[0].func === n.func) return t.stack[0].line = n.line, !1
                            }
                            return t.stack.unshift(n), t.partial = !0, !0
                        }
                        return t.incomplete = !0, !1
                    }

                    function r(t, o) {
                        for (var s, c, l = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, f = [], h = {}, p = !1, d = r.caller; d && !p; d = d.caller)
                            if (d !== i && d !== a.report) {
                                if (c = {
                                        url: null,
                                        func: u,
                                        line: null,
                                        column: null
                                    }, d.name ? c.func = d.name : (s = l.exec(d.toString())) && (c.func = s[1]), "undefined" == typeof c.func) try {
                                    c.func = s.input.substring(0, s.input.indexOf("{"))
                                } catch (t) {}
                                h["" + d] ? p = !0 : h["" + d] = !0, f.push(c)
                            }
                        o && f.splice(0, o);
                        var v = {
                            name: t.name,
                            message: t.message,
                            url: n(),
                            stack: f
                        };
                        return e(v, t.sourceURL || t.fileName, t.line || t.lineNumber, t.message || t.description), v
                    }

                    function i(e, i) {
                        var o = null;
                        i = null == i ? 0 : +i;
                        try {
                            if (o = t(e)) return o
                        } catch (t) {
                            if (a.debug) throw t
                        }
                        try {
                            if (o = r(e, i + 1)) return o
                        } catch (t) {
                            if (a.debug) throw t
                        }
                        return {
                            name: e.name,
                            message: e.message,
                            url: n()
                        }
                    }
                    return i.augmentStackTraceWithInitialElement = e, i.computeStackTraceFromStackProp = t, i
                }(), e.exports = a
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            5: 5
        }],
        7: [function(t, e, r) {
            function n(t, e) {
                for (var r = 0; r < t.length; ++r)
                    if (t[r] === e) return r;
                return -1
            }

            function i(t, e, r, n) {
                return JSON.stringify(t, o(e, n), r)
            }

            function a(t) {
                var e = {
                    stack: t.stack,
                    message: t.message,
                    name: t.name
                };
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }

            function o(t, e) {
                var r = [],
                    i = [];
                return null == e && (e = function(t, e) {
                        return r[0] === e ? "[Circular ~]" : "[Circular ~." + i.slice(0, n(r, e)).join(".") + "]"
                    }),
                    function(o, s) {
                        if (r.length > 0) {
                            var u = n(r, this);
                            ~u ? r.splice(u + 1) : r.push(this), ~u ? i.splice(u, 1 / 0, o) : i.push(o), ~n(r, s) && (s = e.call(this, o, s))
                        } else r.push(s);
                        return null == t ? s instanceof Error ? a(s) : s : t.call(this, o, s)
                    }
            }
            r = e.exports = i, r.getSerialize = o
        }, {}]
    }, {}, [4])(4)
});