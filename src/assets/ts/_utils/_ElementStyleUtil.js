var ElementStyleUtil = /** @class */ (function () {
    function ElementStyleUtil() {
    }
    ElementStyleUtil.set = function (element, property, value, important) {
        if (important) {
            element.style.setProperty(property, value, 'important');
        }
        else {
            element.style.setProperty(property, value);
        }
    };
    ElementStyleUtil.get = function (element, attributeName) {
        return element.style.getPropertyValue(attributeName);
    };
    ElementStyleUtil.remove = function (element, attibuteName) {
        element.style.removeProperty(attibuteName);
    };
    return ElementStyleUtil;
}());
export { ElementStyleUtil };
//# sourceMappingURL=_ElementStyleUtil.js.map