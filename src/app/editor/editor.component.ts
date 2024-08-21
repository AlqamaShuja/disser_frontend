// src/app/editor/editor.component.ts

import { Component, OnInit } from '@angular/core';
import Quill from 'quill';
import '../quill-blots/button-blot';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editorContent: string = '';

  ngOnInit(): void {
    // The blot is already registered in the ButtonBlot class, so you don't need to do it again here.
  }

  onEditorCreated(quill: Quill) {
    quill.clipboard.addMatcher('BUTTON', (node, delta) => {
      delta.insert(node.innerText, { button: node.innerText });
      return delta;
    });
  }
}
