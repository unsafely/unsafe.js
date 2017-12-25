unsafe.test("test-browser-template",
    ["test", "browser-template", "browser-config"],
    function (test, template, config) {
        var browser = config.browser;

        var nav = function (attrs, childs) {
            var el = template.el("a", template.el.text(attrs["description"]));
            el.setAttribute("href", attrs["to"]);

            return el;
        }

        var navtabs = function (attrs, childs) {
            var el = template.el("ul");

            childrefs = [];
            /* fucking odd behaviour of NodeList */
            childs.forEach(function (nav) {
                childrefs.push(nav);
            });

            childrefs.forEach(function (nav) {
                var item = template.el("li", nav);
                el.appendChild(item);
            });

            return el;
        }

        var env = {
            nav: nav,
            navtabs: navtabs
        };

        test("should-render", function () {
            var nav = template
                .render("<nav to='test' description='This is a test link'/>", env);
            
            browser.document.body.appendChild(nav);
        });

        test("should-render-recursively", function () {
            var tabs = template.render("<navtabs>" +
                "<nav to='test' description='First'/>" +
                "<nav to='test' description='Second'/>" +
                "<nav to='test' description='Third'/>" +
                "</navtabs>", env);;

            browser.document.body.appendChild(tabs);
        });
    });