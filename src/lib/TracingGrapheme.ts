import type { Point } from "./Point";

export interface TracingGrapheme {
    position: Point,
    width: number,
    height: number,
    imageData: ImageData
}
