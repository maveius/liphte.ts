module html {
    export class Attributes {

        private static instance: Attributes = new Attributes();

        //noinspection JSUnusedGlobalSymbols
        constructor() {
            if (Attributes.instance) {
                throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
            }

            Attributes.instance = this;
        }

        public render(attributesAndContent: any) {

            let attributes: string = '';
            for (let key of attributesAndContent) {
                if (this.isJSON(key)) {
                    attributes += this.extract(key);
                }
            }
            return attributes + '>';
        }

        private isJSON(key) {
            return !this.isString(key);
        }

        //noinspection JSMethodCanBeStatic
        public isString(key: any): boolean {
            return ((typeof key) === 'string');
        }


        private extract(key): string {

            let space: string = '';
            let tagAttributes: string[] = [];

            for (let id in key) {
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

        public static getInstance(): Attributes {
            return Attributes.instance;
        }

    }
}
