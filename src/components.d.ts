/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface RdtHead {
    }
}
declare global {
    interface HTMLRdtHeadElement extends Components.RdtHead, HTMLStencilElement {
    }
    var HTMLRdtHeadElement: {
        prototype: HTMLRdtHeadElement;
        new (): HTMLRdtHeadElement;
    };
    interface HTMLElementTagNameMap {
        "rdt-head": HTMLRdtHeadElement;
    }
}
declare namespace LocalJSX {
    interface RdtHead {
    }
    interface IntrinsicElements {
        "rdt-head": RdtHead;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "rdt-head": LocalJSX.RdtHead & JSXBase.HTMLAttributes<HTMLRdtHeadElement>;
        }
    }
}
