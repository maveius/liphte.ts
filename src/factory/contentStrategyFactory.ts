///<reference path="../utils/utils.ts"/>
///<reference path="../strategy/renderStrategy.ts"/>
///<reference path="../strategy/content/complexContentRenderStrategy.ts"/>
///<reference path="../strategy/content/simpleContentRenderStrategy.ts"/>

module liphte.factory {
    import JSONs = utils.JSONs;
    import TagUtils = utils.TagUtils;
    import ExtractorStrategy = strategy.RenderStrategy;
    import ComplexContentRenderStrategy = strategy.ComplexContentRenderStrategy;
    import SimpleContentRenderStrategy = strategy.SimpleContentRenderStrategy;

    export class ContentStrategyFactory {

        public static selectStrategy(key) : ExtractorStrategy {

            if( Array.isArray(key) ) {
                return new ComplexContentRenderStrategy();
            }

            return new SimpleContentRenderStrategy();
        }
    }
}