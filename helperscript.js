// * * * * * * * * * * * * 
// Fantasy Helper
// Created by Addison Kline, circa 2021
// Data from Fangraphs.com
// * * * * * * * * * * * * 

const battingTable = "data/json-batter-data-09-24-21.json";
const pitchingTable = "data/json-pitcher-data-09-24-21.json";
const battingHeaders = ["Season", "Name", "Team", "PA", "BB%", "K%", "BB/K", "AVG", "OBP", "SLG", "OPS", "ISO", "BABIP", "wRC", "wRAA", "wOBA", "wRC+", "playerId"];
const pitchingHeaders = ["Season", "Name", "Team", "G", "TBF", "ERA", "H", "2B", "3B", "R", "ER", "HR", "BB", "IBB", "SO", "AVG", "OBP", "SLG", "wOBA", "playerId"];

// this function only works when outside the vue app... oh well
function populateTable(json, table) {
    const rankingsBody = document.querySelector("#rankingsTable > tbody");
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
        const tr = document.createElement("tr")

        row.forEach((cell) => {
            const td = document.createElement("td")
            td.textContent = cell
            tr.appendChild(td)
        })

        rankingsBody.appendChild(tr)
    })  

    // populate table header
    if (table === battingTable) {
        const tr = document.createElement("tr")

        for (i = 0; i < battingHeaders.length; i++) {
            const th = document.createElement("th")
            th.textContent = battingHeaders[i]
            tr.appendChild(th)
        }
        rankingsHeader.appendChild(tr)
    }
    else if (table === pitchingTable) {
        console.log("equality check working")
        const tr = document.createElement("tr")

        for (i = 0; i < pitchingHeaders.length; i++) {
            const th = document.createElement("th")
            th.textContent = pitchingHeaders[i]
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
                { title: 'Batters', url: battingTable, selected: false },
                { title: 'Pitchers', url: pitchingTable, selected: false }
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

