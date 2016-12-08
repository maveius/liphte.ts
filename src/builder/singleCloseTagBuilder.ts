///<reference path="tagBuilder.ts"/>

module builder {
    import Strings = utils.Strings;
    import RenderableFactory = factory.RenderableFactory;

    export class SingleCloseTagBuilder extends TagBuilder {


        protected endAttributes(factory : RenderableFactory): string {
            return Strings.EMPTY;
        }


        protected close(name: string): string {
            return '/>';
        }

    }
}
