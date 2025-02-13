var be = Object.defineProperty
var we = (e, o) => {
  for (var r in o) be(e, r, { get: o[r], enumerable: !0 })
}
var me = {}
we(me, {
  define: () => ue,
  forPreact: () => zt,
  getBaseConfig: () => he,
  getImportMapPathWithFileName: () => pe,
})
var qt = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Xt = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var nr = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function Ae(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function xe(e) {
  return e === 47
}
function _(e) {
  Ae(e)
  let o = -1, r = 0, i = -1, t = !0, s = 0
  for (let l = e.length - 1; l >= 0; --l) {
    let n = e.charCodeAt(l)
    if (xe(n)) {
      if (!t) {
        r = l + 1
        break
      }
      continue
    }
    i === -1 && (t = !1, i = l + 1),
      n === 46 ? o === -1 ? o = l : s !== 1 && (s = 1) : o !== -1 && (s = -1)
  }
  return o === -1 || i === -1 || s === 0 ||
      s === 1 && o === i - 1 && o === r + 1
    ? ''
    : e.slice(o, i)
}
function ve(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function ye(e) {
  return e === 47 || e === 92
}
function Ce(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90
}
function J(e) {
  ve(e)
  let o = 0, r = -1, i = 0, t = -1, s = !0, l = 0
  e.length >= 2 && e.charCodeAt(1) === 58 && Ce(e.charCodeAt(0)) && (o = i = 2)
  for (let n = e.length - 1; n >= o; --n) {
    let f = e.charCodeAt(n)
    if (ye(f)) {
      if (!s) {
        i = n + 1
        break
      }
      continue
    }
    t === -1 && (s = !1, t = n + 1),
      f === 46 ? r === -1 ? r = n : l !== 1 && (l = 1) : r !== -1 && (l = -1)
  }
  return r === -1 || t === -1 || l === 0 ||
      l === 1 && r === t - 1 && r === i + 1
    ? ''
    : e.slice(r, t)
}
var Te = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function M(e) {
  return Te ? J(e) : _(e)
}
var br = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Rr = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function Re(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function $e(e) {
  return e === 47
}
function b(e) {
  return Re(e), e.length > 0 && $e(e.charCodeAt(0))
}
function Ee(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function G(e) {
  return e === 47 || e === 92
}
function Pe(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90
}
function w(e) {
  Ee(e)
  let o = e.length
  if (o === 0) return !1
  let r = e.charCodeAt(0)
  return G(r)
    ? !0
    : !!(Pe(r) && o > 2 && e.charCodeAt(1) === 58 && G(e.charCodeAt(2)))
}
var Oe = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function Z(e) {
  return Oe ? w(e) : b(e)
}
function We(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function Se(e) {
  if (We(e), e.length === 0) return '.'
}
function De(e, o, r, i) {
  let t = '', s = 0, l = -1, n = 0, f
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length) f = e.charCodeAt(a)
    else {
      if (i(f)) break
      f = 47
    }
    if (i(f)) {
      if (!(l === a - 1 || n === 1)) {
        if (l !== a - 1 && n === 2) {
          if (
            t.length < 2 || s !== 2 || t.charCodeAt(t.length - 1) !== 46 ||
            t.charCodeAt(t.length - 2) !== 46
          ) {
            if (t.length > 2) {
              let c = t.lastIndexOf(r)
              c === -1
                ? (t = '', s = 0)
                : (t = t.slice(0, c), s = t.length - 1 - t.lastIndexOf(r)),
                l = a,
                n = 0
              continue
            } else if (t.length === 2 || t.length === 1) {
              t = '', s = 0, l = a, n = 0
              continue
            }
          }
          o && (t.length > 0 ? t += `${r}..` : t = '..', s = 2)
        } else {t.length > 0
            ? t += r + e.slice(l + 1, a)
            : t = e.slice(l + 1, a),
            s = a - l - 1}
      }
      l = a, n = 0
    } else f === 46 && n !== -1 ? ++n : n = -1
  }
  return t
}
function O(e) {
  return e === 47
}
function A(e) {
  Se(e)
  let o = O(e.charCodeAt(0)), r = O(e.charCodeAt(e.length - 1))
  return e = De(e, !o, '/', O),
    e.length === 0 && !o && (e = '.'),
    e.length > 0 && r && (e += '/'),
    o ? `/${e}` : e
}
function Le(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function W(...e) {
  if (e.length === 0) return '.'
  e.forEach((r) => Le(r))
  let o = e.filter((r) => r.length > 0).join('/')
  return o === '' ? '.' : A(o)
}
function je(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function Ie(e) {
  if (je(e), e.length === 0) return '.'
}
function Ne(e, o, r, i) {
  let t = '', s = 0, l = -1, n = 0, f
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length) f = e.charCodeAt(a)
    else {
      if (i(f)) break
      f = 47
    }
    if (i(f)) {
      if (!(l === a - 1 || n === 1)) {
        if (l !== a - 1 && n === 2) {
          if (
            t.length < 2 || s !== 2 || t.charCodeAt(t.length - 1) !== 46 ||
            t.charCodeAt(t.length - 2) !== 46
          ) {
            if (t.length > 2) {
              let c = t.lastIndexOf(r)
              c === -1
                ? (t = '', s = 0)
                : (t = t.slice(0, c), s = t.length - 1 - t.lastIndexOf(r)),
                l = a,
                n = 0
              continue
            } else if (t.length === 2 || t.length === 1) {
              t = '', s = 0, l = a, n = 0
              continue
            }
          }
          o && (t.length > 0 ? t += `${r}..` : t = '..', s = 2)
        } else {t.length > 0
            ? t += r + e.slice(l + 1, a)
            : t = e.slice(l + 1, a),
            s = a - l - 1}
      }
      l = a, n = 0
    } else f === 46 && n !== -1 ? ++n : n = -1
  }
  return t
}
function h(e) {
  return e === 47 || e === 92
}
function ke(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90
}
function x(e) {
  Ie(e)
  let o = e.length, r = 0, i, t = !1, s = e.charCodeAt(0)
  if (o > 1) {
    if (h(s)) {
      if (t = !0, h(e.charCodeAt(1))) {
        let n = 2, f = n
        for (; n < o && !h(e.charCodeAt(n)); ++n);
        if (n < o && n !== f) {
          let a = e.slice(f, n)
          for (f = n; n < o && h(e.charCodeAt(n)); ++n);
          if (n < o && n !== f) {
            for (f = n; n < o && !h(e.charCodeAt(n)); ++n);
            if (n === o) return `\\\\${a}\\${e.slice(f)}\\`
            n !== f && (i = `\\\\${a}\\${e.slice(f, n)}`, r = n)
          }
        }
      } else r = 1
    } else {ke(s) && e.charCodeAt(1) === 58 &&
        (i = e.slice(0, 2),
          r = 2,
          o > 2 && h(e.charCodeAt(2)) && (t = !0, r = 3))}
  } else if (h(s)) return '\\'
  let l
  return r < o ? l = Ne(e.slice(r), !t, '\\', h) : l = '',
    l.length === 0 && !t && (l = '.'),
    l.length > 0 && h(e.charCodeAt(o - 1)) && (l += '\\'),
    i === void 0
      ? t ? l.length > 0 ? `\\${l}` : '\\' : l
      : t
      ? l.length > 0 ? `${i}\\${l}` : `${i}\\`
      : i + l
}
function Be(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function v(e) {
  return e === 47 || e === 92
}
function S(...e) {
  if (
    e.forEach((s) => Be(s)), e = e.filter((s) => s.length > 0), e.length === 0
  ) return '.'
  let o = !0, r = 0, i = e[0]
  if (v(i.charCodeAt(0))) {
    ++r
    let s = i.length
    s > 1 && v(i.charCodeAt(1)) &&
      (++r, s > 2 && (v(i.charCodeAt(2)) ? ++r : o = !1))
  }
  let t = e.join('\\')
  if (o) {
    for (; r < t.length && v(t.charCodeAt(r)); ++r);
    r >= 2 && (t = `\\${t.slice(r)}`)
  }
  return x(t)
}
var Ue = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function H(...e) {
  return Ue ? S(...e) : W(...e)
}
var Jr = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Qr = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function ze(e, o, r, i) {
  let t = '', s = 0, l = -1, n = 0, f
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length) f = e.charCodeAt(a)
    else {
      if (i(f)) break
      f = 47
    }
    if (i(f)) {
      if (!(l === a - 1 || n === 1)) {
        if (l !== a - 1 && n === 2) {
          if (
            t.length < 2 || s !== 2 || t.charCodeAt(t.length - 1) !== 46 ||
            t.charCodeAt(t.length - 2) !== 46
          ) {
            if (t.length > 2) {
              let c = t.lastIndexOf(r)
              c === -1
                ? (t = '', s = 0)
                : (t = t.slice(0, c), s = t.length - 1 - t.lastIndexOf(r)),
                l = a,
                n = 0
              continue
            } else if (t.length === 2 || t.length === 1) {
              t = '', s = 0, l = a, n = 0
              continue
            }
          }
          o && (t.length > 0 ? t += `${r}..` : t = '..', s = 2)
        } else {t.length > 0
            ? t += r + e.slice(l + 1, a)
            : t = e.slice(l + 1, a),
            s = a - l - 1}
      }
      l = a, n = 0
    } else f === 46 && n !== -1 ? ++n : n = -1
  }
  return t
}
function Fe(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function q(e) {
  return e === 47
}
function D(...e) {
  let o = '', r = !1
  for (let i = e.length - 1; i >= -1 && !r; i--) {
    let t
    if (i >= 0) t = e[i]
    else {
      let { Deno: s } = globalThis
      if (typeof s?.cwd != 'function') {
        throw new TypeError(
          'Resolved a relative path without a current working directory (CWD)',
        )
      }
      t = s.cwd()
    }
    Fe(t), t.length !== 0 && (o = `${t}/${o}`, r = q(t.charCodeAt(0)))
  }
  return o = ze(o, !r, '/', q),
    r ? o.length > 0 ? `/${o}` : '/' : o.length > 0 ? o : '.'
}
function _e(e, o, r, i) {
  let t = '', s = 0, l = -1, n = 0, f
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length) f = e.charCodeAt(a)
    else {
      if (i(f)) break
      f = 47
    }
    if (i(f)) {
      if (!(l === a - 1 || n === 1)) {
        if (l !== a - 1 && n === 2) {
          if (
            t.length < 2 || s !== 2 || t.charCodeAt(t.length - 1) !== 46 ||
            t.charCodeAt(t.length - 2) !== 46
          ) {
            if (t.length > 2) {
              let c = t.lastIndexOf(r)
              c === -1
                ? (t = '', s = 0)
                : (t = t.slice(0, c), s = t.length - 1 - t.lastIndexOf(r)),
                l = a,
                n = 0
              continue
            } else if (t.length === 2 || t.length === 1) {
              t = '', s = 0, l = a, n = 0
              continue
            }
          }
          o && (t.length > 0 ? t += `${r}..` : t = '..', s = 2)
        } else {t.length > 0
            ? t += r + e.slice(l + 1, a)
            : t = e.slice(l + 1, a),
            s = a - l - 1}
      }
      l = a, n = 0
    } else f === 46 && n !== -1 ? ++n : n = -1
  }
  return t
}
function Je(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function g(e) {
  return e === 47 || e === 92
}
function Me(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90
}
function y(...e) {
  let o = '', r = '', i = !1
  for (let t = e.length - 1; t >= -1; t--) {
    let s, { Deno: l } = globalThis
    if (t >= 0) s = e[t]
    else if (o) {
      if (typeof l?.env?.get != 'function' || typeof l?.cwd != 'function') {
        throw new TypeError(
          'Resolved a relative path without a current working directory (CWD)',
        )
      }
      s = l.cwd(),
        (s === void 0 ||
          s.slice(0, 3).toLowerCase() !== `${o.toLowerCase()}\\`) &&
        (s = `${o}\\`)
    } else {
      if (typeof l?.cwd != 'function') {
        throw new TypeError(
          'Resolved a drive-letter-less path without a current working directory (CWD)',
        )
      }
      s = l.cwd()
    }
    Je(s)
    let n = s.length
    if (n === 0) continue
    let f = 0, a = '', c = !1, P = s.charCodeAt(0)
    if (n > 1) {
      if (g(P)) {
        if (c = !0, g(s.charCodeAt(1))) {
          let u = 2, m = u
          for (; u < n && !g(s.charCodeAt(u)); ++u);
          if (u < n && u !== m) {
            let F = s.slice(m, u)
            for (m = u; u < n && g(s.charCodeAt(u)); ++u);
            if (u < n && u !== m) {
              for (m = u; u < n && !g(s.charCodeAt(u)); ++u);
              u === n
                ? (a = `\\\\${F}\\${s.slice(m)}`, f = u)
                : u !== m && (a = `\\\\${F}\\${s.slice(m, u)}`, f = u)
            }
          }
        } else f = 1
      } else {Me(P) && s.charCodeAt(1) === 58 &&
          (a = s.slice(0, 2),
            f = 2,
            n > 2 && g(s.charCodeAt(2)) && (c = !0, f = 3))}
    } else g(P) && (f = 1, c = !0)
    if (
      !(a.length > 0 && o.length > 0 && a.toLowerCase() !== o.toLowerCase()) &&
      (o.length === 0 && a.length > 0 && (o = a),
        i || (r = `${s.slice(f)}\\${r}`, i = c),
        i && o.length > 0)
    ) break
  }
  return r = _e(r, !i, '\\', g), o + (i ? '\\' : '') + r || '.'
}
var fo = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Ge = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function C(...e) {
  return Ge ? y(...e) : D(...e)
}
var Ze = {
  '	': '%09',
  '\n': '%0A',
  '\v': '%0B',
  '\f': '%0C',
  '\r': '%0D',
  ' ': '%20',
}
function He(e) {
  return e.replaceAll(/[\s]/g, (o) => Ze[o] ?? o)
}
function K(e) {
  if (!b(e)) throw new TypeError(`Path must be absolute: received "${e}"`)
  let o = new URL('file:///')
  return o.pathname = He(e.replace(/%/g, '%25').replace(/\\/g, '%5C')), o
}
var qe = {
  '	': '%09',
  '\n': '%0A',
  '\v': '%0B',
  '\f': '%0C',
  '\r': '%0D',
  ' ': '%20',
}
function Ke(e) {
  return e.replaceAll(/[\s]/g, (o) => qe[o] ?? o)
}
function V(e) {
  if (!w(e)) throw new TypeError(`Path must be absolute: received "${e}"`)
  let [, o, r] = e.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/),
    i = new URL('file:///')
  if (
    i.pathname = Ke(r.replace(/%/g, '%25')),
      o !== void 0 && o !== 'localhost' && (i.hostname = o, !i.hostname)
  ) throw new TypeError(`Invalid hostname: "${i.hostname}"`)
  return i
}
var Ve = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function T(e) {
  return Ve ? V(e) : K(e)
}
var Oo = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Qe = {}, { default: No, ...ko } = Qe
var Jo = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var bn = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var vn = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Q = {}
function j({ importMapFileUrl: e }) {
  return {
    name: 'importMap',
    setup({ onResolve: o, onStart: r }) {
      r(async () => {
        let { imports: i } = await fetch(e).then((t) => t.json()).catch(
          console.error,
        )
        Q = i || {}
      }),
        o({ filter: /.*/ }, (i) => {
          let t = et(Q, i.path)
          if (/^(https?:|npm:|jsr:)/.test(t)) {
            return { path: t, namespace: 'remote-fetch' }
          }
          if (/^(https?:|npm:|jsr:)/.test(i.importer)) {
            let s = new URL(i.path, i.importer)
            return {
              path: Z(i.path) ? s.href : H(i.importer, i.path),
              namespace: 'remote-fetch',
            }
          }
          if (t !== i.path) return { path: C(t), namespace: 'file' }
        })
    },
  }
}
function et(e, o) {
  for (let [r, i] of Object.entries(e)) {
    if (r.endsWith('/') && o.startsWith(r)) return i + o.slice(r.length)
    if (o === r) return i
  }
  return o
}
var wi = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var yi = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function tt(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function rt(e) {
  if (tt(e), e.length === 0) return '.'
}
function ot(e, o) {
  if (e.length <= 1) return e
  let r = e.length
  for (let i = e.length - 1; i > 0 && o(e.charCodeAt(i)); i--) r = i
  return e.slice(0, r)
}
function I(e) {
  return e === 47
}
function X(e) {
  rt(e)
  let o = -1, r = !1
  for (let i = e.length - 1; i >= 1; --i) {
    if (I(e.charCodeAt(i))) {
      if (r) {
        o = i
        break
      }
    } else r = !0
  }
  return o === -1 ? I(e.charCodeAt(0)) ? '/' : '.' : ot(e.slice(0, o), I)
}
function nt(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function it(e) {
  if (nt(e), e.length === 0) return '.'
}
function st(e, o) {
  if (e.length <= 1) return e
  let r = e.length
  for (let i = e.length - 1; i > 0 && o(e.charCodeAt(i)); i--) r = i
  return e.slice(0, r)
}
function lt(e) {
  return e === 47
}
function d(e) {
  return e === 47 || e === 92
}
function at(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90
}
function Y(e) {
  it(e)
  let o = e.length, r = -1, i = -1, t = !0, s = 0, l = e.charCodeAt(0)
  if (o > 1) {
    if (d(l)) {
      if (r = s = 1, d(e.charCodeAt(1))) {
        let n = 2, f = n
        for (; n < o && !d(e.charCodeAt(n)); ++n);
        if (n < o && n !== f) {
          for (f = n; n < o && d(e.charCodeAt(n)); ++n);
          if (n < o && n !== f) {
            for (f = n; n < o && !d(e.charCodeAt(n)); ++n);
            if (n === o) return e
            n !== f && (r = s = n + 1)
          }
        }
      }
    } else {at(l) && e.charCodeAt(1) === 58 &&
        (r = s = 2, o > 2 && d(e.charCodeAt(2)) && (r = s = 3))}
  } else if (d(l)) return e
  for (let n = o - 1; n >= s; --n) {
    if (d(e.charCodeAt(n))) {
      if (!t) {
        i = n
        break
      }
    } else t = !1
  }
  if (i === -1) {
    if (r === -1) return '.'
    i = r
  }
  return st(e.slice(0, i), lt)
}
var ft = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function ee(e) {
  return ft ? Y(e) : X(e)
}
function ct(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function ut(e) {
  return e === 47
}
function te(e) {
  ct(e)
  let o = -1, r = 0, i = -1, t = !0, s = 0
  for (let l = e.length - 1; l >= 0; --l) {
    let n = e.charCodeAt(l)
    if (ut(n)) {
      if (!t) {
        r = l + 1
        break
      }
      continue
    }
    i === -1 && (t = !1, i = l + 1),
      n === 46 ? o === -1 ? o = l : s !== 1 && (s = 1) : o !== -1 && (s = -1)
  }
  return o === -1 || i === -1 || s === 0 ||
      s === 1 && o === i - 1 && o === r + 1
    ? ''
    : e.slice(o, i)
}
function ht(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function pt(e) {
  return e === 47 || e === 92
}
function mt(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90
}
function re(e) {
  ht(e)
  let o = 0, r = -1, i = 0, t = -1, s = !0, l = 0
  e.length >= 2 && e.charCodeAt(1) === 58 && mt(e.charCodeAt(0)) && (o = i = 2)
  for (let n = e.length - 1; n >= o; --n) {
    let f = e.charCodeAt(n)
    if (pt(f)) {
      if (!s) {
        i = n + 1
        break
      }
      continue
    }
    t === -1 && (s = !1, t = n + 1),
      f === 46 ? r === -1 ? r = n : l !== 1 && (l = 1) : r !== -1 && (l = -1)
  }
  return r === -1 || t === -1 || l === 0 ||
      l === 1 && r === t - 1 && r === i + 1
    ? ''
    : e.slice(r, t)
}
var gt = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function oe(e) {
  return gt ? re(e) : te(e)
}
var Bi = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Zi = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Xi = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function wt(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function At(e) {
  if (wt(e), e.length === 0) return '.'
}
function xt(e, o, r, i) {
  let t = '', s = 0, l = -1, n = 0, f
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length) f = e.charCodeAt(a)
    else {
      if (i(f)) break
      f = 47
    }
    if (i(f)) {
      if (!(l === a - 1 || n === 1)) {
        if (l !== a - 1 && n === 2) {
          if (
            t.length < 2 || s !== 2 || t.charCodeAt(t.length - 1) !== 46 ||
            t.charCodeAt(t.length - 2) !== 46
          ) {
            if (t.length > 2) {
              let c = t.lastIndexOf(r)
              c === -1
                ? (t = '', s = 0)
                : (t = t.slice(0, c), s = t.length - 1 - t.lastIndexOf(r)),
                l = a,
                n = 0
              continue
            } else if (t.length === 2 || t.length === 1) {
              t = '', s = 0, l = a, n = 0
              continue
            }
          }
          o && (t.length > 0 ? t += `${r}..` : t = '..', s = 2)
        } else {t.length > 0
            ? t += r + e.slice(l + 1, a)
            : t = e.slice(l + 1, a),
            s = a - l - 1}
      }
      l = a, n = 0
    } else f === 46 && n !== -1 ? ++n : n = -1
  }
  return t
}
function N(e) {
  return e === 47
}
function R(e) {
  At(e)
  let o = N(e.charCodeAt(0)), r = N(e.charCodeAt(e.length - 1))
  return e = xt(e, !o, '/', N),
    e.length === 0 && !o && (e = '.'),
    e.length > 0 && r && (e += '/'),
    o ? `/${e}` : e
}
function vt(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function k(...e) {
  if (e.length === 0) return '.'
  e.forEach((r) => vt(r))
  let o = e.filter((r) => r.length > 0).join('/')
  return o === '' ? '.' : R(o)
}
function yt(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function Ct(e) {
  if (yt(e), e.length === 0) return '.'
}
function Tt(e, o, r, i) {
  let t = '', s = 0, l = -1, n = 0, f
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length) f = e.charCodeAt(a)
    else {
      if (i(f)) break
      f = 47
    }
    if (i(f)) {
      if (!(l === a - 1 || n === 1)) {
        if (l !== a - 1 && n === 2) {
          if (
            t.length < 2 || s !== 2 || t.charCodeAt(t.length - 1) !== 46 ||
            t.charCodeAt(t.length - 2) !== 46
          ) {
            if (t.length > 2) {
              let c = t.lastIndexOf(r)
              c === -1
                ? (t = '', s = 0)
                : (t = t.slice(0, c), s = t.length - 1 - t.lastIndexOf(r)),
                l = a,
                n = 0
              continue
            } else if (t.length === 2 || t.length === 1) {
              t = '', s = 0, l = a, n = 0
              continue
            }
          }
          o && (t.length > 0 ? t += `${r}..` : t = '..', s = 2)
        } else {t.length > 0
            ? t += r + e.slice(l + 1, a)
            : t = e.slice(l + 1, a),
            s = a - l - 1}
      }
      l = a, n = 0
    } else f === 46 && n !== -1 ? ++n : n = -1
  }
  return t
}
function p(e) {
  return e === 47 || e === 92
}
function Rt(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90
}
function $(e) {
  Ct(e)
  let o = e.length, r = 0, i, t = !1, s = e.charCodeAt(0)
  if (o > 1) {
    if (p(s)) {
      if (t = !0, p(e.charCodeAt(1))) {
        let n = 2, f = n
        for (; n < o && !p(e.charCodeAt(n)); ++n);
        if (n < o && n !== f) {
          let a = e.slice(f, n)
          for (f = n; n < o && p(e.charCodeAt(n)); ++n);
          if (n < o && n !== f) {
            for (f = n; n < o && !p(e.charCodeAt(n)); ++n);
            if (n === o) return `\\\\${a}\\${e.slice(f)}\\`
            n !== f && (i = `\\\\${a}\\${e.slice(f, n)}`, r = n)
          }
        }
      } else r = 1
    } else {Rt(s) && e.charCodeAt(1) === 58 &&
        (i = e.slice(0, 2),
          r = 2,
          o > 2 && p(e.charCodeAt(2)) && (t = !0, r = 3))}
  } else if (p(s)) return '\\'
  let l
  return r < o ? l = Tt(e.slice(r), !t, '\\', p) : l = '',
    l.length === 0 && !t && (l = '.'),
    l.length > 0 && p(e.charCodeAt(o - 1)) && (l += '\\'),
    i === void 0
      ? t ? l.length > 0 ? `\\${l}` : '\\' : l
      : t
      ? l.length > 0 ? `${i}\\${l}` : `${i}\\`
      : i + l
}
function $t(e) {
  if (typeof e != 'string') {
    throw new TypeError(
      `Path must be a string, received "${JSON.stringify(e)}"`,
    )
  }
}
function E(e) {
  return e === 47 || e === 92
}
function B(...e) {
  if (
    e.forEach((s) => $t(s)), e = e.filter((s) => s.length > 0), e.length === 0
  ) return '.'
  let o = !0, r = 0, i = e[0]
  if (E(i.charCodeAt(0))) {
    ++r
    let s = i.length
    s > 1 && E(i.charCodeAt(1)) &&
      (++r, s > 2 && (E(i.charCodeAt(2)) ? ++r : o = !1))
  }
  let t = e.join('\\')
  if (o) {
    for (; r < t.length && E(t.charCodeAt(r)); ++r);
    r >= 2 && (t = `\\${t.slice(r)}`)
  }
  return $(t)
}
var Et = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function ne(...e) {
  return Et ? B(...e) : k(...e)
}
var us = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var As = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Ss = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Is = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Gs = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var el = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Ot = {}, { default: ll, ...al } = Ot
var ml = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Fl = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
var Gl = globalThis.Deno?.build.os === 'windows' ||
  globalThis.navigator?.platform?.startsWith('Win') ||
  globalThis.process?.platform?.startsWith('win') || !1
function Dt(e) {
  let o = new URL(`/jsr/${e.slice(4)}`, 'https://esm.sh/')
  return o.searchParams.set('target', 'esnext'), o.href
}
function Lt(e) {
  let o = new URL(`/${e.slice(4)}`, 'https://esm.sh/')
  return o.searchParams.set('target', 'esnext'), o.href
}
function se() {
  return {
    name: 'remote-fetch',
    setup({ onResolve: e, onLoad: o }) {
      e({ filter: /^(https?:|npm:|jsr:)/ }, (r) => {
        let i = r.path
        return r.path.startsWith('jsr:')
          ? i = Dt(r.path)
          : r.path.startsWith('npm:') && (i = Lt(r.path)),
          { path: i, namespace: 'remote-fetch' }
      }),
        e({ filter: /.*/, namespace: 'remote-fetch' }, (r) => {
          if (r.path.startsWith('/')) {
            let s = new URL(r.importer)
            return s.pathname = r.path,
              { path: s.href, namespace: 'remote-fetch' }
          }
          let i = ee(r.importer), t = r.path
          return { path: ne(i, t), namespace: 'remote-fetch' }
        }),
        o({ filter: /.*/, namespace: 'remote-fetch' }, async (r) => {
          let i = new URL(r.path)
          return {
            contents: await (await fetch(i.href)).text(),
            loader: jt(r.path),
          }
        })
    },
  }
}
function jt(e) {
  switch (oe(e)) {
    case '.tsx':
      return 'tsx'
    case '.ts':
      return 'ts'
    case '.css':
      return e.endsWith('module.css') ? 'local-css' : 'css'
    case '.jsx':
      return 'jsx'
    default:
      return 'js'
  }
}
function U() {
  return {
    name: 'localFileLoaderPlugin',
    setup({ onResolve: e, onLoad: o }) {
      e(
        { filter: /^\.?\// },
        (r) => ({ path: C(r.resolveDir || r.importer, r.path) }),
      ),
        o({ filter: /^\.?\//, namespace: 'file' }, async (r) => {
          if (!/^(https?:|npm:|jsr:)/.test(r.path)) {
            let i = M(r.path),
              t = T(r.path),
              s = await fetch(t).then((n) => n.text()),
              l = 'default'
            return i === '.css' && r.path.includes('.module.css') &&
              (l = 'local-css'),
              { contents: s, loader: l }
          }
        })
    },
  }
}
var It =
    /^\s*(?:export\s+)?(?<key>[^\s=#]+?)\s*=[\ \t]*('\r?\n?(?<notInterpolated>(.|\r\n|\n)*?)\r?\n?'|"\r?\n?(?<interpolated>(.|\r\n|\n)*?)\r?\n?"|(?<unquoted>[^\r\n#]*)) *#*.*$/gm,
  Nt = /^[a-zA-Z_][a-zA-Z0-9_]*$/,
  le =
    /(\${(?<inBrackets>.+?)(\:-(?<inBracketsDefault>.+))?}|(?<!\\)\$(?<notInBrackets>\w+)(\:-(?<notInBracketsDefault>.+))?)/g
function kt(e) {
  let o = {
    '\\n': `
`,
    '\\r': '\r',
    '\\t': '	',
  }
  return e.replace(/\\([nrt])/g, (r) => o[r] ?? '')
}
function z(e, o) {
  return le.test(e)
    ? z(
      e.replace(le, function (...r) {
        let {
            inBrackets: i,
            inBracketsDefault: t,
            notInBrackets: s,
            notInBracketsDefault: l,
          } = r[r.length - 1],
          n = i || s,
          f = t || l,
          a = o[n]
        return a === void 0 && (a = Deno.env.get(n)), a === void 0 ? z(f, o) : a
      }),
      o,
    )
    : e
}
function ae(e) {
  let o = {}, r, i = []
  for (; (r = It.exec(e)) !== null;) {
    let { key: s, interpolated: l, notInterpolated: n, unquoted: f } = r?.groups
    if (!Nt.test(s)) {
      console.warn(
        `Ignored the key "${s}" as it is not a valid identifier: The key need to match the pattern /^[a-zA-Z_][a-zA-Z0-9_]*$/.`,
      )
      continue
    }
    f && i.push(s),
      o[s] = typeof n == 'string' ? n : typeof l == 'string' ? kt(l) : f.trim()
  }
  let t = { ...o }
  return i.forEach((s) => {
    o[s] = z(o[s], t)
  }),
    o
}
async function fe(e = {}) {
  let { envPath: o = '.env', export: r = !1 } = e, i = o ? await Bt(o) : {}
  if (r) {
    for (let [t, s] of Object.entries(i)) {
      Deno.env.get(t) === void 0 && Deno.env.set(t, s)
    }
  }
  return i
}
async function Bt(e) {
  try {
    return ae(await Deno.readTextFile(e))
  } catch (o) {
    if (o instanceof Deno.errors.NotFound) return {}
    throw o
  }
}
function Ut() {
  let e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    o = ''
  for (let r = 0; r < 20; r++) {
    o += e.charAt(Math.floor(Math.random() * e.length))
  }
  return o
}
var ce = Deno.cwd(),
  ue = async (e, o, r) => {
    await fe({ envPath: r, export: !0 })
    let i = Ut()
    return Deno.env.set('BUILD_ID', i), Deno.env.set('MODE', e), {
      'globalThis.Deno': o === 'deno' ? 'true' : 'false',
      'globalThis.ENV': JSON.stringify(Deno.env.toObject()),
    }
  },
  he = (e, o) => ({
    platform: 'neutral',
    charset: 'utf8',
    bundle: !0,
    minify: !0,
    publicPath: '/',
    format: 'esm',
    allowOverwrite: !0,
    treeShaking: !0,
    splitting: !0,
    outdir: './build',
    write: !1,
    sourcemap: 'linked',
    absWorkingDir: ce,
    pure: e === 'prod' ? ['console.debug', 'console.assert'] : [],
    target: o === 'deno' ? ['esnext'] : ['chrome120', 'firefox120', 'safari17'],
    assetNames: '[name]',
    loader: { '.png': 'file', '.woff2': 'file' },
  })
function pe(e) {
  return T(ce + '/' + e)
}
var zt = async (e, o, r, i, t) => ({
  ...he(r, i),
  define: await ue(r, i, t),
  jsx: 'automatic',
  jsxImportSource: 'preact',
  ...e,
  plugins: [j({ importMapFileUrl: pe(o) }), U(), se()],
})
async function Ft(e, o, r) {
  try {
    return await o(e)
  } finally {
    await r()
  }
}
function ge(e, o = {}) {
  let { signal: r, persistent: i = !0 } = o
  return r?.aborted ? Promise.reject(r.reason) : new Promise((t, s) => {
    let l = () => {
        clearTimeout(n), s(r?.reason)
      },
      n = setTimeout(() => {
        r?.removeEventListener('abort', l), t()
      }, e)
    if (r?.addEventListener('abort', l, { once: !0 }), i === !1) {
      try {
        Deno.unrefTimer(n)
      } catch (f) {
        if (!(f instanceof ReferenceError)) throw f
        console.error('`persistent` option is only available in Deno')
      }
    }
  })
}
var de
de = Symbol.asyncIterator
var ff = class {
  #e = 0
  #t = []
  #r = []
  #o = Promise.withResolvers()
  add(e) {
    ++this.#e, this.#n(e[Symbol.asyncIterator]())
  }
  async #n(e) {
    try {
      let { value: o, done: r } = await e.next()
      r ? --this.#e : this.#t.push({ iterator: e, value: o })
    } catch (o) {
      this.#r.push(o)
    }
    this.#o.resolve()
  }
  async *iterate() {
    for (; this.#e > 0;) {
      await this.#o.promise
      for (let { iterator: e, value: o } of this.#t) yield o, this.#n(e)
      if (this.#r.length) { for (let e of this.#r) throw e }
      this.#t.length = 0, this.#o = Promise.withResolvers()
    }
  }
  [de]() {
    return this.iterate()
  }
}
function _t(e, o, r, i) {
  let t
  async function s(f) {
    return t || (t = i(f)), await t
  }
  let l
  async function n() {
    l || (l = r()), await l, await ge(10)
  }
  return [s, n, () => o(e)]
}
export {
  _t as bundleWithWasm,
  Ft as bundle,
  j as importMapPlugin,
  me as configs,
  U as localFileLoaderPlugin,
}
