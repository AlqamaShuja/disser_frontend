import Quill from 'quill';

const Inline = Quill.import('blots/inline');

class ButtonBlot extends Inline {
  static blotName = 'button';
  static tagName = 'button';

  static create(value: any) {
    let node = super.create();
    if (value.class) {
      node.setAttribute('class', value.class);
    }
    if (value.style) {
      node.setAttribute('style', value.style);
    }
    node.textContent = value.text || '';  // Ensure that textContent is set correctly
    return node;
  }

  static formats(node: HTMLElement) {
    return {
      class: node.getAttribute('class'),
      style: node.getAttribute('style'),
    //   text: node.textContent || ''  // Capture the text content
    };
  }

  format(name: any, value: any) {
    if (name === 'button' && value) {
      if (value.class) {
        this["domNode"].setAttribute('class', value.class);
      }
      if (value.style) {
        this["domNode"].setAttribute('style', value.style);
      }
      if (value.text) {
        this["domNode"].textContent = value.text;  // Update text content correctly
      }
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(ButtonBlot);
