# BoxLongPoll
Box Long Poll nodeJS Application

Goal
Write a command line program that implements the Box User Events Long Polling technique.

Background
Box provides a set of API endpoints for monitoring and retrieving real-time notifications of events taking place in Box.  In order to efficiently monitor user events, Box supports a long polling technique.  This alleviates the need for a consuming program to repeatedly poll for new events.  The consuming program can open a long-lived connection to an API endpoint and receive a message when new events are available.
