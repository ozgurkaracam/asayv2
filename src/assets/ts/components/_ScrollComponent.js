import { DataUtil, getObjectPropertyValueByKey, stringSnakeToCamel, getAttributeValueByBreakpoint, getViewPort, isVisibleElement, throttle, getCSS, ElementStyleUtil, } from '../_utils/index';
import { CookieComponent } from './_CookieComponent';
var defaultScrollOptions = {
    saveState: true,
};
var ScrollComponent = /** @class */ (function () {
    function ScrollComponent(_element, options) {
        var _this = this;
        this.getOption = function (name) {
            if (_this.element.hasAttribute('data-kt-scroll-' + name) === true) {
                var attr = _this.element.getAttribute('data-kt-scroll-' + name) || '';
                var value = getAttributeValueByBreakpoint(attr);
                if (value !== null && String(value) === 'true') {
                    value = true;
                }
                else if (value !== null && String(value) === 'false') {
                    value = false;
                }
                return value;
            }
            else {
                var optionName = stringSnakeToCamel(name);
                var option = getObjectPropertyValueByKey(_this.options, optionName);
                if (option) {
                    return getAttributeValueByBreakpoint(option);
                }
                else {
                    return null;
                }
            }
        };
        this.getHeightType = function () {
            if (_this.getOption('height')) {
                return 'height';
            }
            if (_this.getOption('min-height')) {
                return 'min-height';
            }
            if (_this.getOption('max-height')) {
                return 'max-height';
            }
        };
        this.getAutoHeight = function () {
            var height = getViewPort().height;
            var dependencies = _this.getOption('dependencies');
            var wrappers = _this.getOption('wrappers');
            var offset = _this.getOption('offset');
            // Height dependencies
            if (dependencies !== null) {
                var elements_1 = document.querySelectorAll(dependencies);
                if (elements_1 && elements_1.length > 0) {
                    for (var i = 0, len = elements_1.length; i < len; i++) {
                        var element = elements_1[i];
                        if (isVisibleElement(element) === false) {
                            continue;
                        }
                        height = height - parseInt(getCSS(element, 'height'));
                        height = height - parseInt(getCSS(element, 'margin-top'));
                        height = height - parseInt(getCSS(element, 'margin-bottom'));
                        var borderTop_1 = getCSS(element, 'border-top');
                        if (borderTop_1) {
                            height = height - parseInt(borderTop_1);
                        }
                        var borderBottom_1 = getCSS(element, 'border-bottom');
                        if (borderBottom_1) {
                            height = height - parseInt(borderBottom_1);
                        }
                    }
                }
            }
            // Wrappers
            if (wrappers !== null) {
                var elements = document.querySelectorAll(wrappers);
                if (elements && elements.length > 0) {
                    for (var i = 0, len = elements.length; i < len; i++) {
                        var element = elements[i];
                        if (!isVisibleElement(element)) {
                            continue;
                        }
                        height = height - parseInt(getCSS(element, 'margin-top'));
                        height = height - parseInt(getCSS(element, 'margin-bottom'));
                        height = height - parseInt(getCSS(element, 'padding-top'));
                        height = height - parseInt(getCSS(element, 'padding-bottom'));
                        var borderTop_2 = getCSS(element, 'border-top');
                        if (borderTop_2) {
                            height = height - parseInt(borderTop_2);
                        }
                        var borderBottom_2 = getCSS(element, 'border-bottom');
                        if (borderBottom_2) {
                            height = height - parseInt(borderBottom_2);
                        }
                    }
                }
            }
            // Custom offset
            if (offset !== null) {
                height = height - parseInt(offset);
            }
            height = height - parseInt(getCSS(_this.element, 'margin-top'));
            height = height - parseInt(getCSS(_this.element, 'margin-bottom'));
            var borderTop = getCSS(_this.element, 'border-top');
            if (borderTop) {
                height = height - parseInt(borderTop);
            }
            var borderBottom = getCSS(_this.element, 'border-bottom');
            if (borderBottom) {
                height = height - parseInt(borderBottom);
            }
            height = String(height) + 'px';
            return height;
        };
        this.setupHeight = function () {
            var height = _this.getHeight();
            var heightType = _this.getHeightType();
            // Set height
            if (height !== null && height.length > 0) {
                ElementStyleUtil.set(_this.element, heightType, height);
            }
            else {
                ElementStyleUtil.set(_this.element, heightType, '');
            }
        };
        this.setupState = function () {
            if (_this.getOption('save-state') === true && _this.id) {
                var cookie = CookieComponent.get(_this.id + 'st');
                if (cookie) {
                    var pos = parseInt(cookie);
                    if (pos > 0) {
                        _this.element.scrollTop = pos;
                    }
                }
            }
        };
        this.setupScrollHandler = function () {
            if (_this.getOption('save-state') === true && _this.id) {
                _this.element.addEventListener('scroll', _this.scrollHandler);
            }
            else {
                _this.element.removeEventListener('scroll', _this.scrollHandler);
            }
        };
        this.scrollHandler = function () {
            var cookieId = _this.id + 'st';
            CookieComponent.set(cookieId, _this.element.scrollTop, {});
        };
        this.destroyScrollHandler = function () {
            _this.element.removeEventListener('scroll', _this.scrollHandler);
        };
        this.resetHeight = function () {
            var heghtType = _this.getHeightType();
            if (heghtType) {
                ElementStyleUtil.set(_this.element, heghtType, '');
            }
        };
        ///////////////////////
        // ** Public API  ** //
        ///////////////////////
        this.update = function () {
            // Activate/deactivate
            if (_this.getOption('activate') === true ||
                !_this.element.hasAttribute('data-kt-scroll-activate')) {
                _this.setupHeight();
                _this.setupScrollHandler();
                _this.setupState();
            }
            else {
                _this.resetHeight();
                _this.destroyScrollHandler();
            }
        };
        this.getHeight = function () {
            var heightType = _this.getHeightType();
            var height = _this.getOption(heightType || '');
            if (height instanceof Function) {
                return height.call(height);
            }
            else if (height !== null && typeof height === 'string' && height.toLowerCase() === 'auto') {
                return _this.getAutoHeight();
            }
            else {
                return height;
            }
        };
        this.getElement = function () {
            return _this.element;
        };
        this.element = _element;
        this.options = Object.assign(defaultScrollOptions, options);
        this.id = this.element.getAttribute('id') || '';
        this.update();
        // this.element.setAttribute('data-kt-scrolltop', 'true')
        DataUtil.set(this.element, 'scroll', this);
    }
    // Static methods
    ScrollComponent.hasInstace = function (element) {
        return DataUtil.has(element, 'scroll');
    };
    ScrollComponent.getInstance = function (element) {
        if (element !== null && ScrollComponent.hasInstace(element)) {
            return DataUtil.get(element, 'scroll');
        }
    };
    // Create Instances
    ScrollComponent.createInstances = function (selector) {
        var elements = document.body.querySelectorAll(selector);
        elements.forEach(function (element) {
            var item = element;
            var scroll = ScrollComponent.getInstance(item);
            if (!scroll) {
                scroll = new ScrollComponent(item, defaultScrollOptions);
            }
        });
    };
    ScrollComponent.destroyAll = function (attr) {
        if (attr === void 0) { attr = '[data-kt-scroll="true"]'; }
    };
    ScrollComponent.bootstrap = function (attr) {
        if (attr === void 0) { attr = '[data-kt-scroll="true"]'; }
        ScrollComponent.createInstances(attr);
        ScrollComponent.resize();
    };
    ScrollComponent.reinitialization = function (attr) {
        if (attr === void 0) { attr = '[data-kt-scroll="true"]'; }
        ScrollComponent.createInstances(attr);
    };
    ScrollComponent.updateAll = function () {
        var elements = document.body.querySelectorAll('[data-kt-scroll="true"]');
        elements.forEach(function (element) {
            var instance = ScrollComponent.getInstance(element);
            if (instance) {
                instance.update();
            }
        });
    };
    ScrollComponent.resize = function () {
        // Window Resize Handling
        window.addEventListener('resize', function () {
            var timer;
            throttle(timer, function () {
                // Locate and update Drawer instances on window resize
                ScrollComponent.updateAll();
            }, 200);
        });
    };
    ScrollComponent.createInstance = function (element, options) {
        if (options === void 0) { options = defaultScrollOptions; }
        var scroll = ScrollComponent.getInstance(element);
        if (!scroll) {
            scroll = new ScrollComponent(element, options);
        }
        return scroll;
    };
    return ScrollComponent;
}());
export { ScrollComponent, defaultScrollOptions };
//# sourceMappingURL=_ScrollComponent.js.map