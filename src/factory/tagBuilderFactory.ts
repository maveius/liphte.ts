///<reference path="../builder/tagBuilder.ts"/>
///<reference path="../builder/standardTagBuilder.ts"/>
///<reference path="../builder/singleCloseTagBuilder.ts"/>
///<reference path="../utils/utils.ts"/>

module factory {
    import TagBuilder = builder.TagBuilder;
    import SingleCloseTagBuilder = builder.SingleCloseTagBuilder;
    import StandardTagBuilder = builder.StandardTagBuilder;
    import Arrays = utils.Arrays;

    export class TagBuilderFactory {

        private static singleCloseTags: Array<string> = [
            'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source'
        ];

        public static createTagBuilder(tagName : string) : TagBuilder {

            if( Arrays.contains(this.singleCloseTags, tagName) ) {
                return new SingleCloseTagBuilder();
            }

            return new StandardTagBuilder();
        }

        public static appendSingleton(name : string) {
            this.singleCloseTags.push(name);
        }
    }

}
