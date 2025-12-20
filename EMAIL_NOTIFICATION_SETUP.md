# Email Notification Setup Guide

## Quick Setup

Your Google Apps Script can send you an email alert every time someone submits your contact form!

## How to Enable Email Notifications

### Step 1: Update Your Google Apps Script

1. Open your Google Apps Script: https://script.google.com
2. Open your contact form project
3. Replace your entire script with the code from `GOOGLE_SCRIPT_WITH_NOTIFICATIONS.txt`
4. **IMPORTANT:** Change line 6 to your email address:
   ```javascript
   const YOUR_EMAIL = 'your-email@example.com'; // CHANGE THIS!
   ```
   Replace `your-email@example.com` with your actual email address

5. Click **Save** (💾)

### Step 2: Deploy/Update Your Web App

1. Go to **Deploy** → **Manage deployments**
2. Click the **Edit** icon (pencil) next to your current deployment
3. Under "Version", select **New version**
4. Click **Deploy**
5. Copy the new deployment URL (should be the same as before)
6. Update `contact.html` if the URL changed

### Step 3: Test It

1. Submit a test form on your website
2. Check your email inbox - you should receive a notification!
3. The email will include:
   - Name
   - Email (as reply-to, so you can respond directly)
   - Phone (if provided)
   - Message
   - Timestamp

## Email Format

You'll receive emails like this:

```
Subject: New Contact Form Submission - ThreePinFork

New contact form submission received!

Name: John Doe
Email: john@example.com
Phone: (555) 123-4567

Message:
I'm interested in booking a portrait session...

---
This is an automated notification from your ThreePinFork website contact form.
```

## Features

✅ **Instant notifications** - Get an email immediately when someone submits  
✅ **Reply directly** - The sender's email is set as "Reply-To" so you can respond easily  
✅ **All form data** - Everything is included in the email  
✅ **Automatic** - No manual steps needed after setup  

## Troubleshooting

**Not receiving emails?**
- Check your spam/junk folder
- Make sure you updated `YOUR_EMAIL` in the script
- Verify the script saved successfully
- Check Apps Script execution log for errors (View → Execution log)

**Want to customize the email?**
- Edit the `sendEmailNotification` function
- You can change the subject line
- Format the email body differently
- Add HTML formatting (use `htmlBody` instead of `body`)

## Optional: Multiple Recipients

Want to send to multiple email addresses? Change line 6 to:

```javascript
const YOUR_EMAIL = 'email1@example.com,email2@example.com,email3@example.com';
```

## Optional: HTML Email

Want prettier emails? Replace the email body in `sendEmailNotification`:

```javascript
const htmlBody = `
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
  <p><strong>Message:</strong></p>
  <p>${message}</p>
`;

MailApp.sendEmail({
  to: YOUR_EMAIL,
  subject: subject,
  htmlBody: htmlBody,
  replyTo: email
});
```




