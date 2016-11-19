///<reference path="../html/attribute.ts"/>
///<reference path="../html/content.ts"/>
///<reference path="../factory/renderableFactory.ts"/>

module builder {

    import Attributes = html.Attribute;
    import Content = html.Content;
    import Attribute = html.Attribute;
    import RenderableFactory = factory.RenderableFactory;
    import Renderable = html.Renderable;

    export abstract class TagBuilder {

        public abstract build(name : string, attributesAndContent : any) : string;


        //noinspection JSMethodCanBeStatic
        protected buildAttributes(attributesAndContent : any) : string {

            let attributes: string = '';

            for (let key of attributesAndContent) {
                let renderable : Renderable = RenderableFactory.createAttribute(key);
                attributes += renderable.render();
            }

            return attributes + '>';
        }


        //noinspection JSMethodCanBeStatic
        protected buildContent(attributesAndContent : any) {

            let content = '';

            let i = 0;
            for (let key of attributesAndContent) {
                let renderable : Renderable = RenderableFactory.createContent(key);
                content += renderable.render();
            }
            return content;
        }


        //noinspection JSMethodCanBeStatic
        protected open(name : string) : string {
            return '<'+name;
        }


        protected abstract close(name : string) : string;
    }
}
