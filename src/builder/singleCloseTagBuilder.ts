///<reference path="tagBuilder.ts"/>

module builder {
    export class SingleCloseTagBuilder extends TagBuilder {

        public build(name: string, attributesAndContent: any): string {

            let result: string = this.open(name);
            result += this.buildAttributes(attributesAndContent).replace(">", "");
            result += this.close(name);

            return result;
        }

        protected close(name: string): string {
            return '/>';
        }

    }
}
