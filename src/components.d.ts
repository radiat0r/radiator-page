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
    interface RdtLogo {
    }
}
declare global {
    interface HTMLRdtHeadElement extends Components.RdtHead, HTMLStencilElement {
    }
    var HTMLRdtHeadElement: {
        prototype: HTMLRdtHeadElement;
        new (): HTMLRdtHeadElement;
    };
    interface HTMLRdtLogoElement extends Components.RdtLogo, HTMLStencilElement {
    }
    var HTMLRdtLogoElement: {
        prototype: HTMLRdtLogoElement;
        new (): HTMLRdtLogoElement;
    };
    interface HTMLElementTagNameMap {
        "rdt-head": HTMLRdtHeadElement;
        "rdt-logo": HTMLRdtLogoElement;
    }
}
declare namespace LocalJSX {
    interface RdtHead {
    }
    interface RdtLogo {
    }
    interface IntrinsicElements {
        "rdt-head": RdtHead;
        "rdt-logo": RdtLogo;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "rdt-head": LocalJSX.RdtHead & JSXBase.HTMLAttributes<HTMLRdtHeadElement>;
            "rdt-logo": LocalJSX.RdtLogo & JSXBase.HTMLAttributes<HTMLRdtLogoElement>;
        }
    }
}
