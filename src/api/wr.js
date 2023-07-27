import axios from "axios"

export const getTeamWR = (team) => {
    return axios.get(`http://localhost:8000/teamdatawr/${team}`)
};

