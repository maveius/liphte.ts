///<reference path="../builder/tagBuilder.ts"/>
///<reference path="../builder/standardTagBuilder.ts"/>
///<reference path="../builder/singletonTagBuilder.ts"/>
///<reference path="../utils/arrays.ts"/>

module factory {
    import TagBuilder = builder.TagBuilder;
    import SingletonTagBuilder = builder.SingletonTagBuilder;
    import StandardTagBuilder = builder.StandardTagBuilder;
    import Arrays = utils.Arrays;

    export class TagBuilderFactory {

        private static singletonTags: Array<string> = [
            'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source'
        ];

        public static createTagBuilder(tagName : string) : TagBuilder {

            if( Arrays.contains(this.singletonTags, tagName) ) {
                return new SingletonTagBuilder();
            }

            return new StandardTagBuilder();
        }

        public static appendSingleton(name : string) {
            this.singletonTags.push(name);
        }
    }

}
