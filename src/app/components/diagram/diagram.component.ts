import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as go from 'gojs';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

  public diagram?: go.Diagram;

  @Input('model') model?: go.Model;
  @Output('itemSelected') itemSelected: EventEmitter<any> =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.diagram = $(go.Diagram, 'myDiagram', {
      layout:
        $(go.TreeLayout,
          {
            isOngoing: true,
            treeStyle: go.TreeLayout.StyleLastParents,
            arrangement: go.TreeLayout.ArrangementHorizontal,
            // properties for most of the tree:
            angle: 90,
            layerSpacing: 35,
            // properties for the "last parents":
            alternateAngle: 90,
            alternateLayerSpacing: 35,
            alternateAlignment: go.TreeLayout.AlignmentBus,
            alternateNodeSpacing: 20
          }),
      'undoManager.isEnabled': true
    });
    this.diagram.model = this.model as go.Model;
    this.diagram.addDiagramListener('ChangedSelection', (e)=>{
      const selectedNode = this.diagram?.selection.first();
      this.itemSelected.emit(selectedNode);
    })
  }

}
