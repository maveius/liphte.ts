///<reference path="../html/attributes.ts"/>
///<reference path="../html/content.ts"/>

module builder {

    import Attributes = html.Attributes;
    import Content = html.Content;
    export abstract class TagBuilder {

        protected attributes = Attributes.getInstance();
        protected content = Content.getInstance();

        public abstract build(name : string, attributesAndContent : any) : string;

        protected open(name : string) : string {
            return '<'+name;
        }

        protected abstract close(name : string) : string;
    }
}
