import axios from "axios"

export const getTeamTE = (team) => {
    return axios.get(`http://localhost:8000/teamdatate/${team}`)
};

