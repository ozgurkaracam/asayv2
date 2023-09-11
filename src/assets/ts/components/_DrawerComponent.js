import { EventHandlerUtil, getUniqueIdWithPrefix, getObjectPropertyValueByKey, stringSnakeToCamel, getAttributeValueByBreakpoint, throttle, getCSS, DOMEventHandlerUtil, ElementStyleUtil, } from '../_utils/index';
var DrawerStore = /** @class */ (function () {
    function DrawerStore() {
    }
    DrawerStore.set = function (instanceId, drawerComponentObj) {
        if (DrawerStore.has(instanceId)) {
            return;
        }
        DrawerStore.store.set(instanceId, drawerComponentObj);
    };
    DrawerStore.get = function (instanceId) {
        if (!DrawerStore.has(instanceId)) {
            return;
        }
        return DrawerStore.store.get(instanceId);
    };
    DrawerStore.remove = function (instanceId) {
        if (!DrawerStore.has(instanceId)) {
            return;
        }
        DrawerStore.store.delete(instanceId);
    };
    DrawerStore.has = function (instanceId) {
        return DrawerStore.store.has(instanceId);
    };
    DrawerStore.getAllInstances = function () {
        return DrawerStore.store;
    };
    DrawerStore.store = new Map();
    return DrawerStore;
}());
export { DrawerStore };
var defaultDrawerOptions = {
    overlay: true,
    baseClass: 'drawer',
    overlayClass: 'drawer-overlay',
    direction: 'end',
};
var DrawerComponent = /** @class */ (function () {
    function DrawerComponent(_element, options) {
        var _this = this;
        this.overlayElement = null;
        this.toggleElement = null;
        this.name = '';
        this.shown = false;
        this.lastWidth = 0;
        this.closeElement = null;
        this._handlers = function () {
            var togglers = _this._getOption('toggle');
            var closers = _this._getOption('close');
            if (togglers !== null && togglers.length > 0) {
                DOMEventHandlerUtil.on(document.body, togglers, 'click', function (e) {
                    e.preventDefault();
                    _this.toggleElement = document.getElementById(togglers);
                    _this._toggle();
                });
            }
            if (closers !== null && closers.length > 0) {
                DOMEventHandlerUtil.on(document.body, closers, 'click', function (e) {
                    e.preventDefault();
                    _this.closeElement = document.getElementById(closers);
                    _this._hide();
                });
            }
        };
        this._update = function () {
            var width = String(_this._getOption('width'));
            var direction = String(_this._getOption('direction'));
            // Reset state
            var hasBaseClass = _this.element.classList.contains("".concat(_this.options.baseClass, "-on"));
            var bodyCanvasAttr = String(document.body.getAttribute("data-kt-drawer-".concat(_this.name, "-")));
            if (hasBaseClass === true && bodyCanvasAttr === 'on') {
                _this.shown = true;
            }
            else {
                _this.shown = false;
            }
            // Activate/deactivate
            if (_this._getOption('activate') === true) {
                _this.element.classList.add(_this.options.baseClass);
                _this.element.classList.add("".concat(_this.options.baseClass, "-").concat(direction));
                ElementStyleUtil.set(_this.element, 'width', width, true);
                _this.lastWidth = parseInt(width);
            }
            else {
                ElementStyleUtil.set(_this.element, 'width', '');
                _this.element.classList.remove(_this.options.baseClass);
                _this.element.classList.remove("".concat(_this.options.baseClass, "-").concat(direction));
                _this._hide();
            }
        };
        this._getOption = function (name) {
            var attr = _this.element.getAttribute("data-kt-drawer-".concat(name));
            if (attr) {
                var value = getAttributeValueByBreakpoint(attr);
                if (value !== null && String(value) === 'true') {
                    return true;
                }
                else {
                    if (value !== null && String(value) === 'false') {
                        return false;
                    }
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
        this._toggle = function () {
            if (EventHandlerUtil.trigger(_this.element, 'kt.drawer.toggle') === false) {
                return;
            }
            if (_this.shown) {
                _this._hide();
            }
            else {
                _this._show();
            }
            EventHandlerUtil.trigger(_this.element, 'kt.drawer.toggled');
        };
        this._hide = function () {
            if (EventHandlerUtil.trigger(_this.element, 'kt.drawer.hide') === false) {
                return;
            }
            _this.shown = false;
            _this._deleteOverlay();
            document.body.removeAttribute("data-kt-drawer-".concat(_this.name));
            document.body.removeAttribute("data-kt-drawer");
            _this.element.classList.remove("".concat(_this.options.baseClass, "-on"));
            if (_this.toggleElement != null) {
                _this.toggleElement.classList.remove('active');
            }
            EventHandlerUtil.trigger(_this.element, 'kt.drawer.after.hidden');
        };
        this._show = function () {
            if (EventHandlerUtil.trigger(_this.element, 'kt.drawer.show') === false) {
                return;
            }
            _this.shown = true;
            _this._createOverlay();
            document.body.setAttribute("data-kt-drawer-".concat(_this.name), 'on');
            document.body.setAttribute('data-kt-drawer', 'on');
            _this.element.classList.add("".concat(_this.options.baseClass, "-on"));
            if (_this.toggleElement !== null) {
                _this.toggleElement.classList.add('active');
            }
            EventHandlerUtil.trigger(_this.element, 'kt.drawer.shown');
        };
        this._createOverlay = function () {
            if (_this._getOption('overlay') === true) {
                _this.overlayElement = document.createElement('DIV');
                var elementZIndex = getCSS(_this.element, 'z-index');
                if (elementZIndex) {
                    var overlayZindex = parseInt(elementZIndex) - 1;
                    ElementStyleUtil.set(_this.overlayElement, 'z-index', overlayZindex); // update
                }
                document.body.append(_this.overlayElement);
                var overlayClassOption = _this._getOption('overlay-class');
                if (overlayClassOption) {
                    _this.overlayElement.classList.add(overlayClassOption.toString());
                }
                _this.overlayElement.addEventListener('click', function (e) {
                    e.preventDefault();
                    _this._hide();
                });
            }
        };
        this._deleteOverlay = function () {
            if (_this.overlayElement !== null && _this.overlayElement.parentNode) {
                _this.overlayElement.parentNode.removeChild(_this.overlayElement);
            }
        };
        this._getDirection = function () {
            return String(_this._getOption('direction')) === 'left' ? 'left' : 'right';
        };
        this._getWidth = function () {
            var width = _this._getOption('width');
            if (width && width === 'auto') {
                width = getCSS(_this.element, 'width');
            }
            return width;
        };
        ///////////////////////
        // ** Public API  ** //
        ///////////////////////
        this.toggle = function () {
            _this._toggle();
        };
        this.show = function () {
            _this._show();
        };
        this.hide = function () {
            _this._hide();
        };
        this.isShown = function () {
            return _this.shown;
        };
        this.update = function () {
            _this._update();
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
        this.element = _element;
        this.options = Object.assign(defaultDrawerOptions, options);
        this.instanceUid = getUniqueIdWithPrefix('drawer');
        this.overlayElement = null;
        this.name = this.element.getAttribute('data-kt-drawer-name') || '';
        this.shown = false;
        this.toggleElement = null;
        // Event Handlers
        this._handlers();
        // Update Instance
        this._update();
        // Bind Instance
        DrawerStore.set(this.element.id, this);
    }
    // Create Instances
    DrawerComponent.createInstances = function (selector) {
        var elements = document.body.querySelectorAll(selector);
        elements.forEach(function (element) {
            var item = element;
            var drawer = DrawerComponent.getInstance(item.id);
            if (!drawer) {
                drawer = new DrawerComponent(item, defaultDrawerOptions);
            }
            drawer.element = item;
            drawer.hide();
        });
    };
    // Global Initialization
    DrawerComponent.initGlobalHandlers = function () {
        // Window Resize Handling
        window.addEventListener('resize', function () {
            var timer;
            throttle(timer, function () {
                // Locate and update Drawer instances on window resize
                var elements = document.body.querySelectorAll('[data-kt-drawer="true"]');
                elements.forEach(function (el) {
                    var item = el;
                    var instance = DrawerComponent.getInstance(item.id);
                    if (instance) {
                        instance.element = item;
                        instance.update();
                    }
                });
            }, 200);
        });
    };
    var _a;
    _a = DrawerComponent;
    // Static methods
    DrawerComponent.hasInstace = function (elementId) {
        return DrawerStore.has(elementId);
    };
    DrawerComponent.getInstance = function (elementId) {
        return DrawerStore.get(elementId);
    };
    DrawerComponent.hideAll = function () {
        var oldInstances = DrawerStore.getAllInstances();
        oldInstances.forEach(function (dr) {
            dr.hide();
        });
    };
    DrawerComponent.updateAll = function () {
        var oldInstances = DrawerStore.getAllInstances();
        oldInstances.forEach(function (dr) {
            dr.update();
        });
    };
    // Dismiss instances
    DrawerComponent.handleDismiss = function () {
        // External drawer toggle handler
        DOMEventHandlerUtil.on(document.body, '[data-kt-drawer-dismiss="true"]', 'click', function () {
            /* @ts-ignore */
            var element = _a.closest('[data-kt-drawer="true"]');
            if (element) {
                var drawer = DrawerComponent.getInstance(element);
                if (drawer && drawer.isShown()) {
                    drawer.hide();
                }
            }
        });
    };
    DrawerComponent.bootstrap = function () {
        DrawerComponent.createInstances('[data-kt-drawer="true"]');
        DrawerComponent.initGlobalHandlers();
        DrawerComponent.handleDismiss();
    };
    DrawerComponent.reinitialization = function () {
        DrawerComponent.createInstances('[data-kt-drawer="true"]');
        DrawerComponent.hideAll();
        DrawerComponent.updateAll();
        DrawerComponent.handleDismiss();
    };
    return DrawerComponent;
}());
export { DrawerComponent, defaultDrawerOptions };
//# sourceMappingURL=_DrawerComponent.js.map