/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'states';
const collectionName = 'states_names';

// Create a new database.
use(database);

// Create a new collection.
const collection=db.getCollection(collectionName);

const states_names = [
    {name: "Alabama"},
    {name: "Alaska"},
    {name: "Arizona"},
    {name: "Arkansas"},
    {name: "California"},
    {name: "Colorado"},
    {name: "Connecticut"},
    {name: "Delaware"},
    {name: "Florida"},
    {name: "Georgia"},
    {name: "Hawaii"},
    {name: "Idaho"},
    {name: "Illinois"},
    {name: "Indiana"},
    {name: "Iowa"},
    {name: "Kansas"},
    {name: "Kentucky"},
    {name: "Louisiana"},
    {name: "Maine"},
    {name: "Maryland"},
    {name: "Massachusetts"},
    {name: "Michigan"},
    {name: "Minnesota"},
    {name: "Mississippi"},
    {name: "Missouri"},
    {name: "Montana"},
    {name: "Nebraska"},
    {name: "Nevada"},
    {name: "New Hampshire"},
    {name: "New Jersey"},
    {name: "New Mexico"},
    {name: "New York"},
    {name: "North Carolina"},
    {name: "North Dakota"},
    {name: "Ohio"},
    {name: "Oklahoma"},
    {name: "Oregon"},
    {name: "Pennsylvania"},
    {name: "Rhode Island"},
    {name: "South Carolina"},
    {name: "South Dakota"},
    {name: "Tennessee"},
    {name: "Texas"},
    {name: "Utah"},
    {name: "Vermont"},
    {name: "Virginia"},
    {name: "Washington"},
    {name: "West Virginia"},
    {name: "Wisconsin"},
    {name: "Wyoming"},
    {name: "District of Columbia"},
    {name: "American Samoa"},
    {name: "Guam"},
    {name: "Northern Mariana Islands"},
    {name: "Puerto Rico"},
    {name: "United States Minor Outlying Islands"},
    {name: "Virgin Islands, U.S."},
];

collection.insertMany(states_names);
collection.find();

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
