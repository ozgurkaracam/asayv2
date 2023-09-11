/* eslint-disable array-callback-return */
/* eslint-disable no-useless-escape */
import { DataUtil } from '../_utils/index';
var defaultPasswordMeterOptions = {
    minLength: 8,
    checkUppercase: true,
    checkLowercase: true,
    checkDigit: true,
    checkChar: true,
    scoreHighlightClass: 'active',
};
var defaultPasswordMeterQueires = {
    componentName: 'password-meter',
    instanseQuery: '[data-kt-password-meter]',
    inputQuery: 'input[type]',
    visibilityQuery: '[data-kt-password-meter-control="visibility"]',
    highlightQuery: '[data-kt-password-meter-control="highlight"]',
};
var PasswordMeterComponent = /** @class */ (function () {
    function PasswordMeterComponent(_element, _options, _queries) {
        var _this = this;
        ///////////////////////
        // ** Public API  ** //
        ///////////////////////
        this.reset = function () {
            _this.score = 0;
            _this.highlight();
        };
        this.element = _element;
        this.options = Object.assign(defaultPasswordMeterOptions, _options);
        this.queries = _queries;
        this.score = 0;
        this.checkSteps = 5;
        // Elements
        this.inputElement = this.element.querySelector(this.queries.inputQuery);
        this.visibilityElement = this.element.querySelector(this.queries.visibilityQuery);
        this.highlightElement = this.element.querySelector(this.queries.highlightQuery);
        // Event Handlers
        this.handlers();
        DataUtil.set(this.element, this.queries.componentName, this);
    }
    PasswordMeterComponent.prototype.handlers = function () {
        var _this = this;
        if (this.inputElement) {
            this.inputElement.addEventListener('input', function () {
                _this.check();
            });
        }
        if (this.visibilityElement) {
            this.visibilityElement.addEventListener('click', function () {
                _this.visitbility();
            });
        }
    };
    PasswordMeterComponent.prototype.visitbility = function () {
        if (this.visibilityElement && this.inputElement) {
            var visibleIcon = this.visibilityElement.querySelector('i:not(.d-none), .svg-icon:not(.d-none)');
            var hiddenIcon = this.visibilityElement.querySelector('i.d-none, .svg-icon.d-none');
            var typeAttr = this.inputElement.getAttribute('type') || '';
            if (typeAttr === 'password') {
                this.inputElement.setAttribute('type', 'text');
            }
            else {
                this.inputElement.setAttribute('type', 'password');
            }
            visibleIcon === null || visibleIcon === void 0 ? void 0 : visibleIcon.classList.add('d-none');
            hiddenIcon === null || hiddenIcon === void 0 ? void 0 : hiddenIcon.classList.remove('d-none');
            this.inputElement.focus();
        }
    };
    PasswordMeterComponent.prototype.checkScore = function () {
        return 0;
    };
    PasswordMeterComponent.prototype.checkLength = function () {
        if (this.inputElement) {
            return this.inputElement.value.length >= this.options.minLength; // 20 score
        }
        return false;
    };
    PasswordMeterComponent.prototype.checkLowerCase = function () {
        var val = this.inputElement ? this.inputElement.value : '';
        return /[a-z]/.test(val); // 20 score
    };
    PasswordMeterComponent.prototype.checkUppercase = function () {
        var val = this.inputElement ? this.inputElement.value : '';
        return /[A-Z]/.test(val); // 20 score
    };
    PasswordMeterComponent.prototype.checkDigit = function () {
        var val = this.inputElement ? this.inputElement.value : '';
        return /[0-9]/.test(val); // 20 score
    };
    PasswordMeterComponent.prototype.checkChar = function () {
        var val = this.inputElement ? this.inputElement.value : '';
        return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(val); // 20 score
    };
    PasswordMeterComponent.prototype.getCheckScore = function () {
        var count = 1;
        if (this.options.checkUppercase) {
            count++;
        }
        if (this.options.checkLowercase) {
            count++;
        }
        if (this.options.checkDigit) {
            count++;
        }
        if (this.options.checkChar) {
            count++;
        }
        this.checkSteps = count;
        return 100 / this.checkSteps;
    };
    PasswordMeterComponent.prototype.highlight = function () {
        var _this = this;
        var items = this.highlightElement
            ? [].slice.call(this.highlightElement.querySelectorAll('div'))
            : [];
        var total = items.length;
        var index = 0;
        var checkScore = this.getCheckScore();
        var score = this.getScore();
        items.map(function (item) {
            index++;
            if (checkScore * index * (_this.checkSteps / total) <= score) {
                item.classList.add('active');
            }
            else {
                item.classList.remove('active');
            }
        });
    };
    PasswordMeterComponent.prototype.getScore = function () {
        return this.score;
    };
    PasswordMeterComponent.prototype.check = function () {
        var score = 0;
        var checkScore = this.getCheckScore();
        if (this.checkLength()) {
            score = score + checkScore;
        }
        if (this.options.checkUppercase && this.checkLowerCase()) {
            score = score + checkScore;
        }
        if (this.options.checkLowercase && this.checkUppercase()) {
            score = score + checkScore;
        }
        if (this.options.checkDigit && this.checkDigit()) {
            score = score + checkScore;
        }
        if (this.options.checkChar && this.checkChar()) {
            score = score + checkScore;
        }
        this.score = score;
        this.highlight();
    };
    // Static methods
    PasswordMeterComponent.getInstance = function (el, componentName) {
        if (componentName === void 0) { componentName = defaultPasswordMeterQueires.componentName; }
        var passwordMeter = DataUtil.get(el, componentName);
        if (passwordMeter) {
            return passwordMeter;
        }
        return null;
    };
    PasswordMeterComponent.createInstances = function (selector, options, queries) {
        if (selector === void 0) { selector = defaultPasswordMeterQueires.instanseQuery; }
        if (options === void 0) { options = defaultPasswordMeterOptions; }
        if (queries === void 0) { queries = defaultPasswordMeterQueires; }
        var elements = document.body.querySelectorAll(selector);
        elements.forEach(function (el) {
            var item = el;
            var passwordMeter = PasswordMeterComponent.getInstance(item);
            if (!passwordMeter) {
                passwordMeter = new PasswordMeterComponent(item, options, queries);
            }
        });
    };
    PasswordMeterComponent.createInsance = function (selector, options, queries) {
        if (selector === void 0) { selector = defaultPasswordMeterQueires.instanseQuery; }
        if (options === void 0) { options = defaultPasswordMeterOptions; }
        if (queries === void 0) { queries = defaultPasswordMeterQueires; }
        var element = document.body.querySelector(selector);
        if (!element) {
            return;
        }
        var item = element;
        var passwordMeter = PasswordMeterComponent.getInstance(item);
        if (!passwordMeter) {
            passwordMeter = new PasswordMeterComponent(item, options, queries);
        }
        return passwordMeter;
    };
    PasswordMeterComponent.bootstrap = function (selector) {
        if (selector === void 0) { selector = defaultPasswordMeterQueires.instanseQuery; }
        PasswordMeterComponent.createInstances(selector);
    };
    PasswordMeterComponent.reinitialization = function (selector) {
        if (selector === void 0) { selector = defaultPasswordMeterQueires.instanseQuery; }
        PasswordMeterComponent.createInstances(selector);
    };
    return PasswordMeterComponent;
}());
export { PasswordMeterComponent, defaultPasswordMeterOptions, defaultPasswordMeterQueires };
//# sourceMappingURL=_PasswordMeterComponent.js.map