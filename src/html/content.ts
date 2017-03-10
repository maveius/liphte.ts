///<reference path="../utils/utils.ts"/>
///<reference path="../strategy/renderStrategy.ts"/>
///<reference path="../strategy/renderContext.ts"/>
///<reference path="../factory/contentStrategyFactory.ts"/>

module liphte.html {

    import Strings = utils.Strings;
    import TagUtils = utils.TagUtils;
    import ExtractorContext = strategy.ExtractorContext;
    import ContentStrategyFactory = factory.ContentStrategyFactory;

    export class Content extends Renderable {

        public render() : string {

            let strategy = ContentStrategyFactory.selectStrategy(this.key);
            return this.execute(strategy);
        }
    }
}