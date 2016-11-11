module utils {
    export class Arrays {

        public static contains(array: any[], object: any) {
            for (let key of array) {
                if (key === object) {
                    return true;
                }
            }
            return false;
        }
    }
}
