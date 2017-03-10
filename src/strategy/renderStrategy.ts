module liphte.strategy {
    export abstract class RenderStrategy {

        protected factory;
        protected strategy;

        public abstract extract(key : any): string;

        protected selectFactory(factory) :void {
            this.factory = factory;
        }

        protected appendExtractedElement(element, results) {
            this.strategy = this.factory.selectStrategy(element);
            if(this.strategy !== undefined) {
                results.push( this.strategy.extract(element) );
            }
        }
    }
}