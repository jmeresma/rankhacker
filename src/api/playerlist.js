import axios from "axios"

export function getPlayerList() {
    return axios
        .get('http://localhost:8000/playerlist')
        .then(res => res.data)
}