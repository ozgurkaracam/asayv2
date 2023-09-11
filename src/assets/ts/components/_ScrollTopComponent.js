import { getScrollTop, getAttributeValueByBreakpoint, throttle, getObjectPropertyValueByKey, stringSnakeToCamel, getUniqueIdWithPrefix, DataUtil, ElementAnimateUtil, } from '../_utils/index';
var defaultScrollTopOptions = {
    offset: 200,
    speed: 600,
};
var ScrollTopComponent = /** @class */ (function () {
    function ScrollTopComponent(_element, options) {
        var _this = this;
        this._handlers = function () {
            var timer;
            window.addEventListener('scroll', function () {
                throttle(timer, function () {
                    _this._scroll();
                });
            });
            _this.element.addEventListener('click', function (e) {
                e.preventDefault();
                _this._go();
            });
        };
        this._scroll = function () {
            var offset = parseInt(_this._getOption('offset'));
            var pos = getScrollTop(); // current vertical position
            if (pos > offset) {
                if (!document.body.hasAttribute('data-kt-scrolltop')) {
                    document.body.setAttribute('data-kt-scrolltop', 'on');
                }
            }
            else {
                if (document.body.hasAttribute('data-kt-scrolltop')) {
                    document.body.removeAttribute('data-kt-scrolltop');
                }
            }
        };
        this._go = function () {
            var speed = parseInt(_this._getOption('speed'));
            ElementAnimateUtil.scrollTop(0, speed);
        };
        this._getOption = function (name) {
            var attr = _this.element.getAttribute("data-kt-scrolltop-".concat(name));
            if (attr) {
                var value = getAttributeValueByBreakpoint(attr);
                return value !== null && String(value) === 'true';
            }
            var optionName = stringSnakeToCamel(name);
            var option = getObjectPropertyValueByKey(_this.options, optionName);
            if (option) {
                return getAttributeValueByBreakpoint(option);
            }
            return null;
        };
        ///////////////////////
        // ** Public API  ** //
        ///////////////////////
        // Plugin API
        this.go = function () {
            return _this._go();
        };
        this.getElement = function () {
            return _this.element;
        };
        this.element = _element;
        this.options = Object.assign(defaultScrollTopOptions, options);
        this.instanceUid = getUniqueIdWithPrefix('scrolltop');
        // Event Handlers
        this._handlers();
        // Bind Instance
        DataUtil.set(this.element, 'scrolltop', this);
    }
    // Static methods
    ScrollTopComponent.getInstance = function (el) {
        var scrollTop = DataUtil.get(el, 'scrolltop');
        if (scrollTop) {
            return scrollTop;
        }
        return null;
    };
    ScrollTopComponent.createInstances = function (selector) {
        var elements = document.body.querySelectorAll(selector);
        elements.forEach(function (el) {
            var item = el;
            var scrollTop = ScrollTopComponent.getInstance(item);
            if (!scrollTop) {
                scrollTop = new ScrollTopComponent(item, defaultScrollTopOptions);
            }
        });
    };
    ScrollTopComponent.createInsance = function (selector, options) {
        if (options === void 0) { options = defaultScrollTopOptions; }
        var element = document.body.querySelector(selector);
        if (!element) {
            return;
        }
        var item = element;
        var scrollTop = ScrollTopComponent.getInstance(item);
        if (!scrollTop) {
            scrollTop = new ScrollTopComponent(item, options);
        }
        return scrollTop;
    };
    ScrollTopComponent.bootstrap = function () {
        ScrollTopComponent.createInstances('[data-kt-scrolltop="true"]');
    };
    ScrollTopComponent.reinitialization = function () {
        ScrollTopComponent.createInstances('[data-kt-scrolltop="true"]');
    };
    ScrollTopComponent.goTop = function () {
        ElementAnimateUtil.scrollTop(0, defaultScrollTopOptions.speed);
    };
    return ScrollTopComponent;
}());
export { ScrollTopComponent, defaultScrollTopOptions };
//# sourceMappingURL=_ScrollTopComponent.js.map