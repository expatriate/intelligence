var stickyElements = (function() {
  "use strict";
  var t = {};
  (t.classCallCheck = function(t, s) {
    if (!(t instanceof s))
      throw new TypeError("Cannot call a class as a function");
  }),
    (t.createClass = (function() {
      function t(t, s) {
        for (var i = 0; i < s.length; i++) {
          var e = s[i];
          (e.enumerable = e.enumerable || !1),
            (e.configurable = !0),
            "value" in e && (e.writable = !0),
            Object.defineProperty(t, e.key, e);
        }
      }
      return function(s, i, e) {
        return i && t(s.prototype, i), e && t(s, e), s;
      };
    })());
  var s = (function() {
      function s(i) {
        var e =
          arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
        t.classCallCheck(this, s),
          (this.el = i),
          this.setOpts(e),
          this.setEvents();
      }
      return (
        t.createClass(s, [
          {
            key: "setOpts",
            value: function(t) {
              (this.pointer = t.pointer),
                (this.positions = {}),
                (this.isGripped = !1),
                (this.stickiness = {}),
                (this.grip = { x: 3, y: 4 }),
                (this.duration = t.duration || 450),
                this.setStickiness(t);
            }
          },
          {
            key: "setEvents",
            value: function() {
              var t = this,
                s = this.el,
                i = ["enter", "leave", "move"];
              s._stickyEvents &&
                (i.map(function(i) {
                  t.pointer
                    ? s.removeEventListener(
                        "pointer" + i,
                        s._stickyEvents[i],
                        !1
                      )
                    : s.removeEventListener(
                        "mouse" + i,
                        s._stickyEvents[i],
                        !1
                      );
                }),
                (s._stickyEvents = void 0)),
                (s._stickyEvents = {
                  enter: function(s) {
                    return t.onEnter(s);
                  },
                  leave: function(s) {
                    return t.onLeave(s);
                  },
                  move: function(s) {
                    return t.onMove(s);
                  }
                }),
                i.map(function(i) {
                  t.pointer
                    ? s.addEventListener("pointer" + i, s._stickyEvents[i], !1)
                    : s.addEventListener("mouse" + i, s._stickyEvents[i], !1);
                });
            }
          },
          {
            key: "setStickiness",
            value: function(t) {
              var s = {
                  1: 10,
                  2: 6.6,
                  3: 4.5,
                  4: 3.2,
                  5: 2.4,
                  6: 1.9,
                  7: 1.6,
                  8: 1.4,
                  9: 1.3,
                  10: 1.2,
                  0: 0
                },
                i = { stickiness: { x: 3, y: 3 } };
              (t.stickiness || 0 === t.stickiness) &&
                ("number" == typeof t.stickiness &&
                  (i.stickiness = { x: t.stickiness, y: t.stickiness }),
                (t.stickiness.x || 0 === t.stickiness.x) &&
                  (i.stickiness.x = t.stickiness.x),
                (t.stickiness.y || 0 === t.stickiness.y) &&
                  (i.stickiness.y = t.stickiness.y)),
                (this.stickiness.x = s[Math.min(10, i.stickiness.x)]),
                (this.stickiness.y = s[Math.min(10, i.stickiness.y)]);
            }
          },
          {
            key: "getPositions",
            value: function(t, s) {
              var i = 0 !== this.stickiness.x ? t / this.stickiness.x : 0,
                e = 0 !== this.stickiness.y ? s / this.stickiness.y : 0;
              return { posx: i, posy: e };
            }
          },
          {
            key: "onEnter",
            value: function(t) {
              var s = this.el,
                i = s.offsetWidth,
                e = s.offsetHeight,
                n = s.offsetLeft,
                o = s.offsetTop,
                r = window.pageYOffset || document.documentElement.scrollTop,
                a = {
                  width: i,
                  height: e,
                  centerx: n + i / 2,
                  centery: o + e / 2 - r
                };
              this.positions = a;
            }
          },
          {
            key: "onLeave",
            value: function(t) {
              if (this.lastGripped) {
                var s = new Date().getTime();
                if (s - this.lastGripped < 30) return;
              }
              var i = this.el;
              animate.stop(i);
              var e = this.getPositions(
                  this.positions.deltax,
                  this.positions.deltay
                ),
                n = e.posx,
                o = e.posy;
              this.isGripped &&
                ((this.lastGripped = new Date().getTime()),
                animate({
                  el: i,
                  translateX: [n, 0],
                  translateY: [o, 0],
                  duration: this.duration
                })),
                (this.isGripped = !1);
            }
          },
          {
            key: "onMove",
            value: function(t) {
              var s = this.el;
              animate.stop(s);
              var i = t.clientX,
                e = t.clientY,
                n = {
                  x:
                    Math.abs(this.positions.deltax) <
                    this.positions.width / this.grip.x,
                  y:
                    Math.abs(this.positions.deltay) <
                    this.positions.height / this.grip.y
                };
              if (
                (n.x && n.y && (this.isGripped = !0),
                (this.positions.deltax = -(this.positions.centerx - i)),
                (this.positions.deltay = -(this.positions.centery - e)),
                this.isGripped)
              ) {
                var o = this.getPositions(
                    this.positions.deltax,
                    this.positions.deltay
                  ),
                  r = o.posx,
                  a = o.posy;
                s.style.transform = "translate3d(" + r + "px, " + a + "px, 0)";
              }
            }
          }
        ]),
        s
      );
    })(),
    i = (function() {
      return function(t, i) {
        for (
          var e = [], n = [].slice.call(document.querySelectorAll(t)), o = 0;
          o < n.length;
          o++
        )
          e.push(new s(n[o], i));
        return e;
      };
    })();
  return i;
})();