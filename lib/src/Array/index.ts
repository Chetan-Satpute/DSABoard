import Node from "../Node";
import Structure from "../Structure";

class Array extends Structure {
  array: Node[];
  length: number;

  constructor(values: number[] = []) {
    super();

    this.array = values.map((value) => new Node(value));
    this.length = this.array.length;

    this.box.width = values.length * Node.WIDTH;
    this.box.height = Node.HEIGHT;
  }

  push = async (...items: number[]) => {
    this.array.push(...items.map((value) => new Node(value)));

    this.length = this.array.length;
    this.box.width = this.length * Node.WIDTH;
  };

  pop = async () => {
    const node = this.array.pop();

    this.length = this.array.length;
    this.box.width = this.length * Node.WIDTH;

    return node.value;
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < this.array.length; i++) {
      this.array[i].setRoundedCorners(false, false, false, false);

      if (i === 0) {
        this.array[i].roundedCorners.topLeft = true;
        this.array[i].roundedCorners.bottomLeft = true;
      } 

      if (i === this.array.length - 1) {
        this.array[i].roundedCorners.topRight = true;
        this.array[i].roundedCorners.bottomRight = true;
      } 

      this.array[i].moveTo(this.box.x + i * Node.WIDTH, this.box.y);

      this.array[i].draw(ctx);
    }
  };
}

export default Array;
