(function (unsafe) {
    unsafe.module("browser-template", ["browser-config"], function (config) {
        var browser = config.browser;

        var source = "<hello><World name='earth'/></hello>";
        var parser = new browser.DOMParser();        

        var el = function (name, children) {
            var el = browser.document.createElement(name);
            if (children instanceof NodeList) {
                children.forEach(function (node, i) {
                    el.appendChild(node);
                });
            } else if (children !== undefined){
                el.appendChild(children);
            }
            return el;
        }

        var translate = function (nodes, environment) {
            if (nodes.length == 1) {
                return translateNode(nodes.item(0), environment);
            } else {
                var el = browser.document.createElement("div");
                nodes.forEach(function (node) {
                    el.appendChild(translateNode(node,  environment));
                });
                return nodes.childNodes;
            }
        };

        var translateNode = function (node, environment) {
            if (node.nodeType == 1) {
                var ctor = environment[node.nodeName];
                if (ctor !== undefined) {
                    var attrs = {};
                    node.getAttributeNames().forEach(function (name) {
                        attrs[name] = node.getAttribute(name);
                    });
                    return ctor(attrs, translate(node.childNodes));
                }
            }
            return node;
        };

        var render = function (source, environment) {
            environment = environment || {};
            var doc = parser.parseFromString(source, "text/xml");
            
            return translate(doc.childNodes, environment);
        };

        return {
            render: render,
            el: el
        };
    });
}(this.unsafe));