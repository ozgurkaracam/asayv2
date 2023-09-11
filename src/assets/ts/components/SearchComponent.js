import { EventHandlerUtil, DataUtil, getBreakpoint, getAttributeValueByBreakpoint, stringSnakeToCamel, getObjectPropertyValueByKey, getViewPort, isVisibleElement, throttle, } from '../_utils/index';
import { MenuComponent, defaultMenuOptions } from './MenuComponent';
var defaultSearchOptions = {
    minLength: 2,
    keypress: true,
    enter: true,
    layout: 'menu',
    showOnFocus: true, // Always show menu on input focus
};
var defaultSearchQueires = {
    componentName: 'search',
    instanseQuery: '[data-kt-search]',
    attrQuery: 'data-kt-search-',
};
var SearchComponent = /** @class */ (function () {
    function SearchComponent(_element, _options, _queries) {
        var _this = this;
        this.processing = false;
        this._getElement = function (name) {
            return _this.element.querySelector('[data-kt-search-element="' + name + '"]');
        };
        // Get option
        this.getOption = function (name) {
            var attr = _this.element.getAttribute("".concat(_this.queries.attrQuery).concat(name));
            if (attr) {
                var value = getAttributeValueByBreakpoint(attr);
                if (value !== null && String(value) === 'true') {
                    return true;
                }
                else if (value !== null && String(value) === 'false') {
                    return false;
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
        // Check if responsive form mode is enabled
        this.getResponsiveFormMode = function () {
            var responsive = _this.getOption('responsive');
            var width = getViewPort().width;
            if (!responsive) {
                return null;
            }
            var breakpoint = getBreakpoint(responsive);
            var breakPointNum = -1;
            if (!breakpoint) {
                breakPointNum = parseInt(responsive);
            }
            else {
                breakPointNum = +breakpoint;
            }
            if (width < breakPointNum) {
                return 'on';
            }
            else {
                return 'off';
            }
        };
        // Focus
        this.focus = function () {
            _this.element.classList.add('focus');
            if (_this.getOption('show-on-focus') === true ||
                _this.inputElement.value.length >= _this.options.minLength) {
                _this.show();
            }
        };
        // Blur
        this.blur = function () {
            _this.element.classList.remove('focus');
        };
        // Enter
        this.enter = function (e) {
            var key = e.charCode || e.keyCode || 0;
            if (key === 13) {
                e.preventDefault();
                _this.search();
            }
        };
        // Input
        this.input = function () {
            if (_this.getOption('min-length')) {
                var minLength = parseInt(_this.getOption('min-length'));
                if (_this.inputElement.value.length >= minLength) {
                    _this.search();
                }
                else if (_this.inputElement.value.length === 0) {
                    _this.clear();
                }
            }
        };
        ///////////////////////
        // ** Public API  ** //
        ///////////////////////
        // Update
        this.update = function () {
            // Handle responsive form
            if (_this.layout === 'menu') {
                var responsiveFormMode = _this.getResponsiveFormMode();
                if (responsiveFormMode === 'on' && _this.contentElement.contains(_this.formElement) === false) {
                    _this.contentElement.prepend(_this.formElement);
                    _this.formElement.classList.remove('d-none');
                }
                else if (responsiveFormMode === 'off' &&
                    _this.contentElement.contains(_this.formElement) === true) {
                    _this.element.prepend(_this.formElement);
                    _this.formElement.classList.add('d-none');
                }
            }
        };
        // Show menu
        this.show = function () {
            if (_this.menuObject) {
                _this.update();
                _this.menuObject.show(_this.element);
            }
        };
        // Hide menu
        this.hide = function () {
            if (_this.menuObject) {
                _this.update();
                _this.menuObject.hide(_this.element);
            }
        };
        // Search
        this.search = function () {
            if (_this.processing === false) {
                // Show search spinner
                if (_this.spinnerElement) {
                    _this.spinnerElement.classList.remove('d-none');
                }
                // Hide search clear button
                if (_this.clearElement) {
                    _this.clearElement.classList.add('d-none');
                }
                // Hide search toolbar
                if (_this.toolbarElement) {
                    _this.toolbarElement.classList.add('d-none');
                }
                // Focus input
                _this.inputElement.focus();
                _this.processing = true;
                EventHandlerUtil.trigger(_this.element, 'kt.search.process');
            }
        };
        // Complete
        this.complete = function () {
            if (_this.spinnerElement) {
                _this.spinnerElement.classList.add('d-none');
            }
            // Show search toolbar
            if (_this.clearElement) {
                _this.clearElement.classList.remove('d-none');
            }
            if (_this.inputElement.value.length === 0) {
                _this.clear();
            }
            // Focus input
            _this.inputElement.focus();
            _this.show();
            _this.processing = false;
        };
        // Clear
        this.clear = function () {
            if (EventHandlerUtil.trigger(_this.element, 'kt.search.clear') === false) {
                return;
            }
            // Clear and focus input
            _this.inputElement.value = '';
            _this.inputElement.focus();
            // Hide clear icon
            if (_this.clearElement) {
                _this.clearElement.classList.add('d-none');
            }
            // Show search toolbar
            if (_this.toolbarElement) {
                _this.toolbarElement.classList.remove('d-none');
            }
            // Hide menu
            if (_this.getOption('show-on-focus') === false) {
                _this.hide();
            }
            EventHandlerUtil.trigger(_this.element, 'kt.search.cleared');
        };
        this.isProcessing = function () {
            return _this.processing;
        };
        this.getQuery = function () {
            return _this.inputElement.value;
        };
        this.getMenu = function () {
            return _this.menuObject;
        };
        this.getFormElement = function () {
            return _this.formElement;
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
        // Variables
        this.options = Object.assign(defaultSearchOptions, _options);
        this.queries = _queries;
        // Elements
        this.element = _element;
        this.contentElement = this._getElement('content');
        this.formElement = this._getElement('form');
        this.inputElement = this._getElement('input');
        this.spinnerElement = this._getElement('spinner');
        this.clearElement = this._getElement('clear');
        this.toggleElement = this._getElement('toggle');
        this.submitElement = this._getElement('submit');
        this.toolbarElement = this._getElement('toolbar');
        this.resultsElement = this._getElement('results');
        this.suggestionElement = this._getElement('suggestion');
        this.emptyElement = this._getElement('empty');
        // Layout
        this.layout = this.getOption('layout');
        if (this.layout === 'menu') {
            this.menuObject = new MenuComponent(this.contentElement, defaultMenuOptions);
        }
        // Update
        this.update();
        // Event Handlers
        this.handlers();
        DataUtil.set(this.element, this.queries.componentName, this);
    }
    SearchComponent.prototype.handlers = function () {
        var _this = this;
        // Focus
        this.inputElement.addEventListener('focus', this.focus);
        // Blur
        this.inputElement.addEventListener('blur', this.blur);
        // Keypress
        if (this.getOption('keypress') === true) {
            this.inputElement.addEventListener('input', this.input);
        }
        // Submit
        if (this.submitElement) {
            this.submitElement.addEventListener('click', this.search);
        }
        // Enter
        if (this.getOption('enter') === true) {
            this.inputElement.addEventListener('keypress', this.enter);
        }
        // Clear
        if (this.clearElement) {
            this.clearElement.addEventListener('click', this.clear);
        }
        // Menu
        if (this.menuObject) {
            // Toggle menu
            if (this.toggleElement) {
                this.toggleElement.addEventListener('click', this.show);
                this.menuObject.on('kt.menu.dropdown.show', function () {
                    // @ts-ignore
                    if (isVisibleElement(this.toggleElement)) {
                        // @ts-ignore
                        this.toggleElement.classList.add('active');
                        // @ts-ignore
                        this.toggleElement.classList.add('show');
                    }
                });
                this.menuObject.on('kt.menu.dropdown.hide', function () {
                    // @ts-ignore
                    if (isVisibleElement(this.toggleElement)) {
                        // @ts-ignore
                        this.toggleElement.classList.remove('active');
                        // @ts-ignore
                        this.toggleElement.classList.remove('show');
                    }
                });
            }
            this.menuObject.on('kt.menu.dropdown.shown', function () {
                // @ts-ignore
                this.inputElement.focus();
            });
        }
        // Window resize handling
        window.addEventListener('resize', function () {
            var timer;
            throttle(timer, function () {
                _this.update();
            }, 200);
        });
    };
    SearchComponent.prototype.getInputElement = function () {
        return this.inputElement;
    };
    SearchComponent.prototype.getContentElement = function () {
        return this.contentElement;
    };
    SearchComponent.prototype.getElement = function () {
        return this.element;
    };
    // Static methods
    SearchComponent.getInstance = function (el, componentName) {
        if (componentName === void 0) { componentName = defaultSearchQueires.componentName; }
        var Search = DataUtil.get(el, componentName);
        if (Search) {
            return Search;
        }
        return null;
    };
    SearchComponent.createInstances = function (selector, options, queries) {
        if (selector === void 0) { selector = defaultSearchQueires.instanseQuery; }
        if (options === void 0) { options = defaultSearchOptions; }
        if (queries === void 0) { queries = defaultSearchQueires; }
        var elements = document.body.querySelectorAll(selector);
        elements.forEach(function (el) {
            var item = el;
            var Search = SearchComponent.getInstance(item);
            if (!Search) {
                Search = new SearchComponent(item, options, queries);
            }
        });
    };
    SearchComponent.createInsance = function (selector, options, queries) {
        if (selector === void 0) { selector = defaultSearchQueires.instanseQuery; }
        if (options === void 0) { options = defaultSearchOptions; }
        if (queries === void 0) { queries = defaultSearchQueires; }
        var element = document.body.querySelector(selector);
        if (!element) {
            return;
        }
        var item = element;
        var Search = SearchComponent.getInstance(item);
        if (!Search) {
            Search = new SearchComponent(item, options, queries);
        }
        return Search;
    };
    SearchComponent.bootstrap = function (selector) {
        if (selector === void 0) { selector = defaultSearchQueires.instanseQuery; }
        SearchComponent.createInstances(selector);
    };
    SearchComponent.reinitialization = function (selector) {
        if (selector === void 0) { selector = defaultSearchQueires.instanseQuery; }
        SearchComponent.createInstances(selector);
    };
    return SearchComponent;
}());
export { SearchComponent, defaultSearchOptions, defaultSearchQueires };
//# sourceMappingURL=SearchComponent.js.map