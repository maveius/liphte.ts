///<reference path="html/abstract/mark.ts"/>
///<reference path="./builder/tagBuilder.ts"/>
///<reference path="./factory/tagBuilderFactory.ts"/>

module liphte {
    import Mark = html.abstract.Mark;
    import TagBuilder = builder.TagBuilder;
    import TagBuilderFactory = factory.TagBuilderFactory;

    class Tag extends Mark {

        private static instance: Tag = new Tag();

        //noinspection JSUnusedGlobalSymbols
        constructor() {
            if (Tag.instance) {
                throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
            }
            super();
            this.assignImplementation();

            Tag.instance = this;
        }


        private assignImplementation() {
            this.appendAll(this.tags);
        }


        //noinspection JSMethodCanBeStatic
        private render(name: string, attributesAndContent: any): string {

            let tagBuilder: TagBuilder = TagBuilderFactory.createTagBuilder(name);
            return tagBuilder.build(name, attributesAndContent);
        }


        public append(tagName: string, singleton?: boolean) {
            this[tagName] = (...attributesAndContent) => this.render(tagName, attributesAndContent);
            if (singleton) {
                TagBuilderFactory.appendSingleton(tagName);
            }
        }

        public appendAll(tagNames: string[], singleton?: boolean) {
            for (let tagName of tagNames) {
                this.append(tagName, singleton);
            }
        }

        public static getInstance(): Tag {
            return Tag.instance;
        }
    }

    //noinspection JSUnusedLocalSymbols
    export let tag : any = <any> Tag.getInstance();
}
