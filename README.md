# htmlDemo
This project is a demonstration of HTML, CSS, and JavaScript, and Node is used to start the server. The project includes a variety of HTML pages, including a calendar, a button control page, a transfer page, a snake game, and a layout page using CSS flex. The project also includes a Content Management System (CMS) page, which is the main layout of the project.

---
## Project Structure
```
htmlDemo
├── script/
│   ├── Dockerfile                          # docker build file
│   ├── pre-build-client-local.sh           # Pre-packaged in local
|   └── run-local.sh                        # startup in local
├── views/
│   ├── breathy/                            # wukong breathy page，root path will redirect to this page
|   ├── button/                             # demo button control other elements
│   ├── calendar/                           # evo calendar 
│   ├── cms                                 # the main layout of the Content Management System
│   ├── left_right_layout                   # use css flex to implement left and right layout
│   ├── markdown-editor                     # markdown editor
│   ├── partials/                           # demo html partials
│   ├── select                              # html multi-select page
│   ├── snake_game/                         # snake game page
│   ├── transfer/                           # html transfer page
│   ├── index.ejs                           # main page
│   └── template.html                       # template file
├── .gitignore                              # Git Ignore Config File
├── .nvmrc                                  # node version config file
├── components.json                         # components config file
├── index.js                                # node server entrance
├── package.json                            # node library config file
└── README.md                               # Project Description
```
---
## How to run
### 1. Install Node
```bash
nvm install 18
nvm use ...
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Start the server
```bash
npm run dev
```
### 4. Open the browser
```bash
1.check the server is running
    http://localhost:3000
2.open the demo page
    http://localhost:3000/demo
```
---
