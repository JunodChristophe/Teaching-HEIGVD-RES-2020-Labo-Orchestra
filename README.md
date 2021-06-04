# Teaching-HEIGVD-RES-2020-Labo-Orchestra

## Objectives

RES laboratory about UDP
The lab objectives are:
* **Design and implement a simple application protocol on top of UDP**. Some applications multicast events and another listen to and process them.
* Getting familiar with several tools from **the JavaScript ecosystem**. By implementing two simple **Node.js** applications. (One for the senders and one for the receiver.)
* Practicing with **Docker**.

## Requirements

Each NodeJS applications are packaged in Docker images:
* the first app, **Musician**, simulates someone who plays an instrument in an orchestra. 
When the app is started, it is assigned an instrument (piano, flute, etc.). 
Every second it will emit a sound (a string) through UDP communication protocol.
The sound depends on the instrument.
* the second app, **Auditor**, simulates someone who listens to the orchestra.
This application has two responsibilities. Firstly, it must listen to Musicians and keep track of **active** musicians.
A musician is active if it has played a sound during the last 5 seconds.
Secondly, it implement a very simple TCP-based protocol to indicate which musician is active.
* a third application exist to validate how the architecture works through the script validate.sh.

### Instruments and sounds

The following table show the mapping between instruments and sounds.

| Instrument | Sound         |
|------------|---------------|
| `piano`    | `ti-ta-ti`    |
| `trumpet`  | `pouet`       |
| `flute`    | `trulu`       |
| `violin`   | `gzi-gzi`     |
| `drum`     | `boum-boum`   |


### TCP-based protocol to be implemented by the Auditor application

* The auditor include a TCP server and accept connection requests on port 2205.
* After accepting a connection request, the auditor send a JSON payload containing the list of <u>active</u> musicians, with the following format :

```
[
  {
  	"uuid" : "aa7d8cb3-a15f-4f06-a0eb-b8feb6244a60",
  	"instrument" : "piano",
  	"activeSince" : "2016-04-27T05:20:50.731Z"
  },
  {
  	"uuid" : "06dbcbeb-c4c8-49ed-ac2a-cd8716cbf2d3",
  	"instrument" : "flute",
  	"activeSince" : "2016-04-27T05:39:03.211Z"
  }
]
```


## Task 1: design the application architecture and protocols

| #  | Topic |
| --- | --- |
|Question | How can we represent the system in an **architecture diagram**, which gives information both about the Docker containers, the communication protocols and the commands? |
| | ![image](images/Architecture_Diagram.png) |
|Question | Who is going to **send UDP datagrams** and **when**? |
| | The musician app every seconds. |
|Question | Who is going to **listen for UDP datagrams** and what should happen when a datagram is received? |
| | The auditor app and it allows it to keep track of which musician is active. |
|Question | What **payload** should we put in the UDP datagrams? |
| | An unique UUID, The "sound" of the instrument and the date to which we send the data. |
|Question | What **data structures** do we need in the UDP sender and receiver? When will we update these data structures? When will we query these data structures? |
| | An uuid, the sound (for the sender) or the name of the instrument (for the receiver) and the date at which the data is send. 
The sender update every seconds and the receiver give the last musicians active from the last 5 seconds through the TCP connection. |


## Task 2: implement a "musician" Node.js application

| #  | Topic |
| ---  | --- |
|Question | In a JavaScript program, if we have an object, how can we **serialize it in JSON**? |
| | *Enter your response here...*  |
|Question | What is **npm**?  |
| | *Enter your response here...*  |
|Question | What is the `npm install` command and what is the purpose of the `--save` flag?  |
| | *Enter your response here...*  |
|Question | How can we use the `https://www.npmjs.com/` web site?  |
| | *Enter your response here...*  |
|Question | In JavaScript, how can we **generate a UUID** compliant with RFC4122? |
| | *Enter your response here...*  |
|Question | In Node.js, how can we execute a function on a **periodic** basis? |
| | *Enter your response here...*  |
|Question | In Node.js, how can we **emit UDP datagrams**? |
| | *Enter your response here...*  |
|Question | In Node.js, how can we **access the command line arguments**? |
| | *Enter your response here...*  |


## Task 3: package the "musician" app in a Docker image

| #  | Topic |
| ---  | --- |
|Question | How do we **define and build our own Docker image**?|
| | *Enter your response here...*  |
|Question | How can we use the `ENTRYPOINT` statement in our Dockerfile?  |
| | *Enter your response here...*  |
|Question | After building our Docker image, how do we use it to **run containers**?  |
| | *Enter your response here...*  |
|Question | How do we get the list of all **running containers**?  |
| | *Enter your response here...*  |
|Question | How do we **stop/kill** one running container?  |
| | *Enter your response here...*  |
|Question | How can we check that our running containers are effectively sending UDP datagrams?  |
| | *Enter your response here...*  |


## Task 4: implement an "auditor" Node.js application

| #  | Topic |
| ---  | ---  |
|Question | With Node.js, how can we listen for UDP datagrams in a multicast group? |
| | *Enter your response here...*  |
|Question | How can we use the `Map` built-in object introduced in ECMAScript 6 to implement a **dictionary**?  |
| | *Enter your response here...* |
|Question | How can we use the `Moment.js` npm module to help us with **date manipulations** and formatting?  |
| | *Enter your response here...* |
|Question | When and how do we **get rid of inactive players**?  |
| | *Enter your response here...* |
|Question | How do I implement a **simple TCP server** in Node.js?  |
| | *Enter your response here...* |


## Task 5: package the "auditor" app in a Docker image

| #  | Topic |
| ---  | --- |
|Question | How do we validate that the whole system works, once we have built our Docker image? |
| | *Enter your response here...* |
