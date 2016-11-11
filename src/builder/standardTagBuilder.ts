///<reference path="tagBuilder.ts"/>

module builder {
    export class StandardTagBuilder extends TagBuilder {

        public build(name: string, attributesAndContent: any): string {

            let result : string = this.open(name);

            result += this.attributes.render(attributesAndContent);
            result += this.content.render(attributesAndContent);

            result += this.close(name);

            return result;
        }

        //noinspection JSMethodCanBeStatic
        protected close(name : string) : string {
            return '</'+name+'>';
        }


    }
}
