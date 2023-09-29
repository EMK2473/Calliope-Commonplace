const url = 'https://spotify23.p.rapidapi.com/playlist/?id=0vvXsWCC9xrXsKd4FyS8kM';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c019a715ebmsh04d655948ca9368p190c26jsnbc9b8dcb7c4f',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

fetch(url, options)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.error(error));

