import { DataUtil, ElementStyleUtil, EventHandlerUtil, getUniqueIdWithPrefix, getAttributeValueByBreakpoint, } from '../_utils/index';
var defaultFeedbackOptions = {
    width: 100,
    placement: 'top-center',
    content: '',
    type: 'popup',
};
var FeedbackComponent = /** @class */ (function () {
    function FeedbackComponent(_element, options) {
        var _this = this;
        this._handlers = function () {
            _this.element.addEventListener('click', function (e) {
                e.preventDefault();
                _this._go();
            });
        };
        this._go = function () { };
        this.showPopup = function () {
            _this.element = document.createElement('DIV');
            _this.element.classList.add('feedback feedback-popup');
            _this.element.innerHTML = _this.options.content || '';
            if (_this.options.placement === 'top-center') {
                _this.setPopupTopCenterPosition();
            }
            document.body.appendChild(_this.element);
            _this.element.classList.add('feedback-shown');
            _this.shown = true;
        };
        this.setPopupTopCenterPosition = function () {
            var _a;
            var width = getAttributeValueByBreakpoint(((_a = _this.options.width) === null || _a === void 0 ? void 0 : _a.toString()) || '0');
            var height = ElementStyleUtil.get(_this.element, 'height');
            _this.element.classList.add('feedback-top-center');
            ElementStyleUtil.set(_this.element, 'width', width);
            ElementStyleUtil.set(_this.element, 'left', '50%');
            ElementStyleUtil.set(_this.element, 'top', '-' + height);
        };
        this.hidePopup = function () {
            _this.element.remove();
        };
        ///////////////////////
        // ** Public API  ** //
        ///////////////////////
        this.show = function () {
            if (EventHandlerUtil.trigger(_this.element, 'kt.feedback.show') === false) {
                return;
            }
            if (_this.options.type === 'popup') {
                _this.showPopup();
            }
            EventHandlerUtil.trigger(_this.element, 'kt.feedback.shown');
            return _this;
        };
        this.hide = function () {
            if (EventHandlerUtil.trigger(_this.element, 'kt.feedback.hide') === false) {
                return;
            }
            if (_this.options.type === 'popup') {
                _this.hidePopup();
            }
            _this.shown = false;
            EventHandlerUtil.trigger(_this.element, 'kt.feedback.hidden');
            return _this;
        };
        this.isShown = function () {
            return _this.isShown;
        };
        this.getElement = function () {
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
        this.element = _element;
        this.options = Object.assign(defaultFeedbackOptions, options);
        this.instanceUid = getUniqueIdWithPrefix('feedback');
        this.shown = false;
        // Event handlers
        this._handlers(); // will add in the show popup
        DataUtil.set(this.element, 'feedback', this);
    }
    // Create Instances
    FeedbackComponent.createInstances = function (selector) {
        throw new Error('not implemented');
    };
    // Static methods
    FeedbackComponent.hasInstace = function (element) {
        throw new Error('not implemented');
    };
    FeedbackComponent.getInstance = function (element) {
        throw new Error('not implemented');
    };
    FeedbackComponent.bootstrap = function (attr) {
        if (attr === void 0) { attr = '[data-Feedback]'; }
        throw new Error('not implemented');
    };
    return FeedbackComponent;
}());
export { FeedbackComponent, defaultFeedbackOptions };
//# sourceMappingURL=_FeedbackComponent.js.map