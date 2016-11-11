module html {
    export class Content {

        private static instance: Content = new Content();

        private attributes = Attributes.getInstance();

        constructor() {
            if (Content.instance) {
                throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
            }

            Content.instance = this;
        }

        public render(attributesAndContent: any) {
            let result = '';

            for (let key of attributesAndContent) {
                if (this.attributes.isString(key)) {
                    result += key;
                }
            }
            return result;
        }

        public static getInstance(): Content {
            return Content.instance;
        }
    }
}