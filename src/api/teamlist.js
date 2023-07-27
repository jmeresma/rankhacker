import axios from "axios"

export function getTeamList() {
    return axios
        .get('http://localhost:8000/teamlist')
        .then(res => res.data)
}