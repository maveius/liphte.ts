module factory {
    import Renderable = html.Renderable;

    export abstract class RenderableFactory {

        public abstract createRenderable(key: any) : Renderable;

        public abstract closeTagCharacter() : string;

    }
}