///<reference path="../utils/utils.ts"/>
///<reference path="../html/abstract/renderable.ts"/>
///<reference path="../strategy/renderStrategy.ts"/>
///<reference path="../strategy/renderContext.ts"/>
///<reference path="../factory/attributeStrategyFactory.ts"/>

module html {

    import JSONs = utils.JSONs;
    import Arrays = utils.Arrays;
    import ExtractorContext = strategy.ExtractorContext;
    import AttributeStrategyFactory = factory.AttributeStrategyFactory;
    import TagUtils = utils.TagUtils;

    export class Attribute extends Renderable {

        constructor(key : any) {
            super(key);
        }

        public render(): string {

            let strategy = AttributeStrategyFactory.selectStrategy(this.key);
            return this.execute(strategy);
        }

    }
}
