const mongodb = require('mongodb');
const uri = 'mongodb://admin:admin@localhost:27017';
const client = new mongodb.MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log('Connection created');

        const newDB = client.db("states");
        const collection = newDB.collection("state_names");

        const state_names = [
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
            {name: "Virgin Islands, U.S."}
        ];

        const result = await collection.insertMany(state_names);
        console.log("Number of documents inserted: " + result.insertedCount);
        
    } catch (err) {
        console.error("An error occurred:", err);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

main();