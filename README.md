Hogan.js vs Mu Bench
====================

Simple [siege.js](https://github.com/kissjs/siege.js)-based benchmark of 
[Hogan.js](https://github.com/twitter/hogan.js) vs [Mu](https://github.com/raycmorgan/Mu).


Motivation
----------

I'm in the process of optimizing a mustache template compiler / renderer for a Node.js web application. 
Having successfully used Hogan.js in the past for in-browser templating, I decided to use Hogan as the 
templating engine on the back-end.

As part of the integration tests, I run a set of siege.js ('apache-bench'-like) benchmarks. At first, 
the results were good, but as I added more content to the pages, I noticed that the requests per 
second (rps) dropped a great deal more than expected. After spending some time profiling the app 
(btw, [node-webkit-agent](https://github.com/c4milo/node-webkit-agent) is a great tool for that) 
it looked as though the GC was taking significantly more time than anything else.

That got me thinking that rendering the whole page as a string, sending that string to the client, 
and then leaving that 200K string for the GC to clean-up on every single request is probably a bit 
wasteful. So, I started looking for a Mustache compiler that will be able to stream the data out 
to the user in chunks. Having found Mu, I needed a more-or-less clean benchmark comparing the two, 
which is what this repo is.


Initial Observations
--------------------

Hogan.js is (2x) more efficient at rendering *smaller* (148B) templates. Mu is 
significantly (4x) more efficient at rendering *larger* (226K [wsj.com homepage]) 
templates.


To Execute
----------

    npm install                  # install hogan.js & mu
    node hogan_vs_mu_server.js   # start the server
    ./bench.sh                   # begin the benchmark


Averages (5 runs, MBP 2.53Ghz, 8G RAM)
--------------------------------------

Small (148B) Template

    /hogan-mini { rps: 6552, responseInMs: { min: 6, max:  92, avg: 30 } }
       /mu-mini { rps: 3135, responseInMs: { min: 6, max: 240, avg: 64 } }

Large (226K) Template

    /hogan { rps:  313, responseInMs: { min: 212, max: 3671, avg: 639 } }
       /mu { rps: 1185, responseInMs: { min:  11, max: 2564, avg: 169 } }



Raw Data
--------

Notes: 
  Taken on a MacBook Pro 2.53 GHz Intel Core 2 Duo, 8GB RAM.
  request-iterations: 100000, concurrent users: 200, test-iterations: 5

    /hogan-mini
      rps: 6569, 6437, 6379, 6397, 6980
      response: 4ms(min)	71ms(max)	30ms(avg)
      response: 3ms(min)	74ms(max)	31ms(avg)
      response: 5ms(min)	127ms(max)	31ms(avg)
      response: 17ms(min)	93ms(max)	31ms(avg)
      response: 2ms(min)	94ms(max)	28ms(avg)

    /mu-mini
      rps: 3277, 2960, 3113, 3150, 3173
      response: 7ms(min)	131ms(max)	61ms(avg)
      response: 2ms(min)	314ms(max)	67ms(avg)
      response: 8ms(min)	238ms(max)	64ms(avg)
      response: 8ms(min)	278ms(max)	63ms(avg)
      response: 5ms(min)    269ms(max)	60ms(avg)

    /hogan
      rps: 311, 302, 312, 316, 326
      response: 480ms(min)	6534ms(max)	643ms(avg)
      response: 50ms(min)	1619ms(max)	663ms(avg)
      response: 51ms(min)	1258ms(max)	640ms(avg)
      response: 444ms(min)	7008ms(max)	634ms(avg)
      response: 39ms(min)	1935ms(max)	614ms(avg)
      
    /mu
      rps: 1268, 1169, 1200, 1085, 1201
      response: 8ms(min)	517ms(max)	157ms(avg)
      response: 19ms(min)	5579ms(max)	171ms(avg)
      response: 8ms(min)	5520ms(max)	166ms(avg)
      response: 10ms(min)	725ms(max)	184ms(avg)
      response: 9ms(min)	480ms(max)	166ms(avg)
