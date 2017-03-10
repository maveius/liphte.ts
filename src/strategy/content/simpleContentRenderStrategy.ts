///<reference path="../renderStrategy.ts"/>

module liphte.strategy {
    export class SimpleContentRenderStrategy extends RenderStrategy {

        public extract(key): string {
            return key;
        }

    }
}