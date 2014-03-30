/* global impress, marked */

(function (document, window) {
    'use strict';

    var ImpressMd = window.ImpressMd = function () {
        this.content = '@@content';

        this.rootId = null;
    };

    ImpressMd.prototype.init = function(rootId) {
        this.rootId = rootId || 'impress';

        var htmlContent = marked(this.content);

        this.root = document.getElementById(this.rootId);
        this.root.innerHTML = htmlContent;

        impress().init(this.rootId);
    };

})(document, window);
