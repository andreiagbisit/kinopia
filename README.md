<h1>Kinopia</h1>
<p>
  A movie ticket booking application built using the <b>MERN stack</b> (<b>MongoDB</b>, <b>Express</b>, <b>React</b>, and <b>Node.js</b>).
</p>

<ul>
  <li>
    You may visit the deployed app here:<br>
    <a href="https://kinopia.vercel.app" target="_blank">
      <b>kinopia.vercel.app</b>
    </a>
  </li>
</ul>

<hr>

<h2>Features</h2>
<ul>
  <li>
    <b>Login/logout-based user authorization and authentication</b><br>
    Secure sign in and account registration with role-based access.
  </li><br>
  
  <li>
    <b>Ticket booking</b><br>
    Users can browse movies, choose screening times, and theater seats based on availability—all through the app's booking system.
  </li><br>
  
  <li><b>'Favorites' section</b><br>
    Each user can curate a list of their favorite movies available on the app.
  </li><br>
  
  <li><b>Payment processing integration</b><br>
    Secure ticket purchases can be acheived through a fully functional checkout flow.
  </li><br>
  
  <li><b>Admin dashboard</b><br>
    Admin users can view a dashboard that records the number of active shows, total bookings, total revenue, and registered accounts in real-time.
  </li><br>
  
  <li><b>Add 'Now Showing' movies</b><br>
    Through a dynamically provided set, admin users can add movies with custom showtimes and set booking prices in the app's catalog of active shows. 
  </li><br>
  
  <li><b>View added movies and booked users</b><br>
    Tables containing information of movies with active showings and successful bookings can be viewed by admin users.
  </li><br>
  
  <li><b>Responsive UI</b><br>
    Seamless experience in navigating throughout the app via desktop, tablet, and mobile layouts.
  </li>
</ul>

<hr>

<h2>Tech Stack</h2>
<table>
  <tr>
    <th><b>Name</b></th>
    <th><b>Details</b></th>
  </tr>
  
  <tr>
    <td>
      <b>Vite 7.2.4</b>
    </td>
    <td>Development environment</td>
  </tr>
  
  <tr>
    <td>
      <b>Express 5.1.0</b><br>
      <b>Node.js 22.20.0</b>
    </td>
    <td>Back-end</td>
  </tr>
  
  <tr>
    <td><b>TMDB API</b></td>
    <td>Movie information, user ratings, 'now showing' trailers</td>
  </tr>

  <tr>
    <td><b>Cloudinary 2.8.0</b></td>
    <td>Media management API</td>
  </tr>

  <tr>
    <td><b>Stripe 20.0.0</b></td>
    <td>Payment processing</td>
  </tr>

  <tr>
    <td>
      <b>Nodemailer 7.0.10</b><br>
      <b>Brevo</b>
    </td>
    <td>REST-to-SMTP mail sending</td>
  </tr>

  <tr>
    <td><b>Inngest 3.46.0</b></td>
    <td>Webhook endpoint and scheduling</td>
  </tr>

  <tr>
    <td><b>Svix 1.81.0</b></td>
    <td>Webhook signature verification</td>
  </tr>

  <tr>
    <td><b>CORS 2.8.5</b></td>
    <td>Express middleware</td>
  </tr>

  <tr>
    <td>
      <b>MongoDB Atlas</b><br>
      <b>Mongoose 9.0.0</b>
    </td>
    <td>Database</td>
  </tr>

  <tr>
    <td><b>Axios 1.13.2</b></td>
    <td>Promise-based HTTP client</td>
  </tr>

  <tr>
    <td><b>Clerk React SDK 5.56.2</b></td>
    <td>Authentication and user management SDK</td>
  </tr>

  <tr>
    <td>
      <b>React 19.1.1</b><br>
      <code>react-router-dom</code> <b>7.9.6</b><br>
      <b>Tailwind CSS 4.1.17</b><br>
      <b>Motion 12.23.25</b><br>
      <b>PrebuiltUI</b><br>
      <b>Lucide React 0.554.0</b>
    </td>
    <td>UI</td>
  </tr>

  <tr>
    <td><code>react-hot-toast</code> <b>2.6.0</b></td>
    <td>Notifications</td>
  </tr>

  <tr>
    <td><b>ReactPlayer 3.4.0</b></td>
    <td>URL-based video player</td>
  </tr>
</table>

<hr>

<h2>Setup</h2>

<h3>Prerequisites</h3>
<ul>
  <li>
    Ensure you have <b>Node.js</b> installed.<br>
    Download Node.js (Windows Installer):<br>
    <a href="https://nodejs.org/en/download" target="_blank">Node.js — Download Node.js®</a>
  </li>
</ul>

<ul>
  <li>
    You may need <b>Postman</b> to test GET and POST requests made by the client-side, as well as responses retreived from APIs invoked within the app.<br><br>
    Download Postman (Windows 64-bit):<br>
    <a href="https://www.postman.com/downloads/" target="_blank">Download Postman | Get Started for Free</a>
  </li>
</ul>

<ul>
  <li>You must have an account for the following services:</li>
</ul>

<table>
  <tr>
    <th><b>Service</b></th>
    <th><b>Reasons why it's needed</b></th>
  </tr>
  
  <tr>
    <td>
      <b>
        <a href="https://dashboard.clerk.com/sign-in" target="_blank">Clerk</a>
      </b><br>
    </td>
    <td>
      <ul>
        <li>You need to obtain environment variables for the app's client-side and server-side so that Clerk's authentication and user management integration to work properly.</li>
        <li>It'll allow you to add/remove admin privileges to a registered account.</li>
      </ul>
    </td>
  </tr>
  
  <tr>
    <td>
      <b>
        <a href="https://account.mongodb.com/account/login" target="_blank">MongoDB</a>
      </b><br>
    </td>
    <td>
      <ul>
        <li>Gives you access and control to the app's cloud database.</li>
        <li>You need to obtain environment variables for the app's server-side, permitting MongoDB to store, delete, and update data processed in the app.</li>
      </ul>
    </td>
  </tr>
  
  <tr>
    <td>
      <b>
        <a href="https://app.inngest.com/sign-in" target="_blank">Inngest</a>
      </b><br>
    </td>
    <td>
      <ul>
        <li>Allows you to monitor the triggers and schedules of the app's functions in real-time.</li>
        <li>You need to obtain environment variables for the app's server-side, allowing Inngest to establish a webhook endpoint reserved for the app's core functions.</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>
      <b>
        <a href="https://www.themoviedb.org/login" target="_blank">TMDB</a>
      </b><br>
    </td>
    <td>
      <ul>
        <li>Provides you access to their API in retrieving and displaying movie information, user ratings, and trailers of currently showing movies in the app.</li>
        <li>You need to obtain environment variables for the app's client-side and server-side to let the app retreive and add movies for the admin accounts to add as active shows.</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>
      <b>
        <a href="https://dashboard.stripe.com/login" target="_blank">Stripe</a>
      </b><br>
    </td>
    <td>
      <ul>
        <li>Allows the app to integrate a full checkout flow for processing ticket booking.</li>
        <li>You need to obtain environment variables for the app's server-side, giving Stripe access to implement its checkout flow.</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>
      <b>
        <a href="https://login.brevo.com/" target="_blank">Brevo</a>
      </b><br>
    </td>
    <td>
      <ul>
        <li>Allows the app to notify and confirm admin accounts of successful booking confirmations and addition of new movies within the app.</li>
        <li>You need to obtain environment variables for the app's server-side, allowing Brevo to provide Nodemailer a destination to send an email through REST.</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>
      <b>
        <a href="https://vercel.com/login" target="_blank">Vercel</a>
      </b><br>
    </td>
    <td>
      <ul>
        <li>Allows the app to be deployed and accessed on the web.</li>
        <li>You need to deploy the folders <code>client</code> and <code>server</code> as separate projects.</li>
      </ul>
    </td>
  </tr>
</table>

<h3>Getting Started</h3>

<ul>
  <li><b>Running the project locally</b></li>
</ul>

<pre><code># Clone this repository
git clone https://github.com/andreiagbisit/kinopia.git
  
# Navigate into the client-side directory
cd client

# Navigate into the server-side directory
cd server
  
# Install dependencies
npm install
  
# Start the client-side
npm run dev

# Start the server-side
npm run server</code></pre>

<ul>
  <li>
    <code>.env</code> - <b>client-side</b><br>
    <b>(LOCAL)</b> - <i>put this file in the root of</i> <code>client</code><br>
    <b>(DEPLOYED)</b> - <i>Access your client-side's Vercel project and go to <b>Settings</b> > <b>Environment Variables</b> and add them in the fields <b>Key</b> and <b>Value</b></i>
  </li>
</ul>

<pre><code>VITE_CURRENCY = '[currency symbol]'
VITE_CLERK_PUBLISHABLE_KEY=[publishable key]
VITE_BASE_URL = http://localhost:[port number] (local) / [Vercel project link of the back-end] (deployed)
VITE_TMDB_IMAGE_BASE_URL = https://image.tmdb.org/t/p/original</code></pre>

<ul>
  <li>
    <code>.env</code> - <b>server-side</b><br>
    <b>(LOCAL)</b> - <i>put this file in the root of</i> <code>server</code><br>
    <b>(DEPLOYED)</b> - <i>Access your server-side's Vercel project and go to <b>Settings</b> > <b>Environment Variables</b> and add them in the fields <b>Key</b> and <b>Value</b></i>
  </li>
</ul>

<pre><code>MONGODB_URI=[connection string]

CLERK_PUBLISHABLE_KEY=[publishable key]
CLERK_SECRET_KEY=[secret key]

INNGEST_EVENT_KEY=[event key]
INNGEST_SIGNING_KEY=[signing key]

TMDB_API_KEY=[key]

STRIPE_PUBLISHABLE_KEY=[publishable key]
STRIPE_SECRET_KEY=[secret key]
STRIPE_WEBHOOK_SECRET=[webhook secret]

SENDER_EMAIL=[email]
SMTP_USER=[SMTP login]
SMTP_PASS=[password]</code></pre>

<h3>Deployment</h3>

<ul>
  <li>
    <code>vercel.json</code> <b>configuration</b><br>
    Create two files named <code>vercel.json</code> then copy and paste the following code. Afterwards, place the files in the root of the folders <code>client</code> and <code>server</code>, according to their code content.
  </li>
</ul>

<ul>
  <li><code>vercel.json</code> - <b>client-side</b></li>
</ul>

<pre><code>  {
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/"
      }
    ]
  }</code></pre>

<ul>
  <li><code>vercel.json</code> - <b>server-side</b></li>
</ul>

<pre><code>{
    "version": 2,
    "builds": [
        {
            "src": "server.js",
            "use": "@vercel/node",
            "config": {
                "includeFiles": [
                    "dist/**"
                ]
            }
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "server.js"
        }
    ]
}</code></pre>

<hr>

<h2>Clerk - set user as admin</h2>

<ol>
  <li>
    <a href="https://dashboard.clerk.com/sign-in" target="_blank">Sign in</a> to your <b>Clerk</b> account.  
  </li>
  
  <li>On <b>Applications</b>, select the app that contains the users you want to configure.</li>
  <li>Select the <b>Users</b> tab.</li>
  <li>In the table under the <b>All</b> tab, pick the user you want to give admin privileges to.</li>
  <li>Under the <b>Profile</b> tab of the selected user, navigate to <b>Metadata</b> > <b>Private</b> and click <b>Edit</b>.</li>
  <li>Within the provided area, paste the following:</li>
</ol>

<pre><code>
  "role": "admin"
  
</code></pre>

<hr>
