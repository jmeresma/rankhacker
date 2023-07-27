import axios from "axios"

export const getTeamRB = (team) => {
    return axios.get(`http://localhost:8000/teamdatarb/${team}`)
};

