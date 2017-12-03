# Best Hot Technology Predictor

### Prerequisites
  - Angular v1.5.6
  - Node v8.9.1
  - Express v4.16.2
  - Bootstrap 4
  
### Install Environment
  - clone project repo
  ```
  git clone https://github.com/AjmerSingh7537/YHack
  ```
  - npm install
### Run Project
  - npm run start
  
### APIs
### Google searches
basic usage:
```
  https://patents.google.com/xhr/query?url=q=machine+learning
```
(we can use the headers 'total_num_results' to retrieve number of results from the response)

### Social media trends
  basic usage:
  ```
    https://api.talkwalker.com/api/v1/search/histogram/published?access_token=demo&q=machine+learning&interval=1d&min=1512121055&max=1512221055&pretty=true
  ```
  - where min and max, are the date range written in timestamp notation
  - can only be used for previous 30 days, but it's fine. Social media is not as important to find all posts from 1year ago .. 30 days is enough, to know if it is circulating or not.

  for more info: https://www.talkwalker.com/user-manual/api
