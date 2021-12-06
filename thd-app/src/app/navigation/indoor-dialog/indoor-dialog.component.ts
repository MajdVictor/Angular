import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Inject } from '@angular/core';

/**
 * Indoor dialog class
 */
@Component({
  selector: 'app-indoor-dialog',
  templateUrl: './indoor-dialog.component.html',
  styleUrls: ['./indoor-dialog.component.scss']
})
export class IndoorDialogComponent implements OnInit {

  /**
   * Injecting data so that it makes it possible to use data passed form navigation class
   * @param data : json data 
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  /**
   * This method is called after the constructor is executed.
   * It does nothing at the moment
   */
  ngOnInit(): void {
    
  }

}
