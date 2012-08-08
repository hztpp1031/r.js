
var AUX = {
    toUp: function (value) {
        return value.toUpperCase();
    }
};
define("aux", (function (global) {
    return function () {
        return global.AUX;
    }
}(this)));

define('plug',['aux'], function (aux) {
    var buildMap = {};

    function jsEscape(content) {
        return content.replace(/(['\\])/g, '\\$1')
            .replace(/[\f]/g, "\\f")
            .replace(/[\b]/g, "\\b")
            .replace(/[\n]/g, "\\n")
            .replace(/[\t]/g, "\\t")
            .replace(/[\r]/g, "\\r");
    }

    return {
        load: function (id, require, load, config) {
            var converted = aux.toUp(id);
            buildMap[id] = converted;
            load(converted);
        },

        write: function (pluginName, id, write, config) {
            if (buildMap.hasOwnProperty(id)) {
                var content = jsEscape(buildMap[id]);
                write("define('" + pluginName + "!" + id  +
                      "', function () { return '" + content + "';});\n");
            }
        }
    };
});

define('plug!hi', function () { return 'HI';});

require(['plug!hi'], function (value) {
    console.log(value);
});

define("main", function(){});
