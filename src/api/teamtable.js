import axios from "axios"

export const getTeamTable = (team) => {
    return axios.get(`http://localhost:8000/teamtable/${team}`)
};