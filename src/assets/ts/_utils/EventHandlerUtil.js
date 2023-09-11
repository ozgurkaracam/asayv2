import { DataUtil } from './_DataUtil';
import { getUniqueIdWithPrefix } from './_TypesHelpers';
var EventHandlerUtil = /** @class */ (function () {
    function EventHandlerUtil() {
    }
    EventHandlerUtil.setEventMetasByName = function (name, metas) {
        EventHandlerUtil.store.set(name, metas);
    };
    EventHandlerUtil.getEventMetasByName = function (name) {
        return EventHandlerUtil.store.get(name);
    };
    EventHandlerUtil.setEventMetaByNameAndHandlerId = function (name, handlerId, meta) {
        var metas = EventHandlerUtil.getEventMetasByName(name);
        if (!metas) {
            metas = new Map();
        }
        metas.set(handlerId, meta);
        EventHandlerUtil.setEventMetasByName(name, metas);
    };
    EventHandlerUtil.getEventsMetaByHandlerId = function (name, handlerId) {
        var metas = EventHandlerUtil.store.get(name);
        if (!metas) {
            return;
        }
        return metas.get(handlerId);
    };
    EventHandlerUtil.setFiredByNameAndHandlerId = function (name, handerId, fired) {
        var meta = EventHandlerUtil.getEventsMetaByHandlerId(name, handerId);
        if (!meta) {
            return;
        }
        meta.fired = fired;
        EventHandlerUtil.setEventMetaByNameAndHandlerId(name, handerId, meta);
    };
    EventHandlerUtil.addEvent = function (element, name, callback, one) {
        if (one === void 0) { one = false; }
        var handlerId = getUniqueIdWithPrefix('event');
        DataUtil.set(element, name, handlerId);
        var meta = {
            name: name,
            callback: callback,
            one: one,
            fired: false,
        };
        EventHandlerUtil.setEventMetaByNameAndHandlerId(name, handlerId, meta);
    };
    EventHandlerUtil.removeEvent = function (element, name) {
        var handlerId = DataUtil.get(element, name);
        if (!handlerId) {
            return;
        }
        var metas = EventHandlerUtil.getEventMetasByName(name);
        if (!metas) {
            return;
        }
        metas.delete(handlerId);
        EventHandlerUtil.setEventMetasByName(name, metas);
    };
    EventHandlerUtil.trigger = function (element, name, e) {
        if (DataUtil.has(element, name)) {
            var handlerId = DataUtil.get(element, name);
            if (!handlerId) {
                return undefined;
            }
            var handler = EventHandlerUtil.getEventsMetaByHandlerId(name, handlerId);
            if (handler) {
                if (handler.name === name) {
                    if (handler.one === true) {
                        if (handler.fired === false) {
                            EventHandlerUtil.setFiredByNameAndHandlerId(name, handlerId, true);
                            return handler.callback.call(this, e);
                        }
                    }
                    else {
                        return handler.callback.call(this, e);
                    }
                }
            }
        }
        return null;
    };
    EventHandlerUtil.one = function (element, name, callBack) {
        EventHandlerUtil.addEvent(element, name, callBack, true);
    };
    EventHandlerUtil.off = function (element, name) {
        EventHandlerUtil.removeEvent(element, name);
    };
    EventHandlerUtil.store = new Map();
    EventHandlerUtil.on = function (element, name, callBack) {
        EventHandlerUtil.addEvent(element, name, callBack, false);
    };
    return EventHandlerUtil;
}());
export { EventHandlerUtil };
//# sourceMappingURL=EventHandlerUtil.js.map