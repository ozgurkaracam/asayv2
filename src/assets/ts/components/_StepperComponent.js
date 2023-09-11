import { getElementIndex, getUniqueIdWithPrefix, ElementAnimateUtil, EventHandlerUtil, DataUtil, DOMEventHandlerUtil, ElementStyleUtil, } from '../_utils/index';
var defaultStepperOptions = {
    startIndex: 1,
    animation: false,
    animationSpeed: '0.3s',
    animationNextClass: 'animate__animated animate__slideInRight animate__fast',
    animationPreviousClass: 'animate__animated animate__slideInLeft animate__fast',
};
var StepperComponent = /** @class */ (function () {
    function StepperComponent(_element, options) {
        var _this = this;
        var _a;
        this.totatStepsNumber = 0;
        this.passedStepIndex = 0;
        this.currentStepIndex = 1;
        this._goTo = function (index) {
            EventHandlerUtil.trigger(_this.element, 'kt.stepper.change');
            // Skip if this step is already shown
            if (index === _this.currentStepIndex || index > _this.totatStepsNumber || index < 0) {
                return;
            }
            // Validate step number
            index = parseInt(index.toString());
            // Set current step
            _this.passedStepIndex = _this.currentStepIndex;
            _this.currentStepIndex = index;
            // Refresh elements
            _this.refreshUI();
            EventHandlerUtil.trigger(_this.element, 'kt.stepper.changed');
        };
        this.initHandlers = function () {
            var _a, _b;
            (_a = _this.btnNext) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) {
                e.preventDefault();
                EventHandlerUtil.trigger(_this.element, 'kt.stepper.next', e);
            });
            (_b = _this.btnPrev) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (e) {
                e.preventDefault();
                EventHandlerUtil.trigger(_this.element, 'kt.stepper.previous', e);
            });
            DOMEventHandlerUtil.on(_this.element, '[data-kt-stepper-action="step"]', 'click', function (e) {
                e.preventDefault();
                if (_this.steps && _this.steps.length > 0) {
                    for (var i = 0; i < _this.steps.length; i++) {
                        if (_this.steps[i] === _this.element) {
                            var index = i + 1;
                            var stepDirection = _this._getStepDirection(index);
                            EventHandlerUtil.trigger(_this.element, "stepper.".concat(stepDirection), e);
                            return;
                        }
                    }
                }
            });
        };
        this._getStepDirection = function (index) {
            return index > _this.currentStepIndex ? 'next' : 'previous';
        };
        this.getStepContent = function (index) {
            var content = _this.element.querySelectorAll('[data-kt-stepper-element="content"]');
            if (!content) {
                return false;
            }
            if (content[index - 1]) {
                return content[index - 1];
            }
            return false;
        };
        this.getLastStepIndex = function () {
            return _this.totatStepsNumber;
        };
        this.getTotalStepsNumber = function () {
            return _this.totatStepsNumber;
        };
        this.refreshUI = function () {
            var state = '';
            if (_this.isLastStep()) {
                state = 'last';
            }
            else if (_this.isFirstStep()) {
                state = 'first';
            }
            else {
                state = 'between';
            }
            // Set state class
            _this.element.classList.remove('last');
            _this.element.classList.remove('first');
            _this.element.classList.remove('between');
            _this.element.classList.add(state);
            // Step Items
            var elements = _this.element.querySelectorAll('[data-kt-stepper-element="nav"], [data-kt-stepper-element="content"], [data-kt-stepper-element="info"]');
            if (!elements || elements.length <= 0) {
                return;
            }
            for (var i = 0, len = elements.length; i < len; i++) {
                var element = elements[i];
                var index = getElementIndex(element) + 1;
                element.classList.remove('current');
                element.classList.remove('completed');
                element.classList.remove('pending');
                if (index === _this.currentStepIndex) {
                    element.classList.add('current');
                    if (_this.options.animation !== false &&
                        element.getAttribute('data-kt-stepper-element') === 'content') {
                        ElementStyleUtil.set(element, 'animationDuration', _this.options.animationSpeed);
                        var animation = _this._getStepDirection(_this.passedStepIndex) === 'previous'
                            ? _this.options.animationPreviousClass
                            : _this.options.animationNextClass;
                        ElementAnimateUtil.animateClass(element, animation);
                    }
                }
                else {
                    if (index < _this.currentStepIndex) {
                        element.classList.add('completed');
                    }
                    else {
                        element.classList.add('pending');
                    }
                }
            }
        };
        this.isLastStep = function () {
            return _this.currentStepIndex === _this.totatStepsNumber;
        };
        this.isFirstStep = function () {
            return _this.currentStepIndex === 1;
        };
        this.isBetweenStep = function () {
            return _this.isLastStep() === false && _this.isFirstStep() === false;
        };
        //   ///////////////////////
        //   // ** Public API  ** //
        //   ///////////////////////
        //   // Plugin API
        this.goto = function (index) {
            return _this._goTo(index);
        };
        this.goNext = function () {
            return _this.goto(_this.getNextStepIndex());
        };
        this.goPrev = function () {
            return _this.goto(_this.getPrevStepIndex());
        };
        this.goFirst = function () {
            return _this.goto(1);
        };
        this.goLast = function () {
            return _this.goto(_this.getLastStepIndex());
        };
        this.getCurrentStepIndex = function () {
            return _this.currentStepIndex;
        };
        this.getNextStepIndex = function () {
            if (_this.totatStepsNumber >= _this.currentStepIndex + 1) {
                return _this.currentStepIndex + 1;
            }
            else {
                return _this.totatStepsNumber;
            }
        };
        this.getPassedStepIndex = function () {
            return _this.passedStepIndex;
        };
        this.getPrevStepIndex = function () {
            if (_this.currentStepIndex - 1 > 1) {
                return _this.currentStepIndex - 1;
            }
            else {
                return 1;
            }
        };
        this.getElement = function (index) {
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
        this.destroy = function () {
            console.log('destroy stepper');
        };
        this.trigger = function (name, event) {
            return EventHandlerUtil.trigger(_this.element, name, event);
        };
        this.element = _element;
        this.options = Object.assign(defaultStepperOptions, options);
        this.instanceUid = getUniqueIdWithPrefix('stepper');
        // Elements
        this.steps = this.element.querySelectorAll('[data-kt-stepper-element="nav"]');
        this.btnNext = this.element.querySelector('[data-kt-stepper-action="next"]');
        this.btnPrev = this.element.querySelector('[data-kt-stepper-action="previous"]');
        this.btnSubmit = this.element.querySelector('[data-kt-stepper-action="submit"]');
        // Variables
        this.totatStepsNumber = ((_a = this.steps) === null || _a === void 0 ? void 0 : _a.length) | 0;
        this.passedStepIndex = 0;
        this.currentStepIndex = 1;
        // Set Current Step
        if (this.options.startIndex > 1) {
            this._goTo(this.options.startIndex);
        }
        // Event Handlers
        this.initHandlers();
        // Bind Instance
        DataUtil.set(this.element, 'stepper', this);
    }
    // Static methods
    StepperComponent.hasInstace = function (element) {
        return DataUtil.has(element, 'stepper');
    };
    StepperComponent.getInstance = function (element) {
        if (element !== null && StepperComponent.hasInstace(element)) {
            return DataUtil.get(element, 'stepper');
        }
        return null;
    };
    // Create Instances
    StepperComponent.createInstances = function (selector) {
        var elements = document.body.querySelectorAll(selector);
        elements.forEach(function (element) {
            var item = element;
            var stepper = StepperComponent.getInstance(item);
            if (!stepper) {
                stepper = new StepperComponent(item, defaultStepperOptions);
            }
        });
    };
    StepperComponent.bootstrap = function (attr) {
        if (attr === void 0) { attr = '[data-kt-stepper]'; }
        StepperComponent.createInstances(attr);
    };
    StepperComponent.createInsance = function (element, options) {
        if (options === void 0) { options = defaultStepperOptions; }
        if (!element) {
            return null;
        }
        var stepper = StepperComponent.getInstance(element);
        if (!stepper) {
            stepper = new StepperComponent(element, options);
        }
        return stepper;
    };
    return StepperComponent;
}());
export { StepperComponent, defaultStepperOptions };
//# sourceMappingURL=_StepperComponent.js.map