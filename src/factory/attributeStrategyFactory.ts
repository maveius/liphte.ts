///<reference path="../utils/utils.ts"/>
///<reference path="../strategy/renderStrategy.ts"/>
///<reference path="../strategy/attribute/complexAttributeRenderStrategy.ts"/>
///<reference path="../strategy/attribute/simpleAttributeRenderStrategy.ts"/>

module liphte.factory {

    import ExtractorStrategy = strategy.RenderStrategy;
    import JSONs = utils.JSONs;
    import SimpleAttributeRenderStrategy = strategy.SimpleAttributeRenderStrategy;
    import ComplexAttributeRenderStrategy = strategy.ComplexAttributeRenderStrategy;

    export class AttributeStrategyFactory {

        public static selectStrategy(key) : ExtractorStrategy {

            if(JSONs.isSimple(key)) {
                return new SimpleAttributeRenderStrategy();
            }

            if(JSONs.isComplex(key)) {
                return new ComplexAttributeRenderStrategy();
            }
        }
    }
}