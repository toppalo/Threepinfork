# Google Sheets Form Setup Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "ThreePinFork Contact Form"
4. Add the following columns in Row 1:
   - **Name** (Column A)
   - **Email** (Column B)
   - **Phone** (Column C)
   - **Message** (Column D)
   - **Timestamp** (Column E)

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any default code that appears
3. Copy and paste this code:

```javascript
// Handle form submissions (POST requests)
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get form data from the POST request
    const name = e.parameter.name || '';
    const email = e.parameter.email || '';
    const phone = e.parameter.phone || '';
    const message = e.parameter.message || '';
    const timestamp = e.parameter.timestamp || new Date().toISOString();
    
    // Append the row to the sheet (Name, Email, Phone, Message, Timestamp)
    sheet.appendRow([name, email, phone, message, timestamp]);
    
    // Return success page
    return HtmlService.createHtmlOutput(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Success</title>
        </head>
        <body>
          <h2>Thank you!</h2>
          <p>Your message has been received.</p>
        </body>
      </html>
    `);
    
  } catch (error) {
    // Log error (check Execution log in Apps Script)
    Logger.log('Error: ' + error.toString());
    
    return HtmlService.createHtmlOutput('Error: ' + error.toString());
  }
}

// Handle direct URL visits (GET requests) - prevents "function not found" error
function doGet(e) {
  return HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Contact Form Script</title>
      </head>
      <body>
        <h2>Contact Form Script</h2>
        <p>This script handles form submissions from your website.</p>
        <p>Form submissions work via POST requests.</p>
      </body>
    </html>
  `);
}
```

4. Click **Save** (💾) and name your project (e.g., "Contact Form Handler")

## Step 3: Deploy as Web App

1. Click on **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**
3. Fill in the deployment settings:
   - **Description**: "Contact Form Handler" (optional)
   - **Execute as**: "Me" (your email)
   - **Who has access**: "Anyone" (important!)
4. Click **Deploy**
5. Click **Authorize access** if prompted
   - Click "Review Permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)"
   - Click "Allow"
6. Copy the **Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycby...
   ```

## Step 4: Update Your Website

1. Open `contact.html` in your project
2. Find this line near the bottom:
   ```html
   <script src="script.js" data-google-script-url="YOUR_SCRIPT_URL"></script>
   ```
3. Replace `YOUR_SCRIPT_URL` with your actual Web App URL from Step 3
   ```html
   <script src="script.js" data-google-script-url="https://script.google.com/macros/s/AKfycby..."></script>
   ```
4. Save the file

## Step 5: Test the Form

1. Open your website
2. Go to the Contact page
3. Fill out the form and submit
4. Check your Google Sheet - you should see the data appear in a new row

## Troubleshooting

**Form submits but nothing appears in the sheet?**
- Make sure you selected "Anyone" for "Who has access" in deployment
- Check the Apps Script execution log: View → Execution log

**"Google Sheets script URL not configured" error?**
- Make sure you replaced `YOUR_SCRIPT_URL` in contact.html with your actual URL

**Permission denied errors?**
- Re-deploy the script and make sure to set "Who has access" to "Anyone"
- Re-authorize the permissions

**Want to test the script manually?**
- In Apps Script, go to Run → Run function → doPost
- Or use the browser console to test the fetch request

## Security Note

Since we're using `no-cors` mode, the form submission won't block the page, but we can't verify the response. The data should still be saved to your sheet. If you need better error handling, you can modify the script to use a different method, but this is the simplest setup for GitHub Pages.

