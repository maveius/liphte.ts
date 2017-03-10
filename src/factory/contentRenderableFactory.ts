module liphte.factory {
    import Renderable = liphte.html.Renderable;
    import TagUtils = utils.TagUtils;
    import Content = liphte.html.Content;
    import Strings = utils.Strings;

    export class ContentRenderableFactory extends RenderableFactory{

        public createRenderable(key: any): Renderable {

            if(TagUtils.isContent(key)) {
                return new Content(key);
            }

            return new Content(Strings.EMPTY);
        }

        public closeTagCharacter(): string {
            return Strings.EMPTY;
        }

    }
}
