import axios from "axios"

export function postUserRanks({ player_id, target }) {
    return axios
        .post('http://localhost:8000/userranks', {
            player_id,
            target,
            user_id: 1,    
        })
        .then(res => res.data)
}
