declare module html.abstract {
    abstract class Markup {
        protected tags: string[];
        a(...attributesAndContent: any[]): void;
        abbr(...attributesAndContent: any[]): void;
        address(...attributesAndContent: any[]): void;
        area(...attributesAndContent: any[]): void;
        article(...attributesAndContent: any[]): void;
        aside(...attributesAndContent: any[]): void;
        audio(...attributesAndContent: any[]): void;
        b(...attributesAndContent: any[]): void;
        base(...attributesAndContent: any[]): void;
        bdi(...attributesAndContent: any[]): void;
        bdo(...attributesAndContent: any[]): void;
        blockquote(...attributesAndContent: any[]): void;
        body(...attributesAndContent: any[]): void;
        br(...attributesAndContent: any[]): void;
        button(...attributesAndContent: any[]): void;
        canvas(...attributesAndContent: any[]): void;
        caption(...attributesAndContent: any[]): void;
        cite(...attributesAndContent: any[]): void;
        code(...attributesAndContent: any[]): void;
        col(...attributesAndContent: any[]): void;
        colgroup(...attributesAndContent: any[]): void;
        command(...attributesAndContent: any[]): void;
        datalist(...attributesAndContent: any[]): void;
        dd(...attributesAndContent: any[]): void;
        del(...attributesAndContent: any[]): void;
        details(...attributesAndContent: any[]): void;
        dfn(...attributesAndContent: any[]): void;
        div(...attributesAndContent: any[]): void;
        dl(...attributesAndContent: any[]): void;
        dt(...attributesAndContent: any[]): void;
        em(...attributesAndContent: any[]): void;
        embed(...attributesAndContent: any[]): void;
        fieldset(...attributesAndContent: any[]): void;
        figcaption(...attributesAndContent: any[]): void;
        figure(...attributesAndContent: any[]): void;
        footer(...attributesAndContent: any[]): void;
        form(...attributesAndContent: any[]): void;
        h1(...attributesAndContent: any[]): void;
        h2(...attributesAndContent: any[]): void;
        h3(...attributesAndContent: any[]): void;
        h4(...attributesAndContent: any[]): void;
        h5(...attributesAndContent: any[]): void;
        h6(...attributesAndContent: any[]): void;
        head(...attributesAndContent: any[]): void;
        header(...attributesAndContent: any[]): void;
        hgroup(...attributesAndContent: any[]): void;
        hr(...attributesAndContent: any[]): void;
        html(...attributesAndContent: any[]): void;
        i(...attributesAndContent: any[]): void;
        iframe(...attributesAndContent: any[]): void;
        img(...attributesAndContent: any[]): void;
        input(...attributesAndContent: any[]): void;
        ins(...attributesAndContent: any[]): void;
        kbd(...attributesAndContent: any[]): void;
        keygen(...attributesAndContent: any[]): void;
        label(...attributesAndContent: any[]): void;
        legend(...attributesAndContent: any[]): void;
        li(...attributesAndContent: any[]): void;
        link(...attributesAndContent: any[]): void;
        map(...attributesAndContent: any[]): void;
        mark(...attributesAndContent: any[]): void;
        menu(...attributesAndContent: any[]): void;
        meta(...attributesAndContent: any[]): void;
        meter(...attributesAndContent: any[]): void;
        nav(...attributesAndContent: any[]): void;
        noscript(...attributesAndContent: any[]): void;
        object(...attributesAndContent: any[]): void;
        ol(...attributesAndContent: any[]): void;
        optgroup(...attributesAndContent: any[]): void;
        option(...attributesAndContent: any[]): void;
        output(...attributesAndContent: any[]): void;
        p(...attributesAndContent: any[]): void;
        param(...attributesAndContent: any[]): void;
        pre(...attributesAndContent: any[]): void;
        progress(...attributesAndContent: any[]): void;
        q(...attributesAndContent: any[]): void;
        rp(...attributesAndContent: any[]): void;
        rt(...attributesAndContent: any[]): void;
        ruby(...attributesAndContent: any[]): void;
        s(...attributesAndContent: any[]): void;
        samp(...attributesAndContent: any[]): void;
        script(...attributesAndContent: any[]): void;
        section(...attributesAndContent: any[]): void;
        select(...attributesAndContent: any[]): void;
        small(...attributesAndContent: any[]): void;
        source(...attributesAndContent: any[]): void;
        span(...attributesAndContent: any[]): void;
        strong(...attributesAndContent: any[]): void;
        style(...attributesAndContent: any[]): void;
        sub(...attributesAndContent: any[]): void;
        summary(...attributesAndContent: any[]): void;
        sup(...attributesAndContent: any[]): void;
        table(...attributesAndContent: any[]): void;
        tbody(...attributesAndContent: any[]): void;
        td(...attributesAndContent: any[]): void;
        textarea(...attributesAndContent: any[]): void;
        tfoot(...attributesAndContent: any[]): void;
        th(...attributesAndContent: any[]): void;
        thead(...attributesAndContent: any[]): void;
        time(...attributesAndContent: any[]): void;
        title(...attributesAndContent: any[]): void;
        tr(...attributesAndContent: any[]): void;
        track(...attributesAndContent: any[]): void;
        u(...attributesAndContent: any[]): void;
        ul(...attributesAndContent: any[]): void;
        var(...attributesAndContent: any[]): void;
        video(...attributesAndContent: any[]): void;
        wbr(...attributesAndContent: any[]): void;
    }
}
declare module utils {
    class Arrays {
        static contains(array: any[], object: any): boolean;
        static identity: <Y>(type: new () => Y) => string;
        static isArray<T>(instance: any): boolean;
        private static checkElements<T>(instance);
    }
    class JSONs {
        static isJSON(object: any): boolean;
        static isSimple(object: any): boolean;
        static isComplex(object: any): boolean;
    }
    class Strings {
        static EMPTY: string;
        static isString(object: any): boolean;
    }
    class TagUtils {
        private static counter;
        static isAttribute(object: any): boolean;
        static isContent(object: any): boolean;
    }
}
declare module strategy {
    abstract class RenderStrategy {
        protected factory: any;
        protected strategy: any;
        abstract extract(key: any): string;
        protected selectFactory(factory: any): void;
        protected appendExtractedElement(element: any, results: any): void;
    }
}
declare module strategy {
    class ExtractorContext {
        private strategy;
        constructor(strategy: RenderStrategy);
        execute(key: any): string;
    }
}
declare module html {
    import ExtractorStrategy = strategy.RenderStrategy;
    abstract class Renderable {
        protected key: any;
        constructor(key: any);
        abstract render(): string;
        protected execute(strategy: ExtractorStrategy): string;
    }
}
declare module strategy {
    class SimpleAttributeRenderStrategy extends RenderStrategy {
        extract(key: any): string;
        private getMappedAttribute(id, value);
        private parse(value);
    }
}
declare module strategy {
    class ComplexAttributeRenderStrategy extends RenderStrategy {
        constructor();
        extract(keys: any): string;
    }
}
declare module factory {
    import ExtractorStrategy = strategy.RenderStrategy;
    class AttributeStrategyFactory {
        static selectStrategy(key: any): ExtractorStrategy;
    }
}
declare module html {
    class Attribute extends Renderable {
        constructor(key: any);
        render(): string;
    }
}
declare module strategy {
    class ComplexContentRenderStrategy extends RenderStrategy {
        constructor();
        extract(keys: any): string;
    }
}
declare module strategy {
    class SimpleContentRenderStrategy extends RenderStrategy {
        extract(key: any): string;
    }
}
declare module factory {
    import ExtractorStrategy = strategy.RenderStrategy;
    class ContentStrategyFactory {
        static selectStrategy(key: any): ExtractorStrategy;
    }
}
declare module html {
    class Content extends Renderable {
        render(): string;
    }
}
declare module factory {
    import Renderable = html.Renderable;
    abstract class RenderableFactory {
        abstract createRenderable(key: any): Renderable;
        abstract closeTagCharacter(): string;
    }
}
declare module factory {
    import Renderable = html.Renderable;
    class AttributeRenderableFactory extends RenderableFactory {
        createRenderable(key: any): Renderable;
        closeTagCharacter(): string;
    }
}
declare module factory {
    import Renderable = html.Renderable;
    class ContentRenderableFactory extends RenderableFactory {
        createRenderable(key: any): Renderable;
        closeTagCharacter(): string;
    }
}
declare module builder {
    import RenderableFactory = factory.RenderableFactory;
    abstract class TagBuilder {
        build(name: string, attributesAndContent: any): string;
        protected open(name: string): string;
        protected buildAttributes(attributesAndContent: any): string;
        protected buildContent(attributesAndContent: any): string;
        private buildPart(attributesAndContent, factory);
        protected abstract endAttributes(factory: RenderableFactory): string;
        protected abstract close(name: string): string;
    }
}
declare module builder {
    import RenderableFactory = factory.RenderableFactory;
    class PairedClosingTagBuilder extends TagBuilder {
        protected endAttributes(factory: RenderableFactory): string;
        protected close(name: string): string;
    }
}
declare module builder {
    import RenderableFactory = factory.RenderableFactory;
    class SelfClosingTagBuilder extends TagBuilder {
        protected buildContent(attributesAndContent: any): string;
        protected endAttributes(factory: RenderableFactory): string;
        protected close(name: string): string;
    }
}
declare module factory {
    import TagBuilder = builder.TagBuilder;
    class TagBuilderFactory {
        private static selfClosingTags;
        static createTagBuilder(tagName: string): TagBuilder;
        private static isSelfClosingTag(tagName);
        static appendSingleCloseTag(name: string): void;
    }
}
declare module liphte {
    let tag: any;
}
