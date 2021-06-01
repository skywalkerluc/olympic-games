# Olympic games

This api is intended to store and view data related to olympic games.

# Api detail



## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install it.

```bash
npm install
```

## Usage

```curl
curl --location --request GET 'http://localhost:3000/v1/match?sport=soccer1' \
--data-raw ''

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
