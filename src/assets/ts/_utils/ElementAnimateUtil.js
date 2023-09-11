import { DOMEventHandlerUtil } from './_DOMEventHandlerUtil';
import { ElementStyleUtil } from './_ElementStyleUtil';
import { getElementOffset } from './DomHelpers';
var ElementAnimateUtil = /** @class */ (function () {
    function ElementAnimateUtil() {
    }
    ElementAnimateUtil.animate = function (from, to, duration, update, complete) {
        /**
         * TinyAnimate.easings
         *  Adapted from jQuery Easing
         */
        var easings = {
            linear: function (t, b, c, d) {
                return (c * t) / d + b;
            },
        };
        // Create mock done() function if necessary
        if (!complete) {
            complete = function () { };
        }
        // Animation loop
        // let canceled = false;
        var change = to - from;
        function loop(timestamp) {
            var time = (timestamp || +new Date()) - start;
            if (time >= 0) {
                update(easings.linear(time, from, change, duration));
            }
            if (time >= 0 && time >= duration) {
                update(to);
                if (complete) {
                    complete();
                }
            }
            else {
                window.requestAnimationFrame(loop);
            }
        }
        update(from);
        // Start animation loop
        var start = window.performance && window.performance.now ? window.performance.now() : +new Date();
        window.requestAnimationFrame(loop);
    };
    ElementAnimateUtil.animateClass = function (element, animationName, callBack) {
        var animateClasses = animationName.split(' ');
        animateClasses.forEach(function (cssClass) { return element.classList.add(cssClass); });
        DOMEventHandlerUtil.one(element, 'animationend', function () {
            animateClasses.forEach(function (cssClass) { return element.classList.remove(cssClass); });
        });
        if (callBack) {
            DOMEventHandlerUtil.one(element, 'animationend', callBack);
        }
    };
    ElementAnimateUtil.transitionEnd = function (element, callBack) {
        DOMEventHandlerUtil.one(element, 'transitionend', callBack);
    };
    ElementAnimateUtil.animationEnd = function (element, callBack) {
        DOMEventHandlerUtil.one(element, 'animationend', callBack);
    };
    ElementAnimateUtil.animationDelay = function (element, value) {
        ElementStyleUtil.set(element, 'animation-delay', value);
    };
    ElementAnimateUtil.animationDuration = function (element, value) {
        ElementStyleUtil.set(element, 'animation-duration', value);
    };
    ElementAnimateUtil.scrollTo = function (element, offset, duration) {
        if (duration === void 0) { duration = 500; }
        var targetPos = element ? getElementOffset(element).top : 0;
        var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (offset) {
            scrollPos += offset;
            targetPos = targetPos - offset;
        }
        var from = scrollPos;
        var to = targetPos;
        ElementAnimateUtil.animate(from, to, duration, function (value) {
            document.documentElement.scrollTop = value;
            // document.body.parentNode.scrollTop = value;
            document.body.scrollTop = value;
        }); //, easing, done
    };
    ElementAnimateUtil.scrollTop = function (offset, duration) {
        ElementAnimateUtil.scrollTo(null, offset, duration);
    };
    return ElementAnimateUtil;
}());
export { ElementAnimateUtil };
//# sourceMappingURL=ElementAnimateUtil.js.map