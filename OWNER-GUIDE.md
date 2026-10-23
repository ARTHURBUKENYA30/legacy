# Green Shoots Legacy Sports Squash Academy
## Website owner guide

Welcome! You can manage the academy website from the owner dashboard without editing HTML or using GitHub.

### 1. Open the website and dashboard

- Public website: https://greenshootslegacysportssquashacademy.vercel.app/
- Owner dashboard: https://greenshootslegacysportssquashacademy.vercel.app/admin.html

Sign in with the administrator email and password that were set up for you. If you cannot sign in, contact the person who maintains the website. Do not send your password to anyone.

### 2. Everyday updates

After signing in, use the dashboard tabs:

- **Athletes & staff:** add a person, update their details or photo, or edit an existing profile.
- **Training programmes:** add or update a programme.
- **Events:** add an event, description, date, time and location.
- **Photo gallery:** add photos and a short title/category.
- **Messages:** view messages that have been saved in the website database and update their follow-up status.
- **Homepage text:** advanced settings. Avoid changing this section unless your website support person has explained the fields.

### 3. Add a new person, programme, event or photo

1. Select the relevant tab.
2. Fill in the name/title and description.
3. To add a photo, choose an image file. JPG, PNG, WebP and GIF are supported; the file must be under 8 MB. Wait for the save result before navigating away.
4. For events, add the event date/time and location.
5. Tick **Published** only when you want the item to be visible on the public website.
6. Click **Save record** and wait for the success message.

If you are not ready to show an item publicly, leave **Published** unticked. You can publish it later by editing the item and ticking the box.

### 4. Change or remove an existing item

- Find the item in its list and choose **Edit**.
- Update the fields, then choose **Update record**.
- To remove an item, choose **Delete** and confirm. Deletion cannot be undone, so check carefully first.

### 5. Confirm your change

Open the public website in another browser tab and refresh the page. Check that the text, photo or item appears correctly. It can help to refresh the public page after a few seconds.

### 6. If something goes wrong

- Read the status/error message shown on the dashboard.
- Check that you are connected to the internet and signed in.
- For image uploads, use an image under 8 MB in JPG, PNG, WebP or GIF format.
- If the dashboard says a permission or database policy error, contact the website maintainer. Do not try to change security settings yourself.
- Send the maintainer a screenshot of the error, but hide private information.

### 7. Keep the website secure

- Never share your administrator password or email verification codes.
- Sign out when finished, especially on a shared computer.
- Only give administrator access to trusted people.
- Do not edit or delete database records unless you know what they are for.

### Important notes

- **Save** and **Publish** are different: an unpublished item is stored but not intended to appear on the public website.
- The **Homepage text** section contains structured JSON and is intended for advanced changes. For normal updates, use the specific tabs instead.
- The Messages tab shows enquiries already stored in the database. If a visitor's website form is not saving new messages, contact the website maintainer to check the public enquiry form integration.
- This guide does not replace testing. The owner should confirm that signing in, saving, publishing and uploading photos work on the live website before relying on them.


### 8. Student portal, attendance and finance records

- Student / parent portal: https://greenshootslegacysportssquashacademy.vercel.app/student.html
- Admin dashboard: https://greenshootslegacysportssquashacademy.vercel.app/admin.html
- Use **Student profiles** to create a student record. In the extra details JSON, set `user_id` to the student's existing Supabase Auth user UUID and include `guardian_name`, `phone`, `program_name`, `date_of_birth` and `status`. The student's login email must already have an Auth account before linking it.
- Use **Memberships**, **Attendance** and **Payment records** to keep operational records. These records are visible only to administrators and the linked student account under database access policies.
- Payment records are a tracking ledger only. Do not mark a payment paid until the payment is independently verified. The site does not currently process real mobile-money/card transactions; connecting a payment provider requires the academy's verified merchant account and provider credentials.
- Add verified updates and approved testimonials using the **News** and **Testimonials** tabs. Publish only with permission, especially when identifying minors.
