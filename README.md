## Auto Scrolling Gallery

Component to generate an auto-scrolling gallery.

### Current functionality: 
- Takes images, captions and alt-text from spreadsheet
- The images can be any size and of any number
- Automatically scrolls left
- Pause/play button included on gallery

### To be included: 
- Ability to swipe through images
- Ability to generate the gallery without dev involvement
- Lazy loading images
- Image size based on mobile or desktop
- Default app swiping disabled
- Should work inside and outside of an iFrame 
- Should work in the app

### Generating a gallery using the spreadsheet

Current test spreadsheet is located here: https://docs.google.com/spreadsheets/d/11B90r_OGevVT1L6t02pN9GuASfhVGiYCs_gg_-j-mgI/edit#gid=0

TBC

### Running locally

You need the gulp-cli installed globally: `npm install -g gulp-cli`

Make sure you are using the correct version of node with NVM: run `nvm use` in the root of the repo. 
If you don't have nvm installed, add it: `brew install nvm`.

Install node modules: `npm i`

To run locally: `npm start` or `gulp`.  
