///<reference path="../html/attribute.ts"/>
///<reference path="../html/content.ts"/>
///<reference path="../factory/renderableFactory.ts"/>
///<reference path="../factory/attributeRenderableFactory.ts"/>
///<reference path="../factory/contentRenderableFactory.ts"/>

module builder {
    import Renderable = html.Renderable;
    import RenderableFactory = factory.RenderableFactory;
    import AttributeRenderableFactory = factory.AttributeRenderableFactory;
    import ContentRenderableFactory = factory.ContentRenderableFactory;

    export abstract class TagBuilder {


        /** Template Method Pattern **/
        public build(name : string, attributesAndContent : any) : string {

            let htmlTag: string = this.open(name);

            htmlTag += this.buildAttributes(attributesAndContent);
            htmlTag += this.buildContent(attributesAndContent);

            htmlTag += this.close(name);

            return htmlTag;
        }


        //noinspection JSMethodCanBeStatic
        protected open(name : string) : string {
            return '<'+name;
        }


        protected buildAttributes(attributesAndContent : any) : string {
            let factory : RenderableFactory = new AttributeRenderableFactory();
            return this.buildPart(attributesAndContent, factory);
        }


        protected buildContent(attributesAndContent : any) {
            let factory : RenderableFactory = new ContentRenderableFactory();
            return this.buildPart(attributesAndContent, factory);
        }


        /** Template Method Pattern **/
        private buildPart(attributesAndContent : any, factory : RenderableFactory ) : string {

            let partOfTag: string = '';

            for (let key of attributesAndContent) {
                let renderable : Renderable = factory.createRenderable(key);
                partOfTag += renderable.render();
            }

            return partOfTag + this.endAttributes(factory);
        }

        protected abstract endAttributes(factory : RenderableFactory) : string;

        protected abstract close(name : string) : string;
    }
}
