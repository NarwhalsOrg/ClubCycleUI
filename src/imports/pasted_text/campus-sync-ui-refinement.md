Refine and complete the existing “CampusSync Club Management System” UI prototype without redesigning it from scratch.

Important instructions:
- Keep the current dark modern SaaS dashboard style
- Preserve all already designed sidebar pages and existing layout
- Only add missing screens, missing interactions, missing states, and improve consistency
- Keep the design presentation-ready for a final-year software engineering project

Make the following corrections and additions:

1. Add missing authentication flow
Create a Login page and Register page that match the current dark theme and design system.

Login page must include:
- logo/brand area
- email field
- password field
- remember me checkbox
- forgot password link
- login button
- link to register page

Register page must include:
- full name
- email
- password
- confirm password
- role selection dropdown (Admin / Club Leader / Member)
- register button
- link back to login page

Prototype flow:
- Login → Dashboard
- Register → Login or Dashboard

2. Add logout option
In the top-right profile dropdown, include:
- View Profile
- Settings
- Logout

3. Improve role-based experience
Create UI variations or states for three roles:
- Admin
- Club Leader
- Member

Admin should see:
Dashboard, Clubs, Members, Events, Payments, Reports, Settings

Club Leader should focus on:
Dashboard, Members, Events, Attendance, Announcements

Member should focus on:
Dashboard, Events, Registrations, Certificates, Payments, Profile

Do not redesign every page separately; just make the interface clearly adaptable for role-based access.

4. Improve top navbar interactions
Add working UI states for:
- global search bar with search results dropdown for members, clubs, and events
- notification dropdown from the bell icon
- profile dropdown
- theme toggle for Light Mode and Dark Mode

5. Add realistic notification panel
Include notification examples such as:
- New member joined Coding Club
- Registration confirmed for Hackathon 2026
- Payment received successfully
- Room booking conflict detected
- Certificate generated

6. Add recent activity panel on dashboard
Include a “Recent Activity” or “Quick Updates” section showing realistic activity feed items such as:
- John registered for Hackathon 2026
- Sarah joined Robotics Club
- Attendance marked for Music Fest
- Certificate generated for Photography Walk
- Payment completed for Robotics Workshop

7. Add empty states
Where tables, lists, or cards may be empty, add realistic empty state designs such as:
- No events created yet
- No announcements available
- No pending payments
- No certificates generated yet

Include helpful CTA buttons like:
- Create Event
- Add Announcement
- Add Member

8. Add loading and feedback states
Add realistic UI states where needed:
- loading skeletons
- success alerts
- warning alerts
- confirmation modals
- delete confirmation dialogs
- payment success message
- registration confirmation message

9. Improve events page
Keep the existing structure, but also add a more visual event card view or hybrid layout showing:
- event name
- date
- location
- seats left
- event status
- register button or manage button

10. Improve attendance page
Add clear actions for:
- manual attendance marking
- QR attendance scan widget
- export attendance
- present / absent summary

11. Improve reports and analytics
Make reports more realistic by including:
- filters by date range
- filters by club
- filters by event type
- export CSV
- download PDF report

12. Improve certificates page
Add clear actions:
- preview certificate
- download certificate
- share certificate

13. Improve settings page
Ensure settings includes:
- profile settings
- account security
- notification preferences
- theme settings
- password change

14. Ensure dark mode consistency
Check all existing pages and ensure:
- readable text contrast
- visible chart colors
- readable tables
- consistent dark cards
- matching hover and active states

15. Final polish
Refine the full prototype for consistency in:
- spacing
- alignment
- card sizing
- typography hierarchy
- icon alignment
- button sizes
- table styling
- chart styling
- status badges

Final result:
The product should look like a polished, premium university club management SaaS dashboard with complete authentication flow, realistic interactions, strong dashboard experience, and presentation-ready UI.