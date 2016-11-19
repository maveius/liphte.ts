module utils {

    import Content = html.Content;
    import Attribute = html.Attribute;
    export class Arrays {

        public static contains(array: any[], object: any) {
            for (let key of array) {
                if (key === object) {
                    return true;
                }
            }
            return false;
        }

        public static identity = function<Y> (type: {new() : Y;}) : string {
            return typeof (new type());
        };


        public static isArray<T>(instance : any) : boolean {

            if( Array.isArray(instance) ) {
                return this.checkElements<T>(instance);
            }

            return false;
        }

        private static checkElements<T>(instance : any) : boolean {

            let stringify = JSON.stringify(instance);

            for (let element of instance) {
                if(typeof element !== (typeof T)) {
                    return false;
                }
            }

            return true;
        }
    }

    export class JSONs {

        public static isJSON(object : any) : boolean {
            return JSON.parse(JSON.stringify(object)) instanceof Object;
        }

        public static isSimple(object : any) : boolean {
            let result = JSONs.isJSON(object) && !Array.isArray(object);
            return result;
        }

        public static isComplex(object : any) : boolean {
            let result = Arrays.isArray<Object>(object);
            return result;
        }
    }

    export class Strings {

        public static EMPTY = '';

        //noinspection JSMethodCanBeStatic
        public static isString(object: any): boolean {
            return ((typeof object) === 'string');
        }

    }

    export class TagUtils {

        private static counter = 0;

        public static isAttribute(object : any) : boolean {

            let isJSON = JSONs.isSimple(object);
            let isSimple = JSONs.isSimple(object);
            let isComplex = JSONs.isComplex(object);

            let result = (JSONs.isSimple(object) || JSONs.isComplex(object));

            return result;
        }

        public static isContent(object : any) : boolean {

            let stringify = JSON.stringify(object);

            if(JSONs.isComplex(object)) {
                for(let element of object) {
                    if(JSON.stringify(element).indexOf("Element") > 0) {

                        return this.isContent(element);
                    }
                }
            }

            let isNotAttribute = !this.isAttribute(object);
            let isArrayOfContent = Arrays.isArray<string>(object);
            let isArray = Array.isArray(object);
            let isString = Strings.isString(object);

            return isNotAttribute || isString ;
        }
    }
}
