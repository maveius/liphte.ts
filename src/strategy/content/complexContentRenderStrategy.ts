///<reference path="../renderStrategy.ts"/>
///<reference path="../../factory/contentStrategyFactory.ts"/>

module liphte.strategy {

    export class ComplexContentRenderStrategy extends RenderStrategy {

        constructor(){
            super();
            this.selectFactory(factory.ContentStrategyFactory);
        }

        public extract(keys): string {

            let content : Array<string> = [];

            for(let element of keys) {

                this.appendExtractedElement(element, content);
            }

            return content.join('');
        }

    }
}