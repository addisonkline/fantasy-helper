//const rankingsBody = document.querySelector("#rankingsTable > tbody");
//const rankingsBody = document.getElementById('rankingsBody');
const battingTable = "data/json-batter-data-09-24-21.json";
const pitchingTable = "data/json-pitcher-data-09-24-21.json";

// function arrayToTable(tableData) {
//     //var table = $('<table></table>');
//     console.log('outside arrayToTable function reached')
//     $(tableData).each(function (i, rowData) {
//         var row = $('<tr></tr>');
//         $(rowData).each(function (j, cellData) {
//             row.append($('<td>'+cellData+'</td>'));
//         });
//         rankingsTable.append(row);
//     });
//     return rankingsTable;
// }

function populateTable(json) {
    const rankingsBody = document.querySelector("#rankingsTable > tbody");

    // clears table
    while (rankingsBody.firstChild) {
        rankingsBody.removeChild(rankingsBody.firstChild)
    }

    // populate table
    json.forEach((row) => {
        const tr = document.createElement("tr")

        row.forEach((cell) => {
            const td = document.createElement("td")
            td.textContent = cell
            tr.appendChild(td)
        })

        rankingsBody.appendChild(tr)
        //document.getElementById("rankingsTable").appendChild(tr)
    })  

    // console.log('inside arrayToTable function reached')
    // var table = $('<table></table>');
    // $(tableData).each(function (i, rowData) {
    //     var row = $('<tr></tr>');
    //     $(rowData).each(function (j, cellData) {
    //         row.append($('<td>'+cellData+'</td>'));
    //     });
    //     table.append(row);
    // });
    // return table;
}

const helperApp = Vue.createApp({

    data() {
        return {
            url: 'https://baseball-analytica.com',
            batterDataShown: true,
            countBatterTables: 0,
            countPitcherTables: 0,
            dataOptions: [
                { title: 'Batters', url: battingTable, selected: false },
                { title: 'Pitchers', url: pitchingTable, selected: false }
            ]
            
        }
    },
    methods: {
        // loads table using Ajax
        loadTable(table) {
            console.log('inside loadTable function reached')

            // // clear previous table data
            // while (rankingsTable.firstChild) {
            //     rankingsTable.removeChild(rankingsTable.firstChild);
            // }

            // requests table data
            const request = new XMLHttpRequest()

            request.open("get", table)
            request.onload = () => {
                // try {
                //     const json = JSON.parse(request.responseText)
                //     populateTable(json)
                // }
                // catch (e) {
                //     console.warn("request.onload error")
                // }
                const json = JSON.parse(request.responseText)
                populateTable(json)
            }

            request.send()
            // $.ajax({
            //     type: "GET",
            //     url: table,
            //     success: function (data) {
            //         // $(rankingsBody).append(arrayToTable(Papa.parse(data).data)); // here, arrayToTable() is outside the Vue app
            //         // rankingsBody = arrayToTable(Papa.parse(data).data);
            //         $(Papa.parse(data).data).each(function (i, rowData) {
            //             var row = $('<tr></tr>');
            //             $(rowData).each(function (j, cellData) {
            //                 row.append($('<td>'+cellData+'</td>'));
            //             });
            //             rankingsTable.append(row);
            //             //console.log(row);
            //             console.log('row appended')
            //         });
            //         console.log(rankingsTable);
            //     }
            // }, err => {
            //     alert(err);
            //     console.warn('ajax error: creating new table')
            // });
        },
        populateTable(json) {
            // clears table
            while (rankingsBody.firstChild) {
                rankingsBody.removeChild(rankingsBody.firstChild)
            }

            // populate table
            json.forEach((row) => {
                const tr = document.createElement("tr")

                row.forEach((cell) => {
                    const td = document.createElement("td")
                    td.textContent = cell
                    tr.appendChild(td)
                })

                rankingsBody.appendChild(tr)
            })  

            // console.log('inside arrayToTable function reached')
            // var table = $('<table></table>');
            // $(tableData).each(function (i, rowData) {
            //     var row = $('<tr></tr>');
            //     $(rowData).each(function (j, cellData) {
            //         row.append($('<td>'+cellData+'</td>'));
            //     });
            //     table.append(row);
            // });
            // return table;
        },
        // returns player type displayed in table
        playerTypeSelected(playerType) {
            if(playerType === 'Batters') {
                return this.batterDataShown
            }
            else if(playerType === 'Pitchers') {
                return !this.batterDataShown
            }
        },
        // changes player type
        setTablePlayer(playerType) {
            if(playerType === 'Batters') {
                this.batterDataShown = true
            }
            else if(playerType === 'Pitchers') {
                this.batterDataShown = false
            }
            console.log("player type set to " + playerType)
            console.log(this.batterDataShown)
        },
        selectedPlayerType() {
            return document.getElementById("playerType").value
        },
        dataSourceForPlayerType() {
            playerType = document.getElementById("playerType").value

            if(playerType === 'Batters') {
                return battingTable
            }
            else if(playerType === 'Pitchers') {
                return pitchingTable
            }
        }
    },
    computed: {

    }
})

const vm = helperApp.mount('#helper')

