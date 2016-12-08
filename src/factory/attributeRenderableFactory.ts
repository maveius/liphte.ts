module factory {
    import Attribute = html.Attribute;
    import Renderable = html.Renderable;
    import TagUtils = utils.TagUtils;

    export class AttributeRenderableFactory extends RenderableFactory {

        public createRenderable(key: any): Renderable {

            if (TagUtils.isAttribute(key)) {
                return new Attribute(key);
            }

            return new Attribute({});
        }

        public closeTagCharacter(): string {
            return '>';
        }
    }
}
