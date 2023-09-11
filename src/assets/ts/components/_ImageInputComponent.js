import { EventHandlerUtil, DataUtil, getUniqueIdWithPrefix, getCSS } from '../_utils/index';
var defaultImageInputOptions = {};
var defaultImageInputQueires = {
    componentName: 'image-input',
    instanseQuery: '[data-kt-image-input]',
    inputQuery: 'input[type="file"]',
    wrapperQuery: '.image-input-wrapper',
    cancelQuery: '[data-kt-image-input-action="cancel"]',
    removeQuery: '[data-kt-image-input-action="remove"]',
    hiddenQuery: 'input[type="hidden"]',
};
var ImageInputComponent = /** @class */ (function () {
    function ImageInputComponent(_element, _options, _queries) {
        var _this = this;
        this.src = '';
        this.value = '';
        // Event Handlers
        this._change = function (e) {
            e.preventDefault();
            if (_this.inputElement !== null && _this.inputElement.files && _this.inputElement.files[0]) {
                // Fire change event
                if (EventHandlerUtil.trigger(_this.element, 'kt.imageinput.change', e) === false) {
                    return;
                }
                var reader = new FileReader();
                reader.onload = function (e) {
                    if (_this.wrapperElement && e.target) {
                        _this.wrapperElement.style.setProperty('background-image', "url('".concat(e.target.result, "')"));
                    }
                };
                reader.readAsDataURL(_this.inputElement.files[0]);
                _this.element.classList.add('image-input-changed');
                _this.element.classList.remove('image-input-empty');
                // Fire removed event
                EventHandlerUtil.trigger(_this.element, 'kt.imageinput.changed', e);
            }
        };
        this._cancel = function (e) {
            e.preventDefault();
            // Fire cancel event
            if (EventHandlerUtil.trigger(_this.element, 'kt.imageinput.cancel', e) === false) {
                return;
            }
            _this.element.classList.remove('image-input-changed');
            _this.element.classList.remove('image-input-empty');
            _this.element.style.setProperty('background-image', _this.src);
            if (_this.inputElement) {
                _this.inputElement.value = '';
            }
            if (_this.hiddenElement !== null) {
                _this.hiddenElement.value = '0';
            }
            // Fire canceled event
            EventHandlerUtil.trigger(_this.element, 'kt.imageinput.canceled', e);
        };
        this._remove = function (e) {
            e.preventDefault();
            // Fire remove event
            if (EventHandlerUtil.trigger(_this.element, 'kt.imageinput.remove', e) === false) {
                return;
            }
            _this.element.classList.remove('image-input-changed');
            _this.element.classList.add('image-input-empty');
            if (_this.wrapperElement) {
                _this.wrapperElement.style.setProperty('background-image', 'none');
            }
            if (_this.inputElement) {
                _this.inputElement.value = '';
            }
            if (_this.hiddenElement !== null) {
                _this.hiddenElement.value = '1';
            }
            // Fire removed event
            EventHandlerUtil.trigger(_this.element, 'kt.imageinput.removed', e);
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
        // Variables
        this.options = Object.assign(defaultImageInputOptions, _options);
        this.queries = _queries;
        this.uid = getUniqueIdWithPrefix(this.queries.componentName);
        // Elements
        this.element = _element;
        this.inputElement = this.element.querySelector(this.queries.inputQuery);
        this.wrapperElement = this.element.querySelector(this.queries.wrapperQuery);
        this.cancelElement = this.element.querySelector(this.queries.cancelQuery);
        this.removeElement = this.element.querySelector(this.queries.removeQuery);
        this.hiddenElement = this.element.querySelector(this.queries.hiddenQuery);
        if (this.wrapperElement) {
            this.src = getCSS(this.wrapperElement, 'backgroundImage');
        }
        // Event Handlers
        this.handlers();
        DataUtil.set(this.element, this.queries.componentName, this);
    }
    ImageInputComponent.prototype.handlers = function () {
        this.element.addEventListener('change', this._change);
        if (this.cancelElement) {
            this.cancelElement.addEventListener('click', this._cancel);
        }
        if (this.removeElement) {
            this.removeElement.addEventListener('click', this._cancel);
        }
    };
    ///////////////////////
    // ** Public API  ** //
    ///////////////////////
    ImageInputComponent.prototype.getInputElement = function () {
        return this.inputElement;
    };
    ImageInputComponent.prototype.getElement = function () {
        return this.element;
    };
    // Static methods
    ImageInputComponent.getInstance = function (el, componentName) {
        if (componentName === void 0) { componentName = defaultImageInputQueires.componentName; }
        var ImageInput = DataUtil.get(el, componentName);
        if (ImageInput) {
            return ImageInput;
        }
        return null;
    };
    ImageInputComponent.createInstances = function (selector, options, queries) {
        if (selector === void 0) { selector = defaultImageInputQueires.instanseQuery; }
        if (options === void 0) { options = defaultImageInputOptions; }
        if (queries === void 0) { queries = defaultImageInputQueires; }
        var elements = document.body.querySelectorAll(selector);
        elements.forEach(function (el) {
            var item = el;
            var ImageInput = ImageInputComponent.getInstance(item);
            if (!ImageInput) {
                ImageInput = new ImageInputComponent(item, options, queries);
            }
        });
    };
    ImageInputComponent.createInsance = function (selector, options, queries) {
        if (selector === void 0) { selector = defaultImageInputQueires.instanseQuery; }
        if (options === void 0) { options = defaultImageInputOptions; }
        if (queries === void 0) { queries = defaultImageInputQueires; }
        var element = document.body.querySelector(selector);
        if (!element) {
            return;
        }
        var item = element;
        var ImageInput = ImageInputComponent.getInstance(item);
        if (!ImageInput) {
            ImageInput = new ImageInputComponent(item, options, queries);
        }
        return ImageInput;
    };
    ImageInputComponent.bootstrap = function (selector) {
        if (selector === void 0) { selector = defaultImageInputQueires.instanseQuery; }
        ImageInputComponent.createInstances(selector);
    };
    ImageInputComponent.reinitialization = function (selector) {
        if (selector === void 0) { selector = defaultImageInputQueires.instanseQuery; }
        ImageInputComponent.createInstances(selector);
    };
    return ImageInputComponent;
}());
export { ImageInputComponent, defaultImageInputOptions, defaultImageInputQueires };
//# sourceMappingURL=_ImageInputComponent.js.map