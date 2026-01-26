export interface Building {
  id: string;
  name: string;
  description: string;
  image: string;
  rooms: string[];
  department?: string;
  floors: number;
}

export interface NavState {
  currentLocation: string;
  destination: string;
  showMap: boolean;
  selectedBuilding: Building | null;
  isAdminMode: boolean;
}