declare module html {
    class Attributes {
        private static instance;
        constructor();
        render(attributesAndContent: any): string;
        private isJSON(key);
        isString(key: any): boolean;
        private extract(key);
        private parse(value);
        static getInstance(): Attributes;
    }
}
declare module html {
    class Content {
        private static instance;
        private attributes;
        constructor();
        render(attributesAndContent: any): string;
        static getInstance(): Content;
    }
}
declare module builder {
    import Attributes = html.Attributes;
    import Content = html.Content;
    abstract class TagBuilder {
        protected attributes: Attributes;
        protected content: Content;
        abstract build(name: string, attributesAndContent: any): string;
        protected open(name: string): string;
        protected abstract close(name: string): string;
    }
}
declare module builder {
    class SingletonTagBuilder extends TagBuilder {
        build(name: string, attributesAndContent: any): string;
        protected close(name: string): string;
    }
}
declare module builder {
    class StandardTagBuilder extends TagBuilder {
        build(name: string, attributesAndContent: any): string;
        protected close(name: string): string;
    }
}
declare module utils {
    class Arrays {
        static contains(array: any[], object: any): boolean;
    }
}
declare module factory {
    import TagBuilder = builder.TagBuilder;
    class TagBuilderFactory {
        private static singletonTags;
        static createTagBuilder(tagName: string): TagBuilder;
        static appendSingleton(name: string): void;
    }
}
declare module html.abstract {
    abstract class Mark {
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
declare module liphte {
    let tag: any;
}
