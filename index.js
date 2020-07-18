const csvParser = require('csv-parser');
const fs = require('fs');
const Donationsspath = 'Donations.csv'
const Donorspath = 'Donors.csv'
let donations = {}
let statewise = {}
let start =  new Date();
fs.createReadStream(Donationsspath)
    .pipe(csvParser())
    .on('data', (row) => {
        if(!isNaN(parseFloat(row["Donation Amount"]))) donations[row["Donor ID"]] = donations[row["Donor ID"]] === undefined ? parseFloat(row["Donation Amount"]) : parseFloat(donations[row["Donor ID"]]) + parseFloat(row["Donation Amount"]);
    })
    .on('end', () => {
        //Reading Donors
        fs.createReadStream(Donorspath)
            .pipe(csvParser())
            .on('data', (row1) => {
                if(!isNaN(donations[row1["Donor ID"]])) statewise[row1["Donor State"]] = statewise[row1["Donor State"]] === undefined ? donations[row1["Donor ID"]] : statewise[row1["Donor State"]] + donations[row1["Donor ID"]];
            })
            .on('end', () => {
                console.log(statewise);
                console.log("Script Took "+(new Date()-start)/1000+" Seconds");
            })
    })

