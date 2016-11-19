///<reference path="../renderStrategy.ts"/>

module strategy {
    export class SimpleContentRenderStrategy extends RenderStrategy {

        public extract(key): string {
            return key;
        }

    }
}