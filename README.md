### Application specifications 
Build an application that will help establish skilled workers to offer their services to other people in their community/city. Only authenticated users will be able to use the system. The idea is to allow users within the same city to communicate, ask for services, and/or provide the service.
### General use case and requirements
* Every user has a profile page, shows their name, address, contact information (this helps users to reach each other easily). Your client application uses the `navigation` object to detect the user's location, Which will help your backend server tune all queries to find results near the user's location. That means once users travel to another city they will see posts from their new location.
* A scenario of use: User 1 needs help installing their new wireless router. They set a price they are willing to pay. User 2 has experience with gadgets and networking devices. They would accept the job offer of User 1.
* Another scenario is when User 2 submits a post about providing plumbing services for a specific amount of fees, and User 1 finds this post and requests service at a certain date/time.
* Users can browse two categories of posts: "Work Requests" or "Work Providers" tabs in their city only (based on the city of their profile). 
* Users can communicate by posting comments (Q/A)  to any post.
### Technical requirements
* Homepage displays posts of 25 results per page, and button to display "More...".
* Posts should be ordered by date (newest first) and expire automatically after 48 hours.
* Once a post has been accepted, it is displayed in a different grayed color to indicate that the request has been fulfilled.

