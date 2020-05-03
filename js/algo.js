function MySimpleMap() {
    this.size = 0, this.store = {}
}

function memoize(e) {
    var t = {};
    return function() {
        var n = arguments[0];
        if (t[n]) return t[n];
        var a = e.apply(this, arguments);
        return t[n] = a, a
    }
}

function copyDataset(e, t) {
    for (var n in t.dataset) e.dataset[n] = t.dataset[n]
}

function toBase64URL(e, t) {
    if (!pfData.userSettings.encodeImages || e.startsWith("data:")) return t(e);
    var n = new XMLHttpRequest;
    n.onload = function() {
        var e = new FileReader;
        e.onloadend = function() {
            t(e.result)
        }, e.readAsDataURL(n.response)
    }, n.onerror = function() {
        t(e)
    }, n.open("GET", e), n.responseType = "blob", n.send()
}
Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(e) {
    for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t.item(n) !== this;);
    return n > -1
}), String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
    return t = !t || t < 0 ? 0 : +t, this.substring(t, t + e.length) === e
});
var logger = function() {
        var e = {
            init: function(t) {
                $.each(["log", "error", "time", "timeEnd"], function(n, a) {
                    "development" === t.config.environment ? e[a] = Function.prototype.bind.call(console[a], console) : e[a] = $.noop
                })
            }
        };
        return e
    }(),
    commonUtils = {
        getImageWidth: function(e, t) {
            e.jquery && (e = e[0]);
            var n = null;
            if (t) {
                var a = e.getAttribute("pf-data-width");
                a && (n = parseInt(a, 10))
            } else e.dataset.pf_rect_width && (n = parseInt(e.dataset.pf_rect_width, 10));
            return null === n && (n = e.getBoundingClientRect().width), n
        },
        getImageHeight: function(e, t) {
            e.jquery && (e = e[0]);
            var n = null;
            if (t) {
                var a = e.getAttribute("pf-data-height");
                a && (n = parseInt(a, 10))
            } else e.dataset.pf_rect_height && (n = parseInt(e.dataset.pf_rect_height, 10));
            return null === n && (n = e.getBoundingClientRect().height), n
        },
        getTopWrapper: function(e) {
            var t = e.parentNode;
            return t.childNodes.length > 1 ? e : this.getTopWrapper(t)
        },
        isDeletableElement: function() {
            return function(e) {
                return !e.classList.contains("non-delete") && (e.matches("small, footer, header, aside, details, dialog, figure, nav, summary, twitter-widget, p, img, blockquote, h1, h2, h3, h4, h5, h6, ol, ul, li, a, table, td, pre, span, code, dl, dt, dd, hr, div.pf-caption, video, figcaption, data") || $(e).find("*:visible").length <= 15)
            }
        }(),
        resizeImageCssClass: function(e) {
            return "pf-size-" + e.replace("-size", "").replace("-images", "")
        },
        addCSS: function(e, t, n) {
            var a = n ? "body" : "head",
                i = t.getElementsByTagName(a)[0],
                r = t.createElement("style");
            r.type = "text/css", r.setAttribute("name", "pf-style"), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(t.createTextNode(e)), i.appendChild(r)
        },
        createIframe: function(e) {
            var t = e.createElement("iframe");
            return t.frameBorder = "0", t.allowTransparency = "true", t
        },
        loadHtmlInIframe: function(e, t, n) {
            var a, i;
            try {
                i = t.contentWindow.document
            } catch (n) {
                a = e.domain, t.src = "javascript:var d=document.open();d.domain='" + a + "';void(0);", i = t.contentWindow.document
            }
            i.write(n), i.close()
        }
    },
    analytics = function() {
        var e = null;
        return {
            setCoreWindow: function(t) {
                e = t
            },
            sendEvent: function(t, n, a) {
                e.postMessage({
                    type: "PfGaEvent",
                    payload: {
                        category: t,
                        action: n,
                        label: a
                    }
                }, "*")
            }
        }
    }(),
    exTracker = function() {
        function e() {
            return "production" === f.environment
        }

        function t() {
            return "development" === f.environment
        }

        function n() {
            return !!l.Raven
        }

        function a() {
            try {
                l.frames["pf-core"] && l.frames["pf-core"].document && (l = l.frames["pf-core"], d = l.document)
            } catch (e) {}
        }

        function i() {
            if (p) return !0;
            if (p = !0, a(), null === d) return !1;
            var e = d.createElement("script"),
                t = d.getElementsByTagName("script")[0];
            e.src = this.config.urls.js.raven, t.parentNode.appendChild(e), r()
        }

        function r() {
            if (!n()) return setTimeout(r, 100);
            s(), o()
        }

        function o() {
            for (var e = 0, t = m.length; e < t; e++) {
                var n = m[e];
                c(n.err, n.opts)
            }
        }

        function s() {
            var e = {
                dataCallback: function(e) {
                    try {
                        var t = e.stacktrace.frames[0];
                        t.filename.match(g) && "onload" !== t["function"] || e.stacktrace.frames.shift()
                    } catch (e) {}
                    return e
                },
                shouldSendCallback: function(e) {
                    return !!(e && e.extra && e.extra.file)
                },
                release: h
            };
            l.Raven.config(f.hosts.ravenDsn, e).install()
        }

        function c(t, n) {
            n = n ? {
                file: n.file
            } : {
                file: "printfriendly.js"
            }, n.usingBM = f.usingBM, n.url = f.urls.page, e() && l.Raven.captureException(t, {
                extra: n
            })
        }
        var l = window.top,
            d = null,
            p = !1,
            g = /d3nekkt1lmmhms|printfriendly\.com|printnicer\.com|algo\.js|printfriendly\.js|core\.js/,
            m = [],
            u = [],
            f = {},
            h = null;
        return {
            init: function(e, t) {
                f = e.config, h = e.version, "production" !== e.config.environment || e.onServer ? t() : Raven.context(t)
            },
            log: function(e, a) {
                t() && (console.error(e), console.error(e.stack)), a = a || {
                    file: "printfriendly.js"
                };
                try {
                    n() ? c(e, a) : (m.push({
                        err: e,
                        opts: a
                    }), i(), u.push(e.name + " : " + e.message), u.push(e.stack))
                } catch (e) {}
            }
        }
    }();
MySimpleMap.prototype.get = function(e) {
    return this.store[e]
}, MySimpleMap.prototype.set = function(e, t) {
    this.store[e] === undefined && this.size++, this.store[e] = t
};
var commonScore = function() {
        function e(e) {
            e = e || {};
            var t = e.words || new MySimpleMap,
                n = e.links || new MySimpleMap;
            return {
                words: t,
                links: n,
                uniqWordsCount: t.size,
                uniqLinksCount: n.size,
                tagsCount: e.tagsCount || 0,
                hasContentTag: e.hasContentTag || !1,
                hasTable: e.hasTable || !1
            }
        }

        function t(t) {
            for (var n = new MySimpleMap, a = sliceWordsService(t), i = 0, r = a.length; i < r; i++) {
                var o = a[i];
                n.set(o, (n.get(o) || 0) + 1)
            }
            return e({
                words: n
            })
        }

        function n(t) {
            var n = t.match(s),
                a = new MySimpleMap;
            return n && a.set(n[2].toLowerCase(), 1), e({
                links: a
            })
        }

        function a(e, t, n) {
            var a = new MySimpleMap,
                i = e[n].store,
                r = t[n].store;
            for (var o in i) a.set(o, i[o]);
            for (var s in r) a.set(s, (a.get(s) || 0) + r[s]);
            return a
        }

        function i(e, t) {
            e.words = a(e, t, "words"), e.links = a(e, t, "links"), e.uniqLinksCount = e.links.size, e.uniqWordsCount = e.words.size, e.hasContentTag = e.hasContentTag || t.hasContentTag, e.hasTable = e.hasTable || t.hasTable, e.tagsCount += t.tagsCount
        }

        function r(a) {
            if (a.node.nodeType === Node.TEXT_NODE && isContentNodeHelperService(a.node.parentNode)) return t(a.node.textContent);
            var r = mergeChildrenScoreHelperService(a, o, e(), i);
            switch (r.hasContentTag = r.hasContentTag || a.nameMatches(c), r.hasTable = r.hasTable || a.hasTagName("table"), r.tagsCount++, a.node.nodeName) {
                case "IMG":
                    var s = a.node.getAttribute("alt"),
                        l = a.node.getAttribute("src");
                    s && i(r, t(s)), l && i(r, n(l));
                    break;
                case "A":
                    var d = a.node.getAttribute("title"),
                        p = a.node.getAttribute("href");
                    d && i(r, t(d)), p && i(r, n(p))
            }
            return r
        }
        var o = "common",
            s = /^https?:\/\/([^\.?]+\.)*([^\.?]+\.[^\.\/?]+)\//,
            c = /article|main|body|content/i;
        return function(e) {
            e.registerScoreFunction(o, r)
        }
    }(),
    doubleBrClassifier = function() {
        function e(e) {
            return e.node.tagName === n || !(0 !== e.scores.common.words.size || !$(e.node).find("br").length)
        }

        function t(t) {
            var n = [],
                a = null,
                i = 0;
            t.forEachChild(function(t, r) {
                e(t) ? (0 === i && (a = r), i++) : i >= 2 ? (n.push([a, r]), i = 0) : i = 0
            }), i >= 2 && n.push([a, t.children.length - 1]);
            for (var r = 0, o = 0, s = n.length; o < s; o++) {
                var c = n[o],
                    l = document.createElement("p");
                l.className = "pf-br-replacement";
                for (var d = r; d < c[0]; d++) {
                    var p = t.children[d];
                    p.node && p.node.parentNode && (l.parentNode || p.node.parentNode.replaceChild(l, p.node), l.appendChild(p.node))
                }
                for (var g = c[0]; g < c[1]; g++) t.children[g].remove();
                r = c[1]
            }
        }
        var n = "BR";
        return function(e) {
            e.registerBehaviorFunction(t)
        }
    }(),
    headerFooterClassifier = function() {
        function e(e) {
            return e = e || {}, {
                contentPoints: e.contentPoints || 0,
                headerPoints: e.headerPoints || 0,
                footerPoints: e.footerPoints || 0
            }
        }

        function t(e) {
            return e.scores[p]
        }

        function n(e) {
            var t = e.scores.common.uniqWordsCount;
            return e.scores.common.hasContentTag && (t += h), t
        }

        function a(e, t, n) {
            var a = 0;
            return e.hasTagName(t) ? a = C.TAG_MATCH : e.hasId(t) ? a = C.ID_MATCH : e.hasClass(t) ? a = C.CLASS_MATCH : e.nameMatches(n) && (a = C.PARTIAL_REGEXP_MATCH), a
        }

        function i(e) {
            var n = null,
                a = 0;
            return e.forEachChild(function(e) {
                var i = t(e);
                a < i.contentPoints && (n = e, a = i.contentPoints)
            }), n
        }

        function r(e, n) {
            for (var a = null, i = 0, r = e.children.length; i < r; i++) {
                var o = e.children[i];
                if (!(t(o)[n] <= 0)) {
                    if (a) return null;
                    a = o
                }
            }
            return a
        }

        function o(e) {
            return r(e, "headerPoints")
        }

        function s(e) {
            return r(e, "footerPoints")
        }

        function c(t) {
            return e({
                headerPoints: a(t, m, g),
                footerPoints: a(t, u, f),
                contentPoints: n(t)
            })
        }

        function l(e) {
            var t = e.node.tagName;
            return e.scores.common.hasTable || v.indexOf(t) >= 0
        }

        function d(e) {
            if (!(e.node.tagName && b.indexOf(e.node.tagName) >= 0)) {
                var t = i(e);
                if (t) {
                    var n = o(e),
                        a = s(e);
                    n && t !== n && n.scores.common.tagsCount > y && !l(n) && n.remove(), a && t !== a && a.scores.common.tagsCount > y && a.remove()
                }
            }
        }
        var p = "header_footer",
            g = /head/i,
            m = "header",
            u = "footer",
            f = /foot/i,
            h = 1e6,
            y = 3,
            v = ["TABLE", "THEAD", "TBODY", "TR", "TH"],
            b = ["H1", "H2", "H3", "H4", "H5", "H6"],
            C = {
                TAG_MATCH: 4,
                ID_MATCH: 3,
                CLASS_MATCH: 2,
                PARTIAL_REGEXP_MATCH: 1
            };
        return function(e) {
            e.registerScoreFunction(p, c), e.registerBehaviorFunction(d)
        }
    }(),
    mustKeepClassifier = function() {
        function e(e) {
            if (e.nameMatches(t)) return void e.keep()
        }
        var t = /copyright|delete-no|delete-off|pf-author|print-content|pf-date|pf-title|pf-footer|print-header|print-footer|print-only|print-yes|pf-content/i;
        return function(t) {
            t.registerMarkFunction(e)
        }
    }(),
    relatedArticlesClassifier = function() {
        function e(e) {
            return e = e || {}, {
                wordsCount: e.wordsCount || 0,
                insideLinkWordsCount: e.insideLinkWordsCount || 0,
                contentTagsCount: e.contentTagsCount || 0,
                imgTagsCount: e.imgTagsCount || 0,
                aTagsCount: e.aTagsCount || 0,
                hasLongTextNode: e.hasLongTextNode || !1,
                isDataTag: e.isDataTag || !1,
                hasIgnoreClasses: e.hasIgnoreClasses || !1,
                hasInlineLink: e.hasInlineLink || !1,
                isInlineLink: e.isInlineLink || !1
            }
        }

        function t(e, t) {
            e.wordsCount += t.wordsCount, e.insideLinkWordsCount += t.insideLinkWordsCount, e.contentTagsCount += t.contentTagsCount, e.aTagsCount += t.aTagsCount, e.imgTagsCount += t.imgTagsCount, e.hasLongTextNode = e.hasLongTextNode || t.hasLongTextNode, e.hasIgnoreClasses = e.hasIgnoreClasses || t.hasIgnoreClasses, e.hasInlineLink = e.hasInlineLink || t.hasInlineLink
        }

        function n(e) {
            var t = e.scores[d];
            return t.wordsCount !== t.insideLinkWordsCount && (e.node.nodeType === Node.TEXT_NODE || "inline" === e.node.dataset.pf_style_display)
        }

        function a(e) {
            var t = !1;
            return e.forEachChild(function(e) {
                if (e.scores[d].isInlineLink) return t = !0, DomScorerModifier.Intents.BREAK
            }), t && !i(e)
        }

        function i(e) {
            var t = e.node.textContent;
            return !!$.trim(t).match(v)
        }

        function r(e) {
            for (var t = null, a = e.prev; a;) {
                if ($.trim(a.node.textContent)) {
                    t = a;
                    break
                }
                a = a.prev
            }
            return !(!t || !n(t))
        }

        function o(e, t) {
            for (var n = null, a = t.getDepthLayer(), i = 0, r = 0, o = a.length; r < o; r++) {
                var s = a[r];
                s.node && (s === t && (n = i), e.contains(s.node) && i++)
            }
            var c = Math.ceil(i * b),
                l = Math.floor(i - i * b);
            return n <= c || n >= l
        }

        function s(n) {
            if ((n.node.nodeType === Node.TEXT_NODE || "P" === n.node.nodeName) && isContentNodeHelperService(n.node.parentNode)) {
                var o = n.node.textContent;
                if (i(n)) return e();
                var s = sliceWordsService(o).length;
                return e({
                    wordsCount: s,
                    hasLongTextNode: s >= m
                })
            }
            var c = mergeChildrenScoreHelperService(n, d, e(), t),
                p = n.node.nodeName;
            switch (p) {
                case "A":
                    n.node.getAttribute("href") && "author" !== n.node.getAttribute("rel") && (c.aTagsCount++, c.insideLinkWordsCount = c.wordsCount, c.hasLongTextNode = !1, c.isInlineLink = r(n));
                    break;
                case "IMG":
                    c.imgTagsCount++
            }
            return c.wordsCount > 0 && c.wordsCount > c.insideLinkWordsCount && isContentNodeHelperService(n.node) && n.node.parentNode.childElementCount > 1 && c.contentTagsCount++, l[p] && (c.isDataTag = !0, c.insideLinkWordsCount = 0, c.aTagsCount = 0, c.imgTagsCount = 0), n.nameMatches(y) && (c.hasIgnoreClasses = !0), c.hasInlineLink = c.hasInlineLink || a(n), c
        }

        function c(e, t) {
            var n = e.scores.common;
            if (!(n.tagsCount > u || n.hasContentTag && n.uniqWordsCount > 200 || t.candidate && t.candidate.contains(e.node) && !o(t.candidate, e))) {
                var a = e.scores[d];
                if (a.isDataTag) return DomScorerModifier.Intents.BREAK_TRAVERSAL;
                if (!(a.hasInlineLink || a.hasIgnoreClasses || a.contentTagsCount > h && n.uniqWordsCount > 100 || a.wordsCount < 5 || a.aTagsCount < 2 || 1 === a.imgTagsCount || a.hasLongTextNode)) {
                    if (a.imgTagsCount / a.aTagsCount < f) {
                        if ((a.insideLinkWordsCount / a.wordsCount || 0) >= p) return e.remove(), DomScorerModifier.Intents.BREAK_TRAVERSAL;
                        return (a.aTagsCount + a.imgTagsCount) / a.contentTagsCount >= g ? (e.remove(), DomScorerModifier.Intents.BREAK_TRAVERSAL) : void 0
                    }
                }
            }
        }
        var l = {
                TABLE: !0,
                TR: !0,
                TD: !0
            },
            d = "relatedArticle",
            p = .5,
            g = .5,
            m = 25,
            u = 100,
            f = 2.5,
            h = 25,
            y = /gallery/i,
            v = /(\.{3,}|\u2026)$/,
            b = .2;
        return function(e) {
            e.registerScoreFunction(d, s), e.registerBehaviorFunction(c, "after")
        }
    }(),
    socialShareClassifier = function() {
        function e(e) {
            return e = e || {}, {
                imgsCount: e.imgsCount || 0,
                aCount: e.aCount || 0,
                hasShareClass: e.hasShareClass || !1,
                hasShareImage: e.hasShareImage || !1
            }
        }

        function t(e, t) {
            e.imgsCount += t.imgsCount, e.aCount += t.aCount, e.hasShareImage = e.hasShareImage || t.hasShareImage
        }

        function n(e) {
            if (e.node.nodeType !== Node.ELEMENT_NODE) return !1;
            var t = e.node.getAttribute("class");
            return !(!t || !t.match(l))
        }

        function a(e) {
            if ("IMG" !== e.node.tagName) return !1;
            for (var t = e.node.nextElementSibling; t;) {
                if ($(t).find("a").length > 1) return !0;
                t = t.nextElementSibling
            }
            return !1
        }

        function i(i) {
            var r = e({
                    hasShareClass: n(i),
                    hasShareImage: a(i)
                }),
                o = mergeChildrenScoreHelperService(i, u, r, t);
            switch (i.node.nodeName) {
                case "IMG":
                    o.imgsCount++;
                    break;
                case "A":
                    o.aCount++
            }
            return o.hasShareClass = n(i), o
        }

        function r(e) {
            var t = 0;
            for (var n in e) "number" == typeof e[n] && (t += e[n]);
            return t
        }

        function o(e, t) {
            for (var n = 0, a = 0, i = 0, o = e.length; i < o; i++) {
                var s = e[i],
                    c = t.get(s);
                c && (a++, n += c)
            }
            var l = r(t.store);
            return {
                relatedCount: n,
                totalCount: l,
                relatedUniqCount: a,
                totalUniqCount: t.size,
                ratio: n / l || 0
            }
        }

        function s(e) {
            var t = e.scores[u];
            if (t.hasShareImage) return 0;
            if (t.hasShareClass) return 1;
            var n = o(d, e.scores.common.words);
            if (n.totalUniqCount > m) return 0;
            var a = o(p, e.scores.common.links);
            return 2 * (n.relatedUniqCount > 1 ? n.ratio : 0) + (a.relatedUniqCount > 1 ? a.ratio : 0)
        }

        function c(e) {
            if (!e.children.length) return DomScorerModifier.Intents.DO_NOTHING;
            var t = e.node.getAttribute("class") || "",
                n = e.node.tagName;
            return "TWITTER-WIDGET" === n || "BLOCKQUOTE" === n && t.indexOf("twitter-tweet") >= 0 ? (e.keep(), DomScorerModifier.Intents.BREAK_TRAVERSAL) : s(e) > g ? (e.remove(), DomScorerModifier.Intents.BREAK_TRAVERSAL) : void 0
        }
        var l = /fb-like|socializer-share-bar|PIN_\d+/g,
            d = ["facebook", "google", "stumbleupon", "reddit", "pinterest", "printfriendly", "yum", "twitter", "tweet", "linkedin", "share", "shares", "print", "tumblr", "rss", "youtube", "social"],
            p = ["twitter.com", "facebook.com", "reddit.com", "myspace.com", "stumbleupon.com", "mix.com", "mixx.com", "viadeo.com", "yummly.com", "addthis.com", "google.com", "pinterest.com", "printfriendly.com", "mailto:", "tumblr.com", "linkedin.co", "digg.com", "whatsapp.com", "vk.com", "weibo.com", "ok.ru", "odnoklassniki.ru", "xing.com", "blogger.com", "flipboard.com", "meneame.net", "mail.ru", "icio.us", "livejournal.com", "delicious.com", "youtube.com"],
            g = .3,
            m = 25,
            u = "shareScore";
        return function(e) {
            e.registerScoreFunction(u, i), e.registerBehaviorFunction(c)
        }
    }(),
    DomScorerModifier = function() {
        function e(e) {
            return e.nodeType === Node.TEXT_NODE && !$.trim(e.textContent)
        }

        function t(e) {
            this.node = e.node, this.node[l] = this, this.parent = e.parent, this.tree = e.tree, this.depth = e.depth || 0, this.scores = {}, this.skipped = !1, this.keptChildren = [], this.children = [], this.prev = e.prev || null, this.next = null
        }

        function n(e) {
            e.parent && (e.skipped = !0)
        }

        function a(e, t) {
            for (var n = e; n;) n.keptChildren.push(t), n = n.parent
        }

        function i(e, t, n) {
            e.parent = t;
            var a = e.node;
            e.node.parentNode && !e.node.parentNode[l] && (a = e.node.parentNode), n.appendChild(a)
        }

        function r(n) {
            this.root = new t({
                tree: this,
                node: n
            });
            for (var a = [this.root], i = null; i = a.shift();)
                for (var r = null, o = 0, s = i.node.childNodes.length; o < s; o++) {
                    var c = i.node.childNodes[o];
                    if (!e(c) && c.nodeType !== Node.COMMENT_NODE && "SCRIPT" !== c.tagName) {
                        var l = new t({
                            tree: i.tree,
                            parent: i,
                            node: c,
                            depth: i.depth + 1,
                            prev: r
                        });
                        r && (r.next = l), r = l, i.children.push(l), a.push(l)
                    }
                }
        }

        function o() {
            this.tree = new r(document.body), this.scoreFunctions = {}, this.markFunctions = [], this.behaviorFunctions = {
                before: [],
                after: []
            }
        }

        function s(e) {
            e.tree.postOrderTraversal(function(t) {
                for (var n = 0, a = e.markFunctions.length; n < a; n++) e.markFunctions[n](t);
                for (var i in e.scoreFunctions) {
                    var r = e.scoreFunctions[i];
                    t.scores[i] = r(t)
                }
            })
        }

        function c(e, t, n) {
            e.tree.preOrderTraversalWithElementSkip(function(a) {
                for (var i = 0, r = e.behaviorFunctions[t].length; i < r; i++) {
                    if ((0, e.behaviorFunctions[t][i])(a, n) === d.BREAK_TRAVERSAL) return d.BREAK_TRAVERSAL
                }
            })
        }
        var l = "__DOM_SCORER_ELEMENT__",
            d = {
                DO_NOTHING: "DO_NOTHING",
                BREAK_TRAVERSAL: "BREAK_TRAVERSAL",
                BREAK: "BREAK"
            };
        return t.prototype.hasId = function(e) {
            return !!this.isElement() && (this.node.getAttribute("id") || "").split(/\s/).indexOf(e) >= 0
        }, t.prototype.hasClass = function(e) {
            return !!this.isElement() && (this.node.getAttribute("class") || "").split(/\s/).indexOf(e) >= 0
        }, t.prototype.hasTagName = function(e) {
            return !!this.isElement() && this.node.tagName.toLowerCase() === e.toLowerCase()
        }, t.prototype.nameMatches = function(e) {
            if (!this.isElement()) return !1;
            var t = this.node.getAttribute("id") || "",
                n = this.node.getAttribute("class") || "";
            return !![this.node.tagName, t, n].join(" ").match(e)
        }, t.prototype.isElement = function() {
            return this.node.nodeType === Node.ELEMENT_NODE
        }, t.prototype.forEachChild = function(e) {
            for (var t = 0, n = this.children.length; t < n && (this.children[t].skipped || e(this.children[t], t) !== d.BREAK); t++);
        }, t.prototype.keep = function() {
            n(this), this.parent && a(this.parent, this)
        }, t.prototype.skip = function() {
            n(this)
        }, t.prototype.remove = function() {
            if (!this.skipped && (n(this), this.node.parentNode && "BODY" !== this.node.nodeName)) {
                if (this.keptChildren.length) {
                    var e = document.createElement("div");
                    this.node.parentNode.replaceChild(e, this.node);
                    for (var t = 0, a = this.keptChildren.length; t < a; t++) i(this.keptChildren[t], this.parent, e)
                } else this.node.parentNode.removeChild(this.node);
                this.node = null
            }
        }, t.prototype.getDepthLayer = function() {
            return this.tree.getDepthLayer(this.depth)
        }, r.prototype.getDepthLayer = memoize(function(e) {
            var t = [];
            return this.breadthFirstTraversal(function(n) {
                if (n.depth === e) t.push(n);
                else if (n.depth > e) return d.BREAK_TRAVERSAL
            }), t
        }), r.prototype.breadthFirstTraversal = function(e) {
            var t = [];
            t.push(this.root);
            for (var n = null;
                (n = t.shift()) && e(n) !== d.BREAK_TRAVERSAL;)
                for (var a = 0, i = n.children.length; a < i; a++) {
                    var r = n.children[a];
                    t.push(r)
                }
        }, r.prototype.preOrderTraversalWithElementSkip = function(e, t) {
            t = t || this.root;
            for (var n = [t], a = null; a = n.shift();)
                if (!a.skipped && e(a) !== d.BREAK_TRAVERSAL)
                    for (var i = 0, r = a.children.length; i < r; i++) n.push(a.children[i])
        }, r.prototype.postOrderTraversal = function(e, t) {
            t = t || this.root;
            for (var n = [], a = [t], i = null; i = a.pop();)
                if (!i.skipped) {
                    n.push(i);
                    for (var r = 0, o = i.children.length; r < o; r++) a.push(i.children[r])
                }
            for (var s = n.length; s--;) e(n[s])
        }, o.Intents = d, o.elementFor = function(e) {
            for (; e;) {
                if (e[l]) return e[l];
                if (e.childElementCount > 1) return;
                e = e.firstElementChild
            }
        }, o.prototype.registerScoreFunction = function(e, t) {
            this.scoreFunctions[e] = t
        }, o.prototype.registerMarkFunction = function(e) {
            this.markFunctions.push(e)
        }, o.prototype.registerBehaviorFunction = function(e, t) {
            t || (t = "before"), this.behaviorFunctions[t].push(e)
        }, o.prototype.run = function(e) {
            s(this);
            var t = this;
            e(function() {
                c(t, "before")
            }, function(e) {
                c(t, "after", {
                    candidate: e
                })
            })
        }, o
    }(),
    isContentNodeHelperService = function() {
        var e = ["SCRIPT", "STYLE", "NOSCRIPT", "APPLET", "EMBED", "OBJECT", "PARAM", "IFRAME"];
        return function(t) {
            return e.indexOf(t.nodeName) < 0
        }
    }(),
    mergeChildrenScoreHelperService = function() {
        return function(e, t, n, a) {
            for (var i = 0, r = e.children.length; i < r; i++) {
                a(n, e.children[i].scores[t])
            }
            return n
        }
    }(),
    sliceWordsService = function() {
        var e = /[^\d\^|\s|\$|\.|,|!|\?|\)|\(|"|\')]{2,}/g;
        return function(t) {
            return $.trim(t).toLowerCase().match(e) || []
        }
    }(),
    runDomScorerModifier = function(e) {
        var t = new DomScorerModifier;
        return commonScore(t), mustKeepClassifier(t), headerFooterClassifier(t), socialShareClassifier(t), relatedArticlesClassifier(t), doubleBrClassifier(t), t.run(e)
    },
    persistComputedStylesAndRect = function() {
        function e(e, t, n, i) {
            for (var r = 0, o = n.length; r < o; r++) {
                var s = n[r],
                    c = [a, i, s].join("_");
                e.dataset[c] = t[s]
            }
        }
        var t = ["display", "visibility"],
            n = ["width", "height"],
            a = "pf";
        return function(a) {
            var i = a.currentStyle || window.getComputedStyle(a);
            i && e(a, i, t, "style");
            var r = a.getBoundingClientRect && a.getBoundingClientRect();
            return r && e(a, r, n, "rect"), {
                style: i,
                rect: r
            }
        }
    }(),
    coreWindow = window.parent,
    originalWindow = coreWindow.parent,
    $doc = $(document),
    pfData = {},
    coreData = {};
window.addEventListener("message", function(e) {
    if (e.data) {
        var t, n = e.data.payload;
        switch (e.data.type) {
            case "PfStartAlgo":
                $.extend(pfData, n.pfData), exTracker.init(pfData, function() {
                    setup.start()
                });
                break;
            case "PfTwitterWidgetShadowDom":
                t = document.getElementById(n.id), t.createShadowRoot && (t.createShadowRoot(), t.shadowRoot.innerHTML = n.innerHTML, t.style.cssText = n.cssText);
                break;
            case "PfTwitterTweetRendered":
                t = document.querySelector("#" + n.id), t.contentDocument.head.innerHTML = n.head, t.contentDocument.body.innerHTML = n.body, t.style.cssText = n.cssText;
                break;
            case "PfContentMaskAndScrollTop":
                $("body").addClass("content-mask").removeClass("content-unmask"), window.scrollTo(0, 0);
                break;
            case "PfContentUnMask":
                $("body").removeClass("content-mask").addClass("content-unmask")
        }
    }
});
var setup = {
        counter: 0,
        init: function() {
            if (this.counter += 1, this.counter < 30 && !document.body) return setTimeout(function() {
                setup.init()
            }, 13 * this.counter);
            coreWindow.postMessage({
                type: "PfAlgoLoaded"
            }, "*")
        },
        start: function() {
            try {
                logger.init(pfData), logger.time("algo.js Time"), document.body.innerHTML = pfData.page.body, pfData.onServer || coreWindow.postMessage({
                    type: "PfNSFWChecked",
                    payload: {
                        state: "notNeededForCS",
                        matchedPhrase: ""
                    }
                }, "*"), runDomScorerModifier(function(e, t) {
                    setup.detectPlatforms(), htmlPreProcessor.run().always(function() {
                        setup.removeHiddenContent(), setup.removePrintNo(), setup.addAppropriateClasses(), readability.extractAuthors(), readability.extractPubDate(), primaryImage.find(), pfData.page.enablePrintOnly && (readability.extractCopyright(), readability.extractCustomHeaderFooter()), setup.cleanHTML(), readability.removeEmptyTags(document.body), readability.init(e, t)
                    })
                })
            } catch (e) {
                helper.runPostAlgoProcesses(contentData), exTracker.log(e)
            }
        },
        hasDomain: function(e) {
            return pfData.config.domains.page === e || pfData.config.ssLocation && -1 !== pfData.config.ssLocation.indexOf(e)
        },
        detectPlatforms: function() {
            var e, t = /wp-content/i,
                n = /blogger.com/i,
                a = /squarespace.com/i,
                i = /wikihow.com/i,
                r = /weebly.com/i,
                o = pfData.config.ssStyleSheetHrefs || pfData.page.csStyleSheetHrefs;
            if (i.test(pfData.config.domains.page) || this.hasDomain("wikihow.com")) pfData.config.platform = "wikihow";
            else if (this.hasDomain("nytimes.com")) pfData.config.platform = "nytimes";
            else if (this.hasDomain("washingtonpost.com")) pfData.config.platform = "washingtonpost";
            else if (-1 !== $.inArray("mediawiki", pfData.page.bodyClassList)) pfData.config.platform = "mediawiki";
            else {
                var s = pfData.page.metas;
                for (e = 0; e < s.length; e++) {
                    var c = s[e];
                    "generator" === c.name && "blogger" === c.content ? pfData.config.platform = "blogger" : "blogger-template" === c.name && "dynamic" === c.content ? pfData.config.platform = "blogger-dynamic" : "al:ios:app_name" === c.property && "Medium" === c.content && (pfData.config.platform = "medium")
                }
                if ("unknown" === pfData.config.platform)
                    for (e = 0; e < o.length; e++) {
                        var l = o[e];
                        if (t.test(l)) {
                            pfData.config.platform = "wordpress";
                            break
                        }
                        if (n.test(l)) {
                            pfData.config.platform = "blogger";
                            break
                        }
                        if (a.test(l)) {
                            pfData.config.platform = "squarespace";
                            break
                        }
                        if (r.test(l)) {
                            pfData.config.platform = "weebly";
                            break
                        }
                    }
            }
            contentData.platform = pfData.config.platform, "undefined" != typeof pfData.config.platform && analytics.sendEvent("Product", "Platform: " + pfData.config.platform)
        },
        cleanHTML: function() {
            $("font").each(function() {
                var e = document.createElement("span");
                e.innerHTML = this.innerHTML, this.parentNode.replaceChild(e, this)
            }), $doc.find("input[type=password]").length > 0 && (contentData.hasPasswordField = !0), $doc.find('.cufon img.canvas-png, .yarpp-related, #wdsb-share-box, .pf-init-iframe, .sociable, #sociable, .addthis, #addthis, #printfriendly, #pf-print, .pf-print, #print, .wp-socializer, .editsection, .a2a_dd, .addtoany_share_save, .addtoany_share_save_container, .simply-social-wrapper, #pf-mask, .social_button, #socialbookmarks, .articleFeedback, .print-no, .no-print, .ftwit, .famos-toolbar, .famos-fstar, .ftwit-drawer, .linkwithin_outer, #lws_0, #nrelate_related_0, .ccc-widget, #cccwr, .widget-cb, .doncaprio-share-buttons, .st_twitter_hcount, .st_pinterest_hcount, .st_digg_hcount, .st_stumbleupon_hcount, .st_fblike_hcount, .addthis_toolbox, #goog-gt-tt, .skiptranslate, .really_simple_share, .robots-nocontent, #sharebar, .sharebar, .articleExtras, .embed-mod, .pd-rating, .itxtrstimg, .itxthookicon, .w2bPinitButton, #twitter_h, .instaemail, #instaemail-button, .emailbutton, #share_print, .pinit-button, .ngg_images, .mr_social_sharing_wrapper, .mapp-layout, .realtidbits-comments, #newsletter-promo, .newsletter-promo, .sharify-container, .sw-pinit-button, .jetpack-likes-widget-wrapper, .crunchify-social, .post-tags, .postmeta, .hreview-aggregate, .ratingblock, .nc_socialPanel, .outbrain, .related_post, .article-comments-post-wrapper, .modal-dialog, .load-screen, div.article-info img.squared-base, .rev_slider, .social-widget, .jw-player, .xnetvidplayer, .RelatedCoverage-relatedcoverage--LmkKX, .powerinbox, .email-sign-up, .article-prev-next, .related-posts, .related-cne-video-component, #Subscribe, .ColCMostViewed, #ColCFacebook, .amzn-native-container, .ArticleTicker-container, .hidden-print, div[aria-label="cookieconsent"], nav').addClass("to-remove"), $doc.find("[class*='relatedposts']").addClass("to-remove"), $doc.find("[class*='zergnet-widget']").addClass("to-remove"), $doc.find("input").addClass("to-remove"), $doc.find("[data-spot-id]").addClass("to-remove");
            var e = $doc.find("[class^='addthis_']"),
                t = e.prev();
            if (t.length) {
                var n = t.text();
                n.length < 50 && -1 !== n.toLowerCase().match(/share this|follow us/) && t.addClass("to-remove")
            }
            if (e.addClass("to-remove"), $doc.find(".gm-style").addClass("to-remove"), $doc.find("select, textarea, button").addClass("to-remove"), "wordpress" == pfData.config.platform && readability.isWooCommerce() || $doc.find("label").addClass("to-remove"), pfData.page.enablePrintOnly) {
                $doc.find(".print-only, #print-only").find(".to-remove").addBack().removeClass("to-remove")
            }
            $doc.find(".to-remove").remove(), $doc.find("abbr").removeAttr("title"), $doc.find(".pf-init-iframe, .sociable, #sociable, .addthis, #addthis, .printfriendly, .pf-print, #pf-print, .wp-socializer, .editsection, .a2a_dd, .addtoany_share_save, .addtoany_share_save_container, .simply-social-wrapper, #pf-mask, .social_button, #socialbookmarks, .articleFeedback, .print-no, .no-print, .ftwit, .famos-toolbar, .famos-fstar, .ftwit-drawer").remove(), "mediawiki" === pfData.config.platform && $doc.find(".noprint, div#jump-to-nav, .mw-jump, div.top, div#column-one, #colophon, .editsection, .toctoggle, .tochidden, div#f-poweredbyico, div#f-copyrightico, li#viewcount, li#about, li#disclaimer, li#mobileview, li#privacy, #footer-places, .mw-hidden-catlinks, tr.mw-metadata-show-hide-extended, span.mw-filepage-other-resolutions, #filetoc, .usermessage, #ca-delete, span.brokenref, .compact-ambox table .mbox-image,.compact-ambox table .mbox-imageright,.compact-ambox table .mbox-empty-cell, .compact-ambox .hide-when-compact, .check-icon a.new, .geo-nondefault,.geo-multi-punct, .nonumtoc .tocnumber, .nonumtoc .tocnumber, .toclimit-2 .toclevel-1 ul,.toclimit-3 .toclevel-2 ul,.toclimit-4 .toclevel-3 ul,.toclimit-5 .toclevel-4 ul,.toclimit-6 .toclevel-5 ul,.toclimit-7 .toclevel-6 ul, .mw-special-Watchlist #mw-watchlist-resetbutton, .wpb .wpb-header, .wpbs-inner .wpb-outside, .sysop-show,.accountcreator-show, .inputbox-hidecheckboxes form .inputbox-element, #editpage-specialchars, .wikipedia .ambox,.wikipedia .navbox,.wikipedia .vertical-navbox,.wikipedia .infobox.sisterproject,.wikipedia .dablink,.wikipedia .metadata,.editlink,a.NavToggle,span.collapseButton,span.mw-collapsible-toggle, #content cite a.external.text:after,.nourlexpansion a.external.text:after,.nourlexpansion a.external.autonumber:after, .skin-simple div#column-one,.skin-simple div#f-poweredbyico,.skin-simple div#f-copyrightico,.skin-simple .editsection, #siteNotice, div.magnify, .togglelink, .mw-editsection, .toctitle").remove();
            var a = $("#pf-content");
            if (a.length) {
                var i = a.html();
                a.html(i.replace(/(<br[^>]*>[ \n\r\t]*){2,}/gi, "</p><p>"))
            }
            try {
                $doc.find("#pf-content a").each(function() {
                    var e = $(this);
                    "" === $.trim(e.html().replace("&nbsp;", " ", "g")) && e.remove()
                }), $doc.find("#pf-content div.separator").each(function() {
                    var e = $(this);
                    e.children().size() == e.find("a,br").size() && e.addClass("img-separator")
                }), $doc.find(".pf-caption img, .wp-caption img, .caption img, .tr-caption-container img, .thumbinner img.thumbimage").each(function() {
                    $(this).addClass("caption-img")
                }), $doc.find(".embed-responsive").removeClass("embed-responsive")
            } catch (e) {}
        },
        removePrintNo: function() {
            pfData.page.enablePrintOnly && $doc.find(".print-no, .pf-remove").remove()
        },
        selectorsNotToBeRemoved: [".copyright", "#copyright", ".delete-no", ".delete-off", ".pf-author", ".print-content", "#print-content", ".pf-date", "#pf-date", ".pf-title", ".pf-footer", ".print-header", ".print-footer", ".print-yes", ".pf-content", "#pf-content", "img[original]", "img[data-lazy-src]", "img[data-href]", "img[data-src]", "img[data-pagespeed-lazy-src]", "img[data-original]", "img.lazyload", "img[data-mediaviewer-src]", "img[datasrc]", "img[data-native-src]", 'img[itemprop="url"]', "img.js-progressiveMedia-image", "img[data-original-src]", "a[data-replace-image]", 'img[src*="miro.medium.com"]'],
        removeHiddenContent: function() {
            pfData.page.enablePrintOnly && this.selectorsNotToBeRemoved.push(".print-only", "#print-only");
            var e = $doc.find(this.selectorsNotToBeRemoved.join(",")),
                t = "";
            e.find(".hidden-originally").removeClass("hidden-originally"), e.removeClass("hidden-originally"), e.parents().removeClass("hidden-originally"), t += $doc.find(readability.wpContentParentTags.join(", ")).find(readability.wpContentTags.join(".hidden-originally, ") + ".hidden-originally").map(function() {
                return $(this).attr("class")
            }).get().join(" "), t += $doc.find(readability.wpContentParentTags.join(".hidden-originally, ") + ".hidden-originally").map(function() {
                return $(this).attr("class")
            }).get().join(" "), t = t.replace(/hidden-originally/g, ""), readability.wpContentParentTags = $.grep(readability.wpContentParentTags, function(e) {
                return -1 === t.indexOf(e.replace(".", ""))
            }), readability.wpContentTags = $.grep(readability.wpContentTags, function(e) {
                return -1 === t.indexOf(e.replace(".", ""))
            }), $doc.find(".hidden-originally").remove(), $doc.find(".hidden").removeClass("hidden")
        },
        addAppropriateClasses: function() {
            $("figcaption").parent("figure").addClass("pf-caption")
        }
    },
    logElIdClass = function(e) {
        try {
            var t = e.id ? "#" + e.id : "",
                n = e.className ? "." + e.className : "";
            return e.tagName.toLowerCase() + t + n
        } catch (e) {
            return ""
        }
    },
    logEl = function(e) {
        var t = e.readability ? e.readability.contentScore.toFixed(2) : "undefined";
        return logElIdClass(e) + " :: Score - " + t
    },
    contentData = {
        hasContent: !1,
        title: "",
        description: "",
        author: "",
        dir: "ltr",
        customHeader: "",
        pubDate: "",
        customFooter: "",
        copyright: "",
        platform: "unknown",
        content: "",
        contentTextWithTitleAndUrl: "",
        contentTextLength: 0,
        hasPasswordField: !1,
        nsfwState: "unknown",
        nsfwMatchedPhrase: null
    },
    config = {
        negativeKeyWords: ["archive", "bookmark", "share", "login", "aside", "combx", "comment", "contact", "foot", "footer", "footnote", "form", "masthead", "meta", "outbrain", "related", "scroll", "shoutbox", "sidebar", "sponsor", "shopping", "tags", "menu", "authorp", "breadcrumb", "replies", "reply"],
        positiveKeyWords: ["article", "body", "content", "entry", "hentry", "main", "page", "pagination", "post", "blog", "story", "ERSIngredientsHeader", "ERSHeading", "ERSSectionHead", "ingredient", "ingredients", "dataTable", "wsite-content", "recipe-list", "ico-ingridients", "recipe-info", "rcps-table-ingredients", "product", "footnote", "recipe", "wpurp-recipe-ingredients", "learn-press-content-item"]
    },
    readability = {
        version: "1.7.1",
        flags: 7,
        hasContent: !0,
        titleText: null,
        titleTags: ["h1", "h2", "h3"],
        wpContentParentTags: [".hentry", ".single-post", "article"],
        wpContentTags: [".post-content .fusion-fullwidth", ".entry-content", ".entry_content", ".entry", ".format_text", ".entrytext", ".post-body", ".post-content", ".post-entry", ".post_body", ".post_content", ".post_entry"],
        wpPostImageSelectors: [".hentry .wp-post-image", "header img.featured-image", ".entry-thumb img", ".hentry .featured-thumbnail.large img", ".pinit-overlay img", ".post-content .post-img img"],
        run: 0,
        debugLevel: 1,
        textLimit: 250,
        positiveTags: ["article"],
        negativeTags: ["aside", "nav", "footer"],
        FLAG_STRIP_UNLIKELYS: 1,
        FLAG_WEIGHT_CLASSES: 2,
        FLAG_CLEAN_CONDITIONALLY: 4,
        parsedPages: {},
        unlikelyTags: ["FOOTER"],
        regexps: {
            unlikelyCandidates: /combx|comment|community|disqus|remark|rss|shoutbox|sponsor|ad-break|agegate|pager|popup|replies/i,
            unlikelyCandidatesNavigation: /menu|sidebar|pagination|related-posts/i,
            primaryImageUnlikelyParents: /secondary|boxzilla/i,
            okMaybeItsACandidate: /content|and|article|body|column|main|extra|shadow|rightmen|header|content-sidebar-wrap|content-with-sidebar-wrp|pk_left_sidebar|artpag|has-sidebar|node-blog-entry|with-sidebar|widget-content|sp_sidebar|nd-no-sidebars|onecol-sidebar|page/i,
            negativePartialWord: new RegExp(config.negativeKeyWords.join("|"), "i"),
            negativeWholeWord: new RegExp("\\b" + config.negativeKeyWords.join("\\b|\\b"), "i"),
            positivePartialWord: new RegExp(config.positiveKeyWords.join("|"), "i"),
            positiveWholeWord: new RegExp("\\b" + config.positiveKeyWords.join("\\b|\\b"), "i"),
            extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single/i,
            divToPElements: /<(a|blockquote|dl|div|img|ol|p|pre|table|ul)/i,
            replaceBrs: /(<br[^>]*>[ \n\r\t]*){2,}/gi,
            replaceFonts: /<(\/?)font[^>]*>/gi,
            normalize: /\s{2,}/g,
            videos: /http:\/\/(www\.)?(youtube|vimeo)\.com/i,
            period: /\.( |$)/,
            captions: /caption|figure/i,
            weight: /[\s\d]+(gram|gm|ml|kg|cup|pound|lb|spoon|tbsp)[s]?\s+/i,
            fractions: /[0-9]+\/[0-9]+/i,
            cookingWords: /ingredient|ingredients|recipe|salt|egg|eggs|honey|cream|organic|tablespoon|baking|chopped|cup|sugar|flour|rice|oil|salt|garlic|chili|egg|tsp|garlic|tbsp|spoon|cocoa|butter|milk|waniliowy|cytrynowego|jajka|OUNCE|BONELESS|Preheat|oven|ONIONS|pizzico|Mascarpone|Formaggio|Parmigiano|Riso|Sale|pepe|Formaggio|Barbabietole|provola|Parmigiano|grattuggiato|Latte|affumicato|Scalogno|Cannella|Limone|Olio|noce/i,
            wpPostImage: /wp-post-image/i
        },
        wrapTextNodes: function(e) {
            if (!e.tagName || -1 === $.inArray(e.tagName.toUpperCase(), ["PRE", "CODE", "SVG"])) {
                var t = e.childNodes,
                    n = t.length;
                if (e.nodeType === Node.TEXT_NODE) {
                    if ($.trim(e.textContent)) {
                        var a = document.createElement("span");
                        a.textContent = e.nodeValue, a.className = "text-node", e.parentNode.replaceChild(a, e)
                    }
                } else if (n > 0)
                    for (var i = 0; i < n; i++) this.wrapTextNodes(t[i])
            }
        },
        extractAuthors: function() {
            var e, t, n, a = [],
                i = [],
                r = /(^|\W)(by)(\W|$)/i,
                o = [".pf-author", ".hentry a[rel=author]", "a[rel=author]", ".author.vcard .fn", "[itemprop~=author] [itemprop~=name]", "[itemprop~=author]", ".byline", "#author", "header a[rel=author]", ".hentry .post-author"],
                s = o.join(", ");
            if ($.each(o, function(o, c) {
                    if (a = [], i = [], t = $doc.find(c).not(".widget *").not(".sidebar *"), t.size() >= 1 && -1 == t[0].className.search(/combx|comment|community|disqus|extra|foot|header|menu|remark|rss|shoutbox|sidebar|sponsor|ad-break|agegate|pagination|pager|popup|tweet|twitter|tags|postmetadata/i) && -1 == $.inArray(this.nodeName, ["INPUT"])) {
                        e = t.first();
                        var l = e.parent(),
                            d = l.parent(),
                            p = null;
                        if (l.find(s).length > 1 ? p = l : d.find(s).length > 1 && (p = d), p && (e = p), e.addClass("algo-author"), e.find("sup").remove(), p ? (p.find(c).each(function() {
                                helper.extractText(a, this)
                            }), a.join(" ").match(/,/) || (a = [a.join(", ")])) : helper.extractText(a, e[0]), -1 === e.text().search(r)) try {
                            n = e.parent(), i.push(n), 0 === n.prev().children().size() && i.push(n.prev()), $.each(i, function(e, t) {
                                var n = t.text();
                                if (-1 !== n.search(r) && n.length < 60) return a.unshift("By"), !1
                            })
                        } catch (e) {}
                        return contentData.author = a.join(" "), readability.author = '<span id="pf-author">' + a.join(" ") + "</span>", !1
                    }
                }), !readability.author) {
                var c = $.grep(pfData.page.metas, function(e) {
                    return "author" === e.property
                });
                1 === c.length && c[0].content && (contentData.author = c[0].content, readability.author = '<span id="pf-author">' + c[0].content + "</span>")
            }
        },
        extractPubDate: function() {
            this.extractDateBySelectors([".pf-date", "#pf-date", ".Blog-meta-item--date"]), this.extractDateBySelectors([".hentry .entry-date", '.hentry .post-date time[itemprop="datePublished"]', '.article-content--main time[itemprop="datePublished"]']), this.extractDateFromMeta("property", "article:published"), this.extractDateFromMeta("property", "article:published_time"), this.extractDateFromMeta("name", "shareaholic:article_published_time"), this.extractDateFromMeta("itemprop", "datePublished")
        },
        extractDateFromMeta: function(e, t) {
            if ("undefined" == typeof readability.pubDate) {
                var n, a = helper.findMeta(pfData.page.metas, e, t),
                    i = helper.findMeta(pfData.page.metas, "property", "og:locale");
                if (1 == i.length && "undefined" != typeof i[0].content && (n = i[0].content.replace("_", "-")), 1 == a.length && "undefined" != typeof a[0].content) try {
                    var r = a[0].content.split("T")[0],
                        o = new Date(r);
                    if (!isNaN(o.getTime())) try {
                        readability.pubDate = o.toLocaleDateString(n, {
                            month: "long",
                            year: "numeric",
                            day: "numeric",
                            timeZone: "UTC"
                        })
                    } catch (e) {
                        readability.pubDate = o.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                            day: "numeric",
                            timeZone: "UTC"
                        })
                    }
                } catch (e) {}
            }
        },
        extractDateBySelectors: function(e) {
            "undefined" == typeof readability.pubDate && $.each(e, function(e, t) {
                var n = $doc.find(t).not(".widget *").not(".sidebar *");
                if (1 == n.size()) return readability.pubDate = n.text(), n.remove(), !1
            })
        },
        extractCopyright: function() {
            var e = $doc.find(".copyright, #copyright");
            e.size() > 0 && (readability.copyright = e.clone().removeAttr("style"), e.remove())
        },
        extractCustomHeaderFooter: function() {
            var e = $doc.find(".print-header");
            1 == e.size() && (readability.customHeader = $("<div />", document).append(e.clone().removeAttr("style")).html(), e.remove());
            var t = $doc.find(".pf-footer, .print-footer");
            t.size() > 0 && (readability.customFooter = $("<div />", document).append(t.clone().removeAttr("style")).html(), t.remove())
        },
        init: function(e, t) {
            readability.prepDocument();
            var n = document.createElement("DIV"),
                a = document.createElement("DIV");
            helper.pickTitleFromContent();
            var i = readability.getArticleTitle(),
                r = document.body.innerHTML;
            e();
            var o = readability.grabArticle();
            o || (document.body.innerHTML = r, readability.textLimit = 250, readability.run = 0, o = readability.grabArticle(), o ? exTracker.log(new Error("runDomScorerModifier removes main content")) : (o = document.createElement("DIV"), o.id = "pf-content", readability.hasContent = !1)), readability.articleTitle = i, readability.articleContent = o, t(o), readability.titleText ? readability.articleTitle.innerHTML = readability.titleText : readability.titleText = $.trim($(readability.articleTitle).text()), $(o).find(readability.titleTags.join(",")).each(function() {
                readability.titleText == $.trim($(this).text()) && $(this).remove()
            }), n.id = "printfriendly", a.id = "pf-print-area", i.id = "pf-title", pfData.onServer || (a.appendChild(i), a.appendChild(o), n.appendChild(a), document.body.innerHTML = "", document.body.insertBefore(n, document.body.firstChild), document.body.removeAttribute("style")), primaryImage.prependTo(o), readability.hasContent && readability.wrapTextNodes(o), contentData.hasContent = readability.hasContent, contentData.title = readability.getInnerText(i), descriptions = $.grep(pfData.page.metas, function(e) {
                return "description" === e.name
            }), descriptions.length && (contentData.description = descriptions[0].content), contentData.dir = readability.getSuggestedDirection(o.textContent), contentData.content = o.innerHTML;
            var s = pfData.config.ssLocation || "";
            contentData.contentTextWithTitleAndUrl = s + o.textContent + contentData.title, contentData.contentTextLength = o.textContent.length, contentData.lang = pfData.page.language, logger.timeEnd("algo.js Time"), helper.runPostAlgoProcesses(contentData)
        },
        skipTagsWithChildren: {
            area: !0,
            base: !0,
            col: !0,
            command: !0,
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
            br: !0,
            "twitter-widget": !0,
            iframe: !0,
            pre: !0,
            svg: !0
        },
        skipTags: {
            i: !0,
            span: !0,
            td: !0,
            th: !0
        },
        removeEmptyTags: function(e) {
            for (var t = e.children.length - 1; t >= 0; t--) {
                var n = e.children[t],
                    a = n.nodeName.toLowerCase();
                n.children && (this.skipTagsWithChildren[a] || n.dataset && n.dataset.pfAllowEmpty || (n.children.length > 0 && this.removeEmptyTags(n), 0 !== n.children.length || this.skipTags[a] || "" !== $.trim(n.textContent) || n.parentNode.removeChild(n)))
            }
        },
        getSuggestedDirection: function(e) {
            function t() {
                return e.replace(/@\w+/, "")
            }

            function n(t) {
                var n = e.match(new RegExp(t, "g"));
                return null !== n ? n.length : 0
            }

            function a() {
                return 100 * (n("[\\u05B0-\\u05F4\\uFB1D-\\uFBF4]") + n("[\\u060C-\\u06FE\\uFB50-\\uFEFC]")) / e.length > 20
            }
            return e = t(e), a() ? "rtl" : "ltr"
        },
        getArticleTitle: function() {
            var e, t, n, a, i, r, o = null;
            if (e = ["h1", "h2", "h3"], a = $doc.find(".pf-title"), 1 == a.size() && (logger.log("Picking title using .pf-title"), o = a), o || (a = $doc.find('header [itemprop~="headline"]'), 1 == a.size() && "" !== $.trim(a.text()) && (logger.log("Picking title using header itemprop~=headline"), o = a)), o || "blogger" !== pfData.config.platform && "wordpress" !== pfData.config.platform || (t = [".post-title", ".entry-title"], "wordpress" === pfData.config.platform && t.push(".post_title", ".posttitle", "#page-title", "#title", ".title"), n = [], $.each([".single-post", ".post", "#post", ".hentry"], function(a, i) {
                    0 === $doc.find(".pf-body-cache" + i).size() && $.each(e, function(e, a) {
                        $.each(t, function(e, t) {
                            n.push(i + " " + t + " " + a), n.push(i + " " + a + t)
                        })
                    })
                }), $.each(n, function(e, t) {
                    if (a = $doc.find(t), 1 === a.size() && "" !== $.trim(a.text())) return logger.log("Picking title using WP/blogger classes"), o = a, !1
                })), o || "squarespace" !== pfData.config.platform || (t = ["article .BlogItem-title"], $.each(t, function(e, t) {
                    if (a = $doc.find(t), 1 === a.size() && "" !== $.trim(a.text())) return logger.log("Picking title using squarespace classes"), o = a, !1
                })), !o && "" !== $.trim($("title", document).text())) {
                var s = $.trim($("title", document).text()).toLowerCase().replace(/\W+/g, ""),
                    c = 0;
                $.each(e, function(e, t) {
                    $doc.find(t).each(function(e, t) {
                        var n = s.match($(t).text().toLowerCase().replace(/\W+/g, ""));
                        n && n[0].length > 15 && n[0].length > c && (logger.log("Using title element which had a substring of document title"), c = n[0].length, o = $(t))
                    })
                })
            }
            if (o || (i = $doc.find("article header"), i.size() > 0 && $.each(e, function(e, t) {
                    return a = i.find(t), !(a.size() > 1) && (1 == a.size() ? (logger.log("Picking title using article header, header h-tags"), o = a, !1) : void 0)
                })), o) return readability.titleText = $.trim(o.text()), readability.titleTags.push(o[0].nodeName), r = document.createElement("H1");
            var l = "",
                d = "";
            try {
                l = d = document.title, "string" != typeof l && (l = d = readability.getInnerText(document.getElementsByTagName("title")[0]))
            } catch (e) {}
            if (l.match(/ [\|\-] /)) l = d.replace(/(.*)[\|\-] .*/gi, "$1"), l.split(" ").length < 3 && (l = d.replace(/[^\|\-]*[\|\-](.*)/gi, "$1"));
            else if (-1 !== l.indexOf(": ")) l = d.replace(/.*:(.*)/gi, "$1"), l.split(" ").length < 3 && (l = d.replace(/[^:]*[:](.*)/gi, "$1"));
            else if (l.length > 150 || l.length < 15) {
                var p = document.getElementsByTagName("h1");
                1 === p.length && (l = readability.getInnerText(p[0]))
            }
            return l = $.trim(l), l.split(" ").length <= 4 && (l = d), r = document.createElement("H1"), r.innerHTML = l, r
        },
        prepDocument: function() {
            if (null === document.body) {
                var e = document.createElement("body");
                try {
                    document.body = e
                } catch (t) {
                    document.documentElement.appendChild(e), logger.log(t)
                }
            }
            document.body.id = "pf-body"
        },
        prepArticle: function(e) {
            readability.cleanStyles(e), readability.clean(e, "object")
        },
        initializeNode: function(e) {
            switch (e.readability = {
                contentScore: 0
            }, e.tagName) {
                case "ARTICLE":
                    e.readability.contentScore += 15;
                    break;
                case "ASIDE":
                case "NAV":
                    e.readability.contentScore -= 15;
                    break;
                case "DIV":
                    e.readability.contentScore += 5;
                    break;
                case "PRE":
                case "TD":
                case "BLOCKQUOTE":
                    e.readability.contentScore += 3;
                    break;
                case "ADDRESS":
                case "OL":
                case "UL":
                case "DL":
                case "DD":
                case "DT":
                case "LI":
                case "FORM":
                    e.readability.contentScore -= 3;
                    break;
                case "H1":
                case "H2":
                case "H3":
                case "H4":
                case "H5":
                case "H6":
                case "TH":
                    e.readability.contentScore -= 5
            }
            e.readability.contentScore += readability.getClassWeight(e)
        },
        getTextScore: function(e) {
            var t = 0;
            return t += e.split(",").length, t += Math.min(Math.floor(e.length / 100), 3)
        },
        isUnlikelyCandidate: function(e, t) {
            if (readability.unlikelyTags.indexOf(e.tagName) >= 0) return !0;
            var n = e.className + " " + e.id + " " + e.nodeName;
            return "image" === t ? readability.regexps.unlikelyCandidates.test(n) || readability.regexps.primaryImageUnlikelyParents.test(n) : (readability.regexps.unlikelyCandidates.test(n) || readability.regexps.unlikelyCandidatesNavigation.test(n) && e.querySelector("a")) && !readability.regexps.okMaybeItsACandidate.test(n) && !e.querySelector(readability.positiveTags.join(",")) && "BODY" !== e.tagName && -1 === $.inArray(e.tagName.toLowerCase(), readability.positiveTags)
        },
        hasUnlikelyParent: function(e) {
            return $(e).parents().is(function() {
                return readability.isUnlikelyCandidate(this, "image")
            })
        },
        skipSchemaSelectorsDomain: function() {
            for (var e = ["reuters.com"], t = pfData.config, n = 0, a = e.length; n < a; n++) {
                var i = e[n];
                if (t.domains.page.indexOf(i) >= 0 || t.ssLocation && t.ssLocation.indexOf(i) >= 0) return !0
            }
            return !1
        },
        isWooCommerce: function() {
            var e = "|" + pfData.page.bodyClassList.join("|") + "|",
                t = /\|[^|]*?woocommerce.*?\|/i.test(e),
                n = /\|home\|/i.test(e),
                a = /\|single-product\|/i.test(e);
            return t && (a || !n)
        },
        grabArticle: function(e) {
            readability.run += 1;
            var t, n, a, i, r, o, s = "added-to-list" + readability.run,
                c = [];
            pfData.page.enablePrintOnly && c.push(".print-only", "#print-only");
            var l = ".printfriendly.pf-alignright, .printfriendly.pf-alignleft, .printfriendly.pf-aligncenter",
                d = $doc.find(".pf-content, #pf-content");
            if (d.find(l).remove(), ("" !== $.trim(d.text()) || d.find("img").size() > 0 || -1 !== $.inArray("IMG", $.map(d, function(e) {
                    return e.nodeName
                }))) && c.push(".pf-content", "#pf-content"), n = pfData.page.enablePrintOnly ? $doc.find(c.join(",")) : $(), 0 === n.size()) {
                switch (pfData.config.platform) {
                    case "blogger-dynamic":
                        t = $doc.find(".overview-content .entry-content, .viewitem-content .entry-content"), t.size() > 0 && (t.find(".post-title, .entry-title, .post-header, .post-footer").remove(), n = t);
                        break;
                    case "blogger":
                        t = $doc.find("#main").find(".post-body, .entry-content, .post-title, .entry-title"), t.size() > 0 && (t.find(".post-title, .entry-title, .post-header, .post-footer").remove(), n = t);
                        break;
                    case "wordpress":
                        if ($doc.find("header").find(readability.wpContentTags.join(",")).addClass("pf-invalid-selector"), this.isWooCommerce()) n = $doc.find('[data-elementor-type="wp-post"], .woocommerce-cart-form, .cart-collaterals, .wc-product-table, .summary, #tab-description, .woocommerce-product-gallery__image,.woocommerce-product-gallery__image.flex-active-slide .zoomImg, .woocommerce-tabs .woocommerce-Tabs-panel,[data-widget_type*="woocommerce-product"]');
                        else {
                            var p = [];
                            $.each(readability.wpContentParentTags, function(e, t) {
                                $.each(readability.wpContentTags, function(e, n) {
                                    p.push(t + " " + n)
                                })
                            }), p.push('[data-elementor-type="wp-post"]'), $.each(p, function(e, t) {
                                var a = $doc.find(t);
                                if (1 === a.size() && !a.hasClass("pf-invalid-selector") && readability.getInnerText(a[0]).length > 150) return logger.log("Found WP candidate. Selector - " + t), n = a, !1
                            })
                        }
                        break;
                    case "weebly":
                        t = $doc.find("#wsite-content .blog-content"), 1 === t.size() && (t.text().length > 20 || t.find("img").size() > 0) && (n = t);
                        break;
                    case "wikihow":
                        t = $doc.find("#bodycontents"), 1 === t.size() && (t.text().length > 20 || t.find("img").size() > 0) && (n = t);
                        break;
                    case "medium":
                        t = $doc.find("article.postArticle--full > .postArticle-content"), 1 === t.size() && (t.text().length > 20 || t.find("img").size() > 0) && (n = t);
                        break;
                    case "washingtonpost":
                        n = $doc.find(".article-body .teaser-content, .remainder-content");
                        break;
                    case "nytimes":
                        if (t = $doc.find(".story-body"), t.size() >= 1 && (n = t), 0 === n.size()) {
                            var g = $.grep(pfData.page.metas, function(e) {
                                return "slug" === e.name
                            });
                            g.length && (t = $doc.find("#" + g[0].content), t.size() >= 1 && (n = t))
                        }
                        0 === n.size() && (t = $doc.find("article#story"), t.size() >= 1 && (t.find('nav, header, footer, #bottom-wrapper, #newsletter-module, .bottom-of-article, [class^="ResponsiveAd"], div [class^="SectionBar"], div[class^="elementStyles-recirculation"], [class^="InlineMessage"]').remove(), n = t));
                        break;
                    case "squarespace":
                        var m = '#productSummary, .product-description, #content, .Main-content, .BlogItem, .hentry, main, article div[data-layout-label="Post Body"]'.split(",");
                        $.each(m, function(e, a) {
                            if (t = $doc.find(a), (1 === t.size() || 2 === t.size()) && (t.text().length > 20 || t.find("img").size() > 0)) return t.find(".product-quantity-input, .sqs-add-to-cart-button-wrapper, .product-variants, .product-sharing, aside, .entry-header, .entry-footer, nav, .Blog-meta, .BlogItem-share, .Index-page-scroll-indicator").remove(), n = t, !1
                        })
                }
                if (!this.skipSchemaSelectorsDomain()) {
                    var u = ['[itemtype*="schema.org/Article"] [itemprop~=articleBody]', '[itemtype*="schema.org/NewsArticle"] [itemprop~=articleBody]', '[itemtype*="schema.org/Report"] [itemprop~=articleBody]', '[itemtype*="schema.org/ScholarlyArticle"] [itemprop~=articleBody]', '[itemtype*="schema.org/TechArticle"] [itemprop~=articleBody]', '[itemtype*="schema.org/Recipe"]', '[itemtype*="schema.org/ScholarlyArticle"] [data-article-body]'];
                    $.each(u, function(e, t) {
                        var a = $doc.find(t);
                        if (1 === a.size() && readability.getInnerText(a[0]).length > 250) return n = a, !1
                    })
                }
            }
            if (n.size() > 0 && (n.find(".navbar, .flex-direction-nav, .yarpp-related, .articleInline, .bottom-meta, .bottomnavigation, #branding, .commentlist, #commentwrapper, #comments, .comments, #disqus_thread, .entry-meta, .igit_relpost, #navbar, .nocomments, .noprint, .pd-rating, .pin-it-btn-wrapper, .post-actions, .post-comments, .post-extras, .post-footer, .post_footer, .post-header, .post-info, .post .meta, .post-meta, .postmeta, .postmetadata, .post_nav, .post_tags, .prev_next, .print-no, .respond, #respond, #sharebar, .shareTools, .share-buttons, .shareTop, .share_this, #sharebarx, .share_box, .sharedaddy, .share_icons, .shr-bookmarks, .sociable, .social_button, .social-ring, .socialwrap, .wpadvert, .wp-socializer, .editorial-disclosure").remove(), n.find(l).remove(), "wikihow" === pfData.config.platform ? n.find("#method_toc, .altadder_section, .relatedwikihows, .ad_label, .wh_ad, .wh_ad_inner, .video, .step_num").remove() : "nytimes" === pfData.config.platform && n.find("footer, .visually-hidden").remove(), "" !== $.trim(n.text()) || n.find("img").size() > 0 || -1 !== $.inArray("IMG", $.map(n, function(e) {
                    return e.nodeName
                })))) {
                logger.log("Bypassed readability and found content using " + pfData.config.platform + " rules");
                var f = document.createElement("DIV"),
                    h = $(f);
                if (f.id = "pf-content", "wordpress" === pfData.config.platform) {
                    $.each(readability.wpPostImageSelectors, function(e, t) {
                        var a = $doc.find(t);
                        if (1 === a.size()) {
                            var i = a.first();
                            if (!primaryImage.findSameImage(primaryImage.getImageOrigSrc(i[0], n))) return "FIGURE" === i.parent()[0].nodeName && (i = i.parent()), h.append(i), logger.log("Picked WP Post Image using selector - " + t), !1
                        }
                    });
                    var y = $doc.find(".single-recipe-ingredients");
                    1 === y.size() && 0 === n.find(".single-recipe-ingredients").size() && h.append(y)
                }
                n.find("*[style]").andSelf().each(function() {
                    this.setAttribute("orig-style", this.getAttribute("style")), this.removeAttribute("style")
                });
                var v = n.text().length;
                n.find("aside").text().length < .15 * v && n.find("aside").remove();
                for (var b = 0, C = n.length; b < C; b++) {
                    var w = n[b];
                    0 === h.has(w).length && h.append(w)
                }
                return f
            }
            var T = readability.flagIsActive(readability.FLAG_STRIP_UNLIKELYS),
                S = null !== e;
            e = e || document.body;
            var x = e.innerHTML,
                I = [];
            if (e.children && e.children.length)
                for (var D = 0, k = e.children.length; D < k; D++) I.push(e.children[D]);
            for (var A, E, N = null, L = [], P = ["P", "PRE", "TD", "UL", "OL"], _ = ["SPAN", "B"]; N = I.shift();)
                if (a = null, T && readability.isUnlikelyCandidate(N)) logger.log("Removing unlikely candidate - " + logElIdClass(N)), N.parentNode.removeChild(N);
                else {
                    if ($.inArray(N.tagName, P) > -1 && !N.classList.contains("pf-br-replacement")) L.push(N);
                    else if ($.inArray(N.tagName, _) > -1 && 1 === N.childNodes.length && N.childNodes[0].nodeType === Node.TEXT_NODE && readability.getInnerText(N).length > 30) {
                        do {
                            a = helper.findNonExclusiveParent(a || N)
                        } while (!a || $.inArray(a.tagName, _) > -1);
                        helper.elementHasClass(a, s) || L.push(a)
                    } else if ("DIV" === N.tagName)
                        if (-1 === N.innerHTML.search(readability.regexps.divToPElements)) {
                            A = document.createElement("p");
                            try {
                                A.innerHTML = N.innerHTML, N.parentNode.replaceChild(A, N), A.id = N.id, A.className = N.className, L.push(A)
                            } catch (e) {
                                L.push(N), logger.log("Could not alter div to p, probably an IE restriction, reverting back to div.: " + e)
                            }
                        } else
                            for (var b = 0, R = N.childNodes.length; b < R; b += 1) {
                                var M = N.childNodes[b];
                                try {
                                    if (M.nodeType === Node.TEXT_NODE && $.trim(M.nodeValue)) {
                                        var F = document.createElement("span");
                                        pfData.browser.isIE && pfData.browser.version < 10 ? F.innerHTML = "&nbsp;" + M.nodeValue : F.innerHTML = M.nodeValue, M.parentNode.replaceChild(F, M)
                                    } else M.nodeType === Node.COMMENT_NODE && N.removeChild(M)
                                } catch (e) {}
                            }
                        if (L[L.length - 1] && helper.addClassToElement(L[L.length - 1], s), N.children && N.children.length)
                            for (var B = 0, z = N.children.length; B < z; B++) I.push(N.children[B])
                }
            n = [];
            for (var H = 0; H < L.length; H++) {
                o = !1;
                var W = L[H];
                $.inArray(W.tagName, ["SECTION", "DIV", "ARTICLE"]) > -1 && W.children && W.children.length > 1 ? (a = W, o = !0) : a = helper.findNonExclusiveParent(W), a && "undefined" != typeof a.tagName && (i = readability.getInnerText(W), i.length < 25 && !helper.isRecipeIngredient(i) || i.length < 5 || (r = helper.findNonExclusiveParent(a), E = readability.getTextScore(i), !o && helper.elementHasClass(a, s) || ("undefined" == typeof a.readability && (readability.initializeNode(a), n.push(a)), a.readability.contentScore += E), !r || "undefined" == typeof r.tagName || helper.elementHasClass(a, s) || helper.elementHasClass(r, s) || ("undefined" == typeof r.readability && (readability.initializeNode(r), n.push(r)), r.readability.contentScore += .6 * E), readability.debugLevel > 3 && (logger.log("Node: " + logElIdClass(W)), logger.log("Text Score: " + E), logger.log("Parent: " + logEl(a)), r && "undefined" != typeof r.readability && logger.log("grandParent: " + logEl(r)), logger.log(""))))
            }
            for (var O = null, U = 0, j = n.length; U < j; U++) n[U].readability.contentScore = n[U].readability.contentScore * (1 - readability.getLinkDensity(n[U]));
            n.sort(function(e, t) {
                var n = e.readability.contentScore,
                    a = t.readability.contentScore;
                return n < a ? 1 : n === a ? 0 : -1
            }), logger.log("Top 5 Candidates");
            for (var D = 0; D < Math.min(5, n.length); D++) logger.log(logEl(n[D]));
            if (n.length > 0) {
                O = n[0];
                var G = .5 * O.readability.contentScore,
                    q = [];
                if ($.each(n, function(e, t) {
                        return $candidate = $(t), $candidate.find(".pf-candidate").size() > 0 || $candidate.parents(".pf-candidate").size() > 0 || t.readability.contentScore >= G && ($candidate.addClass("pf-candidate"), void q.push(t))
                    }), q.length > 1) try {
                    O = helper.getCommonAncestor(q), "BODY" === O.tagName ? O = n[0] : logger.log("Changing Top Candidate to Ancestor")
                } catch (e) {
                    O = n[0]
                }
            }
            if (null === O || "BODY" === O.tagName) {
                logger.log("Top Candidate NULL or BODY"), O = document.createElement("DIV");
                for (var V = e.firstChild; V;) O.appendChild(V), V = e.firstChild;
                e.appendChild(O)
            }
            if ("medium" === pfData.config.platform) {
                var K = $(O).parents("article");
                if (1 === K.length) {
                    logger.log("Changing Top Candidate to Ancestor article");
                    for (var Y = K.find("section").filter(function() {
                            return !!this.innerText.length
                        }), X = ["h1", "h2", "h3", "h4", "p", "pre", "code", "ul", "ol", "figure", "img"], J = [], Q = 0; Q < X.length; Q++) {
                        var Z = X[Q];
                        J.push([Z, Z + ">*", ":has(" + Z + ")"].join(","))
                    }
                    $(Y[0]).find(":not(" + J.join(",") + ")").remove(), O = K[0]
                }
            }
            "TBODY" === O.nodeName && (O = O.parentNode), "undefined" == typeof O.readability && readability.initializeNode(O), logger.log("Top Candidate: " + logEl(O));
            var ee = document.createElement("DIV");
            S && (ee.id = "pf-content");
            var te = Math.max(10, .2 * O.readability.contentScore),
                ne = O.parentNode ? O.parentNode.childNodes : [],
                ae = null;
            1 === $(O).prev().find("img").length && (ae = $(O).prev()[0], ee.appendChild(ae)), 1 === $(O).parent().prev().find("img").length && ee.appendChild($(O).parent().prev()[0]);
            for (var ie = 0, re = ne.length; ie < re; ie += 1) {
                var oe = ne[ie],
                    se = !1,
                    ce = ["p", "div", "ul", "ol", "table", "tr", "td", "tbody", "blockquote"],
                    le = 0,
                    de = "",
                    pe = oe.id + " " + oe.className;
                if (oe && oe !== ae) {
                    if (readability.debugLevel > 3 && logger.log("Looking at sibling node: " + logEl(oe)), oe.className === O.className && "" !== O.className && (le += .2 * O.readability.contentScore), oe === O) se = !0, de = "top candidate";
                    else {
                        if (readability.regexps.negativeWholeWord.test(pe)) continue;
                        if ("undefined" != typeof oe.readability && oe.readability.contentScore + le >= te) se = !0, de = "content score + contentbonus > threshold";
                        else if ($.inArray(oe.nodeName.toLowerCase(), ce) > -1) {
                            var ge = readability.getLinkDensity(oe),
                                me = readability.getInnerText(oe),
                                ue = me.length,
                                fe = oe.getElementsByTagName("a").length,
                                he = oe.getElementsByTagName("img").length;
                            ue > 300 && ge < .25 ? (se = !0, de = "Long content with low link density") : ue > 80 && ge < .25 && fe < 3 ? (se = !0, de = "Possibly long content with low link density & link count < 3") : ue < 80 && 0 === ge && -1 !== me.search(readability.regexps.period) ? (se = !0, de = "Short content with no links and has periods (.)") : fe < 2 && 1 == he && (se = !0, de = "link count < 2 with one image")
                        }
                    }
                    if (se) {
                        logger.log("Appending node: " + logEl(oe) + " -- because " + de);
                        var ye = null;
                        if ("DIV" !== oe.nodeName && "P" !== oe.nodeName && "TABLE" !== oe.nodeName) {
                            ye = document.createElement("DIV");
                            try {
                                ye.id = oe.id, ye.innerHTML = oe.innerHTML
                            } catch (e) {
                                ye = oe, ie -= 1, re -= 1
                            }
                        } else ye = oe, ie -= 1, re -= 1;
                        ye.className = "", ee.appendChild(ye)
                    }
                }
            }
            return readability.prepArticle(ee), readability.getInnerText(ee).length < readability.textLimit ? (logger.log("****Text length less than " + readability.textLimit + " ****"), e.innerHTML = x, readability.flagIsActive(readability.FLAG_STRIP_UNLIKELYS) ? (readability.removeFlag(readability.FLAG_STRIP_UNLIKELYS), logger.log("Turning off FLAG_STRIP_UNLIKELYS"), readability.grabArticle(e)) : readability.flagIsActive(readability.FLAG_WEIGHT_CLASSES) ? (readability.removeFlag(readability.FLAG_WEIGHT_CLASSES), logger.log("Turning off FLAG_WEIGHT_CLASSES"), readability.grabArticle(e)) : readability.flagIsActive(readability.FLAG_CLEAN_CONDITIONALLY) ? (readability.removeFlag(readability.FLAG_CLEAN_CONDITIONALLY), logger.log("Turning off FLAG_CLEAN_CONDITIONALLY"), readability.grabArticle(e)) : 250 === readability.textLimit ? (logger.log("*** Reducing text limit to 75 ***"), readability.textLimit = 75, readability.addFlag(readability.FLAG_STRIP_UNLIKELYS), readability.addFlag(readability.FLAG_WEIGHT_CLASSES), readability.addFlag(readability.FLAG_CLEAN_CONDITIONALLY), readability.grabArticle(e)) : null) : ee
        },
        getInnerText: function(e, t) {
            if ("undefined" == typeof e.textContent) return "";
            t = void 0 === t || t;
            var n = $.trim(e.textContent);
            return t && (n = n.replace(readability.regexps.normalize, " ")), n
        },
        getCharCount: function(e, t) {
            return t = t || ",", readability.getInnerText(e).split(t).length - 1
        },
        cleanStyles: function(e) {
            e = e || document;
            var t = e.firstChild;
            if (e)
                for ("function" == typeof e.removeAttribute && "pf-styled" !== e.className && (e.setAttribute("orig-style", e.getAttribute("style")), e.removeAttribute("style")); null !== t;) t.nodeType === Node.ELEMENT_NODE && ("pf-styled" !== t.className && (t.setAttribute("orig-style", t.getAttribute("style")), t.removeAttribute("style")), readability.cleanStyles(t)), t = t.nextSibling
        },
        getLinkDensity: function(e) {
            for (var t = e.getElementsByTagName("a"), n = readability.getInnerText(e).length, a = 0, i = 0, r = t.length; i < r; i += 1) a += readability.getInnerText(t[i]).length;
            return a / n
        },
        getClassWeight: function(e) {
            if (!readability.flagIsActive(readability.FLAG_WEIGHT_CLASSES)) return 0;
            var t = 0,
                n = e.id + " " + e.className;
            return -1 !== n.search(readability.regexps.negativePartialWord) && -1 === $.inArray(e.nodeName.toLowerCase(), readability.positiveTags) && (t -= 25), -1 !== n.search(readability.regexps.positivePartialWord) && -1 === $.inArray(e.nodeName.toLowerCase(), readability.negativeTags) && (t += 25), t
        },
        nodeIsVisible: function(e) {
            return (0 !== e.offsetWidth || 0 !== e.offsetHeight) && "none" !== e.style.display.toLowerCase()
        },
        clean: function(e, t) {
            for (var n = e.getElementsByTagName(t), a = "object" === t || "embed" === t, i = n.length - 1; i >= 0; i -= 1) {
                if (a) {
                    for (var r = "", o = 0, s = n[i].attributes.length; o < s; o += 1) r += n[i].attributes[o].value + "|";
                    if (-1 !== r.search(readability.regexps.videos)) continue;
                    if (-1 !== n[i].innerHTML.search(readability.regexps.videos)) continue
                }
                n[i].parentNode.removeChild(n[i])
            }
        },
        htmlspecialchars: function(e) {
            return "string" == typeof e && (e = e.replace(/&/g, "&amp;"), e = e.replace(/"/g, "&quot;"), e = e.replace(/'/g, "&#039;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;")), e
        },
        flagIsActive: function(e) {
            return (readability.flags & e) > 0
        },
        addFlag: function(e) {
            readability.flags = readability.flags | e
        },
        removeFlag: function(e) {
            readability.flags = readability.flags & ~e
        }
    },
    primaryImage = {
        primaryImageSrcs: null,
        find: function() {
            try {
                var e = this.wpPostImage() || this.metaImage() || this.largeImage();
                e && !e.src && (e = e.querySelector("img")), e && e.src && (this.primaryImageSrcs = {
                    toRestore: this.getImageRestoreSrc(e),
                    orig: this.getImageOrigSrc(e)
                })
            } catch (e) {
                exTracker.log(e)
            }
        },
        largeImage: function() {
            for (var e = document.querySelectorAll(".pf-large-image"), t = 0; t < e.length; t++) {
                var n = e[t];
                if (!readability.isUnlikelyCandidate(n, "image") && !readability.hasUnlikelyParent(n)) return n
            }
        },
        wpPostImage: function() {
            var e;
            if ("wordpress" === pfData.config.platform && $.each(readability.wpPostImageSelectors, function(t, n) {
                    var a = $(document).find(n);
                    if (1 === a.size()) return e = a.first(), "FIGURE" === e.parent()[0].nodeName && (e = e.parent()), logger.log("Picked WP Post Image using selector - " + n), !1
                }), e) return e[0]
        },
        metaImage: function() {
            var e = this.metaContentAttr("property", "og:image") || this.metaContentAttr("name", "twitter:image") || this.metaContentAttr("itemprop", "image");
            return e ? this.findSameImage(e, document.body) : null
        },
        metaContentAttr: function(e, t) {
            var n = $.grep(pfData.page.metas, function(n) {
                return n[e] === t
            });
            return n.length ? n[0].content : null
        },
        prependTo: function(e) {
            if (pfData.page.hasPrintOnly && pfData.page.enablePrintOnly) return void logger.log("Primary Image: SKIPPED, has print-only");
            if (!this.primaryImageSrcs) return void logger.log("Primary Image: SKIPPED, no candidates");
            var t = this.primaryImageSrcs.toRestore,
                n = this.primaryImageSrcs.orig;
            this.findSameImage(n, e) ? logger.log("Primary Image: ALREADY EXISTS src = " + n) : (this.prependImage(t, e), logger.log("Primary Image: ADDED src = " + n))
        },
        findSameImage: function(e, t) {
            e = this.cleanSrc(e), e = decodeURI(e);
            var n = null;
            return $("img, picture source", t).each(function() {
                var t = primaryImage.getImageOrigSrc(this);
                if (!t) return !0;
                t = primaryImage.cleanSrc(t), t = decodeURI(t);
                var a = primaryImage.getImageOrigSrcSet(this);
                return a = decodeURI(a), t === e || -1 !== a.indexOf(e) || -1 !== e.indexOf(t) || -1 !== t.indexOf(e) ? (n = this, !1) : void 0
            }), n
        },
        prependImage: function(e, t) {
            var n = pfData.onServer ? "pf-restore-src" : "src";
            toBase64URL(e, function(e) {
                var a = $("<img>").attr(n, e).addClass("blockImage").addClass("pf-primary-img");
                $(t).prepend(a)
            })
        },
        getImageOrigSrc: function(e) {
            return pfData.onServer ? e.getAttribute("pf-orig-src") || e.src : e.src
        },
        getImageRestoreSrc: function(e) {
            return pfData.onServer ? e.getAttribute("pf-restore-src") : e.src
        },
        getImageOrigSrcSet: function(e) {
            return pfData.onServer ? e.getAttribute("pf-orig-srcset") : e.srcset
        },
        cleanSrc: function(e) {
            return e = e.replace(/format=\d+w/g, ""), e = e.replace(/www\./g, ""), e = e.replace(/[-_]\d{1,4}x\d{1,4}/, "")
        }
    },
    imageProcessor = {
        init: function() {
            $doc.find("#pf-content img").addClass("flex-width"), $doc.find(".wp-caption img, .caption img, .tr-caption-container img, .thumbinner img.thumbimage").addClass("caption-img").removeClass("flex-width"), this.resizeImageCssClass = commonUtils.resizeImageCssClass(pfData.userSettings.imagesSize), this.fixLazyLoadImages(), this.fixResponsiveImages(), this.fixMediumImages(), this.convertImagesToBase64(), this.layoutImages.setDisplayStyle(), this.layoutImages.init()
        },
        convertImagesToBase64: function() {
            $("img").each(function() {
                var e = this;
                e.src && toBase64URL(e.src, function(t) {
                    e.src = t
                })
            })
        },
        fixResponsiveImages: function() {
            $doc.find("img[srcset]").each(function() {
                var e = this;
                toBase64URL(e.currentSrc || e.src, function(t) {
                    e.src = t
                }), this.removeAttribute("srcset")
            })
        },
        fixMediumImages: function() {
            $doc.find("img.ix.iy").remove(), $doc.find("img").each(function() {
                var e = this;
                if (e.src && /miro\.medium\.com/i.test(e.src)) {
                    var t = e.src.split("/"),
                        n = t[t.length - 1];
                    $doc.find('img[src*="' + n + '"]').filter(function() {
                        return this !== e
                    }).remove(), e.src = e.src.replace(/q=\d+/, "q=100").replace(/max\/\d+\//, "max/1200/")
                }
            })
        },
        interpolationUrlRegexp: /([\?&][^=]*={[^\}]*})/,
        imgUrlRegexp: /(http(s?):)|([\/|.|\w|\s])*\.(?:jpg|gif|png|img)/i,
        lazyImgDataAttributes: ["original", "data-lazy-src", "data-href", "data-src", "data-pagespeed-lazy-src", "data-original", "data-mediaviewer-src", "datasrc", "data-native-src", "data-original-src", "data-hi-res-src", "data-low-res-src", "data-raw-src", "data-opt-src"],
        normalizeDataSrcAttr: function(e) {
            if (e) {
                var t = this.tryGetSrcFromJson(e);
                return t || e
            }
        },
        findDeepValue: function(e, t) {
            for (var n in e) {
                var a = e[n];
                if ("string" == typeof a && t(a)) return a;
                if ("object" == typeof a) return this.findDeepValue(a, t)
            }
        },
        tryGetSrcFromJson: function(e) {
            var t = {};
            try {
                t = JSON.parse(e)
            } catch (e) {
                return
            }
            return this.findDeepValue(t, function(e) {
                return imageProcessor.isValidImgSrc(e)
            })
        },
        isValidImgSrc: function(e) {
            return this.imgUrlRegexp.test(e)
        },
        extractFirstImageFromSrcset: function(e) {
            try {
                return e.split(",")[0].trim().split(" ")[0]
            } catch (e) {
                return ""
            }
        },
        fixLazyLoadImages: function() {
            $doc.find("picture source[data-srcset]").each(function() {
                this.getAttribute("srcset") || this.setAttribute("srcset", this.getAttribute("data-srcset"))
            }), $doc.find('img[original],img[data-lazy-src],img[data-href],img[data-src],img[data-pagespeed-lazy-src],img[data-original],img[data-mediaviewer-src],img[datasrc],img[data-native-src],img[data-original-src],img[data-hi-res-src],img[data-low-res-src],img[data-raw-src],img[data-opt-src],img.lazyload,img.lazyloaded,img[itemprop="url"],img.js-progressiveMedia-image,a[data-replace-image],amp-img').each(function() {
                for (var e = this, t = $(document.createElement("img")), n = null, a = 0; a < imageProcessor.lazyImgDataAttributes.length; a++) {
                    var i = imageProcessor.normalizeDataSrcAttr(this.getAttribute(imageProcessor.lazyImgDataAttributes[a]));
                    if (i && i.indexOf(";base64,") < 0) {
                        n = i;
                        break
                    }
                }
                if (!(n = n || this.getAttribute("href")) && pfData.page.location.host.match(/yahoo/)) {
                    var r = this.getAttribute("orig-style");
                    n = r && r.match(/(http.*?)\)/) ? r.match(/(http.*?)\)/)[1] : this.getAttribute("src")
                }
                n || (n = e.getAttribute("src")), pfData.config.isExtension && n && 0 === n.indexOf("//") && (n = pfData.page.location.protocol + n);
                var o = e.getAttribute("data-srcset") || e.getAttribute("srcset");
                n || (n = imageProcessor.extractFirstImageFromSrcset(o)), t[0].className = e.className, copyDataset(t[0], e);
                var s = parseInt(e.getAttribute("width"), 10),
                    c = parseInt(e.getAttribute("height"), 10);
                s > 1 && (t[0].width = s), c > 1 && (t[0].height = c), e.parentNode.replaceChild(t[0], e), t.on({
                    load: function() {
                        imageProcessor.layoutImages.layoutImage(t), t[0].src = t[0].src, toBase64URL(t[0].src, function(e) {
                            t[0].src = e
                        }), t.off("load")
                    },
                    error: function() {
                        var e = t.attr("src").replace(imageProcessor.interpolationUrlRegexp, "");
                        e !== t.attr("src") && t.attr("src", e)
                    }
                }), n ? t[0].src = n : o && (t[0].srcset = o)
            })
        },
        layoutImages: {
            thresholds: {
                blockImage: {
                    width: 369
                },
                smallImage: {
                    width: 100,
                    height: 60
                }
            },
            layoutImage: function(e) {
                if ("none" === e[0].dataset.pf_style_display) return !0;
                var t = this;
                window.setTimeout(function() {
                    t.setImgClass(e)
                }, 250)
            },
            setImgClass: function(e) {
                var t, n = commonUtils.getImageWidth(e, pfData.onServer),
                    a = commonUtils.getImageHeight(e, pfData.onServer);
                if (0 !== n && (e.removeClass("blockImage mediumImage smallImage"), t = e.hasClass("pf-primary-img") || n > this.thresholds.blockImage.width ? "blockImage" : n < this.thresholds.smallImage.width && a < this.thresholds.smallImage.height ? "smallImage" : "mediumImage", e.addClass(t), e.hasClass("caption-img"))) {
                    var i = e.parents(".pf-caption, .wp-caption, .caption, .tr-caption-container");
                    e[0].offsetWidth && 1 === i.find("img").length && i.width(e[0].offsetWidth), i.addClass("pf-caption flex-width").addClass(t).addClass(imageProcessor.resizeImageCssClass), e.hasClass("thumbimage") && e.parents(".thumbinner").width(e[0].offsetWidth).addClass("pf-caption flex-width").addClass(t).addClass(imageProcessor.resizeImageCssClass)
                }
            },
            setDisplayStyle: function() {
                var e = "right",
                    t = ["left", "right", "block", "none"],
                    n = {
                        margin: "1em 0 1em 1.5em",
                        clear: "right",
                        display: "inline-block",
                        "float": "right"
                    }; - 1 !== $.inArray(pfData.userSettings.imageDisplayStyle, t) && (e = pfData.userSettings.imageDisplayStyle), "block" === e ? n = {
                    margin: "1em auto",
                    clear: "both",
                    display: "block",
                    "float": "none"
                } : "none" === e ? (n.margin = "0", n["float"] = "none") : "left" === e && (n.margin = "1em 1.5em 1em 0", n["float"] = "left");
                var a = "#pf-content img.mediumImage, #pf-content figure.mediumImage {";
                for (var i in n) a += i + ": " + n[i] + ";";
                a += "}", commonUtils.addCSS(a, document, !0)
            },
            init: function() {
                $doc.find("#pf-content img").each(function() {
                    var e = $(this);
                    e.hasClass("pf-svg-image") || this.removeAttribute("height"), 0 === commonUtils.getImageWidth(e, pfData.onServer) ? (e.load(function() {
                        imageProcessor.layoutImages.layoutImage(e)
                    }), window.setTimeout(function() {
                        imageProcessor.layoutImages.layoutImage(e)
                    }, 2e3)) : imageProcessor.layoutImages.layoutImage(e)
                })
            }
        }
    },
    helper = {
        findNotEmptyParent: function(e) {
            var t = e.parent();
            if (0 !== t.length) return t.children().length > 1 || 0 !== $.trim(t.text()).length ? {
                parent: t,
                tag: e
            } : this.findNotEmptyParent(t)
        },
        runPostAlgoProcesses: function(e) {
            try {
                pfData.onServer && nsfwChecker.checkText(e.contentTextWithTitleAndUrl), e.hasContent && (this.addHeaderFooter(), pfData.onServer || imageProcessor.init()), coreWindow.postMessage({
                    type: "PfRunPostAlgoProcesses",
                    payload: {
                        contentData: e
                    }
                }, "*")
            } catch (t) {
                exTracker.log(t), coreWindow.postMessage({
                    type: "PfRunPostAlgoProcesses",
                    payload: {
                        contentData: e
                    }
                }, "*")
            }
        },
        pickTitleFromContent: function() {
            var e = ["h1", "h2", "h3"];
            $.each(e, function(e, t) {
                var n = $doc.find(t);
                return 1 == n.size() && "" !== $.trim(n.text()) ? (readability.titleText = $.trim(n.text()), readability.titleTags.push(t), logger.log("Picking possible title from content - " + readability.titleText), !1) : !(n.size() > 1) && void 0
            })
        },
        isRecipeIngredient: function(e) {
            var t = -1 !== e.search(readability.regexps.weight),
                n = -1 !== e.search(readability.regexps.fractions),
                a = -1 !== e.search(readability.regexps.cookingWords);
            return t || n || a
        },
        addHeaderFooter: function() {
            var e = [];
            "" !== $.trim(pfData.userSettings.headerImageUrl) && e.push('<img id="pf-header-img" src="' + $.trim(pfData.userSettings.headerImageUrl) + '"/>'), "" !== $.trim(pfData.userSettings.headerTagline) && e.push('<p id="pf-tagline">' + unescape($.trim(pfData.userSettings.headerTagline)) + "</p>"), pfData.config.disableUI || e.push(this.headerHtml());
            var t = $(".algo-author", readability.articleContent);
            readability.author && 0 === t.length ? e.push(readability.author) : contentData.author = "", readability.pubDate && (e.push("<span id='pf-date'>" + readability.pubDate + "</span>"), contentData.pubDate = readability.pubDate), $(e.join("")).insertBefore($doc.find("#pf-content")), $doc.find("#pf-title").insertBefore($doc.find("#pf-src")), readability.customHeader && ($(readability.customHeader, document).insertBefore($doc.find("#pf-title")), contentData.customHeader = $(readability.customHeader).html()), readability.customFooter && ($doc.find("body").append(readability.customFooter), contentData.customFooter = $(readability.customFooter).html()), readability.copyright && ($doc.find("body").append(readability.copyright), contentData.copyright = readability.copyright.html())
        },
        headerHtml: function() {
            var e = pfData.config.urls.page;
            try {
                e = decodeURI(e)
            } catch (e) {}
            var t = encodeURI(e),
                n = pfData.page.location,
                a = decodeURI(n.host).replace(/^www\./, ""),
                i = decodeURI(n.pathname).replace(/\/$/, "");
            return '<div id="pf-src"><a id="pf-src-url" href="' + t + '"><img id="pf-src-icon" src="' + pfData.page.favicon + '" ><strong>' + a + "</strong><span>" + i + "</span></a></div>"
        },
        extractText: function(e, t) {
            var n, a = t.childNodes,
                i = a.length;
            if (t.nodeType === Node.TEXT_NODE) {
                var r = $.trim(t.nodeValue);
                "" !== r && e.push(r)
            } else if (i > 1 || 1 === i && a[0].nodeType != Node.TEXT_NODE)
                for (var o = 0; o < i; o++) helper.extractText(e, a[o]);
            else "" != (n = $.trim($(t).text())) && e.push(n)
        },
        findMeta: function(e, t, n) {
            return $.grep(e, function(e) {
                return e[t] === n
            })
        },
        isExclusiveBlockElement: function(e) {
            return e.children && 1 === e.children.length && "block" === e.dataset.pf_style_display
        },
        hasParentAndGrandParent: function(e, t) {
            return e && t && "undefined" !== t.tagName && "BODY" !== t.tagName && "BODY" !== e.tagName && "HTML" !== t.tagName
        },
        findNonExclusiveParent: function(e) {
            for (var t = e.parentNode, n = t ? t.parentNode : null; this.hasParentAndGrandParent(t, n) && this.isExclusiveBlockElement(t);) t = n, n = n.parentNode;
            return t
        },
        addClassToElement: function(e, t) {
            this.elementHasClass(e, t) || (e.classList ? e.classList.add(t) : e.className += " " + t)
        },
        elementHasClass: function(e, t) {
            return e.classList ? e.classList.contains(t) : new RegExp("(^| )" + t + "( |$)", "gi").test(e.className)
        },
        getCommonAncestor: function(e) {
            if (e.length < 2) throw new Error("getCommonAncestor: not enough parameters");
            var t, n = e.shift(),
                a = "contains" in n ? "contains" : "compareDocumentPosition",
                i = "contains" === a ? 1 : 16;
            e: for (; n = n.parentNode;) {
                for (t = e.length; t--;)
                    if ((n[a](e[t]) & i) !== i) continue e;
                return n
            }
            return null
        }
    },
    htmlPreProcessor = {
        run: function() {
            var e;
            if ("medium" === pfData.config.platform && ($(".js-progressiveMedia-canvas, .js-progressiveMedia-thumbnail").remove(), $(".js-progressiveMedia-image").removeClass("hidden-originally")), $("script,link,style,noscript,object,embed,.comment-list", document.body).remove(), this.replaceEmbeddedYoutube(), $("iframe").not(".twitter-tweet-rendered").remove(), this.fixSvgUseTags(), pfData.onServer) e = $.Deferred().resolve();
            else try {
                this.fixCanvases();
                var t = this.fixInlineSvgs(),
                    n = this.fixSvgImages();
                e = $.when(t, n)
            } catch (t) {
                logger.error(t), e = $.Deferred().reject()
            }
            return e.promise()
        },
        fixCanvases: function() {
            for (var e = document.getElementsByTagName("canvas"), t = pfData.page.canvasDataUrls, n = e.length - 1; n >= 0; n--) {
                var a = e[n];
                this.convertCanvasToImage(a, t[a.getAttribute("pf-dataurl-index")])
            }
        },
        replaceEmbeddedYoutube: function() {
            var e = "https://www.youtube.com/embed/";
            $("iframe[src^='" + e + "']").each(function() {
                var t = {
                        id: null,
                        type: null,
                        href: null,
                        thumb: null
                    },
                    n = this.src.match(new RegExp(e + "([^?]+)"));
                if (n) {
                    var a = n[1];
                    t.type = "video", t.href = "https://youtu.be/" + a, t.thumb = "https://img.youtube.com/vi/" + a + "/hqdefault.jpg"
                } else {
                    var i = this.src.match(new RegExp(e + ".*list=([^;&]+)"));
                    if (i) {
                        var a = i[1];
                        t.type = "playlist", t.href = "https://www.youtube.com/playlist?list=" + a, t.thumb = "https://img.youtube.com/vi/" + a + "/hqdefault.jpg"
                    }
                }
                if (t.type) {
                    var r = document.createElement("a");
                    r.href = t.href, r.dataset.pfAllowEmpty = !0, r.classList.add("youtube-replace-link");
                    var o = document.createElement("img");
                    o.src = t.thumb, o.setAttribute("pf-restore-src", t.thumb), o.classList.add("youtube-replace-img");
                    var s = document.createElement("span");
                    s.textContent = t.href, this.parentElement.replaceChild(r, this), r.appendChild(o), r.appendChild(s)
                }
            })
        },
        fixInlineSvgs: function() {
            var e = $("svg").map(function() {
                return htmlPreProcessor.convertSvgToPng(this)
            });
            return $.when.apply($, e)
        },
        fixSvgImages: function() {
            var e = /\.svg(\?.+)?$/i,
                t = $("img").filter(function() {
                    return e.test(this.getAttribute("src"))
                }).map(function() {
                    var e = $.Deferred();
                    return this.onload = function() {
                        if ("pending" === e.state()) try {
                            var t = htmlPreProcessor.convertToPng(this);
                            this.parentNode && this.parentNode.replaceChild(t, this), e.resolve()
                        } catch (t) {
                            logger.error(t), e.reject()
                        }
                    }, this.onerror = function() {
                        this.parentNode && this.parentNode.removeChild(this), e.reject()
                    }, window.setTimeout(function() {
                        e.resolve()
                    }, 2e3), e.promise()
                });
            return $.when.apply($, t)
        },
        convertToPng: function(e) {
            var t = commonUtils.getImageWidth(e, pfData.onServer) || e.width,
                n = commonUtils.getImageHeight(e, pfData.onServer) || e.height,
                a = document.createElement("canvas");
            a.width = t, a.height = n, a.getContext("2d").drawImage(e, 0, 0, t, n);
            var i = a.toDataURL("image/png"),
                r = new Image(t, n);
            r.src = i;
            var o = e.getAttribute("class");
            return o && r.setAttribute("class", o), r
        },
        convertSvgToPng: function(e) {
            var t = $.Deferred(),
                n = commonUtils.getImageWidth(e, pfData.onServer),
                a = commonUtils.getImageHeight(e, pfData.onServer);
            if (0 === n || 0 === a) return e.parentNode.removeChild(e), t.resolve();
            this.fixSvgAttrs(e, n, a);
            var i = htmlPreProcessor.scaleImageDimensions({
                    width: n,
                    height: a
                }),
                r = new Image(i.width, i.height);
            r.onload = function() {
                if ("pending" === t.state()) try {
                    var n = htmlPreProcessor.convertToPng(this),
                        a = (e.getAttribute("class") || "") + " pf-svg-image";
                    n.setAttribute("class", a), e.parentNode && e.parentNode.replaceChild(n, e), t.resolve()
                } catch (e) {
                    logger.error(e), t.reject()
                }
            }, r.onerror = function() {
                t.reject()
            }, window.setTimeout(function() {
                t.resolve()
            }, 2e3);
            var o = (new XMLSerializer).serializeToString(e);
            return r.src = "data:image/svg+xml," + encodeURIComponent(o), t.promise()
        },
        fixSvgUseTags: function() {
            $("svg").each(function() {
                var e = $(this);
                e.find("use").each(function() {
                    var t = $(this),
                        n = t.attr("xlink:href");
                    if (!n || "#" !== n[0]) return e.remove(), !1;
                    var a = [];
                    try {
                        a = $(t.attr("xlink:href"))
                    } catch (e) {}
                    if (!a.length) return e.remove(), !1;
                    t.replaceWith(a.children().clone())
                })
            })
        },
        fixSvgAttrs: function(e, t, n) {
            e.getAttribute("version") || e.setAttribute("version", 1.1), e.getAttribute("xmlns") || e.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            try {
                e.setAttribute("width", t), e.setAttribute("height", n)
            } catch (e) {}
        },
        convertCanvasToImage: function(e, t) {
            var n, a;
            n = e.getAttribute("class"), n = n || "", n += " canvas-png", a = new Image, a.src = t, a.setAttribute("class", n), e.parentNode.replaceChild(a, e)
        },
        scaleImageDimensions: function(e) {
            if (e.width = parseInt(e.width, 10), e.height = parseInt(e.height, 10), e.width > pfData.config.maxImageWidth) {
                var t = pfData.config.maxImageWidth / e.width;
                e.width = e.width * t, e.height = e.height * t
            }
            return e
        }
    };
analytics.setCoreWindow(coreWindow);
var nsfwChecker = {
    matchedPhrase: "",
    state: $.Deferred(),
    checkText: function(e) {
        this.state.then(function(e) {
            contentData.nsfwState = e, contentData.nsfwMatchedPhrase = nsfwChecker.matchedPhrase, coreWindow.postMessage({
                type: "PfNSFWChecked",
                payload: {
                    state: e,
                    matchedPhrase: nsfwChecker.matchedPhrase
                }
            }, "*")
        });
        var t = pfData.page.language || "en";
        t = t.split("-")[0];
        var n = ["hi", "sv", "es", "da", "tr", "tlh", "fi", "hu", "th", "zh", "pt", "it", "no", "eo", "de", "cs", "en", "nl", "ja", "ko", "pl", "ru", "fr", "vn"]; - 1 != $.inArray(t, n) ? $.getJSON("https://cdn.printfriendly.com/assets/client/nsfw/nsfw-422e95cf871fd8a10362f9736c478e30a655779b4dabe4a77f207ec110fdbba9.json", function(n) {
            nsfwChecker.checkContentForPhrases(e, n, t)
        }).error(function() {
            nsfwChecker.state.resolve("unknown")
        }) : this.state.resolve("unknown")
    },
    checkContentForPhrases: function(e, t, n) {
        logger.time("Check for NSFW");
        var a = "(?:^|\\s|$|\\.|,|!|\\?|\\)|\\(|\"|')";
        t[n] || (n = "en");
        var i = t.common.concat(t[n]),
            r = new RegExp(a + "(" + i.join("|") + ")" + a, "i"),
            o = e.match(r);
        o ? (nsfwChecker.matchedPhrase = o[0], logger.log("NSFW detected: " + nsfwChecker.matchedPhrase), this.state.resolve("present")) : this.state.resolve("absent"), logger.timeEnd("Check for NSFW")
    }
};