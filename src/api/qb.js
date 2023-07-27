import axios from "axios"

export const getTeamQB = (team) => {
    return axios.get(`http://localhost:8000/teamdataqb/${team}`)
};

