///<reference path="../builder/tagBuilder.ts"/>
///<reference path="../builder/pairedClosingTagBuilder.ts"/>
///<reference path="../builder/selfClosingTagBuilder.ts"/>
///<reference path="../utils/utils.ts"/>

module factory {
    import TagBuilder = builder.TagBuilder;
    import SelfClosingTagBuilder = builder.SelfClosingTagBuilder;
    import PairedClosingTagBuilder = builder.PairedClosingTagBuilder;
    import Arrays = utils.Arrays;

    export class TagBuilderFactory {

        private static selfClosingTags: Array<string> = [
            'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source'
        ];

        public static createTagBuilder(tagName : string) : TagBuilder {

            if( this.isSelfClosingTag(tagName) ) {
                return new SelfClosingTagBuilder();
            }

            return new PairedClosingTagBuilder();
        }

        private static isSelfClosingTag(tagName: string) {
            return Arrays.contains(this.selfClosingTags, tagName);
        }

        public static appendSingleCloseTag(name : string) {
            this.selfClosingTags.push(name);
        }
    }

}
