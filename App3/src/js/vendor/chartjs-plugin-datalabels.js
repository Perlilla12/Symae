/*!
 * chartjs-plugin-datalabels v0.7.0
 * https://chartjs-plugin-datalabels.netlify.com
 * (c) 2019 Chart.js Contributors
 * Released under the MIT license
 */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e(require('chart.js')))
    : 'function' == typeof define && define.amd
    ? define(['chart.js'], e)
    : ((t = t || self).ChartDataLabels = e(t.Chart));
})(this, function (t) {
  'use strict';
  var e = (t = t && t.hasOwnProperty('default') ? t.default : t).helpers,
    r = (function () {
      if ('undefined' != typeof window) {
        if (window.devicePixelRatio) return window.devicePixelRatio;
        var t = window.screen;
        if (t) return (t.deviceXDPI || 1) / (t.logicalXDPI || 1);
      }
      return 1;
    })(),
    n = {
      toTextLines: function (t) {
        var r,
          n = [];
        for (t = [].concat(t); t.length; )
          'string' == typeof (r = t.pop())
            ? n.unshift.apply(n, r.split('\n'))
            : Array.isArray(r)
            ? t.push.apply(t, r)
            : e.isNullOrUndef(t) || n.unshift('' + r);
        return n;
      },
      toFontString: function (t) {
        return !t || e.isNullOrUndef(t.size) || e.isNullOrUndef(t.family)
          ? null
          : (t.style ? t.style + ' ' : '') + (t.weight ? t.weight + ' ' : '') + t.size + 'px ' + t.family;
      },
      textSize: function (t, e, r) {
        var n,
          i = [].concat(e),
          o = i.length,
          a = t.font,
          l = 0;
        for (t.font = r.string, n = 0; n < o; ++n) l = Math.max(t.measureText(i[n]).width, l);
        return (t.font = a), {height: o * r.lineHeight, width: l};
      },
      parseFont: function (r) {
        var i = t.defaults.global,
          o = e.valueOrDefault(r.size, i.defaultFontSize),
          a = {
            family: e.valueOrDefault(r.family, i.defaultFontFamily),
            lineHeight: e.options.toLineHeight(r.lineHeight, o),
            size: o,
            style: e.valueOrDefault(r.style, i.defaultFontStyle),
            weight: e.valueOrDefault(r.weight, null),
            string: '',
          };
        return (a.string = n.toFontString(a)), a;
      },
      bound: function (t, e, r) {
        return Math.max(t, Math.min(e, r));
      },
      arrayDiff: function (t, e) {
        var r,
          n,
          i,
          o,
          a = t.slice(),
          l = [];
        for (r = 0, i = e.length; r < i; ++r) (o = e[r]), -1 === (n = a.indexOf(o)) ? l.push([o, 1]) : a.splice(n, 1);
        for (r = 0, i = a.length; r < i; ++r) l.push([a[r], -1]);
        return l;
      },
      rasterize: function (t) {
        return Math.round(t * r) / r;
      },
    };
  function i(t, e) {
    var r = e.x,
      n = e.y;
    if (null === r) return {x: 0, y: -1};
    if (null === n) return {x: 1, y: 0};
    var i = t.x - r,
      o = t.y - n,
      a = Math.sqrt(i * i + o * o);
    return {x: a ? i / a : 0, y: a ? o / a : -1};
  }
  var o = 0,
    a = 1,
    l = 2,
    s = 4,
    u = 8;
  function f(t, e, r) {
    var n = o;
    return t < r.left ? (n |= a) : t > r.right && (n |= l), e < r.top ? (n |= u) : e > r.bottom && (n |= s), n;
  }
  function d(t, e) {
    var r,
      n,
      i = e.anchor,
      o = t;
    return (
      e.clamp &&
        (o = (function (t, e) {
          for (var r, n, i, o = t.x0, d = t.y0, c = t.x1, h = t.y1, x = f(o, d, e), y = f(c, h, e); x | y && !(x & y); )
            (r = x || y) & u
              ? ((n = o + ((c - o) * (e.top - d)) / (h - d)), (i = e.top))
              : r & s
              ? ((n = o + ((c - o) * (e.bottom - d)) / (h - d)), (i = e.bottom))
              : r & l
              ? ((i = d + ((h - d) * (e.right - o)) / (c - o)), (n = e.right))
              : r & a && ((i = d + ((h - d) * (e.left - o)) / (c - o)), (n = e.left)),
              r === x ? (x = f((o = n), (d = i), e)) : (y = f((c = n), (h = i), e));
          return {x0: o, x1: c, y0: d, y1: h};
        })(o, e.area)),
      'start' === i ? ((r = o.x0), (n = o.y0)) : 'end' === i ? ((r = o.x1), (n = o.y1)) : ((r = (o.x0 + o.x1) / 2), (n = (o.y0 + o.y1) / 2)),
      (function (t, e, r, n, i) {
        switch (i) {
          case 'center':
            r = n = 0;
            break;
          case 'bottom':
            (r = 0), (n = 1);
            break;
          case 'right':
            (r = 1), (n = 0);
            break;
          case 'left':
            (r = -1), (n = 0);
            break;
          case 'top':
            (r = 0), (n = -1);
            break;
          case 'start':
            (r = -r), (n = -n);
            break;
          case 'end':
            break;
          default:
            (i *= Math.PI / 180), (r = Math.cos(i)), (n = Math.sin(i));
        }
        return {x: t, y: e, vx: r, vy: n};
      })(r, n, t.vx, t.vy, e.align)
    );
  }
  var c = {
      arc: function (t, e) {
        var r = (t.startAngle + t.endAngle) / 2,
          n = Math.cos(r),
          i = Math.sin(r),
          o = t.innerRadius,
          a = t.outerRadius;
        return d({x0: t.x + n * o, y0: t.y + i * o, x1: t.x + n * a, y1: t.y + i * a, vx: n, vy: i}, e);
      },
      point: function (t, e) {
        var r = i(t, e.origin),
          n = r.x * t.radius,
          o = r.y * t.radius;
        return d({x0: t.x - n, y0: t.y - o, x1: t.x + n, y1: t.y + o, vx: r.x, vy: r.y}, e);
      },
      rect: function (t, e) {
        var r = i(t, e.origin),
          n = t.x,
          o = t.y,
          a = 0,
          l = 0;
        return (
          t.horizontal ? ((n = Math.min(t.x, t.base)), (a = Math.abs(t.base - t.x))) : ((o = Math.min(t.y, t.base)), (l = Math.abs(t.base - t.y))),
          d({x0: n, y0: o + l, x1: n + a, y1: o, vx: r.x, vy: r.y}, e)
        );
      },
      fallback: function (t, e) {
        var r = i(t, e.origin);
        return d({x0: t.x, y0: t.y, x1: t.x, y1: t.y, vx: r.x, vy: r.y}, e);
      },
    },
    h = t.helpers,
    x = n.rasterize;
  function y(t) {
    var e = t._model.horizontal,
      r = t._scale || (e && t._xScale) || t._yScale;
    if (!r) return null;
    if (void 0 !== r.xCenter && void 0 !== r.yCenter) return {x: r.xCenter, y: r.yCenter};
    var n = r.getBasePixel();
    return e ? {x: n, y: null} : {x: null, y: n};
  }
  function v(t, e, r) {
    var n = t.shadowBlur,
      i = r.stroked,
      o = x(r.x),
      a = x(r.y),
      l = x(r.w);
    i && t.strokeText(e, o, a, l), r.filled && (n && i && (t.shadowBlur = 0), t.fillText(e, o, a, l), n && i && (t.shadowBlur = n));
  }
  var _ = function (t, e, r, n) {
    var i = this;
    (i._config = t), (i._index = n), (i._model = null), (i._rects = null), (i._ctx = e), (i._el = r);
  };
  h.extend(_.prototype, {
    _modelize: function (e, r, i, o) {
      var a,
        l = this._index,
        s = h.options.resolve,
        u = n.parseFont(s([i.font, {}], o, l)),
        f = s([i.color, t.defaults.global.defaultFontColor], o, l);
      return {
        align: s([i.align, 'center'], o, l),
        anchor: s([i.anchor, 'center'], o, l),
        area: o.chart.chartArea,
        backgroundColor: s([i.backgroundColor, null], o, l),
        borderColor: s([i.borderColor, null], o, l),
        borderRadius: s([i.borderRadius, 0], o, l),
        borderWidth: s([i.borderWidth, 0], o, l),
        clamp: s([i.clamp, !1], o, l),
        clip: s([i.clip, !1], o, l),
        color: f,
        display: e,
        font: u,
        lines: r,
        offset: s([i.offset, 0], o, l),
        opacity: s([i.opacity, 1], o, l),
        origin: y(this._el),
        padding: h.options.toPadding(s([i.padding, 0], o, l)),
        positioner:
          ((a = this._el),
          a instanceof t.elements.Arc ? c.arc : a instanceof t.elements.Point ? c.point : a instanceof t.elements.Rectangle ? c.rect : c.fallback),
        rotation: s([i.rotation, 0], o, l) * (Math.PI / 180),
        size: n.textSize(this._ctx, r, u),
        textAlign: s([i.textAlign, 'start'], o, l),
        textShadowBlur: s([i.textShadowBlur, 0], o, l),
        textShadowColor: s([i.textShadowColor, f], o, l),
        textStrokeColor: s([i.textStrokeColor, f], o, l),
        textStrokeWidth: s([i.textStrokeWidth, 0], o, l),
      };
    },
    update: function (t) {
      var e,
        r,
        i,
        o = this,
        a = null,
        l = null,
        s = o._index,
        u = o._config,
        f = h.options.resolve([u.display, !0], t, s);
      f &&
        ((e = t.dataset.data[s]),
        (r = h.valueOrDefault(h.callback(u.formatter, [e, t]), e)),
        (i = h.isNullOrUndef(r) ? [] : n.toTextLines(r)).length &&
          (l = (function (t) {
            var e = t.borderWidth || 0,
              r = t.padding,
              n = t.size.height,
              i = t.size.width,
              o = -i / 2,
              a = -n / 2;
            return {frame: {x: o - r.left - e, y: a - r.top - e, w: i + r.width + 2 * e, h: n + r.height + 2 * e}, text: {x: o, y: a, w: i, h: n}};
          })((a = o._modelize(f, i, u, t))))),
        (o._model = a),
        (o._rects = l);
    },
    geometry: function () {
      return this._rects ? this._rects.frame : {};
    },
    rotation: function () {
      return this._model ? this._model.rotation : 0;
    },
    visible: function () {
      return this._model && this._model.opacity;
    },
    model: function () {
      return this._model;
    },
    draw: function (t, e) {
      var r,
        i = t.ctx,
        o = this._model,
        a = this._rects;
      this.visible() &&
        (i.save(),
        o.clip && ((r = o.area), i.beginPath(), i.rect(r.left, r.top, r.right - r.left, r.bottom - r.top), i.clip()),
        (i.globalAlpha = n.bound(0, o.opacity, 1)),
        i.translate(x(e.x), x(e.y)),
        i.rotate(o.rotation),
        (function (t, e, r) {
          var n = r.backgroundColor,
            i = r.borderColor,
            o = r.borderWidth;
          (n || (i && o)) &&
            (t.beginPath(),
            h.canvas.roundedRect(t, x(e.x) + o / 2, x(e.y) + o / 2, x(e.w) - o, x(e.h) - o, r.borderRadius),
            t.closePath(),
            n && ((t.fillStyle = n), t.fill()),
            i && o && ((t.strokeStyle = i), (t.lineWidth = o), (t.lineJoin = 'miter'), t.stroke()));
        })(i, a.frame, o),
        (function (t, e, r, n) {
          var i,
            o = n.textAlign,
            a = n.color,
            l = !!a,
            s = n.font,
            u = e.length,
            f = n.textStrokeColor,
            d = n.textStrokeWidth,
            c = f && d;
          if (u && (l || c))
            for (
              r = (function (t, e, r) {
                var n = r.lineHeight,
                  i = t.w,
                  o = t.x;
                return 'center' === e ? (o += i / 2) : ('end' !== e && 'right' !== e) || (o += i), {h: n, w: i, x: o, y: t.y + n / 2};
              })(r, o, s),
                t.font = s.string,
                t.textAlign = o,
                t.textBaseline = 'middle',
                t.shadowBlur = n.textShadowBlur,
                t.shadowColor = n.textShadowColor,
                l && (t.fillStyle = a),
                c && ((t.lineJoin = 'round'), (t.lineWidth = d), (t.strokeStyle = f)),
                i = 0,
                u = e.length;
              i < u;
              ++i
            )
              v(t, e[i], {stroked: c, filled: l, w: r.w, x: r.x, y: r.y + r.h * i});
        })(i, o.lines, a.text, o),
        i.restore());
    },
  });
  var b = t.helpers,
    p = Number.MIN_SAFE_INTEGER || -9007199254740991,
    g = Number.MAX_SAFE_INTEGER || 9007199254740991;
  function m(t, e, r) {
    var n = Math.cos(r),
      i = Math.sin(r),
      o = e.x,
      a = e.y;
    return {x: o + n * (t.x - o) - i * (t.y - a), y: a + i * (t.x - o) + n * (t.y - a)};
  }
  function w(t, e) {
    var r,
      n,
      i,
      o,
      a,
      l = g,
      s = p,
      u = e.origin;
    for (r = 0; r < t.length; ++r) (i = (n = t[r]).x - u.x), (o = n.y - u.y), (a = e.vx * i + e.vy * o), (l = Math.min(l, a)), (s = Math.max(s, a));
    return {min: l, max: s};
  }
  function k(t, e) {
    var r = e.x - t.x,
      n = e.y - t.y,
      i = Math.sqrt(r * r + n * n);
    return {vx: (e.x - t.x) / i, vy: (e.y - t.y) / i, origin: t, ln: i};
  }
  var M = function () {
    (this._rotation = 0), (this._rect = {x: 0, y: 0, w: 0, h: 0});
  };
  function S(t, e, r) {
    var n = e.positioner(t, e),
      i = n.vx,
      o = n.vy;
    if (!i && !o) return {x: n.x, y: n.y};
    var a = r.w,
      l = r.h,
      s = e.rotation,
      u = Math.abs((a / 2) * Math.cos(s)) + Math.abs((l / 2) * Math.sin(s)),
      f = Math.abs((a / 2) * Math.sin(s)) + Math.abs((l / 2) * Math.cos(s)),
      d = 1 / Math.max(Math.abs(i), Math.abs(o));
    return (u *= i * d), (f *= o * d), (u += e.offset * i), (f += e.offset * o), {x: n.x + u, y: n.y + f};
  }
  b.extend(M.prototype, {
    center: function () {
      var t = this._rect;
      return {x: t.x + t.w / 2, y: t.y + t.h / 2};
    },
    update: function (t, e, r) {
      (this._rotation = r), (this._rect = {x: e.x + t.x, y: e.y + t.y, w: e.w, h: e.h});
    },
    contains: function (t) {
      var e = this._rect;
      return !((t = m(t, this.center(), -this._rotation)).x < e.x - 1 || t.y < e.y - 1 || t.x > e.x + e.w + 2 || t.y > e.y + e.h + 2);
    },
    intersects: function (t) {
      var e,
        r,
        n,
        i = this._points(),
        o = t._points(),
        a = [k(i[0], i[1]), k(i[0], i[3])];
      for (this._rotation !== t._rotation && a.push(k(o[0], o[1]), k(o[0], o[3])), e = 0; e < a.length; ++e)
        if (((r = w(i, a[e])), (n = w(o, a[e])), r.max < n.min || n.max < r.min)) return !1;
      return !0;
    },
    _points: function () {
      var t = this._rect,
        e = this._rotation,
        r = this.center();
      return [m({x: t.x, y: t.y}, r, e), m({x: t.x + t.w, y: t.y}, r, e), m({x: t.x + t.w, y: t.y + t.h}, r, e), m({x: t.x, y: t.y + t.h}, r, e)];
    },
  });
  var C = {
      prepare: function (t) {
        var e,
          r,
          n,
          i,
          o,
          a = [];
        for (e = 0, n = t.length; e < n; ++e)
          for (r = 0, i = t[e].length; r < i; ++r) (o = t[e][r]), a.push(o), (o.$layout = {_box: new M(), _hidable: !1, _visible: !0, _set: e, _idx: r});
        return (
          a.sort(function (t, e) {
            var r = t.$layout,
              n = e.$layout;
            return r._idx === n._idx ? n._set - r._set : n._idx - r._idx;
          }),
          this.update(a),
          a
        );
      },
      update: function (t) {
        var e,
          r,
          n,
          i,
          o,
          a = !1;
        for (e = 0, r = t.length; e < r; ++e)
          (i = (n = t[e]).model()), ((o = n.$layout)._hidable = i && 'auto' === i.display), (o._visible = n.visible()), (a |= o._hidable);
        a &&
          (function (t) {
            var e, r, n, i, o, a;
            for (e = 0, r = t.length; e < r; ++e)
              (i = (n = t[e]).$layout)._visible && ((o = n.geometry()), (a = S(n._el._model, n.model(), o)), i._box.update(a, o, n.rotation()));
            (function (t, e) {
              var r, n, i, o;
              for (r = t.length - 1; r >= 0; --r)
                for (i = t[r].$layout, n = r - 1; n >= 0 && i._visible; --n) (o = t[n].$layout)._visible && i._box.intersects(o._box) && e(i, o);
            })(t, function (t, e) {
              var r = t._hidable,
                n = e._hidable;
              (r && n) || n ? (e._visible = !1) : r && (t._visible = !1);
            });
          })(t);
      },
      lookup: function (t, e) {
        var r, n;
        for (r = t.length - 1; r >= 0; --r) if ((n = t[r].$layout) && n._visible && n._box.contains(e)) return t[r];
        return null;
      },
      draw: function (t, e) {
        var r, n, i, o, a, l;
        for (r = 0, n = e.length; r < n; ++r)
          (o = (i = e[r]).$layout)._visible && ((a = i.geometry()), (l = S(i._el._view, i.model(), a)), o._box.update(l, a, i.rotation()), i.draw(t, l));
      },
    },
    z = t.helpers,
    $ = {
      align: 'center',
      anchor: 'center',
      backgroundColor: null,
      borderColor: null,
      borderRadius: 0,
      borderWidth: 0,
      clamp: !1,
      clip: !1,
      color: void 0,
      display: !0,
      font: {family: void 0, lineHeight: 1.2, size: void 0, style: void 0, weight: null},
      formatter: function (t) {
        if (z.isNullOrUndef(t)) return null;
        var e,
          r,
          n,
          i = t;
        if (z.isObject(t))
          if (z.isNullOrUndef(t.label))
            if (z.isNullOrUndef(t.r)) for (i = '', n = 0, r = (e = Object.keys(t)).length; n < r; ++n) i += (0 !== n ? ', ' : '') + e[n] + ': ' + t[e[n]];
            else i = t.r;
          else i = t.label;
        return '' + i;
      },
      labels: void 0,
      listeners: {},
      offset: 4,
      opacity: 1,
      padding: {top: 4, right: 4, bottom: 4, left: 4},
      rotation: 0,
      textAlign: 'start',
      textStrokeColor: void 0,
      textStrokeWidth: 0,
      textShadowBlur: 0,
      textShadowColor: void 0,
    },
    O = t.helpers,
    A = '$datalabels',
    D = '$default';
  function P(t, e, r) {
    if (e) {
      var n,
        i = r.$context,
        o = r.$groups;
      e[o._set] && (n = e[o._set][o._key]) && !0 === O.callback(n, [i]) && ((t[A]._dirty = !0), r.update(i));
    }
  }
  function N(t, e) {
    var r,
      n,
      i = t[A],
      o = i._listeners;
    if (o.enter || o.leave) {
      if ('mousemove' === e.type) n = C.lookup(i._labels, e);
      else if ('mouseout' !== e.type) return;
      (r = i._hovered),
        (i._hovered = n),
        (function (t, e, r, n) {
          var i, o;
          (r || n) && (r ? (n ? r !== n && (o = i = !0) : (o = !0)) : (i = !0), o && P(t, e.leave, r), i && P(t, e.enter, n));
        })(t, o, r, n);
    }
  }
  t.defaults.global.plugins.datalabels = $;
  var R = {
    id: 'datalabels',
    beforeInit: function (t) {
      t[A] = {_actives: []};
    },
    beforeUpdate: function (t) {
      var e = t[A];
      (e._listened = !1), (e._listeners = {}), (e._datasets = []), (e._labels = []);
    },
    afterDatasetUpdate: function (t, e, r) {
      var n,
        i,
        o,
        a,
        l,
        s,
        u,
        f,
        d = e.index,
        c = t[A],
        h = (c._datasets[d] = []),
        x = t.isDatasetVisible(d),
        y = t.data.datasets[d],
        v = (function (t, e) {
          var r,
            n,
            i,
            o = t.datalabels,
            a = [];
          return !1 === o
            ? null
            : (!0 === o && (o = {}),
              (e = O.merge({}, [e, o])),
              (n = e.labels || {}),
              (i = Object.keys(n)),
              delete e.labels,
              i.length
                ? i.forEach(function (t) {
                    n[t] && a.push(O.merge({}, [e, n[t], {_key: t}]));
                  })
                : a.push(e),
              (r = a.reduce(function (t, e) {
                return (
                  O.each(e.listeners || {}, function (r, n) {
                    (t[n] = t[n] || {}), (t[n][e._key || D] = r);
                  }),
                  delete e.listeners,
                  t
                );
              }, {})),
              {labels: a, listeners: r});
        })(y, r),
        b = e.meta.data || [],
        p = t.ctx;
      for (p.save(), n = 0, o = b.length; n < o; ++n)
        if ((((u = b[n])[A] = []), x && u && !u.hidden && !u._model.skip))
          for (i = 0, a = v.labels.length; i < a; ++i)
            (s = (l = v.labels[i])._key),
              ((f = new _(l, p, u, n)).$groups = {_set: d, _key: s || D}),
              (f.$context = {active: !1, chart: t, dataIndex: n, dataset: y, datasetIndex: d}),
              f.update(f.$context),
              u[A].push(f),
              h.push(f);
      p.restore(),
        O.merge(c._listeners, v.listeners, {
          merger: function (t, r, n) {
            (r[t] = r[t] || {}), (r[t][e.index] = n[t]), (c._listened = !0);
          },
        });
    },
    afterUpdate: function (t, e) {
      t[A]._labels = C.prepare(t[A]._datasets, e);
    },
    afterDatasetsDraw: function (t) {
      C.draw(t, t[A]._labels);
    },
    beforeEvent: function (t, e) {
      if (t[A]._listened)
        switch (e.type) {
          case 'mousemove':
          case 'mouseout':
            N(t, e);
            break;
          case 'click':
            !(function (t, e) {
              var r = t[A],
                n = r._listeners.click,
                i = n && C.lookup(r._labels, e);
              i && P(t, n, i);
            })(t, e);
        }
    },
    afterEvent: function (e) {
      var r,
        i,
        o,
        a,
        l,
        s,
        u,
        f = e[A],
        d = f._actives,
        c = (f._actives = e.lastActive || []),
        h = n.arrayDiff(d, c);
      for (r = 0, i = h.length; r < i; ++r)
        if ((l = h[r])[1]) for (o = 0, a = (u = l[0][A] || []).length; o < a; ++o) ((s = u[o]).$context.active = 1 === l[1]), s.update(s.$context);
      (f._dirty || h.length) &&
        (C.update(f._labels),
        (function (e) {
          if (!e.animating) {
            for (var r = t.animationService.animations, n = 0, i = r.length; n < i; ++n) if (r[n].chart === e) return;
            e.render({duration: 1, lazy: !0});
          }
        })(e)),
        delete f._dirty;
    },
  };
  return t.plugins.register(R), R;
});
