module strategy {
    export class SimpleAttributeRenderStrategy extends RenderStrategy {

        public extract(key): string {

            let space: string = '';
            let tagAttributes: string[] = [];

            for (let id in key) {
                let value = key[id];
                let attribute = this.getMappedAttribute(id, value);
                tagAttributes.push(attribute);
            }

            if (tagAttributes.length > 0) {
                space = ' ';
            }

            return space + tagAttributes.join(" ");

        }

        private getMappedAttribute(id, value: any) {
            if(id === 'liphteAttributes'){
                return this.parse(value);
            }
            return (id + '="' + this.parse(value) + '"');
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