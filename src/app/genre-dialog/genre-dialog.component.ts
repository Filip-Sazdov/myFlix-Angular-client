import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})

/**
 * This component provides a dialog/modal for genre info.
 *
 */
export class GenreDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      description: string;
    }
  ) {}

  ngOnInit(): void {}
}
