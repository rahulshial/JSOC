# Jain Society of Calgary

## Screens & Components

1. Home Page
   * The main landing page denoted by "/" route will display the following:
     * Today's Date
     * Random Jain image (search for api or store in db)
     * Welcome Message (database)
       * Updatable by selected board members
     * Upcoming Events (srcoll box) (from database)
  

2. About Us
   * Page denoted by "/aboutUs". one pager to show the following:
   * Who we Are
   * Mission Statement
   * Board of Directors (database)
     * Each Member can be clickable and will show (either as a Pop-up or new component)
       * Picture
       * Position
       * Tenure (start year to end year)
       * email address
       * small write-up about his profile and himself
   * Seniors Group (TBD)
     * Link to Seniors group coordinator for contact
   * Womens group
     * Mission & Statement
     * Link to Womens group coordinator for contact
   * Young Jains of Canada
     * Mission & Statement
     * Link to YJA coordinator for contact

3. Events
   * Page denoted by "/events". one pager to show the following:
   * If logged in as a select Board Member:
     * Add new event
     * Update existing Event
     * Mark Event completed
     * list of RSVP for event (separate page)
   * Event Details - what should these details be?
   * RSVP
     * Should require logged in member
     * take him to RSVP page
       * drop down of upcoming events only
       * select family members for rsvp (dynamic select or whole family)

4. News & Announcements
   * Page denoted by "/news". one pager to show the following:
   * NewsLetters
     * Select Board Members can upload new newsletters
     * scrollable box with each newsletter link pdf from database
     * Can open only if logged in as member
     * disable downloads
   * JAINA calendar link to PDF
   * Announcements
     * Select Board Members can Add new announcements
     * continuous scrolling with available scroll bar
     * JSOC announcements
     * Community announcements
     * limit to last 10

5. Contact Us
   * Page denoted by "/contactUs". one pager to show the following:
     * Simple form to send message to calgaryjains@gmail.com

6. Member Area
   * Page denoted by "/memberArea". one pager to show the following:
   * Defaults to Login page if not logged in 
   * Only for non boardmember logins
   * member can update his information
   * member can search for other members (TBD)
   * Member can renew his membership

7. Member Login
   * Page denoted by "/aboutUs". one pager to show the following:
   * Login Page
   * Sign-up / Register to Member Database link
   * Sign-up
     * Create member database

8. Executive Area
   * Page denoted by "/executives". one pager to show the following:
     * Member list
     * Filter on zipCode, Gender, Age, Annual fees paid, what else

# Entities / Databases

1. User Database 
  - fixed 10 users which will be board members, with type as EC (Executive Committee), DIR(Director)
  - other members will have type MEM(Member) - each MEM type user will have a entry in User_Detail
  - login with email & password


2. User_Detail
  - details about each MEM type record from the User database.
  - form the backbone of the member database for the community.
  - Please see the Member Database structure.xlsx for details.

3. Events
  - ID
  - Event Title
  - Event Description
  - Event Venue
  - Start_date
  - End_Date
  - Start_time
  - End_time
  - RSVP_Required?

4. Newsletters
  - recommended to store files on the file system, and just add a reference in the DB (a field with the file path and name). Several reasons:
  Faster, Easier to access (don't need any special application), Faster backups, Less space
  - how to store files on the file-system?

5. Resource Links
  - Links to resources 
    - Audio
    - Video
    - Literature

Sign-up functionality:
- accept email from user
- if email already exists, error, 
 - else
  - create random activation token
  - create activation record in activation table
  - create url = localhost:3000/users/activation/:email/:activation code
  - send email with the activation link and notify the user to check his email / spam
  - clicking the link will 
    - search the activation table
    - if activation code matches,
    - redirect user to add password - component in login page - state = activation
    - accept and verify password
    - create user record, and log him in to the system
    - delete activation record from activation table.