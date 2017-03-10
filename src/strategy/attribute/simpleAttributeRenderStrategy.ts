module liphte.strategy {
    export class SimpleAttributeRenderStrategy extends RenderStrategy {

        public extract(key): string {

            let space: string = '';
            let tagAttributes: string[] = [];

            for (let id in key) {
                //noinspection JSUnfilteredForInLoop
                let value = key[id];
                let attribute = (id + '="' + this.parse(value) + '"');
                tagAttributes.push(attribute);
            }

            if (tagAttributes.length > 0) {
                space = ' ';
            }

            return space + tagAttributes.join(" ");

        }

        //noinspection JSMethodCanBeStatic
        private parse(value) {
            if (value instanceof Function) {
                return value();
            }

            return value;
        }
    }
}