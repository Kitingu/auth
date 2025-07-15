import React, { Fragment } from "react";
import spinner from "../../img/spinner.gif";

export default () => (
    <Fragment>
        <img
            src={spinner}
            style={{ width: "200px", margin: "auto", display: "block" }}
            alt="Loading..."
        />
    </Fragment>
);

// Code
// Date
// TruckID
// CompartmentID(always 1)
// DeliveryPointID
// PresetTypeID
// Preset1

    // "Code" : fields.String(required=True),
    // "ExtRef": fields.String(),
    // "Date" : fields.Date(required=True),
    // "TruckId": fields.Integer(required=True),
    // "CompartmentId": fields.Integer(required=True),
    // "DeliveryPointId" : fields.Integer(required=True),
    // "FuelTypeId": fields.Integer(required=True),
    // "PresetTypeId": fields.Integer(),
    // "Preset" : fields.Integer(required=True),
    // "Longitude": fields.Float(),
    // "Latitude": fields.Float(),
    // "UnitPrice": fields.Float(),
    // "StatusId": fields.Integer()
