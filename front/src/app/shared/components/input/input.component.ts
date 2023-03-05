import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import resources from "../../../../assets/resources.json";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

    @Input() control: AbstractControl;
    @Input() type: string ;
    @Input() name: string ;
    @Input() label: string ;

    rsc: any;

  constructor() { }

  ngOnInit(): void {

    this.rsc = resources;
  }


}
