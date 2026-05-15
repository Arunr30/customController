import { Asset } from "./asset";

export interface Location {
    mapAsset: any;
    locationId: string,
    locationName: string,
    assignedAssets: Asset[];
}