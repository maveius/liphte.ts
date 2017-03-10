///<reference path="tagBuilder.ts"/>

module liphte.builder {
    import Strings = utils.Strings;
    import RenderableFactory = factory.RenderableFactory;

    export class SelfClosingTagBuilder extends TagBuilder {


        protected buildContent(attributesAndContent: any): string {
            return Strings.EMPTY;
        }

        protected endAttributes(factory : RenderableFactory): string {
            return Strings.EMPTY;
        }


        protected close(name: string): string {
            return '/>';
        }

    }
}
