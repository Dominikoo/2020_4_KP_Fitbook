import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WallService {

  public groupId: Subject<Number>;

  constructor() { 
    this.groupId = new Subject<Number>();
  }

  loadContent(groupId): void {
    this.groupId.next(groupId);
  }
}
