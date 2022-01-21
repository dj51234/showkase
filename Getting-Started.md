Clone repo

```
git clone https://github.com/dj51234/showkase.git
```

cd into showkase folder

```
cd showkase/
```

Install dependencies, webpack boilerplate allows front end build to be rendered. Pillow is used for profile images

```
pip install django python-webpack-boilerplate pillow
```

cd into front end to install npm dependencies

```
cd frontend/
npm install
```

Build frontend to have it render for development server

```
npm run build
```

cd back into showkase/ to migrate models and run server

```
cd ../
python manage.py migrate
python manage.py runserver
```

You hould now be able to register and login to your profile to start your search
