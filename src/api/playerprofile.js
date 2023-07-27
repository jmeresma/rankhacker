import axios from "axios"

export const getPlayerData = (player) => {
    return axios.get(`http://localhost:8000/playerprofiledata/${player}`)
};






