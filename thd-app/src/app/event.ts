/**
 * Event interface which describes the structure of any event object
 */
export interface Event {
  /**
   * string variable to hold the event ID
   */
  eventId: string;

  /**
   * string variable to hold the description of an event
   */
  description: string;

  /**
   * string variable to hold the organiser name
   */
  organiser: string;

  /**
   * string variable to hold the participants info
   */
  participants: string;
}
