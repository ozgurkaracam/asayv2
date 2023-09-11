var DataUtil = /** @class */ (function () {
    function DataUtil() {
    }
    DataUtil.set = function (instance, key, data) {
        if (!instance) {
            return;
        }
        var instanceData = DataUtil.store.get(instance);
        if (!instanceData) {
            var newMap = new Map().set(key, data);
            DataUtil.store.set(instance, newMap);
            return;
        }
        instanceData.set(key, data);
    };
    DataUtil.get = function (instance, key) {
        var instanceData = DataUtil.store.get(instance);
        if (!instanceData) {
            return;
        }
        return instanceData.get(key);
    };
    DataUtil.remove = function (instance, key) {
        var instanceData = DataUtil.store.get(instance);
        if (!instanceData) {
            return;
        }
        instanceData.delete(key);
    };
    DataUtil.has = function (instance, key) {
        var instanceData = DataUtil.store.get(instance);
        if (instanceData) {
            return instanceData.has(key);
        }
        return false;
    };
    DataUtil.getAllInstancesByKey = function (key) {
        var result = [];
        DataUtil.store.forEach(function (val) {
            val.forEach(function (v, k) {
                if (k === key) {
                    result.push(v);
                }
            });
        });
        return result;
    };
    DataUtil.store = new Map();
    return DataUtil;
}());
export { DataUtil };
//# sourceMappingURL=_DataUtil.js.map