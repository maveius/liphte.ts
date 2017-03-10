///<reference path="../../utils/utils.ts"/>
///<reference path="../renderStrategy.ts"/>
///<reference path="./simpleAttributeRenderStrategy.ts"/>
///<reference path="../../factory/attributeStrategyFactory.ts"/>

module liphte.strategy {

    import JSONs = utils.JSONs;

    export class ComplexAttributeRenderStrategy extends RenderStrategy {

        constructor() {
            super();
            this.selectFactory(factory.AttributeStrategyFactory);
        }

        public extract(keys): string {

            let attributes : Array<string> = [];

            for( let element of keys ) {
                this.appendExtractedElement(element, attributes);
            }

            return attributes.join('');
        }

    }
}