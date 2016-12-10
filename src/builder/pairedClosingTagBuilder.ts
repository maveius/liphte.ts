///<reference path="tagBuilder.ts"/>

module builder {
    import Strings = utils.Strings;
    import RenderableFactory = factory.RenderableFactory;

    export class PairedClosingTagBuilder extends TagBuilder {


        protected endAttributes(factory : RenderableFactory): string {
            return factory.closeTagCharacter();
        }


        protected close(name : string) : string {
            return '</'+name+'>';
        }


    }
}
