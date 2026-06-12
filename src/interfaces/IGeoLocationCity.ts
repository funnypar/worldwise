interface ILocalityInfoItem {
    name: string;
    description: string;
    order: number;
    wikidataId?: string;
    geonameId?: number;
    isoCode?: string;
}

export interface IGeoLocationCity {
    latitude: number;
    lookupSource: string;
    longitude: number;
    localityLanguageRequested: string;
    continent: string;
    continentCode: string;
    countryName: string;
    countryCode: string;
    principalSubdivision: string;
    principalSubdivisionCode: string;
    city: string;
    locality: string;
    postcode: string;
    plusCode: string;
    localityInfo: {
        administrative: ILocalityInfoItem[];
        informative: ILocalityInfoItem[];
    };
}
