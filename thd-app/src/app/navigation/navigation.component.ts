import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IndoorDialogComponent } from './indoor-dialog/indoor-dialog.component';


/**
 * Navigation class 
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  /**
   * This list holds the buildings json objects retreived from buildings.json
   */
  buildingsList = []

  /**
   * String variable to hold the source building's name selected from the drop down
   */
  fromBuilding: string

  /**
   * String variable to hold the destination building's name selected from the drop down
   */
  toBuilding: string

  /**
   * string variable to hold the latitude coordinate for the source building
   */
  fromBuildingLatitude: string;

  /**
   * string variable to hold the longitute coordinate for the source building
   */
  fromBuildingLongitude: string;

  /**
   * string variable to hold the latitude coordinate for the destination building
   */
  toBuildingLatitude: string;

  /**
   * string variable to hold the longitude coordinate for the destination building
   */
  toBuildingLongitude: string;

  /**
   * String variable to hold the name of the building selected from the drop down for indoor navigation
   */
  indoorBuildingSelected: string;

  /**
   * String variable to hold the information for the selected building retrieved from the json file
   */
  selectedBuildingInformation: string;

  /**
   * String variable to hold the url for indoor map for the selected building 
   */
  indoorBuildingMapUrl: string;

  /**
   * String variable to hold the name of the building to be passed to the dialog
   */
  selectedIndoorBuildingName: string;

  /**
   * Angular form for navigation with two controls 
   */
  navigationForm: FormGroup = new FormGroup({
    fromBuilding: new FormControl(''), // source
    toBuilding: new FormControl(''), // destination
    indoorBuilding: new FormControl(''),  //indoor

  })

  /**
   * map object
   */
  map: any;

  /**
   * Routing control object
   */
  routeControl: any;


  /**
   * Constructor 
   * @param http : used for getting json data from json file
   * @param dialog : dialog for indor navigation
   */
  constructor(private http: HttpClient, public dialog: MatDialog) {

    /**
     * push json objects retrieved from getBuildings function to buildingsList
     */
    this.getBuildings().subscribe(data => {

      for (let i = 0; i < data.buildings.length; i++) {
        this.buildingsList.push(data.buildings[i])
      }
    });


  }

  /**
   * This functions returns json objects from buildings.json
   */
  public getBuildings(): Observable<any> {
    return this.http.get("../../assets/navigation/buildings.json");
  }

  /**
   * Called after the constructor is executed.
   * It creates a map object and set the view to deggendorf Institute of technology region
   */
  ngOnInit() {

    this.map = L.map('map').setView([48.829487, 12.9543166], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);


  }

  /**
   * This function is called when Find Route button is clicked.
   * 
   */
  findRoute() {

    //clear previous routes if exist on the map
    if (this.routeControl !== undefined) {
      this.map.removeControl(this.routeControl)
    }

    //iterating though buildingsList and assign coordinates of the selected building name
    for (let i = 0; i < this.buildingsList.length; i++) {
      if (this.buildingsList[i].name == this.fromBuilding) {
        this.fromBuildingLatitude = this.buildingsList[i].latitude
        this.fromBuildingLongitude = this.buildingsList[i].longitude
      }
      if (this.buildingsList[i].name == this.toBuilding) {
        this.toBuildingLatitude = this.buildingsList[i].latitude
        this.toBuildingLongitude = this.buildingsList[i].longitude
      }
    }

    //creating new routing control to show the route between the selected buildings
    this.routeControl = L.Routing.control({

      router: L.Routing.osrmv1({
        serviceUrl: `http://router.project-osrm.org/route/v1/`  // External service for routing 
      }),
      showAlternatives: false,
      lineOptions: { styles: [{ color: '#ed6852', weight: 7 }] }, // setting line thickness and color
      fitSelectedRoutes: true,
      altLineOptions: { styles: [{ color: '#ed6852', weight: 7 }] },
      show: true,
      routeWhileDragging: false,
      addWaypoints: false, // disable adding waypoints on the line
      waypoints: // coordinates for source and destination buildings
        [
          L.latLng(this.fromBuildingLatitude, this.fromBuildingLongitude),
          L.latLng(this.toBuildingLatitude, this.toBuildingLongitude)
        ],
    })
    this.routeControl.addTo(this.map); //adding the routing control to the map object 
  }

  /**
   * This function is called when Find Indoor map button is clicked
   */
  indoorNavigation() {
    //iterating through buildingsList to find information for the selected building
    for (let i = 0; i < this.buildingsList.length; i++) {
      if (this.buildingsList[i].name == this.indoorBuildingSelected) {
        this.selectedBuildingInformation = this.buildingsList[i].indoorInfo
        this.indoorBuildingMapUrl = this.buildingsList[i].indoorMap
        this.selectedIndoorBuildingName = this.buildingsList[i].name
      }
    }
    //Passing data (building name, building information, url for indoor map ) to IndoorDialog 
    this.dialog.open(IndoorDialogComponent, {
      data: {
        "buildingInfo": this.selectedBuildingInformation,
        "indoorMapUrl": this.indoorBuildingMapUrl,
        "buildingName": this.selectedIndoorBuildingName
      }
    });


  }
}
