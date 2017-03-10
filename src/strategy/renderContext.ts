module liphte.strategy {
    import JSONs = utils.JSONs;
    export class ExtractorContext {

        private strategy : RenderStrategy;

        constructor(strategy : RenderStrategy) {
            this.strategy = strategy;
        }

        public execute(key) : string {
            return this.strategy.extract(key);
        }
    }
}