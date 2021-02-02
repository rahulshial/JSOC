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


