import { Modal } from "bootstrap";
var hideModal = function (modalEl) {
    if (!modalEl) {
        return;
    }
    var myModal = Modal.getInstance(modalEl);
    myModal.hide();
};
var removeModalBackdrop = function () {
    if (document.querySelectorAll(".modal-backdrop.fade.show").length) {
        document.querySelectorAll(".modal-backdrop.fade.show").forEach(function (item) {
            item.remove();
        });
    }
};
export { removeModalBackdrop, hideModal };
//# sourceMappingURL=dom.js.map