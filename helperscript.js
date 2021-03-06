// * * * * * * * * * * * * 
// Fantasy Helper
// Created by Addison Kline, circa 2021
// Data from Fangraphs.com
// * * * * * * * * * * * * 

const teamsTable = "data/json-team-data-2021-final.json";
const battingTable = "data/json-batter-data-2021-final.json";
const startingPitchingTable = "data/json-starting-pitcher-data-2021-final.json";
const reliefPitchingTable = "data/json-relief-pitcher-data-2021-final.json";
const teamHeaders = ["Team", "Win-Loss", "Offense Rank", "Defense Rank", "Overall Rank"];
const battingHeaders = ["Name", "Team", "G", "PA", "Ranking"];
const startingPitchingHeaders = ["Name", "Team", "IP", "GS", "Ranking"];
const reliefPitchingHeaders = ["Name", "Team", "IP", "G", "Ranking"];

// this function only works when outside the vue app... oh well
function populateTable(json, table) {
    const rankingsBody = document.querySelector("#rankingsTable > tbody")
    const rankingsHeader = document.querySelector("#rankingsTable > thead")

    // clears table header
    while (rankingsHeader.firstChild) {
        rankingsHeader.removeChild(rankingsHeader.firstChild)
    }

    // clears table body
    while (rankingsBody.firstChild) {
        rankingsBody.removeChild(rankingsBody.firstChild)
    }

    // populate table body
    json.forEach((row) => {
        const thisRow = row
        const tr = document.createElement("tr")

        row.forEach((cell) => {
            const td = document.createElement("td")
            td.textContent = cell
            tr.appendChild(td)
        })

        rankingsBody.appendChild(tr)
    })  

    // populate table header
    if (table === teamsTable) {
        const tr = document.createElement("tr")

        for (i = 0; i < teamHeaders.length; i++) {
            const th = document.createElement("th")
            th.textContent = teamHeaders[i]
            tr.appendChild(th)
        }
        rankingsHeader.appendChild(tr)
    }
    else if (table === battingTable) {
        const tr = document.createElement("tr")

        for (i = 0; i < battingHeaders.length; i++) {
            const th = document.createElement("th")
            th.textContent = battingHeaders[i]
            tr.appendChild(th)
        }
        rankingsHeader.appendChild(tr)
    }
    else if (table === startingPitchingTable) {
        console.log("equality check working")
        const tr = document.createElement("tr")

        for (i = 0; i < startingPitchingHeaders.length; i++) {
            const th = document.createElement("th")
            th.textContent = startingPitchingHeaders[i]
            tr.appendChild(th)
        }
        rankingsHeader.appendChild(tr)
    }
    else if (table === reliefPitchingTable) {
        console.log("equality check working")
        const tr = document.createElement("tr")

        for (i = 0; i < reliefPitchingHeaders.length; i++) {
            const th = document.createElement("th")
            th.textContent = reliefPitchingHeaders[i]
            tr.appendChild(th)
        }
        rankingsHeader.appendChild(tr)
    }
    else {
        console.warn("equality check not working, table header can't be loaded")
    }
}

const helperApp = Vue.createApp({

    data() {
        return {
            url: 'https://baseball-analytica.com',
            batterDataShown: true,
            countBatterTables: 0,
            countPitcherTables: 0,
            dataOptions: [
                { title: 'Teams', url: teamsTable, selected: true},
                { title: 'Batters', url: battingTable, selected: false },
                { title: 'Starting Pitchers', url: startingPitchingTable, selected: false },
                { title: 'Relief Pitchers', url: reliefPitchingTable, selected: false}
            ]
            
        }
    },
    methods: {
        // loads table using Ajax
        loadTable(table) {
            // requests table data
            const request = new XMLHttpRequest()

            request.open("get", table)
            request.onload = () => {
                const json = JSON.parse(request.responseText)
                populateTable(json, table)
            }

            request.send()
        },
        // returns player type displayed in table
        playerTypeSelected(playerType) {
            if(playerType === 'Batters') {
                return this.batterDataShown
            }
            else if(playerType === 'Starting Pitchers' || playerType === 'Relief Pitchers' || playerType === 'Teams') {
                return !this.batterDataShown
            }
        },
        // changes player type
        setTablePlayer(playerType) {
            if(playerType === 'Batters') {
                this.batterDataShown = true
            }
            else if(playerType === 'Starting Pitchers' || playerType === 'Teams' || playerType === 'Relief Pitchers') {
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

            if (playerType === 'Teams') {
                return teamsTable
            }
            else if(playerType === 'Batters') {
                return battingTable
            }
            else if(playerType === 'Starting Pitchers') {
                return startingPitchingTable
            }
            else if(playerType === 'Relief Pitchers') {
                return reliefPitchingTable
            }
        }
    },
    // generates team rankings when page loads
    created: function() { 
        this.setTablePlayer('Teams')
        this.loadTable(teamsTable)
    },
    computed: {

    }
})

const vm = helperApp.mount('#helper')

