import { Component } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gojs-app';
  selectedNode?: go.Part;
  model: go.Model = new go.TreeModel([
    {
      'key': 1, 'name': 'Satya Nadella', 'title': 'CEO'
    },
    {
      'key': 2, 'name': 'Alex S R', 'title': 'Delivery Head', 'parent': 1
    },
    {
      'key': 3, 'name': 'Sooraj', 'title': 'Delivery Head', 'parent': 1
    }
  ]);
  formData = {
    name: null
  }
  nodeSelected(node: go.Part) {
    this.selectedNode = node || undefined;
    this.formData.name = this.selectedNode?.data?.name || '';
  }
  save() {
    this.model.startTransaction();
    this.model.set(this.selectedNode?.data, 'name', this.formData.name);
    this.model.commitTransaction();
  }
}
