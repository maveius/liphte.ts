module factory {

    import Attribute = html.Attribute;
    import Renderable = html.Renderable;
    import TagUtils = utils.TagUtils;
    import Content = html.Content;
    import Strings = utils.Strings;

    export class RenderableFactory {

        public static createAttribute(key: any) : Renderable {


            if (TagUtils.isAttribute(key)) {
                return new Attribute(key);
            }

            return new Attribute({});
        }

        public static createContent(key: any) : Renderable {

            let result = TagUtils.isContent(key);

            if(result) {
                return new Content(key);
            }

            return new Content(Strings.EMPTY);
        }
    }
}