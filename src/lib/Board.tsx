import { RenderFunction } from "../Canvas";

class Board {
  render: RenderFunction;

  constructor() {
    this.init = this.init.bind(this);
  }

  async init(render: RenderFunction): Promise<void> {
    this.render = render;
  }
}

export default Board;
