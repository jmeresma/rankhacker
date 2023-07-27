import axios from "axios"

export function risersFallersTable() {
    return axios
        .get('http://localhost:8000/risersfallerstable')
        .then(res => res.data)
}