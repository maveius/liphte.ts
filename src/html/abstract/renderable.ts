///<reference path="../../utils/utils.ts"/>
///<reference path="../../strategy/renderStrategy.ts"/>
///<reference path="../../strategy/renderContext.ts"/>

module html {

    import ExtractorContext = strategy.ExtractorContext;
    import ExtractorStrategy = strategy.RenderStrategy;

    export abstract class Renderable {

        protected key : any;

        constructor(key : any) {
            this.key = key;
        }

        public abstract render() : string;

        protected execute(strategy : ExtractorStrategy) : string {

            let extractor = new ExtractorContext(strategy);
            return extractor.execute(this.key);
        }
    }
}