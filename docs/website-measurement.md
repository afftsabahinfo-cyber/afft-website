# Website enquiry measurement

The website records page views, offer views, enquiry starts, WhatsApp clicks and copy actions through `/api/site-events`. Reports are private CLI exports, not a public dashboard. Customer messages and form answers are never sent to the event store. Existing Cloudflare Web Analytics remains the historical traffic baseline.

## Export

Run `npm run metrics:report -- --days 30 --output <private-folder>` from the verified website repository. CSV reports contain totals, daily and weekly counts, channels and pages. The database retains 90 Singapore calendar dates. Test events (`qa=1`) and Do Not Track requests are excluded from the reports. Weekly rows are truncated to the requested report period; increase the period to include a whole week when comparing weeks.

Visit sessions are random, per browser tab, with a 30-minute inactivity limit. They are not unique people. Daily distinct sessions must not be summed into a weekly distinct-session figure. WhatsApp clicks are not received enquiries or payments. Record actual enquiries, written quotes and payment confirmation separately in the private local review workbook.

## Campaign links

Use allowlisted source, medium and campaign labels. Example:

`https://afft.club/zh/packages/jimny-explorer-camp?utm_source=facebook&utm_medium=social&utm_campaign=jimny599`

Supported sources: direct, google, bing, facebook, instagram, tiktok, xiaohongshu, whatsapp, email, partner, other. Supported campaigns: none, jimny599, explorer599, rent-it, camping, partner-camping. Do not put a person's contact details in tracking parameters. The WhatsApp message reference carries the initial landing page and coarse source so an actual incoming enquiry can be reconciled with its visit.

## Deployment

Deploy the standalone metrics worker with `npm run deploy:metrics`, then the static site with `npm run deploy:pages`, from clean latest remote main. This does not deploy or change the Alice worker or Growth OS. A metrics outage must not block the public page or WhatsApp link. Verify the event endpoint, a QA browser navigation and WhatsApp click, then confirm the persisted QA rows are excluded from exported production totals.
