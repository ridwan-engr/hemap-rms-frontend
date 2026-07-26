import {

    Card,
    CardContent,
    Typography,
    Skeleton

} from "@mui/material";

import {

    MapContainer,
    TileLayer,
    Marker,
    Popup

} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import useSite from "../hooks/useSite";

/*
|--------------------------------------------------------------------------
| Fix Leaflet Marker Icons
|--------------------------------------------------------------------------
*/

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl:

        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:

        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:

        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

});

/*
|--------------------------------------------------------------------------
| Default Map Center
|--------------------------------------------------------------------------
*/

const DEFAULT_CENTER = [

    9.0820,

    8.6753

];

/*
|--------------------------------------------------------------------------
| Site Map
|--------------------------------------------------------------------------
*/

export default function SiteMap() {

    const {

        locations,

        loading

    } = useSite();

    if (loading) {

        return (

            <Card>

                <CardContent>

                    <Skeleton

                        variant="text"

                        width={180}

                        height={40}

                    />

                    <Skeleton

                        variant="rounded"

                        height={500}

                    />

                </CardContent>

            </Card>

        );

    }

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    fontWeight={700}

                    gutterBottom

                >

                    Site Locations

                </Typography>

                <MapContainer

                    center={DEFAULT_CENTER}

                    zoom={6}

                    style={{

                        height: "500px",

                        width: "100%",

                        borderRadius: 8

                    }}

                >

                    <TileLayer

                        attribution='&copy; OpenStreetMap contributors'

                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                    />

                    {

                        locations.map(site => (

                            <Marker

                                key={site.id}

                                position={[

                                    site.latitude,

                                    site.longitude

                                ]}

                            >

                                <Popup>

                                    <Typography

                                        fontWeight={700}

                                    >

                                        {site.siteName}

                                    </Typography>

                                    <Typography

                                        variant="body2"

                                    >

                                        Site ID: {site.siteCode}

                                    </Typography>

                                    <Typography

                                        variant="body2"

                                    >

                                        State: {site.state}

                                    </Typography>

                                    <Typography

                                        variant="body2"

                                    >

                                        Status: {site.status}

                                    </Typography>

                                </Popup>

                            </Marker>

                        ))

                    }

                </MapContainer>

            </CardContent>

        </Card>

    );

}