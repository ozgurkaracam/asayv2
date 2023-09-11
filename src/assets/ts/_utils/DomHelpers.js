import { ElementStyleUtil } from './_ElementStyleUtil';
import { DataUtil } from './_DataUtil';
import { ElementAnimateUtil } from './ElementAnimateUtil';
import { getObjectPropertyValueByKey, toJSON } from './_TypesHelpers';
function getCSS(el, styleProp) {
    var defaultView = (el.ownerDocument || document).defaultView;
    if (!defaultView) {
        return '';
    }
    // sanitize property name to css notation
    // (hyphen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
}
function getCSSVariableValue(variableName) {
    var hex = getComputedStyle(document.documentElement).getPropertyValue(variableName);
    if (hex && hex.length > 0) {
        hex = hex.trim();
    }
    return hex;
}
function getElementActualCss(el, prop, cache) {
    var css = '';
    if (!el.getAttribute('kt-hidden-' + prop) || cache === false) {
        var value 
        // the element is hidden so:
        // making the el block so we can meassure its height but still be hidden
        = void 0;
        // the element is hidden so:
        // making the el block so we can meassure its height but still be hidden
        css = el.style.cssText;
        el.style.cssText = 'position: absolute; visibility: hidden; display: block;';
        if (prop === 'width') {
            value = el.offsetWidth;
        }
        else if (prop === 'height') {
            value = el.offsetHeight;
        }
        el.style.cssText = css;
        // store it in cache
        if (value !== undefined) {
            el.setAttribute('kt-hidden-' + prop, value.toString());
            return parseFloat(value.toString());
        }
        return 0;
    }
    else {
        // store it in cache
        var attributeValue = el.getAttribute('kt-hidden-' + prop);
        if (attributeValue || attributeValue === '0') {
            return parseFloat(attributeValue);
        }
    }
}
function getElementActualHeight(el) {
    return getElementActualCss(el, 'height', false);
}
function getElementActualWidth(el, cache) {
    return getElementActualCss(el, 'width', false);
}
function getElementIndex(element) {
    if (element.parentNode) {
        var c = element.parentNode.children;
        for (var i = 0; i < c.length; i++) {
            if (c[i] === element)
                return i;
        }
    }
    return -1;
}
// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
function getElementMatches(element, selector) {
    var p = Element.prototype;
    var f = p.matches || p.webkitMatchesSelector;
    if (element && element.tagName) {
        return f.call(element, selector);
    }
    else {
        return false;
    }
}
function getElementOffset(el) {
    // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
    // Support: IE <=11 only
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if (!el.getClientRects().length) {
        return { top: 0, left: 0 };
    }
    // Get document-relative position by adding viewport scroll to viewport-relative gBCR
    var rect = el.getBoundingClientRect();
    var win = el.ownerDocument.defaultView;
    if (win) {
        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset,
        };
    }
    return rect;
}
function getElementParents(element, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches = function (s) {
            var matches = (document || this.ownerDocument).querySelectorAll(s);
            var i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) { }
            return i > -1;
        };
    }
    // Set up a parent array
    var parents = [];
    var el = element;
    // Push each parent element to the array
    for (; el && el !== document.body; el = el.parentElement) {
        if (selector) {
            if (el.matches(selector)) {
                parents.push(el);
            }
            continue;
        }
        parents.push(el);
    }
    // Return our parent array
    return parents;
}
function getHighestZindex(el) {
    var bufferNode = el;
    var buffer = el;
    while (bufferNode && bufferNode !== document) {
        // Ignore z-index if position is set to a value where z-index is ignored by the browser
        // This makes behavior of this function consistent across browsers
        // WebKit always returns auto if the element is positioned
        var position = buffer.style.getPropertyValue('position');
        if (position === 'absolute' || position === 'relative' || position === 'fixed') {
            // IE returns 0 when zIndex is not specified
            // other browsers return a string
            // we ignore the case of nested elements with an explicit value of 0
            // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
            var value = parseInt(buffer.style.getPropertyValue('z-index'));
            if (!isNaN(value) && value !== 0) {
                return value;
            }
        }
        bufferNode = bufferNode.parentNode;
        buffer = bufferNode;
    }
    return null;
}
function getScrollTop() {
    return (document.scrollingElement || document.documentElement).scrollTop;
}
// https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth
function getViewPort() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
}
function insertAfterElement(el, referenceNode) {
    var _a;
    return (_a = referenceNode.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(el, referenceNode.nextSibling);
}
function isElementHasClasses(element, classesStr) {
    var classes = classesStr.split(' ');
    for (var i = 0; i < classes.length; i++) {
        if (!element.classList.contains(classes[i])) {
            return false;
        }
    }
    return true;
}
function isVisibleElement(element) {
    return !(element.offsetWidth === 0 && element.offsetHeight === 0);
}
// Throttle function: Input as function which needs to be throttled and delay is the time interval in milliseconds
function throttle(timer, func, delay) {
    // If setTimeout is already scheduled, no need to do anything
    if (timer) {
        return;
    }
    // Schedule a setTimeout after delay seconds
    timer = window.setTimeout(function () {
        func();
        // Once setTimeout function execution is finished, timerId = undefined so that in <br>
        // the next scroll event function execution can be scheduled by the setTimeout
        timer = undefined;
    }, delay);
}
function getElementChildren(element, selector) {
    if (!element || !element.childNodes) {
        return null;
    }
    var result = [];
    for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];
        // child.nodeType == 1 => Element, Text, Comment, ProcessingInstruction, CDATASection, EntityReference
        if (child.nodeType === 1 && getElementMatches(child, selector)) {
            result.push(child);
        }
    }
    return result;
}
function getElementChild(element, selector) {
    var children = getElementChildren(element, selector);
    return children ? children[0] : null;
}
function isMobileDevice() {
    var test = getViewPort().width < +getBreakpoint('lg') ? true : false;
    if (test === false) {
        // For use within normal web clients
        test = navigator.userAgent.match(/iPad/i) != null;
    }
    return test;
}
function slide(el, dir, speed, callback) {
    if (!el ||
        (dir === 'up' && isVisibleElement(el) === false) ||
        (dir === 'down' && isVisibleElement(el) === true)) {
        return;
    }
    speed = speed ? speed : 600;
    var calcHeight = getElementActualHeight(el);
    var calcPaddingTop = 0;
    var calcPaddingBottom = 0;
    if (ElementStyleUtil.get(el, 'padding-top') && DataUtil.get(el, 'slide-padding-top') !== true) {
        DataUtil.set(el, 'slide-padding-top', ElementStyleUtil.get(el, 'padding-top'));
    }
    if (ElementStyleUtil.get(el, 'padding-bottom') &&
        DataUtil.has(el, 'slide-padding-bottom') !== true) {
        DataUtil.set(el, 'slide-padding-bottom', ElementStyleUtil.get(el, 'padding-bottom'));
    }
    if (DataUtil.has(el, 'slide-padding-top')) {
        calcPaddingTop = parseInt(DataUtil.get(el, 'slide-padding-top'));
    }
    if (DataUtil.has(el, 'slide-padding-bottom')) {
        calcPaddingBottom = parseInt(DataUtil.get(el, 'slide-padding-bottom'));
    }
    if (dir === 'up') {
        // up
        el.style.cssText = 'display: block; overflow: hidden;';
        if (calcPaddingTop) {
            ElementAnimateUtil.animate(0, calcPaddingTop, speed, function (value) {
                el.style.paddingTop = calcPaddingTop - value + 'px';
            });
        }
        if (calcPaddingBottom) {
            ElementAnimateUtil.animate(0, calcPaddingBottom, speed, function (value) {
                el.style.paddingBottom = calcPaddingBottom - value + 'px';
            });
        }
        ElementAnimateUtil.animate(0, calcHeight || 0, speed, function (value) {
            el.style.height = (calcHeight || 0) - value + 'px';
        }, function () {
            el.style.height = '';
            el.style.display = 'none';
            if (typeof callback === 'function') {
                callback();
            }
        });
    }
    else if (dir === 'down') {
        // down
        el.style.cssText = 'display: block; overflow: hidden;';
        if (calcPaddingTop) {
            ElementAnimateUtil.animate(0, calcPaddingTop, speed, function (value) {
                //
                el.style.paddingTop = value + 'px';
            }, function () {
                el.style.paddingTop = '';
            });
        }
        if (calcPaddingBottom) {
            ElementAnimateUtil.animate(0, calcPaddingBottom, speed, function (value) {
                el.style.paddingBottom = value + 'px';
            }, function () {
                el.style.paddingBottom = '';
            });
        }
        ElementAnimateUtil.animate(0, calcHeight || 0, speed, function (value) {
            el.style.height = value + 'px';
        }, function () {
            el.style.height = '';
            el.style.display = '';
            el.style.overflow = '';
            if (typeof callback === 'function') {
                callback();
            }
        });
    }
}
function slideUp(el, speed, callback) {
    slide(el, 'up', speed, callback);
}
function slideDown(el, speed, callback) {
    slide(el, 'down', speed, callback);
}
function getBreakpoint(breakpoint) {
    var value = getCSSVariableValue('--bs-' + breakpoint);
    if (value) {
        value = parseInt(value.trim());
    }
    return value;
}
function getAttributeValueByBreakpoint(incomingAttr) {
    var value = toJSON(incomingAttr);
    if (typeof value !== 'object') {
        return incomingAttr;
    }
    var width = getViewPort().width;
    var resultKey;
    var resultBreakpoint = -1;
    var breakpoint;
    for (var key in value) {
        if (key === 'default') {
            breakpoint = 0;
        }
        else {
            breakpoint = getBreakpoint(key) ? +getBreakpoint(key) : parseInt(key);
        }
        if (breakpoint <= width && breakpoint > resultBreakpoint) {
            resultKey = key;
            resultBreakpoint = breakpoint;
        }
    }
    return resultKey ? getObjectPropertyValueByKey(value, resultKey) : value;
}
function colorLighten(color, amount) {
    var addLight = function (_color, _amount) {
        var cc = parseInt(_color, 16) + _amount;
        var cNum = cc > 255 ? 255 : cc;
        var c = cNum.toString(16).length > 1 ? cNum.toString(16) : "0".concat(cNum.toString(16));
        return c;
    };
    color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color;
    amount = parseInt(((255 * amount) / 100).toString());
    return (color = "#".concat(addLight(color.substring(0, 2), amount)).concat(addLight(color.substring(2, 4), amount)).concat(addLight(color.substring(4, 6), amount)));
}
function colorDarken(color, amount) {
    var subtractLight = function (_color, _amount) {
        var cc = parseInt(color, 16) - amount;
        var cNum = cc < 0 ? 0 : cc;
        var c = cNum.toString(16).length > 1 ? cNum.toString(16) : "0".concat(cNum.toString(16));
        return c;
    };
    color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color;
    amount = parseInt(((255 * amount) / 100).toString());
    return (color = "#".concat(subtractLight(color.substring(0, 2), amount)).concat(subtractLight(color.substring(2, 4), amount)).concat(subtractLight(color.substring(4, 6), amount)));
}
export { getBreakpoint, getCSS, getCSSVariableValue, getElementActualCss, getElementActualHeight, getElementActualWidth, getElementIndex, getElementMatches, getElementOffset, getElementParents, getHighestZindex, getScrollTop, getViewPort, insertAfterElement, isElementHasClasses, isVisibleElement, throttle, getElementChildren, getElementChild, isMobileDevice, slide, slideUp, slideDown, getAttributeValueByBreakpoint, colorLighten, colorDarken, };
//# sourceMappingURL=DomHelpers.js.map