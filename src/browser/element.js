(function (unsafe) {
    unsafe.module("browser-element", ["browser-config", "fn"], function (config, $) {
        var browser = config.browser;

        var parser = new browser.DOMParser();

        var tag = $.delegate(browser.document, "createElement");

        var element = function (name, children) {
            var el = tag(name);
            if (children instanceof NodeList) {
                children.forEach(function (node, i) {
                    el.appendChild(node);
                });
            } else if (children !== undefined) {
                el.appendChild(children);
            }
            return el;
        };

        element.text = $.delegate(browser.document, "createTextNode");
        element.tag = tag;

        var translate = function (nodes, environment) {
            if (nodes.length == 1) {
                return translateNode(nodes.item(0), environment);
            } else {
                var el = element.tag("div");
                nodes.forEach(function (node) {
                    el.appendChild(translateNode(node,  environment));
                });
                return el.childNodes;
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
                    return ctor(attrs, translate(node.childNodes, environment));
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
            el: element
        };
    });
}(this.unsafe));