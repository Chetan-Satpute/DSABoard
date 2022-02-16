import BinarySearchTree from '.';
import { pause } from '../../utils/animation';
import { BinaryTreeNode } from '../BinaryTree';
import { BTNodeSetLeft, BTNodeSetRight } from '../BinaryTree/utils';
import board from '../Board';
import Color from '../Colors';
import Node from '../Node';

const PRIMARY = Color.Violet;
const SUCCESS = Color.Green;

async function BSTInsert(t: BinarySearchTree, value: number) {
  let par = t.root;
  let ptr = t.root;

  while (ptr !== undefined && ptr.value !== value) {
    par = ptr;

    ptr.color = PRIMARY;
    await board.draw();
    await pause();

    ptr.color = Node.DEFAULT_COLOR;
    await board.draw();
    await pause();

    if (value < ptr.value) {
      ptr = ptr.left;
    } else if (value > ptr.value) {
      ptr = ptr.right;
    }
  }

  if (ptr === undefined) {
    if (value < par.value) {
      await BTNodeSetLeft(par, new BinaryTreeNode(value));
      ptr = par.left;
    } else if (value > par.value) {
      await BTNodeSetRight(par, new BinaryTreeNode(value));
      ptr = par.right;
    }
  }

  ptr.color = SUCCESS;
  await board.draw();
  await pause();

  ptr.color = Node.DEFAULT_COLOR;
  await board.draw();
}

export default BSTInsert;
