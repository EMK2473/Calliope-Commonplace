fetch(`https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=1d1c01d18994468ab2c8b879ff5d1f66&client_secret=12f9fe723b6e465b807089c92072062f`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}).then(function(response){
    return response.json()
}).then(function(data){
  return fetch(`https://api.spotify.com/v1/playlists/0vvXsWCC9xrXsKd4FyS8kM`, {
    method: 'GET',
    headers: {
        "Authorization": "Bearer " + data.access_token
    }
  })
    
}).then(function(response){
    return response.json()
}).then(function(data){
    console.log(data)
})

