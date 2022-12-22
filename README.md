# Documentation

Project 3, JohnBryce Fullstack WEB course:

In this project I was asked to build a vacation site that shows vacations
and allows to follow them.
It was also needed to make a different representation of the vacations
for an admin that can delete, edit, add vacations.

### Acknowledged Problems:

- I am aware it was better to make the isAdmin a DB column and
  not a configuration array like I did in this project but I wanted
  to gain experience in this way of handling it.
- Considering the sortVacations function I think the complexity is pretty high
  (around 4n log n) which made me think of another way but I didnt implement it
  because I wasnt sure it was better.  
  (Having 2 arrays, one of followed vacations and one of notFollowedVacations)
- I could have designed more but I focused more on the technical part because I prefer it
  over designing although I do know that the design is a crucial part of the website.