import Quill from 'quill';

const Block = Quill.import('blots/block');

class DivBlot extends Block {
  static blotName = 'div';
  static tagName = 'div';

  static create(value: any) {
    let node = super.create();
    if (value.class) {
      node.setAttribute('class', value.class);
    }
    if (value.style) {
      node.setAttribute('style', value.style);
    }
    return node;
  }

  static formats(node: HTMLElement) {
    return {
      class: node.getAttribute('class'),
      style: node.getAttribute('style'),
    };
  }

  format(name: string, value: any) {
    if (name === 'div' && value) {
      this["domNode"].setAttribute('class', value.class || '');
      this["domNode"].setAttribute('style', value.style || '');
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(DivBlot);