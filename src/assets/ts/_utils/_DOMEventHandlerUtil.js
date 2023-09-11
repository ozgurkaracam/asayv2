import { getUniqueIdWithPrefix } from './_TypesHelpers';
var DOMEventHandlerUtil = /** @class */ (function () {
    function DOMEventHandlerUtil() {
    }
    DOMEventHandlerUtil.on = function (element, selector, eventName, callBack) {
        var eventId = getUniqueIdWithPrefix('DOMEvent');
        DOMEventHandlerUtil.store.set(eventId, function (e) {
            var targets = element.querySelectorAll(selector);
            var target = e.target;
            while (target && target !== element) {
                for (var i = 0; i < targets.length; i++) {
                    if (target === targets[i]) {
                        callBack.call(target, e);
                    }
                }
                if (target.parentElement) {
                    target = target.parentElement;
                }
                else {
                    target = null;
                }
            }
        });
        element.addEventListener(eventName, DOMEventHandlerUtil.store.get(eventId));
        return eventId;
    };
    DOMEventHandlerUtil.off = function (element, eventName, eventId) {
        var funcFromStore = DOMEventHandlerUtil.store.get(eventId);
        if (!funcFromStore) {
            return;
        }
        element.removeEventListener(eventName, funcFromStore);
        DOMEventHandlerUtil.store.delete(eventId);
    };
    DOMEventHandlerUtil.one = function (element, eventName, callBack) {
        element.addEventListener(eventName, function calee(e) {
            // remove event
            if (e.target && e.target.removeEventListener) {
                e.target.removeEventListener(e.type, calee);
            }
            if (element && e && e.currentTarget) {
                // if (element && element.removeEventListener && e && e.currentTarget) {
                e.currentTarget.removeEventListener(e.type, calee);
            }
            // call hander
            return callBack(e);
        });
    };
    DOMEventHandlerUtil.store = new Map();
    return DOMEventHandlerUtil;
}());
export { DOMEventHandlerUtil };
//# sourceMappingURL=_DOMEventHandlerUtil.js.map