module liphte.factory {
    import Renderable = liphte.html.Renderable;

    export abstract class RenderableFactory {

        public abstract createRenderable(key: any) : Renderable;

        public abstract closeTagCharacter() : string;

    }
}