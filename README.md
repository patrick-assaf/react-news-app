# React News App

## Description
A web application that displays the top headlines for both New York Times and Guardian News. The user can choose to display the top-headlines for any of the following domains: world, politics, business, technology, and sports. Any article can be shared by the user on Facebook, Twitter, or via Email. Articles can be expanded to allow the user to read the full abstract and even add comments. The user can also search for keywords to read articles about any topic of their choice with autosuggestions available for their search queries. The application also supports adding articles to and removing articles from the application's Bookmark tab. The application is fully responsive and can be viewed on any laptop, tablet, or smartphone.

### Installing

In order to run the project, you need to have NodeJS installed on your machine. The npm package `concurrently` is used to start both the React App and NodeJS Server concurrently with a single command. Simply use:
```
npm start
```
If you are testing locally, the React App and NodeJS Server will run on ports 3000 and 5000 respectively.

A few API keys and project endpoints are needed for all features to work as intended:
* The Guardian
* New York Times
* Bing Autosuggest
* CommentBox.io

### Deployment

If you have an AWS account, one option is to deploy the React App frontend using AWS Amplify and to host the NodeJS Server on Elastic Beanstalk. AWS Amplify creates an HTTPS endpoint, so you will need to get a self-signed HTTPS certificate for your Elastic Beanstalk environment using the AWS Certificate Manager. You can also deploy the whole application into a single AWS EC2 instance. This will require you to SSH into your EC2 instance in order to install any dependencies and transfer the project files.