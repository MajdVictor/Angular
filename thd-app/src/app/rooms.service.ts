import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Room service class
 */
@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  /**
   * endpoint url for events
   */
  private eventsUrl = "http://localhost:5000/api/events/"


  /**
   * a constructor to create new instance of this class
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * This function send GET request to the endpoint API in the backend server and it returns a JSON object 
   * with the event info in a specific room
   * @param roomIdSelected : id of the selected room by the user
   * @param dateSelected : date selected by the user
   * @param hourSelected : hour selected by the user
   */
  getEvents(roomIdSelected: string, dateSelected: string, hourSelected: string){
    
    return this.http.get<any>(this.eventsUrl, { params: {roomId: roomIdSelected, date: dateSelected, hour: hourSelected}})
  }
}
