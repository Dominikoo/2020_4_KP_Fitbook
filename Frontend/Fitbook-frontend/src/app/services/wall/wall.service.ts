import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WallService {

  public groupId: Subject<Number>;

  constructor() { }

  loadContent(groupId): void {
    this.groupId.next(groupId);
  }
}
