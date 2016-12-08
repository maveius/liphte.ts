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


        public build(name : string, attributesAndContent : any) : string {

            let result: string = this.open(name);

            result += this.buildAttributes(attributesAndContent);
            result += this.buildContent(attributesAndContent);

            result += this.close(name);

            return result;
        }


        //noinspection JSMethodCanBeStatic
        protected open(name : string) : string {
            return '<'+name;
        }


        private buildAttributes(attributesAndContent : any) : string {
            let factory : RenderableFactory = new AttributeRenderableFactory();
            return this.buildPart(attributesAndContent, factory);
        }


        private buildContent(attributesAndContent : any) {
            let factory : RenderableFactory = new ContentRenderableFactory();
            return this.buildPart(attributesAndContent, factory);
        }


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
