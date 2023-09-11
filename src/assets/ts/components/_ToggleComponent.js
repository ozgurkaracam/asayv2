import { DataUtil, getUniqueIdWithPrefix, EventHandlerUtil } from '../_utils/index';
// Helpers
import { CookieComponent } from './_CookieComponent';
var defaultToggleOptions = {
    saveState: false,
};
var ToggleComponent = /** @class */ (function () {
    function ToggleComponent(_element, options) {
        var _this = this;
        this.state = '';
        this.target = null;
        this.attribute = '';
        this._handlers = function () {
            _this.element.addEventListener('click', function (e) {
                e.preventDefault();
                _this._toggle();
            });
        };
        // Event handlers
        this._toggle = function () {
            // Trigger "after.toggle" event
            EventHandlerUtil.trigger(_this.element, 'kt.toggle.change');
            if (_this._isEnabled()) {
                _this._disable();
            }
            else {
                _this._enable();
            }
            // Trigger "before.toggle" event
            EventHandlerUtil.trigger(_this.element, 'kt.toggle.changed');
            return _this;
        };
        this._enable = function () {
            var _a;
            if (_this._isEnabled()) {
                return;
            }
            EventHandlerUtil.trigger(_this.element, 'kt.toggle.enable');
            (_a = _this.target) === null || _a === void 0 ? void 0 : _a.setAttribute(_this.attribute, 'on');
            if (_this.state.length > 0) {
                _this.element.classList.add(_this.state);
            }
            if (_this.options.saveState) {
                CookieComponent.set(_this.attribute, 'on', {});
            }
            EventHandlerUtil.trigger(_this.element, 'kt.toggle.enabled');
            return _this;
        };
        this._disable = function () {
            var _a;
            if (!_this._isEnabled()) {
                return false;
            }
            EventHandlerUtil.trigger(_this.element, 'kt.toggle.disable');
            (_a = _this.target) === null || _a === void 0 ? void 0 : _a.removeAttribute(_this.attribute);
            if (_this.state.length > 0) {
                _this.element.classList.remove(_this.state);
            }
            if (_this.options.saveState) {
                CookieComponent.delete(_this.attribute);
            }
            EventHandlerUtil.trigger(_this.element, 'kt.toggle.disabled');
            return _this;
        };
        this._isEnabled = function () {
            if (!_this.target) {
                return false;
            }
            return String(_this.target.getAttribute(_this.attribute)).toLowerCase() === 'on';
        };
        ///////////////////////
        // ** Public API  ** //
        ///////////////////////
        // Plugin API
        // Plugin API
        this.toggle = function () {
            return _this._toggle();
        };
        this.enable = function () {
            return _this._enable();
        };
        this.disable = function () {
            return _this._disable();
        };
        this.isEnabled = function () {
            return _this._isEnabled();
        };
        this.goElement = function () {
            return _this.element;
        };
        // Event API
        this.on = function (name, handler) {
            return EventHandlerUtil.on(_this.element, name, handler);
        };
        this.one = function (name, handler) {
            return EventHandlerUtil.one(_this.element, name, handler);
        };
        this.off = function (name) {
            return EventHandlerUtil.off(_this.element, name);
        };
        this.trigger = function (name, event) {
            return EventHandlerUtil.trigger(_this.element, name, event);
        };
        this.options = Object.assign(defaultToggleOptions, options);
        this.instanceUid = getUniqueIdWithPrefix('toggle');
        this.element = _element;
        var elementTargetAttr = this.element.getAttribute('data-kt-toggle-target');
        if (elementTargetAttr) {
            this.target = document.querySelector(elementTargetAttr);
        }
        var elementToggleAttr = this.element.getAttribute('data-kt-toggle-state');
        this.state = elementToggleAttr || '';
        this.attribute = 'data-kt-' + this.element.getAttribute('data-kt-toggle-name');
        // Event Handlers
        this._handlers();
        // Update Instance
        // Bind Instance
        DataUtil.set(this.element, 'toggle', this);
    }
    // Static methods
    ToggleComponent.getInstance = function (el) {
        var toggleElement = DataUtil.get(el, 'toggle');
        if (toggleElement) {
            return toggleElement;
        }
        return null;
    };
    ToggleComponent.createInstances = function (selector) {
        var elements = document.body.querySelectorAll(selector);
        elements.forEach(function (el) {
            var item = el;
            var toggleElement = ToggleComponent.getInstance(item);
            if (!toggleElement) {
                toggleElement = new ToggleComponent(item, defaultToggleOptions);
            }
        });
    };
    ToggleComponent.createInsance = function (selector, options) {
        if (options === void 0) { options = defaultToggleOptions; }
        var element = document.body.querySelector(selector);
        if (!element) {
            return;
        }
        var item = element;
        var toggle = ToggleComponent.getInstance(item);
        if (!toggle) {
            toggle = new ToggleComponent(item, options);
        }
        return toggle;
    };
    ToggleComponent.reinitialization = function () {
        ToggleComponent.createInstances('[data-kt-toggle]');
    };
    ToggleComponent.bootstrap = function () {
        ToggleComponent.createInstances('[data-kt-toggle]');
    };
    return ToggleComponent;
}());
export { ToggleComponent, defaultToggleOptions };
//# sourceMappingURL=_ToggleComponent.js.map