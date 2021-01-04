#  🧠 WHYbrary - The Library of Whys

[Live MVP DEMO](https://whybrary.netlify.app)

Searchable, accesible tribal knowledge at your fingertips

![](screenshot/qastion-demo.gif)

## Functionality

WHYbrary integrates via a Microsoft Teams Plugin that extracts Questions and Answers from your organization's messages.

Information is indexed and added to an Natural Language Processing intellisense engine that can answer common questions before you even hit send

## Stack / APIs

We want to integrate with the Microsoft Graph API for MS Teams

🔑 Azure Text Analytics API for extracting keywords

🔍 Elastic on Azure for searching and analyzing messages 

:fire: Firebase Realtime Database for MVP backend