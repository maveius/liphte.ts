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


        public appendAll(tagNames: string[], singleClose?: boolean) {
            for (let tagName of tagNames) {
                this.append(tagName, singleClose);
            }
        }


        public append(tagName: string, singleClose?: boolean) {

            if (singleClose) {
                TagBuilderFactory.appendSingleCloseTag(tagName);
            }

            this[tagName] = (...attributesAndContent) => this.render(tagName, attributesAndContent);

        }


        //noinspection JSMethodCanBeStatic
        private render(name: string, attributesAndContent: any): string {

            let tagBuilder: TagBuilder = TagBuilderFactory.createTagBuilder(name);
            return tagBuilder.build(name, attributesAndContent);
        }


        public static getInstance(): Tag {
            return Tag.instance;
        }
    }

    //noinspection JSUnusedLocalSymbols
    export let tag : any = <any> Tag.getInstance();
}
