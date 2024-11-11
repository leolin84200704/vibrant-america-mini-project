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
            {name: "Alabama", lat: "32.318230", lon: "-86.902298"},
            {name: "Alaska", lat: "66.160507", lon: "-153.369141"},
            {name: "Arizona", lat: "34.048927", lon: "-111.093735"},
            {name: "Arkansas", lat: "34.799999", lon: "	-92.199997"},
            {name: "California", lat: "36.778259", lon: "-119.417931"},
            {name: "Colorado", lat: "39.113014", lon: "-105.358887"},
            {name: "Connecticut", lat: "41.599998", lon: "-72.699997"},
            {name: "Delaware", lat: "39.000000", lon: "-75.500000"},
            {name: "Florida", lat: "27.994402", lon: "-81.760254"},
            {name: "Georgia", lat: "33.247875", lon: "-83.441162"},
            {name: "Hawaii", lat: "19.741755", lon: "-155.844437"},
            {name: "Idaho", lat: "44.068203", lon: "-114.742043"},
            {name: "Illinois", lat: "40.000000", lon: "-89.000000"},
            {name: "Indiana", lat: "40.273502", lon: "-86.126976"},
            {name: "Iowa", lat: "42.032974", lon: "-93.581543"},
            {name: "Kansas", lat: "38.500000", lon: "-98.000000"},
            {name: "Kentucky", lat: "37.839333", lon: "-84.270020"},
            {name: "Louisiana", lat: "30.391830", lon: "-92.329102"},
            {name: "Maine", lat: "45.367584", lon: "-68.972168"},
            {name: "Maryland", lat: "39.045753", lon: "-76.641273"},
            {name: "Massachusetts", lat: "42.407211", lon: "-71.382439"},
            {name: "Michigan", lat: "44.182205", lon: "	-84.506836"},
            {name: "Minnesota", lat: "46.392410", lon: "-94.636230"},
            {name: "Mississippi", lat: "33.000000", lon: "-90.000000"},
            {name: "Missouri", lat: "38.573936", lon: "-92.603760"},
            {name: "Montana", lat: "46.965260", lon: "-109.533691"},
            {name: "Nebraska", lat: "41.500000", lon: "-100.000000"},
            {name: "Nevada", lat: "39.876019", lon: "-117.224121"},
            {name: "New Hampshire", lat: "44.000000", lon: "-71.500000"},
            {name: "New Jersey", lat: "	39.833851", lon: "-74.871826"},
            {name: "New Mexico", lat: "34.307144", lon: "-106.018066"},
            {name: "New York", lat: "43.000000", lon: "-75.000000"},
            {name: "North Carolina", lat: "35.782169", lon: "-80.793457"},
            {name: "North Dakota", lat: "47.650589", lon: "-100.437012"},
            {name: "Ohio", lat: "40.367474", lon: "-82.996216"},
            {name: "Oklahoma", lat: "36.084621", lon: "-96.921387"},
            {name: "Oregon", lat: "44.000000", lon: "-120.500000"},
            {name: "Pennsylvania", lat: "41.203323", lon: "-77.194527"},
            {name: "Rhode Island", lat: "41.742325", lon: "-71.742332"},
            {name: "South Carolina", lat: "33.836082", lon: "-81.163727"},
            {name: "South Dakota", lat: "44.500000", lon: "-100.000000"},
            {name: "Tennessee", lat: "35.860119", lon: "-86.660156"},
            {name: "Texas", lat: "31.000000", lon: "-100.000000"},
            {name: "Utah", lat: "39.419220", lon: "-111.950684"},
            {name: "Vermont", lat: "44.000000", lon: "-72.699997"},
            {name: "Virginia", lat: "37.926868", lon: "-78.024902"},
            {name: "Washington", lat: "47.751076", lon: "-120.740135"},
            {name: "West Virginia", lat: "39.000000", lon: "-80.500000"},
            {name: "Wisconsin", lat: "44.500000", lon: "-89.500000"},
            {name: "Wyoming", lat: "43.075970", lon: "-107.290283"},
            {name: "District of Columbia", lat: "38.889805", lon: "-77.009056"},
            {name: "American Samoa", lat: "-14.275632", lon: "-170.702042"},
            {name: "Guam", lat: "13.444304", lon: "144.793732"},
            {name: "Northern Mariana Islands", lat: "15.1064", lon: "145.7065"},
            {name: "Puerto Rico", lat: "18.200178", lon: "-66.664513"},
            {name: "United States Minor Outlying Islands", lat: "19.2954", lon: "166.6280"},
            {name: "Virgin Islands,U.S.", lat: "18.00000", lon: "64.300000"}
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