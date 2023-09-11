import { computed } from "vue";
import store from "@/store/index";
import ClipboardJS from "clipboard";
/* eslint-disable  @typescript-eslint/no-explicit-any */
/**
 * Return name of the theme
 * @returns {string}
 */
export var themeName = computed(function () {
    return store.getters.layoutConfig("themeName");
});
/**
 * Return version of the theme
 * @returns {string}
 */
export var version = computed(function () {
    return store.getters.layoutConfig("themeVersion");
});
/**
 * Return demo name
 * @returns {string}
 */
export var demo = computed(function () {
    return store.getters.layoutConfig("demo");
});
//code copy button initialization
export var useCopyClipboard = function () {
    var _init = function (element) {
        var elements = element;
        if (typeof elements === "undefined") {
            elements = document.querySelectorAll(".highlight");
        }
        if (elements && elements.length > 0) {
            for (var i = 0; i < elements.length; ++i) {
                var highlight = elements[i];
                var copy = highlight.querySelector(".highlight-copy");
                if (copy) {
                    var clipboard = new ClipboardJS(copy, {
                        target: function (trigger) {
                            var highlight = trigger.closest(".highlight");
                            if (highlight) {
                                var el = highlight.querySelector(".tab-pane.active");
                                if (el == null) {
                                    el = highlight.querySelector(".highlight-code");
                                }
                                return el;
                            }
                            return highlight;
                        },
                    });
                    clipboard.on("success", function (e) {
                        var caption = e.trigger.innerHTML;
                        e.trigger.innerHTML = "copied";
                        e.clearSelection();
                        setTimeout(function () {
                            e.trigger.innerHTML = caption;
                        }, 2000);
                    });
                }
            }
        }
    };
    return {
        init: function (element) {
            _init(element);
        },
    };
};
//# sourceMappingURL=documentation.js.map