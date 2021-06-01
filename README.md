# Olympic games

This api is intended to store and view data related to olympic games.

## Api detail
### GET
- A get-all matches feature;
- Filtering by sport is allowed too;
- They're ordered by match start date!

### POST
- When adding a new game, it must check for:
	- Required fields;
	- Matches having at least 30 minutes;
	- Every location must have just 4 matches for a day;
	- A match must not be added (saved, scheduled) in the same day, location and sport on an existing match with same conditions;


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install it.

```bash
npm install
```

## Usage

### GET
```curl
curl --location --request GET 'http://localhost:3000/v1/match?sport=soccer' \
--data-raw ''
```

### POST
```curl
curl --location --request POST 'http://localhost:3000/v1/match' \
--header 'Content-Type: application/json' \
--data-raw '{
    "sport": "Soccer",
	"location": "Aflitos",
    "teamA": "Brazil",
    "teamB": "Brazil",
	"matchStart": "2021-06-01 11:47:30.120Z",
	"matchEnd": "2021-06-01 12:30:30.120Z",
	"stage": "semifinal"
}'
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
