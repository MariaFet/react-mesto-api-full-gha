export const BASE_URL = 'https://api.mesto.bymaria.nomoreparties.co';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const signUp = ({password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
  .then(res => checkResponse(res))
}

export const signIn = ({password, email}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
  .then(res => checkResponse(res))
  .then((data) => {
    if (data) {
      // localStorage.setItem('jwt', data.token);
      // return data.token;
      localStorage.setItem('userId', data._id);
      return data;
    }
  })
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
  //    "Authorization" : `Bearer ${token}`
    },
    credentials: 'include',
  })
  .then(res => checkResponse(res))
}