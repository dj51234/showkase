# Showkase Project

Start python server from root path:

```
python manage.py migrate
python manage.py runserver
```

In another terminal cd into the frontend folder and enter the following commands:

```
npm install
npm run start
```

Webpack will compile javascript and scss using custom template tags in realtime

## Todo

- ~~File structure~~
- ~~Implement webpack in django for scss~~
- Base template configurations

- Work on design elements
  - Colors, images, page flow, UI/UX
  - Logo
  - Font family
  - Font sizes
- Pages
  - Home page
    - Welcome
    - What the app does
    - Login
    - Register
  - Profile
    - Name
    - Profile picture
    - Bio
    - Location
    - Search form
    - Ability to create/edit and remove lists
    - When search results populate icons pertaining to the show/movie will display
      - '+' or '-' icon for adding to their favorites list
      - Clicking on a search result will go to an individual page for that show/movie
  - Individual show page
    - Platforms to buy or watch on (Amazon, Crunchyroll, HBO Max)
    - Small description of movie/show, year released, major actors
      - Episodes tab for shows
        - Episode synopsis when specific episode clicked
