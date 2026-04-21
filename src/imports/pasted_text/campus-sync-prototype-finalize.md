Finalize and correct the existing “CampusSync Club Management System” UI prototype without redesigning it from scratch.

Important rules:
- Preserve the existing visual style, layout, dark/light theme system, and all already created pages
- Do not recreate pages that already exist
- Only correct the remaining structural, role-based, authentication, and interaction issues
- Keep the design polished, premium, and presentation-ready for a final-year software engineering project

Make the following final corrections:

1. Authentication flow
Add and finalize a proper Login page and Register page matching the current design system.

Login page must include:
- brand/logo
- email input
- password input
- remember me checkbox
- forgot password link
- login button
- link to register page

Register page must include:
- full name
- email
- password
- confirm password
- role selection if needed for prototype
- register button
- link back to login page

Set the prototype start flow to:
Login → Dashboard

Set:
Register → Login

Add Logout in the profile dropdown and connect:
Logout → Login

2. Fix role-based sidebar visibility
Correct the prototype so the three role views show the proper sidebar menus.

Admin sidebar should show:
- Dashboard
- Clubs
- Members
- Events
- Registrations
- Attendance
- Payments
- Rooms & Booking
- Announcements
- Certificates
- Reports
- Settings
- Profile

Club Leader sidebar should show:
- Dashboard
- Members
- Events
- Registrations
- Attendance
- Announcements
- Certificates
- Profile
- Settings

Club Leader should NOT see:
- Clubs
- Payments
- Reports
- Rooms & Booking as a global admin module

Member sidebar should show:
- Dashboard
- Events
- Registrations
- Payments
- Certificates
- Profile
- Settings

Member should NOT see:
- Clubs
- Members
- Reports
- Attendance management
- Rooms & Booking
- Admin-level announcements management

3. Fix role selector wording
The role switcher in the top bar should be clearly labeled as a prototype preview tool, not real authentication.

Change the label to one of these:
- View As
or
- Role Preview

Dropdown options should read:
- View as Admin
- View as Club Leader
- View as Member

4. Improve dashboard realism
Add a Recent Activity or Quick Updates panel on the dashboard with realistic sample data such as:
- John registered for Hackathon 2026
- Sarah joined Robotics Club
- Payment received for Music Fest
- Certificate generated for Photography Walk
- Attendance marked for Robotics Workshop

5. Improve top navbar interactions
Finalize these interactive UI states:
- search dropdown results for members, clubs, and events
- notification dropdown panel
- profile dropdown menu
- theme toggle interaction

6. Add realistic notification panel
Include example notifications:
- New member joined Coding Club
- Registration confirmed for Hackathon 2026
- Payment received successfully
- Room conflict detected
- Certificate generated

7. Add and refine missing UI states
Where needed, include:
- empty states
- loading skeletons
- success alerts
- warning alerts
- confirmation modals
- delete confirmation dialogs
- registration success message
- payment success message

8. Improve events module
Keep the current events page but add or refine a visual event card or hybrid layout showing:
- event name
- date
- location
- seats left
- status
- register button or manage button

9. Improve attendance module
Add or refine:
- manual attendance marking
- QR attendance scan widget
- export attendance
- attendance summary

10. Improve certificates module
Add or refine actions:
- preview certificate
- download certificate
- share certificate

11. Improve reports module
Add or refine:
- filter by date range
- filter by club
- filter by event type
- export CSV
- download PDF report

12. Improve settings module
Ensure the settings page clearly includes:
- profile settings
- notification settings
- account security
- theme settings
- change password

13. Final consistency polish
Review all existing pages and ensure consistency in:
- sidebar spacing
- card sizing
- typography hierarchy
- icon alignment
- button sizes
- table styling
- chart styling
- status badges
- hover states
- active states
- dark mode readability
- light mode readability

14. Prototype interactions
Connect the final main user flows:
- Login → Dashboard
- Register → Login
- Profile dropdown → Settings
- Profile dropdown → Logout
- Dashboard → Events
- Events → Registration
- Registration → Payment
- Payment → Confirmation
- Certificate actions → Preview / Download / Share
- Search bar → Search results dropdown
- Notification bell → Notification panel
- Theme toggle → Light / Dark mode state

Final outcome:
The prototype should look like a complete, polished, role-aware university club management SaaS product with proper login flow, role-based sidebars, realistic dashboard activity, strong module coverage, and clean interactive prototype behavior.