import { LElement } from './Base';

export class LArray {
  elements: Array<LElement>;
  size: number;

  constructor(size: number) {
    this.size = size;
    this.elements = LArray.elementsInDescendingOrder(size);
    this.randomize();
  }

  setElementsColor(indices: Array<number>, color: string): void {
    indices.forEach((index) => {
      if (this.elements.length > index) {
        this.elements[index].color = color;
      }
    });
  }

  swapElements(firstIndex: number, secondIndex: number): void {
    const a = this.elements[firstIndex];
    this.elements[firstIndex] = this.elements[secondIndex];
    this.elements[secondIndex] = a;
  }

  ifAnElementGreater(greaterIndex: number, lessIndex: number): boolean {
    return this.elements[greaterIndex].value > this.elements[lessIndex].value;
  }

  ifElementGreaterThanValue(index: number, value: number): boolean {
    return this.elements[index].value > value;
  }

  ifElementLessThanValue(index: number, value: number): boolean {
    return this.elements[index].value < value;
  }

  async highlightElements(
    indicies: Array<number>,
    highlightColor: string,
    defaultColor: string,
    delay: number,
    callback: () => void
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      this.setElementsColor(indicies, highlightColor);
      callback();
      setTimeout(() => {
        this.setElementsColor(indicies, defaultColor);
        callback();
        resolve();
      }, delay);
    });
  }

  async swapWithHighlight(
    first: number,
    second: number,
    delay: number,
    callback: () => void
  ): Promise<void> {
    await this.highlightElements(
      [first, second],
      'green',
      'yellow',
      delay,
      callback
    );
    this.swapElements(first, second);
    return;
  }

  private static getRandInRange(min: number, max: number): number {
    return Math.round(Math.random() * (max - min - 1) + min);
  }

  private static doesIdExist(elements: Array<LElement>, id: number): boolean {
    return elements.findIndex((e) => e.id == id) !== -1;
  }

  private static genId(elements: Array<LElement>): number {
    let id = this.getRandInRange(0, Number.MAX_SAFE_INTEGER);
    while (this.doesIdExist(elements, id)) {
      id = this.getRandInRange(0, Number.MAX_SAFE_INTEGER);
    }
    return id;
  }

  randomize(): void {
    for (let i = 0; i < this.size; ++i) {
      const firstIndex = LArray.getRandInRange(0, this.size);
      const secondIndex = LArray.getRandInRange(0, this.size);
      const a = this.elements[firstIndex];
      this.elements[firstIndex] = this.elements[secondIndex];
      this.elements[secondIndex] = a;
    }
  }

  static elementsInDescendingOrder(size: number): Array<LElement> {
    const elements = new Array<LElement>();
    for (let i = 0; i < size; ++i) {
      const id = LArray.genId(elements);
      elements.push(new LElement(size - i, id));
    }
    return elements;
  }
}
