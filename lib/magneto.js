(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Magneto = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Magneto = /*#__PURE__*/function () {
    function Magneto(config) {
      _classCallCheck(this, Magneto);

      var defaults = {
        magnet: {
          element: '.magneto',
          class: 'magneto-active',
          active: true,
          distance: 20,
          position: 'center'
        },
        follow: {
          element: '.follow-mouse',
          class: 'follow-mouse-active'
        },
        throttle: 10
      };

      function isMergeableObject(val) {
        var nonNullObject = val && _typeof(val) === 'object';
        return nonNullObject && Object.prototype.toString.call(val) !== '[object RegExp]' && Object.prototype.toString.call(val) !== '[object Date]';
      }

      function emptyTarget(val) {
        return Array.isArray(val) ? [] : {};
      }

      function cloneIfNecessary(value, optionsArgument) {
        var clone = optionsArgument && optionsArgument.clone === true;
        return clone && isMergeableObject(value) ? deepmerge(emptyTarget(value), value, optionsArgument) : value;
      }

      function defaultArrayMerge(target, source, optionsArgument) {
        var destination = target.slice();
        source.forEach(function (e, i) {
          if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
          } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
          } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
          }
        });
        return destination;
      }

      function mergeObject(target, source, optionsArgument) {
        var destination = {};

        if (isMergeableObject(target)) {
          Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
          });
        }

        Object.keys(source).forEach(function (key) {
          if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
          } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
          }
        });
        return destination;
      }

      function deepmerge(target, source, optionsArgument) {
        var array = Array.isArray(source);
        var options = optionsArgument || {
          arrayMerge: defaultArrayMerge
        };
        var arrayMerge = options.arrayMerge || defaultArrayMerge;

        if (array) {
          return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument);
        } else {
          return mergeObject(target, source, optionsArgument);
        }
      }

      this.config = deepmerge(defaults, config);
      this.elementMagnet = document.querySelectorAll(this.config.magnet.element);
      this.elementFollow = document.querySelectorAll(this.config.follow.element);
    } // Avoid consecutive calls by introducing a delay.


    _createClass(Magneto, [{
      key: "getPositionElement",
      value: // Return position of each element
      function getPositionElement() {
        var $this = this;
        var elements = [];
        this.elementMagnet.forEach(function (element) {
          var rect = element.getBoundingClientRect();
          var x = window.pageXOffset || document.documentElement.scrollLeft;
          var y = window.pageYOffset || document.documentElement.scrollTop;
          elements.push({
            elem: {
              node: element,
              width: rect.width,
              height: rect.height
            },
            xMin: rect.left + x - $this.config.magnet.distance,
            xMax: rect.left + x + rect.width + $this.config.magnet.distance,
            yMin: rect.top + y - $this.config.magnet.distance,
            yMax: rect.top + y + rect.height + $this.config.magnet.distance
          });
        });
        return elements;
      }
    }, {
      key: "magnetElement",
      value: // Magnet element to the mouse with the position specified
      function magnetElement(posElement, posMouse) {
        var $this = this;
        posElement.forEach(function (data) {
          if (data.xMin < posMouse.x && data.xMax > posMouse.x && data.yMin < posMouse.y && data.yMax > posMouse.y) {
            var x, y;

            switch ($this.config.magnet.position) {
              case 'top-left':
                x = posMouse.x - (data.xMin + $this.config.magnet.distance);
                y = posMouse.y - (data.yMin + $this.config.magnet.distance);
                break;

              case 'top-right':
                x = posMouse.x - (data.xMin + data.elem.width + $this.config.magnet.distance);
                y = posMouse.y - (data.yMin + $this.config.magnet.distance);
                break;

              case 'bottom-left':
                x = posMouse.x - (data.xMin + $this.config.magnet.distance);
                y = posMouse.y - (data.yMin + data.elem.height + $this.config.magnet.distance);
                break;

              case 'bottom-right':
                x = posMouse.x - (data.xMin + data.elem.width + $this.config.magnet.distance);
                y = posMouse.y - (data.yMin + data.elem.height + $this.config.magnet.distance);
                break;

              case 'top-center':
                x = posMouse.x - (data.xMin + $this.config.magnet.distance + data.elem.width / 2);
                y = posMouse.y - (data.yMin + $this.config.magnet.distance);
                break;

              case 'bottom-center':
                x = posMouse.x - (data.xMin + $this.config.magnet.distance + data.elem.width / 2);
                y = posMouse.y - (data.yMin + data.elem.height + $this.config.magnet.distance);
                break;

              default:
                x = posMouse.x - (data.xMin + $this.config.magnet.distance + data.elem.width / 2);
                y = posMouse.y - (data.yMin + $this.config.magnet.distance + data.elem.height / 2);
            }

            data.elem.node.style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
            data.elem.node.classList.add($this.config.magnet.class);

            if ($this.elementFollow.length > 0) {
              $this.elementFollow.forEach(function (element) {
                element.classList.add($this.config.follow.class);
              });
            }
          } else {
            data.elem.node.classList.remove($this.config.magnet.class);
            data.elem.node.style.transform = '';

            if ($this.elementFollow.length > 0) {
              $this.elementFollow.forEach(function (element) {
                element.classList.remove($this.config.follow.class);
              });
            }
          }
        });
      }
    }, {
      key: "hoverElement",
      value: // Add class to each element when the mouse enter in their zone
      function hoverElement(posElement, posMouse) {
        var $this = this;
        posElement.forEach(function (data) {
          if (data.xMin < posMouse.x && data.xMax > posMouse.x && data.yMin < posMouse.y && data.yMax > posMouse.y) {
            data.elem.node.classList.add($this.config.magnet.class);
          } else {
            data.elem.node.classList.remove($this.config.magnet.class);
          }
        });
      }
    }, {
      key: "init",
      value: function init() {
        var _this = this;

        var posMouse,
            posElement,
            $this = this; // On resize, calculate position of element

        this.resizeFunction = Magneto.throttle(function () {
          posElement = $this.getPositionElement();
        }, $this.config.throttle); // On mouse move, magnet element to the mouse or just hover function

        this.mouseFunction = Magneto.throttle(function (e) {
          posMouse = Magneto.getPositionMouse(e);

          if ($this.config.magnet.active) {
            $this.magnetElement(posElement, posMouse);
          } else {
            $this.hoverElement(posElement, posMouse);
          }

          if (_this.elementFollow.length > 0) {
            _this.elementFollow.forEach(function (element) {
              element.style.transform = 'translate3d(' + posMouse.x + 'px,' + posMouse.y + 'px, 0)';
            });
          }
        }, $this.config.throttle);
        window.addEventListener('resize', this.resizeFunction); // Calculate position of element when page load

        document.addEventListener('DOMContentLoaded', function () {
          posElement = $this.getPositionElement();
        });
        window.addEventListener('mousemove', this.mouseFunction);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        window.removeEventListener('mousemove', this.mouseFunction);
        window.removeEventListener('resize', this.resizeFunction);
        var $this = this;
        this.elementMagnet.forEach(function (element) {
          element.classList.remove($this.config.magnet.class);
          element.style.transform = '';
        });
        this.elementFollow.forEach(function (element) {
          element.style.opacity = 0;
        });
      }
    }], [{
      key: "throttle",
      value: function throttle(callback, delay) {
        var last;
        var timer;
        return function () {
          var context = this;
          var now = +new Date();
          var args = arguments;

          if (last && now < last + delay) {
            clearTimeout(timer);
            timer = setTimeout(function () {
              last = now;
              callback.apply(context, args);
            }, delay);
          } else {
            last = now;
            callback.apply(context, args);
          }
        };
      }
    }, {
      key: "getPositionMouse",
      value: // Return position X and Y of mouse
      function getPositionMouse(e) {
        var mouseX = e.pageX;
        var mouseY = e.pageY;
        return {
          x: mouseX,
          y: mouseY
        };
      }
    }]);

    return Magneto;
  }();

  return Magneto;

})));
