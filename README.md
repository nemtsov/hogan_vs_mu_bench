Hogan.js vs Mu
==============

Simple [siege.js](https://github.com/kissjs/siege.js)-based benchmark of 
[Hogan.js](https://github.com/twitter/hogan.js) vs [Mu](https://github.com/raycmorgan/Mu).


Initial Observations
--------------------

Hogan.js is (2x) faster for smaller (148B) templates. Mu is 
significantly (4x) faster for larger (226K [wsj.com homepage]) 
templates.


To Execute
----------

    npm install                  # install hogan.js & mu
    node hogan_vs_mu_server.js   # start the server
    ./bench.sh                   # begin the benchmark



Result Data
-----------

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
