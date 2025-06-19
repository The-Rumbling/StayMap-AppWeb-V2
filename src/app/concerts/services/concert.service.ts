import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseService} from '../../shared/services/base.service';
import {Concert} from '../model/concert.entity';

const concertResourceEndpoint = environment.concertsEndpointPath || '';

@Injectable({
  providedIn: 'root'
})
export class ConcertService extends BaseService<Concert>{

  constructor() {
    super();
    this.resourceEndpoint = concertResourceEndpoint;
  }
}
