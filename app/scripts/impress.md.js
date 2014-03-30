
(function (document, window) {
    'use strict';

    var ImpressMd = window.ImpressMd = function () {
        this.content = '@@content';
    };

    ImpressMd.prototype.init = function(rootId) {
        this.rootId = rootId || 'impress';
    };

})(document, window);
