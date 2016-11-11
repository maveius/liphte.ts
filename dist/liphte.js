var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var html;
(function (html) {
    var Attributes = (function () {
        function Attributes() {
            if (Attributes.instance) {
                throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
            }
            Attributes.instance = this;
        }
        Attributes.prototype.render = function (attributesAndContent) {
            var attributes = '';
            for (var _i = 0, attributesAndContent_1 = attributesAndContent; _i < attributesAndContent_1.length; _i++) {
                var key = attributesAndContent_1[_i];
                if (this.isJSON(key)) {
                    attributes += this.extract(key);
                }
            }
            return attributes + '>';
        };
        Attributes.prototype.isJSON = function (key) {
            return !this.isString(key);
        };
        Attributes.prototype.isString = function (key) {
            return ((typeof key) === 'string');
        };
        Attributes.prototype.extract = function (key) {
            var space = '';
            var tagAttributes = [];
            for (var id in key) {
                var value = key[id];
                var attribute = (id + '="' + this.parse(value) + '"');
                tagAttributes.push(attribute);
            }
            if (tagAttributes.length > 0) {
                space = ' ';
            }
            return space + tagAttributes.join(" ");
        };
        Attributes.prototype.parse = function (value) {
            if (value instanceof Function) {
                return value();
            }
            return value;
        };
        Attributes.getInstance = function () {
            return Attributes.instance;
        };
        Attributes.instance = new Attributes();
        return Attributes;
    }());
    html.Attributes = Attributes;
})(html || (html = {}));
var html;
(function (html) {
    var Content = (function () {
        function Content() {
            this.attributes = html.Attributes.getInstance();
            if (Content.instance) {
                throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
            }
            Content.instance = this;
        }
        Content.prototype.render = function (attributesAndContent) {
            var result = '';
            for (var _i = 0, attributesAndContent_2 = attributesAndContent; _i < attributesAndContent_2.length; _i++) {
                var key = attributesAndContent_2[_i];
                if (this.attributes.isString(key)) {
                    result += key;
                }
            }
            return result;
        };
        Content.getInstance = function () {
            return Content.instance;
        };
        Content.instance = new Content();
        return Content;
    }());
    html.Content = Content;
})(html || (html = {}));
var builder;
(function (builder) {
    var Attributes = html.Attributes;
    var Content = html.Content;
    var TagBuilder = (function () {
        function TagBuilder() {
            this.attributes = Attributes.getInstance();
            this.content = Content.getInstance();
        }
        TagBuilder.prototype.open = function (name) {
            return '<' + name;
        };
        return TagBuilder;
    }());
    builder.TagBuilder = TagBuilder;
})(builder || (builder = {}));
var builder;
(function (builder) {
    var SingletonTagBuilder = (function (_super) {
        __extends(SingletonTagBuilder, _super);
        function SingletonTagBuilder() {
            _super.apply(this, arguments);
        }
        SingletonTagBuilder.prototype.build = function (name, attributesAndContent) {
            var result = this.open(name);
            result += this.attributes.render(attributesAndContent).replace(">", "");
            result += this.close(name);
            return result;
        };
        SingletonTagBuilder.prototype.close = function (name) {
            return '/>';
        };
        return SingletonTagBuilder;
    }(builder.TagBuilder));
    builder.SingletonTagBuilder = SingletonTagBuilder;
})(builder || (builder = {}));
var builder;
(function (builder) {
    var StandardTagBuilder = (function (_super) {
        __extends(StandardTagBuilder, _super);
        function StandardTagBuilder() {
            _super.apply(this, arguments);
        }
        StandardTagBuilder.prototype.build = function (name, attributesAndContent) {
            var result = this.open(name);
            result += this.attributes.render(attributesAndContent);
            result += this.content.render(attributesAndContent);
            result += this.close(name);
            return result;
        };
        StandardTagBuilder.prototype.close = function (name) {
            return '</' + name + '>';
        };
        return StandardTagBuilder;
    }(builder.TagBuilder));
    builder.StandardTagBuilder = StandardTagBuilder;
})(builder || (builder = {}));
var utils;
(function (utils) {
    var Arrays = (function () {
        function Arrays() {
        }
        Arrays.contains = function (array, object) {
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var key = array_1[_i];
                if (key === object) {
                    return true;
                }
            }
            return false;
        };
        return Arrays;
    }());
    utils.Arrays = Arrays;
})(utils || (utils = {}));
var factory;
(function (factory) {
    var SingletonTagBuilder = builder.SingletonTagBuilder;
    var StandardTagBuilder = builder.StandardTagBuilder;
    var Arrays = utils.Arrays;
    var TagBuilderFactory = (function () {
        function TagBuilderFactory() {
        }
        TagBuilderFactory.createTagBuilder = function (tagName) {
            if (Arrays.contains(this.singletonTags, tagName)) {
                return new SingletonTagBuilder();
            }
            return new StandardTagBuilder();
        };
        TagBuilderFactory.appendSingleton = function (name) {
            this.singletonTags.push(name);
        };
        TagBuilderFactory.singletonTags = [
            'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source'
        ];
        return TagBuilderFactory;
    }());
    factory.TagBuilderFactory = TagBuilderFactory;
})(factory || (factory = {}));
var html;
(function (html) {
    var abstract;
    (function (abstract) {
        var Mark = (function () {
            function Mark() {
                this.tags = Object.getOwnPropertyNames(Mark.prototype);
            }
            Mark.prototype.a = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.abbr = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.address = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.area = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.article = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.aside = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.audio = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.b = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.base = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.bdi = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.bdo = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.blockquote = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.body = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.br = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.button = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.canvas = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.caption = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.cite = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.code = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.col = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.colgroup = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.command = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.datalist = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.dd = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.del = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.details = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.dfn = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.div = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.dl = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.dt = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.em = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.embed = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.fieldset = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.figcaption = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.figure = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.footer = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.form = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.h1 = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.h2 = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.h3 = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.h4 = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.h5 = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.h6 = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.head = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.header = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.hgroup = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.hr = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.html = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.i = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.iframe = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.img = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.input = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.ins = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.kbd = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.keygen = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.label = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.legend = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.li = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.link = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.map = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.mark = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.menu = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.meta = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.meter = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.nav = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.noscript = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.object = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.ol = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.optgroup = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.option = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.output = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.p = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.param = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.pre = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.progress = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.q = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.rp = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.rt = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.ruby = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.s = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.samp = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.script = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.section = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.select = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.small = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.source = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.span = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.strong = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.style = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.sub = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.summary = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.sup = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.table = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.tbody = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.td = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.textarea = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.tfoot = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.th = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.thead = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.time = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.title = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.tr = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.track = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.u = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.ul = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.var = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.video = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            Mark.prototype.wbr = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
            };
            return Mark;
        }());
        abstract.Mark = Mark;
    })(abstract = html.abstract || (html.abstract = {}));
})(html || (html = {}));
var liphte;
(function (liphte) {
    var Mark = html.abstract.Mark;
    var TagBuilderFactory = factory.TagBuilderFactory;
    var Tag = (function (_super) {
        __extends(Tag, _super);
        function Tag() {
            if (Tag.instance) {
                throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
            }
            _super.call(this);
            this.assignImplementation();
            Tag.instance = this;
        }
        Tag.prototype.assignImplementation = function () {
            this.appendAll(this.tags);
        };
        Tag.prototype.render = function (name, attributesAndContent) {
            var tagBuilder = TagBuilderFactory.createTagBuilder(name);
            return tagBuilder.build(name, attributesAndContent);
        };
        Tag.prototype.append = function (tagName, singleton) {
            var _this = this;
            this[tagName] = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
                return _this.render(tagName, attributesAndContent);
            };
            if (singleton) {
                TagBuilderFactory.appendSingleton(tagName);
            }
        };
        Tag.prototype.appendAll = function (tagNames, singleton) {
            for (var _i = 0, tagNames_1 = tagNames; _i < tagNames_1.length; _i++) {
                var tagName = tagNames_1[_i];
                this.append(tagName, singleton);
            }
        };
        Tag.getInstance = function () {
            return Tag.instance;
        };
        Tag.instance = new Tag();
        return Tag;
    }(Mark));
    liphte.tag = Tag.getInstance();
})(liphte || (liphte = {}));
//# sourceMappingURL=liphte.js.map