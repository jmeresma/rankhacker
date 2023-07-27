import axios from "axios"

export function risersFallersChart() {
    return axios
        .get('http://localhost:8000/risersfallerschart')
        .then(res => res.data)
}


