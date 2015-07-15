# Voting App for Japan Win10 Challenge

This is a voting app we used for a contest called the 
Windows 10 Demo Challenge. We wanted a way to collect 
votes from 2500 MSFTies at our annual Japan company meeting 
this past July, to determine our local winner for the 
Windows 10 Challenge. We only had one week to build, but we were 
able to use all the great tools available in Visual Studio, 
Microsoft Azure and PowerBI to create a quick web app 
for the voting. 

The voting app uses ASP.NET vNext, AngularJS and sends 
votes to Azure Event Hubs, which are collected and 
transferred to Stream Analytics and finally visualized 
in PowerBI real time. We would have liked to use native 
client apps to send directly to Event Hubs, but we 
didn't have time to deploy something to the various app 
stores.

Thanks to the auto-scale features in Azure Websites, the
resiliency provided by Event Hubs and the real time analytics 
provided by Stream Analytics and PowerBI,, we were able to 
handle 1000s of votes in a very short period of time. 

The app can be improved. This was a learning project 
and would be great to get it on the latest releases of 
ASP.NET vNext (currently app is written for Beta4). Also 
it could be made more generic as to handle other voting 
scenarios, made more secure, native client apps, etc. 
Go ahead and fork it on GitHub or send back your feedback directly.

Its a simple app, simple scenario to show these technologies in action.

## Requirements

* Organizational [Azure Subscription](http://azure.microsoft.com/en-us/) (to connect to PowerBI)
* [ASP.NET vNext Beta4](http://github.com/aspnet/home)

## Setup

1. Create the following services on Microsoft Azure using an organizational 
subscription (to use Stream Analytics connected to PowerBI).

  * Empty Web App
  * Service Bus Namespace containing Event Hub. Configure 
  access policies and seperate consumer group for Stream Analytics.
  * Stream Analytics service with an Input from your Event Hub
  and an Output to PowerBI. Query is included in StreamAnalyticsQuery.

2. Clone this repository to your local machine. 

   git clone https://github.com/drewby/win10Challenge.git

3. Three ways to configure your subscription information in the web app. 
The required settings come from the Microsoft Azure Event Hubs Dashboard ->
View Connection String.

  * Edit the config.json file.
  * Copy config.json file to config.Development.json
  * Configure in App Settings of the Azure Web App
  (use AppSettings:EventHubConnection and AppSettings:EventHubName as keys)

4. From command line restore and publish your application using DNU. This is required
because if you use Azure Web App git deploy, it will pull Beta5 (or current Beta).

   dnu restore
   
   dnu publish --out C:\deploy --runtime dnx-clr-win-x86.1.0.0-beta4
   
5. FTP the contents of C:\deploy to your Azure Web App "site" folder.

