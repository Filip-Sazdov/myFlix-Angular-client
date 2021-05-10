import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})

/**
 * This component provides a dialog/modal for the movie director info.
 *
 */
export class DirectorDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
      birth: Date;
      death: Date;
    }
  ) {}

  ngOnInit(): void {}
}
