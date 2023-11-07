export class CircularBuffer<T> {
  public items: T[];
  private head: number;

  constructor(size: number) {
    this.items = new Array(size);
    this.head = 0;
  }

  add(item: T) {
    this.items[this.head] = item;
    this.head = (this.head + 1) % this.items.length;
  }

  get(index: number): T {
    return this.items[(this.head + index) % this.items.length];
  }
}
