/* global impress, marked */

(function (document, window) {
    'use strict';

    var state = {
        page: 1,
        x: 0,
        y: 0,
        z: 0,
        dx: 1500,
        dy: 0,
        dz: 0,
        isOpenBracket: false,
        groups: {}
    };

    var ImpressMd = window.ImpressMd = function (rootId) {
        this.rootId = rootId || 'impress';

        var htmlContent = marked(content, {renderer: this.renderer});

        if (state.isOpenBracket) {
            htmlContent += '</div>';
        }

        this.root = document.getElementById(this.rootId);
        this.root.innerHTML = htmlContent;
        this.root.addEventListener('impress:stepenter', setGroupToBody);
        this.root.addEventListener('impress:stepleave', setGroupToBody);

        impress().init(this.rootId);
    };

    function setGroupToBody () {
        var body = document.body;

        var oldGroups = [];
        var newGroups = [];
        var classes = body.classList;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].match(/(impress-group-.+)/)) {
                oldGroups.push(RegExp.$1);
            }

            if (classes[i].match(/impress-on-(.+)/)) {
                newGroups = state.groups[RegExp.$1];
            }
        }

        if (oldGroups.length > 0) {
            for (var i = 0; i < oldGroups.length; i++) {
                body.classList.remove(oldGroups[i]);
            }
        }

        if (newGroups && newGroups.length > 0) {
            for (var i = 0; i < newGroups.length; i++) {
                body.classList.add('impress-group-' + newGroups[i]);
            }
        }
    }

    ImpressMd.prototype.renderer = new marked.Renderer();

    ImpressMd.prototype.renderer.heading = function (text, level) {
        var params = null;

        if (text.match(/(.*)<!-- (.+) -->/)) {
            text = RegExp.$1;
            params = parse(RegExp.$2);
        }
        // console.log(params);

        var config = {
            id: 'page' + state.page,
            classes: 'step',
            tx: 0,
            ty: 0,
            tz: 0
        };

        if (params) {
            if (params.x) {
                state.x = Number(params.x);
            }
            if (params.y) {
                state.y = Number(params.y);
            }
            if (params.z) {
                state.z = Number(params.z);
            }
            if (params.dx) {
                state.dx = Number(params.dx);
            }
            if (params.dy) {
                state.dy = Number(params.dy);
            }
            if (params.dz) {
                state.dz = Number(params.dz);
            }
            if (params.tx) {
                config.tx = Number(params.tx);
            }
            if (params.ty) {
                config.ty = Number(params.ty);
            }
            if (params.tz) {
                config.tz = Number(params.tz);
            }

            if (params.id) {
                config.id = params.id;
            }
            if (params['class']) {
                config.classes += ' ' + params['class'];
            }
            if (params.scale) {
                config.scale = Number(params.scale);
            }
            if (params.rotate) {
                config.rotate = params.rotate;
            }
            if (params['rotate-x']) {
                config.rotateX = params['rotate-x'];
            }
            if (params['rotate-y']) {
                config.rotateY = params['rotate-y'];
            }
            if (params['rotate-z']) {
                config.rotateZ = params['rotate-z'];
            }

            if (params.group) {
                state.groups[config.id] = params.group.split(' ');
            }
        }

        var html = '';

        if (state.isOpenBracket) {
            html += '</div>\n';
        }

        html += '<div id="' + config.id + '"' +
            ' class="' + config.classes + '"' +
            ' data-x="' + (state.x + config.tx) + '"' +
            ' data-y="' + (state.y + config.ty) + '"' +
            ' data-z="' + (state.z + config.tz) + '"' +
            (config.scale    ? ' data-scale="'    + config.scale    + '"' : '') +
            (config.rotate   ? ' data-rotate="'   + config.rotate   + '"' : '') +
            (config.rotateX ? ' data-rotate-x="' + config.rotateX + '"' : '') +
            (config.rotateY ? ' data-rotate-y="' + config.rotateY + '"' : '') +
            (config.rotateZ ? ' data-rotate-z="' + config.rotateZ + '"' : '') +
            '>\n';

        html += '<h' + level + '>' + text + '</h' + level + '>\n';

        // console.log(html);

        state.page++;
        state.x += state.dx;
        state.y += state.dy;
        state.z += state.dz;
        state.isOpenBracket = true;

        return html;
    };

    ImpressMd.prototype.renderer.image = function (href, title, text) {
        var params = null;
        if (htmlDecode(text).match(/(.*)<!-- (.+) -->/)) {
            params = parse(RegExp.$2);
            text = escape(RegExp.$1.replace(/\s+$/, ''));
        }
        // console.log(params);

        var out = '<img src="' + href + '" alt="' + text + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        if (params) {
            if (params['class']) {
                out += ' class="' + params['class'] + '"';
            }
            if (params.id) {
                out += ' id="' + params.id + '"';
            }
            if (params.width) {
                out += ' width="' + params.width + '"';
            }
        }

        out += '>';
        return out;
    };

    function parse (text) {
        var params = {};

        var strings = text.split(',');
        for (var i = 0; i < strings.length; i++) {
            if (strings[i].match(/\s*([\w-]+):\s*['"]*([\w-. ]+)['"]*/)) {
                var key = RegExp.$1;
                var value = RegExp.$2;
                // console.log(key + ': ' + value);

                params[key] = value;
            }
        }

        return params;
    }

    function htmlDecode (input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
    }

    var content = '@@content';

})(document, window);
