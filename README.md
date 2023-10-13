# Ledger

A centralized repository for professionals to track and log completed continuing education courses.

![Screen recording of app functionality](ss.gif)
**Link to project:** [Deployed version](https://ledger.cyclic.app/)

## How It's Made:

**Tech used:** JavaScript, Node, Express, MongoDB, Mongoose, Multer, TailwindCSS, HTML, CSS

Professionals in the healthcare and education fields often have to complete yearly continuing education (CE) courses or hours. Tracking and organizing all the information and documentation can be a hassle. As a former Speech-Language Pathologist, I became frustrated with not having one place for everything to live.

Ledger aims to be a centralized online space to be able to track it all. A full stack web app, it is a platform aimed to be a streamlined resource for professionals such as SLPs, OTs, PTs, and more to be able to track information about CE with the option to upload the certificates of completion.

## Optimizations

+ Rebuilding with React

Goal Features:

+ Google account authentication with Passport.js
+ Change/forgot/reset passwords
+ Tracking hours remaining for national license
+ Tracking hours remaining for state license
+ Adjustable CE cycles
+ ~~Uploading CE certificates~~
+ Export CE transcript as a PDF
+ ~~Personal notes for each course~~
+ ~~Marking CE as "in progress"~~
+ User-generated tags for CE
+ Filtering table
+ Searching CEs

## Lessons Learned:

Lots! Mapping through user flow, prototyping with Figma, styling with TailwindCSS rather than vanilla CSS.
- Logout error - uninstalling Passport 0.6 and reinstalling Passport 0.5 instead
- Ensuring Multer is included in route when handling multi-part forms


# Install

`npm install`

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Run

`npm start`
