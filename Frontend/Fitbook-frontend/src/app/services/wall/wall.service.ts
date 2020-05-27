import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WallService {

  public groupId: BehaviorSubject<Number> = new BehaviorSubject<Number>(-1);

  constructor() { 
    this.groupId = new Subject<Number>();
  }

  loadContent(groupId): void {
    this.groupId.next(groupId);
  }
}
