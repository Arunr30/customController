import { Asset } from "./asset";

export interface Location {
    locationId: string,
    locationName: string,
    assignedAssets: Asset[];
}