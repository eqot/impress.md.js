/* global impress */

(function (document, window) {
    'use strict';

    var ImpressMd = window.ImpressMd = function () {
        this.content = '@@content';

        this.rootId = null;
    };

    ImpressMd.prototype.init = function(rootId) {
        this.rootId = rootId || 'impress';

        console.log(this.content);

        impress().init(this.rootId);
    };

})(document, window);
