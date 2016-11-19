var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        Arrays.isArray = function (instance) {
            if (Array.isArray(instance)) {
                return this.checkElements(instance);
            }
            return false;
        };
        Arrays.checkElements = function (instance) {
            for (var _i = 0, instance_1 = instance; _i < instance_1.length; _i++) {
                var element = instance_1[_i];
                if (typeof element !== (typeof T)) {
                    return false;
                }
            }
            return true;
        };
        Arrays.identity = function (type) {
            return typeof (new type());
        };
        return Arrays;
    }());
    utils.Arrays = Arrays;
    var JSONs = (function () {
        function JSONs() {
        }
        JSONs.isJSON = function (object) {
            return JSON.parse(JSON.stringify(object)) instanceof Object;
        };
        JSONs.isSimple = function (object) {
            var result = JSONs.isJSON(object) && !Array.isArray(object);
            return result;
        };
        JSONs.isComplex = function (object) {
            var result = Arrays.isArray(object);
            return result;
        };
        return JSONs;
    }());
    utils.JSONs = JSONs;
    var Strings = (function () {
        function Strings() {
        }
        Strings.isString = function (object) {
            return ((typeof object) === 'string');
        };
        Strings.EMPTY = '';
        return Strings;
    }());
    utils.Strings = Strings;
    var TagUtils = (function () {
        function TagUtils() {
        }
        TagUtils.isAttribute = function (object) {
            return (JSONs.isSimple(object) || JSONs.isComplex(object));
        };
        TagUtils.isContent = function (object) {
            if (JSONs.isComplex(object)) {
                for (var _i = 0, object_1 = object; _i < object_1.length; _i++) {
                    var element = object_1[_i];
                    return this.isContent(element);
                }
            }
            var isNotAttribute = !this.isAttribute(object);
            var isString = Strings.isString(object);
            return isNotAttribute || isString;
        };
        TagUtils.counter = 0;
        return TagUtils;
    }());
    utils.TagUtils = TagUtils;
})(utils || (utils = {}));
var strategy;
(function (strategy) {
    var RenderStrategy = (function () {
        function RenderStrategy() {
        }
        RenderStrategy.prototype.selectFactory = function (factory) {
            this.factory = factory;
        };
        RenderStrategy.prototype.appendExtractedElement = function (element, results) {
            this.strategy = this.factory.selectStrategy(element);
            if (this.strategy !== undefined) {
                results.push(this.strategy.extract(element));
            }
        };
        return RenderStrategy;
    }());
    strategy.RenderStrategy = RenderStrategy;
})(strategy || (strategy = {}));
var strategy;
(function (strategy_1) {
    var ExtractorContext = (function () {
        function ExtractorContext(strategy) {
            this.strategy = strategy;
        }
        ExtractorContext.prototype.execute = function (key) {
            return this.strategy.extract(key);
        };
        return ExtractorContext;
    }());
    strategy_1.ExtractorContext = ExtractorContext;
})(strategy || (strategy = {}));
var html;
(function (html) {
    var ExtractorContext = strategy.ExtractorContext;
    var Renderable = (function () {
        function Renderable(key) {
            this.key = key;
        }
        Renderable.prototype.execute = function (strategy) {
            var extractor = new ExtractorContext(strategy);
            return extractor.execute(this.key);
        };
        return Renderable;
    }());
    html.Renderable = Renderable;
})(html || (html = {}));
var strategy;
(function (strategy) {
    var SimpleAttributeRenderStrategy = (function (_super) {
        __extends(SimpleAttributeRenderStrategy, _super);
        function SimpleAttributeRenderStrategy() {
            _super.apply(this, arguments);
        }
        SimpleAttributeRenderStrategy.prototype.extract = function (key) {
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
        SimpleAttributeRenderStrategy.prototype.parse = function (value) {
            if (value instanceof Function) {
                return value();
            }
            return value;
        };
        return SimpleAttributeRenderStrategy;
    }(strategy.RenderStrategy));
    strategy.SimpleAttributeRenderStrategy = SimpleAttributeRenderStrategy;
})(strategy || (strategy = {}));
var strategy;
(function (strategy) {
    var ComplexAttributeRenderStrategy = (function (_super) {
        __extends(ComplexAttributeRenderStrategy, _super);
        function ComplexAttributeRenderStrategy() {
            _super.call(this);
            this.selectFactory(factory.AttributeStrategyFactory);
        }
        ComplexAttributeRenderStrategy.prototype.extract = function (keys) {
            var attributes = [];
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var element = keys_1[_i];
                this.appendExtractedElement(element, attributes);
            }
            return attributes.join('');
        };
        return ComplexAttributeRenderStrategy;
    }(strategy.RenderStrategy));
    strategy.ComplexAttributeRenderStrategy = ComplexAttributeRenderStrategy;
})(strategy || (strategy = {}));
var factory;
(function (factory) {
    var JSONs = utils.JSONs;
    var SimpleAttributeRenderStrategy = strategy.SimpleAttributeRenderStrategy;
    var ComplexAttributeRenderStrategy = strategy.ComplexAttributeRenderStrategy;
    var AttributeStrategyFactory = (function () {
        function AttributeStrategyFactory() {
        }
        AttributeStrategyFactory.selectStrategy = function (key) {
            if (JSONs.isSimple(key)) {
                return new SimpleAttributeRenderStrategy();
            }
            if (JSONs.isComplex(key)) {
                return new ComplexAttributeRenderStrategy();
            }
        };
        return AttributeStrategyFactory;
    }());
    factory.AttributeStrategyFactory = AttributeStrategyFactory;
})(factory || (factory = {}));
var html;
(function (html) {
    var AttributeStrategyFactory = factory.AttributeStrategyFactory;
    var Attribute = (function (_super) {
        __extends(Attribute, _super);
        function Attribute(key) {
            _super.call(this, key);
        }
        Attribute.prototype.render = function () {
            var strategy = AttributeStrategyFactory.selectStrategy(this.key);
            return this.execute(strategy);
        };
        return Attribute;
    }(html.Renderable));
    html.Attribute = Attribute;
})(html || (html = {}));
var strategy;
(function (strategy) {
    var ComplexContentRenderStrategy = (function (_super) {
        __extends(ComplexContentRenderStrategy, _super);
        function ComplexContentRenderStrategy() {
            _super.call(this);
            this.selectFactory(factory.ContentStrategyFactory);
        }
        ComplexContentRenderStrategy.prototype.extract = function (keys) {
            var content = [];
            for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var element = keys_2[_i];
                this.appendExtractedElement(element, content);
            }
            return content.join('');
        };
        return ComplexContentRenderStrategy;
    }(strategy.RenderStrategy));
    strategy.ComplexContentRenderStrategy = ComplexContentRenderStrategy;
})(strategy || (strategy = {}));
var strategy;
(function (strategy) {
    var SimpleContentRenderStrategy = (function (_super) {
        __extends(SimpleContentRenderStrategy, _super);
        function SimpleContentRenderStrategy() {
            _super.apply(this, arguments);
        }
        SimpleContentRenderStrategy.prototype.extract = function (key) {
            return key;
        };
        return SimpleContentRenderStrategy;
    }(strategy.RenderStrategy));
    strategy.SimpleContentRenderStrategy = SimpleContentRenderStrategy;
})(strategy || (strategy = {}));
var factory;
(function (factory) {
    var ComplexContentRenderStrategy = strategy.ComplexContentRenderStrategy;
    var SimpleContentRenderStrategy = strategy.SimpleContentRenderStrategy;
    var ContentStrategyFactory = (function () {
        function ContentStrategyFactory() {
        }
        ContentStrategyFactory.selectStrategy = function (key) {
            if (Array.isArray(key)) {
                return new ComplexContentRenderStrategy();
            }
            return new SimpleContentRenderStrategy();
        };
        return ContentStrategyFactory;
    }());
    factory.ContentStrategyFactory = ContentStrategyFactory;
})(factory || (factory = {}));
var html;
(function (html) {
    var ContentStrategyFactory = factory.ContentStrategyFactory;
    var Content = (function (_super) {
        __extends(Content, _super);
        function Content() {
            _super.apply(this, arguments);
        }
        Content.prototype.render = function () {
            var strategy = ContentStrategyFactory.selectStrategy(this.key);
            return this.execute(strategy);
        };
        return Content;
    }(html.Renderable));
    html.Content = Content;
})(html || (html = {}));
var factory;
(function (factory) {
    var Attribute = html.Attribute;
    var TagUtils = utils.TagUtils;
    var Content = html.Content;
    var Strings = utils.Strings;
    var RenderableFactory = (function () {
        function RenderableFactory() {
        }
        RenderableFactory.createAttribute = function (key) {
            if (TagUtils.isAttribute(key)) {
                return new Attribute(key);
            }
            return new Attribute({});
        };
        RenderableFactory.createContent = function (key) {
            if (TagUtils.isContent(key)) {
                return new Content(key);
            }
            return new Content(Strings.EMPTY);
        };
        return RenderableFactory;
    }());
    factory.RenderableFactory = RenderableFactory;
})(factory || (factory = {}));
var builder;
(function (builder) {
    var RenderableFactory = factory.RenderableFactory;
    var TagBuilder = (function () {
        function TagBuilder() {
        }
        TagBuilder.prototype.buildAttributes = function (attributesAndContent) {
            var attributes = '';
            for (var _i = 0, attributesAndContent_1 = attributesAndContent; _i < attributesAndContent_1.length; _i++) {
                var key = attributesAndContent_1[_i];
                var renderable = RenderableFactory.createAttribute(key);
                attributes += renderable.render();
            }
            return attributes + '>';
        };
        TagBuilder.prototype.buildContent = function (attributesAndContent) {
            var content = '';
            for (var _i = 0, attributesAndContent_2 = attributesAndContent; _i < attributesAndContent_2.length; _i++) {
                var key = attributesAndContent_2[_i];
                var renderable = RenderableFactory.createContent(key);
                content += renderable.render();
            }
            return content;
        };
        TagBuilder.prototype.open = function (name) {
            return '<' + name;
        };
        return TagBuilder;
    }());
    builder.TagBuilder = TagBuilder;
})(builder || (builder = {}));
var builder;
(function (builder) {
    var SingleCloseTagBuilder = (function (_super) {
        __extends(SingleCloseTagBuilder, _super);
        function SingleCloseTagBuilder() {
            _super.apply(this, arguments);
        }
        SingleCloseTagBuilder.prototype.build = function (name, attributesAndContent) {
            var result = this.open(name);
            result += this.buildAttributes(attributesAndContent).replace(">", "");
            result += this.close(name);
            return result;
        };
        SingleCloseTagBuilder.prototype.close = function (name) {
            return '/>';
        };
        return SingleCloseTagBuilder;
    }(builder.TagBuilder));
    builder.SingleCloseTagBuilder = SingleCloseTagBuilder;
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
            result += this.buildAttributes(attributesAndContent);
            result += this.buildContent(attributesAndContent);
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
var factory;
(function (factory) {
    var SingleCloseTagBuilder = builder.SingleCloseTagBuilder;
    var StandardTagBuilder = builder.StandardTagBuilder;
    var Arrays = utils.Arrays;
    var TagBuilderFactory = (function () {
        function TagBuilderFactory() {
        }
        TagBuilderFactory.createTagBuilder = function (tagName) {
            if (Arrays.contains(this.singleCloseTags, tagName)) {
                return new SingleCloseTagBuilder();
            }
            return new StandardTagBuilder();
        };
        TagBuilderFactory.appendSingleCloseTag = function (name) {
            this.singleCloseTags.push(name);
        };
        TagBuilderFactory.singleCloseTags = [
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
        Tag.prototype.appendAll = function (tagNames, singleton) {
            for (var _i = 0, tagNames_1 = tagNames; _i < tagNames_1.length; _i++) {
                var tagName = tagNames_1[_i];
                this.append(tagName, singleton);
            }
        };
        Tag.prototype.append = function (tagName, singleClose) {
            var _this = this;
            if (singleClose) {
                TagBuilderFactory.appendSingleCloseTag(tagName);
            }
            this[tagName] = function () {
                var attributesAndContent = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    attributesAndContent[_i - 0] = arguments[_i];
                }
                return _this.render(tagName, attributesAndContent);
            };
        };
        Tag.prototype.render = function (name, attributesAndContent) {
            var tagBuilder = TagBuilderFactory.createTagBuilder(name);
            return tagBuilder.build(name, attributesAndContent);
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