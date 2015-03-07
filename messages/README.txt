Lab 6
Lydia Pezzullo

1. To my knowledge, every part of this assignment is correctly implemented.
2. I haven't collaborated with anyone on this assignment, but have used example code and references.
3. This assignment took about 2.5 hours.

Extra question response: XMLHttpRequest will not work with either a different origin or a local file. This is because of the same-origin policy. A different origin is a different host, port, or protocol, and a file accessed from the local machine uses a different protocol (file:), which are both violations of the same-origin policy. Same-Origin Policy is a security measure designed to keep malicious scripts from interacting with other web pages or the client's filesystem.

For example, when attempting to request a JSON file at messagehub.herokuapp.com from a page hosted on tuftsdev.github.io, the console provides the following error:

XMLHttpRequest cannot load http://messagehub.herokuapp.com/messages.json. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://tuftsdev.github.io' is therefore not allowed access.

Last modified: 3/7/2015.